# 소절 활동 Thinking Routines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 41개 소절의 생각 열기·탐구하기·내 질문과 이 절에 공통 「루틴 카드」를 붙인다. 응답은 저장하고, 결과 파일로 내보내고, 교사 모아보기에 보여 준다. QFT 질문 목록과도 연결한다.

**Architecture:**
- `content/routines.yaml`(루틴 사전)을 책 데이터의 `book.routines`로 읽는다.
- 각 절 머리말의 `routines: {opener, inquiry, closing}`을 해석한다.
- 화면은 `RoutineCard` 부품 하나를 세 위치에 둔다.
- 응답은 단원 기록의 `routineState[lessonId][slot][stepId]`에 저장한다.

**Tech Stack:** React 19.3.1, Vite 8.3.8, Vitest 5 + jsdom + @testing-library/react(user-event·jest-dom 없음 → `fireEvent`, `getAttribute`), yaml, Codex CLI(gpt-6-luna, max)

**Spec:** `docs/superpowers/specs/2026-11-27-thinking-routines-design.md` · 대응표: `STUDY_ROOT/method/thinking-routines-lesson-map-2026-11-27.md`

**Branch:** 실행 전에 `main`에서 `thinking-routines` 브랜치를 만든다. 병합·푸시는 연구자 요청이 있을 때만 한다.

## Global Constraints

- QFT 단계, 여는 쪽·마무리 쪽, 기존 활동 틀 4종과 41개 활동 내용은 바꾸지 않는다.
- Creative Questions, Creative Question Starts 루틴은 쓰지 않는다.
- 이용 조건 규칙
  - PZ 설명문을 번역하거나 고쳐 싣지 않는다(루틴 페이지 CC BY-NC-ND 4.0, Global Thinking 묶음 CC BY-NC 4.0).
  - `label`·`hint`는 우리말로 새로 쓴다.
  - 출처는 도움말 쪽 한 곳에 모은다.
- 루틴 사전 규칙
  - 루틴마다 단계 2–4개, `toQuestion`은 루틴당 1개 이하
  - 루틴 응답은 필수 입력이 아니다(어떤 진행도 막지 않음).
- 학생 기록과 결과 파일 규칙
  - 학생 기록 v4 유지. `routineState`는 없으면 `{}`다.
  - 결과 파일 `schemaVersion` 1 유지. `routineResponses`와 `activityState`는 객체이거나 없음이다.
- 화면 규칙
  - 글자 14px 이상, 첫 표기 `English(한글 풀이)`
  - 카드 머리말 형식: `생각 루틴 · {name}({nameKo})`
- 한 자리에는 루틴 하나만 둔다. 04-03-1의 탐구하기는 `claim-support-question`, 04-03-3의 정리는 `used-to-think`다.
- Codex 작업 규칙
  - 커밋·푸시·설치를 하지 않는다.
  - 보고서는 `-o` 파일로만 낸다.
  - 실행: `coordination/requests/run-module-unit.sh` 방식(백그라운드).

## Review Focus

1. **사전에 없는 루틴 id나 단계 응답이 남은 기록:** 카드를 그리지 않고 다른 화면은 정상이다. → Task 2 테스트
2. **절 이동·새로 고침:** 각 절의 응답이 따로 유지된다. 한 절의 응답이 다른 절에 보이지 않는다. → Task 2 테스트
3. **「질문 목록에 넣기」**
   - 빈칸·공백뿐이면 비활성이다.
   - 같은 내용을 두 번 넣지 않는다. 보낸 뒤에는 「넣었습니다」를 표시하고, 내용이 바뀔 때까지 비활성이다.
   - → Task 2 테스트
4. **옛 결과 파일과 이상한 파일**
   - 새 필드가 없는 옛 파일은 정상으로 읽힌다.
   - `routineResponses`가 객체가 아니면 `bad-shape`다.
   - → Task 3 테스트
5. **절에 `routines`가 없는 경우(전환 중):** 생각 열기·탐구하기 카드는 그리지 않는다. 정리는 기본값 `used-to-think`를 쓴다. → Task 2 테스트

---

### Task 1: 루틴 사전 읽기와 검사

