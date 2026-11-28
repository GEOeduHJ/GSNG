# 질문 기반 파일럿 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 01-01과 03-01에서 질문 기록, 중복 없는 루틴 접근, 교사 파일 피드백 왕복을 완성한다.

**Architecture:** 기존 React 화면과 localStorage v4, 결과 JSON schema 1을 확장한다. 두 단원만 opt-in하고 기존 파일 제출 흐름을 유지한다.

**Tech Stack:** React, Vite, JavaScript, Vitest, localStorage.

**Spec:** `docs/superpowers/specs/2026-11-28-question-based-pilot-design.md`

## Global Constraints

- 01-01과 03-01만 opt-in; 다른 11개 중단원의 기존 행동·콘텐츠를 유지한다.
- localStorage v4와 학생 결과 schema 1을 유지하고 새 필드는 선택적으로 추가한다.
- 새 의존성, 내장 AI, 서버, 계정, 연구자료 생성, 배포, 병합, 푸시는 하지 않는다.
- 질문 수정 이력은 명시 저장만 기록하고, 원문·루틴·활동 응답은 덮어쓰지 않는다.
- 사용자 실행 지시를 승인 근거로 삼고 재승인을 요청하지 않는다.

## Review Focus

1. 이전 v4/result schema 1 파일과 다른 11개 단원의 동작을 보존하는가? Task 1의 legacy 읽기 테스트와 Task 2의 비파일럿 테스트.
2. 선택 질문을 지우거나 이유를 비우면 외부 AI 링크가 다시 닫히는가? Task 1의 게이트 테스트.
3. 명시 수정 저장이 최초 질문과 원응답을 보존하고 빈 값/동일 값은 거부하는가? Task 1·2의 보존 테스트.
4. 타인·다른 단원·중복·깨진 피드백 파일이 학생 기록을 바꾸지 않는가? Task 3의 불변 테스트.
5. 기본 루틴 하나와 접힌 선택 루틴, 근거 왕복이 응답 강제 없이 작동하는가? Task 2의 표시·접근 테스트.

---

## 작업 파일 지도

- 질문/AI: `src/book/qft/questions.js`, `UnitOpening.jsx`, `UnitClosing.jsx`, `src/storage/unitRecords.js`, `resultFile.js`.
- 루틴/근거: `src/book/lesson/RoutineCard.jsx`, `LessonReading.jsx`, `LessonQuestions.jsx`, `src/activities/LessonActivity.jsx`와 기존 응답 저장 구조.
- 교사/파일: `src/teacher/TeacherPage.jsx`, `summarize.js`, 신규 `src/storage/feedbackFile.js`, `src/book/close/UnitClosing.jsx`, README·도움말.
- 콘텐츠 변경은 01-01·03-01의 여섯 lesson 설정과 두 teacher 안내에만 한정한다.

### Task 1: 질문 기록과 외부 AI 시점

**Files:** 위 질문/AI 경로, 필요한 소형 helper/UI, `tests/question-history.test.jsx`, `tests/storage.test.js`, `tests/opening.test.jsx`.

**Interfaces:** `newQuestion`·`questionText`가 최초 질문/출처/revisions를 왕복한다. `reviseQuestion(record, change, now)`는 유효한 변경만 추가한다. pilot 판별과 recordId 보장 helper를 제공한다. 최초 독립 선택 스냅샷은 우선화 완료 때 한 번 저장하고 링크 클릭 시점과 분리한다. revisions는 optional feedbackIds를 왕복하며 Task 3이 이를 검증한다.

**Rules:** 01-01·03-01만 opt-in; 새 의존성 없음; 기존 result schema 1과 storage v4 호환; 질문 이력은 명시 수정 저장만 기록한다. legacy origin은 추정하지 않고 `기록 없음`, 새 QFT 질문은 `student` 기본값을 쓴다.

- [ ] 테스트: AI 링크의 선택 전 숨김·선택/이유 완료 후 표시·선택 삭제 후 숨김, 우선화 완료 시 ID/문장/이유/시각 스냅샷 고정, origin 누락 legacy 표시, 명시 수정·최초 질문 보존을 작성한다.
- [ ] RED: `npm test -- tests/question-history.test.jsx` — 게이트·legacy·이력 테스트 실패를 확인한다.
- [ ] 구현: 최초 질문 고정, 명시 수정 이력, 우선화 시점 스냅샷, pilot gate, 무작위 recordId와 optional schema 1 필드를 추가한다.
- [ ] GREEN: 질문 테스트와 `npm test -- tests/storage.test.js tests/opening.test.jsx`, 전체 `npm test` 통과. legacy 읽기·저장·내보내기 왕복을 확인한다.
- [ ] 커밋: `feat: record pilot question revisions and gate external AI`.

