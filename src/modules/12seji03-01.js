export default {
  "code": "12세지03-01",
  "moduleId": "03-01",
  "group": "3부 · 인구와 경제",
  "title": "세계의 인구 문제와 인구 이주",
  "time": "45분",
  "standardText": "세계 인구 분포 및 구조를 통해 세계 인구 문제를 이해하고, 국제적 이주가 인구 유출 지역과 유입 지역에 미치는 영향을 탐구한다.",
  "goal": "세계 인구의 분포와 구조를 통해 인구 문제를 이해하고 국제 이주가 유출 지역과 유입 지역에 미치는 영향을 탐구합니다.",
  "concept": "인구 구조는 연령 구성과 변화 양상을 보여줍니다. 인구 이동은 일자리·가족·환경·정치 등 여러 요인과 연결되며 출발지와 도착지에 다른 영향을 줄 수 있습니다. 통계의 기준연도와 정의를 확인하고 개인 경험을 전체 집단의 특성으로 일반화하지 않아야 합니다.",
  "concepts": [
    "인구 분포",
    "인구 구조",
    "출발지와 도착지"
  ],
  "activity": "인구 분포도·인구 피라미드와 이주 흐름 자료를 읽고 유출·유입 지역에 미치는 영향을 비교하세요.",
  "artifact": "인구 자료 해석과 이주 영향 비교",
  "rubric": [
    "세계 인구 분포와 구조를 자료로 설명함",
    "자료의 연도·정의를 확인함",
    "이주 영향을 유출·유입 지역별로 비교함"
  ],
  "sourceNote": "인구 피라미드와 수치는 시제품 모식 자료입니다. 실제 자료는 정의와 기준연도를 표시해야 합니다.",
  "digitalTools": [
    "Apache ECharts · 인구 피라미드",
    "MapLibre GL JS · 이주 흐름도",
    "정의·연도 메타데이터 카드"
  ],
  "ai": {
    "status": "not-used",
    "rationale": "공개 집계자료와 인간 해석을 중심으로 탐구합니다.",
    "runtimeCallsPerLearner": 0
  },
  "visualization": {
    "type": "population",
    "title": "인구 구조와 이동을 함께 읽기",
    "hint": "모식 그래프의 분포와 이동 단계를 구분해 관찰하세요.",
    "mapPattern": "migration-flows",
    "groups": [
      "어린 연령",
      "중간 연령",
      "높은 연령"
    ],
    "pyramid": {
      "left": [
        38,
        58,
        74
      ],
      "right": [
        34,
        61,
        70
      ]
    },
    "flows": [
      "출발 지역",
      "이동 경로",
      "도착 지역"
    ]
  },
  "sectionIds": [
    "lesson-03-01-01",
    "lesson-03-01-02",
    "lesson-03-01-03"
  ],
  "qft": {
    "focusTitle": "인구 구조와 이동의 모습",
    "focusText": "연령별 인구 막대와 지역 간 이동 방향을 함께 나타낸 모식 자료.",
    "focusVisual": "lesson-03-01-01",
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
