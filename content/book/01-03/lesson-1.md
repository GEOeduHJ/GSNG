---
title: '지리정보기술은 무엇일까?'
goal: 지리 정보를 공간 정보와 속성 정보로 구분하고 원격 탐사·GNSS·GIS와 위치 기반 서비스가 자료를 수집·분석·활용하는 원리를 설명할 수 있다.
opener: 지도 앱은 내 위치와 주변 장소를 어떻게 한 화면에 연결할까? 지도에 보이는 점과 이름, 장소의 특징이 어떤 정보인지 생각해 보자.
textbookRef: { pages: [34, 35] }
steps:
  - id: d1
    type: map
    data: /data/01-03/populated-places-top32.geojson
    label: 세계 도시 위치
    caption: Natural Earth POP_MAX 상위 도시의 점 위치와 인구 속성
    source: u0103-populated-places-top32
    alt: 세계 주요 도시를 점으로 나타내고 도시명·국가·인구 추정값을 연결한 지도다.
    config: { kind: points, unit: '명' }
    concepts: [spatial-data, geospatial-technology]
  - id: d2
    type: chart
    data: /data/01-03/populated-places-top10.json
    label: 도시 인구 속성값
    caption: Natural Earth POP_MAX 상위 10개 도시의 인구 추정값, 기준 연도 미표기
    source: u0103-populated-places-top10
    alt: 도시 이름별 POP_MAX 인구 추정값의 크기를 비교한 막대그래프다.
    config: { kind: bar, unit: '명' }
    concepts: [spatial-data]
  - id: d3
    type: map
    data: /data/01-03/world-major-airports.geojson
    label: 세계 공항 위치
    caption: Natural Earth 공항의 위치와 분류
    source: u0103-natural-earth-airports
    alt: 세계 공항의 위치를 점으로 나타내고 주요 공항과 중간 규모 공항을 구분한 지도다.
    config: { kind: points, unit: '곳' }
    concepts: [spatial-data, geospatial-technology]
  - id: d4
    type: image
    schematic: true
    data: /images/01-03/geospatial-technology-flow.svg
    label: 지리정보기술의 자료 흐름
    caption: 원격 탐사·위성항법·지리정보시스템의 역할
    source: ''
    alt: 원격 탐사는 센서로 지표를 관측하고 위성항법은 위치를 계산하며 지리정보시스템은 위치·속성 자료를 결합해 분석한다.
    config: {}
    concepts: [geospatial-technology, geographic-information-system]
summary:
  - 지리 정보는 장소의 위치·형태를 나타내는 공간 정보와 그 장소의 특성을 설명하는 속성 정보로 이루어진다.
  - 원격 탐사와 GNSS는 지리 정보의 관측·위치 파악에 쓰이고 GIS는 위치에 연결된 자료를 저장·분석·표현한다.
  - 위치 기반 서비스는 사람이나 사물의 위치를 지도·경로·시설 정보와 연결해 필요한 정보를 제공한다.
  - 디지털 트윈과 GeoAI는 공간 자료를 시각화하고 도시의 조건과 대안을 살피는 데 활용된다.
