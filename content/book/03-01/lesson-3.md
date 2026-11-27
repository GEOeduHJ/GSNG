---
title: 세계의 인구는 왜 이주할까?
goal: 이주의 여러 동인과 국제 이동의 공간적 양상을 구분하고 출발지·도착지에 미치는 영향을 당사자의 관점과 자료에 근거해 설명할 수 있다.
opener: 사람이 국경을 넘어 거주지를 옮기는 데는 어떤 이유가 함께 작용할까? 이동은 출발 지역과 도착 지역에 어떤 변화를 만들까?
textbookRef: { pages: [132, 135] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/03-01/migration-drivers-schematic.svg
    label: 이주 동인 개념도
    caption: 이주 동인과 선택 폭
    source: ''
    alt: 경제·사회·정치·환경 조건이 개인의 상황과 선택에 복합적으로 작용하고 이동의 선택 폭이 달라진다.
    config: {}
    concepts: [international-migration, migration-impact]
  - id: d2
    type: map
    data: /data/03-01/net-migration-map-2024.json
    label: 국가별 순이동
    caption: 국가별 순이동, 2024년
    source: u0301-net-migration
    alt: 2024년 국가별 순이동 추정치를 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-migration]
  - id: d3
    type: map
    data: /data/03-01/international-migrant-share-map-2024.json
    label: 국제 이주민 비율
    caption: 국가별 국제 이주민 비율, 2024년
    source: u0301-international-migrant-share
    alt: 2024년 각 국가의 전체 거주 인구에서 국제 이주민이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-migration]
  - id: d4
    type: map
    data: /data/03-01/personal-remittances-gdp-map-2024.json
    label: 송금 수입과 국내총생산
    caption: 국가별 개인 송금 수입의 국내총생산 대비 비율, 2024년
    source: u0301-personal-remittances-gdp
    alt: 2024년 각 국가의 국내총생산에서 개인 송금 수입이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-migration, migration-impact]
summary:
  - 이주는 배출 요인과 흡인 요인이 함께 작용해 일어나며, 까닭에 따라 경제적·정치적·환경적 이주로 나눈다.
  - 국제 이주는 대체로 일자리와 소득 기회가 적은 지역에서 많은 지역으로 향한다.
  - 순이동은 일정 기간의 유입과 유출의 차이이고, 국제 이주민 비율은 현재 주민 가운데 이주민의 몫이다.
  - 이주는 유출 지역에 송금과 인력 유출을, 유입 지역에 노동력 확보와 문화 다양성, 갈등 조정의 과제를 가져온다.
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 지역의 국제 이주와 생활 기반 협의
    instruction: 국가 단위 자료에서 확인한 사실과 협의를 위해 둔 가상 상황을 나누어 살핀다. 어떤 역할도 다양한 이주민이나 주민 전체를 대표하지 않는다.
    actors:
      - id: migrant-resident
        label: 이주민 주민
        place: 가상 도착 지역
        role: 이동 경험과 생활 조건, 일·학업 계획은 사람마다 다르며 한 사람이 집단 전체를 대표하지 않는다고 가정한다.
        power: 필요한 정보와 서비스, 참여 방식을 제안하고 자신의 선택과 경험을 협의에 반영할 수 있다.
      - id: origin-community
        label: 출발 지역 주민
        place: 가상 출발 지역
        role: 가족 관계와 일자리, 지역 공동체에 대한 경험과 의견이 주민마다 다르다고 가정한다.
        power: 지역의 필요와 초국경 관계를 알리고 출발 지역의 대응을 제안할 수 있다.
      - id: destination-worker
        label: 도착 지역의 노동자·사업자
        place: 가상 도착 지역의 일터
        role: 노동과 사업, 지역 서비스의 조건을 각기 다른 입장에서 경험한다고 가정한다.
        power: 일터의 정보 접근과 공정한 고용 조건, 역량을 살리는 방안을 제안할 수 있다.
      - id: local-government
        label: 지방 정부·공공기관
        place: 가상 지역의 공공 서비스
        role: 생활 정보와 공공 서비스, 주민 참여 절차를 조정하는 역할을 맡는다고 가정한다.
        power: 여러 주민의 의견을 듣고 정보·서비스·참여 절차를 마련할 수 있다.
    levels:
      - id: information
        label: 정보 접근
        action: 생활·노동·교육·보건 정보를 여러 언어와 방식으로 안내한다.
      - id: workplace
        label: 일터와 역량
        action: 고용 조건과 안전을 알리고 각자의 기술과 경험을 활용할 절차를 마련한다.
      - id: public-services
        label: 공공 서비스
        action: 주민이 필요한 서비스를 찾고 운영 과정에 의견을 낼 수 있게 한다.
      - id: participation
        label: 지역 참여
        action: 특정 주민에게 집단 전체를 대표하도록 요구하지 않고 다양한 목소리를 반영한다.
