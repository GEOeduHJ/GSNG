export default function GlobalConnectionLab({ config, value, onChange }) {
  const { stages, scales } = config.data;
  const active = stages.find((stage) => stage.id === value.stageId) || stages[0];
  const scale = value.scale || '세계';
  const visible = stages.filter((stage) => scale === '세계' || stage.scale === scale || stage.id === active.id);
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  return <div className="connection-lab">
    <div className="lab-control-row"><fieldset><legend>공간 규모</legend>{scales.map((item) => <label className="choice-chip" key={item}><input type="radio" name="global-scale" checked={scale === item} onChange={() => set({ scale: item })} /><span>{item}</span></label>)}</fieldset><label className="switch-label"><input type="checkbox" checked={Boolean(value.delayed)} onChange={(event) => set({ delayed: event.target.checked })} /><span>가상 운송 지연 상황</span></label></div>
    <div className="connection-map" aria-label="가상 티셔츠 상품 단계와 장소를 연결한 모식도">
      <svg viewBox="0 0 100 82" role="img" aria-labelledby="connection-title"><title id="connection-title">가상 티셔츠 생산·유통 단계의 위치 관계</title><path className="connection-contour" d="M4 22 Q18 8 30 22 T55 20 T79 19 T98 24 M2 51 Q17 38 34 51 T65 49 T98 54" />
        {stages.slice(0, -1).map((stage, index) => <line key={stage.id} x1={stage.x} y1={stage.y} x2={stages[index + 1].x} y2={stages[index + 1].y} className={value.delayed && index === 2 ? 'connection-line is-interrupted' : 'connection-line'} />)}
        {visible.map((stage) => <g key={stage.id} onClick={() => set({ stageId: stage.id })} className={`connection-place${active.id === stage.id ? ' is-selected' : ''}`} role="button" tabIndex="0" aria-label={`${stage.label}, ${stage.place}`} aria-pressed={active.id === stage.id} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); set({ stageId: stage.id }); } }}><circle cx={stage.x} cy={stage.y} r="2.4"/><text x={stage.x} y={stage.y - 4}>{stage.label}</text></g>)}
      </svg>
      <div className="connection-place-list">{visible.map((stage) => <button type="button" key={stage.id} className={active.id === stage.id ? 'is-selected' : ''} aria-pressed={active.id === stage.id} onClick={() => set({ stageId: stage.id })}><span>{stage.label}</span><strong>{stage.place}</strong></button>)}</div>
    </div>
    <div className="lab-result-grid"><div><span className="eyebrow">선택한 단계 · {scale} 규모</span><strong>{active.place} · {active.actor}</strong><p>{active.note}</p></div><div><span className="eyebrow">상황 비교</span><strong>{value.delayed ? '가상 운송 지연' : '기본 연결'}</strong><p>{value.delayed ? '다음 단계의 도착이 늦어질 수 있다고 가정합니다. 실제 손실액·피해 규모는 계산하지 않습니다.' : '장소별 역할과 연결 관계를 관찰합니다.'}</p></div></div>
  </div>;
}
