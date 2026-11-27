---
title: 관광자원으로 활용되는 지형에는 무엇이 있을까?
goal: 지형 경관이 관광 자원이 되는 과정을 설명하고 국가 단위 통계와 장소별 방문 기록을 구분해 관광 활동의 지역적 의미를 살펴볼 수 있다.
opener: 깊은 협곡과 해안 절벽, 화산과 빙하가 관광지가 되는 까닭은 무엇일까? 관광객이 늘면 지역의 생활과 경관은 어떻게 달라질까?
textbookRef: { pages: [78, 81] }
steps:
  - id: d1
    type: map
    data: /data/02-02/major-landforms.geojson
    label: 세계 주요 지형 지역
    caption: Natural Earth 주요 산지·고원·평야·분지·계곡·하구 평야의 일반화 대표점
    source: u0202-natural-earth-landforms
    alt: Natural Earth에 기록된 주요 산지·고원·평야·분지·저지대·계곡·협곡·하구 평야의 대표점을 범주별 색으로 나타내고 일부 지역 이름을 표시한 지도다.
    config: { kind: points, unit: '개 지형 지역' }
    concepts: [landform]
  - id: d2
    type: map
    data: /data/02-02/sagarmatha-point.geojson
    label: 사가르마타 국립공원 위치
    caption: UNESCO 대표 좌표, 세계유산 등재 1979년·면적 124,400ha
    source: u0202-unesco-sagarmatha-point
    alt: 네팔의 사가르마타 국립공원 UNESCO 대표 좌표 한 곳을 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 대표 위치' }
    concepts: [landform, human-environment-interaction]
  - id: d3
    type: chart
    data: /data/02-02/sagarmatha-visitors-series.json
    label: 사가르마타 방문객 변화
    caption: 사가르마타 국립공원 회계연도 방문객 수, FY 1975/76–2014/15
    source: u0202-sagarmatha-visitors-series
    alt: 사가르마타 국립공원의 회계연도별 방문객 수를 나타낸 선 그래프다. 가로축은 회계연도가 시작하는 해를 표시한다.
    config: { kind: line, maxYear: 2014, unit: '명' }
    concepts: [human-environment-interaction, landform]
  - id: d4
    type: chart
    data: /data/02-02/international-tourism-arrivals-1995-2020.json
    label: 국가별 국제 관광객 도착 수
    caption: World Bank WDI, 네팔·아이슬란드·뉴질랜드·잠비아, 1995–2020년
    source: u0202-wdi-international-tourism-arrivals
    alt: 네팔·아이슬란드·뉴질랜드·잠비아의 국가별 국제 관광객 도착 수 변화를 비교한 선 그래프다.
    config: { kind: line, maxYear: 2020, unit: '명' }
    concepts: [human-environment-interaction]
summary:
  - 하천·파랑·화산·빙하와 용식 작용은 서로 다른 관광 경관을 만든다.
  - 관광 자원은 접근·안전·지역 서비스와 연결되어 방문 활동과 지역 경제를 이끈다.
  - 국가 단위 관광객 도착과 한 장소의 방문객 기록은 서로 다른 공간 규모의 활동을 설명한다.
  - 산악 관광은 지역의 생계 기회와 경관·생태계 관리 과제를 함께 만든다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 지형 관광과 방문 규모 비교
    instruction: 관광 경관의 형성 과정, 국가별 국제 관광객 도착, 사가르마타 방문객 기록을 나누어 살펴본다.
    prompt: 지형 경관이 관광 활동으로 이어지는 과정을 설명하고, 국가 자료와 장소 자료를 함께 해석할 때 필요한 추가 정보를 적으시오.
    fields:
      - { id: landform, label: 관광 경관과 지형 형성 과정 }
      - { id: national, label: 국가 단위 국제 관광객 도착의 변화 }
      - { id: local, label: 사가르마타 방문객 기록에서 확인한 변화 }
      - { id: scale, label: 관광 활동의 지역적 의미를 살피는 데 필요한 장소 자료 }
keyTerms: [landform, human-environment-interaction]
sourceIds: [natural-earth-physical-regions, nps-landforms, gns-new-zealand-volcanoes, gns-new-zealand-glaciers, unesco-sagarmatha, world-bank-wdi-02-02]
---
## 지형 경관과 관광 자원

지형 경관은 지구 내부와 외부의 힘이 오랜 시간 빚은 자연의 모습이다. 하천 침식으로 생긴 침식 협곡, 파랑과 퇴적 작용이 만든 해안 지형, 강물이 암석층을 깎아 만든 폭포는 각기 다른 볼거리를 제공한다. 호주의 그레이트 오션 로드에서는 파랑이 해식애와 바다 위 바위 기둥을 빚었다. 화산 지형과 석회암의 용식 작용으로 형성된 카르스트 지형도 관광 자원이 된다. 그랜드 캐니언·그레이트플레인스·갠지스 삼각주 등 지형 지역의 위치를 찾아 형성 과정과 연결해 보자. [[d1]]

화산과 빙하는 지형을 만들고 계속 바꾸는 자연의 힘이다. 뉴질랜드 북섬의 화산 지대와 남섬의 빙하·피오르 경관, 석회 동굴과 해안 바위는 지역별 여행 경험을 다르게 한다. GNS Science(뉴질랜드 지구과학 연구기관)의 설명을 참고해 북섬과 남섬의 지형 형성 과정을 비교해 보자.

## 관광 활동과 지역 경제

관광 산업은 숙박·교통·안내·음식·지역 상품을 연결해 지역의 일자리와 소득을 만든다. 관광 수입은 지역 서비스와 연계되며, 같은 자연 경관도 도로 접근성·안전 안내·지역 사회의 운영에 따라 관광 이용의 형태와 이익이 달라진다.

관광객 도착 그래프에서 국가별 장기 변화와 공통 시기를 찾아보자. 뉴질랜드의 국제 관광객 도착은 2019년 3,888,000명, 2020년 996,000명으로 기록되었다. 국가 단위 관광객 도착 수는 개별 지형 관광지의 방문객 규모와 집계 범위가 다르므로 장소별 기록과 나누어 살펴본다. [[d4]]

## 산악 관광과 장소별 방문 변화

사가르마타 국립공원은 히말라야 고산 경관을 찾는 트레킹과 등반의 장소이며, 인근 주민과 안내·숙박·운송 서비스가 관광 활동을 함께 만든다. UNESCO(유네스코)는 이곳을 1979년 세계유산으로 등재했으며 면적은 124,400ha다. 네팔의 산악 지역에서 공원의 위치를 확인하고 인접 지역과의 관계를 살펴보자. [[d2]]

방문객 기록에는 1975/76 회계연도 3,600명, 2012/13 회계연도 36,650명, 2014/15 회계연도 34,412명이 담겨 있다. 산악 경관을 찾는 관광 이용과 방문객 변화는 지역 생활과 관리에 영향을 준다. 시계열에서 증가와 감소 구간을 찾아보고 교통·숙박·환경 관리 자료와 연결해 해석하자. [[d3]]
