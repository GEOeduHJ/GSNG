export default {
  "code": "12세지03-03",
  "moduleId": "03-03",
  "group": "3부 · 인구와 경제",
  "title": "글로벌 경제 체제와 공간적 불균등",
  "time": "45분",
  "standardText": "초국적 기업을 중심으로 한 글로벌 경제 체제의 형성 과정을 탐색하고, 글로벌 경제에서의 공간적 불균등을 해소하기 위한 국제적 협력과 개인적 실천 방안에 대해 조사한다.",
  "goal": "초국적 기업을 중심으로 글로벌 경제 체제의 형성 과정을 살펴보고 공간적 불균등을 줄이는 국제 협력과 개인 실천을 조사합니다.",
  "concept": "하나의 상품은 원료 조달, 생산, 물류, 판매 등 여러 장소와 행위자를 거칠 수 있습니다. 단계마다 의사결정 권한과 얻는 가치, 부담하는 노동·환경 비용이 다를 수 있습니다. 자료가 보여주는 연결과 우리가 추론하는 원인을 구분해야 합니다.",
  "concepts": [
    "초국적 기업",
    "가치사슬",
    "공간적 불균등"
  ],
  "activity": "초국적 기업과 상품 가치사슬을 살펴보고 공간적 불균등을 줄이는 국제 협력과 개인 실천을 조사하세요.",
  "artifact": "가치사슬 관계망과 협력·실천 조사 기록",
  "rubric": [
    "글로벌 경제 체제의 형성 과정을 설명함",
    "공간적 불균등의 양상을 근거로 파악함",
    "국제 협력과 개인 실천을 구체적으로 조사함"
  ],
  "sourceNote": "시제품 네트워크는 관계 표현 방식만 보여줍니다. 실제 상품 자료와 수치는 출처 확인 후 연결합니다.",
  "digitalTools": [
    "Cytoscape.js · 행위자 네트워크",
    "MapLibre GL JS · 가치사슬 경로",
    "노드·간선 필터"
  ],
  "ai": {
    "status": "not-used",
    "rationale": "네트워크 시각화와 출처 자료 비교를 사용합니다.",
    "runtimeCallsPerLearner": 0
  },
  "visualization": {
    "type": "value-chain",
    "title": "장소와 행위자가 만나는 가치사슬",
    "hint": "노드를 선택해 단계별 역할·가치·부담을 살펴보세요.",
    "mapPattern": "value-chain",
    "nodes": [
      {
        "id": "raw",
        "label": "원료 지역",
        "group": "장소"
      },
      {
        "id": "firm",
        "label": "초국적 기업",
        "group": "기업"
      },
      {
        "id": "worker",
        "label": "노동자",
        "group": "행위자"
      },
      {
        "id": "logistics",
        "label": "물류망",
        "group": "연결"
      },
      {
        "id": "market",
        "label": "판매·소비",
        "group": "장소"
      }
    ],
    "edges": [
      {
        "source": "raw",
        "target": "firm",
        "label": "원료"
      },
      {
        "source": "firm",
        "target": "worker",
        "label": "생산"
      },
      {
        "source": "worker",
        "target": "logistics",
        "label": "물류"
      },
      {
        "source": "logistics",
        "target": "market",
        "label": "판매"
      }
    ],
    "actions": [
      [
        "국제 협력",
        "국가·국제기구가 함께 할 수 있는 일"
      ],
      [
        "기업 책임",
        "공급망과 노동·환경 책임"
      ],
      [
        "개인 실천",
        "근거를 확인한 시민·소비자 행동"
      ]
    ]
  },
  "sectionIds": [
    "lesson-03-03-01",
    "lesson-03-03-02",
    "lesson-03-03-03"
  ],
  "qft": {
    "focusTitle": "한 상품의 가치사슬과 지역 연결",
    "focusText": "원료·설계·조립·운송·판매 단계의 행위자와 장소를 나타낸 모식 관계망.",
    "focusVisual": "lesson-03-03-01",
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
  "aiActivity": {
    "tool": "Gemini",
    "purpose": "근거를 읽고 학생이 만든 설명에서 빠진 이해관계자 관점을 점검하는 검토 목록 초안 만들기",
    "timing": "학생이 질문·주장·자료 근거를 먼저 작성한 뒤 선택적으로 사용",
    "conditions": "AI 문장을 지리적 사실의 출처로 쓰지 말고, 개인·기업의 비공개 정보를 입력하지 않습니다.",
    "optional": true
  }
};
