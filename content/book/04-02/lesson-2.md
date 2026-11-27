---
title: 환경 문제를 왜 쉽게 해결하지 못할까?
goal: 배출 지표와 기후 영향의 공간적 차이를 비교하고 국제 협력의 쟁점을 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: '', source: '', alt: '' }
  - id: s2
    type: map
    data: /data/04-02/co2-per-capita-map-2024.json
    source: u0402-co2-per-capita
    caption: 국가별 1인당 화석연료·산업 CO₂ 배출량, 2024년
    alt: 2024년 국가별 1인당 영토 기준 화석연료·산업 CO₂ 배출량을 색으로 나타낸 지도다.
    config: { kind: choropleth }
    concepts: [environmental-justice, scale]
  - id: s3
    type: chart
    data: /data/04-02/cumulative-co2-top10-1850-2024.json
    source: u0402-cumulative-co2-top10
    caption: 1850–2024년 누적 화석연료·산업 CO₂ 배출 상위 10개국
    alt: 1850년부터 2024년까지 누적한 화석연료·산업 CO₂ 배출량 상위 10개국을 막대로 나타낸 그래프다.
    config: { kind: bar }
    concepts: [environmental-justice, international-cooperation]
  - { id: s4, type: text, caption: '', source: '', alt: '' }
  - { id: s5, type: text, caption: '', source: '', alt: '' }
keyTerms: [environmental-justice, international-cooperation, scale]
activity:
  template: civic-hearing
  fictional: true
  config:
    title: 가상 국제 기후 회의
    instruction: 가상 상황이다. 아래 역할은 실제 국가나 시민 단체를 대표하지 않는다. 본문 자료에서 확인한 수치와 회의 역할을 위해 가정한 필요를 구분한다.
    actors:
      - id: high-emitting-industrial-country
        label: 고배출 산업국 역할
        place: 가상 국제 기후 회의
        role: 산업·에너지 전환과 감축 속도, 지원 방식을 함께 검토하는 역할이다.
        power: 감축 계획과 기술·재정 협력 방안을 제안한다.
      - id: climate-vulnerable-island
        label: 기후 취약 섬나라 역할
        place: 가상 국제 기후 회의
        role: 기후 위험에 대비할 기반 시설과 적응 지원을 의제로 제안한다.
        power: 취약성에 대응할 지원과 참여 방안을 제안한다.
      - id: developing-country
        label: 개발 도상국 역할
        place: 가상 국제 기후 회의
        role: 발전 수요와 감축 노력, 기술·재정 지원을 함께 검토한다.
        power: 실행 여건과 협력 수요를 회의 안건으로 제안한다.
      - id: civil-society
        label: 시민 단체 역할
        place: 가상 국제 기후 회의
        role: 정보 공개와 다양한 지역 주민의 참여, 부담 배분을 살핀다.
        power: 의사결정의 투명성과 당사자 참여 방안을 제안한다.
    levels:
      - id: mitigation
        label: 온실가스 감축
        action: 자료의 범위에 맞는 감축 목표와 이행 점검 방식을 논의한다.
      - id: adaptation
        label: 기후 영향에 대한 적응
        action: 위험과 대응 여건이 다른 지역의 필요를 검토한다.
      - id: support
        label: 기술·재정 협력
        action: 책임과 역량, 지원의 조건을 함께 논의한다.
      - id: participation
        label: 참여와 정보 공개
        action: 영향을 받는 여러 주체가 의견을 내고 진행 상황을 확인할 절차를 제안한다.
sourceIds: [gcp-owid-co2-per-capita, gcp-owid-co2-annual, ipcc-ar6-syr-2023, ipcc-ar6-wgii-2022, unfccc-convention-1992, unfccc-paris-agreement-2015]
---
environmental justice(환경 정의)는 환경 피해와 자원 이용의 이익이 누구에게 돌아가는지, 결정 과정에 누구의 목소리가 반영되는지 살피는 관점이다. 기후 변화는 지구 규모의 문제지만 배출량과 기후 위험, 대응 능력은 지역마다 다르다. 국제적 원인과 지역의 피해가 같은 곳에 나타나지 않을 수 있다.

1인당 CO₂ 배출 지도는 2024년 화석연료와 산업 활동에서 나온 영토 기준 배출량을 인구로 나눈 값이다. 미국은 1인당 14.2t, 대한민국은 11.3t, 중국은 8.7t이다. 이 지표에는 토지 이용 변화와 수입품에 포함된 배출이 들어 있지 않다. 생산지 기준과 소비지 기준 자료를 구분해 살펴본다.

누적 배출 막대그래프는 1850–2024년 화석연료·산업 CO₂ 배출량을 합한 값이다. 미국은 약 434.1Gt, 중국은 약 286.1Gt, 러시아는 약 121.8Gt이다. 각 연도의 국가 귀속은 원자료의 시계열을 따르며 과거 국경에 따라 재배분하지 않았다. 누적 총량과 최근 1인당 배출량은 서로 다른 기준이므로 각각의 의미를 살핀다.

IPCC는 역사적으로 기후 변화에 적게 기여한 취약 공동체가 기후 영향에 더 크게 노출된다고 평가한다. 유엔기후변화협약은 형평성과 공통의 차별화된 책임 및 각자의 역량을 원칙으로 제시한다. 파리협정은 각 당사국이 국가결정기여를 5년마다 알리고, 국제사회가 공동 진전을 점검하도록 한다. 국가별 상황과 이해관계가 달라 감축·적응·지원의 우선순위를 협의하는 과정이 필요하다.

가상 회의에서는 고배출 산업국, 기후 취약 섬나라, 개발 도상국, 시민 단체 역할이 감축과 적응, 지원 방안을 논의한다. 이 역할은 실제 국가나 단체의 입장을 재현하지 않는다. 자료의 실제 배출 수치와 가상 회의의 설정을 구분하며, 어떤 결정이 누구에게 영향을 주는지 근거를 들어 설명한다.
