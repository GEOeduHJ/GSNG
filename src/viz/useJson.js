import { useEffect, useState } from 'react';

const cache = new Map();

export function loadJson(url) {
  if (!cache.has(url)) {
    const promise = fetch(url).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
    promise.catch(() => cache.delete(url));
    cache.set(url, promise);
  }
  return cache.get(url);
}

/** { status: 'loading' | 'ready' | 'error', data } for one or more URLs. */
export function useJson(...urls) {
  const key = urls.join('|');
  const [state, setState] = useState({ status: 'loading', data: null });
  useEffect(() => {
    let alive = true;
    setState({ status: 'loading', data: null });
    Promise.all(urls.map((url) => loadJson(url)))
      .then((data) => alive && setState({ status: 'ready', data }))
      .catch(() => alive && setState({ status: 'error', data: null }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state;
}
