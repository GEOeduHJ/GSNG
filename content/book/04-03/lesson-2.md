---
title: '국제 난민의 발생과 이동'
goal: 1951년 난민 협약의 난민과 국내 실향민을 구분하고, 인접국 이동 사례와 정착 지원에서 난민의 선택·참여를 설명할 수 있다.
opener: 박해와 전쟁을 피해 국경을 넘은 사람들은 어디에서 안전을 찾고, 새 지역에서 어떻게 삶을 꾸릴까?
textbookRef: { pages: [206, 207] }
steps:
  - id: d1
    type: chart
    data: /data/04-03/forcibly-displaced-origin-top10-2025.json
    label: 출신지별 국외 강제 이주민
    caption: 출신지별 국외 강제 이주민 상위 지역, 2025년 12월
    source: u0403-forced-displacement-origin-top10-2025
    alt: 2025년 12월 출신지별 국외 강제 이주민 인구 재고 상위 지역을 막대로 비교한 그래프다.
    config: { kind: bar, unit: '명' }
    concepts: [geopolitical-conflict, global-justice]
  - id: d2
    type: chart
    data: /data/04-03/forcibly-displaced-host-top10-2025.json
    label: 수용국별 국외 강제 이주민
    caption: 수용국별 국외 강제 이주민 상위 국가, 2025년 12월
    source: u0403-forced-displacement-host-top10-2025
    alt: 2025년 12월 수용국별 국외 강제 이주민 인구 재고 상위 국가를 막대로 비교한 그래프다.
    config: { kind: bar, unit: '명' }
    concepts: [international-cooperation, global-justice]
  - id: d3
    type: chart
    data: /data/04-03/global-forcibly-displaced-series-2006-2025.json
    label: 세계 강제 이주민 총계의 변화
    caption: UNHCR이 공개한 세계 강제 이주민 총계, 2006–2025년
    source: u0403-global-forced-displacement-series
    alt: 2006년부터 2025년까지 UNHCR이 공개한 세계 강제 이주민 총계의 흐름을 선으로 나타낸 그래프다.
    config: { kind: line, unit: '백만 명' }
    concepts: [geopolitical-conflict, global-justice]
  - id: d4
    type: image
    schematic: true
    data: /images/04-03/displacement-agency-schematic.svg
    label: 강제 이주 뒤의 선택과 참여
    caption: 사람의 선택과 역량, 지원 여건의 관계
    source: ''
    alt: 안전과 생계, 가족 관계, 제도와 정보가 사람들의 판단에 작용하고, 난민이 지역 사회와 함께 지원과 생활을 만들어 가는 개념도다.
    config: {}
    concepts: [international-cooperation, global-justice]
summary:
  - 1951년 난민 협약의 난민은 박해를 피해 국경을 넘은 사람이며, 국내 실향민은 국경을 넘지 않고 자국 안에 머문다.
  - 정치·사회적 불안과 경제 기반의 약화, 자연재해는 강제 이주를 일으킬 수 있다.
  - 시리아 난민은 튀르키예 등 인접국으로, 베네수엘라 출신 난민·이주민은 콜롬비아 등으로 이동했다.
  - 교육·법적 지위·일자리·주거 지원은 난민의 선택과 지역 참여를 바탕으로 마련된다.
routines:
  opener: { id: see-think-wonder, prompt: "세계 강제 이주민 총계의 변화 자료를 살펴, 이동 뒤 안전과 생활에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: step-in-step-out-step-back, prompt: "난민과 수용 지역 주민의 처지를 각각 살피고, 정착 지원 자료에 비추어 내 관점의 한계도 돌아보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 출신지·수용국·세계 총계 연결하기
    instruction: 출신지와 수용국의 인구 재고, 세계 총계의 시계열을 구분해 각 자료가 답하는 질문을 정리한다.
    prompt: 이동의 공간 양상과 정착에 필요한 조건을 설명하고, 난민과 수용 지역 주민이 함께 결정에 참여할 방법을 제안하시오.
    fields:
      - { id: origin, label: 출신지 자료에서 확인한 분포 }
      - { id: host, label: 수용국 자료에서 확인한 분포 }
      - { id: total, label: 세계 총계에서 읽은 변화 }
      - { id: agency, label: 난민의 선택·역량과 지역 참여 }
      - { id: support, label: 교육·보건·생계를 위한 협력 방안 }
keyTerms: [international-cooperation, global-justice]
sourceIds: [unhcr-refugee-data-finder, unhcr-global-forced-displacement, unhcr-education-emergencies, who-refugee-migrant-health, unhcr-livelihoods-economic-inclusion, unhcr-1951-refugee-convention, unhcr-internal-displacement-definition, unhcr-syria-regional-response, unhcr-venezuela-colombia]
---
## 난민의 법적 의미와 강제 이주의 원인

난민은 박해나 전쟁·폭력의 위험에서 벗어나 국경을 넘어 국제 보호를 구하는 사람이다. 1951년 난민 협약에서 난민은 인종·종교·국적·특정 사회 집단 소속·정치적 의견을 이유로 박해를 받을 충분한 근거가 있는 두려움으로 국적국 밖에 있으며, 본국의 보호를 받을 수 없거나 그 두려움 때문에 보호를 원하지 않는 사람을 뜻한다. 국내 실향민은 집을 떠나도 국제 국경을 넘지 않고 자국 안에 머문다.

강제 이주는 정치적 박해와 전쟁뿐 아니라 사회적 불안정, 일자리와 생계 기반의 붕괴, 가뭄·홍수 같은 재해로도 일어날 수 있다. 경제적 어려움이나 재해만으로 협약상 난민 지위가 자동으로 주어지는 것은 아니며, 국경 이동과 보호 필요에 따라 법적 범주가 달라진다.

## 난민의 인접국 이동과 수용

시리아를 떠난 주민 가운데 많은 사람이 튀르키예·레바논·요르단·이라크·이집트 등 인접국으로 이동했다. 베네수엘라를 떠난 난민과 이주민도 콜롬비아에서 생활 기반을 마련했다. 출신지·수용국 자료에서 시리아와 베네수엘라, 튀르키예와 콜롬비아를 찾아 인접국 이동 사례를 확인하되, 2025년 12월 국외 인구 재고가 개인별 이동 경로와 다르다는 점을 구분하자. [[d1]] [[d2]]

강제 이주 규모는 지역별 분쟁과 박해, 재해의 전개에 따라 달라진다. 세계 강제 이주민 총계의 2006–2025년 흐름에서 장기적인 변화와 최근의 증감을 찾아보자. [[d3]]

## 난민의 정착 지원과 지역 참여

수용 지역은 학교와 언어 교육, 법적 지위와 체류 정보, 안전한 주거, 일자리 연결과 자격 인정 같은 과제를 조정해야 한다. 학교는 학업 기록과 언어 지원을, 행정 기관은 등록·체류 절차와 권리 안내를, 고용 기관은 기술과 경력에 맞는 일자리 접근을 지원할 수 있다.

난민은 자신의 기술과 경험을 살려 학업과 일을 계획하고, 필요한 서비스에 관해 의견을 낼 수 있다. 난민과 수용 지역 주민이 학교·공공기관·지역 단체의 논의에 함께 참여하면 지원을 생활 조건과 필요에 맞게 마련할 수 있다. 개념도에서 난민의 선택과 역량, 지역 협력, 공공 지원이 어떻게 연결되는지 살펴보자. [[d4]]
