import { useEffect, useMemo, useState } from 'react';
import BookNavigation from './components/BookNavigation.jsx';
import BookReader from './components/BookReader.jsx';
import CourseHome from './components/CourseHome.jsx';
import QFTFlow from './components/QFTFlow.jsx';
import { BOOK_UNITS, LESSON_BY_ID, MIDDLE_UNIT_BY_ID, validateCourseContent } from './content/bookIndex.js';
import { MODULES, MODULE_BY_CODE } from './modules/index.js';

const STORAGE_KEY = 'world-citizenship-geography-digital-textbook-v2';
const LEGACY_STORAGE_KEY = 'world-citizenship-geography-react-v1';

function emptyRecord(moduleCode = 'module') {
  return {
    questions: [{ id: `seed-${moduleCode}`, text: '', classification: '', convertedType: '', convertedText: '', selected: false }],
    qftPhase: 0,
    priorityReason: '',
    evidencePlan: '',
    evidenceItems: [],
    claim: '',
    evidenceSummary: '',
    reasoning: '',
    reflection: '',
    completed: false,
  };
}

function migrateLegacyRecords(value = {}) {
  const records = {};
  for (const [code, old] of Object.entries(value || {})) {
    const record = emptyRecord(code);
    const questions = Array.isArray(old?.questions) ? old.questions.map((text, index) => ({ text: String(text || ''), index })).filter((item) => item.text.trim()) : [];
    record.questions = questions.length ? questions.map(({ text, index }) => ({
      id: `migrated-${code}-${index + 1}`,
      text,
      classification: '',
      convertedType: '',
      convertedText: '',
      selected: index === Number(old.selectedQuestion),
    })) : record.questions;
    record.claim = old?.claim || '';
    record.evidenceSummary = old?.evidence || '';
    record.reasoning = old?.reasoning || '';
    record.completed = Boolean(old?.completed);
    records[code] = record;
  }
  return records;
}

function readStoredData() {
  if (typeof window === 'undefined') return { records: {}, readLessons: {} };
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored && stored.version === 2) return {
      records: stored.records && typeof stored.records === 'object' ? stored.records : {},
      readLessons: stored.readLessons && typeof stored.readLessons === 'object' ? stored.readLessons : {},
    };
    const legacy = JSON.parse(window.localStorage.getItem(LEGACY_STORAGE_KEY) || '{}');
    return { records: migrateLegacyRecords(legacy), readLessons: {} };
  } catch {
    return { records: {}, readLessons: {} };
  }
}

