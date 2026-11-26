import { useState } from 'react';
import Spread from '../Spread.jsx';
import { useBook, useUnitRecord } from '../BookContext.jsx';
import { routes } from '../router.js';
import DataStage from '../lesson/DataStage.jsx';
import { filled, newQuestion, opposite, questionText, selectedQuestions } from './questions.js';

export const OPENING_STAGES = [
  { id: 'rules', label: '규칙 확인' },
  { id: 'produce', label: '질문 만들기' },
  { id: 'improve', label: '질문 다듬기' },
  { id: 'prioritize', label: '질문 고르기' },
  { id: 'plan', label: '탐구 계획' },
];

export function maxOpeningStage(record) {
  let stage = 0;
  for (const { id } of OPENING_STAGES.slice(0, -1)) {
    if (!record.stageTimes?.[id]) break;
    stage += 1;
  }
  return stage;
}

/** Earlier-unit questions and the external AI link open only after the student finishes producing questions. */
export function canShowCarryOver(record) {
  return Boolean(record.stageTimes?.produce) && (record.questions ?? []).some(filled);
}

/** Plan is done when at least one priority question exists, each has a concept tag, and the plan line is written. */
export function planReady(record) {
  const chosen = selectedQuestions(record);
  return chosen.length > 0 && chosen.every((q) => q.conceptTags.length > 0) && record.nextStepPlan.trim().length >= 4;
}

const stageReady = {
  produce: (record) => record.questions.some(filled),
  improve: (record) => {
    const list = record.questions.filter(filled);
    return list.length > 0 && list.every((q) => q.classification) && list.some((q) => q.convertedText?.trim());
  },
  prioritize: (record) => {
    const count = selectedQuestions(record).length;
    return count >= 1 && count <= 3 && record.priorityReason.trim().length >= 4;
  },
  plan: (record) => planReady(record),
};

function previousUnitId(book, unitId) {
  const ids = book.toc.parts.flatMap((part) => part.units.map((unit) => unit.id));
  const index = ids.indexOf(unitId);
  return index > 0 ? ids[index - 1] : null;
}

function Rules({ onStart }) {
  return (
    <div>
      <h2>질문을 만들기 전에</h2>
      <ol className="rules">
        <li>떠오르는 질문을 되도록 많이 쓴다.</li>
        <li>쓰는 동안에는 질문을 평가하거나 답하거나 고치지 않는다.</li>
        <li>떠오른 그대로 적는다.</li>
        <li>문장으로 떠오르면 질문 꼴로 바꿔 적는다.</li>
      </ol>
      <button type="button" className="button" onClick={onStart}>선생님 안내에 따라 시작</button>
    </div>
  );
}

function Produce({ record, update }) {
  const rows = record.questions.length ? record.questions : [null];
  function change(index, text) {
    update((current) => {
      const questions = current.questions.length ? [...current.questions] : [newQuestion()];
      questions[index] = { ...questions[index], text };
      return { ...current, questions };
    });
  }
  return (
    <div>
      <h2>자료를 보고 질문 만들기</h2>
      <ol className="question-list">
        {rows.map((question, index) => (
          <li key={index === 0 ? 'row-first' : question.id}>
            <label htmlFor={`q-${index}`}>질문 {index + 1}</label>
            <input id={`q-${index}`} type="text" value={question?.text ?? ''} onChange={(event) => change(index, event.target.value)} />
            {question && <button type="button" className="text-button" aria-label={`질문 ${index + 1} 지우기`} onClick={() => update((current) => ({ ...current, questions: current.questions.filter((item) => item.id !== question.id) }))}>지우기</button>}
          </li>
        ))}
      </ol>
      <button type="button" className="button secondary" onClick={() => update((current) => ({ ...current, questions: [...(current.questions.length ? current.questions : [newQuestion()]), newQuestion()] }))}>질문 추가</button>
    </div>
  );
}

