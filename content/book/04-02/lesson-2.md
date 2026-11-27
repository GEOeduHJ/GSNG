---
title: 환경 문제를 왜 쉽게 해결하지 못할까?
goal: 환경 문제의 책임과 피해, 대응 역량이 장소마다 다르게 나타나는 이유와 국제 협력의 쟁점을 자료에 근거해 설명할 수 있다.
opener: 기후 변화에 대응하는 책임은 어떤 기준으로 나누어야 할까? 현재 배출량과 과거의 누적 배출, 지역별 위험과 대응 여건을 함께 살펴보자.
textbookRef: { pages: [193, 193] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/04-02/environmental-justice.svg
    label: 환경 정의의 세 가지 관점
    caption: 책임·영향·대응 역량과 공정한 협력
    source: ''
    alt: 환경에 대한 책임, 피해와 노출, 대응 역량을 함께 고려해 공정한 협력 방안을 찾는 개념도다.
    config: {}
    concepts: [environmental-justice, scale, international-cooperation]
  - id: d2
    type: map
    data: /data/04-02/co2-per-capita-map-2024.json
    label: 국가별 1인당 CO₂ 배출
    caption: 국가별 1인당 화석연료·산업 CO₂ 배출량, 2024년
    source: u0402-co2-per-capita
    alt: 2024년 국가별 영토 기준 화석연료·산업 CO₂ 배출량을 인구로 나눈 값을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 't CO₂/명' }
    concepts: [environmental-justice, scale]
  - id: d3
    type: chart
    data: /data/04-02/cumulative-co2-top10-1850-2024.json
    label: 누적 CO₂ 배출 상위 국가
    caption: 1850–2024년 누적 화석연료·산업 CO₂ 배출 상위 10개국
    source: u0402-cumulative-co2-top10
    alt: 1850년부터 2024년까지 국가별 화석연료·산업 CO₂ 배출량을 합산해 상위 10개국을 막대로 나타낸 그래프다.
    config: { kind: bar, unit: 'Gt CO₂' }
    concepts: [environmental-justice, international-cooperation]
  - id: d4
    type: map
    data: /data/04-02/pm25-annual-exposure-map-2023.json
    label: 국가별 초미세먼지 노출
    caption: 국가별 연평균 PM2.5 노출 추정치, 2023년
    source: u0402-pm25-exposure
    alt: 2023년 국가별 연평균 PM2.5 노출 추정치를 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 'µg/m³' }
    concepts: [environmental-justice, human-environment-interaction, scale]
summary:
  - 환경 정의는 환경 부담과 자원 이용의 이익, 의사결정 참여가 어떻게 나뉘는지 함께 살피는 관점이다.
  - 1인당 배출량과 누적 배출량은 각각 현재의 인구 기준 배출과 장기간의 기여를 보여 준다.
  - 기후 위험과 대응 역량, 국가별 우선순위가 달라 감축·적응·지원의 국제 협력이 필요하다.
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 국제 기후 회의에서 공정한 부담 정하기
    instruction: 가상 상황이며 역할은 실제 국가나 시민 단체를 대표하지 않는다. 실제 자료에서 확인한 배출·노출 지표와 토론을 위해 설정한 필요를 구분한다.
    actors:
      - id: industrialized-country
        label: 산업화 선행 국가 역할
        place: 가상 국제 기후 회의
        role: 기존 산업·에너지 체계를 바꾸는 비용과 감축 계획을 함께 검토한다.
        power: 감축 목표와 기술·재정 협력 방안을 제안한다.
      - id: climate-vulnerable-island
        label: 기후 취약 섬 지역 역할
        place: 가상 국제 기후 회의
        role: 해수면 상승과 기후 위험에 대응할 기반 시설과 적응 지원을 논의한다.
        power: 필요한 지원과 의사결정 참여 방안을 제안한다.
      - id: developing-country
        label: 경제 전환 국가 역할
        place: 가상 국제 기후 회의
        role: 에너지 접근과 생활 여건 개선, 배출 감축을 함께 검토한다.
        power: 실행 여건과 기술·재정 협력 수요를 제안한다.
      - id: civil-society
        label: 시민사회 역할
        place: 가상 국제 기후 회의
        role: 정보 공개와 다양한 지역 주민의 참여, 부담 배분을 살핀다.
        power: 투명한 의사결정과 당사자 참여 방안을 제안한다.
    levels:
      - id: mitigation
        label: 온실가스 감축
        action: 자료의 범위에 맞는 목표와 이행 점검 방식을 논의한다.
      - id: adaptation
        label: 기후 영향에 대한 적응
        action: 위험과 대응 여건이 다른 지역의 필요를 검토한다.
      - id: support
        label: 재정·기술 지원
        action: 책임과 역량, 지원 방식과 조건을 함께 논의한다.
      - id: participation
        label: 참여와 정보 공개
        action: 영향을 받는 여러 주체가 의견을 내고 진행 상황을 확인할 절차를 제안한다.
