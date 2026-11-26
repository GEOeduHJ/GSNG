const module = {
  lessonId: 'lesson-01-03-01', standardCode: '12세지01-03',
  qftPhaseMinutes: [5, 4, 3, 3, 8, 5, 2],
  questionFocus: { title: '같은 가상 도시의 여러 공간 자료', stimulus: '시설 위치, 도로, 생활환경 격자는 서로 다른 형태의 공간 자료입니다. 각각의 레이어는 가상 도시의 서로 다른 속성과 범위를 담고 있습니다.' },
  activity: {
    id: 'assemble-gis-layers', type: 'gis-layers', title: '직접 조립하는 GIS 레이어 실습',
    instruction: '점·선·면·격자 레이어를 켜고 속성을 선택하세요. 어떤 지리적 질문을 답할 수 있으며 무엇은 알 수 없는지 정리합니다.',
    dataStatus: '가상 도시의 수업용 공간 자료 · 실제 시설·환경 자료가 아님', tools: ['SVG 레이어 조작', '속성표', '격자 분류 전환'], aiMode: '미사용',
    data: {
      layers: [
        { id: 'facilities', label: '시설 위치 · 점', geometry: '점', color: '#b66b4c' },
        { id: 'roads', label: '도로망 · 선', geometry: '선', color: '#5b8192' },
        { id: 'zones', label: '행정·생활 구역 · 면', geometry: '면', color: '#759775' },
        { id: 'environment', label: '가상 환경 지표 · 격자', geometry: '격자', color: '#d0a24f' },
      ],
      gridCells: [
        { id: 'g1', x: 5, y: 5, width: 29, height: 28, value: 2 }, { id: 'g2', x: 34, y: 5, width: 32, height: 28, value: 4 }, { id: 'g3', x: 66, y: 5, width: 30, height: 28, value: 3 },
        { id: 'g4', x: 5, y: 33, width: 29, height: 33, value: 1 }, { id: 'g5', x: 34, y: 33, width: 32, height: 33, value: 5 }, { id: 'g6', x: 66, y: 33, width: 30, height: 33, value: 2 },
      ],
      features: [
        { id: 'clinic', layer: 'facilities', label: '보건소', attribute: '이용 시간 09:00–18:00', x: 24, y: 45 },
        { id: 'school', layer: 'facilities', label: '학교', attribute: '교육 시설', x: 64, y: 30 },
        { id: 'market', layer: 'facilities', label: '시장', attribute: '생활 편의 시설', x: 72, y: 68 },
        { id: 'road-a', layer: 'roads', label: '중앙 도로', attribute: '도로 구간 A–B' },
        { id: 'zone-north', layer: 'zones', label: '북쪽 구역', attribute: '가상 구역 1' },
        { id: 'cell-1', layer: 'environment', label: '격자 가', attribute: '상대값 2/5 · 분류 낮음' },
        { id: 'cell-2', layer: 'environment', label: '격자 나', attribute: '상대값 4/5 · 분류 높음' },
      ],
    },
    sourceLinks: [{ label: 'QGIS 문서', url: 'https://docs.qgis.org/4.4/en/docs/index.html', note: 'GIS 용어·레이어의 추가 학습 자료입니다.' }],
  },
  buildArtifact: (state = {}) => {
    const layers = module.activity.data.layers.filter((item) => (state.visibleLayers || ['facilities', 'roads']).includes(item.id));
    const feature = module.activity.data.features.find((item) => item.id === state.featureId);
    const classification = state.classification === 'low-high' ? '낮음·중간·높음 3단계' : '상대값 1–5';
    return { label: '선택한 GIS 레이어와 속성', summary: `레이어 ${layers.map((item) => item.geometry).join('·') || '없음'}${feature ? ` · ${feature.label}: ${feature.attribute}` : ''} · 격자 표현 ${classification}`, limitation: '작은 가상 자료로 레이어·속성 개념을 익히며 실제 지리정보 분석을 대체하지 않습니다.' };
  },
};
export default module;
