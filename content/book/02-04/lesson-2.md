---
title: '세계에는 얼마나 다양한 축제들이 있을까?'
goal: 자연환경과 역사·종교, 생업이 축제와 연결되는 방식을 사례와 자료로 설명하고 지역사회에 미치는 영향을 살필 수 있다.
opener: 축제의 시기와 모습은 장소마다 어떻게 달라질까? 지역 주민에게 축제는 어떤 의미를 가질까?
textbookRef: { pages: [110, 115] }
steps:
  - id: d1
    type: image
    schematic: true
    data: /images/02-04/festival-place-factors.svg
    label: 축제와 장소의 관계
    caption: '개념도: 축제의 배경과 지역사회에 미치는 영향'
    source: ''
    alt: 자연환경과 계절, 역사와 믿음, 생업과 특산물이 공동체 축제에 연결되고 지역사회에 여러 영향을 주는 흐름이다.
    config: {}
    concepts: [festival-geography, cultural-diversity]
  - id: d2
    type: map
    data: /data/02-04/festival-rituals-points.geojson
    label: 축제·의례의 대표 장소
    caption: 유네스코 대표목록에 수록된 축제·의례 종목의 대표 장소
    source: festival-rituals-points
    alt: 여러 대륙에 있는 선정된 축제와 의례 종목의 대표 지명을 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 종목' }
    concepts: [festival-geography, cultural-diversity]
  - id: d3
    type: chart
    data: /data/02-04/festival-theme-counts.json
    label: 축제 사례의 중심 주제
    caption: 선정한 축제·의례 6종목에서 살펴본 중심 주제
    source: festival-theme-counts
    alt: 선정한 여섯 축제·의례 사례를 계절·달력, 종교·의례, 역사·공동체 기억, 생업·환경의 중심 주제로 분류한 막대그래프다.
    config: { kind: bar, unit: '개' }
    concepts: [festival-geography]
  - id: d4
    type: chart
    data: /data/02-04/festival-inscribed-years.json
    label: 선정한 축제·의례의 등재 연도
    caption: 자료에 수록한 축제·의례 15종목의 유네스코 등재 연도별 수, 2008–2016년
    source: festival-inscribed-years
    alt: 2008년부터 2016년까지 자료에 수록한 축제·의례 열다섯 종목의 유네스코 등재 연도별 수를 나타낸 막대그래프다.
    config: { kind: bar, unit: '개' }
    concepts: [festival-geography]
summary:
  - 축제는 자연환경과 계절, 역사·종교, 생업과 공동체 기억이 장소와 만나 형성된다.
  - 한 축제에는 여러 의미가 겹칠 수 있으며, 사례와 출처를 살펴 맥락을 이해한다.
  - 축제는 교류와 지역 활력을 만들 수 있고, 주민의 참여와 결정권에 따라 영향이 달라진다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 축제의 배경을 자료 근거로 살펴보기
    instruction: UNESCO 공식 설명에서 확인되는 배경을 읽고 중심 주제를 고른다. 한 종목에는 여러 의미가 함께 나타날 수 있다.
    prompt: 각 종목을 중심 주제와 연결하고, 다른 주제로도 설명할 수 있는 이유를 출처에서 찾아 덧붙이시오.
    items:
      - { id: gangneung, text: '강릉단오제: 지역 공동체가 이어 온 세시 의례와 축제' }
      - { id: jongmyo, text: '종묘제례 및 종묘제례악: 조상 의례와 노래·춤·음악' }
      - { id: mangal, text: '망갈 쇼바자트라: 방글라데시 새해를 기념하는 행렬' }
      - { id: saint-blaise, text: '두브로브니크의 성 블라시오 축제: 도시의 수호 성인을 기리는 의례와 행렬' }
      - { id: el-callao, text: '엘 칼라오 카니발: 역사적 기억과 공동체 정체성' }
      - { id: argungu, text: '아르군구 국제 낚시·문화 축제: 강과 어업에 연결된 활동과 지식' }
    categories:
      - { id: calendar, label: 계절·달력 }
      - { id: religion, label: 종교·의례 }
      - { id: memory, label: 역사·공동체 기억 }
      - { id: livelihood, label: 생업·환경 }
keyTerms: [festival-geography, cultural-diversity, cultural-diffusion]
sourceIds: [unesco-intangible-list, unesco-2008-masterpieces, unesco-gangneung-danoje, unesco-jongmyo, unesco-mangal-shobhajatra, unesco-saint-blaise, unesco-el-callao, unesco-argungu]
---
## 축제와 장소의 관계

축제와 의례는 공동체가 특정한 장소와 시기, 기억을 함께 표현하는 문화 실천이다. 지역의 기후와 낮 길이, 계절은 축제의 시기와 활동에 영향을 준다. 하지와 백야의 긴 낮은 야외 행사를, 눈과 물은 놀이와 경연을 위한 공간을 만든다. 나이지리아 아르군구 국제 낚시·문화 축제는 강과 전통 어업, 공동체 놀이가 만나는 사례다. 자연환경과 축제 시기, 생업이 축제 활동에 이어지는 관계를 개념도에서 살펴보자. [[d1]]

강릉단오제와 종묘제례, 망갈 쇼바자트라처럼 장소와 공동체가 다른 사례를 대표 지명 지도에서 찾아보자. [[d2]]

## 종교·역사·생업에서 이어지는 축제

역사와 종교, 지역의 전통은 지역 문화의 일부이며 공동체의 가치와 정체성을 드러낸다. 강릉단오제는 단오 절기의 세시 의례와 공동체 놀이를 잇고, 종묘제례는 조선 왕실 조상 의례에 음악과 춤이 결합한 전통이다. 방글라데시 망갈 쇼바자트라는 새해 행렬이며, 베네수엘라 엘 칼라오 카니발은 역사 기억과 공동체 정체성을 표현한다. 선정한 여섯 종목을 중심 주제로 나누면 계절·달력 2개, 종교·의례 2개, 역사·공동체 기억 1개, 생업·환경 1개다. 네 범주는 UNESCO(국제연합교육과학문화기구)의 공식 분류가 아니라 수업용 기준이며, 한 축제에 여러 의미가 겹칠 수 있다. [[d3]]

## 축제의 변화와 지역사회

특산물 축제는 지역 자원을 알리는 지역 홍보 활동이며, 방문객의 소비는 지역 경제에 매출과 일자리를 보탠다. 아르군구 축제처럼 지역의 어업과 기술이 공동체의 중요한 축제 자원이 되기도 한다. 관광과 지역 경제는 서로 영향을 주고받지만, 관광객 집중과 상업화는 생활 환경과 운영 방식에 부담을 줄 수 있다. 주민이 기획과 의사결정에 참여하고 이익과 부담을 나누면 지역사회와 축제가 함께 이어질 조건이 마련된다.

등재 연도 그래프는 선정한 축제·의례 15종목의 목록 등재 시점을 모은 자료다. 2008년에는 6종목, 2010년과 2016년에는 각각 3종목이 등재되었다. 2008년에는 이전에 ‘걸작’으로 선포된 요소가 대표목록에 포함되었다. [[d4]]
