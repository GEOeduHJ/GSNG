---
title: '세계화 시대에 지역은 어떻게 대응할까?'
goal: 세계적 흐름이 지역 조건과 만나 달라지는 모습을 카나리아 제도 자료로 분석하고 대응 방안을 기준에 따라 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-01/region-canary-islands-point.geojson
    source: region-canary-islands-point
    caption: 카나리아 제도 대표 지점, 2021년
    alt: 지도 위에 카나리아 제도의 대표 위치를 나타낸 점 자료다.
    config: { kind: points }
    concepts: [scale, glocalization]
  - id: s3
    type: chart
    data: /data/01-01/region-canary-islands-series.json
    source: region-canary-islands-series
    caption: 카나리아 제도 관광 숙박일수, 2014–2024년
    alt: 카나리아 제도 관광 숙박일수의 연도별 변화를 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [interdependence, glocalization]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [glocalization, interdependence, scale]
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 카나리아 제도의 대응 방안 평가
    instruction: 관광 숙박일수 자료가 보여 주는 변화와 한계를 확인하고, 각 방안의 이익과 부담을 기준별로 비교한다.
    prompt: 주민 생활·지역 경제·환경 부담을 각각 살펴보고 가장 설득력 있는 대응을 근거와 함께 고르시오.
    options:
      - { id: expand, label: 관광 시설과 방문 규모 확대 }
      - { id: manage, label: 체류 기간과 방문 장소 관리·분산 }
      - { id: diversify, label: 지역 산업 다각화 }
    criteria:
      - { id: residents, label: 주민 생활 }
      - { id: economy, label: 지역 경제 }
      - { id: environment, label: 환경 부담 }
sourceIds: [eurostat-regional-tourism]
illustration:
  src: /images/01-01/lesson-2-local-response.webp
  alt: 여러 연령과 배경의 이웃들이 상자 속 생활 물품과 지역에서 기른 채소를 함께 살피며 공동 공간을 꾸민다.
---
세계적 흐름은 지역마다 다른 자연·문화·경제 조건과 만나 여러 모습으로 나타난다. glocalization(세계지역화)은 세계적 흐름을 지역의 조건과 주민의 선택에 맞게 받아들이고 새롭게 바꾸는 과정이다. 지역 주민과 기관은 흐름에 대응하며 지역의 모습을 만들어 간다.

카나리아 제도 대표 지점 자료에서 사례 지역의 위치를 확인한다. 점으로 표시된 위치와 통계의 집계 범위를 나누어 살펴본다. 지역의 경계와 주민 분포, 관광 활동 범위는 각각 해당 지역 자료에서 확인한다.

카나리아 제도의 관광 숙박일수는 2019년 약 9,611만 박에서 2020년 약 2,914만 박으로 줄었다. 2024년에는 약 9,949만 박으로 늘었다. 이 값은 관광 숙박시설에서 보낸 밤을 합한 숙박일수다. 방문객 수와 주민의 생활 변화, 변화의 원인은 관련 자료를 함께 살펴 확인한다.

관광 확대는 지역 경제 활동을 늘릴 수 있고 주민 생활과 환경에 부담을 줄 수도 있다. 방문 장소와 시기를 관리하거나 지역 산업을 다각화하는 방안도 함께 비교해 보자. 각 대안이 주민·사업자·공공기관에 주는 이익과 비용을 살피면 선택에 따른 차이가 드러난다.

대응을 평가할 때에는 누가 이익을 얻고 부담을 지는지, 누가 선택을 결정하는지 함께 살핀다. 숙박일수와 주민의 의견, 지역 경제·환경 자료를 연결하면 세계적 흐름이 지역에 미치는 영향을 구체적으로 설명할 수 있다.
