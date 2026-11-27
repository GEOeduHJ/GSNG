import { describe, expect, it } from 'vitest';
import { STORAGE_KEY_V4, createStore, emptyUnitRecord, migrateV3, normalizeUnitRecord } from '../src/storage/unitRecords.js';
import { buildResultFile, parseResultFile, resultFileName } from '../src/storage/resultFile.js';
import { newQuestion, lessonBornQuestions } from '../src/book/qft/questions.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => { data[key] = String(value); },
    removeItem: (key) => { delete data[key]; },
    data,
  };
}

const throwingStorage = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('blocked'); },
};

const V3_KEY = 'world-citizenship-geography-digital-textbook-v2';

describe('createStore', () => {
  it('survives throwing storage', () => {
    const store = createStore(throwingStorage);
    const loaded = store.load();
    expect(loaded.available).toBe(false);
    expect(loaded.units).toEqual({});
    expect(store.save({ '01-01': emptyUnitRecord('01-01') })).toBe(false);
  });

  it('treats missing storage as unavailable', () => {
    expect(createStore(null).load().available).toBe(false);
  });

  it('round-trips units through storage', () => {
    const storage = memoryStorage();
    const store = createStore(storage);
    const record = { ...emptyUnitRecord('01-01'), displayName: '3번' };
    expect(store.save({ '01-01': record })).toBe(true);
    expect(JSON.parse(storage.data[STORAGE_KEY_V4]).version).toBe(4);
    expect(createStore(storage).load()).toEqual({ units: { '01-01': record }, available: true });
  });

  it('migrates v3 records when no v4 data exists and keeps the v3 key', () => {
    const v3 = { version: 3, records: { '12세지01-01': { questions: [{ id: 'q1', text: '왜?', classification: '열린', convertedType: '', convertedText: '', selectedVersion: 'original', selected: true }], evidencePlan: '통계 보기', evidenceItems: [{ questionId: 'q1', observation: '무역 비중 증가' }], claim: '주장', reasoning: '추론', reflection: '성찰' } } };
    const storage = memoryStorage({ [V3_KEY]: JSON.stringify(v3) });
    const { units } = createStore(storage).load();
    expect(units['01-01'].questions[0]).toMatchObject({ id: 'q1', text: '왜?', selected: true, conceptTags: [] });
    expect(storage.data[V3_KEY]).toBeDefined();
  });
});

describe('migrateV3', () => {
  it('maps module codes and renamed fields', () => {
    const migrated = migrateV3({ version: 3, records: { '12세지01-01': { questions: [], evidencePlan: '계획', evidenceItems: [{ questionId: 'q1', observation: '관찰' }], claim: 'c', reasoning: 'r', reflection: 'f' } } });
    const record = migrated['01-01'];
    expect(record.unitId).toBe('01-01');
    expect(record.nextStepPlan).toBe('계획');
    expect(record.evidence).toEqual([{ id: 'migrated-01-01-1', questionId: 'q1', lessonId: null, stepId: null, note: '관찰' }]);
    expect(record.explanation).toEqual({ questionId: '', claim: 'c', reasoning: 'r', evidenceIds: [] });
    expect(record.reflection).toBe('f');
  });
});

describe('result files', () => {
  const unit = { id: '01-01', title: '세계화와 세계시민' };

  it('sanitizes display names in file names', () => {
    expect(resultFileName({ displayName: '김 하/나' }, '01-01')).toBe('gsng-01-01-김_하_나.json');
    expect(resultFileName({ displayName: '' }, '01-01')).toBe('gsng-01-01-학생.json');
    expect(resultFileName({ displayName: '  ' }, '01-01')).toBe('gsng-01-01-학생.json');
  });

  it('builds a versioned result file', () => {
    const file = buildResultFile({ ...emptyUnitRecord('01-01'), displayName: '7번' }, unit, new Date('2026-11-27T01:02:03Z'));
    expect(file).toMatchObject({ schema: 'gsng-unit-result', schemaVersion: 1, exportedAt: '2026-11-27T01:02:03.000Z', unitId: '01-01', unitTitle: '세계화와 세계시민', displayName: '7번' });
    expect(file).not.toHaveProperty('activityState');
  });

  it('round-trips through JSON', () => {
    const file = buildResultFile({ ...emptyUnitRecord('01-01'), displayName: 'a' }, unit, new Date('2026-11-27T00:00:00Z'));
    expect(parseResultFile(JSON.stringify(file))).toEqual({ ok: true, value: file });
  });

  it('rejects broken or foreign files', () => {
    expect(parseResultFile('x')).toEqual({ ok: false, reason: 'not-json' });
    expect(parseResultFile('{"schema":"other"}')).toEqual({ ok: false, reason: 'wrong-schema' });
    expect(parseResultFile('null')).toEqual({ ok: false, reason: 'wrong-schema' });
    expect(parseResultFile('{"schema":"gsng-unit-result","schemaVersion":2}')).toEqual({ ok: false, reason: 'unsupported-version' });
  });
});

describe('lesson-born questions', () => {
  const unit = { id: '03-01', title: '인구' };
  it('keeps fromLessonId through normalize and result-file round trip', () => {
    const record = normalizeUnitRecord('03-01', { questions: [newQuestion('왜 줄까?', { fromLessonId: 'lesson-03-01-2' })] });
    expect(record.questions[0].fromLessonId).toBe('lesson-03-01-2');
    const parsed = parseResultFile(JSON.stringify(buildResultFile(record, unit, new Date('2026-11-27T00:00:00Z'))));
    expect(parsed.ok).toBe(true);
    expect(parsed.value.questions[0].fromLessonId).toBe('lesson-03-01-2');
  });
  it('defaults fromLessonId to null for old records', () => {
    expect(normalizeUnitRecord('03-01', { questions: [{ id: 'a', text: 'x' }] }).questions[0].fromLessonId).toBeNull();
  });
  it('lists filled lesson-born questions, optionally for one lesson', () => {
    const record = { questions: [newQuestion('가', { fromLessonId: 'l1' }), newQuestion('나', { fromLessonId: 'l2' }), newQuestion('다'), newQuestion('  ', { fromLessonId: 'l1' })] };
    expect(lessonBornQuestions(record).map((q) => q.text)).toEqual(['가', '나']);
    expect(lessonBornQuestions(record, 'l2').map((q) => q.text)).toEqual(['나']);
  });
});

describe('routine state', () => {
  it('normalizes routineState to an object', () => {
    expect(normalizeUnitRecord('01-01', { routineState: 'x' }).routineState).toEqual({});
    expect(normalizeUnitRecord('01-01', { routineState: { l1: { opener: { see: 'a' } }, l2: 'bad' } }).routineState).toEqual({ l1: { opener: { see: 'a' } } });
  });
});
