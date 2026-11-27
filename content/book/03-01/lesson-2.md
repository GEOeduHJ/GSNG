---
title: 인구 구조의 변화는 어떤 인구 문제를 가져올까?
goal: 세계 인구 성장과 인구 변천을 이해하고 연령·산업 구조 및 부양비를 연결해 지역별 과제와 대응을 설명할 수 있다.
opener: 출생과 사망의 변화는 한 지역의 인구 규모와 연령 구성을 어떻게 바꿀까? 이러한 변화가 학교·일자리·돌봄 계획에 어떤 영향을 줄지 생각해 보자.
textbookRef: { pages: [128, 131] }
steps:
  - id: d1
    type: chart
    data: /data/03-01/world-population-wpp2024-1950-2100.json
    label: 세계 인구 성장과 전망
    caption: 세계 총인구, 1950–2023년 추계·2024–2100년 중위 전망
    source: u0301-wpp-world-population
    alt: 1950년부터 2023년까지의 추계와 2024년부터 2100년까지의 중위 전망으로 세계 총인구 흐름을 나타낸 선 그래프다. 7월 1일 기준 계열이다.
    config: { kind: line, maxYear: 2100, projectionFrom: 2024, unit: '명' }
    concepts: [population-structure]
  - id: d2
    type: chart
    data: /data/03-01/crude-birth-death-rates-1960-2024.json
    label: 출생률·사망률 변화
    caption: 세계·대한민국·일본·우간다의 조출생률·조사망률, 1960–2024년
    source: u0301-crude-birth-death-rates
    alt: 세계·대한민국·일본·우간다의 조출생률과 조사망률을 1960년부터 2024년까지 비교한 선 그래프다.
    config: { kind: line, maxYear: 2024, unit: '명(인구 1,000명당)' }
    concepts: [population-structure]
  - id: d3
    type: image
    schematic: true
    data: /images/03-01/demographic-transition-schematic.svg
    label: 인구 변천 개념도
    caption: 인구 변천의 단계와 상대적 흐름
    source: ''
    alt: 출생률과 사망률이 서로 다른 속도로 낮아지고 마지막에는 사망률이 출생률을 조금 웃돌 수 있음을 나타내는 일반 개념도다.
    config: {}
    concepts: [population-structure]
  - id: d4
    type: chart
    data: /data/03-01/pyramid-kor-2024.json
    label: 대한민국 인구 피라미드
    caption: 대한민국 인구 피라미드, 2024년 중위 변이 전망
    source: u0301-population-pyramid-kor
    alt: 2024년 중위 변이 전망에서 대한민국 전체 인구 대비 성별·연령대별 비율을 나타낸 인구 피라미드다.
    config: { kind: pyramid }
    concepts: [population-structure]
  - id: d5
    type: chart
    data: /data/03-01/pyramid-uga-2024.json
    label: 우간다 인구 피라미드
    caption: 우간다 인구 피라미드, 2024년 중위 변이 전망
    source: u0301-population-pyramid-uga
    alt: 2024년 중위 변이 전망에서 우간다 전체 인구 대비 성별·연령대별 비율을 나타낸 인구 피라미드다.
    config: { kind: pyramid }
    concepts: [population-structure]
  - id: d6
    type: chart
    data: /data/03-01/industry-employment-shares-2024.json
    label: 산업별 종사자 비율
    caption: 세계·대한민국·일본·우간다의 산업별 종사자 비율, 2024년
    source: u0301-industry-employment
    alt: 2024년 전체 종사자에서 농업·산업·서비스업이 차지하는 비율을 비교한 그래프다.
    config: { kind: bar, unit: '%' }
    concepts: [population-structure]
  - id: d7
    type: chart
    data: /data/03-01/dependency-ratios-2024.json
    label: 유소년·노년 부양비
    caption: 세계·대한민국·일본·우간다의 유소년·노년 부양비, 2024년
    source: u0301-dependency-ratios
    alt: 2024년 생산연령 인구 100명당 유소년 인구와 노년 인구의 비율을 비교한 그래프다.
    config: { kind: bar, unit: '명(청장년층 100명당)' }
    concepts: [population-structure]
