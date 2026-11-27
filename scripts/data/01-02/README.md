# 01-02 지역 변화의 역동성 — 실제 자료

받은 날짜: 2026-11-27

## 구성과 절별 활용

| 절 | 추천 파일 | 활용 위치와 질문 |
| --- | --- | --- |
| 1. 지역 통합의 움직임은 왜 일어날까? | `eu-accession-year-map.json` | 가입 연도 단계 구분도로 확대 과정의 시기와 공간 분포를 살펴본다. 영국은 지도에서 현재 회원국 값이 없으므로 별도 주석에 “1973년 가입, 2020년 탈퇴”라고 표시한다. |
| 1. 지역 통합의 움직임은 왜 일어날까? | `eu-membership-count-series.json` | 시계열의 가입·탈퇴 시점을 단계 구분도와 맞춰 보고 회원국 수가 변한 때를 찾는다. |
| 2. 지역 분리의 움직임은 왜 일어날까? | `scotland-referendum-council-points.geojson` | 32개 지방 의회 구역의 투표 결과와 투표율을 점 지도로 비교한다. 구역별 `category`는 찬성·반대 득표수 비교만 나타낸다. |
| 2. 지역 분리의 움직임은 왜 일어날까? | `scotland-referendum-national-result.json` | 전국 찬성·반대 득표 비율 막대그래프로 전체 결과를 살펴본다. 두 절 자료 모두 정치적 입장을 지지하거나 유권자의 동기를 추정하지 않는다. |
| 3. 지역의 역동성을 이해하는 것은 왜 중요할까? | `urbanization-rate-series.json` | 1960–2025년 세계·대한민국·일본·독일·방글라데시 도시화율을 비교한다. 최신 연도 값은 추정·갱신될 수 있음을 함께 안내한다. |
| 3. 지역의 역동성을 이해하는 것은 왜 중요할까? | `largest-city-urban-share-series.json` | 각 국가 도시 인구 중 가장 큰 도시권 인구가 차지하는 비중을 비교해 도시 인구 집중 양상을 살펴본다. 수도권 인구 비중과 같은 개념으로 읽지 않는다. |

## 출처와 이용 조건

### EU 가입 연도와 회원국 수

