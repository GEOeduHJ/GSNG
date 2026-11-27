---
title: '세계화 시대에 지역은 어떻게 대응할까?'
goal: 지역화 전략과 세계화의 상호작용을 사례 자료에 근거해 설명하고 지역의 선택을 평가할 수 있다.
opener: 세계적으로 알려진 상품이나 장소가 지역의 고유한 특성과 만날 때 어떤 모습이 생길까? 그 과정에서 주민은 어떤 선택을 할 수 있을까?
textbookRef: { pages: [12, 13] }
steps:
  - id: d1
    type: map
    data: /data/01-01/region-canary-islands-point.geojson
    label: 카나리아 제도 위치
    caption: 카나리아 제도 통계 지역의 대표 지점, 2021년
    source: region-canary-islands-point
    alt: 유럽 지도에서 카나리아 제도 통계 지역의 대표 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '대표 지점' }
    concepts: [scale, glocalization]
  - id: d2
    type: chart
    data: /data/01-01/region-canary-islands-series.json
    label: 카나리아 제도 관광 숙박일수
    caption: 카나리아 제도 관광 숙박시설 숙박일수, 2014–2025년
    source: region-canary-islands-series
    alt: 카나리아 제도 관광 숙박시설에서 보낸 밤의 연도별 합계를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2025, unit: '박' }
    concepts: [interdependence, glocalization]
  - id: d3
    type: map
    data: /data/01-01/region-south-tyrol-point.geojson
    label: 남티롤 위치
    caption: 남티롤 통계 지역의 대표 지점, 2021년
    source: region-south-tyrol-point
    alt: 이탈리아 북부 지도에서 남티롤 통계 지역의 대표 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '대표 지점' }
    concepts: [scale, glocalization]
  - id: d4
    type: chart
    data: /data/01-01/region-south-tyrol-series.json
    label: 남티롤 관광 숙박일수
    caption: 남티롤 관광 숙박시설 숙박일수, 2014–2025년
    source: region-south-tyrol-series
    alt: 남티롤 관광 숙박시설에서 보낸 밤의 연도별 합계를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2025, unit: '박' }
    concepts: [interdependence, glocalization]
  - id: d5
    type: image
    schematic: true
    data: /images/01-01/global-local-flow.svg
    label: 세계적 흐름과 지역의 선택
    caption: 세계화와 지역화의 상호작용
    source: ''
    alt: 세계적 흐름이 지역의 조건과 주민 선택에 맞춰 새롭게 나타나고, 지역의 표현과 가치가 다시 세계와 연결되는 과정을 나타낸 개념도다.
    config: {}
    concepts: [glocalization, interdependence, scale]
summary:
  - 지역화는 지역의 고유한 조건과 자율성을 바탕으로 독자적인 가치를 키우는 과정이다.
  - 지역 브랜드와 지리적 표시제는 지역의 자원·기술·이름을 바깥의 소비자와 연결한다.
  - 세계지역화는 세계적 흐름이 지역의 조건과 주민의 선택을 만나 새롭게 구성되는 과정이다.
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 지역의 브랜드 전략 고르기
    instruction: 가상 지역의 자연·문화·기술 조건과 주민의 의견을 고려해 지역화 전략을 비교한다.
    prompt: 지역의 고유성을 살리면서 주민의 참여와 지속 가능한 지역 경제를 고려할 수 있는 방안을 근거와 함께 고르시오.
    options:
      - { id: product, label: 지역의 특산품과 생산 기술 알리기 }
      - { id: place, label: 지역의 장소와 이야기를 연결한 방문 경험 만들기 }
      - { id: exchange, label: 바깥의 문화·산업과 협력해 새 상품이나 행사 기획하기 }
    criteria:
      - { id: distinctiveness, label: 지역의 고유한 조건 반영 }
      - { id: participation, label: 주민과 생산자의 참여 }
      - { id: sustainability, label: 지역 경제와 생활의 지속 가능성 }
keyTerms: [glocalization, interdependence, scale]
sourceIds: [eurostat-regional-tourism, eurostat-gisco-nuts, wipo-geographical-indications]
illustration:
  src: /images/01-01/lesson-2-local-response.webp
  alt: 여러 연령과 배경의 이웃들이 상자 속 생활 물품과 지역에서 기른 채소를 함께 살피며 공동 공간을 꾸민다.
---
## 지역화의 의미와 전략

지역화는 한 지역이 고유한 조건과 자율성을 살려 세계 속에서 독자적인 가치를 키우는 과정이다. 지역 브랜드화는 장소·상품·축제의 특징을 알리고 지역의 선택을 넓히는 전략이다. geographical indication(지리적 표시제)은 상품의 특성과 평판이 생산 지역과 연결됨을 나타내는 제도다. 지역의 자연환경과 축적된 기술, 주민의 경험을 살펴 전략의 바탕을 찾는다.

지역의 경제 활동은 세계의 이동과 연결될 수 있다. 카나리아 제도 통계 지역의 대표 지점을 지도에서 찾고, 이 지역의 관광 숙박시설 이용 흐름을 살펴보자. 숙박일수는 시설에서 보낸 밤의 합계다. 2019년 약 9,611만 박에서 2020년 약 2,914만 박으로 낮아졌고, 2025년 약 1억 232만 박으로 나타난다. 이 변화와 함께 지역의 산업·주민 생활 자료를 살피면 지역의 대응을 구체적으로 비교할 수 있다. [[d1]] [[d2]]

남티롤(이탈리아 볼차노 자치주)의 대표 지점도 지도에서 확인한다. 숙박일수는 2019년 약 3,364만 박, 2020년 약 2,170만 박, 2025년 약 3,824만 박이다. 카나리아 제도와 남티롤의 시계열에서 공통된 변화와 다른 흐름을 찾아보자. 숙박일수는 관광 숙박시설의 이용을 기록하므로 방문객 수·지출·주민 의견은 지역 자료를 더해 설명한다. [[d3]] [[d4]]

## 세계화와 지역화의 결합

glocalization(세계지역화)은 세계적 흐름을 지역의 조건과 선택에 맞게 받아들이고 다시 구성하는 과정이다. 지역은 외부의 상품·정보·방문을 받아들이며 고유한 자원을 살린 상품과 경험을 만들 수 있다. 지역의 선택과 표현은 다시 바깥의 소비자와 공동체에 알려진다. 개념도에서 세계와 지역 사이의 영향이 오가는 흐름을 확인해 보자. [[d5]]
