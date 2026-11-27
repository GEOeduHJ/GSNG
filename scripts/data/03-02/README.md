# 중단원 03-02 세계의 식량 자원과 식량 문제: 자료 가공 기록

수집일은 2026-11-27이다. 원자료 ZIP/HWPX와 Natural Earth 코드표는 스크립트 실행 중 임시 폴더에만 두며 저장소에 넣지 않는다. 산출물은 모두 public/data/03-02/에 있고 각 파일은 1MB 미만이다. 재생성 명령은 python3 scripts/data/03-02/fao_food_data.py와 python3 scripts/data/03-02/mafra_self_sufficiency.py이다.

## 출처와 이용 조건

| 자료 | 원자료 및 원자료 갱신 정보 | 이용 조건 확인 및 변환 |
|---|---|---|
| 쌀·밀·옥수수 생산량 | [FAOSTAT QCL](https://www.fao.org/faostat/en/#data/QCL), [정규화 bulk ZIP](https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip) | FAO 통계 데이터베이스는 별도 예외가 없는 한 CC BY 4.0이며, FAO 출처 표시와 비보증 문구가 필요하다. [공식 이용 조건](https://www.fao.org/contact-us/terms/db-terms-of-use/en), [FAO QCL 카탈로그](https://data.fao.org/catalog/iso/d24a448b-3b62-4c09-8c1d-4a39bb599876). bulk 목록에서 확인한 갱신일은 2025-12-31이다. 2024년 Production 값을 작물별 내림차순 상위 10개국으로 뽑았다. |
| 밀 수출량·세계 비중 | [FAOSTAT TCL](https://www.fao.org/faostat/en/#data/TCL), [정규화 bulk ZIP](https://bulks-faostat.fao.org/production/Trade_CropsLivestock_E_All_Data_(Normalized).zip) | FAO 통계 데이터베이스 CC BY 4.0 이용 조건이 적용된다. [FAO Statistical Yearbook 2024](https://openknowledge.fao.org/3/cd2971en/cd2971en.pdf)는 TCL 자료를 CC BY 4.0으로 인용한다. bulk 목록 갱신일은 2026-07-24이며, 이 파일의 최신 수출량 연도는 2024년이다. 작물 항목 Wheat와 요소 Export quantity만 사용했다. |
| 영양 부족 인구 비율 지도 | [World Bank WDI 지표 SN.ITK.DEFC.ZS](https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS), [2024 API 자료](https://api.worldbank.org/v2/country/all/indicator/SN.ITK.DEFC.ZS?format=json&date=2024&per_page=20000), [이용 조건](https://datacatalog.worldbank.org/public-licenses) | WDI 원자료 공급자는 FAO다. World Bank는 자체 공개 데이터에 기본 CC BY 4.0을 적용하며, 출처 표시와 변경 사실 표시가 필요하다. [지표 정의](https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SN.ITK.DEFC.ZS)는 표시값 2.5가 실제로는 2.5% 미만임을 명시한다. 2024는 FAO 2023–2025 3년 평균의 가운데 연도다. |
| 곡물 수입 의존도·세계 영양 부족 시계열 | [FAOSTAT Food Security Indicators (FS)](https://www.fao.org/faostat/en/#data/FS), [정규화 bulk ZIP](https://bulks-faostat.fao.org/production/Food_Security_Data_E_All_Data_(Normalized).zip), [FAO 카탈로그](https://data.fao.org/catalog/dataset/955d6564-40a9-48b4-b51b-f19d65bb3539) | FAO 카탈로그의 해당 데이터 묶음은 CC BY 4.0을 표시한다. FAO 이용 조건에 따라 출처를 표시하고 FAO의 승인·보증을 암시하지 않는다. bulk 목록 갱신일은 2026-11-23이다. FAOSTAT FS의 영양 부족 항목은 세계 시계열에, cereal import dependency ratio는 국가 지도에 사용했다. |
| 대한민국 곡물·식량 자급률 | [농림축산식품부 원자료 안내](https://mafra.go.kr/bbs/home/798/571364/artclView.do), [원 HWPX](https://mafra.go.kr/bbs/home/798/580412/download.do) | 원자료 안내 페이지에서 공공누리 제1유형(출처표시)을 확인했다. 이 유형은 상업·비상업 이용과 변경을 허용하되 출처 표시와 비보증 표시를 요구한다. [공공누리 제1유형 안내](https://www.mcst.go.kr/site/s_open/kogl/koglType.jsp?pTab=02). 안내 페이지는 2024-08-29 게시, 자료는 2022 양곡연도까지다. 원표의 2011–2022년 전체 곡물자급률과 식량자급률 계열을 추출했다. |
| 코드 연결 | [Natural Earth 원본](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson), [이용 조건](https://www.naturalearthdata.com/about/terms-of-use/) | Public domain 자료를 임시로 내려받아 FAOSTAT M49와 기존 ISO3 코드의 연결에만 사용했다. 새로운 경계는 만들거나 배포하지 않고 기존 public/data/base/countries-110m.geojson을 화면 경계로 쓴다. |

FAOSTAT의 화면 출처 표시는 기관·자료명·접근일·URL·CC BY 4.0과 함께 이번 변환 사실을 덧붙이는 형식이다. World Bank 지도 값은 해당 지표 원자료 공급자인 FAO가 산출한 수치이며, World Bank API의 국가별 값과 FAOSTAT 3년 평균을 대조했다. 공통 169개 ISO3 중 167개는 값·결측 상태가 일치했고, 프랑스와 노르웨이는 FAOSTAT FS 파일에는 값이 없지만 WDI에서 2.5(실제 <2.5%)로 제공되어 기준 미만으로 분류했다. 지도는 요청된 WDI 지표 코드를 직접 출처로 삼았다. 사용된 FAOSTAT 통계 중 일부 국가·품목 값은 원자료의 추정 또는 기타 상태 플래그를 가질 수 있다. 스크립트가 값 자체를 추정·보간하지는 않는다.

농식품부 공공누리 조건이 허용되므로 국내 시계열에는 FAOSTAT 대체 계산 지표를 쓰지 않았다. 농식품부 자급률 자료는 전용 시계열 안내 페이지에서 2022 양곡연도까지 공개하고 있다. 이 결과에는 이후 연감의 잠정 수급표 값을 섞지 않아 공표된 전용 시계열의 정의를 유지했다.

## 산출 파일과 수업 활용

| 절·추천 단계 | 자료 파일 | 수업에서 다룰 내용 |
|---|---|---|
| 절 1 · 2단계 | rice-production-top10.json, wheat-production-top10.json, maize-production-top10.json | 같은 해인 2024년 쌀·밀·옥수수 생산 상위 10개국을 나란히 비교한다. 생산량 순위가 곧 식량 접근성이나 국민 소비량을 뜻하지 않는다는 점을 구분한다. |
| 절 1 · 3단계 | wheat-exports-top10.json, wheat-export-world-share-top10.json | 밀 수출 상위국의 수출량과 세계 수출량 대비 비중을 비교한다. 상위 5개국 비중 합은 59.41%로 계산되며, 교역망의 집중을 논의할 수 있다. |
| 절 2 · 2단계 | undernourishment-map.json, cereal-import-dependency-map.json | WDI 2024 영양 부족 비율(FAO의 2023–2025 3년 평균)과 곡물 수입 의존도를 비교한다. 같은 현상의 두 측정값이 아니므로 상관관계를 곧바로 원인으로 읽지 않는다. |
| 절 2 · 3단계 | global-undernourishment-series.json | 세계 영양 부족 인구 비율의 장기 변화를 살핀다. 각 수치는 FAO가 공개한 3년 평균이며, 가로축은 해당 기간의 가운데 연도다. |
| 절 3 · 2단계 | korea-self-sufficiency-series.json, cereal-import-dependency-map.json | 국내 곡물·식량 자급률과 국가별 곡물 수입 의존도를 함께 보고, 안정적인 생산·공급 방안을 비교한다. |
| 절 3 · 3단계 | wheat-export-world-share-top10.json, global-undernourishment-series.json | 국제 교역 집중과 세계 영양 부족 변화가 보여 주는 규모를 구분해 정책 선택의 기대 효과와 한계를 논의한다. |

해결 방안의 맥락 자료로 기존 출처 fao-korea-national-food-plan, maff-japan-basic-plan-2025, wfp-food를 함께 읽을 수 있다. 해당 문서의 표·그림·문장을 이 데이터 파일에 복제하지 않았다.

## 정의, 경계, 결측 처리

- 생산량은 FAOSTAT QCL의 Production 요소, 단위 t, 2024년 값이다. 출력은 상위 10개 국가만 포함한다. 이 목록 밖 국가의 생산량이 0이라는 뜻은 아니다.
- 밀 수출량은 FAOSTAT TCL의 작물 Wheat만 집계한다. 밀가루와 밀 부산물은 포함하지 않는다. 세계 비중은 국가별 밀 수출량 ÷ FAOSTAT World 밀 수출량 × 100으로 계산하고 소수 둘째 자리로 반올림했다. 2024년 세계 기준량은 202,676,065.5 t이다. 상위 10개국 합계는 세계 수출량의 84.56%다.
- 영양 부족 지도는 World Bank WDI `SN.ITK.DEFC.ZS`의 2024년 값이며, FAO가 산출한 2023–2025 3년 평균의 가운데 연도다. World Bank 메타데이터에 따라 표시값 2.5는 실제로 <2.5%를 뜻하므로 `values[ISO3] = null`과 `below[ISO3] = '<2.5'`로 분리하고 `belowLabel`을 2.5% 미만으로 뒀다. 실제 0%나 자료 결측으로 치환하지 않았다. 이 지도에서 숫자값은 92개국, 기준 미만 표시는 62개국이며 나머지 20개 코드는 자료 미제공 또는 기존 국가코드와 미연결이다. 대한민국·미국·중국·프랑스·노르웨이 등 기준 미만 값은 별도 범례로 표시한다.
- 영양 부족 비율은 식품 접근·섭취 가능성을 모형으로 추정하는 국가 수준 지표이며, 개인이나 국가 내부의 지역별 차이를 식별하지 않는다. [World Bank 지표 정의와 한계](https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SN.ITK.DEFC.ZS)도 이 지표가 2.5% 미만의 국가값을 별도로 식별하지 않는 점과 추정의 불확실성을 설명한다.
- 곡물 수입 의존도는 FAOSTAT의 2022–2024년 3년 평균이다. 지도에는 원자료 값 155개를 숫자로, 관측이 없는 기존 ISO3 국가는 null로 둔다. 정의는 (곡물 수입 − 곡물 수출) ÷ (곡물 생산 + 곡물 수입 − 곡물 수출) × 100이다. [FAO Statistical Yearbook](https://openknowledge.fao.org/3/cb4477en/cb4477en.pdf)은 음수가 순수출국을 뜻한다고 설명한다. 이 스냅샷에는 음수 값이 없었다.
- 세계 영양 부족 시계열에는 2000–2002부터 2023–2025까지의 FAO 3년 평균 24개를 수록했다. years는 각 3년 기간의 가운데 해인 2001–2024이고, 결측은 null이다. 기간을 연간 관측치나 개인 수로 바꾸지 않았고 보간하지 않았다.
- 대한민국 시계열의 값은 농식품부 원표에 적힌 퍼센트 그대로다. 곡물자급률(사료용 포함)과 식량자급률(사료용 제외)은 서로 분모 정의가 다르다. 2011–2022년만 있고 최신 공개 전용 시계열의 끝 연도는 2022 양곡연도다. 감자류 생체중 기준이 반영된 절을 선택했다.
- 지도 키는 기존 Natural Earth 경계의 ISO3 집합 174개다. 외부 Natural Earth 파일은 M49 코드 연결용으로만 사용했다. 기존 경계에 없는 별도 코드는 추가하지 않았다.

## 원자료 값 대조

아래 대조는 출력 생성에 쓴 공식 원자료 파일 또는 공식 원문에서 값을 다시 읽어 확인했다. 막대 파일은 각각 상위 세 값, 지도·시계열은 표에 적은 세 값을 대조했다. 비중 파일은 출력된 계산값과 분자·세계 분모를 함께 적었다.

| 출력 파일 | 원자료 항목·기간 및 원자료 대조값 | 출력값 | 공식 확인 URL |
|---|---|---|---|
| rice-production-top10.json | QCL, Rice, Production, 2024: India 217,867,864.16 t; China 207,530,000 t; Bangladesh 60,570,453.05 t | 동일 | [FAOSTAT QCL bulk ZIP](https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip) |
| wheat-production-top10.json | QCL, Wheat, Production, 2024: China 140,100,000 t; India 113,292,368 t; Russian Federation 82,588,000 t | 동일 | [FAOSTAT QCL bulk ZIP](https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip) |
| maize-production-top10.json | QCL, Maize (corn), Production, 2024: United States 377,632,690 t; China 294,920,000 t; Brazil 114,953,303 t | 동일 | [FAOSTAT QCL bulk ZIP](https://bulks-faostat.fao.org/production/Production_Crops_Livestock_E_All_Data_(Normalized).zip) |
| wheat-exports-top10.json | TCL, Wheat, Export quantity, 2024: Russian Federation 32,685,820 t; Canada 25,549,815.16 t; United States 21,803,348.98 t | 동일 | [FAOSTAT TCL bulk ZIP](https://bulks-faostat.fao.org/production/Trade_CropsLivestock_E_All_Data_(Normalized).zip) |
| wheat-export-world-share-top10.json | 같은 TCL 원자료 값 ÷ World 2024 wheat exports 202,676,065.5 t × 100: Russian Federation 16.13%; Canada 12.61%; United States 10.76% | 16.13%; 12.61%; 10.76% | [FAOSTAT TCL bulk ZIP](https://bulks-faostat.fao.org/production/Trade_CropsLivestock_E_All_Data_(Normalized).zip) |
| undernourishment-map.json | WDI `SN.ITK.DEFC.ZS`, 2024 (FAO 2023–2025): India 9.8%; Bangladesh 8.2%; Kenya 34.9%; Korea, United States, China, France, Norway: 2.5 means <2.5 | 9.8; 8.2; 34.9; 기준 미만 5개 사례는 below에 <2.5로 보존 | [World Bank 2024 API](https://api.worldbank.org/v2/country/all/indicator/SN.ITK.DEFC.ZS?format=json&date=2024&per_page=20000), [WDI 지표](https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS) |
| cereal-import-dependency-map.json | FS, cereal import dependency ratio, 2022–2024: Republic of Korea 78.3%; China 9.1%; United States 4.6% | 78.3; 9.1; 4.6 | [FAOSTAT FS bulk ZIP](https://bulks-faostat.fao.org/production/Food_Security_Data_E_All_Data_(Normalized).zip) |
| global-undernourishment-series.json | FS, World 3-year average: 2000–2002 13.0%; 2009–2011 8.7%; 2023–2025 8.1% | 가운데 연도 2001 13.0%; 2010 8.7%; 2024 8.1% | [FAOSTAT FS bulk ZIP](https://bulks-faostat.fao.org/production/Food_Security_Data_E_All_Data_(Normalized).zip) |
| korea-self-sufficiency-series.json | MAFRA 원표: 2011 grain (feed included) 26.9%; 2022 grain 22.3%; 2022 food (feed excluded) 49.3% | 동일 | [농식품부 HWPX 원자료](https://mafra.go.kr/bbs/home/798/580412/download.do) |

## 파일 크기와 형식

| 파일 | 크기(bytes) | 웹 형식 |
|---|---:|---|
| rice-production-top10.json | 950 | 막대그래프 |
| wheat-production-top10.json | 953 | 막대그래프 |
| maize-production-top10.json | 949 | 막대그래프 |
| wheat-exports-top10.json | 948 | 막대그래프 |
| wheat-export-world-share-top10.json | 931 | 막대그래프 |
| undernourishment-map.json | 4,212 | 국가별 단계 구분도 |
| cereal-import-dependency-map.json | 3,040 | 국가별 단계 구분도 |
| global-undernourishment-series.json | 757 | 시계열 선그래프 |
| korea-self-sufficiency-series.json | 687 | 시계열 선그래프 |

FAOSTAT과 농식품부의 원자료는 이후 갱신될 수 있다. 스크립트를 다시 실행하면 최신 원자료에 따라 값이 달라질 수 있으므로 산출 JSON을 갱신할 때 manifest의 기준 연도·요약과 이 README 대조값도 함께 확인한다.
