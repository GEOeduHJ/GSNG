---
title: 사람들은 불리한 기후를 어떻게 극복할까?
goal: 건조·냉대·한대 기후의 자연환경과 이에 맞춘 생업·주거를 설명하고, 기후와 생활의 오늘날 변화를 살핀다.
opener: 강수와 겨울 추위가 극심한 지역에서 주민들은 물·집·생업을 어떻게 마련할까?
textbookRef: { pages: [62, 65] }
steps:
  - id: d1
    type: map
    data: /data/02-01/climate-city-points.geojson
    label: 도시 표본의 건조·한랭 기후형
    caption: 선정 도시의 쾨펜–가이거 기후형, 1991–2020년 분류 (Beck et al., 2023)
    source: u0201-climate-city-points
    alt: 세계 여러 기후 지역에 있는 도시 대표점과 각 지점의 쾨펜–가이거 기후형을 나타낸 지도다.
    config: { kind: points, unit: '기후형' }
    concepts: [climate-region]
  - id: d2
    type: chart
    data: /data/02-01/climograph-cairo.json
    label: 카이로 기후 그래프
    caption: 카이로 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-cairo
    alt: 카이로 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region, climate-adaptation]
  - id: d3
    type: map
    data: /data/02-01/water-stress-map.json
    label: 국가별 물 스트레스
    caption: 국가별 물 스트레스 지표, 2022년 (World Bank WDI, FAO AQUASTAT)
    source: u0201-water-stress-map
    alt: 주요 부문의 담수 취수량을 환경 유량을 고려한 재생 가능 담수 자원과 비교한 국가별 지표를 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [climate-adaptation, human-environment-interaction]
  - id: d4
    type: map
    data: /data/02-01/irrigated-land-map.json
    label: 농업용 관개 토지 비율
    caption: 국가별 농업용 토지 중 관개 토지 비율, 2024년 (World Bank WDI, FAOSTAT)
    source: u0201-irrigated-land-map
    alt: 전체 농업용 토지 가운데 관개 토지가 차지하는 비율을 국가별로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [climate-adaptation, human-environment-interaction]
  - id: d5
    type: chart
    data: /data/02-01/climograph-yakutsk.json
    label: 야쿠츠크 기후 그래프
    caption: 야쿠츠크 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-yakutsk
    alt: 야쿠츠크 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region, climate-adaptation]
  - id: d6
    type: chart
    data: /data/02-01/climograph-nuuk.json
    label: 누크 기후 그래프
    caption: 누크 월평균 기온·강수량, 1991–2020년 ERA5 평년 (Open-Meteo, ECMWF/Copernicus C3S)
    source: u0201-climograph-nuuk
    alt: 누크 도시 대표 격자의 월평균 기온은 선으로, 월평균 강수량은 막대로 나타낸 기후 그래프다.
    config: { kind: climograph, unit: '기온(°C)·강수량(mm)' }
    concepts: [climate, climate-region, climate-adaptation]
summary:
  - 사막·스텝 주민은 오아시스·나일강·카나트의 물을 관개에 쓰고, 유목으로 건조한 초지를 이용한다.
  - 냉대의 타이가에는 침엽수림과 임업이 발달하며 야쿠츠크는 기온의 연교차가 크다.
  - 한대에는 툰드라와 빙설 경관이 나타나고, 영구 동토층의 건축과 북극권 생업은 기후·사회 변화에 맞춰 바뀐다.
  - 기후 적응은 물·주거·생업을 지역의 환경과 기술, 주민의 선택에 맞게 조정하는 과정이다.
