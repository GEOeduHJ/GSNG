import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Spread, { useReducedMotion, useWide } from '../Spread.jsx';
import { useBook } from '../BookContext.jsx';
import { resolveConceptId } from '../../content-loader/concepts.js';
import { routes } from '../router.js';
import DataStage from './DataStage.jsx';
import { stageIndexFor } from './stages.js';
import { useActiveStep } from './useActiveStep.js';

function useHeight(ref) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return height;
}

export function KeyTerms({ ids, concepts }) {
  const terms = ids.map((id) => concepts[resolveConceptId(id, concepts)]).filter(Boolean);
  if (!terms.length) return null;
  return (
    <dl className="key-terms">
      {terms.map((term) => <div key={term.label}><dt>{term.label}</dt><dd>{term.definition}</dd></div>)}
    </dl>
  );
}

export function PageTurn({ unit, index }) {
  const prev = index > 1 ? { href: routes.lesson(unit.id, index - 1), label: `이전 절` } : { href: routes.open(unit.id), label: '질문 만들기 쪽' };
  const next = index < unit.lessons.length ? { href: routes.lesson(unit.id, index + 1), label: '다음 절' } : { href: routes.close(unit.id), label: '내 질문에 답하기 쪽' };
  return (
    <nav className="page-turn no-print" aria-label="쪽 넘기기">
      <a href={prev.href}>← {prev.label}</a>
      <a href={next.href}>{next.label} →</a>
    </nav>
  );
}

/** One lesson as a facing-page spread: reading on the left, scroll-linked data (then activity) on the right. */
export default function LessonSpread({ unit, route, children, enabled = true }) {
  const { book } = useBook();
  const lesson = unit.lessons.find((item) => item.index === route.index);
  const wide = useWide();
  const reduced = useReducedMotion();
  const refs = useMemo(() => (lesson?.paragraphs ?? []).map(() => createRef()), [lesson]);
  const { active, pinned, pin, unpin } = useActiveStep(refs, { enabled: wide && enabled });
  const bodyRef = useRef(null);
  const bodyHeight = useHeight(bodyRef);

  if (!lesson) return <article className="help-page"><h1>없는 절</h1><p><a href={routes.open(unit.id)}>중단원 첫 쪽으로</a></p></article>;

  const motion = reduced ? 'none' : 'auto';
  const dataSteps = lesson.steps.filter((step) => step.type !== 'text');
  const stageIndex = stageIndexFor(lesson.steps, active);
  const stageStep = lesson.steps[stageIndex];

  const left = (
    <>
      <p className="lesson-number">{unit.id} · 절 {lesson.index}</p>
      <h1>{lesson.title}</h1>
      {lesson.goal && <p className="goal">{lesson.goal}</p>}
      <div className="prose" ref={bodyRef}>
        {lesson.paragraphs.map((paragraph, index) => (
          <p key={index} ref={refs[index]} className={wide && index === active ? 'is-active' : undefined}>{paragraph}</p>
        ))}
      </div>
      {lesson.illustration && (
        <figure className="illustration"><img src={lesson.illustration.src} alt={lesson.illustration.alt} /></figure>
      )}
      <KeyTerms ids={lesson.keyTerms} concepts={book.concepts} />
    </>
  );

  const right = wide ? (
    <>
      <div className="stage-track" style={bodyHeight ? { minHeight: bodyHeight } : undefined}>
        <div className="stage-sticky">
          {stageStep && <DataStage key={stageStep.id} step={stageStep} manifest={book.manifest} motion={motion} onInteract={() => pin(active)} />}
          {pinned && <p className="resync no-print"><button type="button" className="text-button" onClick={unpin}>본문과 다시 맞추기</button></p>}
        </div>
      </div>
      {children}
    </>
  ) : (
    <>
      {dataSteps.map((step) => <DataStage key={step.id} step={step} manifest={book.manifest} motion={motion} />)}
      {children}
    </>
  );

  return (
    <article className="lesson-page">
      <Spread left={left} right={right} rightSticky={wide} pages={[lesson.index * 2 + 1, lesson.index * 2 + 2]} label={`${unit.title} 절 ${lesson.index}`} />
      <PageTurn unit={unit} index={lesson.index} />
    </article>
  );
}
