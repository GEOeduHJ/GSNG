export default function IntegrationTimelineLab({ config, value, onChange }) {
  const selectedYear = Number(value.year || 2013);
  const visibleLayers = value.visibleLayers || ['eu', 'euro', 'schengen'];
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  function toggleLayer(id) { set({ visibleLayers: visibleLayers.includes(id) ? visibleLayers.filter((item) => item !== id) : [...visibleLayers, id] }); }
  return <div className="integration-lab">
    <fieldset className="timeline-year-select"><legend>비교 시점</legend>{config.data.milestones.map((item) => <label key={item.year} className={`timeline-year-card${selectedYear === item.year ? ' is-selected' : ''}`}><input type="radio" name="integration-year" checked={selectedYear === item.year} onChange={() => set({ year: item.year })} /><span>{item.label}</span><small>{item.note}</small></label>)}</fieldset>
    <fieldset className="integration-layers"><legend>제도 레이어</legend>{config.data.layers.map((item) => {
      const active = selectedYear >= Number(item.date.slice(0, 4));
      return <label className={`integration-layer${active ? ' is-active' : ' is-pending'}`} key={item.id}><input type="checkbox" checked={visibleLayers.includes(item.id)} onChange={() => toggleLayer(item.id)} /><span className={`integration-layer-mark mark-${item.id}`} /><span><strong>{item.label}</strong><small>{active ? item.event : `참여 전 · ${item.date}에 시작`}</small></span></label>;
    })}</fieldset>
    <ol className="integration-event-list">{config.data.layers.filter((item) => visibleLayers.includes(item.id) && Number(item.date.slice(0, 4)) <= selectedYear).map((item) => <li key={item.id}><time>{item.date}</time><div><strong>{item.event}</strong><p>{item.detail}</p></div></li>)}</ol>
    <fieldset className="cooperation-purpose"><legend>이 제도가 다루는 협력 분야를 골라 이유를 적어 보세요.</legend>{config.data.cooperationQuestions.map((item) => <label className="choice-chip" key={item}><input type="checkbox" checked={(value.purposes || []).includes(item)} onChange={() => set({ purposes: (value.purposes || []).includes(item) ? value.purposes.filter((purpose) => purpose !== item) : [...(value.purposes || []), item] })} /><span>{item}</span></label>)}<textarea rows="3" value={value.reasoning || ''} onChange={(event) => set({ reasoning: event.target.value })} placeholder="협력의 가능성과 부담을 누구의 관점에서 더 조사해야 할까요?" /></fieldset>
    <p className="lab-caution">유럽연합·유로 지역·솅겐은 서로 다른 참여 제도입니다. 이 자료는 크로아티아의 공식 참여 날짜를 비교하며 유럽 국가 경계나 전체 회원 명단을 표시하지 않습니다.</p>
  </div>;
}
