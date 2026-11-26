---
title: 온대 기후 지역은 왜 기후가 다양할까?
goal: 온대 기후 도시의 계절별 기온·강수 패턴을 비교하고 농업과 생활에 미칠 영향을 다른 지역 조건과 함께 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/02-01/climograph-athens.json
    source: u0201-climograph-athens
    caption: 아테네 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 아테네의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - id: s3
    type: chart
    data: /data/02-01/climograph-london.json
    source: u0201-climograph-london
    caption: 런던 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 런던의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - id: s4
    type: chart
    data: /data/02-01/climograph-shanghai.json
    source: u0201-climograph-shanghai
    caption: 상하이 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 상하이의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [climate-region, climate, human-environment-interaction]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 온대 기후의 강수 계절성 분류
    instruction: 세 도시의 월별 강수 막대를 살펴보고 여름과 겨울의 상대적 분포에 따라 분류한다.
    prompt: 각 도시의 강수 패턴을 분류하고, 농업이나 생활을 설명할 때 더 확인해야 할 조건을 적으시오.
    items:
      - { id: athens, text: 아테네는 여름 강수량이 겨울보다 적게 나타난다. }
      - { id: london, text: 런던은 연중 여러 달에 강수가 나타난다. }
      - { id: shanghai, text: 상하이는 여름철에 월 강수량이 크게 늘어난다. }
    categories:
      - { id: dry-summer, label: 여름 건조 }
      - { id: year-round, label: 연중 강수 }
      - { id: summer-wet, label: 여름 강수 집중 }
sourceIds: [noaa-climate-classification, beck-2023-koppen-geiger, fao-climate-crop-growth, fao-irrigated-crop-calendars]
---
온대 기후 지역은 기온이 계절에 따라 달라지고, 강수가 언제 얼마나 내리는지도 지역마다 다르다. 쾨펜–가이거 기후형 가운데 지중해성(Csa), 서안 해양성(Cfb), 온난 습윤(Cfa)은 기온과 강수의 계절 분포가 서로 다른 예다. 같은 온대라는 큰 범주만으로 한 지역의 기후를 모두 설명할 수 없다.

아테네는 여름이 건조하고 겨울에 상대적으로 비가 많은 지중해성 기후의 사례다. 1월 월평균 강수량은 51.7mm, 7월은 6.3mm다. 계절에 따라 강수량이 달라지므로 농사와 물 이용을 살필 때에는 비가 내리는 시기와 저장·관개 조건을 함께 고려할 수 있다.

런던은 서안 해양성 기후의 사례다. 그래프에서는 강수가 여러 달에 나뉘어 나타나고, 겨울과 여름의 기온 차도 아테네와 다르게 보인다. 계절별 기온선과 강수 막대를 함께 읽으면 두 지역을 기후형 이름만으로 외우지 않고 자료의 패턴으로 비교할 수 있다.

상하이는 온난 습윤 기후의 사례로, 강수량이 여름에 늘어나는 모습이 나타난다. 6월 월평균 강수량은 270.4mm이고 10월은 60.9mm다. 아테네의 여름 건조, 런던의 연중 강수, 상하이의 여름 강수 집중은 온대 안에서도 계절 리듬이 다름을 보여 준다.

강수와 기온의 계절성은 파종과 수확 시기를 계획할 때 참고할 수 있다. 그러나 농업은 토양과 지형, 작물의 특성, 관개 시설과 시장 접근성에도 영향을 받는다. 기후 그래프는 한 도시의 월평균 패턴을 나타낼 뿐이며, 특정 농가의 실제 생산이나 주민의 생활을 직접 보여 주는 자료는 아니다.
