# 01-03 지리 정보와 지리정보기술 — 실제 자료

수집일은 2026-11-27이다. 원자료는 임시 폴더에서만 처리했고 저장소에는 가공된 GeoJSON·JSON만 두었다. 자료 6개는 모두 1MB 이하이다.

## 산출물

| 파일 | 화면 자료 | 내용 | 크기 |
| --- | --- | --- | ---: |
| `populated-places-top32.geojson` | 점 지도 | Natural Earth POP_MAX 상위 32개 도시 | 7,120 bytes |
| `populated-places-top10.json` | 막대그래프·값 표 | POP_MAX 상위 10개 도시 | 483 bytes |
| `nepal-earthquakes-apr-may-2015.geojson` | 점 지도 | 네팔·주변 지역, 2015년 4–5월 규모 4.5 이상 지진 106건 | 20,148 bytes |
| `nepal-osm-participation-2015.json` | 막대그래프·값 표 | HOT 보고서의 네팔 매핑 참여 규모 | 212 bytes |
| `daejeon-seogu-earthquake-shelters.geojson` | 점 지도 | 대전광역시 서구 지진 옥외 대피장소 79곳 | 14,391 bytes |
| `daejeon-seogu-shelters-by-type.json` | 막대그래프·값 표 | 대피장소 유형별 시설 수 | 141 bytes |

막대그래프 JSON은 프로젝트의 값 표에서도 읽을 수 있도록 공통 막대 자료 형식(`year`, `unit`, `rows`)을 따른다.

## 출처와 이용 조건

