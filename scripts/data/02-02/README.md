# 02-02 세계의 지형과 인간 생활 — 실제 자료

기존 자료의 수집일은 각 manifest 항목에 기록했고, 이번 모듈 확산 자료는 2026-11-27에 갱신했다. 원자료는 임시 폴더 또는 메모리에서만 다루고 저장소에는 웹에서 읽는 JSON·GeoJSON만 둔다. 모든 출력은 1,000,000 bytes 이하이며, 재생성은 각 파일에 적힌 Python 스크립트로 한다.

## 산출물

| 파일 | 화면 형식 | 기간·기준 | 크기 |
| --- | --- | --- | ---: |
| `earthquakes-m6-2000-2025.geojson` | 점 지도 | 2000–2025, 규모 6 이상 | 752,210 bytes |
| `holocene-volcanoes.geojson` | 점 지도 | GVP v5.4.1, 2026-11-15 기준 | 236,070 bytes |
| `low-elevation-population-map.json` | 단계 구분도 | 2015 | 4,386 bytes |
| `low-elevation-land-area-map.json` | 단계 구분도 | 2015 | 4,411 bytes |
| `sagarmatha-point.geojson` | 점 지도 | UNESCO 등재지 공식 대표 좌표 | 266 bytes |
| `sagarmatha-visitors-series.json` | 선그래프 | FY 1975/76–2014/15 | 576 bytes |
| `plate-boundary-points.geojson` | 범주형 점 지도 | USGS 경계 선 1,175개, 약 350km 간격 표본 | 271,330 bytes |
| `major-landforms.geojson` | 범주형 점 지도 | Natural Earth 물리 지형 지역 361개 대표점, 주요 사례 이름 16개 | 100,505 bytes |
| `international-tourism-arrivals-1995-2020.json` | 선그래프 | 네팔·아이슬란드·뉴질랜드·잠비아, 1995–2020 | 1,121 bytes |
| `terrestrial-protected-areas-map-2025.json` | 단계 구분도 | 2025년, 217개 국가·경제 코드 | 2,310 bytes |

## 출처와 이용 조건

