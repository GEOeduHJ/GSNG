export default function LivingRegionLab({ config, value, onChange }) {
  const period = value.period || 'before';
  const threshold = Number(value.threshold || 10);
  const edges = config.data[period].filter((item) => item.value >= threshold);
  const zones = config.data.zones;
  const positions = Object.fromEntries(zones.map((zone, index) => [zone.id, { x: [15, 37, 57, 44, 67, 87][index], y: index < 3 ? 28 : 72 }]));
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  return <div className="living-region-lab">
    <div className="lab-control-row"><fieldset><legend>이동 자료 시점</legend>{[{ id: 'before', label: '교량 개통 전' }, { id: 'after', label: '교량 개통 후' }].map((item) => <label className="choice-chip" key={item.id}><input type="radio" name="living-period" checked={period === item.id} onChange={() => set({ period: item.id })} /><span>{item.label}</span></label>)}</fieldset>
      <label className="range-control">표시할 최소 연결 비율 <strong>{threshold}%</strong><input type="range" min="5" max="20" step="5" value={threshold} onChange={(event) => set({ threshold: Number(event.target.value) })} /></label></div>
    <div className="region-network"><svg viewBox="0 0 100 100" role="img" aria-label={`${period === 'before' ? '교량 전' : '교량 후'} 가상 구역 이동 관계`}>
      <defs><marker id="living-region-arrow" markerWidth="3.8" markerHeight="3.8" refX="3.3" refY="1.9" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 L3.8 1.9 L0 3.8 Z" /></marker></defs>
      <path className="admin-boundary" d="M8 50H93"/><text x="8" y="13">북부 행정 구역</text><text x="69" y="94">남부 행정 구역</text>
      {edges.map((edge) => { const a = positions[edge.from]; const b = positions[edge.to]; const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.hypot(dx, dy) || 1; const ux = dx / length; const uy = dy / length; return <g key={`${edge.from}-${edge.to}`}><line x1={a.x + ux * 4.5} y1={a.y + uy * 4.5} x2={b.x - ux * 5.5} y2={b.y - uy * 5.5} strokeWidth={1 + edge.value / 10} markerEnd="url(#living-region-arrow)" /><text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 2}>{edge.value}%</text></g>; })}
      {zones.map((zone) => <g key={zone.id}><circle cx={positions[zone.id].x} cy={positions[zone.id].y} r="4"/><text className="region-node-label" x={positions[zone.id].x} y={positions[zone.id].y + 8}>{zone.label}</text></g>)}
    </svg></div>
    <p className="lab-caution">비율의 분모는 각 출발 구역의 가상 응답자입니다. 표에 없는 목적지는 생략되어 있으며, 전후 수치는 실제 통근 통계가 아닙니다.</p>
    <div className="region-edge-list"><strong>{edges.length}개 연결이 표시됨</strong>{edges.map((edge) => <span key={`${edge.from}-${edge.to}`}>{zones.find((zone) => zone.id === edge.from)?.label} → {zones.find((zone) => zone.id === edge.to)?.label} {edge.value}%</span>)}{!edges.length && <small>현재 기준을 넘는 이동 연결이 없습니다.</small>}</div>
    <p className="lab-caution">화살표는 가상 이동 자료의 출발 구역에서 도착 구역으로 향하는 흐름을 나타냅니다. 슬라이더는 지도에 표시할 최소 비율을 바꿉니다. 전후 수치는 가상 데이터이며 교량의 실제 효과 추정값이 아닙니다.</p>
  </div>;
}
