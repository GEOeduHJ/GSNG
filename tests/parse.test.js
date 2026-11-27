import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { parseFrontmatter, parseLesson, parseLessonBody, parseUnit } from '../src/content-loader/parse.js';

const lessonText = `---
title: 세계화는 무엇일까
goal: 연결의 경로를 설명할 수 있다.
steps:
  - { id: s1, type: text, caption: 도입, source: '', alt: 도입 }
  - { id: s2, type: chart, data: /data/01-01/trade.json, caption: 무역 비중, source: wdi-trade, alt: 무역 비중 그래프 }
  - { id: s3, type: map, data: /data/01-01/net.geojson, caption: 인터넷 이용률, source: wdi-net, alt: 지도 }
  - { id: s4, type: text, caption: 정리, source: '', alt: 정리 }
keyTerms: [interdependence, scale]
activity: { template: layer-compare, config: {}, fictional: false }
sourceIds: [unctad-trade]
---
첫째 문단이다.

둘째 문단이다.
줄바꿈이 있어도 같은 문단이다.

셋째 문단이다.

넷째 문단이다.
`;

describe('parseFrontmatter', () => {
  it('splits yaml data from body', () => {
    expect(parseFrontmatter('---\na: 1\n---\n본문')).toEqual({ data: { a: 1 }, body: '본문' });
  });

  it('throws when frontmatter is missing', () => {
    expect(() => parseFrontmatter('본문만 있음')).toThrow('frontmatter missing');
  });
});

describe('parseLesson', () => {
  it('splits paragraphs on blank lines and aligns steps by order', () => {
    const lesson = parseLesson(lessonText, { unitId: '01-01', index: 1 });
    expect(lesson.id).toBe('lesson-01-01-1');
    expect(lesson.paragraphs).toHaveLength(4);
    expect(lesson.paragraphs[1]).toBe('둘째 문단이다. 줄바꿈이 있어도 같은 문단이다.');
    expect(lesson.steps[2].id).toBe('s3');
    expect(lesson.steps[1].schematic).toBe(false);
    expect(lesson.steps[1].concepts).toEqual([]);
    expect(lesson.keyTerms).toEqual(['interdependence', 'scale']);
    expect(lesson.activity.template).toBe('layer-compare');
  });
});

describe('parseUnit', () => {
  it('returns opening focus step and closing transfer prompt', () => {
    const unit = parseUnit(`id: '01-01'
standardCode: 12세지01-01
title: 세계화와 세계시민
goal: 목표
concepts: [interdependence]
opening:
  intro: 소개
  focus:
    kind: chart
    step: { id: f1, type: chart, data: /data/01-01/trade.json, caption: 자료, source: wdi-trade, alt: 그래프 }
closing:
  summary: 정리
  bridge: 다음 중단원으로
  transfer: { prompt: 새 지역에 적용하기 }
`);
    expect(unit.id).toBe('01-01');
    expect(unit.opening.focus.step.id).toBe('f1');
    expect(unit.opening.focus.step.schematic).toBe(false);
    expect(unit.closing.transfer.prompt).toBe('새 지역에 적용하기');
    expect(unit.lessons).toEqual([]);
  });
});

describe('table of contents', () => {
  it('has 4 parts, 13 units, 41 lessons', () => {
    const toc = parseYaml(readFileSync(resolve(process.cwd(), 'content/book/toc.yaml'), 'utf8'));
    expect(toc.parts).toHaveLength(4);
    const units = toc.parts.flatMap((part) => part.units);
    expect(units).toHaveLength(13);
    expect(units.flatMap((unit) => unit.lessons)).toHaveLength(41);
    expect(units[0]).toMatchObject({ id: '01-01', standardCode: '12세지01-01', title: '세계화와 세계시민' });
  });
});

describe('lesson body', () => {
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
});
