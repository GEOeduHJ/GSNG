# 디지털 교과서 v2 골격 + 시범 중단원 01-01 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 펼침면·스크롤 연동·중단원 QFT·결과 파일·교사 모아보기를 갖춘 v2 골격을 세우고, 중단원 01-01(세계화와 세계시민, 절 3개)을 실제 자료로 끝까지 완성해 연구자 검토에 넘긴다.

**Architecture:** 콘텐츠는 `content/book/<중단원>/`의 마크다운+YAML 머리말로 쓰고 빌드 시 `import.meta.glob`으로 읽는다. 순수 함수(파서·검증·저장·결과 파일·요약)는 Vitest로 검증하고, 화면은 해시 라우팅 React 앱(`src/book/`)으로 새로 만든다. v1의 MapLibre·ECharts·Cytoscape 부품과 1단원 청문회 실습은 옮겨 온다. 본문·자료·삽화·개념 사전은 Codex CLI 작업(T10~T13)으로 만들고 Claude가 검수한다.

**Tech Stack:** React 19.3.1, Vite 8.3.8, MapLibre GL 6.19.0, ECharts 6.1.0, Cytoscape 3.35.0, `yaml`(머리말 파싱), Vitest + jsdom + @testing-library/react(테스트), Python 3(자료 가공), Codex CLI 0.172.0(`gpt-6-luna`, `max`).

**Spec:** `docs/superpowers/specs/2026-11-26-textbook-v2-redesign-design.md` (2026-11-26 승인)

## Global Constraints

- 작업 브랜치: `redesign/v2`(`platform/web-prototype` 저장소). `main` 병합과 `git push`는 연구자가 요청할 때만 한다.
- 사이트 실행 중 생성형 AI·외부 API 호출 0회. 외부 Gemini 링크는 학생이 새 질문을 만든 뒤에만 보인다.
- 화면용 CSS(`src/book/**/*.css`)에 `font-size` 14px 미만 금지. 본문 17~18px, 행간 1.75 이상.
- 라벨·배지·눈썹 제목(eyebrow) 금지. 쪽 번호·절 번호만 둔다. 반복 안내문과 연구상 면책은 `#/help` 한 곳에 모은다. 모식 자료는 해당 캡션에 반드시 "모식 자료"라고 적는다.
- 펼침면 기준 폭 1024px. 그보다 좁으면 글 → 자료 → 활동 순으로 세로 배치하고 고정(sticky)을 끈다.
- 절 본문 4~6문단, 문단마다 자료 단계 하나. 절당 자료 단계 2~4개.
- 질문 초점 문장에 물음표(`?`, `？`)를 쓰지 않는다. 학생의 첫 질문 전에 예시 질문(교사·AI)을 보여 주지 않는다.
- 지도·그래프·표의 수치와 위치는 실제 공개 자료다. 허구 상황은 활동 첫머리에 "가상 상황"이라고 밝히고, 그 안의 수치도 실제 자료에서 가져온다.
- 모든 자료 파일은 `content/data-manifest.yaml`에, 모든 삽화는 `content/image-provenance.yaml`에 항목이 있어야 한다.
- 개념 ID는 공개 뒤 바꾸거나 지우지 않는다. 변경은 `content/concepts.yaml`의 `aliases`로만 한다.
- 학생 기록은 localStorage에만 둔다. 결과 파일 스키마 이름 `gsng-unit-result`, `schemaVersion: 1`. 교사 페이지는 파일을 어디에도 업로드·저장하지 않는다.
- 스크롤 위치·체류 시간을 기록하지 않는다.
- 연구 기록(지시서·결과 보고)은 `STUDY_ROOT/coordination/requests/`와 `coordination/handoffs/`에 둔다. `STUDY_ROOT` = `/Users/geo_hj/Desktop/논문 작성 자동화/research/studies/world-citizenship-geography-platform`.

## Review Focus

1. **localStorage가 막힌 기기(시크릿 모드, 학교 정책)**: 앱이 멈추지 않고 학습을 계속할 수 있어야 하며, 도움말에 "이 기기에서는 기록이 저장되지 않음"을 한 번 알리고 결과 파일 내보내기는 그대로 동작해야 한다. → T3 테스트 `survives throwing storage`, T4 테스트 `shows storage notice once`.
2. **교사가 잘못된 파일을 끌어다 놓음(다른 JSON, 깨진 JSON, 다른 중단원, 같은 학생 두 번)**: 정상 파일은 요약되고, 잘못된 파일은 이유와 함께 목록에 남아야 한다. → T9 테스트 `skips invalid files with reasons`, `keeps latest duplicate`.
3. **질문을 만들기 전에 절로 바로 들어간 학생**: 절 화면이 깨지지 않고 "여는 쪽에서 질문을 먼저 만들어 보세요" 링크를 보여 주며 근거 붙이기는 비활성이어야 한다. → T7 테스트 `lesson works without questions`.
4. **학교망에서 자료 파일 로드 실패**: 지도·그래프 자리에 캡션, 텍스트 대체 설명, 값 표가 남아 학습이 이어져야 한다. → T5 테스트 `data stage falls back on fetch failure`.
5. **좁은 화면·움직임 줄이기 설정**: 1024px 미만에서 세로 배치와 고정 해제, `prefers-reduced-motion`에서 전환 효과 0. → T5 테스트 `stacks below 1024px`, `no transition with reduced motion`.

