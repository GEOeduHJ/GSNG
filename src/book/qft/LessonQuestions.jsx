import { forwardRef, useState } from 'react';
import { useBook, useUnitRecord } from '../BookContext.jsx';
import { resolveConceptId } from '../../content-loader/concepts.js';
import { routes } from '../router.js';
import { questionText, selectedQuestions } from './questions.js';

export function relatedQuestions(record, lesson, concepts) {
  const lessonConcepts = new Set([...(lesson.keyTerms ?? []), ...lesson.steps.flatMap((step) => step.concepts ?? [])]
    .map((id) => resolveConceptId(id, concepts)).filter(Boolean));
  return selectedQuestions(record).filter((question) => question.conceptTags
    .map((id) => resolveConceptId(id, concepts))
    .some((id) => id && lessonConcepts.has(id)));
}

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `e-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** "My questions" for this lesson: which priority questions it can help answer, and attaching evidence to them. */
const LessonQuestions = forwardRef(function LessonQuestions({ unit, lesson, currentStepId }, ref) {
  const { book } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const priority = selectedQuestions(record);
  const related = relatedQuestions(record, lesson, book.concepts);
  const shown = related.length ? related : priority;
  const dataSteps = lesson.steps.filter((step) => step.type !== 'text');
  const [questionId, setQuestionId] = useState('');
  const [stepChoice, setStepChoice] = useState('');
  const [note, setNote] = useState('');
  const validChoice = dataSteps.some((step) => step.id === stepChoice) ? stepChoice : '';
  const stepId = validChoice || currentStepId || dataSteps[0]?.id || '';
  const chosen = shown.some((question) => question.id === questionId) ? questionId : '';
  const canAttach = Boolean(chosen) && note.trim().length >= 4;
  const attached = record.evidence.filter((item) => item.lessonId === lesson.id);

  function attach() {
    if (!canAttach) return;
    update((current) => ({ ...current, evidence: [...current.evidence, { id: newId(), questionId: chosen, lessonId: lesson.id, stepId, note: note.trim() }] }));
    setNote('');
  }

  return (
    <section className="my-questions" ref={ref} aria-labelledby={`mq-${lesson.id}`}>
      <h2 id={`mq-${lesson.id}`}>내 질문과 이 절</h2>
      {priority.length === 0 && <p className="hint">아직 고른 질문이 없습니다. <a href={routes.open(unit.id)}>여는 쪽에서 질문을 먼저 만들어 보세요</a>.</p>}
      {priority.length > 0 && related.length === 0 && <p className="hint">이 절과 직접 이어진 개념의 질문은 없습니다. 고른 질문 가운데 이 자료로 답할 수 있는 것이 있다면 근거를 붙여 봅니다.</p>}
      {shown.length > 0 && (
        <fieldset>
          <legend>근거를 붙일 질문</legend>
          {shown.map((question) => (
            <label key={question.id} className="choice">
              <input type="radio" name={`evidence-q-${lesson.id}`} checked={chosen === question.id} onChange={() => setQuestionId(question.id)} />
              {questionText(question)}
            </label>
          ))}
        </fieldset>
      )}
      {dataSteps.length > 0 && <>
        <label htmlFor={`evidence-step-${lesson.id}`}>어느 자료에서</label>
        <select id={`evidence-step-${lesson.id}`} value={stepId} onChange={(event) => setStepChoice(event.target.value)}>
          {dataSteps.map((step) => <option key={step.id} value={step.id}>{step.caption}</option>)}
        </select>
      </>}
      <label htmlFor={`evidence-note-${lesson.id}`}>이 자료에서 찾은 근거</label>
      <textarea id={`evidence-note-${lesson.id}`} rows="2" value={note} onChange={(event) => setNote(event.target.value)} />
      <p className="row-actions"><button type="button" className="button" disabled={!canAttach} onClick={attach}>근거로 붙이기</button></p>
      {attached.length > 0 && (
        <ul className="evidence-list">
          {attached.map((item) => <li key={item.id}>{item.note}</li>)}
        </ul>
      )}
    </section>
  );
});

export default LessonQuestions;