### Task 2: 기본 루틴과 근거 재사용

**Files:** `src/book/lesson/RoutineCard.jsx`, `LessonReading.jsx`, `LessonQuestions.jsx`, `src/activities/LessonActivity.jsx`, 필요한 소형 helper, 01-01·03-01의 여섯 lesson 설정과 두 `teacher.md`, `tests/pilot-routines.test.jsx`.

**Interfaces:** Task 1의 `questionText`와 question ID를 사용한다. 선택한 루틴/활동 응답을 편집 가능한 근거 초안으로 불러오며 출처 종류·절·카드/필드 ID를 유지한다. 기본 매핑은 두 단원 모두 절 1 opener, 절 2·3 inquiry다.

- [ ] 테스트: 기본 루틴 1개·접힌 선택 루틴, 기존 응답 보존, 근거 불러오기/수정/질문 연결 후 원응답과 출처 보존, 비파일럿 기존 표시를 작성한다.
- [ ] RED: `npm test -- tests/pilot-routines.test.jsx` — 신규 기본 표시·근거 왕복 테스트 실패를 확인한다.
- [ ] 구현: 선택 접근을 추가하고 겹치는 활동은 확장으로 표시한다. 두 교사용 50분×5차시 안에 루틴과 초안 제출/재작성을 배분해 각 합계 50분을 확인한다.
- [ ] GREEN: `npm test -- tests/pilot-routines.test.jsx tests/lesson.test.jsx`, 전체 `npm test`, `npm run check:book` 통과.
- [ ] 커밋: `feat: streamline pilot routines and evidence reuse`.

### Task 3: 교사 피드백 왕복과 도움말

**Files:** `src/teacher/TeacherPage.jsx`, `summarize.js`, 신규 `src/storage/feedbackFile.js`, 작은 교사/학생 컴포넌트, `src/storage/resultFile.js`, `unitRecords.js`, `src/book/close/UnitClosing.jsx`, README·`src/book/HelpPage.jsx`, 두 `teacher.md`, `tests/pilot-feedback.test.jsx`, `tests/teacher.test.jsx`.

**Interfaces:** Task 1의 recordId/revision과 Task 2의 응답 출처를 사용한다. 피드백 JSON은 `gsng-teacher-feedback` schemaVersion 1, feedbackId·recordId·unitId·createdAt·comments(questionId,text)·sourceSnapshot(questions,explanation)을 가진다. comments는 feedback file ID로 묶이고 questionId로 대상을 찾는다. `feedbackResponses`는 `{id,feedbackId,status:'applied'|'deferred',reason,questionRevisionIds:[],explanationRevisionIds:[],createdAt}`다. applied는 feedbackId를 포함하는 실제 revision 하나 이상에 연결되고 deferred는 이유만 남긴다. `explanationRevisions`는 before/after의 questionId·claim·reasoning·evidenceIds, reason·feedbackIds·createdAt을 저장한다. 원코멘트는 보존한다.

- [ ] 테스트: 활동 라벨 표시, 결과→교사 코멘트 파일→같은 학생 가져오기→질문/설명 재작성·응답 재내보내기 왕복, 타인/다른 단원/중복/깨진 파일 불변, legacy 열람을 작성한다.
- [ ] RED: `npm test -- tests/pilot-feedback.test.jsx` — 왕복과 불변 테스트 실패를 확인한다.
- [ ] 구현: 별도 피드백 파일·학생 가져오기와 응답·교사 활동 표시를 추가하고 README/도움말·두 50분 차시안을 갱신한다. 학생 결과 JSON 복원은 추가하지 않는다.
- [ ] GREEN: `npm run check:book`, `npm test`, `npm run build`를 각각 실행해 통과한다.
- [ ] 커밋: `feat: add offline teacher feedback round trip for pilots`.

최종 브라우저 전체 흐름 검수는 root가 별도 agent에 지시한다. 이 계획의 구현자는 구현 후 로컬 커밋까지만 수행한다.
