import { useMemo, useState } from 'react';
import { useBook } from '../book/BookContext.jsx';
import { questionText } from '../book/qft/questions.js';
import { SKIP_REASONS, summarizeResults } from './summarize.js';
import TeacherGuide from './TeacherGuide.jsx';
import { routineForSlot } from '../content-loader/routines.js';

function readFile(file) {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
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

function StudentDetail({ student, unit }) {
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
      <h3>다듬은 질문</h3><p>{student.revisedQuestion || '—'}</p>
      <h3>새 사례 적용</h3><p>{student.transferResponse || '—'}</p>
      <h3>돌아보기</h3><p>{student.reflection || '—'}</p>
      <h3>생각 루틴</h3>
      <RoutineAnswers student={student} unit={unit} book={book} />
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
        {summary.students.map((student) => <StudentDetail key={student.fileName} student={student} unit={unit} />)}
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
