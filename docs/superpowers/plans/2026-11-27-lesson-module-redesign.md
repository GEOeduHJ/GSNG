# 소절 학습 모듈 재구성(골격 + 시범 03-01) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 스크롤 연동을 「자료 보기」 버튼 방식으로 바꾼다. 소절을 「학습 펼침면 → 탐구하기 → 핵심 정리 → 내 질문과 이 절」 모듈로 재구성한다. 시범 중단원 03-01을 교과서 소주제 흐름에 맞춰 새 실제 자료와 함께 다시 쓴다.

**Architecture:**
- 절 본문에 `## 소주제`와 `[[자료id]]` 표식을 쓰는 「module」 형식을 추가한다. 해석기가 이를 `sections`로 바꾼다.
- 표식이 없는 옛 형식은 「legacy」로 해석한다. 문단 i에 단계 i를 버튼으로 연결해 같은 화면에서 보여 준다.
- 화면은 선택 상태(`selectedId`)가 오른쪽 자료를 정한다. 스크롤 감시 코드는 모두 없앤다.
- 콘텐츠·자료는 Codex CLI(gpt-6-luna, max)가 만들고 Claude가 검수한다.

**Tech Stack:** React 19.3.1, Vite 8.3.8, Vitest 5 + jsdom + @testing-library/react, yaml, ECharts 6.1, MapLibre GL 6.19, Python 3 자료 스크립트, Codex CLI 0.172.

**Spec:** `docs/superpowers/specs/2026-11-27-lesson-module-redesign-design.md`

**Branch:** 실행 전에 `main`에서 `lesson-modules` 브랜치를 만든다. 병합·푸시는 연구자 요청이 있을 때만 한다.

## Global Constraints

- 한국어 본문. 필수 영어 용어는 첫 표기 때 `English(한글 풀이)`로 쓴다. 문체는 `content/textbook-style.md`를 따른다.
- 「수치는 실제, 상황은 허구」: 수치·출처·자료를 지어내지 않는다. 합계·차이를 새로 계산해 본문에 쓰지 않는다.
- 교과서 문장·그림·도표·인용 수치를 옮기지 않는다. 소주제 순서와 개념만 따른다. 교과서에서 뽑은 텍스트는 공개 저장소(`platform/web-prototype`)에 넣지 않는다.
- 글자 크기는 14px 미만 금지(`checkCssFontSizes`). 동작 줄이기(`prefers-reduced-motion`)를 존중한다.
- module 형식 절의 규칙
  - 소주제(`##`) 2–5개
  - 자료 단계 3–6개, 그중 `schematic`이 아닌 실제 자료 3개 이상
  - 모든 `[[id]]`가 존재하는 자료 단계를 가리키고, 모든 자료 단계가 한 번 이상 연결된다.
  - `summary` 3–4항목, `opener`는 비어 있지 않다.
  - `type: text` 단계는 쓰지 않는다.
- 개념도: `type: image`, `schematic: true`. `data` 경로는 provenance에 있어야 한다. 캡션 앞에 「개념도」를 붙이고, 수치 눈금은 넣지 않는다.
- 학생 기록은 v4를 유지한다. 질문에 `fromLessonId`(문자열 또는 null)를 추가한다.
- Codex 작업 규칙
  - 하지 않는 것: 커밋·푸시·패키지 설치
  - 모델: gpt-6-luna, `model_reasoning_effort=max`. OpenCode는 쓰지 않는다.
  - 요청과 보고는 `STUDY_ROOT/coordination/requests/`, `STUDY_ROOT/coordination/handoffs/`에 둔다.
- 실행 명령 형식: `caffeinate -i codex exec --skip-git-repo-check -C <web-prototype> --sandbox workspace-write -c sandbox_workspace_write.network_access=true -o <handoff> - < <request>`. 백그라운드로 돌린다.

## Review Focus

