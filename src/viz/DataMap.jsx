import { useEffect, useMemo, useRef, useState } from 'react';
import { BASE_MAP_URL, MAP_COLORS, NO_DATA_COLOR, classBreaks, joinValues, legendLabels, mapOptions, topValues } from './mapData.js';
import { useJson } from './useJson.js';
import { ValueTable } from './DataChart.jsx';

let maplibrePromise;
function loadMaplibre() {
  maplibrePromise ??= Promise.all([
    import('maplibre-gl'),
    import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'),
    import('maplibre-gl/dist/maplibre-gl.css'),
  ]).then(([maplibre, worker]) => {
    maplibre.setWorkerUrl(worker.default);
    return maplibre;
  });
  return maplibrePromise;
}

const emptyStyle = { version: 8, sources: {}, layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#eef2f3' } }] };

function stepExpression(breaks) {
  const expression = ['step', ['get', 'value'], MAP_COLORS[0]];
  breaks.forEach((value, index) => expression.push(value, MAP_COLORS[index + 1]));
  return ['case', ['==', ['get', 'value'], null], NO_DATA_COLOR, expression];
}

function Legend({ breaks, unit }) {
  if (!breaks.length) return null;
  const labels = legendLabels(breaks);
  return (
    <ul className="map-legend" aria-label={`범례 (${unit ?? ''})`}>
      {labels.map((text, index) => <li key={text}><span style={{ background: MAP_COLORS[index] }} />{text}</li>)}
      <li><span style={{ background: NO_DATA_COLOR }} />자료 없음</li>
    </ul>
  );
}

/** config.kind: 'choropleth' (url → {year, unit, values: {ISO3: n}}) or 'points' (url → GeoJSON points). */
export default function DataMap({ url, config = {}, alt, fallback, onInteract, reduced = false }) {
  const { status, data } = useJson(BASE_MAP_URL, url);
  const containerRef = useRef(null);
  const interactRef = useRef(onInteract);
  interactRef.current = onInteract;
  const [renderFailed, setRenderFailed] = useState(false);
  const [base, payload] = data ?? [];
  const points = config.kind === 'points';
  const breaks = useMemo(() => (payload && !points ? classBreaks(Object.values(payload.values ?? {})) : []), [payload, points]);
  const names = useMemo(() => Object.fromEntries((base?.features ?? []).map((f) => [f.properties.iso_a3, f.properties.name_ko || f.properties.name])), [base]);

  useEffect(() => {
    if (status !== 'ready' || !containerRef.current) return undefined;
    let map;
    let disposed = false;
    loadMaplibre().then((maplibre) => {
      if (disposed || !containerRef.current) return;
      try {
        map = new maplibre.Map({ container: containerRef.current, style: emptyStyle, ...mapOptions(config, { reduced }) });
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');
        map.on('dragstart', () => interactRef.current?.());
        map.on('zoomstart', (event) => { if (event.originalEvent) interactRef.current?.(); });
        map.on('load', () => {
          const countries = points ? base : joinValues(base, payload.values);
          map.addSource('countries', { type: 'geojson', data: countries });
          map.addLayer({ id: 'countries-fill', type: 'fill', source: 'countries', paint: { 'fill-color': points ? '#e8e4da' : stepExpression(breaks), 'fill-opacity': 0.95 } });
          map.addLayer({ id: 'countries-line', type: 'line', source: 'countries', paint: { 'line-color': '#ffffff', 'line-width': 0.5 } });
          if (points) {
            map.addSource('points', { type: 'geojson', data: payload });
            map.addLayer({ id: 'points', type: 'circle', source: 'points', paint: { 'circle-radius': 7, 'circle-color': '#8a5a2b', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 } });
            map.addLayer({ id: 'points-label', type: 'symbol', source: 'points', layout: { 'text-field': ['get', 'name'], 'text-size': 14, 'text-offset': [0, 1.2] }, paint: { 'text-color': '#23231f', 'text-halo-color': '#fff', 'text-halo-width': 1.5 } });
          }
        });
      } catch {
        setRenderFailed(true);
      }
    }).catch(() => setRenderFailed(true));
    return () => { disposed = true; map?.remove(); };
  }, [status, base, payload, breaks, points, config, reduced]);

  if (status === 'error') return fallback;
  const rows = payload && !points ? topValues(payload.values, names) : [];
  return (
    <>
      {renderFailed ? fallback : <div ref={containerRef} className="figure-canvas map-canvas" role="img" aria-label={alt} />}
      {!points && <Legend breaks={breaks} unit={payload?.unit} />}
      <ValueTable header={['국가', payload?.unit ?? '값']} rows={rows} />
    </>
  );
}
