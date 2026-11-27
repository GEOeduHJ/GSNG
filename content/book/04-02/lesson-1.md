---
title: 세계의 주요 환경 문제에는 무엇이 있을까?
goal: 세계 환경 문제의 원인과 영향을 공간 규모에 따라 구분하고 기후 변화, 토지 황폐화, 오염의 사례를 설명할 수 있다.
opener: 내가 사는 곳의 기온과 공기, 숲과 바다는 다른 지역의 생산과 소비에 어떤 영향을 받을까? 환경 문제의 원인과 피해는 왜 같은 곳에 머무르지 않을까?
textbookRef: { pages: [186, 192] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/04-02/environment-problem-scales.svg
    label: 환경 문제의 공간 규모 개념도
    caption: 원인·이동 경로·영향의 공간 규모
    source: ''
    alt: 에너지 사용과 토지 이용, 폐기 활동이 기후 변화와 토지 황폐화, 국경을 넘는 오염으로 이어지는 관계를 나타낸 개념도다.
    config: {}
    concepts: [environmental-problem, human-environment-interaction, scale]
  - id: d2
    type: chart
    data: /data/04-02/global-temperature-anomaly-1850-2025.json
    label: 전 지구 기온 편차
    caption: 전 지구 연평균 육지·해양 기온 편차, 1850–2025년(1991–2020년 평균 기준)
    source: u0402-global-temperature
    alt: 1991–2020년 평균을 기준으로 전 지구 육지·해양의 연평균 기온 편차를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2025, unit: '°C' }
    concepts: [environmental-problem, scale]
  - id: d3
    type: chart
    data: /data/04-02/forest-area-selected-countries-1990-2024.json
    label: 주요국 산림 면적 비율 변화
    caption: 주요 6개국 산림 면적 비율 변화, 1990–2024년
    source: u0402-forest-area-series
    alt: 브라질·인도네시아·콩고민주공화국·중국·인도·대한민국에서 산림이 국토에서 차지하는 비율의 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: '%' }
    concepts: [environmental-problem, human-environment-interaction, scale]
  - id: d4
    type: map
    data: /data/04-02/pm25-annual-exposure-map-2023.json
    label: 국가별 초미세먼지 노출
    caption: 국가별 연평균 PM2.5 노출 추정치, 2023년
    source: u0402-pm25-exposure
    alt: 2023년 국가별 연평균 PM2.5 노출 추정치를 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 'µg/m³' }
    concepts: [environmental-problem, human-environment-interaction, scale]
summary:
  - 환경 문제는 지역에서 지구 전체까지 여러 공간 규모에 걸쳐 나타나며, 원인 지역과 영향 지역이 다를 수 있다.
  - 기후 변화와 물 부족, 사막화와 열대림 파괴는 기후 조건과 자원 이용이 맞물려 생태계와 생활에 영향을 준다.
  - 대기 오염 물질과 해양 쓰레기는 대기와 물의 흐름을 따라 이동해 여러 지역에 영향을 준다.
