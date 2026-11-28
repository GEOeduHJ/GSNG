# 질문 기반 파일럿 준비 ledger

- 상태: root가 계획 검수 완료. Task 1 준비 완료, 제품 구현은 아직 시작하지 않음.
- 작업공간: `platform/worktrees/question-based-pilot`, branch `codex/question-based-pilot-prepare-2026-11-28`.
- 기준: `dd14b439505738bf6d182956e3e93efed06a0c46`; 기준 `main`은 변경 없이 clean.
- Baseline: `npm test` 통과(11 files, 176 tests; scrollTo 미구현 안내만 출력). `npm run check:book` 통과(13 units).
- 확정 기록: 최초 선택 스냅샷은 우선화 완료 때 한 번 저장한다. origin 없는 legacy는 출처를 추정하지 않고 `기록 없음`으로 표시한다. Task 1은 feedbackIds 왕복, Task 3은 피드백 응답과 revision 연결 검증을 맡는다.
- 준비 산출물: spec, 3-task plan, 본 ledger, SDD progress/preflight, Task 1 brief.
