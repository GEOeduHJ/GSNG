export function resolveConceptId(id, concepts = {}) {
  if (!id) return null;
  if (Object.prototype.hasOwnProperty.call(concepts, id)) return id;
  for (const [canonical, entry] of Object.entries(concepts)) {
    if ((entry?.aliases ?? []).includes(id)) return canonical;
  }
  return null;
}
