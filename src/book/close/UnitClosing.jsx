import { useEffect, useRef, useState } from 'react';
import Spread from '../Spread.jsx';
import { useBook, useUnitRecord } from '../BookContext.jsx';
import { routes } from '../router.js';
import DataStage from '../lesson/DataStage.jsx';
import { QUESTION_ORIGINS, lessonBornQuestions, questionText, reviseQuestion, selectedQuestions } from '../qft/questions.js';
import { buildResultFile, resultFileName } from '../../storage/resultFile.js';
import { ensurePilotRecordId, isPilotUnit } from '../../storage/unitRecords.js';

export const CLOSING_STAGES = [
  { id: 'explain', label: '설명하기' },
  { id: 'revise', label: '질문 다시 다듬기' },
  { id: 'transfer', label: '새 사례에 적용하기' },
  { id: 'reflect', label: '돌아보기' },
  { id: 'export', label: '결과 파일' },
];

const atLeast = (text, n = 4) => String(text ?? '').trim().length >= n;

const ready = {
  explain: (r) => Boolean(r.explanation.questionId) && atLeast(r.explanation.claim) && (r.explanation.evidenceIds ?? []).length > 0 && atLeast(r.explanation.reasoning),
  revise: (r) => atLeast(r.revisedQuestion),
  transfer: (r) => atLeast(r.transferResponse),
  reflect: (r) => atLeast(r.reflection),
};

function maxStage(record) {
  let stage = 0;
  for (const { id } of CLOSING_STAGES.slice(0, -1)) {
    if (!record.stageTimes?.[id]) break;
    stage += 1;
  }
  return stage;
}

function Explain({ record, update, unit }) {
  const questions = selectedQuestions(record);
  const explanation = { evidenceIds: [], ...record.explanation };
  const set = (patch) => update((current) => ({ ...current, explanation: { evidenceIds: [], ...current.explanation, ...patch } }));
  const toggleEvidence = (id) => set({ evidenceIds: explanation.evidenceIds.includes(id) ? explanation.evidenceIds.filter((item) => item !== id) : [...explanation.evidenceIds, id] });
  const lessonTitle = (lessonId) => unit.lessons.find((lesson) => lesson.id === lessonId)?.title;
  return (
    <div>
      <h2>내 질문에 답하기</h2>
      {questions.length > 0 && (
        <fieldset>
          <legend>답할 질문</legend>
          {questions.map((question) => (
            <label key={question.id} className="choice">
              <input type="radio" name="explain-question" checked={explanation.questionId === question.id} onChange={() => set({ questionId: question.id })} />
              {questionText(question)}
            </label>
          ))}
        </fieldset>
      )}
      <label htmlFor="claim">내 주장</label>
      <textarea id="claim" rows="2" value={explanation.claim} onChange={(event) => set({ claim: event.target.value })} />
      {record.evidence.length === 0 ? (
        <p className="notice">절에서 근거를 먼저 붙여 보세요. {unit.lessons.map((lesson) => <a key={lesson.id} href={routes.lesson(unit.id, lesson.index)}> 절 {lesson.index}</a>)}</p>
      ) : (
        <fieldset>
          <legend>주장을 뒷받침하는 근거</legend>
          {record.evidence.map((item) => (
            <div key={item.id}>
              <label className="choice">
                <input type="checkbox" checked={explanation.evidenceIds.includes(item.id)} onChange={() => toggleEvidence(item.id)} />
                {item.note}
              </label>
              {lessonTitle(item.lessonId) && <span className="hint">{lessonTitle(item.lessonId)}</span>}
            </div>
          ))}
        </fieldset>
      )}
      <label htmlFor="reasoning">근거와 주장을 잇는 설명</label>
      <textarea id="reasoning" rows="4" value={explanation.reasoning} onChange={(event) => set({ reasoning: event.target.value })} />
    </div>
  );
}

