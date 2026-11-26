import { routes } from './router.js';

const TOC = { href: routes.toc(), label: '차례' };

/** Reading order of the whole book: each ready unit's opening, lessons, closing; units without content are skipped. */
function sequence(book) {
  const ready = new Map(book.units.map((unit) => [unit.id, unit]));
  const tocOrder = (book.toc?.parts ?? []).flatMap((part) => part.units.map((unit) => unit.id));
  const pages = [];
  for (const unitId of tocOrder) {
    const unit = ready.get(unitId);
    if (!unit) continue;
    pages.push({ key: `open-${unit.id}`, href: routes.open(unit.id), label: `${unit.id} ${unit.title}`, backLabel: `${unit.title} 여는 쪽` });
    for (const lesson of unit.lessons) {
      const label = `절 ${lesson.index} ${lesson.title}`;
      pages.push({ key: `lesson-${unit.id}-${lesson.index}`, href: routes.lesson(unit.id, lesson.index), label, backLabel: label });
    }
    pages.push({ key: `close-${unit.id}`, href: routes.close(unit.id), label: `${unit.title} 마무리`, backLabel: `${unit.title} 마무리` });
  }
  return pages;
}

function keyFor(route) {
  if (route.name === 'open' || route.name === 'close') return `${route.name}-${route.unitId}`;
  if (route.name === 'lesson') return `lesson-${route.unitId}-${route.index}`;
  return null;
}

/** Previous and next pages for the arrow buttons. Nothing gates them: activities and QFT stages are never required to move on. */
export function neighborPages(book, route) {
  const key = keyFor(route);
  if (!key) return { prev: null, next: null };
  const pages = sequence(book);
  const index = pages.findIndex((page) => page.key === key);
  if (index < 0) return { prev: null, next: null };
  const before = pages[index - 1];
  const after = pages[index + 1];
  // Moving back into a unit lands on its closing page; moving forward into a unit lands on its opening page.
  const prev = before ? { href: before.href, label: before.backLabel } : TOC;
  const next = after ? { href: after.href, label: after.label } : TOC;
  return { prev, next };
}
