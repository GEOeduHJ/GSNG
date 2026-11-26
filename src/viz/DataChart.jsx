import { useEffect, useRef, useState } from 'react';
import { buildChartOption, chartHeader, chartRows } from './chartData.js';
import { useJson } from './useJson.js';

let echartsPromise;
function loadEcharts() {
  echartsPromise ??= Promise.all([
    import('echarts/core'), import('echarts/charts'), import('echarts/components'), import('echarts/renderers'),
  ]).then(([core, charts, components, renderers]) => {
    core.use([charts.BarChart, charts.LineChart, components.AriaComponent, components.GridComponent, components.LegendComponent, components.TooltipComponent, renderers.CanvasRenderer]);
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
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </details>
  );
}

export default function DataChart({ url, config, alt, fallback, onInteract }) {
  const { status, data } = useJson(url);
  const containerRef = useRef(null);
  const [renderFailed, setRenderFailed] = useState(false);
  const payload = data?.[0];

  useEffect(() => {
    if (status !== 'ready' || !containerRef.current) return undefined;
    let chart;
    let observer;
    let disposed = false;
    loadEcharts().then((echarts) => {
      if (disposed || !containerRef.current) return;
      try {
        chart = echarts.init(containerRef.current, null, { renderer: 'canvas' });
        chart.setOption(buildChartOption(config, payload));
        chart.on('click', () => onInteract?.());
        chart.on('legendselectchanged', () => onInteract?.());
        if (typeof ResizeObserver !== 'undefined') {
          observer = new ResizeObserver(() => chart.resize());
          observer.observe(containerRef.current);
        }
      } catch {
        setRenderFailed(true);
      }
    }).catch(() => setRenderFailed(true));
    return () => { disposed = true; observer?.disconnect(); chart?.dispose(); };
  }, [status, payload, config, onInteract]);

  if (status === 'error') return fallback;
  return (
    <>
      {renderFailed ? fallback : <div ref={containerRef} className="figure-canvas" role="img" aria-label={alt} />}
      {payload && <ValueTable header={chartHeader(config, payload)} rows={chartRows(config, payload)} />}
    </>
  );
}
