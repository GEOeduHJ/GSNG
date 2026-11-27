---
title: '주요 에너지 자원의 생산과 소비는 어떻게 이루어질까?'
goal: 화석 연료의 생산 상위국과 에너지 순수입 자료를 비교해 생산·공급의 공간적 연결과 에너지 안보의 과제를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/04-01/oil-production-top10.json
    source: u0401-oil-production-top10
    caption: 'Our World in Data(원자료: Energy Institute·U.S. EIA), 석유 생산 상위 10개국, 2025년(TWh, 에너지 등가량)'
    alt: 석유 생산 상위 10개국의 에너지 등가량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [energy-system, spatial-inequality]
  - id: s3
    type: chart
    data: /data/04-01/gas-production-top10.json
    source: u0401-gas-production-top10
    caption: 'Our World in Data(원자료: Energy Institute·U.S. EIA), 천연가스 생산 상위 10개국, 2025년(TWh, 에너지 등가량)'
    alt: 천연가스 생산 상위 10개국의 에너지 등가량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [energy-system, spatial-inequality]
  - id: s4
    type: chart
    data: /data/04-01/coal-production-top10.json
    source: u0401-coal-production-top10
    caption: 'Our World in Data(원자료: Energy Institute·U.S. EIA), 석탄 생산 상위 10개국, 2025년(TWh, 에너지 등가량)'
    alt: 석탄 생산 상위 10개국의 에너지 등가량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [energy-system, spatial-inequality]
  - id: s5
    type: map
    data: /data/04-01/energy-net-imports-map.json
    source: u0401-energy-net-imports-map
    caption: 'World Bank WDI(원자료: IEA), 국가별 에너지 순수입 비율, 2024년(% of energy use)'
    alt: 에너지 사용량에 견준 국가별 에너지 순수입 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [energy-system, interdependence, spatial-inequality]
keyTerms: [energy-system, interdependence, spatial-inequality]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 생산 상위국과 에너지 순수입·순수출 분류
    instruction: 생산 막대와 순수입 지도를 대조해 각 주장을 확인하고, 생산 순위와 무역 상대국 정보를 구분한다.
    prompt: 각 항목을 자료에서 확인한 역할에 맞게 분류하시오. 제공된 자료로 확인할 수 없는 주장은 필요한 추가 자료를 적으시오.
    items:
      - { id: saudi-production, text: 사우디아라비아는 2025년 석유 생산 상위 10개국에 포함된다. }
      - { id: korea-net-import, text: 대한민국의 2024년 에너지 순수입 비율은 양수다. }
      - { id: us-net-export, text: 미국의 2024년 에너지 순수입 비율은 음수다. }
      - { id: korea-oil-partner, text: 석유 생산 상위국 자료만으로 대한민국의 주요 석유 수입 상대국을 확인할 수 있다. }
    categories:
      - { id: producer, label: 생산 상위국 자료에서 확인 }
      - { id: importer, label: 에너지 순수입 자료에서 확인 }
      - { id: exporter, label: 에너지 순수출 자료에서 확인 }
      - { id: more-data, label: 무역 상대국 자료가 더 필요 }
sourceIds: [eia-energy-sources, iea-energy-security-glossary]
---
석탄·석유·천연가스는 오랜 지질 과정으로 만들어진 화석 연료다. 각 연료의 생산량은 국가마다 다르게 나타난다. 막대그래프는 2025년 생산 상위 10개국을 에너지 등가량 TWh로 나타낸다. 이 단위는 발전량이나 연료의 물리적 부피·무게와 다르다.

석유 생산 상위 3개국은 미국·사우디아라비아·러시아다. 2025년 생산량은 각각 약 10,350TWh, 6,232TWh, 6,085TWh다. 막대와 순위를 읽어 석유 생산의 지역 차이를 살펴본다.

천연가스 생산 상위 3개국은 미국·러시아·이란이다. 2025년 생산량은 약 10,737TWh, 6,094TWh, 2,648TWh 순이다. 석유와 생산 상위국 일부가 겹쳐도 순위와 규모는 다르다. 생산량은 매장량이나 수출량과 다른 기준이다.

석탄 그래프에서 중국은 약 26,296TWh로 가장 큰 막대를 보인다. 인도는 약 4,992TWh, 인도네시아는 약 4,454TWh다. 석유·천연가스 그래프와 나란히 읽으면 연료별 생산 상위국의 차이가 드러난다.

에너지 순수입 지도에서 2024년 대한민국은 83.2%, 중국은 24.0%다. 미국은 -9.8%로 나타난다. 양수는 순수입, 음수는 순수출을 뜻한다. 이 지표는 화석 연료뿐 아니라 에너지 전반을 다룬다. 무역 상대국과 운송 경로는 교역 자료를 더해 살펴본다. 생산과 순수입은 공급에서 여러 장소가 연결된 interdependence(상호의존) 관계를 보여 준다. energy security(에너지 안보)는 감당할 수 있는 가격으로 공급을 이어 가는 능력과 관련된다. 생산·수입 비율에 공급원·시설·비축 자료를 더해 살펴본다.
