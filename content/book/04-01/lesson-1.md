---
title: 주요 에너지 자원의 소비 구조는 어떻게 변화했을까?
goal: 에너지 자원의 특성과 1차 에너지 구성을 구분하고, 시기와 지역에 따른 소비 구조의 차이를 설명할 수 있다.
opener: 스마트폰 충전부터 난방과 이동까지, 우리가 쓰는 에너지는 어떤 원천에서 올까? 에너지원 구성은 시간과 지역에 따라 왜 달라질까?
textbookRef: { pages: [170, 171] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/04-01/energy-resource-types.svg
    label: 에너지 자원의 종류
    caption: 자연에서 얻는 에너지 자원의 분류와 이용 단계
    source: ''
    alt: 자연에서 얻는 1차 에너지를 화석 연료와 재생 에너지로 나누고, 변환과 공급을 거쳐 열·전기·연료로 이용하는 개념도다.
    config: {}
    concepts: [energy-system, renewable-energy]
  - id: d2
    type: chart
    data: /data/04-01/energy-mix-world-series.json
    label: 세계 에너지원 구성 변화
    caption: 세계 총에너지 공급의 에너지원별 비중, 1980–2025년
    source: u0401-energy-mix-world-series
    alt: 1980년부터 2025년까지 세계 총에너지 공급에서 석탄·석유·천연가스·원자력·수력·기타 재생 에너지가 차지하는 비중을 나타낸 선 그래프다.
    config: { kind: line, unit: '%' }
    concepts: [energy-system, scale]
  - id: d3
    type: chart
    data: /data/04-01/energy-mix-korea-series.json
    label: 대한민국 에너지원 구성 변화
    caption: 대한민국 총에너지 공급의 에너지원별 비중, 1980–2025년
    source: u0401-energy-mix-korea-series
    alt: 1980년부터 2025년까지 대한민국 총에너지 공급에서 에너지원별 비중이 달라진 모습을 나타낸 선 그래프다.
    config: { kind: line, unit: '%' }
    concepts: [energy-system, spatial-inequality]
  - id: d4
    type: map
    data: /data/04-01/energy-use-per-capita-map.json
    label: 국가별 1인당 에너지 공급
    caption: 국가별 1인당 총에너지 공급량, 2024년
    source: u0401-energy-use-per-capita-map
    alt: 2024년 국가별 1인당 총에너지 공급량을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 'kWh/인' }
    concepts: [energy-system, scale, spatial-inequality]
summary:
  - 화석 연료는 오랜 지질 과정으로 만들어져 빠르게 보충되지 않으며, 재생 에너지는 자연 과정에서 다시 얻을 수 있다.
  - 에너지원 구성은 산업·교통·기술과 사회의 필요가 달라지면서 함께 변한다.
  - 1인당 에너지 공급량은 한 나라의 총공급량을 인구수로 나눈 평균이며, 국가와 시기에 따라 다르게 나타난다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 세계와 대한민국의 에너지원 구성 비교
    instruction: 세계와 대한민국의 시계열에서 같은 에너지원과 기준 연도를 찾아 비중 변화를 비교한 뒤, 1인당 공급 지도와 구분해 읽는다.
    prompt: 두 시계열의 공통점과 차이를 설명하고, 1인당 총에너지 공급 지도가 더하는 정보를 정리하시오.
    fields:
      - { id: world, label: 세계 에너지원 구성의 변화 }
      - { id: korea, label: 대한민국 에너지원 구성의 특징 }
      - { id: compare, label: 두 시계열의 공통점과 차이 }
      - { id: perCapita, label: 1인당 공급량 지도로 확인한 지역 차이 }
keyTerms: [energy-system, scale, spatial-inequality]
sourceIds: [eia-energy-sources, eia-renewable-types]
---
## 에너지 자원의 성격과 종류

에너지 자원은 생활과 경제활동에 필요한 열·전기·동력을 얻는 데 쓰이는 자원이다. 자연에서 얻은 원료 형태의 에너지는 primary energy(1차 에너지)라고 한다. 자원의 유한성은 매장량이 한정되어 이용할수록 줄어드는 성질이고, 편재성은 특정 지역에 치우쳐 분포하는 성질이다. 가변성은 기술·비용·사회적 필요가 달라지며 자원의 이용 가치가 바뀌는 성질이다. 석탄·석유·천연가스는 오랜 지질 과정으로 형성되고, 햇빛·바람·물·지열·바이오매스는 자연 과정에서 반복해 보충된다. 에너지 자원의 분류와 이용 단계를 개념도로 살펴보자. [[d1]]

## 주요 에너지 자원의 소비 구조 변화

에너지원 구성은 총에너지 공급에서 각 에너지원이 차지하는 비중이다. 산업과 교통 기술이 바뀌면서 석탄·석유·천연가스의 사용 비중도 달라졌다. 세계 총에너지 공급에서 석유는 1980년 47.5%, 석탄은 27.9%, 천연가스는 19.0%였다. 2025년에는 각각 33.5%, 27.7%, 25.1%로 나타난다. 두 시기의 선을 비교해 에너지원별 변화 방향을 찾아보자. [[d2]]

대한민국의 에너지원 구성도 세계와 같지 않다. 2025년 대한민국 총에너지 공급에서 석유는 41.8%, 석탄은 22.0%, 천연가스는 17.5%, 원자력은 15.5%를 차지했다. 석유 비중은 세계의 33.5%보다 높고 천연가스 비중은 세계의 25.1%보다 낮다. 세계와 대한민국의 그래프에서 같은 에너지원의 비중을 비교해 보자. [[d2]] [[d3]]

에너지 공급량을 인구수로 나누면 국가별 1인당 공급량을 비교할 수 있다. 2024년 미국은 74,018kWh/인, 대한민국은 70,773kWh/인, 인도는 7,432kWh/인이었다. 이런 지역별 소비 차이를 설명할 때에는 산업 구조와 교통·건물의 수요, 에너지 접근성을 함께 살펴야 한다. 국가 평균은 한 나라 안의 가구별 이용 차이를 나타내지 않는다. 지도에서 세 나라의 분포를 찾아 비교해 보자. [[d4]]
