---
title: '세계의 음식 문화는 얼마나 다양할까?'
goal: 자연환경과 교류, 공동체의 실천이 음식 문화에 미치는 영향을 식품 공급 자료의 범위와 함께 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-04/staple-rice-share-map.json
    source: staple-rice-share-map
    caption: 국가별 쌀·쌀 제품 공급 열량 비중, 2023년
    alt: 2023년 국가별 1인당 식품 공급 열량 중 쌀·쌀 제품의 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [food-culture]
  - id: s3
    type: map
    data: /data/02-04/staple-wheat-share-map.json
    source: staple-wheat-share-map
    caption: 국가별 밀·밀 제품 공급 열량 비중, 2023년
    alt: 2023년 국가별 1인당 식품 공급 열량 중 밀·밀 제품의 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [food-culture, cultural-diffusion]
  - id: s4
    type: chart
    data: /data/02-04/staple-share-comparison.json
    source: staple-share-comparison
    caption: 주요 6개국의 쌀·밀·옥수수 공급 열량 비중, 2023년
    alt: 방글라데시·대한민국·인도·이탈리아·멕시코·미국의 작물별 공급 열량 비중을 막대로 비교한 그래프다.
    config: { kind: bar }
    concepts: [food-culture, glocalization]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [food-culture, cultural-diffusion, glocalization]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 쌀과 밀 공급 비중 지도 비교
    instruction: 두 지도의 범례와 기준 연도를 확인하고, 같은 국가의 쌀·밀 비중과 지역별 분포를 비교한다.
    prompt: 두 지도에서 공통점과 차이를 근거로 설명하고, 이 비중만으로 알 수 없는 음식 문화의 특징을 적으시오.
    fields:
      - { id: rice, label: 쌀 비중 지도에서 찾은 특징 }
      - { id: wheat, label: 밀 비중 지도에서 찾은 특징 }
      - { id: compare, label: 두 지도에서 함께 보이는 점과 다른 점 }
      - { id: limits, label: 음식 문화의 원인을 설명하는 데 더 필요한 자료 }
sourceIds: [fao-agroecological-zoning, fao-food-choices, fao-food-balances, fao-food-balances-handbook, unesco-intangible-convention, unesco-mediterranean-diet]
illustration:
  src: /images/02-04/food-exchange.webp
  alt: 여러 사람이 재료와 향신료를 건네며 함께 조리하고, 변화한 음식을 나눈다.
---
음식 문화에는 먹거리의 공급 조건과 공동체의 선택이 함께 작용한다. 재료가 자랄 수 있는 범위는 기후·지형·토양과 연결된다. FAO(국제연합식량농업기구)는 식품 선택에 문화와 종교, 관습, 조리 기술 등이 영향을 준다고 설명한다.

쌀 지도의 범례를 먼저 확인하고, 방글라데시·대한민국·미국의 값을 비교한다. 2023년 1인당 식품 공급 열량에서 쌀·쌀 제품이 차지하는 비중은 각각 64.2%, 16.9%, 2.1%다. 이 수치는 식품 공급의 구성비다. 실제 섭취량과 개인별 식사 모습은 식생활 자료를 함께 살펴본다.

밀 지도에서 같은 국가와 주변 지역을 찾아 쌀 지도와 비교한다. 방글라데시의 밀 비중은 3.7%다. 이탈리아는 쌀 1.7%, 밀 25.4%이고, 인도는 쌀 25.3%, 밀 22.3%다. 국가별 작물 비중의 차이를 확인한 뒤 생산 환경·교역·종교·역사를 함께 살펴 그 배경을 설명한다.

주요 6개국 그래프에서 쌀·밀·옥수수의 공급 열량 비중을 함께 비교한다. 멕시코는 옥수수 31.7%, 쌀 1.5%, 밀 6.3%다. 색이 비슷해도 범례와 단위를 확인해 값을 읽는다. 이 자료는 국가별 공급 비중을 보여 주므로, 지역별 식생활은 지역 자료를 더해 살펴본다.

사람과 재료, 조리법이 이동하면 새로운 재료와 취향을 만나 음식도 달라진다. 유네스코는 지중해 식생활에서 시장을 음식 교류와 전승의 공간으로 소개한다. cultural diffusion(문화 전파)과 glocalization(세계지역화)은 공동체가 외부 문화를 선택하고 재해석하는 과정도 설명한다. 공급 비중 자료에 지역 기록과 실천하는 사람들의 목소리를 더하면 음식에 담긴 의미와 변화의 역사를 이해할 수 있다.
