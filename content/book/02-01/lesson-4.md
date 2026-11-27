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
기후 적응은 지역의 기후 조건을 활용하거나 불리한 영향을 줄이기 위해 주거와 생산, 공공 기반 시설을 조정하는 일이다. 적응 방안은 지역 조건에 따라 달라진다. 물과 에너지의 이용 가능성, 시설을 마련하고 관리할 능력, 비용을 부담하는 주체도 함께 살핀다.

카이로 그래프는 도시 대표점의 ERA5 재분석 격자에서 계산한 월평균을 나타낸다. 6월부터 8월까지 월평균 강수량은 각각 0.0mm이고, 8월 월평균 기온은 29.7°C다. 이 값은 장기적인 계절 패턴을 보여 주며, 개별 연도와 장소별 기후는 더 세부적인 자료로 살펴본다.

물 스트레스 지도에서 이집트의 2022년 값은 141.2%다. 이 국가 지표는 환경 유량을 고려한 재생 가능 담수 자원에 견준 주요 부문의 담수 취수량을 나타낸다. 값은 100%를 넘을 수 있다. 주민별 물 접근과 물 부족의 원인은 지역 자료를 더해 살펴본다.

관개 토지 지도에서 이집트의 2022년 값은 농업용 토지 가운데 관개 토지가 차지하는 100.0%다. 이 비율은 관개 토지의 비중을 나타내며, 실제 농업용수 사용량과 관개 효율은 각각 별도 지표로 확인한다. 두 지도는 서로 다른 국가 지표이므로 관계를 살필 때에는 지역별 취수량과 관개 운영 자료도 함께 본다.

야쿠츠크 그래프에서는 겨울 기온이 매우 낮고 여름에는 영상 기온이 나타난다. 주택 단열은 실내외 열 이동을 줄여 냉난방 에너지를 낮출 수 있다. 효과와 비용은 건물 구조·재료·시공 상태에 따라 달라진다. 물 관리와 관개 조정도 에너지·환경 부담과 주민별 접근성을 함께 살펴 평가한다.
