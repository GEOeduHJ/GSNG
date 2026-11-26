import ExternalAiReview from './ExternalAiReview.jsx';

export default function SeparationEvidenceLab({ config, value, onChange, questions }) {
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  const ready = Boolean(value.claim?.trim() && value.sourceTitle?.trim() && value.evidence?.trim() && questions.some((item) => item.text?.trim()));
  const draft = `범주: ${value.category || '(미선택)'}\n주장 유형: ${value.claimType || '(미분류)'}\n주장: ${value.claim || '(학생이 작성)'}\n자료: ${value.sourceTitle || '(자료 제목을 추가)'}`;
  const context = `공식 전국 유효표 비율: ${config.data.results.map((item) => `${item.label} ${item.percent}%`).join(' / ')}. 이 결과는 개인별 투표 이유를 입증하지 않습니다.\n학생이 입력한 근거 요약: ${value.evidence || '(아직 입력하지 않음)'}\n다른 관점의 근거: ${value.counterevidence || '(아직 입력하지 않음)'}`;
  return <div className="separation-lab">
    <div className="result-comparison"><div className="result-comparison-heading"><strong>2014년 전국 유효표의 선택 비율</strong><span>공식 결과 · 반올림</span></div>{config.data.results.map((item) => <div className="result-bar-row" key={item.label}><span>{item.label}</span><div className="result-bar-track"><i style={{ width: `${item.percent}%` }} /></div><strong>{item.percent}%</strong></div>)}<small>공식 결과 집계는 표의 분포를 보여줍니다. 지역별 경계·개인별 동기·분리의 원인을 이 수치만으로 알 수 없습니다.</small></div>
    <div className="analysis-lenses"><span className="eyebrow">추가 자료를 찾아 살필 수 있는 분석 범주</span>{config.data.categories.map((item) => <button type="button" className={(value.category || config.data.categories[0]) === item ? 'is-selected' : ''} aria-pressed={(value.category || config.data.categories[0]) === item} key={item} onClick={() => set({ category: item })}>{item}</button>)}<small>분석 범주이지, 확인된 투표 원인이나 특정 집단의 견해가 아닙니다.</small></div>
    <div className="claim-evidence-editor"><label className="lab-field">검토할 주장<textarea rows="3" value={value.claim || ''} onChange={(event) => set({ claim: event.target.value })} placeholder="찬성·반대 캠페인이나 공공 자료에서 확인한 주장을 자기 말로 요약합니다." /></label>
      <label>주장 유형<select value={value.claimType || ''} onChange={(event) => set({ claimType: event.target.value })}><option value="">유형을 고르세요</option>{config.data.claimTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>자료 제목<input value={value.sourceTitle || ''} onChange={(event) => set({ sourceTitle: event.target.value })} placeholder="원문 제목·발행 기관" /></label>
      <label>자료 링크<input type="url" value={value.sourceUrl || ''} onChange={(event) => set({ sourceUrl: event.target.value })} placeholder="https://" /></label>
      <label className="lab-field">자료가 실제로 보여주는 근거<textarea rows="3" value={value.evidence || ''} onChange={(event) => set({ evidence: event.target.value })} placeholder="직접 읽은 자료에서 확인한 범위와 시점을 적으세요." /></label>
      <label className="lab-field">다른 관점의 근거나 반대 근거<textarea rows="3" value={value.counterevidence || ''} onChange={(event) => set({ counterevidence: event.target.value })} placeholder="다른 자료·설명과 무엇을 비교해야 할까요?" /></label>
      <label className="lab-field">아직 확인하지 못한 점<textarea rows="2" value={value.unknown || ''} onChange={(event) => set({ unknown: event.target.value })} placeholder="결과 표에서 알 수 없는 이유나 추가 자료를 적으세요." /></label>
    </div>
    <ExternalAiReview config={config.aiReview} value={value} onChange={onChange} ready={ready} draft={draft} context={context} />
  </div>;
}
