---
title: '주요 에너지 자원의 소비 구조는 어떻게 변화했을까?'
goal: 세계와 대한민국의 에너지원 구성 및 1인당 에너지 공급 자료를 비교해 시기와 지역에 따른 차이를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/04-01/energy-mix-world-series.json
    source: u0401-energy-mix-world-series
    caption: 'Our World in Data(원자료: Energy Institute·U.S. EIA), 세계 에너지원별 총에너지 공급 비중, 1980–2025년'
    alt: 세계 총에너지 공급에서 석탄·석유·천연가스·원자력·수력·기타 재생에너지가 차지하는 비중의 변화를 선으로 나타낸 그래프다.
    config: { kind: line }
    concepts: [energy-system, scale]
  - id: s3
    type: chart
    data: /data/04-01/energy-mix-korea-series.json
    source: u0401-energy-mix-korea-series
    caption: 'Our World in Data(원자료: Energy Institute·U.S. EIA), 대한민국 에너지원별 총에너지 공급 비중, 1980–2025년'
    alt: 대한민국 총에너지 공급에서 에너지원별 비중이 1980년부터 2025년까지 어떻게 달라졌는지 나타낸 선 그래프다.
    config: { kind: line }
    concepts: [energy-system, spatial-inequality]
  - id: s4
    type: map
    data: /data/04-01/energy-use-per-capita-map.json
    source: u0401-energy-use-per-capita-map
    caption: 'Our World in Data(인구 분모: UN WPP 2024 중위 시나리오), 국가별 1인당 총에너지 공급량, 2024년(kWh/인)'
    alt: 2024년 국가별 1인당 총에너지 공급량을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [energy-system, scale, spatial-inequality]
keyTerms: [energy-system, scale, spatial-inequality]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 세계와 대한민국의 에너지원 구성 비교
    instruction: 세계와 대한민국의 시계열에서 같은 에너지원과 기준 연도를 찾아 비중 변화를 비교한 뒤, 1인당 공급 지도와 구분해 읽는다.
    prompt: 두 시계열에서 확인한 공통점과 차이를 정리하고, 1인당 공급량 지도는 어떤 정보를 더하는지 설명하시오. 각 지표의 단위와 범위도 함께 적으시오.
    fields:
      - { id: world, label: 세계 에너지원 구성에서 확인한 변화 }
      - { id: korea, label: 대한민국 에너지원 구성에서 확인한 변화 }
      - { id: compare, label: 두 시계열의 공통점과 차이 }
      - { id: perCapita, label: 1인당 총에너지 공급 지도가 더하는 정보와 범위 }
sourceIds: []
---
에너지원 구성은 각 에너지원이 총에너지 공급에서 차지하는 비율이다. 그래프의 범례를 확인하고 세계와 대한민국의 선을 읽는다. 구성비와 총에너지 공급량은 서로 다른 지표다.

세계 그래프에서 석유 비중은 1980년 47.5%, 2025년 33.5%다. 천연가스는 19.0%에서 25.1%로 나타난다. 석탄 비중은 1980년 27.9%, 2025년 27.7%다. 기준 연도 두 곳을 먼저 읽고 다른 선의 흐름도 비교한다.

대한민국 그래프에서 석유 비중은 1980년 63.2%, 2025년 41.8%다. 석탄은 두 해에 각각 34.0%, 22.0%로 나타난다. 2025년 천연가스는 17.5%, 원자력은 15.5%다. 세계 그래프와 같은 범주를 찾아 국가별 구성이 어떻게 다른지 살핀다.

1인당 총에너지 공급 지도에서 2024년 대한민국은 약 7만 773kWh다. 미국은 약 7만 4,018kWh, 중국은 약 3만 1,076kWh다. 1인당 값은 국가 총공급량을 인구로 나눈 평균이다. 인구 분모는 UN의 중위 시나리오 추계다. 가구별 에너지 이용은 지역·가구 자료로 살펴본다.