summary:
  - 산업 혁명 이후 사망률이 낮아지면서 세계 인구가 빠르게 늘었다.
  - 인구 변천은 출생률과 사망률이 모두 높은 단계에서 모두 낮은 단계로 옮겨 가는 과정이다.
  - 출생률이 높은 개발 도상국은 유소년층 비율이, 평균 수명이 긴 선진국은 노년층 비율이 높다.
  - 선진국은 저출산·고령화, 개발 도상국은 빠른 인구 증가에 따른 문제를 겪으며 지역 조건에 맞는 대책을 마련한다.
routines:
  opener: { id: see-think-wonder, prompt: "대한민국 인구 피라미드 자료에서 연령대별 모양을 살피고, 인구 구조의 변화에 관해 궁금한 점을 적어 보자." }
  inquiry: { id: claim-support-question, prompt: "대한민국·우간다 인구 피라미드와 부양비 자료로 인구 문제에 관한 주장을 세우고, 근거와 확인할 점을 정리해 보자." }
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 인구 변화 자료에서 사실·해석·과제 구분
    instruction: 세계 인구 전망, 출생률·사망률, 연령 구조, 산업별 종사자, 부양비 자료를 바탕으로 주장의 범위를 살핀다.
    prompt: 각 문장을 알맞은 범주에 놓고, 판단을 뒷받침하는 자료와 그 자료만으로 알 수 없는 점을 덧붙이시오.
    items:
      - { id: projection, text: 세계 인구 그래프는 추계 구간과 중위 전망 구간을 구분해 보여 준다. }
      - { id: natural-increase, text: 출생률과 사망률의 상대적 변화는 자연 증가와 인구 성장의 흐름을 설명하는 단서가 된다. }
      - { id: labour-outcome, text: 연령 피라미드만으로 청년층의 취업 가능성과 노동 조건을 확정할 수 있다. }
      - { id: planning, text: 연령 구성과 산업별 종사자 비율, 부양비를 함께 살펴 교육·보건·돌봄·일자리 계획을 검토한다. }
    categories:
      - { id: evidence, label: 자료에서 직접 확인한 사실 }
      - { id: interpretation, label: 개념을 적용한 해석 }
      - { id: more-data, label: 추가 자료가 필요한 판단 }
      - { id: response, label: 가능한 대응 }
keyTerms: [population-structure]
sourceIds: [undesa-wpp2024-population, world-bank-wdi-03-01, undesa-population-ageing, undesa-demographic-dividend]
illustration:
  src: /images/03-01/community-care.webp
  alt: 여러 세대의 이웃들이 접근하기 쉬운 공동 공간에서 음식을 준비하고 상차림과 식물 돌봄을 나눈다.
---
## 세계 인구 성장

오랫동안 세계 인구는 매우 느리게 늘었다. 식량이 부족하고 질병과 재해를 이겨 내기 어려워, 태어나는 만큼 많은 사람이 일찍 세상을 떠났기 때문이다. 산업 혁명 이후 식량 생산이 늘고 의료와 위생이 나아지면서 사망률이 크게 낮아졌고, 세계 인구는 빠르게 늘기 시작했다. 1950년 약 25억 명이던 세계 인구는 2023년 약 81억 명이 되었다. 그래프에서 인구가 가장 빠르게 늘어난 시기를 찾고, 2024년 이후 중위 전망에서 증가 속도가 어떻게 달라지는지 살펴보자. [[d1]]

## 인구 변천의 과정

crude birth rate(조출생률)는 한 해 동안 인구 1,000명당 태어난 아이의 수이고, crude death rate(조사망률)는 같은 기준의 사망자 수다. 출생이 사망보다 많아 인구가 저절로 늘어나는 것을 natural increase(자연 증가)라고 한다. 2024년 우간다는 조출생률 34.4명, 조사망률 4.8명으로 자연 증가가 크다. 같은 해 대한민국은 조출생률 4.7명, 조사망률 7.0명으로 사망이 출생보다 많다. 그래프에서 두 나라의 선이 1960년 이후 어떻게 달라졌는지 비교해 보자. [[d2]]

