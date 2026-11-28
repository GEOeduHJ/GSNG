import { useMemo, useState } from 'react';
import { useBook } from '../book/BookContext.jsx';
import { questionText } from '../book/qft/questions.js';
import { SKIP_REASONS, summarizeResults } from './summarize.js';
import TeacherGuide from './TeacherGuide.jsx';
import { routineForSlot } from '../content-loader/routines.js';
import { isPilotUnit } from '../storage/unitRecords.js';
import { buildFeedbackFile, feedbackFileName } from '../storage/feedbackFile.js';
import { pilotAnswerSources } from '../book/lesson/pilotRoutines.js';

function readFile(file) {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function ActivityAnswers({ student, unit, book }) {
  const record = { ...student, routineState: student.routineResponses };
  const answers = (unit?.lessons ?? []).flatMap((lesson) => pilotAnswerSources(record, lesson, book)
    .filter((source) => source.sourceRef.kind === 'activity')
    .map((source) => ({ lessonTitle: lesson.title, ...source })));
  return (
    <>
      <h3>활동 응답</h3>
      {answers.length ? <ul>{answers.map((answer) => <li key={`${answer.sourceRef.lessonId}:${answer.sourceRef.fieldId}`}>
        <strong>{answer.lessonTitle} · {answer.label}</strong> — {answer.text}
      </li>)}</ul> : <p className="hint">활동 응답 없음</p>}
    </>
  );
}

const SLOT_LABELS = { opener: '생각 열기', inquiry: '탐구하기', closing: '정리' };
const isPlainObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/** Routine answers by lesson and slot; labels come from the routine library, the internal `sent` mark is hidden. */
function RoutineAnswers({ student, unit, book }) {
  const byLesson = isPlainObject(student.routineResponses) ? student.routineResponses : {};
  const lessons = (unit?.lessons ?? []).filter((lesson) => isPlainObject(byLesson[lesson.id]));
  if (!lessons.length) return <p className="hint">응답 없음</p>;
  return (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <strong>{lesson.title}</strong>
          {['opener', 'inquiry', 'closing'].filter((slot) => isPlainObject(byLesson[lesson.id]?.[slot])).map((slot) => {
            const routine = routineForSlot(book, lesson, slot);
            const answers = byLesson[lesson.id][slot];
            const lines = Object.entries(answers).filter(([key, value]) => key !== 'sent' && typeof value === 'string' && value.trim())
              .map(([key, value]) => `${routine?.steps.find((step) => step.id === key)?.label ?? key}: ${value}`);
            return lines.length ? <p key={slot}>{SLOT_LABELS[slot]}{routine ? ` · ${routine.name}` : ''} — {lines.join(' / ')}</p> : null;
          })}
        </li>
      ))}
    </ul>
  );
}

function FeedbackComposer({ student, unitId }) {
  const [comments, setComments] = useState({});
  const [done, setDone] = useState(false);
  const questions = (student.questions ?? []).filter((question) => typeof question.id === 'string' && question.id && question.text?.trim());
  const hasComment = Object.values(comments).some((text) => typeof text === 'string' && text.trim());
  function download() {
    const file = buildFeedbackFile(student, unitId, Object.entries(comments).map(([questionId, text]) => ({ questionId, text })), new Date());
    if (!file) return;
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = feedbackFileName(student, unitId);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDone(true);
  }
  if (!student.recordId) return (
    <section aria-label="교사 피드백 작성">
      <h3>교사 피드백</h3>
      <p className="hint">이전 형식 결과에는 안정적인 학생 기록 표시가 없습니다. 학생에게 초안을 작성한 같은 기기·브라우저에서 결과 파일을 다시 내보내 달라고 안내해 주세요.</p>
    </section>
  );
  return (
    <section aria-label="교사 피드백 작성">
      <h3>교사 피드백</h3>
      <p className="hint">질문별 코멘트를 적어 별도 피드백 JSON으로 내보냅니다. 파일은 자동 전송되거나 저장되지 않습니다.</p>
      {questions.length ? questions.map((question) => (
        <div key={question.id}>
          <label htmlFor={`teacher-feedback-${student.recordId}-${question.id}`}>교사 코멘트: {questionText(question)}</label>
          <textarea id={`teacher-feedback-${student.recordId}-${question.id}`} rows="3" value={comments[question.id] ?? ''} onChange={(event) => setComments((current) => ({ ...current, [question.id]: event.target.value }))} />
        </div>
      )) : <p className="hint">코멘트를 작성할 질문이 없습니다.</p>}
      <p className="row-actions no-print">
        <button type="button" className="button secondary" disabled={!hasComment} onClick={download}>피드백 파일 내보내기</button>
      </p>
      {done && <p className="hint">학생에게 피드백 JSON 파일을 직접 전달해 주세요.</p>}
    </section>
  );
}