keyTerms: [international-migration, migration-impact]
sourceIds: [iom-migration-drivers, world-bank-wdr2023-migration, iom-migration-contributions, world-bank-wdi-03-01]
---
## 이주 요인과 유형

migration(이주)은 사람들이 살던 곳을 떠나 다른 지역에 자리 잡는 것이다. 국경을 넘으면 international migration(국제 이주)이라고 한다. 살던 곳을 떠나게 만드는 조건을 push factor(배출 요인), 새로운 곳으로 끌어들이는 조건을 pull factor(흡인 요인)라고 한다. 낮은 임금과 실업, 분쟁과 박해, 가뭄이나 홍수는 배출 요인이 된다. 높은 임금과 일자리, 안전한 환경, 교육 기회는 흡인 요인이 된다.

이주는 떠나는 까닭에 따라 크게 경제적·정치적·환경적 이주로 구분한다. 더 나은 일자리를 찾아 떠나는 이주 노동자는 경제적 이주, 분쟁과 박해를 피해 떠나는 난민은 정치적 이주, 자연재해로 삶터를 잃은 사람들의 이동은 환경적 이주의 예다. 실제로는 여러 까닭이 겹치고, 같은 조건에서도 이동을 선택할 수 있는 폭은 사람마다 다르다. 개념도에서 여러 조건이 개인의 선택과 어떻게 이어지는지 살펴보자. [[d1]]

## 국제 이주의 공간적 양상

교통과 통신이 발달하고 세계화가 진행되면서 국제 이주가 늘고 있다. 이주는 대체로 일자리가 부족하고 임금이 낮은 지역에서 일자리가 많고 임금이 높은 지역으로 향한다. 라틴 아메리카에서 앵글로아메리카로, 북부 아프리카와 아시아에서 유럽으로 가는 흐름이 대표적이다. 석유 수출로 자본을 쌓은 서남아시아 산유국에는 건설과 산업에 필요한 노동자가 남부 아시아와 동남아시아에서 많이 들어온다.

순이동은 일정 기간 들어온 사람 수에서 나간 사람 수를 뺀 값이다. 값이 양수이면 순유입, 음수이면 순유출이다. 2024년 일본의 순이동은 약 15만 3천 명으로 순유입이고, 우간다는 약 −11만 8천 명으로 순유출이다. 지도에서 순유입 국가와 순유출 국가가 어디에 모여 있는지 찾아보자. [[d2]]

국제 이주민 비율은 한 나라에 사는 사람 가운데 다른 나라에서 태어났거나 국적이 다른 사람의 비율이다. 2024년 아랍에미리트는 74.0%로 매우 높고, 미국은 15.2%, 대한민국은 3.5%다. 순이동 지도와 번갈아 보며 이주민이 많이 사는 나라와 최근 이주민이 많이 들어오는 나라가 같은지 비교해 보자. [[d3]]

## 국제 이주와 지역 변화

이주민이 떠나는 지역에는 해외에서 일하는 가족이 보내는 송금이 들어와 가계 소득과 지역 경제에 보탬이 된다. 그러나 젊고 숙련된 인력이 계속 빠져나가면 산업 발전이 늦어지고, 남은 가족의 돌봄 부담이 커질 수 있다. 지도에서 개인 송금 수입이 GDP(국내총생산)에서 차지하는 비율이 높은 나라를 찾아보자. 타지키스탄과 통가처럼 송금 비율이 높은 나라는 이주와 어떤 관계가 있을지 생각해 보자. [[d4]]

이주민이 들어오는 지역은 부족한 노동력을 채우고 문화가 다양해진다. 고령화로 일할 사람이 줄어드는 나라들은 이주민을 적극적으로 받아들이기도 한다. 한편 일자리 경쟁이나 언어·종교·생활 방식의 차이로 갈등이 생기기도 한다. 이주민은 일하고 배우며 가족을 꾸리고 지역 공동체를 함께 만드는 주민이다. 이주민과 기존 주민이 서로의 권리를 존중하며 함께 살아가려면 교육과 공공 서비스, 참여 기회를 넓히는 정책이 필요하다.
