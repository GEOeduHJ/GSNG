export const STORAGE_KEY = 'world-citizenship-geography-digital-textbook-v2';
export const LEGACY_STORAGE_KEY = 'world-citizenship-geography-react-v1';

export function emptyRecord(moduleCode = 'module') {
  return {
    questions: [{ id: `seed-${moduleCode}`, text: '', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false }],
    qftPhase: 0, priorityReason: '', evidencePlan: '', evidenceItems: [], explanationQuestionId: '',
    claim: '', evidenceSummary: '', reasoning: '', reflection: '', completed: false,
  };
}

export function normalizeRecord(value = {}, code = 'module') {
  const record = { ...emptyRecord(code), ...(value || {}) };
  return {
    ...record,
    questions: (Array.isArray(record.questions) ? record.questions : []).map((question) => ({ ...question, selectedVersion: question.selectedVersion || 'original' })),
    evidenceItems: (Array.isArray(record.evidenceItems) ? record.evidenceItems : []).map((item) => ({ ...item, questionId: item.questionId || '' })),
    explanationQuestionId: record.explanationQuestionId || '',
  };
}

export function migrateLegacyRecords(value = {}) {
  const records = {};
  for (const [code, old] of Object.entries(value || {})) {
    const record = emptyRecord(code);
    const questions = Array.isArray(old?.questions) ? old.questions.map((text, index) => ({ text: String(text || ''), index })).filter((item) => item.text.trim()) : [];
    record.questions = questions.length ? questions.map(({ text, index }) => ({
      id: `migrated-${code}-${index + 1}`, text, classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: index === Number(old.selectedQuestion),
    })) : record.questions;
    record.claim = old?.claim || '';
    record.evidenceSummary = old?.evidence || '';
    record.reasoning = old?.reasoning || '';
    record.completed = Boolean(old?.completed);
    records[code] = record;
  }
  return records;
}

function parse(storage, key, fallback) {
  try { return JSON.parse(storage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}

export function readLearningData(storage) {
  if (!storage) return { records: {}, lessonRecords: {}, readLessons: {} };
  const stored = parse(storage, STORAGE_KEY, null);
  if (stored && (stored.version === 2 || stored.version === 3)) {
    return {
      records: Object.fromEntries(Object.entries(stored.records && typeof stored.records === 'object' ? stored.records : {}).map(([code, value]) => [code, normalizeRecord(value, code)])),
      lessonRecords: stored.version === 3 && stored.lessonRecords && typeof stored.lessonRecords === 'object' ? stored.lessonRecords : {},
      readLessons: stored.readLessons && typeof stored.readLessons === 'object' ? stored.readLessons : {},
    };
  }
  const legacy = parse(storage, LEGACY_STORAGE_KEY, {});
  return { records: Object.fromEntries(Object.entries(migrateLegacyRecords(legacy)).map(([code, value]) => [code, normalizeRecord(value, code)])), lessonRecords: {}, readLessons: {} };
}

export function writeLearningData(storage, data) {
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 3, records: data.records || {}, lessonRecords: data.lessonRecords || {}, readLessons: data.readLessons || {} }));
}
