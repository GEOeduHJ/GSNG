---
title: '세계 곳곳에서 분쟁은 왜 일어날까?'
goal: 분쟁에 얽힌 여러 요인을 구분하고 사망자 지도와 무력 분쟁 시계열이 보여 주는 범위를 근거로 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/04-03/organized-violence-deaths-country-2025.json
    source: u0403-organized-violence-deaths-2025
    caption: 국가별 조직적 폭력 관련 사망자 수 추정, 2025년
    alt: 2025년 국가별 조직적 폭력 관련 사망자 수 추정치를 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [geopolitical-conflict, geopolitics]
  - id: s3
    type: chart
    data: /data/04-03/armed-conflict-count-series-1946-2025.json
    source: u0403-armed-conflict-count-series
    caption: 세계 국가기반 무력 분쟁 수, 1946–2025년
    alt: 국가 정부가 당사자인 무력 분쟁 수를 1946년부터 2025년까지 연도별 선으로 나타낸 그래프다.
    config: { kind: line }
    concepts: [geopolitical-conflict, geopolitics]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [geopolitics, geopolitical-conflict]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 기관 자료에 나타난 분쟁 맥락 분류
    instruction: 각 문장은 유엔 또는 유엔 임무의 공식 설명을 요약했다. 문장에 직접 드러난 요인에 연결하고, 분류가 한 사례의 단일 원인을 뜻하지 않음을 고려한다.
    prompt: 각 설명을 가장 가까운 요인에 분류하고, 한 사례에서 다른 요인도 함께 작용할 수 있는 까닭을 적으시오.
    items:
      - { id: resource-competition, text: 유엔은 자원 경쟁을 분쟁 위험과 연결되는 요인 가운데 하나로 설명한다. }
      - { id: community-identity, text: 유엔 키프로스 평화유지군(UNFICYP)의 공식 설명은 키프로스에서 그리스계 키프로스 공동체와 튀르키예계 키프로스 공동체 사이의 추가 충돌을 막기 위해 임무가 설치되었다고 밝힌다. }
      - { id: territory-relations, text: 유엔 골란 고원 관측군(UNDOF)의 공식 설명은 골란 지역에서 이스라엘군과 시리아군의 분리 합의 뒤 임무가 설치되었다고 밝힌다. }
      - { id: political-exclusion, text: 유엔 평화 구축 지침은 제도적 차별·배제·주변화를 분쟁의 근본 요인으로 다루도록 안내한다. }
    categories:
      - { id: resources, label: 자원·경제 }
      - { id: identity, label: 집단 정체성 }
      - { id: territory-relations, label: 영토·국제 관계 }
      - { id: political-exclusion, label: 정치·경제적 배제 }
sourceIds: [ucdp, un-peace-security-prevention, unficyp-factsheet, undof-factsheet, un-sustaining-peace-2017]
---
geopolitical conflict(지정학적 분쟁)는 영토·자원·경계·권력 등을 둘러싼 이해가 국제 정세와 얽혀 나타날 수 있다. 자원 접근, 정치·경제적 기회, 집단 정체성, 국가 간 관계 등 여러 조건이 함께 작용한다. 지정학은 장소와 권력의 관계를 살펴 이러한 맥락을 설명하는 관점이다.

2025년 지도는 국가 경계 안에서 기록된 조직적 폭력 관련 사망자의 추정치를 보여 준다. 우크라이나는 약 9만 명, 수단은 약 7만 5천 명으로 나타난다. 이 값은 전투 사망만을 세지 않은 웁살라 분쟁자료 프로그램(UCDP)의 가장 적절한 추정치다. 이스라엘·팔레스타인 지역은 UCDP의 단일 집계 단위로 별도 표시한다.

국가기반 무력 분쟁은 적어도 한 당사자가 국가 정부인 분쟁을 가리킨다. 시계열에서 1946년은 17건, 2000년은 40건, 2025년은 65건이다. 각 연도에 활동한 고유 분쟁 ID의 수이므로 당사자 수나 사망자 수와 구분해 읽는다.

기관 자료는 분쟁의 맥락을 서로 다른 각도에서 설명한다. 자원 경쟁, 공동체 사이의 긴장, 영토와 국가 간 합의, 정치·경제적 배제는 모두 살펴볼 요소다. 근거 분류 활동에서는 보고서가 직접 언급한 내용을 연결하고 여러 조건이 겹칠 가능성을 설명한다.

사망자 지도는 피해 규모의 공간 분포를, 시계열은 분쟁 수의 연도별 변화를 보여 준다. 분쟁의 원인과 책임, 지역 주민의 경험을 설명하려면 기관 보고서와 정치·경제 자료, 주민과 공동체의 목소리를 함께 살핀다.
