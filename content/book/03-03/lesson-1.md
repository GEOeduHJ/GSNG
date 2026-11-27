---
title: 글로벌 경제를 움직이는 것은 무엇일까?
goal: 초국적 기업의 성장과 기능별 입지를 이해하고, 투자 흐름이 여러 지역을 연결하는 방식을 설명할 수 있다.
opener: 우리가 쓰는 한 상품은 어떤 나라와 지역을 거쳐 만들어질까? 기업이 생산과 판매 장소를 나누는 까닭을 살펴보자.
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
  - 초국적 기업은 해외 판매망과 생산 시설을 거쳐 여러 나라에 기능을 나누어 둔다.
  - 본사·연구소·공장은 자본과 정보, 전문 인력, 노동력과 시장에 대한 접근성을 고려해 입지를 정한다.
  - 세계지역화는 세계적 상품과 운영 방식을 지역의 식문화와 수요에 맞추는 과정이다.
  - 외국인 직접 투자는 기업 활동과 자본이 국경을 넘어 이동하는 흐름이다.
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
sourceIds: [world-bank-wdi-catalog, oecd-tiva, world-bank-wdr-2020-gvc, samsung-vietnam-spatial-division, mcdonalds-korea-bulgogi]
---
## 초국적 기업의 성장과 기능별 입지

글로벌 경제는 무역·투자·생산망을 통해 여러 나라의 경제가 연결된 체제다. Transnational corporation(초국적 기업)은 여러 나라에 생산·판매·투자 활동을 두고 사업망을 운영하는 기업이다. 국내 시장에서 성장한 기업은 수출과 해외 판매 지사를 거쳐 현지 공장을 세울 수 있다. 사업이 커지면 본사·연구소·생산 공장을 여러 나라에 분산해 세계 시장을 연결한다.

기업의 기능마다 필요한 입지 조건은 다르다. 본사는 자본·정보·전문 서비스가 모이는 대도시에 자리하기 쉽다. 연구소는 대학과 고급 인력이 풍부한 지역을 찾는다. 생산 공장은 노동 비용을 낮추거나 소비 시장과 부품 협력업체에 가까운 곳에 들어선다. 삼성전자는 베트남 북부 박닌성과 타이응우옌성에서 모바일 기기를 생산하고, 하노이에 연구개발 거점을 두며, 호찌민시에서 판매·마케팅 활동을 한다.

공장이 들어서면 지역 주민의 일자리와 협력업체 주문이 늘고 생산 기술과 관리 방식이 전해질 수 있다. 공장이 다른 지역으로 옮겨가면 고용과 지역 업체의 수요가 줄어 제조업 기반이 약해지는 산업 공동화가 나타날 수 있다. 장기 효과는 현지 협력업체와 교육·노동 조건에 따라 달라진다.

## 세계지역화와 투자 흐름

Glocalization(세계지역화)은 세계적 기업이 지역의 식문화와 수요에 맞춰 상품이나 운영 방식을 조정하는 과정이다. 맥도날드 한국은 불고기 소스를 넣은 불고기 버거를 한국 한정 메뉴로 선보인다. 지역의 맛을 반영한 제품 설계는 세계 시장에서 같은 상품만 판매하지 않는 한 방법이다.

Foreign direct investment(FDI, 외국인 직접 투자)는 국경을 넘어 기업이나 생산 시설에 지속적인 이해관계를 두려는 투자 흐름이다. 2024년 순 FDI 유입은 GDP 대비 미국 0.8%, 중국 0.2%, 대한민국 0.7%였다. 지도에서 세 나라의 비율과 주변 국가의 분포를 비교해 보자. [[d1]]

세계 순 FDI 유입액은 경기와 투자 환경의 변화에 따라 해마다 오르내린다. 그래프에서 1990년부터 2024년까지 증가와 감소가 두드러진 시기를 찾아보자. [[d2]]

## 투자와 경제 활동의 공간 분포

GDP per capita(1인당 국내총생산)는 한 해 생산액을 인구로 나눈 값이다. Purchasing power parity(PPP, 구매력평가)는 국가 간 물가 수준의 차이를 조정해 구매력을 비교한다. FDI와 1인당 GDP는 각각 투자 흐름과 경제 활동의 규모를 나타낸다. 지도에서 두 지표의 분포가 함께 나타나거나 달라지는 국가를 찾아보자. [[d3]]