---

## 파일 구조

```
content/
  book/toc.yaml                    # 4 대단원 / 13 중단원 / 41 절 제목·ID (v1 bookIndex에서 옮김)
  book/01-01/unit.yaml             # 여는·닫는 펼침면, 성취기준, 개념, 질문 초점, 전이 과제
  book/01-01/lesson-1.md … lesson-3.md   # 머리말(steps, keyTerms, activity, sourceIds) + 본문 문단
  book/01-01/teacher.md            # 교사용 안내(발문·예상 질문·시간·오개념)
  concepts.yaml                    # 개념 사전 { id: {label, definition, units[], aliases[]} }
  sources.yaml                     # 출처 레지스트리 (v1 sources.js에서 옮김)
  data-manifest.yaml               # 자료 파일 메타데이터
  image-provenance.yaml            # 삽화 기록
  illustration-style.md            # 삽화 양식 지침
public/data/01-01/*.json|geojson   # 정적 자료 (T11)
public/images/01-01/*.webp         # 삽화 (T13)
scripts/check-book.mjs             # 구조 검사 CLI
scripts/data/01-01/*.py            # 자료 가공 스크립트 (T11)
src/main.jsx                       # 새 App으로 전환 (T14)
src/content-loader/parse.js        # parseFrontmatter, parseLesson, parseUnit
src/content-loader/loadBook.js     # getBook()
src/content-loader/validate.js     # validateBook()
src/storage/unitRecords.js         # v4 기록, v3 이전
src/storage/resultFile.js          # 결과 파일 생성·파싱
src/book/App.jsx, router.js        # 해시 라우팅
src/book/book.css                  # 디자인 토큰·지면
src/book/Spread.jsx, TableOfContents.jsx, ConceptMap.jsx, HelpPage.jsx
src/book/lesson/LessonSpread.jsx, useActiveStep.js, DataStage.jsx
src/book/qft/UnitOpening.jsx, LessonQuestions.jsx
src/book/close/UnitClosing.jsx
src/activities/registry.js, LayerCompare.jsx, EvidenceSort.jsx, DecisionMatrix.jsx, CivicHearing.jsx
src/viz/DataMap.jsx, DataChart.jsx
src/teacher/TeacherPage.jsx, summarize.js, TeacherGuide.jsx
tests/*.test.js(x)
```

v1 파일(`src/App.jsx`, `src/components/`, `src/modules/`, `src/content/units/`, `src/styles.css`)은 이 계획에서 지우지 않는다. T14에서 `main.jsx`만 새 앱으로 바꾼다. 삭제는 연구자 검토(3단계) 뒤 확산 계획에서 다룬다.

---

### Task 1: 브랜치·테스트 도구·콘텐츠 파서

**Files:**
- Modify: `package.json` (scripts `test`, `check:book`; devDeps `vitest`, `jsdom`, `@testing-library/react`; dep `yaml`)
- Create: `vite.config.js` 수정(`test: { environment: 'jsdom' }`), `src/content-loader/parse.js`, `content/book/toc.yaml`, `tests/parse.test.js`

**Interfaces:**
- Produces:
  - `parseFrontmatter(text: string) -> { data: object, body: string }`
  - `parseLesson(text: string, meta: {unitId: string, index: number}) -> Lesson`
    - `Lesson = { id: 'lesson-01-01-1', unitId, index, title, goal, paragraphs: string[], steps: Step[], keyTerms: string[] (concept IDs), activity: {template: string, config: object, fictional: boolean}, sourceIds: string[], illustration?: {src, alt} }`
    - `Step = { id: string, type: 'map'|'chart'|'image'|'text', data?: string (public 경로), config: object, caption: string, source: string (manifest ID), alt: string, schematic: boolean, concepts: string[] }`
  - `parseUnit(yamlText: string) -> Unit` = `{ id: '01-01', standardCode: '12세지01-01', title, goal, concepts: string[], opening: {intro, illustration?, focus: {kind:'map'|'chart'|'image', step: Step}}, closing: {summary, bridge, transfer: {prompt, step?: Step}}, lessons: [] }`
  - `content/book/toc.yaml` = `parts: [{id, numeral, title, units: [{id, title, standardCode, lessons: [{index, title}]}]}]`

