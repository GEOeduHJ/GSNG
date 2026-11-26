import {lazy,Suspense,useState} from 'react';

const GeoMap=lazy(()=>import('./GeoMap.jsx'));
const EChartPanel=lazy(()=>import('./EChartPanel.jsx'));
const NetworkGraph=lazy(()=>import('./NetworkGraph.jsx'));

function MapBlock({module,label}) {
  const visualization=module.visualization;
  return <GeoMap pattern={visualization.mapPattern} layers={visualization.layers} label={label||'공간 자료 탐구 모식도'}/>;
}

function ChoiceCards({title,items,variant='lens'}) {
  const [selected,setSelected]=useState(0);
  const item=items?.[selected];
  if(!items?.length)return null;
  return <div className={`choice-panel ${variant}-panel`}><span className="eyebrow">{title}</span><div className="choice-cards">{items.map((entry,index)=>{
    const name=Array.isArray(entry)?entry[0]:entry;
    return <button key={`${name}-${index}`} type="button" className={selected===index?'is-selected':''} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span>0{index+1}</span><strong>{name}</strong></button>;
  })}</div>{Array.isArray(item)&&<p className="choice-detail">{item[1]}</p>}</div>;
}

function FlowSteps({steps,details,title='탐구 단계'}) {
  const [selected,setSelected]=useState(0);
  return <div className="flow-activity"><span className="eyebrow">{title}</span><div className="flow-track">{steps.map((step,index)=><button key={step} className={`flow-node${selected===index?' is-selected':''}`} type="button" aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="flow-count">0{index+1}</span><strong>{step}</strong><span className="flow-arrow" aria-hidden="true">→</span></button>)}</div><p className="visual-note">{details?.[selected]||'이 단계에서 확인할 자료와 관점을 생각해보세요.'}</p></div>;
}

function Timeline({items,details,title='시간에 따른 변화'}) {
  const [selected,setSelected]=useState(0);
  return <div className="timeline-activity"><span className="eyebrow">{title}</span><div className="timeline-track">{items.map((item,index)=><button key={item} type="button" className={`timeline-event${selected===index?' is-selected':''}`} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="timeline-dot"/><span className="timeline-index">시점 0{index+1}</span><strong>{item}</strong></button>)}</div><p className="visual-note">{details?.[selected]||'시점별 자료를 비교해 변화와 해석을 구분합니다.'}</p></div>;
}

