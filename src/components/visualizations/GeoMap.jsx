import {useEffect,useMemo,useRef,useState} from 'react';
import { Map as MapLibreMap, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import {createSchematicGeoJSON} from '../../modules/schematicGeoJSON.js';

setWorkerUrl(workerUrl);

const colors=['#4d8568','#c17a50','#678da0','#8b7ea3'];
const EMPTY_LAYERS=[];
const baseStyle={version:8,sources:{},layers:[{id:'background',type:'background',paint:{'background-color':'#eef3ed'}}]};

export default function GeoMap({pattern,layers=EMPTY_LAYERS,label='공간자료 모식도'}) {
  const containerRef=useRef(null);
  const mapRef=useRef(null);
  const layerList=useMemo(()=>layers.length?layers.map((label,index)=>({id:`layer-${index+1}`,label,color:colors[index%colors.length]})):[{id:'layer-1',label:'장소·경계',color:colors[0]},{id:'layer-2',label:'현상 분포',color:colors[1]},{id:'layer-3',label:'이동·활동',color:colors[2]}],[layers]);
  const [visible,setVisible]=useState(()=>new Set(layerList.map((item)=>item.id)));
  const visibleRef=useRef(visible);
  visibleRef.current=visible;
  const [error,setError]=useState('');

  useEffect(()=>{
    if (!containerRef.current) return undefined;
    setError('');
    let disposed=false;
    const map=new MapLibreMap({container:containerRef.current,style:baseStyle,center:[10,15],zoom:0.65,minZoom:0.35,maxZoom:2.4,attributionControl:false,dragRotate:false,pitchWithRotate:false});
    mapRef.current=map;
    map.addControl(new NavigationControl({showCompass:false}),'top-right');
    map.on('load',()=>{
      if(disposed)return;
      map.addSource('module-data',{type:'geojson',data:createSchematicGeoJSON(pattern)});
      map.addLayer({id:'land-fill',type:'fill',source:'module-data',filter:['==',['get','layer'],'land'],paint:{'fill-color':'#d8e5d8','fill-outline-color':'#c2d2c3','fill-opacity':0.78}});
      layerList.forEach((layer)=>{
        const color=layer.color;
        map.addLayer({id:`${layer.id}-fill`,type:'fill',source:'module-data',filter:['all',['==',['get','layer'],layer.id],['==',['geometry-type'],'Polygon']],paint:{'fill-color':color,'fill-opacity':0.25,'fill-outline-color':color}});
        map.addLayer({id:`${layer.id}-line`,type:'line',source:'module-data',filter:['all',['==',['get','layer'],layer.id],['==',['geometry-type'],'LineString']],paint:{'line-color':color,'line-width':3,'line-opacity':0.9}});
        map.addLayer({id:`${layer.id}-point`,type:'circle',source:'module-data',filter:['all',['==',['get','layer'],layer.id],['==',['geometry-type'],'Point']],paint:{'circle-color':color,'circle-radius':6,'circle-stroke-color':'#ffffff','circle-stroke-width':2}});
      });
      layerList.forEach((layer)=>{
        const value=visibleRef.current.has(layer.id)?'visible':'none';
        [`${layer.id}-fill`,`${layer.id}-line`,`${layer.id}-point`].forEach((id)=>{
          if(map.getLayer(id))map.setLayoutProperty(id,'visibility',value);
        });
      });
      map.fitBounds([[-160,-55],[155,73]],{padding:20,duration:0});
    });
    map.on('error',(event)=>{
      if (!disposed&&/webgl|context/i.test(event.error?.message || '')) setError('이 기기에서는 지도를 표시할 수 없어 자료 설명을 텍스트로 제공합니다.');
    });
    return ()=>{disposed=true;map.remove();if(mapRef.current===map)mapRef.current=null;};
  },[pattern,layerList]);

  function toggleLayer(id) {
    const next=new Set(visibleRef.current);
    if(next.has(id))next.delete(id);else next.add(id);
    visibleRef.current=next;
    setVisible(next);
    const map=mapRef.current;
    if(map?.isStyleLoaded()){
      const value=next.has(id)?'visible':'none';
      [`${id}-fill`,`${id}-line`,`${id}-point`].forEach((layerId)=>{if(map.getLayer(layerId))map.setLayoutProperty(layerId,'visibility',value);});
    }
  }

  return <div className="map-activity">
    <div className="map-caption"><span>{label}</span><span>시제품 GeoJSON · 실제 경계·통계 아님</span></div>
    <div className="maplibre-canvas-wrap"><div ref={containerRef} className="maplibre-canvas" role="img" aria-label={`${label}. 모식 지리 도형과 위치·경로를 보여줍니다.`}/>{error&&<p className="map-fallback" role="status">{error}</p>}</div>
    <div className="map-layer-controls" aria-label="지도 레이어 선택">{layerList.map((layer)=><label key={layer.id}><input type="checkbox" checked={visible.has(layer.id)} onChange={()=>toggleLayer(layer.id)}/><i style={{'--layer-color':layer.color}}/><span>{layer.label}</span></label>)}</div>
  </div>;
}
