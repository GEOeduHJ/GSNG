import { useEffect, useState } from 'react';

const UNIT_ID = '(\\d{2}-\\d{2})';
const PATTERNS = [
  [new RegExp(`^#/u/${UNIT_ID}/open$`), (m) => ({ name: 'open', unitId: m[1] })],
  [new RegExp(`^#/u/${UNIT_ID}/l/(\\d+)$`), (m) => ({ name: 'lesson', unitId: m[1], index: Number(m[2]) })],
  [new RegExp(`^#/u/${UNIT_ID}/close$`), (m) => ({ name: 'close', unitId: m[1] })],
  [new RegExp(`^#/teacher/${UNIT_ID}$`), (m) => ({ name: 'teacher', unitId: m[1] })],
  [/^#\/teacher$/, () => ({ name: 'teacher' })],
  [/^#\/help$/, () => ({ name: 'help' })],
];

export function parseRoute(hash) {
  for (const [pattern, build] of PATTERNS) {
    const match = pattern.exec(String(hash ?? ''));
    if (match) return build(match);
  }
  return { name: 'toc' };
}

export const routes = {
  toc: () => '#/',
  open: (unitId) => `#/u/${unitId}/open`,
  lesson: (unitId, index) => `#/u/${unitId}/l/${index}`,
  close: (unitId) => `#/u/${unitId}/close`,
  help: () => '#/help',
};

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(typeof window === 'undefined' ? '' : window.location.hash));
  useEffect(() => {
    const update = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo?.(0, 0);
    };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return route;
}
