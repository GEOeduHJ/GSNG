---
title: '세계 평화와 정의를 위한 노력'
goal: UN의 평화·사법 기구와 평화유지활동의 역할을 설명하고, 평화협정·평화 구축·시민 활동을 잇는 실천 방안을 제안할 수 있다.
opener: 국제기구와 시민 단체, 지역 주민은 전투를 멈추고 평화를 이어 가기 위해 어떤 일을 할 수 있을까?
textbookRef: { pages: [208, 210] }
steps:
  - id: d1
    type: chart
    data: /data/04-03/peace-agreements-by-year-1975-2021.json
    label: 평화협정 기록 수
    caption: UCDP 평화협정 기록 수, 1975–2021년
    source: u0403-peace-agreements-series
    alt: 1975년부터 2021년까지 서명된 평화협정 기록 수를 연도별 선으로 나타낸 그래프다.
    config: { kind: line, unit: '건' }
    concepts: [peacebuilding, international-cooperation]
  - id: d2
    type: chart
    data: /data/04-03/conflict-termination-outcomes-series-1946-2023.json
    label: 무력 분쟁의 종결 방식
    caption: UCDP 무력 분쟁 종결 기록의 유형, 1946–2023년
    source: u0403-conflict-termination-outcomes-series
    alt: 평화협정과 휴전, 무력 승리, 낮은 무력 활동, 분쟁 행위자 소멸로 구분한 종결 기록을 연도별 선으로 나타낸 그래프다.
    config: { kind: line, unit: '건' }
    concepts: [peacebuilding, geopolitical-conflict]
  - id: d3
    type: chart
    data: /data/04-03/armed-conflict-count-series-1946-2025.json
    label: 국가기반 무력 분쟁 수
    caption: 세계 국가기반 무력 분쟁 수, 1946–2025년
    source: u0403-armed-conflict-count-series
    alt: 국가 정부가 당사자인 무력 분쟁의 연도별 기록 수를 선으로 나타낸 그래프다.
    config: { kind: line, unit: '건' }
    concepts: [geopolitical-conflict, international-cooperation]
  - id: d4
    type: image
    schematic: true
    data: /images/04-03/peacebuilding-pathway-schematic.svg
    label: 평화 구축의 흐름
    caption: 예방·합의·안전·포용을 잇는 평화 구축 과정
    source: ''
    alt: 대화와 예방, 합의와 안전 지원, 권리와 서비스, 포용과 회복이 서로 이어지고 점검을 거쳐 다시 조정되는 개념도다.
    config: {}
    concepts: [peacebuilding, international-cooperation]
summary:
  - 1945년 출범한 UN에서 안전 보장 이사회는 국제 평화와 안전을, 국제 사법 재판소는 국가 간 법적 분쟁과 권고적 의견을 다룬다.
  - 키프로스의 UNFICYP는 정전선 감독과 완충 지대 유지, 인도적 활동을 수행한다.
  - 콜롬비아 평화 협정처럼 합의 뒤에는 정치 참여와 사회 재통합, 공공 서비스 등 평화 구축 과제가 이어진다.
  - 국제 NGO와 세계시민은 의료·인권 활동, 정보 확인, 연대와 문화 다양성 존중으로 평화에 참여한다.
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 평화 실천의 범위와 지속성 비교
    instruction: 자료에서 확인한 갈등과 합의의 흐름을 바탕으로 각 실천의 주체, 작용 범위, 지역 주민 참여를 살핀다.
    prompt: 권리 보호·지역 참여·지속성·학생의 참여 가능성을 기준으로 방안을 비교하고 서로 보완할 실천을 제안하시오.
    options:
      - { id: international-dialogue, label: 국제기구의 대화·중재·평화유지 지원 }
      - { id: inclusive-peacebuilding, label: 지역 주민이 참여하는 평화 구축과 공공 서비스 }
      - { id: civic-organizations, label: 인권·의료·교육 분야 시민 단체 활동 }
      - { id: peace-education, label: 평화 교육과 기억을 존중하는 역사 학습 }
    criteria:
      - { id: rights, label: 권리와 안전을 다루는 정도 }
      - { id: local-voice, label: 지역 주민의 참여와 목소리 }
      - { id: continuity, label: 활동을 이어 갈 조건 }
      - { id: student-participation, label: 학생이 참여할 수 있는 방법 }
