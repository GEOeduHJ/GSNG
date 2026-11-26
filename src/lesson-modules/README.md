# Lesson-specific learning modules

Unit 01 has one independently maintained configuration file per textbook lesson:

| Lesson | Descriptor | Activity |
| --- | --- | --- |
| 1-1-1 | `unit-01/lesson-01-01-01.js` | Global connection map |
| 1-1-2 | `unit-01/lesson-01-01-02.js` | Glocal regional strategy studio |
| 1-1-3 | `unit-01/lesson-01-01-03.js` | Global citizenship decision hearing |
| 1-2-1 | `unit-01/lesson-01-02-01.js` | Regional integration timeline |
| 1-2-2 | `unit-01/lesson-01-02-02.js` | Separation claims and evidence |
| 1-2-3 | `unit-01/lesson-01-02-03.js` | Changing functional-region lab |
| 1-3-1 | `unit-01/lesson-01-03-01.js` | GIS layer assembly |
| 1-3-2 | `unit-01/lesson-01-03-02.js` | Route recommendation lab |
| 1-3-3 | `unit-01/lesson-01-03-03.js` | Shelter-site decision lab |

`unit-01/index.js` imports the descriptors, maps them by stable lesson ID, and checks that each Unit 01 lesson has one descriptor aligned to its achievement-standard code. Add future lesson activities as a new descriptor plus a focused React engine under `src/components/lesson-modules/unit-01/`; avoid adding lesson-ID conditionals to shared components.

## Descriptor contract

Each file exports a descriptor containing:

- `lessonId` and `standardCode`: links to the textbook and official standard.
- `qftPhaseMinutes`: recommended time for the seven QFT stages in this lesson; the first lesson uses the full familiarization sequence and later lessons use a shorter, teacher-adjustable sequence.
- `questionFocus`: neutral, non-question stimulus text for QFT.
- `activity`: a stable activity ID, engine type, directions, data provenance label, tools, local data, and source links.
- `aiReview` (optional): an external-service prompt used only after the learner has written a question and their own draft.
- `buildArtifact(state)`: turns current selections and inputs into an evidence summary with limitations.

The reusable engine components are separated by activity type. `LessonActivity.jsx` dispatches from the descriptor’s `activity.type`. When QFT opens, the textbook body is folded and its neutral focus appears first. The interactive lab is placed in the evidence-investigation stage so its task instructions do not prime the initial student questions; learners can return to the textbook at any time. Pure calculations for the browser-only route and radius model live in `unit-01/logic.js`.

## Records and data provenance

Schema v3 stores new Unit 01 work under `lessonRecords[lessonId].qft` and `lessonRecords[lessonId].activities[activityId]`. The earlier achievement-standard-keyed `records[standardCode]` are retained separately and can be viewed read-only; they are never copied into nine lesson records. JSON export includes both structures.

All fabricated locations, actor profiles, road networks, flow values, city points, population weights, and shelter capacities are labeled as simulated teaching data. The Croatia timeline and 2014 Scotland national vote shares link to primary institutional sources; the Nepal activity links to the GFDRR case page. The Nepal page is used as a reading prompt, not as proof of shelter allocation decisions or the simulated city model.

External Gemini use is manual: copy a prompt, open the service, paste the response, and compare it against the listed source material. No AI API, server-side model, automatic return, or automated scoring is present. Core activities work without AI.
