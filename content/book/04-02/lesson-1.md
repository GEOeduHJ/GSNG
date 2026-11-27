---
title: 세계의 주요 환경 문제에는 무엇이 있을까?
goal: 환경 문제의 유형과 공간 규모를 구분하고 실제 자료가 보여 주는 범위를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/04-02/global-temperature-anomaly-1850-2025.json
    source: u0402-global-temperature
    caption: 전 지구 연평균 육지·해양 기온 편차, 1850–2025년(1991–2020년 평균 기준)
    alt: 1991–2020년 평균을 기준으로 전 지구 육지·해양의 연평균 기온 편차를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2025 }
    concepts: [environmental-problem, scale]
  - id: s3
    type: chart
    data: /data/04-02/forest-area-selected-countries-1990-2024.json
    source: u0402-forest-area-series
    caption: 주요 6개국 산림 면적 비율 변화, 1990–2024년
    alt: 브라질·인도네시아·콩고민주공화국·중국·인도·대한민국에서 산림이 국토에서 차지하는 비율의 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [environmental-problem, human-environment-interaction, scale]
  - id: s4
    type: map
    data: /data/04-02/pm25-annual-exposure-map-2023.json
    source: u0402-pm25-exposure
    caption: 국가별 연평균 PM2.5 노출 추정치, 2023년
    alt: 2023년 국가별 연평균 PM2.5 노출 추정치를 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [environmental-problem, human-environment-interaction, scale]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [environmental-problem, human-environment-interaction, scale]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 환경 문제의 공간 규모와 원인 살펴보기
    instruction: 각 사례의 공간 범위와 가능한 원인 범주를 함께 분류한다. 자료가 원인을 직접 측정하는지 살펴보고, 더 필요한 근거도 적는다.
    prompt: 기온·산림·PM2.5 자료를 알맞은 범주에 놓고, 자료에서 확인한 사실과 원인에 대한 설명을 구분하시오.
    items:
      - { id: temperature, text: 온실가스 배출은 전 지구 기온 상승과 연결된다. 기온 편차 그래프는 전 지구 육지·해양의 장기 변화를 보여 준다. }
      - { id: forest, text: 산림 비율 시계열은 여섯 나라의 장기 변화를 비교한다. 토지 이용과 산림 관리의 변화는 별도 자료로 확인한다. }
      - { id: pm25, text: PM2.5 국가 지도는 연평균 노출 추정치를 비교한다. 도시별 배출원과 개인별 노출은 지역 자료로 살펴본다. }
    categories:
      - { id: global-climate, label: 지구 규모·온실가스 배출 }
      - { id: national-forest, label: 국가별 비교·토지 이용과 산림 관리 }
      - { id: national-air, label: 국가 평균 비교·대기 오염 배출원 }
sourceIds: [noaa-global-temperature, wdi-forest-area, ipcc-ar6-syr-2023, wdi-pm25-exposure, who-pm25-health-2024]
---
환경 문제는 생태계와 사람들의 삶이 영향을 받는 원인과 범위에 따라 다르게 나타난다. 온실가스 배출과 연결된 기후 변화는 지구 규모에서 살펴볼 수 있다. 대기 오염은 국가와 도시의 배출원, 바람과 지형에 따라 노출이 달라질 수 있다.

기온 편차는 1991–2020년 평균을 기준으로 한 전 지구 육지·해양의 연평균 변화다. 그래프에서 2024년은 +0.65°C, 2025년은 +0.51°C로 나타난다. 두 값은 서로 다른 연도의 편차를 보여 주므로 기준 기간과 함께 읽는다. 다른 기준 기간의 기후 목표와 비교할 때에도 해당 자료의 기준을 확인한다.

산림 면적 비율은 국토에서 산림이 차지하는 몫이다. 브라질은 1990년 74.0%에서 2024년 58.5%로 나타나고, 중국의 2024년 값은 24.0%다. 여섯 나라의 시계열을 비교하면 국가별 변화가 다르게 나타난다. 이 비율은 산림의 실제 면적이나 생태적 질을 직접 나타내지 않는다.

PM2.5(초미세먼지)는 지름이 2.5µm보다 작은 입자상 물질이다. 세계보건기구는 PM2.5를 건강에 큰 위험을 줄 수 있는 대기 오염 물질로 설명한다. 2023년 연평균 노출 추정치는 인도 54.1µg/m³, 대한민국 21.9µg/m³, 미국 7.0µg/m³다. 이 자료는 국가 평균 추정치이므로 도시별 관측값이나 개인의 노출과 구분해 읽는다.

세 자료는 각각 전 지구 시계열, 국가별 산림 비율, 국가 평균 대기 오염 노출을 보여 준다. 원인과 영향이 나타나는 공간 범위는 자료의 범위와 같지 않을 수 있다. 자료에서 확인한 변화와 가능한 원인을 나누어 기록하고, 지역별 배출원과 생활 환경을 살필 자료를 덧붙여 보자.