function Improve({ record, update }) {
  const setQuestion = (id, patch) => update((current) => ({ ...current, questions: current.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)) }));
  return (
    <div>
      <h2>닫힌 질문과 열린 질문</h2>
      <p className="hint">닫힌 질문은 예·아니요나 한 단어로 답할 수 있고, 열린 질문은 설명이 필요합니다. 각 질문을 분류하고, 적어도 하나는 다른 종류로 바꿔 써 봅니다.</p>
      <ol className="question-list">
        {record.questions.filter(filled).map((question) => (
          <li key={question.id}>
            <fieldset>
              <legend>{question.text}</legend>
              {['닫힌', '열린'].map((type) => (
                <label key={type} className="choice">
                  <input type="radio" name={`class-${question.id}`} checked={question.classification === type} onChange={() => setQuestion(question.id, { classification: type, convertedType: opposite(type) })} />
                  {type} 질문
                </label>
              ))}
              {question.classification && <>
                <label htmlFor={`convert-${question.id}`}>{opposite(question.classification)} 질문으로 바꾸기</label>
                <input id={`convert-${question.id}`} type="text" value={question.convertedText} onChange={(event) => setQuestion(question.id, { convertedText: event.target.value })} />
              </>}
            </fieldset>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Prioritize({ record, update }) {
  const count = selectedQuestions(record).length;
  const setQuestion = (id, patch) => update((current) => ({ ...current, questions: current.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)) }));
  function toggle(question) {
    update((current) => {
      const chosen = current.questions.filter((q) => q.selected && filled(q)).length;
      if (!question.selected && chosen >= 3) return current;
      return { ...current, questions: current.questions.map((q) => (q.id === question.id ? { ...q, selected: !q.selected } : q)) };
    });
  }
  return (
    <div>
      <h2>탐구할 질문 고르기</h2>
      <p className="hint">이 중단원 동안 자료로 답을 찾아갈 질문을 1~3개 고릅니다. 지금 {count}개를 골랐습니다.</p>
      <ul className="question-list">
        {record.questions.filter(filled).map((question) => (
          <li key={question.id}>
            <label className="choice">
              <input type="checkbox" checked={question.selected} disabled={!question.selected && count >= 3} onChange={() => toggle(question)} />
              {question.text}
            </label>
            {question.selected && question.convertedText?.trim() && (
              <div>
                {[['original', `처음 질문: ${question.text}`], ['converted', `바꾼 질문: ${question.convertedText}`]].map(([value, text]) => (
                  <label key={value} className="choice">
                    <input type="radio" name={`version-${question.id}`} checked={question.selectedVersion === value} onChange={() => setQuestion(question.id, { selectedVersion: value })} />
                    {text}
                  </label>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <label htmlFor="priority-reason">이 질문들을 고른 까닭</label>
      <textarea id="priority-reason" rows="3" value={record.priorityReason} onChange={(event) => update((current) => ({ ...current, priorityReason: event.target.value }))} />
    </div>
  );
}

function Plan({ record, update, unit, concepts }) {
  const toggleTag = (question, tag) => update((current) => ({
    ...current,
    questions: current.questions.map((q) => (q.id === question.id ? { ...q, conceptTags: q.conceptTags.includes(tag) ? q.conceptTags.filter((t) => t !== tag) : [...q.conceptTags, tag] } : q)),
  }));
  const ready = stageReady.plan(record);
  return (
    <div>
      <h2>탐구 계획 세우기</h2>
      <p className="hint">질문마다 관련된 개념을 하나 이상 고릅니다. 같은 개념을 다루는 절에서 이 질문을 다시 만납니다.</p>
      {selectedQuestions(record).map((question) => (
        <fieldset key={question.id}>
          <legend>{questionText(question)}</legend>
          {unit.concepts.map((id) => (
            <label key={id} className="choice">
              <input type="checkbox" checked={question.conceptTags.includes(id)} onChange={() => toggleTag(question, id)} />
              {concepts[id]?.label ?? id}
            </label>
          ))}
        </fieldset>
      ))}
      <label htmlFor="next-step-plan">어떤 자료와 절에서 찾아볼지</label>
      <textarea id="next-step-plan" rows="2" value={record.nextStepPlan} onChange={(event) => update((current) => ({ ...current, nextStepPlan: event.target.value }))} />
      {ready && (
        <p className="row-actions">
          <a className="button" href={routes.lesson(unit.id, 1)} onClick={() => update((current) => ({ ...current, stageTimes: { ...current.stageTimes, plan: current.stageTimes.plan ?? new Date().toISOString() } }))}>절 1 읽으러 가기 →</a>
        </p>
      )}
    </div>
  );
}

/** Unit opening spread: introduction on the left, question focus and QFT stages 1–6 on the right. */
export default function UnitOpening({ unit }) {
  const { book, units } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const max = maxOpeningStage(record);
  const [view, setView] = useState(max);
  const current = Math.min(view, max);
  const stage = OPENING_STAGES[current].id;

  function complete(stageId) {
    update((rec) => ({ ...rec, stageTimes: { ...rec.stageTimes, [stageId]: rec.stageTimes[stageId] ?? new Date().toISOString() } }));
    setView(OPENING_STAGES.findIndex((item) => item.id === stageId) + 1);
  }

  const previousId = previousUnitId(book, unit.id);
  const carried = previousId ? selectedQuestions(units[previousId] ?? { questions: [] }) : [];
  const showCarry = canShowCarryOver(record);

  const left = (
    <>
      <p className="lesson-number">{unit.standardCode}</p>
      <h1>{unit.title}</h1>
      {unit.goal && <p className="goal">{unit.goal}</p>}
      {unit.opening.illustration && <figure className="illustration"><img src={unit.opening.illustration.src} alt={unit.opening.illustration.alt} /></figure>}
      <div className="prose">{unit.opening.intro.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </>
  );

  const right = (
    <>
      <DataStage step={unit.opening.focus.step} manifest={book.manifest} />
      <ol className="stage-steps" aria-label="질문 만들기 단계">
        {OPENING_STAGES.map((item, index) => (
          <li key={item.id} aria-current={index === current ? 'step' : undefined}>
            {index <= max ? <button type="button" className="text-button" onClick={() => setView(index)}>{index + 1}. {item.label}</button> : <span>{index + 1}. {item.label}</span>}
          </li>
        ))}
      </ol>
      {stage === 'rules' && <Rules onStart={() => complete('rules')} />}
      {stage === 'produce' && <Produce record={record} update={update} />}
      {stage === 'improve' && <Improve record={record} update={update} />}
      {stage === 'prioritize' && <Prioritize record={record} update={update} />}
      {stage === 'plan' && <Plan record={record} update={update} unit={unit} concepts={book.concepts} />}
      {stage !== 'rules' && stage !== 'plan' && (
        <p className="row-actions"><button type="button" className="button" disabled={!stageReady[stage](record)} onClick={() => complete(stage)}>다음 단계</button></p>
      )}
      {showCarry && (
        <aside className="my-questions">
          {carried.length > 0 && <>
            <h3>지난 중단원에서 남은 질문</h3>
            <ul>{carried.map((question) => <li key={question.id}>{questionText(question)}</li>)}</ul>
          </>}
          <p className="hint">
            <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">외부 AI로 질문 넓혀 보기(선택, 새 창)</a> — 학교 계정으로만 쓰고, AI가 낸 질문은 내 질문과 구분해 적습니다.
          </p>
        </aside>
      )}
    </>
  );

  return (
    <article className="opening-page">
      <Spread left={left} right={right} pages={[1, 2]} label={`${unit.title} 여는 쪽`} />
    </article>
  );
}
