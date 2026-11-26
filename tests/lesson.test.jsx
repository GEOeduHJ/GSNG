import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { useActiveStep } from '../src/book/lesson/useActiveStep.js';
import { stageIndexFor } from '../src/book/lesson/stages.js';
import { buildChartOption, chartRows } from '../src/viz/chartData.js';
import { classBreaks, joinValues, legendLabels, formatNumber, pointCategories } from '../src/viz/mapData.js';
import DataStage from '../src/book/lesson/DataStage.jsx';
import LessonSpread from '../src/book/lesson/LessonSpread.jsx';
import { BookProvider } from '../src/book/BookContext.jsx';
import { makeBook, memoryStorage } from './fixtures/book.js';

class FakeObserver {
  static instances = [];
  constructor(callback) { this.callback = callback; this.targets = []; FakeObserver.instances.push(this); }
  observe(target) { this.targets.push(target); }
  unobserve() {}
  disconnect() { this.targets = []; }
  fire(target) { this.callback([{ target, isIntersecting: true }]); }
}

function setMedia({ wide = true, reduced = false } = {}) {
  window.matchMedia = (query) => ({
    matches: query.includes('min-width') ? wide : query.includes('reduced') ? reduced : false,
    addEventListener() {}, removeEventListener() {},
  });
}

afterEach(() => {
  FakeObserver.instances = [];
  vi.unstubAllGlobals();
  delete window.matchMedia;
});

describe('useActiveStep', () => {
  function setup(enabled = true) {
    vi.stubGlobal('IntersectionObserver', FakeObserver);
    const elements = [0, 1, 2].map(() => document.createElement('p'));
    const refs = elements.map((current) => ({ current }));
    const hook = renderHook(({ on }) => useActiveStep(refs, { enabled: on }), { initialProps: { on: enabled } });
    const observer = FakeObserver.instances.at(-1);
    return { hook, observer, elements };
  }

  it('tracks the most recently intersecting paragraph', () => {
    const { hook, observer, elements } = setup();
    act(() => observer.fire(elements[1]));
    expect(hook.result.current.active).toBe(1);
  });

  it('ignores scrolling while pinned and resumes after unpin', () => {
    const { hook, observer, elements } = setup();
    act(() => hook.result.current.pin(0));
    act(() => observer.fire(elements[2]));
    expect(hook.result.current.active).toBe(0);
    expect(hook.result.current.pinned).toBe(true);
    act(() => hook.result.current.unpin());
    act(() => observer.fire(elements[2]));
    expect(hook.result.current.active).toBe(2);
  });

  it('stops following when disabled (activity zone)', () => {
    const { hook, observer, elements } = setup(true);
    hook.rerender({ on: false });
    act(() => observer?.fire(elements[2]));
    expect(hook.result.current.active).toBe(0);
  });
});

describe('stageIndexFor', () => {
  const steps = [{ type: 'text' }, { type: 'chart' }, { type: 'text' }, { type: 'map' }];
  it('keeps the latest data step for text paragraphs', () => {
    expect(stageIndexFor(steps, 0)).toBe(1);
    expect(stageIndexFor(steps, 1)).toBe(1);
    expect(stageIndexFor(steps, 2)).toBe(1);
    expect(stageIndexFor(steps, 3)).toBe(3);
  });
});

describe('chart and map data', () => {
  it('builds a line option from series data with 14px axis labels', () => {
    const option = buildChartOption({ kind: 'line', unit: '%' }, { unit: '%', years: [2000, 2001], series: [{ name: '세계', values: [40, null] }] });
    expect(option.series[0]).toMatchObject({ type: 'line', name: '세계', data: [40, null] });
    expect(option.xAxis.axisLabel.fontSize).toBeGreaterThanOrEqual(14);
  });

  it('limits line charts to config.maxYear', () => {
    const data = { years: [2023, 2024, 2025], series: [{ name: 'World', iso3: 'WLD', values: [1, 2, 3] }] };
    const option = buildChartOption({ kind: 'line', maxYear: 2024 }, data);
    expect(option.xAxis.data).toEqual([2023, 2024]);
    expect(option.series[0].data).toEqual([1, 2]);
    expect(chartRows({ kind: 'line', maxYear: 2024 }, data)[0]).toEqual(['세계', 1, 2]);
  });

  it('labels series and rows in Korean by iso3 when names are given', () => {
    const names = { KOR: '대한민국', VNM: '베트남' };
    const line = buildChartOption({ kind: 'line' }, { years: [2024], series: [{ name: 'Korea, Rep.', iso3: 'KOR', values: [1] }, { name: 'World', iso3: 'WLD', values: [2] }] }, names);
    expect(line.series.map((series) => series.name)).toEqual(['대한민국', '세계']);
    expect(chartRows({ kind: 'bar' }, { rows: [{ iso3: 'VNM', name: 'VIETNAM', value: 3 }] }, names)).toEqual([['베트남', 3]]);
  });

  it('builds a climograph with precipitation bars and a temperature line', () => {
    const data = { station: '서울', months: [1, 2], temperature: [-2.4, 0.4], precipitation: [16.8, 28.2], unit: { temperature: '°C', precipitation: 'mm' } };
    const option = buildChartOption({ kind: 'climograph' }, data);
    expect(option.series.map((series) => series.type)).toEqual(['bar', 'line']);
    expect(option.series[0].data).toEqual([16.8, 28.2]);
    expect(option.series[1].data).toEqual([-2.4, 0.4]);
    expect(option.series[1].yAxisIndex).toBe(1);
    expect(option.xAxis.data).toEqual(['1월', '2월']);
    expect(chartRows({ kind: 'climograph' }, data)).toEqual([['강수량(mm)', 16.8, 28.2], ['기온(°C)', -2.4, 0.4]]);
  });

  it('builds sorted bar rows', () => {
    const data = { unit: 'USD', rows: [{ name: 'A', value: 1 }, { name: 'B', value: 5 }] };
    expect(chartRows({ kind: 'bar' }, data).map((row) => row[0])).toEqual(['B', 'A']);
  });

  it('joins values onto countries by iso3 and computes breaks', () => {
    const geo = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { iso_a3: 'KOR' }, geometry: null }, { type: 'Feature', properties: { iso_a3: 'XXX' }, geometry: null }] };
    const joined = joinValues(geo, { KOR: 80 });
    expect(joined.features[0].properties.value).toBe(80);
    expect(joined.features[1].properties.value).toBeNull();
    expect(classBreaks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toHaveLength(4);
  });
});

