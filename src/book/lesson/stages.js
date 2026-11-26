/** Step index to show on the right page for a paragraph: the latest data step at or before it, else the first data step. */
export function stageIndexFor(steps, paragraphIndex) {
  for (let index = Math.min(paragraphIndex, steps.length - 1); index >= 0; index -= 1) {
    if (steps[index]?.type !== 'text') return index;
  }
  const first = steps.findIndex((step) => step.type !== 'text');
  return first;
}
