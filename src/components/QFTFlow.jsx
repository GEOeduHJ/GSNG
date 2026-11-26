import { useState } from 'react';
import { LESSON_BY_ID } from '../content/bookIndex.js';
import { resolveSources } from '../content/sources.js';
import LessonVisualization from './visualizations/LessonVisualization.jsx';
import CaseStudyGallery from './CaseStudyGallery.jsx';
import LessonActivity from './lesson-modules/unit-01/LessonActivity.jsx';

const QUESTION_QUALITY_RUBRIC = [
  { criterion: '지리적 초점', emerging: '장소나 현상을 아직 구체적으로 좁히지 못함', developing: '장소·규모·분포 중 한 요소를 특정함', strong: '장소와 규모를 정하고 공간 관계·분포·변화를 함께 질문함' },
  { criterion: '성취기준과의 연결', emerging: '질문과 이번 성취기준의 관련성이 불분명함', developing: '주제는 연결되지만 성취기준의 핵심 개념이 일부 드러남', strong: '성취기준의 개념·사고·수행을 직접 탐구하도록 구성함' },
  { criterion: '자료로 탐구 가능성', emerging: '어떤 자료가 필요한지 판단하기 어려움', developing: '자료 종류를 제안했으나 범위·시점·비교 기준을 더 정해야 함', strong: '접근 가능한 출처와 비교 기준을 정하고 자료의 한계도 확인할 수 있음' },
  { criterion: '설명으로의 확장', emerging: '단답형 사실 확인에 머무름', developing: '이유나 변화 한 가지를 탐구함', strong: '장소·규모·행위자 간 관계를 설명하고 대안이나 관점 비교로 확장함' },
];

function createQuestion() {
  return { id: globalThis.crypto?.randomUUID?.() || `q-${Date.now()}-${Math.random().toString(16).slice(2)}`, text: '', classification: '', convertedType: '', convertedText: '', selectedVersion: 'original', selected: false };
}

function questionText(question) {
  return question.selectedVersion === 'converted' && question.convertedText?.trim() ? question.convertedText.trim() : question.text.trim();
}

function SelectedQuestions({ questions, label = '탐구 질문' }) {
  const selected = questions.filter((question) => question.selected && questionText(question));
  return <section className="selected-question-summary" aria-label="선택한 탐구 질문">
    <span className="eyebrow">{label}</span>
    {selected.length ? <ol>{selected.map((question, index) => <li key={question.id}><span>{String(index + 1).padStart(2, '0')}</span><p>{questionText(question)}</p></li>)}</ol> : <p className="empty-step-note">먼저 우선화 단계에서 탐구할 질문을 선택하세요.</p>}
  </section>;
}

function countQuestions(questions = []) {
  return questions.filter((question) => typeof question.text === 'string' && question.text.trim()).length;
}

function lessonMaxAccessibleStep(record, questions) {
  const answered = questions.filter((question) => question.text?.trim());
  if (!answered.length) return 0;
  let maximum = 1;

  const improved = answered.some((question) =>
    ['열린', '닫힌'].includes(question.classification)
    && ['열린', '닫힌'].includes(question.convertedType)
    && question.convertedText?.trim(),
  );
  if (!improved) return maximum;
  maximum = 2;

  const selected = questions.filter((question) => question.selected && questionText(question));
  if (!selected.length || String(record.priorityReason || '').trim().length < 4) return maximum;
  maximum = 3;
  if (String(record.evidencePlan || '').trim().length < 4) return maximum;
  maximum = 4;

  const linkedEvidence = (record.evidenceItems || []).some((item) =>
    selected.some((question) => question.id === item.questionId)
    && String(item.observation || '').trim().length >= 4,
  );
  if (!linkedEvidence) return maximum;
  maximum = 5;

  const explanationReady = selected.some((question) => question.id === record.explanationQuestionId)
    && [record.claim, record.evidenceSummary, record.reasoning].every((value) => String(value || '').trim().length >= 4);
  return explanationReady ? 6 : maximum;
}

