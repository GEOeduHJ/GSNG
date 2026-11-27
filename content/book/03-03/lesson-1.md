---
title: 글로벌 경제를 움직이는 것은 무엇일까?
goal: 초국적 기업과 글로벌 가치사슬이 여러 장소의 생산 기능을 연결하는 방식과 투자 자료의 한계를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-03/fdi-net-inflows-gdp-map.json
    source: u0303-fdi-inflows-gdp-map
    caption: 국가별 외국인 직접 투자 순유입의 국내총생산 대비 비율, 2024년
    alt: 국가별 외국인 직접 투자 순유입액이 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [transnational-corporation, spatial-inequality]
  - id: s3
    type: chart
    data: /data/03-03/fdi-global-net-inflows-series.json
    source: u0303-global-fdi-inflows-series
    caption: 세계 외국인 직접 투자 순유입액 변화, 1990–2024년, 현재 미국 달러
    alt: 세계 외국인 직접 투자 순유입액의 1990년부터 2024년까지 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [transnational-corporation, global-value-chain]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [transnational-corporation, global-value-chain, glocalization]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 가치사슬 단계와 입지 조건 연결하기
    instruction: 각 생산 기능과 관련해 고려할 수 있는 입지 조건을 연결한다. 특정 기업의 실제 공정을 설명하는 자료가 아니라 가능한 관계를 분류하는 활동이다.
    prompt: 각 항목을 가장 관련 깊은 가치사슬 단계에 놓고, 다른 단계와도 연결될 수 있는 조건을 하나 설명하시오.
    items:
      - { id: skilled-design, text: 전문 지식과 설계 인력을 구하기 쉬운 환경 }
      - { id: component-network, text: 전문 부품 업체와 공급망에 접근하기 쉬운 환경 }
      - { id: assembly-base, text: 생산 시설·기술 인력·운송 연결을 갖춘 환경 }
      - { id: sales-market, text: 소비자와 유통망에 접근하기 쉬운 환경 }
    categories:
      - { id: research-design, label: 연구·디자인 }
      - { id: parts, label: 부품 생산 }
      - { id: assembly, label: 조립 }
      - { id: sales, label: 판매 }
sourceIds: [world-bank-wdi-catalog, oecd-tiva, world-bank-wdr-2020-gvc]
---
초국적 기업은 여러 나라에서 생산·판매·투자를 하며 기업 네트워크를 운영한다. 연구·디자인, 부품 생산, 조립, 운송, 판매 기능은 한 장소에 모이거나 여러 지역에 나뉜다. 상품과 서비스가 여러 단계를 거쳐 만들어지고 전달되는 연결이 글로벌 가치사슬이다. 세계적 흐름을 지역 조건에 맞춰 조정하는 과정은 glocalization(세계지역화)으로 살펴볼 수 있다.

각 단계의 입지는 지식과 기술을 갖춘 사람, 공급 업체, 생산 시설, 운송 연결, 소비 시장 등 여러 조건과 관련된다. 지역은 자신이 가진 조건에 따라 가치사슬의 일부 기능을 맡거나 바꾸기도 한다. 지역은 여러 단계에 참여할 수 있으며, 기능 배치와 이익의 분배는 기업·제도·지역의 조건에 따라 달라진다.

FDI 지도는 2024년 각 국가에 들어온 순투자액을 국내총생산과 비교한 비율이다. 먼저 범례를 확인하고 대한민국·미국·중국 등 여러 국가의 색을 살펴본다. 이 비율은 경제 규모에 견준 투자 흐름을 나타낸다. 투자 총액, 기업의 영향력, 가치사슬 참여 정도는 금액·기업 활동·생산 단계 자료를 함께 살펴본다.

세계 순 FDI 유입액 시계열은 1990년부터 2024년까지 해마다 오르내린 흐름을 나타낸다. 선의 변화에서 세계 투자 흐름이 시기마다 달라지는 모습을 살펴본다. 단위는 물가 조정 전 현재 미국 달러이므로, 실질 투자 증가율을 보려면 물가를 반영한 자료를 함께 확인한다.

FDI 지도와 시계열은 국경을 넘는 자본 이동의 규모와 분포를 보여 준다. 생산 기능의 위치와 단계별 가치 배분은 생산·무역 자료를 더해 살펴본다. Organisation for Economic Co-operation and Development(OECD, 경제협력개발기구)의 부가가치 무역 지표는 국내·해외 부가가치를 따로 보여 주지만, 이 중단원은 해당 원자료를 다시 배포하지 않는다. 가치사슬 단계와 입지 조건을 연결한 뒤, 실제 배분을 설명하는 데 필요한 자료도 찾아본다.