function Revise({ record, update, pilot }) {
  const [drafts, setDrafts] = useState({});
  const [reasons, setReasons] = useState({});
  const [sources, setSources] = useState({});
  const [evidenceSelections, setEvidenceSelections] = useState({});
  const original = record.questions.find((question) => question.id === record.explanation.questionId);
  const born = lessonBornQuestions(record);
  const chosen = selectedQuestions(record);
  const revisionTargets = [
    ...chosen,
    ...born.filter((question) => !chosen.some((item) => item.id === question.id)),
    ...(original && !chosen.some((item) => item.id === original.id) && !born.some((item) => item.id === original.id) ? [original] : []),
  ];
  const prefilled = useRef(false);
  useEffect(() => {
    if (prefilled.current || !original) return;
    prefilled.current = true;
    if (!record.revisedQuestion) update((current) => ({ ...current, revisedQuestion: questionText(original) }));
  }, [original, record.revisedQuestion, update]);
  return (
    <div>
      <h2>질문 다시 다듬기</h2>
      <p className="hint">탐구를 마친 지금, 처음 질문을 더 정확하거나 더 깊게 고쳐 씁니다.</p>
      {(!pilot || revisionTargets.length === 0) && <>
        <label htmlFor="revised">다듬은 질문</label>
        <textarea id="revised" rows="2" value={record.revisedQuestion} onChange={(event) => update((current) => ({ ...current, revisedQuestion: event.target.value }))} />
      </>}
      {pilot && revisionTargets.length > 0 && record.revisedQuestion?.trim() && <p className="hint">기존 마무리 질문: <span>{record.revisedQuestion}</span></p>}
      {pilot && revisionTargets.length > 0 && <section className="question-revision-editor" aria-labelledby="question-revision-title">
        <h3 id="question-revision-title">질문별 수정 기록</h3>
        <p className="hint">문장, 수정 이유, 출처는 학생이 기록합니다. 저장을 누를 때만 이력에 추가되고 처음 질문은 그대로 보존됩니다.</p>
        {revisionTargets.map((question) => {
          const currentText = questionText(question);
          const after = drafts[question.id] ?? currentText;
          const reason = reasons[question.id] ?? '';
          const source = sources[question.id] ?? 'student';
          const availableEvidence = record.evidence.filter((item) => item.questionId === question.id);
          const evidenceIds = evidenceSelections[question.id] ?? [];
          const revisions = Array.isArray(question.revisions) ? question.revisions.filter((revision) => typeof revision?.before === 'string' && typeof revision?.after === 'string' && typeof revision?.reason === 'string') : [];
          const canSave = Boolean(after.trim() && reason.trim() && after.trim() !== currentText);
          return <fieldset key={question.id}>
            <legend>{currentText}</legend>
            <label htmlFor={`question-revision-after-${question.id}`}>질문 수정: {currentText}</label>
            <textarea id={`question-revision-after-${question.id}`} rows="2" value={after} onChange={(event) => setDrafts((current) => ({ ...current, [question.id]: event.target.value }))} />
            <label htmlFor={`question-revision-reason-${question.id}`}>수정한 까닭: {currentText}</label>
            <textarea id={`question-revision-reason-${question.id}`} rows="2" value={reason} onChange={(event) => setReasons((current) => ({ ...current, [question.id]: event.target.value }))} />
            <label htmlFor={`question-revision-source-${question.id}`}>수정 출처: {currentText}</label>
            <select id={`question-revision-source-${question.id}`} value={source} onChange={(event) => setSources((current) => ({ ...current, [question.id]: event.target.value }))}>
              {QUESTION_ORIGINS.map((origin) => <option key={origin.value} value={origin.value}>{origin.label}</option>)}
            </select>
            {availableEvidence.length > 0 && <fieldset>
              <legend>수정에 연결할 근거 (선택)</legend>
              {availableEvidence.map((item) => <label key={item.id} className="choice">
                <input type="checkbox" checked={evidenceIds.includes(item.id)} onChange={(event) => setEvidenceSelections((current) => ({
                  ...current,
                  [question.id]: event.target.checked ? [...new Set([...evidenceIds, item.id])] : evidenceIds.filter((id) => id !== item.id),
                }))} />
                수정 근거: {item.note}
              </label>)}
            </fieldset>}
            <details className="question-revision-history">
              <summary>질문 이력 보기</summary>
              <p><strong>처음 질문:</strong> {question.initialText ?? question.text}</p>
              {revisions.length > 0 ? <ol>{revisions.map((revision, index) => <li key={revision.id ?? `${question.id}-revision-${index}`}>
                <p>{revision.before} → {revision.after}</p>
                <p>{revision.reason}</p>
                <p>출처: {QUESTION_ORIGINS.find((origin) => origin.value === revision.source)?.label ?? revision.source ?? '기록 없음'}</p>
                {revision.evidenceIds?.length > 0 && <p>연결한 근거: {revision.evidenceIds.map((id) => record.evidence.find((item) => item.id === id)?.note ?? id).join(', ')}</p>}
                {revision.createdAt && <time dateTime={revision.createdAt}>{revision.createdAt}</time>}
              </li>)}</ol> : <p className="hint">저장된 수정 기록이 없습니다.</p>}
            </details>
            <p className="row-actions"><button type="button" className="button secondary" aria-label={`질문 수정 저장: ${currentText}`} disabled={!canSave} onClick={() => update((current) => {
              const revised = reviseQuestion(current, { questionId: question.id, after, reason, source, evidenceIds }, new Date());
              if (revised === current || current.explanation.questionId !== question.id) return revised;
              return { ...revised, revisedQuestion: questionText(revised.questions.find((item) => item.id === question.id)) };
            })}>수정 기록 저장</button></p>
          </fieldset>;
        })}
      </section>}
      {born.length > 0 && (
        <section className="born-questions" aria-labelledby="born-title">
          <h3 id="born-title">학습하며 생긴 질문</h3>
          <p className="hint">절을 마치며 적은 질문입니다.{pilot ? ' 질문별 수정 기록에서 문장을 다듬을 수 있습니다.' : ' 하나를 불러와 다듬을 수도 있습니다.'}</p>
          <ul className="question-list">
            {born.map((question) => (
              <li key={question.id}>
                {questionText(question)}{' '}
                {!pilot && <button type="button" className="text-button" aria-label={`불러오기: ${questionText(question)}`} onClick={() => update((current) => ({ ...current, revisedQuestion: questionText(question) }))}>불러오기</button>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Transfer({ record, update, unit, manifest }) {
  const { transfer } = unit.closing;
  return (
    <div>
      <h2>새 사례에 적용하기</h2>
      <p>{transfer.prompt}</p>
      {transfer.step && <DataStage step={transfer.step} manifest={manifest} />}
      <label htmlFor="transfer">새 사례에 적용한 설명</label>
      <textarea id="transfer" rows="4" value={record.transferResponse} onChange={(event) => update((current) => ({ ...current, transferResponse: event.target.value }))} />
    </div>
  );
}

function Reflect({ record, update }) {
  return (
    <div>
      <h2>돌아보기</h2>
      <label htmlFor="reflection">질문이 어떻게 바뀌었고, 무엇을 새로 알게 되었는지</label>
      <textarea id="reflection" rows="4" value={record.reflection} onChange={(event) => update((current) => ({ ...current, reflection: event.target.value }))} />
    </div>
  );
}

function Export({ record, update, unit }) {
  const [done, setDone] = useState(false);
  function download() {
    const exportedRecord = ensurePilotRecordId(unit.id, record);
    const exportedAt = new Date();
    const file = buildResultFile(exportedRecord, unit, exportedAt);
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resultFileName(exportedRecord, unit.id);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    update((current) => ({
      ...current,
      ...(exportedRecord.recordId ? { recordId: exportedRecord.recordId } : {}),
      stageTimes: { ...current.stageTimes, export: exportedAt.toISOString() },
    }));
    setDone(true);
  }
  return (
    <div>
      <h2>결과 파일 내보내기</h2>
      <p className="hint">파일에는 내 질문, 근거, 설명이 담깁니다. 선생님이 안내한 곳에 직접 제출합니다. 실명 대신 번호나 별칭을 씁니다.</p>
      <label htmlFor="display-name">표시명(번호나 별칭)</label>
      <input id="display-name" type="text" value={record.displayName} onChange={(event) => update((current) => ({ ...current, displayName: event.target.value }))} />
      <p className="row-actions"><button type="button" className="button" onClick={download}>결과 파일 내보내기</button></p>
      {done && <p className="hint">{resultFileName(record, unit.id)} 파일을 내보냈습니다.</p>}
    </div>
  );
}

/** Unit closing spread: summary on the left, explanation → revision → transfer → reflection → export on the right. */
export default function UnitClosing({ unit }) {
  const { book } = useBook();
  const [record, update] = useUnitRecord(unit.id);
  const max = maxStage(record);
  const [view, setView] = useState(max);
  const lastIndex = CLOSING_STAGES.length - 1;
  const current = view === lastIndex ? lastIndex : Math.min(view, max);
  const stage = CLOSING_STAGES[current].id;
  const units = book.toc.parts.flatMap((part) => part.units);
  const nextUnit = units[units.findIndex((item) => item.id === unit.id) + 1];
  const nextReady = nextUnit && book.units.some((item) => item.id === nextUnit.id);

  function complete(stageId) {
    update((rec) => ({ ...rec, stageTimes: { ...rec.stageTimes, [stageId]: rec.stageTimes[stageId] ?? new Date().toISOString() } }));
    setView(CLOSING_STAGES.findIndex((item) => item.id === stageId) + 1);
  }

  const left = (
    <>
      <p className="lesson-number">{unit.id} · 마무리</p>
      <h1>{unit.title} 정리</h1>
      <div className="prose">
        {unit.closing.summary.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {unit.closing.bridge && <p>{unit.closing.bridge}</p>}
      </div>
      {nextUnit && (nextReady ? <p><a href={routes.open(nextUnit.id)}>다음 중단원: {nextUnit.title} →</a></p> : <p className="hint">다음 중단원: {nextUnit.title}</p>)}
    </>
  );

  const right = (
    <>
      <ol className="stage-steps" aria-label="마무리 단계">
        {CLOSING_STAGES.map((item, index) => (
          <li key={item.id} aria-current={index === current ? 'step' : undefined}>
            {index <= max || index === lastIndex ? <button type="button" className="text-button" onClick={() => setView(index)}>{index + 1}. {item.label}</button> : <span>{index + 1}. {item.label}</span>}
          </li>
        ))}
      </ol>
      {stage === 'explain' && <Explain record={record} update={update} unit={unit} />}
      {stage === 'revise' && <Revise record={record} update={update} pilot={isPilotUnit(unit.id)} />}
      {stage === 'transfer' && <Transfer record={record} update={update} unit={unit} manifest={book.manifest} />}
      {stage === 'reflect' && <Reflect record={record} update={update} />}
      {stage === 'export' && <Export record={record} update={update} unit={unit} />}
      {stage !== 'export' && (
        <p className="row-actions"><button type="button" className="button" disabled={!ready[stage](record)} onClick={() => complete(stage)}>다음 단계</button></p>
      )}
    </>
  );

  return (
    <article className="closing-page">
      <Spread left={left} right={right} pages={[unit.lessons.length * 2 + 3, unit.lessons.length * 2 + 4]} label={`${unit.title} 닫는 쪽`} />
    </article>
  );
}
