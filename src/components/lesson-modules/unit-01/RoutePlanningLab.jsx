import { findShortestRoute } from '../../../lesson-modules/unit-01/logic.js';

export default function RoutePlanningLab({ config, value, onChange }) {
  const { nodes, edges } = config.data;
  const startId = value.startId || nodes[0].id;
  const endId = value.endId || nodes[4].id;
  const closedEdgeIds = value.closedEdgeIds || [];
  const route = findShortestRoute(nodes, edges, startId, endId, { accessibleOnly: Boolean(value.accessibleOnly), closedEdgeIds });
  const routeEdges = new Set(route?.edgeIds || []);
  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  function toggleClosed(edgeId) { set({ closedEdgeIds: closedEdgeIds.includes(edgeId) ? closedEdgeIds.filter((id) => id !== edgeId) : [...closedEdgeIds, edgeId] }); }
  return <div className="route-lab">
    <div className="route-controls"><label>출발<select value={startId} onChange={(event) => set({ startId: event.target.value })}>{nodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select></label><label>도착<select value={endId} onChange={(event) => set({ endId: event.target.value })}>{nodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select></label><label className="switch-label"><input type="checkbox" checked={Boolean(value.accessibleOnly)} onChange={(event) => set({ accessibleOnly: event.target.checked })} /><span>계단 구간 제외</span></label></div>
    <div className="route-graph"><svg viewBox="0 0 100 100" role="img" aria-label="가상 도로망과 선택 조건에 맞춘 경로">
      {edges.map((edge) => { const a = nodeById[edge.source]; const b = nodeById[edge.target]; const blocked = closedEdgeIds.includes(edge.id); const inaccessible = Boolean(value.accessibleOnly && edge.stairs); return <g key={edge.id} className={`route-edge${routeEdges.has(edge.id) ? ' is-route' : ''}${blocked ? ' is-closed' : ''}${inaccessible ? ' is-inaccessible' : ''}`}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y}/><text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 2}>{edge.distance}m{edge.stairs ? ' · 계단' : ''}</text></g>; })}
      {nodes.map((node) => <g key={node.id} className={`route-node${route?.nodeIds.includes(node.id) ? ' is-on-route' : ''}`}><circle cx={node.x} cy={node.y} r="4"/><text x={node.x} y={node.y + 8}>{node.label}</text></g>)}
    </svg></div>
    <div className="route-result" aria-live="polite">{route ? <><strong>추천 경로 · {route.distance}m</strong><p>{route.nodeIds.map((id) => nodeById[id].label).join(' → ')}</p></> : <><strong>이 조건에서는 갈 수 있는 경로가 없습니다.</strong><p>폐쇄 구간이나 이동 조건을 바꾸어 다시 살펴보세요.</p></>}</div>
    <fieldset className="route-closures"><legend>통행할 수 없는 구간을 바꾸어 보기</legend>{edges.map((edge) => <label key={edge.id}><input type="checkbox" checked={closedEdgeIds.includes(edge.id)} onChange={() => toggleClosed(edge.id)} /><span>{nodeById[edge.source].label}–{nodeById[edge.target].label}{edge.stairs ? ' · 계단' : ''}</span></label>)}</fieldset>
    <details className="route-list"><summary>계산 결과를 목록으로 확인</summary><p>{route ? `정점: ${route.nodeIds.join(' → ')} / 구간: ${route.edgeIds.join(', ')}` : '사용 가능한 경로 없음'}</p></details>
    <p className="lab-caution">Dijkstra 최단경로 계산은 AI가 아닙니다. 실제 보행시간·경사·엘리베이터 운행·공사·안전 정보는 포함하지 않습니다.</p>
  </div>;
}
