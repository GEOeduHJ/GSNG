---
title: '세계의 음식 문화는 얼마나 다양할까?'
goal: 자연환경과 역사·종교, 교류가 음식 문화에 함께 작용하는 방식을 실제 자료로 살펴보고 공급 통계의 범위를 설명할 수 있다.
opener: 같은 재료도 지역에 따라 다른 음식이 되는 까닭은 무엇일까? 재료를 얻는 환경과 사람들의 경험은 음식에 어떻게 담길까?
textbookRef: { pages: [106, 109] }
steps:
  - id: d1
    type: map
    data: /data/02-04/staple-rice-share-map.json
    label: 국가별 쌀 공급 열량 비중
    caption: 국가별 쌀·쌀 제품 공급 열량 비중, 2023년
    source: staple-rice-share-map
    alt: 2023년 국가별 1인당 식품 공급 열량에서 쌀과 쌀 제품이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-culture]
  - id: d2
    type: map
    data: /data/02-04/staple-wheat-share-map.json
    label: 국가별 밀 공급 열량 비중
    caption: 국가별 밀·밀 제품 공급 열량 비중, 2023년
    source: staple-wheat-share-map
    alt: 2023년 국가별 1인당 식품 공급 열량에서 밀과 밀 제품이 차지하는 비중을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [food-culture]
  - id: d3
    type: chart
    data: /data/02-04/staple-share-comparison.json
    label: 여섯 국가의 주식 작물 비중
    caption: 주요 6개국의 쌀·밀·옥수수 공급 열량 비중, 2023년
    source: staple-share-comparison
    alt: 방글라데시·대한민국·인도·이탈리아·멕시코·미국의 쌀·밀·옥수수 공급 열량 비중을 비교한 막대그래프다.
    config: { kind: bar, unit: '%' }
    concepts: [food-culture, cultural-diffusion, glocalization]
  - id: d4
    type: image
    schematic: true
    data: /images/02-04/food-culture-factors.svg
    label: 음식 문화의 형성과 변화
    caption: '개념도: 조건과 공동체의 선택'
    source: ''
    alt: 자연환경과 사회적 요인, 교류가 공동체의 선택을 거쳐 음식 문화의 여러 모습에 영향을 주는 흐름이다.
    config: {}
    concepts: [food-culture, cultural-diffusion, glocalization]
summary:
  - 음식 문화는 자연환경과 역사·종교, 생산·교류 방식, 공동체의 선택이 함께 만들어 간다.
  - 식품 공급 열량의 비중은 국가별 공급 구성을 비교하는 지표다.
  - 사람과 재료, 조리 지식이 이동하면 지역 공동체의 선택에 따라 음식 문화가 새롭게 바뀐다.
routines:
  opener: { id: see-think-me-we, prompt: "음식 문화의 형성과 변화 자료에서 환경·역사·교류의 연결을 살피고, 일상과 지역·세계의 관계를 생각해 보자." }
  inquiry: { id: same-different-connect-engage, prompt: "쌀·밀 공급 열량 비중이 다른 지역을 비교해 음식문화의 공통점·차이를 찾고, 생산·교류와 연결해 보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 쌀과 밀 공급 비중 지도 비교
    instruction: 두 지도의 범례와 단위를 확인하고, 같은 국가와 주변 지역의 쌀·밀 비중을 비교한다.
    prompt: 지도에서 찾은 차이를 설명할 때 확인할 자연환경 요인과 역사·교류 요인을 각각 제안하고, 공급 통계만으로 알기 어려운 점을 적으시오.
    fields:
      - { id: rice, label: 쌀 비중 지도에서 찾은 지역 차이 }
      - { id: wheat, label: 밀 비중 지도에서 찾은 지역 차이 }
      - { id: compare, label: 두 지도에서 함께 보이는 점과 다른 점 }
      - { id: factors, label: 차이를 설명하기 위해 더 확인할 요인 }
keyTerms: [food-culture, cultural-diffusion, glocalization]
sourceIds: [fao-agroecological-zoning, fao-food-balances, fao-food-balances-handbook, fao-food-choices, unesco-mexican-cuisine]
illustration:
  src: /images/02-04/food-exchange.webp
  alt: 여러 사람이 재료와 향신료를 건네며 함께 조리하고, 변화한 음식을 나눈다.
---
## 음식 문화와 자연적 요인

음식 문화는 재료를 기르고 얻는 자연 조건과, 그 조건에 대응해 쌓인 조리 기술과 공동체의 선택이 함께 만든다. 기후와 지형, 토양은 재료의 생산 조건을 바꾼다. 같은 환경에서도 사람들은 다른 재료와 조리법을 선택한다. 여러 요인이 음식 문화에 연결되는 관계를 개념도에서 살펴보자. [[d4]]

식품 공급 열량 비중은 한 나라의 식품 공급에서 특정 작물과 제품이 차지하는 몫을 보여 준다. 2023년 쌀 비중은 방글라데시 64.2%, 대한민국 16.9%, 미국 2.1%다. 이 값은 공급 가능한 식품의 구성이다. 실제 식사 모습과 지역 안의 차이는 식생활 자료와 함께 살펴보자. [[d1]]

## 음식 문화와 인문적 요인

종교와 역사, 교역과 이주는 재료의 선택과 조리법, 식사 관습에 영향을 준다. 같은 작물이 공급되어도 종교적 실천이나 공동체의 경험에 따라 음식의 의미와 쓰임이 달라질 수 있다. 2023년 밀 비중은 이탈리아 25.4%, 방글라데시 3.7%다. 지도를 비교한 뒤 차이를 설명할 역사·사회 자료를 더 찾아보자. [[d2]]

## 세계화와 음식 문화

사람과 재료, 조리법이 오가면 음식 문화도 서로 영향을 주고받는다. cultural diffusion(문화 전파)은 문화 요소가 다른 장소로 이동해 받아들여지는 과정이다. glocalization(세계지역화)은 외부 요소가 지역의 생활과 선택에 맞게 새롭게 바뀌는 과정이다. 재료와 조리법이 지역 방식과 만날 때 음식 문화의 융합이 나타난다. UNESCO(국제연합교육과학문화기구)에 등재된 멕시코 전통 요리 문화는 재배와 조리, 공동체의 지식 전승이 맞물린 사례다. 그래프에서 국가별 공급 구성을 비교하고, 공급 통계와 문화 실천이 답하는 질문을 구분하자. [[d3]]
