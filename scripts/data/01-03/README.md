# 01-03 지리 정보와 지리정보기술 — 실제 자료

자료를 수집한 날은 2026-11-27이다. 원자료는 임시 폴더에서 처리했고 저장소에는 가공된 GeoJSON·JSON만 둔다. 산출물은 모두 1MB 미만이다.

## 산출물

| 파일 | 화면 자료 | 내용 |
| --- | --- | --- |
| populated-places-top32.geojson | 점 지도 | Natural Earth POP_MAX 상위 32개 도시 위치와 속성 |
| populated-places-top10.json | 막대그래프 | POP_MAX 상위 10개 도시 인구 속성값 |
| world-major-airports.geojson | 점 지도 | Natural Earth scalerank 3 이하 공항 위치 90곳 |
| nepal-earthquakes-apr-may-2015.geojson | 점 지도 | 네팔·주변 지역, 2015년 4–5월 규모 4.5 이상 지진 진앙 106건 |
| nepal-osm-participation-2015.json | 막대그래프 | HOT 보고서의 네팔 매핑 참여 규모 |
| daejeon-seogu-earthquake-shelters.geojson | 점 지도 | 대전광역시 서구 지진 옥외 대피장소 79곳 |
| daejeon-seogu-shelters-by-type.json | 막대그래프 | 대피장소 유형별 시설 수 |
| daejeon-seogu-bus-stops.geojson | 점 지도 | 대전광역시 서구 버스 정류장 위치와 안내 단말기 표시 493건 |

막대그래프 JSON은 공통 값 표 형식(year, unit, rows)을 따른다. 점 지도는 GeoJSON Point FeatureCollection이며 좌표 순서는 경도·위도다.

## 출처와 이용 조건

- **세계 도시:** Natural Earth 1:10m Populated Places v5.1.2의 POP_MAX, NAME_KO, ADM0_A3와 Point geometry를 사용했다. Natural Earth Terms of Use는 데이터의 수정·재배포를 허용하는 공개 도메인 조건이다. POP_MAX 내림차순으로 상위 도시를 선택했다. 도시별 경계 정의와 인구 기준 시점은 통일되어 있지 않아 현행 동시점 인구 순위로 해석하지 않는다.
- **세계 공항:** Natural Earth 10m Airports v5.0.0에서 scalerank 3 이하, location이 approximate가 아닌 항목 중 IATA 코드가 있는 점을 골랐다. Natural Earth 공개 도메인 자료다. 90개 위치 가운데 85개는 major, 5개는 mid 분류다. 이는 축척용 선택 목록이며 모든 공항의 현황·운항량을 나타내지 않는다.
- **지진:** USGS FDSN Earthquake Catalog에서 2015-04-01 00:00:00–2015-05-31 23:59:59 UTC, 북위 24–34도·동경 79–90도, 규모 4.5 이상을 조회했다. USGS 자체 제작 자료는 미국 공개 도메인이며 출처 표기를 요청한다. 진앙은 흔들림이나 피해 범위와 다르다.
- **디지털 매핑 참여 수:** HOT 2015 Annual Report pp. 5–6에서 첫 48시간 약 2,000명, 발생 5일 뒤 3,679명, 활성화 기간 8,000명 이상을 옮겼다. 보고서에는 CC BY-SA 4.0 조건이 표시되어 출처와 편집 사실을 기록했다. 직접 PDF URL 접속은 현재 제한될 수 있으나 HOT 공식 검색 색인의 PDF 내용에서 수치와 라이선스 문구를 확인했다. 2,000은 반올림 수치이고 8,000은 하한이다.
- **대피 장소:** 대전광역시 서구·공공데이터포털 데이터 식별자 15124341, 기준일 2026-01-21을 사용했다. 이용허락범위 제한 없음. 시설명·유형·좌표만 남기고 관리자 연락처와 수용가능면적은 제외했다. 수용 인원은 원자료에 없다.
- **버스 정류장:** 대전광역시 시내버스 기반정보, 데이터 식별자 15081730, 2025-04-24 자료를 사용했다. 공공데이터포털 표시는 이용허락범위 제한 없음이다. 서구에 속한 493개 국토부 코드의 정류장명·행정동·안내 단말기 설치 여부와 엑스·와이 값을 가공했다. 원자료는 좌표 기준계를 별도로 명시하지 않는다. 값의 범위에 따라 엑스·와이를 경도·위도로 읽어 지도에 표시했다. 실시간 도착·운행량·도보 접근 시간은 추정하지 않았다.

## 원사이트 대조

Natural Earth는 원본 ZIP 속성·좌표를, USGS와 국내 공공데이터는 가공 스크립트가 받은 원자료를 산출물의 값과 대조했다. 기존 자료의 대조 예시는 다음과 같다.

