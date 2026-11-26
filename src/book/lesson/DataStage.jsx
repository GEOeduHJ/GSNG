import DataChart from '../../viz/DataChart.jsx';
import DataMap from '../../viz/DataMap.jsx';

function sourceLine(step, manifest) {
  const item = (manifest?.items ?? []).find((entry) => entry.id === step.source);
  const parts = [];
  if (item?.organization) parts.push(item.organization);
  if (step.config?.maxYear != null) parts.push(`${step.config.maxYear}년까지`);
  else if (item?.year) parts.push(`${item.year}년 기준`);
  if (item?.attribution) parts.push(item.attribution);
  return { text: parts.join(', '), summary: item?.summary ?? '' };
}

export function Caption({ step, manifest }) {
  const { text } = sourceLine(step, manifest);
  return (
    <figcaption>
      <strong>{step.caption}</strong>
      {text && <> · 자료: {text}</>}
      {step.schematic && <> · 모식 자료</>}
    </figcaption>
  );
}

/** One data state on the right page. Falls back to text when data or rendering fails. */
export default function DataStage({ step, manifest, onInteract, motion = 'auto' }) {
  const { summary } = sourceLine(step, manifest);
  const fallback = (
    <div className="figure-alt">
      <p>{step.alt}</p>
      {summary && <p>{summary}</p>}
    </div>
  );
  let body = fallback;
  if (step.type === 'chart' && step.data) body = <DataChart url={step.data} config={step.config} alt={step.alt} fallback={fallback} onInteract={onInteract} reduced={motion === 'none'} />;
  if (step.type === 'map' && step.data) body = <DataMap url={step.data} config={step.config} alt={step.alt} fallback={fallback} onInteract={onInteract} reduced={motion === 'none'} />;
  if (step.type === 'image' && step.data) body = <img className="figure-image" src={step.data} alt={step.alt} />;
  return (
    <div className="stage" data-motion={motion} data-step={step.id}>
      <figure className="figure">
        {body}
        <Caption step={step} manifest={manifest} />
      </figure>
    </div>
  );
}
