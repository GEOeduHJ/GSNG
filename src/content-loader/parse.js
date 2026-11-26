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

export function parseLesson(text, { unitId, index }) {
  const { data, body } = parseFrontmatter(text);
  return {
    id: `lesson-${unitId}-${index}`,
    unitId,
    index,
    title: data.title ?? '',
    goal: data.goal ?? '',
    paragraphs: splitParagraphs(body),
    steps: (data.steps ?? []).map(normalizeStep),
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
