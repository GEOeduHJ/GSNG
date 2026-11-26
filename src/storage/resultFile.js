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
  };
}

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const optionalString = (value) => value == null || typeof value === 'string';

function hasValidShape(value) {
  if (!optionalString(value.unitId) || !optionalString(value.displayName)) return false;
  if (value.questions != null && !(Array.isArray(value.questions) && value.questions.every((q) => isObject(q) && optionalString(q.text) && (q.conceptTags == null || Array.isArray(q.conceptTags))))) return false;
  if (value.evidence != null && !(Array.isArray(value.evidence) && value.evidence.every(isObject))) return false;
  if (value.explanation != null && !(isObject(value.explanation) && (value.explanation.evidenceIds == null || Array.isArray(value.explanation.evidenceIds)))) return false;
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
