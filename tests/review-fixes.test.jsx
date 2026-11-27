import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

const initSpy = vi.fn();
const useSpy = vi.fn();
vi.mock('echarts/core', () => ({
  use: (...args) => useSpy(...args),
  init: (...args) => { initSpy(...args); return { setOption() {}, on() {}, resize() {}, dispose() {} }; },
}));

import DataChart from '../src/viz/DataChart.jsx';
import { buildChartOption } from '../src/viz/chartData.js';
import { mapOptions } from '../src/viz/mapData.js';
import App from '../src/book/App.jsx';
import ErrorBoundary from '../src/book/ErrorBoundary.jsx';
import { BookProvider } from '../src/book/BookContext.jsx';
import UnitOpening from '../src/book/qft/UnitOpening.jsx';
import { STORAGE_KEY_V4, createStore, emptyUnitRecord } from '../src/storage/unitRecords.js';
import { parseResultFile } from '../src/storage/resultFile.js';
import { summarizeResults } from '../src/teacher/summarize.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

afterEach(() => { vi.unstubAllGlobals(); delete window.matchMedia; initSpy.mockClear(); window.location.hash = ''; });

describe('projection shading', () => {
  it('registers the mark-area component used for projection periods', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ years: [2020], series: [{ name: 'A', values: [1] }] }) })));
    render(<DataChart url="/data/ma.json" config={{ kind: 'line', projectionFrom: 2020 }} alt="a" fallback={null} />);
    await waitFor(() => expect(useSpy).toHaveBeenCalled());
    const { MarkAreaComponent } = await import('echarts/components');
    expect(useSpy.mock.calls.flatMap(([list]) => list)).toContain(MarkAreaComponent);
  });
});

describe('C1: charts survive parent re-renders', () => {
  it('does not re-create the chart when onInteract changes identity', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ years: [2020], series: [{ name: 'A', values: [1] }] }) })));
    const { rerender } = render(<DataChart url="/data/c1.json" config={{ kind: 'line' }} alt="a" fallback={null} onInteract={() => {}} />);
    await waitFor(() => expect(initSpy).toHaveBeenCalledTimes(1));
    rerender(<DataChart url="/data/c1.json" config={{ kind: 'line' }} alt="a" fallback={null} onInteract={() => {}} />);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(initSpy).toHaveBeenCalledTimes(1);
  });
});

describe('I1: lesson state does not leak across lessons', () => {
  it('saves evidence with the current lesson data step after moving lessons', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} unobserve() {} });
    window.matchMedia = (query) => ({ matches: query.includes('min-width'), addEventListener() {}, removeEventListener() {} });
    const q = { id: 'q1', text: '질문', classification: '열린', convertedType: '닫힌', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: ['interdependence'] };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': { ...emptyUnitRecord('01-01'), questions: [q] } } }) });
    window.location.hash = '#/u/01-01/l/1';
    render(<App book={makeBook()} storage={storage} />);
    fireEvent.change(screen.getByLabelText('어느 자료에서'), { target: { value: 'l1s3' } });
    fireEvent.change(screen.getByLabelText('이 자료에서 찾은 근거'), { target: { value: '절 1 메모' } });
    act(() => { window.location.hash = '#/u/01-01/l/2'; window.dispatchEvent(new HashChangeEvent('hashchange')); });
    expect(screen.getByLabelText('이 자료에서 찾은 근거').value).toBe('');
    fireEvent.click(screen.getByLabelText('질문'));
    fireEvent.change(screen.getByLabelText('이 자료에서 찾은 근거'), { target: { value: '절 2 메모' } });
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));
    const saved = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'].evidence[0];
    expect(saved).toMatchObject({ lessonId: 'lesson-01-01-2', stepId: 'l2s2' });
  });
});

describe('I2: external AI and carry-over open only after question production', () => {
  it('stays hidden while producing and appears once production is done', () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const book = makeBook();
    render(<BookProvider book={book} storage={memoryStorage()}><UnitOpening unit={book.units[0]} /></BookProvider>);
    fireEvent.click(screen.getByRole('button', { name: '선생님 안내에 따라 시작' }));
    fireEvent.change(screen.getByLabelText('질문 1'), { target: { value: '새 질문' } });
    expect(screen.queryByRole('link', { name: /외부 AI/ })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: '다음 단계' }));
    expect(screen.getByRole('link', { name: /외부 AI/ })).toBeTruthy();
  });
});

describe('I3: reduced motion reaches charts and maps', () => {
  it('turns off chart animation and map fades', () => {
    expect(buildChartOption({ kind: 'line' }, { years: [], series: [] }, {}, { reduced: true }).animation).toBe(false);
    expect(buildChartOption({ kind: 'line' }, { years: [], series: [] }).animation).not.toBe(false);
    expect(mapOptions({}, { reduced: true }).fadeDuration).toBe(0);
  });
});

