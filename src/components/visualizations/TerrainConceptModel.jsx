import { useMemo, useState } from 'react';

export default function TerrainConceptModel() {
  const [relief, setRelief] = useState(54);
  const [showBoundary, setShowBoundary] = useState(true);
  const ridgeY = useMemo(() => 184 - relief * 0.74, [relief]);
  const peakY = useMemo(() => 145 - relief * 0.92, [relief]);

  return (
    <section className="terrain-model" aria-labelledby="terrain-model-title">
      <div className="terrain-model-heading"><div><span className="eyebrow">직접 만든 개념 모형</span><h4 id="terrain-model-title">판의 움직임과 지형의 높낮이</h4></div><span className="model-badge">실측 지형 아님</span></div>
      <p className="terrain-model-copy">단면을 움직여 판의 수렴과 융기에 따른 지형 형성 개념을 살펴봅니다. 실제 지역의 높이·규모를 재현하지 않습니다.</p>
      <div className="terrain-stage">
        <svg viewBox="0 0 720 330" role="img" aria-labelledby="terrain-svg-title terrain-svg-desc">
          <title id="terrain-svg-title">두 판의 수렴과 산지 형성 개념 단면</title>
          <desc id="terrain-svg-desc">왼쪽 판은 오른쪽으로, 오른쪽 판은 왼쪽으로 이동합니다. 가운데 지표가 솟아 산지 모양이 됩니다. 높이 조절은 설명용 과장을 바꿉니다.</desc>
          <defs>
            <linearGradient id="terrain-land" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6b9f82" /><stop offset="1" stopColor="#317266" /></linearGradient>
            <linearGradient id="terrain-plate-left" x1="0" x2="1"><stop offset="0" stopColor="#c1d7cb" /><stop offset="1" stopColor="#87b7a1" /></linearGradient>
            <linearGradient id="terrain-plate-right" x1="1" x2="0"><stop offset="0" stopColor="#d8d6c5" /><stop offset="1" stopColor="#a4b79e" /></linearGradient>
          </defs>
          <path d={`M54 224 L225 224 Q265 221 302 ${ridgeY} Q330 ${peakY} 360 ${peakY - 4} Q394 ${peakY + 10} 423 ${ridgeY} Q455 226 493 224 L668 224 L668 292 L54 292 Z`} fill="url(#terrain-land)" />
          <path d="M54 224 L252 224 Q281 225 305 252 L54 252 Z" fill="url(#terrain-plate-left)" stroke="#5c8578" strokeWidth="2" />
          <path d="M668 224 L468 224 Q440 225 414 252 L668 252 Z" fill="url(#terrain-plate-right)" stroke="#768b74" strokeWidth="2" />
          <path d="M252 224 Q286 230 320 260 L352 286" fill="none" stroke="#55766c" strokeWidth="5" />
          <path d="M468 224 Q442 230 414 260 L387 286" fill="none" stroke="#6c7b6d" strokeWidth="5" />
          <path d="M302 205 L302 149 M418 205 L418 149" stroke="#173c39" strokeWidth="4" strokeLinecap="round" />
          <path d="M293 164 L302 145 L311 164 M409 164 L418 145 L427 164" fill="none" stroke="#173c39" strokeWidth="4" strokeLinejoin="round" />
          <text x="85" y="278" className="terrain-label">판 A</text><text x="591" y="278" className="terrain-label">판 B</text>
          <text x="329" y="106" className="terrain-label terrain-label-dark">융기</text>
          <path d={`M220 ${ridgeY + 9} Q360 ${peakY - 40} 503 ${ridgeY + 8}`} fill="none" stroke="#f3fbf7" strokeWidth="2" strokeDasharray="5 7" opacity=".78" />
          {showBoundary && <g><line x1="360" y1="214" x2="360" y2="295" stroke="#c35643" strokeWidth="3" strokeDasharray="6 5" /><text x="369" y="285" className="terrain-label terrain-boundary-label">판 경계(모식)</text></g>}
          <line x1="64" y1="224" x2="654" y2="224" stroke="#274c42" strokeWidth="2" />
        </svg>
      </div>
      <div className="terrain-controls">
        <label htmlFor="relief-range"><span>높이 과장</span><strong>{relief}%</strong></label>
        <input id="relief-range" type="range" min="25" max="90" value={relief} onChange={(event) => setRelief(Number(event.target.value))} />
        <label className="terrain-toggle"><input type="checkbox" checked={showBoundary} onChange={(event) => setShowBoundary(event.target.checked)} /><span>판 경계선 표시</span></label>
      </div>
      <p className="terrain-text-alt">대체 설명: 두 판이 서로 가까워지며 가운데 지표가 융기하는 단면 모형입니다. 슬라이더는 지형의 수직 과장만 바꾸며 실제 측정값을 나타내지 않습니다.</p>
    </section>
  );
}
