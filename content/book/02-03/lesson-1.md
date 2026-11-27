---
title: '세계의 주요 종교는 어떻게 분포할까?'
goal: 종교의 의미와 보편 종교·민족 종교를 구분하고, 주요 종교의 발생지·전파 경로와 현재 분포 및 인구 비율 변화를 설명할 수 있다.
opener: 팔레스타인·메카·인도 북부에서 시작한 종교 전통은 어떤 역사 경로를 거쳐 세계 여러 지역에 자리 잡았을까?
textbookRef: { pages: [90, 91] }
steps:
  - id: d1
    type: map
    data: /data/02-03/religion-christian-share-map.json
    label: 크리스트교 인구 비율
    caption: 국가별 크리스트교 인구 비율, 2020년
    source: u0203-religion-christian-share
    alt: 2020년 국가 인구에서 크리스트교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, cultural-diffusion]
  - id: d2
    type: map
    data: /data/02-03/religion-muslim-share-map.json
    label: 이슬람교 인구 비율
    caption: 국가별 이슬람교 인구 비율, 2020년
    source: u0203-religion-muslim-share
    alt: 2020년 국가 인구에서 이슬람교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, cultural-diffusion]
  - id: d3
    type: map
    data: /data/02-03/religion-buddhist-share-map.json
    label: 불교 인구 비율
    caption: 국가별 불교 인구 비율, 2020년
    source: u0203-religion-buddhist-share
    alt: 2020년 국가 인구에서 불교 인구가 차지하는 비율을 색으로 나타낸 지도다. 0.1% 미만과 자료 없음은 구분된다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, cultural-diffusion]
  - id: d4
    type: map
    data: /data/02-03/religion-hindu-share-map.json
    label: 힌두교 인구 비율
    caption: 국가별 힌두교 인구 비율, 2020년
    source: u0203-religion-hindu-share
    alt: 2020년 국가 인구에서 힌두교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, cultural-diffusion]
  - id: d5
    type: chart
    data: /data/02-03/religion-global-share-series.json
    label: 세계 종교별 인구 비율 변화
    caption: 세계 종교별 인구 비율, 2010·2020년
    source: u0203-religion-global-share-series
    alt: 세계 인구에서 일곱 종교 범주가 차지하는 비율을 2010년과 2020년 값으로 나타낸 선 그래프다.
    config: { kind: line, unit: '%' }
    concepts: [religious-tradition, cultural-diversity]
  - id: d6
    type: image
    schematic: true
    data: /images/02-03/religion-diffusion-schematic.svg
    label: 종교 전파 개념도
    caption: 교류와 지역 해석이 종교 전파에 미치는 관계
    source: ''
    alt: 사람의 이동과 교역, 정치적 관계, 공동체의 선택과 해석이 종교 전파와 지역별 경관에 함께 작용하는 개념도다.
    config: {}
    concepts: [cultural-diffusion, religious-tradition]
summary:
  - 종교는 믿음과 의례, 공동체의 역사와 생활 관행이 이어지는 문화 전통이다.
  - 크리스트교·이슬람교·불교는 보편 종교, 힌두교·유대교 등은 민족 종교로 분류하기도 한다.
  - 선교·식민 지배·정복·상인 교역·이주와 후원은 종교의 전파 경로에 작용했다.
  - 오늘날 종교 분포는 지역마다 다르며, 2010년과 2020년 사이 종교 범주별 인구 비율도 서로 다른 방향으로 변했다.
routines:
  opener: { id: see-think-wonder, prompt: "종교 전파 개념도에서 이동 경로와 현재 분포의 연결을 살피고, 더 확인할 점을 적어 보자." }
  inquiry: { id: think-puzzle-explore, prompt: "종교 전파 개념도와 현재 분포 자료를 함께 살펴, 역사적 경로와 지역별 분포의 관계를 탐색해 보자." }
