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
종교 전통을 배울 때에는 공통으로 설명되는 가르침과 내부의 차이를 함께 살핀다. 크리스트교·이슬람교·불교·힌두교는 서로 다른 지역과 시대의 공동체를 아우르는 이름이다. 각 전통은 역사 속에서 변화하고 주변 문화와 관계를 맺으며 다양한 모습으로 이어졌다.

점 지도에서 베들레헴과 예루살렘은 크리스트교, 메카와 메디나는 이슬람교와 연결된 도시로 표시된다. 크리스트교는 당시 로마 제국의 지배를 받던 팔레스타인 지역에서 시작해 지중해 세계로 이어졌다. 예수의 삶과 가르침, 죽음과 부활은 크리스트교 신앙의 중심 이야기다. 사랑과 정의를 강조하는 가르침도 널리 나타난다. 가톨릭·정교회·개신교 공동체는 예배와 해석에서 서로 다른 모습을 보인다. 이슬람교는 7세기 아라비아반도의 메카와 메디나를 중심으로 형성되었다. 하나님의 유일성(tauhid, 타우히드), 무함마드의 예언자성, 꾸란은 이슬람 신앙의 핵심이다. 수니파는 다섯 기둥을 주요 실천의 틀로 삼으며, 다른 이슬람 전통은 이를 다르게 해석하거나 실천을 더하기도 한다.

점 지도에는 불교와 연결된 룸비니·부다가야·사르나트가 표시되어 있다. 불교는 남아시아에서 시작해 여러 지역의 공동체와 교류하며 다양한 흐름으로 전해졌다. 사성제와 팔정도는 고통과 그 원인, 벗어나는 길을 설명하는 주요 가르침이다. 불교 인구 비율 지도에서 2020년 인도는 0.7%, 네팔은 8.2%, 태국은 94.4%다. 성지의 위치와 오늘날 국가별 인구 비율을 각각 살펴보며 전통의 역사와 현재 분포를 비교한다.

힌두교 전통은 남아시아의 다양한 문화와 사상이 긴 시간에 걸쳐 얽혀 형성된 역사로 설명된다. 그래서 한 명의 창시자를 중심으로 발생을 설명하는 방식과는 다르다. 점 지도는 바라나시와 마투라를 성지·종교 중심지의 대표 도시로 나타낸다. 다르마(의무·질서), 카르마(행위와 결과), 윤회와 해탈은 여러 힌두교 사상에서 중요하게 다뤄진다. 공동체와 개인에 따라 이 개념을 이해하고 실천하는 방식은 다양하다.

religious landscape(종교 경관)는 종교 전통과 공동체가 장소의 이름, 예배·모임 건축물, 의례 공간 등에 남긴 흔적을 가리킨다. 이 지도는 GeoNames의 도시 대표 좌표를 보여 준다. 실제 사원·교회·모스크의 분포는 건물 위치 자료에서 살펴본다. 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 분류되며, 국가 귀속 정보는 이 자료의 범위에 포함되지 않는다. 각 장소의 의미와 공동체 사이의 관계는 점의 분포와 함께 역사·지역 자료를 읽으며 알아본다.
