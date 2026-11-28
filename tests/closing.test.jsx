import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BookProvider } from '../src/book/BookContext.jsx';
import UnitClosing from '../src/book/close/UnitClosing.jsx';
import { STORAGE_KEY_V4, emptyUnitRecord } from '../src/storage/unitRecords.js';
import { parseResultFile } from '../src/storage/resultFile.js';
import { makeBook, memoryStorage, throwingStorage } from './fixtures/book.js';

const question = { id: 'q1', text: '무역은 왜 늘었을까', classification: '열린', convertedType: '닫힌', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: ['interdependence'] };
const evidence = { id: 'e1', questionId: 'q1', lessonId: 'lesson-01-01-1', stepId: 'l1s2', note: '무역 비중이 높아졌다' };

function renderClosing(record, storage) {
  const store = storage ?? memoryStorage(record ? { [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) } : {});
  const book = makeBook();
  render(<BookProvider book={book} storage={store}><UnitClosing unit={book.units[0]} /></BookProvider>);
  return store;
}

const saved = (storage) => JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];

afterEach(() => vi.unstubAllGlobals());

describe('UnitClosing', () => {
  it('blocks the explanation until evidence exists', () => {
    renderClosing({ ...emptyUnitRecord('01-01'), questions: [question] });
    expect(screen.getByText(/절에서 근거를 먼저 붙여 보세요/)).toBeTruthy();
    expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(true);
  });

  it('builds an explanation from a question, a claim, evidence and reasoning', () => {
    const storage = renderClosing({ ...emptyUnitRecord('01-01'), questions: [question], evidence: [evidence] });
    fireEvent.click(screen.getByLabelText('무역은 왜 늘었을까'));
    fireEvent.change(screen.getByLabelText('내 주장'), { target: { value: '연결이 넓어졌기 때문이다' } });
    fireEvent.click(screen.getByLabelText('무역 비중이 높아졌다'));
    fireEvent.change(screen.getByLabelText('근거와 주장을 잇는 설명'), { target: { value: '자료에서 비중이 늘었다' } });
    expect(saved(storage).explanation).toEqual({ questionId: 'q1', claim: '연결이 넓어졌기 때문이다', reasoning: '자료에서 비중이 늘었다', evidenceIds: ['e1'] });
    expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(false);
  });

  it('prefills the revised question with the original', () => {
    const storage = renderClosing({ ...emptyUnitRecord('01-01'), questions: [question], evidence: [evidence], explanation: { questionId: 'q1', claim: '주장 문장', reasoning: '설명 문장', evidenceIds: ['e1'] }, stageTimes: { explain: 't' } });
    expect(screen.getByLabelText('질문 수정: 무역은 왜 늘었을까').value).toBe('무역은 왜 늘었을까');
    expect(saved(storage).revisedQuestion).toBe('무역은 왜 늘었을까');
  });

  it('includes an unselected explanation question in the revision editor and keeps the saved final question visible', () => {
    const unselected = { ...question, selected: false };
    const storage = renderClosing({
      ...emptyUnitRecord('01-01'),
      questions: [unselected],
      explanation: { questionId: 'q1', claim: '주장 문장', reasoning: '설명 문장', evidenceIds: [] },
      revisedQuestion: '예전 최종 질문 문장',
      stageTimes: { explain: 't' },
    });

    expect(screen.getByText('예전 최종 질문 문장')).toBeTruthy();
    expect(screen.queryByLabelText('다듬은 질문')).toBeNull();
    const after = screen.queryByLabelText('질문 수정: 무역은 왜 늘었을까');
    expect(after).toBeTruthy();
    if (!after) return;
    fireEvent.change(after, { target: { value: '근거를 반영한 설명 대상 질문' } });
    fireEvent.change(screen.getByLabelText('수정한 까닭: 무역은 왜 늘었을까'), { target: { value: '설명에 사용한 근거를 좁혀 반영했다' } });
    fireEvent.click(screen.getByRole('button', { name: '질문 수정 저장: 무역은 왜 늘었을까' }));

    expect(saved(storage).questions[0].selected).toBe(false);
    expect(saved(storage).revisedQuestion).toBe('근거를 반영한 설명 대상 질문');
  });

  it('shows the unit transfer task without research-measure wording', () => {
    const { container } = (() => {
      const store = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': { ...emptyUnitRecord('01-01'), stageTimes: { explain: 't', revise: 't' } } } }) });
      const book = makeBook();
      return render(<BookProvider book={book} storage={store}><UnitClosing unit={book.units[0]} /></BookProvider>);
    })();
    expect(screen.getByText('새 지역 사례에 적용해 설명하기')).toBeTruthy();
    expect(container.textContent).not.toMatch(/사전|사후/);
  });

  it('exports a parseable result file even when storage is blocked', () => {
    let blob;
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn((value) => { blob = value; return 'blob:x'; }), revokeObjectURL: vi.fn() });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    renderClosing(null, throwingStorage);
    fireEvent.click(screen.getByRole('button', { name: /결과 파일/ }));
    fireEvent.change(screen.getByLabelText('표시명(번호나 별칭)'), { target: { value: '7번' } });
    fireEvent.click(screen.getByRole('button', { name: '결과 파일 내보내기' }));
    expect(click).toHaveBeenCalled();
    return blob.text().then((text) => {
      const parsed = parseResultFile(text);
      expect(parsed.ok).toBe(true);
      expect(parsed.value.displayName).toBe('7번');
    });
  });

  it('includes and persists a record id on the first export of a legacy pilot record', () => {
    let blob;
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn((value) => { blob = value; return 'blob:legacy-pilot'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const legacy = { ...emptyUnitRecord('01-01'), displayName: '7번' };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': legacy } }) });
    renderClosing(legacy, storage);

    fireEvent.click(screen.getByRole('button', { name: /결과 파일/ }));
    fireEvent.click(screen.getByRole('button', { name: '결과 파일 내보내기' }));

    return blob.text().then((text) => {
      const parsed = parseResultFile(text);
      expect(parsed.ok).toBe(true);
      expect(parsed.value.recordId).toBeTruthy();
      expect(saved(storage).recordId).toBe(parsed.value.recordId);
    });
  });

  it('offers a question-specific revision editor for a lesson-born question', () => {
    const born = { ...question, id: 'q2', text: '인구는 왜 줄까', selected: false, fromLessonId: 'lesson-01-01-2' };
    renderClosing({ ...emptyUnitRecord('01-01'), questions: [question, born], evidence: [evidence], explanation: { questionId: 'q1', claim: '주장 문장', reasoning: '설명 문장', evidenceIds: ['e1'] }, stageTimes: { explain: 't' } });
    expect(screen.getByLabelText('질문 수정: 인구는 왜 줄까').value).toBe('인구는 왜 줄까');
  });

  it('hides the lesson-born list when there are none', () => {
    renderClosing({ ...emptyUnitRecord('01-01'), questions: [question], evidence: [evidence], explanation: { questionId: 'q1', claim: '주장 문장', reasoning: '설명 문장', evidenceIds: ['e1'] }, stageTimes: { explain: 't' } });
    expect(screen.queryByText('학습하며 생긴 질문')).toBeNull();
  });
});

