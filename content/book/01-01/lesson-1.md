---
title: '세계화는 무엇이고, 우리에게 어떤 영향을 미칠까?'
goal: 세계화가 장소 사이의 연결을 넓히는 방식과 그 차이를 무역·인터넷 자료로 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-01/trade-share-map.json
    source: wdi-trade-share-map
    caption: 국가별 무역 비중(GDP 대비), 2023년
    alt: 국가별 수출입 합계가 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [globalization, scale]
  - id: s3
    type: chart
    data: /data/01-01/trade-share-series.json
    source: wdi-trade-share-series
    caption: 세계와 주요 국가의 무역 비중 시계열, 1990–2024년
    alt: 세계와 주요 국가의 무역 비중을 연도별 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [interdependence, scale]
  - id: s4
    type: map
    data: /data/01-01/internet-use-map.json
    source: wdi-internet-use-map
    caption: 국가별 인터넷 이용률, 2024년
    alt: 국가별 인터넷 이용 인구 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [globalization, scale]
  - id: s5
    type: chart
    data: /data/01-01/internet-use-series.json
    source: wdi-internet-use-series
    caption: 세계와 주요 국가의 인터넷 이용률 시계열, 1990–2024년
    alt: 세계와 주요 국가의 인터넷 이용률을 연도별 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [interdependence, scale]
  - { id: s6, type: text, caption: '', source: '', alt: '' }
keyTerms: [globalization, scale, interdependence]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 두 지도로 연결의 차이 비교하기
    instruction: 무역 비중 지도와 인터넷 이용률 지도의 범례와 기준 연도를 확인하고 나라별 패턴을 대조한다.
    prompt: 두 자료에서 찾은 차이와 이 자료만으로 판단하기 어려운 점을 기록하시오.
    fields:
      - { id: trade, label: 무역 비중 지도에서 찾은 특징 }
      - { id: internet, label: 인터넷 이용률 지도에서 찾은 특징 }
      - { id: compare, label: 두 자료에서 함께 보이는 점과 다른 점 }
      - { id: limit, label: 설명에 더 필요한 자료 }
sourceIds: [world-bank-trade-share, world-bank-internet-use]
---
세계화는 상품·정보·사람·자본의 국경을 넘는 이동을 늘려 장소 사이 연결을 넓힌다. 한 지역의 생산과 소비는 다른 지역의 일과 생활에도 영향을 준다. 이렇게 서로 영향을 주고받는 관계를 interdependence(상호의존)라고 한다.

무역 비중 지도는 수출입 합계가 국내총생산에서 차지하는 비율을 국가별로 보여 준다. 먼저 범례의 색 구간을 확인하고 대한민국·미국·중국의 위치를 비교한다. 비율이 높으면 경제 규모에 견준 무역 비중이 크다는 뜻이다. 국가의 부나 무역 총액은 각각 다른 지표로 살펴본다.

무역 비중 시계열에서는 먼저 세계와 주요 국가의 선을 찾아 1990년과 2024년 값을 비교한다. 세계 값은 1990년보다 2024년에 높고, 중간에 오르내린다. 국가별 변화 폭과 시기도 서로 다르다. 범례와 기준 연도를 확인하며 긴 흐름을 읽는다.

2024년 인터넷 이용률 지도에서 범례의 색 구간을 확인하고, 비슷한 색의 나라를 묶어 무역 비중 지도에서 본 위치와 대조한다. 색이 없는 나라는 해당 연도 값이 자료에 수록되지 않았을 수 있으므로 0과 구분해 읽는다.

인터넷 이용률 시계열에서 세계 평균은 2005년 15.6%, 2024년 71.2%다. 두 시점의 값으로 세계 평균이 높아진 흐름을 확인한다. 선이 끊긴 구간은 값이 없는 해일 수 있으므로 0과 구분하고, 국가별 선은 세계 평균선과 나누어 살핀다.

scale(공간 규모)는 현상을 세계·국가·지역 가운데 어느 범위에서 읽을지 정하는 관점이다. 세계 평균은 큰 흐름을, 국가 자료는 국가 사이의 차이를 보여 준다. 지역의 생활은 그보다 작은 범위의 자료가 필요하다. 중심 질문에 답할 때 여러 규모의 근거를 연결하면 세계화의 영향이 모두에게 같지 않음을 설명할 수 있다.
