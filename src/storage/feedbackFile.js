import { isPilotUnit } from './unitRecords.js';
import { resultFileName } from './resultFile.js';

export const FEEDBACK_SCHEMA = 'gsng-teacher-feedback';
export const FEEDBACK_SCHEMA_VERSION = 1;

export function feedbackFileName(student, unitId) {
  const resultName = resultFileName(student, unitId);
  const displayPart = resultName.slice(`gsng-${unitId}-`.length, -'.json'.length);
  const shortId = String(student?.recordId ?? '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 8) || 'legacy';
  return `gsng-${unitId}-teacher-feedback-${displayPart}-${shortId}.json`;
}

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const nonBlankString = (value) => typeof value === 'string' && Boolean(value.trim());
const newId = (prefix) => globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

function copyJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function validSnapshot(snapshot) {
  if (!isObject(snapshot) || !Array.isArray(snapshot.questions) || !isObject(snapshot.explanation)) return false;
  const questionIds = new Set();
  for (const question of snapshot.questions) {
    if (!isObject(question) || !nonBlankString(question.id) || typeof question.text !== 'string' || questionIds.has(question.id)) return false;
    for (const key of ['initialText', 'origin', 'classification', 'convertedType', 'convertedText']) {
      if (question[key] != null && typeof question[key] !== 'string') return false;
    }
    if (question.selectedVersion != null && !['original', 'converted'].includes(question.selectedVersion)) return false;
    if (question.conceptTags != null && (!Array.isArray(question.conceptTags) || !question.conceptTags.every((tag) => typeof tag === 'string'))) return false;
    if (question.revisions != null && (!Array.isArray(question.revisions) || !question.revisions.every((revision) => isObject(revision)
      && ['before', 'after', 'reason', 'source', 'createdAt'].every((key) => revision[key] == null || typeof revision[key] === 'string')
      && (revision.evidenceIds == null || (Array.isArray(revision.evidenceIds) && revision.evidenceIds.every((id) => typeof id === 'string')))
      && (revision.feedbackIds == null || (Array.isArray(revision.feedbackIds) && revision.feedbackIds.every((id) => typeof id === 'string')))))) return false;
    questionIds.add(question.id);
  }
  const explanation = snapshot.explanation;
  if (explanation.questionId != null && typeof explanation.questionId !== 'string') return false;
  if (explanation.claim != null && typeof explanation.claim !== 'string') return false;
  if (explanation.reasoning != null && typeof explanation.reasoning !== 'string') return false;
  if (explanation.evidenceIds != null && (!Array.isArray(explanation.evidenceIds) || !explanation.evidenceIds.every((id) => typeof id === 'string'))) return false;
  if (explanation.questionId && !questionIds.has(explanation.questionId)) return false;
  return questionIds;
}

function hasValidShape(value) {
  if (!nonBlankString(value.feedbackId) || !nonBlankString(value.recordId) || !isPilotUnit(value.unitId)) return false;
  if (!nonBlankString(value.createdAt) || !Number.isFinite(Date.parse(value.createdAt))) return false;
  if (!Array.isArray(value.comments) || value.comments.length === 0) return false;
  const questionIds = validSnapshot(value.sourceSnapshot);
  if (!questionIds) return false;
  const seen = new Set();
  for (const comment of value.comments) {
    if (!isObject(comment) || !nonBlankString(comment.questionId) || !nonBlankString(comment.text)) return false;
    if (seen.has(comment.questionId) || !questionIds.has(comment.questionId)) return false;
    seen.add(comment.questionId);
  }
  return true;
}

export function parseFeedbackFile(text) {
  let value;
  try { value = JSON.parse(text); } catch { return { ok: false, reason: 'not-json' }; }
  if (!isObject(value) || value.schema !== FEEDBACK_SCHEMA) return { ok: false, reason: 'wrong-schema' };
  if (value.schemaVersion !== FEEDBACK_SCHEMA_VERSION) return { ok: false, reason: 'unsupported-version' };
  if (!hasValidShape(value)) return { ok: false, reason: 'bad-shape' };
  return { ok: true, value };
}

/** Build a separate teacher-feedback file from a v1 student result. */
export function buildFeedbackFile(student, unitId, comments, now = new Date()) {
  const recordId = typeof student?.recordId === 'string' ? student.recordId.trim() : '';
  if (!isPilotUnit(unitId) || !recordId || !Array.isArray(student?.questions)) return null;
  const questionIds = new Set(student.questions.filter((question) => nonBlankString(question?.id)).map((question) => question.id));
  const safeComments = [];
  const seen = new Set();
  for (const comment of comments ?? []) {
    const questionId = typeof comment?.questionId === 'string' ? comment.questionId.trim() : '';
    const text = typeof comment?.text === 'string' ? comment.text.trim() : '';
    if (!questionIds.has(questionId) || !text || seen.has(questionId)) continue;
    seen.add(questionId);
    safeComments.push({ questionId, text });
  }
  if (!safeComments.length) return null;
  const questions = student.questions.filter((question) => nonBlankString(question?.id) && typeof question.text === 'string');
  const explanation = isObject(student.explanation) ? student.explanation : {};
  const sourceSnapshot = {
    questions: copyJson(questions),
    explanation: {
      questionId: typeof explanation.questionId === 'string' ? explanation.questionId : '',
      claim: typeof explanation.claim === 'string' ? explanation.claim : '',
      reasoning: typeof explanation.reasoning === 'string' ? explanation.reasoning : '',
      evidenceIds: Array.isArray(explanation.evidenceIds) ? explanation.evidenceIds.filter((id) => typeof id === 'string') : [],
    },
  };
  return {
    schema: FEEDBACK_SCHEMA,
    schemaVersion: FEEDBACK_SCHEMA_VERSION,
    feedbackId: newId('feedback'),
    recordId,
    unitId,
    createdAt: now.toISOString(),
    comments: safeComments,
    sourceSnapshot,
  };
}

export function validateFeedbackTarget(record, feedback, unitId) {
  if (!feedback || feedback.unitId !== unitId || !isPilotUnit(unitId)) return { ok: false, reason: 'other-unit' };
  if (!record?.recordId || feedback.recordId !== record.recordId) return { ok: false, reason: 'other-record' };
  const existing = Array.isArray(record.teacherFeedbacks) ? record.teacherFeedbacks : [];
  const responses = Array.isArray(record.feedbackResponses) ? record.feedbackResponses : [];
  if (existing.some((item) => item?.feedbackId === feedback.feedbackId) || responses.some((item) => item?.feedbackId === feedback.feedbackId)) {
    return { ok: false, reason: 'duplicate' };
  }
  const recordQuestions = Array.isArray(record.questions) ? record.questions : [];
  const byId = new Map(recordQuestions.filter((question) => nonBlankString(question?.id)).map((question) => [question.id, question]));
  for (const sourceQuestion of feedback.sourceSnapshot.questions) {
    const question = byId.get(sourceQuestion.id);
    if (!question) return { ok: false, reason: 'bad-reference' };
  }
  const snapshotIds = new Set(feedback.sourceSnapshot.questions.map((question) => question.id));
  if (feedback.sourceSnapshot.explanation.questionId && !byId.has(feedback.sourceSnapshot.explanation.questionId)) return { ok: false, reason: 'bad-reference' };
  if (feedback.comments.some((comment) => !snapshotIds.has(comment.questionId) || !byId.has(comment.questionId))) return { ok: false, reason: 'bad-reference' };
  return { ok: true };
}

/** Return a new record only after all identity, unit, duplicate, and question checks pass. */
export function importFeedbackFile(record, feedback, unitId) {
  const target = validateFeedbackTarget(record, feedback, unitId);
  if (!target.ok) return target;
  return {
    ok: true,
    record: { ...record, teacherFeedbacks: [...(Array.isArray(record.teacherFeedbacks) ? record.teacherFeedbacks : []), copyJson(feedback)] },
  };
}

function responseQuestionIds(feedback) {
  return new Set(feedback.comments.map((comment) => comment.questionId));
}

/** Append an explanation snapshot after a student's explicit save. */
export function saveExplanationRevision(record, { after, reason, feedbackIds = [] } = {}, now = new Date()) {
  const before = record?.explanation ?? {};
  const normalizedAfter = {
    questionId: typeof after?.questionId === 'string' ? after.questionId : '',
    claim: typeof after?.claim === 'string' ? after.claim : '',
    reasoning: typeof after?.reasoning === 'string' ? after.reasoning : '',
    evidenceIds: Array.isArray(after?.evidenceIds) ? [...after.evidenceIds] : [],
  };
  const safeReason = typeof reason === 'string' ? reason.trim() : '';
  if (!normalizedAfter.questionId || !record?.questions?.some((question) => question.id === normalizedAfter.questionId) || !safeReason) return record;
  const baseline = {
    questionId: typeof before.questionId === 'string' ? before.questionId : '',
    claim: typeof before.claim === 'string' ? before.claim : '',
    reasoning: typeof before.reasoning === 'string' ? before.reasoning : '',
    evidenceIds: Array.isArray(before.evidenceIds) ? [...before.evidenceIds] : [],
  };
  if (baseline.questionId === normalizedAfter.questionId
    && baseline.claim === normalizedAfter.claim
    && baseline.reasoning === normalizedAfter.reasoning
    && JSON.stringify(baseline.evidenceIds) === JSON.stringify(normalizedAfter.evidenceIds)) return record;
  const feedbacks = Array.isArray(record.teacherFeedbacks) ? record.teacherFeedbacks : [];
  const ids = [...new Set(feedbackIds)].filter((id) => feedbacks.some((item) => item?.feedbackId === id && item.comments.some((comment) => comment.questionId === normalizedAfter.questionId)));
  const revision = {
    id: newId('explanation-revision'),
    before: baseline,
    after: normalizedAfter,
    reason: safeReason,
    feedbackIds: ids,
    createdAt: now.toISOString(),
  };
  return {
    ...record,
    explanation: normalizedAfter,
    revisedQuestion: record.revisedQuestion,
    explanationRevisions: [...(Array.isArray(record.explanationRevisions) ? record.explanationRevisions : []), revision],
  };
}

/** Applied responses require a saved revision that references the selected file and one of its comment targets. */
export function saveFeedbackResponse(record, { feedbackId, status, reason } = {}, now = new Date()) {
  const feedback = (Array.isArray(record?.teacherFeedbacks) ? record.teacherFeedbacks : []).find((item) => item?.feedbackId === feedbackId);
  const safeReason = typeof reason === 'string' ? reason.trim() : '';
  if (!feedback || !safeReason || !['applied', 'deferred'].includes(status)) return { ok: false, reason: 'bad-response' };
  const targetIds = responseQuestionIds(feedback);
  const questionRevisionIds = [];
  const explanationRevisionIds = [];
  if (status === 'applied') {
    for (const question of record.questions ?? []) {
      if (!targetIds.has(question.id)) continue;
      for (const revision of question.revisions ?? []) {
        if (revision.feedbackIds?.includes(feedbackId)) questionRevisionIds.push(revision.id);
      }
    }
    for (const revision of record.explanationRevisions ?? []) {
      if (targetIds.has(revision.after?.questionId) && revision.feedbackIds?.includes(feedbackId)) explanationRevisionIds.push(revision.id);
    }
    if (questionRevisionIds.length === 0 && explanationRevisionIds.length === 0) return { ok: false, reason: 'no-linked-revision' };
  }
  const responses = Array.isArray(record.feedbackResponses) ? record.feedbackResponses : [];
  const existingIndex = responses.findIndex((item) => item?.feedbackId === feedbackId);
  const response = {
    id: existingIndex < 0 ? newId('feedback-response') : responses[existingIndex].id,
    feedbackId,
    status,
    reason: safeReason,
    questionRevisionIds: status === 'applied' ? questionRevisionIds : [],
    explanationRevisionIds: status === 'applied' ? explanationRevisionIds : [],
    createdAt: now.toISOString(),
  };
  const nextResponses = [...responses];
  if (existingIndex < 0) nextResponses.push(response);
  else nextResponses[existingIndex] = response;
  return { ok: true, record: { ...record, feedbackResponses: nextResponses } };
}