**Files:**
- Modify: `src/content-loader/assemble.js`, `src/content-loader/parse.js`, `src/content-loader/validate.js`
- Create: `content/routines.yaml`(이 Task에서는 `see-think-wonder`, `used-to-think`, `claim-support-question` 3개만. 나머지는 Task 4)
- Test: `tests/parse.test.js`, `tests/validate.test.js`
- Modify: `tests/fixtures/book.js`

**Interfaces:**
- Produces
  - `book.routines`: `{ source: {...}, items: { [id]: { id, name, nameKo, category: string[], url, steps: [{ id, label, hint, toQuestion?: boolean }] } } }`
    - `assembleBook`이 `content/routines.yaml`의 `routines` 맵을 `items`로 옮긴다. 각 항목에 키를 `id`로 넣는다.
  - `parseLesson`이 반환하는 값에 `routines: { opener?: {id, prompt}, inquiry?: {id, prompt}, closing?: {id, prompt} }`를 더한다. 기본값은 `{}`다.
  - `resolveRoutine(book, slotSpec)`(`src/content-loader/routines.js`, 새 파일)
    - 사전 항목에 `prompt`를 더해 돌려준다. 없으면 `null`이다.
  - `routineForSlot(book, lesson, slot)`(`src/content-loader/routines.js`)
    - `closing`이 비면 `{id:'used-to-think'}`를 쓴다.
    - `opener`·`inquiry`가 비면 `null`이다.
  - 검사 규칙(사전과 절)

    | 상황 | 오류 문구 |
    | --- | --- |
    | 단계 수 | `routine X: steps N (need 2-4)` |
    | `toQuestion` 수 | `routine X: toQuestion steps N (max 1)` |
    | 절이 사전에 없는 루틴을 지정 | `unknown routine: X` |
    | opener·inquiry의 prompt가 빔 | `routine prompt missing: opener` |

    - 절에 `routines.opener`·`inquiry`가 반드시 있어야 한다는 규칙은 Task 5에서 켠다.
  - `makeBook({ moduleLesson: true })`
    - fixture에 `routines` 사전(위 3개)을 더한다.
    - 2절에 `routines: { opener: {id:'see-think-wonder', prompt:'열기 안내'}, inquiry: {id:'claim-support-question', prompt:'탐구 안내'} }`를 둔다.

- [ ] **Step 1: 실패하는 테스트 작성**

  - `parse.test.js`: `'parses lesson routines and defaults to {}'`
  - `validate.test.js`의 `describe('routines', …)`
    - 사전 단계 수 1개 → `steps 1 (need 2-4)`
    - `toQuestion` 2개 → `(max 1)`
    - 절이 `nope`를 지정 → `unknown routine: nope`
    - opener prompt가 빔 → `routine prompt missing: opener`
    - 올바른 경우 → `[]`
  - `routines.js` 테스트: `routineForSlot`이 closing 빈 절에 `used-to-think`를 돌려준다.

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run tests/parse.test.js tests/validate.test.js` → FAIL

- [ ] **Step 3: 구현**

  `validateBook(book, refs, …)`의 `refs.routines`에서 사전을 읽는다. `check-book.mjs`는 `book`을 refs로 넘기므로 바꿀 필요 없다.

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run check:book` → PASS / ok

- [ ] **Step 5: 커밋**

  `git commit -m "feat(content): routine library and lesson routine slots"`

---

### Task 2: 루틴 카드와 세 위치 배치, 저장, 질문 보내기

**Files:**
- Create: `src/book/lesson/RoutineCard.jsx`
- Modify
  - `src/book/lesson/LessonReading.jsx`(생각 열기 아래)
  - `src/activities/LessonActivity.jsx`(탐구하기 ①)
  - `src/book/qft/LessonQuestions.jsx`(맨 위 정리 카드)
  - `src/storage/unitRecords.js`(`routineState` 정규화)
  - `src/book/book.css`
- Test: `tests/lesson.test.jsx`, `tests/storage.test.js`

