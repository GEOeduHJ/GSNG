import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BookProvider } from '../src/book/BookContext.jsx';
import LessonSpread from '../src/book/lesson/LessonSpread.jsx';
import { relatedQuestions } from '../src/book/qft/LessonQuestions.jsx';
import { ACTIVITY_TEMPLATES } from '../src/activities/registry.jsx';
import { validateBook } from '../src/content-loader/validate.js';
import { activityTemplateRule } from '../src/content-loader/rules.js';
import { STORAGE_KEY_V4, emptyUnitRecord } from '../src/storage/unitRecords.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

class FakeObserver {
  static instances = [];
  constructor(callback, options) { this.callback = callback; this.options = options; FakeObserver.instances.push(this); this.targets = []; }
  observe(target) { this.targets.push(target); }
  unobserve() {}
  disconnect() {}
}

afterEach(() => { vi.unstubAllGlobals(); delete window.matchMedia; FakeObserver.instances = []; });

const question = (overrides = {}) => ({ id: 'q1', text: '무역은 왜 늘었을까', classification: '열린', convertedType: '닫힌', convertedText: '', selectedVersion: 'original', selected: true, conceptTags: ['interdependence'], ...overrides });

function renderLesson(index, record) {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
  vi.stubGlobal('IntersectionObserver', FakeObserver);
  window.matchMedia = (query) => ({ matches: query.includes('min-width'), addEventListener() {}, removeEventListener() {} });
  const storage = memoryStorage(record ? { [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) } : {});
  const book = makeBook();
  const utils = render(<BookProvider book={book} storage={storage}><LessonSpread unit={book.units[0]} route={{ name: 'lesson', unitId: '01-01', index }} /></BookProvider>);
  return { ...utils, storage };
}

describe('lesson questions and evidence', () => {
  it('lesson works without questions', () => {
    renderLesson(1);
    expect(screen.getByRole('link', { name: /질문을 먼저 만들어/ }).getAttribute('href')).toBe('#/u/01-01/open');
    expect(screen.getByRole('button', { name: '근거로 붙이기' }).disabled).toBe(true);
  });

  it('relatedQuestions matches alias tags and skips unrelated lessons', () => {
    const book = makeBook();
    const record = { ...emptyUnitRecord('01-01'), questions: [question({ conceptTags: ['mutual-dependence'] })] };
    expect(relatedQuestions(record, book.units[0].lessons[0], book.concepts).map((q) => q.id)).toEqual(['q1']);
    expect(relatedQuestions(record, book.units[0].lessons[2], book.concepts)).toEqual([]);
  });

  it('attaches evidence with lesson and step ids', () => {
    const { storage } = renderLesson(1, { ...emptyUnitRecord('01-01'), questions: [question()] });
    fireEvent.click(screen.getByLabelText('무역은 왜 늘었을까'));
    fireEvent.change(screen.getByLabelText('이 자료에서 찾은 근거'), { target: { value: '무역 비중이 높아졌다' } });
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));
    const saved = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];
    expect(saved.evidence[0]).toMatchObject({ questionId: 'q1', lessonId: 'lesson-01-01-1', stepId: 'l1s2', note: '무역 비중이 높아졌다' });
    expect(screen.getByText('무역 비중이 높아졌다')).toBeTruthy();
  });

  it('shows all priority questions with a hint when none relate to the lesson', () => {
    renderLesson(3, { ...emptyUnitRecord('01-01'), questions: [question()] });
    expect(screen.getByText(/이 절과 직접 이어진 개념의 질문은 없습니다/)).toBeTruthy();
    expect(screen.getByLabelText('무역은 왜 늘었을까')).toBeTruthy();
  });

  it('does not watch paragraph scrolling on lesson pages', () => {
    renderLesson(1, { ...emptyUnitRecord('01-01'), questions: [question()] });
    expect(FakeObserver.instances.filter((observer) => observer.targets.some((target) => target.tagName === 'P'))).toHaveLength(0);
  });
});

function Harness({ name, config, fictional = false }) {
  const [value, setValue] = useState({});
  const Template = ACTIVITY_TEMPLATES[name];
  return <><Template config={config} value={value} onChange={setValue} fictional={fictional} /><output data-testid="state">{JSON.stringify(value)}</output></>;
}

const state = () => JSON.parse(screen.getByTestId('state').textContent);

describe('activity templates', () => {
  it('evidence-sort stores a category per item', () => {
    render(<Harness name="evidence-sort" config={{ prompt: '분류하기', items: [{ id: 'a', text: '항목 A' }], categories: [{ id: 'gain', label: '이익' }, { id: 'cost', label: '부담' }] }} />);
    fireEvent.change(screen.getByLabelText('항목 A'), { target: { value: 'cost' } });
    expect(state().sorted).toEqual({ a: 'cost' });
    expect(screen.getByLabelText('항목 A').value).toBe('cost');
  });

  it('decision-matrix stores scores and a choice', () => {
    render(<Harness name="decision-matrix" config={{ prompt: '비교하기', options: [{ id: 'x', label: '안 X' }], criteria: [{ id: 'c1', label: '주민 참여' }] }} />);
    fireEvent.change(screen.getByLabelText('안 X — 주민 참여'), { target: { value: '3' } });
    fireEvent.click(screen.getByLabelText('안 X 선택'));
    expect(state()).toMatchObject({ scores: { x: { c1: 3 } }, choice: 'x' });
  });

  it('layer-compare stores observations', () => {
    render(<Harness name="layer-compare" config={{ prompt: '두 자료 비교', fields: [{ id: 'same', label: '같은 점' }, { id: 'diff', label: '다른 점' }] }} />);
    fireEvent.change(screen.getByLabelText('같은 점'), { target: { value: '둘 다 증가' } });
    expect(state().notes).toEqual({ same: '둘 다 증가' });
  });

  it('civic-hearing states the situation is fictional', () => {
    render(<Harness name="civic-hearing" fictional config={{ actors: [{ id: 'school', label: '학교 구성원', place: '우리 지역', role: '구매 기준을 정함', power: '결정 가능' }], levels: [{ id: 'school', label: '학교', action: '구매 기준을 정한다.' }] }} />);
    expect(screen.getByText(/가상 상황/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /학교 구성원/ }));
    fireEvent.change(screen.getByLabelText('내가 제안하는 행동'), { target: { value: '공급 정보를 공개한다' } });
    expect(state()).toMatchObject({ actorId: 'school', action: '공급 정보를 공개한다' });
  });
});

describe('activityTemplateRule', () => {
  it('reports unknown activity templates', () => {
    const book = makeBook();
    book.units[0].lessons[0].activity.template = 'foo';
    const refs = { ...book, manifest: { items: book.units[0].lessons.flatMap((l) => l.steps).concat(book.units[0].opening.focus.step).filter((s) => s.type !== 'text').map((s) => ({ id: s.source, path: s.data })) } };
    const errors = validateBook(book, refs, { fullUnits: ['01-01'], extraRules: [activityTemplateRule] });
    expect(errors).toContain('01-01 lesson 1: unknown activity template: foo');
    expect(errors.filter((e) => e.includes('activity template'))).toHaveLength(1);
  });
});
