---
title: '세계에는 얼마나 다양한 축제들이 있을까?'
goal: 축제와 의례의 기원 및 장소의 관계를 실제 사례와 자료의 한계를 구분해 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-04/festival-rituals-points.geojson
    source: festival-rituals-points
    caption: 유네스코 대표목록에 수록된 축제·의례 종목의 대표 장소
    alt: 아시아·유럽·아프리카·아메리카에 있는 축제와 의례의 대표 지명을 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [festival-geography, cultural-diversity]
  - id: s3
    type: chart
    data: /data/02-04/festival-inscribed-years.json
    source: festival-inscribed-years
    caption: 수록한 축제·의례 15종목의 유네스코 등재 연도별 수, 2008–2016년
    alt: 2008년부터 2016년까지 자료에 수록한 15종목의 유네스코 등재 연도별 수를 나타낸 막대그래프다.
    config: { kind: bar }
    concepts: [festival-geography]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [festival-geography, cultural-diversity, cultural-diffusion]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 축제의 기원과 의미를 근거로 분류하기
    instruction: 각 설명에서 확인되는 근거를 읽고 가장 잘 드러나는 기원 유형을 고른다. 한 축제에 여러 기원이 겹칠 수 있다.
    prompt: 자료의 표현을 근거로 분류하고, 한 종목을 다른 범주와도 연결할 수 있는 이유를 덧붙이시오.
    items:
      - { id: seasonal-calendar, text: '망갈 쇼바자트라: 방글라데시의 새해를 기념하는 공개 행렬이다.' }
      - { id: religious-practice, text: '두브로브니크의 성 블라시오 축제: 도시의 수호 성인을 기리는 의례와 행렬을 포함한다.' }
      - { id: historical-memory, text: '엘 칼라오 카니발: 카리브해 프랑스어권 섬의 해방 기념 행사와 연결된 기억을 담는다.' }
      - { id: livelihood, text: '아르군구 국제 낚시·문화 축제: 손낚시와 카누 경주 등 강과 어업에 관련된 활동을 포함한다.' }
    categories:
      - { id: season, label: 계절·달력 }
      - { id: religion, label: 종교적 실천 }
      - { id: memory, label: 역사·공동체 기억 }
      - { id: livelihood, label: 생업·환경 }
sourceIds: [unesco-2008-masterpieces, unesco-argungu, unesco-el-callao, unesco-gangneung-danoje, unesco-intangible-convention, unesco-intangible-list, unesco-mangal-shobhajatra, unesco-saint-blaise]
---
축제와 의례는 사람들이 특정한 시기와 장소에서 함께 이어 가는 문화 표현이다. 계절의 변화와 새해, 종교 의례, 생업, 역사 기억이 그 계기가 된다. 공동체가 전승하는 동안 참여 방식과 표현도 달라질 수 있다.

점 지도는 유네스코 대표목록에 수록된 축제·의례 종목과 대표 지명을 대륙별 색으로 보여 준다. 점 하나는 행사 대표 장소를 가리킨다. 대륙별 색은 자료 제작자가 정한 지도 표시 기준이다. 축제의 기원과 세계적 분포는 여러 지역의 사례와 추가 자료를 함께 비교해 살펴본다.

연도 그래프는 자료에 수록된 축제·의례 15종목의 등재 연도별 수를 보여 준다. 이 가운데 2008년 6종목, 2010년과 2016년에 각각 3종목이 등재됐다. 2008년에는 이전에 걸작으로 선포된 요소가 대표목록에 통합되기도 했다. 등재 연도는 목록에 오른 시점이므로, 유네스코 전체 축제·의례의 흐름은 전체 목록 자료와 비교해 살핀다.

유네스코 설명에서 망갈 쇼바자트라는 방글라데시의 새해 행렬로 소개된다. 두브로브니크의 성 블라시오 축제에는 도시의 수호 성인을 기리는 의례와 행렬이 있다. 엘 칼라오 카니발은 역사적 해방 기념과 공동체 기억을 담고, 아르군구 축제는 강의 어업 활동과 연결된다. 분류 활동에서는 한 종목을 계절·종교·역사·생업의 여러 의미와 연결해 본다.

축제가 널리 알려지면 방문객을 위한 행사나 상품 판매가 늘어날 수 있다. 유네스코는 강릉단오제에서 문화 표준화와 대중매체 보도 속에 일부 전통 요소가 사라진 사례를 기록했다. 관광객 수와 수입, 변화의 배경은 방문 통계와 지역 기록을 함께 살펴 확인한다. 행사의 방향을 누가 결정하고 이익과 부담을 어떻게 나누는지도 따져 본다.
