export const RESULT_SCHEMA = 'gsng-unit-result';
export const RESULT_SCHEMA_VERSION = 1;

const UNSAFE = /[/\\:*?"<>|\s]/g;

export function resultFileName(record, unitId) {
  const name = String(record?.displayName ?? '').trim().replace(UNSAFE, '_') || '학생';
  return `gsng-${unitId}-${name}.json`;
}

export function buildResultFile(record, unit, now = new Date()) {
  return {
    schema: RESULT_SCHEMA,
    schemaVersion: RESULT_SCHEMA_VERSION,
    exportedAt: now.toISOString(),
    unitId: unit.id,
    unitTitle: unit.title,
    ...(record.recordId ? { recordId: record.recordId } : {}),
    displayName: record.displayName ?? '',
    questions: record.questions ?? [],
    priorityReason: record.priorityReason ?? '',
    nextStepPlan: record.nextStepPlan ?? '',
    evidence: record.evidence ?? [],
    explanation: record.explanation ?? { questionId: '', claim: '', reasoning: '' },
    revisedQuestion: record.revisedQuestion ?? '',
    transferResponse: record.transferResponse ?? '',
    reflection: record.reflection ?? '',
    stageTimes: record.stageTimes ?? {},
    routineResponses: record.routineState ?? {},
    activityState: record.activityState ?? {},
    ...(Array.isArray(record.teacherFeedbacks) && record.teacherFeedbacks.length ? { teacherFeedbacks: record.teacherFeedbacks } : {}),
    ...(Array.isArray(record.feedbackResponses) && record.feedbackResponses.length ? { feedbackResponses: record.feedbackResponses } : {}),
    ...(Array.isArray(record.explanationRevisions) && record.explanationRevisions.length ? { explanationRevisions: record.explanationRevisions } : {}),
    ...(record.prioritySnapshot ? { prioritySnapshot: record.prioritySnapshot } : {}),
    ...(Array.isArray(record.externalAiOpenings) ? { externalAiOpenings: record.externalAiOpenings } : {}),
  };
}

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const optionalString = (value) => value == null || typeof value === 'string';
const nonBlankString = (value) => typeof value === 'string' && Boolean(value.trim());
const stringArray = (value) => Array.isArray(value) && value.every((item) => typeof item === 'string');

function validResultQuestion(question) {
  if (!isObject(question) || !optionalString(question.text) || (question.selected && typeof question.text !== 'string')) return false;
  if (question.selected != null && typeof question.selected !== 'boolean') return false;
  if (question.selectedVersion != null && !['original', 'converted'].includes(question.selectedVersion)) return false;
  for (const key of ['convertedText', 'classification', 'convertedType', 'initialText', 'origin', 'questionTextOverride']) {
    if (!optionalString(question[key])) return false;
  }
  if (question.conceptTags != null && !stringArray(question.conceptTags)) return false;
  if (question.revisions != null && (!Array.isArray(question.revisions) || !question.revisions.every((revision) => isObject(revision)
    && ['id', 'before', 'after', 'reason', 'source', 'createdAt'].every((key) => typeof revision[key] === 'string')
    && stringArray(revision.evidenceIds)
    && (revision.feedbackIds == null || stringArray(revision.feedbackIds))))) return false;
  return true;
}

function validFeedback(feedback) {
  if (!isObject(feedback) || feedback.schema !== 'gsng-teacher-feedback' || feedback.schemaVersion !== 1
    || !nonBlankString(feedback.feedbackId) || !nonBlankString(feedback.recordId)
    || !optionalString(feedback.unitId) || !nonBlankString(feedback.createdAt) || !Number.isFinite(Date.parse(feedback.createdAt))
    || !Array.isArray(feedback.comments) || feedback.comments.length === 0) return false;
  const snapshot = feedback.sourceSnapshot;
  if (!isObject(snapshot) || !Array.isArray(snapshot.questions) || !isObject(snapshot.explanation)) return false;
  const questionIds = new Set();
  for (const question of snapshot.questions) {
    if (!isObject(question) || !nonBlankString(question.id) || typeof question.text !== 'string' || questionIds.has(question.id)) return false;
    for (const key of ['initialText', 'origin', 'classification', 'convertedType', 'convertedText', 'questionTextOverride']) {
      if (question[key] != null && typeof question[key] !== 'string') return false;
    }
    if (question.selectedVersion != null && !['original', 'converted'].includes(question.selectedVersion)) return false;
    if (question.conceptTags != null && !stringArray(question.conceptTags)) return false;
    if (question.revisions != null && (!Array.isArray(question.revisions) || !question.revisions.every((revision) => isObject(revision)
      && ['before', 'after', 'reason', 'source', 'createdAt'].every((key) => optionalString(revision[key]))
      && (revision.evidenceIds == null || stringArray(revision.evidenceIds))
      && (revision.feedbackIds == null || stringArray(revision.feedbackIds))))) return false;
    questionIds.add(question.id);
  }
  const explanation = snapshot.explanation;
  if (!optionalString(explanation.questionId) || !optionalString(explanation.claim) || !optionalString(explanation.reasoning)
    || (explanation.evidenceIds != null && !stringArray(explanation.evidenceIds))
    || (explanation.questionId && !questionIds.has(explanation.questionId))) return false;
  const commentIds = new Set();
  return feedback.comments.every((comment) => isObject(comment) && nonBlankString(comment.questionId)
    && nonBlankString(comment.text) && questionIds.has(comment.questionId) && !commentIds.has(comment.questionId)
    && commentIds.add(comment.questionId));
}

function validFeedbackResponse(response) {
  if (!isObject(response) || !nonBlankString(response.id) || !nonBlankString(response.feedbackId)
    || !['applied', 'deferred'].includes(response.status) || !nonBlankString(response.reason)
    || !stringArray(response.questionRevisionIds) || !stringArray(response.explanationRevisionIds)
    || !nonBlankString(response.createdAt) || !Number.isFinite(Date.parse(response.createdAt))) return false;
  return response.status !== 'deferred' || (!response.questionRevisionIds.length && !response.explanationRevisionIds.length);
}

function validExplanationRevision(revision) {
  const validState = (state) => isObject(state) && typeof state.questionId === 'string' && typeof state.claim === 'string'
    && typeof state.reasoning === 'string' && stringArray(state.evidenceIds);
  return isObject(revision) && nonBlankString(revision.id) && validState(revision.before) && validState(revision.after)
    && nonBlankString(revision.reason) && stringArray(revision.feedbackIds)
    && nonBlankString(revision.createdAt) && Number.isFinite(Date.parse(revision.createdAt));
}

function hasValidShape(value) {
  if (!optionalString(value.unitId) || !optionalString(value.displayName)) return false;
  if (value.recordId != null && typeof value.recordId !== 'string') return false;
  if (value.questions != null) {
    if (!Array.isArray(value.questions) || !value.questions.every(validResultQuestion)) return false;
    const questionIds = new Set();
    for (const question of value.questions) {
      if (typeof question.id !== 'string' || !question.id.trim()) continue;
      const id = question.id.trim();
      if (questionIds.has(id)) return false;
      questionIds.add(id);
    }
  }
  if (value.evidence != null && !(Array.isArray(value.evidence) && value.evidence.every(isObject))) return false;
  if (value.explanation != null && !(isObject(value.explanation) && (value.explanation.evidenceIds == null || Array.isArray(value.explanation.evidenceIds)))) return false;
  if (value.routineResponses != null && !isObject(value.routineResponses)) return false;
  if (value.activityState != null && !isObject(value.activityState)) return false;
  if (value.teacherFeedbacks != null && !(Array.isArray(value.teacherFeedbacks) && value.teacherFeedbacks.every(validFeedback))) return false;
  if (value.feedbackResponses != null && !(Array.isArray(value.feedbackResponses) && value.feedbackResponses.every(validFeedbackResponse))) return false;
  if (value.explanationRevisions != null && !(Array.isArray(value.explanationRevisions) && value.explanationRevisions.every(validExplanationRevision))) return false;
  return true;
}

export function parseResultFile(text) {
  let value;
  try { value = JSON.parse(text); } catch { return { ok: false, reason: 'not-json' }; }
  if (!value || typeof value !== 'object' || value.schema !== RESULT_SCHEMA) return { ok: false, reason: 'wrong-schema' };
  if (value.schemaVersion !== RESULT_SCHEMA_VERSION) return { ok: false, reason: 'unsupported-version' };
  if (!hasValidShape(value)) return { ok: false, reason: 'bad-shape' };
  return { ok: true, value };
}