- [EU 회원국별 가입 연도](https://european-union.europa.eu/principles-countries-history/eu-countries_en), [EU 확대 연혁](https://european-union.europa.eu/principles-countries-history/eu-enlargement_en), [EU 역사](https://european-union.europa.eu/principles-countries-history/history-eu_en), [EU 현황과 수치](https://european-union.europa.eu/principles-countries-history/facts-and-figures-european-union_en)에서 창립 회원국과 각 가입 시기를 확인했다. EU 공식 사이트의 저작권 안내는 별도 표시가 없는 EU 소유 콘텐츠의 재사용을 CC BY 4.0으로 허용하며, 출처 표시와 변경 사항 표시를 요구한다([EU 법적 고지](https://european-union.europa.eu/legal-notice_en)).
- 단계 구분도는 2026년 현재 EU 회원국 27개만 담았다. 1958년은 EU가 출범한 해가 아니라 유럽경제공동체(EEC) 창립 회원국의 참여 시작 시점이다. 독일은 서독의 EEC 참여 연도를 나타내며, 현재 독일의 국경 전체가 1958년부터 같은 회원 상태였다는 뜻은 아니다. 지도는 현행 국가 경계 자료에 가입 연도를 결합해 읽는다.
- 회원국 수는 같은 공식 연혁의 가입 시점으로 매년 12월 31일 기준 수를 구성했다. 1958년 6개에서 출발해 1973년 +3, 1981년 +1, 1986년 +2, 1995년 +3, 2004년 +10, 2007년 +2, 2013년 +1, 2020년 -1을 반영했다. 회원국 수의 연도별 연속 값은 이 사건 변화를 누적한 파생 집계다.
- 영국은 1973년에 가입하고 2020년에 탈퇴했다. 단계 구분도 형식에는 탈퇴 상태를 표현하는 별도 속성이 없으므로 `GBR` 값은 넣지 않았다. 지도에서 회색 결측처럼 보일 수 있어 수업 화면에 별도 주석을 두는 것을 권한다. 이 값은 0년 또는 미가입 연도를 뜻하지 않는다.

### 스코틀랜드 독립 주민투표

- 구역별 득표수·득표율·투표율은 House of Commons Library 브리핑 [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf)의 재사용 조건이 명시된 수치를 사용했다. 브리핑은 Open Parliament Licence 조건을 표시한다. OPL은 복제·수정·배포를 허용하고, 다음 출처 문구를 요구한다: “Contains Parliamentary information licensed under the Open Parliament Licence v3.0.” ([Open Parliament Licence](https://www.parliament.uk/site-information/copyright/open-parliament-licence/)).
- 사용자가 지정한 [Electoral Management Board의 결과 페이지](https://www.emb.scot/emb/scottish-independence-referendum-2014-3/scottish-independence-referendum-18-september-2014)는 저작권 표시가 “All rights reserved”여서 산출 수치의 재배포 원자료로 삼지 않았다. 페이지 표에서 Aberdeen City 행은 총 투표 180,045표와 찬성 71,337표·반대 108,606표로 표시되는데, 180,045표는 [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf)의 Aberdeen City 선거인 수 175,751명을 초과하며 이 수치 조합은 공식 보고서의 Aberdeenshire 행과 일치한다. [Electoral Commission 보고서 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf)과 OPL 표 33은 Aberdeen City 59,390표·84,094표·투표율 81.7%로 일치해 이 두 출처를 사용했다. 공식 보고서는 표본 수치를 대조하는 데만 사용했으며, 보고서 문구·표를 복제하지 않았다. 이처럼 권리 조건과 표의 품질 문제를 고려해 OPL 자료를 변환했다.
- 좌표는 [GeoNames 영국 자료 내려받기](https://download.geonames.org/export/dump/GB.zip)에서 구역별 대표 정착지의 GeoNames ID를 찾아 추출했다. GeoNames는 CC BY 조건으로 데이터 재사용을 허용하며 출처 링크 또는 참조를 요구한다([GeoNames 이용 조건](https://www.geonames.org/export/)). 각 구역에서 중심 도시 또는 대표 정착지를 골랐으며 행정구역의 경계·면적 중심점이 아니다. GeoJSON 좌표 순서는 WGS84 `[경도, 위도]`이고, 32개 이름과 GeoNames ID 연결은 `scotland_referendum.py`의 `COUNCIL_CENTERS`에 기록했다.
- `yes_share`와 `turnout`은 하원도서관 표의 소수 첫째 자리 값을 그대로 사용했다. `category`는 원자료의 찬성·반대 득표수 중 큰 쪽을 “찬성 우세” 또는 “반대 우세”로 표시한다. 색은 구역 비교를 위한 시각 부호다. 이는 해당 구역 주민의 단일한 견해, 개별 유권자의 선택 이유 또는 특정 정치적 입장에 대한 지지 지표가 아니다.
- 전국 막대그래프 비율은 유효 찬성·반대 투표만을 분모로 산출하고 소수 첫째 자리로 반올림했다. 찬성 1,617,989표, 반대 2,001,926표, 무효 3,429표, 총 투표 3,623,344표다. 따라서 분모는 3,619,915표이고 무효표는 두 막대의 비율 계산에서 제외된다. 표시 막대는 찬성 44.7%, 반대 55.3%다.

### 도시화와 대도시 인구 집중

- 두 시계열은 World Bank WDI API의 [도시 인구 비율 `SP.URB.TOTL.IN.ZS`](https://api.worldbank.org/v2/country/all/indicator/SP.URB.TOTL.IN.ZS?format=json&per_page=20000&date=1960%3A2025)와 [가장 큰 도시 인구의 도시 인구 대비 비율 `EN.URB.LCTY.UR.ZS`](https://api.worldbank.org/v2/country/all/indicator/EN.URB.LCTY.UR.ZS?format=json&per_page=20000&date=1960%3A2025)를 사용했다. WDI 공개 라이선스 기본 조건은 CC BY 4.0이며 출처 표시 및 변경 사항 표시가 필요하다([World Bank Data Catalog 이용 조건](https://datacatalog.worldbank.org/public-licenses)).
- `SP.URB.TOTL.IN.ZS`는 각국 통계기관의 도시 정의에 따른 도시 거주 인구의 총인구 대비 비율이며, World Bank 인구 추계와 UN 인구부의 World Urbanization Prospects 도시 비율을 사용한다. 따라서 국가별 도시 정의가 달라 국가 간 수치를 완전히 같은 기준의 도시 경계로 해석할 수 없다([WDI 지표 설명](https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SP.URB.TOTL.IN.ZS)).
- `EN.URB.LCTY.UR.ZS`는 UN World Urbanization Prospects 2018 계열의 가장 큰 도시 인구 비율이다. 도시권 경계 정의에 따른 차이가 있고, 서울 수도권 인구 비중과 일치한다고 볼 수 없다. 비교국은 대한민국·일본·독일·방글라데시로 골랐다.
- 두 API 응답의 자료 갱신 표시는 2026-11-11이고, 본 자료 수신일은 2026-11-27이다. 시계열은 1960–2025년 API 값만 그대로 담았다. 빠진 연도는 `null`이며 보간하지 않았다. 2025년은 최신 연도 값으로 추정치·잠정치일 수 있고 이후 갱신될 수 있으므로, 최신 실측이 완료된 값이나 정밀한 단기 변화로 해석하지 않는다. 최신 연도 자료의 제공 범위도 국가별로 달라질 수 있다.

## 산출 파일

모든 파일은 각 1 MB 이하이며 원자료 파일은 저장소에 두지 않았다.

| 파일 | 형식·단위 | 크기 |
| --- | --- | ---: |
| `eu-accession-year-map.json` | 국가 단계 구분도 JSON, EEC/EU 가입 연도 | 544 B |
| `eu-membership-count-series.json` | 선그래프용 JSON, 회원국 수 | 1,646 B |
| `scotland-referendum-council-points.geojson` | 점 지도 GeoJSON, 찬성 비율·투표율·WGS84 점 | 11,092 B |
| `scotland-referendum-national-result.json` | 막대그래프 JSON, 유효 찬성·반대표 비율 | 186 B |
| `urbanization-rate-series.json` | 선그래프 JSON, 총인구 중 도시 인구 비율(%) | 9,703 B |
| `largest-city-urban-share-series.json` | 선그래프 JSON, 도시 인구 중 최대 도시 인구 비율(%) | 7,908 B |

EU 두 파일은 `eu_integration.py`, 스코틀랜드 두 파일은 `scotland_referendum.py`, World Bank 두 파일은 `world_bank.py`에서 생성한다. 모든 스크립트는 Python 표준 라이브러리만 사용하고, 출처 URL과 받은 날짜를 파일 상단 상수로 기록한다.

## 원 사이트 대조 기록

아래 대조는 출력 파일 값과 원자료 페이지/API를 직접 비교한 것이다. 좌표는 GeoNames 원자료의 경도·위도 순서로 산출되며 웹 기록의 위도·경도 표시와 순서만 다르다.

| 출력 파일 | 확인 항목 | 출력값 | 원 사이트 확인 |
| --- | --- | --- | --- |
| `eu-accession-year-map.json` | FRA 프랑스 가입 연도 | 1958 | [EU 회원국별 가입 연도](https://european-union.europa.eu/principles-countries-history/eu-countries_en) — 회원국별 연도 |
| 〃 | IRL 아일랜드 가입 연도 | 1973 | [EU 확대 연혁](https://european-union.europa.eu/principles-countries-history/eu-enlargement_en) — 1973년 덴마크·아일랜드·영국 가입 |
| 〃 | HRV 크로아티아 가입 연도 | 2013 | [EU 회원국별 가입 연도](https://european-union.europa.eu/principles-countries-history/eu-countries_en) — 2013년 가입 |
| `eu-membership-count-series.json` | 1973년 말 회원국 수 | 9 | [EU 확대 연혁](https://european-union.europa.eu/principles-countries-history/eu-enlargement_en) — 1973년 +3 |
| 〃 | 2004년 말 회원국 수 | 25 | [EU 확대 연혁](https://european-union.europa.eu/principles-countries-history/eu-enlargement_en) — 2004년 +10 |
| 〃 | 2020년 말 회원국 수 | 27 | [EU 회원국별 가입 연도](https://european-union.europa.eu/principles-countries-history/eu-countries_en) — 영국의 2020년 탈퇴와 현 EU 27개국 |
| `scotland-referendum-council-points.geojson` | Aberdeen City 득표 비율·투표율·좌표 | 41.4%, 81.7%; `[-2.09814, 57.14369]` | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf), [GeoNames 2657832](https://www.geonames.org/2657832/aberdeen.html) |
| 〃 | East Renfrewshire 득표 비율·투표율·좌표 | 36.8%, 90.4%; `[-4.29488, 55.80373]` | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf), [GeoNames 2648683](https://www.geonames.org/2648683/giffnock.html) |
| 〃 | Glasgow City 득표 비율·투표율·좌표 | 53.5%, 75.0%; `[-4.25763, 55.86515]` | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf), [GeoNames 2648579](https://www.geonames.org/2648579/glasgow.html) |
| `scotland-referendum-national-result.json` | 찬성 비율 | 44.7% | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 보고서](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf) |
| 〃 | 반대 비율 | 55.3% | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 보고서](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf) |
| 〃 | 득표수 합산 확인 | 찬성 1,617,989 + 반대 2,001,926 = 유효 3,619,915; 무효 3,429 포함 총 3,623,344 | [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf), [Electoral Commission 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf). 막대는 두 값뿐이므로 두 비율과 총계 일치 여부를 확인했다. |
| `urbanization-rate-series.json` | 2025 도시화율: WLD / KOR / JPN / DEU / BGD | 57.8251158115221 / 81.1740263306674 / 92.3001449420786 / 82.13822205362 / 33.2395847043975% | [World Bank API `SP.URB.TOTL.IN.ZS`](https://api.worldbank.org/v2/country/all/indicator/SP.URB.TOTL.IN.ZS?format=json&per_page=20000&date=2025) |
| `largest-city-urban-share-series.json` | 2025 최대 도시 인구 비중: KOR / JPN / DEU / BGD | 23.8968021550614 / 32.5256525394556 / 5.220589911139 / 42.2155459961057% | [World Bank API `EN.URB.LCTY.UR.ZS`](https://api.worldbank.org/v2/country/all/indicator/EN.URB.LCTY.UR.ZS?format=json&per_page=20000&date=2025) |

국가 지도와 시계열의 빈 값은 원 API 값이 없으면 `null`로 유지한다. 지도에는 현재 회원국 27개만 두고 탈퇴국을 `below`로 합치지 않았다. 스코틀랜드 자료에는 경계 폴리곤을 추가하지 않았고, 대표 정착지 점이 행정구역 전체를 나타내지 않는다는 점을 수업에서 설명한다.
