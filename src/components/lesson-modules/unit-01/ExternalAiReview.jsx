import { useState } from 'react';

export default function ExternalAiReview({ config, value, onChange, ready, draft, context = '' }) {
  const [message, setMessage] = useState('');
  if (!config) return null;
  function setField(field, next) { onChange((current) => ({ ...current, [field]: next })); }
  const prompt = `${config.prompt}\n\n[학생 작성 초안]\n${draft || '(초안 없음)'}\n\n[학습용 입력 자료]\n${context || value.promptContext || '(현재 모듈에서 선택한 학습 자료를 학생이 직접 추가)'}\n\nAI 응답은 검증되지 않은 제안입니다. 원문 자료와 대조하세요.`;
  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setMessage('프롬프트를 복사했습니다. 외부 서비스에 붙여 넣으세요.');
    } catch {
      setMessage('자동 복사를 사용할 수 없습니다. 아래 프롬프트를 직접 복사하세요.');
    }
  }

  return <details className="external-ai-review">
    <summary><span><span className="eyebrow">선택 기능 · 외부 생성형 AI</span><strong>{config.serviceLabel}로 관점 검토</strong></span><span>{ready ? '열기' : '초안 저장 후 열림'}</span></summary>
    <div className="external-ai-content">
      <p>학생별 API 호출 없이 직접 실행합니다. 초안과 질문을 먼저 작성한 뒤 이용하세요. 개인 정보는 입력하지 말고, 학교 계정 정책을 확인하세요.</p>
      {!ready && <p className="ai-prerequisite-note" role="status">먼저 QFT 질문을 작성하고 이 활동의 초안을 저장하세요.</p>}
      <label>복사할 프롬프트<textarea rows="7" readOnly value={prompt} /></label>
      <div className="external-ai-actions"><button type="button" className="secondary-button" onClick={copyPrompt} disabled={!ready}>프롬프트 복사</button><a className={`secondary-button${!ready ? ' is-disabled' : ''}`} href={ready ? 'https://gemini.google.com/' : undefined} target="_blank" rel="noreferrer" aria-disabled={!ready} onClick={(event) => { if (!ready) event.preventDefault(); }}>Gemini 열기 ↗</a></div>
      <label>외부 AI 응답 붙여넣기<textarea rows="5" disabled={!ready} value={value.aiOutput || ''} onChange={(event) => setField('aiOutput', event.target.value)} placeholder="응답을 붙여 넣습니다. 비워 두어도 활동을 마칠 수 있습니다." /></label>
      <label>원문과 비교해 확인한 점<textarea rows="3" disabled={!ready} value={value.aiReviewNotes || ''} onChange={(event) => setField('aiReviewNotes', event.target.value)} placeholder="근거 없는 내용, 누락된 관점, 수정·기각한 이유를 기록합니다." /></label>
      {message && <p className="qft-message" role="status">{message}</p>}
      <small className="non-grading-note">외부 AI 응답은 자동으로 사실 확인되지 않으며 평가 점수에 사용되지 않습니다. AI를 사용하지 않아도 아래 활동만으로 완결됩니다.</small>
    </div>
  </details>;
}