function FeedbackReadback({ student }) {
  const feedbacks = (Array.isArray(student.teacherFeedbacks) ? student.teacherFeedbacks : []).filter((feedback) => typeof feedback?.feedbackId === 'string'
    && Array.isArray(feedback.comments)
    && feedback.comments.every((comment) => typeof comment?.questionId === 'string' && typeof comment?.text === 'string'));
  const questionRevisions = (student.questions ?? []).flatMap((question) => (Array.isArray(question.revisions) ? question.revisions : [])
    .filter((revision) => typeof revision?.id === 'string' && typeof revision.before === 'string' && typeof revision.after === 'string')
    .map((revision) => ({ question, revision })));
  const explanationRevisions = (Array.isArray(student.explanationRevisions) ? student.explanationRevisions : []).filter((revision) => typeof revision?.id === 'string' && isPlainObject(revision.before) && isPlainObject(revision.after));
  const questionRevisionById = new Map(questionRevisions.map(({ question, revision }) => [revision.id, { question, revision }]));
  const explanationRevisionById = new Map(explanationRevisions.map((revision) => [revision.id, revision]));
  const commentsFor = (feedbackIds, questionId) => (Array.isArray(feedbackIds) ? feedbackIds : []).flatMap((feedbackId) => {
    const feedback = feedbacks.find((item) => item.feedbackId === feedbackId);
    const comment = feedback?.comments.find((item) => item.questionId === questionId);
    return comment ? [comment.text] : [];
  });
  const responseQuestionChange = (id) => {
    const change = questionRevisionById.get(id);
    return change ? `질문 수정: ${change.revision.before} → ${change.revision.after}` : '';
  };
  const responseExplanationChange = (id) => {
    const change = explanationRevisionById.get(id);
    if (!change) return '';
    return `설명 수정: ${change.before?.claim || '—'} → ${change.after?.claim || '—'}`;
  };
  const responses = (Array.isArray(student.feedbackResponses) ? student.feedbackResponses : []).filter((response) => typeof response?.feedbackId === 'string' && typeof response.reason === 'string');
  if (!feedbacks.length && !questionRevisions.length && !explanationRevisions.length && !responses.length) return null;
  return (
    <section className="feedback-readback" aria-label="저장한 피드백과 수정 기록">
      {feedbacks.length > 0 && <>
        <h3>받은 교사 코멘트</h3>
        <ul>{feedbacks.flatMap((feedback) => feedback.comments.map((comment) => {
          const sourceQuestion = feedback.sourceSnapshot?.questions?.find((question) => question?.id === comment.questionId);
          const questionLabel = typeof sourceQuestion?.text === 'string' ? sourceQuestion.text : comment.questionId;
          return <li key={`${feedback.feedbackId}:${comment.questionId}`}><strong>{questionLabel}</strong><p>{comment.text}</p></li>;
        }))}</ul>
      </>}
      {questionRevisions.length > 0 && <>
        <h3>질문 수정 기록</h3>
        <ol>{questionRevisions.map(({ question, revision }) => (
          <li key={revision.id}>
            <p>{revision.before} → {revision.after}</p>
            <p>수정한 까닭: {revision.reason || '—'}</p>
            {commentsFor(revision.feedbackIds, question.id).map((comment, index) => <p key={index}>연결한 교사 코멘트: {comment}</p>)}
          </li>
        ))}</ol>
      </>}
      {explanationRevisions.length > 0 && <>
        <h3>설명 수정 기록</h3>
        <ol>{explanationRevisions.map((revision) => (
          <li key={revision.id}>
            <p>주장: {revision.before?.claim || '—'} → {revision.after?.claim || '—'}</p>
            <p>설명: {revision.before?.reasoning || '—'} → {revision.after?.reasoning || '—'}</p>
            <p>수정한 까닭: {revision.reason || '—'}</p>
            {commentsFor(revision.feedbackIds, revision.after?.questionId).map((comment, index) => <p key={index}>연결한 교사 코멘트: {comment}</p>)}
          </li>
        ))}</ol>
      </>}
      {responses.length > 0 && <>
        <h3>피드백 응답</h3>
        <ul>{responses.map((response) => {
          const feedback = feedbacks.find((item) => item.feedbackId === response.feedbackId);
          const questionChanges = (Array.isArray(response.questionRevisionIds) ? response.questionRevisionIds : []).map(responseQuestionChange).filter(Boolean);
          const explanationChanges = (Array.isArray(response.explanationRevisionIds) ? response.explanationRevisionIds : []).map(responseExplanationChange).filter(Boolean);
          return <li key={response.id ?? response.feedbackId}>
            <strong>{response.status === 'applied' ? '반영' : response.status === 'deferred' ? '나중에 살펴보기' : '응답 기록'}</strong> — {response.reason}
            {feedback?.comments?.map((comment) => {
              const snapshotQuestion = feedback.sourceSnapshot?.questions?.find((question) => question?.id === comment.questionId);
              const questionLabel = typeof snapshotQuestion?.text === 'string' ? snapshotQuestion.text : '질문';
              return <p key={comment.questionId}>대상 질문: {questionLabel} · {comment.text}</p>;
            })}
            {[...questionChanges, ...explanationChanges].map((change, index) => <p key={index}>{change}</p>)}
          </li>;
        })}</ul>
      </>}
    </section>
  );
}

