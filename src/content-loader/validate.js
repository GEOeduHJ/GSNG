import { resolveConceptId } from './concepts.js';

const QUESTION_MARK = /[?？]/;

function checkStep(step, where, refs, errors) {
  if (step.type === 'text') return;
  const manifestItems = refs.manifest?.items ?? [];
  if (step.source && !manifestItems.some((item) => item.id === step.source)) {
    errors.push(`${where} step ${step.id}: unknown data source: ${step.source}`);
  }
  if (step.data && !manifestItems.some((item) => item.path === step.data)) {
    errors.push(`${where} step ${step.id}: data file not in manifest: ${step.data}`);
  }
}

function checkConcepts(ids, where, refs, errors) {
  for (const id of ids ?? []) {
    if (!resolveConceptId(id, refs.concepts)) errors.push(`${where}: unknown concept: ${id}`);
  }
}

function checkIllustration(illustration, where, refs, errors) {
  if (!illustration?.src) return;
  const known = (refs.provenance?.items ?? []).some((item) => item.src === illustration.src);
  if (!known) errors.push(`${where}: image without provenance: ${illustration.src}`);
}

function checkLesson(lesson, refs, errors, extraRules) {
  const where = `${lesson.unitId} lesson ${lesson.index}`;
  const count = lesson.paragraphs.length;
  if (count < 4 || count > 6) errors.push(`${where}: paragraphs ${count} (need 4-6)`);
  if (lesson.steps.length !== count) errors.push(`${where}: steps/paragraphs mismatch`);
  const dataSteps = new Set(lesson.steps.filter((step) => step.type !== 'text').map((step) => step.id)).size;
  if (dataSteps < 2 || dataSteps > 4) errors.push(`${where}: data steps ${dataSteps} (need 2-4)`);
  checkConcepts(lesson.keyTerms, where, refs, errors);
  for (const step of lesson.steps) {
    checkStep(step, where, refs, errors);
    checkConcepts(step.concepts, `${where} step ${step.id}`, refs, errors);
  }
  for (const id of lesson.sourceIds ?? []) {
    if (!refs.sources?.[id]) errors.push(`${where}: unknown source: ${id}`);
  }
  checkIllustration(lesson.illustration, where, refs, errors);
  for (const rule of extraRules) rule(lesson, where, errors);
}

function checkUnit(unit, tocUnit, refs, errors, extraRules) {
  const where = unit.id;
  if (unit.lessons.length !== tocUnit.lessons.length) {
    errors.push(`${where}: lessons ${unit.lessons.length} (toc ${tocUnit.lessons.length})`);
  }
  checkConcepts(unit.concepts, where, refs, errors);
  const focus = unit.opening?.focus?.step ?? {};
  if ([focus.caption, focus.alt, focus.config?.text].some((value) => QUESTION_MARK.test(String(value ?? '')))) {
    errors.push(`${where} opening: question mark in focus`);
  }
  checkStep(focus, `${where} opening`, refs, errors);
  checkIllustration(unit.opening?.illustration, `${where} opening`, refs, errors);
  if (unit.closing?.transfer?.step) checkStep(unit.closing.transfer.step, `${where} closing`, refs, errors);
  for (const lesson of unit.lessons) checkLesson(lesson, refs, errors, extraRules);
}

/** Returns a list of error messages; empty means the book passes. */
export function validateBook(book, refs, { fullUnits = [], extraRules = [] } = {}) {
  const errors = [];
  const tocUnits = (book.toc?.parts ?? []).flatMap((part) => part.units ?? []);
  for (const unitId of fullUnits) {
    const tocUnit = tocUnits.find((item) => item.id === unitId);
    if (!tocUnit) { errors.push(`${unitId}: not in table of contents`); continue; }
    const unit = book.units.find((item) => item.id === unitId);
    if (!unit) { errors.push(`${unitId}: unit.yaml missing`); continue; }
    checkUnit(unit, tocUnit, refs, errors, extraRules);
  }
  return errors;
}

const FONT_SIZE = /font-size\s*:\s*([\d.]+)(px|rem)/g;

export function checkCssFontSizes(cssText, minPx = 14) {
  const errors = [];
  for (const match of String(cssText).matchAll(FONT_SIZE)) {
    const px = match[2] === 'rem' ? Number(match[1]) * 16 : Number(match[1]);
    if (px < minPx) errors.push(`font-size ${match[1]}${match[2]} (${px}px) < ${minPx}px`);
  }
  return errors;
}