- [ ] **Step 1:** `git checkout -b redesign/v2` 후 `npm i -D vitest jsdom @testing-library/react && npm i yaml`. 기대: `package.json`에 반영.
- [ ] **Step 2: 실패 테스트 작성** — `tests/parse.test.js`
  - `parseFrontmatter('---\na: 1\n---\n본문')` → `{data:{a:1}, body:'본문'}`
  - `parseLesson`이 빈 줄로 문단을 나누고 `steps[i]`를 `paragraphs[i]`에 대응시킨다: 문단 4개·steps 4개 입력 → `lesson.paragraphs.length === 4`, `lesson.steps[2].id === 's3'`
  - 머리말 없는 입력 → `Error('frontmatter missing')`
  - `parseUnit`이 `id`, `opening.focus.step`, `closing.transfer.prompt`를 돌려준다
- [ ] **Step 3:** `npx vitest run tests/parse.test.js` → FAIL(모듈 없음)
- [ ] **Step 4:** `src/content-loader/parse.js` 구현. 머리말은 `yaml` 패키지의 `parse`로 읽는다.
- [ ] **Step 5:** `content/book/toc.yaml`을 v1 `src/content/bookIndex.js`·`src/content/units/unit-0*.js`의 대단원·중단원·절 제목과 순서 그대로 작성한다(4/13/41). 테스트 `toc has 4 parts, 13 units, 41 lessons` 추가.
- [ ] **Step 6:** `npx vitest run` → PASS
- [ ] **Step 7:** 커밋 `feat(v2): add content parser and table of contents`

### Task 2: 구조 검사

**Files:**
- Create: `src/content-loader/validate.js`, `src/content-loader/loadBook.js`, `scripts/check-book.mjs`, `content/sources.yaml`, `content/data-manifest.yaml`(빈 `items: []`), `content/image-provenance.yaml`(빈 `items: []`), `content/concepts.yaml`(01-01 임시 3개: `interdependence`, `scale`, `glocalization` — T10에서 교체), `tests/validate.test.js`

**Interfaces:**
- Consumes: T1 `parseLesson`, `parseUnit`
- Produces:
  - `validateBook(book: {toc, units: Unit[]}, refs: {concepts, sources, manifest, provenance}, opts: {fullUnits: string[]}) -> string[]` (오류 메시지 목록, 빈 배열이면 통과)
  - `checkCssFontSizes(cssText: string, minPx = 14) -> string[]`
  - `getBook() -> {toc, units, concepts, sources, manifest, provenance}` (브라우저, `import.meta.glob('/content/**/*', {query:'?raw', import:'default', eager:true})`)
  - CLI: `npm run check:book` → 오류 있으면 목록 출력 후 종료 코드 1

- [ ] **Step 1: 실패 테스트** — 각 규칙을 하나씩 어기는 픽스처로 다음 오류 문자열 포함을 단언:
  - 문단 3개 → `'01-01 lesson 1: paragraphs 3 (need 4-6)'`
  - 문단 5개·steps 4개 → `'steps/paragraphs mismatch'`
  - 절당 고유 자료 단계(`type !== 'text'`) 1개 또는 5개 → `'data steps'`
  - 사전에 없는 개념 ID `foo` → `'unknown concept: foo'`; `aliases`에 있는 ID는 통과
  - 없는 출처 ID → `'unknown source'`; `step.source`가 manifest에 없음 → `'unknown data source'`
  - `step.data`가 있는데 manifest `items[].path`와 일치하지 않음 → `'data file not in manifest'`
  - `illustration.src`가 provenance에 없음 → `'image without provenance'`
  - 질문 초점 캡션·본문에 `?` 또는 `？` → `'question mark in focus'`
  - `opts.fullUnits`에 없는 중단원은 toc 존재만 검사
  - `checkCssFontSizes('.a{font-size:13px}')` → 1건, `'.a{font-size:14px}'` → 0건, `rem` 단위는 16px 기준 환산
- [ ] **Step 2:** `npx vitest run tests/validate.test.js` → FAIL
- [ ] **Step 3:** `validate.js`, `loadBook.js` 구현. `scripts/check-book.mjs`는 Node `fs`로 `content/`를 읽고 같은 `parse`·`validate`를 호출하며, `src/book/**/*.css`에 `checkCssFontSizes`를 적용한다. `fullUnits = ['01-01']`.
- [ ] **Step 4:** `content/sources.yaml`을 v1 `src/content/sources.js`의 `SOURCES`에서 같은 ID·필드로 옮긴다.
- [ ] **Step 5:** `npx vitest run` PASS, `npm run check:book`은 01-01 콘텐츠가 아직 없으므로 `'01-01: unit.yaml missing'`으로 실패하는 것이 기대값.
- [ ] **Step 6:** 커밋 `feat(v2): add book structure validation`

### Task 3: 학생 기록과 결과 파일

**Files:**
- Create: `src/storage/unitRecords.js`, `src/storage/resultFile.js`, `tests/storage.test.js`

