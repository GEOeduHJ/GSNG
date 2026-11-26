import { populationWithinRadius } from './logic.js';

const module = {
  lessonId: 'lesson-01-03-03', standardCode: '12세지01-03',
  qftPhaseMinutes: [5, 4, 3, 3, 8, 5, 2],
  questionFocus: { title: '네팔 지역 매핑 사례와 가상 도시 자료', stimulus: 'GFDRR의 네팔 지역 매핑 사례 원문과 가상 도시의 대피소 후보지가 나란히 제시됩니다. 두 자료의 실제·모의 범위는 서로 다릅니다.' },
  activity: {
    id: 'shelter-site-decision', type: 'shelter-sites', title: '우리 도시 대피소 입지 결정실',
    instruction: '먼저 실제 네팔 매핑 사례가 밝힌 내용과 한계를 기록하세요. 이어 위험 구역을 제외한 가상 후보지를 거리 반경과 모의 인구·수용 인원으로 비교합니다.',
    dataStatus: '실제 사례 자료 링크 + 별도 가상 도시·가상 인구', tools: ['브라우저 반경 비교', '인구 속성 합산', '후보 비교 표'], aiMode: '미사용 · 가상 입지 결과는 실제 대피 효과가 아님',
    data: {
      radiusOptionsKm: [0.3, 0.5],
      homes: [
        { id: 'h1', x: 1.0, y: 1.0, population: 180 }, { id: 'h2', x: 1.2, y: 1.4, population: 120 },
        { id: 'h3', x: 2.3, y: 0.8, population: 95 }, { id: 'h4', x: 2.6, y: 1.2, population: 150 },
        { id: 'h5', x: 3.8, y: 2.5, population: 210 }, { id: 'h6', x: 3.6, y: 2.9, population: 90 },
        { id: 'h7', x: 0.6, y: 3.1, population: 70 },
      ],
      candidates: [
        { id: 'A', label: '후보 A', x: 1.0, y: 1.2, capacity: 320, risk: false },
        { id: 'B', label: '후보 B', x: 2.5, y: 1.4, capacity: 450, risk: false },
        { id: 'C', label: '후보 C', x: 3.8, y: 2.7, capacity: 280, risk: true },
      ],
      caseFields: ['참여 주체', '공간 자료·지도', '대응·복구와 연결', '원문에 제시되지 않은 세부 사항'],
    },
    sourceLinks: [{ label: 'GFDRR 네팔 지역 매핑 사례', url: 'https://recovery.preventionweb.net/publication/mapping-local-communities-inform-response-and-recovery-nepal', note: '짧은 기관 자료에서 구체 결정·성과가 제시되지 않으면 원문에 없음으로 기록하세요.' }],
  },
  buildArtifact: (state = {}) => {
    const candidate = module.activity.data.candidates.find((item) => item.id === state.candidateId);
    const covered = candidate && populationWithinRadius(module.activity.data.homes, candidate, Number(state.radiusKm || 0.3));
    const caseNotes = module.activity.data.caseFields.map((field, index) => state.caseNotes?.[index]?.trim() ? `${field}: ${state.caseNotes[index].trim()}` : '').filter(Boolean).join(' / ');
    const simulated = `${candidate?.label || '후보를 선택하지 않음'}${candidate?.risk ? ' · 위험 구역(선택 불가)' : ''} · ${Math.round(Number(state.radiusKm || 0.3) * 1000)}m 반경 · 반경 안 모의 인구 ${covered?.population ?? 0}명 · 후보 수용 인원 ${candidate?.capacity ?? '—'}명`;
    return { label: '대피소 후보지 모의 비교', summary: `${caseNotes ? `실제 사례 원문 메모: ${caseNotes} / ` : '실제 사례 원문 메모 미작성 / '}가상 도시 분석: ${simulated}`, limitation: '실제 사례 원문 메모와 가상 공간 분석은 별개의 자료입니다. 반경은 직선거리이며 도로망 접근성·실제 주민 수·실제 수용력을 나타내지 않습니다.' };
  },
};
export default module;
