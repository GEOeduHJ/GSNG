---
title: '종교는 인간 생활에 어떤 영향을 미칠까?'
goal: 종교 관습이 식사·의복·시간·축제와 지역 경관에 나타나는 사례를 설명하고, 학교와 지역에서 종교가 다른 사람들의 참여를 돕는 방안을 제안할 수 있다.
opener: 학교의 식사와 행사, 공동 공간을 계획할 때 서로 다른 생활 방식과 일정은 어떻게 함께 고려할 수 있을까?
textbookRef: { pages: [98, 102] }
steps:
  - id: d1
    type: chart
    data: /data/02-03/religion-global-share-series.json
    label: 세계 종교별 인구 비율
    caption: 세계 종교별 인구 비율, 2010·2020년
    source: u0203-religion-global-share-series
    alt: 세계 인구에서 일곱 종교 범주가 차지하는 비율을 2010년과 2020년 값으로 나타낸 선 그래프다.
    config: { kind: line, unit: '%' }
    concepts: [religious-tradition, cultural-diversity, religion-and-everyday-life]
  - id: d2
    type: map
    data: /data/02-03/religion-muslim-share-map.json
    label: 국가별 이슬람교 인구 비율
    caption: 국가별 이슬람교 인구 비율, 2020년
    source: u0203-religion-muslim-share
    alt: 2020년 국가 인구에서 이슬람교 인구가 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth, unit: '%' }
    concepts: [religious-tradition, cultural-diversity]
  - id: d3
    type: map
    data: /data/02-03/religion-sites-points.geojson
    label: 종교와 연결된 대표 도시
    caption: 주요 종교의 성지·중심지와 연결된 대표 도시
    source: u0203-religion-sites-points
    alt: 크리스트교·이슬람교·불교·힌두교와 연결된 대표 도시를 점으로 나타냈다. 예루살렘은 크리스트교·이슬람교·유대교의 공동 성지로 표시하며 국가 귀속은 나타내지 않는다.
    config: { kind: points, unit: '도시 대표 위치' }
    concepts: [religious-landscape, religion-and-everyday-life]
  - id: d4
    type: image
    schematic: true
    data: /images/02-03/religion-everyday-life-schematic.svg
    label: 종교와 일상생활 개념도
    caption: 종교 전통·지역·개인의 해석과 생활 영역의 관계
    source: ''
    alt: 종교 전통과 지역, 개인의 해석이 식사·시간과 의례·공동체 관계·공간과 경관에 서로 영향을 주며 실천은 사람마다 다를 수 있음을 나타낸 개념도다.
    config: {}
    concepts: [religion-and-everyday-life, cultural-diversity]
summary:
  - 많은 무슬림은 할랄 기준과 돼지고기·술 금기를 고려하며, 많은 힌두교도는 소고기를 피하고 일부 불교 공동체는 채식 전통을 잇는다.
  - 라마단 금식과 금요 예배, 유대교의 샤밧은 일상 시간의 사용과 공동체 생활에 연결된다.
  - 성탄절·이드 알피트르·디왈리·베삭·유월절 등 종교 축제와 의례는 공동체의 믿음과 역사를 기념한다.
  - 성지와 예배 공간은 순례·관광과 이어지며, 학교와 지역은 식사·일정·공간 정보를 제공하고 참여 선택지를 마련할 수 있다.
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 학교 급식과 행사를 함께 계획하기
    instruction: 가상 상황이다. 학생 개인은 종교나 식습관을 공개할 필요가 없고, 어느 학생도 한 종교 집단 전체를 대표하지 않는다.
    actors:
      - id: students
        label: 학생들
        place: 학교
        role: 식사와 행사 참여에 관한 경험이나 필요를 선택적으로 나누며 서로 다른 의견을 낼 수 있다.
        power: 익명 의견과 선택 가능한 방식으로 운영 대안을 제안한다.
      - id: food-coordinator
        label: 급식 담당자
        place: 학교 급식실
        role: 재료와 조리 과정, 영양, 제공 여건을 살핀다.
        power: 재료 정보를 알리고 실행 가능한 식사 선택지를 설계한다.
      - id: teacher
        label: 교사
        place: 교실과 행사 공간
        role: 행사 일정과 공간 사용, 참여 접근성을 검토한다.
        power: 일정과 공간 정보를 미리 알리고 의견을 모을 절차를 마련한다.
      - id: school-committee
        label: 학교 운영 협의자
        place: 학교 운영 회의
        role: 예산과 운영 원칙, 의견 반영 방식을 함께 검토한다.
        power: 제안의 실행 가능성을 살피고 점검 일정을 정한다.
    levels:
      - id: information
        label: 정보 제공
        action: 식재료와 일정, 공간 이용 정보를 미리 확인할 수 있게 한다.
      - id: options
        label: 선택지 마련
        action: 가능한 식사 선택과 행사 참여 방법을 함께 검토한다.
      - id: participation
        label: 의견 수렴
        action: 종교나 개인 정보를 공개하지 않고도 의견을 낼 수 있는 통로를 둔다.
      - id: review
        label: 운영 점검
        action: 참여 경험과 운영의 어려움을 확인해 다음 계획에 반영한다.
