export const QUESTION_ORIGINS = [
  { value: 'student', label: '내가 떠올림' },
  { value: 'routine', label: '수업 활동·생각 루틴' },
  { value: 'external-ai', label: '외부 AI 사용 (자기 보고)' },
  { value: 'peer', label: '친구와 대화' },
  { value: 'teacher', label: '교사와 대화' },
];

const validOrigins = new Set(QUESTION_ORIGINS.map(({ value }) => value));

function newId(prefix) {
  return globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function newQuestion(text = '', { fromLessonId = null, origin = 'student', trackHistory = true } = {}) {
  const id = globalThis.crypto?.randomUUID?.() ?? `q-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const question = {
    id, text,
    classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false, conceptTags: [], fromLessonId,
  };
  if (!trackHistory) return question;
  question.initialText = text;
  question.revisions = [];
  if (origin != null) question.origin = validOrigins.has(origin) ? origin : 'student';
  return question;
}

export const filled = (question) => Boolean(question?.text?.trim());

/** Questions a student wrote while finishing a lesson (optionally one lesson's). */
export const lessonBornQuestions = (record, lessonId) => (record?.questions ?? [])
  .filter((question) => filled(question) && question.fromLessonId && (!lessonId || question.fromLessonId === lessonId));

export const LESSON_BORN_LABEL = '학습 중 생긴 질문';

/** The version of a question the student chose to carry forward. */
export function questionText(question) {
  const revisions = Array.isArray(question?.revisions) ? question.revisions : [];
  const latest = [...revisions].reverse().find((revision) => {
    if (typeof revision?.before !== 'string' || typeof revision?.after !== 'string' || typeof revision?.reason !== 'string') return false;
    const before = revision.before.trim();
    const after = revision.after.trim();
    return Boolean(after && revision.reason.trim() && before !== after);
  });
  if (latest) return latest.after.trim();
  return question.selectedVersion === 'converted' && question.convertedText?.trim() ? question.convertedText.trim() : question.text.trim();
}

/** Append a student's explicit, reasoned question change while retaining its original wording. */
export function reviseQuestion(record, change = {}, now = new Date()) {
  if (!Array.isArray(record?.questions)) return record;
  const index = record.questions.findIndex((question) => question.id === change.questionId);
  if (index < 0) return record;

  const question = record.questions[index];
  const before = questionText(question);
  const after = String(change.after ?? '').trim();
  const reason = String(change.reason ?? '').trim();
  if (!before || !after || !reason || after === before) return record;

  const source = validOrigins.has(change.source) ? change.source : 'student';
  const revision = {
    id: newId('revision'), before, after, reason, source,
    evidenceIds: Array.isArray(change.evidenceIds) ? [...change.evidenceIds] : [],
    createdAt: now.toISOString(),
  };
  if (Array.isArray(change.feedbackIds)) revision.feedbackIds = [...change.feedbackIds];

  const questions = [...record.questions];
  questions[index] = { ...question, revisions: [...(Array.isArray(question.revisions) ? question.revisions : []), revision] };
  return { ...record, questions };
}

export const selectedQuestions = (record) => (record.questions ?? []).filter((question) => question.selected && filled(question));

export const opposite = (type) => (type === '닫힌' ? '열린' : type === '열린' ? '닫힌' : '');
