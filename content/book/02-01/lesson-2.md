---
title: 열대 기후 지역 주민들은 어떻게 살아갈까?
goal: 열대 기후의 우기·건기와 연중 강수 차이를 설명하고, 농업·주거·관광·목축 사례를 비교한다.
opener: 연중 비가 내리는 곳과 우기·건기가 뚜렷한 곳에서는 집과 생업이 어떻게 달라질까?
textbookRef: { pages: [54, 57] }
steps:
  - id: d1
    type: map
    data: /data/02-01/climate-city-points.geojson
    label: 도시 표본의 열대 기후형
    caption: 선정 도시의 쾨펜–가이거 기후형, 1991–2020년 분류 (Beck et al., 2023)
    source: u0201-climate-city-points
    alt: 세계 여러 기후 지역에 있는 도시 대표점과 각 지점의 쾨펜–가이거 기후형을 나타낸 지도다.
    config: { kind: points, unit: '기후형' }
    concepts: [climate-region]
  - id: d2
    type: chart
    data: /data/02-01/climograph-manaus.json
    label: 마나우스 기후 그래프
    caption: 마나우스 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-manaus
    alt: 마나우스 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d3
    type: chart
    data: /data/02-01/climograph-mumbai.json
    label: 뭄바이 기후 그래프
    caption: 뭄바이 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-mumbai
    alt: 뭄바이 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d4
    type: image
    schematic: true
    data: /images/02-01/tropical-rainfall-schematic.svg
    label: 열대 강수 계절성 개념도
    caption: '개념도: 적도 수렴대와 계절풍에 따라 달라지는 열대 강수 리듬'
    source: ''
    alt: 상승 기류가 이어지는 곳, 수렴대가 계절 이동하는 곳, 계절풍이 수증기를 공급하는 곳에서 열대 강수의 계절성이 달라진다.
    config: {}
    concepts: [climate, climate-region, human-environment-interaction]
summary:
  - 열대 기후는 저위도에 분포하며 연중 고온이고, 연중 강수 또는 뚜렷한 우기·건기가 지역별로 나타난다.
  - 적도 수렴대의 계절 이동과 계절풍은 열대의 우기·건기를 만든다.
  - 열대 우림 주민은 고상 가옥·급경사 지붕과 다양한 농업으로 잦은 비에 대응한다.
  - 몬순 아시아의 벼농사, 사바나의 목축과 사파리 관광은 계절 강수와 초원 환경에 연결된다.
routines:
  opener: { id: see-think-wonder, prompt: "열대 강수 계절성 개념도에서 우기와 건기의 차이를 살피고, 생활에 미치는 영향에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: step-inside, prompt: "열대 우림의 고상 가옥과 몬순 농업 사례에서 주민의 처지와 생활 조건을 살피고, 지역별 차이도 함께 짚어 보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 기후 자료와 생활 추론 구분하기
    instruction: 마나우스와 뭄바이 기후 그래프에서 직접 읽은 패턴, 생활에 대한 가능한 해석, 추가 자료가 필요한 주장을 나눈다.
    prompt: 각 문장을 알맞은 범주에 놓고, 판단 근거와 더 확인할 지역 자료를 덧붙이시오.
    items:
      - { id: manaus-pattern, text: 마나우스에서는 여러 달에 걸쳐 강수가 나타난다. }
      - { id: mumbai-pattern, text: 뭄바이의 강수는 일부 계절에 집중된다. }
      - { id: farming-calendar, text: 강수 계절성을 살펴 파종 시기와 물 관리 계획을 검토할 수 있다. }
      - { id: one-lifestyle, text: 열대 기후형 하나만으로 그 지역 모든 주민의 집과 생업을 알 수 있다. }
    categories:
      - { id: observed, label: 그래프에서 직접 확인 }
      - { id: interpretation, label: 개념을 적용한 가능한 해석 }
      - { id: more-evidence, label: 추가 자료가 필요한 주장 }
keyTerms: [climate, climate-region, human-environment-interaction]
sourceIds: [noaa-climate-classification, noaa-tropical-rain-belt, beck-2023-koppen-geiger, fao-climate-crop-growth, fao-irrigated-crop-calendars]
---
## 열대 기후와 강수 계절성

열대 기후는 저위도에 분포하며 연중 기온이 높고, 지역마다 강수 계절성이 다르다. 적도 수렴대 부근에서는 따뜻하고 습한 공기가 상승해 구름과 비를 만들며, 수렴대가 계절에 따라 남북으로 이동하면서 비가 집중되는 지역도 달라진다. 도시 표본의 분포와 강수 개념도에서 열대 기후의 범위와 수렴대 이동을 살펴보자. [[d1]] [[d4]]

## 연중 비가 이어지는 열대 우림

열대 우림 기후는 연중 고온 다우가 이어지고, 강한 일사로 더워진 공기가 상승해 짧고 세찬 스콜을 만든다. 고상 가옥은 바닥을 지면에서 띄워 습기와 빗물의 영향을 줄이고, 급경사 지붕은 비를 빠르게 흘려보낸다. 잦은 비와 강물은 주거와 이동 방식에도 영향을 준다.

이동식 화전 농업은 밭의 지력이 낮아지면 경작지를 옮기고, 이전 경작지에 식생이 회복되도록 두는 방식이다. 플랜테이션에서는 기름야자·고무·카카오 같은 열대 작물을 넓은 농장에 재배해 수출한다. 마나우스의 기후 그래프에서 연중 높은 기온과 이어지는 강수를 확인하자. [[d2]]

## 몬순과 사바나의 우기·건기

열대 몬순 기후와 사바나 기후에는 우기와 건기가 뚜렷하다. 몬순 아시아의 여름 계절풍은 바다의 습한 공기를 대륙으로 옮겨 많은 비를 내리고, 이 강수는 벼농사의 중요한 조건이 된다.

사바나에는 키 큰 풀이 자라는 초원과 흩어진 나무가 나타나며, 야생 동물이 계절에 따라 물과 먹이를 찾아 이동한다. 동아프리카의 여러 보호 지역에서는 야생 동물 관찰을 중심으로 한 사파리 관광이 발달했다. 일부 지역에서는 주민이 가축과 계절 초지를 따라 이동하는 유목·목축을 이어 간다. 뭄바이 그래프의 우기·건기와 수렴대·계절풍 개념도를 비교해 보자. [[d3]] [[d4]]