demographic transition(인구 변천)은 경제가 발전하면서 출생률과 사망률이 높은 수준에서 낮은 수준으로 옮겨 가는 과정을 설명하는 모형이다. 처음에는 출생률과 사망률이 모두 높아 인구가 거의 늘지 않는다. 의료와 위생이 나아져 사망률이 먼저 떨어지면 인구가 빠르게 늘어난다. 여성의 교육과 사회 진출이 늘고 자녀에 대한 생각이 바뀌면 출생률도 낮아져 인구 증가가 느려진다. 마지막에는 출생률이 사망률보다 낮아져 인구가 줄기도 한다. 일찍 산업화한 선진국은 이 과정을 먼저 거쳤고, 많은 개발 도상국은 사망률이 빠르게 낮아진 뒤 출생률이 천천히 낮아지는 단계에 있다. 개념도에서 단계마다 출생률·사망률·총인구가 어떻게 움직이는지 확인해 보자. [[d3]]

## 연령별 인구 구조

인구 구조는 인구를 성별과 연령에 따라 나누어 본 구성이다. 보통 0~14세를 유소년층, 15~64세를 청장년층, 65세 이상을 노년층이라고 한다. population pyramid(인구 피라미드)는 연령대별 인구 비율을 남녀로 나누어 쌓은 그래프로, 모양을 보면 그 사회의 인구 특징을 짐작할 수 있다. 출생률이 높은 개발 도상국은 아래가 넓은 삼각형 모양이다. 출생률이 낮고 평균 수명이 긴 선진국은 아래가 좁고 위쪽이 두꺼워진다. 대한민국과 우간다의 피라미드를 나란히 보고 유소년층과 노년층의 폭을 비교해 보자. [[d4]] [[d5]]

## 산업별 인구 구조

산업별 인구 구조는 일하는 사람들이 농업 같은 1차 산업, 제조업 같은 2차 산업, 서비스업 같은 3차 산업에 어떻게 나뉘어 있는지를 나타낸다. 경제가 발전하면 농업에서 일하는 사람의 비율은 줄고 공업과 서비스업에서 일하는 사람의 비율이 늘어난다. 2024년 우간다는 종사자의 약 65.4%가 농업에서 일하지만, 대한민국은 약 5.2%다. 이 값은 ILO(국제노동기구)의 모형 추정치다. 그래프에서 네 지역의 산업별 비율을 비교하고, 연령 구조와 함께 생각해 보자. [[d6]]

## 지역별 인구 문제와 대응

일찍 산업화한 선진국은 출생률이 낮아지고 평균 수명이 길어져 저출산·고령화를 겪고 있다. 일할 사람은 줄고 돌봄이 필요한 노인은 늘어 노동력 부족과 연금·의료비 부담이 커진다. 그래서 보육 시설과 양육비로 출산과 육아를 돕고, 노년층의 일자리와 연금 제도를 손보며, 외국인 노동자를 받아들이기도 한다.

개발 도상국은 사망률이 빠르게 낮아진 데 비해 출생률은 천천히 낮아져 인구가 빠르게 늘었다. 일자리와 주택, 학교가 인구 증가를 따라가지 못하면 실업과 빈곤, 대도시 과밀 문제가 생긴다. 이에 교육과 보건을 넓혀 출생률을 낮추고 경제 성장에 힘쓰며, 지방에 산업 단지를 만들어 인구를 나누어 살게 하기도 한다.

부양비는 청장년층 100명이 부양하는 유소년층이나 노년층의 수다. 2024년 일본의 노년 부양비는 약 50.7명이고 우간다는 약 4.0명이다. 그래프에서 대한민국과 세계의 값도 찾아, 어느 나라가 고령화 대응을, 어느 나라가 유소년층의 교육·보건을 더 서둘러 준비해야 할지 생각해 보자. [[d7]]
