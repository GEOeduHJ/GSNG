---
title: 글로벌 경제를 움직이는 것은 무엇일까?
goal: 초국적 기업이 여러 장소를 연결하고 생산 기능을 나누는 방식과 투자 자료가 보여 주는 범위를 설명할 수 있다.
opener: 우리가 쓰는 한 상품은 어떤 나라와 지역을 거쳐 만들어질까? 서로 다른 장소에 기업 활동이 이어지는 까닭을 살펴보자.
textbookRef: { pages: [154, 155] }
steps:
  - id: d1
    type: map
    data: /data/03-03/fdi-net-inflows-gdp-map.json
    label: 국가별 외국인 직접 투자 유입 비율
    caption: 국가별 외국인 직접 투자 순유입의 국내총생산 대비 비율, 2024년
    source: u0303-fdi-inflows-gdp-map
    alt: 2024년 국가별 외국인 직접 투자 순유입액이 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [transnational-corporation, global-value-chain]
  - id: d2
    type: chart
    data: /data/03-03/fdi-global-net-inflows-series.json
    label: 세계 순 외국인 직접 투자 유입액 변화
    caption: 세계 외국인 직접 투자 순유입액, 1990–2024년, 현재 미국 달러
    source: u0303-global-fdi-inflows-series
    alt: 세계 외국인 직접 투자 순유입액의 1990년부터 2024년까지 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: '달러(현재 가격)' }
    concepts: [transnational-corporation, spatial-inequality]
  - id: d3
    type: map
    data: /data/03-03/gdp-ppp-per-capita-map.json
    label: 국가별 1인당 국내총생산 분포
    caption: 국가별 1인당 국내총생산, 현재 구매력평가 기준, 2024년
    source: u0303-gdp-ppp-per-capita-map
    alt: 2024년 국가별 1인당 국내총생산을 구매력평가 기준 현재 국제달러로 나타낸 지도다.
    config: { kind: choropleth, unit: '국제달러/명' }
    concepts: [spatial-inequality, transnational-corporation]
summary:
  - 글로벌 경제는 여러 장소의 기업과 시장을 생산·유통·소비로 연결한다.
  - 초국적 기업은 나라 사이에 생산·판매망을 두고 지역의 조건에 맞춰 활동을 조정한다.
  - FDI는 국경을 넘는 투자 흐름을 보여 주며 가치사슬의 생산 단계와 이익 배분은 별도 자료로 살핀다.
  - 투자와 1인당 GDP는 서로 다른 경제 지표이므로 뜻과 공간 단위를 구분해 읽는다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 가치사슬 단계와 입지 조건 연결하기
    instruction: 실제 기업의 공정을 재현하는 활동이 아니다. 각 생산 기능과 관련될 수 있는 입지 조건을 연결하고, 여러 단계에 함께 작용하는 조건도 찾는다.
    prompt: 각 조건을 가장 관련 깊은 생산 단계에 놓고, 그 조건이 다른 단계에도 영향을 주는 까닭을 설명하시오.
    items:
      - { id: research-skills, text: 전문 지식과 연구 인력을 구하기 쉬운 환경 }
      - { id: component-suppliers, text: 전문 부품 업체와 협력망에 접근하기 쉬운 환경 }
      - { id: assembly-logistics, text: 생산 기반과 운송 연결을 갖춘 환경 }
      - { id: market-network, text: 소비자와 유통망에 접근하기 쉬운 환경 }
    categories:
      - { id: research-design, label: 연구·설계 }
      - { id: components, label: 부품 생산 }
      - { id: assembly, label: 조립 }
      - { id: sales-service, label: 판매·서비스 }
keyTerms: [transnational-corporation, global-value-chain, glocalization]
sourceIds: [world-bank-wdi-catalog, oecd-tiva, world-bank-wdr-2020-gvc]
---
## 글로벌 경제와 초국적 기업

글로벌 경제는 여러 장소의 사람·기업·시장이 생산·유통·교환·소비로 연결된 경제 활동이다. Transnational corporation(초국적 기업)은 여러 나라에 생산·판매·투자 활동을 두고 사업망을 운영한다. 기업의 국경 간 활동이 늘면 지역 사이의 자본과 상품 흐름도 긴밀해진다.

초국적 기업은 국내 사업을 바탕으로 해외 판매망과 생산 시설을 넓혀 갈 수 있다. 전문 인력과 기술, 협력 업체, 교통·통신 기반, 소비 시장에 대한 접근성은 기업의 입지 결정에 영향을 준다. 기업과 지역은 서로의 조건을 바꾸며 관계를 만들어 간다.

## 글로벌 가치사슬과 공간적 분업

Global value chain(GVC, 글로벌 가치사슬)은 상품과 서비스의 연구·설계, 부품 생산, 조립, 운송·판매가 여러 기업과 장소에 나뉘어 이어진 구조다. 세계적 생산 흐름이 지역의 시장·문화·제도와 만나 상품이나 판매 방식에 반영되는 과정은 glocalization(세계지역화)으로 설명한다.

Foreign direct investment(FDI, 외국인 직접 투자)는 한 나라의 기업이나 시설에 지속적인 이해관계를 두려는 국경 간 투자 흐름이다. 국가별 순유입액을 국내총생산과 견준 비율을 살펴보며 투자 흐름의 공간 차이를 찾아보자. 가치사슬 참여도와 기업의 지역 영향은 기업별 활동과 부가가치 자료를 더해 살핀다. [[d1]]

세계 순 FDI 유입액은 1990년부터 2024년까지 해마다 달라졌다. 선의 변화를 따라 국제 투자 흐름이 시기별로 달라지는 모습을 살펴보자. 현재 달러 값이므로 물가 변화를 반영한 실질 투자 증가와 구분해 읽는다. [[d2]]

## 투자 흐름과 지역 간 격차

GDP per capita(1인당 국내총생산)를 purchasing power parity(PPP, 구매력평가) 기준으로 나타낸 지도는 국가 사이 평균 생산 규모를 비교하는 자료다. FDI 지도와 나란히 보며 투자 흐름과 국가 소득 수준의 분포가 비슷하거나 다른 곳을 찾아보자. 국가 평균은 개인별 임금이나 가치사슬의 이익 배분과 다르므로, 생산 단계와 가구 소득 자료를 더해 살핀다. [[d3]]
