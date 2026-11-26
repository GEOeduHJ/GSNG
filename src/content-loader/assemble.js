import { parse as parseYaml } from 'yaml';
import { parseLesson, parseUnit } from './parse.js';

const UNIT_FILE = /content\/book\/([^/]+)\/unit\.yaml$/;
const LESSON_FILE = /content\/book\/([^/]+)\/lesson-(\d+)\.md$/;
const TEACHER_FILE = /content\/book\/([^/]+)\/teacher\.md$/;

function findText(files, suffix) {
  const key = Object.keys(files).find((path) => path.endsWith(suffix));
  return key ? files[key] : '';
}

function yamlFile(files, suffix, fallback) {
  const text = findText(files, suffix);
  return text ? (parseYaml(text) ?? fallback) : fallback;
}

/** files: { 'content/...path': text } (paths may carry a leading '/') */
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
    sources: yamlFile(files, 'content/sources.yaml', {}).sources ?? {},
    manifest: yamlFile(files, 'content/data-manifest.yaml', { items: [] }),
    provenance: yamlFile(files, 'content/image-provenance.yaml', { items: [] }),
  };
}
