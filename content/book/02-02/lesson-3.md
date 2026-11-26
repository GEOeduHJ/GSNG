---
title: 관광자원으로 활용되는 지형에는 무엇이 있을까?
goal: 사가르마타의 지형과 관광 자료를 읽고 관광 활용이 지역과 환경에 미치는 영향을 자료의 범위에 맞게 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-02/sagarmatha-point.geojson
    source: u0202-unesco-sagarmatha-point
    caption: 사가르마타 국립공원 UNESCO 대표 위치, 등재 면적 124,400ha, 세계유산 등재 연도 1979년
    alt: 사가르마타 국립공원의 UNESCO 공식 대표 좌표를 점으로 나타낸 지도다. 공원 경계는 표시하지 않는다.
    config: { kind: points }
    concepts: [landform, human-environment-interaction]
  - id: s3
    type: chart
    data: /data/02-02/sagarmatha-visitors-series.json
    source: u0202-sagarmatha-visitors-series
    caption: 사가르마타 국립공원 회계연도 방문객 수, FY 1975/76–2014/15(연도 표시는 회계연도 시작 연도; 1979/80–1985/86 결측)
    alt: 회계연도 시작 연도별 사가르마타 국립공원 방문객 수를 나타낸 선 그래프다. FY 1979/80–1985/86은 값이 없다.
    config: { kind: line }
    concepts: [landform, human-environment-interaction]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
keyTerms: [landform, human-environment-interaction]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 사가르마타의 위치와 방문객 변화 연결
    instruction: UNESCO 공식 위치 자료와 회계연도별 방문객 그래프를 각각 읽고, 확인한 정보와 해석을 구분한다.
    prompt: 장소 자료와 방문객 변화가 함께 보여 주는 점, 각 자료만으로 알 수 없는 점을 기록하시오.
    fields:
      - { id: location, label: 위치 자료에서 확인한 정보 }
      - { id: series, label: 방문객 시계열에서 확인한 변화 }
      - { id: relation, label: 지형·장소와 관광 활동의 관계 }
      - { id: limit, label: 자료에 나타나지 않는 원인·영향·관점 }
sourceIds: [nps-landforms, unesco-sagarmatha]
---
산지·카르스트·해안·빙하 지형은 서로 다른 경관과 현장 활동의 바탕이 될 수 있다. 그러나 지형 자체가 관광자원이 되는 것은 아니다. 접근 방법과 안전, 지역의 생활, 생태계의 민감성, 관리 방식에 따라 관광의 형태와 영향은 달라진다. 관광에 활용되는 산지와 동굴, 해안, 빙하 지형도 각 장소의 조건을 따로 살펴야 한다.

사가르마타 국립공원은 네팔의 산악 지형과 빙하, 깊은 골짜기가 이어지는 곳이며 셰르파 공동체가 살아가는 장소다. UNESCO는 이곳을 산악 관광지로 설명한다. 지도는 UNESCO의 공식 대표 좌표 한 곳을 점으로 나타내며, 공원 경계나 계산된 중심점을 나타내지 않는다. 함께 제시된 면적 124,400ha와 세계유산 등재 연도 1979년은 등재 정보다.

방문객 시계열은 국립공원 사무소의 2016년 관리계획에 실린 회계연도 자료다. FY 1975/76에는 3,600명, FY 2012/13에는 36,650명, 마지막 자료인 FY 2014/15에는 34,412명이 기록되었다. FY 1979/80부터 FY 1985/86까지는 7개 연도의 값이 없다. 이 자료는 최신 통계가 아니며, 연도별 변화의 원인이나 관광 수입이 주민에게 돌아간 정도를 직접 보여 주지 않는다.

UNESCO 세계유산위원회는 2025년 사가르마타 결정문에서 방문객 규제와 쓰레기 관리 조치, 성수기 수용력을 조사해 관광 관리 계획에 반영할 필요를 다루었다. 이는 위원회의 공식 기록이며 모든 주민이나 사업자의 의견을 대표하지 않는다. 방문객 수의 증감만으로 관광의 이익과 부담을 판단하지 말고, 생활과 환경에 미친 영향에 관한 자료와 다양한 당사자의 목소리를 더 살펴야 한다.
