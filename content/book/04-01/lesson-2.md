---
title: 주요 에너지 자원의 생산과 소비는 어떻게 이루어질까?
goal: 주요 화석 연료의 생산 지역과 소비·교역의 연결을 살펴보고, 에너지 공급과 이용의 공간적 차이를 설명할 수 있다.
opener: 주유소의 연료와 발전소의 석탄은 어디에서 올까? 에너지 생산지와 소비지가 다르면 어떤 연결이 필요할까?
textbookRef: { pages: [172, 175] }
steps:
  - id: d1
    type: chart
    data: /data/04-01/coal-production-top10.json
    label: 석탄 생산 상위국
    caption: 석탄 생산 상위 10개국, 2025년 에너지 등가량
    source: u0401-coal-production-top10
    alt: 2025년 석탄 생산량이 많은 상위 10개국을 에너지 등가량으로 비교한 막대그래프다.
    config: { kind: bar, unit: 'TWh' }
    concepts: [energy-system, spatial-inequality]
  - id: d2
    type: chart
    data: /data/04-01/oil-production-top10.json
    label: 석유 생산 상위국
    caption: 석유 생산 상위 10개국, 2025년 에너지 등가량
    source: u0401-oil-production-top10
    alt: 2025년 석유 생산량이 많은 상위 10개국을 에너지 등가량으로 비교한 막대그래프다.
    config: { kind: bar, unit: 'TWh' }
    concepts: [energy-system, spatial-inequality]
  - id: d3
    type: chart
    data: /data/04-01/gas-production-top10.json
    label: 천연가스 생산 상위국
    caption: 천연가스 생산 상위 10개국, 2025년 에너지 등가량
    source: u0401-gas-production-top10
    alt: 2025년 천연가스 생산량이 많은 상위 10개국을 에너지 등가량으로 비교한 막대그래프다.
    config: { kind: bar, unit: 'TWh' }
    concepts: [energy-system, spatial-inequality]
  - id: d4
    type: map
    data: /data/04-01/energy-net-imports-map.json
    label: 국가별 에너지 순수입
    caption: 국가별 에너지 순수입 비율, 2024년
    source: u0401-energy-net-imports-map
    alt: 2024년 국가별 에너지 사용량에 견준 순수입 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [energy-system, interdependence, spatial-inequality]
  - id: d5
    type: map
    data: /data/04-01/energy-use-per-capita-map.json
    label: 국가별 1인당 에너지 공급
    caption: 국가별 1인당 총에너지 공급량, 2024년
    source: u0401-energy-use-per-capita-map
    alt: 2024년 국가별 1인당 총에너지 공급량을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: 'kWh/인' }
    concepts: [energy-system, scale, spatial-inequality]
summary:
  - 석탄·석유·천연가스의 생산지는 지질 조건과 채굴 기술, 기반 시설에 따라 다르게 나타난다.
  - 에너지원은 생산지와 소비지를 잇는 교역·운송망을 따라 이동한다.
  - 교통·산업·건물 등 부문마다 주로 쓰는 에너지원이 다르고, 1인당 공급량에도 지역 차이가 있다.
  - 화석 연료 이용은 온실가스와 대기 오염 문제를 키울 수 있어 효율 향상과 공급 다변화가 필요하다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 생산 자료와 순수입 자료로 주장 확인하기
    instruction: 생산 상위국 그래프와 순수입 지도를 대조하고, 두 자료가 보여 주는 역할을 구분한다.
    prompt: 각 문장을 자료에서 확인할 수 있는 주장으로 분류하고, 생산 순위만으로 알 수 없는 정보에는 필요한 추가 자료를 적으시오.
    items:
      - { id: coal-producer, text: 인도네시아는 석탄 생산 상위 10개국에 포함된다. }
      - { id: oil-producer, text: 사우디아라비아는 석유 생산 상위 10개국에 포함된다. }
      - { id: korea-net-import, text: 대한민국은 에너지 순수입 비율이 양수다. }
      - { id: usa-net-export, text: 미국은 에너지 순수입 비율이 음수다. }
      - { id: korea-trade-partner, text: 생산 상위국 자료만으로 대한민국의 주요 석유 수입 상대국을 확인할 수 있다. }
    categories:
      - { id: producer, label: 생산 자료에서 확인 }
      - { id: importer, label: 순수입 자료에서 확인 }
      - { id: exporter, label: 순수출 자료에서 확인 }
      - { id: more-data, label: 교역 상대국 자료가 더 필요 }
keyTerms: [energy-system, interdependence, spatial-inequality]
sourceIds: [eia-energy-sources, eia-energy-use-sectors, eia-energy-environment, iea-energy-security-glossary]
---
## 화석 연료의 생산과 이용

석탄은 오랜 지질 과정에서 만들어져 특정 지층에 매장된다. 발전과 제철 등 여러 산업에서 쓰이므로 생산량이 큰 지역과 소비가 많은 지역이 모두 나타난다. 2025년 석탄 생산 상위는 중국 26,296TWh, 인도 4,992TWh, 인도네시아 4,454TWh였다. 값은 연료를 에너지량으로 환산한 생산량이다. 상위국의 순서와 규모 차이를 살펴보자. [[d1]]

석유 생산지는 일부 퇴적 분지에 집중되고, 시추 기술과 투자에 따라 생산지가 달라진다. 석유는 수송 연료와 석유화학 원료로 널리 쓰여 산지에서 먼 소비 지역까지 선박과 관로로 이동한다. 2025년 석유 생산량 상위는 미국 10,350TWh, 사우디아라비아 6,232TWh, 러시아 6,085TWh 순이었다. 생산국의 분포와 에너지 이동의 방향을 함께 생각해 보자. [[d2]]

천연가스 생산지는 석유 매장 지역과 겹치는 경우가 있고, 도시의 난방·취사와 발전, 산업의 열원으로 이용된다. 파이프라인은 육상 공급을 잇고, 액화 운송은 천연가스를 액체로 바꾸어 배로 옮기는 방식이다. 2025년 천연가스 생산량 상위는 미국 10,737TWh, 러시아 6,094TWh, 이란 2,648TWh였다. 석유와 천연가스의 생산 상위국이 어떻게 겹치는지 비교해 보자. [[d3]]

## 에너지의 국제 이동과 이용 격차

생산지와 소비지가 다르면 에너지는 교역과 운송망을 따라 국경을 넘는다. energy security(에너지 안보)는 필요한 에너지를 감당할 수 있는 가격으로 안정적으로 공급받는 능력과 관련된다. 2024년 에너지 순수입 비율은 대한민국 83.2%, 중국 24.0%, 미국 −9.8%였다. 양수는 순수입, 음수는 순수출을 나타내며 이 지표는 에너지 전반을 합산한다. 지도에서 수입국과 수출국의 분포를 비교해 보자. [[d4]]

에너지는 교통, 산업, 발전, 주거와 상업 활동에서 서로 다른 방식으로 쓰인다. 석유는 수송 연료와 화학 원료, 석탄은 발전과 제철, 천연가스는 발전·산업 열원과 건물 난방에 이용된다. 2024년 1인당 에너지 공급량은 미국 74,018kWh/인, 인도 7,432kWh/인이었다. 두 나라의 소비 격차를 설명할 때에는 산업 구조와 교통·건물의 수요, 에너지 접근성을 함께 살펴야 한다. 두 나라의 공급량 차이를 지도에서 확인해 보자. [[d5]]
