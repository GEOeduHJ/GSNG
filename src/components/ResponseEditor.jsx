const fields=[
  ['claim','나의 설명·주장','질문에 대한 현재의 설명을 적어보세요.'],
  ['evidence','자료에서 찾은 근거','자료의 이름·시점·단위와 관찰한 내용을 적어보세요.'],
  ['reasoning','근거와 질문을 연결하는 이유','이 근거로 그렇게 설명할 수 있는 이유를 적어보세요.'],
];

export default function ResponseEditor({record,onChange,onComplete}) {
  const selectedQuestion=record.questions?.[record.selectedQuestion]||'아직 탐구 질문을 선택하지 않았습니다.';
  return <section className="learning-card explanation-card" aria-labelledby="explain-title"><div className="section-heading"><div><span className="eyebrow">자료를 근거로</span><h2 id="explain-title">탐구 결과 설명하기</h2></div><span className="concept-mark">선택한 질문</span></div><div className="selected-question">{selectedQuestion}</div><p className="section-intro">주장, 자료에서 찾은 근거, 근거가 주장을 뒷받침하는 이유를 나누어 적으세요.</p><div className="response-fields">{fields.map(([name,label,placeholder])=><label key={name}>{label}<textarea name={name} rows="3" maxLength="800" value={record[name]||''} placeholder={placeholder} onChange={(event)=>onChange(name,event.target.value)}/></label>)}</div><div className="submit-row"><p className="save-status">{record.completed?'이 모듈의 탐구 기록을 저장했어요.':'작성 중인 기록은 이 브라우저에 자동 저장됩니다.'}</p><button className="primary-button" type="button" onClick={onComplete}>탐구 기록 저장</button></div></section>;
}
