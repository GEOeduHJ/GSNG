---
title: 세계의 대지형은 어떻게 만들어졌을까?
goal: 판의 움직임과 지형 형성 작용을 연결하고 지진·화산 분포의 공간적 특징을 설명할 수 있다.
opener: 산맥과 해구, 화산대가 지구 곳곳에 길게 이어지는 까닭은 무엇일까? 판의 움직임과 지형 형성을 연결해 생각해 보자.
textbookRef: { pages: [72, 73] }
steps:
  - id: d1
    type: map
    data: /data/02-02/plate-boundary-points.geojson
    label: 세계 판 경계 대표 위치
    caption: USGS 판 경계 선 1,175개에서 약 350km 간격으로 뽑은 경계 유형별 대표점
    source: u0202-usgs-plate-boundaries
    alt: 수렴·발산·변환·기타 경계를 색으로 나누고 각 경계 선을 따라 약 350km 간격으로 대표점을 표시한 지도다.
    config: { kind: points, unit: '개 표본점' }
    concepts: [landform]
  - id: d2
    type: map
    data: /data/02-02/earthquakes-m6-2000-2025.geojson
    label: 규모 6 이상 지진 분포
    caption: USGS ComCat catalog=us, 2000–2025년 규모 6 이상 지진
    source: u0202-usgs-earthquakes-m6
    alt: USGS ComCat catalog=us에 기록된 2000년부터 2025년까지 규모 6 이상 지진의 발생 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '건' }
    concepts: [landform, human-environment-interaction]
  - id: d3
    type: map
    data: /data/02-02/holocene-volcanoes.geojson
    label: 세계 홀로세 화산 분포
    caption: Smithsonian GVP Volcanoes of the World v5.4.1, 2026-11-15 기준
    source: u0202-gvp-holocene-volcanoes
    alt: Smithsonian GVP 홀로세 화산 목록에 기록된 화산 위치를 점으로 나타낸 지도다.
    config: { kind: points, unit: '개 화산' }
    concepts: [landform, human-environment-interaction]
summary:
  - 대지형은 지구 내부의 힘이 지각을 움직이고 오랜 시간 지형을 빚은 결과다.
  - 수렴·발산·변환 경계에서는 판이 움직이는 방식에 따라 산맥·해령·지구대와 지진이 다르게 나타난다.
  - 지진과 화산은 판 경계 부근에 집중되지만 판 내부의 화산 활동도 지형 형성에 참여한다.
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 판의 경계와 지형 형성 연결하기
    instruction: 판 경계 유형별 대표점, 지진 분포, 홀로세 화산 위치를 비교해 각 과정의 특징을 정리한다.
    prompt: 각 현상을 판의 움직임과 연결하고, 분포가 겹치는 곳과 차이가 나타나는 곳을 근거와 함께 설명하시오.
    items:
      - { id: oceanic-subduction, text: 해양판이 다른 판 아래로 들어가는 곳에서는 깊은 해구와 화산대가 발달할 수 있다. }
      - { id: continent-collision, text: 대륙판끼리 만나는 곳에서는 지각이 두꺼워지고 습곡 산지가 형성된다. }
      - { id: spreading, text: 판이 서로 멀어지는 곳에서는 해령이나 지구대가 만들어진다. }
      - { id: sliding, text: 판이 수평으로 스치는 곳에서는 마찰과 이동으로 지진이 자주 발생한다. }
      - { id: hotspot, text: 판 내부의 열점 활동도 화산 지형을 만들 수 있다. }
    categories:
      - { id: convergent, label: 수렴 경계 }
      - { id: divergent, label: 발산 경계 }
      - { id: transform, label: 변환 경계 }
      - { id: intraplate, label: 판 내부 활동 }
keyTerms: [landform]
sourceIds: [usgs-dynamic-earth, usgs-plate-boundaries]
---
## 지형 형성 작용과 대지형

지형은 지각의 높낮이와 모양이며, 지구 내부의 힘과 지표의 물·바람·얼음이 오랜 시간 작용해 만들어진다. 지구 내부의 에너지로 지각을 움직여 지형을 만드는 힘을 내적 작용이라고 한다. 판 구조 운동은 여러 판이 서로 다른 방향으로 움직이는 과정이며, 판의 이동과 충돌·갈라짐·수평 이동은 대규모 융기·침강과 화산 활동을 일으킨다. 이처럼 내적 작용으로 만들어진 큰 지형을 대지형이라고 한다.

지구의 바깥 부분은 여러 판으로 나뉘어 천천히 이동한다. 판이 서로 가까워지면 해양판이 다른 판 아래로 들어가거나 두 대륙판이 부딪치며, 멀어지면 새로운 해양 지각이 만들어진다. 판이 옆으로 스칠 때에는 지각이 갈라지고 어긋난다. 각 움직임의 방향과 형태를 경계 유형 지도에서 찾아보자. [[d1]]

## 판의 경계 유형과 지형 형성

수렴 경계에서는 해양판의 섭입으로 해구와 화산대가 발달하고, 대륙판끼리 충돌하면 히말라야산맥과 같은 습곡 산지가 형성된다. 발산 경계에서는 해저 산맥인 해령이 만들어지며, 대륙 내부가 벌어지면 동아프리카 지구대와 같은 지형이 나타난다. 변환 경계에서는 판이 수평으로 엇갈려 움직이며 지진이 자주 발생한다.

바다 밑에서 일어나는 판의 움직임은 해양 지각을 만들고 대륙의 모양도 바꾼다. 판 경계의 유형별 대표점에서 수렴·발산·변환 경계가 길게 이어지는 지역을 찾고, 지형 형성 과정과 연결해 설명해 보자. [[d1]]

## 지진·화산 분포와 판의 경계

지진은 판이 만나거나 갈라지거나 스치는 경계에서 자주 발생한다. 태평양을 둘러싼 여러 판 경계에서는 지진과 화산 활동이 함께 나타나 불의 고리라고 불린다. 지진과 화산의 분포를 겹쳐 보고 경계를 따라 이어지는 구간을 찾아보자. [[d2]] [[d3]]

화산은 섭입대와 발산 경계뿐 아니라 판 내부의 열점에서도 만들어진다. 이탈리아 에트나산처럼 지중해의 판 경계와 관련된 화산, 하와이 킬라우에아처럼 열점과 연결된 경계 밖 화산은 서로 다른 형성 과정을 보여 준다. 홀로세 화산 목록은 최근 지질시대의 화산 분포를 나타내며 현재 분화 상태를 구분하는 자료와는 목적이 다르다. [[d3]]
