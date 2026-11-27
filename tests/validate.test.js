import { describe, expect, it } from 'vitest';
import { validateBook, checkCssFontSizes } from '../src/content-loader/validate.js';
import { assembleBook, fullUnitIds } from '../src/content-loader/assemble.js';
import { resolveConceptId } from '../src/content-loader/concepts.js';
import { routineForSlot } from '../src/content-loader/routines.js';

const toc = { parts: [{ id: 'part-01', units: [
  { id: '01-01', title: 'A', standardCode: '12세지01-01', lessons: [{ index: 1, title: 'L1' }] },
  { id: '01-02', title: 'B', standardCode: '12세지01-02', lessons: [{ index: 1, title: 'L1' }] },
] }] };

const refs = {
  concepts: { interdependence: { label: '상호의존', aliases: ['mutual-dependence'] }, scale: { label: '공간 규모', aliases: [] } },
  sources: { 'unctad-trade': { title: 'Trade' } },
  manifest: { items: [{ id: 'wdi-trade', path: '/data/01-01/trade.json' }, { id: 'wdi-net', path: '/data/01-01/net.json' }] },
  provenance: { items: [{ src: '/images/01-01/opening.webp' }] },
  routines: { source: {}, items: {
    'see-think-wonder': { id: 'see-think-wonder', steps: [{ id: 'a' }, { id: 'b' }] },
    'claim-support-question': { id: 'claim-support-question', steps: [{ id: 'a' }, { id: 'b' }] },
  } },
};

const text = (id) => ({ id, type: 'text', caption: '', source: '', alt: '', config: {}, schematic: false, concepts: [] });
const chart = (id, source = 'wdi-trade', data = '/data/01-01/trade.json') => ({ id, type: 'chart', data, caption: '자료', source, alt: '그래프', config: {}, schematic: false, concepts: [] });

function lesson(overrides = {}) {
  return {
    id: 'lesson-01-01-1', unitId: '01-01', index: 1, title: 'L1', goal: 'g',
    paragraphs: ['a', 'b', 'c', 'd'],
    steps: [text('s1'), chart('s2'), chart('s3', 'wdi-net', '/data/01-01/net.json'), text('s4')],
    keyTerms: ['interdependence'], activity: { template: 'layer-compare', config: {}, fictional: false },
    sourceIds: ['unctad-trade'], ...overrides,
  };
}

function unit(overrides = {}, lessonOverrides = {}) {
  return {
    id: '01-01', standardCode: '12세지01-01', title: 'A', goal: 'g', concepts: ['scale'],
    opening: { intro: '소개', focus: { kind: 'chart', step: chart('f1') } },
    closing: { summary: '', bridge: '', transfer: { prompt: 'p' } },
    lessons: [lesson(lessonOverrides)], ...overrides,
  };
}

const run = (u, opts = {}) => validateBook({ toc, units: u ? [u] : [] }, refs, { fullUnits: ['01-01'], ...opts });

