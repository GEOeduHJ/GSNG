---
title: 환경 문제 해결과 생태전환적 삶을 위해서는 어떤 노력이 필요할까?
goal: 국제 협약과 국가·기업·지역·개인의 역할을 살펴보고 생태전환적 실천을 기준에 따라 평가할 수 있다.
opener: 교실과 가정의 선택을 바꾸려면 어떤 시설과 규칙, 기업과 공공기관의 변화가 함께 필요할까? 지속 가능한 실천의 기준을 생각해 보자.
textbookRef: { pages: [194, 199] }
steps:
  - id: d1
    type: chart
    data: /data/04-02/south-korea-ghg-1990-2024.json
    label: 대한민국 온실가스 배출 시계열
    caption: 대한민국 연도별 온실가스 배출량, 1990–2024년
    source: u0402-korea-ghg-series
    alt: 대한민국의 연도별 온실가스 배출량을 Mt CO₂e 단위로 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: 'Mt CO₂e' }
    concepts: [environmental-problem, international-cooperation]
  - id: d2
    type: map
    data: /data/04-02/renewable-energy-consumption-map-2021.json
    label: 재생에너지 소비 비중
    caption: 국가별 최종 에너지 소비 중 재생에너지 비중, 2021년
    source: u0402-renewable-energy-share
    alt: 2021년 국가별 최종 에너지 소비에서 재생에너지가 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [ecological-transition, scale]
  - id: d3
    type: image
    schematic: true
    data: /images/04-02/ecological-transition-framework.svg
    label: 생태 발자국과 생태 용량 개념도
    caption: 생태계의 재생 능력과 생활 방식의 관계
    source: ''
    alt: 생태 발자국으로 나타내는 인간의 자원 수요와 생태 용량을 정책·기업·지역·개인의 선택과 연결한 개념도다.
    config: {}
    concepts: [ecological-transition, human-environment-interaction]
  - id: d4
    type: chart
    data: /data/04-02/forest-area-selected-countries-1990-2024.json
    label: 주요국 산림 면적 비율 변화
    caption: 주요 6개국 산림 면적 비율 변화, 1990–2024년
    source: u0402-forest-area-series
    alt: 여섯 나라에서 산림이 국토에서 차지하는 비율의 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: '%' }
    concepts: [ecological-transition, human-environment-interaction]
summary:
  - 국제 협약은 국가가 함께 다룰 환경 문제의 목표와 협력 절차를 마련한다.
  - 국가 정책과 기업의 생산·에너지 선택은 환경 부담과 전환의 속도에 영향을 준다.
  - 생태 발자국은 자원 이용의 수요를, 생태 용량은 자연의 생산과 재생 능력을 나타낸다.
  - 생태전환적 삶은 개인의 실천과 공공 기반 시설, 기업·지역의 변화가 이어질 때 넓어진다.
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 학교·가정의 생태전환 실천 평가
    instruction: 효과·비용·지속 가능성·참여하기 쉬움을 살펴 학교와 가정에서 가능한 방안을 비교한다.
    prompt: 네 기준에 따라 각 방안을 평가하고 자료에 없는 효과와 비용은 무엇을 더 확인해야 하는지 적으시오. 개인의 선택을 지원할 학교·지역의 시설과 제도도 함께 제안하시오.
    options:
      - { id: school-energy, label: 학교의 냉난방·조명 운영을 조정하고 시설 개선을 제안한다. }
      - { id: low-carbon-commute, label: 안전한 통학 경로와 여건을 갖추어 대중교통·도보·자전거 이용을 돕는다. }
      - { id: repair-reuse, label: 학교 행사에서 수리·재사용 물품의 대여·세척·반납 체계를 마련한다. }
      - { id: local-restoration, label: 지역의 공원·하천·숲 관리에 주민과 학교가 참여한다. }
    criteria:
      - { id: effect, label: 환경 문제를 줄이는 데 기대되는 효과 }
      - { id: cost, label: 시작·유지 비용과 부담의 분배 }
      - { id: sustainability, label: 오래 지속할 수 있는가 }
      - { id: participation, label: 다양한 사람이 참여하기 쉬운가 }
