import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BookProvider } from '../src/book/BookContext.jsx';
import UnitClosing from '../src/book/close/UnitClosing.jsx';
import * as questionApi from '../src/book/qft/questions.js';
import * as unitRecordApi from '../src/storage/unitRecords.js';
import { buildResultFile, parseResultFile } from '../src/storage/resultFile.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

describe('question history', () => {
  it('starts new questions with their initial text and a student-reported origin', () => {
    expect(questionApi.newQuestion('왜 무역이 늘었을까')).toMatchObject({
      text: '왜 무역이 늘었을까', initialText: '왜 무역이 늘었을까', origin: 'student', revisions: [],
    });
  });

  it('shows the most recent valid saved revision before the selected version', () => {
    const question = {
      text: '처음 질문', selectedVersion: 'converted', convertedText: '기존에 고른 질문',
      revisions: [
        { before: '기존에 고른 질문', after: '첫 저장 문장', reason: '범위를 좁힘' },
        { before: '첫 저장 문장', after: '마지막 저장 문장', reason: '근거에 맞춤' },
      ],
    };
    expect(questionApi.questionText(question)).toBe('마지막 저장 문장');
  });

  it('ignores malformed revisions instead of crashing while choosing the visible question', () => {
    const question = {
      text: '처음 질문', selectedVersion: 'original',
      revisions: [
        { before: '처음 질문', after: '정상 수정 질문', reason: '범위를 좁힘' },
        { before: '정상 수정 질문', after: { bad: true }, reason: '형식이 잘못된 이전 기록' },
      ],
    };
    expect(questionApi.questionText(question)).toBe('정상 수정 질문');
  });

  it('keeps the original question and appends a valid explicit revision', () => {
    const record = {
      ...unitRecordApi.emptyUnitRecord('01-01'),
      questions: [{ id: 'q1', text: '처음 질문', initialText: '처음 질문', selectedVersion: 'original', selected: true, revisions: [] }],
    };
    const revised = typeof questionApi.reviseQuestion === 'function'
      ? questionApi.reviseQuestion(record, { questionId: 'q1', after: '자료에 맞춘 질문', reason: '근거가 가리키는 범위로 좁힘', feedbackIds: ['fb1'] }, new Date('2026-11-27T00:00:00Z'))
      : record;

    expect(revised.questions[0]).toMatchObject({
      id: 'q1', text: '처음 질문', initialText: '처음 질문',
      revisions: [{ before: '처음 질문', after: '자료에 맞춘 질문', reason: '근거가 가리키는 범위로 좁힘', source: 'student', evidenceIds: [], feedbackIds: ['fb1'], createdAt: '2026-11-27T00:00:00.000Z' }],
    });
    expect(questionApi.questionText(revised.questions[0])).toBe('자료에 맞춘 질문');
  });

  it('does not append an empty, unchanged, or unexplained revision', () => {
    const record = {
      ...unitRecordApi.emptyUnitRecord('01-01'),
      questions: [{ id: 'q1', text: '처음 질문', selectedVersion: 'original', selected: true, revisions: [] }],
    };
    const changes = [
      { questionId: 'q1', after: '', reason: '고침' },
      { questionId: 'q1', after: '처음 질문', reason: '같음' },
      { questionId: 'q1', after: '다른 질문', reason: '  ' },
    ];
    for (const change of changes) {
      const next = typeof questionApi.reviseQuestion === 'function'
        ? questionApi.reviseQuestion(record, change, new Date('2026-11-27T00:00:00Z'))
        : record;
      expect(next).toBe(record);
    }
  });
});

