import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BookProvider } from '../src/book/BookContext.jsx';
import UnitOpening, { canShowCarryOver, maxOpeningStage } from '../src/book/qft/UnitOpening.jsx';
import { STORAGE_KEY_V4, emptyUnitRecord } from '../src/storage/unitRecords.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

function bookWithSecondUnit() {
  const book = makeBook();
  const second = { ...book.units[0], id: '01-02', title: '지역 변화의 역동성', concepts: ['scale'] };
  book.units.push(second);
  return book;
}

function renderOpening({ unitIndex = 0, storage = memoryStorage(), book = makeBook() } = {}) {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
  const utils = render(<BookProvider book={book} storage={storage}><UnitOpening unit={book.units[unitIndex]} /></BookProvider>);
  return { ...utils, storage };
}

const saved = (storage, unitId = '01-01') => JSON.parse(storage.data[STORAGE_KEY_V4]).units[unitId];

afterEach(() => vi.unstubAllGlobals());

describe('UnitOpening', () => {
  it('shows no example questions before the first question', () => {
    const { container } = renderOpening();
    expect(container.textContent).not.toMatch(/[?？]/);
    expect(screen.getByRole('heading', { level: 1, name: '세계화와 세계시민' })).toBeTruthy();
  });

  it('records questions as they are produced, edited and removed', () => {
    const { storage } = renderOpening();
    fireEvent.click(screen.getByRole('button', { name: '선생님 안내에 따라 시작' }));
    fireEvent.change(screen.getByLabelText('질문 1'), { target: { value: '왜 무역이 늘었을까' } });
    fireEvent.click(screen.getByRole('button', { name: '질문 추가' }));
    fireEvent.change(screen.getByLabelText('질문 2'), { target: { value: '누가 이익을 볼까' } });
    expect(saved(storage).questions.map((q) => q.text)).toEqual(['왜 무역이 늘었을까', '누가 이익을 볼까']);
    fireEvent.click(screen.getByRole('button', { name: '질문 2 지우기' }));
    expect(saved(storage).questions.map((q) => q.text)).toEqual(['왜 무역이 늘었을까']);
    expect(saved(storage).stageTimes.rules).toBeTruthy();
  });

  it('requires classifying and changing a question before prioritizing', () => {
    const record = { ...emptyUnitRecord('01-01'), questions: [{ id: 'q1', text: '무역 비중은 얼마일까', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [] }], stageTimes: { rules: 't', produce: 't' } };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    renderOpening({ storage });
    const next = screen.getByRole('button', { name: '다음 단계' });
    expect(next.disabled).toBe(true);
    fireEvent.click(screen.getByLabelText('닫힌 질문'));
    fireEvent.change(screen.getByLabelText('열린 질문으로 바꾸기'), { target: { value: '무역 비중이 나라마다 다른 까닭은 무엇일까' } });
    expect(saved(storage).questions[0]).toMatchObject({ classification: '닫힌', convertedType: '열린' });
    expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(false);
  });

  it('allows one to three priority questions with a reason', () => {
    const q = (id) => ({ id, text: `질문 ${id}`, classification: '열린', convertedType: '닫힌', convertedText: `바꾼 ${id}`, selectedVersion: 'original', selected: false, conceptTags: [] });
    const record = { ...emptyUnitRecord('01-01'), questions: ['a', 'b', 'c', 'd'].map(q), stageTimes: { rules: 't', produce: 't', improve: 't' } };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    renderOpening({ storage });
    const boxes = screen.getAllByRole('checkbox');
    boxes.forEach((box) => fireEvent.click(box));
    expect(saved(storage).questions.filter((item) => item.selected)).toHaveLength(3);
    fireEvent.change(screen.getByLabelText('이 질문들을 고른 까닭'), { target: { value: '자료로 답할 수 있어서' } });
    expect(screen.getByRole('button', { name: '다음 단계' }).disabled).toBe(false);
  });

  it('needs a concept tag per priority question and a plan line', () => {
    const record = { ...emptyUnitRecord('01-01'), questions: [{ id: 'q1', text: '질문', classification: '열린', convertedType: '닫힌', convertedText: '바꾼', selectedVersion: 'original', selected: true, conceptTags: [] }], priorityReason: '까닭 적음', stageTimes: { rules: 't', produce: 't', improve: 't', prioritize: 't' } };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    renderOpening({ storage });
    expect(screen.queryByRole('link', { name: /절 1/ })).toBeNull();
    fireEvent.click(screen.getByLabelText('상호의존'));
    fireEvent.change(screen.getByLabelText('어떤 자료와 절에서 찾아볼지'), { target: { value: '무역 통계를 본다' } });
    expect(saved(storage).questions[0].conceptTags).toEqual(['interdependence']);
    expect(screen.getByRole('link', { name: /절 1/ }).getAttribute('href')).toBe('#/u/01-01/l/1');
  });

  it('reveals carried-over questions and the external AI link only after a first question', () => {
    const previous = { ...emptyUnitRecord('01-01'), questions: [{ id: 'p1', text: '지난 질문', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: [] }] };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': previous } }) });
    renderOpening({ storage, book: bookWithSecondUnit(), unitIndex: 1 });
    expect(screen.queryByText('지난 질문')).toBeNull();
    expect(screen.queryByRole('link', { name: /외부 AI/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '선생님 안내에 따라 시작' }));
    fireEvent.change(screen.getByLabelText('질문 1'), { target: { value: '새 질문' } });
    expect(screen.getByText('지난 질문')).toBeTruthy();
    expect(screen.getByRole('link', { name: /외부 AI/ })).toBeTruthy();
  });
});

describe('stage rules', () => {
  it('canShowCarryOver needs a non-empty question', () => {
    expect(canShowCarryOver(emptyUnitRecord('01-01'))).toBe(false);
    expect(canShowCarryOver({ ...emptyUnitRecord('01-01'), questions: [{ text: ' ' }] })).toBe(false);
    expect(canShowCarryOver({ ...emptyUnitRecord('01-01'), questions: [{ text: 'a' }] })).toBe(true);
  });

  it('maxOpeningStage follows completed stage times', () => {
    expect(maxOpeningStage(emptyUnitRecord('01-01'))).toBe(0);
    expect(maxOpeningStage({ ...emptyUnitRecord('01-01'), stageTimes: { rules: 't' } })).toBe(1);
  });
});
