import { COURSE_COUNTS } from '../content/bookIndex.js';

const learningSteps = [
  { number: '01', title: '읽고 관찰하기', copy: '본문과 자료에서 장소·분포·관계를 살펴봅니다.' },
  { number: '02', title: '질문 만들기', copy: '정답을 보기 전에 자기 질문을 만들고 다듬습니다.' },
  { number: '03', title: '근거로 설명하기', copy: '자료를 비교하고 주장·근거·추론을 연결합니다.' },
];

export default function CourseHome({ units, modules, readLessons, records, onSelectLesson, onOpenInquiry }) {
  const readCount = Object.values(readLessons).filter(Boolean).length;
  const completeCount = modules.filter((module) => records[module.code]?.completed).length;
  const firstLesson = units[0]?.units[0]?.lessons[0];

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="course-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">고등학교 선택 과목 · 2022 개정 교육과정</p>
          <h1 id="course-title">세계를 읽는<br /><span>질문을 시작합니다.</span></h1>
          <p className="hero-intro">장소와 사람의 관계를 읽고, 스스로 만든 질문을 지도·자료와 함께 탐구하는 웹 교과서입니다.</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => firstLesson && onSelectLesson(firstLesson.id)}>첫 단원 읽기 <span aria-hidden="true">→</span></button>
            <button type="button" className="text-button" onClick={() => onOpenInquiry(modules[0]?.code)}>교과서에서 질문 탐구</button>
          </div>
          <div className="hero-counts" aria-label="교과서 구성">
            <div><strong>{COURSE_COUNTS.parts}</strong><span>대단원</span></div>
            <div><strong>{COURSE_COUNTS.middleUnits}</strong><span>중단원</span></div>
            <div><strong>{COURSE_COUNTS.lessons}</strong><span>학습 절</span></div>
            <div><strong>{COURSE_COUNTS.standards}</strong><span>성취기준</span></div>
          </div>
        </div>
        <div className="atlas-illustration" aria-hidden="true">
          <div className="atlas-circle atlas-circle-one" />
          <div className="atlas-circle atlas-circle-two" />
          <div className="atlas-contour contour-one" />
          <div className="atlas-contour contour-two" />
          <div className="atlas-route route-one" />
          <div className="atlas-route route-two" />
          <span className="atlas-point point-one" /><span className="atlas-point point-two" /><span className="atlas-point point-three" />
          <span className="atlas-label label-one">장소</span><span className="atlas-label label-two">연결</span><span className="atlas-label label-three">관계</span>
          <span className="atlas-north">N</span>
        </div>
      </section>

      <section className="home-progress-strip" aria-label="현재 학습 기록">
        <div><span className="progress-emblem" aria-hidden="true">↗</span><p><strong>{readCount}개 절을 읽었어요</strong><small>현재 기기의 브라우저에만 저장됩니다.</small></p></div>
        <div><span className="progress-emblem is-complete" aria-hidden="true">✓</span><p><strong>{completeCount}개 탐구를 마쳤어요</strong><small>질문 작성과 설명 기록을 이어서 할 수 있습니다.</small></p></div>
      </section>

      <section className="learning-method" aria-labelledby="method-title">
        <div className="section-title-group"><span className="eyebrow">이 사이트에서 배우는 방법</span><h2 id="method-title">읽기에서 탐구까지</h2></div>
        <div className="method-steps">
          {learningSteps.map((step, index) => <article className="method-step" key={step.number}>
            <span className="method-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div>{index < learningSteps.length - 1 && <span className="method-arrow" aria-hidden="true">→</span>}
          </article>)}
        </div>
      </section>

      <section className="unit-overview" aria-labelledby="units-title">
        <div className="section-title-group unit-title-row"><div><span className="eyebrow">교과서 목차</span><h2 id="units-title">네 개의 세계를 따라</h2></div><p>각 중단원의 질문 탐구는 해당 교과서 절 안에서 이어집니다.</p></div>
        <div className="part-grid">
          {units.map((part) => <article className="part-card" key={part.id}>
            <div className="part-card-top"><span className="part-card-numeral">{part.numeral}</span><span>{part.units.length}개 중단원</span></div>
            <h3>{part.title}</h3>
            <p>{part.intro}</p>
            <div className="part-card-units">
              {part.units.map((unit) => <div className="part-unit-row" key={unit.id}>
                <button type="button" className="part-unit-link" onClick={() => onSelectLesson(unit.lessons[0]?.id)}><span>{unit.title}</span><small>{unit.lessons.length}개 절</small></button>
                <button type="button" className="part-unit-qft" onClick={() => onOpenInquiry(unit.moduleCode)} aria-label={`교과서 본문에서 ${unit.title} 질문 탐구 열기`}>탐구 <span aria-hidden="true">↗</span></button>
              </div>)}
            </div>
            <div className="part-card-footer"><span>읽은 절</span><strong>{part.units.flatMap((unit) => unit.lessons).filter((lesson) => readLessons[lesson.id]).length} / {part.units.reduce((sum, unit) => sum + unit.lessons.length, 0)}</strong></div>
          </article>)}
        </div>
      </section>

      <section className="home-note" aria-label="콘텐츠 안내">
        <span className="note-icon" aria-hidden="true">i</span>
        <p><strong>웹용으로 새로 쓴 학습 자료</strong><br />학습 설명과 활동은 교육과정 성취기준과 공개 출처를 바탕으로 독립 집필했습니다. 그림과 수치는 모식 자료일 수 있으며 각 화면에서 표시합니다.</p>
      </section>
    </div>
  );
}
