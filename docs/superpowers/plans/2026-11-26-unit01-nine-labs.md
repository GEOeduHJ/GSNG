# Unit 01 Nine Lesson Labs Implementation Plan

> **Execution note:** Implemented under the researcher’s explicit request. Per the active session instruction, no automated test files were added and no test suite was run; use build and review findings as recorded verification.

**Goal:** Implement nine distinct browser activities inside the nine Unit 01 textbook lessons, each with its own QFT focus and persistent, question-linked evidence, then push the reviewed result to GSNG `main`.

**Architecture:** Store each activity’s lesson-specific data and QFT stimulus in its own descriptor file under `src/lesson-modules/unit-01/`. Render the nine activity types through separate React components and a shared activity frame. Store new QFT and activity records by lesson and activity in schema v3 while retaining existing standard-level records without moving or duplicating them.

**Tech Stack:** React 19, Vite 8, existing CSS, browser localStorage, and local JavaScript calculations. No student API calls or server collection. Automated tests were not added or run under the session instruction; final checks use the production build, whitespace/diff inspection, and independent code review.

**Spec:** `../../method/unit01-nine-lesson-labs-concept-2026-11-26.md`

## Global Constraints

- Keep all nine activities inside their respective lesson pages, with QFT and the activity in the same textbook flow.
- Keep nine independently editable lesson descriptors under `src/lesson-modules/unit-01/`.
- Key new inquiry records per lesson and activity; preserve all existing standard-keyed records and migrate them without redistribution.
- Use newly authored content and clearly label simulated datasets; do not reproduce textbook wording, graphics, or unlicensed external material.
- Keep AI optional and external: no per-student API calls, automated AI scoring, or false AI labels for deterministic computations.
- Make the core activities work in a browser with local data and localStorage; do not require Python, a backend, accounts, external map tiles, or runtime data APIs.
- Carry the selected QFT question into an evidence record that can import a saved activity result.
- Push only the nested GSNG website repository after review and verification; never force-push.

## Review Focus

1. Existing v2/legacy records must survive loading into v3 without being copied into lesson records — source-level migration review.
2. Questions, selected questions, and artifacts from three lessons under one standard must remain isolated — lesson-key and activity-key isolation review.
3. Closed segments and inaccessible destinations must not produce a route — shortest-path logic review.
4. Shelter catchment must sum population attributes once and keep capacity separate — radius-analysis logic review.
5. Real EU/Scotland/Nepal facts must be distinguished from synthetic teaching data and limitations — descriptor metadata checks and rendered copy review.

---

### Task 1: Lesson module registry, pure logic, and record migration

**Files:**
- Create: `src/lesson-modules/unit-01/lesson-01-01-01.js` through `lesson-01-03-03.js`
- Create: `src/lesson-modules/unit-01/index.js`
- Create: `src/lesson-modules/unit-01/logic.js`
- Create: `src/storage/learning-records.js`
- Modify: `package.json`, `src/App.jsx`

**Interfaces:**
- `UNIT01_LESSON_MODULES`: exactly one descriptor for each Unit 01 lesson; each has unique `lessonId`, `activity.id`, `activity.type`, `questionFocus`, `dataStatus`, `sourceLinks`, and `buildArtifact(state)`.
- `findShortestRoute(nodes, edges, startId, endId, { accessibleOnly, closedEdgeIds })`: returns `{ nodeIds, edgeIds, distance }` or `null`.
- `populationWithinRadius(points, candidate, radiusKm)`: returns the distinct covered point IDs and sum of their `population` attributes.
- `readLearningData(storage)`: returns `{ records, lessonRecords, readLessons }`; old standard records remain under `records`.
- `writeLearningData(storage, data)`: writes v3 without changing standard record keys.

- [x] Implement descriptors, pure logic, storage migration, and App state wiring with the specified interfaces.

### Task 2: Nine interactive lesson activity components

