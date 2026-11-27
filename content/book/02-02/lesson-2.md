---
title: 땅 위에서 사람들은 어떻게 살아갈까?
goal: 세계의 주요 대지형을 구분하고 지형 조건이 정착·산업·재해 대응에 미치는 영향을 설명할 수 있다.
opener: 넓은 평야와 높은 산지, 해안 저지대는 사람들의 생활과 산업을 어떻게 다르게 이끌까? 지형의 이점과 위험을 함께 생각해 보자.
textbookRef: { pages: [74, 77] }
steps:
  - id: d1
    type: map
    data: /data/02-02/major-landforms.geojson
    label: 세계 주요 지형 지역
    caption: Natural Earth 주요 산지·고원·평야·분지·계곡·하구 평야의 일반화 대표점
    source: u0202-natural-earth-landforms
    alt: Natural Earth에 기록된 주요 산지·고원·평야·분지·저지대·계곡·협곡·하구 평야의 대표점을 범주별 색으로 나타내고 일부 지역 이름을 표시한 지도다.
    config: { kind: points, unit: '개 지형 지역' }
    concepts: [landform]
  - id: d2
    type: map
    data: /data/03-01/population-density-map-2024.json
    label: 국가별 인구 밀도
    caption: World Bank WDI, 국가별 인구 밀도, 2024년
    source: u0301-population-density
    alt: 2024년 국가별 인구 밀도를 색으로 나타낸 세계 지도다.
    config: { kind: choropleth, unit: '명/km²' }
    concepts: [human-environment-interaction]
  - id: d3
    type: map
    data: /data/02-02/earthquakes-m6-2000-2025.geojson
    label: 세계 규모 6 이상 지진 분포
    caption: USGS ComCat catalog=us, 2000–2025년 규모 6 이상 지진
    source: u0202-usgs-earthquakes-m6
    alt: USGS ComCat catalog=us에 기록된 2000년부터 2025년까지 규모 6 이상 지진의 발생 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '건' }
    concepts: [landform, human-environment-interaction]
  - id: d4
    type: map
    data: /data/02-02/holocene-volcanoes.geojson
    label: 세계 홀로세 화산 분포
    caption: Smithsonian GVP Volcanoes of the World v5.4.1, 2026-11-15 기준
    source: u0202-gvp-holocene-volcanoes
    alt: Smithsonian GVP 홀로세 화산 목록에 기록된 화산 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 화산' }
    concepts: [landform, human-environment-interaction]
  - id: d5
    type: map
    data: /data/02-02/low-elevation-population-map.json
    label: 저지대 거주 인구 비율
    caption: World Bank WDI, 해발 5m 미만 지역 거주 인구 비율, 2015년
    source: u0202-wdi-low-elevation-population
    alt: 국가 전체 인구 중 해발 5m 미만 저지대에 거주하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [landform, human-environment-interaction]
  - id: d6
    type: map
    data: /data/02-02/low-elevation-land-area-map.json
    label: 저지대 면적 비율
    caption: World Bank WDI, 전체 국토 중 해발 5m 미만 저지대 면적 비율, 2015년
    source: u0202-wdi-low-elevation-land-area
    alt: 국가 전체 면적 중 해발 5m 미만 저지대가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [landform, human-environment-interaction]
summary:
  - 안정육괴는 순상지와 구조 평야로 나타나며, 주변에 오래된 습곡 산지가 놓이기도 한다.
  - 신기 습곡 산지는 판의 충돌대에 길게 이어지고 지진·화산 활동과 관련된다.
  - 평야·하천·산지의 지형 조건은 정착, 농업, 자원 이용, 교통과 재해 대응에 영향을 준다.
  - 저지대의 생활은 국가별 지형·인구 분포와 방재 시설, 토지 이용을 함께 살펴 설명한다.
