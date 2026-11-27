---
title: 공간적 불균등을 어떻게 해소할 수 있을까?
goal: 공적개발원조 수원 자료를 정확히 해석하고 국제 협력·기업 책임·윤리적 소비가 할 수 있는 일을 근거와 한계에 따라 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-03/oda-received-gni-map.json
    source: u0303-oda-received-gni-map
    caption: 국가별 순 공적개발원조 수원액의 국민총소득 대비 비율, 2023년
    alt: 2023년 국가별 국민총소득에서 순 공적개발원조 수원액이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-cooperation, spatial-inequality]
  - id: s3
    type: chart
    data: /data/03-03/oda-received-constant-series.json
    source: u0303-oda-received-constant-series
    caption: 6개 수원국의 순 공적개발원조 수원액 변화, 상수 2023년 미국 달러, 1990–2023년
    alt: 방글라데시·에티오피아·말라위·파키스탄·네팔·르완다의 순 공적개발원조 수원액 변화를 같은 상수 달러 단위로 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2023 }
    concepts: [international-cooperation, spatial-inequality]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [international-cooperation, ethical-consumption, spatial-inequality]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 학교 매점의 공정무역 상품 도입 청문회
    instruction: 가상 상황이다. 실제 학교나 협동조합의 입장을 재현하지 않는다. 각 역할의 영향과 결정 권한을 나누어 보고, 실제 가격·공급·인증 정보가 제시되지 않은 부분은 추가 확인 항목으로 남긴다.
    actors:
      - id: student-council
        label: 학생회
        place: 학교
        role: 학생들이 원하는 상품과 이용 조건을 모아 제안한다.
        power: 매점 운영자와 학교에 도입 기준과 정보 공개 방식을 제안할 수 있다.
      - id: shop-operator
        label: 매점 운영자
        place: 학교 매점
        role: 상품의 공급 가능성, 판매 가격, 보관과 운영 조건을 확인한다.
        power: 실제 매점 운영에서 판매 여부와 공급 조건에 의견을 낼 수 있다.
      - id: producer-cooperative
        label: 생산자 협동조합 대표
        place: 생산 지역의 협동조합
        role: 생산자들이 거래 조건과 공정무역 기준을 검토하는 관점을 제안한다고 가정한다.
        power: 생산자 조직의 요구와 결정 과정을 설명할 수 있다고 가정하되, 특정 실제 협동조합의 입장을 대표하지 않는다.
      - id: guardians
        label: 보호자
        place: 가정과 학교
        role: 상품 정보와 가계 구매 부담, 선택 가능성을 살핀다.
        power: 학교에 가격 정보와 선택 방식을 공개하고 의견을 들을 절차를 제안할 수 있다.
    levels:
      - id: information
        label: 정보 확인
        action: 인증 표시, 공급 경로, 제품별 거래 기준을 확인하고 빠진 정보를 요청한다.
      - id: school-store
        label: 학교 매점
        action: 도입 기준과 가격 공개 방식, 대체 선택지를 협의한다.
      - id: business
        label: 기업과 거래 주체
        action: 공급망의 책임과 계약 정보, 위험 확인 절차를 공개하고 점검한다.
      - id: public-cooperation
        label: 공공·국제 협력
        action: 노동·환경 기준을 마련하고 국경을 넘는 협력과 이행 점검을 논의한다.
sourceIds: [world-bank-wdi-catalog, oecd-oda-definition, wto-trade-principles, fairtrade-trader-standard, oecd-guidelines-mne-2023, oecd-minerals-due-diligence-2013]
illustration:
  src: /images/03-03/fair-cooperation.webp
  alt: 가치사슬의 여러 참여자가 표식 없는 조명 부품과 완성품을 함께 살펴보며 의견을 나눈다.
---
공간적 불균등을 줄이는 노력에는 국제 협력과 무역 규칙, 기업의 책임, 소비자의 선택이 함께 포함된다. 각 방안은 영향을 미치는 범위와 결정 권한이 다르다. ODA는 개발과 복지를 주된 목적으로 공공기관이 제공하는 지원을 가리킨다.

ODA 지도는 2023년 국가의 gross national income(국민총소득, GNI)에 견준 순 수원액의 비율을 보여 준다. 범례에 따라 국가별 분포를 살펴보되, 비율이 크다고 절대 수원액도 크다고 해석하지 않는다. 이는 원조를 받은 수원국 쪽 지표이며, 공여국이 얼마나 기여했는지나 사업의 성과·효과를 직접 측정하지 않는다.

순 ODA 수원액 시계열은 6개 수원국에 들어온 연간 액수를 상수 2023년 미국 달러로 나타낸다. 같은 기준의 선을 비교해 수원액이 시간에 따라 어떻게 달라졌는지 살핀다. 이 여섯 국가는 비교를 위해 고른 사례이지 원조 규모 순위가 아니다. 순액에는 상환이 반영되므로 음수일 수도 있고, 시계열만으로 원조가 생활 조건을 바꾸었는지 판단할 수 없다.

국제 무역 규칙은 국가들이 협의해 예측 가능한 거래 기준을 마련하는 한 방식이다. OECD의 다국적 기업 책임경영 지침은 기업이 사업 활동과 거래 관계에서 생길 수 있는 부정적 영향을 확인하고 대응하는 실사를 권고한다. Fairtrade(공정무역 인증) 기준은 적용되는 상품에서 최저가격과 생산자 프리미엄, 거래 투명성 등을 정한다. 이런 기준은 책임을 살피는 근거가 되지만, 특정 제품의 실제 성과를 자료 없이 보증하지 않는다.

가상 청문회에서는 학교 매점의 공정무역 상품 도입을 놓고 학생회·매점 운영자·생산자 협동조합 대표·보호자가 검토할 항목을 나눈다. 실제 가격이나 공급량을 만들어 내지 않고, 인증과 공급 경로, 상품 가격, 선택권, 결정 권한에 관해 확인된 정보와 더 필요한 정보를 구별한다. ethical consumption(윤리적 소비)은 개인의 선택으로만 끝나지 않는다. 학교의 구매 기준, 기업의 공급망 책임, 공공기관과 국제기구의 규칙과 협력도 함께 살펴야 한다.
