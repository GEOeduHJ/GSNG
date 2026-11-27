---
title: 인구 구조의 변화는 어떤 인구 문제를 가져올까?
goal: 인구 피라미드와 출산율 자료를 읽고 저출산·고령화·젊은 인구 구조에서 나타날 수 있는 과제와 대응을 근거에 따라 구분할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/03-01/pyramid-kor-2024.json
    source: u0301-population-pyramid-kor
    caption: 대한민국 인구 피라미드, 2024년 추계
    alt: 2024년 추계한 대한민국 인구의 연령별 남녀 비율을 나타낸 인구 피라미드다.
    config: { kind: pyramid }
    concepts: [population-structure]
  - id: s3
    type: chart
    data: /data/03-01/pyramid-jpn-2024.json
    source: u0301-population-pyramid-jpn
    caption: 일본 인구 피라미드, 2024년 추계
    alt: 2024년 추계한 일본 인구의 연령별 남녀 비율을 나타낸 인구 피라미드다.
    config: { kind: pyramid }
    concepts: [population-structure]
  - id: s4
    type: chart
    data: /data/03-01/pyramid-uga-2024.json
    source: u0301-population-pyramid-uga
    caption: 우간다 인구 피라미드, 2024년 추계
    alt: 2024년 추계한 우간다 인구의 연령별 남녀 비율을 나타낸 인구 피라미드다.
    config: { kind: pyramid }
    concepts: [population-structure]
  - id: s5
    type: chart
    data: /data/03-01/fertility-rate-series-1960-2024.json
    source: u0301-fertility-rate-series
    caption: 대한민국·일본·우간다·세계 합계 출산율, 1960–2024년
    alt: 대한민국·일본·우간다와 세계의 합계 출산율을 1960년부터 2024년까지 선으로 나타낸 그래프다.
    config: { kind: line, maxYear: 2024 }
    concepts: [population-structure]
keyTerms: [population-structure]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 인구 변화의 배경·과제·대응 분류
    instruction: 피라미드와 시계열에서 확인한 사실, 그에 근거한 설명, 정책 대응을 구분한다.
    prompt: 각 문장을 알맞은 범주에 놓고, 자료만으로 판단하기 어려운 문장에는 더 필요한 자료를 적으시오.
    items:
      - { id: fertility-structure, text: 장기간 낮은 합계 출산율은 어린 연령 집단의 비중이 작아지는 인구 구조와 관련된다. }
      - { id: ageing-planning, text: 고령 인구 비율이 커지면 노동시장·가구·사회 보호·교육·보건 계획에서 살펴볼 점이 늘어난다. }
      - { id: youth-opportunity, text: 젊은 연령 집단이 많은 지역은 교육·보건·성평등·일자리 여건을 갖추어 인구 구조의 기회를 넓힐 수 있다. }
      - { id: pyramid-limit, text: 한 시점의 인구 피라미드만으로 청년 실업의 규모와 원인을 알 수 있다. }
    categories:
      - { id: background, label: 인구 구조 변화의 배경 }
      - { id: issue, label: 변화가 만드는 과제와 기회 }
      - { id: response, label: 정책과 공동체의 대응 }
      - { id: more-data, label: 추가 자료가 필요한 주장 }
sourceIds: [undesa-population-ageing, undesa-demographic-dividend]
illustration:
  src: /images/03-01/community-care.webp
  alt: 여러 세대의 이웃들이 접근하기 쉬운 공동 공간에서 음식을 준비하고 상차림과 식물 돌봄을 나눈다.
---
population pyramid(인구 피라미드)는 한 시점의 인구를 연령대와 성별로 나누어 나타내는 그래프다. 이 단원의 피라미드에서 막대는 각 성별·연령 집단이 국가 전체 인구에서 차지하는 비율이며, 세 자료는 모두 2024년 중위 시나리오 추계다. 아래쪽과 위쪽의 폭, 남녀 막대의 차이를 살펴 인구 구조를 비교한다.

대한민국 피라미드에서는 어린 연령층보다 성인 연령층의 폭이 상대적으로 넓게 나타난다. 이는 2024년 추계에서 연령대별 인구 비중이 다름을 보여 준다. 그래프 한 장은 이런 구조를 보여 주지만 출산율 변화의 원인이나 개인이 자녀를 계획한 이유를 설명하지 않는다.

일본 피라미드에서는 어린 연령층에 비해 중·고령 연령층의 비중이 두드러진다. 여는 펼침면의 65세 이상 인구 비율 지도와 함께 보면 일본(29.8%)의 비율이 대한민국(19.3%)보다 높고, 우간다(2.2%)는 두 나라보다 훨씬 낮은 공간 차이도 확인할 수 있다. 고령화는 인구 구성의 변화이며 그 자체로 모든 사람에게 같은 문제를 뜻하지 않는다.

우간다 피라미드는 어린 연령층의 폭이 넓고 연령이 높아질수록 좁아지는 모습이다. 젊은 인구가 많은 구조는 교육과 건강, 일자리 기회를 넓힐 가능성을 만들 수 있지만 그 성과가 자동으로 정해지는 것은 아니다. 인구가 빠르게 늘어나는 곳은 학교와 보건, 주거와 일자리 계획을 함께 살펴야 한다.

합계 출산율은 여성 1명당 출생아 수로 표시한다. 세계은행 자료에서 대한민국은 1960년 5.994명에서 2024년 0.748명으로 낮아졌고, 2024년 세계 값은 2.188명, 우간다는 4.165명이다. 이 시계열은 장기적인 차이를 보여 주지만 변화의 원인이나 정책의 효과를 단독으로 증명하지 않는다.
