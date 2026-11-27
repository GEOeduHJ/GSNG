export function newQuestion(text = '', { fromLessonId = null } = {}) {
  const id = globalThis.crypto?.randomUUID?.() ?? `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { id, text, classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [], fromLessonId };
}

export const filled = (question) => Boolean(question?.text?.trim());

/** Questions a student wrote while finishing a lesson (optionally one lesson's). */
export const lessonBornQuestions = (record, lessonId) => (record?.questions ?? [])
  .filter((question) => filled(question) && question.fromLessonId && (!lessonId || question.fromLessonId === lessonId));

export const LESSON_BORN_LABEL = '학습 중 생긴 질문';

/** The version of a question the student chose to carry forward. */
export function questionText(question) {
  return question.selectedVersion === 'converted' && question.convertedText?.trim() ? question.convertedText.trim() : question.text.trim();
}

export const selectedQuestions = (record) => (record.questions ?? []).filter((question) => question.selected && filled(question));

export const opposite = (type) => (type === '닫힌' ? '열린' : type === '열린' ? '닫힌' : '');
