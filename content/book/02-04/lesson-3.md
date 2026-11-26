---
title: '문화의 다양성을 보존하기 위해서는 어떻게 해야 할까?'
goal: 무형유산 제도와 식생활 사례를 살펴보고 공동체의 참여를 고려한 문화 다양성 보존 방안을 평가할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-04/mediterranean-diet-countries-map.json
    source: mediterranean-diet-countries-map
    caption: 유네스코 지중해 식생활 공동 등재에 참여한 국가, 2013년
    alt: 2013년 지중해 식생활 공동 등재에 참여한 국가를 색으로 표시한 지도다.
    config: { kind: choropleth }
    concepts: [food-culture, cultural-diversity]
  - id: s3
    type: map
    data: /data/02-04/festival-rituals-points.geojson
    source: festival-rituals-points
    caption: 유네스코 대표목록에 수록된 축제·의례 종목의 대표 장소
    alt: 여러 대륙에 있는 축제와 의례의 대표 지명을 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [festival-geography, cultural-diversity]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [cultural-diversity, food-culture, festival-geography]
activity:
  template: decision-matrix
  fictional: false
  config:
    title: 문화 다양성 보존 방안 평가
    instruction: 유네스코의 무형유산 보존 원칙과 자료의 범위를 확인하고, 방안별 이익과 부담을 기준에 따라 비교한다.
    prompt: 전승의 지속성, 공동체의 결정권, 지역의 이익과 부담, 획일화 위험을 기준으로 방안을 평가하고 공동체 참여를 포함한 실행안을 제안하시오.
    options:
      - { id: documentation, label: 공동체 동의를 바탕으로 실천·구술·장소 기록 }
      - { id: education, label: 전승자가 학교와 지역사회에서 기술과 지식을 가르침 }
      - { id: tourism, label: 공동체가 규칙과 수익 배분을 정하는 관광 활용 }
      - { id: community-led, label: 실천 공동체가 보존과 변화의 방향을 주도 }
    criteria:
      - { id: transmission, label: 세대 간 전승을 이어 가는 데 보탬이 되는가 }
      - { id: agency, label: 실천 공동체의 결정권과 동의를 보장하는가 }
      - { id: livelihood, label: 지역에 돌아가는 이익과 부담을 고려하는가 }
      - { id: standardization, label: 한 가지 모습만 요구할 위험이 있는가 }
sourceIds: [unesco-intangible-convention, unesco-intangible-list, unesco-mediterranean-diet]
---
유네스코의 intangible cultural heritage(무형문화유산) 협약은 공동체가 문화유산으로 인정하고 세대에 전하며 다시 만들어 가는 실천과 지식, 표현을 다룬다. 협약의 보존은 기록과 연구, 교육을 통한 전승, 공동체의 참여 등을 포함한다. 목록 등재는 문화유산을 알리는 방식 가운데 하나이지, 문화 실천이 자동으로 유지된다는 보증은 아니다.

지중해 식생활 지도에서 공동 등재국의 위치를 확인한다. 국가 목록에는 키프로스·크로아티아·스페인·그리스·이탈리아·모로코·포르투갈 7개국이 제시되며, 유네스코 등재 연도는 2013년이다. 유네스코는 이 사례를 특정 음식 목록만이 아니라 재배·수확·조리·나눔과 관련된 지식과 실천으로 설명한다. 등재국의 모든 주민이 같은 식사를 한다는 뜻은 아니다.

앞 절의 축제 점 자료와 지중해 식생활 지도는 서로 다른 정보를 담는다. 지중해 지도는 공동 등재에 참여한 국가를 표시하고, 점 지도는 선택한 축제·의례 종목의 대표 장소를 나타낸다. 두 자료 모두 문화 실천에 참여하는 사람의 수, 지역 안의 차이, 공동체가 보존에 동의하는 범위를 측정하지 않는다. 등재 사실을 실제 전승의 분포나 보존 성과와 같다고 볼 수 없다.

보존 방안에는 기록, 전승 교육, 관광 활용, 공동체 주도의 의사결정이 있다. 기록은 기술과 기억을 남기고, 교육은 다음 세대가 직접 배울 기회를 만들 수 있다. 관광은 지역의 자원과 관심을 늘릴 수도 있지만, 외부 관객의 기대에 맞춰 하나의 모습만 보여 주게 될 위험도 검토해야 한다. 유네스코 협약은 실천을 이어 가는 공동체가 보존 활동에 참여하도록 강조한다.

문화 다양성을 보존한다는 것은 과거의 모습을 그대로 고정하는 일이 아니다. 공동체가 전승할 내용과 바꿀 내용을 결정할 수 있는지, 기록과 관광에서 생기는 이익과 부담이 어떻게 나뉘는지 살펴야 한다. 의사결정 표에서는 방안을 하나만 고르기보다 기록과 교육, 공동체 주도의 규칙을 어떻게 연결할지 근거를 들어 제안한다.
