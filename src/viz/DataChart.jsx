import { useEffect, useMemo, useRef, useState } from 'react';
import { buildChartOption, chartHeader, chartRows } from './chartData.js';
import { useJson } from './useJson.js';
import { BASE_MAP_URL, countryNames, formatNumber } from './mapData.js';

let echartsPromise;
function loadEcharts() {
  echartsPromise ??= Promise.all([
    import('echarts/core'), import('echarts/charts'), import('echarts/components'), import('echarts/renderers'),
  ]).then(([core, charts, components, renderers]) => {
    core.use([charts.BarChart, charts.LineChart, components.AriaComponent, components.GridComponent, components.LegendComponent, components.MarkAreaComponent, components.TooltipComponent, renderers.CanvasRenderer]);
    return core;
  });
  return echartsPromise;
}

export function ValueTable({ header, rows }) {
  if (!rows.length) return null;
  return (
    <details>
      <summary>값 표 보기</summary>
      <table>
        <thead><tr>{header.map((cell, index) => <th key={index} scope="col">{cell}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cellIndex === 0 ? cell : formatNumber(cell)}</td>)}</tr>)}</tbody>
      </table>
    </details>
  );
}

export default function DataChart({ url, config, alt, fallback, onInteract, reduced = false }) {
  const { status, data } = useJson(url);
  const base = useJson(BASE_MAP_URL);
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const interactRef = useRef(onInteract);
  interactRef.current = onInteract;
  const [renderFailed, setRenderFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const payload = data?.[0];
  const names = useMemo(() => countryNames(base.data?.[0]), [base.data]);

  // Create the chart once per data file; later prop changes only update its option.
  useEffect(() => {
    if (status !== 'ready' || !containerRef.current) return undefined;
    let chart;
    let observer;
    let disposed = false;
    loadEcharts().then((echarts) => {
      if (disposed || !containerRef.current) return;
      try {
        chart = echarts.init(containerRef.current, null, { renderer: 'canvas' });
        chart.on('click', () => interactRef.current?.());
        chart.on('legendselectchanged', () => interactRef.current?.());
        if (typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(() => chart.resize());
          observer.observe(containerRef.current);
        }
        chartRef.current = chart;
        setReady(true);
      } catch {
        setRenderFailed(true);
      }
    }).catch(() => setRenderFailed(true));
    return () => { disposed = true; observer?.disconnect(); chart?.dispose(); chartRef.current = null; setReady(false); };
  }, [status, payload]);

  useEffect(() => {
    if (!ready || !chartRef.current) return;
    try { chartRef.current.setOption(buildChartOption(config, payload, names, { reduced }), true); } catch { setRenderFailed(true); }
  }, [ready, config, payload, names, reduced]);

  if (status === 'error') return fallback;
  return (
    <>
      {renderFailed ? fallback : <div ref={containerRef} className="figure-canvas" role="img" aria-label={alt} />}
      {payload && <ValueTable header={chartHeader(config, payload)} rows={chartRows(config, payload, names)} />}
    </>
  );
}
