import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BookProvider } from '../src/book/BookContext.jsx';
import TeacherPage from '../src/teacher/TeacherPage.jsx';
import UnitClosing from '../src/book/close/UnitClosing.jsx';
import { buildResultFile } from '../src/storage/resultFile.js';
import { parseResultFile } from '../src/storage/resultFile.js';
import { STORAGE_KEY_V4, createStore, emptyUnitRecord, normalizeUnitRecord } from '../src/storage/unitRecords.js';
import { buildFeedbackFile, importFeedbackFile, parseFeedbackFile } from '../src/storage/feedbackFile.js';
import { summarizeResults } from '../src/teacher/summarize.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

const unit = { id: '01-01', title: '세계화와 세계시민' };

function result(recordId, displayName = '7번') {
  const record = { ...emptyUnitRecord(unit.id), recordId, displayName };
  return {
    name: `${recordId}.json`,
    text: JSON.stringify(buildResultFile(record, unit, new Date('2026-11-28T00:00:00Z'))),
  };
}

const question = { id: 'q1', text: '무역은 왜 늘었을까?', selected: true, selectedVersion: 'original', conceptTags: [] };
const explanation = { questionId: 'q1', claim: '무역 연결이 넓어졌다', reasoning: '자료에서 비중이 커졌다', evidenceIds: ['e1'] };

function feedback(overrides = {}) {
  return {
    schema: 'gsng-teacher-feedback', schemaVersion: 1, feedbackId: 'feedback-file-1', recordId: 'record-a',
    unitId: '01-01', createdAt: '2026-11-28T09:00:00.000Z',
    comments: [{ questionId: 'q1', text: '자료의 범위와 시점을 근거와 함께 밝혀 보세요.' }],
    sourceSnapshot: { questions: [question], explanation },
    ...overrides,
  };
}

function renderStudent(record) {
  const book = makeBook();
  const savedRecord = { ...emptyUnitRecord('01-01'), ...record };
  if (!Object.prototype.hasOwnProperty.call(record, 'stageTimes')) savedRecord.stageTimes = { export: '2026-11-28T08:00:00.000Z' };
  const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': savedRecord } }) });
  const view = render(<BookProvider book={book} storage={storage}><UnitClosing unit={book.units[0]} /></BookProvider>);
  return { storage, savedRecord, ...view };
}

afterEach(() => vi.unstubAllGlobals());

