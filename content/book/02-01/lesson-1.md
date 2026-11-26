---
title: 세계의 기후는 왜 지역마다 다르게 나타날까?
goal: 기후 요소와 기후 요인을 구분하고, 도시 기후 그래프와 기후형 자료를 비교해 지역 차이를 설명할 수 있다.
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
    data: /data/02-01/climograph-seoul.json
    source: u0201-climograph-seoul
    caption: 서울 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 서울의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - id: s4
    type: chart
    data: /data/02-01/climograph-london.json
    source: u0201-climograph-london
    caption: 런던 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 런던의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [climate, climate-region]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 서울과 런던의 기후 그래프 비교
    instruction: 두 그래프의 기온 선과 강수 막대를 읽고 월별 계절 패턴을 비교한다.
    prompt: 두 도시의 공통점과 차이를 자료에서 확인하고, 기후 요인 하나의 영향으로 단정하기 어려운 이유를 기록하시오.
    fields:
      - { id: seoul, label: 서울 그래프에서 확인한 기온과 강수 패턴 }
      - { id: london, label: 런던 그래프에서 확인한 기온과 강수 패턴 }
      - { id: compare, label: 두 그래프에서 함께 보이는 점과 다른 점 }
      - { id: limit, label: 원인을 설명하려면 더 필요한 자료 }
sourceIds: [noaa-climate-classification, noaa-climate-factors, beck-2023-koppen-geiger]
---
기후를 살필 때에는 기온과 강수처럼 관찰되는 기후 요소와, 그 요소의 지역 차이에 영향을 주는 기후 요인을 구분한다. 기후는 긴 기간의 평균적 흐름이다. 한 달이나 한 해의 날씨만으로 그 지역의 기후를 정하지 않는다.

기후형 지도는 기온과 강수의 계절 패턴을 기준으로 여러 지역을 구분한다. 이 자료는 세계 전체를 채운 분포 지도가 아니라 선정 도시의 대표점만 표시한다. 지도에서 서울은 냉대 겨울 건조 기후(Dwa), 런던은 서안 해양성 기후(Cfb)로 분류된다. 한 도시의 대표점은 도시 내부의 고도와 해안 거리 차이를 모두 나타내지 않는다.

서울 그래프에서 월평균 기온은 1월 -2.4°C, 8월 26.0°C다. 7월 월평균 강수량은 313.5mm로 나타난다. 겨울과 여름의 기온 차, 여름에 큰 강수가 나타나는 계절성을 확인할 수 있다. 이 값은 관측소 기록이 아니라 ERA5 재분석 격자 자료에서 계산한 월평균이다.

런던의 월평균 기온은 1월 5.3°C, 7월 17.8°C다. 강수 막대는 여러 달에 걸쳐 나타나며 서울과 계절 분포가 다르다. 두 그래프를 나란히 보면 기온과 강수의 계절 패턴을 비교할 수 있다. 두 도시의 차이만으로 위도나 바다의 영향 하나를 따로 측정했다고 볼 수는 없다.

위도는 받는 태양 에너지의 차이와 연결되고, 바다와 대륙의 분포는 기온의 계절 변화와 수분 공급에 영향을 줄 수 있다. 해발 고도가 높아지면 기온이 낮아질 수 있고, 해류와 대기 대순환도 기온과 강수 분포에 관여한다. 여러 요인이 함께 작용하므로 원인을 설명하려면 도시의 위치뿐 아니라 고도, 바람, 해류와 주변 지형 자료도 살펴야 한다.
