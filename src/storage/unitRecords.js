export const STORAGE_KEY_V4 = 'gsng-textbook-v4';
const V3_KEY = 'world-citizenship-geography-digital-textbook-v2';

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
  };
}

function toQuestion(question = {}) {
  return {
    id: String(question.id ?? ''),
    text: String(question.text ?? ''),
    classification: question.classification ?? '',
    convertedType: question.convertedType ?? '',
    convertedText: question.convertedText ?? '',
    selectedVersion: question.selectedVersion === 'converted' ? 'converted' : 'original',
    selected: Boolean(question.selected),
    conceptTags: Array.isArray(question.conceptTags) ? question.conceptTags : [],
  };
}

/** Fill any missing fields so older or hand-edited records never crash the screens. */
export function normalizeUnitRecord(unitId, value = {}) {
  const base = emptyUnitRecord(unitId);
  const record = value && typeof value === 'object' ? value : {};
  return {
    ...base,
    ...record,
    unitId,
    questions: (Array.isArray(record.questions) ? record.questions : []).filter((q) => q && typeof q === 'object').map(toQuestion),
    evidence: (Array.isArray(record.evidence) ? record.evidence : []).filter((item) => item && typeof item === 'object'),
    explanation: { ...base.explanation, ...(record.explanation && typeof record.explanation === 'object' ? record.explanation : {}), evidenceIds: Array.isArray(record.explanation?.evidenceIds) ? record.explanation.evidenceIds : [] },
    stageTimes: record.stageTimes && typeof record.stageTimes === 'object' ? record.stageTimes : {},
    activityState: record.activityState && typeof record.activityState === 'object' ? record.activityState : {},
  };
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