1. **존재하지 않거나 text 단계를 가리키는 `[[id]]`:** 화면은 그 버튼만 빼고 정상 표시한다. 검사(`check:book`)는 오류를 낸다. → Task 1·2·3 테스트
2. **문장 가운데 놓인 표식:** 표식만 지워지고 앞뒤 띄어쓰기가 두 칸이 되지 않는다. 버튼은 문단 끝에 나온다. → Task 1 테스트
3. **legacy 절(opener·summary 없음):** 생각 열기와 핵심 정리 구역이 빈 제목으로 나오지 않는다. → Task 3 테스트
4. **옛 근거 기록의 `stepId`가 새 자료에 없을 때:** 근거 목록은 메모만 보여 주고 깨지지 않는다. 자료 선택 기본값은 지금 보는 자료다. → Task 4 테스트
5. **빈칸·공백뿐인 새 질문:** 넣기 버튼이 비활성이다. `fromLessonId`가 있는 질문은 정규화와 결과 파일 왕복을 거쳐도 유지된다. → Task 4 테스트

---

### Task 1: 절 본문 해석 — module·legacy 형식

**Files:**
- Modify: `src/content-loader/parse.js`
- Test: `tests/parse.test.js`
- Modify: `tests/fixtures/book.js`

**Interfaces:**
- Produces
  - `normalizeStep(step)`: 기존 필드에 `label: string`(기본 `''`)을 더한다.
  - `parseLessonBody(body: string): { sections: Section[], paragraphs: string[] }`
    - `Section = { title: string, paragraphs: { text: string, refs: string[] }[] }`
    - `## 제목` 줄이 새 소주제를 연다. 첫 제목 앞의 문단은 `title: ''` 소주제에 담긴다.
    - `[[id]]`는 `refs`로 옮기고 텍스트에서 지운다. 공백은 하나로 줄이고 앞뒤 공백을 자른다.
    - `paragraphs`는 표식을 지운 문단 텍스트의 평평한 목록이다.
  - `legacySections(paragraphs: string[], steps: Step[]): Section[]`
    - `title: ''`인 소주제 하나를 만든다.
    - 문단 i의 `refs`는 `steps[i]`가 있고 `type !== 'text'`이면 `[steps[i].id]`, 아니면 `[]`이다.
  - `parseLesson(text, {unitId, index})`: 기존 반환값에 다음을 더한다.
    - `format: 'module' | 'legacy'`: 본문에 `## ` 줄이 하나라도 있으면 module이다.
    - `opener: string`, `summary: string[]`, `textbookRef: object | null`, `sections: Section[]`
    - legacy이면 `sections = legacySections(paragraphs, steps)`이다.
  - `tests/fixtures/book.js`
    - 기존 `lesson()` 객체에 `format: 'legacy'`, `opener: ''`, `summary: []`, `textbookRef: null`, `sections: legacySections(...)`을 더한다.
    - `makeBook({ moduleLesson = false } = {})`: true이면 2절을 module 절로 바꾼다.
      - 소주제 2개: `'소주제 가'`와 `'소주제 나'`
      - 자료 `m1`·`m2`·`m3`(chart)와 `[[m1]]`·`[[m2]]`·`[[m3]]` 연결
      - `opener: '생각 열기 문장'`
      - `summary: ['정리 1', '정리 2', '정리 3']`

- [ ] **Step 1: 실패하는 테스트 작성** (`tests/parse.test.js`의 `describe('lesson body', …)`)

