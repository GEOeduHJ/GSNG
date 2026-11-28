import { isPilotUnit } from '../../storage/unitRecords.js';
import { routineForSlot } from '../../content-loader/routines.js';

const DEFAULT_COMPARE_FIELDS = [
  { id: 'same', label: '두 자료에서 같은 점' },
  { id: 'diff', label: '두 자료에서 다른 점' },
  { id: 'link', label: '내 질문과 이어지는 점' },
];

export function isDefaultPilotRoutine(unitId, lesson, slot) {
  if (!isPilotUnit(unitId)) return false;
  return (lesson.index === 1 && slot === 'opener') || ((lesson.index === 2 || lesson.index === 3) && slot === 'inquiry');
}

/** Collect only actual student answers; static prompts and configuration labels are never sources. */
export function pilotAnswerSources(record, lesson, book) {
  const sources = [];
  const lessonId = lesson.id;
  const routineAnswers = record.routineState?.[lessonId] ?? {};

  for (const slot of ['opener', 'inquiry', 'closing']) {
    const routine = routineForSlot(book, lesson, slot);
    if (!routine) continue;
    const slotAnswers = routineAnswers[slot] ?? {};
    for (const step of routine.steps) {
      const text = typeof slotAnswers[step.id] === 'string' ? slotAnswers[step.id].trim() : '';
      if (!text) continue;
      sources.push({
        id: `routine:${slot}:${step.id}`,
        label: `생각 루틴 · ${step.label}`,
        text,
        sourceRef: { kind: 'routine', lessonId, slot, fieldId: step.id },
      });
    }
  }

  const activity = lesson.activity;
  if (!activity?.template) return sources;
  const template = activity.template;
  const config = activity.config ?? {};
  const value = record.activityState?.[lessonId] ?? {};
  const addActivity = (fieldId, label, answer) => {
    const text = typeof answer === 'string' ? answer.trim() : '';
    if (!text) return;
    sources.push({
      id: `activity:${fieldId}`,
      label: `활동 · ${label}`,
      text,
      sourceRef: { kind: 'activity', lessonId, template, fieldId },
    });
  };

  if (template === 'layer-compare') {
    const fields = config.fields?.length ? config.fields : DEFAULT_COMPARE_FIELDS;
    for (const field of fields) addActivity(field.id, field.label, value.notes?.[field.id]);
  }

  if (template === 'decision-matrix') {
    const options = config.options ?? [];
    const criteria = config.criteria ?? [];
    const choice = options.find((option) => option.id === value.choice);
    if (choice) addActivity('choice', '고른 대안', `선택한 대안: ${choice.label}`);
    for (const option of options) {
      for (const criterion of criteria) {
        const score = value.scores?.[option.id]?.[criterion.id];
        if (Number.isFinite(score) && score > 0) addActivity(`scores.${option.id}.${criterion.id}`, `${option.label} · ${criterion.label}`, `${option.label} — ${criterion.label}: ${score}점`);
      }
    }
    addActivity('reason', '고른 대안과 그 까닭', value.reason);
  }

  if (template === 'evidence-sort') {
    for (const item of config.items ?? []) {
      const category = (config.categories ?? []).find((candidate) => candidate.id === value.sorted?.[item.id]);
      if (category) addActivity(`sorted.${item.id}`, `분류 응답 · ${item.text}`, `${item.text} → ${category.label}`);
    }
    addActivity('reason', '분류가 가장 어려웠던 항목과 그 까닭', value.reason);
  }

  if (template === 'civic-hearing') {
    const actor = (config.actors ?? []).find((candidate) => candidate.id === value.actorId);
    if (actor) addActivity('actorId', '고른 관점', `선택한 관점: ${actor.label} · ${actor.place}`);
    const level = (config.levels ?? []).find((candidate) => candidate.id === value.levelId);
    if (level) addActivity('levelId', '행동 수준', `선택한 행동 수준: ${level.label} — ${level.action}`);
    addActivity('action', '내가 제안하는 행동', value.action);
  }

  return sources;
}
