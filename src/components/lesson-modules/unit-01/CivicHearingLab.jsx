import ExternalAiReview from './ExternalAiReview.jsx';

export default function CivicHearingLab({ config, value, onChange, questions }) {
  const actor = config.data.actors.find((item) => item.id === value.actorId) || config.data.actors[0];
  const level = config.data.levels.find((item) => item.id === value.levelId) || config.data.levels[1];
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  const draft = `${actor.label} 관점에서 ${level.label} 수준의 행동을 제안한다. ${value.action || '(학생이 제안 행동을 작성)'}`;
  const context = `선택 행위자: ${actor.label} (${actor.place}) — 역할: ${actor.role} — 결정 권한: ${actor.power}\n실천 수준: ${level.label} — 학습 카드: ${level.action}`;
  const ready = Boolean(value.action?.trim() && questions.some((item) => item.text?.trim()));
  return <div className="hearing-lab">
    <div className="actor-map" aria-label="가상 구매 사례의 행위자와 장소 관계">
      {config.data.actors.map((item, index) => <button type="button" key={item.id} className={`actor-node actor-node-${index + 1}${actor.id === item.id ? ' is-selected' : ''}`} aria-pressed={actor.id === item.id} onClick={() => set({ actorId: item.id })}><span>{item.place}</span><strong>{item.label}</strong></button>)}
    </div>
    <div className="actor-detail"><div><span className="eyebrow">영향</span><p>{actor.role}</p></div><div><span className="eyebrow">결정 권한</span><p>{actor.power}</p></div></div>
    <fieldset className="action-levels"><legend>어느 수준에서 행동할까요?</legend>{config.data.levels.map((item) => <label key={item.id} className="choice-chip"><input type="radio" name="civic-action-level" checked={(value.levelId || 'school') === item.id} onChange={() => set({ levelId: item.id })} /><span>{item.label}</span></label>)}</fieldset>
    <p className="action-suggestion">제안의 출발점 · {level.action}</p>
    <label className="lab-field">내가 제안하는 행동<textarea rows="4" value={value.action || ''} onChange={(event) => set({ action: event.target.value })} placeholder="누가 무엇을 할 수 있는지, 실행 조건과 한계는 무엇인지 적어보세요." /></label>
    <ExternalAiReview config={config.aiReview} value={value} onChange={onChange} ready={ready} draft={draft} context={context} />
  </div>;
}
