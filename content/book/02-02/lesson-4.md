---
title: 지형의 지속가능한 활용 방안은 무엇일까?
goal: 사가르마타의 관광 자료와 보전 쟁점을 바탕으로 여러 이해관계자의 관점을 고려한 지속가능한 이용 방안을 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/02-02/sagarmatha-point.geojson
    source: u0202-unesco-sagarmatha-point
    caption: 사가르마타 국립공원 UNESCO 대표 위치, 등재 면적 124,400ha, 세계유산 등재 연도 1979년
    alt: 사가르마타 국립공원의 UNESCO 공식 대표 좌표를 점으로 나타낸 지도다. 공원 경계는 표시하지 않는다.
    config: { kind: points }
    concepts: [landform, development-conservation-conflict]
  - id: s3
    type: chart
    data: /data/02-02/sagarmatha-visitors-series.json
    source: u0202-sagarmatha-visitors-series
    caption: 사가르마타 국립공원 회계연도 방문객 수, FY 1975/76–2014/15(연도 표시는 회계연도 시작 연도; 1979/80–1985/86 결측)
    alt: 회계연도 시작 연도별 사가르마타 국립공원 방문객 수를 나타낸 선 그래프다. FY 1979/80–1985/86은 값이 없다.
    config: { kind: line }
    concepts: [development-conservation-conflict, sustainable-use]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
keyTerms: [human-environment-interaction, development-conservation-conflict, sustainable-use]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 사가르마타 국립공원 관리 공청회
    instruction: 가상 상황에서 각 역할의 관점과 권한을 가정해 토론한다. 실제 자료에서 확인한 내용과 가정한 역할을 구분하고, 수치 제한을 제안할 때는 실제 자료의 범위와 한계를 먼저 밝힌다.
    actors:
      - id: residents
        label: 공원 인근 주민
        place: 공원과 주변 마을
        role: 관광과 공원 관리가 생업과 일상에 미치는 영향에 서로 다른 경험과 의견이 있다고 가정한다.
        power: 가상 공청회에서 생활에 미치는 영향과 우선순위를 말하고 관리 대안을 제안한다.
      - id: tourism-business
        label: 관광 사업자
        place: 공원과 주변 마을
        role: 방문객 이동과 숙박·안내 등 관광 서비스를 운영한다고 가정한다.
        power: 가상 공청회에서 서비스 운영과 방문 시기·장소 분산 방안을 제안한다.
      - id: conservation
        label: 보전 기관
        place: 공원과 주변 환경
        role: 경관과 생태계에 미치는 영향을 살피는 역할을 맡는다고 가정한다.
        power: 가상 공청회에서 보전 기준과 관찰·관리 방안을 제안한다.
      - id: visitors
        label: 방문객
        place: 공원 방문 경로
        role: 자연 경관과 안내·이동 조건을 경험하는 방문객으로 가정한다.
        power: 가상 공청회에서 방문 태도와 안내·이용 방식에 관한 의견을 낸다.
    levels:
      - id: local
        label: 지역
        action: 생활 영향과 지역 안의 다양한 의견을 확인하고 참여 절차를 마련한다.
      - id: park
        label: 공원 관리
        action: 방문 흐름·폐기물·생태계 영향을 관찰하고 관리 방안을 검토한다.
      - id: visitors
        label: 방문객
        action: 안내된 경로와 이용 규칙을 따르고 환경에 미치는 영향을 줄인다.
      - id: national
        label: 국가 공공기관
        action: 법·계획과 보전·관광 관리의 조정 방식을 검토한다.
sourceIds: [unesco-sagarmatha, unesco-sagarmatha-decision-2025]
illustration:
  src: /images/02-02/sustainable-tourism.webp
  alt: 산골 방문객들이 정해진 길을 걷고, 다른 사람들이 함께 묘목을 심어 경관을 돌본다.
---
지형을 관광이나 다른 활동에 이용하면 지역의 생계와 경제 활동에 보탬이 되고, 생태계와 주민 생활에 부담을 줄 수도 있다. 지속가능한 이용은 현재의 필요와 보전 가치, 미래의 이용 가능성을 함께 살펴 대안을 조정하는 과정이다.

사가르마타 국립공원의 대표 위치를 지도에서 확인하고, UNESCO 세계유산위원회의 2025년 결정문에서 관리 쟁점을 살펴본다. 결정문은 방문객 규제, 쓰레기 관리, 성수기 수용력 조사와 관광 관리 계획을 다룬 공식 기록이다. 지역의 우선순위는 주민과 사업자 등 당사자의 의견을 함께 들어 파악한다.

방문객 그래프는 과거 회계연도별 인원 변화를 보여 준다. 마지막 관측은 FY 2014/15이며, 중간에 관측이 이어지지 않은 구간도 있다. 수치 목표를 제안할 때에는 이 시계열의 범위를 밝히고 생태계 상태, 폐기물 처리, 계절별 이동, 주민 생활에 관한 최신 자료를 더해 판단한다.

가상 공청회에서는 주민, 관광 사업자, 보전 기관, 방문객의 관점을 나누어 관리 원칙을 제안한다. 역할과 권한은 토론을 위한 설정이며, 실제 사가르마타의 당사자와 제도는 관련 자료로 확인한다. 각 방안의 이익과 부담, 의사결정 참여자를 따져 보고 자료로 확인한 근거와 더 필요한 정보를 함께 제시한다.
