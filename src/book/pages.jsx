import LessonSpread from './lesson/LessonSpread.jsx';

// Route name → page component. Later tasks register their pages here.
const PAGES = {
  lesson: LessonSpread,
};

export function pageFor(name) {
  return PAGES[name] ?? null;
}
