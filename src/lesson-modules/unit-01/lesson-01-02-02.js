const module = {
  lessonId: 'lesson-01-02-02', standardCode: '12세지01-02',
  qftPhaseMinutes: [5, 5, 3, 3, 7, 5, 2],
  questionFocus: { title: '스코틀랜드 2014년 주민투표 결과', stimulus: '공식 결과의 집계 비율은 선택의 분포를 보여주지만, 각 유권자의 선택 이유를 직접 설명하지는 않습니다.' },
  activity: {
    id: 'separation-claims-evidence', type: 'separation-evidence', title: '분리 요구의 주장·근거 분석실',
    instruction: '공식 결과와 내가 찾은 설명 자료를 구분하고, 주장·근거·해석·미확인 사항을 기록합니다.',
    dataStatus: '공식 2014년 전국 결과 + 학생이 추가 탐색할 설명 자료', tools: ['ECharts 대립 막대', '주장·근거 정렬판', '선택형 Gemini 근거 확인'], aiMode: '외부 Gemini 선택 활용 · 생성 인용은 재사용 금지 전 원문 대조 · API 호출 없음',
    data: {
      results: [{ label: '독립 찬성', percent: 44.7 }, { label: '독립 반대', percent: 55.3 }],
      categories: ['경제·정책', '정체성·소속', '정치 권한'],
      claimTypes: ['사실 확인', '주장', '가치 판단', '아직 미확인'],
    },
    sourceLinks: [
      { label: 'Electoral Management Board for Scotland 공식 결과', url: 'https://www.emb.scot/emb/scottish-independence-referendum-2014-3/scottish-independence-referendum-18-september-2014', note: '결과 집계는 투표 이유를 말해주지 않습니다.' },
      { label: 'The Electoral Commission 공식 보고서', url: 'https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf', note: '보고서의 표·범위·방법을 직접 확인하세요.' },
    ],
    aiReview: { serviceLabel: 'Gemini', prompt: '아래 학생이 정리한 주장과 제공한 자료 설명을 비교해, 자료가 실제로 그 주장을 뒷받침하는지 점검 질문을 제안하세요. 새 출처·인용·투표 동기를 만들어내지 마세요. 확인할 수 없는 내용은 미확인이라고 표시하세요.' },
  },
  buildArtifact: (state = {}) => ({ label: '분리 요구 사례 분석 메모', summary: `${state.category || '분석 범주 미선택'} · ${state.claimType || '주장 유형 미분류'} · ${String(state.claim || '').trim() || '학생 주장 초안 없음'}${state.sourceUrl ? ` · 자료 ${state.sourceUrl}` : ''}${state.counterevidence ? ` · 다른 근거: ${state.counterevidence}` : ''}`, limitation: '전국 집계 비율만으로 개인의 동기나 지역별 원인을 추론하지 않습니다.' }),
};
export default module;