routines:
  opener: { id: see-think-wonder, prompt: "세계 주요 지형 지역 자료에서 평야·산지와 인구 분포를 살피고, 생활 조건의 차이에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: parts-people-interactions, prompt: "저지대 사례에서 지형·주민·산업·방재 시설이 어떻게 영향을 주고받는지 연결해 보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 대지형·인구·저지대 생활 비교
    instruction: 지형 지역, 국가별 인구 밀도, 지진·화산 위치, 저지대 인구와 면적 비율을 차례로 비교한다.
    prompt: 대지형 유형별 형성 과정과 생활 조건을 정리하고, 해안 도시의 재해 위험을 평가할 때 추가할 지역 자료를 제안하시오.
    fields:
      - { id: landforms, label: 산지·고원·평야·저지대의 분포와 형성 }
      - { id: population, label: 인구 분포와 정착·산업의 관계 }
      - { id: hazards, label: 지진·화산 위치와 주민의 이용·적응 }
      - { id: lowlands, label: 저지대 거주 인구와 저지대 면적의 차이 }
      - { id: additional, label: 지역별 재해와 생활을 설명하는 데 더 필요한 자료 }
keyTerms: [landform, human-environment-interaction]
sourceIds: [natural-earth-physical-regions, usgs-cratons, usgs-dynamic-earth, usgs-continent-change, nps-landforms, world-bank-wdi-03-01, world-bank-wdi-02-02]
---
## 세계 대지형의 분포

세계의 대지형은 언제 만들어졌고 지각 변동을 얼마나 받았는지에 따라 크게 세 가지로 나눈다. 오래전에 굳어 변동이 거의 없는 안정육괴, 고생대 무렵 습곡 작용을 받은 고기 습곡 산지, 비교적 최근의 지각 변동으로 솟은 신기 습곡 산지다. 안정육괴의 중심에는 오래된 기반암이 드러난 순상지가 있고, 주변에는 퇴적층이 넓게 덮인 구조 평야가 나타난다. 고기 습곡 산지는 오랜 침식으로 낮고 완만해진 곳이 많으며, 애팔래치아산맥과 우랄산맥이 대표 사례다. 신기 습곡 산지는 판이 충돌하거나 해양판이 섭입하는 곳을 따라 이어지며, 히말라야산맥·알프스산맥처럼 대륙판끼리 부딪쳐 솟은 산지와 안데스산맥처럼 섭입대에서 솟은 산지가 있다.

대륙 내부의 순상지와 구조 평야, 가장자리의 산맥과 분지 분포를 함께 보면 지형의 배열과 형성 과정이 연결된다. 산지·고원·평야·분지·계곡·삼각주가 어느 대륙에 모여 있는지 찾아보자. [[d1]]

## 지형 조건과 정착·산업

평야의 농업과 정착은 넓은 농경지와 물, 이동 경로를 바탕으로 발달한다. 대륙 내부의 평야는 곡물 생산과 도시·교통망의 기반이 되고, 산지와 오래된 지질대에서는 광물 자원과 수력·산림 자원이 생활과 산업에 쓰인다. 주요 공업 지역은 지하자원과 물, 교통 경로를 활용해 성장해 왔다. 하천의 이용은 농업용수와 공업용수 공급, 사람과 물자의 이동을 함께 뒷받침한다.

사람들은 대체로 농사짓고 오가기 쉬운 평야와 해안에 모여 산다. 국토 대부분이 삼각주 평야인 방글라데시는 인구 밀도가 매우 높고, 고원과 사막이 넓은 몽골은 매우 낮다. 화산 지역에서는 비옥한 화산회토를 활용한 농업과 온천·간헐천 관광, 지열 발전이 이루어지며 주민들은 경보·내진 설계·대피 계획으로 위험 예방과 적응을 준비한다. 지형과 인구 밀도, 홀로세 화산 분포를 나란히 읽고 이용 방식의 차이를 찾아보자. [[d2]] [[d4]]

## 위험 지형과 저지대 생활

판 경계의 지진과 화산 활동은 주변 마을과 도시의 건물·교통·산업에 영향을 준다. 2011년 동일본 대지진은 일본 동북부 앞바다의 판 경계에서 일어나 거대한 쓰나미를 일으켰고, 해안 도시와 마을에 큰 피해를 남겼다. 지진 분포 지도에서 태평양을 둘러싼 판 경계에 지진이 얼마나 모여 있는지 확인해 보자. [[d3]]

바다와 만나는 평야와 삼각주는 농업·항만·도시가 자리 잡는 공간인 동시에 쓰나미와 범람에 대비해야 하는 곳이다. 2015년 방글라데시의 저지대 거주 인구는 전체 인구의 8.4%이고 저지대 면적은 국토의 15.9%다. 네덜란드는 각각 53.7%와 52.0%다. 저지대 비율은 해발 5m 미만 지역을 기준으로 한 값이다. [[d5]] [[d6]]