function lockedStepMessage(index) {
  return [
    '',
    '먼저 질문을 하나 이상 작성하세요.',
    '질문 하나를 유형으로 분류하고 다른 유형으로 바꿔 적으세요.',
    '탐구 질문을 고르고 선택 이유를 적으세요.',
    '자료 탐구 계획을 작성하세요.',
    '선택한 질문에 연결된 관찰 근거를 기록하세요.',
    '중심 질문과 주장·근거·지리적 추론을 작성하세요.',
  ][index] || '앞 단계의 활동을 마친 뒤 이동할 수 있습니다.';
}

function Field({ label, value, onChange, hint, rows = 4, name }) {
  return <label className="qft-field">
    <span>{label}</span>
    {hint && <small>{hint}</small>}
    <textarea name={name} rows={rows} value={value || ''} onChange={(event) => onChange(event.target.value)} />
  </label>;
}

function LessonLinks({ module, onSelectLesson }) {
  const lessons = module.sectionIds.map((id) => LESSON_BY_ID[id]).filter(Boolean);
  return <div className="related-lessons"><span className="eyebrow">읽을 자료 고르기</span><p>교과서 절을 선택하면 본문으로 이동합니다. 질문 탐구와 작성 기록은 열린 채로 이어집니다.</p><div className="related-lesson-list">{lessons.map((lesson) => <button type="button" key={lesson.id} onClick={() => onSelectLesson(lesson.id, { preserveInquiry: true })}><span>{lesson.unitTitle}</span><strong>{lesson.title}</strong><i aria-hidden="true">↗</i></button>)}</div></div>;
}

function FocusStep({ module, lesson, lessonModule }) {
  return <div className="qft-focus-step">
    <div className="qft-focus-copy"><span className="eyebrow">질문 초점 · 판단을 미루고 관찰</span><h3>{lessonModule?.questionFocus.title || module.qft.focusTitle}</h3><p>{lessonModule?.questionFocus.stimulus || module.qft.focusText}</p><small>{module.qft.teacherPrompt}</small></div>
    {lessonModule ? <div className="qft-focus-neutral"><span>관찰 초점</span><strong>{lessonModule.activity.title}</strong><p>학생 질문의 예시나 정답은 표시하지 않습니다. 제시된 자료에서 궁금한 점을 먼저 기록하세요.</p></div> : lesson && <div className="qft-focus-visual"><LessonVisualization lesson={lesson} module={module} showCaseStudies={false} /></div>}
    <div className="qft-ground-rules"><strong>질문 만들기 약속</strong><ul><li>가능한 한 많은 질문을 만듭니다.</li><li>만드는 동안 토론·평가·답 찾기를 멈춥니다.</li><li>질문을 말한 표현 그대로 기록합니다.</li><li>진술문은 질문으로 바꿉니다.</li></ul></div>
  </div>;
}

function GenerateQuestions({ questions, updateQuestion, addQuestion, removeQuestion }) {
  return <div className="qft-step-content">
    <p className="qft-step-intro">자료를 관찰하면서 궁금한 점을 문장으로 남깁니다. 지금은 좋은 질문인지 판단하지 않습니다.</p>
    <div className="question-generation-list">
      {questions.map((question, index) => <div className="question-draft-row" key={question.id}>
        <label htmlFor={`question-${question.id}`}><span>{String(index + 1).padStart(2, '0')}</span> 질문 초안</label>
        <textarea id={`question-${question.id}`} rows="2" value={question.text} onChange={(event) => updateQuestion(question.id, { text: event.target.value })} placeholder="관찰한 자료에서 궁금해진 점을 적어보세요." />
        {questions.length > 1 && <button type="button" className="quiet-button" onClick={() => removeQuestion(question.id)}>이 질문 지우기</button>}
      </div>)}
    </div>
    <button type="button" className="add-question-button" onClick={addQuestion}><span aria-hidden="true">＋</span> 질문 더하기 <small>개수 제한 없음</small></button>
  </div>;
}

