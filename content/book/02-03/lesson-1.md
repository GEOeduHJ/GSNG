---
title: '세계의 주요 종교는 어떻게 분포할까?'
goal: 국가별 종교 인구 비율과 세계 변화 자료를 비교하고, 종교 분포의 다양성과 자료의 한계를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-03/religion-christian-share-map.json
    source: u0203-religion-christian-share
    caption: 국가별 크리스트교 인구 비율, 2020년
    alt: 2020년 각 국가 인구에서 크리스트교 인구가 차지하는 비율을 단계별 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [religious-tradition]
  - id: s3
    type: map
    data: /data/02-03/religion-muslim-share-map.json
    source: u0203-religion-muslim-share
    caption: 국가별 이슬람교 인구 비율, 2020년
    alt: 2020년 각 국가 인구에서 이슬람교 인구가 차지하는 비율을 단계별 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [religious-tradition]
  - id: s4
    type: chart
    data: /data/02-03/religion-global-share-series.json
    source: u0203-religion-global-share-series
    caption: 세계 종교별 인구 비율 변화, 2010–2020년
    alt: 세계 인구에서 일곱 종교 범주가 차지하는 비율을 2010년과 2020년 값으로 나타낸 선그래프다.
    config: { kind: line }
    concepts: [religious-tradition, cultural-diversity]
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [religious-tradition, cultural-diversity, cultural-diffusion]
activity:
  template: layer-compare
  fictional: false
  config:
    title: 두 종교 분포 지도 비교하기
    instruction: 크리스트교와 이슬람교 지도의 범례와 기준 연도를 확인하고, 여러 국가의 비율을 비교한다.
    prompt: 두 지도에서 확인한 공통점과 차이를 근거로 정리하고, 국가 단위 자료만으로 알 수 없는 점을 덧붙이시오.
    fields:
      - { id: christian, label: 크리스트교 지도에서 확인한 분포 }
      - { id: islam, label: 이슬람교 지도에서 확인한 분포 }
      - { id: compare, label: 두 지도에서 보이는 공통점과 차이 }
      - { id: limit, label: 더 알아보는 데 필요한 지역·개인 자료 }
sourceIds: [pew-global-religious-change-2025, harvard-pluralism-christianity, harvard-pluralism-islam, harvard-pluralism-islam-expansion, harvard-pluralism-buddhism-expansion, harvard-pluralism-hinduism-history]
---
종교별 인구 비율은 나라별 종교 소속 추정치를 비교하는 자료다. 2020년 국가 단위 자료이므로 나라 안의 지역 차이는 지역 통계로 살펴본다. 종교 실천의 빈도와 개인의 신념, 여러 정체성을 함께 지닌 경험은 관련 조사와 당사자의 설명을 통해 알아본다. 이 자료를 바탕으로 한 해석은 집필자의 것이며 Pew Research Center의 견해를 대변하지 않는다. 번역 또한 Pew가 검토하거나 승인한 것이 아니다.

크리스트교 지도에서 미국은 64.0%, 브라질은 80.7%, 인도는 2.2%다. 범례와 여러 나라의 색을 비교하면 같은 종교의 추정 비율이 나라에 따라 달라지는 모습을 읽을 수 있다. 한 나라 안에도 다른 종교와 종교 비소속 인구가 함께 산다. ‘0.1% 미만’은 0%가 아니라 0.1%보다 작은 비율이며 회색 ‘자료 없음’과 구분한다. 지역 공동체의 모습은 지역 자료를 함께 살펴본다.

이슬람교 지도에서 인도네시아는 87.0%, 파키스탄은 96.5%, 알바니아는 74.5%다. 인도에서는 크리스트교 비율이 2.2%, 이슬람교 비율이 15.2%로 나타난다. 여러 사례를 비교하면 한 나라 안에 다양한 종교 공동체가 함께 있음을 알 수 있다. 각 지역 공동체의 분포는 지역 자료로 더 살펴본다.

세계 그래프는 각 종교 범주가 세계 인구에서 차지하는 비율의 변화를 보여 준다. 크리스트교는 2010년 30.6%에서 2020년 28.8%, 이슬람교는 23.9%에서 25.6%로 나타났다. 종교 비소속은 23.3%에서 24.2%, 힌두교는 15.0%에서 14.9%, 불교는 4.9%에서 4.1%로 변했다. 유대교는 두 해 모두 0.2%, 기타 종교는 모두 2.2%다. 이 비율은 세계 인구에서 차지하는 몫이며 변화 원인은 인구·이주 자료와 함께 살펴본다. 범주별 값은 반올림되어 합계가 정확히 100%와 다를 수 있다.

종교의 전파에는 교역과 이주, 정치적 관계, 선교와 공동체의 이동 등 여러 경로가 작용했다. 크리스트교 공동체는 지중해에서 여러 지역으로 이어졌고, 이슬람교는 상인·수피 공동체와 여러 통치 세력의 활동을 통해 각지에 자리 잡았다. 불교는 남아시아에서 스리랑카와 동남아시아, 중앙아시아를 거쳐 동아시아로 전해졌다. 힌두교 전통도 남아시아의 여러 지역 문화와 만나 동남아시아로 전해졌다. 전파 경로와 나라 안의 다양성을 알아볼 때에는 국가별 비율 지도와 함께 역사·지역 자료를 살펴본다.