function StudentDetail({ student, unit, pilot }) {
  const { book } = useBook();
  const questions = (student.questions ?? []).filter((q) => q.text?.trim());
  const evidence = student.evidence ?? [];
  const lessonTitle = (id) => unit?.lessons.find((lesson) => lesson.id === id)?.title ?? '';
  const explained = questions.find((q) => q.id === student.explanation?.questionId);
  return (
    <details className="student-detail">
      <summary>{student.displayName}</summary>
      <h3>만든 질문</h3>
      <ol>{questions.map((q) => <li key={q.id}>{q.text}{q.classification && ` (${q.classification})`}{q.convertedText && ` → ${q.convertedText}`}{q.selected && ' · 선택'}</li>)}</ol>
      <h3>모은 근거</h3>
      {evidence.length ? <ul>{evidence.map((item) => <li key={item.id}>{item.note}{lessonTitle(item.lessonId) && ` — ${lessonTitle(item.lessonId)}`}</li>)}</ul> : <p className="hint">근거 없음</p>}
      <h3>설명</h3>
      <p>{explained ? `질문: ${questionText(explained)}` : ''}</p>
      <p>주장: {student.explanation?.claim || '—'}</p>
      <p>설명: {student.explanation?.reasoning || '—'}</p>
      {pilot && <FeedbackReadback student={student} />}
      <h3>다듬은 질문</h3><p>{student.revisedQuestion || '—'}</p>
      <h3>새 사례 적용</h3><p>{student.transferResponse || '—'}</p>
      <h3>돌아보기</h3><p>{student.reflection || '—'}</p>
      <h3>생각 루틴</h3>
      <RoutineAnswers student={student} unit={unit} book={book} />
      {pilot && <ActivityAnswers student={student} unit={unit} book={book} />}
      {pilot && <FeedbackComposer student={student} unitId={unit?.id} />}
    </details>
  );
}

