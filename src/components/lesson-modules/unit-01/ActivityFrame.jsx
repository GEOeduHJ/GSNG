import { useMemo } from 'react';

export default function ActivityFrame({ lessonModule, value, onChange, questions, children }) {
  const activity = lessonModule.activity;
  const artifact = useMemo(() => lessonModule.buildArtifact(value), [lessonModule, value]);
  const selectedQuestion = (questions || []).find((item) => item.selected && item.text?.trim());
  function setField(field, next) { onChange((current) => ({ ...current, [field]: next })); }

  return <section className="lesson-activity" aria-labelledby={`activity-title-${activity.id}`}>
    <header className="lesson-activity-heading">
      <div><span className="eyebrow">이 절의 디지털 학습 모듈</span><h3 id={`activity-title-${activity.id}`}>{activity.title}</h3><p>{activity.instruction}</p></div>
      <span className="activity-data-status">{activity.dataStatus}</span>
    </header>
    <div className="activity-tool-line"><span>도구</span>{activity.tools.map((tool) => <span className="activity-tool-tag" key={tool}>{tool}</span>)}</div>
    <div className="activity-question-link">
      <span className="eyebrow">QFT 탐구 질문과 연결</span>
      {selectedQuestion ? <p>{selectedQuestion.selectedVersion === 'converted' && selectedQuestion.convertedText?.trim() ? selectedQuestion.convertedText : selectedQuestion.text}</p> : <p className="muted">QFT에서 질문을 하나 이상 우선화하면 여기 함께 표시됩니다. 먼저 생성한 질문은 삭제되지 않습니다.</p>}
    </div>
    <div className="activity-engine">{children}</div>
    <label className="activity-observation-field">
      <span>이 활동에서 관찰한 점</span><small>나중에 선택한 질문에 연결해 근거로 가져올 수 있습니다.</small>
      <textarea rows="3" value={value.observation || ''} onChange={(event) => setField('observation', event.target.value)} placeholder="지도·자료·조건을 바꾸어 보며 직접 확인한 점을 기록하세요." />
    </label>
    <div className="activity-artifact-preview" aria-live="polite">
      <div><span className="eyebrow">현재 활동 산출물</span><strong>{artifact.label}</strong></div>
      <p>{artifact.summary}</p><small>한계 · {artifact.limitation}</small>
    </div>
    <div className="activity-sources"><span>자료 출처</span>{activity.sourceLinks.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗<small>{source.note}</small></a>)}</div>
    {activity.aiMode && <p className="activity-ai-mode"><strong>AI 사용 방식:</strong> {activity.aiMode}</p>}
  </section>;
}
