---
title: 세계의 대지형은 어떻게 만들어졌을까?
goal: 지진과 화산의 분포를 판의 움직임 및 대지형의 형성과 연결해 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-02/earthquakes-m6-2000-2025.geojson
    source: u0202-usgs-earthquakes-m6
    caption: USGS ComCat 규모 6 이상 지진 발생 위치, 2000–2025년(2026-11-26 수집)
    alt: 2000년부터 2025년까지 규모 6 이상으로 기록된 지진의 발생 위치를 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [landform]
  - id: s3
    type: map
    data: /data/02-02/holocene-volcanoes.geojson
    source: u0202-gvp-holocene-volcanoes
    caption: 세계 홀로세 화산 위치, Smithsonian GVP v5.4.1(2026-11-15)
    alt: Smithsonian GVP 홀로세 화산 목록에 기록된 화산의 위치를 점으로 나타낸 지도다.
    config: { kind: points }
    concepts: [landform]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
keyTerms: [landform]
activity:
  template: evidence-sort
  fictional: false
  config:
    title: 판의 경계 유형과 지형·현상 연결하기
    instruction: 지진·화산 분포 지도와 각 과정의 설명을 함께 읽고, 자료가 뒷받침하는 범위에서 항목을 분류한다.
    prompt: 각 항목을 판의 움직임 유형에 연결하고, 판 경계만으로 설명하기 어려운 항목은 따로 표시하시오.
    items:
      - { id: oceanic-subduction, text: 바다 지각판이 다른 판 아래로 들어가며 지진과 화산 활동이 함께 나타날 수 있다. }
      - { id: continent-collision, text: 두 대륙판이 만나 지각이 밀리고 습곡 산지가 발달한다. }
      - { id: spreading, text: 두 판이 멀어지며 새로운 지각이 만들어진다. }
      - { id: sliding, text: 두 판이 수평으로 스쳐 지나가며 지진이 나타나지만 화산 활동은 흔하지 않다. }
      - { id: hotspot, text: 판 내부에서도 맨틀의 열점과 관련해 화산이 만들어질 수 있다. }
    categories:
      - { id: convergent, label: 수렴 경계 }
      - { id: divergent, label: 발산 경계 }
      - { id: transform, label: 변환 경계 }
      - { id: beyond-boundaries, label: 판 경계 유형만으로 설명하기 어려움 }
sourceIds: [usgs-dynamic-earth, usgs-cratons, usgs-continent-change, nps-landforms]
---
대지형은 지구 내부의 움직임과 지표에서 일어나는 풍화·침식·퇴적 작용이 오랜 시간에 걸쳐 만든 큰 지형이다. 지구의 바깥 부분은 여러 판으로 나뉘어 움직인다. 판은 서로 가까워지거나 멀어지고, 수평으로 스쳐 지나가며 지진·화산 활동과 산맥 형성에 영향을 준다.

USGS 지진 지도에는 규모 6 이상의 지진이 2000년부터 2025년까지 약 3,900건 표시된다. 점이 길게 이어지는 구간과 상대적으로 드문 구간을 살펴볼 수 있다. 이 저장본은 USGS ComCat의 catalog=us를 기준으로 2026년 11월 26일 수집한 자료다. 판 경계선은 표시되지 않으므로 점의 분포를 경계의 정확한 위치나 지진 위험의 크기로 곧바로 읽어서는 안 된다.

화산 지도에는 Smithsonian GVP의 홀로세 화산 위치가 담겨 있다. 지진 지도와 나란히 보며 두 현상의 점들이 함께 모이는 곳과 차이를 찾는다. 이 목록은 홀로세 화산의 위치 자료이지 현재 분화 중인 화산만을 모은 목록은 아니다. 판 경계 밖에서도 화산이 생길 수 있으므로 두 분포가 언제나 겹친다고 볼 수 없다.

판이 서로 가까워지는 곳에서는 한 판이 다른 판 아래로 들어가거나 대륙판끼리 충돌할 수 있다. 이런 과정은 화산대나 습곡 산지를 만드는 한 요인이다. 신기 습곡 산지는 비교적 최근의 조산 운동으로 형성된 산지이고, 고기 습곡 산지는 더 오랜 침식으로 낮고 완만해진 경우가 많다. 대륙 내부의 안정육괴는 오래되고 비교적 안정된 지각의 바탕을 이룬다. 지형의 현재 모습은 만들어진 과정뿐 아니라 이후의 침식과 퇴적도 함께 보아야 한다.
