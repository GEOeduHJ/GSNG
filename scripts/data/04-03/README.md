# 04-03 공존과 평화를 위한 노력: 실제 자료

## 자료 선정과 이용 조건

- 분쟁 사망 지도와 무력 분쟁 시계열에는 UCDP의 2026년판 v26.1을 사용했다. UCDP 공식 다운로드 센터는 이 데이터셋들을 CC BY 4.0으로 제공하며, 관련 출판물 인용을 요구한다. 각 산출물은 국가·연도 집계 또는 연도별 conflict ID 수만 담고, 행위자 이름이나 책임 판정은 담지 않는다.
- 새 유형별 시계열은 같은 UCDP/PRIO ACD v26.1의 `type_of_conflict` 네 범주를 연도별 고유 `conflict_id` 수로 집계했다. 네 유형 합계는 기존 연도별 총계와 모든 연도에서 일치한다. 유형은 분쟁의 원인이나 책임을 나타내지 않는다.
- 2025년 사망 지도는 UCDP Country-Year Dataset의 `cumulative_total_deaths_in_orgvio_best`를 사용한다. 이는 국가 경계 안에서 기록한 조직적 폭력 관련 사망자의 best estimate 합계이며, 전투 사망만을 뜻하지 않는다. 2025년 지도는 기존 `public/data/base/countries-110m.geojson`의 Natural Earth 국가 경계만 사용했다. 새로운 경계는 만들지 않았다.
- UCDP 국가명과 기존 경계의 이름은 명시적인 별칭으로만 연결했다. 2025년 원자료 중 30개 지명은 기존 1:110m 경계에 해당 도형이 없거나 연결을 확정할 수 없어 지도에 넣지 않았다. 지도 값이 `null`이면 원자료 결측, 대응 도형 부재 또는 중립성 원칙에 따른 미연결을 뜻한다. 공식 0은 숫자 `0`으로 유지했다. 귀속이 다투어지는 지역은 국가 값으로 연결하지 않았다.
- 국가기반 무력 분쟁 수는 UCDP/PRIO ACD에서 해당 연도에 나타난 고유 `conflict_id` 수다. 국가기반 분쟁은 적어도 한 당사자가 국가 정부인 분쟁이라는 UCDP 정의를 따른다. dyad 수나 당사자 수로 해석하지 않는다.
- 난민 자료는 UNHCR Refugee Data Finder의 2025년 12월 기준 공식 인구 통계를 사용했다. 출신지·수용국 막대는 `REF_UNHCR`, `REF_UNRWA`, `OIP`, `ASY`를 각각 한 번씩 합산한 국가 재고값이다. 출신지를 알 수 없는 코드는 제외했다. 한국어 명칭은 기존 국가 경계의 이름을 우선 사용하고, 튀르키예는 UN 표기를 적용했으며 팔레스타인 지역은 `팔레스타인 지역`으로 표시했다. UNHCR은 자료를 CC BY 4.0으로 제공하며, 변경 사실과 출처를 밝히고 UNHCR의 승인·보증을 암시하지 말 것을 요구한다.
- 세계 강제 이주민 시계열은 UNHCR이 공개한 세계 총계 지표를 그대로 옮겼다. UNHCR 방법론은 가자지구 국내 실향민과 UNRWA 난민의 중복을 조정한다고 설명한다. 국가별 인구 유형을 단순 합산하면 이 중복을 다시 더할 수 있어, 세계 총계에는 공개 지표를 사용했다. 원자료가 표시하는 단위인 million persons와 0.01 million 정밀도를 그대로 유지했다.
- UN 평화유지활동의 공식 현재 임무 목록 및 각 임무 사실자료에서 설치 연도와 본부 소재지를 대조했다. 다만 UN 웹사이트 이용 조건은 개인의 비상업적 이용만 허용하고, 자료 재배포·편집물 작성·2차 저작물 제작을 허용하지 않는다. 따라서 임무 좌표나 연도를 추출해 점 지도 또는 다른 파생 데이터로 저장하지 않았다. 요청된 현재 임무 점 지도는 산출하지 않았으며, 절 3에는 같은 학습 목적을 돕는 CC BY 4.0 UCDP 평화협정·분쟁 종결 자료를 대안으로 넣었다.

