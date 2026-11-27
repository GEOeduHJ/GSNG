---
title: '세계를 이해하는 관점과 세계시민의 역할은 무엇일까?'
goal: 세계적 관계를 공간 규모와 행위자의 관점에서 살피고 근거에 따라 공동의 실천을 제안할 수 있다.
opener: 한 사람의 소비와 정보 이용은 멀리 떨어진 사람들의 일과 생활에 어떤 영향을 줄 수 있을까? 개인·학교·기업·공공기관은 각각 무엇을 할 수 있을까?
textbookRef: { pages: [14, 16] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/01-01/scales-and-relations.svg
    label: 공간 규모 사이의 관계
    caption: 개인·지역·국가·세계의 상호작용
    source: ''
    alt: 세계·국가·지역·개인 규모의 제도와 선택이 서로 영향을 주고받는 관계를 나타낸 개념도다.
    config: {}
    concepts: [scale, interdependence, world-citizenship]
  - id: d2
    type: chart
    data: /data/01-01/apparel-trade.json
    label: 의류 수입과 여러 원산지
    caption: 미국의 의류 수입액 상위 원산지와 대한민국, 2025년
    source: apparel-trade
    alt: 2025년 미국 일반수입 의류 가운데 원산지별 수입액을 막대로 비교한 그래프다.
    config: { kind: bar, unit: '달러' }
    concepts: [interdependence, scale, world-citizenship]
  - id: d3
    type: map
    data: /data/01-01/trade-share-map.json
    label: 국가별 무역 비중과 연결
    caption: 국가별 상품·서비스 무역 비중(국내총생산 대비), 2023년
    source: wdi-trade-share-map
    alt: 각 국가의 국내총생산에서 상품·서비스 수출입 합계가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [interdependence, scale]
  - id: d4
    type: map
    data: /data/01-01/internet-use-map.json
    label: 국가별 인터넷 이용률과 접근
    caption: 국가별 인터넷 이용률, 2024년
    source: wdi-internet-use-map
    alt: 2024년 각 국가에서 인터넷을 이용하는 인구의 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [scale, world-citizenship]
summary:
  - 다중 스케일 관점은 세계·국가·지역·개인 규모의 힘과 행위자가 서로 영향을 주는 방식을 함께 살핀다.
  - 관계적 사고는 한 장소의 선택이 다른 장소의 사람과 환경에 이어지는 연결을 추적한다.
  - 세계시민성은 영향을 받는 사람의 관점과 결정 권한을 살피고 공동 문제 해결에 참여하는 태도다.
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 학교 의류 구매 협의
    instruction: 가상 상황에 등장하는 주체의 관점과 결정 권한을 구분하고, 자료의 범위에 맞는 행동을 제안한다.
    actors:
      - id: student-buyer
        label: 학생 구매자
        place: 학교
        role: 예산과 품질, 사용 기간을 고려해 구매 의견을 낸다고 가정한다.
        power: 개인의 선택과 의견을 제시할 수 있다.
      - id: school-team
        label: 학교 구매 담당자
        place: 학교
        role: 공동구매의 기준과 정보 확인 절차를 마련한다고 가정한다.
        power: 구매 기준과 공개할 정보를 정할 수 있다.
      - id: supplier
        label: 판매·공급 기업
        place: 여러 지역의 공급망
        role: 상품과 공급 정보, 계약 조건을 설명한다고 가정한다.
        power: 공급처와 계약 조건을 제안하고 관련 정보를 제공할 수 있다.
      - id: public-agency
        label: 공공기관
        place: 지역·국가
        role: 조달과 정보 공개 기준을 마련한다고 가정한다.
        power: 공공 기준과 점검 절차를 설계할 수 있다.
    levels:
      - id: individual
        label: 개인
        action: 필요한 정보를 살피고 구매·사용·수선 선택에 참여한다.
      - id: school
        label: 학교
        action: 구매 기준과 공급 정보 확인 절차를 정한다.
      - id: company
        label: 기업
        action: 공급처와 생산 정보, 계약 기준을 설명하고 점검한다.
      - id: public
        label: 공공기관
        action: 책임 있는 조달과 정보 공개의 공통 기준을 마련한다.
keyTerms: [scale, interdependence, world-citizenship]
sourceIds: [unesco-gced, world-bank-trade-share, world-bank-internet-use, us-census-apparel-imports]
---
## 다중 스케일 관점

multi-scale perspective(다중 스케일 관점)는 세계·국가·지역·개인 규모에서 작동하는 힘과 행위자의 상호작용을 함께 살피는 접근이다. 국제 협약, 국가 정책, 지역의 결정, 개인의 행동은 서로 다른 범위에서 이루어지며 결과는 다시 다른 규모에 영향을 줄 수 있다. 개념도에서 규모 사이를 오가는 관계를 살펴보자. [[d1]]

국가별 무역 비중은 세계 경제와 각 나라의 관계를 비교하는 단서다. 지도에서 범례를 확인하고 여러 국가의 분포를 살펴보자. 이 지표를 지역 내부의 차이나 개인의 생활 수준으로 해석하려면 지역·가구 자료를 더해 여러 규모의 근거를 연결한다. [[d3]]

## 관계적 사고와 세계시민의 역할

relational thinking(관계적 사고)은 한 장소의 선택과 변화가 다른 장소의 사람·환경·경제와 이어지는 관계를 살피는 관점이다. 2025년 미국의 의류 수입 통계에는 여러 원산지가 기록되어 있어 소비 시장과 생산 지역의 연결을 확인할 수 있다. 원산지별 수입액과 함께 기업의 공급망·노동 자료를 살피면 각 주체의 역할과 결정 권한을 더 구체적으로 설명할 수 있다. [[d2]]

세계화된 관계에 참여하는 사람은 멀리 있는 이웃의 권리와 삶을 함께 고려할 수 있다. global citizenship(세계시민성)은 지역의 삶과 세계의 공동 문제를 연결해 생각하고, 개인·학교·기업·공공기관의 역할을 찾아 참여하는 관점이다. 2024년 인터넷 이용률 지도에서 나라별 차이를 살펴보고, 정보에 접근할 기회와 실제 참여를 넓힐 수 있는 행동을 여러 규모에서 제안해 보자. [[d4]]
