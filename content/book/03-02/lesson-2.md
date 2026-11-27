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
생산량이 넉넉하더라도 식량이 필요한 사람에게 도달하거나 가구가 살 수 있는지는 별개의 문제다. 영양 부족 인구 비율은 인구 가운데 필요한 식사 에너지를 얻지 못할 가능성이 있는 비율을 나타내는 추정 지표다. 한 국가의 평균값은 개인별 경험이나 국가 내부의 지역 차이를 직접 보여 주지 않는다.

세계은행 WDI 지도에서 2024년 인도의 영양 부족 인구 비율은 9.8%, 방글라데시는 8.2%, 케냐는 34.9%다. 이 지도에서 2.5는 실제로 2.5% 미만인 값으로 별도 표시된다. 기준 미만 표시는 0%나 영양 부족이 없다는 뜻이 아니다.

곡물 수입 의존도 지도는 2022–2024년 3년 평균을 보여 준다. 대한민국은 78.3%, 중국은 9.1%, 미국은 4.6%다. 이 지표는 수입과 수출, 국내 생산을 함께 반영한 곡물 공급 구조를 나타낸다. 수입 의존도가 높은 국가라고 해서 영양 부족 비율도 반드시 높다고 단정할 수 없으며, 두 지도는 측정값과 기간도 다르다.

세계 영양 부족 비율의 3년 평균은 2000–2002년 13.0%에서 2023–2025년 8.1%로 변했다. 선은 각 3년 기간의 가운데 연도에 표시되어 있어 매년의 관측값과 같지 않다. 세계 평균의 변화는 여러 지역과 국가의 서로 다른 상황을 하나의 값으로 요약한다.

FAO의 2025년 보고서는 식품 가격 상승이 구매력을 약화해 식량 접근에 영향을 줄 수 있으며, 소득 불평등과 사회 보호 여건에 따라 영향이 다를 수 있다고 설명한다. FAO 공동 보고서는 분쟁, 경제 충격, 기후 극한과 강제 이주가 식량 위기와 함께 나타난 사례를 정리한다. 이 요인들은 서로 겹칠 수 있고, 특정 국가의 지도 값만으로 원인을 가려낼 수는 없다.

food market concentration(식량 시장 집중)은 소수 기업이 곡물의 생산이나 유통·판매에서 큰 비중과 통제력을 갖는 시장 구조다. UNCTAD의 2024년 보고서는 세계 곡물 교역에서 상위 4개 기업의 비중을 70–90%로 추산한 자료를 인용한다. 이는 국가별 밀 수출 비중과 다른 단위이며, 특정 국가의 영양 부족 원인을 곧바로 입증하지 않는다.