```js
it('splits ## headings into sections and lifts [[id]] markers into refs', () => {
  const { sections, paragraphs } = parseLessonBody('## 가\n첫 문단 [[d1]]\n\n둘째 문단\n\n## 나\n셋째 [[d2]] [[d3]]');
  expect(sections.map((s) => s.title)).toEqual(['가', '나']);
  expect(sections[0].paragraphs).toEqual([{ text: '첫 문단', refs: ['d1'] }, { text: '둘째 문단', refs: [] }]);
  expect(sections[1].paragraphs[0]).toEqual({ text: '셋째', refs: ['d2', 'd3'] });
  expect(paragraphs).toEqual(['첫 문단', '둘째 문단', '셋째']);
});
it('removes a mid-sentence marker without leaving a double space', () => {
  expect(parseLessonBody('## 가\n앞 문장 [[d1]] 뒤 문장').sections[0].paragraphs[0]).toEqual({ text: '앞 문장 뒤 문장', refs: ['d1'] });
});
it('keeps text before the first heading in an untitled section', () => {
  expect(parseLessonBody('머리 문단\n\n## 가\n본문').sections.map((s) => s.title)).toEqual(['', '가']);
});
it('parses a module lesson with opener, summary and label', () => {
  const lesson = parseLesson('---\ntitle: t\nopener: 생각\nsummary: [a, b, c]\ntextbookRef: { pages: [128, 131] }\nsteps:\n  - { id: d1, type: chart, data: /x.json, label: 그래프 }\n---\n## 가\n문단 [[d1]]', { unitId: '03-01', index: 2 });
  expect(lesson.format).toBe('module');
  expect(lesson.opener).toBe('생각');
  expect(lesson.summary).toEqual(['a', 'b', 'c']);
  expect(lesson.textbookRef).toEqual({ pages: [128, 131] });
  expect(lesson.steps[0].label).toBe('그래프');
});
it('maps legacy paragraphs to same-index data steps', () => {
  const lesson = parseLesson('---\ntitle: t\nsteps:\n  - { id: s1, type: text }\n  - { id: s2, type: chart, data: /x.json }\n---\n문단1\n\n문단2', { unitId: '01-01', index: 1 });
  expect(lesson.format).toBe('legacy');
  expect(lesson.sections).toEqual([{ title: '', paragraphs: [{ text: '문단1', refs: [] }, { text: '문단2', refs: ['s2'] }] }]);
  expect(lesson.opener).toBe('');
  expect(lesson.summary).toEqual([]);
});
```

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run tests/parse.test.js` → FAIL(`parseLessonBody is not a function`)

- [ ] **Step 3: `parse.js`에 위 Interfaces대로 구현하고 fixture를 갱신한다.**

  표식 정규식은 `/\[\[([A-Za-z0-9_-]+)\]\]/g`이다.

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run` → 전체 PASS. 기존 테스트도 fixture 갱신 뒤 통과해야 한다.

- [ ] **Step 5: 커밋**

  `git commit -m "feat(content): parse module lessons with sections and data markers"`

---

### Task 2: 구조 검사 — module 규칙과 개념도

**Files:**
- Modify: `src/content-loader/validate.js`
- Test: `tests/validate.test.js`

**Interfaces:**
- Consumes: Task 1의 `lesson.format`, `sections`, `opener`, `summary`, `steps[].schematic`
- Produces
  - `checkLesson`이 `format`에 따라 갈린다.
    - legacy는 기존 규칙(문단 4–6, 문단 수와 단계 수 일치, 자료 2–4) 그대로다.
    - module은 Global Constraints의 module 규칙을 따른다.
  - 오류 문구(테스트가 고정한다)

    | 상황 | 오류 문구 |
    | --- | --- |
    | 소주제 수 | `sections N (need 2-5)` |
    | 자료 단계 수 | `data steps N (need 3-6)` |
    | 실제 자료 수 | `real data steps N (need 3+)` |
    | 없는 자료를 가리킴 | `unknown data ref: X` |
    | 연결되지 않은 자료 | `data step not linked: X` |
    | 핵심 정리 항목 수 | `summary N (need 3-4)` |
    | 생각 열기 없음 | `opener missing` |
    | text 단계 사용 | `text step in module lesson: X` |

  - `checkStep`: `type === 'image' && schematic`이면 manifest 대신 provenance(`refs.provenance.items[].src === step.data`)로 확인한다. 없으면 `image without provenance: <data>`.

- [ ] **Step 1: 실패하는 테스트 작성** (`describe('module lessons', …)`, Task 1의 `makeBook({ moduleLesson: true })`를 쓴다)

```js
it('accepts a well-formed module lesson', () => {
  expect(errorsFor(makeBook({ moduleLesson: true }), 'lesson 2')).toEqual([]);
});
it('reports unknown refs, unlinked steps and missing summary/opener', () => {
  const book = makeBook({ moduleLesson: true });
  const lesson = book.units[0].lessons[1];
  lesson.sections[0].paragraphs[0].refs = ['nope'];
  lesson.summary = ['하나'];
  lesson.opener = '';
  const errors = errorsFor(book, 'lesson 2');
  expect(errors).toEqual(expect.arrayContaining([
    expect.stringContaining('unknown data ref: nope'),
    expect.stringContaining('data step not linked: m1'),
    expect.stringContaining('summary 1 (need 3-4)'),
    expect.stringContaining('opener missing'),
  ]));
});
it('requires three real (non-schematic) data steps', () => { /* m1을 schematic image로 바꾸면 'real data steps 2 (need 3+)' */ });
it('checks schematic images against provenance', () => { /* provenance에 없는 data → 'image without provenance' */ });
it('keeps legacy rules for legacy lessons', () => { /* 기존 fixture 1절은 오류 없음 */ });
```

  `errorsFor(book, where)`는 테스트 안 도우미다. `validateBook(book, refs).errors` 가운데 `where`를 포함하는 항목만 고른다.

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run tests/validate.test.js` → FAIL

- [ ] **Step 3: 구현**

  `checkModuleLesson(lesson, where, refs, errors)`를 분리해 둔다.

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run check:book` → 전체 PASS, check:book ok(13개 중단원 모두 legacy)

