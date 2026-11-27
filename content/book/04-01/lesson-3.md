---
title: 친환경 에너지의 종류와 특징은 무엇일까?
goal: 재생 에너지원마다 다른 자연 조건과 발전 특성을 이해하고, 지역에 맞는 지속가능한 생산 방안을 평가할 수 있다.
opener: 지붕의 햇빛, 산등성이의 바람, 흐르는 물은 어떻게 전기로 바뀔까? 지역의 자연환경과 주민 생활을 함께 고려하려면 무엇을 살펴야 할까?
textbookRef: { pages: [176, 181] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/04-01/renewable-source-conditions.svg
    label: 재생 에너지의 입지 조건
    caption: 재생 에너지원별 자연 조건과 지역에서 함께 살필 요소
    source: ''
    alt: 수력·풍력·태양광·바이오에너지·지열·해양에너지의 자연 조건과 이용 방식, 지역에서 살필 요소를 비교한 개념도다.
    config: {}
    concepts: [renewable-energy, sustainable-use]
  - id: d2
    type: map
    data: /data/04-01/renewable-electricity-share-map.json
    label: 국가별 재생 에너지 발전 비중
    caption: 국가별 전력 발전량 중 재생 에너지 발전 비중, 2024년
    source: u0401-renewable-electricity-share-map
    alt: 2024년 국가별 전력 발전량에서 재생 에너지가 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [renewable-energy, spatial-inequality]
  - id: d3
    type: chart
    data: /data/04-01/solar-capacity-top10.json
    label: 태양광 설비 용량 상위국
    caption: 태양광 발전 설비 용량 상위 10개국, 2024년
    source: u0401-solar-capacity-top10
    alt: 2024년 태양광 발전 설비 용량이 큰 상위 10개국을 막대로 비교한 그래프다.
    config: { kind: bar, unit: 'GW' }
    concepts: [renewable-energy, energy-transition]
  - id: d4
    type: chart
    data: /data/04-01/wind-capacity-top10.json
    label: 풍력 설비 용량 상위국
    caption: 풍력 발전 설비 용량 상위 10개국, 2024년
    source: u0401-wind-capacity-top10
    alt: 2024년 풍력 발전 설비 용량이 큰 상위 10개국을 막대로 비교한 그래프다.
    config: { kind: bar, unit: 'GW' }
    concepts: [renewable-energy, energy-transition]
  - id: d5
    type: chart
    data: /data/04-01/korea-renewable-electricity-share-series.json
    label: 대한민국 재생 에너지 발전 비중 변화
    caption: 대한민국 전력 발전량 중 재생 에너지 비중, 1985–2025년
    source: u0401-korea-renewable-electricity-share-series
    alt: 1985년부터 2025년까지 대한민국 전력 발전량에서 재생 에너지가 차지한 비중을 나타낸 선 그래프다.
    config: { kind: line, unit: '%' }
    concepts: [renewable-energy, energy-transition]
summary:
  - 수력·풍력·태양광·바이오에너지·지열·해양에너지는 서로 다른 자연 조건과 설비를 이용한다.
  - 재생 에너지의 입지는 자원 조건뿐 아니라 전력망, 생태계, 주민 생활과 함께 살펴야 한다.
  - 지속가능한 생산은 다양한 에너지원과 저장·공급 시설, 효율적인 이용을 연결한다.
routines:
  opener: { id: compass-points, prompt: "재생 에너지의 입지 조건 자료에서 자연 조건과 주민 생활을 함께 살피고, 기대·우려·추가 정보와 입장을 적어 보자." }
  inquiry: { id: options-diamond, prompt: "태양광과 풍력 설비의 입지를 비교해, 자원 활용과 생태계·주민 영향을 함께 고려한 방안을 구상해 보자." }
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 지역의 지속가능한 에너지 생산 방안 평가
    instruction: 가상 상황이다. 햇빛이 드는 공공 건물 지붕, 바람이 부는 능선, 흐르는 하천과 농업 부산물이 있다. 지하 열 조건과 설비 비용은 정해 두지 않았다. 자료에서 확인한 사실과 지역 설정을 구분한다.
    prompt: 자연 조건·비용·기반 시설·생태계·주민 참여·공급 안정성을 기준으로 대안을 비교하고, 선택 근거와 더 필요한 자료를 제시하시오.
    options:
      - { id: solar, label: 공공 건물 지붕에 태양광 설비 설치 }
      - { id: wind, label: 바람이 부는 능선에 풍력 설비 설치 }
      - { id: hydro, label: 하천 흐름을 이용하는 수력 설비 검토 }
      - { id: geothermal, label: 지하 열 조건을 조사한 뒤 지열 설비 검토 }
      - { id: bioenergy, label: 농업 부산물을 활용하는 바이오에너지 설비 검토 }
    criteria:
      - { id: resource-fit, label: 햇빛·바람·물·지하 열·유기물 조건이 맞는가 }
      - { id: cost-infrastructure, label: 설비·송전·저장·운영 비용과 기반 시설을 감당할 수 있는가 }
      - { id: environment, label: 생태계·토지·물 이용에 미치는 영향을 살폈는가 }
      - { id: residents, label: 주민 의견과 결정 참여를 반영하는가 }
      - { id: stability, label: 계절과 자원 변화 속에서 공급을 이어 갈 방안이 있는가 }
keyTerms: [renewable-energy, energy-transition, sustainable-use, spatial-inequality]
sourceIds: [eia-renewable-types, eia-solar-resources, eia-wind-resources, doe-wind-siting, eia-hydropower-environment, eia-geothermal-resources, eia-energy-environment, doe-marine-energy, eu-cap-feldheim]
illustration:
  src: /images/04-01/renewable-energy-sources.webp
  alt: 태양광 패널과 풍력 터빈, 흐르는 물을 이용한 수력 설비, 지열 관로를 한 풍경에서 비교한다.
---
## 재생 에너지원과 자연 조건

renewable energy(재생 에너지)는 자연 과정에서 다시 보충되는 원천을 이용한다. 수력은 흐르는 물, 풍력은 바람, 태양광은 햇빛을 이용한다. 바이오에너지는 식물과 유기물에서 열·전기·연료를 얻고, 지열은 지하의 열을 이용한다. 조력·파력 등 해양에너지는 바닷물의 움직임을 활용한다. 재생 가능성과 발전 과정의 낮은 배출량은 장점이지만, 시설의 입지와 운영은 환경 영향을 만들 수 있다. 각 에너지원의 자연 조건과 변환 방식을 개념도에서 비교해 보자. [[d1]]

수력 발전은 하천 유량이 풍부하고 큰 낙차를 얻는 지역에 유리하다. 댐과 생태계, 주변 생활 공간의 관계도 함께 고려한다. 댐은 전력을 공급하는 동시에 하천 흐름을 바꾼다. 국가별 재생 에너지 발전 비중도 지역마다 다르게 나타나며, 2024년 중국은 33.2%, 미국은 24.1%, 대한민국은 10.5%였다. 이 비율은 전력 발전 구성에서 재생 에너지가 차지한 몫이다. 지도에서 비중이 높은 지역과 낮은 지역을 찾아보자. [[d2]]

태양광 발전은 일사량과 햇빛을 받는 시간, 구름과 주변의 그늘에 영향을 받는다. 건물 지붕과 주차장에 패널을 설치하면 전력 생산을 여러 장소로 나누는 분산형 이용이 가능하다. 2024년 태양광 발전 설비 용량 상위는 중국 887.1GW, 미국 177.6GW, 인도 98.5GW였다. 설비 용량은 설치된 설비의 규모이며 실제 발전량과는 구분된다. 세 나라의 설비 규모를 비교해 보자. [[d3]]

풍력 발전은 풍속과 바람의 지속성을 고려해 해안·산지·해상 등에 설치한다. 바람이 일정하지 않으면 발전량도 달라질 수 있어 다른 에너지원, 저장 장치와 전력망을 함께 계획한다. 소음과 경관, 야생 생물 서식지 등 지역 환경도 살핀다. 2024년 풍력 발전 설비 용량 상위는 중국 521.3GW, 미국 152.7GW, 독일 72.7GW 순이었다. 태양광과 풍력의 상위국을 비교해 보자. [[d4]]

## 지속가능한 에너지 생산을 위한 노력

바이오에너지는 지속가능한 유기물 자원을 활용하며 토지 이용과 물, 식량 생산의 관계를 함께 살펴야 한다. 지열은 지하 열과 물이 있는 지질 조건에서 이용하며 화산대와 판 경계가 주요 탐사 지역이다. 조력·파력 등 해양에너지는 조차·파랑·해류의 특성과 해안 이용을 고려한다. 독일 브란덴부르크주의 펠트하임은 풍력·태양광 전력과 바이오가스를 지역의 전력·열 공급망에 연결한 사례다. 에너지 전환에는 지역 자원 결합과 기술 개발, 저장·공급망, 주민 참여가 함께 필요하다. 대한민국의 재생 에너지 발전 비중은 2000년 1.4%, 2010년 1.1%, 2025년 10.5%였다. 선 그래프에서 국가 단위의 변화도 함께 확인해 보자. [[d5]]
