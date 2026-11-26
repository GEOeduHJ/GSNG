import { populationWithinRadius } from '../../../lesson-modules/unit-01/logic.js';

export default function ShelterSiteLab({ config, value, onChange }) {
  const { homes, candidates, radiusOptionsKm, caseFields } = config.data;
  const candidateId = value.candidateId || candidates[0].id;
  const selected = candidates.find((item) => item.id === candidateId) || candidates[0];
  const radiusKm = Number(value.radiusKm || radiusOptionsKm[0]);
  const coverage = populationWithinRadius(homes, selected, radiusKm);
  const homeById = new Set(coverage.pointIds);
  function set(patch) { onChange((current) => ({ ...current, ...patch })); }
  const point = (item) => ({ x: 22 + item.x * 92, y: 18 + item.y * 92 });
  const radiusPx = radiusKm * 92;
  return <div className="shelter-lab">
    <section className="nepal-case-worksheet" aria-labelledby="nepal-case-title"><div className="nepal-case-heading"><div><span className="eyebrow">실제 사례 자료 먼저 읽기</span><h4 id="nepal-case-title">네팔 지역 매핑과 대응·복구</h4></div><a href={config.sourceLinks[0].url} target="_blank" rel="noreferrer">GFDRR 사례 원문 ↗</a></div><p>원문에서 확인한 내용과 자료가 말하지 않는 부분을 구분해 적습니다. 설명문에 구체 세부사항이 없으면 ‘자료에 제시되지 않음’으로 남깁니다.</p>{caseFields.map((field, index) => <label key={field}><span>{String(index + 1).padStart(2, '0')} · {field}</span><textarea rows="2" value={value.caseNotes?.[index] || ''} onChange={(event) => set({ caseNotes: { ...(value.caseNotes || {}), [index]: event.target.value } })} placeholder="원문에서 직접 확인한 내용 또는 ‘자료에 제시되지 않음’" /></label>)}</section>
    <section className="shelter-simulation" aria-labelledby="shelter-simulation-title"><div className="shelter-section-title"><div><span className="eyebrow">가상 공간자료로 모의 결정</span><h4 id="shelter-simulation-title">후보지와 반경 안 모의 인구</h4></div><span className="activity-data-status">이 도시와 수치는 모두 가상</span></div>
      <div className="lab-control-row"><fieldset><legend>직선 반경</legend>{radiusOptionsKm.map((km) => <label className="choice-chip" key={km}><input type="radio" name="shelter-radius" checked={radiusKm === km} onChange={() => set({ radiusKm: km })} /><span>{Math.round(km * 1000)}m</span></label>)}</fieldset><fieldset className="candidate-choice"><legend>대피소 후보</legend>{candidates.map((item) => <label key={item.id} className={item.risk ? 'is-risk' : ''}><input type="radio" name="shelter-candidate" disabled={item.risk} checked={candidateId === item.id} onChange={() => set({ candidateId: item.id })} /><span>{item.label}{item.risk ? ' · 위험 구역 제외' : ''}</span></label>)}</fieldset></div>
      <div className="shelter-map"><svg viewBox="0 0 500 390" role="img" aria-label="가상 거주 지점과 대피소 후보의 직선 반경 지도">
        <path d="M0 0H500V390H0Z" className="shelter-map-background"/><path d="M0 260L500 85 M60 390L375 0 M0 105L500 295" className="shelter-road"/><path d="M320 0H500V142H320Z" className="shelter-risk-zone"/><text x="345" y="22">가상 위험 구역</text>
        <circle cx={point(selected).x} cy={point(selected).y} r={radiusPx} className="shelter-radius"/>
        {homes.map((home) => { const pos = point(home); return <g key={home.id} className={homeById.has(home.id) ? 'home-point is-covered' : 'home-point'}><circle cx={pos.x} cy={pos.y} r="7"/><text x={pos.x + 9} y={pos.y + 3}>{home.population}</text></g>; })}
        {candidates.map((item) => { const pos = point(item); return <g key={item.id} className={`shelter-candidate${selected.id === item.id ? ' is-selected' : ''}${item.risk ? ' is-risk' : ''}`}><rect x={pos.x - 8} y={pos.y - 8} width="16" height="16" rx="3"/><text x={pos.x + 10} y={pos.y + 3}>{item.label}</text></g>; })}
      </svg><div className="shelter-map-legend"><span><i className="home-legend"/>주거지의 가상 인구</span><span><i className="site-legend"/>대피소 후보</span><span><i className="risk-legend"/>위험 구역</span></div></div>
      <div className="shelter-metrics"><div><span>반경 안 모의 인구</span><strong>{coverage.population}명</strong><small>{coverage.pointIds.length}개 거주 지점의 population 합계</small></div><div><span>후보 시설 수용 인원</span><strong>{selected.capacity}명</strong><small>별도 속성 · 실제 수용력 아님</small></div><div><span>선택 후보</span><strong>{selected.label}</strong><small>{selected.risk ? '위험 구역 포함으로 선택 불가' : '정책 판단은 학생이 근거로 설명'}</small></div></div>
      <div className="shelter-comparison"><strong>같은 반경 기준에서 후보 비교</strong><div className="shelter-comparison-table"><span>후보</span><span>반경 안 모의 인구</span><span>후보 수용 인원</span><span>판정 조건</span>{candidates.map((item) => { const result = populationWithinRadius(homes, item, radiusKm); return <div className={item.risk ? 'is-risk' : ''} key={item.id}><strong>{item.label}</strong><span>{result.population}명</span><span>{item.capacity}명</span><small>{item.risk ? '위험 구역 제외' : item.id === selected.id ? '현재 선택' : '비교 가능'}</small></div>; })}</div></div>
      <p className="lab-caution">원형 범위는 평면상 직선거리(가상 좌표의 km)입니다. 인구 합계는 지점 수가 아니라 서로 다른 주거 지점의 population 속성을 더합니다. 도로망 보행 접근성, 중복 대피, 실제 주민 수나 대피 가능 인원을 뜻하지 않습니다.</p>
    </section>
  </div>;
}
