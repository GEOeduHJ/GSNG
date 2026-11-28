import { useRef, useState } from 'react';
import { importFeedbackFile, parseFeedbackFile, resetExplanationRevisionBaseline, saveFeedbackResponse } from '../../storage/feedbackFile.js';
import { isPilotUnit } from '../../storage/unitRecords.js';
import { questionText } from '../qft/questions.js';

function readFile(file) {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

const importReasons = {
  'not-json': 'JSON 파일을 읽을 수 없습니다.',
  'wrong-schema': '교사 피드백 파일이 아닙니다.',
  'unsupported-version': '지원하지 않는 피드백 파일 버전입니다.',
  'bad-shape': '피드백 파일 형식이나 질문 참조가 맞지 않습니다.',
  'other-unit': '다른 중단원의 피드백 파일입니다.',
  'other-record': '이 학습 기록에 해당하지 않는 피드백 파일입니다.',
  duplicate: '이미 가져온 피드백 파일입니다.',
  'bad-reference': '현재 학생 기록에 없는 질문 참조가 있습니다.',
};

function isFeedback(value) {
  return Boolean(value && typeof value.feedbackId === 'string' && Array.isArray(value.comments) && value.comments.every((comment) => typeof comment?.questionId === 'string' && typeof comment?.text === 'string'));
}

function hasLinkedRevision(record, feedback) {
  const targets = new Set(feedback.comments.map((comment) => comment.questionId));
  return (record.questions ?? []).some((question) => targets.has(question.id) && (question.revisions ?? []).some((revision) => revision.feedbackIds?.includes(feedback.feedbackId)))
    || (record.explanationRevisions ?? []).some((revision) => targets.has(revision.after?.questionId) && revision.feedbackIds?.includes(feedback.feedbackId));
}

export default function TeacherFeedback({ record, update, unit }) {
  const [message, setMessage] = useState('');
  const [reasons, setReasons] = useState({});
  const [responseErrors, setResponseErrors] = useState({});
  const currentRecord = useRef(record);
  currentRecord.current = record;
  if (!isPilotUnit(unit.id)) return null;

  async function importFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const text = await readFile(file).catch(() => '');
    const parsed = parseFeedbackFile(text);
    if (!parsed.ok) { setMessage(importReasons[parsed.reason] ?? '피드백 파일을 읽을 수 없습니다.'); return; }
    const imported = importFeedbackFile(currentRecord.current, parsed.value, unit.id);
    if (!imported.ok) { setMessage(importReasons[imported.reason] ?? '피드백 파일을 가져올 수 없습니다.'); return; }
    update(() => resetExplanationRevisionBaseline(imported.record));
    setMessage('교사 피드백 파일을 가져왔습니다. 원래 질문과 설명은 자동으로 바뀌지 않습니다.');
  }

  function saveResponse(feedbackId, status) {
    const existing = (currentRecord.current.feedbackResponses ?? []).find((item) => item?.feedbackId === feedbackId);
    const saved = saveFeedbackResponse(currentRecord.current, { feedbackId, status, reason: reasons[feedbackId] ?? existing?.reason }, new Date());
    if (!saved.ok) {
      setResponseErrors((current) => ({ ...current, [feedbackId]: saved.reason === 'no-linked-revision'
        ? '이 피드백을 연결해 질문이나 설명을 먼저 수정 기록으로 저장하세요.'
        : '응답 이유를 적어 주세요.' }));
      return;
    }
    setResponseErrors((current) => ({ ...current, [feedbackId]: '' }));
    update(() => saved.record);
  }

  const feedbacks = (Array.isArray(record.teacherFeedbacks) ? record.teacherFeedbacks : []).filter(isFeedback);
  return (
    <section className="teacher-feedback-panel" aria-labelledby={`teacher-feedback-title-${unit.id}`}>
      <h2 id={`teacher-feedback-title-${unit.id}`}>교사 피드백</h2>
      <p className="hint">학생 결과를 작성한 같은 기기·브라우저에서 받은 교사 피드백 JSON을 고릅니다. 가져와도 질문이나 설명이 자동으로 바뀌지 않습니다.</p>
      <label htmlFor={`teacher-feedback-file-${unit.id}`}>교사 피드백 파일 고르기</label>
      <input id={`teacher-feedback-file-${unit.id}`} type="file" accept=".json,application/json" onChange={importFile} />
      {message && <p role="status" className="hint">{message}</p>}
      {feedbacks.map((feedback) => {
        const response = (record.feedbackResponses ?? []).find((item) => item?.feedbackId === feedback.feedbackId);
        const snapshotQuestions = new Map((feedback.sourceSnapshot?.questions ?? []).filter((question) => typeof question?.id === 'string').map((question) => [question.id, question]));
        return <article className="teacher-feedback-item" key={feedback.feedbackId}>
          <h3>받은 질문 피드백</h3>
          {typeof feedback.createdAt === 'string' && <p className="hint"><time dateTime={feedback.createdAt}>{feedback.createdAt}</time></p>}
          <ul>{feedback.comments.map((comment) => (
            <li key={comment.questionId}>
              <strong>{questionText(snapshotQuestions.get(comment.questionId) ?? { text: comment.questionId })}</strong>
              <p>{comment.text}</p>
            </li>
          ))}</ul>
          <label htmlFor={`feedback-response-reason-${unit.id}-${feedback.feedbackId}`}>피드백 응답 이유</label>
          <textarea
            id={`feedback-response-reason-${unit.id}-${feedback.feedbackId}`}
            rows="2"
            value={reasons[feedback.feedbackId] ?? response?.reason ?? ''}
            onChange={(event) => setReasons((current) => ({ ...current, [feedback.feedbackId]: event.target.value }))}
          />
          <p className="row-actions">
            <button type="button" className="button secondary" onClick={() => saveResponse(feedback.feedbackId, 'applied')}>반영했다고 기록</button>
            <button type="button" className="text-button" onClick={() => saveResponse(feedback.feedbackId, 'deferred')}>나중에 살펴보기로 기록</button>
          </p>
          {response && <p className="hint">학생 응답: {response.status === 'applied' ? '반영' : '나중에 살펴보기'} — {response.reason}</p>}
          {responseErrors[feedback.feedbackId] && <p role="alert" className="hint">{responseErrors[feedback.feedbackId]}</p>}
          {responseErrors[feedback.feedbackId] == null && !hasLinkedRevision(record, feedback) && <p className="hint">반영했다고 기록하려면 이 피드백을 연결한 질문 또는 설명 수정 기록이 먼저 필요합니다.</p>}
        </article>;
      })}
    </section>
  );
}
