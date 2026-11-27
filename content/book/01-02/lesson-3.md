---
title: 지역의 역동성을 이해하는 것은 왜 중요할까?
goal: 지역의 경계와 관계가 변화하는 사례를 자료로 살펴보고 변화에 능동적으로 대응할 이유를 설명할 수 있다.
opener: 협력체의 경계와 지역의 관계가 바뀌면 사람과 기업의 선택은 어떻게 달라질까? 서로 다른 규모의 변화를 연결해 보자.
textbookRef: { pages: [28, 30] }
steps:
  - id: d1
    type: chart
    data: /data/01-02/eu-membership-count-series.json
    label: 유럽 공동체·EU 회원국 수
    caption: 연말 기준 유럽 공동체·EU 회원국 수, 1958–2026년
    source: u0102-eu-membership-count
    alt: 유럽 공동체와 유럽연합의 회원국 수가 시간에 따라 변한 흐름을 선으로 나타냈다.
    config: { kind: line, maxYear: 2026, unit: '회원국 수(개국)' }
    concepts: [region, regional-integration, regional-separation, scale]
  - id: d2
    type: map
    data: /data/01-02/euro-area-accession-year-map.json
    label: 유로 도입 연도
    caption: 현재 유로 지역 회원국의 공용 화폐 도입 연도, 2026년 기준
    source: u0102-euro-area-accession-year
    alt: 유로를 사용하는 현재 회원국의 공용 화폐 도입 연도를 국가별 색으로 나타냈다. 값이 없는 국가는 유로 지역 밖이며 유럽연합 비회원국을 뜻하지 않는다.
    config: { kind: choropleth, unit: '유로 도입 연도' }
    concepts: [region, regional-integration, scale]
  - id: d3
    type: chart
    data: /data/01-02/intra-eu-exports-series.json
    label: EU27_2020 역내 재화 수출
    caption: EU27_2020 집계 기준 역내 재화 수출액, 2002–2025년
    source: u0102-intra-eu-exports
    alt: 2020년 기준 27개국 조합을 사용한 EU27_2020 역내 재화 수출액을 연도별로 나타냈다. 금액은 백만 유로의 명목값이다.
    config: { kind: line, maxYear: 2025, unit: '백만 유로' }
    concepts: [region, regional-integration, scale]
  - id: d4
    type: image
    schematic: true
    data: /images/01-02/regional-dynamics-cycle-schematic.svg
    label: 지역 관계의 변화 과정
    caption: 조건·연결·제도 변화와 지역성의 상호 작용
    source: ''
    alt: 조건 변화와 연결의 재편이 제도와 지역성에 영향을 주고, 새 관계가 다시 지역의 대응에 영향을 미치는 순환을 나타낸 개념도다.
    config: {}
    concepts: [region, regional-integration, regional-separation, scale]
summary:
  - 지역은 협력·분리, 제도와 사람의 관계가 달라지면서 여러 공간 규모에서 다시 구성된다.
  - 회원국 수, 통화 도입, 교역 관계는 지역의 결속과 변화를 서로 다른 방식으로 보여 준다.
  - 변화의 배경과 영향이 여러 집단에 다르게 닿으므로, 자료를 읽고 대응을 준비하려면 관점과 규모를 함께 살펴야 한다.
activity:
  template: decision-matrix
  fictional: true
  config:
    title: 가상 지역 협력 방식 비교
    instruction: 가상 상황이다. 여러 나라가 교역 규칙을 더 맞출지, 통화 선택은 각자 유지할지 논의한다고 가정한다. 실제 협정이나 주민의 입장을 재현하지 않는다.
    prompt: EU 회원국 수·유로 도입 연도·역내 교역 자료에서 확인한 관계를 근거로 선택지를 비교하고, 협력 변화가 여러 지역과 주체에 미칠 영향을 파악하는 데 필요한 자료를 제안하시오.
    options:
      - { id: closer, label: 교역 규칙과 일부 경제 제도를 더 긴밀하게 조정 }
      - { id: flexible, label: 교역 협력을 유지하며 제도 선택은 나라별로 넓게 보장 }
      - { id: gradual, label: 공통 과제부터 단계적으로 합의하고 영향을 점검 }
    criteria:
      - { id: exchange, label: 지역 간 교역·이동 관계의 연속성 }
      - { id: flexibility, label: 국가와 지역의 선택 폭 }
      - { id: distribution, label: 지역·산업·주민에게 돌아가는 기회와 조정 비용 }
      - { id: participation, label: 영향을 받는 주체의 참여와 의견 반영 }
keyTerms: [region, regional-integration, regional-separation, scale]
sourceIds: [eu-history-01-02, eu-euro-area-01-02, eurostat-intra-eu-trade-01-02, eurostat-eu27-2020-code, nato-members-01-02, barbados-republic-01-02]
---
## 지역 관계는 다시 구성된다

지역의 역동성은 지역의 경계와 관계, 지역성이 시간에 따라 달라지는 성격이다. 국가와 지역은 경제·정치·안보 환경이 바뀔 때 협력을 넓히거나 기존 관계를 조정한다. 유럽 공동체·EU 회원국 수는 1958년 6개국에서 2013년 28개국으로 늘었고, 영국 탈퇴 뒤 2026년에는 27개국이다. 시계열에서 증가와 감소가 나타난 시점을 찾아보자. [[d1]]

## 협력의 결속과 제도 선택

지역 협력은 하나의 제도 안에서도 서로 다른 수준으로 이루어진다. EU 회원국 가운데 공용 화폐 유로를 쓰는 국가는 2026년 21개국이다. 불가리아는 2026년에 유로를 도입했다. 유럽 연합 회원 여부와 유로 사용 여부를 구분해 도입 연도 지도를 살펴보자. [[d2]]

교역 관계도 지역의 연결을 보여 주는 지표다. EU 27개국 사이의 역내 재화 수출액은 2002년 약 1조 4,999억 유로에서 2020년 약 2조 8,563억 유로, 2025년 약 4조 1,508억 유로로 늘었다. 이 시계열은 2020년 기준 27개국 조합을 사용해 과거의 회원 구성 변화를 그대로 복원하지 않는다. 명목 금액에는 물가와 교역량 변화가 함께 반영되므로, 실질 변화와 원인을 살필 때에는 물가·물량 자료도 연결해 보자. [[d3]]

## 지역 변화에 대비하는 관점

협력체의 선택은 주변의 관계를 바꾸고 국가와 지역이 새 조건에 대응하게 한다. 핀란드는 2023년, 스웨덴은 2024년 북대서양 조약 기구에 가입했다. 바베이도스는 2021년에 공화국으로 전환했다. 경제 협력, 안보 관계, 국가 제도 변화는 서로 다른 사례지만 모두 지역 관계가 바뀌는 모습을 보여 준다.

관계 변화는 사람과 산업, 지역마다 다른 기회와 조정 과제를 만든다. 순환 개념도에서 조건·연결·제도의 변화가 지역성에 영향을 주고, 새 관계가 다시 다음 선택을 만드는 과정을 살펴보자. 자료를 함께 읽으면 변화의 방향과 필요한 대응을 더 구체적으로 설명할 수 있다. [[d4]]