describe('point categories', () => {
  it('lists unique categories with their colors in first-seen order', () => {
    const geo = { features: [
      { properties: { category: '열대 우림 기후(Af)', color: '#1b7837' } },
      { properties: { category: '사막 기후(BWh)', color: '#d9a441' } },
      { properties: { category: '열대 우림 기후(Af)', color: '#1b7837' } },
      { properties: { name: '범주 없음' } },
    ] };
    expect(pointCategories(geo)).toEqual([{ label: '열대 우림 기후(Af)', color: '#1b7837' }, { label: '사막 기후(BWh)', color: '#d9a441' }]);
  });
});

describe('number display', () => {
  it('formats values for people', () => {
    expect(formatNumber(48.8170039103332)).toBe('48.8');
    expect(formatNumber(16485297834)).toBe('16,485,297,834');
    expect(formatNumber(null)).toBe('–');
  });

  it('builds readable legend labels', () => {
    expect(legendLabels([48.817, 71.438])).toEqual(['48.8 미만', '48.8–71.4', '71.4 이상']);
  });
});

describe('DataStage', () => {
  it('data stage falls back on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const step = { id: 's2', type: 'chart', data: '/data/x.json', caption: '무역 비중', source: 'wdi', alt: '무역 비중이 늘어난 그래프', config: { kind: 'line' }, schematic: false, concepts: [] };
    render(<DataStage step={step} manifest={{ items: [{ id: 'wdi', organization: 'World Bank', year: 2023, summary: '요약 문장' }] }} />);
    await waitFor(() => expect(screen.getByText('무역 비중이 늘어난 그래프')).toBeTruthy());
    expect(screen.getByText(/무역 비중/, { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText(/요약 문장/)).toBeTruthy();
  });

  it('uses maxYear for the caption year and shows required attribution', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const step = { id: 's3', type: 'chart', data: '/data/x.json', caption: '무역 비중 시계열', source: 'wdi', alt: '설명', config: { kind: 'line', maxYear: 2024 }, schematic: false, concepts: [] };
    const manifest = { items: [{ id: 'wdi', organization: 'World Bank', year: 2025, attribution: '© EuroGeographics' }] };
    const { container } = render(<DataStage step={step} manifest={manifest} />);
    const caption = container.querySelector('figcaption').textContent;
    expect(caption).toContain('World Bank, 2024년까지');
    expect(caption).not.toContain('2025');
    expect(caption).toContain('© EuroGeographics');
  });

  it('marks schematic data in the caption', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const step = { id: 's2', type: 'chart', data: '/data/x.json', caption: '개념도', source: '', alt: '설명', config: { kind: 'bar' }, schematic: true, concepts: [] };
    render(<DataStage step={step} manifest={{ items: [] }} />);
    expect(await screen.findByText(/모식 자료/)).toBeTruthy();
  });
});

describe('LessonSpread layout', () => {
  function renderLesson() {
    vi.stubGlobal('IntersectionObserver', FakeObserver);
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    const book = makeBook();
    const unit = book.units[0];
    return render(<BookProvider book={book} storage={memoryStorage()}><LessonSpread unit={unit} route={{ name: 'lesson', unitId: '01-01', index: 1 }} /></BookProvider>);
  }

  it('stacks below 1024px and shows every data step after the text', () => {
    setMedia({ wide: false });
    const { container } = renderLesson();
    expect(container.querySelector('.spread.is-narrow')).toBeTruthy();
    expect(container.querySelector('.page-right').dataset.sticky).toBe('false');
    expect(container.querySelectorAll('.page-right .stage')).toHaveLength(2);
  });

  it('shows one linked stage on wide screens', () => {
    setMedia({ wide: true });
    const { container } = renderLesson();
    expect(container.querySelector('.page-right').dataset.sticky).toBe('true');
    expect(container.querySelectorAll('.page-right .stage')).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: '절 1 제목' })).toBeTruthy();
  });

  it('no transition with reduced motion', () => {
    setMedia({ wide: true, reduced: true });
    const { container } = renderLesson();
    expect(container.querySelector('.page-right .stage').dataset.motion).toBe('none');
  });
});