- **세계 도시:** [Natural Earth Populated Places](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/) 1:10m, v5.1.2에서 `POP_MAX`, `NAME_KO`, `ADM0_A3`와 Point geometry를 읽었다. [Natural Earth 이용 조건](https://www.naturalearthdata.com/about/terms-of-use/)은 웹사이트의 벡터·래스터 자료를 공개 도메인으로 두며 수정·전자 배포를 허용한다. `POP_MAX` 내림차순으로 상위 32곳을 골랐고, 도시 이름은 원자료 `NAME_KO`, 국가는 `ADM0_A3`에 대응하는 한국어 표시명이다. 좌표는 DBF의 보조 위·경도 열이 아니라 지도용 SHP Point geometry를 사용했다.
- **지진:** [USGS FDSN Earthquake Catalog API](https://earthquake.usgs.gov/fdsnws/event/1/)에서 2015-04-01 00:00:00–2015-05-31 23:59:59 UTC, 북위 24–34도·동경 79–90도, 규모 4.5 이상을 조회했다. USGS는 자체 제작 데이터·정보를 미국 공개 도메인 자료로 설명하고 출처 표기를 요청한다([저작권 안내](https://www.usgs.gov/faqs/are-usgs-reportspublications-copyrighted)). 지도는 진앙 위치를 보여 주며 흔들림 세기나 피해 범위를 나타내지 않는다.
- **디지털 매핑 참여 수:** [HOT 2015 연차보고서](https://www.hotosm.org/downloads/2015-Annual-Report.pdf)에서 첫 48시간 약 2,000명, 발생 5일 뒤 3,679명, 활성화 기간 전체 8,000명 이상을 옮겼다. 보고서 마지막 면의 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 조건에 따라 출처와 편집 사실을 표시하고 파생 표도 같은 조건으로 배포한다. `2,000`은 보고서의 반올림 값이고 `8,000`은 하한이므로 각각 표 이름에서 그 상태를 보존했다.
- **기존 GFDRR 사례:** [PreventionWeb의 「Mapping Local Communities to Inform Response and Recovery in Nepal」](https://www.preventionweb.net/publication/mapping-local-communities-inform-response-and-recovery-nepal)은 Open Cities Kathmandu에서 학생·자원봉사자·공무원이 OSM으로 지역을 디지털 매핑한 맥락을 소개한다. 기존 출처 ID `gfdrr-nepal-osm`을 읽기 링크로 유지한다. 연결 PDF의 개별 지도·이미지 재사용 조건은 이 작업에서 확인하지 않아 복제하거나 산출 파일에 넣지 않았다.
- **대피장소:** [공공데이터포털 대전광역시 서구 지진 옥외 대피장소](https://www.data.go.kr/data/15124341/fileData.do), 데이터 식별자 `15124341`, 기준일 `2026-01-21`을 썼다. 포털은 이용 허락을 **이용허락범위 제한 없음**으로 표시한다. 파일에는 시설명·유형·좌표·수용가능면적·연락처가 있지만 산출물에는 시설명·유형·좌표만 남겼다. 수용 인원 열은 없으므로 `capacity`를 만들지 않았고, 관리자 연락처와 면적도 넣지 않았다. 이 실제 공개 자료의 조건이 맞아 INFORM Risk 대안은 쓰지 않았다.

## 원자료 대조

각 산출 파일에서 값 세 개를 원 사이트 자료와 다시 대조했다. GeoJSON 좌표는 `[경도, 위도]` 순서다.

| 산출 파일 | 확인한 값 세 개 | 원 사이트 확인 |
| --- | --- | --- |
| `populated-places-top32.geojson` | 도쿄도 `POP_MAX=35,676,000`, `[139.7494616, 35.6869628]`; 뉴욕 `19,040,000`, `[-73.9957175, 40.7215617]`; 멕시코시티 `19,028,000`, `[-99.1329341, 19.4443883]` | [Natural Earth 10m ZIP](https://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip) |
| `populated-places-top10.json` | 도쿄도 35,676,000명; 뉴욕 19,040,000명; 멕시코시티 19,028,000명 | [Natural Earth 10m ZIP](https://naciscdn.org/naturalearth/10m/cultural/ne_10m_populated_places.zip) |
| `nepal-earthquakes-apr-may-2015.geojson` | `us20002926` 2015-04-25, M7.8, `[84.7314, 28.2305]`; `us20002ejl` 2015-05-12, M7.3, `[86.0655, 27.8087]`; `us200029bt` 2015-04-26, M6.7, `[86.0173, 27.7711]` | [같은 조건의 USGS API 응답](https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-04-01T00%3A00%3A00&endtime=2015-05-31T23%3A59%3A59&eventtype=earthquake&minmagnitude=4.5&minlatitude=24&maxlatitude=34&minlongitude=79&maxlongitude=90&orderby=time-asc&limit=2000) |
| `nepal-osm-participation-2015.json` | 첫 48시간 약 2,000명; 5일 뒤 3,679명; 전체 활성화 8,000명 이상 | [HOT 2015 연차보고서](https://www.hotosm.org/downloads/2015-Annual-Report.pdf), 5–6쪽 |
| `daejeon-seogu-earthquake-shelters.geojson` | 삼천초등학교 `학교운동장` `[127.4010118, 36.35436477]`; 문정초등학교 `[127.3962181, 36.3503752]`; 문정중학교 `[127.4015493, 36.35547599]` | [대전광역시 서구 원자료 페이지](https://www.data.go.kr/data/15124341/fileData.do) |
| `daejeon-seogu-shelters-by-type.json` | 학교운동장 72곳; 주차장(옥외) 5곳; 공원 2곳 | [대전광역시 서구 원자료 페이지](https://www.data.go.kr/data/15124341/fileData.do) |

## 가공·경계·결측 처리

- Natural Earth는 `POP_MAX`가 500만 명 이상이고 한국어 도시명·국가 표시명이 있는 도시 중 상위 32개를 사용했다. 범주 경계는 `1,000만 명 이상`, `800만~1,000만 명 미만`, `500만~800만 명 미만`이며 실제 `POP_MAX` 값은 반올림하지 않았다. `POP_MAX`는 도시별 도시권·행정 경계와 기준 시점이 일치하는 최신 인구총조사가 아니며, 단일 시점의 정밀한 순위처럼 해석하지 않는다.
- USGS 자료는 지시한 기간·범위·최소 규모 필터로 잘랐다. 데이터 API의 최대 2,000건보다 적은 106건을 받았다. 시간은 UTC 날짜로 바꿨고, magnitude가 4.5 미만인 자료는 값 0이나 결측으로 바꾸지 않고 포함하지 않았다.
- 대전 서구 파일의 79개 행에는 위·경도가 모두 있었다. 시설 유형 집계는 점 지도에 남긴 79개 행에서 계산했다. 좌표가 없는 행이 있으면 추정·지오코딩하지 않고 지도에서 제외한다. 이 파일에는 수용 인원 열이 없고 면적만 있어 수용 인원으로 환산하지 않았다.
- 대피장소 점 지도는 시설 목록 자료다. 인구 분포, 도로망, 대피소 수용 인원은 포함하지 않으므로 가까운 시설이나 실제 대피 경로를 결정하는 자료로 단독 사용하지 않는다.
- 경계 자료는 추가하지 않았다. 도시는 점 위치, USGS는 명시한 위·경도 범위, 대피장소는 대전광역시 서구 파일의 공간 범위를 썼다. 세 데이터 모두 제공 원자료에 좌표가 있는 관측만 사용했다.

## 절별 자료 단계 추천

| 절 | 자료 단계 | 파일과 사용 초점 |
| --- | --- | --- |
| 1. 지리정보기술은 무엇일까? | 1단계 | `populated-places-top32.geojson`에서 도시 위치와 이름·국가·POP_MAX가 함께 기록되는 공간 정보와 속성 정보를 구분한다. |
|  | 2단계 | `populated-places-top10.json`에서 인구 규모 구간과 상위 도시 값을 함께 읽고, 도시별 인구 정의·기준 시점이 다를 수 있다는 한계를 확인한다. |
| 2. 세계시민의 일상생활에서 활용되는 지리정보기술에는 무엇이 있을까? | 1단계 | `nepal-earthquakes-apr-may-2015.geojson`에서 진앙의 위치·날짜·규모를 함께 읽으며 공개 지진 자료가 지도에 놓이는 방식을 살핀다. |
|  | 2단계 | `nepal-osm-participation-2015.json`과 GFDRR 사례 링크를 사용해 자원봉사자·지역 공동체의 디지털 지도 제작 참여가 재난 대응과 연결된 사례를 조사한다. |
| 3. 지리적 문제를 어떻게 탐색하고 해결할 수 있을까? | 1단계 | `daejeon-seogu-earthquake-shelters.geojson`에서 대피 시설의 위치와 유형을 읽고, 의사결정에 더 필요한 인구·접근성 자료를 찾는다. |
|  | 2단계 | `daejeon-seogu-shelters-by-type.json`에서 학교 운동장·옥외 주차장·공원의 수를 비교해 자료만으로 알 수 있는 점과 알 수 없는 점을 구분한다. |

## 생성 스크립트

- `python3 scripts/data/01-03/natural_earth_places.py`
- `python3 scripts/data/01-03/nepal_earthquakes.py`
- `python3 scripts/data/01-03/nepal_osm_participation.py`
- `python3 scripts/data/01-03/daejeon_seogu_shelters.py`
