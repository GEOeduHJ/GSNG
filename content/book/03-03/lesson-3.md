---
title: 공간적 불균등을 어떻게 해소할 수 있을까?
goal: 국제 협력, 기업 책임, 윤리적 소비가 할 수 있는 일을 자료와 기준에 근거해 제안할 수 있다.
opener: 상품을 고를 때 생산자의 노동과 거래 조건을 어떻게 확인할 수 있을까? 국가 간 협력과 기업·학교·소비자의 역할을 함께 살펴보자.
textbookRef: { pages: [159, 160] }
steps:
  - id: d1
    type: map
    data: /data/03-03/oda-received-gni-map.json
    label: 국가별 공적개발원조 수원 비율
    caption: 국가별 순 공적개발원조 수원액의 국민총소득 대비 비율, 2023년
    source: u0303-oda-received-gni-map
    alt: 2023년 국가별 국민총소득에서 순 공적개발원조 수원액이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [international-cooperation, spatial-inequality]
  - id: d2
    type: chart
    data: /data/03-03/oda-received-constant-series.json
    label: 국가별 공적개발원조 수원액 변화
    caption: 국가별 순 공적개발원조 수원액 변화, 1990–2023년, 상수 2023년 미국 달러
    source: u0303-oda-received-constant-series
    alt: 방글라데시·에티오피아·말라위·파키스탄·네팔·르완다의 순 공적개발원조 수원액 변화를 2023년 상수 달러로 나타낸 선 그래프다.
    config: { kind: line, maxYear: 2023, unit: '달러(2023년 불변가격)' }
    concepts: [international-cooperation, spatial-inequality]
  - id: d3
    type: map
    data: /data/03-03/extreme-poverty-latest-map.json
    label: 국가별 극빈율의 최근 관측
    caption: 하루 3.00달러 미만 인구 비율, 2021년 구매력평가 기준, 국가별 최근 관측(2015–2023년)
    source: u0303-extreme-poverty-map
    alt: 국가별 최근 관측 연도에 하루 3.00달러 미만으로 사는 인구의 비율을 색으로 나타낸 지도다. 2021년 구매력평가 기준이며 국가별 관측 연도는 서로 다르다.
    config: { kind: choropleth, unit: '%' }
    concepts: [spatial-inequality, international-cooperation]
summary:
  - ODA는 개발과 사회 복지를 지원하는 국제 협력의 한 방식이다.
  - 수원액의 상대적 비율과 절대 규모, 공여국의 기여는 서로 다른 자료로 살펴본다.
  - 무역 규칙과 기업의 책임 있는 경영은 공급망의 거래·노동·환경 조건에 작용한다.
  - 윤리적 소비는 학교·기업·공공기관·시민 사회의 책임과 함께 이루어진다.
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 학교 매점의 공정무역 상품 도입 청문회
    instruction: 가상 상황이다. 실제 학교나 협동조합의 입장을 재현하지 않는다. 확인된 자료와 추가 확인이 필요한 실제 가격·공급·인증 정보를 구분한다.
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
keyTerms: [international-cooperation, ethical-consumption, spatial-inequality]
sourceIds: [world-bank-wdi-catalog, world-bank-extreme-poverty-lines-2025, oecd-oda-definition, wto-trade-principles, fairtrade-trader-standard, oecd-guidelines-mne-2023]
illustration:
  src: /images/03-03/fair-cooperation.webp
  alt: 가치사슬의 여러 참여자가 표식 없는 조명 부품과 완성품을 함께 살펴보며 의견을 나눈다.
---
## 국제 협력과 공적개발원조

Official development assistance(ODA, 공적개발원조)는 개발과 사회 복지를 목적으로 공공기관이 제공하는 지원이다. 국제 협력에는 재정·기술 지원뿐 아니라 무역 규칙을 협의하고 공동 기준을 마련하는 일도 포함된다.

ODA 수원액을 gross national income(GNI, 국민총소득)에 견준 비율은 국가경제 규모와 비교한 순 지원 규모다. 2023년 국가별 차이를 살펴보며 수원 비율의 공간 분포를 읽어 보자. 이 지표는 수원국의 값이므로 공여국의 노력이나 원조 사업의 성과와 구분한다. [[d1]]

## 국제 협력이 필요한 곳

수원액 시계열은 국가별 지원 규모가 시간에 따라 어떻게 달라졌는지 보여 준다. 1990년부터 2023년까지를 상수 2023년 달러로 비교하고, 비율 지도와 절대액 그래프의 차이를 설명해 보자. 순액에는 상환이 반영될 수 있으며 생활 조건의 변화는 별도의 결과 자료로 확인한다. [[d2]]

국제 협력이 필요한 곳을 살필 때에는 빈곤 자료와 지원 자료의 분포를 함께 비교할 수 있다. 극빈율 지도는 국가별 최근 관측값을 담아 관측 연도가 서로 다르다. 두 지표의 공통점과 차이를 찾고, 원조의 효과와 빈곤 변화의 원인을 설명할 때는 사업의 내용·시점과 소득·보건·교육 자료를 함께 살펴보자. [[d3]]

## 기업의 책임과 윤리적 소비

국제 무역 규칙은 국가가 협의해 거래 기준을 마련하고 예측 가능성을 높이는 수단이다. 기업의 책임 있는 경영 지침은 사업과 공급망에서 생길 수 있는 인권·환경 영향을 확인하고 예방·완화하는 실사를 권고한다. 규칙과 권고는 실제 거래와 이행 점검을 통해 작동한다.

Fairtrade(공정무역 인증) 기준은 적용 상품의 거래 투명성, 생산자 가격과 프리미엄 원칙을 정한다. 인증 기준과 특정 제품의 공급 경로·가격·생산자 성과는 구분해서 확인해야 한다. ethical consumption(윤리적 소비)은 이러한 정보를 살피고 구매와 학교의 조달 기준에 반영하는 실천이다.

가상 청문회에서는 학생회·매점 운영자·생산자 협동조합 대표·보호자가 각자의 정보와 결정 권한을 검토한다. 실제 가격과 공급 조건은 확인할 항목으로 남긴다. 소비자의 선택에 책임을 한정하지 않고 기업의 공급망 관리, 학교의 구매 절차, 공공기관과 국제기구의 협력까지 함께 제안한다.
