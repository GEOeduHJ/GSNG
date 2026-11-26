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
열대 기후에도 강수가 연중 이어지는 곳과 우기·건기의 차이가 큰 곳이 있다. 쾨펜–가이거 분류에서 열대 우림(Af), 열대 몬순(Am), 열대 사바나(Aw)는 강수의 계절성이 서로 다르다. 기후형은 계절 패턴을 간추린 이름이며, 그곳 사람들의 생활 방식을 하나로 정하지 않는다.

도시 대표점 지도에서 마나우스는 열대 우림(Af), 뭄바이는 열대 몬순(Am)으로 분류된다. 이 지도에는 사바나 기후형의 도시 대표점이 없다. 따라서 사바나의 월별 강수량은 이 지점 자료에서 직접 비교할 수 없으며, 우기와 건기의 차이는 별도 자료를 찾아 확인해야 한다.

마나우스 그래프의 월평균 기온은 연중 높게 나타나고, 강수는 여러 달에 걸쳐 나타난다. 월평균 강수량은 3월 375.0mm, 8월 98.7mm다. 강수가 계속 나타나더라도 달에 따라 양이 달라질 수 있다. 이 그래프만으로 특정 농작물이나 각 가구의 물 이용 방식을 알 수는 없다.

뭄바이는 1월 월평균 강수량이 0.8mm이고, 여름철에는 강수량이 크게 늘어난다. 7월에는 636.2mm가 기록된다. 그래프는 강수의 계절 집중을 보여 준다. 강수가 집중되는 시기의 농사 일정과 건기의 물 관리가 중요할 수 있지만, 실제 재배 작물과 주민의 대응은 지역별 토양·수자원·시설 자료를 함께 확인해야 한다.

기후에 맞춘 생활은 집의 그늘과 환기, 많은 비를 흘려보내는 배수, 물 저장과 농사 일정처럼 여러 선택을 포함할 수 있다. 농업의 생육 시기는 비뿐 아니라 기온과 햇빛, 토양 조건에도 달려 있다. 열대 지역 안에서도 도시와 농촌, 고도, 생업, 자원 접근성, 기술과 문화가 다르므로 한 기후형을 한 가지 생활 모습으로 일반화하지 않는다.