keyTerms: [peacebuilding, international-cooperation, global-justice, world-citizenship]
sourceIds: [ucdp-data-download-center, un-peacekeeping-principles, unficyp-factsheet, undof-factsheet, un-sustaining-peace-2017, un-peace-security-prevention, un-history-charter-1945, un-security-council-role, icj-court-overview, un-colombia-final-agreement-2016, msf-syria-medical-activities, amnesty-human-rights-campaigns]
---
## 국제 연합과 국제 사법 기구

국제 연합(UN)은 제2차 세계 대전 뒤 국제 평화와 안전을 지키기 위해 1945년 출범했다. 안전 보장 이사회는 국제 평화와 안전 유지에 주된 책임을 지고, 평화유지활동의 임무를 결의로 정한다. 국제 사법 재판소는 네덜란드 헤이그에 있으며 국가가 제기한 법적 분쟁을 국제법에 따라 다루고, UN 기관의 요청에 권고적 의견을 낸다.

국제 협력은 분쟁 예방과 대화, 합의, 안전 지원, 사회 회복을 연결한다. 평화유지활동이 평화 구축 과정의 어느 부분을 돕는지 개념도에서 찾아보자. [[d4]]

## 평화유지활동과 지역 사례

유엔 평화유지활동은 안전 보장 이사회가 승인한 임무에 따라 정전선 감독, 합의 이행 지원, 민간인 보호 등을 맡는다. 키프로스의 유엔 평화유지군(UNFICYP)은 1964년 출범해 정전선을 감독하고 완충 지대를 유지하며 인도적 활동과 사무총장의 중재 노력을 지원해 왔다. 유엔은 골란 지역의 UNDOF를 통해 분리 합의 이행을 관찰한다. 두 임무의 지역 조건과 맡은 일을 비교해 보자.

평화유지군은 주요 당사자의 동의와 공평성, 자기 방어와 임무 수행에 필요한 범위에서의 제한적인 무력 사용 원칙을 따른다. 활동 내용은 안전 보장 이사회가 정한 임무에 따라 달라진다.

## 평화협정과 평화 구축

평화협정은 분쟁 당사자가 전투 중단과 정치적 해결을 위해 합의한 내용을 기록한다. 콜롬비아 정부와 FARC-EP는 2016년 최종 평화 협정에 서명했고, 협정에는 농촌 개혁, 정치 참여, 무장 해제와 사회 재통합 등 후속 과제가 포함되었다. 협정 기록과 분쟁 종결 유형의 그래프에서 서명된 합의와 휴전·무력 승리 등 종결 방식을 각각 비교해 보자. 협정 건수와 종결 유형만으로 평화가 지속된 기간을 알 수는 없다. [[d1]] [[d2]]

평화 구축은 합의 뒤에도 갈등의 배경을 다루며 안전, 권리, 생계, 교육과 공공 서비스를 마련하는 과정이다. 콜롬비아에서는 지역 주민의 정치 참여와 전직 전투원의 사회 재통합, 농촌 지역의 생활 여건 개선이 협정 이행의 과제로 이어졌다. 국가기반 분쟁의 장기 흐름과 연결해 평화 구축이 필요한 이유를 찾아보자. [[d3]]

## 국제 NGO와 세계시민의 실천

국제 비정부 기구(NGO)는 정부 간 합의와 별도로 인도적 지원과 인권 활동을 이어 간다. 국경없는의사회(MSF)는 시리아에서 병원·진료소와 이동 진료를 통해 의료 지원을 제공하고, 국제앰네스티는 조사와 캠페인으로 인권 문제를 알린다. 시민 단체별 활동 분야와 참여 방법을 살펴보자.

세계시민은 분쟁과 난민의 삶에 관심을 두고 당사자의 경험에 공감과 관용을 보이며 문화와 관점의 차이를 존중한다. 공식 기록과 현지 취재 등 출처가 다른 정보를 대조해 사실을 확인하고, 캠페인·기부·연대 활동과 평화 교육에 참여할 수 있다. 의사결정 표에서 개인과 공동체가 함께 할 수 있는 실천을 골라보자.
