import { useState } from 'react';
import Spread, { useReducedMotion, useWide } from '../Spread.jsx';
import { useBook } from '../BookContext.jsx';
import { routes } from '../router.js';
import DataStage from './DataStage.jsx';
import LessonReading from './LessonReading.jsx';
import LessonSummary from './LessonSummary.jsx';
import { firstRefId, sectionForStep, stepById } from './lessonData.js';
import LessonQuestions from '../qft/LessonQuestions.jsx';
import LessonActivity from '../../activities/LessonActivity.jsx';

export { KeyTerms } from './LessonReading.jsx';

/**
 * One lesson as a learning module: a facing-page spread (reading left, chosen data right),
 * then full-width 탐구하기 → 핵심 정리 → 내 질문과 이 절.
 */
export default function LessonSpread({ unit, route }) {
  const { book } = useBook();
  const lesson = unit.lessons.find((item) => item.index === route.index);
  const wide = useWide();
  const reduced = useReducedMotion();
  const [selectedId, setSelectedId] = useState(() => firstRefId(lesson));

  if (!lesson) return <article className="help-page"><h1>없는 절</h1><p><a href={routes.open(unit.id)}>중단원 첫 쪽으로</a></p></article>;

  const motion = reduced ? 'none' : 'auto';
  const selected = stepById(lesson, selectedId);
  const topic = sectionForStep(lesson, selectedId);

  const left = <LessonReading unit={unit} lesson={lesson} wide={wide} selectedId={selectedId} onSelect={setSelectedId} motion={motion} />;
  const right = wide ? (
    <div className="stage-sticky data-panel" id="lesson-data-panel" aria-live="polite">
      {topic?.title && <p className="data-panel-head">자료 · {topic.title}</p>}
      {selected && <DataStage key={selected.id} step={selected} manifest={book.manifest} motion={motion} />}
    </div>
  ) : null;

  return (
    <article className="lesson-page">
      <Spread left={left} right={right} rightSticky={wide} pages={[lesson.index * 2 + 1, lesson.index * 2 + 2]} label={`${unit.title} 절 ${lesson.index}`} />
      <div className="lesson-after">
        <LessonActivity unit={unit} lesson={lesson} />
        <LessonSummary items={lesson.summary} />
        <LessonQuestions unit={unit} lesson={lesson} selectedStepId={selected?.id} />
      </div>
    </article>
  );
}
