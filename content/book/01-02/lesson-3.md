---
title: 지역의 역동성을 이해하는 것은 왜 중요할까?
goal: 도시화율과 대도시 집중 자료의 차이를 설명하고 여러 공간 규모의 생활권 변화를 고려한 대응 방안을 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/01-02/urbanization-rate-series.json
    source: u0102-urbanization-rate
    caption: 세계·대한민국·일본·독일·방글라데시 도시화율, 1960–2025년
    alt: 총인구 가운데 도시 거주 인구 비율의 변화를 세계와 네 국가별 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2025 }
    concepts: [region, scale]
  - id: s3
    type: chart
    data: /data/01-02/largest-city-urban-share-series.json
    source: u0102-largest-city-urban-share
    caption: 도시 인구 중 최대 도시 인구 비율, 1960–2025년
    alt: 국가별 도시 인구 가운데 가장 큰 도시권 인구가 차지하는 비율의 변화를 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2025 }
    concepts: [region, scale]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [region, scale, regional-integration, regional-separation]
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 도시권 생활권 변화 대응안 평가
    instruction: 가상 상황이다. 인접한 여러 도시와 주변 지역에서 통근·통학과 서비스 이용이 늘었다고 가정한다. 실제 지역의 통계나 주민 의견을 재현하지 않는다.
    prompt: 교통·주거·지역 균형·주민 참여 기준으로 대응안을 비교하고, 계획을 세우는 데 더 필요한 지역 자료를 제시하시오.
    options:
      - { id: transit, label: 도시와 주변 지역을 잇는 대중교통을 함께 조정 }
      - { id: housing, label: 대중교통과 생활 서비스에 접근하기 쉬운 주거를 계획 }
      - { id: balance, label: 일자리와 교육·의료 서비스를 여러 중심지에 연결 }
      - { id: participation, label: 인접 지역 주민이 함께 계획을 검토하는 협의 절차 마련 }
    criteria:
      - { id: transport, label: 통근·통학과 생활 서비스 접근성 }
      - { id: housing, label: 주거 선택과 비용 부담 }
      - { id: regional-balance, label: 중심지와 주변 지역의 균형 }
      - { id: participation, label: 여러 지역 주민의 의견과 참여 }
sourceIds: [wdi-urbanization-rate-01-02, wdi-largest-city-share-01-02, oecd-functional-urban-area, scotland-identities-2015, daejeon-seogu-shelters-transfer]
---
지역은 고정된 경계 안에 머물지 않는다. 제도와 이동, 사람들의 관계가 달라지면 생활 공간도 다시 짜인다. 사람들은 동네·도시·국가처럼 여러 공간 규모에 소속감을 가질 수 있다.

도시화율은 각국이 도시로 분류한 곳에 사는 인구가 총인구에서 차지하는 비율이다. 세계는 1960년 34.2%에서 2025년 57.8%로 나타난다. 대한민국은 같은 기간 27.7%에서 81.2%로 변했다. 2025년 값은 최신 연도 추정치나 잠정치일 수 있다.

최대 도시 인구 비율은 한 나라의 도시 인구 가운데 가장 큰 도시권에 사는 인구의 몫이다. 2025년 일본은 32.5%, 대한민국은 23.9%, 독일은 5.2%다. 국가별 도시 경계가 달라 도시 집중의 차이는 각 지표의 정의와 함께 읽는다.

도시화율은 도시 인구의 국가별 비중을, 최대 도시 지표는 도시 인구가 한 대도시에 모인 정도를 보여 준다. 두 자료는 통근·통학이나 일상 서비스의 실제 이동 범위를 직접 측정하지 않는다. functional urban area(기능적 도시권)를 살필 때에는 도시와 통근권을 잇는 이동 자료를 더한다.

가상 도시권 활동에서는 행정 경계를 넘는 생활권 변화에 대응할 방안을 평가한다. 교통 연결, 주거 선택, 지역 간 서비스와 일자리, 주민 참여를 기준으로 살핀다. 실제 통근 흐름이나 주거 수요는 제시된 국가 시계열이 아니라 지역 자료로 확인한다.
