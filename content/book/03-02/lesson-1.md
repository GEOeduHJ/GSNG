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
식량이 식탁에 오르기까지 생산, 저장·가공, 운송·판매, 조리·소비 과정이 이어진다. 이런 활동과 주체의 연결을 food system(식량 체계)이라고 한다. 생산지와 소비지가 다르면 교역과 기반 시설, 여러 주체의 선택이 식량의 이동을 잇는다.

2024년 쌀 생산 상위국은 인도 약 2억 1,787만 t, 중국 약 2억 753만 t, 방글라데시 약 6,057만 t 순이다. 그래프는 상위 10개국을 표시하므로, 그 밖의 나라의 생산량은 별도 자료에서 확인한다.

2024년 밀 생산 상위국은 중국 약 1억 4,010만 t, 인도 약 1억 1,329만 t, 러시아 약 8,259만 t이다. 쌀과 밀은 상위 생산국이 일부 겹치지만 순위와 생산량은 다르다. 이 통계는 품목별 생산량 기준이다. 사람이 먹는 양과 나라별 소비량은 용도·소비 자료를 함께 살펴야 한다.

2024년 옥수수 생산 상위국은 미국 약 3억 7,763만 t, 중국 약 2억 9,492만 t, 브라질 약 1억 1,495만 t이다. 세 작물의 막대를 나란히 보면 생산 상위국이 작물마다 달라짐을 알 수 있다. 기후·토양 조건과 농가의 재배 방식은 농업 환경 자료를 함께 살펴 설명한다.

2024년 밀 수출량의 세계 비중은 러시아 16.1%, 캐나다 12.6%, 미국 10.8% 순이다. 상위 5개국은 59.4%를 차지한다. 이 비중은 수량 기준이며, 밀가루와 밀 부산물은 집계에서 제외된다.

생산 상위국과 수출 상위국 자료를 비교하면 생산량과 국제 시장에 내놓은 수출량의 차이를 살필 수 있다. 곡물의 국내 수요, 사료·가공용 사용, 정책과 운송 여건도 식량 체계의 일부다. 실제 수입처와 소비자까지 이어지는 경로는 교역·유통 자료를 더해 확인한다.
