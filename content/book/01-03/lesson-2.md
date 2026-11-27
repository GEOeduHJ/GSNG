---
title: '세계시민의 일상생활에서 활용되는 지리정보기술에는 무엇이 있을까?'
goal: 위치 기반 서비스와 시민 참여 지도, 재난 대응 사례를 통해 지리정보기술이 사람과 지역을 연결하는 방식을 설명할 수 있다.
opener: 버스 앱은 내가 있는 곳과 정류장 정보를 어떻게 연결해 도착 시간을 알려줄까? 위치 자료를 함께 나누면 일상과 재난 대응에서 어떤 일이 가능해질지 생각해 보자.
textbookRef: { pages: [36, 37] }
steps:
  - id: d1
    type: map
    data: /data/01-03/daejeon-seogu-bus-stops.geojson
    label: 대전 서구 버스 정류장 위치
    caption: 대전광역시 서구 버스 정류장 위치와 안내 단말기 표시, 기준 자료 2025년 4월 24일
    source: u0103-daejeon-seogu-bus-stops
    alt: 대전광역시 서구 버스 정류장의 위치와 버스 안내 단말기 설치 여부를 점으로 나타낸 지도다.
    config: { kind: points, unit: '곳' }
    concepts: [spatial-data, geospatial-technology]
  - id: d2
    type: map
    data: /data/01-03/nepal-earthquakes-apr-may-2015.geojson
    label: 네팔 지진 진앙
    caption: 네팔과 주변 지역의 규모 4.5 이상 지진 진앙, 2015년 4–5월
    source: u0103-nepal-earthquakes-2015
    alt: 2015년 4월부터 5월까지 네팔과 주변 지역에서 기록된 규모 4.5 이상 지진의 진앙을 점으로 나타낸 지도다.
    config: { kind: points, unit: '규모' }
    concepts: [spatial-data, geospatial-technology]
  - id: d3
    type: chart
    data: /data/01-03/nepal-osm-participation-2015.json
    label: 네팔 매핑 참여 규모
    caption: 네팔 지진 대응 디지털 매핑 참여 규모, 2015년
    source: u0103-nepal-osm-participation
    alt: 첫 48시간 약 2,000명, 발생 5일 뒤 3,679명, 활성화 기간 전체 8,000명 이상의 참여 규모를 비교한 막대그래프다.
    config: { kind: bar, unit: '명' }
    concepts: [spatial-data, geospatial-technology]
summary:
  - 위치 기반 서비스는 사람이나 사물의 위치를 지도·도로·장소 정보와 연결해 주변에 필요한 정보를 제공한다.
  - 시민은 사진에 위치를 붙이거나 온라인 지도를 보완해 지역 정보를 함께 만들고 나눌 수 있다.
  - 재난 지도는 관측 자료와 지역의 지식을 연결해 대응 계획을 세우도록 돕는다.
  - 참여자 수와 지도 정보만으로 현장 피해나 구호의 결과를 확정할 수 없으며 다른 자료와 확인이 필요하다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 일상 위치 서비스와 재난 대응 자료 비교
    instruction: 버스 정류장 지도, 지진 진앙 지도, 매핑 참여 그래프의 위치·시점·측정 대상을 구분한다.
    prompt: 각 자료가 알려 주는 내용을 설명하고, 일상 서비스나 재난 대응에 연결하려면 어떤 공간 자료와 현장 정보가 더 필요한지 제안하시오.
    fields:
      - { id: daily-service, label: 정류장 지도에서 확인한 위치 정보와 속성 정보 }
      - { id: hazard, label: 지진 지도에서 확인한 진앙의 위치와 시기 }
      - { id: participation, label: 참여 그래프에서 확인한 지도 제작 참여 규모 }
      - { id: additional-data, label: 서비스와 대응을 위해 더 확인할 자료 }
keyTerms: [spatial-data, geospatial-technology]
sourceIds: [daejeon-seogu-bus-stops, usgs-fdsn-earthquake-catalog, hot-nepal-2015-annual-report]
---
## 일상생활의 위치 기반 서비스

Location-based service(위치 기반 서비스)는 기기의 현재 위치를 지도·도로·주변 시설 정보와 연결해 그 장소에 필요한 정보를 제공한다. 길 찾기와 배달 앱은 위치와 도로를 결합하고, 버스 안내 서비스는 정류장 위치와 노선·도착 정보를 연결한다. 대전광역시 서구 정류장 지도에서는 위치와 안내 단말기 표시를 확인할 수 있다. 이 자료만으로 버스의 현재 위치나 실시간 도착 시간까지 알 수는 없다. [[d1]]

사진이나 동영상에 좌표와 장소 이름을 붙이는 Geo-Tagging(지오태깅)은 경험을 위치와 연결해 공유하는 방법이다. 온라인 지도에 지역의 시설과 길을 보완하면 다른 이용자도 그 장소를 찾고 정보를 갱신할 수 있다. 지리 정보는 서비스 운영자뿐 아니라 지역 주민과 이용자가 함께 만들고 다듬는다.

## 커뮤니티 매핑과 재난 대응

Community mapping(커뮤니티 매핑)은 주민과 여러 참여자가 같은 지역 정보를 모아 온라인 지도에 표시하고 함께 살피는 활동이다. 지진이 일어나면 진앙 위치, 도로·건물, 임시 대피 장소, 현장 제보를 지도에 연결해 대응에 필요한 공간 정보를 나눌 수 있다. 미국 지질조사국(USGS) 자료에는 2015년 4–5월 네팔과 주변 지역에서 규모 4.5 이상인 지진 106건이 기록되어 있고, 4월 25일 규모 7.8과 5월 12일 규모 7.3 사건이 포함된다. 진앙 위치는 흔들림의 세기나 피해 범위와 구분해 읽는다. [[d2]]

2015년 네팔 지진 대응에서 Humanitarian OpenStreetMap Team(HOT, 인도주의 오픈스트리트맵 팀)은 Kathmandu Living Labs(카트만두 리빙랩) 등 지역 참여자와 협력해 항공·위성 영상에서 도로와 건물 정보를 정리하고 온라인 지도를 보완했다. HOT 보고서는 첫 48시간에 약 2,000명, 지진 발생 5일 뒤 3,679명, 활성화 기간에 8,000명 이상의 매핑 참여를 기록했다. 첫 값은 반올림 수치이고 마지막 값은 하한이다. 참여 규모는 지도 제작에 힘을 보탠 사람 수를 말하며 지도 완성도나 구호를 받은 주민 수를 직접 나타내지 않는다. [[d3]]
