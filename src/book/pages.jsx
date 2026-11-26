import LessonSpread from './lesson/LessonSpread.jsx';
import UnitOpening from './qft/UnitOpening.jsx';

// Route name → page component. Later tasks register their pages here.
const PAGES = {
  open: UnitOpening,
  lesson: LessonSpread,
};

export function pageFor(name) {
  return PAGES[name] ?? null;
}
