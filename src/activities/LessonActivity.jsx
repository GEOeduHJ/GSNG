import { forwardRef } from 'react';
import { useBook, useUnitRecord } from '../book/BookContext.jsx';
import RoutineCard from '../book/lesson/RoutineCard.jsx';
import { routineForSlot } from '../content-loader/routines.js';
import { ACTIVITY_TEMPLATES } from './registry.jsx';
import FictionalNote from './FictionalNote.jsx';

/** 탐구하기: ① the inquiry thinking routine, ② the lesson's activity (state in record.activityState[lessonId]). */
const LessonActivity = forwardRef(function LessonActivity({ unit, lesson }, ref) {
  const { book } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const { template, config = {}, fictional = false } = lesson.activity ?? {};
  const Template = ACTIVITY_TEMPLATES[template];
  const routine = routineForSlot(book, lesson, 'inquiry');
  if (!Template && !routine) return null;
  const value = record.activityState?.[lesson.id] ?? {};
  const onChange = (updater) => update((current) => {
    const previous = current.activityState?.[lesson.id] ?? {};
    const next = typeof updater === 'function' ? updater(previous) : updater;
    return { ...current, activityState: { ...current.activityState, [lesson.id]: next } };
  });
  return (
    <section className="activity" ref={ref} aria-labelledby={`act-${lesson.id}`}>
      <h2 id={`act-${lesson.id}`}>탐구하기</h2>
      <RoutineCard unit={unit} lesson={lesson} slot="inquiry" routine={routine} />
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