keyTerms: [ecological-transition, international-cooperation, environmental-justice, human-environment-interaction]
sourceIds: [jones-owid-total-ghg, wdi-renewable-energy, wdi-forest-area, unfccc-convention-1992, unfccc-paris-agreement-2015, unece-transboundary-air-pollution, basel-plastic-waste-amendments, unep-montreal-protocol, ipcc-ar6-wgiii-chapter5, global-footprint-network-faq, curitiba-transport-network, curitiba-cambio-verde]
illustration:
  src: /images/04-02/ecological-transition.webp
  alt: 청소년과 이웃들이 자전거를 이용하고 텃밭의 지역 먹거리를 나누며 용기를 씻어 다시 쓴다.
---
## 국제 협약과 공동 대응

국제 환경 협약은 여러 나라가 함께 다룰 문제의 목표와 협력 절차를 마련한다. 파리협정은 국가결정기여와 이행 점검을 연결한다. 몬트리올 의정서는 오존층 파괴 물질의 생산·소비를 줄이는 약속이다. 바젤 협약은 유해 폐기물과 플라스틱 폐기물 등 폐기물의 국가 간 이동을 관리한다. 장거리 대기오염 협약은 오염을 공동 감시하고 대응한다. 이는 국경 간 대기 오염 협력의 사례다.

정부는 배출을 줄이는 기준과 기반 시설, 재정 지원을 마련한다. 기업의 환경 책임은 생산·물류·조달 과정의 에너지와 자원 흐름을 바꾸는 데서 시작한다. 대한민국 온실가스 배출 계열은 1990년 288.6Mt CO₂e, 2018년 709.1Mt CO₂e, 2024년 630.6Mt CO₂e다. 시계열에서 변화의 흐름을 살펴 국가 계획과 산업·에너지 구조의 관계를 설명해 보자. [[d1]]

## 에너지 전환과 생태계 보전

에너지 전환은 화석 연료 의존을 줄이고 재생에너지와 효율 개선을 넓히는 과정이다. 2021년 최종 에너지 소비 중 재생에너지 비중은 브라질 46.5%, 대한민국 3.6%, 미국 10.9%다. 지도에서 국가별 에너지 구조를 비교하고 전환에 필요한 정책과 기반 시설을 생각해 보자. [[d2]]

산림은 이산화 탄소를 흡수하고 생물 다양성을 지키는 생태계다. 열대림이 농경지와 목초지로 바뀌면 탄소 흡수원이 줄어들고, 나무를 다시 심고 보호 구역을 넓히면 흡수원이 회복된다. 산림 비율 그래프에서 산림이 줄어든 나라와 늘어난 나라를 찾아 보전과 복원의 노력을 비교해 보자. [[d4]]

## 생태전환적 삶과 지역 실천

ecological footprint(생태 발자국)는 사람들이 소비하는 자원과 배출하는 폐기물을 감당하는 데 필요한 생물 생산 공간의 수요다. biocapacity(생태 용량)는 생태계가 자원을 생산하고 폐기물을 흡수하며 회복하는 능력이다. 생태전환은 이 수요와 자연의 재생 능력을 함께 고려해 생산·소비·이동 방식을 바꾸는 과정이다. 개인의 생활 방식은 공공 정책과 시설, 기업의 선택과 연결된다. 개념도에서 기업·지역·개인의 선택과 공동체 참여가 맡는 역할을 살펴보자. [[d3]]

쿠리치바는 도시 교통의 통합 버스망과 녹색 교환 프로그램으로 이동과 재활용, 지역 농산물 이용을 연결한다. 지역 교통과 폐기물 관리가 생활 선택의 조건을 바꾸는 사례다.
