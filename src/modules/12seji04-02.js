export default {
  "code": "12세지04-02",
  "moduleId": "04-02",
  "group": "4부 · 지속가능한 세계",
  "title": "세계의 주요 환경 문제",
  "time": "45분",
  "standardText": "세계 주요 환경 문제의 유형과 실태를 설명하고, 생태전환적 삶에 비추어 현재의 생활방식을 비판적으로 점검한다.",
  "goal": "세계 주요 환경 문제의 유형과 실태를 자료로 설명하고 생태전환적 삶에 비추어 생활방식을 비판적으로 점검합니다.",
  "concept": "환경 변화는 공간적으로 고르게 나타나지 않고 사람과 생태계에 다른 영향을 줍니다. 시점이 다른 위성영상과 환경 통계를 비교하면 변화의 위치와 범위를 관찰할 수 있지만 관찰만으로 원인을 단정할 수는 없습니다. 생활방식의 변화도 자료와 성찰을 바탕으로 살펴야 합니다.",
  "concepts": [
    "환경 문제의 유형",
    "환경 변화와 영향",
    "생태전환적 삶"
  ],
  "activity": "환경 문제의 유형·실태를 자료로 살펴보고 생활 속 선택을 생태전환의 관점에서 점검해 실천을 구체화하세요.",
  "artifact": "환경 문제 설명과 생활방식 성찰·실천 기록",
  "rubric": [
    "환경 문제의 유형과 실태를 자료로 설명함",
    "관찰된 변화와 원인 추론을 구분함",
    "생활방식의 영향을 성찰하고 실천안을 제시함"
  ],
  "sourceNote": "이 시제품에는 위성영상이나 Dynamic World 결과가 포함되지 않았습니다. 실제 자료의 권리·출처·분류 오차를 검토한 뒤 정적 레이어로 연결합니다.",
  "digitalTools": [
    "MapLibre GL JS · 시점별 레이어",
    "Apache ECharts · 환경 시계열",
    "모바일용 이미지 비교"
  ],
  "ai": {
    "status": "optional-not-connected",
    "product": "Dynamic World V1",
    "mode": "사전 산출된 토지피복 분류를 정적 자료로 제공",
    "runtimeCallsPerLearner": 0,
    "requiresTeacherReview": true,
    "dataAsset": null
  },
  "visualization": {
    "type": "environment",
    "title": "환경 변화와 생활방식 살펴보기",
    "hint": "시점 자료의 차이를 관찰하고, 생활 장면의 변화 가능성을 점검하세요.",
    "mapPattern": "environment-change",
    "chart": {
      "labels": [
        "시점 A",
        "시점 B",
        "시점 C",
        "시점 D"
      ],
      "values": [
        28,
        34,
        45,
        52
      ]
    },
    "lifestyle": [
      [
        "이동",
        "이동 수단과 이동 거리를 어떻게 선택하나요?"
      ],
      [
        "에너지",
        "에너지 사용을 줄이거나 전환할 선택은 무엇인가요?"
      ],
      [
        "식생활",
        "식품의 생산·이동·소비를 어떻게 살펴볼까요?"
      ],
      [
        "소비",
        "구매·사용·폐기 과정에서 바꿀 수 있는 점은 무엇인가요?"
      ]
    ]
  },
  "sectionIds": [
    "lesson-04-02-01",
    "lesson-04-02-02",
    "lesson-04-02-03"
  ],
  "qft": {
    "focusTitle": "시간에 따라 바뀌는 환경의 모습",
    "focusText": "한 지역의 토지피복과 환경 요인을 두 시점으로 비교한 모식 그림.",
    "focusVisual": "lesson-04-02-01",
    "teacherPrompt": "서로의 말을 평가하지 않고, 초점 자료에서 떠오르는 질문을 모두 적도록 안내합니다.",
    "phases": [
      {
        "id": "generate",
        "title": "질문 생성",
        "minutes": 7,
        "instructions": "판단하거나 답을 찾지 않고 떠오르는 질문을 계속 기록합니다."
      },
      {
        "id": "improve",
        "title": "분류·변환",
        "minutes": 6,
        "instructions": "질문을 열린 질문과 닫힌 질문으로 나누고, 가능한 경우 서로 다른 유형으로 바꾸어 봅니다."
      },
      {
        "id": "prioritize",
        "title": "우선화",
        "minutes": 4,
        "instructions": "성취기준과 자료를 생각해 탐구할 질문을 고르고 선택 이유를 적습니다."
      },
      {
        "id": "plan",
        "title": "탐구 계획",
        "minutes": 4,
        "instructions": "관련 학습 절과 자료의 출처·시점·공간 범위를 확인합니다."
      },
      {
        "id": "investigate",
        "title": "자료 탐구",
        "minutes": 12,
        "instructions": "지도·그래프·사례에서 관찰한 증거를 질문과 연결해 기록합니다."
      },
      {
        "id": "explain",
        "title": "설명 구성",
        "minutes": 8,
        "instructions": "주장, 근거, 근거가 주장을 뒷받침하는 이유를 구분해 작성합니다."
      },
      {
        "id": "reflect",
        "title": "성찰",
        "minutes": 2,
        "instructions": "질문을 만든 과정과 자료의 한계, 다음에 확인할 점을 돌아봅니다."
      }
    ]
  },
  "teacherGuide": {
    "duration": "45분",
    "materials": [
      "초점 자료와 학습 절 본문",
      "질문·자료 기록 화면"
    ],
    "sequence": [
      {
        "stage": "초점 자료 보기",
        "minutes": 2,
        "support": "학습 절의 질문형 제목과 예시 질문을 보여주지 않고 비질문형 자료를 관찰합니다."
      },
      {
        "stage": "질문 생성",
        "minutes": 7,
        "support": "판단하거나 답을 찾지 않고 떠오르는 질문을 계속 기록합니다."
      },
      {
        "stage": "분류·변환",
        "minutes": 6,
        "support": "질문을 열린 질문과 닫힌 질문으로 나누고, 가능한 경우 서로 다른 유형으로 바꾸어 봅니다."
      },
      {
        "stage": "우선화",
        "minutes": 4,
        "support": "성취기준과 자료를 생각해 탐구할 질문을 고르고 선택 이유를 적습니다."
      },
      {
        "stage": "탐구 계획",
        "minutes": 4,
        "support": "관련 학습 절과 자료의 출처·시점·공간 범위를 확인합니다."
      },
      {
        "stage": "자료 탐구",
        "minutes": 12,
        "support": "지도·그래프·사례에서 관찰한 증거를 질문과 연결해 기록합니다."
      },
      {
        "stage": "설명 구성",
        "minutes": 8,
        "support": "주장, 근거, 근거가 주장을 뒷받침하는 이유를 구분해 작성합니다."
      },
      {
        "stage": "성찰",
        "minutes": 2,
        "support": "질문을 만든 과정과 자료의 한계, 다음에 확인할 점을 돌아봅니다."
      }
    ],
    "checks": [
      "질문이 자료의 장소·분포·관계·변화와 연결되는가",
      "자료의 출처·시점·범위·단위를 확인하는가",
      "교과 성취와 질문 과정 평가를 구분하는가"
    ]
  },
  "aiActivity": null
};
