---
title: '지리적 문제를 어떻게 탐색하고 해결할 수 있을까?'
goal: 공간 자료를 모으고 분석해 문제 해결 대안을 비교하며 필요한 추가 정보와 지역의 의견을 함께 고려할 수 있다.
opener: 새 대피 장소나 공공 시설을 마련할 때 지도에서 어떤 조건을 함께 살펴야 할까? 위치가 가까워 보이는 곳이 실제로도 편리하고 안전한지 생각해 보자.
textbookRef: { pages: [38, 39] }
steps:
  - id: d1
    type: map
    data: /data/01-03/daejeon-seogu-earthquake-shelters.geojson
    label: 대전 서구 대피 장소
    caption: 대전광역시 서구 지진 옥외 대피장소 위치, 2026년 1월 21일 기준
    source: u0103-daejeon-seogu-shelters
    alt: 대전광역시 서구의 지진 옥외 대피장소 위치와 시설 유형을 점으로 나타낸 지도다.
    config: { kind: points, unit: '곳' }
    concepts: [spatial-data, geographic-information-system, spatial-decision-making]
  - id: d2
    type: map
    data: /data/01-03/daejeon-seogu-bus-stops.geojson
    label: 대전 서구 버스 정류장
    caption: 대전광역시 서구 버스 정류장 위치와 안내 단말기 표시, 기준 자료 2025년 4월 24일
    source: u0103-daejeon-seogu-bus-stops
    alt: 대전광역시 서구 버스 정류장의 위치와 버스 안내 단말기 설치 여부를 점으로 나타낸 지도다.
    config: { kind: points, unit: '곳' }
    concepts: [spatial-data, geographic-information-system, spatial-decision-making]
  - id: d3
    type: chart
    data: /data/01-03/daejeon-seogu-shelters-by-type.json
    label: 대피 장소 유형별 수
    caption: 대전광역시 서구 지진 옥외 대피장소의 유형별 수, 2026년 1월 21일 기준
    source: u0103-daejeon-seogu-shelters-by-type
    alt: 학교 운동장·옥외 주차장·공원으로 분류한 대피 장소 수를 비교한 막대그래프다.
    config: { kind: bar, unit: '곳' }
    concepts: [spatial-data, spatial-decision-making]
  - id: d4
    type: image
    schematic: true
    data: /images/01-03/spatial-decision-workflow.svg
    label: 공간적 의사 결정 절차
    caption: 문제를 정하고 자료·기준·지역 의견을 검토하는 과정
    source: ''
    alt: 공간 문제를 정하고 위치·속성 자료를 분석한 뒤 대안과 기준을 검토해 결정하고 결과를 살피는 과정이다.
    config: {}
    concepts: [geographic-information-system, spatial-decision-making]
summary:
  - 지리적 문제를 탐색할 때는 문제의 범위와 필요한 위치·속성 자료를 먼저 정한다.
  - GIS는 서로 다른 공간 자료를 겹쳐 분포와 관계를 살피도록 돕는다.
  - 공공 시설 입지를 판단하려면 위치뿐 아니라 접근성·인구·위험·수용력·비용과 주민 의견을 함께 살펴야 한다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 대피 장소 입지 검토에 필요한 근거 구분
    instruction: 대피 장소·버스 정류장 지도와 시설 유형별 그래프를 바탕으로 확인한 사실, 해석, 추가로 필요한 정보, 검토 절차를 구분한다.
    prompt: 자료에서 직접 확인되는 내용과 아직 확인할 수 없는 조건을 나누고, 새 대피 장소의 후보를 살피는 순서를 근거와 함께 제안하시오.
    items:
      - { id: facility-count, text: 대피 장소 유형별 그래프에서 학교 운동장이 가장 많다. }
      - { id: stop-location, text: 두 점 지도에서 대피 장소와 버스 정류장의 위치를 비교할 수 있다. }
      - { id: walking-time, text: 지도에서 가까워 보이는 정류장이 실제 도보 이동에도 가장 편리하다고 단정한다. }
      - { id: more-layers, text: 주변 인구·도로와 보행 경로·위험 구역·시설 수용력 자료를 더 모은다. }
      - { id: community-review, text: 주민과 시설 관리자의 경험을 듣고 기준과 대안을 다시 살핀다. }
    categories:
      - { id: evidence, label: 자료에서 확인한 사실 }
      - { id: interpretation, label: 자료를 활용한 해석 }
      - { id: more-data, label: 추가 자료가 필요한 판단 }
      - { id: process, label: 검토 절차와 의견 수렴 }
keyTerms: [spatial-data, geographic-information-system, spatial-decision-making]
sourceIds: [daejeon-seogu-earthquake-shelters, daejeon-seogu-bus-stops, usgs-geographic-information-system]
---
## 지리정보기술을 활용한 문제 탐색

공간 문제를 찾으려면 먼저 조사할 현상과 지역의 범위를 정하고 위치·속성 자료를 모은다. 원격 탐사는 넓은 지역의 토지 이용이나 환경 변화를 관측하고, 지리정보시스템은 수집한 자료를 지도·표·그래프로 표현해 분포와 관계를 살피도록 돕는다. 자료를 같은 위치 기준으로 겹쳐 보면 시설이 어디에 모이거나 부족한지 질문을 만들 수 있다. 문제 설정부터 자료 분석과 대안 검토까지의 흐름을 개념도에서 살펴보자. [[d4]]

## 지리정보기술을 활용한 의사 결정과 문제 해결

공공 시설의 입지는 접근성과 안전, 이용할 사람의 분포를 함께 고려해 정한다. 대전광역시 서구의 2026년 1월 21일 기준 지진 옥외 대피장소 자료에는 시설의 위치와 유형이 연결되어 있다. 점의 분포를 살펴 지역 안에서 장소가 어디에 놓였는지 확인해 보자. [[d1]]

자료에 기록된 대피 장소는 79곳으로, 학교 운동장 72곳·옥외 주차장 5곳·공원 2곳이다. 그래프는 자료에 포함된 시설 유형의 구성을 보여 준다. 유형별 수가 많다고 해서 이용 가능한 수용 인원이나 실제 대피 능력이 더 크다고 볼 수는 없다. [[d3]]

버스 정류장 지도와 대피 장소 지도를 번갈아 보면 두 시설의 위치 관계를 비교할 수 있다. 가까이 놓인 점은 추가 조사를 위한 단서가 된다. 실제 접근성은 도로와 보행 경로, 운영 시간과 교통 상황을 함께 살펴 판단한다. [[d2]]

공간적 의사 결정은 지도를 겹치는 데서 끝나지 않는다. 주변 인구, 이동 경로, 재난 위험, 수용력, 비용처럼 아직 지도에 없는 조건을 더 모으고, 주민과 시설 관리자의 경험을 들어 기준과 대안을 검토한다. 자료의 범위와 사람들의 생활 조건을 함께 고려할 때 지역에 맞는 해결 방안을 제안할 수 있다.
