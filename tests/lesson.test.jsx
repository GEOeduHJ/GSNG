import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { buildChartOption, chartHeader, chartRows, compactNumber } from '../src/viz/chartData.js';
import { classBreaks, joinValues, legendLabels, formatNumber, pointCategories, countryNames, pointsView, mapOptions } from '../src/viz/mapData.js';
import DataStage from '../src/book/lesson/DataStage.jsx';
import DataMap from '../src/viz/DataMap.jsx';
import LessonSpread from '../src/book/lesson/LessonSpread.jsx';
import { BookProvider } from '../src/book/BookContext.jsx';
import { makeBook, memoryStorage } from './fixtures/book.js';
import { STORAGE_KEY_V4, emptyUnitRecord } from '../src/storage/unitRecords.js';

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

describe('chart and map data', () => {
  it('shades the projection period of a line chart when projectionFrom is set', () => {
    const data = { years: [2022, 2023, 2024, 2025], series: [{ name: '세계', values: [1, 2, 3, 4] }] };
    const area = buildChartOption({ kind: 'line', projectionFrom: 2024 }, data).series[0].markArea;
    expect(area.data[0][0]).toMatchObject({ name: '중위 전망', xAxis: '2024' });
    expect(area.data[0][1]).toMatchObject({ xAxis: '2025' });
    expect(buildChartOption({ kind: 'line' }, data).series[0].markArea).toBeUndefined();
  });

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

  it('builds a population pyramid with males to the left', () => {
    const data = { country: '대한민국', year: 2024, unit: '%', groups: ['0-4', '5-9'], male: [1.5, 2.0], female: [1.4, 1.9] };
    const option = buildChartOption({ kind: 'pyramid' }, data);
    expect(option.yAxis.data).toEqual(['0-4', '5-9']);
    expect(option.series.map((series) => series.name)).toEqual(['남성', '여성']);
    expect(option.series[0].data).toEqual([-1.5, -2.0]);
    expect(option.series[1].data).toEqual([1.4, 1.9]);
    expect(option.xAxis.axisLabel.formatter(-1.5)).toBe('1.5');
    expect(chartRows({ kind: 'pyramid' }, data)).toEqual([['0-4', 1.5, 1.4], ['5-9', 2.0, 1.9]]);
    expect(chartHeader({ kind: 'pyramid' }, data)).toEqual(['연령', '남성(%)', '여성(%)']);
  });

  it('shortens large axis numbers with Korean units', () => {
    expect(compactNumber(217867864)).toBe('2.2억');
    expect(compactNumber(300000000)).toBe('3억');
    expect(compactNumber(56000)).toBe('5.6만');
    expect(compactNumber(1500)).toBe('1,500');
    expect(compactNumber(-25)).toBe('-25');
    const option = buildChartOption({ kind: 'bar' }, { unit: 't', rows: [{ name: 'A', value: 217867864 }] });
    expect(option.xAxis.axisLabel.formatter(200000000)).toBe('2억');
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

describe('point map view', () => {
  const pt = (lon, lat) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties: {} });

  it('fits the extent of several points', () => {
    const view = pointsView({ features: [pt(127.33, 36.33), pt(127.40, 36.36), pt(127.36, 36.28)] });
    expect(view.bounds).toEqual([[127.33, 36.28], [127.4, 36.36]]);
    expect(view.fitBoundsOptions.maxZoom).toBeGreaterThanOrEqual(10);
  });

  it('centres a single point at a regional scale', () => {
    expect(pointsView({ features: [pt(86.9, 27.9)] })).toEqual({ center: [86.9, 27.9], zoom: 4 });
  });

  it('feeds the view into map options and allows closer zoom for points', () => {
    const options = mapOptions({ kind: 'points' }, { view: { center: [1, 2], zoom: 4 } });
    expect(options.center).toEqual([1, 2]);
    expect(options.zoom).toBe(4);
    expect(options.maxZoom).toBeGreaterThanOrEqual(12);
    expect(mapOptions({ kind: 'choropleth' }).maxZoom).toBe(6);
  });
});

describe('class breaks with many identical values', () => {
  it('returns strictly increasing breaks so the map style stays valid', () => {
    const values = [...Array(100).fill(0), 5, 10, 50, 100, 500, 1000, 5000, 90000];
    const breaks = classBreaks(values, 5);
    expect(breaks.length).toBeGreaterThanOrEqual(3);
    breaks.forEach((value, index) => { if (index > 0) expect(value).toBeGreaterThan(breaks[index - 1]); });
    expect(breaks[0]).toBeGreaterThan(0);
  });

  it('never repeats a break when values tie', () => {
    const breaks = classBreaks([1, 1, 1, 1, 2, 2, 2, 3, 3, 9], 5);
    expect(new Set(breaks).size).toBe(breaks.length);
  });
});

describe('values below the reporting threshold', () => {
  it('marks below-threshold countries instead of treating them as missing', () => {
    const geo = { type: 'FeatureCollection', features: [{ properties: { iso_a3: 'KOR' } }, { properties: { iso_a3: 'XXX' } }] };
    const joined = joinValues(geo, { KOR: null, XXX: null }, { KOR: '<0.1' });
    expect(joined.features[0].properties).toMatchObject({ value: null, below: true });
    expect(joined.features[1].properties.below).toBe(false);
  });
});

describe('separately counted areas', () => {
  it('marks areas reported as one combined unit instead of colouring them by value', () => {
    const geo = { type: 'FeatureCollection', features: [{ properties: { iso_a3: 'ISR' } }, { properties: { iso_a3: 'PSE' } }, { properties: { iso_a3: 'UKR' } }] };
    const joined = joinValues(geo, { ISR: null, PSE: null, UKR: 5 }, {}, { ISR: true, PSE: true });
    expect(joined.features.map((f) => f.properties.special)).toEqual([true, true, false]);
    expect(joined.features[2].properties.value).toBe(5);
  });
});

describe('country display names', () => {
  it('uses the usual Korean textbook names for a few long official names', () => {
    const geo = { features: [
      { properties: { iso_a3: 'CHN', name: 'China', name_ko: '중화인민공화국' } },
      { properties: { iso_a3: 'PRK', name: 'North Korea', name_ko: '조선민주주의인민공화국' } },
      { properties: { iso_a3: 'TWN', name: 'Taiwan', name_ko: '중화민국' } },
      { properties: { iso_a3: 'KOR', name: 'South Korea', name_ko: '대한민국' } },
      { properties: { iso_a3: 'TUR', name: 'Turkey', name_ko: '터키' } },
      { properties: { iso_a3: 'XYZ', name: 'Somewhere' } },
    ] };
    expect(countryNames(geo)).toEqual({ CHN: '중국', PRK: '북한', TWN: '타이완', KOR: '대한민국', TUR: '튀르키예', XYZ: 'Somewhere' });
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

  it('labels schematic captions as 개념도', () => {
    const step = { id: 'd9', type: 'image', data: '/images/03-01/model.svg', caption: '인구 변천 모형', source: '', alt: '설명', config: {}, schematic: true, concepts: [] };
    const { container } = render(<DataStage step={step} manifest={{ items: [] }} />);
    expect(container.querySelector('figcaption').textContent.startsWith('개념도 · 인구 변천 모형')).toBe(true);
  });
});

function renderLesson(book = makeBook(), index = 1) {
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
  const unit = book.units[0];
  return render(<BookProvider book={book} storage={memoryStorage()}><LessonSpread unit={unit} route={{ name: 'lesson', unitId: '01-01', index }} /></BookProvider>);
}

describe('LessonSpread layout', () => {
  it('stacks below 1024px without a right-page data panel', () => {
    setMedia({ wide: false });
    const { container } = renderLesson();
    expect(container.querySelector('.spread.is-narrow')).toBeTruthy();
    expect(container.querySelectorAll('.stage')).toHaveLength(0);
  });

  it('shows one selected stage on wide screens', () => {
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

describe('lesson module page', () => {
  const dataButton = (id) => screen.getByRole('button', { name: new RegExp(`자료 보기.*${id}`) });

  it('shows the first linked data on the right and switches only on button press', () => {
    setMedia({ wide: true });
    renderLesson(makeBook({ moduleLesson: true }), 2);
    expect(document.querySelector('.page-right [data-step]').dataset.step).toBe('m1');
    fireEvent.click(dataButton('m2'));
    expect(document.querySelector('.page-right [data-step]').dataset.step).toBe('m2');
    expect(dataButton('m2').getAttribute('aria-pressed')).toBe('true');
    expect(dataButton('m1').getAttribute('aria-pressed')).toBe('false');
    expect(document.querySelector('.data-panel-head').textContent).toContain('소주제 나');
  });

  it('expands data under the paragraph on narrow screens', () => {
    setMedia({ wide: false });
    renderLesson(makeBook({ moduleLesson: true }), 2);
    expect(dataButton('m1').getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(dataButton('m1'));
    expect(dataButton('m1').getAttribute('aria-expanded')).toBe('true');
    expect(document.querySelectorAll('.inline-stage [data-step="m1"]')).toHaveLength(1);
    fireEvent.click(dataButton('m1'));
    expect(document.querySelectorAll('.inline-stage [data-step="m1"]')).toHaveLength(0);
  });

  it('shows the opener and topic headings', () => {
    setMedia({ wide: true });
    renderLesson(makeBook({ moduleLesson: true }), 2);
    expect(screen.getByText('생각 열기 문장')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: '소주제 가' })).toBeTruthy();
  });

  it('puts activity, summary and my questions below the spread in that order', () => {
    setMedia({ wide: true });
    renderLesson(makeBook({ moduleLesson: true }), 2);
    const headings = [...document.querySelectorAll('.lesson-after > section > h2')].map((h) => h.textContent);
    expect(headings).toEqual(['내 질문으로 자료 읽기', '핵심 정리', '내 질문과 이 절']);
    expect(document.querySelector('.spread .my-questions')).toBeNull();
  });

  it('renders legacy lessons with per-paragraph buttons and no empty opener or summary', () => {
    setMedia({ wide: true });
    renderLesson(makeBook(), 1);
    expect(screen.getAllByRole('button', { name: /자료 보기/ })).toHaveLength(2);
    expect(screen.queryByText('생각 열기')).toBeNull();
    expect(screen.queryByRole('heading', { name: '핵심 정리' })).toBeNull();
  });

  it('skips buttons for unknown refs without crashing', () => {
    setMedia({ wide: true });
    const book = makeBook({ moduleLesson: true });
    book.units[0].lessons[1].sections[0].paragraphs[0].refs = ['nope', 'm1'];
    renderLesson(book, 2);
    expect(screen.getAllByRole('button', { name: /자료 보기/ })).toHaveLength(3);
  });
});

describe('내 질문과 이 절', () => {
  function renderWith(record) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    setMedia({ wide: true });
    const storage = memoryStorage({ [STORAGE_KEY_V4]: JSON.stringify({ version: 4, units: { '01-01': record } }) });
    const book = makeBook();
    render(<BookProvider book={book} storage={storage}><LessonSpread unit={book.units[0]} route={{ name: 'lesson', unitId: '01-01', index: 2 }} /></BookProvider>);
    return storage;
  }
  it('adds a lesson-born question and disables the button for blank input', () => {
    const storage = renderWith(emptyUnitRecord('01-01'));
    const box = screen.getByLabelText('이 절을 마치며 새로 생긴 질문');
    const add = screen.getByRole('button', { name: '질문 목록에 넣기' });
    fireEvent.change(box, { target: { value: '   ' } });
    expect(add.disabled).toBe(true);
    fireEvent.change(box, { target: { value: '인구는 왜 줄까' } });
    fireEvent.click(add);
    const saved = JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];
    expect(saved.questions.at(-1)).toMatchObject({ text: '인구는 왜 줄까', fromLessonId: 'lesson-01-01-2', selected: false });
    expect(box.value).toBe('');
    expect(screen.getByText('인구는 왜 줄까')).toBeTruthy();
  });
  it('shows old evidence whose stepId no longer exists as a note only', () => {
    renderWith({ ...emptyUnitRecord('01-01'), evidence: [{ id: 'e1', questionId: 'q1', lessonId: 'lesson-01-01-2', stepId: 'gone', note: '옛 메모' }] });
    expect(screen.getByText('옛 메모')).toBeTruthy();
  });
  it('defaults the evidence source to the data opened on narrow screens', () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    setMedia({ wide: false });
    const book = makeBook();
    render(<BookProvider book={book} storage={memoryStorage()}><LessonSpread unit={book.units[0]} route={{ name: 'lesson', unitId: '01-01', index: 2 }} /></BookProvider>);
    fireEvent.click(screen.getByRole('button', { name: /자료 보기.*l2s3/ }));
    expect(screen.getByLabelText('어느 자료에서').value).toBe('l2s3');
  });
  it('defaults the evidence source to the data being viewed', () => {
    renderWith(emptyUnitRecord('01-01'));
    fireEvent.click(screen.getByRole('button', { name: /자료 보기.*l2s3/ }));
    expect(screen.getByLabelText('어느 자료에서').value).toBe('l2s3');
  });
});

describe('Korean display units', () => {
  it('map legend and table use config.unit over the data file unit', async () => {
    const base = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: { iso_a3: 'KOR', name_ko: '대한민국' }, geometry: null }] };
    const payload = { year: 2024, unit: 'persons per sq. km of land area', values: { KOR: 530, JPN: 340, CHN: 150, USA: 37, IND: 488, BRA: 26 } };
    vi.stubGlobal('fetch', vi.fn(async (url) => ({ ok: true, json: async () => (String(url).includes('countries') ? base : payload) })));
    render(<DataMap url="/data/unit-test.json" config={{ kind: 'choropleth', unit: '명/km²' }} alt="지도" fallback={null} />);
    await waitFor(() => expect(document.querySelector('.map-legend')?.getAttribute('aria-label')).toBe('범례 (명/km²)'));
  });
});

describe('routine cards', () => {
  function renderModule({ book = makeBook({ moduleLesson: true }), index = 2, storage = memoryStorage(), wide = true } = {}) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    setMedia({ wide });
    const utils = render(<BookProvider book={book} storage={storage}><LessonSpread unit={book.units[0]} route={{ name: 'lesson', unitId: '01-01', index }} /></BookProvider>);
    return { ...utils, storage, book };
  }
  const saved = (storage) => JSON.parse(storage.data[STORAGE_KEY_V4]).units['01-01'];

  it('renders opener, inquiry and closing routine cards in place', () => {
    renderModule();
    expect(document.querySelectorAll('.opener .routine-card[data-slot="opener"]')).toHaveLength(1);
    expect(document.querySelectorAll('.activity .routine-card[data-slot="inquiry"]')).toHaveLength(1);
    expect(document.querySelectorAll('.my-questions .routine-card[data-slot="closing"]')).toHaveLength(1);
    expect(document.querySelector('.routine-card[data-slot="closing"] h3').textContent).toContain('I Used to Think');
    expect(document.querySelector('.routine-card[data-slot="opener"]').textContent).toContain('열기 안내');
  });

  it('saves answers per lesson and slot', () => {
    const { storage } = renderModule();
    fireEvent.change(screen.getByLabelText('본 것'), { target: { value: '무역 비중이 높은 나라' } });
    expect(saved(storage).routineState['lesson-01-01-2'].opener.see).toBe('무역 비중이 높은 나라');
  });

  it('keeps lessons separate', () => {
    const storage = memoryStorage();
    const first = renderModule({ storage });
    fireEvent.change(screen.getByLabelText('예전 생각'), { target: { value: '2절의 예전 생각' } });
    first.unmount();
    renderModule({ storage, index: 1 });
    expect(document.querySelector('.routine-card[data-slot="opener"]')).toBeNull();
    expect(document.querySelector('.routine-card[data-slot="inquiry"]')).toBeNull();
    expect(screen.getByLabelText('예전 생각').value).toBe('');
  });

  it('sends a wonder to the question list once', () => {
    const { storage } = renderModule();
    const box = screen.getByLabelText('궁금한 것');
    const send = within(box.closest('.routine-step')).getByRole('button', { name: '질문 목록에 넣기' });
    fireEvent.change(box, { target: { value: '   ' } });
    expect(send.disabled).toBe(true);
    fireEvent.change(box, { target: { value: '왜 무역이 늘었을까' } });
    expect(send.disabled).toBe(false);
    fireEvent.click(send);
    expect(saved(storage).questions.at(-1)).toMatchObject({ text: '왜 무역이 늘었을까', fromLessonId: 'lesson-01-01-2' });
    expect(send.disabled).toBe(true);
    expect(screen.getByText('넣었습니다')).toBeTruthy();
    fireEvent.change(box, { target: { value: '왜 무역이 늘었을까?' } });
    expect(send.disabled).toBe(false);
  });

  it('does not add the same question again after edit-and-revert or when already in the list', () => {
    const { storage } = renderModule();
    const box = screen.getByLabelText('궁금한 것');
    const send = within(box.closest('.routine-step')).getByRole('button', { name: '질문 목록에 넣기' });
    fireEvent.change(box, { target: { value: '왜 무역이 늘었을까' } });
    fireEvent.click(send);
    fireEvent.change(box, { target: { value: '왜 무역이 늘었을까?' } });
    fireEvent.click(send);
    fireEvent.change(box, { target: { value: '왜 무역이 늘었을까' } });
    expect(send.disabled).toBe(true);
    fireEvent.click(send);
    expect(saved(storage).questions.filter((q) => q.text === '왜 무역이 늘었을까')).toHaveLength(1);
  });

  it('puts the fictional note on the activity, not above the routine card', () => {
    const book = makeBook({ moduleLesson: true });
    book.units[0].lessons[1].activity = { template: 'civic-hearing', fictional: true, config: { title: '청문회', actors: [], levels: [] } };
    renderModule({ book });
    const note = document.querySelector('.activity .fictional-note');
    expect(note.closest('.activity-task')).toBeTruthy();
    expect(note.parentElement.firstElementChild).toBe(note);
  });

  it('skips a card whose routine id is unknown', () => {
    const book = makeBook({ moduleLesson: true });
    book.units[0].lessons[1].routines.inquiry = { id: 'nope', prompt: 'x' };
    renderModule({ book });
    expect(document.querySelector('.routine-card[data-slot="inquiry"]')).toBeNull();
    expect(document.querySelector('.activity h2').textContent).toBe('내 질문으로 자료 읽기');
  });
});
