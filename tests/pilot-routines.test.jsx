import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { BookProvider } from '../src/book/BookContext.jsx';
import LessonReading from '../src/book/lesson/LessonReading.jsx';
import LessonActivity from '../src/activities/LessonActivity.jsx';
import LessonQuestions from '../src/book/qft/LessonQuestions.jsx';
import UnitOpening from '../src/book/qft/UnitOpening.jsx';
import UnitClosing from '../src/book/close/UnitClosing.jsx';
import { STORAGE_KEY_V4, emptyUnitRecord } from '../src/storage/unitRecords.js';
import { makeBook, memoryStorage } from './fixtures/book.js';

const selectedQuestion = {
  id: 'q1', text: '처음 질문', selected: true, conceptTags: ['interdependence'],
  revisions: [{ id: 'r1', before: '처음 질문', after: '지금 이어갈 질문은 무엇일까?', reason: '자료를 좁혔다', source: 'student', evidenceIds: [], createdAt: '2026-11-28T00:00:00.000Z' }],
};

function pilotFixture({ unitId = '01-01', index = 2, recordPatch = {} } = {}) {
  const book = makeBook({ moduleLesson: true });
  const sourceUnit = book.units[0];
  const sourceLesson = sourceUnit.lessons[1];
  const lessonId = `lesson-${unitId}-${index}`;
  const lesson = {
    ...sourceLesson,
    id: lessonId,
    unitId,
    index,
    opener: '자료를 먼저 살펴봅니다.',
    title: `절 ${index} 제목`,
    activity: {
      template: 'layer-compare',
      config: { title: '자료 비교', prompt: '정적 안내 문장', fields: [{ id: 'trade-map', label: '무역 자료에서 찾은 변화' }] },
    },
  };
  const unit = { ...sourceUnit, id: unitId, lessons: [lesson] };
  book.units = [unit];
  const record = {
    ...emptyUnitRecord(unitId),
    questions: [selectedQuestion],
    ...recordPatch,
  };
  const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { [unitId]: record } }) });
  return { book, unit, lesson, record, storage };
}

function lessonContents({ book, unit, lesson, storage }) {
  return (
    <BookProvider book={book} storage={storage}>
      <LessonReading unit={unit} lesson={lesson} wide selectedId={lesson.steps[0]?.id} onSelect={() => {}} motion="none" />
      <LessonActivity unit={unit} lesson={lesson} />
      <LessonQuestions unit={unit} lesson={lesson} selectedStepId={lesson.steps[0]?.id} />
    </BookProvider>
  );
}

function renderPilot(options) {
  const fixture = pilotFixture(options);
  render(lessonContents(fixture));
  return fixture;
}