function ImproveQuestions({ questions, updateQuestion }) {
  const answered = questions.filter((question) => question.text.trim());
  if (!answered.length) return <p className="empty-step-note">먼저 질문 생성 단계에서 질문을 하나 이상 적어주세요.</p>;
  return <div className="qft-step-content">
    <p className="qft-step-intro">닫힌 질문은 짧은 사실이나 예·아니요로 답할 수 있고, 열린 질문은 이유·관계·변화를 설명하게 합니다. 이 구분은 질문을 다듬기 위한 도구입니다.</p>
    <div className="question-revision-list">{answered.map((question, index) => <article className="question-revision" key={question.id}>
      <div className="question-original"><span>질문 {String(index + 1).padStart(2, '0')} · 처음 질문</span><p>{question.text}</p></div>
      <fieldset className="question-type-field"><legend>질문 분류</legend>
        {['열린 질문', '닫힌 질문', '아직 모름'].map((label) => {
          const value = label === '아직 모름' ? '' : label.replace(' 질문', '');
          const convertedType = value === '열린' ? '닫힌' : value === '닫힌' ? '열린' : question.convertedType;
          return <label key={label}><input type="radio" name={`classification-${question.id}`} checked={(question.classification || '') === value} onChange={() => updateQuestion(question.id, { classification: value, convertedType })} /><span>{label}</span></label>;
        })}
      </fieldset>
      <div className="question-conversion">
        <div className="conversion-heading"><strong>반대 유형으로 바꾸어 보기</strong><small>열린 질문은 닫힌 질문으로, 닫힌 질문은 열린 질문으로 바꾸어 뜻의 차이를 살펴봅니다.</small></div>
        <label className="select-label">바꾼 질문의 유형
          <select value={question.convertedType || ''} onChange={(event) => updateQuestion(question.id, { convertedType: event.target.value })}>
            <option value="">유형 선택</option>
            {(question.classification === '열린' ? ['닫힌'] : question.classification === '닫힌' ? ['열린'] : ['열린', '닫힌']).map((type) => <option value={type} key={type}>{type} 질문</option>)}
          </select>
        </label>
        <label className="sr-only" htmlFor={`converted-${question.id}`}>변환한 질문</label>
        <textarea id={`converted-${question.id}`} rows="2" value={question.convertedText || ''} onChange={(event) => updateQuestion(question.id, { convertedText: event.target.value })} placeholder="원래 뜻을 살려 다른 유형으로 다시 써보세요." />
      </div>
    </article>)}</div>
  </div>;
}

function PrioritizeQuestions({ questions, updateQuestion, reason, onReasonChange }) {
  const answered = questions.filter((question) => question.text.trim());
  return <div className="qft-step-content">
    <p className="qft-step-intro">탐구할 질문을 하나 이상 고릅니다. 질문을 선택한 이유와 필요한 자료를 함께 생각합니다.</p>
    <div className="prioritize-list">{answered.map((question, index) => <article className={`priority-choice${question.selected ? ' is-selected' : ''}`} key={question.id}>
      <label className="priority-select"><input type="checkbox" checked={Boolean(question.selected)} onChange={(event) => updateQuestion(question.id, { selected: event.target.checked })} />
        <span className="priority-index">{String(index + 1).padStart(2, '0')}</span><span>{question.text}</span>
      </label>
      {question.convertedText?.trim() && <fieldset className="priority-version"><legend>탐구할 문장으로 사용</legend>
        <label><input type="radio" name={`version-${question.id}`} checked={(question.selectedVersion || 'original') === 'original'} onChange={() => updateQuestion(question.id, { selectedVersion: 'original' })} /><span>처음 질문</span></label>
        <label><input type="radio" name={`version-${question.id}`} checked={question.selectedVersion === 'converted'} onChange={() => updateQuestion(question.id, { selectedVersion: 'converted' })} /><span>바꾼 질문: {question.convertedText}</span></label>
      </fieldset>}
    </article>)}</div>
    {!answered.length && <p className="empty-step-note">질문을 만든 뒤 탐구할 질문을 선택할 수 있습니다.</p>}
    <Field label="이 질문을 고른 이유" value={reason} onChange={onReasonChange} hint="성취기준과 자료, 조사 가능성을 생각해 적어보세요." rows={3} />
  </div>;
}

