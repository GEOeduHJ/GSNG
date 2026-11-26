import { forwardRef } from 'react';
import { useUnitRecord } from '../book/BookContext.jsx';
import { ACTIVITY_TEMPLATES } from './registry.jsx';

/** The lesson's activity box; state lives in record.activityState[lessonId]. */
const LessonActivity = forwardRef(function LessonActivity({ unit, lesson }, ref) {
  const [record, update] = useUnitRecord(unit.id);
  const { template, config = {}, fictional = false } = lesson.activity ?? {};
  const Template = ACTIVITY_TEMPLATES[template];
  if (!Template) return null;
  const value = record.activityState?.[lesson.id] ?? {};
  const onChange = (updater) => update((current) => {
    const previous = current.activityState?.[lesson.id] ?? {};
    const next = typeof updater === 'function' ? updater(previous) : updater;
    return { ...current, activityState: { ...current.activityState, [lesson.id]: next } };
  });
  return (
    <section className="activity" ref={ref} aria-labelledby={`act-${lesson.id}`}>
      <h2 id={`act-${lesson.id}`}>{config.title ?? '탐구 활동'}</h2>
      {config.instruction && <p>{config.instruction}</p>}
      <Template config={config} value={value} onChange={onChange} fictional={fictional} />
    </section>
  );
});

export default LessonActivity;
