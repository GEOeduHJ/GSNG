import { resolveConceptId } from '../content-loader/concepts.js';

/** Map canonical concept id → lessons that teach it (key terms or data-step concepts). */
export function lessonsByConcept(book) {
  const index = {};
  for (const unit of book.units ?? []) {
    for (const lesson of unit.lessons ?? []) {
      const ids = new Set([...(lesson.keyTerms ?? []), ...lesson.steps.flatMap((step) => step.concepts ?? [])]);
      for (const raw of ids) {
        const id = resolveConceptId(raw, book.concepts);
        if (!id) continue;
        (index[id] ??= []).push({ unitId: unit.id, index: lesson.index, title: lesson.title });
      }
    }
  }
  return index;
}
