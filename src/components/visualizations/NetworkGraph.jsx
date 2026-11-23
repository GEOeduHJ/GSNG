import {useEffect,useRef,useState} from 'react';
import cytoscape from 'cytoscape';

export default function NetworkGraph({nodes=[],edges=[]}) {
  const containerRef=useRef(null);
  const cyRef=useRef(null);
  const [selected,setSelected]=useState(nodes[0]?.label||'');
  useEffect(()=>{
    if(!containerRef.current)return undefined;
    const cy=cytoscape({
      container:containerRef.current,
      elements:[...nodes.map((node)=>({data:{id:node.id,label:node.label,group:node.group}})),...edges.map((edge,index)=>({data:{id:`edge-${index}`,source:edge.source,target:edge.target,label:edge.label}}))],
      style:[
        {selector:'node',style:{'background-color':'#6e9878','label':'data(label)','color':'#284834','font-size':11,'font-family':'Pretendard, sans-serif','text-wrap':'wrap','text-max-width':86,'text-valign':'center','text-halign':'center','width':88,'height':52,'shape':'round-rectangle','border-width':1,'border-color':'#d0e0d0'}},
        {selector:'edge',style:{'width':2,'line-color':'#a8bca9','target-arrow-color':'#8ca58e','target-arrow-shape':'triangle','curve-style':'bezier','label':'data(label)','font-size':8,'color':'#728276','text-background-color':'#fffefa','text-background-opacity':1,'text-background-padding':2}},
        {selector:':selected',style:{'background-color':'#d3925e','line-color':'#d3925e','border-color':'#c47a45','border-width':2}},
      ],
      layout:{name:'cose',animate:false,fit:true,padding:24,nodeRepulsion:5800,idealEdgeLength:115},
      userZoomingEnabled:true,userPanningEnabled:true,boxSelectionEnabled:false,
    });
    cyRef.current=cy;
    cy.on('tap','node',(event)=>setSelected(event.target.data('label')));
    return ()=>{cy.destroy();cyRef.current=null;};
  },[nodes,edges]);
  return <div className="network-visual"><div ref={containerRef} className="cytoscape-canvas" role="img" aria-label="가치사슬 행위자 관계망. 노드를 선택해 관계를 살펴보세요."/><p className="network-selection">선택한 행위자: <strong>{selected}</strong></p><p className="tiny-note">연결은 관계를 보여주는 표현이며 인과관계를 자동으로 증명하지 않습니다.</p><details className="data-alternative"><summary>관계망을 목록으로 보기</summary><ul>{nodes.map((node)=><li key={node.id}>{node.label} · {node.group}</li>)}</ul></details></div>;
}
