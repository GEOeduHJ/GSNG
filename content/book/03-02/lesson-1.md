---
title: '식량 자원의 생산과 소비는 어떻게 이루어질까?'
goal: 쌀·밀·옥수수의 생산과 교역을 자료로 비교하고, 생산량과 식량 이용이 서로 다른 지표임을 설명할 수 있다.
opener: 우리 식탁의 곡물은 어디에서 자라고 어떤 과정을 거쳐 도착할까? 생산지와 소비지가 다를 때 식량이 오가는 길에는 어떤 조건이 필요할까?
textbookRef: { pages: [140, 143] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/03-02/food-system-schematic.svg
    label: 식량 체계 개념도
    caption: 개념도 · 생산·가공·유통·소비의 연결
    source: ''
    alt: 생산·저장과 가공·운송과 판매·조리와 소비가 연결되고, 자연환경·시장·정책·기술과 수요가 여러 단계에 영향을 준다.
    config: {}
    concepts: [food-system]
  - id: d2
    type: chart
    data: /data/03-02/rice-production-top10.json
    label: 쌀 생산 상위국
    caption: FAOSTAT, 쌀 생산 상위 10개국, 2024년
    source: u0302-rice-production-top10
    alt: 2024년 쌀 생산량이 많은 10개국을 비교한 막대그래프다.
    config: { kind: bar, unit: 't' }
    concepts: [food-system, spatial-inequality]
  - id: d3
    type: chart
    data: /data/03-02/wheat-production-top10.json
    label: 밀 생산 상위국
    caption: FAOSTAT, 밀 생산 상위 10개국, 2024년
    source: u0302-wheat-production-top10
    alt: 2024년 밀 생산량이 많은 10개국을 비교한 막대그래프다.
    config: { kind: bar, unit: 't' }
    concepts: [food-system, spatial-inequality]
  - id: d4
    type: chart
    data: /data/03-02/maize-production-top10.json
    label: 옥수수 생산 상위국
    caption: FAOSTAT, 옥수수 생산 상위 10개국, 2024년
    source: u0302-maize-production-top10
    alt: 2024년 옥수수 생산량이 많은 10개국을 비교한 막대그래프다.
    config: { kind: bar, unit: 't' }
    concepts: [food-system, spatial-inequality]
  - id: d5
    type: chart
    data: /data/03-02/wheat-exports-top10.json
    label: 밀 수출량 상위국
    caption: FAOSTAT, 밀 수출량 상위 10개국, 2024년
    source: u0302-wheat-exports-top10
    alt: 2024년 밀 수출량이 많은 10개국을 비교한 막대그래프다.
    config: { kind: bar, unit: 't' }
    concepts: [food-system, spatial-inequality]
  - id: d6
    type: chart
    data: /data/03-02/wheat-export-world-share-top10.json
    label: 세계 밀 수출 비중
    caption: FAOSTAT, 세계 밀 수출량 중 상위 10개국 비중, 2024년
    source: u0302-wheat-export-world-share
    alt: 2024년 세계 밀 수출량에서 상위 10개국이 차지하는 비중을 비교한 막대그래프다.
    config: { kind: bar, unit: '%' }
    concepts: [food-system, food-market-concentration, spatial-inequality]
  - id: d7
    type: map
    data: /data/03-02/cereal-import-dependency-map.json
    label: 국가별 곡물 수입 의존도
    caption: FAOSTAT, 곡물 수입 의존도, 2022–2024년 3년 평균
    source: u0302-cereal-import-dependency-map
    alt: 국가별 곡물 공급에서 순수입이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-system, food-security, spatial-inequality]
summary:
  - 식량 체계는 생산에서 소비까지 여러 활동과 주체를 연결한다.
  - 작물별 생산지는 생육 조건과 농업 기술, 소비 수요가 함께 작용해 다르게 나타난다.
  - 생산량·수출량·수입 의존도는 서로 다른 공급 관계를 보여 주는 지표다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 작물 생산과 밀 교역 비교
    instruction: 쌀·밀·옥수수 생산량, 밀 수출량과 세계 비중, 곡물 수입 의존도의 단위와 범위를 확인한다.
    prompt: 생산 상위국과 수출 상위국의 공통점·차이를 정리하고, 생산·교역 자료에 소비와 식량 접근 자료를 더해야 하는 까닭을 설명하시오.
    fields:
      - { id: production, label: 세 작물 생산 상위국에서 확인한 분포 }
      - { id: trade, label: 밀 수출량과 세계 비중에서 확인한 관계 }
      - { id: imports, label: 곡물 수입 의존도에서 찾은 차이 }
      - { id: limits, label: 주민의 식량 접근을 설명하는 데 더 필요한 자료 }
keyTerms: [food-system, food-security, spatial-inequality]
sourceIds: [fao-food-systems-definition, fao-crop-growth]
---
## 식량 자원과 식량 체계

식량 자원은 곡물과 축산물, 수산물처럼 사람이 먹는 데 쓰이는 자원과 이를 가공한 식품을 아우른다. 생산·가공·운송·판매·소비가 여러 주체를 통해 이어지는 구조를 food system(식량 체계)이라고 한다. 자연환경과 시장, 정책, 기술은 여러 단계에 작용한다. 소비 수요와 선택은 생산 계획에도 영향을 준다. 단계가 어떻게 연결되는지 개념도에서 살펴보자. [[d1]]

작물별 생산지는 기온·강수·토양·물 이용 같은 생육 조건과 농업 기술, 소비 수요가 함께 작용해 형성된다. 2024년 쌀 생산 상위국은 인도, 중국, 방글라데시 순이다. 생산량 그래프에서 국가별 차이를 확인하고, 재배 환경과 연결해 까닭을 설명해 보자. [[d2]]

## 쌀·밀·옥수수의 생산과 이용

밀은 쌀과 생육 조건과 주요 생산 지역이 다르다. 2024년 생산 상위국은 중국, 인도, 러시아다. 그래프에서 쌀 생산 상위국과 겹치는 나라가 있는지 비교해 보자. [[d3]]

옥수수는 사람의 식품과 가축 사료, 여러 가공 산업에 쓰인다. 용도별 수요는 생산과 교역을 함께 바꾼다. 2024년 생산 상위국은 미국, 중국, 브라질이다. 밀·쌀의 상위국과 비교해 작물별 차이를 살펴보자. [[d4]]

## 생산지와 소비지를 잇는 교역

생산량 순위와 수출량 순위는 서로 다른 기준으로 만들어진다. 국내 소비와 저장·운송 여건, 시장과 정책에 따라 수출할 수 있는 양이 달라진다. 2024년 밀 수출량 상위국을 찾아 생산 상위국과 비교해 보자. [[d5]]

세계 수출량 중 국가별 비중은 해당 국가의 수출 규모를 국제 교역 안에서 살펴보는 지표다. 2024년 밀 수출 비중을 수출량 그래프와 나란히 보고, 나라별 순위와 비중의 관계를 설명하자. [[d6]]

곡물 수입 의존도는 국내 곡물 공급에서 순수입이 차지하는 비중을 보여 준다. 2022–2024년 평균에서 대한민국은 78.3%, 중국은 9.1%, 미국은 4.6%다. 생산·수출 자료와 함께 살펴 공급 구조를 설명하고, 가구의 식량 접근은 소득·가격 자료를 더해 알아보자. [[d7]]
