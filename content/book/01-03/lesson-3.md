---
title: '지리적 문제를 어떻게 탐색하고 해결할 수 있을까?'
goal: 공간자료를 중첩해 입지 조건을 비교하고, 필요한 추가 자료를 고려해 지리적 의사결정을 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-03/daejeon-seogu-earthquake-shelters.geojson
    source: u0103-daejeon-seogu-shelters
    caption: 대전광역시 서구 지진 옥외 대피장소 위치, 2026-01-21 기준
    alt: 대전광역시 서구 지진 옥외 대피장소 79곳의 위치와 시설 유형을 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [spatial-data, geographic-information-system, spatial-decision-making]
  - id: s3
    type: chart
    data: /data/01-03/daejeon-seogu-shelters-by-type.json
    source: u0103-daejeon-seogu-shelters-by-type
    caption: 대전광역시 서구 지진 옥외 대피장소 유형별 수, 2026-01-21 기준
    alt: 학교운동장 72곳, 옥외 주차장 5곳, 공원 2곳의 대피장소 수를 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [spatial-data, spatial-decision-making]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [spatial-decision-making, geographic-information-system, geospatial-technology]
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 대피 장소 추가 입지 검토
    instruction: 가상 상황이다. 실제 지도와 그래프에는 기존 시설의 위치와 유형이 담겨 있다. 신규 후보의 위치·수용 인원·비용 점수는 자료에 없으므로 임의로 만들지 않고, 근거가 부족한 기준에는 필요한 자료를 적는다.
    prompt: 접근성·수용 인원·위험 회피·비용 기준으로 후보 시설 유형을 비교하시오. 실제 자료로 확인되는 내용과 추가 조사할 정보를 구분해, 주민 의견을 포함한 입지 검토 순서를 제안하시오.
    options:
      - { id: schoolyard, label: 학교 운동장 후보 }
      - { id: outdoor-parking, label: 옥외 주차장 후보 }
      - { id: park, label: 공원 후보 }
    criteria:
      - { id: access, label: '접근성: 도로·보행 경로와 주변 인구 자료' }
      - { id: capacity, label: '수용 인원: 시설별 수용 가능 인원 자료' }
      - { id: hazard, label: '위험 회피: 재난 위험 구역 자료' }
      - { id: cost, label: '비용: 설치·운영 비용 자료' }
sourceIds: [daejeon-seogu-earthquake-shelters, usgs-geographic-information-system]
---
지리적 문제를 해결하려면 문제와 공간 범위를 먼저 정한다. 필요한 위치·속성 자료를 모은 뒤 GIS에서 자료를 겹쳐 조건을 비교한다. 마지막으로 접근성·수용 인원·위험 회피·비용을 기준으로 대안을 평가한다.

대전광역시 서구의 실제 점 지도에는 2026년 1월 21일 기준 지진 옥외 대피장소 79곳이 표시되어 있다. 점에서 시설의 위치와 유형을 확인하고, 주변의 분포를 살핀다. 이 자료는 대피장소 목록을 지도에 나타낸 것이다.

유형별 그래프에는 학교운동장 72곳, 옥외 주차장 5곳, 공원 2곳이 나타난다. 막대를 비교하면 목록에 포함된 시설 유형의 구성을 확인할 수 있다. 시설별 수용 인원 자료를 더해야 실제 수용력을 평가할 수 있다.

지도와 그래프를 함께 읽으면 시설의 위치와 유형을 비교할 수 있다. 접근성은 도로·보행 경로와 인구 자료, 수용력은 시설별 수용 인원, 위험 회피는 위험 구역, 비용은 예산 자료를 더해 평가한다. 주민과 시설 관리자의 의견도 입지 검토에 반영한다.

공간적 의사 결정은 여러 장소의 조건과 대안을 자료에 따라 비교하는 과정이다. 가상 활동에서는 새 시설의 좌표나 점수를 정해 두지 않는다. 실제 자료로 확인되는 내용과 추가 조사할 자료를 나누어, 후보를 좁히는 순서를 근거와 함께 제안한다.
