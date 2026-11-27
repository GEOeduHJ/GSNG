/** Default routine for the closing slot when a lesson names none. */
export const DEFAULT_CLOSING = 'used-to-think';

/** Library entry for a slot spec ({id, prompt}) with the prompt attached, or null when the id is unknown. */
export function resolveRoutine(book, slotSpec) {
  const item = slotSpec?.id ? book?.routines?.items?.[slotSpec.id] : null;
  return item ? { ...item, prompt: String(slotSpec.prompt ?? '') } : null;
}

/** The routine shown in a lesson slot: opener/inquiry only when named; closing falls back to used-to-think. */
export function routineForSlot(book, lesson, slot) {
  const spec = lesson?.routines?.[slot];
  if (spec?.id) return resolveRoutine(book, spec);
  return slot === 'closing' ? resolveRoutine(book, { id: DEFAULT_CLOSING }) : null;
}
