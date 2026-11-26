const FONT = 'Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif';
const PALETTE = ['#2f6f5e', '#8a5a2b', '#345f86', '#7a4f7d', '#9a7b2f', '#5b7d4a', '#a2574a', '#4d6a73'];
const label = { fontSize: 14, color: '#3a3a34' };
const AGGREGATE_NAMES = { WLD: '세계' };

function displayName(item, names = {}) {
  return (item.iso3 && (names[item.iso3] ?? AGGREGATE_NAMES[item.iso3])) || item.name;
}

function sortedRows(data, names) {
  return [...(data?.rows ?? [])]
    .filter((row) => row.value != null)
    .sort((a, b) => b.value - a.value)
    .map((row) => ({ ...row, name: displayName(row, names) }));
}

/** Years (and matching values) up to config.maxYear, so provisional latest-year aggregates can be left out. */
function limitedSeries(config, data, names) {
  const years = data?.years ?? [];
  const keep = years.map((year) => config.maxYear == null || Number(year) <= Number(config.maxYear));
  return {
    years: years.filter((_, index) => keep[index]),
    series: (data?.series ?? []).map((series) => ({ ...series, name: displayName(series, names), values: series.values.filter((_, index) => keep[index]) })),
  };
}

export function buildChartOption(config = {}, data = {}, names = {}) {
  const unit = config.unit ?? data.unit ?? '';
  const common = {
    color: PALETTE,
    textStyle: { fontFamily: FONT, fontSize: 14 },
    animationDuration: 250,
    aria: { enabled: true, decal: { show: true } },
    grid: { left: 16, right: 24, top: 48, bottom: 16, containLabel: true },
    tooltip: { trigger: config.kind === 'bar' ? 'item' : 'axis', textStyle: { fontSize: 14 } },
  };
  if (config.kind === 'bar') {
    const rows = sortedRows(data, names);
    return {
      ...common,
      xAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: label },
      yAxis: { type: 'category', inverse: true, data: rows.map((row) => row.name), axisLabel: label },
      series: [{ type: 'bar', data: rows.map((row) => row.value), barMaxWidth: 22 }],
    };
  }
  const { years, series } = limitedSeries(config, data, names);
  return {
    ...common,
    legend: { top: 0, textStyle: label },
    xAxis: { type: 'category', data: years, axisLabel: label },
    yAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: label },
    series: series.map((item) => ({ type: 'line', name: item.name, data: item.values, showSymbol: false, connectNulls: false, lineStyle: { width: 2.5 } })),
  };
}

export function chartHeader(config = {}, data = {}) {
  if (config.kind === 'bar') return ['국가·지역', data.unit ?? config.unit ?? '값'];
  return ['', ...limitedSeries(config, data).years];
}

export function chartRows(config = {}, data = {}, names = {}) {
  if (config.kind === 'bar') return sortedRows(data, names).map((row) => [row.name, row.value]);
  return limitedSeries(config, data, names).series.map((series) => [series.name, ...series.values.map((value) => (value == null ? '–' : value))]);
}