**Interfaces:**
- Consumes: v1 저장 키 `world-citizenship-geography-digital-textbook-v2`(version 2·3 구조, `src/storage/learning-records.js` 참조)
- Produces:
  - `STORAGE_KEY_V4 = 'gsng-textbook-v4'`
  - `emptyUnitRecord(unitId: string) -> UnitRecord`
    - `UnitRecord = { unitId, displayName: '', questions: Question[], priorityReason: '', nextStepPlan: '', evidence: Evidence[], explanation: {questionId: '', claim: '', reasoning: ''}, revisedQuestion: '', transferResponse: '', reflection: '', stageTimes: {[stage: string]: isoString}, activityState: {[lessonId]: object} }`
    - `Question = { id, text, classification: ''|'닫힌'|'열린', convertedType, convertedText, selectedVersion: 'original'|'converted', selected: boolean, conceptTags: string[] }`
    - `Evidence = { id, questionId, lessonId: string|null, stepId: string|null, note }`
  - `createStore(storage: Storage|null) -> { load() -> {units: {[unitId]: UnitRecord}, available: boolean}, save(units) -> boolean }` — `storage`가 없거나 `getItem`/`setItem`이 던지면 `available:false`, 메모리로 계속 동작
  - `migrateV3(v3: object) -> {[unitId]: UnitRecord}` — 키 `'12세지01-01'` → `'01-01'`; `evidencePlan` → `nextStepPlan`; `evidenceItems[{questionId, observation}]` → `evidence[{lessonId:null, stepId:null, note: observation}]`; `claim`·`reasoning`·`reflection` 유지
  - `buildResultFile(record: UnitRecord, unit: {id, title}, now: Date) -> { schema: 'gsng-unit-result', schemaVersion: 1, exportedAt, unitId, unitTitle, displayName, questions, priorityReason, nextStepPlan, evidence, explanation, revisedQuestion, transferResponse, reflection, stageTimes }`
  - `resultFileName(record, unitId) -> string` — `gsng-<unitId>-<표시명>.json`, 표시명은 파일명 금지 문자(`/\:*?"<>|` 와 공백)를 `_`로 바꾸고 비어 있으면 `학생`
  - `parseResultFile(text: string) -> {ok: true, value} | {ok: false, reason: 'not-json'|'wrong-schema'|'unsupported-version'}`

- [ ] **Step 1: 실패 테스트** — `survives throwing storage`(getItem·setItem이 던지는 가짜 storage → `load().available === false`, `save()`가 `false`, 예외 없음); v3 픽스처 이전 결과의 필드 대응; `resultFileName({displayName:'김 하/나'}, '01-01') === 'gsng-01-01-김_하_나.json'`, 빈 이름 → `'gsng-01-01-학생.json'`; `parseResultFile('x').reason === 'not-json'`, 다른 `schema` → `'wrong-schema'`, `schemaVersion: 2` → `'unsupported-version'`; 왕복(`build` → `JSON.stringify` → `parse`) 동일성
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. `load()`는 v4가 없으면 v3 키를 읽어 `migrateV3`를 적용하고, v3 키는 지우지 않는다.
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add unit records and result files`

### Task 4: 책 껍데기 — 라우팅·지면·목차·도움말

**Files:**
- Create: `src/book/router.js`, `src/book/App.jsx`, `src/book/book.css`, `src/book/Spread.jsx`, `src/book/TableOfContents.jsx`, `src/book/ConceptMap.jsx`, `src/book/HelpPage.jsx`, `src/book/BookContext.jsx`, `tests/shell.test.jsx`

**Interfaces:**
- Consumes: T2 `getBook()`, T3 `createStore`
- Produces:
  - `parseRoute(hash: string) -> {name: 'toc'} | {name: 'open', unitId} | {name: 'lesson', unitId, index: number} | {name: 'close', unitId} | {name: 'teacher', unitId?: string} | {name: 'help'}` — 경로 `#/`, `#/u/01-01/open`, `#/u/01-01/l/1`, `#/u/01-01/close`, `#/teacher`, `#/teacher/01-01`, `#/help`; 알 수 없으면 `toc`
  - `useRoute() -> Route` (hashchange 구독)
  - `<Spread left={node} right={node} rightSticky={boolean} />` — 1024px 이상 두 쪽, 미만 세로. 쪽 번호만 표시
  - `BookContext` = `{ book, units: {[unitId]: UnitRecord}, updateUnit(unitId, updater), storageAvailable }`
  - 콘텐츠가 없는 중단원(`fullUnits` 밖)은 목차에 제목만 보이고 링크 없음

- [ ] **Step 1: 실패 테스트** — `parseRoute` 표 테스트(위 7개 경로 + `'#/x'` → toc); 목차가 대단원 4개·중단원 13개 제목을 보이고 01-01만 링크; `shows storage notice once`(storage 불가 시 도움말 페이지에 안내 1건, 다른 화면에는 없음); 학생 화면 어디에도 `#/teacher` 링크가 없음
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. `book.css`는 `:root` 토큰(종이색 배경, 명조 본문 17px→18px@1280, 고딕 캡션 14px, 대단원 강조색 4개)과 펼침면 격자를 둔다. `ConceptMap`은 Cytoscape로 중단원 노드–개념 노드를 그리고 개념 클릭 시 그 개념이 나오는 절 목록을 보인다. `HelpPage`는 저장 방식, 모식 자료 원칙, 외부 AI 이용 조건, 교사 피드백 기준이 검증 전 초안이라는 안내를 모은다.
- [ ] **Step 4:** PASS 확인, `npm run check:book`의 CSS 검사 통과
- [ ] **Step 5:** 커밋 `feat(v2): add book shell, routing and table of contents`

