---
title: 지구촌의 공간적 불균등은 왜 만들어질까?
goal: 1인당 국내총생산·극빈율·FDI 자료를 비교하고 공간적 불균등의 여러 구조적 조건과 자료의 한계를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-03/fdi-net-inflows-gdp-map.json
    source: u0303-fdi-inflows-gdp-map
    caption: 국가별 외국인 직접 투자 순유입의 국내총생산 대비 비율, 2024년
    alt: 국가별 외국인 직접 투자 순유입액이 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [spatial-inequality, transnational-corporation]
  - id: s3
    type: map
    data: /data/03-03/gdp-ppp-per-capita-map.json
    source: u0303-gdp-ppp-per-capita-map
    caption: 국가별 1인당 국내총생산, 구매력평가 기준, 2024년
    alt: 2024년 국가별 1인당 국내총생산을 구매력평가 기준 현재 국제달러로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [spatial-inequality]
  - id: s4
    type: chart
    data: /data/03-03/gdp-ppp-constant-country-series.json
    source: u0303-gdp-ppp-constant-series
    caption: 소득 수준이 다른 7개국의 1인당 국내총생산 변화, 상수 2021년 구매력평가 기준, 1990–2024년
    alt: 미국·독일·대한민국·중국·브라질·인도·말라위의 1인당 국내총생산 변화를 같은 상수 구매력평가 단위로 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [spatial-inequality, glocalization]
  - id: s5
    type: map
    data: /data/03-03/extreme-poverty-latest-map.json
    source: u0303-extreme-poverty-map
    caption: 국가별 하루 3.00달러 미만 인구 비율, 2021년 구매력평가 기준, 국가별 최근 관측(2015–2023년)
    alt: 국가별 최근 관측 연도에 하루 3.00달러 미만으로 사는 인구의 비율을 색으로 나타낸 지도다. 2021년 구매력평가 기준이며 국가별 관측 연도는 서로 다르다.
    config: { kind: choropleth }
    concepts: [spatial-inequality]
  - { id: s6, type: text, caption: '', source: '', alt: '' }
keyTerms: [spatial-inequality, global-value-chain, glocalization]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 1인당 국내총생산과 FDI 지도 비교
    instruction: 두 지도는 모두 2024년 자료지만 단위와 뜻이 다르다. 각 범례를 따로 확인한 뒤 공간적 분포를 비교한다.
    prompt: 두 지도에서 분포가 함께 나타나거나 달라지는 사례를 찾고, 그 차이를 설명하려면 어떤 생산·소득·제도 자료가 더 필요한지 적으시오.
    fields:
      - { id: gdp, label: 1인당 국내총생산 지도에서 읽은 분포와 기준 }
      - { id: fdi, label: FDI/국내총생산 지도에서 읽은 분포와 기준 }
      - { id: compare, label: 두 지도에서 함께 보이거나 다른 공간 패턴 }
      - { id: limits, label: 원인을 설명하는 데 더 필요한 자료 }
sourceIds: [world-bank-wdi-catalog, world-bank-extreme-poverty-lines-2025, world-bank-wdr-2020-gvc, unctad-state-of-commodity-dependence-2023, unctad-trade-diversification-2018]
---
spatial inequality(공간적 불균등)는 소득과 자원, 일자리와 기회가 장소마다 고르게 분포하지 않는 상태다. 지도는 국가 사이의 분포를 비교하는 출발점이다. 한 국가 안의 지역·가구별 소득과 자원 접근은 세부 자료를 함께 읽어 살펴본다.

먼저 FDI 지도에서 외국인 직접 투자 순유입액이 국내총생산에서 차지하는 비율을 살펴본다. 이어 1인당 국내총생산 지도에서 구매력평가 기준의 국가별 값을 읽는다. 두 지도는 같은 2024년 자료지만, FDI는 경제 규모 대비 투자 흐름이고 1인당 국내총생산은 인구 한 사람당 국내총생산의 평균값이다. 각 범례를 따로 확인해 공간 분포를 비교하고, 차이를 설명할 때는 생산·소득·제도 자료를 더한다.

1인당 GDP는 국내총생산을 인구로 나눈 평균이다. purchasing power parity(구매력평가, PPP) 기준의 현재 국제달러는 국가 간 물가 차이를 고려한 2024년 비교에 쓰인다. 개인의 실제 소득과 한 국가 안의 소득 분포는 가구·지역별 자료를 함께 살펴본다.

상수 PPP 시계열에서는 미국·독일·대한민국·중국·브라질·인도·말라위의 변화를 같은 기준으로 살펴본다. 그래프는 2021년 국제달러 기준을 유지해 1990년부터 2024년까지의 흐름을 비교한다. 지도는 2024년 현재 PPP 기준의 국가 간 값을 비교하고, 시계열은 상수 PPP 기준의 변화를 보여 준다. 선택된 7개국은 비교 사례이며, 세계의 흐름을 살피려면 더 많은 국가 자료를 함께 본다.

극빈율 지도는 하루 3.00달러(2021 PPP) 미만으로 사는 인구의 비율을 국가별 최근 관측값으로 나타낸다. 관측 연도는 국가마다 다르며 2015년부터 2023년 사이에 놓여 있다. 색을 비교할 때 각 국가의 관측 연도를 함께 확인한다. 2017 PPP 기준의 과거 자료와 장기 흐름을 비교하려면 같은 기준을 적용한 시계열을 살펴본다.

이 지도는 불균등이 어디에 나타나는지 보여 준다. 원인을 설명할 때에는 역사적으로 형성된 산업·수출 구조, 교역 조건, 기술·교육·기반 시설, 제도적 조건을 함께 살펴본다. 원자재 수출 의존도와 세계 가치사슬 참여 방식에 따라 위험과 이익이 달라질 수 있다. 가치사슬의 이익이 국가 사이와 한 국가 안에서 어떻게 나뉘는지도 추가 자료로 확인한다.
