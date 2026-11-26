import { ACTIVITY_TEMPLATE_NAMES } from '../activities/names.js';

/** Extra validation rules that depend on app registries. */
export function activityTemplateRule(lesson, where, errors) {
  const name = lesson.activity?.template;
  if (!ACTIVITY_TEMPLATE_NAMES.includes(name)) errors.push(`${where}: unknown activity template: ${name || '(none)'}`);
}
