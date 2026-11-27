---
title: 지형의 지속가능한 활용 방안은 무엇일까?
goal: 관광 이용의 경제·생활 효과와 보전 과제를 비교하고, 근거와 주민 참여를 반영한 지속가능한 이용 방안을 제안할 수 있다.
opener: 관광 개발로 일자리와 소득이 늘 때 지형과 생태계의 상태는 어떻게 함께 살필 수 있을까? 이용과 보전을 잇는 방안을 생각해 보자.
textbookRef: { pages: [82, 83] }
steps:
  - id: d1
    type: map
    data: /data/02-02/terrestrial-protected-areas-map-2025.json
    label: 국가별 육상 보호 지역 비율
    caption: World Bank WDI, WDPA·WD-OECM 포함, 전체 국토 대비 비율, 2025년
    source: u0202-wdi-terrestrial-protected-areas
    alt: 국가별 전체 국토에서 육상 보호 지역과 기타 효과적 지역 기반 보전 수단이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [sustainable-use, development-conservation-conflict]
  - id: d2
    type: map
    data: /data/02-02/sagarmatha-point.geojson
    label: 사가르마타 국립공원 위치
    caption: UNESCO 대표 좌표, 세계유산 등재 1979년·면적 124,400ha
    source: u0202-unesco-sagarmatha-point
    alt: 네팔의 사가르마타 국립공원 UNESCO 대표 좌표 한 곳을 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 대표 위치' }
    concepts: [landform, development-conservation-conflict]
  - id: d3
    type: chart
    data: /data/02-02/sagarmatha-visitors-series.json
    label: 사가르마타 방문객 변화
    caption: 사가르마타 국립공원 회계연도 방문객 수, FY 1975/76–2014/15
    source: u0202-sagarmatha-visitors-series
    alt: 사가르마타 국립공원의 회계연도별 방문객 수를 나타낸 선 그래프다. 가로축은 회계연도가 시작하는 해를 표시한다.
    config: { kind: line, maxYear: 2014, unit: '명' }
    concepts: [development-conservation-conflict, sustainable-use]
  - id: d4
    type: chart
    data: /data/02-02/international-tourism-arrivals-1995-2020.json
    label: 국가별 국제 관광객 도착 수
    caption: World Bank WDI, 네팔·아이슬란드·뉴질랜드·잠비아, 1995–2020년
    source: u0202-wdi-international-tourism-arrivals
    alt: 네팔·아이슬란드·뉴질랜드·잠비아의 국가별 국제 관광객 도착 수 변화를 비교한 선 그래프다.
    config: { kind: line, maxYear: 2020, unit: '명' }
    concepts: [human-environment-interaction, development-conservation-conflict]
  - id: d5
    type: image
    schematic: true
    data: /images/02-02/sustainable-use-cycle.svg
    label: 지속가능한 이용의 관찰·참여·조정
    caption: 개념도 · 이용과 보전을 점검하고 다시 조정하는 과정
    source: ''
    alt: 지역의 생활과 필요, 지형과 생태계 상태를 살피고 이용 기준을 정한 뒤 관찰·참여·재검토를 거쳐 조정하는 순환이다.
    config: {}
    concepts: [sustainable-use]
summary:
  - 지형 관광은 지역의 생계와 소득을 돕는 동시에 경관과 생태계에 영향을 줄 수 있다.
  - 사구의 식생·모래·접근 경로를 관리하면 해안 이용과 자연 과정의 회복을 함께 고려할 수 있다.
  - 보호 지역 지정, 방문 관리, 복원과 주민 참여는 장소의 조건에 맞추어 조정해야 한다.
  - 지속가능한 이용은 영향을 관찰하고 의견을 모아 관리 기준을 다시 살피는 과정이다.
