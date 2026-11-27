---
title: 지역 통합의 움직임은 왜 일어날까?
goal: 지역 통합의 동기와 EU 확대의 시기별 변화를 자료로 살펴보고 통합의 이익과 조정 과정을 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-02/eu-accession-year-map.json
    source: u0102-eu-accession-year
    caption: 현재 EU 회원국의 EEC·EU 가입 연도, 2026년
    alt: 현재 EU 회원국의 유럽경제공동체·유럽연합 가입 연도를 국가별 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [region, regional-integration, scale]
  - id: s3
    type: chart
    data: /data/01-02/eu-membership-count-series.json
    source: u0102-eu-membership-count
    caption: 유럽 공동체·EU 회원국 수 변화, 1958–2026년
    alt: 연말 기준 유럽 공동체와 EU 회원국 수의 변화를 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2026 }
    concepts: [regional-integration, scale]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [region, regional-integration, scale]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 지역 통합의 동기 분류
    instruction: 각 문장에서 가장 두드러진 동기를 골라 분류한다. 한 동기가 여러 범주와 연결될 수 있으며, EU 확대 자료에서 근거를 찾아 덧붙인다.
    prompt: 경제·정치·안보·사회 범주에 항목을 놓고, 통합으로 기대되는 이익과 조정할 점을 자료에 근거해 설명하시오.
    items:
      - { id: market, text: 회원국 사이의 시장을 연결해 교역과 사업 기회를 넓히려는 동기 }
      - { id: shared-rules, text: 공통의 기준과 제도를 마련해 여러 지역의 문제를 함께 다루려는 동기 }
      - { id: peace-security, text: 평화와 안정, 공동의 안보 협력을 강화하려는 동기 }
      - { id: exchange, text: 국경을 넘어 학습·노동·생활의 교류 기회를 넓히려는 동기 }
    categories:
      - { id: economic, label: 경제 }
      - { id: political, label: 정치 }
      - { id: security, label: 안보 }
      - { id: social, label: 사회 }
sourceIds: [eu-history-01-02, eu-enlargement-01-02]
---
지역 통합은 여러 국가나 지역이 공통의 이익을 위해 협력과 연결을 강화하는 과정이다. 통합은 교역, 공동 규칙, 안전, 사람들의 교류처럼 여러 필요와 관련된다. 참여하는 범위와 협력의 깊이는 사례마다 다르다.

가입 연도 지도에서 현재 회원국의 색을 범례와 대조해 본다. 프랑스는 EEC(유럽경제공동체)의 창립 시점인 1958년, 아일랜드는 1973년, 크로아티아는 2013년을 가리킨다. 1958년은 EU 출범 연도가 아니라 EEC의 시작 시점이다. 영국은 1973년에 가입한 뒤 2020년에 탈퇴해 현재 회원국 지도에 나타나지 않는다.

회원국 수 그래프는 EEC에서 유럽 공동체를 거쳐 EU로 이어진 변화를 연말 기준으로 보여 준다. 1958년 6개국에서 1973년 9개국, 2004년 25개국, 2013년 28개국으로 늘었다. 영국 탈퇴 뒤에는 2020년과 2026년 모두 27개국이다. 지도에서 본 가입 시점을 그래프의 변화와 맞추어 살펴본다.

EU 집행위원회는 확대가 평화·안정과 공동 기준, 경제 기회와 국경 간 이동을 넓힌다고 설명한다. 가입 과정에서는 공통 법과 기준을 적용하고 제도 개혁을 진행한다. 그에 따른 이익과 조정 과정을 지역·산업·주민의 조건에 맞추어 평가한다.

통합의 동기는 경제·정치·안보·사회 측면이 겹칠 수 있다. 분류 활동에서는 한 항목을 우선 범주에 놓고, 다른 범주와도 연결되는 근거를 덧붙인다. 지도와 그래프에서 확인한 변화와 통합의 목적에 관한 설명을 구분한다.
