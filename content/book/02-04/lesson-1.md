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
음식 문화는 먹거리의 공급만으로 설명되지 않는다. 재료가 생산될 수 있는 범위는 기후·지형·토양 등 자연 조건과 연결된다. FAO(국제연합식량농업기구)는 사람이 식품을 고르는 일에는 문화와 종교, 관습, 조리 기술 등이 영향을 줄 수 있다고 설명한다. 한 가지 환경이나 종교가 한 나라 사람들의 식사를 모두 결정한다고 볼 수는 없다.

쌀 지도에서 범례를 확인하고 방글라데시·대한민국·미국의 값을 비교한다. 2023년 쌀과 쌀 제품의 공급 열량 비중은 방글라데시 64.2%, 대한민국 16.87%, 미국 2.11%다. 이는 1인당 식품 공급 열량에서 쌀과 쌀 제품이 차지하는 몫이다. 실제 섭취량이나 개인별 식사를 직접 측정한 값은 아니다.

밀 지도에서 같은 국가와 주변 지역을 살펴 쌀 지도와 대조한다. 방글라데시는 밀 비중이 3.72%이고, 이탈리아는 쌀 1.67%와 밀 25.37%로 나타난다. 인도는 쌀 25.34%, 밀 22.31%다. 국가별 비중의 차이는 확인할 수 있지만, 지도만으로 각 작물의 생산 환경이나 교역, 종교와 역사 가운데 무엇이 차이를 만들었는지는 알 수 없다.

주요 6개국 막대그래프는 쌀·밀·옥수수 비중을 한 화면에서 비교한다. 멕시코의 옥수수 비중은 31.66%, 쌀은 1.5%, 밀은 6.27%다. 여기서도 수치는 공급 열량의 구성비이며 실제로 사람들이 먹은 양이나 멕시코 안의 지역 차이를 보여 주지 않는다. 쌀과 밀 지도의 색이 비슷해도 범례와 기준을 확인해 값의 차이를 읽는다.

사람과 재료, 조리법이 이동하면 새로운 장소의 재료와 취향을 만나 음식이 달라질 수 있다. 유네스코가 소개한 지중해 식생활에서도 시장은 음식의 교류와 전승이 이루어지는 공간으로 다뤄진다. 이런 cultural diffusion(문화 전파)과 glocalization(세계지역화)은 한 방향의 복사가 아니라 공동체의 선택과 재해석을 포함한다. 지도와 막대그래프는 공급 비중을 보여 줄 뿐 종교적 의미나 이동의 역사, 요리법의 변화를 설명하지 않는다. 그런 내용을 말하려면 지역의 기록과 실천하는 사람들의 목소리를 더 살펴야 한다.
