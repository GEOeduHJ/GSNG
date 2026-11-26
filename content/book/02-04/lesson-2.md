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
축제와 의례는 사람들이 특정한 시기와 장소에서 함께 실천하는 문화 표현이다. 계절의 변화와 새해, 종교적 의례, 생업, 역사 기억이 계기가 될 수 있다. 한 축제의 의미는 하나로 고정되지 않으며, 공동체가 이어 가는 동안 참여 방식과 표현이 달라질 수 있다.

점 지도에는 유네스코 대표목록에 수록된 축제와 의례의 대표 지명이 담겨 있다. 점은 각 행사가 실제로 열리는 전체 범위나 이동 경로가 아니다. 색 범주는 자료 제작자가 정한 대륙 구분이며, 유네스코의 공식 분류나 축제의 기원 유형을 뜻하지 않는다. 지도에 표시된 수록 사례를 세계의 모든 축제로 일반화할 수 없다.

등재 연도 막대그래프는 수록한 15종목만 집계한다. 이 표본에서는 2008년 6종목, 2010년과 2016년에 각각 3종목이 나타난다. 2008년에는 과거에 걸작으로 선포된 요소들이 대표목록에 통합되기도 했다. 그러므로 등재 연도를 축제의 시작 시점으로 보거나 이 그래프를 유네스코 전체 축제·의례의 연도별 추이로 읽어서는 안 된다.

유네스코 설명에서 망갈 쇼바자트라는 방글라데시의 새해 행렬이고, 두브로브니크의 성 블라시오 축제는 도시의 수호 성인을 기리는 의례와 연결된다. 엘 칼라오 카니발은 역사적 해방 기념과 공동체 기억을 담고, 아르군구 축제는 강에서 이루어지는 어업 활동과 관계된다. 근거 분류 활동에서는 한 종목이 계절·종교·역사·생업의 여러 의미를 함께 가질 수 있음을 살핀다.

축제가 널리 알려지면 방문객을 위한 행사나 상품 판매를 늘리는 방안이 논의될 수 있다. 유네스코 설명은 강릉단오제에서 문화 표준화와 대중매체 보도 속에 일부 전통 요소가 사라졌다고 기록하지만, 관광 수입이나 방문객 수를 측정하지는 않는다. 이 한 사례만으로 모든 축제에서 관광이 전통을 약화한다고 결론 내릴 수 없다. 누가 행사를 결정하고 그 변화의 이익과 부담을 누가 나누는지 따져야 한다.