| 산출 파일 | 항목·값 | 확인 URL |
| --- | --- | --- |
| populated-places-top32.geojson | 도쿄도 POP_MAX 35,676,000, [139.7494616, 35.6869628] | https://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip |
| populated-places-top32.geojson | 뉴욕 POP_MAX 19,040,000, [-73.9957175, 40.7215617] | 같은 Natural Earth ZIP |
| populated-places-top32.geojson | 멕시코시티 POP_MAX 19,028,000, [-99.1329341, 19.4443883] | 같은 Natural Earth ZIP |
| populated-places-top10.json | 도쿄도 35,676,000명; 뉴욕 19,040,000명; 멕시코시티 19,028,000명 | 같은 Natural Earth ZIP |
| nepal-earthquakes-apr-may-2015.geojson | us20002926, 2015-04-25, M7.8, [84.7314, 28.2305] | https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-04-01T00%3A00%3A00&endtime=2015-05-31T23%3A59%3A59&eventtype=earthquake&minmagnitude=4.5&minlatitude=24&maxlatitude=34&minlongitude=79&maxlongitude=90&orderby=time-asc&limit=2000 |
| nepal-earthquakes-apr-may-2015.geojson | us20002ejl, 2015-05-12, M7.3, [86.0655, 27.8087] | 같은 USGS 조회 URL |
| nepal-earthquakes-apr-may-2015.geojson | us200029bt, 2015-04-26, M6.7, [86.0173, 27.7711] | 같은 USGS 조회 URL |
| nepal-osm-participation-2015.json | 첫 48시간 약 2,000명; 5일 뒤 3,679명; 활성화 기간 8,000명 이상 | HOT 2015 Annual Report, pp. 5–6 |
| daejeon-seogu-earthquake-shelters.geojson | 삼천초등학교 학교운동장 [127.4010118, 36.35436477]; 문정초등학교 학교운동장 [127.3962181, 36.3503752]; 문정중학교 학교운동장 [127.4015493, 36.35547599] | https://www.data.go.kr/data/15124341/fileData.do |
| daejeon-seogu-shelters-by-type.json | 학교운동장 72곳; 옥외 주차장 5곳; 공원 2곳 | 같은 대전광역시 서구 자료 |
| world-major-airports.geojson | KMG 공항 [102.9285227592646, 25.101205531845622], 주요 공항 | https://naciscdn.org/naturalearth/10m/cultural/ne_10m_airports.zip |
| world-major-airports.geojson | CPH 공항 [12.64935086845077, 55.628501722152784], 주요 공항 | 같은 Natural Earth ZIP |
| world-major-airports.geojson | BBU 공항 [26.085725158776373, 44.49704145597203], 중간 규모 공항 | 같은 Natural Earth ZIP |
| daejeon-seogu-bus-stops.geojson | 안복수길, 국토부 코드 185003334, [127.37679, 36.29668], 안내 단말기 미설치 | https://www.data.go.kr/data/15081730/fileData.do |
| daejeon-seogu-bus-stops.geojson | 대전과학기술대학교, 국토부 코드 185003325, [127.37279, 36.304924], 안내 단말기 미설치 | 같은 대전광역시 자료 |
| daejeon-seogu-bus-stops.geojson | 계룡아파트, 국토부 코드 185003326, [127.37292, 36.305378], 안내 단말기 설치 | 같은 대전광역시 자료 |

## 소절별 자료 단계 연결

| 절 | 자료 연결 |
| --- | --- |
| 1. 지리정보기술은 무엇일까? | 도시 위치 지도와 POP_MAX 그래프에서 공간·속성 정보를 구분하고, 공항 지도로 위치·분류 속성을 확인한다. 개념도는 원격 탐사·GNSS·GIS의 역할을 정리한다. |
| 2. 세계시민의 일상생활에서 활용되는 지리정보기술에는 무엇이 있을까? | 대전 서구 정류장 지도는 위치 기반 서비스의 위치 자료, 네팔 지진 진앙과 HOT 참여 그래프는 커뮤니티 매핑·재난 대응 자료로 연결한다. |
| 3. 지리적 문제를 어떻게 탐색하고 해결할 수 있을까? | 대전 서구 대피 장소 지도·유형 그래프·버스 정류장 지도를 비교하고, 개념도로 공간 의사 결정 절차를 정리한다. |

세 절은 각각 실제 자료 3개를 사용한다. 총 단계 수는 1절 4개(개념도 1개), 2절 3개, 3절 4개(개념도 1개)다. 국가별 지표 자료가 아니므로 유효 국가 수는 해당되지 않는다.

## 생성 스크립트

- python3 scripts/data/01-03/natural_earth_places.py
- python3 scripts/data/01-03/natural_earth_airports.py
- python3 scripts/data/01-03/nepal_earthquakes.py
- python3 scripts/data/01-03/nepal_osm_participation.py
- python3 scripts/data/01-03/daejeon_seogu_shelters.py
- python3 scripts/data/01-03/daejeon_seogu_bus_stops.py
