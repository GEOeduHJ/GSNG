---
title: '문화의 다양성을 보존하기 위해서는 어떻게 해야 할까?'
goal: 무형문화유산의 국제적 인정과 음식·축제 사례를 살펴보고 공동체의 참여를 반영한 문화 다양성 보존 방안을 제안할 수 있다.
opener: 문화를 기록하고 알리는 일은 어떻게 다음 세대의 전승으로 이어질까? 보존의 방향은 누가 정해야 할까?
textbookRef: { pages: [116, 118] }
steps:
  - id: d1
    type: map
    data: /data/02-04/mediterranean-diet-countries-map.json
    label: 지중해 식생활 공동 등재국
    caption: 유네스코 지중해 식생활 공동 등재국, 2013년
    source: mediterranean-diet-countries-map
    alt: 2013년 지중해 식생활 공동 등재에 참여한 일곱 국가를 색으로 표시한 지도다.
    config: { kind: choropleth, unit: '종목 공동 등재국' }
    concepts: [food-culture, cultural-diversity]
  - id: d2
    type: map
    data: /data/02-04/unesco-national-food-practices-map.json
    label: 국가별 음식 문화 등재 사례
    caption: 선정한 유네스코 음식 문화 종목의 국가, 2010–2013년 등재
    source: unesco-national-food-practices-map
    alt: 프랑스·멕시코·일본·대한민국의 선정 음식 문화 종목 등재 사례를 표시한 지도다. 표시되지 않은 국가는 이 자료의 선정 범위에 포함되지 않았다.
    config: { kind: choropleth, unit: '종목 사례' }
    concepts: [food-culture, cultural-diversity]
  - id: d3
    type: map
    data: /data/02-04/festival-rituals-points.geojson
    label: 축제·의례의 대표 장소
    caption: 선정한 유네스코 축제·의례 종목의 대표 장소
    source: festival-rituals-points
    alt: 여러 대륙에 있는 선정된 축제·의례 종목의 대표 지명을 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 종목' }
    concepts: [festival-geography, cultural-diversity]
  - id: d4
    type: image
    schematic: true
    data: /images/02-04/community-led-safeguarding.svg
    label: 공동체가 주도하는 보존 과정
    caption: '개념도: 동의와 참여를 바탕으로 한 기록·전승·재창조'
    source: ''
    alt: 공동체의 동의와 참여를 바탕으로 기록, 배움과 전승, 재창조가 이어지는 무형문화유산 보존 과정이다.
    config: {}
    concepts: [cultural-diversity, food-culture, festival-geography]
summary:
  - 무형문화유산은 공동체가 이어 가고 새롭게 만들어 가는 지식과 표현, 실천이다.
  - 국제적 인정은 문화 실천을 알리고 대화를 넓히는 계기가 될 수 있다.
  - 기록과 교육, 공동체의 결정권과 지속적인 참여가 문화 전승의 바탕이 된다.
routines:
  opener: { id: compass-points, prompt: "공동체가 주도하는 보존 과정 자료에서 참여와 결정권을 살피고, 기대·우려·추가 정보와 제안을 정리해 보자." }
  inquiry: { id: values-identities-actions, prompt: "지역 음식·축제 보존 사례에서 공동체의 가치와 정체성, 이를 이어 가는 행동을 찾아보자." }
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 공동체 참여를 고려한 보존 방안 평가
    instruction: 무형유산 목록과 음식·축제 사례에서 확인한 내용으로 방안별 이익과 부담을 비교한다.
    prompt: 전승의 지속성, 공동체의 동의와 결정권, 지역의 이익과 부담, 한 가지 모습으로 굳어질 위험을 따져 실행안을 제안하시오.
    options:
      - { id: documentation, label: 공동체 동의를 바탕으로 실천과 구술을 기록 }
      - { id: education, label: 전승자가 학교와 지역에서 지식과 기술을 나눔 }
      - { id: tourism, label: 공동체가 규칙과 이익 배분을 정하는 관광 활용 }
      - { id: community-led, label: 실천 공동체가 보존과 변화의 방향을 주도 }
    criteria:
      - { id: transmission, label: 세대 간 전승을 이어 가는가 }
      - { id: agency, label: 공동체의 동의와 결정권을 보장하는가 }
      - { id: livelihood, label: 지역의 이익과 부담을 함께 고려하는가 }
      - { id: diversity, label: 문화 표현을 한 가지 모습으로 제한할 위험이 있는가 }
