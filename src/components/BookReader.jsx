import { useMemo } from 'react';
import LessonVisualization from './visualizations/LessonVisualization.jsx';
import SourceReferences from './SourceReferences.jsx';
import { getNextLesson, LESSONS } from '../content/bookIndex.js';

export default function BookReader({ lesson, part, unit, module, read, onRead, onSelectModule, onSelectLesson }) {
  const index = LESSONS.findIndex((item) => item.id === lesson.id);
  const previous = getNextLesson(lesson.id, -1);
  const next = getNextLesson(lesson.id, 1);
  const unitIndex = unit.lessons.findIndex((item) => item.id === lesson.id);
  const progress = useMemo(() => Math.round(((index + 1) / LESSONS.length) * 100), [index]);

  return (
    <article className="reader-page">
      <div className="reader-breadcrumb"><span>{part.numeral} · {part.title}</span><span aria-hidden="true">/</span><span>{unit.title}</span><span aria-hidden="true">/</span><span>학습 절 {unitIndex + 1}</span></div>
      <header className="reader-heading">
        <div className="reader-meta"><span className="reading-progress-label">{String(index + 1).padStart(2, '0')} / {LESSONS.length} 학습 절</span><span className="meta-divider" /><span>{module.code}</span><span className="meta-divider" /><span>{module.time}</span></div>
        <h1>{lesson.title}</h1>
        <p className="reader-lead">{lesson.lead}</p>
        <div className="reader-progress" role="progressbar" aria-label="전체 읽기 위치" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
      </header>

      <div className="reader-layout">
        <div className="reader-main">
          <section className="reading-section" aria-labelledby="reading-title">
            <div className="section-kicker"><span className="section-kicker-number">{String(unitIndex + 1).padStart(2, '0')}</span><div><span className="eyebrow">핵심 내용 읽기</span><h2 id="reading-title">장소와 관계를 이해하기</h2></div></div>
            <div className="lesson-prose">{lesson.body.map((paragraph, paragraphIndex) => <p key={`${lesson.id}-p-${paragraphIndex}`}>{paragraph}</p>)}</div>
          </section>

          {lesson.keyTerms?.length > 0 && <section className="key-terms-section" aria-labelledby="terms-title">
            <div className="section-kicker"><span className="section-kicker-number">용어</span><div><span className="eyebrow">이 절의 개념</span><h2 id="terms-title">핵심 낱말</h2></div></div>
            <dl className="key-term-list">{lesson.keyTerms.map(({ term, definition }) => <div className="key-term-row" key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
          </section>}

          {lesson.visualization && <section className="interactive-section" aria-labelledby="visual-tool-title">
            <div className="section-kicker"><span className="section-kicker-number">탐색</span><div><span className="eyebrow">디지털 자료 도구</span><h2 id="visual-tool-title">자료를 직접 살펴보기</h2></div></div>
            <LessonVisualization lesson={lesson} module={module} />
          </section>}

          <section className="activity-section" aria-labelledby="activity-title">
            <div className="section-kicker"><span className="section-kicker-number">실천</span><div><span className="eyebrow">읽고 적용하기</span><h2 id="activity-title">{lesson.activity.title}</h2></div></div>
            <ol className="activity-steps">{lesson.activity.steps.map((step, stepIndex) => <li key={`${lesson.id}-step-${stepIndex}`}><span>{String(stepIndex + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
            <div className="deliverable-note"><span>남길 결과</span><p>{lesson.activity.deliverable}</p></div>
          </section>

          {unitIndex === unit.lessons.length - 1 && unit.project && <section className="unit-project" aria-labelledby="unit-project-title">
            <span className="eyebrow">중단원 종합 적용</span><h2 id="unit-project-title">{unit.project.title}</h2><p>{unit.project.prompt}</p><div className="deliverable-note"><span>만들 결과</span><p>{unit.project.deliverable}</p></div>
          </section>}

          <SourceReferences ids={lesson.sourceIds} />

          <div className="reader-completion">
            <div><strong>{read ? '이 절을 읽음으로 표시했어요.' : '여기까지 읽었다면 학습 기록에 남겨보세요.'}</strong><small>기록은 현재 브라우저에 저장되며, 교사나 서버에 전송되지 않습니다.</small></div>
            <button type="button" className={`read-toggle${read ? ' is-read' : ''}`} aria-pressed={read} onClick={() => onRead(lesson.id, !read)}>{read ? '읽음 취소' : '읽음 표시'}</button>
          </div>

          <nav className="reader-paging" aria-label="학습 절 이동">
            {previous ? <button type="button" className="page-turn previous-page" onClick={() => onSelectLesson(previous.id)}><span>이전 절</span><strong>{previous.title}</strong></button> : <span />}
            {next ? <button type="button" className="page-turn next-page" onClick={() => onSelectLesson(next.id)}><span>다음 절</span><strong>{next.title}</strong></button> : <span />}
          </nav>
        </div>

        <aside className="reader-aside" aria-label="학습 도움 정보">
          <section className="aside-module-card"><span className="eyebrow">연결된 성취기준</span><p className="aside-module-code">{module.code}</p><h2>{module.title}</h2><p>{module.goal}</p><button type="button" className="secondary-button" onClick={() => onSelectModule(module.code)}>질문 탐구 열기 <span aria-hidden="true">↗</span></button></section>
          <section className="aside-reading-card"><span className="eyebrow">이 절의 위치</span><strong>{unit.title}</strong><p>{unitIndex + 1} / {unit.lessons.length} 절</p><div className="mini-progress"><span style={{ width: `${((unitIndex + 1) / unit.lessons.length) * 100}%` }} /></div><small>관련 학습 절 {module.sectionIds.length}개가 하나의 성취기준 탐구로 연결됩니다.</small></section>
          <section className="aside-reading-card"><span className="eyebrow">사용하는 디지털 도구</span><ul className="tool-list">{module.digitalTools.map((tool) => <li key={tool}>{tool}</li>)}</ul></section>
          <section className="aside-reading-card"><span className="eyebrow">학습 목표</span><p>{module.standardText}</p><small>성취기준 원문은 교육과정 문서에 근거합니다.</small></section>
        </aside>
      </div>
    </article>
  );
}
