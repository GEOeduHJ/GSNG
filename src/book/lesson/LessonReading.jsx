import { useState } from 'react';
import { useBook } from '../BookContext.jsx';
import { resolveConceptId } from '../../content-loader/concepts.js';
import DataStage from './DataStage.jsx';
import { buttonLabel, stepById } from './lessonData.js';

export function KeyTerms({ ids, concepts }) {
  const terms = ids.map((id) => concepts[resolveConceptId(id, concepts)]).filter(Boolean);
  if (!terms.length) return null;
  return (
    <dl className="key-terms">
      {terms.map((term) => <div key={term.label}><dt>{term.label}</dt><dd>{term.definition}</dd></div>)}
    </dl>
  );
}

function DataButton({ step, wide, pressed, expanded, onClick }) {
  const state = wide ? { 'aria-pressed': pressed, 'aria-controls': 'lesson-data-panel' } : { 'aria-expanded': expanded };
  return (
    <button type="button" className="data-button" onClick={onClick} {...state}>
      <span className="data-button-verb">자료 보기 ▸</span> {buttonLabel(step)}
      {wide && pressed && <span className="data-button-state">보는 중</span>}
    </button>
  );
}

/**
 * The left page: title, goal, opener, topics with paragraphs and 「자료 보기」 buttons.
 * Wide screens select the data shown on the right; narrow screens expand it under the paragraph.
 */
export default function LessonReading({ unit, lesson, wide, selectedId, onSelect, motion }) {
  const { book } = useBook();
  const [open, setOpen] = useState(() => new Set());
  const toggle = (key) => setOpen((current) => {
    const next = new Set(current);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  return (
    <>
      <p className="lesson-number">{unit.id} · 절 {lesson.index}</p>
      <h1>{lesson.title}</h1>
      {lesson.goal && <p className="goal">{lesson.goal}</p>}
      {lesson.opener && (
        <aside className="opener" aria-label="생각 열기">
          <p className="opener-label">생각 열기</p>
          <p>{lesson.opener}</p>
        </aside>
      )}
      <div className="prose">
        {lesson.sections.map((section, si) => (
          <section key={si} className="topic">
            {section.title && <h2>{section.title}</h2>}
            {section.paragraphs.map((paragraph, pi) => {
              const steps = paragraph.refs.map((id) => stepById(lesson, id)).filter(Boolean);
              return (
                <div key={pi} className="paragraph">
                  <p>{paragraph.text}</p>
                  {steps.length > 0 && (
                    <div className="data-buttons">
                      {steps.map((step) => {
                        const key = `${si}-${pi}-${step.id}`;
                        return <DataButton key={key} step={step} wide={wide} pressed={selectedId === step.id} expanded={open.has(key)} onClick={() => (wide ? onSelect(step.id) : toggle(key))} />;
                      })}
                    </div>
                  )}
                  {!wide && steps.filter((step) => open.has(`${si}-${pi}-${step.id}`)).map((step) => (
                    <div key={step.id} className="inline-stage">
                      <DataStage step={step} manifest={book.manifest} motion={motion} />
                    </div>
                  ))}
                </div>
              );
            })}
          </section>
        ))}
      </div>
      {lesson.illustration && (
        <figure className="illustration"><img src={lesson.illustration.src} alt={lesson.illustration.alt} /></figure>
      )}
      <KeyTerms ids={lesson.keyTerms} concepts={book.concepts} />
    </>
  );
}
