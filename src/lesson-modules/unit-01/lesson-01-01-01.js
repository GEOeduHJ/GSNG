const module = {
  lessonId: 'lesson-01-01-01',
  standardCode: '12세지01-01',
  qftPhaseMinutes: [7, 6, 4, 4, 9, 6, 2],
  questionFocus: {
    title: '한 벌의 티셔츠에 연결된 장소',
    stimulus: '가상의 티셔츠를 만드는 원료, 제작, 운송, 소비 단계가 서로 다른 장소에 놓여 있습니다. 상품의 각 단계는 여러 공간 규모와 행위자를 연결합니다.',
  },
  activity: {
    id: 'global-connection-map', type: 'global-connection',
    title: '티셔츠로 보는 세계 연결 지도',
    instruction: '가상 상품의 단계를 선택하고 규모를 바꾸어 보세요. 운송이 늦어진 상황에서 영향을 받는 장소와 행위자를 찾아봅니다.',
    dataStatus: '가상 학습 자료 · 실제 공급망·항로가 아님',
    tools: ['React 상호작용 지도', '단계·공간 규모 전환'], aiMode: '미사용',
    data: {
      stages: [
        { id: 'fiber', label: '원료', place: '누리 평야', actor: '면화 재배 공동체', scale: '지역', note: '원료 생산의 조건과 노동을 살펴봅니다.', x: 17, y: 59 },
        { id: 'fabric', label: '가공', place: '해오름 산업도시', actor: '방적·염색 노동자', scale: '국가', note: '원료가 원단으로 바뀌는 과정입니다.', x: 39, y: 36 },
        { id: 'sewing', label: '제작', place: '다온 항구 도시', actor: '의류 제작 노동자', scale: '지역', note: '부품·기술·노동이 모여 제품을 만듭니다.', x: 60, y: 66 },
        { id: 'retail', label: '유통', place: '큰물 물류 중심지', actor: '운송·판매 업체', scale: '국가', note: '여러 지역의 생산품을 소비자에게 전달합니다.', x: 79, y: 40 },
        { id: 'use', label: '사용', place: '우리 동네', actor: '소비자·수선 공동체', scale: '지역', note: '구매·사용·수선 선택도 연결의 일부입니다.', x: 86, y: 73 },
      ],
      scales: ['세계', '국가', '지역'],
    },
    sourceLinks: [{ label: 'UNCTAD 무역 분석', url: 'https://unctad.org/topic/trade-analysis', note: '국가·품목 무역 자료는 한 벌의 실제 이동 경로와 다릅니다.' }],
  },
  buildArtifact: (state = {}) => {
    const stage = module.activity.data.stages.find((item) => item.id === state.stageId) || module.activity.data.stages[0];
    return { label: '세계 연결 지도 관찰', summary: `${stage.label} 단계 · ${state.scale || '세계'} 규모 · ${stage.place}의 ${stage.actor}${state.delayed ? ' · 운송 지연 가상 상황을 비교함' : ''}`, limitation: '교육용 가상 상품 경로이며 실제 공급망이나 항로를 나타내지 않습니다.' };
  },
};

export default module;
