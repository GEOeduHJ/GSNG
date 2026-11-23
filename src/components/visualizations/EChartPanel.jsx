import {useEffect,useRef} from 'react';
import * as echarts from 'echarts/core';
import {BarChart,LineChart,PieChart} from 'echarts/charts';
import {AriaComponent,GridComponent,LegendComponent,TooltipComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([BarChart,LineChart,PieChart,AriaComponent,GridComponent,LegendComponent,TooltipComponent,CanvasRenderer]);

function buildOption(kind,data={}) {
  const common={textStyle:{fontFamily:'Pretendard, Apple SD Gothic Neo, sans-serif'},animationDuration:250,aria:{enabled:true, decal:{show:true}},grid:{left:42,right:18,top:35,bottom:36,containLabel:true},tooltip:{trigger:'axis'}};
  if(kind==='climate') return {...common,legend:{top:0,textStyle:{fontSize:11}},xAxis:{type:'category',data:data.months||[],axisLabel:{fontSize:9}},yAxis:{type:'value',name:'모식 기온',axisLabel:{fontSize:9}},series:(data.series||[]).map((series,index)=>({name:series.name,type:'line',smooth:true,showSymbol:true,data:series.values,lineStyle:{width:3,color:index?'#648d76':'#bf7b51'},itemStyle:{color:index?'#648d76':'#bf7b51'},areaStyle:{opacity:.08}}))};
  if(kind==='population') {
    const pyramid=data.pyramid||data;
    return {...common,legend:{top:0},grid:{left:45,right:45,top:34,bottom:28,containLabel:true},xAxis:{type:'value',axisLabel:{fontSize:9,formatter:(value)=>Math.abs(value)}},yAxis:{type:'category',data:data.groups||[],axisLabel:{fontSize:9}},series:[{name:'집단 A · 모식',type:'bar',stack:'total',data:(pyramid.left||[]).map((value)=>-value),itemStyle:{color:'#8caf94'}},{name:'집단 B · 모식',type:'bar',stack:'total',data:pyramid.right||[],itemStyle:{color:'#c78862'}}]};
  }
  if(kind==='energy') return {...common,tooltip:{trigger:'item'},legend:{bottom:0,textStyle:{fontSize:10}},series:[{type:'pie',radius:['38%','68%'],center:['50%','48%'],label:{fontSize:10},data:(data.labels||[]).map((name,index)=>({name,value:data.values?.[index]||0})),color:['#588c6b','#d49b5d','#8294a5','#b66e4f']}]};
  if(kind==='environment') return {...common,xAxis:{type:'category',data:data.labels||[],axisLabel:{fontSize:9}},yAxis:{type:'value',axisLabel:{fontSize:9}},series:[{type:'line',smooth:true,data:data.values||[],symbolSize:8,lineStyle:{color:'#4f8764',width:3},itemStyle:{color:'#4f8764'},areaStyle:{color:'rgba(95,145,104,.13)'}}]};
  return {...common,xAxis:{type:'category',data:data.labels||[],axisLabel:{fontSize:9}},yAxis:{type:'value',axisLabel:{fontSize:9}},series:[{type:'bar',data:data.values||[],barMaxWidth:34,itemStyle:{color:'#6d9878',borderRadius:[4,4,0,0]}}]};
}

export default function EChartPanel({kind,data,title}) {
  const containerRef=useRef(null);
  useEffect(()=>{
    if(!containerRef.current)return undefined;
    const chart=echarts.init(containerRef.current,null,{renderer:'canvas'});
    chart.setOption(buildOption(kind,data));
    const observer=new ResizeObserver(()=>chart.resize());
    observer.observe(containerRef.current);
    return ()=>{observer.disconnect();chart.dispose();};
  },[kind,data]);
  const summary=kind==='climate'?(data.series||[]).map((item)=>`${item.name}: ${item.values.join(', ')}`).join(' · '):kind==='population'?`${(data.groups||[]).join(', ')}; 집단 A ${(data.pyramid?.left||[]).join(', ')}; 집단 B ${(data.pyramid?.right||[]).join(', ')}`:`${(data.labels||[]).join(', ')}; ${(data.values||[]).join(', ')}`;
  return <figure className="echart-figure"><figcaption>{title}<span>시제품 모식 값</span></figcaption><div ref={containerRef} className="echart-canvas" role="img" aria-label={`${title}. 실제 통계가 아닌 시제품용 예시 시각화.`}/><details className="data-alternative"><summary>그래프 값을 글로 보기</summary><p>{summary}</p></details></figure>;
}
