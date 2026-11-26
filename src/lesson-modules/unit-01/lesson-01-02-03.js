const module = {
  lessonId: 'lesson-01-02-03', standardCode: '12세지01-02',
  qftPhaseMinutes: [5, 4, 3, 3, 8, 5, 2],
  questionFocus: { title: '교량 개통 전후 달라진 가상 이동 관계', stimulus: '행정 구역은 그대로지만 두 시점의 가상 통근·통학 연결은 달라집니다. 연결을 표시하는 기준에 따라 생활권의 범위도 다르게 보입니다.' },
  activity: {
    id: 'changing-functional-region', type: 'living-region', title: '움직이는 생활권 실험실',
    instruction: '가상 교량 개통 전후를 비교합니다. 비율의 분모는 각 출발 구역의 가상 응답자이며, 표에 없는 목적지는 생략되어 있습니다.',
    dataStatus: '가상 6개 구역 이동 행렬 · 실제 통근 통계가 아님', tools: ['전후 시점 선택', '연결 기준 슬라이더', 'SVG 흐름 비교'], aiMode: '미사용',
    data: {
      zones: [
        { id: 'A', label: '가온구', admin: '북부' }, { id: 'B', label: '새봄구', admin: '북부' },
        { id: 'C', label: '다리구', admin: '북부' }, { id: 'D', label: '한결구', admin: '남부' },
        { id: 'E', label: '물빛구', admin: '남부' }, { id: 'F', label: '푸른구', admin: '남부' },
      ],
      before: [{ from: 'A', to: 'B', value: 34 }, { from: 'B', to: 'C', value: 26 }, { from: 'D', to: 'E', value: 32 }, { from: 'E', to: 'F', value: 22 }, { from: 'C', to: 'D', value: 4 }],
      after: [{ from: 'A', to: 'B', value: 31 }, { from: 'B', to: 'C', value: 24 }, { from: 'D', to: 'E', value: 29 }, { from: 'E', to: 'F', value: 20 }, { from: 'C', to: 'D', value: 19 }, { from: 'B', to: 'E', value: 12 }],
      thresholds: [5, 10, 15, 20],
    },
    sourceLinks: [{ label: 'EU 공식 연혁', url: 'https://european-union.europa.eu/principles-countries-history/history-eu_en', note: '이 실습은 가상 이동 자료이며 실제 통합·분리 사례와 같은 원인으로 해석하지 않습니다.' }],
  },
  buildArtifact: (state = {}) => {
    const period = state.period || 'after';
    const threshold = Number(state.threshold || 10);
    const edges = module.activity.data[period].filter((item) => item.value >= threshold);
    return { label: '생활권 전후 비교', summary: `${period === 'after' ? '교량 개통 후' : '교량 개통 전'} · 표시 기준 ${threshold}% · 연결 ${edges.map((item) => `${item.from}–${item.to} ${item.value}%`).join(', ') || '기준을 넘는 연결 없음'}`, limitation: '표시 기준 변화와 이동 자료의 시점 변화는 서로 다른 요인입니다. 수치는 모두 가상입니다.' };
  },
};
export default module;
