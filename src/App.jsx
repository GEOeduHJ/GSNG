import { useEffect, useMemo, useState } from 'react';
import { MODULES, MODULE_BY_CODE } from './modules/index.js';
import Sidebar from './components/Sidebar.jsx';
import QuestionComposer from './components/QuestionComposer.jsx';
import ResponseEditor from './components/ResponseEditor.jsx';
import TeacherGuide from './components/TeacherGuide.jsx';
import ModuleVisualization from './components/visualizations/ModuleVisualization.jsx';

const STORAGE_KEY = 'world-citizenship-geography-react-v1';

function emptyRecord() {
  return {
    questions: ['', '', ''],
    selectedQuestion: -1,
    checks: [false, false, false, false],
    claim: '',
    evidence: '',
    reasoning: '',
    completed: false,
  };
}

function readRecords() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function moduleFromHash() {
  let code = '';
  try {
    code = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  } catch {
    return null;
  }
  return MODULE_BY_CODE[code] ? code : null;
}

export default function App() {
  const [activeCode, setActiveCode] = useState(() => moduleFromHash() || MODULES[0]?.code);
  const [records, setRecords] = useState(readRecords);
  const [teacherMode, setTeacherMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState('');
  const module = MODULE_BY_CODE[activeCode] || MODULES[0];
  const record = useMemo(() => ({ ...emptyRecord(), ...(records[activeCode] || {}) }), [records, activeCode]);
  const moduleIndex = MODULES.findIndex((item) => item.code === module.code);
  const conceptGroup = module.group.split(' · ')[0];

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      setToast('브라우저 저장 공간을 사용할 수 없습니다. 현재 기록을 JSON 파일로 내려받아 보관하세요.');
    }
  }, [records]);

  useEffect(() => {
    document.title = `${module.title} · 세계시민과 지리`;
  }, [module.title]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      const code = moduleFromHash();
      if (code && MODULE_BY_CODE[code]) setActiveCode(code);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  }

  function openModule(code) {
    if (!MODULE_BY_CODE[code]) return;
    setActiveCode(code);
    window.history.replaceState(null, '', `#${encodeURIComponent(code)}`);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateRecord(change) {
    setRecords((current) => {
      const existing = { ...emptyRecord(), ...(current[activeCode] || {}) };
      const updated = typeof change === 'function' ? change(existing) : { ...existing, ...change };
      return { ...current, [activeCode]: updated };
    });
  }

  function updateQuestion(index, value) {
    updateRecord((current) => {
      const questions = [...current.questions];
      questions[index] = value;
      return { ...current, questions, completed: false };
    });
  }

  function selectQuestion(index) {
    if (!record.questions[index]?.trim()) {
      showToast('먼저 질문 초안을 적어주세요.');
      return;
    }
    updateRecord({ selectedQuestion: index, completed: false });
  }

  function updateCheck(index, checked) {
    updateRecord((current) => {
      const checks = [...current.checks];
      checks[index] = checked;
      return { ...current, checks };
    });
  }

  function updateResponse(field, value) {
    updateRecord({ [field]: value, completed: false });
  }

  function completeModule() {
    const selectedQuestion = record.questions[record.selectedQuestion];
    if (!selectedQuestion?.trim()) {
      showToast('탐구할 질문을 하나 선택해주세요.');
      document.getElementById('question-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (![record.claim, record.evidence, record.reasoning].every((value) => String(value || '').trim().length >= 4)) {
      showToast('설명·근거·이유를 각각 적으면 탐구 기록을 저장할 수 있어요.');
      document.querySelector('[name="claim"]')?.focus();
      return;
    }
    updateRecord({ completed: true });
    showToast('이 모듈의 탐구 기록을 이 브라우저에 저장했어요.');
  }

  function exportRecord() {
    const payload = {
      course: '세계시민과 지리',
      standardCode: module.code,
      module: module.title,
      exportedAt: new Date().toISOString(),
      record,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `geography-inquiry-${module.moduleId}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('현재 모듈 기록을 JSON 파일로 내려받았습니다.');
  }

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
      <div className="app-shell" id="top">
        <Sidebar modules={MODULES} activeCode={module.code} records={records} onSelect={openModule} />
        {mobileOpen && <button className="menu-backdrop" type="button" aria-label="모듈 메뉴 닫기" onClick={() => setMobileOpen(false)} />}
        <div className="main-column">
          <header className="topbar">
            <button className="mobile-menu" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
              모듈 보기
            </button>
            <div className="breadcrumb" aria-label="현재 위치">
              <span>2022 개정 교육과정</span><span className="crumb-divider" aria-hidden="true">›</span><strong>{module.title}</strong>
            </div>
            <div className="top-actions">
              <span className="prototype-pill"><span aria-hidden="true" />React 학습 시제품</span>
              <button className="mode-button" type="button" aria-pressed={teacherMode} onClick={() => setTeacherMode((value) => !value)}>
                {teacherMode ? '학생 화면으로' : '교사용 안내'}
              </button>
            </div>
          </header>

          <main className="page-content" id="main-content">
            <section className="lesson-hero" aria-labelledby="lesson-title">
              <div className="lesson-meta">
                <span className="module-kicker">모듈 {module.moduleId}</span><span className="meta-dot" />
                <span>{conceptGroup}</span><span className="meta-dot" /><span>{module.time}</span>
              </div>
              <div className="lesson-title-row">
                <div><h1 id="lesson-title">{module.title}</h1><p className="lesson-goal">{module.goal}</p></div>
                <span className="module-seal" aria-hidden="true">{module.moduleId.slice(0, 2)}<small>{module.moduleId.slice(3)}</small></span>
              </div>
              <div className="learning-path" aria-label="오늘의 학습 흐름">
                <span className="path-step is-done"><i>1</i> 개념·관찰</span><b />
                <span className={`path-step${record.questions.some(Boolean) ? ' is-done' : ''}`}><i>2</i> 질문 만들기</span><b />
                <span className={`path-step${record.evidence ? ' is-done' : ''}`}><i>3</i> 근거 탐구</span><b />
                <span className={`path-step${record.completed ? ' is-done' : ''}`}><i>4</i> 설명·성찰</span>
              </div>
            </section>

            <section className="official-standard" aria-labelledby="official-standard-title">
              <div className="standard-label-row"><span className="eyebrow" id="official-standard-title">교육부 2022 개정 교육과정 · 별책 7</span><span className="standard-code">{module.code}</span></div>
              <p>{module.standardText}</p><small>학습 화면과 활동은 위 성취기준을 중심으로 구성했습니다.</small>
            </section>

            <div className="lesson-grid">
              <div className="lesson-main">
                <section className="learning-card concept-card" aria-labelledby="concept-title">
                  <div className="section-heading"><div><span className="eyebrow">먼저 익힐 내용</span><h2 id="concept-title">핵심 개념</h2></div><span className="concept-mark">읽기 · 3분</span></div>
                  <p className="concept-copy">{module.concept}</p>
                  <div className="concept-chips">{module.concepts.map((concept) => <span key={concept}>{concept}</span>)}</div>
                  <div className="question-stimulus"><span className="stimulus-mark">오늘의 탐구 질문</span><strong>{module.inquiryQuestion}</strong><small>자료를 살펴본 뒤, 나만의 질문으로 다시 써보세요.</small></div>
                </section>

                <ModuleVisualization module={module} />

                <QuestionComposer
                  record={record}
                  onQuestionsChange={updateQuestion}
                  onSelectQuestion={selectQuestion}
                  onChecksChange={updateCheck}
                />

                <ResponseEditor record={record} onChange={updateResponse} onComplete={completeModule} />

                {teacherMode && <TeacherGuide module={module} />}
              </div>

              <aside className="lesson-aside" aria-label="탐구 도움 정보">
                <section className="aside-card task-card"><span className="eyebrow">오늘의 탐구</span><h2>활동 안내</h2><p>{module.activity}</p><div className="aside-divider" /><strong>남길 결과물</strong><p className="artifact-name">{module.artifact}</p></section>
                <section className="aside-card evidence-card"><span className="eyebrow">자료 읽기 메모</span><h2>출처와 한계</h2><p>{module.sourceNote}</p><ul><li>누가 만들었나요?</li><li>언제·어디의 자료인가요?</li><li>이 자료만으로 알 수 없는 것은 무엇인가요?</li></ul></section>
                <section className="aside-card rubric-card"><span className="eyebrow">교사 피드백 기준</span><h2>배움 확인</h2><ul>{module.rubric.map((item) => <li key={item}>{item}</li>)}</ul><small>질문·자료 근거·설명이 연결되는지 살펴봅니다.</small></section>
                <section className="aside-card technology-card"><span className="eyebrow">모듈별 도구 설정</span><h2>디지털 기술</h2><ul>{module.digitalTools.map((item) => <li key={item}>{item}</li>)}</ul><div className="aside-divider" /><strong>AI 적용</strong><p className="artifact-name">{module.ai.status === 'not-used' ? '수업 중 AI 미사용' : '선택형 정적 자료 · 미연결'}</p><small>학습자별 API 호출 0회</small></section>
                <div className="aside-actions">
                  <button type="button" className="secondary-button" onClick={exportRecord}>내 기록 JSON으로 내려받기</button>
                  <div className="module-paging">
                    <button type="button" onClick={() => openModule(MODULES[moduleIndex - 1]?.code)} disabled={moduleIndex <= 0} aria-label="이전 모듈">← 이전</button>
                    <button type="button" onClick={() => openModule(MODULES[moduleIndex + 1]?.code)} disabled={moduleIndex >= MODULES.length - 1} aria-label="다음 모듈">다음 →</button>
                  </div>
                </div>
              </aside>
            </div>

            <footer className="page-footer"><span>학습 기록은 이 브라우저에 저장되며 외부 서버로 전송되지 않습니다.</span><span>모식 자료 · 실제 통계·경계 자료가 아닙니다.</span></footer>
          </main>
        </div>
      </div>
      <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
