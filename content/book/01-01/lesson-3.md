---
title: '세계를 이해하는 관점과 세계시민의 역할은 무엇일까?'
goal: 서로 다른 행위자의 영향과 결정 권한을 살피고 개인·학교·기업·공공 수준의 실천을 근거에 따라 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/01-01/apparel-trade.json
    source: apparel-trade
    caption: 미국이 수입한 의류 61–62류의 원산지별 수입액, 2025년
    alt: 2025년 미국 일반수입 중 의류 61–62류의 원산지별 수입액을 나타낸 막대그래프다.
    config: { kind: bar }
    concepts: [interdependence, scale]
  - id: s3
    type: map
    data: /data/01-01/trade-share-map.json
    source: wdi-trade-share-map
    caption: 국가별 무역 비중(GDP 대비), 2023년
    alt: 국가별 수출입 합계가 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [interdependence, scale]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [world-citizenship, interdependence, glocalization]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 학교 단체복 구매 청문회
    instruction: 가상 상황에서 행위자가 받는 영향과 결정 권한을 구분하고, 개인·학교·기업·공공 수준의 행동을 자료의 범위에 맞게 제안한다.
    actors:
      - id: production-worker
        label: 생산국 노동자
        place: 생산 현장
        role: 단체복 생산 조건과 일정에 영향을 받는다고 가정한다.
        power: 가상 상황에서 학교의 구매 계약을 직접 정하지 않는다.
      - id: production-business
        label: 생산 업체
        place: 생산 지역
        role: 생산 일정과 공급 정보의 영향을 받는다고 가정한다.
        power: 생산 조건과 납기에 관한 정보를 제공할 수 있다.
      - id: seller
        label: 판매 기업
        place: 판매 시장
        role: 공급처와 계약 조건을 조정한다고 가정한다.
        power: 공급처와 가격·품질 조건을 제안할 수 있다.
      - id: school
        label: 학교 공동구매 담당자
        place: 학교
        role: 가격·품질·구매 방식에 책임을 진다고 가정한다.
        power: 구매 기준과 정보 공개 요구를 정할 수 있다.
    levels:
      - id: individual
        label: 개인
        action: 상품 정보와 사용·수선 선택을 확인한다.
      - id: school
        label: 학교
        action: 구매 기준과 공급 정보 공개 방식을 정한다.
      - id: company
        label: 기업
        action: 공급처와 작업 기준 정보를 설명하고 점검한다.
      - id: public
        label: 공공기관
        action: 노동·조달 기준과 정보 공개 제도를 마련한다.
sourceIds: [us-census-apparel-imports, world-bank-trade-share]
---
global citizenship(세계시민성)은 내가 사는 지역을 넘어 다른 사람의 권리와 삶을 살피고 공동 문제에 참여하는 관점이다. 세계시민의 역할은 모든 문제를 혼자 해결하는 데 있지 않다. 영향을 받는 사람과 결정하는 주체, 각 주체가 가진 권한을 함께 살핀다.

Harmonized System(국제통일상품분류체계, HS) 61–62류 의류 자료는 2025년 미국이 수입한 의류의 원산지별 수입액을 비교한다. 막대그래프에서 베트남·중국·방글라데시 등 원산지의 값을 비교하고 대한민국도 목록에서 찾는다. 이는 미국의 의류 수입 통계다. 세계 전체의 의류 무역이나 한 벌의 실제 생산·운송 경로를 보여 주지는 않는다.

무역 비중 지도는 한 국가의 국내총생산과 비교한 전체 상품·서비스 무역의 비율을 나타낸다. 의류 원산지 막대그래프와 지도는 단위와 집계 범위가 다르므로 값을 직접 비교하지 않는다. 두 자료 어디에도 노동자의 임금이나 작업 조건, 학교의 계약 권한은 나타나지 않는다. 이 정보에는 다른 자료와 당사자의 목소리가 필요하다.

가상 청문회에서는 생산국 노동자, 생산 업체, 판매 기업, 학교 공동구매 담당자의 입장을 나누어 살핀다. 자료에서 확인한 내용과 가정한 역할을 구별하고, 누가 영향을 받는지와 누가 구매 조건을 정하는지 표시한다. 실제 증언이나 실제 공급망을 재현한 활동은 아니다.

실천은 개인의 선택에서 끝나지 않는다. 개인은 정보를 확인하고 오래 사용하며, 학교는 구매 기준을 정할 수 있다. 기업은 공급처와 작업 기준 정보를 공개하고 점검할 수 있다. 공공기관은 책임 있는 조달과 정보 공개의 기준을 마련할 수 있다. 설명에는 행위자별 권한과 자료로 확인한 근거를 함께 제시한다.
