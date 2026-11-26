import lesson01010101 from './lesson-01-01-01.js';
import lesson01010102 from './lesson-01-01-02.js';
import lesson01010103 from './lesson-01-01-03.js';
import lesson01020101 from './lesson-01-02-01.js';
import lesson01020102 from './lesson-01-02-02.js';
import lesson01020103 from './lesson-01-02-03.js';
import lesson01030101 from './lesson-01-03-01.js';
import lesson01030102 from './lesson-01-03-02.js';
import lesson01030103 from './lesson-01-03-03.js';

export const UNIT01_LESSON_MODULES = [lesson01010101, lesson01010102, lesson01010103, lesson01020101, lesson01020102, lesson01020103, lesson01030101, lesson01030102, lesson01030103];
export const UNIT01_MODULE_BY_LESSON = Object.fromEntries(UNIT01_LESSON_MODULES.map((item) => [item.lessonId, item]));

export function validateUnit01Modules(lessons) {
  const problems = [];
  const unitLessons = lessons.filter((lesson) => lesson.id.startsWith('lesson-01-'));
  if (unitLessons.length !== 9 || UNIT01_LESSON_MODULES.length !== 9) problems.push('1단원 학습 절과 디지털 모듈은 각각 9개여야 합니다.');
  if (new Set(UNIT01_LESSON_MODULES.map((item) => item.lessonId)).size !== UNIT01_LESSON_MODULES.length) problems.push('1단원 모듈의 학습 절 ID가 중복되었습니다.');
  if (new Set(UNIT01_LESSON_MODULES.map((item) => item.activity?.type)).size !== UNIT01_LESSON_MODULES.length) problems.push('1단원 디지털 활동 유형은 절마다 구분되어야 합니다.');
  for (const lesson of unitLessons) {
    const item = UNIT01_MODULE_BY_LESSON[lesson.id];
    if (!item) problems.push(`1단원 모듈이 없습니다: ${lesson.id}`);
    else {
      if (item.standardCode !== lesson.moduleCode) problems.push(`성취기준 코드가 다릅니다: ${lesson.id}`);
      if (!item.activity?.id || !item.activity?.type || !item.questionFocus?.stimulus || typeof item.buildArtifact !== 'function') problems.push(`모듈 설정이 불완전합니다: ${lesson.id}`);
      if (!Array.isArray(item.qftPhaseMinutes) || item.qftPhaseMinutes.length !== 7 || item.qftPhaseMinutes.some((minutes) => !Number.isInteger(minutes) || minutes < 1)) problems.push(`차시별 QFT 단계 시간이 필요합니다: ${lesson.id}`);
    }
  }
  return problems;
}
