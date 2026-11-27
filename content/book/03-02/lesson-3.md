---
title: '식량 문제는 어떻게 해결할 수 있을까?'
goal: 대한민국과 일본의 식량 정책 방향 및 자급률 자료를 살펴보고, 식량 안보 방안을 안정성·비용·환경·농가의 관점에서 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/03-02/korea-self-sufficiency-series.json
    source: u0302-korea-self-sufficiency-series
    caption: 농림축산식품부, 대한민국 곡물·식량 자급률, 2011–2022 양곡연도
    alt: 곡물자급률과 식량자급률의 2011년부터 2022년까지 변화를 선으로 나타낸 그래프다.
    config: { kind: line }
    concepts: [food-system, food-security]
  - id: s3
    type: map
    data: /data/03-02/cereal-import-dependency-map.json
    source: u0302-cereal-import-dependency-map
    caption: FAOSTAT, 곡물 수입 의존도, 2022–2024년 3년 평균
    alt: 국가별 곡물 수입 의존도를 색으로 나타낸 지도다. 값이 없는 국가는 별도로 표시된다.
    config: { kind: choropleth }
    concepts: [food-system, food-security, spatial-inequality]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
  - { id: s6, type: text, caption: '', source: '', alt: '' }
keyTerms: [food-system, food-security, spatial-inequality]
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 대한민국 식량 안보 방안 평가
    instruction: 자급률과 수입 의존도 자료, 정책 계획이 제시한 방향을 살피고 각 방안을 기준에 따라 평가한다.
    prompt: 안정성·비용·환경·농가에 미치는 영향을 모두 검토해 우선할 방안을 제안하시오. 자료만으로 판단하기 어려운 기준에는 더 필요한 근거를 적으시오.
    options:
      - { id: international, label: 수입처 다변화·비상 비축·국제 협력 강화 }
      - { id: local, label: 지역 생산·유통과 공공 급식 연계, 농가 지원 }
      - { id: technology, label: 저장·기후 대응·스마트 농업 기술에 대한 투자 }
    criteria:
      - { id: stability, label: 공급 중단과 가격 충격에 대비하는 안정성 }
      - { id: cost, label: 도입·운영 비용과 가구의 부담 }
      - { id: environment, label: 토지·물·에너지와 환경에 미치는 영향 }
      - { id: farmers, label: 농가의 소득·참여와 다양한 농가에 미치는 영향 }
sourceIds: [fao-korea-national-food-plan, maff-japan-basic-plan-2025]
illustration:
  src: /images/03-02/local-food-sharing.webp
  alt: 이웃들이 공동 텃밭을 가꾸고 수확한 채소와 모종을 서로 나눈다.
---
식량 안보를 높이려면 안정적인 국내 생산, 다양한 수입 경로, 저장과 운송, 가격 부담을 줄이는 지원, 농가와 소비자의 참여를 함께 검토한다. 각 방안은 필요한 비용과 환경 영향, 혜택을 받는 사람도 다르게 만든다.

농림축산식품부 시계열에서 곡물자급률은 사료용을 포함해 2011년 26.9%, 2022년 22.3%다. 2022년 식량자급률은 사료용을 제외해 49.3%다. 두 지표는 포함 품목과 용도가 다르므로 각각의 범위와 변화를 살펴본다.

FAOSTAT 지도에서 대한민국의 곡물 수입 의존도는 2022–2024년 3년 평균 78.3%다. 자급률과 수입 의존도는 산출 방식과 기준 기간이 다르다. 두 지표를 함께 읽으면 국내 생산과 교역이 공급에 함께 작용함을 살필 수 있다. 공급 중단 위험과 가구별 식량 접근은 비축·유통망·가구 자료를 더해 확인한다.

대한민국의 2021년 국가 식량계획은 비상시 곡물 공급망을 안정시키고, 지역 식량계획과 지역 농산물 유통 체계를 마련하는 방향을 제시한다. 일본 농림수산성의 2025년 기본 계획은 국내 생산 확대와 안정적 수입, 식량 비축을 함께 다룬다. 두 문서는 정책 방향을 제시하며, 목표의 달성 여부는 실행·평가 자료에서 확인한다.

지역 농업과 공공 급식의 연계는 지역 생산자와 소비자가 만나는 경로를 만들 수 있다. 저장·기상 정보·스마트 농업 기술도 생산과 공급을 뒷받침하는 방안이다. 효과를 평가할 때에는 비용, 물·에너지 사용, 소규모 농가의 접근성, 지역별 조건을 함께 살펴본다.

의사결정 표에서는 수입처 다변화와 국제 협력, 지역 생산·유통, 기술 투자를 안정성·비용·환경·농가의 네 기준으로 비교한다. 어떤 집단에 이익과 부담이 생기는지 함께 설명하고, 자료에 없는 비용과 지역별 효과는 추가 조사 근거로 제시한다.
