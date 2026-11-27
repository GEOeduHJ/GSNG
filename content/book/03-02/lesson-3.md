---
title: '식량 문제는 어떻게 해결할 수 있을까?'
goal: 식량 안보를 높이는 국제·국가·지역의 방안을 살펴보고, 안정성·비용·환경·농가와 소비자 관점에서 대안을 평가할 수 있다.
opener: 국내 생산을 늘릴까, 수입 경로를 넓힐까, 공급망의 손실을 줄일까? 안정적인 식량 공급을 위해 어떤 방안을 함께 고려해야 할지 생각해 보자.
textbookRef: { pages: [147, 150] }
steps:
  - id: d1
    type: chart
    data: /data/03-02/korea-self-sufficiency-series.json
    label: 대한민국 식량·곡물 자급률
    caption: 농림축산식품부, 대한민국 곡물·식량 자급률, 2011–2022 양곡연도
    source: u0302-korea-self-sufficiency-series
    alt: 사료용 포함 곡물자급률과 사료용 제외 식량자급률의 2011년부터 2022년까지 변화를 나타낸 선그래프다.
    config: { kind: line, maxYear: 2022, unit: '%' }
    concepts: [food-system, food-security]
  - id: d2
    type: map
    data: /data/03-02/cereal-import-dependency-map.json
    label: 국가별 곡물 수입 의존도
    caption: FAOSTAT, 곡물 수입 의존도, 2022–2024년 3년 평균
    source: u0302-cereal-import-dependency-map
    alt: 국가별 곡물 공급에서 순수입이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-system, food-security, spatial-inequality]
  - id: d3
    type: chart
    data: /data/03-02/wheat-export-world-share-top10.json
    label: 세계 밀 수출 비중
    caption: FAOSTAT, 세계 밀 수출량 중 상위 10개국 비중, 2024년
    source: u0302-wheat-export-world-share
    alt: 2024년 세계 밀 수출량에서 상위 10개국이 차지하는 비중을 비교한 막대그래프다.
    config: { kind: bar, unit: '%' }
    concepts: [food-system, food-market-concentration, spatial-inequality]
summary:
  - 식량 안보는 안정적인 공급과 함께 모든 사람이 식량에 접근할 수 있는 조건을 살핀다.
  - 식량 주권은 농민과 농촌 주민 등이 식량·농업 체계를 결정하는 권리와 관점을 강조한다.
  - 국내 생산, 교역, 비축, 손실 감소와 식량 접근 지원을 함께 검토할 수 있다.
  - 방안은 안정성·비용·환경·참여자에게 돌아갈 이익과 부담을 기준으로 평가한다.
routines:
  opener: { id: compass-points, prompt: "대한민국 식량·곡물 자급률 자료에서 국내 생산과 공급의 관계를 살피고, 기대·우려·필요 정보와 입장을 적어 보자." }
  inquiry: { id: circles-of-action, prompt: "식량 문제를 줄이기 위해 나와 주변, 학교와 지역, 세계를 향해 할 수 있는 실천을 나누어 보자." }
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 식량 안보 방안 평가
    instruction: 자급률과 수입 의존도, 국제 교역 자료를 확인하고 각 방안의 효과와 부담을 비교한다.
    prompt: 안정성·비용·환경·농가와 소비자에게 미치는 영향을 살펴 우선할 방안과 필요한 추가 근거를 제안하시오.
    options:
      - { id: local-production, label: 지역 생산·유통과 재배·저장 기술 지원 }
      - { id: diverse-imports, label: 수입처 다변화와 비축·운송 기반 강화 }
      - { id: reduce-loss, label: 공급망 손실·식품 폐기 감소와 가구 접근 지원 }
    criteria:
      - { id: stability, label: 공급 중단과 가격 충격에 대비하는 안정성 }
      - { id: cost, label: 도입·운영 비용과 가구의 식품 부담 }
      - { id: environment, label: 토지·물·에너지와 환경에 미치는 영향 }
      - { id: participants, label: 농가·유통 관계자·소비자에게 돌아가는 이익과 부담 }
keyTerms: [food-system, food-security, food-market-concentration]
sourceIds: [fao-food-security-dimensions, undrop-food-sovereignty, fao-food-loss-waste, fao-korea-national-food-plan, maff-japan-basic-plan-2025, fao-sofi-2025, unesco-rice-terraces-cordilleras]
illustration:
  src: /images/03-02/local-food-sharing.webp
  alt: 이웃들이 공동 텃밭을 가꾸고 수확한 채소와 모종을 서로 나눈다.
---
## 식량 안보와 식량 주권

food security(식량 안보)는 모든 사람이 필요한 식량을 충분하고 안전하게 얻어 건강한 식사를 이어 가는 상태다. food sovereignty(식량 주권)는 농민과 농촌 주민 등이 식량과 농업 체계를 스스로 결정할 권리를 강조한다. 식량 안보와 식량 주권은 필요한 식량의 안정적 접근과 생산·유통을 결정하는 주체를 함께 살피게 한다.

## 국제 사회와 국가의 대응

국제 사회는 영양 개선과 식량 접근, 위기 대응, 지속가능한 생산을 공동 과제로 다룬다. 국가 정책은 국내 생산 기반과 수입 경로, 비축·운송, 가격 부담과 사회 보호를 조합할 수 있다. 정부 계획은 추진 방향을 보여 주므로 성과는 별도의 실행 자료로 확인한다.

농림축산식품부의 시계열에서 곡물자급률은 사료용을 포함하고 식량자급률은 사료용을 제외한다. 곡물자급률은 2011년 26.9%에서 2022년 22.3%로 나타난다. 같은 해 식량자급률은 49.3%다. 두 계열의 범위와 변화를 그래프에서 각각 살펴보자. [[d1]]

곡물 수입 의존도는 공급 구조의 한 측면을 보여 준다. 대한민국의 2022–2024년 평균은 78.3%다. 이 값만으로 공급 중단 위험을 판단하기보다 수입처와 비축, 운송 경로, 가격 부담을 함께 살펴보자. [[d2]]

세계 밀 수출량의 국가별 비중은 국제 교역에서 주요 공급국을 찾는 단서다. 수입처를 다변화할 때에는 공급국의 수뿐 아니라 항로와 시기별 생산, 거래 조건도 살핀다. 국가별 수출 비중은 기업별 시장 구조와 집계 단위가 다르다. 그래프에서 주요 수출국의 비중을 비교해 보자. [[d3]]

## 지역·개인의 실천과 새로운 생산 방식

식량 손실과 식품 폐기를 줄이는 노력은 생산·저장·운송·판매·소비 단계에 걸쳐 이루어진다. 지역 생산과 공공 급식의 연결, 적절한 저장 시설, 식품을 필요한 만큼 구입하는 선택은 각 지역의 조건에 맞게 검토할 수 있다.

수직 농장처럼 재배 환경을 조절하는 시설도 하나의 선택지다. 작물의 종류와 지역의 에너지·물 여건, 건설·운영 비용, 농가와 소비자에게 돌아갈 효과를 함께 따져야 한다. 여러 방안을 같은 기준으로 비교하고, 빠진 근거를 활동에 적어 보자.

필리핀 코르디예라의 이푸가오 계단식 논은 산지의 물을 나누어 이용하는 공동체 기반 벼농사 경관이다. 관개와 토지 관리, 지역의 협력이 생산을 이어 가는 사례다. 이 방식을 다른 지역에 적용할 때에는 기후·지형뿐 아니라 노동과 관리, 지역의 변화도 함께 살펴야 한다.
