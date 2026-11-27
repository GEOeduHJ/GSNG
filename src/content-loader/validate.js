import { resolveConceptId } from './concepts.js';

const QUESTION_MARK = /[?？]/;

function checkStep(step, where, refs, errors) {
  if (step.type === 'text') return;
  if (step.type === 'image' && step.schematic) {
    const known = (refs.provenance?.items ?? []).some((item) => item.src === step.data);
    if (!known) errors.push(`${where} step ${step.id}: image without provenance: ${step.data}`);
    return;
  }
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

function checkLegacyLesson(lesson, where, errors) {
  const count = lesson.paragraphs.length;
  if (count < 4 || count > 6) errors.push(`${where}: paragraphs ${count} (need 4-6)`);
  if (lesson.steps.length !== count) errors.push(`${where}: steps/paragraphs mismatch`);
  const dataSteps = new Set(lesson.steps.filter((step) => step.type !== 'text').map((step) => step.id)).size;
  if (dataSteps < 2 || dataSteps > 4) errors.push(`${where}: data steps ${dataSteps} (need 2-4)`);
}

/** Module lessons: 2-5 topics, 3-7 linked data steps (3+ real), opener, 3-4 summary points. */
function checkModuleLesson(lesson, where, errors) {
  const sections = lesson.sections ?? [];
  if (sections.length < 2 || sections.length > 5) errors.push(`${where}: sections ${sections.length} (need 2-5)`);
  for (const step of lesson.steps) {
    if (step.type === 'text') errors.push(`${where}: text step in module lesson: ${step.id}`);
  }
  const data = lesson.steps.filter((step) => step.type !== 'text');
  if (data.length < 3 || data.length > 7) errors.push(`${where}: data steps ${data.length} (need 3-7)`);
  const real = data.filter((step) => !step.schematic).length;
  if (real < 3) errors.push(`${where}: real data steps ${real} (need 3+)`);
  const dataIds = new Set(data.map((step) => step.id));
  const linked = new Set();
  for (const section of sections) {
    for (const paragraph of section.paragraphs ?? []) {
      for (const ref of paragraph.refs ?? []) {
        if (dataIds.has(ref)) linked.add(ref);
        else errors.push(`${where}: unknown data ref: ${ref}`);
      }
    }
  }
  for (const id of dataIds) if (!linked.has(id)) errors.push(`${where}: data step not linked: ${id}`);
  const summary = lesson.summary ?? [];
  if (summary.length < 3 || summary.length > 4) errors.push(`${where}: summary ${summary.length} (need 3-4)`);
  if (!String(lesson.opener ?? '').trim()) errors.push(`${where}: opener missing`);
}

function checkLessonRoutines(lesson, where, refs, errors) {
  const items = refs.routines?.items ?? {};
  for (const [slot, spec] of Object.entries(lesson.routines ?? {})) {
    if (!spec?.id) continue;
    if (!items[spec.id]) errors.push(`${where}: unknown routine: ${spec.id}`);
    if (slot !== 'closing' && !String(spec.prompt ?? '').trim()) errors.push(`${where}: routine prompt missing: ${slot}`);
  }
}

/** Library rules: 2-4 steps per routine, at most one step that can be sent to the question list. */
function checkRoutineLibrary(refs, errors) {
  for (const [id, routine] of Object.entries(refs.routines?.items ?? {})) {
    const steps = routine.steps ?? [];
    if (steps.length < 2 || steps.length > 4) errors.push(`routine ${id}: steps ${steps.length} (need 2-4)`);
    const toQuestion = steps.filter((step) => step.toQuestion).length;
    if (toQuestion > 1) errors.push(`routine ${id}: toQuestion steps ${toQuestion} (max 1)`);
  }
}

function checkLesson(lesson, refs, errors, extraRules) {
  const where = `${lesson.unitId} lesson ${lesson.index}`;
  checkLessonRoutines(lesson, where, refs, errors);
  if (lesson.format === 'module') checkModuleLesson(lesson, where, errors);
  else checkLegacyLesson(lesson, where, errors);
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
  checkRoutineLibrary(refs, errors);
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
