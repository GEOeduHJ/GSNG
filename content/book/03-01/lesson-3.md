---
title: 세계의 인구는 왜 이주할까?
goal: 국제 이주의 여러 요인과 출발지·도착지에 미치는 영향을 자료의 범위와 다양한 사람의 관점을 고려해 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/03-01/international-migrant-share-map-2024.json
    source: u0301-international-migrant-share
    caption: 국가별 국제 이주민 비율, 2024년
    alt: 2024년 각 국가 총인구에서 국제 이주민이 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-migration]
  - id: s3
    type: map
    data: /data/03-01/personal-remittances-gdp-map-2024.json
    source: u0301-personal-remittances-gdp
    caption: 국가별 개인 송금 수입의 GDP 대비 비율, 2024년
    alt: 개인 송금 수입이 각 국가 국내총생산에서 차지하는 비율을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [international-migration, migration-impact]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [international-migration, migration-impact]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 도시의 새 주민 정착 지원 협의
    instruction: 가상 상황이다. 이주민·기존 주민·고용주·지방 정부의 경험과 역할이 하나로 같지 않음을 전제로, 자료에서 확인한 사실과 토론을 위해 가정한 내용을 구분한다.
    actors:
      - id: newcomers
        label: 새 주민(이주민)
        place: 가상 도시의 여러 생활 공간
        role: 이주 이유와 언어, 가족 구성, 일과 학업 계획은 사람마다 다르며 한 사람이 집단 전체를 대표하지 않는다고 가정한다.
        power: 본인이 선택한 생활·일·정보 접근 경험을 나누고 참여에 필요한 지원 방안을 제안할 수 있다.
      - id: existing-residents
        label: 기존 주민
        place: 가상 도시의 주거지와 공동 공간
        role: 지역 서비스와 공동 공간에 대한 경험과 의견이 주민마다 다르다고 가정한다.
        power: 함께 이용하는 공간과 소통 방식에 관한 의견을 내고 새 주민과 대안을 함께 만들 수 있다.
      - id: employer
        label: 고용주
        place: 가상 도시의 일터
        role: 여러 배경의 노동자가 함께 일하는 사업장을 운영한다고 가정한다.
        power: 업무·안전·고용 조건을 알기 쉽게 안내하고 직무 경험과 역량을 살릴 방안을 제안할 수 있다.
      - id: local-government
        label: 지방 정부
        place: 가상 도시의 공공 서비스와 협의 공간
        role: 공공 서비스 안내와 주민 참여 절차를 조정하는 역할을 맡는다고 가정한다.
        power: 정보 접근, 의견 수렴, 서비스 연결과 운영 점검 방안을 제안할 수 있다.
    levels:
      - id: information
        label: 정보 접근
        action: 여러 언어와 방식으로 생활·노동·공공 서비스 정보를 안내한다.
      - id: workplace
        label: 일터
        action: 고용 조건과 안전, 직무 역량을 알리고 질문과 의견을 낼 절차를 마련한다.
      - id: public-services
        label: 공공 서비스
        action: 새 주민과 기존 주민이 필요한 서비스에 접근하고 운영의 어려움을 함께 알릴 수 있게 한다.
      - id: participation
        label: 지역 참여
        action: 당사자에게 특정 집단을 대표하라고 요구하지 않고 다양한 주민이 의견을 내는 협의 방식을 설계한다.
sourceIds: [iom-migration-drivers, world-bank-wdr2023-migration, iom-migration-contributions]
---
international migration(국제 이주)은 국경을 넘어 거주지를 옮기는 이동이다. push factor(배출 요인)와 pull factor(흡인 요인)는 각각 떠나게 하거나 도착지로 끌어당기는 조건을 살피는 틀이다. 일자리와 소득, 교육, 가족 관계, 안전, 환경 조건 등이 함께 작용할 수 있으며, 요인이 겹치고 선택의 폭도 사람마다 다르다.

국제 이주민 비율 지도는 2024년 거주 인구 중 국제 이주민이 차지하는 몫을 보여 준다. 아랍에미리트는 74%, 미국은 15.2%, 대한민국은 3.5%다. 이는 현재 거주 인구의 구성 비율이지 한 해 동안 이동한 사람 수나 이주 이유, 개인의 법적 지위를 나타내는 지표가 아니다.

개인 송금 수입의 국내총생산 대비 비율 지도는 송금 수입의 상대적 규모를 국가별로 비교한다. 타지키스탄과 통가처럼 이 비율이 큰 국가도 보인다. 비율이 높다는 사실만으로 어느 가구가 돈을 받는지, 송금이 지역 경제에 어떤 결과를 냈는지 알 수는 없다. 자료가 없는 국가는 송금이 없다는 뜻이 아니다.

이주는 출발 지역에서 가족에게 보내는 송금과 지식·기술의 교류로 이어질 수 있고, 가족 구성원의 부재나 일부 지역의 숙련 인력 감소 같은 과제도 생길 수 있다. 도착 지역에서는 이주민의 역량이 일자리 수요와 만나 노동과 지역 생활에 기여할 수 있다. 서로 다른 언어와 생활 경험이 만나 문화적 다양성이 넓어질 수도 있다. 효과는 이주민의 특성과 고용·권리·지역 조건, 참여 기회에 따라 다르므로 어느 한쪽의 결과로 일반화하지 않는다.

가상 협의에서는 새 주민과 기존 주민, 고용주, 지방 정부가 함께 필요한 지원을 제안한다. 역할은 토론을 위한 설정이며 실제 도시나 이주민의 증언이 아니다. 학생은 두 지도에서 확인한 국가 단위 지표와 가정한 도시 상황을 구분하고, 여러 주민의 선택과 목소리가 반영되는 정보·일터·공공 서비스·참여 절차를 근거와 함께 제시한다.
