const FONT = 'Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif';
const PALETTE = ['#2f6f5e', '#8a5a2b', '#345f86', '#7a4f7d', '#9a7b2f', '#5b7d4a', '#a2574a', '#4d6a73'];
const label = { fontSize: 14, color: '#3a3a34' };

/** Axis-friendly number: 217,867,864 → '2.2억', 56,000 → '5.6만', smaller numbers with thousands separators. */
export function compactNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  const abs = Math.abs(n);
  const trim = (x) => String(Math.round(x * 10) / 10);
  if (abs >= 1e8) return `${n < 0 ? '-' : ''}${trim(abs / 1e8)}억`;
  if (abs >= 1e4) return `${n < 0 ? '-' : ''}${trim(abs / 1e4)}만`;
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 });
}
const valueLabel = { ...label, formatter: compactNumber };
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

export function buildChartOption(config = {}, data = {}, names = {}, { reduced = false } = {}) {
  const unit = config.unit ?? data.unit ?? '';
  const common = {
    color: PALETTE,
    textStyle: { fontFamily: FONT, fontSize: 14 },
    animation: !reduced,
    animationDuration: 250,
    aria: { enabled: true, decal: { show: true } },
    grid: { left: 16, right: 24, top: 48, bottom: 16, containLabel: true },
    tooltip: { trigger: config.kind === 'bar' ? 'item' : 'axis', textStyle: { fontSize: 14 } },
  };
  if (config.kind === 'pyramid') {
    const unit = data.unit ?? config.unit ?? '';
    return {
      ...common,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, valueFormatter: (value) => `${Math.abs(value)}${unit}`, textStyle: { fontSize: 14 } },
      legend: { top: 0, textStyle: label },
      xAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: { ...label, formatter: (value) => String(Math.abs(value)) } },
      yAxis: { type: 'category', data: data.groups ?? [], axisLabel: label },
      series: [
        { type: 'bar', name: '남성', stack: 'total', data: (data.male ?? []).map((value) => (value == null ? null : -value)), itemStyle: { color: '#345f86' } },
        { type: 'bar', name: '여성', stack: 'total', data: data.female ?? [], itemStyle: { color: '#a2574a' } },
      ],
    };
  }
  if (config.kind === 'climograph') {
    const units = data.unit ?? {};
    return {
      ...common,
      tooltip: { trigger: 'axis', textStyle: { fontSize: 14 } },
      legend: { top: 0, textStyle: label },
      xAxis: { type: 'category', data: monthLabels(data), axisLabel: label },
      yAxis: [
        { type: 'value', name: `강수량(${units.precipitation ?? 'mm'})`, nameTextStyle: label, axisLabel: label },
        { type: 'value', name: `기온(${units.temperature ?? '°C'})`, nameTextStyle: label, axisLabel: label, splitLine: { show: false } },
      ],
      series: [
        { type: 'bar', name: '강수량', data: data.precipitation ?? [], itemStyle: { color: '#345f86' }, barMaxWidth: 18 },
        { type: 'line', name: '기온', yAxisIndex: 1, data: data.temperature ?? [], itemStyle: { color: '#a2574a' }, lineStyle: { width: 2.5 } },
      ],
    };
  }
  if (config.kind === 'bar') {
    const rows = sortedRows(data, names);
    return {
      ...common,
      xAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: valueLabel },
      yAxis: { type: 'category', inverse: true, data: rows.map((row) => row.name), axisLabel: label },
      series: [{ type: 'bar', data: rows.map((row) => row.value), barMaxWidth: 22 }],
    };
  }
  const { years, series } = limitedSeries(config, data, names);
  return {
    ...common,
    legend: { top: 0, textStyle: label },
    xAxis: { type: 'category', data: years, axisLabel: label },
    yAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: valueLabel },
    series: series.map((item, index) => ({
      type: 'line', name: item.name, data: item.values, showSymbol: false, connectNulls: false, lineStyle: { width: 2.5 },
      ...(index === 0 ? projectionArea(config, years) : {}),
    })),
  };
}

/** Shade years from config.projectionFrom to the end, labelled 중위 전망, so projections never read as observations. */
function projectionArea(config, years) {
  if (config.projectionFrom == null || !years.length) return {};
  const from = years.find((year) => Number(year) >= Number(config.projectionFrom));
  if (from == null) return {};
  return {
    markArea: {
      silent: true,
      itemStyle: { color: 'rgba(138, 90, 43, 0.10)' },
      label: { show: true, position: 'insideTop', fontSize: 14, color: '#5c3d1d' },
      // category axes read numbers as indexes, so name the categories as strings
      data: [[{ name: '중위 전망', xAxis: String(from) }, { xAxis: String(years.at(-1)) }]],
    },
  };
}

function monthLabels(data) {
  return (data.months ?? []).map((month) => `${month}월`);
}

export function chartHeader(config = {}, data = {}) {
  if (config.kind === 'climograph') return ['', ...monthLabels(data)];
  if (config.kind === 'pyramid') return ['연령', `남성(${data.unit ?? ''})`, `여성(${data.unit ?? ''})`];
  if (config.kind === 'bar') return ['국가·지역', data.unit ?? config.unit ?? '값'];
  return ['', ...limitedSeries(config, data).years];
}

export function chartRows(config = {}, data = {}, names = {}) {
  if (config.kind === 'pyramid') return (data.groups ?? []).map((group, index) => [group, data.male?.[index] ?? '–', data.female?.[index] ?? '–']);
  if (config.kind === 'climograph') {
    const units = data.unit ?? {};
    return [[`강수량(${units.precipitation ?? 'mm'})`, ...(data.precipitation ?? [])], [`기온(${units.temperature ?? '°C'})`, ...(data.temperature ?? [])]];
  }
  if (config.kind === 'bar') return sortedRows(data, names).map((row) => [row.name, row.value]);
  return limitedSeries(config, data, names).series.map((series) => [series.name, ...series.values.map((value) => (value == null ? '–' : value))]);
}
