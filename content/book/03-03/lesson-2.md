---
title: 지구촌의 공간적 불균등은 왜 만들어질까?
goal: 글로벌 가치사슬에서 부가가치가 나뉘는 방식과 소득·빈곤 격차의 원인을 설명할 수 있다.
opener: 세계 경제와 연결된 지역은 모두 비슷한 기회와 몫을 얻을까? 상품의 설계·생산·판매가 놓이는 장소를 따라가 보자.
textbookRef: { pages: [156, 158] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/03-03/value-chain-schematic.svg
    label: 글로벌 가치사슬 개념도
    caption: 개념도 · 생산 단계와 지역 입지 조건의 연결
    source: ''
    alt: 연구·설계, 부품 생산, 조립, 판매·서비스가 여러 지역에 나뉘어 연결되고 전문 인력·협력 업체·물류·시장 등의 지역 조건과 제도가 단계 배치에 영향을 준다.
    config: {}
    concepts: [global-value-chain, glocalization, spatial-inequality]
  - id: d2
    type: map
    data: /data/03-03/fdi-net-inflows-gdp-map.json
    label: 국가별 외국인 직접 투자 유입 비율
    caption: 국가별 외국인 직접 투자 순유입의 국내총생산 대비 비율, 2024년
    source: u0303-fdi-inflows-gdp-map
    alt: 2024년 국가별 외국인 직접 투자 순유입액이 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [transnational-corporation, spatial-inequality]
  - id: d3
    type: map
    data: /data/03-03/gdp-ppp-per-capita-map.json
    label: 국가별 1인당 국내총생산 분포
    caption: 국가별 1인당 국내총생산, 현재 구매력평가 기준, 2024년
    source: u0303-gdp-ppp-per-capita-map
    alt: 2024년 국가별 1인당 국내총생산을 구매력평가 기준 현재 국제달러로 나타낸 지도다.
    config: { kind: choropleth, unit: '국제달러/명' }
    concepts: [spatial-inequality]
  - id: d4
    type: chart
    data: /data/03-03/gdp-ppp-constant-country-series.json
    label: 국가별 1인당 국내총생산 변화
    caption: 소득 수준이 다른 국가의 1인당 국내총생산 변화, 1990–2024년, 상수 2021년 구매력평가 기준
    source: u0303-gdp-ppp-constant-series
    alt: 미국·독일·대한민국·중국·브라질·인도·말라위의 1인당 국내총생산 변화를 2021년 상수 구매력평가 단위로 비교한 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: '국제달러/명(2021년 기준)' }
    concepts: [spatial-inequality]
  - id: d5
    type: map
    data: /data/03-03/extreme-poverty-latest-map.json
    label: 국가별 극빈율의 최근 관측
    caption: 하루 3.00달러 미만 인구 비율, 2021년 구매력평가 기준, 국가별 최근 관측(2015–2023년)
    source: u0303-extreme-poverty-map
    alt: 국가별 최근 관측 연도에 하루 3.00달러 미만으로 사는 인구의 비율을 색으로 나타낸 지도다. 2021년 구매력평가 기준이며 국가별 관측 연도는 서로 다르다.
    config: { kind: choropleth, unit: '%' }
    concepts: [spatial-inequality]
summary:
  - 스마일 커브는 연구·설계와 브랜드·판매에서 부가가치가 높고 조립·생산에서 낮은 경향을 설명한다.
  - 국가별 1인당 GDP와 극빈율은 세계 경제의 소득 격차를 서로 다른 측면에서 보여 준다.
  - 식민 지배의 유산과 1차 산품 수출 의존은 국가의 산업 구조와 교역 조건에 영향을 준다.
  - 교육·기반 시설 격차와 기술·자본의 집중은 고부가가치 산업의 입지를 좌우한다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 1인당 GDP와 FDI 지도 비교
    instruction: 두 지도는 같은 연도의 국가 자료지만 지표의 분자·분모와 뜻이 다르다. 각 범례를 따로 읽고 분포를 비교한다.
    prompt: 두 지도에서 함께 보이거나 다르게 나타나는 공간 패턴을 찾고, 그 차이를 설명하려면 어떤 생산·소득·제도 자료가 더 필요한지 적으시오.
    fields:
      - { id: gdp, label: 1인당 GDP 지도에서 읽은 분포와 기준 }
      - { id: fdi, label: FDI/GDP 지도에서 읽은 분포와 기준 }
      - { id: compare, label: 두 지도에서 함께 보이거나 다른 공간 패턴 }
      - { id: limits, label: 원인을 설명하는 데 더 필요한 자료 }