- [ ] **Step 5: 커밋**

  `git commit -m "feat(content): validate module lessons and schematic diagrams"`

---

### Task 3: 절 화면 — 자료 보기 버튼, 오른쪽 자료, 아래 구역

**Files:**
- Create: `src/book/lesson/lessonData.js`
- Create: `src/book/lesson/LessonReading.jsx`
- Create: `src/book/lesson/LessonSummary.jsx`
- Modify: `src/book/lesson/LessonSpread.jsx`
- Modify: `src/book/lesson/DataStage.jsx`(캡션의 「모식 자료」 → 앞머리 「개념도 · 」)
- Modify: `src/activities/LessonActivity.jsx`(구역 제목 「탐구하기」, 활동 제목은 h3)
- Modify: `src/book/book.css`
- Delete: `src/book/lesson/useActiveStep.js`, `src/book/lesson/stages.js`
- Test: `tests/lesson.test.jsx`(`useActiveStep`·`stageIndexFor` 묶음은 지운다)

**Interfaces:**
- Consumes: Task 1의 `lesson.sections`, `format`, `opener`, `summary`, `steps[].label`
- Produces
  - `lessonData.js`
    - `dataSteps(lesson): Step[]`: `type !== 'text'`인 단계
    - `firstRefId(lesson): string`: 읽는 순서의 첫 유효 ref. 없으면 첫 자료 id, 그것도 없으면 `''`
    - `sectionForStep(lesson, stepId): { index: number, title: string } | null`: 그 자료를 처음 연결한 소주제
    - `buttonLabel(step): string`: `step.label || step.caption`
  - `LessonSpread`
    - `const [selectedId, setSelectedId] = useState(firstRefId(lesson))`
    - 넓은 화면: 오른쪽은 `<DataPanel>`(sticky)이다. `<DataStage key={selectedId} …>`와 「자료 · {소주제 제목}」 머리말(제목이 빈 legacy면 생략)을 담는다.
    - 좁은 화면: 오른쪽 영역을 쓰지 않는다. `LessonReading`이 펼친 자료를 문단 아래에 그린다.
    - `Spread` 아래, 화면 전체 폭으로 다음을 차례로 둔다.
      - `<LessonActivity>`
      - `<LessonSummary items={lesson.summary}>`(빈 배열이면 렌더하지 않음)
      - `<LessonQuestions … selectedStepId={selectedId}>`
  - `LessonReading({ unit, lesson, wide, selectedId, onSelect, motion })`
    - 차례: 절 번호, 제목, 학습 목표, 생각 열기(`opener`가 있을 때만, 머리말 「생각 열기」), 소주제(`title`이 있으면 `h2`), 문단, 버튼, 삽화, 핵심 용어
    - 버튼은 `<button type="button" className="data-button">`이고 글자는 `자료 보기 ▸ {buttonLabel}`이다.
    - 넓은 화면: `aria-pressed={selectedId === id}`. 누르면 `onSelect(id)`. 눌린 버튼에는 「보는 중」 표시를 더한다.
    - 좁은 화면: `aria-expanded`. 누를 때마다 그 버튼 자리(`${소주제}-${문단}-${id}`) 아래의 `DataStage`가 펼쳐지고 접힌다.
    - 알 수 없는 ref는 버튼을 만들지 않는다.
  - `LessonSummary({ items })`: `<section className="lesson-summary"><h2>핵심 정리</h2><ul>…</ul></section>`
- 지우는 CSS: `.stage-track`, `.prose p.is-active`, `.resync`
- 추가 CSS: `.data-button`(기본·눌림·초점 표시), `.data-panel-head`, `.lesson-after`(아래 구역 전체 폭, 구역 간 위 경계선), `.lesson-summary`, `.inline-stage`. 모든 글자는 14px 이상이다.

