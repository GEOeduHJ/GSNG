# Course content authoring contract

The browser reads curriculum content as plain JavaScript data. Never place PDF page images, copied textbook prose, copied textbook exercises, or third-party images in this folder.

## Files

- `units/unit-01.js` … `unit-04.js`: one object per major unit, in textbook navigation order.
- `bookIndex.js`: imports all four units and exports a flattened lesson index for routes and navigation.
- `sources.js`: public institution and dataset links used by the lesson files.

Each source record keeps `sourceDate`, `checkedAt`, `licenseStatus`, `reuseBasis`, and `verificationStatus`. `null` means the date or check has not been recorded. Current references are link-only; no provider data or images are copied into the app. Before embedding an asset or publishing a data-driven lesson, record its specific date, source coverage, license/use basis, and review date.

## Unit shape

```js
{
  id: 'part-01',
  numeral: 'I',
  title: '...',
  intro: '...',
  units: [{
    id: 'unit-01-01',
    title: '...',
    moduleCode: '12세지01-01',
    intro: '...',
    lessons: [{
      id: 'lesson-01-01-01',
      title: '...',
      lead: '...',
      body: ['독립 집필한 설명 문단 1', '독립 집필한 설명 문단 2'],
      keyTerms: [{ term: '...', definition: '...' }],
      activity: { title: '...', steps: ['...'], deliverable: '...' },
      visualization: {
        type: 'flow-map', title: '...', description: '...',
        dataStatus: 'schematic', textAlternative: '...'
      },
      sourceIds: ['unesco-gced']
    }]
  }]
}
```

Each lesson needs at least two substantial, independently written paragraphs, two or more terms, a student action, a visual/data interpretation, and one or more source IDs. Use `dataStatus: 'schematic'` for original teaching diagrams and invented demonstration values. Do not imply those are measured observations. If a public dataset has not been embedded and checked, link to it instead of presenting invented observations as actual data.

For a real case, add a `caseStudies` array to the relevant lesson. Each case should have a place, period when known, independently written summary, inquiry prompt, source IDs, and a concise note about the source perspective or limits. Link primary or institutional sources directly to the case card. A source link is a starting point, not a claim-level citation; check the relevant passage, date, coverage, and reuse terms before publishing a data-backed claim or asset.

Keep IDs stable and unique. Middle unit IDs are `unit-<part>-<unit>`; lesson IDs are `lesson-<part>-<unit>-<lesson>`. The unit's `moduleCode` must match exactly one achievement-standard module in `src/modules/`.

## Standard module shape

Each `src/modules/12sejiNN-NN.js` retains `code`, `moduleId`, `title`, and the official `standardText`, and adds:

```js
{
  sectionIds: ['lesson-01-01-01'],
  qft: {
    focusTitle: '...',
    focusText: '비질문형 현상·자료 설명',
    focusVisual: 'lesson-01-01-01',
    teacherPrompt: '...',
    phases: ['질문 생성', '분류·변환', '우선화', '탐구 계획', '증거·설명', '성찰']
  },
  teacherGuide: { duration: '40분', materials: [], sequence: [], checks: [] },
  digitalTools: [],
  aiActivity: null | { tool: 'Gemini' | 'Suno', purpose: '...', optional: true },
  rubric: []
}
```

Student-generated questions appear before any suggested question. No model-generated answers, AI feedback, or automatic scoring run in the website.
