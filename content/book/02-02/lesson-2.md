---
title: 땅 위에서 사람들은 어떻게 살아갈까?
goal: 저지대 거주 인구와 저지대 면적 자료를 비교하고 지형과 생활의 관계 및 자료의 한계를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-02/low-elevation-population-map.json
    source: u0202-wdi-low-elevation-population
    caption: 국가별 총인구 중 해발 5m 미만 저지대 거주 인구 비율, 2015년
    alt: 국가별 총인구 가운데 해발 5m 미만 저지대에 거주하는 인구의 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [landform, human-environment-interaction]
  - id: s3
    type: map
    data: /data/02-02/low-elevation-land-area-map.json
    source: u0202-wdi-low-elevation-land-area
    caption: 국가별 전체 면적 중 해발 5m 미만 저지대 면적 비율, 2015년
    alt: 국가별 전체 면적 가운데 해발 5m 미만 저지대가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [landform, human-environment-interaction]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
keyTerms: [landform, human-environment-interaction]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 저지대 면적과 거주 인구 비교
    instruction: 두 지도의 기준 연도와 해발 기준을 확인한 뒤, 같은 나라에서 인구 비율과 면적 비율을 대조한다.
    prompt: 두 지표가 비슷하거나 다른 사례를 찾아 기록하고, 국가 단위 비율만으로 알 수 없는 점도 적으시오.
    fields:
      - { id: population, label: 총인구 중 저지대 거주 인구 비율 }
      - { id: land, label: 전체 면적 중 저지대 면적 비율 }
      - { id: compare, label: 두 비율에서 함께 보이거나 다른 점 }
      - { id: limit, label: 두 지도만으로 알 수 없는 생활·위험 정보 }
sourceIds: [nps-landforms]
---
산지·평야·해안은 이동·정착·생업에 서로 다른 조건을 제공한다. 사람들은 그 조건에 맞춰 길과 주거지를 정하고 물과 토지를 이용한다. 생활 공간은 지형과 함께 기술·역사·제도·개인의 선택이 빚는다.

세계은행 세계개발지표 지도는 2015년 각 나라 총인구에서 해발 5m 미만 저지대에 사는 인구가 차지하는 비율을 나타낸다. 범례를 먼저 읽고 여러 나라의 색을 비교해 저지대 거주 비율의 차이를 살펴보자. 인구수와 나라 안의 도시·마을 분포는 관련 자료를 더해 확인한다.

두 번째 지도는 같은 해 각 나라 전체 면적 중 해발 5m 미만인 저지대 면적의 비율을 보여 준다. 첫 지도는 총인구, 둘째 지도는 전체 면적을 기준으로 한다. 같은 나라를 두 지도에서 찾아 색을 대조하고, 두 비율이 어떻게 다른지 살펴보자. ‘자료 없음’ 표시는 0%와 구별한다.

저지대 거주 비율은 지형 조건을 보여 주며, 침수 위험은 방재 시설과 실제 침수 범위까지 살펴야 설명할 수 있다. 2015년 국가 평균은 오늘날의 지역별 분포와 다를 수 있다. 지역의 생활이나 피해를 설명할 때에는 최신 지역 자료와 주민 경험을 함께 확인한다.