- [ ] **Step 1: 실패하는 테스트 작성** (`describe('lesson module page', …)`. `setMedia`는 기존 파일의 도우미를 쓴다. DataChart는 기존 테스트처럼 fetch 스텁으로 대체 텍스트만 확인한다.)

```js
it('shows the first linked data on the right and switches only on button press', () => {
  setMedia({ wide: true });
  renderLesson(makeBook({ moduleLesson: true }), 2);
  expect(document.querySelector('.page-right [data-step]').dataset.step).toBe('m1');
  fireEvent.click(screen.getByRole('button', { name: /자료 보기.*m2/ }));
  expect(document.querySelector('.page-right [data-step]').dataset.step).toBe('m2');
  expect(screen.getByRole('button', { name: /자료 보기.*m2/ }).getAttribute('aria-pressed')).toBe('true');
});
it('expands data under the paragraph on narrow screens', () => {
  setMedia({ wide: false });
  renderLesson(makeBook({ moduleLesson: true }), 2);
  const button = screen.getByRole('button', { name: /자료 보기.*m1/ });
  expect(button.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(button);
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(document.querySelectorAll('.inline-stage [data-step="m1"]').length).toBe(1);
});
it('puts activity, summary and my questions below the spread in that order', () => {
  setMedia({ wide: true });
  renderLesson(makeBook({ moduleLesson: true }), 2);
  const headings = [...document.querySelectorAll('.lesson-after h2')].map((h) => h.textContent);
  expect(headings).toEqual(['탐구하기', '핵심 정리', '내 질문과 이 절']);
});
it('renders legacy lessons with per-paragraph buttons and no empty opener or summary', () => {
  setMedia({ wide: true });
  renderLesson(makeBook(), 1);
  expect(screen.getAllByRole('button', { name: /자료 보기/ })).toHaveLength(2);
  expect(screen.queryByText('생각 열기')).toBeNull();
  expect(screen.queryByRole('heading', { name: '핵심 정리' })).toBeNull();
});
it('skips buttons for unknown refs without crashing', () => { /* module 2절 첫 문단 refs=['nope', 'm1'] → 버튼은 m1 하나 */ });
it('labels schematic captions as 개념도', () => { /* DataStage에 schematic image step → figcaption이 '개념도 · '로 시작 */ });
```

  `renderLesson(book, index)`는 기존 `LessonSpread layout` 묶음의 render를 도우미로 뽑은 것이다. `@testing-library/user-event`와 `jest-dom`은 설치되어 있지 않으므로 `fireEvent`와 `getAttribute`를 쓴다(새 패키지 설치 금지).

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run tests/lesson.test.jsx` → FAIL

- [ ] **Step 3: 구현한다.**

  옛 스크롤 연동 파일과 테스트 묶음을 지운다. `grep -rn "useActiveStep\|stageIndexFor\|READING_BAND" src tests`가 아무것도 찾지 않아야 한다.

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run check:book && npm run build` → PASS / ok / 빌드 성공

- [ ] **Step 5: 브라우저 확인**

  `npm run dev`로 띄워 01-01 1절을 넓은 화면과 375px 화면에서 연다. 확인할 것:
  - 버튼으로 자료가 바뀐다.
  - 스크롤로는 자료가 바뀌지 않는다.
  - 아래 구역 순서가 맞다.
  - 콘솔 오류가 없다.

- [ ] **Step 6: 커밋**

  `git commit -m "feat(lesson): button-driven data panel and bottom inquiry/summary/question sections"`

---

### Task 4: 「내 질문과 이 절」 — 근거 붙이기 정리와 학습 중 생긴 질문

**Files:**
- Modify: `src/storage/unitRecords.js`(`toQuestion`이 `fromLessonId`를 보존)
- Modify: `src/book/qft/questions.js`
- Modify: `src/book/qft/LessonQuestions.jsx`
- Modify: `src/book/qft/UnitOpening.jsx`(Produce·Prioritize에 배지)
- Modify: `src/book/close/UnitClosing.jsx`(Revise에 참고 목록과 불러오기)
- Modify: `src/storage/resultFile.js`(형태 검사가 `fromLessonId`를 허용하는지 확인. 필요할 때만 수정)
- Test: `tests/storage.test.js`, `tests/opening.test.jsx`, `tests/closing.test.jsx`, `tests/lesson.test.jsx`

