# Unit 01 nine lesson labs implementation ledger

Date: 2026-11-26
Branch: `codex/unit01-nine-labs`
Repository: GSNG website worktree

## Delivered

- Added one editable descriptor for each of Unit 01's nine lessons, each aligned to its existing achievement-standard code and with independent QFT phase timing.
- Added nine distinct React activities: global product flows, glocal strategy comparison, civic actor decisions, Croatia integration timeline, Scotland claims and evidence, fictional functional-region change, GIS layers and reclassification, accessible-route comparison, and a Nepal case worksheet paired with a separately labeled fictional shelter model.
- Embedded QFT in each lesson. Unit 01 opens a neutral-focus mode that folds the explanatory textbook body. Forward navigation is gated by the learner's question generation, question improvement, prioritization, plan, linked evidence, and explanation.
- Kept existing achievement-standard records in their prior structure. Schema v3 adds separate per-lesson QFT and activity records in browser localStorage; exports retain both structures. Reimporting the same activity result for the same question updates the prior evidence entry and keeps its source links.
- Kept generative AI manual and optional through copy, external Gemini, paste, and source review. No API calls, server collection, or automated scoring were added.

## Review and source handling

An independent read-only review found no unresolved Critical or Important issue. It verified the Croatia dates, Scotland national result shares, and the scope limits of the GFDRR Nepal case page. The review's Minor recommendations were resolved by linking the Croatia country profile directly and announcing selected states for three button groups. Simulated city, population, route, flow, strategy, and actor data are labeled as such.

## Verification

- `npm run build`: passed with Vite 8.3.8; 664 modules transformed.
- `git diff --check`: passed.
- Automated tests were not added or run, in line with the active session instruction.
- Manual browser, keyboard, and screen-reader QA was not run. The production build reports chunk-size warnings for existing map/chart bundles; no further performance optimization was part of this implementation.

## Integration

Implementation and final review are complete. The commit and `origin/main` verification are recorded after the requested push.
