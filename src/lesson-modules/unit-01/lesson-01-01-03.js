const module = {
  lessonId: 'lesson-01-01-03', standardCode: '12세지01-01',
  qftPhaseMinutes: [5, 4, 4, 3, 7, 5, 2],
  questionFocus: { title: '학교 공동구매에 연결된 여러 주체', stimulus: '가상의 학교 티셔츠 구매에는 생산·판매·구매와 관련된 여러 장소의 사람들이 연결되어 있습니다. 각 행위자의 위치와 역할, 결정 권한은 서로 다르게 설정되어 있습니다.' },
  activity: {
    id: 'global-citizenship-hearing', type: 'civic-hearing', title: '세계시민 의사결정 공청회',
    instruction: '행위자와 영향 관계를 살펴보고, 개인·학교·기업·공공기관 중 실행 주체와 행동을 제안하세요.',
    dataStatus: '가상 학교 구매 사례 · 실제 증언 아님', tools: ['행위자 관계 보드', '실천 수준 비교', '선택형 Gemini 관점 검토'], aiMode: '외부 Gemini 선택 활용 · 가상 관점으로만 표시 · API 호출 없음',
    data: {
      actors: [
        { id: 'producer', label: '생산지 공동체', place: '다온 지역', role: '원료·생산 조건의 영향을 받음', power: '학교 구매 결정에는 직접 참여하지 않음' },
        { id: 'worker', label: '제작 노동자', place: '해오름 지역', role: '작업 조건과 납기 영향을 받음', power: '학교 구매 결정에는 직접 참여하지 않음' },
        { id: 'company', label: '판매 업체', place: '여러 지역', role: '상품과 계약 정보를 제공함', power: '판매 조건을 제안함' },
        { id: 'school', label: '학교 구성원', place: '우리 지역', role: '가격·품질·구매 방식의 영향을 받음', power: '공동구매 기준을 정할 수 있음' },
      ],
      levels: [
        { id: 'individual', label: '개인', action: '상품 정보와 사용·수선 선택을 확인한다.' },
        { id: 'school', label: '학교', action: '구매 기준과 공급 정보 공개 방식을 정한다.' },
        { id: 'company', label: '기업', action: '공급 경로와 작업 기준을 설명한다.' },
        { id: 'public', label: '공공기관', action: '노동·공급망 관련 제도와 정보 접근을 지원한다.' },
      ],
    },
    sourceLinks: [{ label: 'UNESCO 세계시민교육 안내', url: 'https://www.unesco.org/en/global-citizenship-peace-education/need-know', note: '개인·지역·세계 수준의 연결을 살펴보는 참고 자료입니다.' }],
    aiReview: { serviceLabel: 'Gemini', prompt: '아래 초안의 행동 제안에 빠진 관점이나 실행 조건을 질문으로 제시하세요. 실제 공동체 구성원의 증언처럼 쓰지 말고, 새 출처·통계·사실을 만들지 마세요. 응답은 가상의 검토 제안입니다.' },
  },
  buildArtifact: (state = {}) => {
    const actor = module.activity.data.actors.find((item) => item.id === state.actorId);
    const level = module.activity.data.levels.find((item) => item.id === state.levelId);
    return { label: '세계시민 의사결정 관점 지도', summary: `${actor?.label || '행위자를 선택하지 않음'} · ${level?.label || '실천 수준을 선택하지 않음'} · ${String(state.action || level?.action || '').trim() || '행동 제안을 작성하는 중'}`, limitation: '사례의 행위자·역할은 학습용으로 구성했으며 실제 증언이 아닙니다.' };
  },
};
export default module;
