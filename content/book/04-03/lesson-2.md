---
title: '분쟁 지역 주민들의 삶은 어떠할까?'
goal: 출신지·수용국의 강제 이주 통계와 생활 지원 자료를 살펴 주민의 다양한 경험과 지역 공동체의 대응을 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/04-03/forcibly-displaced-origin-top10-2025.json
    source: u0403-forced-displacement-origin-top10-2025
    caption: 출신지별 국외 강제 이주민 상위 10곳, 2025년 12월
    alt: 2025년 12월 출신지별 국외 강제 이주민 상위 10곳의 인구를 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [geopolitical-conflict, global-justice]
  - id: s3
    type: chart
    data: /data/04-03/forcibly-displaced-host-top10-2025.json
    source: u0403-forced-displacement-host-top10-2025
    caption: 수용국별 국외 강제 이주민 상위 10개국, 2025년 12월
    alt: 2025년 12월 수용국별 국외 강제 이주민 상위 10개국의 인구를 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [international-cooperation, global-justice]
  - id: s4
    type: chart
    data: /data/04-03/global-forcibly-displaced-series-2006-2025.json
    source: u0403-global-forced-displacement-series
    caption: 세계 강제 이주민 수, 2006–2025년
    alt: UNHCR이 공개한 세계 강제 이주민 총계의 변화를 2006년부터 2025년까지 선으로 나타낸 그래프다.
    config: { kind: line }
    concepts: [geopolitical-conflict, global-justice]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [geopolitical-conflict, international-cooperation, global-justice]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 출신지와 수용국 자료 비교
    instruction: 두 막대그래프의 기준 시점과 인구 유형을 확인하고, 출신지별·수용국별 상위 항목을 비교한다.
    prompt: 두 자료에서 확인한 분포와 공통점을 적고, 이동 경로와 주민의 생활을 설명하는 데 더 필요한 자료를 제시하시오.
    fields:
      - { id: origin, label: 출신지 자료에서 확인한 분포 }
      - { id: host, label: 수용국 자료에서 확인한 분포 }
      - { id: compare, label: 두 자료의 공통점과 차이 }
      - { id: additional, label: 이동 경로와 생활 경험을 살피는 데 더 필요한 자료 }
sourceIds: [unhcr-refugee-data-finder, unhcr-global-forced-displacement, unhcr-education-emergencies, who-refugee-migrant-health, unhcr-livelihoods-economic-inclusion]
---
forced displacement(강제 이주)에는 국경을 넘는 이동과 국내 실향이 포함된다. 출신지·수용국 막대는 유엔 난민기구(UNHCR) 관할 난민, 유엔 팔레스타인 난민구호기구(UNRWA) 등록 난민, 그 밖의 국제 보호 필요 인구, 비호신청자 등 네 범주를 합친 국외 인구 재고다. 세계 시계열은 UNHCR이 공개한 총계 지표를 사용한다.

출신지 그래프에서 2025년 상위는 베네수엘라 약 764만 명, 팔레스타인 지역 약 603만 명, 우크라이나 약 525만 명이다. 이는 그곳을 출신지로 한 국외 강제 이주민의 집계다. 막대의 크기는 이동 경로나 떠난 이유를 나타내지 않는다.

수용국 그래프에서는 미국 약 418만 명, 독일 약 295만 명, 요르단 약 284만 명이 상위에 놓인다. 이 수치는 수용국별 인구 재고를 비교한다. 비호 신청자 등을 포함한 여러 범주를 합산했으므로 난민만의 수와 구분해 읽는다.

세계 총계는 2018년 약 7,256만 명, 2024년 약 1억 2,325만 명, 2025년 약 1억 1,783만 명으로 나타난다. 이 지표는 UNHCR이 조정해 공개한 총계다. 연도별 변화는 세계 전체의 규모를 보여 주며, 나라 사이의 개별 이동 흐름은 출신지와 수용국 자료로 따로 확인한다.

강제 이주 뒤에는 학업을 이어 갈 학교와 언어 지원, 보건 서비스 접근, 일과 생계의 여건이 중요해질 수 있다. 제도·비용·언어 조건은 지역마다 다르며, 사람들의 경험도 서로 같지 않다. 이주민은 지원을 받는 주민이면서 삶을 계획하고 역량과 의견을 나누는 당사자다. 지역 공동체와 함께 교육·보건·생계 자료를 살펴 필요한 지원을 구체화한다.
