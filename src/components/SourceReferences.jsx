import { resolveSources } from '../content/sources.js';

export default function SourceReferences({ ids = [] }) {
  const sources = resolveSources(ids);
  if (!sources.length) return null;
  return (
    <section className="source-list" aria-labelledby="source-list-title">
      <div className="source-list-heading"><span className="eyebrow">자료 출처</span><h3 id="source-list-title">더 살펴볼 공공 자료</h3></div>
      <ul>{sources.map((source) => <li key={source.url}>
        <a href={source.url} target="_blank" rel="noreferrer">{source.title}<span aria-hidden="true">↗</span></a>
        <small>{source.organization}</small>
      </li>)}</ul>
      <p>외부 링크는 출처 안내입니다. 원자료나 이미지의 재사용 조건은 제공기관의 자료별 안내를 확인하세요.</p>
    </section>
  );
}
