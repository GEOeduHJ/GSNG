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

export function parseResultFile(text) {
  let value;
  try { value = JSON.parse(text); } catch { return { ok: false, reason: 'not-json' }; }
  if (!value || typeof value !== 'object' || value.schema !== RESULT_SCHEMA) return { ok: false, reason: 'wrong-schema' };
  if (value.schemaVersion !== RESULT_SCHEMA_VERSION) return { ok: false, reason: 'unsupported-version' };
  return { ok: true, value };
}