## 절별 추천 자료 단계

각 절에는 실제 자료 3종과 개념도 1종을 둔다. 실제 자료는 모두 기존 산출물을 다시 연결하며, 새로 만든 자료는 1절의 UCDP 유형별 시계열이다.

| 절 | 단계 | 파일 | 활용 초점 |
| --- | --- | --- | --- |
| 1. 세계 곳곳에서 분쟁은 왜 일어날까? | 실제 1 | `armed-conflict-types-series-1946-2025.json` | UCDP가 구분한 국가기반 무력 분쟁 유형의 연도별 변화를 살핀다. 유형은 원인이나 책임을 뜻하지 않는다. |
|  | 실제 2 | `organized-violence-deaths-country-2025.json` | 국가별 피해 추정의 공간 차이를 살핀다. 이스라엘·팔레스타인 지역은 UCDP의 단일 집계 단위로 따로 표시한다. |
|  | 실제 3 | `armed-conflict-count-series-1946-2025.json` | 국가기반 무력 분쟁 수의 장기 변화를 유형별 자료와 비교한다. |
|  | 개념도 | `conflict-factors-schematic.svg` | 권력·영토·자원·정체성·사회경제·국제 관계가 상호작용하는 구조를 설명한다. |
| 2. 분쟁 지역 주민들의 삶은 어떠할까? | 실제 1–2 | `forcibly-displaced-origin-top10-2025.json`, `forcibly-displaced-host-top10-2025.json` | 같은 범주의 출신지·수용국별 국외 인구 재고를 비교하며 이동 경로와 구분한다. |
|  | 실제 3 | `global-forcibly-displaced-series-2006-2025.json` | UNHCR이 공개한 중복 조정 세계 총계의 흐름을 국가별 재고와 구분해 살핀다. |
|  | 개념도 | `displacement-agency-schematic.svg` | 난민의 선택·역량과 지역 사회의 지원·의사결정 참여를 함께 다룬다. |
| 3. 세계 평화를 위해 어떤 노력을 해야 할까? | 실제 1 | `peace-agreements-by-year-1975-2021.json` | 평화협정 기록의 연도별 변화를 살핀다. 서명 기록은 평화의 지속성과 구분한다. |
|  | 실제 2 | `conflict-termination-outcomes-series-1946-2023.json` | 합의·휴전·무력 승리 등 서로 다른 종결 유형을 비교한다. |
|  | 실제 3 | `armed-conflict-count-series-1946-2025.json` | 국가기반 무력 분쟁 수를 평화 과정과 함께 읽고 대응의 맥락을 살핀다. |
|  | 개념도 | `peacebuilding-pathway-schematic.svg` | 예방·합의·안전·권리·포용·회복을 잇는 평화 구축의 흐름을 설명한다. |
|  | 보충 출처 | UN Peacekeeping 사실자료 URL 목록(아래) | UNFICYP·UNDOF의 공식 임무 설명을 확인한다. 이용 조건에 따라 임무 점 지도는 만들지 않았다. |

## 산출 파일

원자료 파일은 저장소에 넣지 않는다. 각 스크립트는 원자료를 메모리에서 내려받아 산출 JSON만 쓴다. JSON 파일은 모두 1 MB 이하이며 공통 스키마를 따른다.

| 파일 | 화면 자료 | 기준 시점 | 크기 |
| --- | --- | --- | ---: |
| `public/data/04-03/organized-violence-deaths-country-2025.json` | 국가 단계 구분도 | 2025 | 2,644 B |
| `public/data/04-03/armed-conflict-count-series-1946-2025.json` | 시계열 선그래프 | 1946–2025 | 1,928 B |
| `public/data/04-03/armed-conflict-types-series-1946-2025.json` | 유형별 시계열 선그래프 | 1946–2025 | 4,804 B |
| `public/data/04-03/forcibly-displaced-origin-top10-2025.json` | 막대그래프 | 2025 | 923 B |
| `public/data/04-03/forcibly-displaced-host-top10-2025.json` | 막대그래프 | 2025 | 873 B |
| `public/data/04-03/global-forcibly-displaced-series-2006-2025.json` | 시계열 선그래프 | 2006–2025 | 648 B |
| `public/data/04-03/peace-agreements-by-year-1975-2021.json` | 시계열 선그래프 | 1975–2021 | 1,156 B |
| `public/data/04-03/conflict-termination-outcomes-series-1946-2023.json` | 범주별 시계열 선그래프 | 1946–2023 | 5,494 B |