**Interfaces:**
- Consumes: Task 3의 `LessonQuestions` props `{ unit, lesson, selectedStepId }`
- Produces
  - `newQuestion(text = '', { fromLessonId = null } = {})`: 반환 객체에 `fromLessonId`가 들어간다.
  - `lessonBornQuestions(record, lessonId?): Question[]`: `filled`이고 `fromLessonId`가 있는 질문. `lessonId`를 주면 그 절의 것만 고른다.
  - `LessonQuestions` 구성
    - ① 「여는 쪽에서 고른 질문에 근거 붙이기」: 기존 기능. 자료 선택 기본값은 `selectedStepId`다.
    - ② 「이 절을 마치며 새로 생긴 질문」: textarea와 「질문 목록에 넣기」 버튼. 공백을 뺀 길이가 4 미만이면 비활성이다. 아래에 이 절에서 넣은 질문 목록을 둔다.
  - 근거 목록 항목은 메모를 보여 주고, 자료 캡션은 찾을 수 있을 때만 덧붙인다.
  - 배지 문구는 `학습 중 생긴 질문`(`className="badge"`)이다.
  - Revise 단계
    - 「학습하며 생긴 질문」 목록을 보여 주고, 항목마다 「불러오기」 버튼을 둔다.
    - 불러오면 `revisedQuestion = questionText(q)`가 된다.
    - 이 목록이 비었으면 구역을 렌더하지 않는다.

- [ ] **Step 1: 실패하는 테스트 작성**

```js
// tests/storage.test.js
it('keeps fromLessonId through normalize and result-file round trip', () => {
  const record = normalizeUnitRecord('03-01', { questions: [{ ...newQuestion('왜 줄까?', { fromLessonId: 'lesson-03-01-2' }) }] });
  expect(record.questions[0].fromLessonId).toBe('lesson-03-01-2');
  const parsed = parseResultFile(JSON.stringify(buildResultFile(record, { /* 기존 테스트 인자 */ })));
  expect(parsed.ok).toBe(true);
  expect(parsed.result.record.questions[0].fromLessonId).toBe('lesson-03-01-2');
});
it('defaults fromLessonId to null for old records', () => {
  expect(normalizeUnitRecord('03-01', { questions: [{ id: 'a', text: 'x' }] }).questions[0].fromLessonId).toBeNull();
});
// tests/lesson.test.jsx
it('adds a lesson-born question and disables the button for blank input', async () => { /* 공백만 → disabled, '인구는 왜 줄까' → 클릭 후 record.questions에 fromLessonId='lesson-01-01-2' */ });
it('shows old evidence whose stepId no longer exists as a note only', () => { /* evidence {stepId:'gone', note:'메모'} → '메모' 보임, 오류 없음 */ });
// tests/opening.test.jsx
it('badges lesson-born questions in produce and prioritize', () => { /* fromLessonId 있는 질문 → '학습 중 생긴 질문' 배지 */ });
// tests/closing.test.jsx
it('loads a lesson-born question into the revise box', async () => { /* '불러오기' 클릭 → textarea 값이 그 질문 */ });
```

  `parseResultFile`의 실제 반환 형태는 기존 storage 테스트를 따라 맞춘다. 단언은 바꾸지 않는다.

- [ ] **Step 2: 실행해 실패 확인**

  `npx vitest run` → 새 테스트 FAIL

- [ ] **Step 3: 구현**

- [ ] **Step 4: 실행해 통과 확인**

  `npx vitest run && npm run build` → PASS

- [ ] **Step 5: 커밋**

  `git commit -m "feat(qft): lesson-born questions and evidence panel tied to selected data"`

---

### Task 5: 본문 구성 지침과 시범 준비

**Files:**
- Modify: `content/textbook-style.md`(「본문 구성」 절 추가)
- Create: `STUDY_ROOT/coordination/requests/v2-module-03-01-data.md`
- Create: `STUDY_ROOT/coordination/requests/v2-module-03-01-text.md`
- Create(스크래치): 스크래치 디렉터리의 `copy-guard.py`, `numbers.mjs` 갱신

