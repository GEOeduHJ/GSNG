export default function GisLayerLab({ config, value, onChange }) {
  const data = config.data;
  const visibleLayers = value.visibleLayers || ['facilities', 'roads'];
  const selected = data.features.find((item) => item.id === value.featureId) || data.features[0];
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  function toggle(id) { set({ visibleLayers: visibleLayers.includes(id) ? visibleLayers.filter((item) => item !== id) : [...visibleLayers, id] }); }
  const facilities = data.features.filter((item) => item.layer === 'facilities' && visibleLayers.includes('facilities'));
  const classification = value.classification || 'relative';
  const classForValue = (number) => number <= 2 ? 'low' : number === 3 ? 'medium' : 'high';
  return <div className="gis-layer-lab">
    <fieldset className="gis-layer-controls"><legend>표시할 레이어 선택</legend>{data.layers.map((layer) => <label key={layer.id}><input type="checkbox" checked={visibleLayers.includes(layer.id)} onChange={() => toggle(layer.id)} /><i style={{ '--layer-color': layer.color }} /><span><strong>{layer.geometry}</strong> · {layer.label}</span></label>)}</fieldset>
    <div className="gis-demo-map" aria-label="레이어를 켜고 끄는 가상 도시 지도">
      <svg viewBox="0 0 100 70" role="group" aria-labelledby="gis-map-label"><title id="gis-map-label">가상 도시의 점·선·면·격자 레이어</title>
        {visibleLayers.includes('zones') && <><path d="M5 5H51V33H5Z" className="gis-zone zone-north"/><path d="M51 5H96V33H51Z" className="gis-zone zone-east"/><path d="M5 33H51V66H5Z" className="gis-zone zone-west"/><path d="M51 33H96V66H51Z" className="gis-zone zone-south"/></>}
        {visibleLayers.includes('environment') && <g className={`gis-grid level-${classification}`}>
          {data.gridCells.map((cell) => {
            const category = classForValue(cell.value);
            const cellLabel = classification === 'low-high' ? { low: '낮음', medium: '중간', high: '높음' }[category] : cell.value;
            return <g className={`gis-cell gis-cell-${classification === 'low-high' ? category : `value-${cell.value}`}`} key={cell.id}><rect x={cell.x} y={cell.y} width={cell.width} height={cell.height} /><text x={cell.x + cell.width / 2} y={cell.y + cell.height / 2 + 1}>{cellLabel}</text></g>;
          })}
          <path d="M34 5V66 M66 5V66 M5 33H96" />
        </g>}
        {visibleLayers.includes('roads') && <g className="gis-roads"><path d="M9 57L35 38L55 25L86 12 M18 9L35 38L67 55L91 62"/><path d="M12 58L36 39L57 26L85 13 M18 9L36 39L68 56L91 63"/></g>}
        {facilities.map((feature) => <g key={feature.id} className={`gis-facility${selected.id === feature.id ? ' is-selected' : ''}`} role="button" tabIndex="0" aria-label={feature.label} aria-pressed={selected.id === feature.id} onClick={() => set({ featureId: feature.id })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); set({ featureId: feature.id }); } }}><circle cx={feature.x} cy={feature.y} r="3.3"/><text x={feature.x + 2} y={feature.y - 3}>{feature.label}</text></g>)}
      </svg>
    </div>
    <label className="select-label">지도 객체와 속성 선택<select value={selected.id} onChange={(event) => set({ featureId: event.target.value })}>{data.features.map((feature) => <option value={feature.id} key={feature.id}>{feature.label} · {data.layers.find((layer) => layer.id === feature.layer)?.geometry || '격자'}</option>)}</select></label>
    {visibleLayers.includes('environment') && <>
      <label className="select-label">격자 분류·범례<select value={classification} onChange={(event) => set({ classification: event.target.value })}><option value="relative">상대값 1–5</option><option value="low-high">낮음·중간·높음 3단계</option></select></label>
      <div className="gis-grid-legend" aria-label={classification === 'low-high' ? '분류 범례: 낮음 1에서 2, 중간 3, 높음 4에서 5' : '상대값 범례: 1부터 5까지'}>
        {classification === 'low-high' ? <>{[['low', '낮음 · 1–2'], ['medium', '중간 · 3'], ['high', '높음 · 4–5']].map(([tone, label]) => <span key={tone}><i className={`gis-legend-${tone}`} />{label}</span>)}</> : [1, 2, 3, 4, 5].map((number) => <span key={number}><i className={`gis-legend-value-${number}`} />{number}</span>)}
      </div>
    </>}
    <div className="gis-feature-table"><div><span>선택한 지도 객체</span><strong>{selected.label}</strong></div><div><span>기하 유형</span><strong>{data.layers.find((item) => item.id === selected.layer)?.geometry || '격자'}</strong></div><div><span>속성 예시</span><strong>{selected.attribute}</strong></div><small>자료 제작 주체·실제 시점 대신 가상 수업자료로 표시한 연습용 속성입니다.</small></div>
    <p className="lab-caution">레이어를 겹친 것만으로 인과관계나 실제 위험도를 분석했다고 볼 수 없습니다. 선택한 자료의 시점·단위·출처를 함께 확인하세요.</p>
  </div>;
}