keyTerms: [cultural-diversity, food-culture, festival-geography, glocalization]
sourceIds: [unesco-intangible-convention, unesco-intangible-list, unesco-mediterranean-diet, unesco-french-gastronomic-meal, unesco-mexican-cuisine, unesco-washoku, unesco-kimjang]
---
## 무형문화유산과 국제적 인정

intangible cultural heritage(무형문화유산)는 공동체가 전해 오고 생활 속에서 새롭게 만들어 가는 지식과 표현, 실천을 가리킨다. UNESCO(국제연합교육과학문화기구)의 협약은 조사와 기록, 교육, 공동체 참여를 보존 활동의 일부로 다룬다. 보존은 문화를 한 모습으로 고정하기보다 이어 갈 조건을 마련하는 과정이다. 이 과정을 개념도에서 살펴보자. [[d4]]

지중해 식생활은 음식의 생산과 준비, 나눔에 관한 지식과 실천이 여러 나라에 걸쳐 이어지는 사례다. 이 종목은 2013년 키프로스·크로아티아·스페인·그리스·이탈리아·모로코·포르투갈의 공동 등재로 목록에 올랐다. 지도에서 참여 국가가 지중해를 둘러싼 위치를 확인해 보자. [[d1]]

선정 국가별 사례 지도에는 프랑스의 미식 식사, 멕시코 전통 요리 문화, 일본의 와쇼쿠, 대한민국의 김장 문화가 표시된다. 네 사례는 음식 재료만이 아니라 생산·조리·나눔과 지식 전승이 문화 실천에 포함될 수 있음을 보여 준다. [[d2]]

축제와 의례도 공동체의 기억과 생활을 전하는 문화 실천이다. 점 지도에서 여러 지역의 종목을 찾아 음식 문화 사례와 장소·참여 방식이 어떻게 다른지 비교해 보자. [[d3]]

국가별 지도는 선정 종목이 등재된 나라를, 점 지도는 축제·의례의 대표 장소를 보여 준다. 목록의 등재 사실과 실제 공동체 전승은 서로 다른 내용이므로, 보존 상황은 전승자와 실천자의 경험을 함께 살펴 이해한다.

## 지역 문화와 세계화의 공존

문화 실천은 외부의 관심과 교류를 만나면서 알려지고 바뀔 수 있다. glocalization(세계지역화)은 세계적 흐름을 지역 공동체가 선택하고 자기 생활에 맞게 재구성하는 과정이다. 전승과 변화는 함께 일어날 수 있으며, 공동체가 변화의 방향을 논의할 권리가 중요하다.

## 공동체가 주도하는 보존

safeguarding(보존 활동)은 기록과 연구, 다음 세대의 배움, 실천 공간과 생계 여건을 연결해 이어 갈 수 있다. 관광과 홍보는 관심과 소득을 만들 수 있지만, 외부의 기대에 맞춰 한 가지 표현만 요구할 때는 전승의 주체와 이익 분배를 함께 살펴야 한다.

실천 공동체가 기록할 내용과 전달할 방식을 정하고, 학교·지역사회와 협력할 때 문화는 변화하는 생활 속에서 이어질 수 있다. 공동체가 자기 실천을 유지하고 변화 방향을 주도하면 문화 다양성이 이어진다. 보존 방안은 동의와 참여, 공동체의 결정권, 지역에 돌아가는 이익을 기준으로 비교해 실행안을 세우자.
