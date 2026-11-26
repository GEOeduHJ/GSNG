# 세계시민과 지리 웹 재구성형 디지털 교과서 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task by task. Steps use checkbox syntax for tracking.

**Goal:** 4개 대단원·13개 중단원·41개 학습 절을 독립 집필 콘텐츠로 제공하고, 각 성취기준의 QFT 지리 탐구 흐름으로 연결되는 React 웹 교과서를 구현한다.

**Architecture:** 대단원별 콘텐츠 데이터와 성취기준별 모듈 설정을 ID로 분리한다. React의 공통 reader, navigation, visualization, QFT 컴포넌트가 이 데이터를 표시한다. 학생 기록은 브라우저 `localStorage`에만 남긴다.

**Tech Stack:** React 19, Vite 8, JavaScript ES modules, MapLibre GL JS, Apache ECharts, Cytoscape.js, native SVG/CSS.

**Spec:** `docs/superpowers/specs/2026-11-26-textbook-native-web-design.md`

## Global Constraints

- 교과서 PDF와 페이지 이미지, 원문 문항, 제3자 이미지는 공개 번들에 포함하지 않는다.
- 설명·사례·활동·도식은 독립 작성·제작하고 공개 출처를 표시한다.
- 대단원 4개, 중단원 13개, 학습 절 41개를 모두 목차 구조에 반영한다.
- 성취기준 13개는 각각 별도 파일로 계속 유지한다.
- QFT 질문 개수는 제한하지 않는다. 예시 질문은 생성 전 숨기고 분류/양방향 변환/우선화/근거·설명/성찰을 제공한다.
- 서버 계정, 서버 저장, 학생별 AI API, 자동 채점 기능을 추가하지 않는다.
- 기존 `package.json` 의존성을 우선 재사용한다. 새 의존성은 사용자 비용·API키·원격 서비스 호출을 요구하지 않는 경우에만 검토한다.
- 모식도와 실측 자료를 명확히 구분하고, 자료 없는 3D 표현은 개념 모형으로 표시한다.

## Review Focus

- 비어 있거나 잘못된 hash 경로로 들어올 때 홈/첫 학습 페이지로 복구되는가.
- 질문이 3개를 넘고 학습 기록이 길어져도 모든 항목이 저장·수정·내보내기 되는가.
- 질문 초안이 생성되기 전에 학습 절의 질문형 제목 또는 예시 질문이 QFT 화면에 노출되는가.
- 저장 공간이 꺼져 있거나 가득 찬 브라우저에서 읽기/질문 활동이 실패하는가.
- 작은 화면/키보드/차트·지도 대체 텍스트에서 핵심 학습 자료와 탐색 경로가 남는가.

---

### Task 1: 교과서 탐색 데이터와 새 집필 콘텐츠

**Files:**
- Create: `src/content/units/unit-01.js` … `unit-04.js`
- Create: `src/content/bookIndex.js`
- Create: `src/content/sources.js`
- Modify: 13개 `src/modules/12sejiNN-NN.js` (각 `sectionIds`, QFT 단계, 교사용 수업 안내와 학습절 연결 추가)
- Modify: `src/modules/index.js`

**Interfaces:**
- `BOOK_UNITS`: 순서형 대단원 배열; 각 하위 middle unit은 `id`, `title`, `moduleCode`, `lessonIds`, `intro`, `lessons`를 가진다.
- `lesson`: `id`, `title`, `lead`, `body`, `keyTerms`, `activity`, `visualization`, `sourceIds`를 가진다.
- `MODULES`: 성취기준 순서형 배열; 각 모듈은 `sectionIds`, `qft`, `teacherGuide`, `digitalTools`, `rubric`을 가진다.

- [x] 대단원별 본문 데이터를 4개 파일로 작성해 중단원 13개와 학습 절 41개를 모두 담는다. 각 절은 제목만이 아니라 독립 작성 설명문 두 단락 이상, 용어, 적용 활동, 자료 출처 또는 모식자료 표기를 갖는다.
- [x] 13개 기준 모듈과 `lessonIds` 간 다대다 연결을 설정한다.
- [x] 모든 출처는 사용자 제공 교과서가 아닌 공식/공개 데이터와 기관 자료를 사용하고 `src/content/sources.js`의 source ID로 관리한다.
- [x] `src/modules/index.js`에서 콘텐츠 ID, 기준 코드, 목차 개수가 드러나게 export한다.

### Task 2: 교과서형 목차와 읽기 경험

**Files:**
- Create: `src/components/BookNavigation.jsx`, `CourseHome.jsx`, `BookReader.jsx`, `SourceReferences.jsx`
- Modify: `src/App.jsx`, `src/styles.css`, `index.html`
- Remove: 사용하지 않는 이전 `Sidebar.jsx`

**Interfaces:**
- App route state는 `home`, `lesson:<lessonId>`, `module:<standardCode>`를 해석한다.
- `BookNavigation`은 대/중/소단원과 성취기준 모듈 계층을 렌더링한다. `BookReader`와 `SourceReferences`는 본문·용어·시각화·활동·출처를 렌더링한다.
- `BookReader({ lesson, onOpenModule })`은 본문, 개념, 자료 설명, 활동, 출처를 순서대로 렌더링한다.

