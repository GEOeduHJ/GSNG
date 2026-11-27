---
title: '식량 자원의 생산과 소비는 어떻게 이루어질까?'
goal: 쌀·밀·옥수수 생산 자료와 밀 수출 자료를 비교해 식량 체계의 공간적 연결과 자료의 범위를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/03-02/rice-production-top10.json
    source: u0302-rice-production-top10
    caption: FAOSTAT, 쌀 생산 상위 10개국, 2024년(t)
    alt: 2024년 쌀 생산 상위 10개국의 생산량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [food-system, spatial-inequality]
  - id: s3
    type: chart
    data: /data/03-02/wheat-production-top10.json
    source: u0302-wheat-production-top10
    caption: FAOSTAT, 밀 생산 상위 10개국, 2024년(t)
    alt: 2024년 밀 생산 상위 10개국의 생산량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [food-system, spatial-inequality]
  - id: s4
    type: chart
    data: /data/03-02/maize-production-top10.json
    source: u0302-maize-production-top10
    caption: FAOSTAT, 옥수수 생산 상위 10개국, 2024년(t)
    alt: 2024년 옥수수 생산 상위 10개국의 생산량을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [food-system, spatial-inequality]
  - id: s5
    type: chart
    data: /data/03-02/wheat-export-world-share-top10.json
    source: u0302-wheat-export-world-share
    caption: FAOSTAT, 세계 밀 수출량 중 상위 수출국 비중, 2024년(수량 기준)
    alt: 세계 밀 수출량에서 상위 수출국이 차지하는 비중을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [food-system, food-market-concentration, spatial-inequality]
  - { id: s6, type: text, caption: '', source: '', alt: '' }
keyTerms: [food-system, spatial-inequality]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 생산 상위국과 밀 수출국 비교
    instruction: 쌀·밀·옥수수 생산 상위국과 밀 수출국의 막대, 단위와 기준 연도를 확인한다.
    prompt: 생산량과 수출 비중에서 찾은 공통점·차이를 정리하고, 두 자료만으로 알 수 없는 식량의 이동과 소비 정보를 적으시오.
    fields:
      - { id: production, label: 세 작물 생산 상위국에서 확인한 점 }
      - { id: wheatExport, label: 밀 수출 상위국과 세계 비중에서 확인한 점 }
      - { id: compare, label: 생산과 수출 자료의 공통점과 차이 }
      - { id: limits, label: 실제 소비와 유통 경로를 설명하는 데 더 필요한 자료 }
---
식량은 농사만으로 식탁에 오르지 않는다. 농가의 생산, 저장과 가공, 운송, 판매, 조리와 소비가 이어져 food system(식량 체계)을 이룬다. 생산과 소비가 서로 다른 장소에서 이루어지면 교역과 기반 시설, 여러 주체의 선택이 식량의 이동을 연결한다.

쌀 생산 그래프에서 인도는 217,867,864.16t, 중국은 207,530,000t을 생산해 상위에 놓인다. 방글라데시는 60,570,453.05t으로 그 뒤를 잇는다. 이 자료는 2024년 생산 상위 10개국만 보여 주며, 그래프에 없는 나라가 쌀을 생산하지 않는다는 뜻은 아니다.

밀 생산 그래프에서는 중국이 140,100,000t, 인도가 113,292,368t, 러시아가 82,588,000t으로 상위에 놓인다. 쌀과 밀의 상위 생산국은 일부 겹치지만 순서와 생산량은 다르다. 이 통계는 품목별 생산량을 보여 주며, 생산된 곡물 가운데 사람이 먹는 양이나 각 나라의 소비량을 구분하지 않는다.

옥수수 생산 그래프의 상위 국가는 미국 377,632,690t, 중국 294,920,000t, 브라질 114,953,303t이다. 세 작물의 막대를 나란히 읽으면 생산 상위국이 작물에 따라 달라지는 점을 확인할 수 있다. 총생산량만으로 생산 지역의 기후·토양 조건이나 농가의 생산 방식까지 설명할 수는 없다.

밀 수출량을 세계 수출량과 견준 그래프에서는 러시아가 16.13%, 캐나다가 12.61%, 미국이 10.76%를 차지한다. 상위 5개국 비중을 합하면 59.41%다. 이 값은 2024년 밀 수출량의 국가별 비중이며 수출액 기준은 아니다. 밀가루와 밀 부산물은 집계에 포함되지 않는다.

생산 상위국과 수출 상위국 자료를 비교하면 생산량이 많다는 사실과 국제 시장에 내놓는 수출량이 크다는 사실을 구분할 수 있다. 곡물의 국내 수요와 사료·가공용 사용, 정책과 운송 여건도 식량 체계의 일부다. 이 상위 10개국 자료만으로 실제 수입처와 소비자에게 도달하는 경로를 모두 알 수는 없다.
