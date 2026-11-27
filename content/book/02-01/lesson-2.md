---
title: 열대 기후 지역 주민들은 어떻게 살아갈까?
goal: 열대 기후의 강수 계절성을 그래프에서 읽고 생활과 농업에 미칠 수 있는 영향을 자료의 범위에 맞게 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-01/climate-city-points.geojson
    source: u0201-climate-city-points
    caption: 선정 도시의 쾨펜–가이거 기후형, Beck et al. 1991–2020년 분류 자료
    alt: 선정 도시의 위치와 쾨펜–가이거 기후형을 점과 색으로 나타낸 지도다.
    config: { kind: points }
    concepts: [climate-region]
  - id: s3
    type: chart
    data: /data/02-01/climograph-manaus.json
    source: u0201-climograph-manaus
    caption: 마나우스 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 마나우스의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - id: s4
    type: chart
    data: /data/02-01/climograph-mumbai.json
    source: u0201-climograph-mumbai
    caption: 뭄바이 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 뭄바이의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [climate-region, climate, human-environment-interaction]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 기후 자료와 생활에 대한 추론 구분하기
    instruction: 그래프에서 직접 읽은 내용, 그 내용을 바탕으로 세울 수 있는 생활·농업 관련 추론, 추가 자료가 필요한 주장을 나눈다.
    prompt: 각 문장을 알맞은 범주에 놓고, 그래프만으로 판단할 수 없는 항목에는 필요한 자료를 적으시오.
    items:
      - { id: mana-rain, text: 마나우스의 강수는 여러 달에 걸쳐 나타난다. }
      - { id: mumbai-rain, text: 뭄바이의 강수는 여름철 몇 달에 집중된다. }
      - { id: farming, text: 강수 계절성을 고려해 파종 시기와 물 저장 계획을 조정할 수 있다. }
      - { id: uniform-life, text: 열대 기후 지역의 모든 주민은 같은 집에서 살고 같은 옷을 입는다. }
    categories:
      - { id: direct, label: 그래프에서 직접 확인 }
      - { id: inference, label: 생활에 대한 가능한 추론 }
      - { id: more, label: 그래프만으로 확인하기 어려움 }
sourceIds: [noaa-climate-classification, beck-2023-koppen-geiger, fao-climate-crop-growth, fao-irrigated-crop-calendars]
---
열대 기후는 강수가 연중 이어지는 곳과 우기·건기의 차이가 큰 곳으로 나뉜다. 쾨펜–가이거 분류의 열대 우림(Af), 열대 몬순(Am), 열대 사바나(Aw)는 서로 다른 강수 계절성을 보여 준다. 기후형은 이 계절 패턴을 비교하는 기준이며, 생활 모습은 지역의 조건과 선택에 따라 다양하다.

도시 대표점 지도에서 마나우스는 열대 우림(Af), 뭄바이는 열대 몬순(Am)으로 분류된다. 선정 도시 가운데 사바나 기후형 대표점은 없다. 사바나의 월별 강수량과 우기·건기 차이는 별도 기후 자료에서 확인한다.

마나우스 그래프는 ERA5 재분석 격자에서 계산한 월평균을 나타낸다. 기온은 연중 높고 강수는 여러 달 이어지며, 월평균 강수량은 3월 375.0mm, 8월 98.7mm로 달라진다. 농작물과 가구별 물 이용은 지역의 농업·수자원 자료를 함께 살펴본다.

뭄바이의 1월 월평균 강수량은 0.8mm이며, 여름에는 강수가 크게 늘어 7월 636.2mm에 이른다. 그래프에서 강수의 계절 집중을 확인할 수 있다. 농사 일정과 건기의 물 관리를 살필 때에는 실제 작물과 지역별 토양·수자원·시설 자료도 함께 확인한다.

기후에 맞춘 생활에는 집의 그늘과 환기, 배수, 물 저장과 농사 일정 조정 등 여러 선택이 있다. 농작물의 생육 시기는 비뿐 아니라 기온과 햇빛, 토양 조건에도 영향을 받는다. 열대 지역에서도 도시와 농촌, 고도, 생업, 자원 접근성, 기술과 문화가 달라 주거와 농사 방식은 다양하게 나타난다.
