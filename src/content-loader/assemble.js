import { parse as parseYaml } from 'yaml';
import { parseLesson, parseUnit } from './parse.js';

const UNIT_FILE = /content\/book\/([^/]+)\/unit\.yaml$/;
const LESSON_FILE = /content\/book\/([^/]+)\/lesson-(\d+)\.md$/;
const TEACHER_FILE = /content\/book\/([^/]+)\/teacher\.md$/;

function findText(files, suffix) {
  const key = Object.keys(files).find((path) => path.endsWith(suffix));
  return key ? files[key] : '';
}

const SOURCES_DIR = /content\/sources\/[^/]+\.ya?ml$/;
const MANIFESTS_DIR = /content\/manifests\/[^/]+\.ya?ml$/;
const PROVENANCE_DIR = /content\/provenance\/[^/]+\.ya?ml$/;

/** Per-unit record files (sorted by path) so parallel work on different units never edits the same file. */
function yamlFiles(files, pattern) {
  return Object.keys(files).filter((path) => pattern.test(path)).sort().map((path) => parseYaml(files[path]) ?? {});
}

function yamlFile(files, suffix, fallback) {
  const text = findText(files, suffix);
  return text ? (parseYaml(text) ?? fallback) : fallback;
}

/** files: { 'content/...path': text } (paths may carry a leading '/') */
/** content/routines.yaml → {source, items: {id: {...entry, id}}}. */
function routineLibrary(data) {
  const items = Object.fromEntries(Object.entries(data?.routines ?? {}).map(([id, entry]) => [id, { ...entry, id, steps: Array.isArray(entry?.steps) ? entry.steps : [] }]));
  return { source: data?.source ?? {}, items };
}

export function assembleBook(files) {
  const units = new Map();
  const teacher = {};
  for (const [path, text] of Object.entries(files)) {
    const unitMatch = UNIT_FILE.exec(path);
    if (unitMatch) {
      const unit = parseUnit(text);
      const existing = units.get(unitMatch[1]);
      units.set(unitMatch[1], { ...unit, lessons: existing?.lessons ?? [] });
    }
    const teacherMatch = TEACHER_FILE.exec(path);
    if (teacherMatch) teacher[teacherMatch[1]] = text;
  }
  for (const [path, text] of Object.entries(files)) {
    const lessonMatch = LESSON_FILE.exec(path);
    if (!lessonMatch) continue;
    const unitId = lessonMatch[1];
    const target = units.get(unitId);
    if (!target) continue;
    target.lessons.push(parseLesson(text, { unitId, index: Number(lessonMatch[2]) }));
  }
  for (const unit of units.values()) unit.lessons.sort((a, b) => a.index - b.index);

  return {
    toc: yamlFile(files, 'content/book/toc.yaml', { parts: [] }),
    units: [...units.values()],
    teacher,
    concepts: yamlFile(files, 'content/concepts.yaml', {}).concepts ?? {},
    routines: routineLibrary(yamlFile(files, 'content/routines.yaml', {})),
    sources: Object.assign({}, yamlFile(files, 'content/sources.yaml', {}).sources ?? {}, ...yamlFiles(files, SOURCES_DIR).map((data) => data.sources ?? {})),
    manifest: { items: [...(yamlFile(files, 'content/data-manifest.yaml', { items: [] }).items ?? []), ...yamlFiles(files, MANIFESTS_DIR).flatMap((data) => data.items ?? [])] },
    provenance: { items: [...(yamlFile(files, 'content/image-provenance.yaml', { items: [] }).items ?? []), ...yamlFiles(files, PROVENANCE_DIR).flatMap((data) => data.items ?? [])] },
  };
}

/** Units with a unit.yaml are checked in full; the rest only need to be in the table of contents. */
export function fullUnitIds(book) {
  return book.units.map((unit) => unit.id).sort();
}
