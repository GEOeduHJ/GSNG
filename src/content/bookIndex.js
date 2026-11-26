import unit01 from './units/unit-01.js';
import unit02 from './units/unit-02.js';
import unit03 from './units/unit-03.js';
import unit04 from './units/unit-04.js';
import { MODULES, MODULE_BY_CODE } from '../modules/index.js';
import { SOURCES } from './sources.js';

export const BOOK_UNITS = [unit01, unit02, unit03, unit04];
export const MIDDLE_UNITS = BOOK_UNITS.flatMap((part) => part.units.map((unit) => ({ ...unit, partId: part.id, partTitle: part.title, numeral: part.numeral })));
export const LESSONS = MIDDLE_UNITS.flatMap((unit) => unit.lessons.map((lesson, index) => ({
  ...lesson,
  orderInUnit: index + 1,
  unitId: unit.id,
  unitTitle: unit.title,
  moduleCode: unit.moduleCode,
  partId: unit.partId,
  partTitle: unit.partTitle,
  partNumeral: unit.numeral,
})));

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((lesson) => [lesson.id, lesson]));
export const MIDDLE_UNIT_BY_ID = Object.fromEntries(MIDDLE_UNITS.map((unit) => [unit.id, unit]));
export const MIDDLE_UNIT_BY_MODULE = Object.fromEntries(MIDDLE_UNITS.map((unit) => [unit.moduleCode, unit]));
export const LESSONS_BY_MODULE = Object.fromEntries(MODULES.map((module) => [
  module.code,
  module.sectionIds.map((id) => LESSON_BY_ID[id]).filter(Boolean),
]));

export const COURSE_COUNTS = {
  parts: BOOK_UNITS.length,
  middleUnits: MIDDLE_UNITS.length,
  lessons: LESSONS.length,
  standards: MODULES.length,
};

export function getModuleForLesson(lessonId) {
  const lesson = LESSON_BY_ID[lessonId];
  return lesson ? MODULE_BY_CODE[lesson.moduleCode] : null;
}

export function getNextLesson(lessonId, direction = 1) {
  const index = LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return null;
  return LESSONS[index + direction] || null;
}

export function validateCourseContent() {
  const problems = [];
  const ids = new Set();
  if (BOOK_UNITS.length !== 4) problems.push(`대단원 수가 4가 아닙니다: ${BOOK_UNITS.length}`);
  if (MIDDLE_UNITS.length !== 13) problems.push(`중단원 수가 13이 아닙니다: ${MIDDLE_UNITS.length}`);
  if (LESSONS.length !== 41) problems.push(`학습 절 수가 41이 아닙니다: ${LESSONS.length}`);
  if (MODULES.length !== 13) problems.push(`성취기준 모듈 수가 13이 아닙니다: ${MODULES.length}`);
  for (const [sourceId, source] of Object.entries(SOURCES)) {
    for (const field of ['sourceDate', 'checkedAt', 'licenseStatus', 'reuseBasis', 'verificationStatus']) {
      if (!(field in source)) problems.push(`출처 검토 메타데이터 누락: ${sourceId} → ${field}`);
    }
  }
  for (const lesson of LESSONS) {
    if (ids.has(lesson.id)) problems.push(`중복 학습 절 ID: ${lesson.id}`);
    ids.add(lesson.id);
    if (!lesson.body || lesson.body.length < 2) problems.push(`설명 본문 누락: ${lesson.id}`);
    if (!lesson.sourceIds?.length) problems.push(`출처 누락: ${lesson.id}`);
    for (const sourceId of lesson.sourceIds || []) if (!SOURCES[sourceId]) problems.push(`출처 ID 없음: ${lesson.id} → ${sourceId}`);
    if (!MODULE_BY_CODE[lesson.moduleCode]) problems.push(`성취기준 모듈 없음: ${lesson.moduleCode}`);
  }
  for (const module of MODULES) {
    if (!module.qft?.focusText) problems.push(`QFT 초점 누락: ${module.code}`);
    for (const lessonId of module.sectionIds || []) {
      if (!LESSON_BY_ID[lessonId]) problems.push(`모듈의 학습 절 ID를 찾을 수 없음: ${module.code} → ${lessonId}`);
    }
  }
  return problems;
}