describe('I4: malformed files and records do not crash', () => {
  const base = { schema: 'gsng-unit-result', schemaVersion: 1, unitId: '01-01', displayName: 'x', exportedAt: '2026' };

  it('rejects result files with the wrong shape', () => {
    expect(parseResultFile(JSON.stringify({ ...base, questions: 'x' }))).toEqual({ ok: false, reason: 'bad-shape' });
    expect(parseResultFile(JSON.stringify({ ...base, questions: [{ id: 'a', text: 3 }] }))).toEqual({ ok: false, reason: 'bad-shape' });
  });

  it('summarizes valid files next to a bad one', () => {
    const good = JSON.stringify({ ...base, questions: [], evidence: [], explanation: { claim: '', reasoning: '', evidenceIds: [] } });
    const summary = summarizeResults([{ name: 'a.json', text: good }, { name: 'b.json', text: JSON.stringify({ ...base, displayName: 'y', questions: 'x' }) }], '01-01', {});
    expect(summary.students).toHaveLength(1);
    expect(summary.skipped).toEqual([{ name: 'b.json', reason: 'bad-shape' }]);
  });

  it('normalizes stored records with missing fields', () => {
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': { questions: [{ id: 'q', text: 'a' }] } } }) });
    const record = createStore(storage).load().units['01-01'];
    expect(record.evidence).toEqual([]);
    expect(record.questions[0].conceptTags).toEqual([]);
    expect(record.explanation.evidenceIds).toEqual([]);
  });

  it('shows a recovery message instead of a blank page', () => {
    const Boom = () => { throw new Error('boom'); };
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorBoundary><Boom /></ErrorBoundary>);
    expect(screen.getByText(/화면을 표시하지 못했습니다/)).toBeTruthy();
  });
});

describe('I5: two tabs do not overwrite each other', () => {
  it('merges per unit on save', () => {
    const storage = memoryStorage();
    const tabA = createStore(storage);
    const tabB = createStore(storage);
    tabA.load(); tabB.load();
    tabA.save({ '01-01': { ...emptyUnitRecord('01-01'), displayName: 'A' } }, '01-01');
    tabB.save({ '01-02': { ...emptyUnitRecord('01-02'), displayName: 'B' } }, '01-02');
    const units = JSON.parse(storage.data[STORAGE_KEY_V4]).units;
    expect(units['01-01'].displayName).toBe('A');
    expect(units['01-02'].displayName).toBe('B');
  });

  it('reloads when another tab writes', () => {
    const storage = memoryStorage();
    const book = makeBook();
    function Probe() {
      return null;
    }
    window.location.hash = '#/help';
    render(<App book={book} storage={storage} />);
    const other = createStore(storage);
    other.save({ '01-01': { ...emptyUnitRecord('01-01'), questions: [{ id: 'z', text: '다른 탭 질문', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: [] }] } }, '01-01');
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY_V4 })); });
    act(() => { window.location.hash = '#/u/01-01/close'; window.dispatchEvent(new HashChangeEvent('hashchange')); });
    expect(screen.getByText('다른 탭 질문')).toBeTruthy();
    expect(Probe).toBeTruthy();
  });
});

describe('deferred minors fixed during unit II', () => {
  it('puts the fictional-situation note before the activity title', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} unobserve() {} });
    const { default: LessonActivity } = await import('../src/activities/LessonActivity.jsx');
    const book = makeBook();
    const lesson = { ...book.units[0].lessons[2], activity: { template: 'civic-hearing', fictional: true, config: { title: '청문회', actors: [], levels: [] } } };
    const { container } = render(<BookProvider book={book} storage={memoryStorage()}><LessonActivity unit={book.units[0]} lesson={lesson} /></BookProvider>);
    const task = container.querySelector('.activity .activity-task');
    expect(task.firstElementChild.className).toBe('fictional-note');
    expect(container.querySelectorAll('.fictional-note')).toHaveLength(1);
  });

  it('does not pass the plan stage with no priority questions', async () => {
    const { planReady } = await import('../src/book/qft/UnitOpening.jsx');
    expect(planReady({ ...emptyUnitRecord('01-01'), nextStepPlan: '자료를 본다' })).toBe(false);
  });

  it('lets the student clear the revised question', async () => {
    const { default: UnitClosing } = await import('../src/book/close/UnitClosing.jsx');
    const q = { id: 'q1', text: '처음 질문', classification: '열린', convertedType: '', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: [] };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': { ...emptyUnitRecord('01-01'), questions: [q], explanation: { questionId: 'q1', claim: '주장', reasoning: '설명', evidenceIds: ['e'] }, stageTimes: { explain: 't' } } } }) });
    const book = makeBook();
    render(<BookProvider book={book} storage={storage}><UnitClosing unit={book.units[0]} /></BookProvider>);
    const field = screen.getByLabelText('다듬은 질문');
    expect(field.value).toBe('처음 질문');
    fireEvent.change(field, { target: { value: '' } });
    expect(screen.getByLabelText('다듬은 질문').value).toBe('');
  });
});