keyTerms: [global-value-chain, glocalization, spatial-inequality]
sourceIds: [world-bank-wdi-catalog, world-bank-extreme-poverty-lines-2025, world-bank-wdr-2020-gvc, unctad-state-of-commodity-dependence-2023, unctad-trade-diversification-2018]
---
## 글로벌 가치사슬과 공간적 분업

Global value chain(GVC, 글로벌 가치사슬)은 연구·설계, 부품 생산, 조립, 운송·판매가 여러 기업과 장소에 나뉘어 이어지는 구조다. 전문 인력과 협력업체, 생산 기반, 물류, 소비 시장이 각 단계의 입지에 영향을 준다. 개념도에서 생산 단계와 입지 조건이 어떻게 연결되는지 찾아보자. [[d1]]

Smile curve(스마일 커브)는 연구·설계와 브랜드·판매의 부가가치가 높고, 표준화된 생산·조립에서 낮아지는 경향을 나타낸다. 스마트폰을 예로 들면 제품과 반도체 설계, 브랜드·앱·판매 서비스에는 지식과 소비자 관계가 담긴다. 여러 부품을 결합하는 조립은 생산 단계 가운데 상대적으로 낮은 부가가치를 얻는 경우가 많다.

## 투자와 소득 격차

FDI는 기업과 생산 시설에 국경을 넘어 들어가는 투자 흐름으로, 가치사슬의 공장과 사업망을 형성하는 데 쓰인다. 투자 비율과 1인당 GDP의 공간 분포를 비교하면 자본이 유입되는 지역과 생산 규모가 큰 지역의 관계를 살펴볼 수 있다. 지도에서 두 지표가 함께 높거나 서로 다른 국가를 찾아보자. [[d2]]

선진국과 개발 도상국 사이에는 1인당 생산 규모의 큰 차이가 나타난다. 2024년 구매력평가 기준 1인당 GDP는 미국 약 8만 6,170 국제달러, 중국 약 2만 7,140 국제달러, 인도 약 1만 719 국제달러였다. 지도에서 세 나라의 값을 찾아 국가별 분포를 비교해 보자. [[d3]]

## 소득 변화와 빈곤

국가의 1인당 GDP가 장기간 어떻게 변했는지는 같은 구매력 기준의 시계열로 살펴볼 수 있다. 그래프에서 미국·독일·대한민국과 중국·브라질·인도·말라위의 흐름을 비교해 보자. [[d4]]

빈곤은 소득과 자원이 기본적인 생활을 유지하기에 부족한 상태다. 국제 극빈선인 하루 3.00달러(2021년 구매력평가 기준)는 국가별 물가 차이를 반영해 생활수준을 비교하는 기준이다. 이 선 아래에 사는 인구 비율은 인도 2023년 2.6%, 방글라데시 2022년 5.9%, 남아프리카공화국 2022년 17.4%였다. 국가별 최근 관측 연도를 확인하며 지도에서 세 나라의 극빈율을 비교해 보자. [[d5]]

## 불균등이 만들어지는 구조적 원인

Spatial inequality(공간적 불균등)는 소득·자원·기회가 지역마다 다르게 분포하는 현상이다. 식민 지배를 겪은 일부 국가는 광물·농산물을 항구로 옮기는 수출 구조를 갖게 되었고, 원료를 가공해 완제품을 만드는 산업은 다른 지역에 집중되기도 했다. 1차 산품 수출에 의존하면 국제 가격이 떨어질 때 수출 수입이 줄어 기계·의약품 같은 공산품을 사기 어려워진다. 교육·전력·도로·통신의 격차는 새로운 산업과 기술을 배우는 기회를 제한하고, 자본과 기술이 소수 대도시와 기업에 집중되면 고부가가치 기능도 그곳에 모이기 쉽다.