keyTerms: [religion-and-everyday-life, religious-landscape, cultural-diversity]
sourceIds: [pew-global-religious-change-2025, geonames-gazetteer, harvard-pluralism-religion-guidelines, harvard-pluralism-islamic-practices, harvard-pluralism-salat, harvard-pluralism-halal-food, harvard-pluralism-ramadan, harvard-pluralism-hijab, harvard-pluralism-shabbat, harvard-pluralism-buddhist-vegetarianism, queensland-health-hindu-dietary-practices, harvard-pluralism-advent-christmas, harvard-pluralism-divali, harvard-pluralism-buddha-birthday, harvard-pluralism-passover, harvard-pluralism-changing-religious-landscape, harvard-pluralism-jerusalem, harvard-pluralism-varanasi, unesco-religious-sacred-heritage, unesco-sustainable-tourism]
---
## 종교와 생활 관습

종교 전통은 서로 다른 지역의 일상과 공동체 일정에 배경으로 자리한다. 2010년과 2020년의 세계 종교 비율을 비교하고, 이슬람교 비율이 높은 인도네시아와 파키스탄의 위치를 찾아 분포의 지역 차이를 확인하자. [[d1]] [[d2]]

음식 선택에는 종교적 기준과 지역 음식문화가 함께 반영된다. 많은 무슬림은 할랄 기준에 맞는 음식을 고르고 돼지고기와 술을 피한다. 많은 힌두교도는 소를 존중하는 전통과 연결해 소고기를 피한다. 불교의 일부 공동체는 자비와 불살생을 실천하는 방식으로 채식 전통을 이어 간다.

옷차림은 신앙과 정체성을 나타내기도 한다. 일부 무슬림 여성은 히잡을 착용한다. 종교 실천은 공동체와 개인에 따라 다르게 나타난다.

종교 의례는 하루와 한 해의 시간을 구성한다. 많은 무슬림은 라마단 기간 낮 시간에 금식하고, 금요일에는 정오 무렵 공동 예배를 드린다. 유대교의 샤밧(안식일)은 금요일 해 질 무렵부터 토요일 해 질 무렵까지 이어지며, 휴식·예배·가족 식사의 시간으로 지킨다.

종교 축제는 믿음과 공동체의 역사를 기념한다. 크리스트교의 성탄절, 이슬람교의 이드 알피트르, 힌두교의 디왈리, 불교의 베삭, 유대교의 유월절은 절기와 의례의 사례다.

## 종교 경관과 함께 살아가기

성당과 교회, 모스크, 사찰, 힌두교 사원, 시너고그와 순례길은 종교 경관과 문화유산을 이룬다. 성지에는 순례자와 관광객이 함께 찾기도 한다. 방문은 교통·숙박·상업 등 지역 활동과 연결되며, 관광 계획에는 종교 의례와 주민 생활, 문화유산 보전이 함께 고려된다. 예루살렘·메카·메디나·바라나시·부다가야의 위치와 종교 전통의 연결을 찾아보자. [[d3]]

학교와 지역 시설은 사전 안내와 선택지를 마련해 종교 배경이 다른 사람들의 참여를 도울 수 있다. 급식 재료와 조리 정보를 알리고 할랄·채식 등 식사 선택지를 둔다. 행사 일정을 미리 공유해 라마단과 샤밧, 종교 축제와 겹치는지 살핀다. 필요한 공간과 참여 방법은 당사자와 협의하고, 종교를 공개하지 않아도 의견을 낼 통로를 둔다. 식사·시간·공간·의견 수렴 가운데 실행할 배려를 개념도에 연결해 제안하자. [[d4]]
