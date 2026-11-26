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
    renderClosing({ ...emptyUnitRecord('01-01'), questions: [question], evidence: [evidence], explanation: { questionId: 'q1', claim: '주장 문장', reasoning: '설명 문장', evidenceIds: ['e1'] }, stageTimes: { explain: 't' } });
    expect(screen.getByLabelText('다듬은 질문').value).toBe('무역은 왜 늘었을까');
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
});
