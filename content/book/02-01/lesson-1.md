---
title: 세계의 기후는 왜 지역마다 다르게 나타날까?
goal: 기후 요소와 요인을 구분하고, 위도별 태양 에너지·대기 대순환과 해륙·해류·지형이 세계 기후 구분에 미치는 과정을 설명한다.
opener: 적도와 극지방의 태양 에너지는 어떻게 다르고, 그 차이는 세계 기후의 띠를 어떻게 만들까?
textbookRef: { pages: [50, 53] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/02-01/climate-factors-schematic.svg
    label: 기후 요인의 작용
    caption: '개념도: 여러 기후 요인이 기온·강수·바람에 함께 작용하는 관계'
    source: ''
    alt: 위도와 태양 에너지, 육지와 바다, 해류와 바람, 고도, 지형, 기단과 전선이 기후 요소에 함께 영향을 준다.
    config: {}
    concepts: [climate, climate-region]
  - id: d2
    type: map
    data: /data/02-01/climate-city-points.geojson
    label: 도시 표본의 기후형
    caption: 선정 도시의 쾨펜–가이거 기후형, 1991–2020년 분류 (Beck et al., 2023)
    source: u0201-climate-city-points
    alt: 세계 여러 기후 지역에 있는 도시 대표점과 각 지점의 쾨펜–가이거 기후형을 나타낸 지도다.
    config: { kind: points, unit: '기후형' }
    concepts: [climate-region]
  - id: d3
    type: chart
    data: /data/02-01/climograph-seoul.json
    label: 서울 기후 그래프
    caption: 서울 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-seoul
    alt: 서울 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d4
    type: chart
    data: /data/02-01/climograph-london.json
    label: 런던 기후 그래프
    caption: 런던 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-london
    alt: 런던 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
  - id: d5
    type: chart
    data: /data/02-01/climograph-yakutsk.json
    label: 야쿠츠크 기후 그래프
    caption: 야쿠츠크 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-yakutsk
    alt: 야쿠츠크 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region]
summary:
  - 기온·강수·바람은 기후 요소이고, 위도·해륙 분포·해류·지형·기단·전선은 기후 요인이다.
  - 태양 에너지의 위도별 차이와 대기 대순환은 세계 기온·강수 분포의 큰 틀을 만든다.
  - 산지의 바람받이에는 비가 많이 내리고, 산맥 뒤편의 비그늘은 건조하다.
  - 쾨펜은 기온과 강수 기준으로 기후를 열대(A)·건조(B)·온대(C)·냉대(D)·한대(E)로 구분한다.
activity:
  template: layer-compare
  fictional: false
  config:
    title: 도시 기후 그래프와 기후형 함께 읽기
    instruction: 도시 표본 지도에서 서울·런던·야쿠츠크의 위치와 기후형을 찾고, 세 기후 그래프의 계절 패턴을 비교한다.
    prompt: 기온과 강수에서 확인한 차이를 설명하고, 원인을 더 구체적으로 살피려면 어떤 지역 자료가 필요한지 적으시오.
    fields:
      - { id: temperature, label: 기온의 계절 변화에서 확인한 차이 }
      - { id: precipitation, label: 강수의 계절 분포에서 확인한 차이 }
      - { id: climate-type, label: 지도에서 찾은 도시 대표점의 기후형 }
      - { id: more-evidence, label: 원인을 따져 보려면 더 필요한 지역 자료 }
keyTerms: [climate, climate-region]
sourceIds: [noaa-climate-classification, noaa-climate-factors, beck-2023-koppen-geiger]
---
## 기후 요소와 기후 요인

기후 요소는 기온·강수·바람처럼 기후의 상태를 나타내는 항목이고, 기후 요인은 요소의 지역 차이를 만드는 조건이다. 위도, 해륙 분포, 해류, 해발 고도, 지형, 기단과 전선이 기후 요인에 해당한다. 요인과 요소가 연결되는 모습을 개념도에서 확인하자. [[d1]]

## 위도와 대기 대순환

위도대에 따라 태양 에너지는 달라 적도에서 많고 극지방으로 갈수록 줄어든다. 적도 부근의 공기는 가열되어 상승하고, 아열대에서는 상공으로 이동한 공기가 내려오며, 중위도와 고위도에서는 공기가 오가며 전선과 저기압이 발달한다. 이 대기 대순환은 세계의 기온 분포와 강수 분포에 큰 띠를 만든다.

## 해륙 분포와 지형

수륙 분포(해륙 분포)는 해안과 내륙의 계절 기온 차이를 만든다. 바다는 육지보다 천천히 가열되고 식어 해안의 기온 변화를 완화하며, 해류는 연안으로 열과 수분을 옮긴다. 산지에서는 습한 바람이 바람받이 사면을 오르며 비를 내리고, 산맥을 넘은 공기는 하강하면서 건조해져 비그늘이 형성된다.

도시 기후는 위도와 바다까지의 거리, 해류·바람·지형의 조합에 따라 다르게 나타난다. 서울·런던·야쿠츠크의 계절별 기온과 강수 패턴을 비교해 보자. [[d3]] [[d4]] [[d5]]

## 세계의 기후 지역

쾨펜 기후 구분은 기온과 강수 기준으로 세계의 기후를 열대(A)·건조(B)·온대(C)·냉대(D)·한대(E)로 나눈다. 각 기후형은 다시 강수 계절과 기온 차이에 따라 세분된다. 도시 표본 지도에서 다섯 기후형이 분포하는 위도와 지역을 찾아보자. [[d2]]