**Interfaces:**
- Produces
  - 「본문 구성」 절: 설계 문서 5장의 표와 글쓰기 기준을 그대로 옮기고, 전후 예시 1쌍을 붙인다.
    - 전: "이 지도는 65세 이상 비율을 보여 준다…"
    - 후: 개념을 정의 → 까닭 → 자료 확인 안내 순서로 쓴 문단
  - `copy-guard.py <textbook.pdf> <first page> <last page> <files...>`
    - 교과서 쪽 텍스트와 대상 파일에서 공백을 모두 지운다.
    - 연속 20자 이상 일치하는 구간을 찾아 출력한다. 있으면 종료 코드 1이다.
    - 교과서 텍스트는 스크래치에만 둔다.
  - `numbers.mjs`가 `[[id]]` 표식을 지운 뒤 숫자를 센다(`d1`의 1을 숫자로 세지 않는다).
  - 자료 요청서(`v2-module-03-01-data.md`)
    - 입력: 교과서 PDF 126–135쪽 읽기 전용. 경로는 `literature/교과서/천재_고_세계시민과 지리(김민성)_교과서 (1).pdf`
    - 산출
      1. `content/textbook-map/03-01.yaml`: 절별 학습 목표 취지, 소주제 목록, 소주제별 교과서 자료 종류, 쪽수. 문장은 옮기지 않는다.
      2. 소주제별 기존 자료 재사용·신규 수집 판단표
      3. 신규 자료 스크립트·JSON·manifest·sources·README 대조표. 후보 지표는 다음과 같다.
         - WDI `SP.DYN.CBRT.IN`, `SP.DYN.CDRT.IN`, `SP.POP.DPND.YG`, `SP.POP.DPND.OL`, `SL.AGR.EMPL.ZS`, `SL.IND.EMPL.ZS`, `SL.SRV.EMPL.ZS`, `SM.POP.NETM`
         - WPP 2024 세계 총인구 추계·전망(1950–2100 중위)
         - 최종 선택은 대응표에 근거한다.
      4. 인구 변천 모형 개념도 SVG(`public/images/03-01/`)와 provenance 항목
    - 규칙: Global Constraints. 결측 보존, 잠정치 제외, 각 JSON은 1MB 미만
  - 본문 요청서(`v2-module-03-01-text.md`)
    - 입력: 대응표, 자료 산출물, 문체 지침, 설계 문서 5·7장
    - 산출: `content/book/03-01/lesson-1..3.md`를 module 형식으로 다시 쓴다(`label`, `opener`, `summary`, `textbookRef` 포함). 활동(`activity`)은 새 소주제에 맞게 고치되 템플릿 4종 안에서 고른다.
    - `teacher.md` 갱신. `unit.yaml`은 본문 수치가 바뀐 경우에만 고친다.
    - 각 본문 숫자가 어느 자료 파일의 어느 값인지 대조표를 보고서에 낸다.

- [ ] **Step 1:** 지침 절과 두 요청서, 스크래치 도구를 작성한다.

- [ ] **Step 2: 확인**

  `node <scratch>/numbers.mjs . 03-01`이 기존 03-01에서 지금과 같은 결과를 낸다(회귀 없음).

  `python3 -I <scratch>/copy-guard.py "<pdf>" 126 135 content/book/03-01/*.md`가 기존 본문에서 실행되고 결과를 출력한다.

- [ ] **Step 3: 커밋**

  `git commit -m "docs(style): lesson module writing rules"`(지침 파일만)

---

### Task 6: 03-01 교과서 대응표와 새 자료(Codex 위임 → 검수)

**Files:**
- Create(Codex): `content/textbook-map/03-01.yaml`, `scripts/data/03-01/*.py`(신규), `public/data/03-01/*.json`(신규), `public/images/03-01/*.svg`
- Modify(Codex): `content/manifests/03-01.yaml`, `content/sources/03-01.yaml`, `content/provenance/unit3.yaml` 또는 해당 provenance 파일, `scripts/data/03-01/README.md`
- Create: `STUDY_ROOT/coordination/handoffs/v2-module-03-01-data-handoff.md`, 검수 메모 `…-data-review.md`

**Interfaces:**
- Consumes: Task 5의 자료 요청서
- Produces: Task 7이 쓸 자료 id·경로 목록(검수 메모의 표)과 개념도 경로