describe('pilot record identity and exported question history', () => {
  it('creates an opaque id only for pilot units and keeps it stable', () => {
    const isPilotUnit = unitRecordApi.isPilotUnit ?? (() => false);
    const ensurePilotRecordId = unitRecordApi.ensurePilotRecordId ?? ((unitId, value) => value);
    expect(isPilotUnit('01-01')).toBe(true);
    expect(isPilotUnit('03-01')).toBe(true);
    expect(isPilotUnit('01-02')).toBe(false);
    const record = { ...unitRecordApi.emptyUnitRecord('01-01'), displayName: '학생 이름' };
    const withId = ensurePilotRecordId('01-01', record);
    expect(withId.recordId).toBeTruthy();
    expect(withId.recordId).not.toBe('학생 이름');
    expect(ensurePilotRecordId('01-01', withId).recordId).toBe(withId.recordId);
    expect(ensurePilotRecordId('01-02', record)).toBe(record);
  });

  it('round-trips optional question and selection history in schema version 1', () => {
    const record = {
      ...unitRecordApi.emptyUnitRecord('03-01'),
      recordId: 'opaque-id',
      prioritySnapshot: { questions: [{ questionId: 'q1', text: '당시 질문' }], reason: '자료를 비교할 수 있어서', createdAt: '2026-11-27T00:00:00.000Z' },
      externalAiOpenings: [{ openedAt: '2026-11-27T00:01:00.000Z', selection: { questions: [{ questionId: 'q1', text: '당시 질문' }], reason: '자료를 비교할 수 있어서' } }],
      questions: [{ id: 'q1', text: '처음 질문', initialText: '처음 질문', origin: 'student', selectedVersion: 'original', selected: true, revisions: [{ id: 'r1', before: '처음 질문', after: '다듬은 질문', reason: '자료 범위 반영', source: 'student', evidenceIds: [], createdAt: '2026-11-27T00:00:30.000Z' }] }],
    };
    const normalized = unitRecordApi.normalizeUnitRecord('03-01', record);
    const file = buildResultFile(normalized, { id: '03-01', title: '인구' }, new Date('2026-11-27T00:02:00Z'));
    const parsed = parseResultFile(JSON.stringify(file));
    expect(file.schemaVersion).toBe(1);
    expect(parsed).toMatchObject({ ok: true, value: { recordId: 'opaque-id', prioritySnapshot: record.prioritySnapshot, externalAiOpenings: record.externalAiOpenings, questions: record.questions } });
  });

  it('does not infer an origin for legacy questions', () => {
    const question = unitRecordApi.normalizeUnitRecord('01-01', { questions: [{ id: 'old-q', text: '예전 질문' }] }).questions[0];
    expect(question).not.toHaveProperty('origin');
  });
});

describe('explicit revision editor', () => {
  it('saves a question revision only after a changed sentence and reason are entered', () => {
    const storage = memoryStorage({
      [unitRecordApi.STORAGE_KEY_V4]: JSON.stringify({
        version: 4,
        units: {
          '01-01': {
            ...unitRecordApi.emptyUnitRecord('01-01'),
            questions: [{ id: 'q1', text: '왜 무역이 늘었을까', initialText: '왜 무역이 늘었을까', selectedVersion: 'original', selected: true, revisions: [] }],
            evidence: [{ id: 'ev1', questionId: 'q1', lessonId: 'lesson-01-01-1', stepId: 'chart', note: '관세표를 비교했다' }],
            explanation: { questionId: 'q1', claim: '', reasoning: '', evidenceIds: [] },
            revisedQuestion: '탐구 뒤 대표 질문',
            stageTimes: { explain: 't' },
          },
        },
      }),
    });
    const book = makeBook();
    render(<BookProvider book={book} storage={storage}><UnitClosing unit={book.units[0]} /></BookProvider>);

    expect(screen.queryByLabelText('다듬은 질문')).toBeNull();
    const after = screen.getByLabelText('질문 수정: 왜 무역이 늘었을까');
    const reason = screen.getByLabelText('수정한 까닭: 왜 무역이 늘었을까');
    const save = screen.getByRole('button', { name: '질문 수정 저장: 왜 무역이 늘었을까' });
    expect(save.disabled).toBe(true);
    fireEvent.change(after, { target: { value: '자료로 확인할 수 있는 무역 변화는 무엇일까' } });
    expect(save.disabled).toBe(true);
    fireEvent.change(reason, { target: { value: '질문의 범위를 자료에서 확인 가능한 것으로 좁혔다' } });
    const source = screen.queryByLabelText('수정 출처: 왜 무역이 늘었을까');
    expect(source).toBeTruthy();
    if (source) fireEvent.change(source, { target: { value: 'external-ai' } });
    const evidence = screen.queryByLabelText('수정 근거: 관세표를 비교했다');
    expect(evidence).toBeTruthy();
    if (evidence) fireEvent.click(evidence);
    fireEvent.click(save);

    const stored = JSON.parse(storage.data[unitRecordApi.STORAGE_KEY_V4]).units['01-01'].questions[0];
    expect(stored).toMatchObject({
      id: 'q1', text: '왜 무역이 늘었을까', initialText: '왜 무역이 늘었을까',
      revisions: [{ before: '왜 무역이 늘었을까', after: '자료로 확인할 수 있는 무역 변화는 무엇일까', reason: '질문의 범위를 자료에서 확인 가능한 것으로 좁혔다', source: 'external-ai', evidenceIds: ['ev1'] }],
    });
    expect(JSON.parse(storage.data[unitRecordApi.STORAGE_KEY_V4]).units['01-01'].revisedQuestion).toBe('자료로 확인할 수 있는 무역 변화는 무엇일까');
    expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(false);
    fireEvent.click(screen.getByText('질문 이력 보기'));
    const history = screen.getByText('질문 이력 보기').closest('details');
    expect(history.textContent).toContain('질문의 범위를 자료에서 확인 가능한 것으로 좁혔다');
    expect(history.textContent).toContain('외부 AI 사용 (자기 보고)');
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    expect(screen.getByRole('heading', { name: '새 사례에 적용하기' })).toBeTruthy();
  });
});