activity:
  template: layer-compare
  fictional: false
  config:
    title: 세계 종교 분포를 비교하기
    instruction: 네 지도에서 종교별 비율이 높은 지역을 비교하고, 그래프에서 2010년과 2020년의 변화를 확인한다. 본문에 나온 발생지와 전파 경로를 연결한다.
    prompt: 네 종교의 분포가 두드러지는 지역을 각각 고르고, 본문에 나온 발생지·전파 경로와 그래프의 변화 방향을 연결해 설명하시오.
    fields:
      - { id: christian, label: 크리스트교 분포에서 확인한 지역 차이 }
      - { id: islam, label: 이슬람교 분포에서 확인한 지역 차이 }
      - { id: buddhism_hinduism, label: 불교·힌두교 분포에서 확인한 지역 차이 }
      - { id: global_change, label: 세계 종교별 인구 비율의 변화 }
      - { id: evidence, label: 전파 경로를 설명하는 역사 사례 }
keyTerms: [religious-tradition, cultural-diffusion, cultural-diversity]
sourceIds: [pew-global-religious-change-2025, harvard-pluralism-religion-guidelines, harvard-pluralism-christianity, harvard-pluralism-islam, harvard-pluralism-islam-expansion, harvard-pluralism-buddhism, harvard-pluralism-buddhism-expansion, harvard-pluralism-hinduism, harvard-pluralism-hindu-textures, harvard-pluralism-hinduism-history, manitoba-world-religions-hindu-origin, harvard-pluralism-judaism-god-torah-israel]
---
## 종교의 의미와 전파 경로

종교는 초월적 존재와 세계·삶에 관한 믿음, 예배와 의례, 공동체의 역사가 이어지는 문화 전통이다. 크리스트교·이슬람교·불교는 여러 민족과 지역으로 퍼진 보편 종교로 분류한다. 힌두교·유대교 등 특정 지역이나 민족의 역사와 긴밀히 이어진 전통은 민족 종교로 분류하기도 한다.

크리스트교는 서아시아 팔레스타인에서 시작해 로마 제국의 도시와 도로망을 따라 퍼졌고, 유럽에서 여러 교회 전통으로 성장했다. 이후 유럽인의 이주와 식민 지배, 선교 활동을 거쳐 아메리카·아프리카·오세아니아로 전해졌다. 이슬람교는 아라비아반도 메카에서 시작했다. 초기 이슬람 공동체의 정복과 통치 영역 확장으로 북부 아프리카와 중앙아시아에 퍼졌고, 상인 교역을 통해 남아시아와 동남아시아에도 자리 잡았다.

불교는 인도 북부에서 시작해 승려와 상인의 이동, 왕조의 후원을 거쳐 동아시아와 동남아시아로 전해졌다. 힌두교는 남아시아의 여러 전통이 얽혀 형성되었으며 오늘날 인도와 네팔을 중심으로 이어진다. 유대교는 유대 민족의 역사와 결부되어 형성되었고, 이주와 디아스포라를 통해 여러 지역에 공동체가 자리 잡았다. 사람의 이동과 교역, 정복과 선교가 지역마다 다른 전파 경로를 만들었다. 주요 종교가 만난 이동·교류의 경로를 개념도에서 확인하자. [[d6]]

## 오늘날의 분포와 세계 인구 비율

오늘날 크리스트교 인구 비율이 높은 지역은 유럽과 아메리카, 사하라 이남 아프리카, 오세아니아에 널리 나타난다. 이슬람교는 북부 아프리카와 서아시아에서 중앙아시아·남아시아·동남아시아까지 이어진다. 불교는 동아시아와 동남아시아에, 힌두교는 인도와 네팔에 중심을 둔다. 네 종교의 비율이 높은 나라와 인접 지역을 찾아 분포의 차이를 비교하자. [[d1]] [[d2]] [[d3]] [[d4]]

세계 인구에서 종교 범주별 비율은 시기에 따라 달라진다. 2010년에서 2020년 사이 크리스트교와 불교의 비율은 낮아졌고, 이슬람교와 종교 비소속의 비율은 높아졌다. 힌두교는 약간 낮아졌으며 유대교와 기타 종교는 같은 값으로 나타났다. Pew(미국의 여론·인구 조사 기관 퓨 리서치 센터)의 두 시점 값은 종교 소속 인구 비율을 추정한 수치다. 그래프에서 두 시점 사이 각 범주의 변화 방향을 찾아 비교하자. [[d5]]