keyTerms: [environmental-justice, international-cooperation, scale]
sourceIds: [gcp-owid-co2-per-capita, gcp-owid-co2-annual, wdi-pm25-exposure, ipcc-ar6-syr-2023, ipcc-ar6-wgii-2022, unfccc-convention-1992]
---
## 환경 정의와 배출 책임

environmental justice(환경 정의)는 환경 피해와 자원 이용의 이익, 의사결정 참여가 누구에게 돌아가는지 살피는 관점이다. 기후 위험과 환경 취약성은 지역마다 다르다. 지형·기후·노출과 기반 시설·대응 자원이 차이를 만든다. 역사적 배출 기여가 적은 지역도 큰 기후 영향을 겪을 수 있다. 책임·영향·대응 역량을 함께 살펴야 한다. 개념도에서 세 관점이 공정한 협력으로 이어지는 관계를 확인해 보자. [[d1]]

현재 배출량을 비교하는 1인당 배출량은 한 해의 배출을 인구로 나눈 값이다. 2024년 미국은 1인당 14.2t CO₂, 대한민국은 11.3t CO₂, 중국은 8.7t CO₂를 배출했다. 지도에서 국가별 차이를 찾아 인구 규모에 견준 배출의 분포를 설명해 보자. [[d2]]

누적 배출량은 여러 해의 배출을 더해 장기간의 역사적 기여를 살피는 지표다. 1850–2024년 누적 화석연료·산업 CO₂ 배출량은 미국 434.1Gt, 중국 286.1Gt, 러시아 121.8Gt다. 막대그래프에서 상위 국가를 찾아 현재의 1인당 배출 지도와 비교해 보자. [[d3]]

환경 피해도 고르게 나뉘지 않는다. 공장과 도로, 화력 발전소가 몰린 지역의 주민은 대기 오염에 더 많이 노출되고, 이는 호흡기 질환 같은 건강 격차로 이어진다. 오염을 일으킨 곳과 피해를 입는 곳이 다를 때 환경 정의의 문제가 생긴다. 초미세먼지 노출 지도에서 노출이 높은 지역이 어디에 모여 있는지 찾아보자. [[d4]]

## 국가별 우선순위와 국제 협력

환경 위험과 발전 과제는 국가와 지역마다 다르다. 낮은 섬 지역은 해수면 상승과 식수·주거 기반을 중요하게 다룬다. 사헬의 건조 지역은 가뭄과 토지 생산성을 살핀다. 열대림 지역은 숲 보전과 지역 생계의 조화를 모색한다. 한 나라 안에서도 지역과 산업에 따라 필요한 대응이 다르다.

배출 지역과 영향 지역, 결정 권한이 나뉘면 국가 간 합의에 시간이 걸린다. 산업화가 먼저 진행된 선진국은 역사적 배출과 지원 역량을 고려하라는 요구를 받는다. 개발 도상국은 에너지 접근과 생활 여건 개선, 감축을 함께 추진한다. 각 집단 안에서도 산업 구조와 지역 위험은 다르다. 유엔기후변화협약은 형평성과 공통의 차별화된 책임, 각자의 역량을 협력 원칙으로 둔다. 국가들은 감축·적응과 재정·기술 지원의 분담을 이 원칙에 따라 협의한다.
