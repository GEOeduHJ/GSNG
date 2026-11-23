export default function Sidebar({modules,activeCode,records,onSelect}) {
  const groups=[...new Set(modules.map((module)=>module.group))];
  const completed=modules.filter((module)=>records[module.code]?.completed).length;
  return <aside className="sidebar" aria-label="과목과 모듈">
    <a className="brand" href="#top" aria-label="세계시민과 지리 첫 화면"><span className="brand-mark" aria-hidden="true">지</span><span className="brand-copy"><strong>세계시민과 지리</strong><small>질문에서 시작하는 탐구</small></span></a>
    <div className="course-card"><span className="eyebrow">2022 개정 교육과정</span><strong>13개 배움 모듈</strong><div className="course-progress"><span style={{width:`${completed/modules.length*100}%`}}/></div><small>{completed} / {modules.length} 모듈 탐구 기록</small></div>
    <nav className="module-nav" aria-label="성취기준별 학습 모듈">{groups.map((group)=><div className="nav-group" key={group}><h2>{group}</h2>{modules.filter((module)=>module.group===group).map((module)=><button key={module.code} type="button" className={`module-link${activeCode===module.code?' is-active':''}${records[module.code]?.completed?' is-complete':''}`} aria-current={activeCode===module.code?'page':undefined} onClick={()=>onSelect(module.code)}><span className="module-number">{module.moduleId}</span><span className="module-name">{module.title}</span><span className="module-check">{records[module.code]?.completed?'완료':''}</span></button>)}</div>)}</nav>
    <div className="sidebar-foot"><span className="privacy-dot" aria-hidden="true"/><span>학습 기록은<br/>현재 브라우저에만 저장됩니다.</span></div>
  </aside>;
}
