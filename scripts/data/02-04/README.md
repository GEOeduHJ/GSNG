# 02-04 실제 자료 출처 및 가공 보고서

수집일은 2026-11-26이다. 재생성 스크립트는 이 폴더에 있으며, 내려받은 FAOSTAT 원본과 Natural Earth 코드표는 임시 폴더에서 처리한 뒤 삭제한다. 정적 출력은 `public/data/02-04/`에만 저장한다. 모든 출력 파일은 1MB 미만이다.

## 출처와 이용 조건

| 자료 | 원자료·기관 | 이용 조건과 재사용 범위 | 가공 |
|---|---|---|---|
| 주식 작물 열량 비중 지도 3개, 국가 비교 막대 | [FAOSTAT Food Balances](https://www.fao.org/faostat/en/#data/FBS), [정규화된 원본 ZIP](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip), [데이터 카탈로그](https://data.fao.org/catalog/iso/2f264bb6-1238-459a-bf8b-0e2d0a16804a) | FAO 데이터 이용 조건에 따라 [CC BY 4.0](https://www.fao.org/contact-us/terms/db-terms-of-use/). 재사용 시 FAO와 자료명을 표시하고 변경했음을 밝힌다. FAO의 보증·승인을 암시하지 않는다. | 2023년 국가별 `Food supply (kcal/capita/day)`에서 각 작물 품목을 `Grand Total`로 나누어 백분율로 계산했다. 품목은 `Rice and products`, `Wheat and products`, `Maize and products`다. 계산 결과를 소수점 둘째 자리까지 반올림했다. |
| 축제·의례 점과 등재 연도별 막대 | [UNESCO 인류무형문화유산 대표목록](https://ich.unesco.org/en/lists) 종목별 공식 페이지; 좌표는 [GeoNames](https://www.geonames.org/) | UNESCO는 [일반 이용 조건](https://ich.unesco.org/doc/src/66216-EN.pdf)에서 권리와 허가를 안내하며 페이지 사진·설명문을 이 출력에 복제하지 않았다. 종목명·등재 연도 등 사실 정보만 선별해 한국어로 표기했다. 좌표 데이터베이스는 [GeoNames CC BY 4.0](https://www.geonames.org/export/)이며 출처를 표시했다. | 종목 15개의 UNESCO 대표목록 등재 사실과 GeoNames WGS84 대표 지점을 결합했다. 지도 색은 대륙별로 직접 정했다. 연도별 막대는 이 15개 표본만 집계했다. |
| 지중해 식생활 공동 등재국 지도·표 | [UNESCO 지중해 식생활 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) | UNESCO 공식 페이지에서 확인한 공동 등재국과 등재 연도라는 사실만 사용했다. 설명문이나 이미지 등 저작물이 출력에 포함되지 않는다. | 2013년 공동 등재국 7개에 1, 나머지 기존 국가 경계 코드에 0을 부여했다. 표는 같은 목록을 한국어 국가명 및 ISO3 코드로 제시한다. |
| 국가 코드 연결 | [Natural Earth 1:110m Admin 0 Countries 원본](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson), [이용 조건](https://www.naturalearthdata.com/about/terms-of-use/) | Public domain. 기존 `public/data/base/countries-110m.geojson`의 국가 집합과 맞추기 위한 ISO3–M49 코드 연결에만 사용했다. 경계 파일을 새로 배포하거나 수정하지 않았다. | Natural Earth의 `ISO_N3`를 FAOSTAT M49 코드에 연결했다. Natural Earth 경계의 표현과 분쟁 경계를 이 과제에서 변경하거나 판정하지 않는다. |

FAO 표시는 다음 형식을 쓴다: **“FAO, FAOSTAT Food Balances (2023); accessed 2026-11-26; CC BY 4.0.”** 이 값은 국가별 식품 공급량을 열량으로 환산한 통계다. 실제 개인의 섭취량이나 한 국가의 모든 사람에게 공통된 식문화를 측정하지 않는다.

## 파일과 절별 사용 제안

| 절·추천 단계 | 자료 파일 | 수업에서 볼 내용 |
|---|---|---|
| 절 1 · 2단계 | `staple-rice-share-map.json`, `staple-wheat-share-map.json`, `staple-maize-share-map.json` | 같은 연도·분모로 만든 세 지도를 나란히 보고 대륙·국가별 비중 분포를 비교한다. 색상 구간은 실제 제작 화면에서 공통 척도로 설정한다. |
| 절 1 · 3단계 | `staple-share-comparison.json` | 방글라데시·대한민국·인도·이탈리아·멕시코·미국의 쌀·밀·옥수수 비중을 막대로 비교하고, 지리적 차이와 예외를 질문한다. |
| 절 2 · 2단계 | `festival-rituals-points.geojson` | 대륙 범주와 대표 개최 지점을 살펴보고 축제가 계절·장소·공동체와 맺는 관계를 질문한다. 한국 종목 2개도 포함한다. |
| 절 2 · 3단계 | `festival-inscribed-years.json` | 지도에 수록한 15개 종목의 UNESCO 등재 연도 분포를 확인한다. UNESCO 전체 축제·의례 등재량의 연도별 추이가 아니다. |
| 절 3 · 2단계 | `mediterranean-diet-countries-map.json`, `mediterranean-diet-country-table.json` | 다국적 공동 등재라는 보존 사례를 위치와 국가 목록으로 살펴본다. 등재 여부는 그 나라 국민의 식생활이 모두 같다는 뜻이 아니다. |
| 절 3 · 3단계 | 앞 절의 `festival-rituals-points.geojson`, 절 1의 작물 비중 지도 중 하나 | 등재 목록·공동 실천과 식생활 통계가 각각 보여 주는 범위를 비교해 문화 보존 방법을 논의한다. 서로 다른 지표를 같은 현상으로 해석하지 않는다. |

## 음식 자료의 정의와 결측 처리

- 비교 기준은 2023년이다. 수집 시점에 확인한 [FAOSTAT bulk catalog](https://bulks-faostat.fao.org/production/datasets_E.json)의 Food Balances 시계열은 2010–2023년을 포함한다. 원본은 식품수급표 품목별 `Food supply (kcal/capita/day)` 및 `Grand Total` 레코드를 사용한다.
- 계산식은 `100 × 작물·제품 공급 열량 / 전체 식품 공급 열량`이다. 분자는 해당 품목과 파생 제품의 합이며, 쌀·밀·옥수수 각각이 국가에서 재배되는 면적이나 생산량 비율이 아니다.
- 1인당 공급량은 식량수급의 가용량 지표다. 가정·지역·개인 수준의 실제 소비, 식문화의 역사나 종교적 의미, 국가 내부의 지역 차이를 설명하지 않는다. 비중만으로 원인을 단정하지 않는다.
- 기초 세계 경계 177개 중 ISO3를 가진 174개 코드를 모두 지도 값 키로 쓴다. 이 가운데 172개는 Natural Earth M49 코드와 연결했다. M49 연결 또는 원자료 관측이 없으면 `null`로 둔다. 쌀과 밀은 각각 155개 값·19개 결측, 옥수수는 154개 값·20개 결측이다. 결측을 0으로 바꾸거나 보간하지 않는다. 지도에서 값이 없는 코드가 영(0) 공급을 의미하지 않는다.
- 비교 막대는 여섯 국가에 대해 쌀·밀·옥수수 세 범주를 표시한다. `null`은 해당 국가·작물의 원자료가 없다는 뜻이다.

## 축제·의례 점의 출처와 위치 기준

점 좌표 배열 순서는 GeoJSON 표준인 `[경도, 위도]`이며 좌표 출처는 모두 GeoNames다. UNESCO 페이지는 종목명·대표목록 등재 사실·연도를 대조하기 위한 공식 출처다. `category`는 점의 국가가 속한 대륙을 한국어로 쓴 자체 범주이며, `color`는 그 범주에 대응하는 자체 색상이다.

| 한국어 종목명 | 국가·대표 장소(지도 점) | UNESCO 등재 연도 | GeoNames ID·좌표 | UNESCO 공식 항목 |
|---|---|---:|---|---|
| 강릉단오제 | 대한민국 · 강릉 | 2008 | [1843137](https://www.geonames.org/1843137/gangneung.html) · 128.87239, 37.75266 | [UNESCO](https://ich.unesco.org/en/RL/gangneung-danoje-festival-00114) |
| 종묘제례 및 종묘제례악 | 대한민국 · 종묘, 서울 | 2008 | [6800593](https://www.geonames.org/6800593/) · 126.99387, 37.57492 | [UNESCO](https://ich.unesco.org/en/RL/cultural-space-of-jemaa-el-fna-square-00016) |
| 푸동·속 사원의 지옹 축제 | 베트남 · 푸동, 하노이 | 2010 | [1570639](https://www.geonames.org/1570639/) · 105.96315, 21.05709 | [UNESCO](https://ich.unesco.org/en/RL/ging-festival-of-ph-ng-and-sc-temples-00443) |
| 파헬라 바이샤흐의 망갈 쇼바자트라 | 방글라데시 · 다카 대학교 | 2016 | [8985943](https://www.geonames.org/8985943/university-of-dhaka.html) · 90.39250, 23.73155 | [UNESCO](https://ich.unesco.org/en/RL/mangal-shobhajatra-on-pahela-baishakh-01091) |
| 몽골 전통 나담 축제 | 몽골 · 울란바토르(대표 도시) | 2010 | [2028462](https://www.geonames.org/2028462/) · 106.88324, 47.90771 | [UNESCO](https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395) |
| 라마야나 전통 공연 라밀라 | 인도 · 라마나가르, 바라나시 | 2008 | [1258642](https://www.geonames.org/1258642/) · 83.02971, 25.26907 | [UNESCO](https://ich.unesco.org/en/RL/ramlila-the-traditional-performance-of-the-ramayana-00110) |
| 두브로브니크의 성 블라시오 축제 | 크로아티아 · 두브로브니크 | 2009 | [3201047](https://www.geonames.org/3201047/) · 18.10909, 42.64125 | [UNESCO](https://ich.unesco.org/en/RL/festivity-of-saint-blaise-the-patron-of-dubrovnik-00232) |
| 베르가의 파툼 | 스페인 · 베르가 | 2008 | [3128201](https://www.geonames.org/3128201/) · 1.84628, 42.10429 | [UNESCO](https://ich.unesco.org/en/RL/patum-of-berga-00156) |
| 빈슈 카니발 | 벨기에 · 빈슈 | 2008 | [2801922](https://www.geonames.org/2801922/) · 4.16469, 50.41155 | [UNESCO](https://ich.unesco.org/en/RL/carnival-of-binche-00033) |
| 드자네트 오아시스 세베이바 의례와 의식 | 알제리 · 드자네트 | 2014 | [2500275](https://www.geonames.org/2500275/) · 9.48500, 24.55528 | [UNESCO](https://ich.unesco.org/en/RL/ritual-and-ceremonies-of-sebeiba-in-the-oasis-of-djanet-algeria-00665) |
| 아르군구 국제 낚시·문화 축제 | 나이지리아 · 아르군구 | 2016 | [2349431](https://www.geonames.org/2349431/) · 4.52514, 12.74482 | [UNESCO](https://ich.unesco.org/en/RL/argungu-international-fishing-and-cultural-festival-00901) |
| 치아파 데 코르소 1월 축제의 파라치코스 | 멕시코 · 치아파 데 코르소 | 2010 | [3531013](https://www.geonames.org/3531013/) · -93.01216, 16.70750 | [UNESCO](https://ich.unesco.org/en/RL/festivity-of-las-parachicos-in-the-traditional-january-feast-of-chiapa-de-corzo-00399) |
| 엘 칼라오 카니발 | 베네수엘라 · 엘 칼라오 | 2016 | [3644022](https://www.geonames.org/3644022/) · -61.82684, 7.34706 | [UNESCO](https://ich.unesco.org/en/RL/carnival-of-el-callao-a-festive-representation-of-a-memory-and-cultural-identity-01198) |
| 코일루리티 주님 성지 순례 | 페루 · 코일루리티 성지 일대 | 2011 | [12212526](https://www.geonames.org/12212526/) · -71.87831, -14.28603 | [UNESCO](https://ich.unesco.org/en/RL/pilgrimage-to-the-sanctuary-of-the-lord-of-qoyllurriti-00567) |
| 오루로 카니발 | 볼리비아 · 오루로 | 2008 | [3909234](https://www.geonames.org/3909234/) · -67.09320, -17.97153 | [UNESCO](https://ich.unesco.org/en/RL/carnival-of-oruro-00003) |

점은 축제·의례의 전 지역 범위나 이동 경로가 아니다. 나담은 몽골 전역에서 열리는 종목이므로 대표 도시 울란바토르를 표시했다. 지옹 축제는 푸동·속 두 사원 축제를 포함하지만 푸동을 한 대표 점으로 표시했다. 코일루리티 순례의 좌표 역시 성지 일대의 지명 점이다. 이는 지도용 대표점이며 실제 활동 공간을 모두 포괄하지 않는다. 망갈 쇼바자트라는 UNESCO가 명시한 다카 대학교를 표시했다.

등재 연도 자료는 이 표에 실린 15개 종목의 등재 연도를 센 값이다. 2008년 6개, 2009년 1개, 2010년 3개, 2011년 1개, 2014년 1개, 2016년 3개이며, 2008–2016 사이 표본에 없는 연도는 0이다. 표본 선정에 따라 값이 바뀌므로 UNESCO 전체 목록의 연도별 건수로 읽어서는 안 된다.

## 문화 다양성 보존 사례: 지중해 식생활

기존 출처 ID `unesco-mediterranean-diet`에 연결된 [UNESCO 지중해 식생활 공식 페이지](https://ich.unesco.org/en/RL/mediterranean-diet-00884)는 2013년에 공동 등재된 참여국을 키프로스, 크로아티아, 스페인, 그리스, 이탈리아, 모로코, 포르투갈로 제시한다. `mediterranean-diet-countries-map.json`은 이 일곱 국가에 1을 표시하고 기존 기준 경계의 나머지 ISO3에는 0을 둔다. `mediterranean-diet-country-table.json`은 동일한 국가 목록을 이름과 코드로 열거한다. 이는 다국적 공동 등재 사례이지 각 국가의 식생활이 단일하거나 균일하다는 뜻은 아니다.

## 원 사이트 값 대조

FAOSTAT 수치는 원본 ZIP의 2023년 품목 행과 `Grand Total`을 다시 읽어 출력 파일 값과 맞췄다. 대조표는 파일마다 최소 세 값을 기록한다. 괄호의 분자·분모는 원자료 kcal/capita/day이며 출력은 계산식으로 얻은 비중이다.

| 출력 파일 | 원자료 항목·비교 코드 | 원 사이트 값과 계산 | 출력값 | 원 사이트 |
|---|---|---:|---:|---|
| `staple-rice-share-map.json` | 방글라데시 BGD · 쌀 / 전체 | 1,671.56 / 2,603.66 × 100 | 64.20% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-rice-share-map.json` | 대한민국 KOR · 쌀 / 전체 | 575.72 / 3,412.06 × 100 | 16.87% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-rice-share-map.json` | 인도 IND · 쌀 / 전체 | 674.73 / 2,663.21 × 100 | 25.34% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-wheat-share-map.json` | 대한민국 KOR · 밀 / 전체 | 409.36 / 3,412.06 × 100 | 12.00% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-wheat-share-map.json` | 인도 IND · 밀 / 전체 | 594.27 / 2,663.21 × 100 | 22.31% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-wheat-share-map.json` | 이탈리아 ITA · 밀 / 전체 | 955.56 / 3,767.01 × 100 | 25.37% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-maize-share-map.json` | 방글라데시 BGD · 옥수수 / 전체 | 6.42 / 2,603.66 × 100 | 0.25% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-maize-share-map.json` | 멕시코 MEX · 옥수수 / 전체 | 1,032.45 / 3,260.73 × 100 | 31.66% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-maize-share-map.json` | 미국 USA · 옥수수 / 전체 | 80.78 / 3,931.99 × 100 | 2.05% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-share-comparison.json` | 방글라데시 BGD · 쌀 비중 | 1,671.56 / 2,603.66 × 100 | 64.20% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-share-comparison.json` | 멕시코 MEX · 옥수수 비중 | 1,032.45 / 3,260.73 × 100 | 31.66% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `staple-share-comparison.json` | 이탈리아 ITA · 밀 비중 | 955.56 / 3,767.01 × 100 | 25.37% | [FAOSTAT 원본](https://bulks-faostat.fao.org/production/FoodBalanceSheets_E_All_Data_(Normalized).zip) |
| `festival-rituals-points.geojson` | 강릉단오제 · 강릉 GeoNames 1843137 | 경도 128.87239, 위도 37.75266 | `[128.87239, 37.75266]` | [GeoNames](https://www.geonames.org/1843137/gangneung.html), [UNESCO 등재 2008](https://ich.unesco.org/en/RL/gangneung-danoje-festival-00114) |
| `festival-rituals-points.geojson` | 종묘제례 · 종묘 GeoNames 6800593 | 경도 126.99387, 위도 37.57492 | `[126.99387, 37.57492]` | [GeoNames](https://www.geonames.org/6800593/), [UNESCO 등재 2008](https://ich.unesco.org/en/RL/cultural-space-of-jemaa-el-fna-square-00016) |
| `festival-rituals-points.geojson` | 망갈 쇼바자트라 · 다카 대학교 GeoNames 8985943 | 경도 90.39250, 위도 23.73155 | `[90.3925, 23.73155]` | [GeoNames](https://www.geonames.org/8985943/university-of-dhaka.html), [UNESCO 등재 2016](https://ich.unesco.org/en/RL/mangal-shobhajatra-on-pahela-baishakh-01091) |
| `festival-inscribed-years.json` | 수록 표본 중 2008년 등재 종목 | 강릉단오제·종묘제례·라밀라·파툼·빈슈 카니발·오루로 카니발 | 6개 | [UNESCO 공식 항목 링크는 위 15종목 표 참조](https://ich.unesco.org/en/lists) |
| `festival-inscribed-years.json` | 수록 표본 중 2010년 등재 종목 | 지옹 축제·나담·파라치코스 | 3개 | [UNESCO 공식 항목 링크는 위 15종목 표 참조](https://ich.unesco.org/en/lists) |
| `festival-inscribed-years.json` | 수록 표본 중 2016년 등재 종목 | 망갈 쇼바자트라·아르군구 축제·엘 칼라오 카니발 | 3개 | [UNESCO 공식 항목 링크는 위 15종목 표 참조](https://ich.unesco.org/en/lists) |
| `mediterranean-diet-countries-map.json` | 키프로스 CYP | 지중해 식생활 공동 등재국 | 1 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |
| `mediterranean-diet-countries-map.json` | 모로코 MAR | 지중해 식생활 공동 등재국 | 1 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |
| `mediterranean-diet-countries-map.json` | 미국 USA | 공동 등재국 목록에 없음 | 0 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |
| `mediterranean-diet-country-table.json` | 키프로스 CYP | 공동 등재국 목록에 포함 | 2013 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |
| `mediterranean-diet-country-table.json` | 크로아티아 HRV | 공동 등재국 목록에 포함 | 2013 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |
| `mediterranean-diet-country-table.json` | 포르투갈 PRT | 공동 등재국 목록에 포함 | 2013 | [UNESCO 항목](https://ich.unesco.org/en/RL/mediterranean-diet-00884) |

## 한계

- FAOSTAT 값은 2023년 식품 공급 열량 기준이다. 국가의 실제 식사 구성이나 전통을 그대로 수치화하지 않는다. 작물 및 제품 범주는 여러 형태의 식품을 합산한다.
- 지도에는 ISO3–M49가 연결된 기존 국가 코드만 들어가며, 각 품목 관측이 없거나 분모가 없는 경우 `null`이다. 이 결과로 관측 국가와 미관측 국가 사이의 차이를 단정하지 않는다.
- 축제 점은 대표 지명 좌표이지 행사장 경계가 아니다. 다수 장소나 전국 범위를 대표점 하나로 표시한 종목에는 위에 설명한 공간적 한계가 있다.
- UNESCO 점의 `category`는 지리적 대륙 기준이다. UNESCO의 공식 등재 범주, 문화권, 종목의 기원 분류가 아니다.
- 지중해 식생활 목록은 다국적 공동 등재 국가를 나타낸다. 실제 실천의 분포, 각국 주민의 참여도 또는 문화 보존 성과를 측정하지 않는다.
- 원자료 기관은 자료를 갱신하거나 정정할 수 있다. 현재 출력의 수집일은 2026-11-26이며 재생성 시 값이 달라질 수 있다.

## 출력 파일 크기

| 파일 | 크기 |
|---|---:|
| `staple-rice-share-map.json` | 3,126 bytes |
| `staple-wheat-share-map.json` | 3,172 bytes |
| `staple-maize-share-map.json` | 3,098 bytes |
| `staple-share-comparison.json` | 3,275 bytes |
| `festival-rituals-points.geojson` | 3,012 bytes |
| `festival-inscribed-years.json` | 535 bytes |
| `mediterranean-diet-countries-map.json` | 2,567 bytes |
| `mediterranean-diet-country-table.json` | 666 bytes |
