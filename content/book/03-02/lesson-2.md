---
title: '식량 문제는 왜 발생할까?'
goal: 영양 부족과 수입 의존 자료의 차이를 읽고, 식량 문제에 영향을 주는 자연·경제·정치·시장 요인을 자료의 범위에 맞게 분류할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-02/undernourishment-map.json
    source: u0302-undernourishment-map
    caption: '세계은행 WDI(원자료: FAO), 영양 부족 인구 비율, 2024년(FAO 2023–2025년 평균)'
    alt: 국가별 영양 부족 인구 비율을 색으로 나타내고 2.5% 미만 값은 별도 범례로 구분한 지도다.
    config: { kind: choropleth }
    concepts: [food-security, spatial-inequality]
  - id: s3
    type: map
    data: /data/03-02/cereal-import-dependency-map.json
    source: u0302-cereal-import-dependency-map
    caption: FAOSTAT, 곡물 수입 의존도, 2022–2024년 3년 평균
    alt: 국가별 곡물 수입 의존도를 색으로 나타낸 지도다. 값이 없는 국가는 별도로 표시된다.
    config: { kind: choropleth }
    concepts: [food-system, food-security, spatial-inequality]
  - id: s4
    type: chart
    data: /data/03-02/global-undernourishment-series.json
    source: u0302-global-undernourishment-series
    caption: FAOSTAT, 세계 영양 부족 인구 비율, 각 기간 3년 평균(2000–2002~2023–2025)
    alt: 세계 영양 부족 인구 비율의 3년 평균을 기간 가운데 연도에 맞추어 나타낸 선 그래프다.
    config: { kind: line }
    concepts: [food-security, spatial-inequality]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
  - { id: s6, type: text, caption: '', source: '', alt: '' }
keyTerms: [food-security, food-market-concentration, spatial-inequality]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 식량 문제에 작용하는 요인 분류
    instruction: 자료와 공식 보고서에서 확인한 내용을 읽고 자연·경제·정치·시장 요인으로 분류한다.
    prompt: 각 요인을 해당 범주에 놓고, 하나의 자료만으로 특정 지역의 영양 부족 원인을 단정하기 어려운 이유를 적으시오.
    items:
      - { id: climate, text: 기후 극한과 가뭄·홍수는 농업 생산에 충격을 줄 수 있다. }
      - { id: prices, text: 식품 가격 상승과 가구 소득의 차이는 식량을 구입할 수 있는 여건에 영향을 줄 수 있다. }
      - { id: conflict, text: 분쟁은 농사뿐 아니라 저장 시설과 운송, 시장 접근을 방해할 수 있다. }
      - { id: concentration, text: UNCTAD 보고서는 세계 곡물 교역에서 상위 4개 기업의 비중을 70–90%로 추산한 자료를 인용한다. }
    categories:
      - { id: natural, label: 자연 }
      - { id: economic, label: 경제 }
      - { id: political, label: 정치 }
      - { id: market, label: 시장 }
sourceIds: [fao-sofi-2025, fao-global-report-food-crises-2025, unctad-trade-development-report-2024]
---
생산량이 넉넉해도 식량이 사람들에게 도달하고 가구가 살 수 있는지는 별도로 살펴야 한다. 영양 부족 인구 비율은 필요한 식사 에너지를 얻지 못할 가능성이 있는 인구의 비율을 추정한 지표다. 국가 평균은 나라 전체의 흐름을 요약하므로, 개인의 경험과 국내 지역 차이는 세부 자료에서 확인한다.

세계은행 WDI 지도는 FAO의 2023–2025년 평균 추정치를 2024년 값으로 나타낸다. 인도는 9.8%, 방글라데시는 8.2%, 케냐는 34.9%다. 범례의 2.5 표시는 실제 값이 2.5% 미만인 국가를 가리킨다. 이 기준 미만 값도 영양 부족이 없다는 뜻은 아니므로 범례를 구분해 읽는다.

곡물 수입 의존도 지도는 2022–2024년 3년 평균을 보여 준다. 대한민국은 78.3%, 중국은 9.1%, 미국은 4.6%다. 이 지표는 수입·수출·국내 생산을 함께 반영한 곡물 공급 구조를 나타낸다. 두 지도는 측정 대상과 기준 기간이 다르므로 각 범례를 따로 읽은 뒤 분포를 비교한다.

세계 영양 부족 비율은 2000–2002년 평균 13.0%에서 2023–2025년 평균 8.1%로 변했다. 그래프는 각 3개년 평균을 기간의 가운데 연도에 표시한다. 세계 평균은 지역과 국가마다 다른 상황을 요약하므로, 지역별 변화는 별도 자료에서 살펴본다.

FAO의 2025년 보고서는 식품 가격 상승이 구매력을 낮춰 식량 접근에 영향을 줄 수 있다고 설명한다. 소득 불평등과 사회 보호 여건에 따라 영향은 달라진다. FAO 공동 보고서는 분쟁, 경제 충격, 기후 극한과 강제 이주가 식량 위기와 함께 나타난 사례를 정리한다. 요인이 겹쳐 작용할 수 있으므로 지역별 가격·소득·분쟁·기후 자료를 함께 살펴 원인을 설명한다.

food market concentration(식량 시장 집중)은 소수 기업이 곡물의 생산이나 유통·판매에서 큰 비중과 통제력을 갖는 시장 구조다. UNCTAD의 2024년 보고서는 세계 곡물 교역에서 상위 4개 기업의 비중을 70–90%로 추산한 자료를 인용한다. 이 수치는 국가별 밀 수출 비중과 단위가 다르다. 특정 국가의 영양 부족 원인을 살피려면 가격·소득과 시장 접근 자료도 함께 확인한다.
