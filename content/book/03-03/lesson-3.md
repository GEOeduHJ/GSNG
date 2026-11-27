---
title: 공간적 불균등을 어떻게 해소할 수 있을까?
goal: 공적개발원조와 개발 협력, 기업의 사회적 책임, 윤리적 소비가 공간적 불균등을 줄이는 방식을 설명할 수 있다.
opener: 상품을 고를 때 생산자의 노동과 거래 조건을 어떻게 확인할 수 있을까? 국제기구·기업·소비자의 역할을 살펴보자.
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
  - ODA는 개발도상국의 경제 발전과 복지를 위한 공공기관의 양허성 지원이다.
  - 국제기구와 NGO는 지역사회·정부와 협력해 교육·보건·기반 시설과 제도 역량을 지원한다.
  - 공정무역은 생산자에게 더 투명한 거래 조건과 가격·프리미엄 기준을 제공한다.
  - 기업의 공급망 책임과 윤리적 소비는 생산자의 노동·환경 조건을 개선하는 데 기여할 수 있다.
routines:
  opener: { id: compass-points, prompt: "국가별 공적개발원조 수원 비율 자료에서 국제 협력의 흐름을 살피고, 기대·우려·추가 정보와 제안을 적어 보자." }
  inquiry: { id: take-a-stand, prompt: "공정 무역과 윤리적 소비가 불균등 완화에 할 수 있는 역할을 근거로 밝히고, 다른 입장도 함께 살펴보자." }
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
sourceIds: [world-bank-wdi-catalog, world-bank-extreme-poverty-lines-2025, oecd-oda-definition, oecd-korea-development-partner, undp-civil-society-laos, wto-trade-principles, fairtrade-trader-standard, fairtrade-minimum-price-premium, oecd-guidelines-mne-2023]
illustration:
  src: /images/03-03/fair-cooperation.webp
  alt: 가치사슬의 여러 참여자가 표식 없는 조명 부품과 완성품을 함께 살펴보며 의견을 나눈다.
---
## 국제 협력과 공적개발원조

Official development assistance(ODA, 공적개발원조)는 공공기관이 개발도상국의 경제 발전과 복지를 주된 목적으로 제공하는 지원이다. 증여와 낮은 이자의 양허성 차관 등이 포함된다. 공공기관의 개발 협력은 재정 지원뿐 아니라 기술·행정 역량을 함께 키우는 방식으로 이루어진다.

ODA 수원 비율은 개발도상국이 받은 지원을 국가 경제 규모와 견주어 보여 준다. 2023년 순 수원액은 국민총소득 대비 말라위 13.1%, 르완다 9.5%, 에티오피아 4.0%였다. 한국은 전쟁 뒤 원조를 받던 나라에서 개발도상국에 공적개발원조를 제공하는 나라로 전환했고, 2010년 OECD 개발원조위원회(DAC)에 가입했다. 수원 비율은 공여국의 기여나 사업 성과와 구분해 읽는다. 지도에서 말라위·르완다·에티오피아의 수원 비율을 비교해 보자. [[d1]]

## 국제 협력이 필요한 곳

국제기구와 NGO는 정부·지역사회와 협력해 학교·보건·식수·교통 같은 지역의 과제를 해결한다. 라오스의 UNDP 시민사회 지원 사업은 비영리단체와 국제 파트너가 지역 서비스와 빈곤 완화를 위해 협력하는 사례다. 그래프에서 방글라데시·에티오피아·파키스탄의 순 ODA 수원액 변화를 비교해 보자. [[d2]]

개발 협력은 소득 지원과 함께 교육·보건·식수·교통 기반을 개선해 사람들이 일하고 배울 기회를 넓힌다. 지원이 필요한 곳의 생활 조건을 파악할 때는 빈곤 분포와 ODA 수원 분포를 함께 살펴본다. 지도에서 두 분포가 함께 높거나 다른 국가를 찾아 필요한 개발 협력 분야를 생각해 보자. [[d3]]

## 기업의 책임과 윤리적 소비

기업의 사회적 책임은 생산 과정에서 노동자의 권리와 환경을 존중하고 공급망의 문제를 살피는 경영 원칙이다. OECD 다국적기업 책임경영 지침은 기업이 인권·환경 위험을 찾아 예방·완화하고 대응 과정을 설명하도록 권고한다. 국제 무역 규칙과 기업의 점검은 거래 기준을 만들고 공급망의 책임을 분명히 하는 데 쓰인다.

Fairtrade(공정무역)는 커피·카카오 거래에서 시장가격이 기준보다 낮을 때도 최저가격을 보장하고 생산자 조직에 별도 프리미엄을 지급하는 기준을 둔다. 투명한 계약과 프리미엄은 생산자의 소득 안정과 지역 공동 사업에 보탬이 된다. Ethical consumption(윤리적 소비)은 상품의 인증과 원산지·노동 정보를 살펴 구매와 학교의 조달 기준에 반영하는 실천이다.
