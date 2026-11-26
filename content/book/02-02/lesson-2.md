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
산지와 평야, 해안은 이동과 정착, 생업에 서로 다른 조건을 제공한다. 사람들은 길과 주거지를 정하고 물과 토지를 이용하며 그 조건에 적응한다. 다만 지형만으로 한 지역의 생활 방식을 설명할 수는 없다. 기술과 역사, 제도와 개인의 선택도 생활 공간을 함께 만든다.

세계은행 세계개발지표 지도는 2015년 국가별 총인구 가운데 해발 5m 미만 저지대에 거주하는 인구의 비율을 나타낸다. 범례를 확인하고 여러 국가를 비교하면 저지대 인구 비율의 공간적 차이를 읽을 수 있다. 이 비율은 저지대에 사는 사람의 절대 인구수나 국가 안의 특정 도시·마을 분포를 보여 주지는 않는다.

두 번째 지도는 같은 기준 연도의 국가별 전체 면적 가운데 해발 5m 미만 저지대가 차지하는 비율을 보여 준다. 앞 지도는 총인구가 분모이고, 이 지도는 전체 면적이 분모다. 같은 국가의 두 색을 대조해 저지대 면적과 저지대 거주 인구가 같은 뜻이 아님을 확인한다. 지도에 값이 없는 나라는 0으로 바꾸어 읽지 않는다.

저지대에 산다는 사실만으로 침수 위험이나 피해가 정해지는 것은 아니다. 이 자료에는 실제 침수 범위, 방재 시설, 개인별 위치와 대비 수준이 담겨 있지 않다. 또한 기준 연도는 2015년이므로 현재의 인구 분포를 그대로 나타낸다고 볼 수 없다. 지형과 생활의 관계를 설명할 때에는 국가 평균을 지역의 모든 주민에게 일반화하지 말고 다른 자료를 함께 살펴야 한다.