## 원사이트 대조표

아래 값은 산출 파일별로 세 항목씩 원자료와 대조했다. UNHCR의 출신지·수용국 값은 해당 국가 코드를 API 필터로 조회한 뒤 네 인구 유형을 합산했다. 세계 총계는 UNHCR 공개 지표에 표시된 값을 원래의 million persons 단위로 유지했다.

| 산출 파일 | 항목 | 값 | 확인 URL |
| --- | --- | ---: | --- |
| `organized-violence-deaths-country-2025.json` | 우크라이나 | 90,345명 | [UCDP Country-Year v26.1](https://ucdp.uu.se/downloads/organizedviolencecy/organizedviolencecy-261-csv.zip) |
|  | 수단 | 75,174명 | [UCDP Country-Year v26.1](https://ucdp.uu.se/downloads/organizedviolencecy/organizedviolencecy-261-csv.zip) |
|  | 이스라엘·팔레스타인 지역 합산(UCDP 단일 집계 단위) | 14,563명 | [UCDP Country-Year v26.1](https://ucdp.uu.se/downloads/organizedviolencecy/organizedviolencecy-261-csv.zip) |
| `armed-conflict-count-series-1946-2025.json` | 1946년 | 17건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
|  | 2000년 | 40건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
|  | 2025년 | 65건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
| `armed-conflict-types-series-1946-2025.json` | 1946년 국가 외부 분쟁 | 5건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
|  | 1990년 국내 무력 분쟁 | 44건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
|  | 2025년 국제화된 국내 무력 분쟁 | 22건 | [UCDP/PRIO ACD v26.1](https://ucdp.uu.se/downloads/ucdpprio/ucdp-prio-acd-261-csv.zip) |
| `forcibly-displaced-origin-top10-2025.json` | 베네수엘라 | 7,640,872명 | [UNHCR API: 출신지 VEN](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Carea_ori_adm0&page_size=100&c%5Barea_ori_adm0%5D=VEN) |
|  | 팔레스타인 지역 | 6,029,831명 | [UNHCR API: 출신지 PSE](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Carea_ori_adm0&page_size=100&c%5Barea_ori_adm0%5D=PSE) |
|  | 우크라이나 | 5,250,714명 | [UNHCR API: 출신지 UKR](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Carea_ori_adm0&page_size=100&c%5Barea_ori_adm0%5D=UKR) |
| `forcibly-displaced-host-top10-2025.json` | 미국 | 4,176,592명 | [UNHCR API: 수용국 USA](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Cref_area_adm0&page_size=100&c%5Bref_area_adm0%5D=USA) |
|  | 독일 | 2,952,694명 | [UNHCR API: 수용국 DEU](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Cref_area_adm0&page_size=100&c%5Bref_area_adm0%5D=DEU) |
|  | 요르단 | 2,842,473명 | [UNHCR API: 수용국 JOR](https://api-data.unhcr.org/api/v0/data/PopStatsOfficial?c%5Bpop_type%5D=REF_UNHCR%2CREF_UNRWA%2COIP%2CASY&time_period=eq%3A2025-12&dimensions=pop_type%2Cref_area_adm0&page_size=100&c%5Bref_area_adm0%5D=JOR) |
| `global-forcibly-displaced-series-2006-2025.json` | 2018년 | 72.56 million | [UNHCR Figures at a Glance](https://www.unhcr.org/figures-at-a-glance) |
|  | 2024년 | 123.25 million | [UNHCR Figures at a Glance](https://www.unhcr.org/figures-at-a-glance) |
|  | 2025년 | 117.83 million | [UNHCR Figures at a Glance](https://www.unhcr.org/figures-at-a-glance) |
| `peace-agreements-by-year-1975-2021.json` | 1992년 | 14건 | [UCDP Peace Agreement Dataset v22.2](https://ucdp.uu.se/downloads/peace/ucdp-peace-agreements-222.xlsx) |
|  | 2000년 | 9건 | [UCDP Peace Agreement Dataset v22.2](https://ucdp.uu.se/downloads/peace/ucdp-peace-agreements-222.xlsx) |
|  | 2021년 | 2건 | [UCDP Peace Agreement Dataset v22.2](https://ucdp.uu.se/downloads/peace/ucdp-peace-agreements-222.xlsx) |
| `conflict-termination-outcomes-series-1946-2023.json` | 1946년 평화협정 종결 | 1건 | [UCDP Conflict Termination v4-2024](https://ucdp.uu.se/downloads/monadterm/UCDPConflictTerminationDataset_v4_2024_Conflict.csv) |
|  | 2000년 낮은 무력 활동 종결 | 3건 | [UCDP Conflict Termination v4-2024](https://ucdp.uu.se/downloads/monadterm/UCDPConflictTerminationDataset_v4_2024_Conflict.csv) |
|  | 2023년 낮은 무력 활동 종결 | 4건 | [UCDP Conflict Termination v4-2024](https://ucdp.uu.se/downloads/monadterm/UCDPConflictTerminationDataset_v4_2024_Conflict.csv) |

## 본문 연도 대조표

본문에 적은 역사적 연도와 제도 설치 연도는 아래 공식 기록과 대조했다. 이 연도들은 수치 시계열의 값이 아니라 사건·협약·기관의 시점을 설명한다.

| 절 | 본문에 적은 시점 | 대조 내용 | 공식 출처 |
| --- | --- | --- | --- |
| 1 | 2011년, 2012년 2월 | 시리아의 불안은 2011년에 시작했고, 2012년 2월 무력 분쟁으로 전개되었다. | [유엔 시리아 조사위원회 보고서](https://digitallibrary.un.org/record/789117/files/A_HRC_28_69-EN.pdf) |
| 1 | 2007–2009년 | 시리아의 여러 해 가뭄과 북동부 농업·농촌 생계의 어려움을 확인했다. | [UNDRR 시리아 가뭄 사례 연구](https://www.undrr.org/publication/drought-vulnerability-arab-region-case-study-drought-syria-ten-years-scarce-water-2000), [FAO 2009 가뭄 대응 계획](https://www.fao.org/fileadmin/user_upload/emergencies/docs/app_syriadrought2009.pdf) |
| 1 | 2014년 | 총회 결의 68/262는 우크라이나의 영토 보전을 재확인했고, 결의 71/205는 크림 자치 공화국과 세바스토폴의 점령 및 병합 불인정을 명시했다. | [A/RES/68/262](https://digitallibrary.un.org/record/767883/files/A_RES_68_262-EN.pdf), [A/RES/71/205](https://digitallibrary.un.org/record/858544/files/A_RES_71_205-EN.pdf) |
| 1 | 2022년 2월 24일 | 총회 결의 ES-11/1은 러시아 연방의 침략을 규탄하고 군대 철수를 요구했다. | [A/RES/ES-11/1](https://digitallibrary.un.org/record/3965290/files/A_RES_ES-11_1-EN.pdf) |
| 2 | 1951년 | 난민 협약의 난민 정의와 박해 사유를 확인했다. | [UNHCR, The 1951 Refugee Convention](https://www.unhcr.org/about-unhcr/overview/1951-refugee-convention) |
| 2 | 2025년 12월, 2006–2025년 | 출신지·수용국 인구 재고와 세계 강제 이주민 총계의 자료 기준을 각 산출 JSON·매니페스트와 대조했다. | [UNHCR Refugee Data Finder](https://refugeedata.unhcr.org/en/), [UNHCR Figures at a glance](https://www.unhcr.org/figures-at-a-glance) |
| 3 | 1945년 | UN 헌장 발효와 UN 출범 시점을 확인했다. | [UN Charter](https://www.un.org/en/about-us/un-charter) |
| 3 | 1964년 | 안전 보장 이사회가 키프로스의 UNFICYP를 설치했다. | [UNFICYP Fact Sheet](https://peacekeeping.un.org/en/factsheet/unficyp) |
| 3 | 2016년 | 콜롬비아 정부와 FARC-EP의 최종 평화 협정과 농촌 개혁·정치 참여·재통합 과제를 확인했다. | [UN Peacemaker, Final Agreement](https://peacemaker.un.org/en/node/9804) |

## UN 평화유지활동 출처 확인

2026-11-27에 [UN 평화유지활동 현재 임무 목록](https://peacekeeping.un.org/en/peacekeeping-factsheet)과 아래 각 임무 사실자료에서 활동 여부·설치 연도·본부 소재지를 확인했다. 원자료를 편집해 점 좌표 데이터로 재배포할 수 없으므로 지도 파일은 만들지 않았다. 각 임무 링크에서 원문을 확인할 수 있다.

| 임무 코드 | 공식 사실자료 |
| --- | --- |
| MINUSCA | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/minusca) |
| MONUSCO | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/monusco) |
| UNDOF | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/undof) |
| UNFICYP | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unficyp) |
| UNIFIL | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unifil) |
| UNISFA | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unisfa) |
| UNMIK | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unmik) |
| UNMISS | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unmiss) |
| UNMOGIP | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/unmogip) |
| UNTSO | [임무 factsheet](https://peacekeeping.un.org/en/factsheet/untso) |

## 출처와 인용

- UCDP의 라이선스, 버전, 권장 인용: [UCDP Dataset Download Center](https://ucdp.uu.se/downloads/). ACD와 조직적 폭력 집계에는 Davies, Pettersson & Öberg (2026), *Journal of Peace Research* 63(4), DOI [10.1093/jopres/xjag046](https://doi.org/10.1093/jopres/xjag046)을 인용한다. Country-Year 자료는 Sundberg & Melander (2013), “Introducing the UCDP Georeferenced Event Dataset,” *Journal of Peace Research* 50(4) 및 해당 v26.1 codebook을 함께 참조한다.
- 평화협정에는 Pettersson, Högbladh & Öberg (2019), “Organized violence, 1989–2018 and peace agreements,” *Journal of Peace Research* 56(4)를 인용한다. 분쟁 종결에는 Kreutz (2010), “How and When Armed Conflicts End: Introducing the UCDP Conflict Termination Dataset,” *Journal of Peace Research* 47(2)를 인용한다. v4-2024 종결 자료는 UCDP/PRIO ACD v25.1과 대응하고 1946–2023년을 다루므로, 최신 v26.1 자료보다 버전이 오래됐다.
- UNHCR 자료 라이선스와 출처 표시 조건: [Refugee Data Finder 이용 조건](https://refugeedata.unhcr.org/en/terms-and-conditions-of-use/), [API 기술 문서](https://refugeedata.unhcr.org/en/documentation/technical-reference/api/), [인구 유형 정의](https://refugeedata.unhcr.org/en/documentation/data-coverage/population-categories/), [강제 이주 통계 방법론](https://www.unhcr.org/refugee-statistics/methodology). UNHCR 집계와 분류에 대한 설명은 [강제 이주 및 UNHCR 보호·지원 인구 구분](https://www.unhcr.org/refugee-statistics/insights/explainers/forcibly-displaced-pocs.html)을 참조한다.
- UN 평화유지활동 페이지에는 별도 CC 라이선스가 표시되지 않았다. [UN 웹사이트 이용 조건](https://www.un.org/en/about-us/terms-of-use/)은 자료를 개인의 비상업적 이용으로 제한하고 재배포, 편집, 2차 저작물 제작을 허용하지 않아 파생 위치 자료를 저장하지 않았다.


## 검수 수정 (Claude, 2026-11-27)

- UCDP 국가-연도 자료(v26.1)에는 팔레스타인 행이 따로 없다. 이스라엘과 팔레스타인 지역의 사건이 'Israel' 한 단위로 집계된다.
- 처음 산출본은 14,563명을 이스라엘에만 표시하고 팔레스타인 지역은 '자료 없음'으로 두었다. 이 표시는 피해의 소재를 잘못 읽게 할 수 있었다.
- 수정본은 두 지역을 `special`(별도 집계 지역)로 표시하고, 합계를 `specialTotals`에 따로 기록한다.