**Interfaces:**
- Consumes: Task 1의 `routineForSlot`, `book.routines`, 기존 `useUnitRecord(unitId)`, `newQuestion(text, {fromLessonId})`
- Produces
  - `<RoutineCard unit lesson slot routine />`
    - `routine`은 `routineForSlot`의 결과다. `null`이면 아무것도 그리지 않는다.
    - 렌더 구조: `<section className="routine-card" data-slot={slot}>`, `<h3>` 생각 루틴 · {name}({nameKo}), prompt 문단, 단계마다 `<label>`(label) + hint + `<textarea rows=2>`
    - 저장: `record.routineState[lesson.id][slot][step.id]`
    - `toQuestion` 단계 버튼 「질문 목록에 넣기」
      - 공백을 뺀 길이가 4 미만이면 비활성이다.
      - 누르면 `newQuestion(text.trim(), {fromLessonId})`를 질문 목록에 추가하고 `routineState[...][slot].sent = text.trim()`을 기록한다.
      - `sent === 현재 text.trim()`이면 비활성이고 「넣었습니다」를 표시한다.
  - `normalizeUnitRecord`
    - `routineState`가 객체가 아니면 `{}`다.
    - 각 값은 객체만 남긴다.
  - 배치
    - 생각 열기 카드: opener 문단 바로 아래(`aside.opener` 안)
    - 탐구하기: `LessonActivity`의 `h2 탐구하기` 아래에 ① 카드, ② 기존 활동 순서로 둔다. 활동 틀이 없어도 카드가 있으면 탐구하기 구역을 그린다.
    - 정리 카드: `LessonQuestions`의 `h2 내 질문과 이 절` 바로 아래

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// tests/lesson.test.jsx describe('routine cards')
it('renders opener, inquiry and closing routine cards in place', () => { /* moduleLesson 2절: .opener .routine-card[data-slot=opener] 1개, .activity .routine-card[data-slot=inquiry] 1개, .my-questions .routine-card[data-slot=closing] 1개(used-to-think 기본) */ });
it('saves answers per lesson and slot', () => { /* opener see 칸 입력 → storage units['01-01'].routineState['lesson-01-01-2'].opener.see === 입력값 */ });
it('keeps lessons separate', () => { /* 2절 입력 후 1절 렌더(fixture 1절은 routines 없음) → opener/inquiry 카드 없음, closing 카드 칸은 비어 있음 */ });
it('sends a wonder to the question list once', () => { /* 공백 → 버튼 disabled; '왜 무역이 늘었을까' 입력 → 클릭 → questions 마지막 {text, fromLessonId:'lesson-01-01-2'}; 버튼 disabled, '넣었습니다' 보임; 내용 바꾸면 다시 활성 */ });
it('skips a card whose routine id is unknown', () => { /* inquiry.id='nope' → inquiry 카드 없음, 활동은 그대로 */ });
// tests/storage.test.js
it('normalizes routineState to an object', () => { /* routineState: 'x' → {} ; {l1: {opener: {see:'a'}}} 유지 */ });
```

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run tests/lesson.test.jsx tests/storage.test.js` → FAIL

- [ ] **Step 3: 구현과 CSS**

  `.routine-card`: 점선 테두리, 책 디자인 색. 좁은 화면에서는 칸을 세로로 쌓는다.

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run check:book && npm run build` → PASS / ok / 성공

- [ ] **Step 5: 커밋**

  `git commit -m "feat(lesson): routine cards in opener, inquiry and closing"`

---

### Task 3: 결과 파일, 교사 모아보기, 도움말 출처

**Files:**
- Modify: `src/storage/resultFile.js`, `src/teacher/TeacherPage.jsx`, `src/book/HelpPage.jsx`
- Test: `tests/storage.test.js`, `tests/teacher.test.jsx`, `tests/shell.test.jsx`(도움말)

**Interfaces:**
- Consumes: Task 2의 `record.routineState`, Task 1의 `book.routines`
- Produces
  - 결과 파일
    - `buildResultFile`이 `routineResponses: record.routineState ?? {}`, `activityState: record.activityState ?? {}`를 더한다.
    - `hasValidShape`는 두 필드를 객체(배열 아님) 또는 없음으로 허용한다. 그 밖이면 `bad-shape`다.
  - `StudentDetail`
    - 「생각 루틴」 `h3`을 더한다.
    - 절마다 제목과 위치별(생각 열기/탐구하기/정리) 응답을 `label: 내용`으로 보여 준다.
    - 응답이 없으면 「응답 없음」이다.
  - `HelpPage`: 「생각 루틴의 출처」 `h2`를 둔다. 담을 내용은 다음과 같다.
    - `book.routines.source`의 기관·제목·링크·이용 조건
    - 「안내문은 이 교과서가 새로 쓴 것」 고지
    - 루틴 목록(이름 + 원 페이지 링크)

- [ ] **Step 1: 실패하는 테스트 작성**

  - `'exports routineResponses and activityState'`
  - `'reads old files without the new fields'`
  - `'rejects non-object routineResponses as bad-shape'`
  - `'teacher detail shows routine answers by lesson'`
  - `'help page credits Project Zero with license and links'`
    - 「Project Zero」, 「CC BY-NC-ND」 문자열, `see-think-wonder` 원 페이지 링크

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run` → 새 테스트 FAIL

