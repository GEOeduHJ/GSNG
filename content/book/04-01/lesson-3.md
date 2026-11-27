---
title: '친환경 에너지의 종류와 특징은 무엇일까?'
goal: 재생 에너지원의 입지와 발전 자료를 구분하고, 가상 지역의 조건에 맞는 에너지 전환 방안을 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/04-01/renewable-electricity-share-map.json
    source: u0401-renewable-electricity-share-map
    caption: Ember, 국가별 재생에너지 발전 비중, 2024년(% of electricity generation)
    alt: 2024년 국가별 전력 발전량 가운데 재생 에너지 발전량이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [renewable-energy, spatial-inequality]
  - id: s3
    type: chart
    data: /data/04-01/solar-capacity-top10.json
    source: u0401-solar-capacity-top10
    caption: Ember, 태양광 설비 용량 상위 10개국, 2024년(GW)
    alt: 태양광 발전 설비 용량이 큰 상위 10개국을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [renewable-energy, energy-transition]
  - id: s4
    type: chart
    data: /data/04-01/wind-capacity-top10.json
    source: u0401-wind-capacity-top10
    caption: Ember, 풍력 설비 용량 상위 10개국, 2024년(GW)
    alt: 풍력 발전 설비 용량이 큰 상위 10개국을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [renewable-energy, energy-transition]
  - id: s5
    type: chart
    data: /data/04-01/korea-renewable-electricity-share-series.json
    source: u0401-korea-renewable-electricity-share-series
    caption: Ember, 대한민국 재생에너지 발전 비중 변화, 1985–2025년(% of electricity generation)
    alt: 대한민국의 전력 발전량에서 재생 에너지가 차지하는 비중의 연도별 변화를 나타낸 선 그래프다.
    config: { kind: line }
    concepts: [renewable-energy, energy-transition]
keyTerms: [renewable-energy, energy-transition, sustainable-use, spatial-inequality]
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 지역의 재생 에너지 입지와 방안 평가
    instruction: 가상 상황이다. 해솔 지역에는 햇빛이 드는 공공 건물 지붕, 바람이 부는 능선, 흐르는 하천, 농업 부산물이 있다. 지하 열 조건과 설비 비용은 정해 두지 않았다. 자료에서 확인한 사실과 지역 설정을 구분하고, 확인할 정보가 부족한 기준은 추가 조사 항목으로 남긴다.
    prompt: 자원 조건·비용과 기반 시설·생태계·주민 참여·공급 안정성을 기준으로 방안을 비교하고, 선택의 근거와 더 필요한 자료를 제시하시오.
    options:
      - { id: solar, label: 공공 건물 지붕에 태양광 설비 설치 }
      - { id: wind, label: 바람이 부는 능선에 풍력 설비 설치 }
      - { id: hydro, label: 하천 흐름을 이용하는 수력 설비 검토 }
      - { id: geothermal, label: 지하 열 조건을 조사한 뒤 지열 설비 검토 }
      - { id: bioenergy, label: 농업 부산물을 활용하는 바이오에너지 설비 검토 }
    criteria:
      - { id: resource-fit, label: 햇빛·바람·물·지하 열·유기물 조건이 맞는가 }
      - { id: cost-infrastructure, label: 설비·송전·저장·운영 비용과 기반 시설을 감당할 수 있는가 }
      - { id: environment, label: 생태계·토지·물 이용에 미치는 영향을 살폈는가 }
      - { id: residents, label: 주민의 의견과 결정 참여를 반영하는가 }
      - { id: stability, label: 자원과 계절 변화 속에서 공급을 이어 갈 방안이 있는가 }
sourceIds: [eia-renewable-types, eia-solar-resources, eia-wind-resources, doe-wind-siting, eia-hydropower-environment, eia-geothermal-resources, eia-energy-environment]
illustration:
  src: /images/04-01/renewable-energy-sources.webp
  alt: 태양광 패널, 풍력 터빈, 물 흐름을 이용한 수력 설비, 지열 관로를 한 풍경에서 비교한다.
---
renewable energy(재생 에너지)는 자연 과정에서 다시 보충되는 에너지를 이용한다. 대표 자원은 햇빛·바람·물·지하 열·식물성 자원이다. 태양광은 일사량과 그늘의 영향을 받는다. 풍력은 바람의 세기와 계절 변화를 살핀다. 수력은 물의 흐름과 지형, 지열은 지하의 열과 물을 본다. 바이오에너지는 유기물 자원의 공급을 따진다. 자원 조건과 설비가 생태계·주민 생활에 미칠 영향도 살핀다.

재생 에너지 발전 비중 지도는 전력 발전량 가운데 재생 에너지 발전량이 차지하는 비율을 보여 준다. 2024년 중국은 33.2%, 미국은 24.1%, 대한민국은 10.5%다. 총에너지 공급 구성 그래프와 집계 범위가 다르므로 두 지표를 나누어 읽는다.

2024년 태양광 설비 용량 상위국은 중국·미국·인도다. 설비 용량은 각각 887.1GW, 177.6GW, 98.5GW다. 설비 용량은 설치된 발전 설비의 규모다. 실제 발전량과 국가 전력 비중은 발전 통계에서 확인한다.

풍력 설비 용량 상위는 중국 521.3GW, 미국 152.7GW, 독일 72.7GW 순이다. 태양광과 풍력 상위국의 설치 규모를 비교해 본다. 설비 용량과 실제 발전량은 다른 지표다. 자원 조건과 지역의 영향을 살피려면 기상·계통·지역 자료를 더 읽는다.

대한민국의 재생 에너지 발전 비중은 2000년 1.4%, 2010년 1.1%, 2024년 10.5%로 나타난다. 에너지 전환은 발전 설비와 공급 시설, 이용 방식을 함께 바꾸는 과정이다. sustainable use(지속가능한 이용)를 위해 지역의 자연 조건과 주민 생활을 살핀다. 사업에 따라 토지·물·생태계에 미치는 영향도 다르다. 주민 참여 절차를 확인해 여러 대안을 평가한다.
