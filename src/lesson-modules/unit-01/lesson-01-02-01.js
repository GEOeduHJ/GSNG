const module = {
  lessonId: 'lesson-01-02-01', standardCode: '12세지01-02',
  qftPhaseMinutes: [5, 4, 3, 3, 8, 5, 2],
  questionFocus: { title: '크로아티아의 세 가지 참여 시점', stimulus: '크로아티아는 유럽연합, 유로 지역, 솅겐 지역에 서로 다른 시점에 참여했습니다. 각 제도는 별도의 참여 날짜와 범위를 가집니다.' },
  activity: {
    id: 'regional-integration-timeline', type: 'integration-timeline', title: '지역 통합 시간 지도',
    instruction: '세 제도의 참여 레이어를 바꾸고 시점을 비교하세요. 한 제도의 참여가 다른 제도의 참여와 같은 뜻인지 살펴봅니다.',
    dataStatus: '크로아티아의 공식 참여 시점 · 국가 경계 지도는 제공하지 않음', tools: ['시간선', '제도별 참여 레이어 비교'], aiMode: '미사용',
    data: {
      layers: [
        { id: 'eu', label: '유럽연합', date: '2013-07-01', event: '유럽연합 회원국이 됨', detail: '유럽연합 가입은 통화 사용이나 솅겐 참여와 같은 제도가 아닙니다.' },
        { id: 'euro', label: '유로 지역', date: '2023-01-01', event: '유로를 공식 통화로 사용하기 시작함', detail: '통화 통합은 별도의 제도·참여 시점을 가집니다.' },
        { id: 'schengen', label: '솅겐 지역', date: '2023-01-01', event: '솅겐 지역에 참여함', detail: '솅겐의 이동 제도는 유럽연합 회원 범위와 일치하지 않습니다.' },
      ],
      milestones: [
        { year: 2013, label: '2013년', note: '유럽연합 참여가 시작된 시점' },
        { year: 2023, label: '2023년', note: '유로 지역과 솅겐 참여가 시작된 시점' },
      ],
      cooperationQuestions: ['국가 사이의 공동 제도', '통화와 경제 교류', '국경을 넘는 이동'],
    },
    sourceLinks: [{ label: 'EU 국가별 공식 안내', url: 'https://european-union.europa.eu/principles-countries-history/eu-countries/croatia_en', note: '가입·유로·솅겐 참여 날짜를 제도별로 확인할 수 있습니다.' }],
  },
  buildArtifact: (state = {}) => {
    const layers = module.activity.data.layers.filter((item) => (state.visibleLayers || ['eu', 'euro', 'schengen']).includes(item.id));
    return { label: '지역 통합 시점 비교', summary: `${state.year || 2013}년 선택 · 확인한 제도: ${layers.map((item) => `${item.label}(${item.date})`).join(', ') || '없음'}${state.reasoning ? ` · 협력 목적 메모: ${state.reasoning}` : ''}`, limitation: '이 화면은 크로아티아의 제도 참여 시점을 비교하며 유럽 전체의 과거 회원 구성을 복원하지 않습니다.' };
  },
};
export default module;