### Task 5: 스크롤 연동 절 지면과 자료 단계

**Files:**
- Create: `src/book/lesson/useActiveStep.js`, `src/book/lesson/LessonSpread.jsx`, `src/book/lesson/DataStage.jsx`, `src/viz/DataMap.jsx`, `src/viz/DataChart.jsx`, `tests/lesson.test.jsx`

**Interfaces:**
- Consumes: T1 `Lesson`, `Step`; T4 `Spread`
- Produces:
  - `useActiveStep(paragraphRefs: RefObject[], {enabled: boolean}) -> {active: number, pinned: boolean, pin(index), unpin()}` — `IntersectionObserver`(rootMargin `-40% 0px -50% 0px`)로 가장 최근 교차한 문단 index. `pinned`이면 스크롤로 바뀌지 않음
  - `<DataStage step={Step} onInteract={() => void} />` — `type`별 렌더. 사용자가 지도·그래프를 조작하면 `onInteract` 호출(부모가 `pin`)
  - `<DataMap geojsonUrl config={{layers: [{id, label, property, kind:'fill'|'line'|'circle', scale}], bounds}} caption source alt />` — 배경은 Natural Earth 경계 파일(T11), 타일 서버 없음
  - `<DataChart dataUrl config={{kind:'bar'|'line'|'scatter', x, y, unit, year}} caption source alt />` — 축 글자 14px
  - 자료 로드 실패 시: 캡션 + `alt` + "값 표 보기"(`<details>` 안의 표, 데이터가 없으면 manifest의 `summary`) 표시

- [ ] **Step 1: 실패 테스트** — `IntersectionObserver` 가짜 구현으로 문단 2 교차 → `active === 1`; `pin(0)` 뒤 문단 3 교차 → `active === 0`; `unpin()` 뒤 갱신 재개; `data stage falls back on fetch failure`(`fetch` 거부 → 캡션과 alt 텍스트 표시, 예외 없음); `stacks below 1024px`(`matchMedia('(min-width: 1024px)')` false → 오른쪽 쪽이 문단 사이가 아니라 본문 뒤에 순서대로, `rightSticky` false); `no transition with reduced motion`(reduced 일 때 오른쪽 쪽 `data-motion="none"`); 활동 구간에 들어가면 `enabled:false`로 연동 중지
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. 왼쪽: 절 번호·제목·목표, 문단(`ref`), 핵심 낱말(개념 사전의 label·definition), 절 삽화. 오른쪽: 현재 단계 `DataStage`, 고정 중이면 "본문과 다시 맞추기" 버튼 하나, 본문 끝 이후 활동(T7). 모식 단계(`schematic: true`)면 캡션 끝에 "모식 자료".
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add scroll-linked lesson spread and data stages`

### Task 6: 중단원 여는 펼침면 — QFT 1~6단계

**Files:**
- Create: `src/book/qft/UnitOpening.jsx`, `tests/opening.test.jsx`

**Interfaces:**
- Consumes: T1 `Unit`; T3 `UnitRecord`, `Question`; T4 `BookContext`; T5 `DataStage`
- Produces: `<UnitOpening unit={Unit} />` — 단계 `rules → produce → improve → prioritize → plan` (성찰은 T8). 단계 완료 시 `stageTimes[stage]` 기록. 이전 중단원 질문 공개 조건 `canShowCarryOver(record) -> boolean` (`questions` 중 `text`가 비지 않은 것이 1개 이상)

- [ ] **Step 1: 실패 테스트** — 처음 렌더에서 질문 입력란 외에 예시 질문 문구가 없음(교사용 문구·`?`로 끝나는 비학생 문장 0개); `produce`에서 질문 추가·수정·삭제가 `updateUnit`에 반영; `improve`에서 닫힌/열린 분류 후 바꾼 질문 입력; `prioritize`는 정확히 1~3개 선택 + 이유 4자 이상이어야 다음으로; `plan`에서 질문마다 개념 태그(중단원 `concepts` 중) 1개 이상 + 계획 한 줄; 이전 중단원(목차상 앞 중단원) 기록이 있어도 첫 질문 입력 전에는 "지난 중단원에서 남은 질문" 줄이 없고, 입력 후 나타남; 외부 Gemini 링크도 같은 조건
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. 왼쪽: 중단원 소개·풀어 쓴 목표·도입 삽화. 오른쪽: 질문 초점(`DataStage`) 위, 단계 화면 아래. `rules`는 한 줄 규칙과 "선생님 안내에 따라 시작" 버튼뿐이다. 단계 흐름 판정은 v1 `QFTFlow.jsx`의 `lessonMaxAccessibleStep`를 참고해 새로 쓴다.
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add unit opening with QFT stages`

