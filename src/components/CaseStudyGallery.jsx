import { resolveSources } from '../content/sources.js';

export default function CaseStudyGallery({ caseStudies = [], title = '실제 사례로 살펴보기', showInquiryPrompts = true }) {
  if (!caseStudies.length) return null;
  return <section className="case-study-gallery" aria-label={title}>
    <div className="case-study-gallery-heading"><span className="eyebrow">출처 연결 사례</span><h3>{title}</h3></div>
    <div className="case-study-grid">{caseStudies.map((study) => {
      const sources = resolveSources(study.sourceIds || []);
      return <article className="case-study-card" key={study.id || study.title}>
        <div className="case-study-meta"><span>{study.place}</span>{study.period && <span>{study.period}</span>}</div>
        <h4>{study.title}</h4>
        <p>{study.summary}</p>
        {showInquiryPrompts && study.inquiryPrompt && <div className="case-study-prompt"><strong>탐구 초점</strong><p>{study.inquiryPrompt}</p></div>}
        {sources.length > 0 && <div className="case-study-sources"><strong>사례 출처</strong><ul>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} · {source.title}<span aria-hidden="true">↗</span></a></li>)}</ul></div>}
        {study.perspectiveNote && <small className="case-study-caveat">자료 관점: {study.perspectiveNote}</small>}
      </article>;
    })}</div>
    <p className="case-study-disclosure">링크는 사례를 확인하기 위한 시작점입니다. 본문 주장을 인용하거나 개별 표·지도·이미지를 재사용할 때는 원문에서 해당 내용과 이용 조건을 직접 확인하세요.</p>
  </section>;
}
