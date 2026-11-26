---
title: 사람들은 불리한 기후를 어떻게 극복할까?
goal: 건조하고 더운 곳과 추운 곳의 기후 자료를 읽고 적응 방안의 필요와 비용·에너지·환경·주민 생활에 미칠 영향을 함께 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/02-01/climograph-cairo.json
    source: u0201-climograph-cairo
    caption: 카이로 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 카이로의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-region]
  - id: s3
    type: map
    data: /data/02-01/water-stress-map.json
    source: u0201-water-stress-map
    caption: 국가별 물 스트레스 수준, 2022년 (FAO AQUASTAT, World Bank WDI)
    alt: 2022년 국가별 물 스트레스 지표의 값을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [climate-adaptation, human-environment-interaction]
  - id: s4
    type: map
    data: /data/02-01/irrigated-land-map.json
    source: u0201-irrigated-land-map
    caption: 국가별 농업용 관개 토지 비율, 2022년 (FAOSTAT, World Bank WDI)
    alt: 2022년 국가별 농업용 토지 중 관개 토지의 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [climate-adaptation, human-environment-interaction]
  - id: s5
    type: chart
    data: /data/02-01/climograph-yakutsk.json
    source: u0201-climograph-yakutsk
    caption: 야쿠츠크 월평균 기온·강수량, 1991–2020년 ERA5 재분석 격자값
    alt: 야쿠츠크의 월평균 기온은 선, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph }
    concepts: [climate, climate-adaptation]
keyTerms: [climate-adaptation, human-environment-interaction, climate]
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 기후 적응 방안의 기준별 평가
    instruction: 카이로나 야쿠츠크 가운데 한 사례를 고르고, 해당 기후 자료에서 확인한 필요에 맞추어 방안을 평가한다.
    prompt: 각 방안을 기준별로 평가하되, 실제 비용과 에너지 사용량은 이 자료에 없음을 밝히시오. 점수 합계만으로 결론 내리지 말고 이익과 한계, 더 필요한 근거를 설명하시오.
    options:
      - { id: shade, label: 그늘·차양과 자연 환기를 고려한 주거 설계 }
      - { id: insulation, label: 단열·기밀 보강과 효율적인 냉난방 }
      - { id: water, label: 물 저장·재이용·누수 관리 }
      - { id: irrigation, label: 농사 시기와 관개량 조정 }
    criteria:
      - { id: climateFit, label: 자료에서 확인한 기후 조건에 맞음 }
      - { id: cost, label: 구축·유지 비용을 감당할 가능성 }
      - { id: energy, label: 운영 에너지 부담이 적음 }
      - { id: environment, label: 환경 부담이 적음 }
      - { id: residents, label: 주민 생활을 폭넓게 지원 }
sourceIds: [fao-water-stress-indicator, world-bank-irrigated-land, fao-irrigated-crop-calendars, doe-energy-saver-guide-2022]
illustration:
  src: /images/02-01/climate-adaptation.webp
  alt: 그늘막과 단열층, 빗물 저장 탱크를 활용해 집과 정원을 돌보는 사람들.
---
기후 적응은 지역의 기후 조건을 활용하거나 불리한 영향을 줄이기 위해 주거와 생산, 공공 기반 시설을 조정하는 일이다. 한 가지 방안이 모든 지역에 맞지는 않는다. 이용할 수 있는 물과 에너지, 시설을 마련하고 관리할 능력, 비용을 부담하는 주체도 함께 살펴야 한다.

카이로 그래프에서는 6월부터 8월까지 월평균 강수량이 각각 0.0mm이고, 8월 월평균 기온은 29.7°C다. 이는 재분석 격자값으로 계산한 30년 평균의 패턴이다. 특정 해에 비가 전혀 오지 않았다거나 모든 주민이 같은 열환경을 겪는다는 뜻은 아니다.

물 스트레스 지도에서 이집트의 2022년 값은 141.2%다. 이 지표는 환경 유량을 고려한 재생 가능 담수 자원과 주요 부문의 담수 취수량을 비교한다. 100%를 넘을 수 있는 국가 지표이며, 주민 가운데 물을 이용하지 못하는 사람의 비율이나 물 부족의 원인을 직접 나타내지 않는다.

관개 토지 지도에서 이집트의 2022년 값은 농업용 토지 중 관개 토지가 차지하는 100.0%다. 이 비율은 해당 농지의 관개 토지 비중을 나타내며, 농업이 실제 사용한 물의 양이나 관개 효율을 보여 주지는 않는다. 두 지도는 서로 다른 지표이므로 나란히 읽더라도 관개가 물 스트레스를 일으켰다고 결론 내릴 수 없다.

야쿠츠크 그래프에서는 겨울철 기온이 매우 낮고 여름에는 영상 기온이 나타난다. 주택의 단열은 실내와 바깥 사이 열의 이동을 줄여 냉난방에 필요한 에너지를 낮출 수 있지만, 효과와 비용은 건물 구조와 재료, 시공 상태에 따라 달라진다. 물 관리와 관개 조정도 기후에 맞는 선택이 될 수 있으나, 에너지·환경 부담과 주민별 접근성을 함께 평가해야 한다.
