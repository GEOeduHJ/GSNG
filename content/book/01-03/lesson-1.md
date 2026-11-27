---
title: '지리정보기술은 무엇일까?'
goal: 지리 정보의 공간 정보와 속성 정보를 구분하고, 원격 탐사·GNSS·GIS의 자료 수집과 분석 원리를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-03/populated-places-top32.geojson
    source: u0103-populated-places-top32
    caption: Natural Earth POP_MAX 상위 32개 세계 도시의 점 위치와 속성
    alt: POP_MAX 상위 32개 세계 도시의 위치를 점으로 나타내고 도시명과 국가, 인구 속성을 연결한 지도다.
    config: { kind: points }
    concepts: [spatial-data, geospatial-technology]
  - id: s3
    type: chart
    data: /data/01-03/populated-places-top10.json
    source: u0103-populated-places-top10
    caption: Natural Earth POP_MAX 상위 10개 도시의 인구 속성, 기준 연도 미표기
    alt: POP_MAX 상위 10개 도시의 인구 속성값을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [spatial-data]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [spatial-data, geospatial-technology, geographic-information-system]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 공간 정보와 속성 정보 분류
    instruction: 지도와 막대그래프에서 각 항목이 위치·분포를 나타내는지, 장소의 특성을 나타내는지 확인한다.
    prompt: 각 자료 항목을 공간 정보 또는 속성 정보로 분류하고, 위치와 속성이 어떻게 연결되는지 설명하시오.
    items:
      - { id: city-point, text: 지도에 찍힌 도쿄도의 위치 }
      - { id: coordinates, text: 도시 점에 연결된 위도와 경도 좌표 }
      - { id: name-country, text: 도시 이름과 국가 표시명 }
      - { id: pop-max, text: 도쿄도의 POP_MAX 인구 추정값 }
    categories:
      - { id: spatial, label: 공간 정보 }
      - { id: attribute, label: 속성 정보 }
sourceIds: [natural-earth-populated-places, usgs-remote-sensing, unoosa-gnss, usgs-geographic-information-system]
illustration:
  src: /images/01-03/geographic-data-layers.webp
  alt: 위성 관측, 드론 촬영, 현장 측정이 같은 나무에 관한 서로 다른 정보층을 더한다.
---
지리 정보는 장소의 위치와 그곳의 특징, 장소 사이 관계를 함께 나타낸다. spatial data(공간자료)는 지명이나 좌표를 공간 분포·관계와 연결해 기록한 자료다. 도시 이름과 인구는 위치에 붙는 속성 정보다.

오른쪽 점 지도는 Natural Earth의 POP_MAX 값이 큰 세계 도시 32곳을 보여 준다. 먼저 범례와 점의 위치를 살핀다. 도시명과 국가명, 인구 속성을 위치와 구분해 읽는다. 도시별 정의와 기준 시점이 다르므로 POP_MAX는 Natural Earth에 기록된 추정값으로 읽는다.

POP_MAX 상위 10개 막대그래프에서 도쿄도는 35,676,000명, 뉴욕은 19,040,000명, 멕시코시티는 19,028,000명이다. 도시 이름과 막대 길이를 함께 확인해 속성값의 차이를 읽는다.

remote sensing(원격 탐사)은 위성이나 항공기의 센서가 먼 거리에서 지표가 반사하거나 방출하는 에너지를 측정하는 방법이다. 영상은 넓은 지역의 표면 특징을 담는다. global navigation satellite system(전 지구 위성항법시스템, GNSS)은 위성 신호를 받은 기기가 신호 도달 시간을 바탕으로 위치를 계산하도록 한다. GPS는 여러 GNSS 가운데 하나다.

geographic information system(지리정보시스템, GIS)은 위치가 있는 자료를 저장·분석해 지도나 표로 나타내는 컴퓨터 기반 체계다. 여러 자료를 겹치면 분포와 공간 관계를 비교할 수 있다. 분류 활동에서 점의 좌표와 상대 위치는 공간 정보, 도시명·국가명·POP_MAX는 속성 정보로 정리한다.
