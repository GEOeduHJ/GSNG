---
title: '세계시민의 일상생활에서 활용되는 지리정보기술에는 무엇이 있을까?'
goal: 일상 서비스와 재난 대응에서 위치 자료와 디지털 지도가 활용되는 사례를 자료로 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-03/nepal-earthquakes-apr-may-2015.geojson
    source: u0103-nepal-earthquakes-2015
    caption: 네팔과 주변 지역 규모 4.5 이상 지진 진앙, 2015년 4–5월
    alt: 2015년 4월부터 5월까지 네팔과 주변 지역의 규모 4.5 이상 지진 106건의 진앙을 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [spatial-data, geospatial-technology]
  - { id: s3, type: text, caption: '', source: '', alt: '' }
  - id: s4
    type: chart
    data: /data/01-03/nepal-osm-participation-2015.json
    source: u0103-nepal-osm-participation
    caption: 네팔 지진 대응 디지털 매핑 참여 규모, 2015년
    alt: 첫 48시간 약 2,000명, 지진 발생 5일 뒤 3,679명, 전체 활성화 기간 8,000명 이상의 매핑 참여 규모를 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [spatial-data, geospatial-technology]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [geospatial-technology, spatial-data]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 지진 분포와 지도 제작 참여 비교
    instruction: 지진 지도와 참여 그래프의 범례·시점·측정 대상을 각각 확인한다. 두 자료가 보여 주는 정보의 종류를 구분한다.
    prompt: 지진 진앙의 위치와 디지털 매핑 참여 규모를 비교해 설명하고, 대응에 필요한 추가 공간 자료를 제안하시오.
    fields:
      - { id: earthquake, label: 지진 지도에서 확인한 위치와 시기 }
      - { id: participation, label: 참여 그래프에서 확인한 매핑 참여 규모 }
      - { id: relation, label: 재난 대응에서 두 자료가 연결되는 방식 }
      - { id: limits, label: 대응 상황을 더 살피는 데 필요한 자료 }
sourceIds: [usgs-fdsn-earthquake-catalog, hot-nepal-2015-annual-report, gfdrr-nepal-osm, usgs-geographic-information-system, unoosa-gnss]
---
내비게이션과 배달 서비스는 GNSS 위치를 도로·주소 자료와 연결해 이동 경로와 장소를 표시한다. 지도는 위치와 목적지를 같은 공간 기준에 놓는다. 사용자는 경로와 주변 시설을 확인하며 이동을 계획한다.

미국 지질조사국(USGS) 점 지도는 네팔과 주변에서 2015년 4–5월에 기록된 규모 4.5 이상 지진 106건을 보여 준다. 4월 25일 규모 7.8과 5월 12일 규모 7.3 지진이 포함된다. 점과 날짜는 진앙의 위치와 발생 시점을 보여 준다. 흔들림과 피해 범위는 별도 자료로 살핀다.

재난이 발생하면 현장 정보와 지도 자료를 빠르게 연결할 필요가 있다. 2015년 네팔 지진 때 Humanitarian OpenStreetMap Team(HOT, 인도주의 오픈스트리트맵 팀)은 네팔 현지 단체와 협력해 OpenStreetMap(OSM, 개방형 협업 지도)에 도로와 건물 정보를 보완했다.

HOT 연차보고서는 첫 48시간에 약 2,000명, 지진 발생 5일 뒤 3,679명, 전체 활성화 기간에 8,000명 이상의 매핑 참여를 기록했다. 첫 값은 반올림한 수치이고 마지막 값은 하한이다. 참여 규모는 지도 제작에 참여한 사람 수를 보여 주며 지도 품질이나 지원을 받은 주민 수는 별도 자료로 확인한다.

항공 영상은 도로·건물의 위치를 파악하는 데 쓰이고, 지역 단체와 현장 조사자의 지식은 지도의 세부 정보를 보완한다. 지진 분포와 참여 규모를 나란히 읽으면 관측 자료와 지도 제작 활동의 역할을 구분할 수 있다. 재난 대응에 필요한 이동 경로·시설·현장 상황 자료도 함께 제안한다.
