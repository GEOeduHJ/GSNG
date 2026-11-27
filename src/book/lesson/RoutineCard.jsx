import { useUnitRecord } from '../BookContext.jsx';
import { newQuestion } from '../qft/questions.js';

/**
 * One thinking-routine card (Project Zero routine, Korean prompts written for this textbook).
 * Answers live in record.routineState[lessonId][slot][stepId]; a toQuestion step can be sent once
 * to the unit's question list (same path as lesson-born questions).
 */
export default function RoutineCard({ unit, lesson, slot, routine }) {
  const [record, update] = useUnitRecord(unit.id);
  if (!routine) return null;
  const answers = record.routineState?.[lesson.id]?.[slot] ?? {};
  const setAnswers = (patch) => update((current) => {
    const byLesson = current.routineState?.[lesson.id] ?? {};
    return { ...current, routineState: { ...current.routineState, [lesson.id]: { ...byLesson, [slot]: { ...(byLesson[slot] ?? {}), ...patch } } } };
  });
  function send(text) {
    update((current) => {
      const byLesson = current.routineState?.[lesson.id] ?? {};
      return {
        ...current,
        questions: [...current.questions, newQuestion(text, { fromLessonId: lesson.id })],
        routineState: { ...current.routineState, [lesson.id]: { ...byLesson, [slot]: { ...(byLesson[slot] ?? {}), sent: text } } },
      };
    });
  }
  return (
    <section className="routine-card" data-slot={slot} aria-label={`생각 루틴 ${routine.name}`}>
      <h3>생각 루틴 · {routine.name}({routine.nameKo})</h3>
      {routine.prompt && <p className="routine-prompt">{routine.prompt}</p>}
      <div className="routine-steps">
        {routine.steps.map((step) => {
          const fieldId = `routine-${lesson.id}-${slot}-${step.id}`;
          const value = String(answers[step.id] ?? '');
          const text = value.trim();
          const alreadySent = Boolean(text) && answers.sent === text;
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
    </section>
  );
}