function PlanInquiry({ module, questions, plan, onPlanChange, onSelectLesson }) {
  const sources = [...new Set(module.sectionIds.flatMap((id) => LESSON_BY_ID[id]?.sourceIds || []))];
  const sourceLinks = resolveSources(sources);
  return <div className="qft-step-content">
    <p className="qft-step-intro">선택한 질문에 답하는 데 필요한 자료와 비교 기준을 계획합니다. 자료의 생산기관·시점·공간 단위를 확인하세요.</p>
    <SelectedQuestions questions={questions} />
    <LessonLinks module={module} onSelectLesson={onSelectLesson} />
    <Field label="어떤 자료를 찾아볼까요?" value={plan} onChange={onPlanChange} hint="예: 두 장소의 기후 그래프를 같은 기간과 단위로 비교하기" rows={4} />
    <div className="source-shortlist"><span className="eyebrow">참고 출처 시작점</span><ul>{sourceLinks.slice(0, 6).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.organization} · {source.title}<span aria-hidden="true">↗</span></a></li>)}</ul><small>이 목록은 추가 조사용 링크입니다. 주장의 직접 근거로 쓰기 전 원문에서 해당 내용·시점·범위를 확인하세요. 개별 자료의 이용 조건도 별도로 확인합니다.</small></div>
  </div>;
}

