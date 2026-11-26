import LessonSpread from './lesson/LessonSpread.jsx';
import UnitOpening from './qft/UnitOpening.jsx';
import UnitClosing from './close/UnitClosing.jsx';
import TeacherPage from '../teacher/TeacherPage.jsx';

// Route name → page component. Later tasks register their pages here.
const PAGES = {
  open: UnitOpening,
  lesson: LessonSpread,
  close: UnitClosing,
  teacher: TeacherPage,
};

export function pageFor(name) {
  return PAGES[name] ?? null;
}
