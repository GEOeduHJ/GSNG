---
title: '식량 문제는 왜 발생할까?'
goal: 식량 안보의 여러 차원과 식량 문제의 원인을 파악하고, 영양 부족·수입 의존 자료를 근거로 현상과 자료의 범위를 설명할 수 있다.
opener: 식량이 세계 시장에 공급되어도 사람마다 먹을거리를 얻는 조건은 다를 수 있다. 생산·가격·유통·소득은 그 차이에 어떻게 이어질까?
textbookRef: { pages: [144, 146] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/03-02/food-security-dimensions.svg
    label: 식량 안보의 네 차원
    caption: 개념도 · 가용성·접근성·활용성·안정성
    source: ''
    alt: 식량의 가용성·접근성·활용성이 서로 연결되어 식량 안보를 이루고, 안정성이 이 조건을 시간에 걸쳐 뒷받침한다.
    config: {}
    concepts: [food-security]
  - id: d2
    type: chart
    data: /data/03-02/global-undernourishment-series.json
    label: 세계 영양 부족 비율의 변화
    caption: FAOSTAT, 세계 영양 부족 인구 비율, 각 기간 3년 평균
    source: u0302-global-undernourishment-series
    alt: 2000–2002년부터 2023–2025년까지 세계 영양 부족 비율의 3년 평균을 기간 가운데 연도에 맞춰 나타낸 선그래프다.
    config: { kind: line, maxYear: 2024, unit: '%' }
    concepts: [food-security, spatial-inequality]
  - id: d3
    type: map
    data: /data/03-02/undernourishment-map.json
    label: 국가별 영양 부족 인구 비율
    caption: '세계은행 WDI(원자료: FAO), 영양 부족 인구 비율, 2024년(2023–2025년 3년 평균)'
    source: u0302-undernourishment-map
    alt: 국가별 영양 부족 인구 비율을 색으로 나타내고 2.5% 미만 값은 별도 범례로 구분한 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-security, spatial-inequality]
  - id: d4
    type: map
    data: /data/03-02/cereal-import-dependency-map.json
    label: 국가별 곡물 수입 의존도
    caption: FAOSTAT, 곡물 수입 의존도, 2022–2024년 3년 평균
    source: u0302-cereal-import-dependency-map
    alt: 국가별 곡물 공급에서 순수입이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-system, food-security, spatial-inequality]
summary:
  - 식량 안보에는 식량의 공급과 접근, 영양 활용, 시간에 걸친 안정성이 함께 필요하다.
  - 생산·유통 손실, 식품 폐기, 시장 구조는 지역의 식량 접근 조건과 연결된다.
  - 기후·경제·정치적 충격은 생산과 교역, 가구의 구매력에 서로 다른 경로로 작용한다.
  - 국가·세계 평균은 전체 흐름을 보여 주며, 지역과 가구의 차이는 추가 자료로 살펴야 한다.
routines:
  opener: { id: think-puzzle-explore, prompt: "식량 안보의 네 차원 자료에서 먹거리를 얻기 어려워지는 조건을 살피고, 더 알아볼 질문과 자료를 정해 보자." }
  inquiry: { id: claim-support-question, prompt: "영양 부족 비율과 곡물 수입 의존도 자료로 식량 접근 문제를 주장하고, 근거와 더 확인할 질문을 정리해 보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 식량 문제의 사실과 원인 구분
    instruction: 지도와 시계열, 공식 보고서에서 확인한 사실과 원인 해석의 범위를 살핀다.
    prompt: 각 문장을 자료의 사실, 개념을 적용한 해석, 추가 근거가 필요한 판단, 대응 방안으로 분류하고 두 가지 이상 요인이 연결되는 경로를 설명하시오.
    items:
      - { id: average, text: 영양 부족 비율의 세계 시계열은 기간별 3년 평균을 나타낸다. }
      - { id: prices, text: 식품 가격 상승은 소득과 사회 보호 여건에 따라 가구의 구매력에 다르게 작용할 수 있다. }
      - { id: imports, text: 곡물 수입 의존도만으로 한 나라 주민의 영양 부족 원인을 모두 설명할 수 있다. }
      - { id: shocks, text: 기후 극한·분쟁·경제 충격은 생산·유통·구매력에 서로 다른 경로로 영향을 줄 수 있다. }
      - { id: response, text: 저장·운송 여건을 개선하면 공급망의 손실을 줄이는 방안을 검토할 수 있다. }
    categories:
      - { id: evidence, label: 자료에서 직접 확인한 사실 }
      - { id: interpretation, label: 개념을 적용한 해석 }
      - { id: more-data, label: 추가 자료가 필요한 판단 }
      - { id: response, label: 가능한 대응 }
keyTerms: [food-security, food-market-concentration, spatial-inequality]
sourceIds: [fao-food-security-dimensions, fao-food-loss-waste, fao-sofi-2025, fao-global-report-food-crises-2025, unctad-trade-development-report-2024]
---
## 식량 안보와 식량 접근

food security(식량 안보)는 모든 사람이 필요한 식량을 충분하고 안전하게 구해 건강한 식사를 이어 가는 상태다. 식량의 가용성과 가구의 접근성, 먹은 식품의 영양 활용이 함께 필요하다. 이런 조건이 시간에 걸쳐 유지되는 안정성도 중요하다. 각 차원이 식량 안보와 어떻게 이어지는지 개념도에서 살펴보자. [[d1]]

식량 손실은 수확 뒤 저장·운송·가공과 같은 공급 과정에서 양이나 품질이 줄어드는 현상이다. 소매점과 외식·가정에서 먹을 수 있는 식품이 버려지는 문제는 식품 폐기로 구분한다. 단계에 따라 원인과 줄이는 방법이 달라진다.

food market concentration(식량 시장 집중)은 소수 기업이 곡물 생산이나 유통·판매에서 큰 영향력을 갖는 구조다. UNCTAD의 보고서는 세계 곡물 교역에서 기업 집중도가 높다는 분석을 인용한다. 기업의 시장 구조는 국가별 수출 비중과 다른 단위다. 지역 주민의 식량 접근을 살필 때는 가격과 소득, 시장 접근 자료를 함께 확인한다.

## 생산과 유통을 흔드는 충격

기후 극한은 작물 생산과 저장·운송에 영향을 줄 수 있다. 분쟁은 농사뿐 아니라 투입재와 도로, 시장 접근을 바꾼다. 경기 충격과 물가 상승은 가구의 구매력을 낮출 수 있다. 식량 위기 보고서는 조사한 지역에서 여러 요인이 겹쳐 나타나는 양상을 다룬다. 지역별 생산·가격·소득 조건을 함께 살펴 원인을 설명하자.

## 식량 문제의 지역 차이

세계 영양 부족 비율은 2000–2002년 평균 13.0%에서 2023–2025년 평균 8.1%로 낮아졌다. 각 점은 3년 평균의 가운데 연도에 놓인 값이다. 장기 흐름을 보고 변화가 일정했는지 확인해 보자. [[d2]]

2024년 국가별 영양 부족 비율은 인도 9.8%, 방글라데시 8.2%, 케냐 34.9%다. 지도에서 2.5% 미만으로 표시된 값은 실제 2.5%보다 낮은 값이다. 국가 평균의 공간 차이를 살펴보고, 국내 지역과 가구의 상황을 설명할 추가 자료도 찾아보자. [[d3]]

곡물 수입 의존도는 국가의 곡물 공급 구조를 나타내며 영양 부족 비율과 측정 대상이 다르다. 각 지도의 국가별 분포를 비교하고, 관계를 설명할 가격·소득·유통 자료를 더해 보자. [[d4]]
