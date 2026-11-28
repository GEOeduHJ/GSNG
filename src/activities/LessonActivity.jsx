import { forwardRef } from 'react';
import { useBook, useUnitRecord } from '../book/BookContext.jsx';
import RoutineCard, { SelectedQuestionContext } from '../book/lesson/RoutineCard.jsx';
import { routineForSlot } from '../content-loader/routines.js';
import { ACTIVITY_TEMPLATES } from './registry.jsx';
import FictionalNote from './FictionalNote.jsx';
import { isPilotUnit } from '../storage/unitRecords.js';

/** 탐구하기: ① the inquiry thinking routine, ② the lesson's activity (state in record.activityState[lessonId]). */
const LessonActivity = forwardRef(function LessonActivity({ unit, lesson }, ref) {
  const { book } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const { template, config = {}, fictional = false } = lesson.activity ?? {};
  const Template = ACTIVITY_TEMPLATES[template];
  const routine = routineForSlot(book, lesson, 'inquiry');
  const pilot = isPilotUnit(unit.id);
  if (!Template && !routine) return null;
  const value = record.activityState?.[lesson.id] ?? {};
  const onChange = (updater) => update((current) => {
    const previous = current.activityState?.[lesson.id] ?? {};
    const next = typeof updater === 'function' ? updater(previous) : updater;
    return { ...current, activityState: { ...current.activityState, [lesson.id]: next } };
  });
  return (
    <section className="activity" ref={ref} aria-labelledby={`act-${lesson.id}`}>
      <h2 id={`act-${lesson.id}`}>{pilot ? '내 질문으로 자료 읽기' : '탐구하기'}</h2>
      {pilot && <p className="hint">선택한 질문을 중심으로 자료와 기본 루틴의 응답을 살펴봅니다. 루틴이나 활동 응답은 근거 초안에 불러와 확인·수정한 뒤 질문에 붙일 수 있습니다.</p>}
      {pilot && <SelectedQuestionContext record={record} />}
      <RoutineCard unit={unit} lesson={lesson} slot="inquiry" routine={routine} showQuestionContext={!pilot} />
      {Template && (
        <div className="activity-task">
          {fictional && <FictionalNote />}
          {config.title && <h3>{config.title}</h3>}
          {config.instruction && <p>{config.instruction}</p>}
          <Template config={config} value={value} onChange={onChange} fictional={false} />
        </div>
      )}
    </section>
  );
});

export default LessonActivity;