describe('validateBook', () => {
  it('passes a valid unit', () => {
    expect(run(unit())).toEqual([]);
  });

  it('reports a missing full unit', () => {
    expect(run(null)).toContain('01-01: unit.yaml missing');
  });

  it('only checks toc presence for units outside fullUnits', () => {
    expect(run(unit()).some((e) => e.startsWith('01-02'))).toBe(false);
  });

  it('reports lesson count different from toc', () => {
    expect(run(unit({ lessons: [] }))).toContain('01-01: lessons 0 (toc 1)');
  });

  it('requires 4-6 paragraphs', () => {
    const errors = run(unit({}, { paragraphs: ['a', 'b', 'c'], steps: [text('s1'), chart('s2'), chart('s3')] }));
    expect(errors).toContain('01-01 lesson 1: paragraphs 3 (need 4-6)');
  });

  it('requires one step per paragraph', () => {
    expect(run(unit({}, { paragraphs: ['a', 'b', 'c', 'd', 'e'] }))).toContain('01-01 lesson 1: steps/paragraphs mismatch');
  });

  it('requires 2-4 data steps', () => {
    const errors = run(unit({}, { steps: [text('s1'), chart('s2'), text('s3'), text('s4')] }));
    expect(errors).toContain('01-01 lesson 1: data steps 1 (need 2-4)');
  });

  it('rejects unknown concepts but accepts aliases', () => {
    expect(run(unit({}, { keyTerms: ['foo'] }))).toContain('01-01 lesson 1: unknown concept: foo');
    expect(run(unit({}, { keyTerms: ['mutual-dependence'] }))).toEqual([]);
  });

  it('rejects unknown source ids', () => {
    expect(run(unit({}, { sourceIds: ['nope'] }))).toContain('01-01 lesson 1: unknown source: nope');
  });

  it('rejects data steps whose source is not in the manifest', () => {
    const errors = run(unit({}, { steps: [text('s1'), chart('s2', 'ghost'), chart('s3', 'wdi-net', '/data/01-01/net.json'), text('s4')] }));
    expect(errors).toContain('01-01 lesson 1 step s2: unknown data source: ghost');
  });

  it('rejects data files not in the manifest', () => {
    const errors = run(unit({}, { steps: [text('s1'), chart('s2', 'wdi-trade', '/data/x.json'), chart('s3', 'wdi-net', '/data/01-01/net.json'), text('s4')] }));
    expect(errors).toContain('01-01 lesson 1 step s2: data file not in manifest: /data/x.json');
  });

  it('rejects illustrations without provenance', () => {
    expect(run(unit({}, { illustration: { src: '/images/01-01/x.webp', alt: 'x' } }))).toContain('01-01 lesson 1: image without provenance: /images/01-01/x.webp');
    expect(run(unit({}, { illustration: { src: '/images/01-01/opening.webp', alt: 'x' } }))).toEqual([]);
  });

  it('rejects question marks in the question focus', () => {
    const focus = { kind: 'chart', step: { ...chart('f1'), caption: '무엇이 보이나요?' } };
    expect(run(unit({ opening: { intro: '', focus } }))).toContain('01-01 opening: question mark in focus');
    const fullWidth = { kind: 'chart', step: { ...chart('f1'), alt: '왜일까？' } };
    expect(run(unit({ opening: { intro: '', focus: fullWidth } }))).toContain('01-01 opening: question mark in focus');
  });
});

describe('checkCssFontSizes', () => {
  it('flags px sizes under the minimum', () => {
    expect(checkCssFontSizes('.a{font-size:13px}')).toHaveLength(1);
    expect(checkCssFontSizes('.a{font-size:14px}')).toEqual([]);
  });

  it('converts rem at 16px', () => {
    expect(checkCssFontSizes('.a{ font-size: 0.8rem; }')).toHaveLength(1);
    expect(checkCssFontSizes('.a{ font-size: 1.125rem; }')).toEqual([]);
  });
});

describe('resolveConceptId', () => {
  it('returns canonical id for ids and aliases, null for unknown', () => {
    expect(resolveConceptId('scale', refs.concepts)).toBe('scale');
    expect(resolveConceptId('mutual-dependence', refs.concepts)).toBe('interdependence');
    expect(resolveConceptId('nope', refs.concepts)).toBeNull();
  });
});

describe('assembleBook', () => {
  it('builds units with ordered lessons from file texts', () => {
    const lessonMd = (title) => `---\ntitle: ${title}\nsteps: []\n---\n본문`;
    const book = assembleBook({
      'content/book/toc.yaml': 'parts: []',
      'content/book/01-01/unit.yaml': "id: '01-01'\ntitle: A",
      'content/book/01-01/lesson-2.md': lessonMd('둘'),
      'content/book/01-01/lesson-1.md': lessonMd('하나'),
      'content/book/01-01/teacher.md': '# 안내',
      'content/concepts.yaml': 'concepts: {}',
      'content/sources.yaml': 'sources: {}',
      'content/data-manifest.yaml': 'items: []',
      'content/image-provenance.yaml': 'items: []',
    });
    expect(book.units).toHaveLength(1);
    expect(book.units[0].lessons.map((l) => l.title)).toEqual(['하나', '둘']);
    expect(book.units[0].lessons[1].id).toBe('lesson-01-01-2');
    expect(book.teacher['01-01']).toBe('# 안내');
    expect(book.manifest).toEqual({ items: [] });
  });
});

