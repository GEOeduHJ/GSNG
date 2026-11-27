/** Data steps of a lesson (anything that is not a text step). */
export const dataSteps = (lesson) => (lesson?.steps ?? []).filter((step) => step.type !== 'text');

const stepById = (lesson, id) => dataSteps(lesson).find((step) => step.id === id) ?? null;

/** Refs in reading order that point at real data steps, as [sectionIndex, paragraphIndex, stepId]. */
export function linkedRefs(lesson) {
  const out = [];
  (lesson?.sections ?? []).forEach((section, si) => section.paragraphs.forEach((paragraph, pi) => {
    for (const id of paragraph.refs ?? []) if (stepById(lesson, id)) out.push([si, pi, id]);
  }));
  return out;
}

/** The data shown first: the first linked ref, else the first data step, else ''. */
export function firstRefId(lesson) {
  return linkedRefs(lesson)[0]?.[2] ?? dataSteps(lesson)[0]?.id ?? '';
}

/** The topic that first links a data step. */
export function sectionForStep(lesson, stepId) {
  const hit = linkedRefs(lesson).find(([, , id]) => id === stepId);
  return hit ? { index: hit[0], title: lesson.sections[hit[0]].title } : null;
}

export const buttonLabel = (step) => step?.label || step?.caption || '';

export { stepById };
