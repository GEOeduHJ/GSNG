# 질문 기반 파일럿 준비 ledger

- 상태 (2026-11-28): Task 1–3 구현 완료. Task 1/2 root review PASS; Task 3 독립 검수 pending. Task 3 product commit `5d39723b26ed37bdd6703b6f2a7164197f70d72c`.
- 작업공간: `platform/worktrees/question-based-pilot`, branch `codex/question-based-pilot-prepare-2026-11-28`.
- 기준: `dd14b439505738bf6d182956e3e93efed06a0c46`; 기준 `main`은 변경 없이 clean.
- 초기 baseline (작업 전 기록): `npm test` 통과(11 files, 176 tests; scrollTo 미구현 안내만 출력). `npm run check:book` 통과(13 units).
- Task 1 결정: 최초 선택 스냅샷은 우선화 완료 때 한 번 저장한다. origin 없는 legacy는 출처를 추정하지 않고 `기록 없음`으로 표시한다. Task 1은 feedbackIds 왕복, Task 3은 피드백 응답과 revision 연결 검증을 맡는다.
- 초기 준비 산출물: spec, 3-task plan, 본 ledger, SDD progress/preflight, Task 1 brief.

## 확정 ruling

1. 최초 선택 스냅샷은 우선화 완료 때 고정한다. 이 판단이 잘못되면 기록 시점을 재조정해야 한다.
2. 결과 export 후 학생 문구가 바뀌었더라도 동일 record/unit와 일관된 질문·스냅샷 참조가 확인되면 과거 피드백을 허용한다. 과거 문구 대상 코멘트가 혼동될 수 있으므로 원 snapshot을 함께 표시해 현재 문구와 구분한다.

## 구현 및 검수 상태

| Task | Commit / 결과 | 구현·검사 | 독립 검수 |
| --- | --- | --- | --- |
| 1 | `d1617b6b188847fcfced32ff7f272b7842fb8f72` | PASS | root PASS |
| 2 | `ef67dd7aa81f7de63dbafb1a625625187e5aa4ad` | PASS | root PASS |
| 3 | `5d39723b26ed37bdd6703b6f2a7164197f70d72c` | PASS: focused 19; full 14 files / 217 tests; check:book 13 units; build | pending |

Task 3 report: `platform/worktrees/question-based-pilot/.superpowers/sdd/2026-11-28-question-based-pilot/task-3-report.md`. Scoped and broad review packages are stored in the same SDD directory. Build passed with a non-blocking >500 kB chunk warning. Browser QA remains assigned separately by root.
