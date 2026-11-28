import { forwardRef, useState } from 'react';
import { useBook, useUnitRecord } from '../BookContext.jsx';
import { resolveConceptId } from '../../content-loader/concepts.js';
import { routes } from '../router.js';
import { lessonBornQuestions, newQuestion, questionText, selectedQuestions } from './questions.js';
import RoutineCard from '../lesson/RoutineCard.jsx';
import { routineForSlot } from '../../content-loader/routines.js';
import { isPilotUnit } from '../../storage/unitRecords.js';
import { pilotAnswerSources } from '../lesson/pilotRoutines.js';

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

/**
 * 「내 질문과 이 절」: attach evidence from this lesson to the priority questions,
 * then close the lesson by writing the new questions it raised (they join the unit's question list).
 */
const LessonQuestions = forwardRef(function LessonQuestions({ unit, lesson, selectedStepId }, ref) {
  const { book } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const priority = selectedQuestions(record);
  const related = relatedQuestions(record, lesson, book.concepts);
  const shown = related.length ? related : priority;
  const dataSteps = lesson.steps.filter((step) => step.type !== 'text');
  const [questionId, setQuestionId] = useState('');
  const [stepChoice, setStepChoice] = useState('');
  const [note, setNote] = useState('');
  const [answerSourceId, setAnswerSourceId] = useState('');
  const [draftSourceRef, setDraftSourceRef] = useState(null);
  const [newText, setNewText] = useState('');
  const born = lessonBornQuestions(record, lesson.id);
  const canAdd = newText.trim().length >= 4;
  const validChoice = dataSteps.some((step) => step.id === stepChoice) ? stepChoice : '';
  const stepId = validChoice || selectedStepId || dataSteps[0]?.id || '';
  const chosen = shown.some((question) => question.id === questionId) ? questionId : '';
  const canAttach = Boolean(chosen) && note.trim().length >= 4;
  const attached = record.evidence.filter((item) => item.lessonId === lesson.id);
  const pilot = isPilotUnit(unit.id);
  const answerSources = pilot ? pilotAnswerSources(record, lesson, book) : [];
  const selectedAnswerSource = answerSources.find((source) => source.id === answerSourceId);

  function loadAnswerSource() {
    if (!selectedAnswerSource) return;
    setNote(selectedAnswerSource.text);
    setDraftSourceRef(selectedAnswerSource.sourceRef);
  }

  function attach() {
    if (!canAttach) return;
    update((current) => ({ ...current, evidence: [...current.evidence, {
      id: newId(), questionId: chosen, lessonId: lesson.id, stepId, note: note.trim(),
      ...(draftSourceRef ? { sourceRef: draftSourceRef } : {}),
    }] }));
    setNote('');
    setAnswerSourceId('');
    setDraftSourceRef(null);
  }

  function addQuestion() {
    if (!canAdd) return;
    update((current) => ({ ...current, questions: [...current.questions, newQuestion(newText.trim(), { fromLessonId: lesson.id, trackHistory: isPilotUnit(unit.id) })] }));
    setNewText('');
  }

  const captionOf = (stepId) => dataSteps.find((step) => step.id === stepId)?.caption;

  return (
    <section className="my-questions" ref={ref} aria-labelledby={`mq-${lesson.id}`}>
      <h2 id={`mq-${lesson.id}`}>내 질문과 이 절</h2>
      <RoutineCard unit={unit} lesson={lesson} slot="closing" routine={routineForSlot(book, lesson, 'closing')} />
      <h3>여는 쪽에서 고른 질문에 근거 붙이기</h3>
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
      {pilot && <div className="answer-reuse">
        <label htmlFor={`answer-source-${lesson.id}`}>불러올 응답</label>
        <select id={`answer-source-${lesson.id}`} value={answerSourceId} onChange={(event) => setAnswerSourceId(event.target.value)}>
          <option value="">응답을 선택하세요</option>
          {answerSources.map((source) => <option key={source.id} value={source.id}>{source.label}</option>)}
        </select>
        <button type="button" className="button secondary" disabled={!selectedAnswerSource} onClick={loadAnswerSource}>응답을 초안에 불러오기</button>
      </div>}
      <label htmlFor={`evidence-note-${lesson.id}`}>{pilot ? '근거 초안 · 자료에서 찾은 것' : '이 자료에서 찾은 근거'}</label>
      <textarea id={`evidence-note-${lesson.id}`} rows="2" value={note} onChange={(event) => {
        const next = event.target.value;
        setNote(next);
        if (draftSourceRef && next !== selectedAnswerSource?.text) setDraftSourceRef(null);
      }} />
      <p className="row-actions"><button type="button" className="button" disabled={!canAttach} onClick={attach}>근거로 붙이기</button></p>
      {attached.length > 0 && (
        <ul className="evidence-list">
          {attached.map((item) => <li key={item.id}>{item.note}{captionOf(item.stepId) && <span className="evidence-source"> · {captionOf(item.stepId)}</span>}{item.sourceRef?.kind === 'routine' && <span className="evidence-source"> · 생각 루틴 응답</span>}{item.sourceRef?.kind === 'activity' && <span className="evidence-source"> · 활동 응답</span>}{item.sourceRef?.kind === 'fictional' && <span className="evidence-source"> · 가상 상황 활동</span>}</li>)}
        </ul>
      )}
      <h3>이 절을 마치며</h3>
      <label htmlFor={`new-q-${lesson.id}`}>이 절을 마치며 새로 생긴 질문</label>
      <textarea id={`new-q-${lesson.id}`} rows="2" value={newText} onChange={(event) => setNewText(event.target.value)} />
      <p className="row-actions"><button type="button" className="button secondary" disabled={!canAdd} onClick={addQuestion}>질문 목록에 넣기</button></p>
      {born.length > 0 && (
        <ul className="evidence-list" aria-label="이 절에서 생긴 질문">
          {born.map((question) => <li key={question.id}>{question.text}</li>)}
        </ul>
      )}
      <p className="hint">넣은 질문은 여는 쪽 질문 목록과 마무리 쪽 「질문 다시 다듬기」에서 다시 볼 수 있습니다.</p>
    </section>
  );
});

export default LessonQuestions;
