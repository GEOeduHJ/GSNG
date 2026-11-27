export const BASE_MAP_URL = '/data/base/countries-110m.geojson';
export const MAP_COLORS = ['#e6efe9', '#bcd5ca', '#86b3a2', '#4f8b77', '#2f6f5e'];
export const NO_DATA_COLOR = '#dedad0';

export const BELOW_COLOR = '#f4f7f5';
/** Areas the source reports together as one unit (shown apart from the value scale). */
export const SPECIAL_COLOR = '#c9b8d9';

/** `below` lists countries the source reports only as under a threshold (e.g. '<0.1'): not missing, just tiny. */
export function joinValues(geojson, values = {}, below = {}, special = {}) {
  return {
    ...geojson,
    features: (geojson.features ?? []).map((feature) => {
      const iso = feature.properties?.iso_a3;
      const value = iso && values[iso] != null ? Number(values[iso]) : null;
      return { ...feature, properties: { ...feature.properties, value, below: Boolean(iso && below[iso]), special: Boolean(iso && special[iso]) } };
    }),
  };
}

function quantileCuts(sorted, classes) {
  const cuts = [];
  for (let index = 1; index < classes; index += 1) {
    cuts.push(sorted[Math.min(sorted.length - 1, Math.floor((index * sorted.length) / classes))]);
  }
  return cuts;
}

/** Strictly increasing values above the minimum (MapLibre 'step' rejects repeated stops). */
function ascendingAbove(cuts, minimum) {
  return [...new Set(cuts)].filter((value) => value > minimum).sort((a, b) => a - b);
}

/**
 * Quantile cut points (n classes → up to n-1 breaks), ignoring nulls. Breaks are strictly
 * increasing. When many values tie at the minimum (e.g. zero deaths), the remaining classes
 * are cut from the values above it so the map keeps useful detail.
 */
export function classBreaks(values, classes = 5) {
  const sorted = values.filter((value) => value != null && Number.isFinite(Number(value))).map(Number).sort((a, b) => a - b);
  if (!sorted.length) return [];
  const minimum = sorted[0];
  let breaks = ascendingAbove(quantileCuts(sorted, classes), minimum);
  if (breaks.length < classes - 2) {
    const above = sorted.filter((value) => value > minimum);
    if (above.length >= classes - 1) breaks = ascendingAbove([above[0], ...quantileCuts(above, classes - 1)], minimum);
  }
  return breaks;
}

export function topValues(values = {}, names = {}, count = 10) {
  return Object.entries(values)
    .filter(([, value]) => value != null)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([iso, value]) => [names[iso] ?? iso, value]);
}

export function formatNumber(value) {
  if (value == null || value === '' || !Number.isFinite(Number(value))) return value == null || value === '' ? '–' : String(value);
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 1 });
}

export function legendLabels(breaks) {
  if (!breaks.length) return [];
  const f = formatNumber;
  return [`${f(breaks[0])} 미만`, ...breaks.slice(1).map((value, index) => `${f(breaks[index])}–${f(value)}`), `${f(breaks.at(-1))} 이상`];
}

/** MapLibre constructor options; reduced motion removes label/tile fades. Point maps may zoom closer. */
export function mapOptions(config = {}, { reduced = false, view } = {}) {
  const points = config.kind === 'points';
  return {
    center: config.center ?? view?.center ?? [20, 20],
    zoom: config.zoom ?? view?.zoom ?? 0.6,
    ...(!config.center && view?.bounds ? { bounds: view.bounds, fitBoundsOptions: view.fitBoundsOptions } : {}),
    minZoom: 0.3,
    maxZoom: points ? 13 : 6,
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
    fadeDuration: reduced ? 0 : 300,
  };
}

/** Initial view that shows every point: fit their extent, or centre a single point at a regional scale. */
export function pointsView(geojson) {
  const coords = (geojson?.features ?? [])
    .map((feature) => feature.geometry?.coordinates)
    .filter((c) => Array.isArray(c) && Number.isFinite(c[0]) && Number.isFinite(c[1]));
  if (!coords.length) return null;
  const lons = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  const west = Math.min(...lons);
  const east = Math.max(...lons);
  const south = Math.min(...lats);
  const north = Math.max(...lats);
  if (west === east && south === north) return { center: [west, south], zoom: 4 };
  return { bounds: [[west, south], [east, north]], fitBoundsOptions: { padding: 36, maxZoom: 11 } };
}

export const POINT_COLOR = '#8a5a2b';

/** Unique {label, color} pairs from point features with a `category` property, in first-seen order. */
export function pointCategories(geojson) {
  const seen = new Map();
  for (const feature of geojson?.features ?? []) {
    const label = feature.properties?.category;
    if (label && !seen.has(label)) seen.set(label, feature.properties.color ?? POINT_COLOR);
  }
  return [...seen].map(([label, color]) => ({ label, color }));
}

/** Korean textbook names where Natural Earth's name_ko is a long official form. */
const DISPLAY_NAMES = { CHN: '중국', PRK: '북한', TWN: '타이완', TUR: '튀르키예' };

/** iso3 → display name for charts, tables and legends. */
export function countryNames(geojson) {
  return Object.fromEntries((geojson?.features ?? [])
    .filter((f) => f.properties?.iso_a3)
    .map((f) => [f.properties.iso_a3, DISPLAY_NAMES[f.properties.iso_a3] ?? f.properties.name_ko ?? f.properties.name]));
}
