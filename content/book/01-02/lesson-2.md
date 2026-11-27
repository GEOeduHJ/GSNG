---
title: 지역 분리의 움직임은 왜 일어날까?
goal: 지역 분리 요구의 여러 배경을 살펴보고 스코틀랜드 주민투표의 전국·구역별 결과를 균형 있게 해석할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/01-02/scotland-referendum-council-points.geojson
    source: u0102-scotland-referendum-council-points
    caption: 스코틀랜드 지방 의회 구역별 찬성 비율·투표율, 2014년
    alt: 각 지방 의회 구역의 대표 정착지 위치에 찬성 비율과 투표율을 연결한 점 지도다. 점은 행정구역 경계가 아니다.
    config: { kind: points }
    concepts: [regional-separation, scale]
  - id: s3
    type: chart
    data: /data/01-02/scotland-referendum-national-result.json
    source: u0102-scotland-referendum-national-result
    caption: 스코틀랜드 독립 주민투표 전국 결과, 2014년
    alt: 유효한 찬성·반대 투표 가운데 각 선택의 비율을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [regional-separation, scale]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [regional-separation, region, scale]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 구역별 찬성 비율과 투표율 비교
    instruction: 점의 범례와 대표 위치를 확인한다. 구역별 찬성 비율과 투표율, 전국 막대의 분모를 나누어 읽는다.
    prompt: 두 지도 자료에서 찾은 공간적 차이를 기록하고, 결과만으로 알 수 없는 주민의 선택 이유를 살피는 데 필요한 자료를 제시하시오.
    fields:
      - { id: yes-share, label: 구역별 찬성 비율에서 찾은 특징 }
      - { id: turnout, label: 구역별 투표율에서 찾은 특징 }
      - { id: national, label: 전국 결과와 구역별 결과의 관계 }
      - { id: more, label: 투표 동기와 관점을 이해하는 데 필요한 추가 자료 }
sourceIds: [hcl-scottish-referendum-table33, hcl-scottish-independence-2014, hcl-scotland-currency-2014, scotland-identities-2015]
---
지역 분리 요구는 기존의 정치적 결합이나 권한 배분을 바꾸려는 움직임이다. 역사적 경험과 정체성, 경제적 이해, 정치적 의사결정에 관한 요구가 여러 방식으로 얽힐 수 있다. 한 지역 주민의 경험과 선택은 서로 다를 수 있다.

스코틀랜드 점 지도에서 구역별 색과 점의 위치를 살펴본다. 글래스고 시의 찬성 비율은 53.5%, 투표율은 75.0%다. 애버딘 시는 각각 41.4%, 81.7%다. 점은 각 구역의 대표 정착지에 놓였으며 행정구역의 넓이나 경계를 나타내지 않는다.

전국 막대그래프에서 유효 투표 가운데 찬성은 44.7%, 반대는 55.3%다. 이 비율은 유효한 찬성·반대 투표를 기준으로 한다. 막대의 전국 결과와 구역별 분포를 함께 살피면 공간 규모에 따라 결과가 다르게 보인다.

2014년을 다룬 연구는 국가 정체성과 정치·헌법 태도, 경제 전망에 대한 판단이 주민들의 선택과 연결되었음을 설명한다. 당시 경제 논쟁에는 독립 뒤의 통화 선택과 경제 정책도 포함됐다. 정체성은 겹치고 달라질 수 있으며, 한 지역 주민을 하나의 관점으로 묶지 않는다.

점 지도와 전국 결과는 투표 결과와 참여의 공간적 분포를 보여 준다. 개별 유권자의 동기와 주민의 다양한 관점을 이해할 때에는 당시 쟁점 자료, 설문과 주민의 목소리를 함께 살펴본다. 비교 활동에서는 결과에 대한 해석과 추가로 필요한 근거를 나누어 기록한다.
