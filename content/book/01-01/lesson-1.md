---
title: '세계화는 무엇이고, 우리에게 어떤 영향을 미칠까?'
goal: 상품·정보·사람의 이동이 장소를 연결하고 지역마다 다른 영향을 만드는 과정을 자료에 근거해 설명할 수 있다.
opener: 내가 쓰는 물건과 온라인에서 접하는 콘텐츠는 어디의 사람·장소와 이어질까? 그 연결은 일상에 어떤 변화를 만들까?
textbookRef: { pages: [10, 11] }
steps:
  - id: d1
    type: map
    data: /data/01-01/trade-share-map.json
    label: 국가별 무역 비중 지도
    caption: 국가별 상품·서비스 무역 비중(국내총생산 대비), 2023년
    source: wdi-trade-share-map
    alt: 2023년 각 국가의 국내총생산에서 상품·서비스 수출입 합계가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [globalization, interdependence, scale]
  - id: d2
    type: chart
    data: /data/01-01/trade-share-series.json
    label: 세계 무역 비중 추이
    caption: 세계와 주요 국가의 무역 비중, 1990–2024년
    source: wdi-trade-share-series
    alt: 세계와 주요 국가의 국내총생산 대비 상품·서비스 무역 비중을 연도별 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2024, unit: '%' }
    concepts: [globalization, interdependence, scale]
  - id: d3
    type: chart
    data: /data/01-01/apparel-trade.json
    label: 미국 의류 수입 원산지
    caption: 미국의 의류 수입액 상위 원산지와 대한민국, 2025년
    source: apparel-trade
    alt: 2025년 미국 일반수입 의류 가운데 원산지별 수입액을 막대로 비교한 그래프다.
    config: { kind: bar, unit: '달러' }
    concepts: [interdependence, scale]
  - id: d4
    type: chart
    data: /data/01-01/internet-use-series.json
    label: 세계 인터넷 이용률 추이
    caption: 세계와 주요 국가의 인터넷 이용률, 1990–2024년
    source: wdi-internet-use-series
    alt: 세계와 주요 국가의 인터넷 이용 인구 비율을 연도별 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2024, unit: '%' }
    concepts: [globalization, interdependence, scale]
summary:
  - 세계화는 상품·정보·사람·자본의 국경 간 이동으로 장소 사이의 연결을 넓힌다.
  - 교통·통신의 발달은 교류를 빠르게 하고 여러 공간 규모의 주체를 이어 준다.
  - 경제·문화의 세계적 흐름은 지역에 기회와 과제를 함께 만들며, 그 영향은 장소마다 다르게 나타난다.
routines:
  opener: { id: see-think-wonder, prompt: "국가별 무역 비중 지도에서 무역 연결이 큰 지역을 살피고, 눈에 띈 점과 궁금한 점을 적어 보자." }
  inquiry: { id: three-whys, prompt: "세계화의 영향이 나의 일상, 우리 지역, 세계에 왜 중요한지 세 규모로 나누어 생각해 보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 경제·정보 흐름을 지표로 비교하기
    instruction: 무역 비중 지도와 시계열, 인터넷 이용률 시계열, 의류 수입 그래프의 범위와 단위를 확인한다.
    prompt: 네 자료가 각각 설명하는 연결을 구분하고, 여러 장소가 참여하는 방식과 더 필요한 근거를 정리하시오.
    fields:
      - { id: trade-map, label: 국가별 무역 비중에서 찾은 공간 차이 }
      - { id: trade-trend, label: 무역 비중 시계열에서 찾은 변화 }
      - { id: apparel, label: 의류 수입 원산지에서 찾은 연결 }
      - { id: information, label: 인터넷 이용률에서 찾은 변화와 차이 }
keyTerms: [globalization, interdependence, scale]
sourceIds: [world-bank-trade-share, world-bank-internet-use, us-census-apparel-imports, unesco-gced, gawc-world-cities, nyc-economic-development, who-travel-health]
---
## 세계화의 의미

globalization(세계화)은 상품·정보·사람·자본의 국경 간 이동이 늘면서 여러 장소의 생활이 더 긴밀하게 이어지는 변화다. 교통과 통신의 발달은 이동과 정보 교환에 드는 시간과 제약을 줄인다. 장소 사이에 서로 영향을 주고받는 관계를 interdependence(상호의존)라고 한다.

상품과 서비스의 교역은 세계화의 한 모습이다. 무역 비중은 한 나라의 국내총생산에 견준 수출입 합계다. 2023년 대한민국은 82.3%, 중국은 36.7%, 미국은 24.9%다. 지도의 범례를 따라 국가별 차이를 찾아보자. 이 비율은 경제 규모에 견준 교역 정도를 보여 주므로 무역 총액이나 생활 수준과 함께 읽는다. [[d1]]

세계 무역 비중은 1990년 38.1%에서 2024년 56.7%로 높아졌다. 이 지표는 상품·서비스 교역이 세계 경제에서 차지하는 비중의 변화를 보여 준다. 무역 외에도 사람·자본·정보의 흐름을 함께 살펴 세계화의 여러 측면을 비교해 보자. [[d2]]

## 세계화의 영향

국경을 넘는 생산과 유통은 여러 지역의 기업·노동자·소비자를 연결한다. 한 상품의 설계와 원료 조달, 가공과 판매가 서로 다른 곳에서 이루어지면 국제적 분업이 나타난다. 2025년 미국의 의류 수입액 통계에는 베트남 약 165억 달러, 중국 약 112억 달러, 방글라데시 약 79억 달러, 대한민국 약 1억 7천만 달러가 기록되어 있다. 각 지역이 맡는 공정과 시장 영향력은 다를 수 있으므로 원산지별 교역 규모를 노동·기업 자료와 함께 살펴보자. [[d3]]

선진국과 개발 도상국을 큰 범주만으로 나누면 나라 안의 산업과 지역이 맡는 다양한 역할을 놓치기 쉽다. 의류 수입 원산지는 교역 장소를 보여 주므로, 노동 조건과 기업의 결정 권한은 별도의 자료를 연결해 설명한다.

세계화의 흐름을 잇는 세계도시는 금융·기업 서비스·문화 산업을 통해 여러 지역의 관계를 중개한다. 뉴욕은 금융과 미디어 등 다양한 분야가 세계와 연결된 사례다. 도시를 세계 네트워크의 한 지점으로 살피면 국가 간 교류와 도시 간 흐름을 함께 설명할 수 있다.

사람과 상품의 이동망은 감염병이 여러 지역으로 확산하는 경로가 될 수 있다. 공항과 항만의 보건 대응은 위험을 살피고 정보를 나누는 과정으로 이루어진다. 국제 이동과 공중보건의 관계를 함께 보면 연결망을 안전하게 관리하는 공동 대응의 필요성이 드러난다.

문화 콘텐츠는 여러 지역에서 접하고 나누는 기회가 늘어난다. 널리 유통되는 표현이 생활양식을 비슷하게 만들기도 하고, 지역의 언어와 취향에 맞춰 다시 해석되기도 한다. 인터넷 이용률 시계열에서 세계와 주요 국가의 흐름을 비교해 정보 연결의 확산을 살펴보자. 이용률은 인터넷을 쓰는 인구의 비율이므로 콘텐츠의 다양성이나 이용 경험은 다른 자료와 함께 생각한다. [[d4]]
