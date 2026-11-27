---
title: 지구촌의 공간적 불균등은 왜 만들어질까?
goal: 글로벌 가치사슬과 소득·빈곤 자료를 연결해 공간적 불균등의 분포와 여러 구조적 조건을 설명할 수 있다.
opener: 세계 경제와 연결된 지역은 모두 비슷한 기회와 몫을 얻을까? 생산 기능의 위치와 소득 자료를 살펴보며 차이가 생기는 조건을 생각해 보자.
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
  - 글로벌 가치사슬의 단계와 입지는 지역의 기술·인력·기반 시설·시장 조건에 따라 달라진다.
  - 1인당 GDP와 극빈율은 국가 사이 경제 격차의 서로 다른 측면을 보여 준다.
  - 역사적 산업·수출 구조, 교역 조건, 기술과 제도는 공간적 불균등에 함께 작용한다.
  - 국가 지도와 평균값은 분포의 출발점이며 원인을 설명하려면 생산·소득·지역 자료를 연결해야 한다.
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

글로벌 가치사슬은 연구·설계에서 부품 생산과 조립, 판매·서비스까지의 기능이 여러 장소에 이어진 구조다. 각 단계는 전문 인력, 협력 업체, 생산 기반, 물류, 소비 시장 등 지역 조건과 연결된다. 지역은 세계적 흐름을 그대로 받아들이기보다 자신의 시장·문화·제도에 맞춰 활동을 조정한다. 개념도에서 단계와 입지 조건의 관계를 살펴보자. [[d1]]

가치사슬 단계마다 만들어지는 부가가치의 크기는 다를 수 있다. 연구·설계나 브랜드·마케팅처럼 지식과 서비스가 중요한 단계에 높은 부가가치가 나타나고, 표준화된 제조·조립에 낮게 나타나는 경향을 smile curve(스마일 커브)로 설명한다. 이 관계는 모든 산업에 똑같이 적용되는 비율이 아니며 기술과 기업·지역의 협상 조건에 따라 달라진다.

일부 가치사슬에서는 고소득 국가에 본사·연구·설계가, 개발 도상국에 부품 생산·조립이 놓인다. 생산 지역에는 일자리와 기술 학습 기회가 생길 수 있다. 기업이 생산지를 옮기면 지역 일자리가 줄 수 있고, 이익이 본사에 집중되면 생산 지역의 몫이 작아질 수 있다. 기능 배치와 이익 분배는 산업·정책·협상 조건에 따라 달라진다.

## 투자 흐름과 소득 수준

Foreign direct investment(FDI, 외국인 직접 투자) 순유입률은 국내총생산에 견준 투자 흐름을 나타낸다. 국가별 지도를 GDP per capita(1인당 국내총생산) 분포와 비교해 투자와 소득의 공간 패턴이 어디서 함께 나타나거나 달라지는지 찾아보자. 두 지표로 가치사슬의 생산 단계나 이익 배분을 설명하려면 기업·산업 자료도 함께 살펴야 한다. [[d2]]

GDP per capita(1인당 국내총생산)는 한 나라의 생산액을 인구로 나눈 평균값이다. purchasing power parity(PPP, 구매력평가)는 국가 사이 물가 수준 차이를 고려해 2024년의 상대적 생산 규모를 비교하도록 돕는다. 이 값은 가구 소득의 분포와 같지 않으므로 국가 안의 소득 격차는 별도 자료로 확인한다. [[d3]]

## 소득 변화와 빈곤의 공간 분포

국가 사이 소득 변화는 같은 가격 기준을 적용한 시계열로 살펴볼 수 있다. 미국·독일·대한민국과 중국·브라질·인도·말라위의 선을 비교하며 1990년부터 2024년까지의 흐름을 읽자. 2021년 상수 국제달러 단위가 유지되는지도 확인한다. 현재 PPP 지도와 상수 PPP 시계열은 비교 목적이 다르다. [[d4]]

극빈율은 정한 국제 빈곤선보다 낮은 소득으로 사는 인구의 비율이다. 2021년 구매력평가 기준 하루 3.00달러 미만 인구의 국가별 최근값은 2015년부터 2023년 사이에 관측되었다. 국가마다 기준 연도가 다르므로 연도를 함께 확인하며 GDP 지도와 패턴을 비교하자. [[d5]]

## 불균등의 구조적 원인

Spatial inequality(공간적 불균등)는 소득·자원·기회 등이 장소마다 고르게 분포하지 않는 상태다. 역사적으로 형성된 산업·수출 구조와 원자재 교역 조건, 기술·교육·기반 시설의 차이, 제도와 협상력 등이 서로 작용한다. 생산이 늘어 일자리가 생겨도 가치와 결정 권한이 다르게 배분되면 지역 사이 격차가 이어질 수 있다. 원인을 설명할 때는 국가 통계와 기업·산업·지역 자료를 함께 살펴본다.