- [ ] **Step 1:** Codex를 실행한다(Global Constraints의 명령, 백그라운드). 끝나면 handoff를 읽는다.
- [ ] **Step 2: 검수**
  - 신규 지표마다 표본 3개국 값을 World Bank·UN API에서 직접 다시 조회해 JSON과 대조한다.
  - 이용 조건 표기를 확인한다.
  - 개념도 SVG를 이미지로 열어 수치 눈금이 없는지, 글자가 14px 이상인지 확인한다.
  - 대응표에 교과서 문장이 없는지 `copy-guard.py`로 확인한다.
  - 문제는 직접 고치거나 Codex resume으로 고친다.
- [ ] **Step 3: 확인**

  `npm run check:book && npx vitest run` → ok / PASS(본문은 아직 legacy)

- [ ] **Step 4: 커밋**

  `git commit -m "data(03-01): textbook topic map, new WDI/WPP data and demographic transition diagram (drafted by Codex, reviewed)"`

---

### Task 7: 03-01 본문 재작성(Codex 위임 → 검수)

**Files:**
- Modify(Codex): `content/book/03-01/lesson-1.md`, `lesson-2.md`, `lesson-3.md`, `teacher.md`(필요 시 `unit.yaml`)
- Create: `STUDY_ROOT/coordination/handoffs/v2-module-03-01-text-handoff.md`, 검수 메모 `…-text-review.md`

**Interfaces:**
- Consumes: Task 6 자료 목록, Task 1·2 형식 규칙

- [ ] **Step 1:** Codex를 실행하고 handoff를 읽는다.
- [ ] **Step 2: 검수**
  - 확인 명령
    - `npm run check:book` → ok. 03-01 세 절이 module로 검사된다.
    - `node <scratch>/numbers.mjs . 03-01` → 모든 숫자가 자료와 일치한다.
    - `python3 -I <scratch>/copy-guard.py "<pdf>" 126 135 content/book/03-01/*.md` → 일치 0건
  - 절 세 개를 끝까지 읽고 확인한다.
    - 문단이 자료 개요가 아니라 개념 설명으로 시작하는가
    - 버튼 앞 문장이 무엇을 확인할지 안내하는가
    - 민감 주제(이주민)를 행위 주체로 서술하는가
    - 자료의 한계를 절마다 한 번만 밝히는가
  - 직접 고치거나 Codex resume으로 고친다.
- [ ] **Step 3: 확인**

  `npx vitest run && npm run build` → PASS / 성공

- [ ] **Step 4: 커밋**

  `git commit -m "content(03-01): rewrite as textbook-aligned learning modules (drafted by Codex, reviewed)"`

---

### Task 8: 브라우저 확인, 전체 검토, 기록

**Files:**
- Create: `STUDY_ROOT/coordination/textbook-v2-module-pilot-2026-11-27.md`
- Modify: `STUDY_ROOT/brief.md`, `research/studies/index.md`

- [ ] **Step 1: 브라우저 확인**

  03-01 세 절과 다른 중단원 legacy 절 하나를 넓은 화면과 375px 화면에서 연다. 확인할 것:
  - 모든 버튼이 맞는 자료를 연다.
  - 개념도가 제대로 보인다.
  - 아래 구역 순서가 맞다.
  - 새 질문이 여는 쪽 배지와 마무리 쪽 불러오기에 나타난다.
  - 콘솔 오류가 없다.

- [ ] **Step 2: 전체 브랜치 검토**

  새 검토자(가장 뛰어난 모델)에게 다음을 넘긴다.
  - 설계 문서, 이 계획, 브랜치 차이
  - Review Focus 다섯 줄
  - 결정(ruling) 목록

  Critical·Important 판정은 테스트 먼저(RED→GREEN)로 고친다.

- [ ] **Step 3: 확인**

  `npx vitest run && npm run check:book && npm run build` → 모두 통과

- [ ] **Step 4: 기록 작성 후 커밋**

  `git commit -m "docs: lesson module pilot record"`(저장소 안 파일만 해당. STUDY_ROOT 기록은 저장소 밖)

- [ ] **Step 5:** 연구자에게 03-01을 보여 주고, 형식 확정과 나머지 12개 중단원 확산 여부를 묻는다. 병합·푸시는 요청이 있을 때만 한다.