routines:
  opener: { id: compass-points, prompt: "국가별 육상 보호 지역 비율 자료에서 보전과 이용의 균형을 살피고, 기대·우려·추가 정보와 제안을 적어 보자." }
  inquiry: { id: tug-of-war, prompt: "사가르마타 국립공원에서 관광 개발과 생태 보전 사이의 이유를 양쪽에서 살피고, 판단에 필요한 질문을 남겨 보자." }
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 지형 관광의 이용·보전 방안 평가
    instruction: 보호 지역 비율, 방문객 자료, 공식 관리 사례를 바탕으로 대안의 이익과 부담을 비교한다.
    prompt: 지역의 생계, 생태계 상태, 안전과 접근성, 주민 참여 기준으로 실행 방안을 평가하고 점검할 지표를 제안하시오.
    options:
      - { id: dune-care, label: 사구 식생 회복과 모래 포집 울타리, 지정 접근로 관리 }
      - { id: visitor-management, label: 민감 지역의 출입 구간과 방문 시기 조정 }
      - { id: community-tourism, label: 주민이 운영·수익 배분에 참여하는 생태 관광 }
      - { id: restoration, label: 훼손 지역의 복원과 정기적인 환경 관찰 }
    criteria:
      - { id: livelihood, label: 지역의 일자리·소득·생활에 미치는 영향 }
      - { id: ecosystem, label: 지형·식생·물·야생 생물에 미치는 영향 }
      - { id: safety, label: 방문 안전과 자연 재해에 대한 회복력 }
      - { id: participation, label: 주민과 이용자의 의견·참여 절차 }
keyTerms: [human-environment-interaction, development-conservation-conflict, sustainable-use]
sourceIds: [unesco-sagarmatha, unesco-sagarmatha-decision-2025, world-bank-wdi-02-02, unep-mangrove-forests, gold-coast-dune-management, unesco-pamukkale]
---
## 지형 활용을 둘러싼 가치와 이해관계

관광 개발은 지역의 일자리와 서비스 수요를 만들지만, 시설과 이용 동선이 지형의 자연 과정을 바꾸기도 한다. 맹그로브 숲은 어업과 식량, 생물 서식처, 해안 보호와 연결된 생태계다. 개발과 보전의 갈등은 자연성과 지역 소득의 균형을 두고 나타나며, 지역의 이용 방식과 이익 배분을 함께 살펴야 한다.

국가별 국제 관광객 도착 자료는 관광 흐름의 큰 범위를 보여 준다. 네 나라의 장기 변화를 살펴보고, 특정 해안이나 산악 관광지의 이용 규모를 조사할 때 필요한 장소 자료를 정리해 보자. [[d4]]

## 보전과 이용을 함께 설계하기

해안 사빈·사구는 모래의 이동과 퇴적, 식생이 어우러져 형성되는 경관이다. 호주의 골드코스트는 사구에 울타리를 세워 모래를 잡고 자생 식물을 심으며, 생태 탐방로와 정해진 접근로를 관리하고 훼손 구역을 복원한다. 튀르키예 파묵칼레는 온천수가 만든 석회화 경관의 물 흐름과 표면을 보전하기 위해 방문 구역을 조정한다. 두 사례의 지형 과정과 관리 방식을 비교해 보자.

2025년 육상 보호 지역 비율은 네팔 23.6%, 뉴질랜드 33.4%, 잠비아 41.3%다. 보호 지역이 넓을수록 지형과 생태계를 지키는 바탕이 커지며, 실제 관리 효과는 장소별 기록과 주민 의견으로 확인한다. [[d1]]

## 관광 영향을 살피고 관리 조정하기

지속가능한 이용은 지역의 필요와 생태계 상태를 관찰하고, 이용 기준을 정한 뒤 결과에 따라 방식을 조정하는 과정이다. UNESCO(유네스코) 세계유산위원회는 2025년 결정문에서 사가르마타의 방문객 규제와 폐기물 관리, 지속가능한 관광 관리 계획을 다루었다. 사가르마타의 방문 압력과 주민 참여를 연결해 관리 순환을 정리해 보자. [[d2]] [[d3]]

관리 계획은 방문객과 지역 사업자의 생계, 보호 구역의 경관과 생태계, 안전한 이동과 쓰레기 처리 조건을 함께 다룬다. 관찰 결과와 지역 의견을 확인하고 관리 기준을 다시 살피는 순환을 개념도에서 확인해 보자. [[d5]]
