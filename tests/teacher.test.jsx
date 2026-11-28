import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { summarizeResults } from '../src/teacher/summarize.js';
import TeacherPage from '../src/teacher/TeacherPage.jsx';
import { BookProvider } from '../src/book/BookContext.jsx';
import { buildResultFile } from '../src/storage/resultFile.js';
import { emptyUnitRecord } from '../src/storage/unitRecords.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

const concepts = makeBook().concepts;
const unit = { id: '01-01', title: '세계화와 세계시민' };

function result(displayName, overrides = {}, exportedAt = '2026-11-27T00:00:00Z') {
  const record = {
    ...emptyUnitRecord('01-01'),
    displayName,
    questions: [
      { id: 'a', text: '닫힌 질문', classification: '닫힌', convertedType: '열린', convertedText: '바꾼 열린 질문', selectedVersion: 'converted', selected: true, conceptTags: ['mutual-dependence'] },
      { id: 'b', text: '열린 질문', classification: '열린', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [] },
      { id: 'c', text: '미분류 질문', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [] },
    ],
    explanation: { questionId: 'a', claim: '주장', reasoning: '설명', evidenceIds: ['e1'] },
    ...overrides,
  };
  return { name: `${displayName}.json`, text: JSON.stringify(buildResultFile(record, unit, new Date(exportedAt))) };
}

describe('summarizeResults', () => {
  it('skips invalid files with reasons', () => {
    const files = [result('1번'), result('2번'), { name: 'broken.json', text: '{' }, { name: 'other.json', text: '{"schema":"x"}' }, { ...result('3번'), text: result('3번').text.replace('"unitId": "01-01"', '"unitId": "02-01"').replace('"unitId":"01-01"', '"unitId":"02-01"') }];
    const summary = summarizeResults(files, '01-01', concepts);
    expect(summary.students.map((s) => s.displayName)).toEqual(['1번', '2번']);
    expect(summary.skipped).toEqual([
      { name: 'broken.json', reason: 'not-json' },
      { name: 'other.json', reason: 'wrong-schema' },
      { name: '3번.json', reason: 'other-unit' },
    ]);
  });

  it('keeps latest duplicate', () => {
    const older = result('1번', { revisedQuestion: '옛' }, '2026-11-27T00:00:00Z');
    const newer = { ...result('1번', { revisedQuestion: '새' }, '2026-11-28T00:00:00Z'), name: '1번 (1).json' };
    const summary = summarizeResults([newer, older], '01-01', concepts);
    expect(summary.students).toHaveLength(1);
    expect(summary.students[0].revisedQuestion).toBe('새');
    expect(summary.skipped).toEqual([{ name: '1번.json', reason: 'duplicate-older' }]);
  });

  it('deduplicates an older legacy export with the same student’s recordId export', () => {
    const legacy = result('7번', { revisedQuestion: '옛 파일' }, '2026-11-27T00:00:00Z');
    const current = result('7번', { recordId: 'record-7', revisedQuestion: '새 파일' }, '2026-11-28T00:00:00Z');

    for (const files of [[legacy, current], [current, legacy]]) {
      const summary = summarizeResults(files, '01-01', concepts);
      expect(summary.students).toHaveLength(1);
      expect(summary.students[0]).toMatchObject({ recordId: 'record-7', revisedQuestion: '새 파일' });
      expect(summary.skipped.map(({ reason }) => reason)).toEqual(['duplicate-older']);
    }
  });

  it('counts closed, open and unclassified questions', () => {
    expect(summarizeResults([result('1번'), result('2번')], '01-01', concepts).closedOpen).toEqual({ closed: 2, open: 2, unclassified: 2 });
  });

  it('merges alias concept tags into canonical ids', () => {
    expect(summarizeResults([result('1번')], '01-01', concepts).conceptCounts).toEqual({ interdependence: 1 });
  });

  it('lists students whose explanation has no evidence', () => {
    const summary = summarizeResults([result('1번'), result('2번', { explanation: { questionId: 'a', claim: '주장', reasoning: '설명', evidenceIds: [] } })], '01-01', concepts);
    expect(summary.unsupported).toEqual(['2번']);
  });

  it('lists priority questions in their chosen version', () => {
    expect(summarizeResults([result('1번')], '01-01', concepts).priorityQuestions).toEqual([{ displayName: '1번', text: '바꾼 열린 질문' }]);
  });

  it('rejects a malformed selected question instead of crashing teacher collection', () => {
    const file = result('깨진 질문', {
      questions: [{ id: 'q1', text: '질문', selected: true, selectedVersion: 'converted', convertedText: { bad: true }, conceptTags: [] }],
    });

    const summary = summarizeResults([file], '01-01', concepts);

    expect(summary.students).toEqual([]);
    expect(summary.skipped).toEqual([{ name: file.name, reason: 'bad-shape' }]);
  });

  it.each([
    ['selected', { selected: { bad: true } }],
    ['selectedVersion', { selectedVersion: { bad: true } }],
    ['convertedText', { selectedVersion: 'converted', convertedText: { bad: true } }],
    ['classification', { classification: { bad: true } }],
    ['convertedType', { convertedType: 1 }],
    ['initialText', { initialText: { bad: true } }],
    ['origin', { origin: ['student'] }],
    ['conceptTags', { conceptTags: [{}] }],
    ['revisions', { revisions: [{ id: 'r1', before: {}, after: '수정', reason: '까닭', source: 'student', evidenceIds: [], createdAt: '2026-11-28T00:00:00Z' }] }],
  ])('skips malformed question %s values at the result file boundary', (_field, patch) => {
    const file = result('형식 오류', {
      questions: [{ id: 'q1', text: '질문', selected: true, selectedVersion: 'original', conceptTags: [], ...patch }],
    });

    const summary = summarizeResults([file], '01-01', concepts);

    expect(summary.students).toEqual([]);
    expect(summary.skipped).toEqual([{ name: file.name, reason: 'bad-shape' }]);
  });

  it('accepts legacy questions when newer optional question fields are absent', () => {
    const file = result('이전 결과', { questions: [{ id: 'q1', text: '이전 질문', selected: true }] });

    const summary = summarizeResults([file], '01-01', concepts);

    expect(summary.skipped).toEqual([]);
    expect(summary.priorityQuestions).toEqual([{ displayName: '이전 결과', text: '이전 질문' }]);
  });
});

