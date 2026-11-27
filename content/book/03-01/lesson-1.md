---
title: 세계의 인구는 어디에 많이 분포할까?
goal: 인구 밀도와 총인구의 차이를 구분하고 자연적·인문적 조건이 인구 분포와 맺는 관계를 자료를 바탕으로 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-01/population-density-map-2024.json
    source: u0301-population-density
    caption: 국가별 인구 밀도, 2024년
    alt: 2024년 국가별 1제곱킬로미터의 육지 면적에 사는 인구수를 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [population-distribution]
  - id: s3
    type: chart
    data: /data/03-01/population-top10-2024.json
    source: u0301-population-top10
    caption: 인구 상위 10개국, 2024년
    alt: 2024년 총인구가 많은 10개 국가의 인구를 막대로 비교한 그래프다.
    config: { kind: bar }
    concepts: [population-distribution]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [population-distribution]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 인구 밀도 지도와 총인구 막대그래프 비교
    instruction: 두 자료의 기준 연도와 단위를 확인하고, 같은 국가의 색 구간과 총인구 막대를 대조한다.
    prompt: 두 자료에서 확인한 공통점과 차이를 정리하고, 국가 단위 자료만으로 알기 어려운 지역 안의 차이를 적으시오.
    fields:
      - { id: density, label: 인구 밀도 지도에서 확인한 분포 }
      - { id: total, label: 인구 상위국 막대그래프에서 확인한 순위 }
      - { id: compare, label: 총인구와 인구 밀도가 함께 보이거나 다른 점 }
      - { id: limits, label: 국가 단위 자료만으로 알기 어려운 점 }
sourceIds: [undesa-population-distribution, national-geographic-geography-standard-16]
---
인구 분포는 사람들이 지표의 어디에 얼마나 모여 사는지를 나타낸다. 인구 밀집과 희박한 분포에는 기후·물·지형·토양 같은 자연 조건과 일자리·산업·교통·사회 기반 시설·역사·정책 등 여러 인문 조건이 함께 작용한다. 이 조건들이 사람들의 정착 양상을 지역마다 다르게 만든다.

인구 밀도 지도는 2024년 국가별 육지 면적 1제곱킬로미터당 인구를 보여 준다. 범례를 확인한 뒤 대한민국과 인도, 미국의 색 구간을 비교한다. 지도는 국가별 평균 밀도를 나타낸다. 도시와 상대적으로 인구가 드문 지역의 차이는 지역 자료를 더해 살펴본다.

인구 상위 10개국 그래프에서 2024년 인도와 중국이 가장 많은 총인구를 보이고, 미국도 상위 10개국에 든다. 막대 길이는 국가별 총인구를 나타낸다. 총인구와 육지 면적당 인구를 나란히 비교하면 두 지표의 차이가 드러난다.

총인구가 비슷한 두 나라도 면적이 다르면 인구 밀도가 달라진다. 넓은 나라에서는 인구가 일부 지역에 집중되어도 국가 평균 밀도가 낮을 수 있다. 지도에서 비슷한 색은 국가 평균 밀도가 비슷한 구간임을 뜻한다. 나라 안의 인구 분포는 지역 단위 자료로 살펴본다.

자연 조건은 정착과 생업에 기회를 주거나 어려움을 만들 수 있다. 기술과 경제 활동, 교통·서비스, 역사적 선택도 사람과 환경의 관계를 바꾼다. 세계 지도와 상위국 그래프는 국가 간 차이를 살피는 출발점이다. 도시·농촌과 지역별 차이, 그 배경은 더 세밀한 자료를 덧붙여 설명한다.
