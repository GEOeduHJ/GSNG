import { resolveSources } from '../content/sources.js';

export default function SourceReferences({ ids = [] }) {
  const sources = resolveSources(ids);
  if (!sources.length) return null;
  return (
    <section className="source-list" aria-labelledby="source-list-title">
      <div className="source-list-heading"><span className="eyebrow">추가 조사 링크</span><h3 id="source-list-title">더 살펴볼 자료</h3></div>
      <ul>{sources.map((source) => <li key={source.url}>
        <a href={source.url} target="_blank" rel="noreferrer">{source.title}<span aria-hidden="true">↗</span></a>
        <small>{source.organization}</small>
      </li>)}</ul>
      <p>이 목록은 추가 조사를 위한 시작점이며 각 문장의 직접 근거를 뜻하지 않습니다. 인용 전 원문에서 해당 내용·시점·범위를 확인하고, 표·이미지·데이터를 재사용할 때는 자료별 이용 조건도 확인하세요.</p>
    </section>
  );
}
