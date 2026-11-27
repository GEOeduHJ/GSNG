---
title: 환경 문제 해결과 생태전환적 삶을 위해서는 어떤 노력이 필요할까?
goal: 국제 협약과 여러 수준의 실천을 자료에 근거해 살펴보고 생태전환 방안을 기준에 따라 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/04-02/south-korea-ghg-1990-2024.json
    source: u0402-korea-ghg-series
    caption: 대한민국 연도별 온실가스 배출량, 1990–2024년
    alt: 대한민국의 연도별 온실가스 배출량을 Mt CO₂e 단위로 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [environmental-problem, international-cooperation]
  - id: s3
    type: map
    data: /data/04-02/renewable-energy-consumption-map-2021.json
    source: u0402-renewable-energy-share
    caption: 국가별 최종 에너지 소비 중 재생에너지 비중, 2021년
    alt: 2021년 국가별 최종 에너지 소비에서 재생에너지가 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [ecological-transition, scale]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [ecological-transition, international-cooperation, environmental-justice, human-environment-interaction]
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 학교·가정의 생태전환 실천 평가
    instruction: 효과·비용·지속 가능성·참여하기 쉬움을 살펴 학교와 가정에서 가능한 방안을 비교한다. 개인의 선택 조건과 시설·제도의 지원을 함께 고려한다.
    prompt: 네 기준에 따라 각 방안을 평가하고, 자료에 없는 효과와 비용은 무엇을 더 확인해야 하는지 적으시오. 여러 사람이 참여할 수 있도록 학교나 지역의 지원 방안도 제안하시오.
    options:
      - { id: school-energy, label: 학교의 냉난방·조명 운영을 함께 조정하고 시설 개선을 제안한다. }
      - { id: reusable-events, label: 학교 행사에서 다회용 물품의 대여·세척·반납 체계를 마련한다. }
      - { id: low-carbon-commute, label: 안전한 통학 경로와 여건을 갖추어 대중교통·도보·자전거 이용을 돕는다. }
      - { id: home-energy, label: 가정에서 냉난방과 전력 사용 방식을 함께 살피고 필요한 지원을 찾는다. }
    criteria:
      - { id: effect, label: 환경 문제를 줄이는 데 기대되는 효과 }
      - { id: cost, label: 시작·유지 비용과 부담의 분배 }
      - { id: sustainability, label: 오래 지속할 수 있는가 }
      - { id: participation, label: 다양한 사람이 참여하기 쉬운가 }
sourceIds: [jones-owid-total-ghg, wdi-renewable-energy, unfccc-paris-agreement-2015, ipcc-ar6-wgiii-chapter5]
illustration:
  src: /images/04-02/ecological-transition.webp
  alt: 청소년과 이웃들이 자전거를 이용하고 텃밭의 지역 먹거리를 나누며 용기를 씻어 다시 쓴다.
---
파리협정과 국가 정책은 감축 목표와 적응 계획, 이행 점검을 연결한다. 국가결정기여는 각 나라가 정한 기후 행동 계획이다. 지방정부와 기업, 학교도 시설과 구매, 이동 방식의 선택을 통해 배출을 줄이고 기후 변화에 대응할 수 있다.

대한민국 온실가스 시계열에서 가장 높은 값은 2018년 약 709.1Mt CO₂e이고, 2024년은 약 630.6Mt CO₂e다. 이 계열은 CO₂·CH₄·N₂O와 토지 이용 배출을 포함한 OWID/Jones 자료다. GWP* 방식으로 환산해 대한민국 공식 국가 인벤토리와 산정 방식이 다르므로 계열의 정의를 함께 읽는다.

재생에너지 지도는 최종 에너지 소비 가운데 재생에너지 비중을 나타낸다. 2021년 브라질은 46.5%, 대한민국은 3.6%, 미국은 10.9%다. 이 값은 발전량 비중과 다르다. 비교 가능한 국가가 넓게 수록된 2021년 자료이므로 최근의 변화는 더 새로운 자료로 확인한다.

IPCC는 생활 방식의 선택이 교통·건물·식량 체계와 기반 시설, 정책의 지원과 함께 이루어질 때 온실가스 감축에 기여할 수 있다고 설명한다. 개인의 실천만으로는 변화의 조건을 만들기 어렵다. 학교와 지방정부, 기업은 선택 가능한 시설과 제도를 마련하고 영향을 받는 사람들의 참여를 보장할 수 있다.

생태전환은 생태계의 한계와 인간·자연의 공존을 고려해 생산·소비·생활 방식을 바꾸어 가는 방향이다. 학교와 가정의 실천은 효과뿐 아니라 비용과 지속 가능성, 참여 여건에 따라 평가한다. 의사결정 표에서 개인의 노력과 공동의 지원을 연결해 실행안을 제안해 보자.