describe('per-unit record files', () => {
  it('merges content/manifests, content/sources and content/provenance files', () => {
    const book = assembleBook({
      'content/book/toc.yaml': 'parts: []',
      'content/concepts.yaml': 'concepts: {}',
      'content/sources.yaml': 'sources: { a: { title: A } }',
      'content/sources/02-01.yaml': 'sources: { b: { title: B } }',
      'content/data-manifest.yaml': 'items: [{ id: m1, path: /data/x.json }]',
      'content/manifests/02-01.yaml': 'items: [{ id: m2, path: /data/02-01/y.json }]',
      'content/image-provenance.yaml': 'items: [{ src: /images/a.webp }]',
      'content/provenance/02-01.yaml': 'items: [{ src: /images/02-01/b.webp }]',
    });
    expect(Object.keys(book.sources).sort()).toEqual(['a', 'b']);
    expect(book.manifest.items.map((item) => item.id)).toEqual(['m1', 'm2']);
    expect(book.provenance.items.map((item) => item.src)).toEqual(['/images/a.webp', '/images/02-01/b.webp']);
  });
});

describe('fullUnitIds', () => {
  it('lists every unit that has a unit.yaml', () => {
    expect(fullUnitIds({ units: [{ id: '02-01' }, { id: '01-01' }] })).toEqual(['01-01', '02-01']);
  });
});

describe('module lessons', () => {
  const linked = (id, path = '/data/01-01/trade.json') => ({ ...chart(id, 'wdi-trade', path), label: `${id} 그래프` });
  const moduleOverrides = (extra = {}) => ({
    format: 'module', opener: '생각 열기', summary: ['하나', '둘', '셋'],
    steps: [linked('m1'), linked('m2'), linked('m3')],
    sections: [
      { title: '가', paragraphs: [{ text: '가1', refs: ['m1'] }, { text: '가2', refs: [] }] },
      { title: '나', paragraphs: [{ text: '나1', refs: ['m2'] }, { text: '나2', refs: ['m3'] }] },
    ],
    paragraphs: ['가1', '가2', '나1', '나2'],
    routines: { opener: { id: 'see-think-wonder', prompt: '열기' }, inquiry: { id: 'claim-support-question', prompt: '탐구' } },
    ...extra,
  });
  const errorsFor = (extra) => run(unit({}, moduleOverrides(extra)));

  it('accepts a well-formed module lesson', () => {
    expect(errorsFor()).toEqual([]);
  });

  it('requires opener and inquiry routines on module lessons', () => {
    expect(errorsFor({ routines: { opener: { id: 'see-think-wonder', prompt: '열기' } } })).toEqual(expect.arrayContaining([expect.stringContaining('routines missing: inquiry')]));
    expect(errorsFor({ routines: {} })).toEqual(expect.arrayContaining([expect.stringContaining('routines missing: opener')]));
  });

  it('reports unknown refs, unlinked steps and missing summary/opener', () => {
    const base = moduleOverrides();
    base.sections[0].paragraphs[0].refs = ['nope'];
    const errors = run(unit({}, { ...base, summary: ['하나'], opener: '' }));
    expect(errors).toEqual(expect.arrayContaining([
      expect.stringContaining('unknown data ref: nope'),
      expect.stringContaining('data step not linked: m1'),
      expect.stringContaining('summary 1 (need 3-4)'),
      expect.stringContaining('opener missing'),
    ]));
  });

  it('limits topics and data steps and forbids text steps', () => {
    const errors = errorsFor({ sections: [{ title: '가', paragraphs: [{ text: 'x', refs: ['m1', 'm2', 'm3', 's9'] }] }], steps: [linked('m1'), linked('m2'), linked('m3'), text('s9')] });
    expect(errors).toEqual(expect.arrayContaining([
      expect.stringContaining('sections 1 (need 2-5)'),
      expect.stringContaining('text step in module lesson: s9'),
    ]));
    const seven = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'];
    const okSeven = errorsFor({ steps: seven.map((id) => linked(id)), sections: [{ title: '가', paragraphs: [{ text: 'x', refs: seven.slice(0, 4) }] }, { title: '나', paragraphs: [{ text: 'y', refs: seven.slice(4) }] }] });
    expect(okSeven).toEqual([]);
    const many = [...seven, 'm8'];
    const tooMany = errorsFor({ steps: many.map((id) => linked(id)), sections: [{ title: '가', paragraphs: [{ text: 'x', refs: many.slice(0, 4) }] }, { title: '나', paragraphs: [{ text: 'y', refs: many.slice(4) }] }] });
    expect(tooMany).toEqual(expect.arrayContaining([expect.stringContaining('data steps 8 (need 3-7)')]));
  });

  it('requires three real (non-schematic) data steps', () => {
    const diagram = { ...linked('m1'), type: 'image', data: '/images/01-01/opening.webp', source: '', schematic: true };
    const errors = errorsFor({ steps: [diagram, linked('m2'), linked('m3')] });
    expect(errors).toEqual(expect.arrayContaining([expect.stringContaining('real data steps 2 (need 3+)')]));
    expect(errors.some((e) => e.includes('image without provenance'))).toBe(false);
  });

  it('checks schematic images against provenance', () => {
    const diagram = { ...linked('m4'), type: 'image', data: '/images/01-01/unknown.svg', source: '', schematic: true };
    const errors = errorsFor({ steps: [linked('m1'), linked('m2'), linked('m3'), diagram], sections: [{ title: '가', paragraphs: [{ text: 'x', refs: ['m1', 'm4'] }] }, { title: '나', paragraphs: [{ text: 'y', refs: ['m2', 'm3'] }] }] });
    expect(errors).toEqual(expect.arrayContaining([expect.stringContaining('image without provenance: /images/01-01/unknown.svg')]));
    expect(errors.some((e) => e.includes('data file not in manifest'))).toBe(false);
  });

  it('keeps legacy rules for lessons without a format', () => {
    expect(run(unit())).toEqual([]);
  });
});

