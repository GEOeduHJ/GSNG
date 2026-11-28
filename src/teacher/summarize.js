import { parseResultFile } from '../storage/resultFile.js';
import { resolveConceptId } from '../content-loader/concepts.js';
import { questionText } from '../book/qft/questions.js';

const filled = (question) => Boolean(question?.text?.trim());

/**
 * files: [{name, text}] → class summary for one unit. Nothing leaves memory.
 * Stable pilot IDs distinguish equal display names; legacy exports keep the most recent name match.
 */
export function summarizeResults(files, unitId, concepts = {}) {
  const skipped = [];
  const latest = new Map();
  const duplicates = [];
  for (const file of files) {
    const parsed = parseResultFile(file.text);
    if (!parsed.ok) { skipped.push({ name: file.name, reason: parsed.reason }); continue; }
    const value = parsed.value;
    if (value.unitId !== unitId) { skipped.push({ name: file.name, reason: 'other-unit' }); continue; }
    const displayName = String(value.displayName ?? '').trim() || file.name;
    const recordId = typeof value.recordId === 'string' && value.recordId.trim() ? value.recordId.trim() : '';
    const key = recordId ? `record:${recordId}` : `legacy:${displayName}`;
    const row = { ...value, fileName: file.name, displayName, recordId };
    const existing = latest.get(key);
    if (!existing) { latest.set(key, row); continue; }
    const newer = String(row.exportedAt) > String(existing.exportedAt) ? row : existing;
    const older = newer === row ? existing : row;
    latest.set(key, newer);
    duplicates.push({ name: older.fileName, reason: 'duplicate-older' });
  }
  const modernByName = new Map();
  for (const student of latest.values()) {
    if (!student.recordId) continue;
    const matching = modernByName.get(student.displayName) ?? [];
    matching.push(student);
    modernByName.set(student.displayName, matching);
  }
  for (const legacy of [...latest.values()].filter((student) => !student.recordId)) {
    const candidates = modernByName.get(legacy.displayName) ?? [];
    if (candidates.length !== 1) continue;
    const modern = candidates[0];
    const newer = String(legacy.exportedAt) > String(modern.exportedAt) ? legacy : modern;
    const older = newer === legacy ? modern : legacy;
    latest.set(`record:${modern.recordId}`, newer === legacy ? { ...legacy, recordId: modern.recordId } : modern);
    latest.delete(`legacy:${legacy.displayName}`);
    duplicates.push({ name: older.fileName, reason: 'duplicate-older' });
  }
  const students = [...latest.values()];

  const closedOpen = { closed: 0, open: 0, unclassified: 0 };
  const conceptCounts = {};
  const priorityQuestions = [];
  const unsupported = [];
  for (const student of students) {
    const questions = (student.questions ?? []).filter(filled);
    for (const question of questions) {
      if (question.classification === '닫힌') closedOpen.closed += 1;
      else if (question.classification === '열린') closedOpen.open += 1;
      else closedOpen.unclassified += 1;
    }
    for (const question of questions.filter((q) => q.selected)) {
      priorityQuestions.push({ displayName: student.displayName, text: questionText(question) });
      for (const tag of question.conceptTags ?? []) {
        const id = resolveConceptId(tag, concepts) ?? tag;
        conceptCounts[id] = (conceptCounts[id] ?? 0) + 1;
      }
    }
    const explanation = student.explanation ?? {};
    const wrote = String(explanation.claim ?? '').trim() || String(explanation.reasoning ?? '').trim();
    if (wrote && !(explanation.evidenceIds ?? []).length) unsupported.push(student.displayName);
  }

  return { students, skipped: [...skipped, ...duplicates], closedOpen, conceptCounts, unsupported, priorityQuestions };
}

export const SKIP_REASONS = {
  'not-json': '읽을 수 없는 파일',
  'wrong-schema': '이 교과서의 결과 파일이 아님',
  'unsupported-version': '지원하지 않는 파일 버전',
  'bad-shape': '내용 형식이 맞지 않는 파일',
  'other-unit': '다른 중단원의 파일',
  'duplicate-older': '같은 학생의 더 최근 파일이 있음',
};