function saved(storage, unitId = '01-01') {
  return JSON.parse(storage.data[STORAGE_KEY_V4]).units[unitId];
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('question-based pilot routines', () => {
  it('shows one mapped basic routine, the current question, and collapsed choices', () => {
    renderPilot({ index: 2 });

    expect(screen.getByRole('heading', { name: '내 질문으로 자료 읽기' })).toBeTruthy();
    expect(screen.getByText(/응답은 근거 초안에 불러와 확인·수정한 뒤 질문에 붙일 수 있습니다/)).toBeTruthy();
    expect(screen.getByText('현재 선택한 질문')).toBeTruthy();
    expect(within(document.querySelector('.pilot-question-context')).getByText('지금 이어갈 질문은 무엇일까?')).toBeTruthy();
    expect(document.querySelectorAll('.routine-card[data-default="true"]')).toHaveLength(1);
    expect(document.querySelector('.routine-card[data-slot="inquiry"][data-default="true"]')).toBeTruthy();
    expect(document.querySelector('details.routine-card[data-slot="opener"]').open).toBe(false);
    expect(document.querySelector('details.routine-card[data-slot="closing"]').open).toBe(false);
    expect(screen.getByText('더 살펴보기(선택)').closest('details').open).toBe(false);
  });

  it('uses opener for lesson 1 in both pilot units', () => {
    for (const [index, unitId] of ['01-01', '03-01'].entries()) {
      const { lesson, storage } = renderPilot({ unitId, index: 1 });
      expect(document.querySelector('.routine-card[data-slot="opener"][data-default="true"]')).toBeTruthy();
      expect(document.querySelector('details.routine-card[data-slot="inquiry"]').open).toBe(false);
      expect(document.querySelector('details.routine-card[data-slot="closing"]').open).toBe(false);
      expect(lesson.id).toBe(`lesson-${unitId}-1`);
      screen.getByRole('heading', { name: '내 질문으로 자료 읽기' });
      expect(saved(storage, unitId).questions[0].id).toBe('q1');
      if (index === 0) cleanup();
    }
  });

  it('loads routine and activity responses into an editable draft without changing either source', () => {
    const lessonId = 'lesson-01-01-2';
    const routineAnswer = '주장 루틴의 학생 응답';
    const activityAnswer = '활동 칸에 쓴 학생 응답';
    const { storage } = renderPilot({ recordPatch: {
      routineState: { [lessonId]: { inquiry: { claim: routineAnswer } } },
      activityState: { [lessonId]: { notes: { 'trade-map': activityAnswer } } },
    } });

    const source = screen.getByLabelText('불러올 응답');
    const note = screen.getByLabelText('근거 초안 · 자료에서 찾은 것');
    expect([...source.options].map((option) => option.textContent)).toContain('생각 루틴 · 주장');
    expect([...source.options].map((option) => option.textContent)).toContain('활동 · 무역 자료에서 찾은 변화');
    expect([...source.options].map((option) => option.textContent)).not.toContain('정적 안내 문장');

    fireEvent.click(screen.getByLabelText('지금 이어갈 질문은 무엇일까?'));
    fireEvent.change(source, { target: { value: 'routine:inquiry:claim' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    expect(note.value).toBe(routineAnswer);
    fireEvent.change(note, { target: { value: '수정해 확인한 루틴 근거' } });
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    fireEvent.change(source, { target: { value: 'activity:trade-map' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    expect(note.value).toBe(activityAnswer);
    fireEvent.change(note, { target: { value: '수정해 확인한 활동 근거' } });
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    const record = saved(storage);
    expect(record.routineState[lessonId].inquiry.claim).toBe(routineAnswer);
    expect(record.activityState[lessonId].notes['trade-map']).toBe(activityAnswer);
    expect(record.evidence).toEqual(expect.arrayContaining([
      expect.objectContaining({ questionId: 'q1', lessonId, note: '수정해 확인한 루틴 근거', sourceRef: { kind: 'routine', lessonId, slot: 'inquiry', fieldId: 'claim' } }),
      expect.objectContaining({ questionId: 'q1', lessonId, note: '수정해 확인한 활동 근거', sourceRef: { kind: 'activity', lessonId, template: 'layer-compare', fieldId: 'trade-map' } }),
    ]));
  });

  it('keeps non-pilot headings, routine cards, and activities in their existing open layout', () => {
    const { book, unit, lesson, storage } = pilotFixture({ unitId: '02-01', index: 2 });
    render(lessonContents({ book, unit, lesson, storage }));
    expect(screen.getByRole('heading', { name: '탐구하기' })).toBeTruthy();
    expect(document.querySelector('.routine-card[data-slot="inquiry"]')).toBeTruthy();
    expect(document.querySelector('.activity .activity-task details')).toBeNull();
    expect(screen.queryByText('더 살펴보기(선택)')).toBeNull();
  });
});

describe('pilot opening and closing labels', () => {
  it('uses question-centered opening stage labels for pilot units', () => {
    const book = makeBook();
    const unit = book.units[0];
    unit.opening.focus.step = { ...unit.opening.focus.step, type: 'text' };
    const record = { ...emptyUnitRecord('01-01'), stageTimes: { rules: 't', produce: 't', improve: 't', prioritize: 't' } };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
    render(<BookProvider book={book} storage={storage}><UnitOpening unit={unit} /></BookProvider>);

    expect(screen.getByRole('heading', { name: '자료 활용 계획 세우기' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '4. 이어갈 질문' }));
    expect(screen.getByRole('heading', { name: '이어갈 질문 고르기' })).toBeTruthy();
  });

  it('uses question-centered closing wording and keeps malformed saved text intact', () => {
    const book = makeBook();
    const unit = book.units[0];
    const malformed = { old: 'saved value' };
    const record = {
      ...emptyUnitRecord('01-01'),
      questions: [selectedQuestion],
      revisedQuestion: malformed,
      stageTimes: { explain: 't' },
    };
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    render(<BookProvider book={book} storage={storage}><UnitClosing unit={unit} /></BookProvider>);

    expect(screen.getByText(/자료를 살펴본 지금/)).toBeTruthy();
    expect(saved(storage).revisedQuestion).toEqual(malformed);
  });
});
