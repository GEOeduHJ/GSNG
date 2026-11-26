import { useCallback, useEffect, useRef, useState } from 'react';

/** Which paragraph is being read. Scroll-driven unless pinned or disabled. */
export function useActiveStep(paragraphRefs, { enabled = true } = {}) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const pinnedRef = useRef(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (pinnedRef.current || !enabledRef.current) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = paragraphRefs.findIndex((ref) => ref.current === entry.target);
        if (index >= 0) setActive(index);
      }
    }, { rootMargin: '-40% 0px -50% 0px' });
    for (const ref of paragraphRefs) if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [paragraphRefs]);

  const pin = useCallback((index) => {
    pinnedRef.current = true;
    setPinned(true);
    setActive(index);
  }, []);

  const unpin = useCallback(() => {
    pinnedRef.current = false;
    setPinned(false);
  }, []);

  return { active, pinned, pin, unpin };
}
