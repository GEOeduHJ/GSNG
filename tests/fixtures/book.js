// Shared test fixture: a two-part table of contents with one full unit (01-01).
import { legacySections } from '../../src/content-loader/parse.js';

const textStep = (id) => ({ id, type: 'text', caption: '', source: '', alt: `${id} 설명`, config: {}, schematic: false, concepts: [] });
const chartStep = (id, concepts = []) => ({ id, type: 'chart', data: `/data/01-01/${id}.json`, caption: `${id} 자료`, source: `src-${id}`, alt: `${id} 그래프 설명`, config: { kind: 'bar', x: 'name', y: 'value', unit: '%', year: 2023 }, schematic: false, concepts });

function lesson(index, keyTerms) {
  const paragraphs = [`절${index} 문단 1`, `절${index} 문단 2`, `절${index} 문단 3`, `절${index} 문단 4`];
  const steps = [textStep(`l${index}s1`), chartStep(`l${index}s2`, keyTerms), chartStep(`l${index}s3`), textStep(`l${index}s4`)];
  return {
    id: `lesson-01-01-${index}`, unitId: '01-01', index, title: `절 ${index} 제목`, goal: `절 ${index} 목표`,
    format: 'legacy', opener: '', summary: [], textbookRef: null, routines: {},
    paragraphs, steps, sections: legacySections(paragraphs, steps),
    keyTerms,
    activity: { template: index === 3 ? 'civic-hearing' : 'evidence-sort', config: {}, fictional: index === 3 },
    sourceIds: [],
  };
}

/** A lesson in the module format: two topics, three linked data steps, opener and summary. */
function moduleLesson(index, keyTerms) {
  const steps = [chartStep('m1', keyTerms), chartStep('m2'), chartStep('m3')].map((step) => ({ ...step, label: `${step.id} 그래프` }));
  const sections = [
    { title: '소주제 가', paragraphs: [{ text: '가 문단 1', refs: ['m1'] }, { text: '가 문단 2', refs: [] }] },
    { title: '소주제 나', paragraphs: [{ text: '나 문단 1', refs: ['m2'] }, { text: '나 문단 2', refs: ['m3'] }] },
  ];
  return {
    ...lesson(index, keyTerms), format: 'module', opener: '생각 열기 문장', summary: ['정리 1', '정리 2', '정리 3'], textbookRef: { pages: [1, 2] },
    routines: { opener: { id: 'see-think-wonder', prompt: '열기 안내' }, inquiry: { id: 'claim-support-question', prompt: '탐구 안내' } },
    steps, sections, paragraphs: sections.flatMap((section) => section.paragraphs.map((p) => p.text)),
  };
}

export function makeBook({ moduleLesson: useModule = false } = {}) {
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
      lessons: [lesson(1, ['interdependence']), useModule ? moduleLesson(2, ['glocalization']) : lesson(2, ['glocalization']), lesson(3, ['scale'])],
    }],
    teacher: { '01-01': '# 교사용 안내\n\n- 발문: 예시 발문' },
    concepts: {
      interdependence: { label: '상호의존', definition: '서로 영향을 주고받는 관계.', units: ['01-01'], aliases: ['mutual-dependence'] },
      scale: { label: '공간 규모', definition: '현상을 보는 범위.', units: ['01-01'], aliases: [] },
      glocalization: { label: '세계지역화', definition: '세계적 흐름의 지역적 변형.', units: ['01-01'], aliases: [] },
    },
    sources: {},
    routines: { source: { organization: 'Project Zero', url: 'https://pz.harvard.edu/thinking-routines', license: 'CC BY-NC-ND 4.0' }, items: {
      'see-think-wonder': { id: 'see-think-wonder', name: 'See, Think, Wonder', nameKo: '보고·생각하고·궁금해하기', url: 'https://pz.harvard.edu/resources/see-think-wonder', steps: [{ id: 'see', label: '본 것', hint: '본 것 안내' }, { id: 'think', label: '생각한 것', hint: '생각 안내' }, { id: 'wonder', label: '궁금한 것', hint: '궁금 안내', toQuestion: true }] },
      'claim-support-question': { id: 'claim-support-question', name: 'Claim, Support, Question', nameKo: '주장·근거·되묻기', url: 'https://pz.harvard.edu/resources/claim-support-question', steps: [{ id: 'claim', label: '주장', hint: '' }, { id: 'support', label: '근거', hint: '' }, { id: 'question', label: '되묻기', hint: '', toQuestion: true }] },
      'unveiling-stories': { id: 'unveiling-stories', name: 'Unveiling Stories', nameKo: '숨은 이야기 찾기', url: 'https://pz.harvard.edu/resources/unveiling-stories', adapted: '원래 다섯 질문 가운데 넷만 썼다', steps: [{ id: 'story', label: '드러난 이야기' }, { id: 'untold', label: '가려진 이야기' }] },
      'used-to-think': { id: 'used-to-think', name: 'I Used to Think… Now I Think…', nameKo: '예전 생각·지금 생각', url: 'https://pz.harvard.edu/resources/i-used-think-now-i-think', steps: [{ id: 'used', label: '예전 생각', hint: '' }, { id: 'now', label: '지금 생각', hint: '' }] },
    } },
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
