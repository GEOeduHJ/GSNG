import { useEffect, useMemo, useState } from 'react';

export default function BookNavigation({
  units,
  modules,
  records,
  readLessons,
  activeView,
  qftMode = false,
  questionCount = 0,
  onHome,
  onSelectLesson,
  onSelectModule,
  onClose,
}) {
  const activeUnit = activeView.type === 'lesson'
    ? units.flatMap((part) => part.units).find((unit) => unit.lessons.some((lesson) => lesson.id === activeView.id))
    : activeView.type === 'module'
      ? units.flatMap((part) => part.units).find((unit) => unit.moduleCode === activeView.code)
      : null;
  const activePart = activeUnit?.partId || units.find((part) => part.units.some((unit) => unit.id === activeUnit?.id))?.id;
  const [openParts, setOpenParts] = useState(() => new Set(activePart ? [activePart] : ['part-01']));
  const [openUnits, setOpenUnits] = useState(() => new Set(activeUnit ? [activeUnit.id] : []));
  useEffect(() => {
    if (activePart) setOpenParts((current) => new Set(current).add(activePart));
    if (activeUnit?.id) setOpenUnits((current) => new Set(current).add(activeUnit.id));
  }, [activePart, activeUnit?.id]);
  const completedCount = useMemo(() => modules.filter((module) => records[module.code]?.completed).length, [modules, records]);
  const lessonCount = units.reduce((sum, part) => sum + part.units.reduce((inner, unit) => inner + unit.lessons.length, 0), 0);
  const readCount = Object.values(readLessons).filter(Boolean).length;
  const concealLessonTitles = qftMode && questionCount === 0;

  function toggle(setter, current, id) {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  }

  return (
    <aside className="book-sidebar" aria-label="과목 목차와 탐구 모듈">
      <div className="sidebar-topline">
        <button className="brand" type="button" onClick={onHome} aria-label="과목 첫 화면">
          <span className="brand-mark" aria-hidden="true">지</span>
          <span className="brand-copy"><strong>세계시민과 지리</strong><small>2022 개정 교육과정</small></span>
        </button>
        <button className="sidebar-close" type="button" onClick={onClose} aria-label="목차 닫기">×</button>
      </div>

      <div className="sidebar-progress">
        <div className="progress-label"><span>학습 기록</span><strong>{readCount} / {lessonCount} 절 읽음</strong></div>
        <div className="progress-track" role="progressbar" aria-label="읽은 학습 절" aria-valuemin="0" aria-valuemax={lessonCount} aria-valuenow={readCount}>
          <span style={{ width: `${lessonCount ? (readCount / lessonCount) * 100 : 0}%` }} />
        </div>
        <small>탐구 기록 {completedCount} / {modules.length} 모듈</small>
      </div>

      <nav className={`course-navigation${concealLessonTitles ? ' is-question-first' : ''}`} aria-label="교과서 목차">
        <button type="button" className={`home-link${activeView.type === 'home' ? ' is-active' : ''}`} aria-current={activeView.type === 'home' ? 'page' : undefined} onClick={onHome}>
          <span className="nav-index">00</span><span>과목 안내</span>
        </button>
        {units.map((part) => {
          const partOpen = openParts.has(part.id);
          return (
            <section className="part-navigation" key={part.id}>
              <button type="button" className="part-toggle" aria-expanded={partOpen} onClick={() => toggle(setOpenParts, openParts, part.id)}>
                <span className="part-numeral">{part.numeral}</span>
                <span className="part-title">{part.title}</span>
                <span className={`chevron${partOpen ? ' is-open' : ''}`} aria-hidden="true">⌄</span>
              </button>
              {partOpen && <div className="unit-navigation">
                {part.units.map((unit) => {
                  const unitOpen = openUnits.has(unit.id);
                  const unitActive = activeView.type === 'lesson'
                    ? unit.lessons.some((lesson) => lesson.id === activeView.id)
                    : activeView.type === 'module' && activeView.code === unit.moduleCode;
                  const moduleDone = Boolean(records[unit.moduleCode]?.completed);
                  return (
                    <div className={`unit-navigation-group${unitActive ? ' is-current' : ''}`} key={unit.id}>
                      <div className="unit-row">
                        <button type="button" className="unit-toggle" aria-expanded={unitOpen || unitActive} onClick={() => toggle(setOpenUnits, openUnits, unit.id)}>
                          <span className="unit-number">{unit.id.slice(-2)}</span><span>{unit.title}</span>
                        </button>
                        <button type="button" className={`unit-module-link${activeView.type === 'module' && activeView.code === unit.moduleCode ? ' is-active' : ''}`} onClick={() => onSelectModule(unit.moduleCode)} aria-label={`${unit.title} 성취기준 탐구 모듈 열기`} title="성취기준 탐구 모듈">
                          {moduleDone ? '완료' : '탐구'}
                        </button>
                      </div>
                      {(unitOpen || unitActive) && !concealLessonTitles && <div className="lesson-navigation">
                        {unit.lessons.map((lesson) => (
                          <button type="button" key={lesson.id} className={`lesson-link${activeView.type === 'lesson' && activeView.id === lesson.id ? ' is-active' : ''}${readLessons[lesson.id] ? ' is-read' : ''}`} aria-current={activeView.type === 'lesson' && activeView.id === lesson.id ? 'page' : undefined} onClick={() => onSelectLesson(lesson.id)}>
                            <span className="lesson-dot" aria-hidden="true" />{lesson.title}
                          </button>
                        ))}
                      </div>}
                    </div>
                  );
                })}
              </div>}
            </section>
          );
        })}
      </nav>

      {concealLessonTitles && <p className="question-first-note">질문을 먼저 만든 뒤 학습 절 목록을 엽니다. 작성한 질문 {questionCount}개</p>}

      <section className="standards-navigation" aria-labelledby="standards-title">
        <div className="nav-section-heading"><span className="eyebrow">성취기준별</span><h2 id="standards-title">탐구 모듈</h2></div>
        <div className="standards-list">
          {modules.map((module) => (
            <button type="button" key={module.code} className={`standard-link${activeView.type === 'module' && activeView.code === module.code ? ' is-active' : ''}`} aria-current={activeView.type === 'module' && activeView.code === module.code ? 'page' : undefined} onClick={() => onSelectModule(module.code)}>
              <span>{module.moduleId}</span><strong>{module.title}</strong><i aria-hidden="true">{records[module.code]?.completed ? '✓' : '↗'}</i>
            </button>
          ))}
        </div>
      </section>

      <div className="sidebar-footer"><span className="privacy-mark" aria-hidden="true" />기록은 이 브라우저에만 저장됩니다.</div>
    </aside>
  );
}
