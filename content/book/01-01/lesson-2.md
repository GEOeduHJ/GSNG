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
세계화는 지역을 바깥 세계와 연결하지만, 모든 지역을 같은 모습으로 바꾸지는 않는다. glocalization(세계지역화)은 세계적 흐름이 지역의 자연·문화·경제 조건과 만나 선택되고 새롭게 바뀌는 과정이다. 지역은 외부의 흐름에 수동적으로 따르기만 하는 곳이 아니다.

카나리아 제도 대표 지점 자료에서 사례 지역의 위치를 확인한다. 이 점 자료는 장소의 위치를 보여 주지만, 지역의 경계나 주민 분포, 관광 활동이 이루어지는 범위까지 보여 주지는 않는다. 지도에서 보이는 공간 범위와 통계의 집계 범위를 구분한다.

카나리아 제도의 관광 숙박일수는 2019년 96,113,149박에서 2020년 29,139,353박으로 줄었다. 2024년에는 99,488,821박으로 다시 늘었다. 이 자료는 관광 숙박시설에서 보낸 밤의 수를 더한 값이다. 방문객 수나 주민의 생활 변화, 변화의 원인을 직접 보여 주지는 않는다.

지역의 대응 방안은 하나로 정해져 있지 않다. 관광을 확대하면 경제 활동이 늘 수 있지만, 주민 생활과 환경에 미칠 부담도 살펴야 한다. 방문 장소와 시기를 관리하거나 지역 산업을 다각화하는 방안도 검토할 수 있다. 각 대안은 주민·사업자·공공기관에 서로 다른 이익과 비용을 만들 수 있다.

대응을 평가할 때에는 누가 이익을 얻고 부담을 지는지, 누가 선택을 결정할 수 있는지 함께 본다. 숙박일수의 회복만으로 지역 주민 모두의 생활이 나아졌다고 결론 내릴 수는 없다. 지역 자료와 주민의 의견, 경제·환경 자료를 더 모아야 세계적 연결이 지역에 미치는 영향을 구체적으로 설명할 수 있다.
