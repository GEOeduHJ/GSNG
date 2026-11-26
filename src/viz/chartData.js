const FONT = 'Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif';
const PALETTE = ['#2f6f5e', '#8a5a2b', '#345f86', '#7a4f7d', '#9a7b2f', '#5b7d4a', '#a2574a', '#4d6a73'];
const label = { fontSize: 14, color: '#3a3a34' };

function sortedRows(data) {
  return [...(data?.rows ?? [])].filter((row) => row.value != null).sort((a, b) => b.value - a.value);
}

export function buildChartOption(config = {}, data = {}) {
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
    const rows = sortedRows(data);
    return {
      ...common,
      xAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: label },
      yAxis: { type: 'category', inverse: true, data: rows.map((row) => row.name), axisLabel: label },
      series: [{ type: 'bar', data: rows.map((row) => row.value), barMaxWidth: 22 }],
    };
  }
  return {
    ...common,
    legend: { top: 0, textStyle: label },
    xAxis: { type: 'category', data: data.years ?? [], axisLabel: label },
    yAxis: { type: 'value', name: unit, nameTextStyle: label, axisLabel: label },
    series: (data.series ?? []).map((series) => ({ type: 'line', name: series.name, data: series.values, showSymbol: false, connectNulls: false, lineStyle: { width: 2.5 } })),
  };
}

export function chartHeader(config = {}, data = {}) {
  return config.kind === 'bar' ? ['국가·지역', data.unit ?? config.unit ?? '값'] : ['', ...(data.years ?? [])];
}

export function chartRows(config = {}, data = {}) {
  if (config.kind === 'bar') return sortedRows(data).map((row) => [row.name, row.value]);
  return (data.series ?? []).map((series) => [series.name, ...series.values.map((value) => (value == null ? '–' : value))]);
}