describe('routines', () => {
  const step = (id, extra = {}) => ({ id, label: id, hint: 'h', ...extra });
  const library = {
    'see-think-wonder': { id: 'see-think-wonder', name: 'See, Think, Wonder', nameKo: '보기', steps: [step('see'), step('think'), step('wonder', { toQuestion: true })] },
    'used-to-think': { id: 'used-to-think', name: 'I Used to Think', nameKo: '생각 변화', steps: [step('used'), step('now')] },
  };
  const withLib = (items) => ({ ...refs, routines: { source: {}, items } });
  const runWith = (lib, lessonRoutines) => validateBook({ toc, units: [unit({}, { routines: lessonRoutines })] }, withLib(lib), { fullUnits: ['01-01'] });

  it('accepts a valid library and lesson routines', () => {
    expect(runWith(library, { opener: { id: 'see-think-wonder', prompt: '열기' } })).toEqual([]);
  });
  it('checks step counts and toQuestion limits in the library', () => {
    const bad = { ...library, one: { id: 'one', name: 'One', nameKo: '하나', steps: [step('a')] }, two: { id: 'two', name: 'Two', nameKo: '둘', steps: [step('a', { toQuestion: true }), step('b', { toQuestion: true })] } };
    const errors = runWith(bad, {});
    expect(errors).toEqual(expect.arrayContaining([expect.stringContaining('routine one: steps 1 (need 2-4)'), expect.stringContaining('routine two: toQuestion steps 2 (max 1)')]));
  });
  it('reports unknown routines and missing prompts', () => {
    const errors = runWith(library, { opener: { id: 'nope', prompt: 'x' }, inquiry: { id: 'see-think-wonder', prompt: ' ' } });
    expect(errors).toEqual(expect.arrayContaining([expect.stringContaining('unknown routine: nope'), expect.stringContaining('routine prompt missing: inquiry')]));
  });
  it('defaults the closing slot to used-to-think', () => {
    const book = { routines: { items: library } };
    expect(routineForSlot(book, { routines: {} }, 'closing')?.id).toBe('used-to-think');
    expect(routineForSlot(book, { routines: {} }, 'opener')).toBeNull();
    expect(routineForSlot(book, { routines: { opener: { id: 'see-think-wonder', prompt: 'p' } } }, 'opener')).toMatchObject({ id: 'see-think-wonder', prompt: 'p' });
    expect(routineForSlot(book, { routines: { opener: { id: 'nope', prompt: 'p' } } }, 'opener')).toBeNull();
  });
});
