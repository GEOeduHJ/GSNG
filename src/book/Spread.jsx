import { useEffect, useState } from 'react';

const WIDE_QUERY = '(min-width: 1024px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function useMediaQuery(query, fallback) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : fallback);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener?.('change', update);
    return () => list.removeEventListener?.('change', update);
  }, [query]);
  return matches;
}

export const useWide = () => useMediaQuery(WIDE_QUERY, false);
export const useReducedMotion = () => useMediaQuery(REDUCED_QUERY, false);

/** Two facing pages on wide screens; one column (left then right) below 1024px. A null `right` leaves only the left page. */
export default function Spread({ left, right, rightSticky = false, pages, label }) {
  const wide = useWide();
  const sticky = wide && rightSticky;
  return (
    <div className={`spread ${wide ? 'is-wide' : 'is-narrow'}`} aria-label={label}>
      <section className="page page-left">
        {left}
        {pages && <span className="folio">{pages[0]}</span>}
      </section>
      {right != null && (
        <section className={`page page-right${sticky ? ' is-sticky' : ''}`} data-sticky={sticky ? 'true' : 'false'}>
          <div className="page-right-inner">{right}</div>
          {pages && <span className="folio">{pages[1]}</span>}
        </section>
      )}
    </div>
  );
}
