---
title: 지역 통합의 움직임은 왜 일어날까?
goal: 지역 협력체가 생기는 배경과 통합 수준의 차이를 자료에 근거해 설명할 수 있다.
opener: 서로 가까운 나라들이 공통 규칙을 만드는 까닭은 무엇일까? 지도에서 우리 지역과 연결된 협력체를 찾아보자.
textbookRef: { pages: [22, 24] }
steps:
  - id: d1
    type: map
    data: /data/01-02/rcep-membership-map.json
    label: RCEP 참여 국가
    caption: 역내 포괄적 경제 동반자 협정 참여 국가, 2026년
    source: u0102-rcep-membership-map
    alt: 2026년 RCEP 참여 국가를 세계 지도에 나타냈다. 싱가포르는 참여 값에 포함되지만 단순화된 바탕 지도에서 별도 도형으로 보이지 않는다.
    config: { kind: choropleth, unit: '참여 여부(회원=1, 비회원=0)' }
    concepts: [region, regional-integration, scale]
  - id: d2
    type: map
    data: /data/01-02/eu-accession-year-map.json
    label: EU 회원국 가입 연도
    caption: 현재 EU 회원국의 EEC·EU 가입 연도, 2026년 기준
    source: u0102-eu-accession-year
    alt: 현재 EU 회원국의 유럽경제공동체 또는 유럽연합 가입 연도를 국가별 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 'EEC 또는 EU 가입 연도' }
    concepts: [region, regional-integration, scale]
  - id: d3
    type: chart
    data: /data/01-02/eu-membership-count-series.json
    label: 유럽 공동체·EU 회원국 수 변화
    caption: 연말 기준 유럽 공동체·EU 회원국 수, 1958–2026년
    source: u0102-eu-membership-count
    alt: 유럽경제공동체에서 유럽 공동체와 유럽연합으로 이어진 회원국 수의 변화를 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2026, unit: '회원국 수(개국)' }
    concepts: [regional-integration, scale]
summary:
  - 지역은 어떤 자연·문화·경제 관계를 기준으로 보느냐에 따라 범위와 지역성이 다르게 나타난다.
  - 지역 통합은 국가와 지역이 공통 과제를 다루려고 협력과 규칙을 만드는 과정이다.
  - 협력체마다 참여 범위와 제도 결속의 수준이 다르며, 이익과 조정 과정도 여러 주체에게 다르게 나타난다.
routines:
  opener: { id: think-puzzle-explore, prompt: "RCEP 참여 국가 자료에서 협력체의 범위를 살피고, 함께 규칙을 만드는 이유에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: claim-support-question, prompt: "EU와 RCEP가 지역 통합을 추진한 이유를 주장으로 세우고, 자료 근거와 더 확인할 질문을 붙여 보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 지역 협력의 동기를 자료와 연결하기
    instruction: 경제·정치·안보·사회 범주에 항목을 분류하고, 한 항목이 여러 동기와 연결되는 근거를 덧붙인다.
    prompt: RCEP 지도와 유럽 공동체·EU의 회원국 자료를 살펴 공통 과제와 협력 범위를 설명하고, 통합으로 생기는 기회와 조정 과정을 함께 제시하시오.
    items:
      - { id: trade, text: 참여 지역 간 교역 규칙을 맞추고 사업 기회를 넓히려는 협력 }
      - { id: shared-rules, text: 여러 지역에 걸친 문제를 공통 기준으로 다루려는 협력 }
      - { id: security, text: 외교·안보 과제에 공동으로 대응하려는 협력 }
      - { id: exchange, text: 사람과 지식의 지역 간 교류를 돕는 협력 }
    categories:
      - { id: economic, label: 경제 }
      - { id: political, label: 정치 }
      - { id: security, label: 안보 }
      - { id: social, label: 사회 }
keyTerms: [region, regional-integration, scale]
sourceIds: [rcep-membership-01-02, eu-history-01-02, eu-enlargement-01-02]
---
## 지역과 지역성

지역은 자연환경이나 문화·경제 관계처럼 일정한 기준을 세워 구분한 공간이다. 지역성은 그 범위에 나타나는 고유한 관계와 특성이다. 같은 장소도 언어, 산업, 교역처럼 무엇을 살피느냐에 따라 다른 지역에 포함될 수 있다.

지역의 범위는 고정되어 있지 않다. 국가 경계를 기준으로 나눈 지역과 교역·안보 관계를 기준으로 묶은 지역은 서로 다를 수 있다. 지도의 범례를 확인하고 RCEP(역내 포괄적 경제 동반자 협정) 참여국이 아시아·태평양의 어느 공간에 분포하는지 살펴보자. [[d1]]

## 지역 협력체가 형성되는 까닭

지역 협력체는 여러 국가나 지역이 공통 과제를 함께 다루려고 만드는 제도적 관계다. 교역 규칙과 시장 접근, 외교·안보 대응, 사람과 지식의 교류처럼 목적은 여러 가지이며 서로 겹칠 수 있다.

RCEP에는 2026년 기준 15개국이 참여한다. 대한민국과 뉴질랜드는 참여국이고 인도는 참여국 목록에 없다. 뉴질랜드 정부는 인도가 2019년 협상에서 이탈했다고 기록한다. 회원국 지도는 교역 협정의 공간 범위를 보여 준다. 한 나라가 협정에 참여한다고 해서 모든 교역과 정책이 같은 방식으로 바뀌는 것은 아니므로, 기대되는 기회와 조정 과정을 함께 살펴보자. [[d1]]

## 통합의 범위와 수준

협력체마다 공통 규칙과 공동 제도의 범위가 다르다. RCEP는 여러 나라의 교역 규칙을 조정하는 협정이고, EU(유럽 연합)는 공동 기관과 정책을 포함한 더 넓은 통합 체계다. 두 사례의 회원 분포와 제도 범위를 나누어 보면 지역 협력의 다양한 수준을 이해할 수 있다.

현재 EU 회원국 지도에는 EEC(유럽 경제 공동체) 창립 참여 시점인 1958년부터 2013년 크로아티아 가입까지 서로 다른 연도가 나타난다. 회원국 수는 1958년 6개국, 1973년 9개국, 2013년 28개국으로 변했다. 영국의 2020년 탈퇴 뒤에는 2026년 현재 27개국이다. 지도와 시계열을 함께 읽으며 지역 협력체의 경계가 시간에 따라 바뀐 모습을 확인해 보자. [[d2]] [[d3]]