### Task 7: 절의 질문 연결·근거 붙이기·활동 템플릿

**Files:**
- Create: `src/book/qft/LessonQuestions.jsx`, `src/activities/registry.js`, `src/activities/LayerCompare.jsx`, `src/activities/EvidenceSort.jsx`, `src/activities/DecisionMatrix.jsx`, `src/activities/CivicHearing.jsx`, `tests/activities.test.jsx`
- Modify: `src/book/lesson/LessonSpread.jsx` (본문 뒤 활동·질문 연결 영역 연결), `src/content-loader/validate.js` (템플릿 이름 검사), `tests/validate.test.js`

**Interfaces:**
- Consumes: T3 `Evidence`, `UnitRecord.activityState`; T5 `LessonSpread`, `useActiveStep`
- Produces:
  - `relatedQuestions(record: UnitRecord, lesson: Lesson, concepts) -> Question[]` — 선택된 질문 중 `conceptTags`(별칭 해석 후)가 절의 `keyTerms` 또는 단계 `concepts`와 겹치는 것
  - `<LessonQuestions lesson unit />` — 관련 질문 목록과 "이 자료를 근거로 붙이기"(현재 `stepId` + 메모 4자 이상) → `evidence` 추가. 관련 질문이 없으면 선택 질문 전체를 보여 준다
  - `ACTIVITY_TEMPLATES: {[name]: Component}` — `'layer-compare' | 'evidence-sort' | 'decision-matrix' | 'civic-hearing'`. 공통 props `{config, value, onChange, fictional: boolean}`. `fictional`이면 활동 첫 줄에 "가상 상황" 문장
  - `CivicHearing`은 v1 `CivicHearingLab.jsx`와 `lesson-01-01-03.js`의 `data.actors`·`levels`를 옮기되, `eyebrow`와 장식 클래스를 쓰지 않는다

- [ ] **Step 1: 실패 테스트** — `lesson works without questions`(질문 0개 → 여는 쪽 링크, 근거 버튼 비활성, 예외 없음); `relatedQuestions`가 별칭 태그도 매칭; 근거 붙이기 후 `evidence[0]`에 `lessonId`·`stepId` 저장; 각 템플릿이 `onChange`로 상태를 돌려주고 다시 렌더해도 유지; `fictional:true` → "가상 상황" 문장 존재; 등록되지 않은 템플릿 이름 → 검사(T2)에서 `'unknown activity template'` 오류(validate에 규칙 추가)
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. 활동 상태는 `activityState[lessonId]`에 저장.
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add lesson question links, evidence and activity templates`

### Task 8: 중단원 닫는 펼침면

**Files:**
- Create: `src/book/close/UnitClosing.jsx`, `tests/closing.test.jsx`

**Interfaces:**
- Consumes: T3 `buildResultFile`, `resultFileName`; T6·T7 기록
- Produces: `<UnitClosing unit />` — 단계 `explain → revise → transfer → reflect → export`. `explain`은 선택 질문 하나 + 주장 + 근거(`evidence`에서 1개 이상 선택) + 추론. 내보내기는 `Blob` 다운로드(`resultFileName`)와 "표시명" 입력

- [ ] **Step 1: 실패 테스트** — 근거가 0개면 `explain` 다음 단계가 막히고 "절에서 근거를 먼저 붙여 보세요" 안내; `revise`에 원 질문이 미리 채워짐; 전이 과제 화면이 중단원 `closing.transfer`를 보여 주고 연구 측정 문구(“사전·사후”)가 없음; `export` 클릭 시 `URL.createObjectURL`에 넘긴 JSON이 `parseResultFile`로 `ok`; storage 불가여도 내보내기 동작
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현. 왼쪽: 정리·다음 중단원 연결 문장. 오른쪽: 단계 화면.
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add unit closing and result export`

### Task 9: 교사 페이지 — 모아보기와 교사용 안내

**Files:**
- Create: `src/teacher/summarize.js`, `src/teacher/TeacherPage.jsx`, `src/teacher/TeacherGuide.jsx`, `tests/teacher.test.js`

**Interfaces:**
- Consumes: T3 `parseResultFile`; T2 `getBook().concepts`
- Produces:
  - `summarizeResults(files: {name, text}[], unitId: string, concepts) -> { students: Row[], skipped: {name, reason}[], closedOpen: {closed, open, unclassified}, conceptCounts: {[conceptId]: number}, unsupported: string[] (displayName), priorityQuestions: {displayName, text}[] }`
  - 건너뛰는 이유: `parseResultFile`의 이유, `'other-unit'`; 같은 `displayName`은 `exportedAt`이 늦은 것만 남기고 앞 것은 `skipped`에 `'duplicate-older'`
  - `<TeacherPage unitId? />` — 파일 끌어다 놓기·선택, 요약 표, 학생별 질문 흐름(원 질문 → 바꾼 질문 → 선택 → 근거 → 설명 → 다듬은 질문), 인쇄(`window.print`, 인쇄용 CSS). 상태는 메모리에만
  - `<TeacherGuide unitId />` — `content/book/<unitId>/teacher.md` 렌더(발문·예상 질문·시간 배분·오개념)

