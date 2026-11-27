---
title: '세계 주요 종교의 특징은 무엇일까?'
goal: 주요 종교의 핵심 가르침과 대표 경관을 비교하고, 성지와 순례가 지역의 장소에 부여하는 의미를 설명할 수 있다.
opener: 십자가가 선 성당, 미너렛이 솟은 모스크, 갠지스강의 목욕 의례는 각 종교의 가르침과 어떻게 연결될까?
textbookRef: { pages: [92, 97] }
steps:
  - id: d1
    type: map
    data: /data/02-03/religion-sites-points.geojson
    label: 종교와 연결된 대표 도시
    caption: 주요 종교의 성지·중심지와 연결된 대표 도시
    source: u0203-religion-sites-points
    alt: 크리스트교·이슬람교·불교·힌두교와 연결된 대표 도시를 점으로 나타냈다. 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 표시하며 국가 귀속은 나타내지 않는다.
    config: { kind: points, unit: '도시 대표 위치' }
    concepts: [religious-landscape, religious-tradition]
  - id: d2
    type: map
    data: /data/02-03/religion-christian-share-map.json
    label: 크리스트교 인구 비율
    caption: 국가별 크리스트교 인구 비율, 2020년
    source: u0203-religion-christian-share
    alt: 2020년 국가 인구에서 크리스트교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, religious-landscape]
  - id: d3
    type: map
    data: /data/02-03/religion-muslim-share-map.json
    label: 이슬람교 인구 비율
    caption: 국가별 이슬람교 인구 비율, 2020년
    source: u0203-religion-muslim-share
    alt: 2020년 국가 인구에서 이슬람교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, religious-landscape]
  - id: d4
    type: map
    data: /data/02-03/religion-buddhist-share-map.json
    label: 불교 인구 비율
    caption: 국가별 불교 인구 비율, 2020년
    source: u0203-religion-buddhist-share
    alt: 2020년 국가 인구에서 불교 인구가 차지하는 비율을 색으로 나타낸 지도다. 0.1% 미만과 자료 없음은 구분된다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, religious-landscape]
  - id: d5
    type: map
    data: /data/02-03/religion-hindu-share-map.json
    label: 힌두교 인구 비율
    caption: 국가별 힌두교 인구 비율, 2020년
    source: u0203-religion-hindu-share
    alt: 2020년 국가 인구에서 힌두교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, religious-landscape]
summary:
  - 크리스트교는 예수의 삶과 부활, 이슬람교는 유일신·꾸란·무함마드, 불교는 사성제와 팔정도를 핵심 가르침으로 삼는다.
  - 힌두교에는 다르마·카르마·윤회·해탈에 관한 다양한 사상이 있으며, 유대교는 하나님·토라·유대 공동체의 역사와 연결된다.
  - 성당·교회, 모스크, 사찰·탑, 힌두교 사원, 시너고그는 대표적인 종교 경관이다.
  - 예루살렘·메카·메디나·바라나시·부다가야는 서로 다른 종교 전통의 성지 또는 순례지다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 대표 도시와 종교 전통 연결하기
    instruction: 점 지도에서 예루살렘·메카·메디나·바라나시·부다가야를 찾고, 각 종교의 분포 지도와 도시 위치를 비교한다.
    prompt: 각 장소를 종교 전통과 연결하고, 예루살렘·메카·메디나·바라나시·부다가야가 순례 또는 예배 공간으로 지니는 의미를 본문에 근거해 설명하시오.
    items:
      - { id: bethlehem, text: 베들레헴은 크리스트교 전통과 연결된 대표 도시다. }
      - { id: makkah_madinah, text: 메카와 메디나는 이슬람교 전통과 연결된 대표 도시다. }
      - { id: buddhist_sites, text: 룸비니·부다가야·사르나트는 불교 전통과 연결된 대표 도시다. }
      - { id: hindu_sites, text: 바라나시와 마투라는 힌두교의 성지·종교 중심지로 표시된 대표 도시다. }
      - { id: jerusalem, text: 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 표시되며 국가 귀속은 나타나지 않는다. }
    categories:
      - { id: christianity, label: 크리스트교 }
      - { id: islam, label: 이슬람교 }
      - { id: buddhism, label: 불교 }
      - { id: hinduism, label: 힌두교 }
      - { id: shared, label: 공동 성지 }
keyTerms: [religious-tradition, religious-landscape, cultural-diffusion, cultural-diversity]
sourceIds: [pew-global-religious-change-2025, geonames-gazetteer, harvard-pluralism-religion-guidelines, harvard-pluralism-christianity, harvard-pluralism-islam, harvard-pluralism-islamic-practices, harvard-pluralism-salat, harvard-pluralism-mosque-minaret-mihrab, harvard-pluralism-islamic-society-boston-cultural-center, harvard-pluralism-buddhism, harvard-pluralism-buddhism-expansion, harvard-pluralism-hinduism, harvard-pluralism-hindu-textures, harvard-pluralism-judaism-god-torah-israel, harvard-pluralism-synagogue, harvard-pluralism-jerusalem, harvard-pluralism-varanasi, unesco-bodh-gaya]
---
## 핵심 가르침과 종교 경관

크리스트교는 한 하나님과 예수의 삶·가르침·죽음·부활을 신앙의 중심에 둔다. 성당과 교회에는 십자가와 종탑 또는 첨탑이 대표 경관으로 나타난다. 유대교는 하나님과 토라, 유대 공동체의 역사·문화를 중심으로 이어진다. 시너고그는 유대교 예배와 토라 학습, 공동체 모임이 이루어지는 공간이다.

이슬람교는 하나님의 유일성, 꾸란, 무함마드의 예언자성을 믿음의 중심에 둔다. 모스크에는 메카 방향을 가리키는 미흐라브가 있으며, 돔과 미너렛도 대표적인 건축 요소다. 이슬람교의 예배인 살라트는 하루 다섯 차례 메카 방향을 향해 이루어진다.

불교는 사성제와 팔정도를 통해 괴로움의 원인과 벗어나는 길을 설명한다. 사찰과 탑, 불상이 불교 경관을 이룬다. 힌두교에는 다르마·카르마·윤회·해탈에 관한 다양한 사상과 의례가 이어진다. 힌두교 사원은 예배와 의례의 중심이며, 바라나시의 갠지스강에서는 순례자들이 목욕 의례를 행한다.

## 성지와 순례

예루살렘은 유대교·크리스트교·이슬람교의 역사에서 각각 중요한 성지다. 이슬람교에서는 메카가 하지 순례의 중심이며, 메디나는 초기 무슬림 공동체의 역사와 연결된 성지다. 바라나시는 갠지스강과 힌두교 순례 의례로 알려져 있다. 부다가야는 붓다가 깨달음을 얻은 불교 성지다.

성지는 종교 공동체의 역사와 기억이 장소에 쌓인 공간이다. 대표 도시의 위치를 찾아 예루살렘·메카·메디나·바라나시·부다가야와 종교 전통의 연결을 확인하고, 각 종교 비율이 높은 지역과 비교하자. [[d1]] [[d2]] [[d3]] [[d4]] [[d5]]
