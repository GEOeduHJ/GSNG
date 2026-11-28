export const STORAGE_KEY_V4 = 'gsng-textbook-v4';
const V3_KEY = 'world-citizenship-geography-digital-textbook-v2';
const PILOT_UNIT_IDS = new Set(['01-01', '03-01']);

export const isPilotUnit = (unitId) => PILOT_UNIT_IDS.has(unitId);

/** Create a name-independent stable identity at the first real pilot record update. */
export function ensurePilotRecordId(unitId, record) {
  if (!isPilotUnit(unitId) || record?.recordId) return record;
  const recordId = globalThis.crypto?.randomUUID?.() ?? `record-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { ...record, recordId };
}

export function emptyUnitRecord(unitId) {
  return {
    unitId,
    displayName: '',
    questions: [],
    priorityReason: '',
    nextStepPlan: '',
    evidence: [],
    explanation: { questionId: '', claim: '', reasoning: '', evidenceIds: [] },
    revisedQuestion: '',
    transferResponse: '',
    reflection: '',
    stageTimes: {},
    activityState: {},
    routineState: {},
  };
}

function toQuestion(question = {}) {
  const normalized = {
    ...question,
    id: String(question.id ?? ''),
    text: String(question.text ?? ''),
    classification: question.classification ?? '',
    convertedType: question.convertedType ?? '',
    convertedText: question.convertedText ?? '',
    selectedVersion: question.selectedVersion === 'converted' ? 'converted' : 'original',
    selected: Boolean(question.selected),
    conceptTags: Array.isArray(question.conceptTags) ? question.conceptTags : [],
    fromLessonId: question.fromLessonId ? String(question.fromLessonId) : null,
  };
  if (typeof question.initialText !== 'string') delete normalized.initialText;
  if (typeof question.origin !== 'string') delete normalized.origin;
  if (typeof question.questionTextOverride !== 'string') delete normalized.questionTextOverride;
  if (Array.isArray(question.revisions)) normalized.revisions = question.revisions.filter((revision) => revision && typeof revision === 'object');
  else delete normalized.revisions;
  return normalized;
}

function validFeedbackFileRecord(feedback) {
  if (!isPlainObject(feedback) || typeof feedback.feedbackId !== 'string' || !feedback.feedbackId.trim()
    || typeof feedback.recordId !== 'string' || !feedback.recordId.trim() || !isPilotUnit(feedback.unitId)
    || typeof feedback.createdAt !== 'string' || !Number.isFinite(Date.parse(feedback.createdAt))
    || !Array.isArray(feedback.comments) || feedback.comments.length === 0
    || !isPlainObject(feedback.sourceSnapshot) || !Array.isArray(feedback.sourceSnapshot.questions)
    || !isPlainObject(feedback.sourceSnapshot.explanation)) return false;
  const ids = new Set();
  for (const question of feedback.sourceSnapshot.questions) {
    if (!isPlainObject(question) || typeof question.id !== 'string' || !question.id.trim()
      || typeof question.text !== 'string' || ids.has(question.id)) return false;
    for (const key of ['initialText', 'origin', 'classification', 'convertedType', 'convertedText', 'questionTextOverride']) {
      if (question[key] != null && typeof question[key] !== 'string') return false;
    }
    if (question.selectedVersion != null && !['original', 'converted'].includes(question.selectedVersion)) return false;
    if (question.revisions != null && !Array.isArray(question.revisions)) return false;
    ids.add(question.id);
  }
  const explanation = feedback.sourceSnapshot.explanation;
  if (explanation.questionId != null && typeof explanation.questionId !== 'string') return false;
  if (explanation.claim != null && typeof explanation.claim !== 'string') return false;
  if (explanation.reasoning != null && typeof explanation.reasoning !== 'string') return false;
  if (explanation.evidenceIds != null && (!Array.isArray(explanation.evidenceIds) || !explanation.evidenceIds.every((id) => typeof id === 'string'))) return false;
  if (explanation.questionId && !ids.has(explanation.questionId)) return false;
  const commentIds = new Set();
  return feedback.comments.every((comment) => isPlainObject(comment)
    && typeof comment.questionId === 'string' && comment.questionId.trim() && ids.has(comment.questionId)
    && typeof comment.text === 'string' && comment.text.trim() && !commentIds.has(comment.questionId)
    && commentIds.add(comment.questionId));
}

function validFeedbackResponse(response) {
  return isPlainObject(response)
    && typeof response.id === 'string' && Boolean(response.id.trim())
    && typeof response.feedbackId === 'string' && Boolean(response.feedbackId.trim())
    && ['applied', 'deferred'].includes(response.status)
    && typeof response.reason === 'string' && Boolean(response.reason.trim())
    && Array.isArray(response.questionRevisionIds) && response.questionRevisionIds.every((id) => typeof id === 'string')
    && Array.isArray(response.explanationRevisionIds) && response.explanationRevisionIds.every((id) => typeof id === 'string')
    && typeof response.createdAt === 'string' && Number.isFinite(Date.parse(response.createdAt));
}

function validExplanationRevision(revision) {
  const validState = (state) => isPlainObject(state)
    && typeof state.questionId === 'string' && typeof state.claim === 'string' && typeof state.reasoning === 'string'
    && Array.isArray(state.evidenceIds) && state.evidenceIds.every((id) => typeof id === 'string');
  return isPlainObject(revision)
    && typeof revision.id === 'string' && Boolean(revision.id.trim())
    && validState(revision.before) && validState(revision.after)
    && typeof revision.reason === 'string' && Boolean(revision.reason.trim())
    && Array.isArray(revision.feedbackIds) && revision.feedbackIds.every((id) => typeof id === 'string')
    && typeof revision.createdAt === 'string' && Number.isFinite(Date.parse(revision.createdAt));
}

/** Fill any missing fields so older or hand-edited records never crash the screens. */
export function normalizeUnitRecord(unitId, value = {}) {
  const base = emptyUnitRecord(unitId);
  const record = value && typeof value === 'object' ? value : {};
  const normalized = {
    ...base,
    ...record,
    unitId,
    questions: (Array.isArray(record.questions) ? record.questions : []).filter((q) => q && typeof q === 'object').map(toQuestion),
    evidence: (Array.isArray(record.evidence) ? record.evidence : []).filter((item) => item && typeof item === 'object'),
    explanation: { ...base.explanation, ...(record.explanation && typeof record.explanation === 'object' ? record.explanation : {}), evidenceIds: Array.isArray(record.explanation?.evidenceIds) ? record.explanation.evidenceIds : [] },
    stageTimes: record.stageTimes && typeof record.stageTimes === 'object' ? record.stageTimes : {},
    activityState: record.activityState && typeof record.activityState === 'object' ? record.activityState : {},
    routineState: isPlainObject(record.routineState)
      ? Object.fromEntries(Object.entries(record.routineState).filter(([, value]) => isPlainObject(value)))
      : {},
  };
  if (Object.prototype.hasOwnProperty.call(record, 'teacherFeedbacks')) {
    normalized.teacherFeedbacks = Array.isArray(record.teacherFeedbacks) ? record.teacherFeedbacks.filter(validFeedbackFileRecord) : [];
  }
  if (Object.prototype.hasOwnProperty.call(record, 'feedbackResponses')) {
    normalized.feedbackResponses = Array.isArray(record.feedbackResponses) ? record.feedbackResponses.filter(validFeedbackResponse) : [];
  }
  if (Object.prototype.hasOwnProperty.call(record, 'explanationRevisions')) {
    normalized.explanationRevisions = Array.isArray(record.explanationRevisions) ? record.explanationRevisions.filter(validExplanationRevision) : [];
  }
  if (Object.prototype.hasOwnProperty.call(record, 'pendingExplanationRevision')) {
    const before = record.pendingExplanationRevision?.before;
    if (isPlainObject(before) && typeof before.questionId === 'string' && typeof before.claim === 'string'
      && typeof before.reasoning === 'string' && Array.isArray(before.evidenceIds)
      && before.evidenceIds.every((id) => typeof id === 'string')) {
      normalized.pendingExplanationRevision = { before: {
        questionId: before.questionId, claim: before.claim, reasoning: before.reasoning, evidenceIds: [...before.evidenceIds],
      } };
    } else {
      delete normalized.pendingExplanationRevision;
    }
  }
  return normalized;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function migrateV3(v3 = {}) {
  const units = {};
  for (const [code, old] of Object.entries(v3?.records ?? {})) {
    const unitId = code.replace(/^12세지/, '');
    const record = emptyUnitRecord(unitId);
    record.questions = (Array.isArray(old?.questions) ? old.questions : []).filter((q) => q && typeof q === 'object').map(toQuestion);
    record.priorityReason = old?.priorityReason ?? '';
    record.nextStepPlan = old?.evidencePlan ?? '';
    record.evidence = (Array.isArray(old?.evidenceItems) ? old.evidenceItems : []).map((item, index) => ({
      id: `migrated-${unitId}-${index + 1}`,
      questionId: item?.questionId ?? '',
      lessonId: null,
      stepId: null,
      note: item?.observation ?? '',
    }));
    record.explanation = { questionId: old?.explanationQuestionId ?? '', claim: old?.claim ?? '', reasoning: old?.reasoning ?? '', evidenceIds: [] };
    record.reflection = old?.reflection ?? '';
    units[unitId] = record;
  }
  return units;
}

function safeRead(storage, key) {
  const text = storage.getItem(key);
  if (text == null) return null;
  try { return JSON.parse(text); } catch { return null; }
}

export function createStore(storage) {
  return {
    load() {
      if (!storage) return { units: {}, available: false };
      try {
        const v4 = safeRead(storage, STORAGE_KEY_V4);
        if (v4?.version === 4 && v4.units && typeof v4.units === 'object') {
          return { units: Object.fromEntries(Object.entries(v4.units).map(([id, record]) => [id, normalizeUnitRecord(id, record)])), available: true };
        }
        const v3 = safeRead(storage, V3_KEY);
        return { units: v3 ? migrateV3(v3) : {}, available: true };
      } catch {
        return { units: {}, available: false };
      }
    },
    /** With changedUnitId, re-read storage and write only that unit, so another open tab's units survive. */
    save(units, changedUnitId) {
      if (!storage) return false;
      try {
        let next = units;
        if (changedUnitId) {
          const stored = safeRead(storage, STORAGE_KEY_V4);
          const current = stored?.version === 4 && stored.units && typeof stored.units === 'object' ? stored.units : {};
          next = { ...current, [changedUnitId]: units[changedUnitId] };
        }
        storage.setItem(STORAGE_KEY_V4, JSON.stringify({ version: 4, units: next }));
        return true;
      } catch {
        return false;
      }
    },
  };
}