- [ ] **Step 1: 실패 테스트** — `skips invalid files with reasons`(깨진 JSON, 다른 schema, 다른 중단원 각 1개 + 정상 2개 → students 2, skipped 3 이유 일치); `keeps latest duplicate`; 닫힌/열린 집계; 별칭 개념 태그가 정식 ID로 합산; 근거 없는 설명 학생 목록; 페이지가 `fetch`·`localStorage.setItem`을 호출하지 않음(spy)
- [ ] **Step 2:** FAIL 확인
- [ ] **Step 3:** 구현
- [ ] **Step 4:** PASS 확인
- [ ] **Step 5:** 커밋 `feat(v2): add teacher collection page and guide`

---

## Codex 작업 (T10~T13)

공통 실행 방식(지시서는 Claude가 작성):

```bash
codex exec --skip-git-repo-check -C "<web-prototype 경로>" --sandbox workspace-write \
  -c sandbox_workspace_write.network_access=true \
  -o "$STUDY_ROOT/coordination/handoffs/<작업명>-2026-11-xx.md" \
  - < "$STUDY_ROOT/coordination/requests/<작업명>-2026-11-xx.md"
```

- 지시서에는 다음을 넣는다.
  - 설계 문서·이 계획의 해당 절
  - 쓰기 허용 경로
  - 금지 사항: 커밋·푸시·패키지 설치·`src/` 수정 금지, 출처 없는 수치·지어낸 문헌 금지
  - 결과 보고 형식(`research/templates/agent-handoff.md`)
- 실행은 `run_in_background`로 한다. T10·T11·T13은 T2 직후 동시에 시작할 수 있다(쓰기 경로가 겹치지 않음). T12는 T10·T11 검수 뒤 시작한다.
- Claude 검수는 끝난 즉시 한다.
  - 수치는 원 자료와 표본 대조한다.
  - 출처 URL과 라이선스는 직접 연다.
  - 본문의 사실 진술은 출처와 대조한다.
  - `npm run check:book`을 돌린다.
  - 통과한 것만 커밋하고, 커밋 메시지에 `(drafted by Codex, reviewed)`를 적는다.

### Task 10 (Codex): 개념 사전 13개 중단원 초안

- **쓰기 경로:** `content/concepts.yaml`
- **입력:**
  - `STUDY_ROOT/method/achievement-standard-platform-map-2026-11-11.md`
  - 교육과정 원문 `/Users/geo_hj/Downloads/[별책7] 사회과 교육과정 (1).pdf`(「세계시민과 지리」 부분)
  - `content/book/toc.yaml`
- **산출:**
  - 중단원당 3~6개 개념, 형식은 `{id(영문 kebab), label(한국어), definition(한 문장, 자체 작성), units: ['01-01', …], basis: '교육과정 핵심 아이디어/내용 요소 인용 위치(쪽)', aliases: []}`
  - 여러 중단원에 걸치는 개념은 하나의 ID로 묶는다.
- **Claude 검수:**
  - 교육과정 근거 쪽 표본 대조
  - ID 중복·의미 중복 정리
  - T2의 임시 3개 ID를 보존한다(별칭 처리).
  - 검사 통과 후 커밋한다.

### Task 11 (Codex): 01-01 실제 자료

- **쓰기 경로:** `scripts/data/01-01/`, `public/data/01-01/`, `public/data/base/`, `content/data-manifest.yaml`
- **자료 요구:**
  - 배경 경계: Natural Earth 1:110m Admin 0(공개 도메인)을 단순화한 GeoJSON → `public/data/base/countries-110m.geojson`
  - 절 1(세계화의 의미·스케일): 국가별·연도별 비교 가능한 공개 지표 2종. 후보는 World Bank WDI의 무역 비중(`NE.TRD.GNFS.ZS`)과 인터넷 이용률(`IT.NET.USER.ZS`)이며, CC BY 4.0을 확인한다. 1개 이상은 지도용, 1개 이상은 그래프용으로 만든다.
  - 절 2(세계화에 대한 지역의 대응): 실제 사례 지역 1곳의 공개 통계(예: 관광객 수, 산업 구성의 시계열)와 위치. 후보 2곳을 이유·출처와 함께 보고서에 제시한다. 최종 선택은 Claude 검수에서 정한다.
  - 절 3(세계시민의 역할, 가상 청문회): 의류·섬유 무역의 실제 수출입 통계(국가 단위, 공개 이용 조건 확인). 가상 상황 안에서 제시할 수치로 쓴다.
- **스크립트 요구:**
  - 원자료를 받는 URL과 받은 날짜를 기록한다.
  - 원자료는 저장소에 넣지 않는다.
  - 산출 파일은 1MB 이하여야 한다.
