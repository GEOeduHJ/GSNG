# 01-02 지역 변화의 역동성 — 자료·출처 기록

기준일: 2026-11-27

## 소절별 자료 구성

| 소절 | 자료 | 내용 |
| --- | --- | --- |
| 1. 지역 통합의 움직임은 왜 일어날까? | `rcep-membership-map.json` | 2026년 RCEP 참여 여부를 1/0으로 나타낸 세계 지도. 대한민국·뉴질랜드는 1, 인도는 0. |
| 1. 지역 통합의 움직임은 왜 일어날까? | `eu-accession-year-map.json`, `eu-membership-count-series.json` | 현 EU 회원국의 EEC·EU 가입 연도와 연말 회원국 수 변화. 1958년은 EEC 창립 회원국의 시작점. |
| 2. 지역 분리의 움직임은 왜 일어날까? | `scotland-referendum-council-points.geojson`, `scotland-referendum-national-result.json` | 스코틀랜드 2014년 주민투표의 구역별 우세 범주·투표율과 전국 유효 투표 비율. |
| 2. 지역 분리의 움직임은 왜 일어날까? | `scotland-governance-preference-2025.json` | 스코틀랜드 운영에서 가장 큰 영향력을 가져야 할 주체에 관한 2025년 설문 응답. 독립 찬반 투표가 아니다. |
| 2. 지역 분리의 움직임은 왜 일어날까? | `regional-separation-drivers-schematic.svg` | 정체성·역사·권한·경제 관계가 서로 영향을 미치는 개념도. 통계 자료가 아니다. |
| 3. 지역의 역동성을 이해하는 것은 왜 중요할까? | `eu-membership-count-series.json`, `euro-area-accession-year-map.json` | EU 회원국 수 변화와 현 유로 지역 회원국의 통화 도입 연도. |
| 3. 지역의 역동성을 이해하는 것은 왜 중요할까? | `intra-eu-exports-series.json` | 2020년 기준 27개국 EU27_2020 집계의 역내 총 재화 수출 명목액, 2002–2025년. 단위는 백만 유로. |
| 3. 지역의 역동성을 이해하는 것은 왜 중요할까? | `regional-dynamics-cycle-schematic.svg` | 환경·관계·제도 변화와 지역성의 상호작용 개념도. 통계 자료가 아니다. |

## 새 자료의 기준·값·이용 조건

| 산출 파일 | 기준 연도·관측 범위 | 유효 범위 | 원자료 대조값 | 이용 조건 |
| --- | --- | --- | --- | --- |
| `rcep-membership-map.json` | 2026년 회원 현황 | 공식 회원 15개국. 기본 세계 바탕은 177개 지형 중 174개 유효 ISO3 코드를 그린다. 출력은 싱가포르를 포함해 ISO3 값 175개이며 싱가포르 지형은 바탕 지도에 없다. | `KOR=1`, `NZL=1`, `IND=0` | New Zealand MFAT 웹사이트 콘텐츠 CC BY 4.0. 출처·변경 표시. |
| `scotland-governance-preference-2025.json` | 2025년 설문, 기준 표본 n=1,549 | 스코틀랜드 조사 표에 나온 4개 응답 범주 | 스코틀랜드 정부 67%, 영국 정부 16%, 지방 의회 13%, EU 1% | Scottish Government, Open Government Licence v3.0, © Crown copyright 2026. |
| `euro-area-accession-year-map.json` | 2026년 현재 회원·도입 연도 | 유로 지역 21개국 | 오스트리아 1999, 크로아티아 2023, 불가리아 2026 | Council of the EU 공식 사이트의 통계·자료 재사용 조건: 출처와 가공 사실 표시. |
| `intra-eu-exports-series.json` | 2002–2025년 연간, 24개 관측값 | 2020년 기준 27개국 EU27_2020 고정 집계의 역내 총 재화 수출 | 2002년 1,499,867.3; 2020년 2,856,338.4; 2025년 4,150,750.3 백만 유로 | Eurostat 통계 재사용은 출처 표시 조건으로 허가. 가공·필터 조건을 표시. |

### 자료와 출처 확인