function viewFromHash() {
  if (typeof window === 'undefined') return { type: 'home' };
  let hash = '';
  try { hash = decodeURIComponent(window.location.hash.replace(/^#/, '')); } catch { return { type: 'home' }; }
  if (!hash || hash === 'home') return { type: 'home' };
  const [type, id] = hash.split('/');
  if (type === 'lesson' && LESSON_BY_ID[id]) return { type, id };
  if (type === 'module' && MODULE_BY_CODE[id]) return { type, code: id };
  if (MODULE_BY_CODE[hash]) return { type: 'module', code: hash };
  if (LESSON_BY_ID[hash]) return { type: 'lesson', id: hash };
  return { type: 'home' };
}

function routeHash(view) {
  if (view.type === 'lesson') return `#lesson/${encodeURIComponent(view.id)}`;
  if (view.type === 'module') return `#module/${encodeURIComponent(view.code)}`;
  return '#home';
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function App() {
  const [activeView, setActiveView] = useState(viewFromHash);
  const initialData = useMemo(readStoredData, []);
  const [records, setRecords] = useState(initialData.records);
  const [readLessons, setReadLessons] = useState(initialData.readLessons);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [storageError, setStorageError] = useState(false);

  const lesson = activeView.type === 'lesson' ? LESSON_BY_ID[activeView.id] : null;
  const unit = lesson ? MIDDLE_UNIT_BY_ID[lesson.unitId] : null;
  const part = lesson ? BOOK_UNITS.find((item) => item.id === lesson.partId) : null;
  const moduleCode = activeView.type === 'module' ? activeView.code : lesson?.moduleCode;
  const module = MODULE_BY_CODE[moduleCode] || null;
  const activeRecord = module ? { ...emptyRecord(module.code), ...(records[module.code] || {}) } : null;
  const generatedQuestionCount = activeRecord?.questions?.filter((question) => question?.text?.trim()).length || 0;
  const validationProblems = useMemo(validateCourseContent, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, records, readLessons }));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [records, readLessons]);

  useEffect(() => {
    const handleLocation = () => setActiveView(viewFromHash());
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  useEffect(() => {
    const pageTitle = lesson?.title || module?.title || '과목 안내';
    document.title = `${pageTitle} · 세계시민과 지리`;
  }, [lesson?.title, module?.title]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', sidebarOpen);
    return () => document.body.classList.remove('menu-open');
  }, [sidebarOpen]);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 3200);
  }

  function navigate(view) {
    setActiveView(view);
    window.history.pushState({ view }, '', routeHash(view));
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function openHome() { navigate({ type: 'home' }); }
  function openLesson(id) {
    if (LESSON_BY_ID[id]) navigate({ type: 'lesson', id });
  }
  function openModule(code) {
    if (MODULE_BY_CODE[code]) navigate({ type: 'module', code });
  }

  function updateRecord(code, changes) {
    if (!code) return;
    setRecords((current) => {
      const existing = { ...emptyRecord(code), ...(current[code] || {}) };
      const updated = typeof changes === 'function' ? changes(existing) : { ...existing, ...changes };
      return { ...current, [code]: updated };
    });
  }

  function markLessonRead(id, read) {
    setReadLessons((current) => ({ ...current, [id]: Boolean(read) }));
  }

  function exportRecords() {
    downloadJson('world-citizenship-geography-learning-records.json', {
      course: '세계시민과 지리',
      exportedAt: new Date().toISOString(),
      storage: '현재 브라우저 로컬 기록',
      readLessons,
      records,
    });
    showToast('이 기기에 저장된 학습 기록을 내려받았습니다.');
  }

  function clearRecords() {
    const confirmed = window.confirm('이 브라우저에 저장된 모든 읽기·탐구 기록을 지울까요?');
    if (!confirmed) return;
    setRecords({});
    setReadLessons({});
    try { window.localStorage.removeItem(LEGACY_STORAGE_KEY); } catch { setStorageError(true); }
    showToast('현재 브라우저의 학습 기록을 지웠습니다.');
  }

  const currentRecord = activeRecord || emptyRecord();
  const isQftRoute = activeView.type === 'module';

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
      <div className={`app-shell${sidebarOpen ? ' is-sidebar-open' : ''}`}>
        <BookNavigation
          units={BOOK_UNITS}
          modules={MODULES}
          records={records}
          readLessons={readLessons}
          activeView={activeView}
          qftMode={isQftRoute}
          questionCount={generatedQuestionCount}
          onHome={openHome}
          onSelectLesson={openLesson}
          onSelectModule={openModule}
          onClose={() => setSidebarOpen(false)}
        />
        {sidebarOpen && <button className="sidebar-scrim" type="button" aria-label="목차 닫기" onClick={() => setSidebarOpen(false)} />}

        <div className="main-column">
          <header className="topbar">
            <button type="button" className="mobile-menu-button" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((value) => !value)}><span aria-hidden="true">☰</span> 목차</button>
            <div className="topbar-path"><span>세계시민과 지리</span><span aria-hidden="true">/</span><strong>{lesson?.unitTitle || (module ? '질문 탐구' : '과목 안내')}</strong></div>
            <div className="topbar-actions">
              <button type="button" className="quiet-button export-button" onClick={exportRecords}>기록 내보내기</button>
              <button type="button" className="quiet-button clear-button" onClick={clearRecords}>기록 지우기</button>
            </div>
          </header>

          <main id="main-content" className="page-content" tabIndex="-1">
            {validationProblems.length > 0 && <div className="content-warning" role="status">일부 콘텐츠 연결을 확인해야 합니다.</div>}
            {activeView.type === 'home' && <CourseHome units={BOOK_UNITS} modules={MODULES} readLessons={readLessons} records={records} onSelectLesson={openLesson} onSelectModule={openModule} />}
            {lesson && module && unit && part && <BookReader lesson={lesson} part={part} unit={unit} module={module} read={Boolean(readLessons[lesson.id])} onRead={markLessonRead} onSelectModule={openModule} onSelectLesson={openLesson} />}
            {isQftRoute && module && <QFTFlow module={module} record={currentRecord} onChange={(changes) => updateRecord(module.code, changes)} onSelectLesson={openLesson} />}
            {storageError && <div className="storage-warning" role="status"><strong>브라우저 저장을 사용할 수 없습니다.</strong><span>읽기·탐구 화면은 계속 쓸 수 있습니다. 현재 기록을 저장하려면 JSON 파일로 내려받으세요.</span></div>}
            <footer className="global-footer">
              <div><span className="footer-mark" aria-hidden="true">지</span><p><strong>세계시민과 지리</strong><small>웹용으로 독립 집필한 학습 콘텐츠</small></p></div>
              <div className="footer-disclosure"><span>학생별 AI API 호출 없음</span><span>학습 기록은 브라우저에만 저장</span><span>모식 자료는 실제 통계와 구분</span></div>
            </footer>
          </main>
        </div>
      </div>
      <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