function FlowMap({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="장소와 흐름 · 모식 GeoJSON"/><FlowSteps steps={v.steps} details={v.details}/></>;
}

function TimelineMap({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="지역 변화 위치 · 모식 GeoJSON"/><Timeline items={v.moments} details={['변화 전 지역의 관계와 조건을 확인합니다.','사건·제도 자료의 시점과 출처를 확인합니다.','통합·분리에 참여한 행위자와 영향을 비교합니다.','현재의 결과와 서로 다른 해석을 구분합니다.']}/></>;
}

function GISCase({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="레이어 조작 연습 · 모식 GeoJSON"/><ChoiceCards title="실제 활용 사례에서 확인할 요소" items={v.caseFields.map((field,index)=>[field,[
    '어떤 시민·기관·공동체가 기술을 사용했나요?',
    '어떤 지리적 문제나 의사결정이 있었나요?',
    '어떤 위치 자료·지도·분석 기술을 사용했나요?',
    '자료가 어떤 결정에 반영됐나요?',
    '자료나 결정에서 빠질 수 있는 것은 무엇인가요?',
  ][index]])}/></>;
}

function Climate({module}) {
  const v=module.visualization;
  return <><div className="visual-grid"><MapBlock module={module} label="세계 기후대 · 모식 GeoJSON"/><EChartPanel kind="climate" data={v} title="월별 기후 비교"/></div><ChoiceCards title="기후를 활용하거나 극복한 사례" items={v.lenses}/></>;
}

function LayerMap({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="지형·활동 레이어 · 모식 GeoJSON"/><ChoiceCards title="개발과 보존을 둘러싼 토론 관점" items={v.perspectives}/></>;
}

function StoryMap({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="장소별 이야기 위치 · 모식 GeoJSON"/><ChoiceCards title="장소·경관·생활 자료" items={v.places.map((place)=>[`${place.name} · ${place.tag}`,place.note])}/><p className="tiny-note">실제 장소·사진·설명은 이용권과 출처를 확인한 뒤 연결합니다.</p></>;
}

function FoodFlow({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="음식·문화 이동 경로 · 모식 GeoJSON"/><FlowSteps steps={v.steps} details={v.details}/></>;
}

function Population({module}) {
  const v=module.visualization;
  return <><EChartPanel kind="population" data={v} title="연령별 인구 구조"/><div className="visual-grid"><MapBlock module={module} label="국제 이주 흐름 · 모식 GeoJSON"/><FlowSteps steps={v.flows} title="이주 흐름 읽기" details={['출발지의 인구·경제 조건을 확인합니다.','이동 경로와 자료의 정의를 점검합니다.','도착지의 인구·생활 변화와 관점을 비교합니다.']}/></div></>;
}

function FoodSystems({module}) {
  const v=module.visualization;
  return <><div className="visual-grid"><EChartPanel kind="bar" data={v.chart} title="생산·소비·무역 비교"/><MapBlock module={module} label="식량 공급 흐름 · 모식 GeoJSON"/></div><FlowSteps steps={v.steps} details={v.details} title="생산에서 접근까지"/><ChoiceCards title="국가 대응 전략 비교 관점" items={v.strategies}/></>;
}

function ValueChain({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="상품 가치사슬 경로 · 모식 GeoJSON"/><NetworkGraph nodes={v.nodes} edges={v.edges}/><ChoiceCards title="공간적 불균등을 줄이는 행동 규모" items={v.actions}/></>;
}

function Energy({module}) {
  const v=module.visualization;
  return <><div className="visual-grid"><EChartPanel kind="energy" data={v.chart} title="에너지 생산·소비 구성 · 모식 자료"/><MapBlock module={module} label="자원·수요지 위치 · 모식 GeoJSON"/></div><ChoiceCards title="대안을 평가할 때 고려할 기준" items={v.criteria}/><div className="criteria-options">{v.options.map((option,index)=><div key={option}><span>0{index+1}</span><strong>{option}</strong><small>실제 수업 자료의 근거로 비교</small></div>)}</div></>;
}

function Environment({module}) {
  const v=module.visualization;
  return <><div className="visual-grid"><MapBlock module={module} label="환경 변화 영역 · 모식 GeoJSON"/><EChartPanel kind="environment" data={v.chart} title="환경 지표 시계열 · 모식 자료"/></div><ChoiceCards title="생태전환 관점으로 점검할 생활 장면" items={v.lifestyle}/><div className="ai-data-note"><span className="ai-label">선택 기능 · 아직 연결 안 됨</span><p><strong>{module.ai.product}</strong>의 사전 산출 분류자료는 출처·이용권·분류 오차·교사 검토가 끝난 뒤 정적 파일로 연결합니다. 학생별 AI 추론이나 API 호출은 없습니다.</p></div></>;
}

function Peace({module}) {
  const v=module.visualization;
  return <><MapBlock module={module} label="사건·공간 맥락 · 모식 GeoJSON"/><Timeline items={v.moments} title="지정학적 변화와 사건"/><ChoiceCards title="복수 출처 비교" items={v.sources.map((source)=>[`${source.name} · ${source.kind}`,source.prompt])}/><ChoiceCards title="평화와 정의에 기여할 실천" items={v.actions}/></>;
}

const renderers={'flow-map':FlowMap,'timeline-map':TimelineMap,'gis-case':GISCase,climate:Climate,'layer-map':LayerMap,'story-map':StoryMap,'food-flow':FoodFlow,population:Population,'food-systems':FoodSystems,'value-chain':ValueChain,energy:Energy,environment:Environment,peace:Peace};

export default function ModuleVisualization({module}) {
  const Renderer=renderers[module.visualization.type];
  return <section className="visualization-frame" aria-labelledby="visualization-title"><div className="visualization-head"><div><span className="eyebrow">자료 탐구</span><h3 id="visualization-title">{module.visualization.title}</h3></div><span className="data-tag">모식 자료 · 교사 검수 전</span></div><p className="visualization-hint">{module.visualization.hint}</p><Suspense fallback={<p className="visual-note" role="status">시각화 자료를 불러오는 중입니다.</p>}>{Renderer?<Renderer module={module}/>:<p className="visual-note">이 교과서 절의 자료 화면을 준비 중입니다.</p>}</Suspense><details className="data-alternative"><summary>자료와 기술 안내</summary><p>{module.sourceNote} 사용 기술: {module.digitalTools.join(', ')}. 실제 통계나 공간자료를 연결할 때는 출처·연도·범위·이용 조건을 표시합니다.</p></details></section>;
}
