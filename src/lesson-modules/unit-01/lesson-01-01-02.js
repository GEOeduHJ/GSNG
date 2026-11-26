const module = {
  lessonId: 'lesson-01-01-02', standardCode: '12세지01-01',
  qftPhaseMinutes: [5, 5, 4, 3, 8, 5, 2],
  questionFocus: { title: '외부 연결이 커지는 해안 마을', stimulus: '가상의 해안 마을은 지역 식재료와 공예 자원을 갖고 있습니다. 방문객 흐름과 지역 주민의 일상·환경은 장소 안에서 서로 연결되어 있습니다.' },
  activity: {
    id: 'glocal-strategy-studio', type: 'regional-strategy', title: '글로컬 지역 전략 스튜디오',
    instruction: '지역 자원을 고르고 두 대응 전략의 영향을 비교한 뒤, 근거를 들어 한 가지를 제안하세요.',
    dataStatus: '가상 지역 프로필 · 주민 발언·통계 아님', tools: ['React 전략 보드', '선택 자료 기반 외부 Gemini 검토(선택)'], aiMode: '외부 Gemini 선택 활용 · API 호출 없음',
    data: {
      resources: [
        { id: 'food', label: '지역 식재료', detail: '계절과 생산량에 따라 공급이 달라집니다.' },
        { id: 'craft', label: '공예 작업장', detail: '소규모 생산자와 기술 전승을 고려해야 합니다.' },
        { id: 'coast', label: '해안 생태 공간', detail: '방문 이용과 서식지 보전의 조정이 필요합니다.' },
      ],
      strategies: [
        { id: 'brand', label: '지역 공동 브랜드', benefit: '지역 생산자를 외부 소비자와 연결할 수 있습니다.', burden: '품질 관리와 참여 기준을 합의해야 합니다.' },
        { id: 'visitor', label: '방문객 분산·예약', benefit: '혼잡한 시간과 장소를 조정할 수 있습니다.', burden: '예약 접근성이 낮은 주민·방문객을 살펴야 합니다.' },
        { id: 'link', label: '지역 업체 우선 연계', benefit: '마을 안의 공급 관계를 넓힐 수 있습니다.', burden: '외부 업체와 지역 업체의 공정한 기회를 조정해야 합니다.' },
      ],
    },
    sourceLinks: [{ label: 'UNCTAD 무역 분석', url: 'https://unctad.org/topic/trade-analysis', note: '지역 전략의 효과를 입증하는 자료가 아니라 세계 경제 연결을 더 조사하는 출발점입니다.' }],
    aiReview: { serviceLabel: 'Gemini', prompt: '아래는 학생이 작성한 가상 지역 전략 초안입니다. 새 사실·통계·주민 발언을 만들지 마세요. 어떤 자료가 뒷받침되지 않는지, 빠진 집단이나 부담은 무엇인지 질문 형태로 제안하세요. 제안은 검증되지 않은 AI 출력으로 표시합니다.' },
  },
  buildArtifact: (state = {}) => {
    const strategy = module.activity.data.strategies.find((item) => item.id === state.strategyId);
    const resource = module.activity.data.resources.find((item) => item.id === state.resourceId);
    return { label: '지역 대응 전략 초안', summary: `${resource?.label || '선택한 자원 없음'} · ${strategy?.label || '전략을 선택하지 않음'} · ${String(state.rationale || '').trim() || '학생 근거 설명을 작성하는 중'}`, limitation: '지역 조건과 영향 설명은 가상 프로필에 한정됩니다.' };
  },
};
export default module;