routines:
  opener: { id: compass-points, prompt: "국가별 물 스트레스 자료에서 물 이용의 걱정과 적응 가능성을 살피고, 판단에 필요한 정보를 적어 보자." }
  inquiry: { id: options-diamond, prompt: "건조 지역의 관개 확대와 물 절약 방안을 비교해, 장점과 한계를 살리고 줄일 선택을 구상해 보자." }
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 기후 적응 방안의 기준별 평가
    instruction: 카이로·야쿠츠크·누크 가운데 사례를 고르고, 기후 그래프에서 확인한 필요와 국가 통계의 범위를 구분한다.
    prompt: 각 방안을 기준별로 검토하되 실제 비용과 에너지 사용량은 이 자료에 없음을 밝히시오. 이익과 한계, 더 필요한 근거를 함께 설명하시오.
    options:
      - { id: shade, label: 그늘과 자연 환기를 고려한 주거 설계 }
      - { id: insulation, label: 단열 보강과 효율적인 냉난방 }
      - { id: water, label: 물 저장·재이용·누수 관리 }
      - { id: irrigation, label: 농사 시기와 관개량 조정 }
    criteria:
      - { id: climateFit, label: 자료에서 확인한 기후 조건에 맞음 }
      - { id: cost, label: 구축·유지 비용을 감당할 가능성 }
      - { id: energy, label: 운영 에너지 부담이 적음 }
      - { id: environment, label: 환경 부담이 적음 }
      - { id: residents, label: 다양한 주민의 생활을 지원 }
keyTerms: [climate, climate-region, climate-adaptation, human-environment-interaction]
sourceIds: [noaa-climate-classification, noaa-climate-factors, beck-2023-koppen-geiger, fao-water-stress-indicator, world-bank-irrigated-land, doe-energy-saver-guide-2022]
illustration:
  src: /images/02-01/climate-adaptation.webp
  alt: 그늘막과 단열층, 빗물 저장 탱크를 활용해 집과 정원을 돌보는 사람들.
---
## 건조 기후와 물 이용

건조 기후는 증발량이 강수량보다 많고, 사막에는 강수와 식생이 매우 적으며 스텝에는 짧은 풀이 자라는 초원이 펼쳐진다. 오아시스는 지하수나 샘이 드러나 물을 얻는 곳이고, 이집트의 나일강은 사막을 흐르는 외래 하천으로 물을 끌어들여 관개 농업과 정착지를 형성했다. 오아시스와 하천의 물을 나누고 보관하는 일은 건조 지역의 물 관리에서 중요하다.

이란 등 건조 지역의 카나트는 산지의 지하수를 지하 수로로 마을과 농경지에 공급한다. 유목은 드문 풀과 물을 찾아 가축과 함께 이동하는 생업이며, 흙벽돌로 만든 두꺼운 벽과 작은 창은 강한 햇빛과 큰 일교차로부터 실내를 보호한다. 카이로의 기온과 강수에서 건조 기후의 특징을 찾아보자. [[d1]] [[d2]]

건조 지역에서는 물의 확보와 농업용 관개가 주민 생활과 생산의 조건이 된다. 물 스트레스와 관개 토지 비율은 측정 대상·분모·기준 연도가 달라 두 자료를 물 부족의 원인과 결과로 직접 연결해 설명하지 않는다. [[d3]] [[d4]]

## 냉대·한대 기후와 계절 적응

냉대 기후 지역에는 타이가라 불리는 침엽수림이 넓게 분포하고 목재 생산·가공을 중심으로 임업이 발달한다. 시베리아 내륙의 야쿠츠크는 겨울이 길고 매우 추우며 여름은 짧아 기온의 연교차가 크다. 기후 그래프에서 계절별 기온 차이를 확인하자. [[d5]]

한대 기후에는 나무가 거의 자라지 않는 툰드라와 눈·얼음으로 덮인 빙설 지역이 나타난다. 북극권의 이누이트 공동체에서는 전통 사냥·어업과 학교·임금 노동이 함께 이루어진다. 북유럽과 시베리아의 사미·네네츠 일부는 순록 유목을 이어 간다. 영구 동토층에서는 건물을 지면에서 띄운 고상식으로 세워 기초의 열이 땅을 녹이는 일을 줄인다. 누크의 기후 그래프에서 한대의 계절 기온을 살펴보자. [[d6]]

## 적응 방안을 함께 평가하기

건조·한랭 지역의 생활은 기후뿐 아니라 교통·도시화·기술과 주민의 선택에 따라 달라진다. 기후 온난화는 북극의 해빙과 영구 동토층을 바꾸고, 자원 개발과 기반 시설 확충도 이동 경로와 생업에 변화를 준다. 지역사회는 전통 지식과 새로운 기술을 결합해 주거·물 이용·생산 방식을 조정한다. 이처럼 기후 적응은 인간과 자연환경의 상호 작용을 드러내며, 난방·냉방과 물 공급에 쓰는 에너지 소비도 바꾼다.
