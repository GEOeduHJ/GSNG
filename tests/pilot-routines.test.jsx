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
  it('shows one mapped basic routine and keeps other thinking routines collapsed as choices', () => {
    renderPilot({ index: 2 });

    expect(screen.getByRole('heading', { name: '내 질문으로 자료 읽기' })).toBeTruthy();
    expect(screen.getByText(/응답은 근거 초안에 불러와 확인·수정한 뒤 질문에 붙일 수 있습니다/)).toBeTruthy();
    expect(screen.getByText('현재 선택한 질문')).toBeTruthy();
    expect(within(document.querySelector('.pilot-question-context')).getByText('지금 이어갈 질문은 무엇일까?')).toBeTruthy();
    expect(document.querySelectorAll('.routine-card[data-default="true"]')).toHaveLength(2);
    expect(document.querySelector('.routine-card[data-slot="inquiry"][data-default="true"]')).toBeTruthy();
    expect(document.querySelector('details.routine-card[data-slot="opener"]').open).toBe(false);
    expect(document.querySelector('details.routine-card[data-slot="closing"]')).toBeNull();
  });

  it('uses opener for lesson 1 in both pilot units', () => {
    for (const [index, unitId] of ['01-01', '03-01'].entries()) {
      const { lesson, storage } = renderPilot({ unitId, index: 1 });
      expect(document.querySelector('.routine-card[data-slot="opener"][data-default="true"]')).toBeTruthy();
      expect(document.querySelector('details.routine-card[data-slot="inquiry"]').open).toBe(false);
      expect(document.querySelector('.routine-card[data-slot="closing"][data-default="true"]')).toBeTruthy();
      expect(lesson.id).toBe(`lesson-${unitId}-1`);
      screen.getByRole('heading', { name: '내 질문으로 자료 읽기' });
      expect(saved(storage, unitId).questions[0].id).toBe('q1');
      if (index === 0) cleanup();
    }
  });

  it('keeps the selected question, inquiry routine, and core activity in order across pilot lessons 1–3', () => {
    for (const unitId of ['01-01', '03-01']) {
      for (const index of [1, 2, 3]) {
        const { book, unit, lesson, storage } = pilotFixture({ unitId, index });
        render(lessonContents({ book, unit, lesson, storage }));

        const activity = document.querySelector('.activity');
        const question = activity.querySelector('.pilot-question-context');
        const routine = activity.querySelector('.routine-card[data-slot="inquiry"]');
        const task = activity.querySelector('.activity-task');
        expect(question).toBeTruthy();
        expect(activity.querySelectorAll('.pilot-question-context')).toHaveLength(1);
        expect(within(question).getByText('지금 이어갈 질문은 무엇일까?')).toBeTruthy();
        expect(routine).toBeTruthy();
        expect(task).toBeTruthy();
        expect(question.compareDocumentPosition(routine) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(routine.compareDocumentPosition(task) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(task.closest('details:not([open])')).toBeNull();
        if (index === 1) expect(routine.closest('details').open).toBe(false);
        else expect(routine.dataset.default).toBe('true');
        expect(screen.queryByText('더 살펴보기(선택)')).toBeNull();
        expect(within(task).getByRole('heading', { name: '자료 비교' })).toBeTruthy();
        cleanup();
      }
    }
  });

  it('marks fictional activity evidence and displays its source label', () => {
    const lessonId = 'lesson-01-01-2';
    const { book, unit, lesson, storage } = pilotFixture({ recordPatch: {
      activityState: { [lessonId]: { notes: { 'trade-map': '가상 활동에서 살핀 내용' } } },
    } });
    lesson.activity.fictional = true;
    render(lessonContents({ book, unit, lesson, storage }));

    expect([...screen.getByLabelText('불러올 응답').options].map((option) => option.textContent)).toContain('가상 상황 활동 · 무역 자료에서 찾은 변화');
    fireEvent.click(screen.getByLabelText('지금 이어갈 질문은 무엇일까?'));
    fireEvent.change(screen.getByLabelText('불러올 응답'), { target: { value: 'activity:trade-map' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    expect(saved(storage).evidence[0].sourceRef.kind).toBe('fictional');
    expect(document.querySelector('.evidence-list').textContent).toContain('가상 상황 활동');
  });

  it('shows the short closing routine expanded in every pilot lesson', () => {
    for (const unitId of ['01-01', '03-01']) {
      renderPilot({ unitId, index: 2 });

      expect(document.querySelector('details.routine-card[data-slot="closing"]')).toBeNull();
      expect(document.querySelector('.routine-card[data-slot="closing"][data-default="true"]')).toBeTruthy();
      cleanup();
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
    expect([...source.options].map((option) => option.textContent)).toContain('생각 루틴 · 탐구하기 · 주장');
    expect([...source.options].map((option) => option.textContent)).toContain('활동 · 무역 자료에서 찾은 변화');
    expect([...source.options].map((option) => option.textContent)).not.toContain('정적 안내 문장');

    fireEvent.click(screen.getByLabelText('지금 이어갈 질문은 무엇일까?'));
    fireEvent.change(source, { target: { value: 'routine:inquiry:claim' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    expect(note.value).toBe(routineAnswer);
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    fireEvent.change(source, { target: { value: 'activity:trade-map' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    expect(note.value).toBe(activityAnswer);
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    const record = saved(storage);
    expect(record.routineState[lessonId].inquiry.claim).toBe(routineAnswer);
    expect(record.activityState[lessonId].notes['trade-map']).toBe(activityAnswer);
    expect(record.evidence).toEqual(expect.arrayContaining([
      expect.objectContaining({ questionId: 'q1', lessonId, note: routineAnswer, sourceRef: { kind: 'routine', lessonId, slot: 'inquiry', fieldId: 'claim' } }),
      expect.objectContaining({ questionId: 'q1', lessonId, note: activityAnswer, sourceRef: { kind: 'activity', lessonId, template: 'layer-compare', fieldId: 'trade-map' } }),
    ]));
  });

  it('drops the loaded answer source reference when the student edits its text', () => {
    const lessonId = 'lesson-01-01-2';
    const activityAnswer = '활동 칸에 쓴 학생 응답';
    const { storage } = renderPilot({ recordPatch: {
      activityState: { [lessonId]: { notes: { 'trade-map': activityAnswer } } },
    } });

    fireEvent.click(screen.getByLabelText('지금 이어갈 질문은 무엇일까?'));
    fireEvent.change(screen.getByLabelText('불러올 응답'), { target: { value: 'activity:trade-map' } });
    fireEvent.click(screen.getByRole('button', { name: '응답을 초안에 불러오기' }));
    const note = screen.getByLabelText('근거 초안 · 자료에서 찾은 것');
    fireEvent.change(note, { target: { value: '학생이 내용을 다시 쓴 근거' } });
    fireEvent.click(screen.getByRole('button', { name: '근거로 붙이기' }));

    expect(saved(storage).evidence[0]).toMatchObject({ note: '학생이 내용을 다시 쓴 근거' });
    expect(saved(storage).evidence[0]).not.toHaveProperty('sourceRef');
  });

  it('keeps non-pilot headings, routine cards, and activities in their existing open layout', () => {
    const { book, unit, lesson, storage } = pilotFixture({ unitId: '02-01', index: 2 });
    render(lessonContents({ book, unit, lesson, storage }));
    expect(screen.getByRole('heading', { name: '탐구하기' })).toBeTruthy();
    expect(document.querySelector('.routine-card[data-slot="inquiry"]')).toBeTruthy();
    expect(document.querySelector('.activity .activity-task')).toBeTruthy();
    expect(within(document.querySelector('.activity .activity-task')).getByRole('heading', { name: '자료 비교' })).toBeTruthy();
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
