---
title: '종교는 인간 생활에 어떤 영향을 미칠까?'
goal: 종교가 식사·시간 사용·공동체 공간에 미치는 영향을 사례와 자료의 한계에 비추어 설명하고, 서로 다른 배경의 사람들이 함께 참여할 운영 방안을 제안할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: chart
    data: /data/02-03/religion-global-share-series.json
    source: u0203-religion-global-share-series
    caption: 세계 종교별 인구 비율 변화, 2010–2020년
    alt: 세계 인구에서 일곱 종교 범주가 차지하는 비율을 2010년과 2020년 값으로 나타낸 선그래프다.
    config: { kind: line }
    concepts: [religion-and-everyday-life, cultural-diversity]
  - id: s3
    type: map
    data: /data/02-03/religion-sites-points.geojson
    source: u0203-religion-sites-points
    caption: 주요 종교와 연결된 대표 도시 위치
    alt: 크리스트교·이슬람교·불교·힌두교의 발상지 또는 성지와 연결된 대표 도시를 점으로 나타냈다. 예루살렘은 세 종교의 공동 성지로 분류되며 국가 귀속은 표시하지 않는다.
    config: { kind: points }
    concepts: [religious-landscape, religion-and-everyday-life]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [religion-and-everyday-life, religious-landscape, cultural-diversity]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 학교 급식·행사 운영 협의
    instruction: 가상 상황이다. 여러 종교와 비종교적 배경의 학생·보호자, 영양 교사, 학교 운영위원이 급식 선택지와 행사 일정·공간을 함께 논의한다. 개인별 필요가 서로 다를 수 있음을 전제로 하며, 자료에서 확인한 사실과 역할을 위해 가정한 내용을 구분한다.
    actors:
      - id: students
        label: 학생들(여러 종교·비종교 배경)
        place: 학교
        role: 종교 배경과 실천은 학생마다 다를 수 있고, 누구도 집단 전체의 요구를 대신하지 않는다.
        power: 식사와 행사 참여 경험을 선택적으로 나누고, 운영 대안을 제안할 수 있다.
      - id: guardians
        label: 보호자들(여러 종교·비종교 배경)
        place: 가정과 학교
        role: 학생의 식사 선택과 행사 참여에 관한 다양한 의견을 낼 수 있다.
        power: 자녀와 상의해 참여 방식과 필요한 정보에 의견을 낼 수 있다.
      - id: nutrition-teacher
        label: 영양 교사
        place: 학교 급식실
        role: 식단의 재료와 영양, 조리 과정과 제공 가능성을 검토한다.
        power: 재료 정보를 알리고 실현 가능한 선택지를 설계할 수 있다.
      - id: school-committee
        label: 학교 운영위원
        place: 학교 운영 회의
        role: 행사 일정, 공간 운영, 예산과 의견 수렴 절차를 검토한다.
        power: 학교 운영 원칙과 협의 절차를 제안하고 결정할 수 있다.
    levels:
      - id: participation
        label: 참여 방식
        action: 학생이 종교나 식습관을 공개하지 않고도 선택지를 확인하고 의견을 낼 수 있게 한다.
      - id: meal
        label: 급식 운영
        action: 메뉴와 주요 재료 정보를 알리고, 가능한 대안과 선택 절차를 마련한다.
      - id: schedule-space
        label: 일정과 공간
        action: 행사 일정과 공동 공간 사용을 미리 알리고, 의견을 반영하는 협의 과정을 둔다.
      - id: review
        label: 운영 점검
        action: 행사 뒤에 참여 경험과 운영의 어려움을 확인해 다음 계획에 반영한다.
sourceIds: [pew-global-religious-change-2025, geonames-gazetteer, harvard-pluralism-religion-guidelines, harvard-pluralism-islamic-practices, harvard-pluralism-halal-food, harvard-pluralism-ramadan, harvard-pluralism-changing-religious-landscape]
---
종교와 일상생활의 관계는 사람마다 다르게 나타난다. 같은 전통 안에서도 신앙 실천과 중요하게 여기는 관습은 다양하다. 가족·지역·세대·개인의 선택도 생활에 영향을 준다. 종교 배경은 당사자의 설명과 생활 맥락을 함께 살펴 이해한다.

세계 종교 그래프는 종교 비소속을 포함한 여러 범주의 인구 비율이 시간에 따라 달라졌음을 보여 준다. 크리스트교 비율은 2010년 30.6%에서 2020년 28.8%로, 이슬람교는 23.9%에서 25.6%로 나타났다. 식단·행사 참여·신앙 실천의 모습은 관련 조사와 당사자의 목소리로 살펴보고, 인구 비율 변화의 배경은 인구·이주 자료와 함께 알아본다.

점 지도는 종교와 연결된 도시 위치를 보여 주며, 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 분류된다. 여러 전통이 같은 장소에 종교적 의미를 두는 모습은 종교 경관의 겹침을 보여 준다. 그곳의 일상적 공존과 장소 이용, 접근·관리 방식은 지역 주민과 방문자의 경험 및 관리 자료를 함께 살펴 이해한다.

식사와 시간 사용에는 종교적 관습이 관계할 수 있다. 일부 무슬림은 할랄(허용된 음식) 기준을 고려하고 라마단 기간에 금식하기도 한다. 라마단 날짜는 이슬람 음력에 따라 해마다 양력에서 달라진다. 공동체와 개인마다 실천 방식과 예외가 다르므로, 학교는 메뉴와 주요 재료, 행사 일정을 미리 알리고 선택 가능한 방식을 마련할 수 있다.

여러 배경의 사람이 함께 참여하려면 대화로 선택지를 넓히고 급식·행사 운영 조건을 살펴야 한다. 한 가지 식사 방식이나 일정만 두면 일부 학생의 참여가 어려워질 수 있다. 정보 제공, 예산, 일정과 공간, 의견을 듣는 절차를 함께 조정해 보자. 이어지는 협의는 실제 학교를 묘사하지 않는 가상 상황이다. 역할 속 학생은 특정 종교 집단을 대표하지 않으며, 모두가 참여할 조건을 설계하는 데 목적이 있다.