describe('pilot teacher feedback', () => {
  it('keeps same-name pilot students separate by recordId', () => {
    const summary = summarizeResults([result('record-a'), result('record-b')], unit.id);

    expect(summary.students).toHaveLength(2);
    expect(summary.students.map((student) => student.recordId)).toEqual(['record-a', 'record-b']);
  });

  it('rejects a comment that points outside the source question snapshot', async () => {
    const feedback = {
      schema: 'gsng-teacher-feedback', schemaVersion: 1, feedbackId: 'feedback-1', recordId: 'record-a',
      unitId: '01-01', createdAt: '2026-11-28T09:00:00.000Z',
      comments: [{ questionId: 'missing-question', text: '자료 범위를 확인해 보세요.' }],
      sourceSnapshot: {
        questions: [{ id: 'q1', text: '처음 질문은 무엇일까?' }],
        explanation: { questionId: 'q1', claim: '주장', reasoning: '설명', evidenceIds: [] },
      },
    };

    expect(parseFeedbackFile(JSON.stringify(feedback))).toEqual({ ok: false, reason: 'bad-shape' });
  });

  it('rejects malformed optional question fields before a snapshot can reach the UI', () => {
    const malformed = feedback({ sourceSnapshot: {
      questions: [{ ...question, selectedVersion: 'converted', convertedText: { bad: true } }],
      explanation,
    } });

    expect(parseFeedbackFile(JSON.stringify(malformed))).toEqual({ ok: false, reason: 'bad-shape' });
  });

  it('keeps feedback, response links, and explanation history in result schema v1', () => {
    const imported = feedback();
    const response = { id: 'response-1', feedbackId: imported.feedbackId, status: 'deferred', reason: '자료를 더 확인한다', questionRevisionIds: [], explanationRevisionIds: [], createdAt: imported.createdAt };
    const explanationRevision = { id: 'explanation-1', before: explanation, after: { ...explanation, claim: '수정한 주장 문장' }, reason: '질문에 맞춰 좁혔다', feedbackIds: [imported.feedbackId], createdAt: imported.createdAt };
    const record = { ...emptyUnitRecord(unit.id), recordId: 'record-a', questions: [question], explanation, teacherFeedbacks: [imported], feedbackResponses: [response], explanationRevisions: [explanationRevision] };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { [unit.id]: record } }) });
    const restored = createStore(storage).load().units[unit.id];
    const resultFile = buildResultFile(restored, unit, new Date('2026-11-28T10:00:00Z'));

    expect(resultFile.schemaVersion).toBe(1);
    expect(parseResultFile(JSON.stringify(resultFile))).toMatchObject({ ok: true, value: { recordId: 'record-a', teacherFeedbacks: [imported], feedbackResponses: [response], explanationRevisions: [explanationRevision] } });
  });

  it('rejects malformed nested feedback and explanation history in a resubmitted result', () => {
    const malformedFeedback = buildResultFile({
      ...emptyUnitRecord(unit.id), recordId: 'record-a',
      teacherFeedbacks: [feedback({ sourceSnapshot: { questions: {}, explanation } })],
    }, unit);
    const malformedRevision = buildResultFile({
      ...emptyUnitRecord(unit.id), recordId: 'record-a',
      explanationRevisions: [{ id: 'rev-1', before: { ...explanation, claim: { bad: true } }, after: explanation, reason: '수정', feedbackIds: [], createdAt: '2026-11-28T09:00:00Z' }],
    }, unit);

    expect(parseResultFile(JSON.stringify(malformedFeedback))).toMatchObject({ ok: false, reason: 'bad-shape' });
    expect(parseResultFile(JSON.stringify(malformedRevision))).toMatchObject({ ok: false, reason: 'bad-shape' });
  });

  it('normalizes malformed optional feedback state without adding fields to older records', () => {
    const malformed = normalizeUnitRecord(unit.id, {
      teacherFeedbacks: [{ feedbackId: 7, comments: 'bad' }],
      feedbackResponses: [{ feedbackId: 'feedback-1', status: 'unknown', reason: 8, questionRevisionIds: 'bad' }],
      explanationRevisions: 'bad',
      pendingExplanationRevision: { before: { claim: { bad: true } } },
    });
    const oldRecord = normalizeUnitRecord('02-01', { displayName: '학생' });

    expect(malformed.teacherFeedbacks).toEqual([]);
    expect(malformed.feedbackResponses).toEqual([]);
    expect(malformed.explanationRevisions).toEqual([]);
    expect(malformed.pendingExplanationRevision).toBeUndefined();
    expect(oldRecord).not.toHaveProperty('teacherFeedbacks');
    expect(oldRecord).not.toHaveProperty('feedbackResponses');
    expect(oldRecord).not.toHaveProperty('explanationRevisions');
    expect(oldRecord).not.toHaveProperty('pendingExplanationRevision');
  });

  it('imports an internally consistent earlier snapshot without replacing newer student wording', () => {
    const earlier = feedback({ sourceSnapshot: {
      questions: [{ ...question, text: '교사가 초안에서 본 질문' }],
      explanation: { questionId: 'q1', claim: '초안 주장', reasoning: '초안 설명', evidenceIds: [] },
    } });
    const record = { ...emptyUnitRecord(unit.id), recordId: 'record-a', questions: [{ ...question, text: '학생이 나중에 고친 질문' }], explanation: { ...explanation, claim: '나중에 고친 주장' } };

    const imported = importFeedbackFile(record, earlier, unit.id);

    expect(imported.ok).toBe(true);
    expect(imported.record.questions[0].text).toBe('학생이 나중에 고친 질문');
    expect(imported.record.explanation.claim).toBe('나중에 고친 주장');
    expect(imported.record.teacherFeedbacks[0].sourceSnapshot.questions[0].text).toBe('교사가 초안에서 본 질문');
  });

  it('imports feedback when an unrelated empty snapshot question was later removed', () => {
    const emptyQuestion = { id: 'q-empty', text: '' };
    const earlier = feedback({ sourceSnapshot: {
      questions: [question, emptyQuestion], explanation,
    } });
    const record = { ...emptyUnitRecord(unit.id), recordId: 'record-a', questions: [question], explanation };

    expect(importFeedbackFile(record, earlier, unit.id)).toMatchObject({ ok: true });
  });

  it('rejects feedback when a comment target or explanation question is missing from the current record', () => {
    const record = { ...emptyUnitRecord(unit.id), recordId: 'record-a', questions: [question], explanation };
    const missingCommentTarget = feedback({
      comments: [{ questionId: 'q-deleted', text: '확인해 보세요.' }],
      sourceSnapshot: { questions: [question, { id: 'q-deleted', text: '삭제된 질문' }], explanation },
    });
    const missingExplanationQuestion = feedback({
      sourceSnapshot: {
        questions: [question, { id: 'q-deleted', text: '삭제된 질문' }],
        explanation: { ...explanation, questionId: 'q-deleted' },
      },
    });

    expect(importFeedbackFile(record, missingCommentTarget, unit.id)).toMatchObject({ ok: false, reason: 'bad-reference' });
    expect(importFeedbackFile(record, missingExplanationQuestion, unit.id)).toMatchObject({ ok: false, reason: 'bad-reference' });
  });

  it('omits empty questions from a newly exported feedback snapshot', () => {
    const student = { recordId: 'record-a', questions: [question, { id: 'q-empty', text: '  ' }], explanation };

    const file = buildFeedbackFile(student, unit.id, [{ questionId: 'q1', text: '자료를 확인해 보세요.' }], new Date('2026-11-28T09:00:00Z'));

    expect(file.sourceSnapshot.questions).toEqual([question]);
  });

  it('lets a teacher export a question comment tied to the student record and source snapshot', async () => {
    let blob;
    let downloadName = '';
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn((value) => { blob = value; return 'blob:feedback'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function click() { downloadName = this.download; });
    const book = makeBook();
    const storage = memoryStorage();
    render(<BookProvider book={book} storage={storage}><TeacherPage unitId="01-01" /></BookProvider>);
    const student = { ...emptyUnitRecord('01-01'), recordId: 'record-a', displayName: '7번', questions: [question], explanation };
    const text = JSON.stringify(buildResultFile(student, book.units[0], new Date('2026-11-28T08:00:00Z')));
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([text], 'student.json', { type: 'application/json' })] } });
    await screen.findByText('7번');
    fireEvent.click(screen.getByText('7번'));
    fireEvent.change(screen.getByLabelText('교사 코멘트: 무역은 왜 늘었을까?'), { target: { value: '자료의 범위와 시점을 근거와 함께 밝혀 보세요.' } });
    fireEvent.click(screen.getByRole('button', { name: '피드백 파일 내보내기' }));

    const exported = parseFeedbackFile(await blob.text());
    expect(exported.ok).toBe(true);
    expect(exported.value).toMatchObject({
      schema: 'gsng-teacher-feedback', schemaVersion: 1, recordId: 'record-a', unitId: '01-01',
      comments: [{ questionId: 'q1', text: '자료의 범위와 시점을 근거와 함께 밝혀 보세요.' }],
      sourceSnapshot: { questions: [{ id: 'q1', text: '무역은 왜 늘었을까?' }], explanation: { questionId: 'q1', claim: '무역 연결이 넓어졌다' } },
    });
    expect(exported.value.feedbackId).toBeTruthy();
    expect(downloadName).toBe('gsng-01-01-teacher-feedback-7번-record-a.json');
    expect(document.body.textContent).not.toContain('record-a');
  });

  it('keeps question comment controls unique when two same-name students are open', async () => {
    const book = makeBook();
    const records = ['record-a', 'record-b'].map((recordId) => {
      const student = { ...emptyUnitRecord(unit.id), recordId, displayName: '7번', questions: [{ ...question, selected: false }] };
      return JSON.stringify(buildResultFile(student, book.units[0]));
    });
    render(<BookProvider book={book} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: records.map((text, index) => new File([text], `student-${index}.json`, { type: 'application/json' })) } });
    await waitFor(() => expect(screen.getAllByText('7번')).toHaveLength(2));
    screen.getAllByText('7번').forEach((summary) => fireEvent.click(summary));
    const commentFields = screen.getAllByLabelText('교사 코멘트: 무역은 왜 늘었을까?');

    expect(commentFields).toHaveLength(2);
    expect(new Set(commentFields.map((field) => field.id)).size).toBe(2);
    expect(document.body.textContent).not.toContain('record-a');
    expect(document.body.textContent).not.toContain('record-b');
  });

  it('shows four pilot activity answer labels from lesson configuration', async () => {
    const book = makeBook({ moduleLesson: true });
    const pilotUnit = book.units[0];
    pilotUnit.lessons[0].activity = { template: 'layer-compare', config: { fields: [{ id: 'same', label: '두 자료에서 같은 점' }] } };
    pilotUnit.lessons[1].activity = { template: 'decision-matrix', config: { options: [{ id: 'a', label: '교통 개선' }], criteria: [{ id: 'cost', label: '비용' }] } };
    pilotUnit.lessons[2].activity = { template: 'evidence-sort', config: { items: [{ id: 'growth', text: '세계 인구 증가' }], categories: [{ id: 'interpretation', label: '자료 해석' }] } };
    pilotUnit.lessons.push({ ...pilotUnit.lessons[2], id: 'lesson-01-01-4', index: 4, title: '절 4 제목', activity: { template: 'civic-hearing', fictional: true, config: { actors: [{ id: 'residents', label: '주민', place: '지역' }], levels: [{ id: 'local', label: '지역 수준', action: '지역 협의' }] } } });
    const student = {
      ...emptyUnitRecord(unit.id), recordId: 'record-a', displayName: '7번',
      activityState: {
        'lesson-01-01-1': { notes: { same: '무역 자료와 인터넷 자료가 함께 늘었다' } },
        'lesson-01-01-2': { choice: 'a', scores: { a: { cost: 2 } }, reason: '접근성이 좋아진다' },
        'lesson-01-01-3': { sorted: { growth: 'interpretation' }, reason: '해석 근거를 더 확인한다' },
        'lesson-01-01-4': { actorId: 'residents', levelId: 'local', action: '주민 의견을 듣는다' },
      },
    };
    const storage = memoryStorage();
    render(<BookProvider book={book} storage={storage}><TeacherPage unitId="01-01" /></BookProvider>);
    const text = JSON.stringify(buildResultFile(student, pilotUnit));
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([text], 'activities.json', { type: 'application/json' })] } });
    await screen.findByText('7번');
    fireEvent.click(screen.getByText('7번'));

    expect(screen.getByText(/^절 1 제목 · 활동 · 두 자료에서 같은 점$/)).toBeTruthy();
    expect(screen.getByText(/^절 2 제목 · 활동 · 고른 대안$/)).toBeTruthy();
    expect(screen.getByText(/^절 3 제목 · 활동 · 분류 응답 · 세계 인구 증가$/)).toBeTruthy();
    expect(screen.getByText(/^절 4 제목 · 가상 상황 활동 · 고른 관점$/)).toBeTruthy();
    expect(screen.getByText(/무역 자료와 인터넷 자료가 함께 늘었다/)).toBeTruthy();
  });

  it('imports only a matching feedback file and leaves a legacy record unchanged on mismatch', async () => {
    const legacy = { ...emptyUnitRecord('01-01'), displayName: '7번', questions: [question], explanation, stageTimes: { export: '2026-11-28T08:00:00.000Z' } };
    const { storage } = renderStudent(legacy);
    const before = storage.data[STORAGE_KEY_V4];
    const file = new File([JSON.stringify(feedback())], 'feedback.json', { type: 'application/json' });
    fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText(/이 학습 기록에 해당하지 않는 피드백 파일입니다/)).toBeTruthy());
    expect(storage.data[STORAGE_KEY_V4]).toBe(before);
    expect(screen.queryByText('자료의 범위와 시점을 근거와 함께 밝혀 보세요.')).toBeNull();
  });

  it('imports a matching feedback file without rewriting the student question or explanation', async () => {
    const { storage } = renderStudent({ recordId: 'record-a', displayName: '7번', questions: [question], explanation });
    fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [new File([JSON.stringify(feedback())], 'feedback.json', { type: 'application/json' })] } });

    expect(await screen.findAllByText('자료의 범위와 시점을 근거와 함께 밝혀 보세요.')).toHaveLength(1);
    const imported = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];
    expect(imported.recordId).toBe('record-a');
    expect(imported.questions[0].text).toBe(question.text);
    expect(imported.questions[0].revisions).toBeUndefined();
    expect(imported.explanation).toMatchObject(explanation);
    expect(imported.teacherFeedbacks).toHaveLength(1);
  });

  it('ignores a duplicate feedbackId without writing the student record twice', async () => {
    const { storage } = renderStudent({ recordId: 'record-a', questions: [question], explanation });
    const setItem = vi.spyOn(storage, 'setItem');
    const upload = () => fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [new File([JSON.stringify(feedback())], 'feedback.json', { type: 'application/json' })] } });
    upload();
    await waitFor(() => expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].teacherFeedbacks).toHaveLength(1));
    const savedAfterFirstImport = storage.data[STORAGE_KEY_V4];
    const writesAfterFirstImport = setItem.mock.calls.length;

    upload();
    await waitFor(() => expect(screen.getByText('이미 가져온 피드백 파일입니다.')).toBeTruthy());

    expect(setItem).toHaveBeenCalledTimes(writesAfterFirstImport);
    expect(storage.data[STORAGE_KEY_V4]).toBe(savedAfterFirstImport);
  });

  it('requires a linked saved revision for applied and stores deferred as reason only', async () => {
    const { storage } = renderStudent({ recordId: 'record-a', questions: [question], explanation, teacherFeedbacks: [feedback()] });
    fireEvent.change(screen.getByLabelText('피드백 응답 이유'), { target: { value: '설명을 더 확인한 뒤 결정한다' } });
    fireEvent.click(screen.getByRole('button', { name: '반영했다고 기록' }));
    await screen.findByText('이 피드백을 연결해 질문이나 설명을 먼저 수정 기록으로 저장하세요.');
    expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].feedbackResponses).toBeUndefined();

    fireEvent.click(screen.getByRole('button', { name: '나중에 살펴보기로 기록' }));
    await waitFor(() => expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].feedbackResponses).toHaveLength(1));
    expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].feedbackResponses[0]).toMatchObject({
      feedbackId: 'feedback-file-1', status: 'deferred', reason: '설명을 더 확인한 뒤 결정한다', questionRevisionIds: [], explanationRevisionIds: [],
    });
  });

  it('keeps a legacy result readable but does not offer teacher feedback export', async () => {
    const book = makeBook();
    const legacy = { ...emptyUnitRecord(unit.id), displayName: '옛 결과', questions: [question] };
    render(<BookProvider book={book} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([JSON.stringify(buildResultFile(legacy, book.units[0]))], 'legacy.json', { type: 'application/json' })] } });
    await screen.findByText('옛 결과');
    fireEvent.click(screen.getByText('옛 결과'));

    expect(screen.getByText(/이전 형식 결과에는 안정적인 학생 기록 표시가 없습니다/)).toBeTruthy();
    expect(screen.queryByRole('button', { name: '피드백 파일 내보내기' })).toBeNull();
  });

  it('reuses the visible saved reason when changing a deferred response to applied', async () => {
    const savedReason = '질문 수정에 자료 범위를 반영했다';
    const revision = { id: 'question-revision-1', before: question.text, after: '무역 자료 범위를 살피는 질문', reason: savedReason, source: 'student', evidenceIds: [], feedbackIds: ['feedback-file-1'], createdAt: '2026-11-28T10:00:00.000Z' };
    const deferred = { id: 'response-1', feedbackId: 'feedback-file-1', status: 'deferred', reason: savedReason, questionRevisionIds: [], explanationRevisionIds: [], createdAt: '2026-11-28T10:00:00.000Z' };
    const { storage } = renderStudent({ recordId: 'record-a', questions: [{ ...question, revisions: [revision] }], explanation, teacherFeedbacks: [feedback()], feedbackResponses: [deferred] });

    fireEvent.click(screen.getByRole('button', { name: '반영했다고 기록' }));

    await waitFor(() => expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].feedbackResponses[0].status).toBe('applied'));
    expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].feedbackResponses[0]).toMatchObject({
      id: 'response-1', feedbackId: 'feedback-file-1', status: 'applied', reason: savedReason,
      questionRevisionIds: ['question-revision-1'], explanationRevisionIds: [],
    });
  });

  it('keeps the explanation before-state through stage unmount before the explicit feedback save', async () => {
    const initialClaim = explanation.claim;
    const nextClaim = '무역 비중만으로 생활 수준을 단정할 수 없다';
    const savedClaim = '소득과 분배 자료도 함께 살펴야 한다';
    const { storage, unmount } = renderStudent({
      recordId: 'record-a', questions: [question], evidence: [{ id: 'e1', questionId: 'q1', note: '무역 비중 변화 자료' }],
      explanation, teacherFeedbacks: [feedback()],
    });

    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: nextClaim } });
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    unmount();
    const book = makeBook();
    render(<BookProvider book={book} storage={storage}><UnitClosing unit={book.units[0]} /></BookProvider>);
    fireEvent.click(screen.getByRole('button', { name: /1\. 설명하기/ }));
    fireEvent.click(screen.getByLabelText('설명 피드백 연결: 자료의 범위와 시점을 근거와 함께 밝혀 보세요.'));
    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: savedClaim } });
    fireEvent.change(screen.getByLabelText('설명 수정한 까닭'), { target: { value: '자료의 범위를 구분해 설명을 고쳤다' } });
    fireEvent.click(screen.getByRole('button', { name: '설명 수정 기록 저장' }));

    const saved = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];
    expect(saved.explanationRevisions).toHaveLength(1);
    expect(saved.explanationRevisions[0]).toMatchObject({ before: { ...explanation, claim: nextClaim }, after: { questionId: 'q1', claim: savedClaim }, reason: '자료의 범위를 구분해 설명을 고쳤다', feedbackIds: ['feedback-file-1'] });
    expect(saved.explanationRevisions[0].before.claim).not.toBe(initialClaim);
  });

  it('uses the completed explanation as before after an empty-start draft is exported and feedback is imported', async () => {
    const initial = { questionId: 'q1', claim: '처음 저장한 주장', reasoning: '처음 저장한 설명', evidenceIds: ['e1'] };
    let blob;
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn((value) => { blob = value; return 'blob:initial-explanation'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const { storage } = renderStudent({
      recordId: 'record-a', questions: [question], evidence: [{ id: 'e1', questionId: 'q1', note: '무역 비중 변화 자료' }],
      explanation: { questionId: 'q1', claim: '', reasoning: '', evidenceIds: [] },
      stageTimes: {},
    });

    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: initial.claim } });
    fireEvent.click(screen.getByLabelText('무역 비중 변화 자료'));
    fireEvent.change(screen.getByLabelText('근거와 주장을 잇는 설명'), { target: { value: initial.reasoning } });
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    await screen.findByRole('heading', { name: '질문 다시 다듬기' });
    await waitFor(() => expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(false));
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    fireEvent.change(screen.getByLabelText('새 사례에 적용한 설명'), { target: { value: '새 사례에 적용한다' } });
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    fireEvent.change(screen.getByLabelText('질문이 어떻게 바뀌었고, 무엇을 새로 알게 되었는지'), { target: { value: '자료를 근거로 질문을 좁혔다' } });
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    fireEvent.click(screen.getByRole('button', { name: '결과 파일 내보내기' }));
    await blob.text();

    const returnedFeedback = feedback({ sourceSnapshot: { questions: [question], explanation: initial } });
    fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [new File([JSON.stringify(returnedFeedback)], 'feedback.json', { type: 'application/json' })] } });
    await screen.findByText('교사 피드백 파일을 가져왔습니다. 원래 질문과 설명은 자동으로 바뀌지 않습니다.');
    fireEvent.click(screen.getByRole('button', { name: /1\. 설명하기/ }));
    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: '피드백 뒤에 다시 쓴 주장' } });
    fireEvent.change(screen.getByLabelText('설명 수정한 까닭'), { target: { value: '교사 의견을 반영해 설명을 고쳤다' } });
    fireEvent.click(screen.getByRole('button', { name: '설명 수정 기록 저장' }));

    expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].explanationRevisions[0].before).toEqual(initial);
  });

  it('does not write for wrong-unit, wrong-question, duplicate, malformed, or student-result inputs', async () => {
    const cases = [
      ['another student', feedback({ recordId: 'record-other' })],
      ['another unit', feedback({ unitId: '03-01' })],
      ['missing target', feedback({ comments: [{ questionId: 'q-missing', text: '잘못된 대상' }] })],
      ['malformed snapshot field', feedback({ sourceSnapshot: { questions: [{ ...question, selectedVersion: 'converted', convertedText: { bad: true } }], explanation } })],
      ['broken JSON', '{'],
      ['student result file', JSON.stringify(buildResultFile({ ...emptyUnitRecord(unit.id), recordId: 'record-a', questions: [question] }, unit))],
    ];
    for (const [name, content] of cases) {
      const record = { recordId: 'record-a', questions: [question], explanation };
      const { storage, unmount } = renderStudent(record);
      const before = storage.data[STORAGE_KEY_V4];
      const fileText = typeof content === 'string' ? content : JSON.stringify(content);
      fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [new File([fileText], `${name}.json`, { type: 'application/json' })] } });
      await screen.findByRole('status');
      expect(storage.data[STORAGE_KEY_V4]).toBe(before);
      expect(JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].teacherFeedbacks).toBeUndefined();
      unmount();
    }
  });

  it('records feedback-linked question and explanation revisions before marking feedback applied', async () => {
    let blob;
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn((value) => { blob = value; return 'blob:result'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const initial = {
      recordId: 'record-a', displayName: '7번', questions: [question],
      evidence: [{ id: 'e1', questionId: 'q1', note: '무역 비중 변화 자료' }], explanation,
      revisedQuestion: question.text, stageTimes: { explain: '2026-11-28T08:00:00.000Z', export: '2026-11-28T08:00:00.000Z' },
    };
    const { storage, unmount } = renderStudent(initial);
    fireEvent.change(screen.getByLabelText('교사 피드백 파일 고르기'), { target: { files: [new File([JSON.stringify(feedback())], 'feedback.json', { type: 'application/json' })] } });
    expect(await screen.findAllByText('자료의 범위와 시점을 근거와 함께 밝혀 보세요.')).toHaveLength(2);

    fireEvent.click(screen.getByLabelText('교사 피드백 연결: 자료의 범위와 시점을 근거와 함께 밝혀 보세요.'));
    fireEvent.change(screen.getByLabelText(`질문 수정: ${question.text}`), { target: { value: '무역 비중이 생활 수준과 연결되는 조건은 무엇일까?' } });
    fireEvent.change(screen.getByLabelText(`수정한 까닭: ${question.text}`), { target: { value: '자료의 범위와 비교 조건을 밝혀 질문을 좁혔다' } });
    fireEvent.click(screen.getByRole('button', { name: `질문 수정 저장: ${question.text}` }));

    fireEvent.click(screen.getByRole('button', { name: /1\. 설명하기/ }));
    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: '무역 비중만으로 생활 수준을 단정할 수 없다' } });
    fireEvent.change(screen.getByLabelText('근거와 주장을 잇는 설명'), { target: { value: '비교하려면 소득과 분배의 다른 자료도 살펴야 한다' } });
    fireEvent.click(screen.getByLabelText('설명 피드백 연결: 자료의 범위와 시점을 근거와 함께 밝혀 보세요.'));
    fireEvent.change(screen.getByLabelText('설명 수정한 까닭'), { target: { value: '교사 코멘트를 참고해 근거가 보여 주는 범위를 구분했다' } });
    fireEvent.click(screen.getByRole('button', { name: '설명 수정 기록 저장' }));
    fireEvent.change(screen.getByLabelText('피드백 응답 이유'), { target: { value: '질문과 설명을 자료 범위에 맞게 고쳤다' } });
    fireEvent.click(screen.getByRole('button', { name: '반영했다고 기록' }));

    const saved = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];
    const response = saved.feedbackResponses[0];
    expect(saved.questions[0].text).toBe(question.text);
    expect(saved.questions[0].revisions[0].feedbackIds).toEqual(['feedback-file-1']);
    expect(saved.explanationRevisions[0]).toMatchObject({ before: explanation, after: { questionId: 'q1', claim: '무역 비중만으로 생활 수준을 단정할 수 없다' }, feedbackIds: ['feedback-file-1'] });
    expect(response).toMatchObject({ status: 'applied', feedbackId: 'feedback-file-1', questionRevisionIds: [saved.questions[0].revisions[0].id], explanationRevisionIds: [saved.explanationRevisions[0].id] });

    fireEvent.click(screen.getByRole('button', { name: /5\. 결과 파일/ }));
    fireEvent.click(screen.getByRole('button', { name: '결과 파일 내보내기' }));
    const resultText = await blob.text();
    const exported = parseResultFile(resultText);
    expect(exported.ok).toBe(true);
    expect(exported.value).toMatchObject({
      recordId: 'record-a', teacherFeedbacks: [feedback()], feedbackResponses: [response],
      explanationRevisions: saved.explanationRevisions,
      questions: [{ id: 'q1', text: question.text, revisions: saved.questions[0].revisions }],
    });

    unmount();
    const teacherBook = makeBook();
    render(<BookProvider book={teacherBook} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([resultText], '7번-재제출.json', { type: 'application/json' })] } });
    await screen.findByText('7번');
    fireEvent.click(screen.getByText('7번'));
    const detail = screen.getByText('7번').closest('details');
    expect(detail.textContent).toContain('무역은 왜 늘었을까? → 무역 비중이 생활 수준과 연결되는 조건은 무엇일까?');
    expect(detail.textContent).toContain('무역 연결이 넓어졌다 → 무역 비중만으로 생활 수준을 단정할 수 없다');
    expect(detail.textContent).toContain('질문과 설명을 자료 범위에 맞게 고쳤다');
    expect(detail.textContent).toContain('자료의 범위와 시점을 근거와 함께 밝혀 보세요.');
  });
});