- **지진:** [USGS FDSN Earthquake Catalog API](https://earthquake.usgs.gov/fdsnws/event/1/)에서 `catalog=us`, `eventtype=earthquake`, `minmagnitude=6` 조건으로 받았다. USGS는 지진 자료를 공공 도메인 자료로 표시한다([USGS Earthquakes](https://www.usgs.gov/programs/earthquake-hazards/earthquakes)). 출처는 점 지도 캡션에 표시한다.
- **화산:** [Smithsonian GVP WFS](https://volcano.si.edu/database/webservices.cfm)의 `Smithsonian_VOTW_Holocene_Volcanoes` 레이어다. [GVP 이용 조건](https://volcano.si.edu/gvp_termsofuse.cfm)은 Volcanoes of the World 데이터베이스 편집물이 미국 정부 직원 저작물이라고 명시한다. Smithsonian의 [일반 이용 조건](https://www.si.edu/termsofuse)은 교육·비상업 이용을 허용하므로 이 범위에서 사용하고 GVP 인용 표기를 따른다. 버전은 v5.4.1 (2026-11-15), DOI `10.5479/si.GVP.VOTW5-2026.5.4`다. 이 목록은 홀로세 화산이며 현재 활동 중인 화산만의 목록은 아니다.
- **저지대 국가 지표:** [World Bank WDI](https://datacatalog.worldbank.org/infrastructure-data/search/dataset/0037712/world-development-indicators)는 CC BY 4.0이다. `EN.POP.EL5M.ZS`와 `AG.LND.EL5M.ZS`의 원자료 설명은 CIESIN의 저지대 해안 구역 자료를 가리킨다. 두 지표 모두 최신 관측 연도가 2015년이며 217개 국가·경제 코드 중 215개에 값이 있다. 값이 없는 `CHI`, `XKX`는 `null`로 남겼다.
- **사가르마타 위치:** [UNESCO 지도 표](https://whc.unesco.org/en/list/120/maps)의 대표 좌표(27°57′55.008″N, 86°54′47.016″E)를 십진 좌표로 변환했다. UNESCO 등재 페이지는 설명에 CC-BY-SA IGO 3.0을 표시한다. 점은 UNESCO가 제공한 대표 위치이며 공원 경계나 계산된 중심점이 아니다. 면적 124,400ha와 등재 연도 1979도 UNESCO의 [공식 등재 페이지](https://whc.unesco.org/en/list/120)에서 대조했다.
- **방문객 시계열:** [사가르마타 국립공원 사무소의 관리계획 PDF](https://www.snp.gov.np/uploads/download/1597001947.pdf) 부록 VII 표 `Tourist record of Sagarmatha National Park`를 사용했다. 저작권 페이지는 2016년 저작권과 함께 문서의 전체·일부 복제 시 제목과 발행기관을 저작권자로 표기하도록 허용한다. 그 문구를 manifest의 `attribution`에 기록했다.
- **판 경계:** [USGS Tectonic Plate Boundaries MapServer](https://earthquake.usgs.gov/arcgis/rest/services/eq/map_plateboundaries/MapServer/1)에서 1,175개 선 피처와 경계 유형을 받았다. USGS가 작성·제작한 정보는 공공 도메인이며 출처를 표시했다. 선의 정점을 대략 350km 간격으로 표본화한 지도이므로 정밀 경계선이나 지진 관측점이 아니다.
- **주요 지형 지역:** [Natural Earth 1:10m Physical Labels](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-physical-labels/)의 `ne_10m_geography_regions_polys`를 사용했다. Natural Earth는 자료를 public domain으로 제공한다. 원 경계는 대략 1:50m 수준으로 일반화되며, 여기서는 산지·고원·평야·분지·저지대·계곡·협곡·하구 평야 폴리곤에서 대표점을 계산했다. 그랜드 캐니언·티베트고원·히말라야산맥 등 주요 사례 16곳만 지도에 이름을 표시해 전 세계 분포를 읽기 쉽게 했다. 지형 분포 개관용이며 순상지·안정육괴나 습곡 산지의 형성 연대를 분류하지 않는다.
- **국제 관광객 도착:** [World Bank WDI `ST.INT.ARVL`](https://data.worldbank.org/indicator/ST.INT.ARVL)을 World Bank API에서 받았다. 지표 페이지의 이용 조건은 CC BY 4.0이고 원 제공자는 UN Tourism이다. 네 나라의 1995–2020 시계열을 저장했다. 국가 전체 도착 수이므로 특정 지형·관광지 방문자 수와 구분한다.
- **육상 보호 지역:** [World Bank WDI `ER.LND.PTLD.ZS`](https://data.worldbank.org/indicator/ER.LND.PTLD.ZS)을 사용했다. 지표 페이지의 이용 조건은 CC BY 4.0이며 원자료는 Protected Planet의 WDPA·WD-OECM, UNEP-WCMC와 IUCN에서 온다. 2025년 값은 217개 국가·경제 코드 중 213개에 있다. 지정·보고 면적의 비율이며 관리 성과나 주민 참여를 직접 측정하지 않는다.
- **지역 사례 출처:** New Zealand GNS Science의 [화산](https://www.gns.cri.nz/our-science/natural-hazards-and-risks/volcanoes/)·[빙하](https://www.gns.cri.nz/our-science/environment-and-climate/climate-system/glaciers/) 설명, UNEP의 [맹그로브 숲](https://www.unep.org/en/what-we-do/ocean-seas-and-coasts/blue-ecosystems/mangrove-forests), Gold Coast의 [사구 관리](https://www.goldcoast.qld.gov.au/Environment-sustainability/Protecting-our-environment/Managing-our-beaches/Sand-dredging-dunes), UNESCO의 [히에라폴리스-파묵칼레](https://whc.unesco.org/en/list/485/) 페이지를 설명 출처로 확인했다. 페이지 문구·도판은 재배포하지 않았다.
- **최신 방문 통계 제외:** [Nepal Tourism Statistics 2024](https://www.tourism.gov.np/files/statistics/30.pdf) 표 5.5에는 2016–2024년 보호지역 방문 통계가 있지만, PDF에 Ministry의 저작권 표시가 있고 재사용 허가를 찾지 못해 재배포하지 않았다. 해당 표는 외국인 방문자 수이고 관리계획 표의 방문객 정의와 같다고 확인되지 않아 두 계열을 이어 붙이지 않았다.

## 표본 재확인

각 출력에서 세 값을 원 제공처의 API·표와 다시 대조했다.

| 출력 파일 | 확인한 값 | 원 사이트 확인 |
| --- | --- | --- |
| `earthquakes-m6-2000-2025.geojson` | `usp000dbed`, 2004, 규모 9.0, `[95.982, 3.295]` | [USGS 2004-12-26, catalog=us](https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2004-12-26&endtime=2004-12-27&minmagnitude=6&eventtype=earthquake&orderby=time-asc&limit=1000&catalog=us) |
| `earthquakes-m6-2000-2025.geojson` | `usp000hvnu`, 2011, 규모 9.0, `[142.373, 38.297]` | [USGS 2011-03-11, catalog=us](https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2011-03-11&endtime=2011-03-12&minmagnitude=6&eventtype=earthquake&orderby=time-asc&limit=1000&catalog=us) |
| `earthquakes-m6-2000-2025.geojson` | `us20002926`, 2015, 규모 7.8, `[84.7314, 28.2305]` | [USGS 2015-04-25, catalog=us](https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-04-25&endtime=2015-04-26&minmagnitude=6&eventtype=earthquake&orderby=time-asc&limit=1000&catalog=us) |
| `holocene-volcanoes.geojson` | GVP `211060`, `[14.999, 37.748]`, 3,357m | [GVP WFS record 211060](https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GVP-VOTW%3ASmithsonian_VOTW_Holocene_Volcanoes&outputFormat=application%2Fjson&CQL_FILTER=Volcano_Number%3D211060&propertyName=GeoLocation%2CVolcano_Number%2CLatitude%2CLongitude%2CElevation) |
| `holocene-volcanoes.geojson` | GVP `283030`, `[138.728, 35.361]`, 3,776m | [GVP WFS record 283030](https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GVP-VOTW%3ASmithsonian_VOTW_Holocene_Volcanoes&outputFormat=application%2Fjson&CQL_FILTER=Volcano_Number%3D283030&propertyName=GeoLocation%2CVolcano_Number%2CLatitude%2CLongitude%2CElevation) |
| `holocene-volcanoes.geojson` | GVP `332010`, `[-155.287, 19.421]`, 1,222m | [GVP WFS record 332010](https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GVP-VOTW%3ASmithsonian_VOTW_Holocene_Volcanoes&outputFormat=application%2Fjson&CQL_FILTER=Volcano_Number%3D332010&propertyName=GeoLocation%2CVolcano_Number%2CLatitude%2CLongitude%2CElevation) |
| `low-elevation-population-map.json` | BGD, 2015: 8.38183750736477% | [World Bank API: BGD](https://api.worldbank.org/v2/country/BGD/indicator/EN.POP.EL5M.ZS?format=json&date=2015) |
| `low-elevation-population-map.json` | NLD, 2015: 53.6880948779583% | [World Bank API: NLD](https://api.worldbank.org/v2/country/NLD/indicator/EN.POP.EL5M.ZS?format=json&date=2015) |
| `low-elevation-population-map.json` | USA, 2015: 1.98031592664396% | [World Bank API: USA](https://api.worldbank.org/v2/country/USA/indicator/EN.POP.EL5M.ZS?format=json&date=2015) |
| `low-elevation-land-area-map.json` | BGD, 2015: 15.8661503621848% | [World Bank API: BGD](https://api.worldbank.org/v2/country/BGD/indicator/AG.LND.EL5M.ZS?format=json&date=2015) |
| `low-elevation-land-area-map.json` | NLD, 2015: 52.0084577000959% | [World Bank API: NLD](https://api.worldbank.org/v2/country/NLD/indicator/AG.LND.EL5M.ZS?format=json&date=2015) |
| `low-elevation-land-area-map.json` | USA, 2015: 1.45540481308153% | [World Bank API: USA](https://api.worldbank.org/v2/country/USA/indicator/AG.LND.EL5M.ZS?format=json&date=2015) |
| `sagarmatha-point.geojson` | 위도 27.96528°N (27°57′55.008″N) | [UNESCO 지도 표](https://whc.unesco.org/en/list/120/maps) |
| `sagarmatha-point.geojson` | 경도 86.91306°E (86°54′47.016″E) | [UNESCO 지도 표](https://whc.unesco.org/en/list/120/maps) |
| `sagarmatha-point.geojson` | 등재 면적 124,400ha | [UNESCO Sagarmatha National Park](https://whc.unesco.org/en/list/120) |
| `sagarmatha-visitors-series.json` | FY 1975/76: 3,600명 | [공식 관리계획 PDF, 부록 VII, p.67](https://www.snp.gov.np/uploads/download/1597001947.pdf#page=88) |
| `sagarmatha-visitors-series.json` | FY 2012/13: 36,650명 | [공식 관리계획 PDF, 부록 VII, p.67](https://www.snp.gov.np/uploads/download/1597001947.pdf#page=88) |
| `sagarmatha-visitors-series.json` | FY 2014/15: 34,412명 | [공식 관리계획 PDF, 부록 VII, p.67](https://www.snp.gov.np/uploads/download/1597001947.pdf#page=88) |
| `international-tourism-arrivals-1995-2020.json` | 네팔 2020: 230,000명 | [WDI API: NPL, ST.INT.ARVL](https://api.worldbank.org/v2/country/NPL/indicator/ST.INT.ARVL?format=json&date=2020) |
| `international-tourism-arrivals-1995-2020.json` | 아이슬란드 2020: 488,000명 | [WDI API: ISL, ST.INT.ARVL](https://api.worldbank.org/v2/country/ISL/indicator/ST.INT.ARVL?format=json&date=2020) |
| `international-tourism-arrivals-1995-2020.json` | 뉴질랜드 2020: 996,000명 | [WDI API: NZL, ST.INT.ARVL](https://api.worldbank.org/v2/country/NZL/indicator/ST.INT.ARVL?format=json&date=2020) |
| `terrestrial-protected-areas-map-2025.json` | 네팔 2025: 23.6% | [WDI API: NPL, ER.LND.PTLD.ZS](https://api.worldbank.org/v2/country/NPL/indicator/ER.LND.PTLD.ZS?format=json&date=2025) |
| `terrestrial-protected-areas-map-2025.json` | 뉴질랜드 2025: 33.4% | [WDI API: NZL, ER.LND.PTLD.ZS](https://api.worldbank.org/v2/country/NZL/indicator/ER.LND.PTLD.ZS?format=json&date=2025) |
| `terrestrial-protected-areas-map-2025.json` | 잠비아 2025: 41.3% | [WDI API: ZMB, ER.LND.PTLD.ZS](https://api.worldbank.org/v2/country/ZMB/indicator/ER.LND.PTLD.ZS?format=json&date=2025) |
| `major-landforms.geojson` | 그랜드 캐니언, `Gorge`, NE_ID `1159103741` | [Natural Earth 10m physical labels](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-physical-labels/) |
| `major-landforms.geojson` | 그레이트플레인스, `Plain`, NE_ID `1159104319` | [Natural Earth 10m physical labels](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-physical-labels/) |
| `major-landforms.geojson` | 갠지스 삼각주, `Delta`, NE_ID `1159103515` | [Natural Earth 10m physical labels](https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-physical-labels/) |
| `plate-boundary-points.geojson` | 수렴 경계 196점, 변환 경계 583점, 발산 경계 545점 | [USGS MapServer layer 1](https://earthquake.usgs.gov/arcgis/rest/services/eq/map_plateboundaries/MapServer/1) |

## 가공, 경계, 결측 처리

- **지진:** 2000–2025년을 5년 단위로 나눠 요청한다. 각 쿼리는 `limit=1000`이며 1,000개를 채우면 API 결과가 잘렸을 수 있으므로 스크립트가 실패한다. 이번 요청은 각 구간에서 145–841건을 반환했다. 연도 경계 중복을 제거하고 UTC 발생 연도로 필터링한다. 규모 6 이상 3,881건 가운데 3,493건은 `규모 6~6.9`, 388건은 `규모 7 이상`이다. 원자료의 지역명은 영어라 `name`은 빈 문자열로 두었다. 규모 9.0으로 수록된 2004년·2011년 사건은 `catalog=us` 레코드 값이다. 같은 사건의 기본 우선 상세 페이지는 규모 9.1을 표시할 수 있으므로, 이 자료와 비교할 때는 동일한 카탈로그 필터를 쓴다.
- **화산:** GVP `Holocene Volcanoes` 레이어에서 좌표, 화산 번호, 표고만 남긴다. 스크립트는 공간 필드 이름인 `GeoLocation`을 요청해야 좌표가 반환된다. `name`은 번역하지 않고 빈 문자열로 두며, `volcano_number`로 원 레코드를 추적한다. 화산 점은 분포 학습용이며 현재 활동 상태를 의미하지 않는다.
- **국가 경계:** 새 경계는 만들지 않는다. 단계 구분도는 저장소의 `public/data/base/countries-110m.geojson`과 ISO 코드로 연결한다. WDI 응답에서 관측값이 없는 `CHI`, `XKX`는 0으로 바꾸거나 보간하지 않고 `null`로 유지한다.
- **WDI 지표:** `EN.POP.EL5M.ZS`는 국가 전체 인구 중 해발 5m 미만 구역 거주 인구의 비율이다. `AG.LND.EL5M.ZS`는 국가 전체 면적 중 해당 저지대 면적 비율이다. 둘 다 최신 관측은 2015년이며, 침수 위험이나 개인별 거주 위치를 뜻하지 않는다.
- **사가르마타 점:** UNESCO의 공식 대표 좌표를 십진수로 변환했다. 점 하나만 있으며 공원 외곽선이나 면적의 도형 표현은 아니다.
- **방문객 시계열:** x축 정수는 회계연도의 시작 연도다(예: `2014`는 FY 2014/15). 표에 없는 FY 1979/80–1985/86은 일곱 칸 모두 `null`로 둔다. 최근 관측처럼 보이지 않도록 마지막 기준 연도 2015를 명시한다.

## 절별 추천 자료 단계

| 절 | 자료 단계 | 사용 파일과 학습 초점 |
| --- | --- | --- |
| 1. 세계의 대지형은 어떻게 만들어졌을까? | 1단계 | `plate-boundary-points.geojson`: 경계 유형과 지형 형성 과정을 살핀다. |
|  | 2단계 | `earthquakes-m6-2000-2025.geojson`·`holocene-volcanoes.geojson`: 지진·화산 분포가 판 경계와 겹치는 곳과 차이를 비교한다. |
| 2. 땅 위에서 사람들은 어떻게 살아갈까? | 1단계 | `major-landforms.geojson`: 주요 산지·고원·평야·분지·계곡·하구 평야의 대략적 분포를 살핀다. |
|  | 2단계 | `/data/03-01/population-density-map-2024.json`·`holocene-volcanoes.geojson`: 지형·화산 지역과 인구 분포를 비교한다. |
|  | 3단계 | `low-elevation-population-map.json`·`low-elevation-land-area-map.json`: 2015년 저지대 거주와 저지대 면적의 국가별 비율을 대조한다. |
| 3. 관광자원으로 활용되는 지형에는 무엇이 있을까? | 1단계 | `international-tourism-arrivals-1995-2020.json`: 네 나라의 국가 단위 관광객 도착 변화와 집계 규모를 살핀다. |
|  | 2단계 | `sagarmatha-point.geojson`·`sagarmatha-visitors-series.json`: 산악 세계유산의 위치·등재 정보와 과거 방문객 변화를 연결한다. |
| 4. 지형의 지속가능한 활용 방안은 무엇일까? | 1단계 | `terrestrial-protected-areas-map-2025.json`: 육상 보호 지역 비율의 국가 차이를 살피고 보전 성과를 추가 근거로 평가한다. |
|  | 2단계 | `sagarmatha-point.geojson`·`sagarmatha-visitors-series.json`·`sustainable-use-cycle.svg`: 관리 사례에 관찰·참여·재검토를 적용한다. |

## 한계와 대체안

- WDI 지표의 최신 연도는 2015년이다. 지도는 저지대 거주 분포를 소개하는 역사적 스냅샷으로만 쓸 수 있다. 현황 비교가 필요하면 [WorldPop Global2 R2025A](https://api.worldpop.org/v3/documentation)의 2025년 100m 인구 격자(CC BY 4.0)와 사용 조건·수직 정확도를 확인한 공개 고도 모델을 결합해 국가별 비율을 다시 계산하는 방안을 권한다. 이번에는 새 지표를 추정하거나 보간하지 않았다.
- 관광 방문객 수는 FY 2014/15에서 끝난다. Ministry의 2024 통계에 2024년까지 공원 방문자 자료가 있으나, 해당 문서 재사용 조건이 확인되지 않아 넣지 않았다. 최신화할 때는 Ministry의 재배포 허가를 받거나 개방 라이선스 통계를 찾고, 외국인 방문자와 전체 방문객의 정의를 먼저 맞춰야 한다.
- 지진 규모는 카탈로그 선택에 따라 달라질 수 있다. 2004년·2011년 `catalog=us` 레코드는 9.0이고, 기본 상세 페이지의 우선 값은 9.1이다. 수업 캡션은 `USGS catalog=us`를 명시한다.
- GVP 홀로세 분류는 최근 화산 활동 상태와 다르다. 현재 활동 상태를 수업 목표로 삼는다면 별도의 연도별 분화·경보 자료를 추가로 찾아야 한다.

## 생성 스크립트

- `python3 scripts/data/02-02/tectonic_hazards.py`
- `python3 scripts/data/02-02/world_bank.py`
- `python3 scripts/data/02-02/sagarmatha.py`
- `python3 scripts/data/02-02/plate_boundary_points.py`
- `python3 scripts/data/02-02/natural_earth_landforms.py`
- `python3 scripts/data/02-02/module_wdi.py`
