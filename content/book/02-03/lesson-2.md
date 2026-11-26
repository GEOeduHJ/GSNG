---
title: '세계 주요 종교의 특징은 무엇일까?'
goal: 크리스트교·이슬람교·불교·힌두교의 발생 지역과 주요 가르침을 살펴보고, 대표 도시 자료가 보여 주는 종교 경관의 범위를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-03/religion-sites-points.geojson
    source: u0203-religion-sites-points
    caption: 주요 종교와 연결된 대표 도시 위치
    alt: 크리스트교·이슬람교·불교·힌두교의 발상지 또는 성지와 연결된 대표 도시를 점으로 나타냈다. 예루살렘은 세 종교의 공동 성지로 분류되며 국가 귀속은 표시하지 않는다.
    config: { kind: points }
    concepts: [religious-tradition, religious-landscape, cultural-diffusion]
  - id: s3
    type: map
    data: /data/02-03/religion-buddhist-share-map.json
    source: u0203-religion-buddhist-share
    caption: 국가별 불교 인구 비율, 2020년
    alt: 2020년 각 국가 인구에서 불교 인구가 차지하는 비율을 단계별 색으로 나타낸 지도다. 0.1% 미만과 자료 없음은 구분된다.
    config: { kind: choropleth }
    concepts: [religious-tradition, religious-landscape, spatial-data]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [religious-tradition, religious-landscape, cultural-diversity]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 대표 도시 자료를 종교 전통과 연결하기
    instruction: 지도에 적힌 도시와 범주를 확인하고, 자료가 보여 주는 사실과 자료만으로 알 수 없는 점을 구분한다.
    prompt: 각 서술을 알맞은 종교 전통 또는 공동 성지 범주에 연결하고, 점 자료가 실제 예배 장소나 주민의 신앙을 보여 주지 않는 까닭을 설명하시오.
    items:
      - { id: bethlehem, text: 베들레헴은 크리스트교 범주에 든 대표 도시다. }
      - { id: makkah-medina, text: 메카와 메디나는 이슬람교 범주에 든 대표 도시다. }
      - { id: buddhist-cities, text: 룸비니·부다가야·사르나트는 불교 범주에 든 대표 도시다. }
      - { id: hindu-cities, text: 바라나시와 마투라는 힌두교 성지·종교 중심지의 대표 도시다. }
      - { id: jerusalem, text: 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 기록되며 국가 귀속은 표시하지 않았다. }
    categories:
      - { id: christianity, label: 크리스트교 }
      - { id: islam, label: 이슬람교 }
      - { id: buddhism, label: 불교 }
      - { id: hinduism, label: 힌두교 }
      - { id: shared, label: 공동 성지 }
sourceIds: [geonames-gazetteer, pew-global-religious-change-2025, harvard-pluralism-religion-guidelines, harvard-pluralism-christianity, harvard-pluralism-islam, harvard-pluralism-buddhism, harvard-pluralism-hinduism, harvard-pluralism-hindu-textures, manitoba-world-religions-hindu-origin]
---
종교 전통을 공부할 때에는 공통으로 설명되는 가르침과 내부의 차이를 함께 살핀다. 크리스트교·이슬람교·불교·힌두교라는 이름은 서로 다른 지역과 시대의 공동체를 넓게 묶는다. 각 전통은 내부적으로 다양하고, 역사 속에서 변화하며, 주변 문화와 관계를 맺어 왔다.

점 지도에서 베들레헴과 예루살렘은 크리스트교와 연결된 도시로, 메카와 메디나는 이슬람교와 연결된 도시로 표시된다. 크리스트교의 역사적 중심은 당시 로마 제국의 지배를 받던 팔레스타인 지역과 지중해 세계에 있다. 크리스트교인에게 예수의 삶과 가르침, 죽음과 부활은 신앙의 중심 이야기이며, 사랑과 정의의 가르침을 강조하는 전통도 널리 나타난다. 가톨릭·정교회·개신교를 비롯한 여러 공동체의 예배와 해석은 서로 같지 않다. 이슬람교는 7세기 아라비아반도의 메카와 메디나를 중심으로 형성되었다. 하나님의 유일성(tauhid, 타우히드), 무함마드의 예언자성, 꾸란은 이슬람 신앙의 핵심이며, 다섯 기둥은 수니파에서 주요 실천의 틀로 설명된다. 다른 이슬람 전통은 이를 더하거나 다르게 해석할 수 있다.

점 지도에는 불교와 연결된 룸비니·부다가야·사르나트가 표시되어 있다. 불교는 남아시아에서 시작해 여러 지역의 공동체와 교류하며 다양한 흐름으로 전해졌다. 사성제와 팔정도는 고통과 그 원인, 벗어나는 길을 설명하는 주요 가르침으로 다뤄진다. 불교 인구 비율 지도에서는 2020년 인도 0.7%, 네팔 8.2%, 태국 94.4%로 나타난다. 출발지와 성지의 위치만으로 오늘날 국가별 인구 구성을 예측할 수 없다.

힌두교 전통은 단일한 창시자나 하나의 시작점으로 설명하기 어렵다. 이는 한 명의 창시자를 중심으로 한 종교의 발생 서술과 달리, 남아시아의 다양한 문화와 사상이 긴 시간에 걸쳐 얽혀 형성된 역사를 고려한 설명이다. 점 지도는 바라나시와 마투라를 성지·종교 중심지의 대표 도시로 나타낸다. 다르마(의무·질서), 카르마(행위와 결과), 윤회와 해탈은 여러 힌두교 사상에서 중요하지만, 모든 힌두교인이 이를 똑같이 이해하거나 실천하는 것은 아니다.

religious landscape(종교 경관)는 종교 전통과 공동체가 장소의 이름, 예배와 모임을 위한 건축물, 의례 공간 등에 남긴 흔적을 가리킨다. 그러나 이 지도는 GeoNames의 도시 대표 좌표를 표시하며 사원·교회·모스크 같은 실제 건물의 위치를 찍은 것이 아니다. 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 분류되어 있지만, 국가 귀속 정보는 없다. 점의 겹침과 분포만으로 각 장소의 의미나 공동체 사이의 관계를 모두 설명할 수는 없다.
