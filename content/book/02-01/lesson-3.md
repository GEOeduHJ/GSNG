---
title: 온대 기후 지역은 왜 기후가 다양할까?
goal: 서안 해양성·지중해성·온대 계절풍 기후의 계절 차이를 설명하고, 그에 맞춘 농업과 주거 사례를 연결한다.
opener: 같은 온대 기후 안에서도 비가 내리는 계절이 다르면 농사와 집은 어떻게 달라질까?
textbookRef: { pages: [58, 61] }
steps:
  - id: d1
    type: map
    data: /data/02-01/climate-city-points.geojson
    label: 도시 표본의 온대 기후형
    caption: 선정 도시의 쾨펜–가이거 기후형, 1991–2020년 분류 (Beck et al., 2023)
    source: u0201-climate-city-points
    alt: 세계 여러 기후 지역에 있는 도시 대표점과 각 지점의 쾨펜–가이거 기후형을 나타낸 지도다.
    config: { kind: points, unit: '기후형' }
    concepts: [climate-region]
  - id: d2
    type: chart
    data: /data/02-01/climograph-athens.json
    label: 아테네 기후 그래프
    caption: 아테네 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-athens
    alt: 아테네 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d3
    type: chart
    data: /data/02-01/climograph-london.json
    label: 런던 기후 그래프
    caption: 런던 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-london
    alt: 런던 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d4
    type: chart
    data: /data/02-01/climograph-shanghai.json
    label: 상하이 기후 그래프
    caption: 상하이 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-shanghai
    alt: 상하이 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
summary:
  - 서안 해양성 기후는 편서풍과 난류의 영향으로 연중 강수가 고르고 낙농·혼합 농업이 발달한다.
  - 지중해성 기후는 여름이 덥고 건조하며 겨울은 온난하고 습윤해 올리브·포도·코르크참나무 재배와 연결된다.
  - 지중해 연안의 흰 벽과 작은 창은 여름의 강한 햇빛과 열을 줄이는 주거 방식이다.
  - 온대 계절풍 지역은 여름에 고온 다우하며, 몬순 아시아에서는 벼농사가 발달한다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 온대 도시의 강수 계절성 비교
    instruction: 세 도시의 월별 강수 막대를 살펴 여름과 겨울의 상대적 분포를 비교한다.
    prompt: 각 도시의 강수 패턴을 분류하고, 농업이나 생활을 설명할 때 더 확인해야 할 조건을 적으시오.
    items:
      - { id: athens, text: 아테네는 여름 강수량이 겨울보다 적게 나타난다. }
      - { id: london, text: 런던은 여러 달에 걸쳐 강수가 나타난다. }
      - { id: shanghai, text: 상하이는 여름철에 강수량이 늘어난다. }
      - { id: crop, text: 기후 그래프만으로 특정 작물의 생산량을 알 수 있다. }
    categories:
      - { id: dry-summer, label: 여름 건조 }
      - { id: year-round, label: 여러 계절에 강수 }
      - { id: summer-wet, label: 여름 강수 집중 }
      - { id: more-data, label: 추가 자료가 필요한 주장 }
keyTerms: [climate, climate-region, human-environment-interaction]
sourceIds: [noaa-climate-classification, noaa-climate-factors, beck-2023-koppen-geiger, fao-climate-crop-growth, fao-irrigated-crop-calendars]
---
## 온대 기후의 분포와 차이

온대 기후는 중위도에 넓게 나타나며 서안·동안·지중해 연안에서 계절별 기온과 강수의 양상이 다르다. 중위도 대륙 서안에는 대양을 지나 습기를 머금은 편서풍이 불고, 따뜻한 난류가 연안의 겨울을 온화하게 한다. 대륙 동안은 계절풍의 영향으로 여름에 비가 집중되는 경향이 있다.

서안 해양성 기후, 지중해성 기후, 온대 계절풍 기후는 같은 온대 안에서도 강수 계절이 다르다. 대륙 동안에는 여름비가 많은 온난 습윤 기후와 겨울 건조 기후가 나타난다. 기후형 지도에서 아테네·런던·상하이를 찾고 각 도시의 계절 그래프와 연결하자. [[d1]]

## 서안 해양성 기후와 생활

서안 해양성 기후는 연중 강수가 고르고 겨울이 온화해 목초지가 잘 형성된다. 목초를 이용한 낙농·목축과 곡물·사료 작물·가축을 함께 기르는 혼합 농업, 네덜란드의 화훼 재배가 대표적이다. 런던의 기온선과 강수 막대에서 계절 변화가 고른 양상을 확인하자. [[d3]]

## 지중해성 기후와 생활

지중해성 기후는 여름 건조가 뚜렷하고 겨울에는 온난 습윤하다. 여름 가뭄에 강한 올리브·포도·코르크참나무 같은 수목 농업이 발달하고, 겨울 비는 곡물 농업에 이용된다. 흰 벽은 햇빛을 반사하고 작은 창은 강한 햇볕이 드는 면적을 줄여 여름의 실내 열을 낮춘다. 아테네의 계절별 강수 차이를 그래프에서 찾아보자. [[d2]]

## 계절풍이 강수 계절을 바꾸는 동안

온대 계절풍 기후가 나타나는 대륙 동안은 여름에 덥고 비가 많다. 몬순 아시아에서는 여름 강수와 높은 기온을 이용한 벼농사가 널리 이루어지며, 논과 관개 시설이 계절 강수를 농업에 활용한다. 상하이의 여름 강수와 아테네·런던의 계절별 강수 패턴을 비교하자. [[d4]]