- **manifest 항목:** `{id, path, title, organization, url, retrievedAt, license, script, unit, year, summary}`
- **Claude 검수:**
  - 각 자료에서 3개 값을 원 사이트와 대조한다.
  - 라이선스 페이지를 확인한다.
  - 분쟁 지역 경계 표기를 점검하고, 필요하면 캡션 문장을 정한다.
  - 절 2의 사례 지역을 선택한다.

### Task 12 (Codex): 01-01 본문·여는/닫는 펼침면·교사용 안내

- **쓰기 경로:** `content/book/01-01/`
- **입력:**
  - 설계 문서 4·5·6절
  - `content/concepts.yaml`, `content/data-manifest.yaml`(T10·T11 검수본)
  - v1 `src/content/units/unit-01.js`의 01-01 절(재작성 대상, 문장 재사용 금지)
  - v1 `src/lesson-modules/unit-01/lesson-01-01-0*.js`
- **산출:**
  - `unit.yaml`: 질문 초점(실제 자료 단계, 물음표 없음), 전이 과제(새 지역 사례)
  - `lesson-1.md` ~ `lesson-3.md`: 4~6문단, steps는 manifest 자료만 사용, `activity.template`는 T7의 네 템플릿 중 하나, 절 3은 `civic-hearing` + `fictional: true`
  - `teacher.md`: 발문, 예상 학생 질문, 50분 기준 시간 배분, 오개념
- **문체:**
  - `research/writing-style-guide.md`를 따르는 고등학생 대상 설명문으로 쓴다.
  - 필수 영어 용어는 `English(한글 풀이)`로 쓴다.
  - 사실 진술마다 `sourceIds`를 단다.
- **Claude 검수:**
  - 사실 진술을 전수 대조한다.
  - `npm run check:book` 통과를 확인한다.
  - 펼침면에 띄워 문단–자료 대응을 확인한다.

### Task 13 (Codex): 삽화 시험과 01-01 삽화

- **쓰기 경로:** `content/illustration-style.md`, `public/images/01-01/`, `content/image-provenance.yaml`
- **1단계:** 양식 지침을 작성하고 시험 삽화 1장을 만든다(중단원 01-01 도입). 생성 실패나 품질 미달이면 그 사실과 오류를 보고서에 쓰고 멈춘다.
- **2단계(1단계 통과 시):**
  - 중단원 도입 1장과 개념 삽화 0~3장을 만든다.
  - 형식은 WebP, 가로 1600px 이하다.
  - 이미지 안에 글자를 넣지 않는다. 지도, 국기, 실존 인물, 분쟁·재난 장면도 넣지 않는다.
- **provenance 항목:** `{src, prompt, model, createdAt, usedIn, alt}`
- **Claude 검수:**
  - 검수 항목(지명·국기·경계, 글자 깨짐, 실존 인물·상표, 고정관념)으로 확인한다.
  - 통과한 이미지만 `unit.yaml`·`lesson-*.md`의 `illustration`에 연결한다.
  - 실패하면 삽화 없이 진행하고 사실을 기록한다.

---

### Task 14: 통합·화면 확인·연구 기록

**Files:**
- Modify: `src/main.jsx`(새 `src/book/App.jsx`와 `book.css`로 전환), `README.md`(v2 실행·검사 방법)
- Create: `STUDY_ROOT/coordination/textbook-v2-pilot-2026-11-xx.md`

- [ ] **Step 1:** `npx vitest run` → 전부 PASS
- [ ] **Step 2:** `npm run check:book` → 오류 0
- [ ] **Step 3:** `npm run build` → 성공, `dist/` 번들에 `content/book/01-01` 본문 포함 확인
- [ ] **Step 4:** `npm run dev` 후 브라우저에서 아래를 확인하고 각각 화면 캡처를 연구 기록에 남긴다.
  - 1280px·1024px·768px 폭
  - 목차 → 여는 펼침면 QFT 전 단계 → 절 3개(스크롤 연동, 고정·해제, 근거 붙이기, 활동) → 닫는 펼침면 → 파일 내보내기
  - 내보낸 파일 2개와 깨진 파일 1개를 `#/teacher/01-01`에 끌어다 놓고 요약 확인
  - 키보드만으로 여는 펼침면부터 내보내기까지 진행 가능, 지도·그래프마다 텍스트 대체 설명 존재
- [ ] **Step 5:** 개발자 도구 Network 탭에서 학생 화면이 자기 출처의 정적 파일 외에 요청하지 않음을 확인한다(외부 Gemini 링크는 클릭 시에만 새 창).
- [ ] **Step 6:** 연구 기록 작성
  - 구현 범위, Codex 작업별 지시서·보고서 경로, 검수 결과(대조한 값), 미해결 사항
  - `STUDY_ROOT/brief.md` 현재 단계와 `research/studies/index.md` 갱신
- [ ] **Step 7:** 커밋 `feat(v2): switch entry to v2 book with pilot unit 01-01`. 푸시하지 않는다.
- [ ] **Step 8:** 연구자에게 검토 요청(설계 문서 11절 3단계)