- [ ] **Step 3: 구현**

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run build` → PASS

- [ ] **Step 5: 커밋**

  `git commit -m "feat: export routine answers, teacher view and Project Zero credits"`

---

### Task 4: 루틴 사전 작성(대응표에 쓰인 루틴 전체)

**Files:**
- Modify: `content/routines.yaml`
- Modify: `STUDY_ROOT/method/thinking-routines-lesson-map-2026-11-27.md`(04-03-1·04-03-3 변경 기록)

**Interfaces:**
- Produces: 사전 id 목록(Task 5가 사용)

  | id | 루틴 |
  | --- | --- |
  | `see-think-wonder` | See, Think, Wonder |
  | `think-puzzle-explore` | Think, Puzzle, Explore |
  | `see-think-me-we` | See, Think, Me, We |
  | `compass-points` | Compass Points |
  | `projecting-across-time` | Projecting Across Time |
  | `projecting-across-distance` | Projecting Across Distance |
  | `looking-ten-times-two` | Looking: Ten Times Two |
  | `claim-support-question` | Claim, Support, Question |
  | `what-makes-you-say-that` | What Makes You Say That? |
  | `three-whys` | The 3 Whys |
  | `options-diamond` | Options Diamond |
  | `step-in-step-out-step-back` | Step In, Step Out, Step Back |
  | `circle-of-viewpoints` | Circle of Viewpoints |
  | `step-inside` | Step Inside |
  | `parts-purposes-complexities` | Parts, Purposes, Complexities |
  | `parts-people-interactions` | Parts, People, Interactions |
  | `think-feel-care` | Think, Feel, Care |
  | `ways-things-can-be-complex` | Ways Things Can Be Complex |
  | `same-different-connect-engage` | Same, Different, Connect, Engage |
  | `beauty-and-truth` | Beauty and Truth |
  | `tug-of-war` | Tug of War |
  | `take-a-stand` | Take a Stand |
  | `true-for-who` | True for Who? |
  | `unveiling-stories` | Unveiling Stories |
  | `values-identities-actions` | Values, Identities, Actions |
  | `circles-of-action` | Circles of Action |
  | `used-to-think` | I Used to Think… Now I Think… |

- [ ] **Step 1: 루틴 단계 확인**

  각 루틴의 PZ 원 페이지(브라우저 백그라운드 탭)에서 단계의 수와 순서, 목적만 확인한다. 원문 문장은 기록하지 않는다. 대상 루틴 페이지 URL은 사전의 `url`에 적는다.

- [ ] **Step 2: 우리말 작성**

  단계마다 `label`(2–8자)과 `hint`(한 문장)를 새로 쓴다.
  - 고등학생 눈높이, 평서형으로 쓴다.
  - `toQuestion`은 궁금증·질문 단계에만 둔다(See, Think, Wonder의 wonder, Think, Puzzle, Explore의 puzzle 등).

- [ ] **Step 3: 확인**

  `npm run check:book` → ok(사전 규칙). `npx vitest run` → PASS

- [ ] **Step 4: 커밋**

  `git commit -m "content: Korean routine library (own wording, Project Zero attribution)"`

---

### Task 5: 41개 절에 루틴 지정(Codex 초안 → 검수)과 필수 규칙 켜기

**Files:**
- Modify(Codex): `content/book/*/lesson-*.md`의 머리말 `routines`
- Modify: `src/content-loader/validate.js`(필수 규칙), `tests/validate.test.js`
- Create: `STUDY_ROOT/coordination/requests/v2-routines-assign-2026-11-27.md`

**Interfaces:**
- Consumes: Task 4 사전 id, 대응표 4장
- Produces: module 절 검사 규칙 `routines missing: opener` / `routines missing: inquiry`

- [ ] **Step 1: 요청서 작성 후 Codex 실행**

  - 13개 중단원을 한 작업으로 맡긴다. 머리말만 수정한다.
  - 대응표의 생각 열기·탐구하기 루틴 id를 적고, 절 맞춤 `prompt`를 한두 문장으로 쓴다.
    - 그 절의 실제 자료(`dN` label)나 소주제를 가리킨다.
    - 숫자를 새로 만들지 않는다.
  - 정리는 기본값이면 생략한다.

- [ ] **Step 2: 검수**

  - 41개 절의 prompt를 모두 읽는다.
    - 절 내용과 맞는가
    - 민감 주제(04-03, 02-03, 03-01-3)에서 중립을 지키는가
    - 교과서 문장을 옮기지 않았는가(`copy-guard.py`)
  - 대응표와 다른 선택을 했으면 대응표에 기록한다.

- [ ] **Step 3: 필수 규칙의 실패 테스트**

  `'requires opener and inquiry routines on module lessons'`: fixture 2절에서 `routines.inquiry`를 지우면 `routines missing: inquiry`가 나와야 한다.

- [ ] **Step 4:** 실행해 실패 확인 → 규칙 구현 → `npx vitest run && npm run check:book` 통과

- [ ] **Step 5: 커밋**

  `git commit -m "content: assign thinking routines to all 41 lessons; require routine slots"`

---

### Task 6: 기록, 브라우저 확인, 전체 검토

**Files:**
- Modify: `STUDY_ROOT/brief.md`, `research/studies/index.md`, `content/book/*/teacher.md`(루틴 운영 한 줄씩)
- Modify: `STUDY_ROOT/literature/references.md`, `literature/evidence-ledger.csv`
- Create: `STUDY_ROOT/coordination/textbook-v2-thinking-routines-2026-11-27.md`

- [ ] **Step 1: 문헌 확인**

  확인할 문헌은 다음과 같다. 출판사 페이지나 DOI·ISBN 기록으로 서지를 확인한 뒤 `references.md`에 넣는다. 확인하지 못하면 미확인으로 표시한다.
  - Ritchhart, Church, & Morrison(2011) 『Making Thinking Visible』
  - Boix Mansilla(2017) Global Thinking
  - PZ 루틴 페이지

- [ ] **Step 2: `brief.md` 기록**

  - QFT 유지 + 소절 Thinking Routines 결정
  - 결과 파일을 연구 자료로 쓰려면 연구 계획·동의·기관 심의가 먼저 필요하다는 점

- [ ] **Step 3: 교사용 안내**

  각 `teacher.md`에 「생각 루틴」 한 줄을 더한다. 절별 루틴 이름과 운영 시간(5분 안팎)이다.

- [ ] **Step 4: 브라우저 확인(백그라운드 탭)**

  확인할 것:
  - 세 카드의 위치
  - 저장
  - 질문 보내기 → 여는 쪽 배지
  - 결과 파일 내보내기 → 교사 모아보기에 루틴 응답 표시
  - 도움말 출처
  - 넓은 화면과 375px 화면
  - 콘솔 오류 없음

- [ ] **Step 5: 전체 검토**

  새 검토자(Opus)에게 이 계획의 Review Focus 다섯 줄을 넘긴다. Critical·Important는 테스트 먼저로 고친다.

- [ ] **Step 6: 확인과 커밋**

  `npx vitest run && npm run check:book && npm run build` → 통과. 저장소 파일을 커밋한다.

- [ ] **Step 7: 결과 보고**

  연구자에게 결과를 보고한다. 병합·푸시는 요청이 있을 때만 한다.
