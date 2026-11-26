export function newQuestion(text = '') {
  const id = globalThis.crypto?.randomUUID?.() ?? `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id, text, classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [] };
}

export const filled = (question) => Boolean(question?.text?.trim());

/** The version of a question the student chose to carry forward. */
export function questionText(question) {
  return question.selectedVersion === 'converted' && question.convertedText?.trim() ? question.convertedText.trim() : question.text.trim();
}

export const selectedQuestions = (record) => (record.questions ?? []).filter((question) => question.selected && filled(question));

export const opposite = (type) => (type === '닫힌' ? '열린' : type === '열린' ? '닫힌' : '');