**Files:**
- Create: `src/components/lesson-modules/unit-01/ActivityFrame.jsx`
- Create: `src/components/lesson-modules/unit-01/GlobalConnectionLab.jsx`
- Create: `src/components/lesson-modules/unit-01/RegionalStrategyLab.jsx`
- Create: `src/components/lesson-modules/unit-01/CivicHearingLab.jsx`
- Create: `src/components/lesson-modules/unit-01/IntegrationTimelineLab.jsx`
- Create: `src/components/lesson-modules/unit-01/SeparationEvidenceLab.jsx`
- Create: `src/components/lesson-modules/unit-01/LivingRegionLab.jsx`
- Create: `src/components/lesson-modules/unit-01/GisLayerLab.jsx`
- Create: `src/components/lesson-modules/unit-01/RoutePlanningLab.jsx`
- Create: `src/components/lesson-modules/unit-01/ShelterSiteLab.jsx`
- Create: `src/components/lesson-modules/unit-01/ExternalAiReview.jsx`
- Create: `src/components/lesson-modules/unit-01/LessonActivity.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- `LessonActivity({ lessonModule, record, onChange, questions })` selects one engine by `activity.type`, saves every choice/input via `onChange`, and shows `lessonModule.buildArtifact(record)`.
- Each activity engine accepts `{ config, value, onChange }`; each output clearly labels fictional data, historical official data, or author-written analytic prompts.
- `ExternalAiReview({ prompt, serviceLabel })` only copies a prompt, opens the external service, and stores pasted output plus the learner’s source-check notes; it performs no API call.

- [x] Implement each separate activity view: product-flow/scales, glocal strategy, actor decision, Croatia integration timeline/layers, Scotland claim/evidence board, before/after fictional living region, GIS layer assembly, accessible routing, and Nepal case plus fictional shelter site comparison.
- [x] Add clear no-API and synthetic/real-data labels, keyboard selection controls, and manual external AI flow.

### Task 3: Per-lesson QFT and evidence linkage inside the textbook

**Files:**
- Modify: `src/components/BookReader.jsx`
- Modify: `src/components/QFTFlow.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/BookNavigation.jsx`
- Modify: `src/components/CourseHome.jsx`
- Modify: `src/content/bookIndex.js`
- Modify: `src/styles.css`

**Interfaces:**
- BookReader passes the current lesson descriptor, lesson-level QFT record, activity record, and independent update callbacks.
- QFTFlow uses that lesson’s neutral, non-question stimulus and all four QFT generation rules; step 5 can import a saved activity artifact into evidence, linked to the student-selected question.
- Completion indicators count lesson-level QFT completions without combining question content across lessons; old standard-level completion records remain visible and intact.
- Non-Unit-01 lessons keep their existing standard-level QFT behavior.

- [ ] Add regression assertions that different lesson IDs maintain independent question/activity records and that an imported artifact carries the selected `questionId`.
- [x] Integrate lesson-specific QFT, activity, import-to-evidence, local persistence, export/clear, navigation and home completion counts.

### Task 4: Full verification, review, and requested push

**Files:**
- Modify only issues found by verification/review.
- Create: `docs/superpowers/implementation-ledger/2026-11-26-unit01-nine-labs.md`

- [x] Run `npm run build` and `git diff --check`; both passed after the final code edits. The build reports the existing large-chunk warning for map/chart bundles.
- [x] Review source paths, activity-to-evidence linkage, independent lesson persistence, and data labels. No manual browser/screen-reader QA was run; report that limitation explicitly.
- [x] Independent critical review found no unresolved Critical or Important issues. Minor source-link and selected-state announcements were resolved. No new heavy visualization dependency was introduced.
- [x] Commit the branch (`7aa5fe2`), fast-forward the clean local `main`, push to `origin/main` without force, and verify remote SHA `7aa5fe2a49eab56407707152474f781064e732e1`.