routines:
  opener: { id: see-think-wonder, prompt: "지리정보기술의 자료 흐름 자료에서 수집·분석·표현의 관계를 살피고, 더 알고 싶은 점을 적어 보자." }
  inquiry: { id: parts-purposes-complexities, prompt: "원격 탐사·GNSS·GIS가 자료를 모으고 분석하는 역할을 나누어, 각 기술의 쓰임과 복잡한 점을 살펴보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 공간 정보와 지리정보기술의 역할 분류
    instruction: 도시와 공항 자료, 지리정보기술 개념도를 살펴보고 각 항목이 나타내는 정보나 기술의 역할을 구분한다.
    prompt: 각 항목을 공간 정보, 속성 정보, 원격 관측, 위치 계산, 자료 분석 가운데 알맞은 범주에 놓고 자료 사이의 연결을 설명하시오.
    items:
      - { id: city-position, text: 도시 점의 좌표와 지도 위 위치 }
      - { id: city-attribute, text: 도시명·국가명·POP_MAX 인구 추정값 }
      - { id: remote-sensing, text: 위성·항공 센서가 떨어진 곳에서 지표 에너지를 측정하는 과정 }
      - { id: gnss, text: 수신기가 위성 신호로 지상 위치를 계산하는 과정 }
      - { id: gis, text: 위치 정보와 속성 정보를 겹쳐 공간 관계를 살피는 과정 }
    categories:
      - { id: spatial, label: 공간 정보 }
      - { id: attribute, label: 속성 정보 }
      - { id: observe, label: 원격 관측 }
      - { id: position, label: 위치 계산 }
      - { id: analyze, label: 자료 분석 }
keyTerms: [spatial-data, geospatial-technology, geographic-information-system]
sourceIds: [natural-earth-populated-places, natural-earth-airports, usgs-remote-sensing, unoosa-gnss, usgs-geographic-information-system, nasa-ar-vr, jtc-punggol-digital-twin, usgs-geoai-glossary]
illustration:
  src: /images/01-03/geographic-data-layers.webp
  alt: 위성 관측, 드론 촬영, 현장 측정이 같은 나무에 관한 서로 다른 정보층을 더한다.
---
## 지리 정보의 구성과 표현

지리 정보는 특정 장소의 위치와 형태, 그곳의 자연·인문 현상을 연결해 나타낸 정보다. 공간 정보는 위치와 형태를 점·선·면으로 표현하고, 속성 정보는 기후·지형·교통·산업처럼 장소를 설명하는 특징을 담는다. 지도는 두 정보를 기호와 이름으로 함께 보여 주며 표와 그래프는 값의 차이를 비교하도록 돕는다.

도시 점의 좌표와 분포는 공간 정보이고 도시명·국가명·인구 추정값은 속성 정보다. Natural Earth의 POP_MAX에서 도쿄도는 35,676,000명, 뉴욕은 19,040,000명, 멕시코시티는 19,028,000명이다. 도시의 경계 정의와 인구 기준 시점이 같지 않으므로 이 값은 동시점 인구 조사 순위와 구분해 읽는다. 지도에서 위치를 살피고 막대그래프에서 속성값의 차이를 확인해 보자. [[d1]] [[d2]]

공항 위치 자료에도 좌표와 이름, 분류 같은 속성이 연결된다. 위치를 나타내는 점에 공항 분류를 더하면 세계의 주요 교통 시설이 어느 지역에 놓여 있는지 살필 수 있다. 도시 위치 자료와 공항 위치 자료를 번갈아 보고 공간 정보와 속성 정보가 어떻게 한 장소에 결합하는지 확인해 보자. [[d3]]

## 지리정보기술의 자료 수집과 분석

remote sensing(원격 탐사)은 위성·항공기 센서가 대상과 직접 닿지 않고 반사되거나 방출되는 에너지를 측정해 지표의 특징을 알아보는 방법이다. Global Navigation Satellite Systems(GNSS, 전 지구 위성항법시스템)는 위성 신호를 받은 수신기가 지상 위치를 계산하도록 한다. GPS는 여러 GNSS 가운데 하나다. Geographic Information System(GIS, 지리정보시스템)은 위치가 연결된 자료를 저장하고 겹쳐 분석해 지도와 표로 표현하는 체계다. 세 기술이 관측·위치 파악·분석에서 맡는 역할을 개념도에서 비교해 보자. [[d4]]

Location-based service(위치 기반 서비스)는 GNSS로 파악한 위치를 도로·정류장·시설·교통 정보와 연결해 현재 장소에 필요한 정보를 제공한다. Augmented Reality(AR, 증강 현실)는 실제 화면에 위치와 관련된 가상 정보를 겹쳐 보여 주고, Virtual Reality(VR, 가상 현실)는 가상 환경을 체험하며 상황을 연습하도록 돕는다. digital twin(디지털 트윈)은 실제 공간의 건물·도로와 관측 자료를 가상 공간에 연결해 변화의 영향을 살피는 모형이다. 싱가포르 퐁골 디지털 지구에서는 센서 자료와 도시 공간 정보를 디지털 트윈에 연결해 현황을 시각화하고 시뮬레이션에 활용한다. Internet of Things(IoT, 사물 인터넷) 기기의 센서가 공간 자료를 더하고, GeoAI(지리정보 인공지능)는 인공지능을 이용해 지리 정보를 분석한다.