- RCEP 참여국: [New Zealand MFAT 공식 개요](https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/regional-comprehensive-economic-partnership-rcep/rcep-overview). 15개 당사국 목록, 인도의 협상 이탈 기록, 싱가포르 참여 여부를 대조했다. 싱가포르는 110m 바탕 지형에서 별도 도형이 없어 값은 데이터에 포함하고 지도 한계를 표시했다. MFAT의 [저작권 안내](https://www.mfat.govt.nz/en/copyright)는 웹사이트 콘텐츠에 CC BY 4.0 조건을 제시한다.
- 스코틀랜드 설문: [Scottish Government, Scottish Social Attitudes Survey 2025, 표 4](https://www.gov.scot/publications/scottish-social-attitudes-survey-2025-core-module/pages/5/). 원문 질문은 스코틀랜드 운영에 누가 가장 큰 영향력을 가져야 하는지이며, 네 공개 범주의 비율은 67·16·13·1%다. 기준 표본은 1,549명이다. 해당 응답을 2014년 독립 주민투표와 같은 질문으로 해석하지 않는다. 정부 간행물은 OGL v3.0 조건을 표시한다.
- 유로 도입 연도: [Council of the EU, The euro](https://www.consilium.europa.eu/en/topics/the-euro/). 현 유로 지역 회원국 21개와 회원별 도입 연도를 확인했다. 2026년 불가리아의 도입을 반영했다. Council의 [법적 고지](https://www.consilium.europa.eu/en/legal-notice/)에서 재사용 시 출처 표시·비왜곡 조건을 확인한다.
- 역내 수출: [Eurostat API ext_lt_intratrd](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/ext_lt_intratrd?format=JSON&lang=en&freq=A&indic_et=MIO_EXP_VAL&sitc06=TOTAL&partner=EU27_2020&geo=EU27_2020). 연간(`freq=A`), 총 재화(`sitc06=TOTAL`), 백만 유로 재화 수출(`indic_et=MIO_EXP_VAL`), EU27_2020 지역·상대국 필터다. Eurostat 코드 목록은 EU27_2020을 2020년부터의 27개 회원국 조합으로 정의한다([Eurostat 국가 코드 안내](https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/4904.pdf)). 따라서 과거 연도도 당시 구성원이 아니라 같은 고정 27개국 집계다. [Eurostat 재사용 안내](https://ec.europa.eu/eurostat/help/copyright-notice)는 통계 자료를 출처 표시 조건으로 재사용하도록 허용하고 변경 사실의 표시를 요구한다.
- Scotland 2014: [House of Commons Library CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf)와 [Electoral Commission 보고서 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf)을 대조했다. 저작권·좌표 이용 근거와 대표 정착지 좌표 선택은 기존 데이터 설명에 기록되어 있다.
- 추가 사례: [Bangsamoro Parliament 공식 안내](https://parliament.bangsamoro.gov.ph/about-us/)는 방사모로 자치가 필리핀 국가 체계 안에서 운영됨을 설명한다. [NATO 회원국 목록](https://www.nato.int/en/about-us/organization/nato-member-countries)은 핀란드 2023년·스웨덴 2024년 가입을 기록한다. [Barbados 정부 대통령 소개](https://www.gov.bb/Government/president)는 2021년 11월 30일 초대 대통령 취임을 기록한다. 이 세 사이트의 텍스트·그림은 복제하지 않고 사실 확인 링크로만 사용했다.

## 본문·도입·정리의 숫자 출처 대조

아래 표는 학생 본문, 도입, 핵심 정리, 전이 질문에서 서술한 수치 주장의 원자료를 기록한다. 데이터 차트의 전체 시계열은 표의 관측 범위와 manifest에 기재했다.

| 위치 | 본문에 쓴 숫자 | 값의 뜻·분모 | 출처 / 산출 자료 |
| --- | --- | --- | --- |
| 절 1 RCEP 지도·협력체 | 시각화 기준 2026년; RCEP 15개국; 인도 2019년 협상 이탈 | 회원 현황의 기준 연도, 협정 당사국 수와 이탈 시점 | MFAT RCEP 공식 개요; `rcep-membership-map.json` |
| 절 1 EU 가입·회원국 변화 | 1958년 6개국, 1973년 9개국, 2013년 28개국, 2020년 영국 탈퇴 후 2026년 27개국 | 연말 기준 EEC·유럽 공동체·EU 회원국 수 | EU 회원국·확대 연혁, `eu-accession-year-map.json`, `eu-membership-count-series.json` |
| 절 1 시계열 표기 | 그래프 범위 1958–2026년 | 회원국 수의 연말 기준 시계열 | EU 가입·탈퇴 연혁; `eu-membership-count-series.json` |
| 절 2 스코틀랜드 주민투표 | 지도·전국 결과 기준 2014년; 찬성 44.7%, 반대 55.3% | 유효 찬성·반대 득표의 비율, 무효표 제외 | House of Commons Library CBP-7529 표 33; `scotland-referendum-national-result.json` |
| 절 2 지방 의회 사례 | 글래스고 시 찬성 53.5%, 투표율 75.0%; 애버딘 시 41.4%, 81.7% | 유효 찬성·반대 득표 중 찬성 몫; 선거인 중 투표율 | House of Commons Library CBP-7529 표 33; `scotland-referendum-council-points.geojson` |
| 절 2 현재 선호 설문 | 2025년; 스코틀랜드 정부 67%, 영국 정부 16%, 지방 의회 13%, EU 1%; n=1,549 | '가장 큰 영향력을 가져야 할 주체' 질문의 공개 응답 범주와 비가중 기준 표본 | Scottish Social Attitudes Survey 2025 표 4; `scotland-governance-preference-2025.json` |
| 절 3 EU 회원 변화 | 1958년 6개국, 2013년 28개국, 2026년 27개국 | EEC·EU 회원국 연말 수 | EU 연혁; `eu-membership-count-series.json` |
| 절 3 유로 지역 | 2026년 21개국; 불가리아 2026년 도입 | 현재 유로 지역 회원국 수와 불가리아 도입 시점 | Council of the EU, The euro; `euro-area-accession-year-map.json` |
| 절 3 EU 역내 수출 | EU27_2020 고정 집계; 2002년 1,499,867.3; 2020년 2,856,338.4; 2025년 4,150,750.3 백만 유로 | 2020년 구성 기준 27개국 간 총 재화 수출의 명목액 | Eurostat `ext_lt_intratrd`; `intra-eu-exports-series.json` |
| 절 3 안보 협력·제도 변화 | 핀란드 2023년, 스웨덴 2024년 NATO 가입; 바베이도스 2021년 공화국 전환 | 회원 가입 및 국가 제도 변화 시점 | NATO 회원국 목록; Government of Barbados; 해당 공식 출처 링크 |
| 중단원 도입·정리 본문 | 서술형 수치 주장 없음. 도입·전이 시각화의 기준 연도는 2026년 | RCEP 회원 현황 지도 | MFAT RCEP 공식 개요; `unit.yaml`, `rcep-membership-map.json` |

## 생성·사용 스크립트

- `eu_integration.py`: EU 가입 연도 지도, 연말 회원국 수 시계열, 유로 도입 연도 지도.
- `rcep_membership.py`: MFAT 참여 목록을 `countries-110m.geojson`의 ISO3 코드에 결합한 RCEP 이진 지도. 원자료를 내려받지 않으며 출처 URL·기준일은 스크립트에 기록했다.
- `scotland_governance.py`: 보고서 표 4의 2025년 응답 범주를 막대 그래프 JSON으로 구성한다.
- `eurostat_trade.py`: Eurostat API에서 지정 필터의 연간 값을 불러와 JSON 시계열로 만든다. 코드에 표본 연도 값 검사가 있어 원 API 값이 바뀌면 확인을 요구한다.
- `scotland_referendum.py`: 2014년 지방 의회 점 자료와 전국 결과를 생성한다.
- `world_bank.py`: 기존 도시화 자료 생성 스크립트. 파일은 보존하지만 이번 새 모듈에서 참조하지 않는다.

## 새 산출 파일

| 파일 | 형식·단위 | 크기 |
| --- | --- | ---: |
| `rcep-membership-map.json` | ISO3 국가 지도, 회원 1·비회원 0 | 2,574 B |
| `scotland-governance-preference-2025.json` | 막대그래프, 응답 비율(%) | 482 B |
| `euro-area-accession-year-map.json` | ISO3 국가 지도, 도입 연도 | 426 B |
| `intra-eu-exports-series.json` | 연간 선그래프, 백만 유로 | 1,080 B |
| `regional-separation-drivers-schematic.svg` | 개념도 | SVG |
| `regional-dynamics-cycle-schematic.svg` | 개념도 | SVG |

## 기존 보존 자료와 미사용 표시

- `urbanization-rate-series.json`과 `largest-city-urban-share-series.json`은 이전 초안이 사용하던 자료다. 새 교과서 범위의 세 소절과 맞지 않아 lesson 본문·unit focus·transfer에서 제거했으나, 기존 파일과 `world_bank.py`는 삭제하거나 덮어쓰지 않았다.
- WDI 두 출처 및 이전 설명 항목도 역사 기록을 위해 `content/sources/01-02.yaml`과 `content/manifests/01-02.yaml`에 남아 있다. 새 모듈은 이를 사용하지 않는다.
- 사용하지 않는 구자료: `oecd-functional-urban-area`, `daejeon-seogu-shelters-transfer`. 옛 시·지역 응용 수업의 맥락으로만 남겨 두었다.

## 보존 자료의 기존 검증 기록

아래 내용은 기존 01-02 데이터 산출물의 원자료 검증과 해석 한계를 보존한다. EU·스코틀랜드 자료는 이번 모듈에서도 사용한다. World Bank 시계열은 파일과 스크립트를 보존하되 이번 본문에는 연결하지 않았다.

### EU 가입 연도와 회원국 수

- [EU 회원국별 가입 연도](https://european-union.europa.eu/principles-countries-history/eu-countries_en), [EU 확대 연혁](https://european-union.europa.eu/principles-countries-history/eu-enlargement_en), [EU 역사](https://european-union.europa.eu/principles-countries-history/history-eu_en), [EU 현황과 수치](https://european-union.europa.eu/principles-countries-history/facts-and-figures-european-union_en)에서 창립 회원국과 각 가입 시기를 확인했다. EU 공식 사이트의 저작권 안내는 별도 표시가 없는 EU 소유 콘텐츠의 재사용을 CC BY 4.0으로 허용하며, 출처와 변경 사항을 표시하도록 한다([EU 법적 고지](https://european-union.europa.eu/legal-notice_en)).
- 현재 회원국 단계 구분도는 27개국만 담는다. 1958년은 EU 출범 연도가 아니라 EEC 창립 회원국의 참여 시작이다. 독일은 서독의 EEC 참여 연도이며, 현재 독일 국경 전체가 그 시점부터 같은 회원 상태였다는 뜻은 아니다. 지도는 현행 국가 경계 자료에 가입 연도를 결합한다.
- 연말 회원국 수는 가입·탈퇴 연혁을 매년 12월 31일 기준으로 누적한 파생 집계다. 변화 시점은 1958년 +6, 1973년 +3, 1981년 +1, 1986년 +2, 1995년 +3, 2004년 +10, 2007년 +2, 2013년 +1, 2020년 -1이다.
- 영국은 1973년에 가입하고 2020년에 탈퇴했다. 현재 회원국 지도에는 `GBR` 값을 두지 않아 지도에 자료 없음으로 나타난다. 이 결측은 0년이나 미가입 연도를 뜻하지 않는다.

### 스코틀랜드 독립 주민투표

- 지방 의회 구역별 득표 수·득표율·투표율은 House of Commons Library [CBP-7529 표 33](https://researchbriefings.files.parliament.uk/documents/CBP-7529/CBP-7529.pdf)을 사용했다. 출처 문구는 “Contains Parliamentary information licensed under the Open Parliament Licence v3.0.”이며, OPL은 복제·수정·배포를 허용한다([Open Parliament Licence](https://www.parliament.uk/site-information/copyright/open-parliament-licence/)).
- [Electoral Management Board 결과 페이지](https://www.emb.scot/emb/scottish-independence-referendum-2014-3/scottish-independence-referendum-18-september-2014)는 “All rights reserved”여서 재배포 수치의 원자료로 삼지 않았다. 그 페이지의 Aberdeen City 행은 총 투표 180,045표와 찬성 71,337표·반대 108,606표를 표시한다. 총 투표 수는 해당 지방 의회의 선거인 수 175,751명을 초과하고, 득표 조합은 공식 보고서의 Aberdeenshire 행과 일치한다. [Electoral Commission 보고서 부록 3](https://www.electoralcommission.org.uk/sites/default/files/pdf_file/Scottish-independence-referendum-report.pdf)과 OPL 표 33은 Aberdeen City의 찬성 59,390표·반대 84,094표·투표율 81.7%로 일치한다. Electoral Commission 보고서는 수치 대조에만 사용했고 표와 문장을 복제하지 않았다.
- 좌표는 [GeoNames 영국 자료](https://download.geonames.org/export/dump/GB.zip)에서 구역별 대표 정착지의 GeoNames ID를 찾아 추출했다. GeoNames 자료는 CC BY 조건으로 재사용할 수 있다([GeoNames 이용 조건](https://www.geonames.org/export/)). 각 점은 중심 도시 또는 대표 정착지이며 행정구역 경계나 면적 중심점이 아니다. GeoJSON 좌표는 WGS84 `[경도, 위도]` 순서다. 32개 이름과 ID는 `scotland_referendum.py`의 `COUNCIL_CENTERS`에 있다.
- `yes_share`와 `turnout`은 OPL 표의 소수 첫째 자리 수치를 따른다. `category`는 원자료에서 찬성 또는 반대 득표 수가 더 큰 쪽을 표시하며 개별 유권자나 모든 지역 주민의 단일 견해를 뜻하지 않는다. 지도는 점의 색으로 이 우세 범주를 나타낸다. 점 크기는 투표율을 인코딩하지 않는다.
- 전국 그래프는 유효 찬성·반대 투표만을 분모로 한다. 찬성 1,617,989표, 반대 2,001,926표, 무효 3,429표, 총 투표 3,623,344표다. 유효표 분모는 3,619,915표이며 표시 비율은 찬성 44.7%, 반대 55.3%다.

### 기존 World Bank 도시화 자료 — 이번 모듈 미사용

- 보존 중인 시계열은 World Bank WDI API의 [도시 인구 비율 `SP.URB.TOTL.IN.ZS`](https://api.worldbank.org/v2/country/all/indicator/SP.URB.TOTL.IN.ZS?format=json&per_page=20000&date=1960%3A2025)와 [최대 도시 인구의 도시 인구 대비 비율 `EN.URB.LCTY.UR.ZS`](https://api.worldbank.org/v2/country/all/indicator/EN.URB.LCTY.UR.ZS?format=json&per_page=20000&date=1960%3A2025)다. WDI 공개 라이선스 기본 조건은 CC BY 4.0이며 출처와 변경 사항을 표시해야 한다([World Bank Data Catalog 이용 조건](https://datacatalog.worldbank.org/public-licenses)).
- `SP.URB.TOTL.IN.ZS`는 각국 통계기관의 도시 정의에 따른 도시 거주 인구의 총인구 대비 비율이다. 각국의 도시 정의가 달라 국가 간 경계 기준이 동일하지 않다([WDI 지표 설명](https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SP.URB.TOTL.IN.ZS)).
- `EN.URB.LCTY.UR.ZS`는 도시 인구 중 최대 도시 인구의 비율이며, 도시권 경계에 따른 차이가 있다. 수도권 인구 비중과 같은 지표로 바꾸어 읽지 않는다.
- 보존 시계열은 1960–2025년 API 값이며 결측은 `null`, 비결측 값은 보간하지 않았다. 기존 추출 시 API 갱신 표시는 2026-11-11, 수신일은 2026-11-27이었다. 2025년 값은 추정치·잠정치일 수 있다.
- 두 파일은 각각 9,703 B와 7,908 B다. 이 파일들과 `world_bank.py`는 삭제하지 않았고 현재 `lesson-1.md`–`lesson-3.md`, `unit.yaml`의 focus·transfer에서는 참조하지 않는다.
