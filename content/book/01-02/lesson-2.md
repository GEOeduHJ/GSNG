---
title: 지역 분리의 움직임은 왜 일어날까?
goal: 지역 분리와 자치 요구에 여러 배경이 작용하는 모습을 사례와 여론 자료를 비교해 설명할 수 있다.
opener: 한 지역의 정치적 관계를 바꾸려는 움직임에는 어떤 요구가 함께 담길까? 분리와 더 큰 자치의 차이도 생각해 보자.
textbookRef: { pages: [25, 27] }
steps:
  - id: d1
    type: map
    data: /data/01-02/scotland-referendum-council-points.geojson
    label: 스코틀랜드 구역별 주민투표
    caption: 스코틀랜드 지방 의회 구역별 투표 결과 분포, 2014년
    source: u0102-scotland-referendum-council-points
    alt: 스코틀랜드 지방 의회 구역의 대표 정착지 위치에 투표 결과 우세 범주를 표시했다. 점은 행정구역 경계나 면적 중심점이 아니며 원자료에는 찬성 비율과 투표율이 수록되어 있다.
    config: { kind: points, unit: '찬성 비율·투표율(%)' }
    concepts: [regional-separation, region, scale]
  - id: d2
    type: chart
    data: /data/01-02/scotland-referendum-national-result.json
    label: 스코틀랜드 주민투표 전국 결과
    caption: 스코틀랜드 독립 주민투표의 유효 득표 비율, 2014년
    source: u0102-scotland-referendum-national-result
    alt: 2014년 주민투표에서 유효한 찬성·반대 투표의 비율을 막대로 비교했다.
    config: { kind: bar, unit: '유효 득표 비율(%)' }
    concepts: [regional-separation, scale]
  - id: d3
    type: chart
    data: /data/01-02/scotland-governance-preference-2025.json
    label: 스코틀랜드 의사결정 영향력 선호
    caption: 스코틀랜드 운영에 가장 큰 영향력을 가져야 할 주체에 대한 응답, 2025년
    source: u0102-scotland-governance-preference-2025
    alt: 2025년 설문에서 응답자가 스코틀랜드를 운영할 때 가장 큰 영향력을 가져야 한다고 선택한 네 주체의 비율을 막대로 나타냈다.
    config: { kind: bar, unit: '응답 비율(%)' }
    concepts: [regional-separation, scale]
  - id: d4
    type: image
    schematic: true
    data: /images/01-02/regional-separation-drivers-schematic.svg
    label: 지역 분리와 자치 요구의 여러 배경
    caption: 정체성·역사·권한·경제 관계가 함께 작용하는 개념도
    source: ''
    alt: 정체성과 역사, 권한 배분과 경제 관계가 서로 얽혀 기존 관계의 유지·변경·자치 확대에 영향을 줄 수 있음을 나타낸 개념도다.
    config: {}
    concepts: [regional-separation, region, scale]
summary:
  - 지역 분리와 자치 요구에는 정체성, 역사적 경험, 권한 배분, 경제 관계 등 여러 배경이 함께 작용할 수 있다.
  - 분리·독립과 한 국가 안에서의 자치 확대는 정치적 관계를 바꾸는 서로 다른 방식이다.
  - 투표 결과와 현재의 영향력 선호는 서로 다른 질문에 대한 자료이므로 각각의 시점과 대상을 구분해 읽는다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 결과·공간 분포·현재 선호 비교
    instruction: 구역별 주민투표 점, 전국 결과 막대, 2025년 설문 막대의 단위와 질문을 구분한다.
    prompt: 스코틀랜드의 공간별 투표 결과와 전국 결과를 비교하고 현재의 선호 설문과 구분하시오. 지역의 다양한 요구를 설명하는 데 더 필요한 역사·경제·정치 자료도 제안하시오.
    fields:
      - { id: local, label: 지방 의회 구역별 결과와 투표율에서 보이는 차이 }
      - { id: national, label: 전국 결과와 구역별 결과의 관계 }
      - { id: survey, label: 2025년 선호 조사에서 드러난 결정 수준의 생각 }
      - { id: evidence, label: 지역의 여러 관점과 배경을 살필 추가 자료 }
keyTerms: [regional-separation, region, scale]
sourceIds: [hcl-scottish-referendum-table33, hcl-scottish-independence-2014, scotland-governance-preference-2025, bangsamoro-autonomy-01-02]
---
## 지역 분리와 자치 요구의 배경

지역 분리 요구는 기존 정치적 관계나 권한 배분을 바꾸려는 움직임이다. 언어·종교·문화적 정체성, 식민과 전쟁의 기억, 중앙과 지역 사이의 경제·정치적 관계가 함께 작용할 수 있다. 어느 한 요인만으로 지역의 요구를 설명하기는 어렵다.

같은 지역 안에서도 주민의 경험과 바라는 결정 방식은 다양하다. 정체성·역사·권한·경제 관계가 서로 영향을 주는 모습을 개념도에서 살펴보고, 각 사례에 어떤 배경 자료가 더 필요한지 생각해 보자. [[d4]]

## 분리·독립과 자치의 서로 다른 방식

지역의 관계를 바꾸는 방식에는 독립을 요구하는 움직임과 국가 안에서 더 많은 자치를 운영하는 방식이 있다. 스코틀랜드에서는 2014년 독립 여부를 묻는 주민투표가 열렸다. 전국 유효 득표 가운데 찬성은 44.7%, 반대는 55.3%였다.

지방 의회 구역별로 보면 글래스고 시의 찬성 비율과 투표율은 각각 53.5%, 75.0%였고, 애버딘 시는 41.4%, 81.7%였다. 점의 색은 구역별 찬성·반대 득표의 우세 범주를 나타내고, 위치는 대표 정착지를 나타낸다. 전국 결과와 함께 지역별 분포를 살펴보자. [[d1]] [[d2]]

필리핀의 방사모로 자치 지역은 국가 안에서 자치 정부와 의회 제도를 운영하는 사례다. 이 사례는 독립과 자치를 같은 변화로 보지 않도록 돕는다. 방사모로 의회의 공식 안내는 자치가 필리핀 국가 체계 안에서 이루어짐을 설명한다. [[d4]]

## 투표 결과와 현재의 의견 자료

주민투표 결과는 특정 시점의 투표 선택을 보여 주고, 설문은 질문에 응답한 사람들의 견해를 보여 준다. 2025년 스코틀랜드 설문에서 가장 큰 영향력을 가져야 할 주체로 스코틀랜드 정부를 고른 응답은 67%, 영국 정부는 16%였다. 지방 의회는 13%, 유럽 연합은 1%였다. 표의 비가중 기준 표본은 1,549명이며, 네 응답 범주는 보고서 표에 제시된 선택지만을 나타낸다.

이 설문은 2014년 독립 주민투표와 다른 질문을 다룬다. 전국 투표 결과, 구역별 분포, 현재의 의사결정 영향력 선호를 각각 읽고 지역의 요구를 설명하는 데 필요한 관점과 자료를 덧붙여 보자. [[d3]]