function Collect({ unitId, unit, concepts }) {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);
  const summary = useMemo(() => summarizeResults(files, unitId, concepts), [files, unitId, concepts]);

  async function add(list) {
    const read = await Promise.all([...list].map(async (file) => ({ name: file.name, text: await readFile(file).catch(() => '') })));
    setFiles((current) => [...current, ...read]);
  }

  return (
    <section aria-labelledby="collect-title">
      <h2 id="collect-title">학생 결과 파일 모아 보기</h2>
      <p className="hint">파일은 이 브라우저 창 안에서만 읽습니다. 어디에도 올리거나 저장하지 않으며, 창을 닫으면 사라집니다.</p>
      <div
        className={`drop-zone no-print${over ? ' is-over' : ''}`}
        onDragOver={(event) => { event.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => { event.preventDefault(); setOver(false); add(event.dataTransfer.files); }}
      >
        <p>학생이 제출한 결과 파일(.json)을 여기에 끌어다 놓거나 고릅니다.</p>
        <label htmlFor="result-files">결과 파일 고르기</label>
        <input id="result-files" type="file" accept=".json,application/json" multiple onChange={(event) => add(event.target.files)} />
      </div>
      {files.length > 0 && <>
        <p className="row-actions no-print">
          <button type="button" className="button secondary" onClick={() => window.print()}>인쇄하기</button>
          <button type="button" className="text-button" onClick={() => setFiles([])}>모두 비우기</button>
        </p>
        <table className="summary-table">
          <tbody>
            <tr><th scope="row">학생 수</th><td>{summary.students.length}</td></tr>
            <tr><th scope="row">닫힌 / 열린 / 미분류 질문</th><td>{summary.closedOpen.closed} / {summary.closedOpen.open} / {summary.closedOpen.unclassified}</td></tr>
            <tr><th scope="row">고른 질문의 개념</th><td>{Object.entries(summary.conceptCounts).sort(([, a], [, b]) => b - a).map(([id, count]) => `${concepts[id]?.label ?? id} ${count}`).join(', ') || '—'}</td></tr>
            <tr><th scope="row">근거 없이 쓴 설명</th><td>{summary.unsupported.join(', ') || '없음'}</td></tr>
          </tbody>
        </table>
        <h3>학생들이 고른 질문</h3>
        <ul>{summary.priorityQuestions.map((item, index) => <li key={index}>{item.text} <span className="hint">— {item.displayName}</span></li>)}</ul>
        <h3>학생별 흐름</h3>
        {summary.students.map((student) => <StudentDetail key={student.recordId ? `record:${student.recordId}` : `legacy:${student.fileName}`} student={student} unit={unit} pilot={isPilotUnit(unitId)} />)}
        {summary.skipped.length > 0 && <>
          <h3>읽지 않은 파일</h3>
          <ul>{summary.skipped.map((item, index) => <li key={index}>{item.name} — {SKIP_REASONS[item.reason] ?? item.reason}</li>)}</ul>
        </>}
      </>}
    </section>
  );
}

export default function TeacherPage({ unitId }) {
  const { book } = useBook();
  if (!unitId) {
    return (
      <article className="teacher-page">
        <h1>교사용</h1>
        <ul>{book.units.map((unit) => <li key={unit.id}><a href={`#/teacher/${unit.id}`}>{unit.id} {unit.title}</a></li>)}</ul>
      </article>
    );
  }
  const unit = book.units.find((item) => item.id === unitId);
  return (
    <article className="teacher-page">
      <h1>교사용 — {unit?.title ?? unitId}</h1>
      <section aria-labelledby="guide-title">
        <h2 id="guide-title">수업 안내</h2>
        <TeacherGuide text={book.teacher?.[unitId]} />
      </section>
      <Collect unitId={unitId} unit={unit} concepts={book.concepts} />
    </article>
  );
}
