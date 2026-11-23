const feature = (geometry, layer, label) => ({type:'Feature',properties:{layer,label},geometry});
const point = (coordinates, layer, label) => feature({type:'Point',coordinates},layer,label);
const line = (coordinates, layer, label) => feature({type:'LineString',coordinates},layer,label);
const polygon = (coordinates, layer, label) => feature({type:'Polygon',coordinates:[coordinates]},layer,label);

const land = [
  polygon([[-168,70],[-140,72],[-112,62],[-94,52],[-80,25],[-100,8],[-120,28],[-145,45],[-168,55],[-168,70]],'land','대륙 모식 윤곽'),
  polygon([[-82,12],[-65,8],[-48,-5],[-42,-30],[-56,-55],[-72,-32],[-78,-8],[-82,12]],'land','대륙 모식 윤곽'),
  polygon([[-12,70],[22,72],[55,63],[91,70],[135,57],[159,45],[144,25],[112,4],[83,10],[62,28],[44,14],[31,-5],[13,-34],[-2,-30],[-14,-4],[-6,21],[-20,42],[-12,70]],'land','대륙 모식 윤곽'),
  polygon([[112,-11],[141,-12],[154,-24],[146,-40],[122,-44],[113,-28],[112,-11]],'land','대륙 모식 윤곽'),
];

const patterns = {
  'product-flow': [line([[-120,38],[-75,25],[10,42],[118,31]],'layer-3','상품 이동 경로'),point([-120,38],'layer-1','출발 장소'),point([10,42],'layer-2','생산 장소'),point([118,31],'layer-1','소비 장소')],
  'boundary-change': [polygon([[-5,35],[34,35],[34,62],[-5,62],[-5,35]],'layer-2','경계 변화 범위'),line([[-5,35],[34,62]],'layer-3','시점별 경계 모식'),point([10,50],'layer-1','사례 위치')],
  'gis-layers': [polygon([[-15,28],[26,28],[26,57],[-15,57],[-15,28]],'layer-2','분포자료 모식'),point([-3,43],'layer-1','활용 장소'),point([14,47],'layer-3','추가 자료 위치')],
  'climate-zones': [polygon([[-170,-18],[170,-18],[170,18],[-170,18],[-170,-18]],'layer-2','기후대 모식'),line([[-170,0],[170,0]],'layer-3','기후대 구분 모식'),point([15,7],'layer-1','지역 A'),point([112,-9],'layer-1','지역 B')],
  'terrain-risk': [polygon([[-20,30],[40,30],[40,65],[-20,65],[-20,30]],'layer-2','지형 범위 모식'),point([6,48],'layer-3','생활권'),point([26,42],'layer-1','비교 장소')],
  'religion-sites': [point([-2,40],'layer-1','장소 A'),point([34,29],'layer-2','장소 B'),point([78,18],'layer-3','장소 C')],
  'food-route': [line([[-70,-8],[15,12],[42,48],[125,28]],'layer-3','음식문화 이동 경로'),point([-70,-8],'layer-1','재료 생산'),point([42,48],'layer-2','문화 교류'),point([125,28],'layer-1','현재의 소비')],
  'migration-flows': [line([[-5,5],[22,25],[55,33]],'layer-3','이주 흐름 모식'),line([[75,-20],[95,4],[118,28]],'layer-3','이주 흐름 모식'),point([0,3],'layer-1','출발 지역'),point([54,33],'layer-2','도착 지역')],
  'food-supply': [line([[-15,10],[24,5],[70,28],[105,18]],'layer-3','공급 흐름 모식'),point([-15,10],'layer-1','생산'),point([45,19],'layer-2','유통'),point([105,18],'layer-1','접근')],
  'value-chain': [line([[-90,20],[-5,35],[42,18],[120,30]],'layer-3','가치사슬 경로 모식'),point([-90,20],'layer-1','원료'),point([-5,35],'layer-2','기업'),point([42,18],'layer-3','물류'),point([120,30],'layer-1','시장')],
  'energy-sites': [point([-100,42],'layer-1','생산 지역'),point([15,48],'layer-2','에너지 자원'),point([100,12],'layer-3','수요 지역')],
  'environment-change': [polygon([[-80,-15],[-38,-15],[-38,15],[-80,15],[-80,-15]],'layer-2','환경 변화 영역 A'),polygon([[12,-5],[52,-5],[52,28],[12,28],[12,-5]],'layer-3','환경 변화 영역 B'),point([-55,0],'layer-1','관찰 지점')],
  'peace-context': [line([[-8,31],[29,31],[47,45]],'layer-3','사건·관계 경로 모식'),point([19,39],'layer-1','사건 위치'),point([43,50],'layer-2','관련 맥락')],
};

export function createSchematicGeoJSON(pattern) {
  return {type:'FeatureCollection',features:[...land,...(patterns[pattern] || patterns['product-flow'])]};
}