describe('TeacherPage', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reads dropped files in memory without network or storage writes', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const storage = memoryStorage();
    const setItem = vi.spyOn(storage, 'setItem');
    render(<BookProvider book={makeBook()} storage={storage}><TeacherPage unitId="01-01" /></BookProvider>);
    const { text } = result('1번');
    const file = new File([text], '1번.json', { type: 'application/json' });
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [file] } });
    await waitFor(() => expect(screen.getByText('1번')).toBeTruthy());
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('teacher detail shows routine answers by lesson', async () => {
    render(<BookProvider book={makeBook({ moduleLesson: true })} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    const { text } = result('2번', { routineState: { 'lesson-01-01-2': { opener: { see: '무역이 많은 나라', sent: '무역이 많은 나라' }, closing: { now: '생각이 바뀌었다' } } } });
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([text], '2번.json', { type: 'application/json' })] } });
    await waitFor(() => expect(screen.getByText('2번')).toBeTruthy());
    expect(screen.getByRole('heading', { name: '생각 루틴' })).toBeTruthy();
    expect(screen.getByText(/본 것: 무역이 많은 나라/)).toBeTruthy();
    expect(screen.getByText(/지금 생각: 생각이 바뀌었다/)).toBeTruthy();
    expect(screen.queryByText(/sent/)).toBeNull();
  });

  it('survives malformed routine answers inside a valid file', async () => {
    render(<BookProvider book={makeBook({ moduleLesson: true })} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    const { text } = result('3번', { routineState: { 'lesson-01-01-2': { opener: 'abc', inquiry: { claim: { toString: 1 }, support: '근거 문장' } } } });
    fireEvent.change(screen.getByLabelText('결과 파일 고르기'), { target: { files: [new File([text], '3번.json', { type: 'application/json' })] } });
    await waitFor(() => expect(screen.getByText('3번')).toBeTruthy());
    expect(screen.getByText(/근거: 근거 문장/)).toBeTruthy();
    expect(screen.queryByText(/0: a/)).toBeNull();
  });

  it('shows the teacher guide for the unit', () => {
    render(<BookProvider book={makeBook()} storage={memoryStorage()}><TeacherPage unitId="01-01" /></BookProvider>);
    expect(screen.getByText(/예시 발문/)).toBeTruthy();
  });

  it('lists units when none is chosen', () => {
    render(<BookProvider book={makeBook()} storage={memoryStorage()}><TeacherPage /></BookProvider>);
    expect(screen.getByRole('link', { name: /세계화와 세계시민/ }).getAttribute('href')).toBe('#/teacher/01-01');
  });
});
