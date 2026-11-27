---
title: 세계의 인구는 어디에 많이 분포할까?
goal: 인구 밀도와 총인구, 대륙별 인구 비중을 구분하고 여러 조건이 세계 인구 분포를 만드는 과정을 자료에 근거해 설명할 수 있다.
opener: 우리나라에서 사람들이 많이 모여 사는 곳은 어디일까? 세계 지도에서 사람들이 모여 사는 곳과 거의 살지 않는 곳에는 어떤 공통점이 있을지 생각해 보자.
textbookRef: { pages: [126, 127] }
steps:
  - id: d1
    type: map
    data: /data/03-01/population-density-map-2024.json
    label: 국가별 인구 밀도
    caption: 국가별 인구 밀도, 2024년
    source: u0301-population-density
    alt: 2024년 국가별 단위 면적당 인구 밀도를 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '명/km²' }
    concepts: [population-distribution]
  - id: d2
    type: chart
    data: /data/03-01/continent-population-share-wpp2024-1950-2100.json
    label: 대륙별 인구 비중과 전망
    caption: 대륙별 세계 인구 비중, 1950–2023년 추계·2024–2100년 중위 전망
    source: u0301-wpp-continent-share
    alt: 1950년부터 2023년까지의 추계와 2024년부터 2100년까지의 중위 전망으로 대륙별 세계 인구 비중을 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2100, projectionFrom: 2024, unit: '%' }
    concepts: [population-distribution]
  - id: d3
    type: chart
    data: /data/03-01/population-top10-2024.json
    label: 인구 상위 국가
    caption: 인구 상위 10개국, 2024년
    source: u0301-population-top10
    alt: 2024년 총인구가 많은 국가의 순위를 막대로 비교한 그래프다.
    config: { kind: bar, unit: '명' }
    concepts: [population-distribution]
summary:
  - 인구는 기후·지형 같은 자연환경과 농업 생산력·산업·교통 같은 사회·경제적 조건의 영향을 받아 고르지 않게 분포한다.
  - 계절풍 아시아와 서부 유럽·북아메리카 동부에는 인구가 밀집하고, 극지방·사막·높은 산지에는 인구가 희박하다.
  - 인구 밀도는 면적에 견준 인구이고, 총인구는 한 나라 인구의 전체 규모다.
routines:
  opener: { id: see-think-wonder, prompt: "국가별 인구 밀도 자료에서 인구가 집중되거나 희박한 지역을 살피고, 분포의 까닭에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: what-makes-you-say-that, prompt: "인구 밀집·희박 지역을 기후·지형·산업·교통 조건과 연결해 설명하고, 판단 근거를 자료에서 찾아보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 인구 분포를 세 지표로 비교하기
    instruction: 인구 밀도 지도, 대륙별 인구 비중 그래프, 인구 상위 국가 그래프의 범위와 단위를 확인한다.
    prompt: 세 자료가 각각 답하는 질문을 구분하고, 같은 나라의 총인구와 밀도 자료를 대조해 인구 분포를 설명하시오.
    fields:
      - { id: density, label: 국가별 인구 밀도에서 찾은 분포 }
      - { id: continent, label: 대륙별 인구 비중에서 찾은 변화 }
      - { id: total, label: 총인구 순위에서 찾은 국가 }
      - { id: limits, label: 세 지표로 설명하기 어려운 지역 차이 }
keyTerms: [population-distribution]
sourceIds: [undesa-population-distribution, national-geographic-geography-standard-16, undesa-wpp2024-population]
---
## 인구 분포에 영향을 주는 요인

인구 분포는 사람들이 지표 위에 어떻게 흩어져 사는지를 말한다. 사람들은 먼저 살기 좋은 자연환경을 찾아 모였다. 기후가 온화하고 물을 얻기 쉬운 평야와 해안, 큰 강 유역에는 일찍부터 마을과 도시가 들어섰다. 너무 춥거나 건조한 곳, 높은 산지는 사람이 살기 어렵다.

사회·경제적 조건도 인구 분포를 바꾼다. 같은 열대 지역이라도 계절풍이 비를 가져와 벼농사가 활발한 곳은 많은 사람을 먹여 살릴 수 있다. 공업과 서비스업이 발달한 곳에는 일자리를 찾아 사람들이 모여든다. 교통과 기술이 발달하면서 자연환경의 제약은 점차 줄어들고 있다.

인구 밀도는 1km²의 면적에 사는 사람 수로, 인구가 얼마나 빽빽하게 모여 사는지 나타낸다. 2024년 대한민국은 약 530명/km², 인도는 약 488명/km²이고, 미국은 약 37명/km²다. 지도에서 인구 밀도가 높은 지역과 낮은 지역을 찾아보자. [[d1]]

## 세계의 인구 밀집 지역과 희박 지역

인구가 많이 모인 곳은 농업에 유리하거나 산업이 발달한 지역이다. 동아시아와 남아시아는 계절풍 기후 아래 벼농사가 발달해 오래전부터 인구가 많았다. 서부 유럽과 북아메리카 동부는 산업화와 도시 발달로 인구가 모였다. 극지방과 그 주변, 사막, 높은 산지, 교통이 불편한 내륙 오지는 인구가 희박하다.

세계 인구를 대륙별로 나누면 아시아의 비중이 가장 크다. 2024년 세계 인구에서 아시아는 58.9%, 아프리카는 18.6%, 유럽은 9.1%를 차지한다. 선 그래프에서 1950년 이후 비중이 커진 대륙과 줄어든 대륙을 찾아보자. 2024년 이후 구간은 중위 전망이다. [[d2]]

## 인구 규모가 큰 국가

총인구는 한 나라에 사는 사람의 전체 수다. 총인구가 많은 나라가 반드시 인구 밀도도 높은 것은 아니다. 국토가 넓으면 많은 인구가 넓은 땅에 흩어져 살 수 있기 때문이다. 2024년 총인구 상위 국가 그래프에서 인도와 중국이 가장 앞선다. 두 나라와 미국의 순위를 확인한 뒤, 인구 밀도 지도에서 세 나라를 다시 찾아 총인구와 인구 밀도를 비교해 보자. [[d3]]