- [x] 첫 화면에 과목 개요, 4개 대단원, 진도와 학습 시작 버튼을 둔다.
- [x] 목차에서 13개 중단원 및 41개 절을 개별 라우트/해시로 열고 이전/다음 절을 제공한다.
- [x] 본문은 독립 작성한 전체 학습용 문단과 블록을 사용한다. PDF 뷰어·원본 이미지·외부 이미지 CDN을 추가하지 않는다.
- [x] 좁은 화면에서 목차와 본문이 읽기 순서대로 재배열되도록 한다.

### Task 3: 성취기준별 QFT 탐구와 교사 안내

**Files:**
- Create: `src/components/QFTFlow.jsx`
- Modify: `src/App.jsx`, 13개 성취기준 모듈
- Remove: 이전 단일 화면용 `QuestionComposer.jsx`, `ResponseEditor.jsx`, `TeacherGuide.jsx`

**Interfaces:**
- 탐구 기록: `questions: [{id,text,classification,convertedType,convertedText,selected}]`, `priorityReason`, `evidencePlan`, `evidenceItems`, `claim`, `evidenceSummary`, `reasoning`, `reflection`, `completed`.
- `QFTFlow({ module, record, onChange, onSelectLesson })`은 7단계 흐름, 관련 학습 절, 교사용 메모와 성취기준 평가 관점을 제공한다.

- [x] 성취기준 13개에서 비질문형 초점으로 시작하고 학생 질문을 무제한 추가한다.
- [x] 각 질문을 열린/닫힌 질문으로 분류하고 반대 유형으로 바꾸며 원 질문과 변환 질문을 함께 보존한다.
- [x] 질문 우선순위·선택 이유·탐구할 절/자료·주장–근거–추론·성찰을 기록한다.
- [x] 질문 생성 전 QFT 화면에 질문형 학습 절 제목과 예시 질문을 보이지 않는다.
- [x] 교사용 안내에 성취기준, 준비물, 40분 수업 순서, 관찰 포인트, 과정 평가와 교과 성취 평가의 구분을 둔다.
- [x] 학생별 AI 대화/API/자동 채점은 추가하지 않는다. 필요한 AI 활용은 외부 도구의 선택 안내와 검토 질문으로만 제공하고 계정·가격·개인정보 조건을 함께 표시한다.

### Task 4: 지리 디지털 도구와 자료 카드

**Files:**
- Create: `src/components/visualizations/LessonVisualization.jsx`, `TerrainConceptModel.jsx`
- Reuse: 기존 `ModuleVisualization.jsx`, `GeoMap.jsx`, `EChartPanel.jsx`, `NetworkGraph.jsx`
- Create: 4개 대단원 콘텐츠의 학습 절별 `visualization` 블록과 대체 설명

**Interfaces:**
- visualization block은 `type`, `title`, `description`, `dataStatus`, `sourceIds`, `textAlternative`를 가진다.
- 실제 출처 자료만 `dataStatus: "public-data"`; 설명용 형상·수치는 `dataStatus: "schematic"`으로 렌더링한다.

- [x] 지도·차트·관계망을 관련 학습 절에서 제공하고 출처 링크·모식 여부를 표시한다. 실측 자료는 제공기관의 원문 링크에서 확인하도록 한다.
- [x] 지형 절에 자체 제작 SVG 개념 지형 모형을 추가하고 높이 과장 조절·판 경계 표시 기능을 제공한다. 실제 DEM인 것처럼 표현하지 않는다.
- [x] 모든 도구에 설명 문장 또는 표 대안을 제공한다. 원격 지도 타일/API 의존을 만들지 않는다.

### Task 5: 저장·설명·접근성·실행 안내

**Files:**
- Modify: `src/App.jsx`, `src/components/BookNavigation.jsx`, `src/components/QFTFlow.jsx`, `src/styles.css`, `README.md`, `index.html`

- [x] 기록을 구조화해 기존 localStorage 데이터와 충돌 없이 저장하며, JSON 내보내기와 전체 기록 삭제를 제공한다.
- [x] 저장 실패 시 읽기와 질문 작성은 계속 가능하고, 사용자에게 브라우저 저장 제한과 내보내기 대안을 알린다.
- [x] 명시적 label, landmark, skip link, focus 표시, reduced-motion, 320px 폭 재배열, 키보드 조작을 반영한다.
- [x] README에 설치·실행·콘텐츠 구조·자료 표기·AI/저장 개인정보 범위를 기록한다.
- [x] `npm run build`로 프로덕션 빌드를 확인하고, 개발 서버에서 홈/41절/13모듈/QFT/저장 내보내기 화면 흐름을 수동으로 확인한다.
- [x] 변경 요약, 검증 결과, 남은 데이터·내용·권리 한계를 기록한다.

## Inline execution record

- User requested full implementation and direct push to the configured GitHub repository; implementation is on isolated branch `codex/web-textbook-refactor` based on `origin/main`.
- User selected independently written lesson prose for the public repository; only topic and navigation sequence are retained from the source textbook. Original images and exact exercises are excluded.
- Ruling: do not add or run automated tests unless the user requested verification; follow repository build and manual preview checks instead. This respects the developer instruction while retaining verification before push.