function EvidenceInquiry({ items, onChange, onRecordChange, onChangeActivity, questions, record, lessonModule, activityRecord }) {
  const selectedQuestions = questions.filter((question) => question.selected && questionText(question));
  const artifact = lessonModule ? lessonModule.buildArtifact(activityRecord || {}) : null;
  const artifactQuestionId = record.activityQuestionId || selectedQuestions[0]?.id || '';
  const linkedActivityQuestion = selectedQuestions.find((question) => question.id === artifactQuestionId);
  const activityEvidenceId = lessonModule ? `${lessonModule.lessonId}:${lessonModule.activity.id}` : '';
  const existingActivityEvidence = items.find((item) => item.activityId === activityEvidenceId && item.questionId === linkedActivityQuestion?.id);
  function update(id, patch) { onChange(items.map((item) => item.id === id ? { ...item, ...patch } : item)); }
  function add() { onChange([...items, { id: globalThis.crypto?.randomUUID?.() || `e-${Date.now()}-${Math.random().toString(16).slice(2)}`, source: '', observation: '', limitation: '', questionId: selectedQuestions[0]?.id || '' }]); }
  function importActivityArtifact() {
    if (!artifact || !linkedActivityQuestion) return;
    const note = String(activityRecord?.observation || '').trim();
    const sourceLinks = [...(lessonModule.activity.sourceLinks || [])];
    const customUrl = String(activityRecord?.sourceUrl || '').trim();
    if (customUrl) {
      try {
        const parsed = new URL(customUrl);
        if (['http:', 'https:'].includes(parsed.protocol)) sourceLinks.push({ label: activityRecord.sourceTitle || '학생이 입력한 자료', url: parsed.href });
      } catch { /* Keep an invalid URL as typed text only; never turn it into a clickable link. */ }
    }
    const uniqueSourceLinks = [...new Map(sourceLinks.map((source) => [source.url, source])).values()];
    const updatedItem = {
      id: existingActivityEvidence?.id || globalThis.crypto?.randomUUID?.() || `activity-e-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      questionId: linkedActivityQuestion.id,
      source: `교과서 활동 결과 · ${artifact.label}`,
      sourceLinks: uniqueSourceLinks,
      observation: `${artifact.summary}${note ? `\n학생 관찰: ${note}` : ''}`,
      limitation: artifact.limitation,
      activityId: activityEvidenceId,
    };
    onChange(existingActivityEvidence ? items.map((item) => item.id === existingActivityEvidence.id ? updatedItem : item) : [...items, updatedItem]);
  }
  return <div className="qft-step-content">
    <p className="qft-step-intro">자료에서 직접 관찰한 내용과 해석을 구분해 기록합니다. 자료가 보여 주지 않는 것도 함께 적습니다.</p>
    <SelectedQuestions questions={questions} />
    {lessonModule && <LessonActivity lessonModule={lessonModule} record={activityRecord} onChange={onChangeActivity} questions={questions} />}
    {lessonModule && <section className="activity-evidence-import" aria-labelledby="activity-evidence-title"><div><span className="eyebrow">이 절의 디지털 모듈에서 가져오기</span><strong id="activity-evidence-title">{artifact.label}</strong><p>{artifact.summary}</p><small>한계 · {artifact.limitation}</small></div>
      <label>연결할 우선 질문<select value={artifactQuestionId} onChange={(event) => onRecordChange({ activityQuestionId: event.target.value })}><option value="">질문 선택</option>{selectedQuestions.map((question) => <option value={question.id} key={question.id}>{questionText(question)}</option>)}</select></label>
      <button type="button" className="secondary-button" onClick={importActivityArtifact} disabled={!linkedActivityQuestion}>{existingActivityEvidence ? '기존 활동 근거 갱신' : '선택한 질문의 근거로 가져오기'}</button><small className="activity-import-note">같은 활동 결과를 같은 질문에 다시 가져오면 기존 기록과 출처 링크를 갱신합니다.</small>
    </section>}
    <div className="evidence-item-list">{items.map((item, index) => <article className="evidence-item" key={item.id}>
      <div className="evidence-item-heading"><span>근거 {String(index + 1).padStart(2, '0')}</span>{items.length > 1 && <button type="button" className="quiet-button" onClick={() => onChange(items.filter((entry) => entry.id !== item.id))}>삭제</button>}</div>
      <label>연결할 질문<select value={item.questionId || ''} onChange={(event) => update(item.id, { questionId: event.target.value })}><option value="">질문 선택</option>{selectedQuestions.map((question) => <option value={question.id} key={question.id}>{questionText(question)}</option>)}</select></label>
      <label>자료 이름<input value={item.source} onChange={(event) => update(item.id, { source: event.target.value })} placeholder="자료의 제목과 출처" /></label>{item.sourceLinks?.length > 0 && <ul className="evidence-source-links">{item.sourceLinks.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>}
      <label>자료에서 관찰한 것<textarea rows="2" value={item.observation} onChange={(event) => update(item.id, { observation: event.target.value })} placeholder="분포, 차이, 관계, 변화 등" /></label>
      <label>자료의 한계<textarea rows="2" value={item.limitation} onChange={(event) => update(item.id, { limitation: event.target.value })} placeholder="자료가 답하지 못하거나 빠뜨린 점" /></label>
    </article>)}</div>
    <button type="button" className="add-question-button" onClick={add}><span aria-hidden="true">＋</span> 근거 자료 더하기</button>
  </div>;
}

function ExplainInquiry({ record, onChange, questions }) {
  const selectedQuestions = questions.filter((question) => question.selected && questionText(question));
  const fields = [
    ['claim', '나의 주장', '선택한 질문에 대한 현재의 설명을 적습니다.'],
    ['evidenceSummary', '자료에서 찾은 근거', '자료 이름·시점·공간 범위와 관찰한 내용을 적습니다.'],
    ['reasoning', '근거와 주장을 잇는 지리적 추론', '장소·분포·관계·규모·변화가 설명에 어떻게 연결되는지 씁니다.'],
  ];
  return <div className="qft-step-content">
    <p className="qft-step-intro">세 가지를 한 문장으로 합치지 말고 따로 작성하면, 주장이 어떤 증거와 지리적 설명에 기대는지 살펴보기 쉽습니다.</p>
    <SelectedQuestions questions={questions} label="설명으로 답할 탐구 질문" />
    <label className="qft-field">이번 설명의 중심 질문
      <select value={record.explanationQuestionId || ''} onChange={(event) => onChange({ explanationQuestionId: event.target.value })}>
        <option value="">질문 선택</option>{selectedQuestions.map((question) => <option value={question.id} key={question.id}>{questionText(question)}</option>)}
      </select>
      <small>아래 주장·근거·추론을 이 질문에 대한 답으로 작성합니다.</small>
    </label>
    <div className="explanation-editor">{fields.map(([key, label, hint]) => <Field key={key} name={key} label={label} value={record[key]} onChange={(value) => onChange({ [key]: value })} hint={hint} rows={4} />)}</div>
  </div>;
}

function ReflectInquiry({ reflection, onReflectionChange, record, onComplete }) {
  const questionCountValue = countQuestions(record.questions || []);
  const selectedCount = (record.questions || []).filter((question) => question.selected && question.text.trim()).length;
  const done = Boolean(record.completed);
  return <div className="qft-step-content">
    <p className="qft-step-intro">질문을 만든 과정, 자료가 보여 준 것과 보여 주지 않은 점, 다음에 더 확인하고 싶은 것을 돌아봅니다.</p>
    <div className="reflection-prompts"><span>질문을 바꾸면서 새로 보인 점은 무엇인가요?</span><span>어떤 자료를 더 얻으면 설명을 보완할 수 있나요?</span><span>처음 질문과 최종 탐구 질문 사이에 어떤 차이가 있나요?</span></div>
    <Field label="탐구 성찰" value={reflection} onChange={onReflectionChange} hint="위 문장 중 하나를 골라 자유롭게 작성하세요." rows={5} />
    <div className="qft-summary-strip"><div><strong>{questionCountValue}</strong><span>작성한 질문</span></div><div><strong>{selectedCount}</strong><span>우선 질문</span></div><div><strong>{record.evidenceItems?.filter((item) => item.observation?.trim()).length || 0}</strong><span>기록한 근거</span></div></div>
    <button type="button" className="primary-button finish-inquiry-button" aria-pressed={done} onClick={onComplete}>{done ? '탐구 완료로 표시됨' : '탐구 마무리 표시'}</button>
    <p className="non-grading-note">완료 표시는 기록 상태입니다. 자동 채점이나 AI 평가는 하지 않습니다.</p>
  </div>;
}

export default function QFTFlow({ module, lessonModule = null, activityRecord = {}, legacyRecord = null, record, onChange, onChangeActivity, onSelectLesson }) {
  const [message, setMessage] = useState('');
  const flowModule = lessonModule ? {
    ...module,
    title: lessonModule.activity.title,
    sectionIds: [lessonModule.lessonId],
    aiActivity: null,
    qft: {
      ...module.qft,
      focusTitle: lessonModule.questionFocus.title,
      focusText: lessonModule.questionFocus.stimulus,
      focusVisual: lessonModule.lessonId,
      phases: module.qft.phases.map((phase, index) => ({
        ...phase,
        minutes: lessonModule.qftPhaseMinutes?.[index] ?? phase.minutes,
      })),
    },
  } : module;
  const questions = record.questions || [];
  const answered = countQuestions(questions);
  const maxAccessibleStep = lessonModule ? lessonMaxAccessibleStep(record, questions) : flowModule.qft.phases.length - 1;
  const stepIndex = Math.min(Math.max(Number(record.qftPhase) || 0, 0), maxAccessibleStep);
  const activePhase = flowModule.qft.phases[stepIndex];
  const focusLesson = LESSON_BY_ID[flowModule.qft.focusVisual];
  const steps = flowModule.qft.phases;
  const caseStudies = flowModule.sectionIds.flatMap((lessonId) => (LESSON_BY_ID[lessonId]?.caseStudies || []).map((study) => ({ ...study, lessonId })));

  function patch(patchValue) { onChange(patchValue); }
  function updateQuestion(id, changes) { patch({ questions: questions.map((question) => question.id === id ? { ...question, ...changes } : question) }); }
  function addQuestion() { patch({ questions: [...questions, createQuestion()] }); }
  function removeQuestion(id) { patch({ questions: questions.filter((question) => question.id !== id) }); }
  function changeStep(index) {
    if (lessonModule && index > maxAccessibleStep) { setMessage(lockedStepMessage(index)); return; }
    patch({ qftPhase: index }); setMessage('');
  }

  function markComplete() {
    const hasChosenQuestion = questions.some((question) => question.selected && question.text.trim());
    if (!answered || !hasChosenQuestion) {
      setMessage('질문을 기록하고 탐구할 질문을 하나 이상 선택한 뒤 마무리할 수 있습니다.');
      return;
    }
    const explanationQuestion = questions.find((question) => question.id === record.explanationQuestionId && question.selected && questionText(question));
    const linkedEvidence = (record.evidenceItems || []).some((item) => item.questionId === record.explanationQuestionId && String(item.observation || '').trim().length >= 4);
    if (!explanationQuestion || !linkedEvidence) {
      setMessage('중심 질문을 선택하고, 그 질문에 연결된 관찰 근거를 하나 이상 기록하세요.');
      return;
    }
    if (![record.claim, record.evidenceSummary, record.reasoning, record.reflection].every((value) => String(value || '').trim().length >= 4)) {
      setMessage('주장·근거·추론과 성찰을 작성하면 완료로 표시할 수 있습니다.');
      return;
    }
    patch({ completed: true });
    setMessage('탐구 기록을 완료로 표시했습니다. 이 기록은 현재 브라우저에 저장됩니다.');
  }

  const stepContent = () => {
    if (stepIndex === 0) return <GenerateQuestions questions={questions} updateQuestion={updateQuestion} addQuestion={addQuestion} removeQuestion={removeQuestion} />;
    if (stepIndex === 1) return <ImproveQuestions questions={questions} updateQuestion={updateQuestion} />;
    if (stepIndex === 2) return <PrioritizeQuestions questions={questions} updateQuestion={updateQuestion} reason={record.priorityReason} onReasonChange={(value) => patch({ priorityReason: value })} />;
    if (stepIndex === 3) return <PlanInquiry module={flowModule} questions={questions} plan={record.evidencePlan} onPlanChange={(value) => patch({ evidencePlan: value })} onSelectLesson={onSelectLesson} />;
    if (stepIndex === 4) return <EvidenceInquiry items={record.evidenceItems || []} onChange={(value) => patch({ evidenceItems: value })} onRecordChange={patch} onChangeActivity={onChangeActivity} questions={questions} record={record} lessonModule={lessonModule} activityRecord={activityRecord} />;
    if (stepIndex === 5) return <ExplainInquiry record={record} onChange={patch} questions={questions} />;
    return <ReflectInquiry reflection={record.reflection} onReflectionChange={(value) => patch({ reflection: value })} record={record} onComplete={markComplete} />;
  };

  return (
    <div className="qft-page">
      <section className="standard-banner" aria-labelledby="standard-banner-title">
        <div><span className="eyebrow" id="standard-banner-title">교육과정 성취기준</span><strong>{module.code}</strong></div><p>{module.standardText}</p>
      </section>

      <FocusStep module={flowModule} lesson={focusLesson} lessonModule={lessonModule} />
      {caseStudies.length > 0 && (!lessonModule || stepIndex > 0) && <CaseStudyGallery caseStudies={caseStudies} showInquiryPrompts={stepIndex > 0} />}

      <section className="qft-workspace" aria-labelledby="qft-step-title">
        <div className="qft-workspace-top">
          <div><span className="eyebrow">Question Formulation Technique · QFT</span><h2 id="qft-step-title">질문에서 근거 있는 설명까지</h2>{lessonModule && <small className="qft-duration-note">단계 합계 {steps.reduce((total, step) => total + step.minutes, 0)}분 권장 · 디지털 활동 포함, 교사 조정</small>}</div>
          <div className="qft-count"><strong>{answered}</strong><span>내 질문</span></div>
        </div>
        <nav className="qft-step-nav" aria-label="질문 탐구 단계">
          {steps.map((step, index) => { const locked = Boolean(lessonModule && index > maxAccessibleStep); return <button type="button" key={step.id} className={`qft-step-tab${index === stepIndex ? ' is-active' : ''}${index < stepIndex ? ' is-past' : ''}${locked ? ' is-locked' : ''}`} aria-current={index === stepIndex ? 'step' : undefined} aria-disabled={locked || undefined} onClick={() => changeStep(index)} title={locked ? lockedStepMessage(index) : undefined} >
            <span>{String(index + 1).padStart(2, '0')}</span><strong>{step.title}</strong><small>{step.minutes}분</small>
          </button>; })}
        </nav>
        <div className="qft-active-step">
          <div className="qft-active-heading"><div><span className="eyebrow">단계 {String(stepIndex + 1).padStart(2, '0')} · {activePhase.minutes}분</span><h3>{activePhase.title}</h3></div><p>{activePhase.instructions}</p></div>
          {stepContent()}
          {message && <p className="qft-message" role="status">{message}</p>}
          <div className="qft-step-footer">
            <span className="qft-save-note">작성 중인 내용은 이 브라우저에 저장됩니다.</span>
            <div className="qft-step-actions">
              <button type="button" className="secondary-button" onClick={() => changeStep(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}>← 이전 단계</button>
              {stepIndex < steps.length - 1 && <button type="button" className="primary-button" onClick={() => changeStep(stepIndex + 1)}>다음 단계 <span aria-hidden="true">→</span></button>}
            </div>
          </div>
        </div>
      </section>

      {module.aiActivity && !lessonModule && <section className="optional-ai-card" aria-labelledby="optional-ai-title">
        <div><span className="eyebrow">선택 도구 · 필수 아님</span><h2 id="optional-ai-title">{module.aiActivity.tool}로 산출물 다듬기</h2><p>{module.aiActivity.purpose}</p><small>{module.aiActivity.conditions}</small></div>
        <a className="secondary-button" href={module.aiActivity.tool === 'Suno' ? 'https://suno.com/' : 'https://gemini.google.com/'} target="_blank" rel="noreferrer">외부 서비스 열기 <span aria-hidden="true">↗</span></a>
      </section>}

      {legacyRecord && (!lessonModule || stepIndex > 0) && <LegacyRecord module={module} record={legacyRecord} />}
      {(!lessonModule || stepIndex > 0) && <TeacherGuide module={module} />}
    </div>
  );
}

function LegacyRecord({ module, record }) {
  const questions = (record.questions || []).filter((item) => typeof item.text === 'string' && item.text.trim());
  const hasContent = questions.length || record.claim || record.evidenceSummary || record.reasoning || record.reflection;
  if (!hasContent) return null;
  return <details className="legacy-inquiry-record"><summary><span><span className="eyebrow">이전 공통 기록 · 읽기 전용</span><strong>{module.code}에 저장했던 기록 보기</strong></span><span>절별 기록과 분리 보관</span></summary><div><p>이전 기록은 보존했으며 아래 9개 학습 절의 기록으로 옮기지 않았습니다.</p><ol>{questions.map((question) => <li key={question.id}>{question.text}</li>)}</ol>{record.claim && <p><strong>주장:</strong> {record.claim}</p>}{record.evidenceSummary && <p><strong>근거:</strong> {record.evidenceSummary}</p>}{record.reasoning && <p><strong>추론:</strong> {record.reasoning}</p>}{record.reflection && <p><strong>성찰:</strong> {record.reflection}</p>}</div></details>;
}

function TeacherGuide({ module }) {
  const guide = module.teacherGuide;
  return <details className="teacher-guide-card">
    <summary><span><span className="eyebrow">수업을 위한 안내</span><strong>교사용 진행 메모</strong></span><span className="teacher-duration">{guide.duration}</span></summary>
    <div className="teacher-guide-content">
      <div className="teacher-materials"><strong>준비물</strong><ul>{guide.materials.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <ol className="teacher-sequence">{guide.sequence.map((item) => <li key={item.stage}><div><strong>{item.stage}</strong><small>{item.minutes}분</small></div><p>{item.support}</p></li>)}</ol>
      <div className="teacher-checks"><strong>관찰할 점</strong><ul>{guide.checks.map((item) => <li key={item}>{item}</li>)}</ul></div>
      {module.rubric?.length > 0 && <div className="teacher-rubric"><strong>성취기준 평가 관점</strong><ul>{module.rubric.map((item) => <li key={item}>{item}</li>)}</ul></div>}
      <QuestionQualityRubric />
      <p className="non-grading-note">질문 생성·변환의 과정과 교과 성취를 구분해 피드백합니다. 플랫폼은 질문이나 답안을 자동 평가하지 않습니다.</p>
    </div>
  </details>;
}

function QuestionQualityRubric() {
  return <details className="teacher-rubric question-quality-rubric">
    <summary><strong>교사용 질문 질 피드백 관점</strong><span>열어 보기</span></summary>
    <p>비검증 형성 피드백 초안입니다. 학생 질문을 자동 채점하거나 연구용 측정 도구로 사용하지 않습니다. 성취기준 평가 관점과 별도로 참고하세요. 이 공개 시제품은 교사·학생 역할별 접근 제한을 제공하지 않으므로, 수업 중 제시 시점은 교사가 정합니다.</p>
    <div className="question-rubric-table-wrap"><table className="question-rubric-table"><thead><tr><th>관점</th><th>더 다듬을 수 있음</th><th>발전 중</th><th>탐구로 이어짐</th></tr></thead><tbody>{QUESTION_QUALITY_RUBRIC.map((row) => <tr key={row.criterion}><th scope="row">{row.criterion}</th><td>{row.emerging}</td><td>{row.developing}</td><td>{row.strong}</td></tr>)}</tbody></table></div>
  </details>;
}
