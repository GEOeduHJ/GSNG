import { parse as parseYaml } from 'yaml';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter(text) {
  const match = FRONTMATTER.exec(String(text ?? ''));
  if (!match) throw new Error('frontmatter missing');
  return { data: parseYaml(match[1]) ?? {}, body: match[2].trim() };
}

export function normalizeStep(step = {}) {
  return {
    id: String(step.id ?? ''),
    type: step.type ?? 'text',
    data: step.data,
    config: step.config ?? {},
    caption: step.caption ?? '',
    label: step.label ?? '',
    source: step.source ?? '',
    alt: step.alt ?? '',
    schematic: Boolean(step.schematic),
    concepts: Array.isArray(step.concepts) ? step.concepts : [],
  };
}

function splitParagraphs(body) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).join(' '))
    .filter(Boolean);
}

const MARKER = /\[\[([A-Za-z0-9_-]+)\]\]/g;
const HEADING = /^##\s+(.+)$/;

function toParagraph(text) {
  const refs = [...text.matchAll(MARKER)].map((match) => match[1]);
  return { text: text.replace(MARKER, ' ').replace(/\s+/g, ' ').trim(), refs };
}

/** Body → sections: `## title` opens a section; `[[id]]` markers become data refs. */
export function parseLessonBody(body) {
  const sections = [];
  let current = null;
  let buffer = [];
  const flush = () => {
    const paragraphs = splitParagraphs(buffer.join('\n')).map(toParagraph).filter((p) => p.text || p.refs.length);
    if (paragraphs.length || current) {
      if (!current) current = { title: '', paragraphs: [] };
      current.paragraphs.push(...paragraphs);
    }
    buffer = [];
  };
  for (const line of String(body ?? '').split(/\r?\n/)) {
    const heading = HEADING.exec(line.trim());
    if (heading) {
      flush();
      if (current) sections.push(current);
      current = { title: heading[1].trim(), paragraphs: [] };
    } else buffer.push(line);
  }
  flush();
  if (current) sections.push(current);
  return { sections, paragraphs: sections.flatMap((section) => section.paragraphs.map((p) => p.text)) };
}

/** Old-format lessons: paragraph i links to step i when that step holds data. */
export function legacySections(paragraphs, steps) {
  return [{ title: '', paragraphs: paragraphs.map((text, index) => ({ text, refs: steps[index] && steps[index].type !== 'text' ? [steps[index].id] : [] })) }];
}

export function parseLesson(text, { unitId, index }) {
  const { data, body } = parseFrontmatter(text);
  const steps = (data.steps ?? []).map(normalizeStep);
  const module = /^##\s+/m.test(body);
  const parsed = module ? parseLessonBody(body) : null;
  const paragraphs = module ? parsed.paragraphs : splitParagraphs(body);
  return {
    id: `lesson-${unitId}-${index}`,
    unitId,
    index,
    title: data.title ?? '',
    goal: data.goal ?? '',
    format: module ? 'module' : 'legacy',
    opener: data.opener ?? '',
    summary: Array.isArray(data.summary) ? data.summary.map(String) : [],
    textbookRef: data.textbookRef ?? null,
    paragraphs,
    sections: module ? parsed.sections : legacySections(paragraphs, steps),
    steps,
    keyTerms: data.keyTerms ?? [],
    activity: { template: '', config: {}, fictional: false, ...(data.activity ?? {}) },
    sourceIds: data.sourceIds ?? [],
    ...(data.illustration ? { illustration: data.illustration } : {}),
  };
}

export function parseUnit(yamlText) {
  const data = parseYaml(yamlText) ?? {};
  const opening = data.opening ?? {};
  const closing = data.closing ?? {};
  const transfer = closing.transfer ?? {};
  return {
    id: String(data.id ?? ''),
    standardCode: data.standardCode ?? '',
    title: data.title ?? '',
    goal: data.goal ?? '',
    concepts: data.concepts ?? [],
    opening: {
      intro: opening.intro ?? '',
      ...(opening.illustration ? { illustration: opening.illustration } : {}),
      focus: { kind: opening.focus?.kind ?? 'text', step: normalizeStep(opening.focus?.step) },
    },
    closing: {
      summary: closing.summary ?? '',
      bridge: closing.bridge ?? '',
      transfer: { prompt: transfer.prompt ?? '', ...(transfer.step ? { step: normalizeStep(transfer.step) } : {}) },
    },
    lessons: [],
  };
}
