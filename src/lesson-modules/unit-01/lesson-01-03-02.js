import { findShortestRoute } from './logic.js';

const module = {
  lessonId: 'lesson-01-03-02', standardCode: '12세지01-03',
  qftPhaseMinutes: [5, 4, 3, 3, 8, 5, 2],
  questionFocus: { title: '목적과 제약에 따라 달라지는 길찾기', stimulus: '가상 도로망에는 거리와 계단 여부가 표시되어 있습니다. 경로의 선택 기준은 이용 목적과 이동 조건에 따라 달라질 수 있습니다.' },
  activity: {
    id: 'route-recommendation-lab', type: 'route-planning', title: '길찾기 추천 원리 실험실',
    instruction: '출발·도착점과 경로 조건을 선택하세요. 거리 우선, 계단 제외, 구간 폐쇄 조건에 따라 경로가 어떻게 달라지는지 비교합니다.',
    dataStatus: '가상 도로망 · 실시간 길찾기·GPS 자료가 아님', tools: ['브라우저 내 Dijkstra 최단경로', '경로 제약 전환'], aiMode: '미사용 · 경로 계산은 결정적 그래프 알고리즘',
    data: {
      nodes: [
        { id: 'A', label: '집', x: 12, y: 72 }, { id: 'B', label: '가게', x: 34, y: 72 },
        { id: 'C', label: '계단 길', x: 34, y: 35 }, { id: 'D', label: '공원', x: 57, y: 35 },
        { id: 'E', label: '학교', x: 82, y: 37 }, { id: 'F', label: '정류장', x: 57, y: 75 },
        { id: 'G', label: '도서관', x: 82, y: 75 },
      ],
      edges: [
        { id: 'ab', source: 'A', target: 'B', distance: 300, stairs: false }, { id: 'ac', source: 'A', target: 'C', distance: 260, stairs: true },
        { id: 'bc', source: 'B', target: 'C', distance: 150, stairs: true }, { id: 'cd', source: 'C', target: 'D', distance: 220, stairs: false },
        { id: 'bd', source: 'B', target: 'D', distance: 410, stairs: false }, { id: 'df', source: 'D', target: 'F', distance: 310, stairs: false },
        { id: 'fe', source: 'F', target: 'E', distance: 360, stairs: false }, { id: 'eg', source: 'E', target: 'G', distance: 270, stairs: false },
        { id: 'fg', source: 'F', target: 'G', distance: 330, stairs: false }, { id: 'de', source: 'D', target: 'E', distance: 450, stairs: false },
      ],
    },
    sourceLinks: [{ label: 'Cytoscape.js 경로 알고리즘 설명', url: 'https://js.cytoscape.org/#eles.dijkstra', note: '이 수업의 단순 가상 그래프는 거리와 계단 속성만 사용합니다.' }],
  },
  buildArtifact: (state = {}) => {
    const route = findShortestRoute(module.activity.data.nodes, module.activity.data.edges, state.startId || 'A', state.endId || 'E', { accessibleOnly: Boolean(state.accessibleOnly), closedEdgeIds: state.closedEdgeIds || [] });
    return { label: '길찾기 경로 조건 비교', summary: `${state.startId || 'A'} → ${state.endId || 'E'} · ${state.accessibleOnly ? '계단 제외' : '거리 우선'} · ${state.closedEdgeIds?.length ? `폐쇄 구간 ${state.closedEdgeIds.join(', ')}` : '폐쇄 구간 없음'} · ${route ? `${route.distance}m` : '경로 없음'}`, limitation: '가상 그래프의 거리 계산이며 실제 보행시간·경사·공사·안전정보를 포함하지 않습니다.' };
  },
};
export default module;
