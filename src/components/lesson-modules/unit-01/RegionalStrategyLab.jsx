import ExternalAiReview from './ExternalAiReview.jsx';

export default function RegionalStrategyLab({ config, value, onChange, questions }) {
  const selectedResource = config.data.resources.find((item) => item.id === value.resourceId) || config.data.resources[0];
  const primaryStrategy = config.data.strategies.find((item) => item.id === (value.primaryStrategyId || config.data.strategies[0].id)) || config.data.strategies[0];
  const comparisonStrategy = config.data.strategies.find((item) => item.id === (value.comparisonStrategyId || config.data.strategies[1].id)) || config.data.strategies[1];
  const selectedStrategy = config.data.strategies.find((item) => item.id === (value.strategyId || primaryStrategy.id)) || primaryStrategy;
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  const draft = `${selectedResource.label}를 활용해 ${selectedStrategy.label}을(를) 제안한다. 비교 전략: ${comparisonStrategy.label}. 이유: ${value.rationale || '(학생이 초안을 작성)'}`;
  const context = `지역 자원 카드: ${selectedResource.label} — ${selectedResource.detail}\n비교 전략 A: ${primaryStrategy.label} — 편익: ${primaryStrategy.benefit} — 부담: ${primaryStrategy.burden}\n비교 전략 B: ${comparisonStrategy.label} — 편익: ${comparisonStrategy.benefit} — 부담: ${comparisonStrategy.burden}`;
  const ready = Boolean(value.rationale?.trim() && questions.some((item) => item.text?.trim()));
  return <div className="strategy-lab">
    <div className="strategy-columns"><fieldset className="choice-list"><legend>지역 자원 선택</legend>{config.data.resources.map((item) => <label className="choice-row" key={item.id}><input type="radio" name="regional-resource" checked={(value.resourceId || config.data.resources[0].id) === item.id} onChange={() => set({ resourceId: item.id })} /><span><strong>{item.label}</strong><small>{item.detail}</small></span></label>)}</fieldset>
      <div className="strategy-comparison-select"><label>비교 전략 A<select value={primaryStrategy.id} onChange={(event) => set({ primaryStrategyId: event.target.value, strategyId: event.target.value })}>{config.data.strategies.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><label>비교 전략 B<select value={comparisonStrategy.id} onChange={(event) => set({ comparisonStrategyId: event.target.value })}>{config.data.strategies.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><fieldset><legend>최종 제안</legend>{[primaryStrategy, comparisonStrategy].map((item) => <label className="choice-chip" key={item.id}><input type="radio" name="regional-final-strategy" checked={selectedStrategy.id === item.id} onChange={() => set({ strategyId: item.id })} /><span>{item.label}</span></label>)}</fieldset></div></div>
      <div className="strategy-impact">{[primaryStrategy, comparisonStrategy].map((item) => <article key={item.id}><span className="eyebrow">{item.label}</span><div><strong>가능한 편익</strong><p>{item.benefit}</p></div><div><strong>살펴볼 부담</strong><p>{item.burden}</p></div></article>)}</div>
      <label className="lab-field">내가 이 전략을 고른 근거<textarea rows="4" value={value.rationale || ''} onChange={(event) => set({ rationale: event.target.value })} placeholder="지역 자원, 영향을 받는 집단, 자료의 한계를 연결해 적어보세요." /></label>
      <ExternalAiReview config={config.aiReview} value={value} onChange={onChange} ready={ready} draft={draft} context={context} />
  </div>;
}
