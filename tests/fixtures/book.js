// Shared test fixture: a two-part table of contents with one full unit (01-01).
const textStep = (id) => ({ id, type: 'text', caption: '', source: '', alt: `${id} 설명`, config: {}, schematic: false, concepts: [] });
const chartStep = (id, concepts = []) => ({ id, type: 'chart', data: `/data/01-01/${id}.json`, caption: `${id} 자료`, source: `src-${id}`, alt: `${id} 그래프 설명`, config: { kind: 'bar', x: 'name', y: 'value', unit: '%', year: 2023 }, schematic: false, concepts });

function lesson(index, keyTerms) {
  return {
    id: `lesson-01-01-${index}`, unitId: '01-01', index, title: `절 ${index} 제목`, goal: `절 ${index} 목표`,
    paragraphs: [`절${index} 문단 1`, `절${index} 문단 2`, `절${index} 문단 3`, `절${index} 문단 4`],
    steps: [textStep(`l${index}s1`), chartStep(`l${index}s2`, keyTerms), chartStep(`l${index}s3`), textStep(`l${index}s4`)],
    keyTerms,
    activity: { template: index === 3 ? 'civic-hearing' : 'evidence-sort', config: {}, fictional: index === 3 },
    sourceIds: [],
  };
}

export function makeBook() {
  return {
    toc: { parts: [
      { id: 'part-01', numeral: 'I', title: '세계시민, 세계화와 지역 이해', units: [
        { id: '01-01', title: '세계화와 세계시민', standardCode: '12세지01-01', lessons: [{ index: 1, title: '절 1 제목' }, { index: 2, title: '절 2 제목' }, { index: 3, title: '절 3 제목' }] },
        { id: '01-02', title: '지역 변화의 역동성', standardCode: '12세지01-02', lessons: [{ index: 1, title: 'x' }] },
      ] },
      { id: 'part-02', numeral: 'II', title: '모자이크 세계', units: [
        { id: '02-01', title: '세계의 기후와 인간 생활', standardCode: '12세지02-01', lessons: [{ index: 1, title: 'y' }] },
      ] },
    ] },
    units: [{
      id: '01-01', standardCode: '12세지01-01', title: '세계화와 세계시민', goal: '세계화를 여러 규모에서 설명한다.',
      concepts: ['interdependence', 'scale', 'glocalization'],
      opening: { intro: '중단원 소개 문장', focus: { kind: 'chart', step: chartStep('focus') } },
      closing: { summary: '정리 문장', bridge: '다음 중단원 연결 문장', transfer: { prompt: '새 지역 사례에 적용해 설명하기' } },
      lessons: [lesson(1, ['interdependence']), lesson(2, ['glocalization']), lesson(3, ['scale'])],
    }],
    teacher: { '01-01': '# 교사용 안내\n\n- 발문: 예시 발문' },
    concepts: {
      interdependence: { label: '상호의존', definition: '서로 영향을 주고받는 관계.', units: ['01-01'], aliases: ['mutual-dependence'] },
      scale: { label: '공간 규모', definition: '현상을 보는 범위.', units: ['01-01'], aliases: [] },
      glocalization: { label: '세계지역화', definition: '세계적 흐름의 지역적 변형.', units: ['01-01'], aliases: [] },
    },
    sources: {},
    manifest: { items: [] },
    provenance: { items: [] },
  };
}

export function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = String(value); },
    removeItem: (key) => { delete data[key]; },
    data,
  };
}

export const throwingStorage = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
};
