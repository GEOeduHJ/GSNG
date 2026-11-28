import { useUnitRecord } from '../BookContext.jsx';
import { newQuestion, questionText, selectedQuestions } from '../qft/questions.js';
import { isPilotUnit } from '../../storage/unitRecords.js';
import { isDefaultPilotRoutine } from './pilotRoutines.js';

function RoutineFields({ routine, lesson, slot, answers, setAnswers, send, record }) {
  const inList = (questions, text) => (questions ?? []).some((question) => String(question?.text ?? '').trim() === text);
  return (
    <>
      {routine.prompt && <p className="routine-prompt">{routine.prompt}</p>}
      <div className="routine-steps">
        {routine.steps.map((step) => {
          const fieldId = `routine-${lesson.id}-${slot}-${step.id}`;
          const value = String(answers[step.id] ?? '');
          const text = value.trim();
          const alreadySent = Boolean(text) && inList(record.questions, text);
          return (
            <div key={step.id} className="routine-step">
              <label htmlFor={fieldId}>{step.label}</label>
              {step.hint && <p className="hint">{step.hint}</p>}
              <textarea id={fieldId} rows="2" value={value} onChange={(event) => setAnswers({ [step.id]: event.target.value })} />
              {step.toQuestion && (
                <p className="row-actions">
                  <button type="button" className="button secondary" disabled={text.length < 4 || alreadySent} onClick={() => send(text)}>질문 목록에 넣기</button>
                  {alreadySent && <span className="hint" role="status">넣었습니다</span>}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function SelectedQuestionContext({ record }) {
  const questions = selectedQuestions(record);
  return (
    <aside className="pilot-question-context" aria-label="현재 선택한 질문">
      <p className="pilot-question-label">현재 선택한 질문</p>
      {questions.length ? <ul>{questions.map((question) => <li key={question.id}>{questionText(question)}</li>)}</ul> : <p className="hint">여는 쪽에서 이어갈 질문을 고르면 여기에 표시됩니다.</p>}
    </aside>
  );
}

/**
 * One thinking-routine card (Project Zero routine, Korean prompts written for this textbook).
 * Answers live in record.routineState[lessonId][slot][stepId]; a toQuestion step can be sent once
 * to the unit's question list (same path as lesson-born questions).
 */
export default function RoutineCard({ unit, lesson, slot, routine }) {
  const [record, update] = useUnitRecord(unit.id);
  if (!routine) return null;
  const pilot = isPilotUnit(unit.id);
  const defaultRoutine = pilot && isDefaultPilotRoutine(unit.id, lesson, slot);
  const answers = record.routineState?.[lesson.id]?.[slot] ?? {};
  const setAnswers = (patch) => update((current) => {
    const byLesson = current.routineState?.[lesson.id] ?? {};
    return { ...current, routineState: { ...current.routineState, [lesson.id]: { ...byLesson, [slot]: { ...(byLesson[slot] ?? {}), ...patch } } } };
  });
  const inList = (questions, text) => (questions ?? []).some((question) => String(question?.text ?? '').trim() === text);
  function send(text) {
    update((current) => {
      if (inList(current.questions, text)) return current;
      const byLesson = current.routineState?.[lesson.id] ?? {};
      return {
        ...current,
        questions: [...current.questions, newQuestion(text, { fromLessonId: lesson.id, origin: 'routine', trackHistory: isPilotUnit(unit.id) })],
        routineState: { ...current.routineState, [lesson.id]: { ...byLesson, [slot]: { ...(byLesson[slot] ?? {}), sent: text } } },
      };
    });
  }
  const fields = <RoutineFields routine={routine} lesson={lesson} slot={slot} answers={answers} setAnswers={setAnswers} send={send} record={record} />;
  const title = <h3>생각 루틴 · {routine.name}({routine.nameKo})</h3>;

  if (pilot && !defaultRoutine) {
    return (
      <details className="routine-card routine-card-choice" data-slot={slot} data-default="false">
        <summary>선택 생각 루틴 · {routine.nameKo}</summary>
        {title}
        {fields}
      </details>
    );
  }

  return (
    <section className="routine-card" data-slot={slot} data-default={pilot ? 'true' : undefined} aria-label={`생각 루틴 ${routine.name}`}>
      {defaultRoutine && <SelectedQuestionContext record={record} />}
      {title}
      {fields}
    </section>
  );
}