routines:
  opener: { id: see-think-wonder, prompt: "환경 문제의 공간 규모 개념도에서 원인 지역과 영향 지역의 연결을 살피고, 더 확인할 점을 적어 보자." }
  inquiry: { id: projecting-across-distance, prompt: "초미세먼지와 해양 쓰레기 사례에서 발생 지역·영향 지역을 살피고, 먼 지역 사이의 흐름을 연결해 보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 환경 문제를 공간 규모와 원인으로 분류하기
    instruction: 기후·산림·초미세먼지 자료에서 확인한 사실과 가능한 원인 설명을 구분한다.
    prompt: 네 자료의 공간 범위를 확인하고 환경 문제를 지역·국경 간·지구 규모로 분류한 뒤, 원인과 영향의 연결을 근거와 함께 설명하시오.
    items:
      - { id: climate, text: 전 지구 기온 편차의 장기 변화는 기후 문제의 지구 규모를 보여 준다. }
      - { id: forest, text: 국가별 산림 비율 변화는 토지 이용과 산림 관리의 결과를 함께 살펴볼 단서다. }
      - { id: air, text: 초미세먼지 노출은 국가별로 다르게 나타나며 건강과 생활 환경에 영향을 준다. }
    categories:
      - { id: global, label: 지구 규모의 기후 변화 }
      - { id: land, label: 지역의 토지 황폐화와 산림 변화 }
      - { id: transport, label: 국경을 넘는 대기·해양 오염 }
keyTerms: [environmental-problem, human-environment-interaction, scale]
sourceIds: [noaa-global-temperature, wdi-forest-area, wdi-pm25-exposure, who-pm25-health-2024, ipcc-ar6-syr-2023, ipcc-ar6-wgii-2022, unccd-desertification-faq, unece-transboundary-air-pollution, unep-marine-litter-report, fao-forest-deforestation-drivers]
---
## 환경 문제의 공간 규모

환경 문제는 인간 활동과 자연 과정이 맞물려 생태계와 사람들의 건강·생계에 영향을 주는 현상이다. 문제가 생긴 곳과 피해를 입는 곳은 같을 수도, 다를 수도 있다. 환경 문제는 마을과 하천 유역에서 시작해 국경을 넘고, 때로는 지구 전체로 이어진다. 온실가스·오염 물질·폐기물은 각기 다른 경로로 다른 지역에 영향을 준다. 개념도에서 원인·이동 경로·영향의 공간 규모를 연결해 보자. [[d1]]

## 기후 변화와 토지의 변화

화석 연료 연소와 산림 전환은 온실가스 배출을 늘린다. 온실가스는 지구 복사 에너지의 균형을 바꾸어 평균 기온을 높인다. 지구 온난화는 지역에 따라 폭염·가뭄·집중 호우·산불 위험을 키운다. 빙하 감소와 해수면 상승은 낮은 해안과 섬 지역의 거주·농업·식수 기반에 부담을 준다. 기후 변화는 물 공급의 계절성과 농업용수에도 영향을 준다. 2025년 전 지구 연평균 기온 편차는 1991–2020년 평균보다 +0.51°C였다. 기온 편차 그래프에서 장기 변화를 비교해 보자. [[d2]]

사막화는 건조 지역에서 토양의 생산력과 식생이 약해지는 토지 황폐화다. 기후 변동과 토지 이용이 함께 작용한다. 사헬 지대와 중앙아시아 일부 건조 지역에서는 장기 가뭄이 나타난다. 과도한 방목과 농경지 확대가 더해지면 토양 침식과 먼지 이동이 커진다. 열대림 파괴와 산림 감소는 농경지·목초지 확대, 벌목, 광산과 도로 개발로 이어진다. 아마존·콩고 분지·보르네오의 서식지와 생물 다양성, 탄소 저장에도 영향을 준다. 그래프에서 브라질의 산림 비율이 1990년 74.0%에서 2024년 58.5%로 달라진 흐름과 중국의 2024년 24.0%를 비교해 보자. [[d3]]

## 이동하는 오염과 해양 쓰레기

대기 오염 물질 이동은 산업과 교통에서 나온 황·질소 화합물이 바람을 타고 먼 지역까지 퍼지는 과정이다. 산성비는 이 물질이 빗물과 함께 내리는 현상이다. 유럽의 산성비와 북유럽 호수의 산성화는 배출 지역과 피해 지역이 다를 수 있음을 보여 준다. 플라스틱 폐기물은 강과 해류를 따라 바다로 간다. 해양 생물과 생태계에도 영향을 준다. 2023년 연평균 초미세먼지 노출 추정치는 인도 54.1µg/m³, 대한민국 21.9µg/m³, 미국 7.0µg/m³다. 지도에서 국가별 노출 양상을 비교하며 대기 오염의 건강 부담이 장소마다 다른 모습을 살펴보자. [[d4]]
