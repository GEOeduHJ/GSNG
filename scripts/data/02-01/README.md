# 02-01 세계의 기후와 인간 생활 — 자료 제작 기록

## 범위와 파일

기후 그래프 9개, 도시 위치·쾨펜–가이거 점 지도 1개, 절 4의 국가별 지표 지도 2개를 만들었다. 모든 웹 자료 JSON/GeoJSON은 1MB보다 작다. 원자료 응답과 기후 분류 래스터는 저장소에 넣지 않았다.

| 파일 | 크기 | 형식·내용 |
| --- | ---: | --- |
| `climograph-seoul.json` | 595 B | 서울 기온·강수량 월평년 |
| `climograph-manaus.json` | 611 B | 마나우스 기온·강수량 월평년 |
| `climograph-mumbai.json` | 594 B | 뭄바이 기온·강수량 월평년 |
| `climograph-cairo.json` | 585 B | 카이로 기온·강수량 월평년 |
| `climograph-athens.json` | 594 B | 아테네 기온·강수량 월평년 |
| `climograph-london.json` | 588 B | 런던 기온·강수량 월평년 |
| `climograph-shanghai.json` | 601 B | 상하이 기온·강수량 월평년 |
| `climograph-yakutsk.json` | 598 B | 야쿠츠크 기온·강수량 월평년 |
| `climograph-nuuk.json` | 593 B | 누크 기온·강수량 월평년 |
| `climate-city-points.geojson` | 2,771 B | 도시 9곳의 WGS84 점과 기후형·색 |
| `water-stress-map.json` | 3,674 B | 국가별 물 스트레스, 2022년 |
| `irrigated-land-map.json` | 3,704 B | 국가별 농업용 관개 토지 비율, 2022년 |

## 계산과 처리

### 기후 그래프

- Open-Meteo Historical Weather API에서 ERA5의 일평균 기온(`temperature_2m_mean`)과 일 강수량 합계(`precipitation_sum`)를 요청했다. 모든 도시는 같은 모델, 1991-01-01–2020-12-31 기간, `timezone=auto`, 같은 변수를 사용했다. 다중 좌표 요청 한 번으로 9곳을 받았다.
- 월평균 기온은 해당 월의 일평균 기온을 30년 동안 모두 평균했다. 월 강수량은 각 연도의 해당 월 일 강수량을 합한 뒤 30개 연도 합계의 평균을 냈다. 표시값은 소수점 첫째 자리까지 반올림했다.
- `timezone=auto`로 도시별 시간대를 적용했다. API의 일별 시간 경계는 요청 시점의 UTC 오프셋을 기준으로 하며, 요청 기간 안의 일광 절약 시간 변경은 반영하지 않는다.
- 월에 필요한 일 자료가 하나라도 결측이거나 날짜 수가 기대한 수와 다르면 그 월은 `null`로 둔다. 빠진 날을 보간하거나 다른 자료로 채우지 않는다.
- `lat`·`lon`은 ERA5가 응답한 0.25° 격자점 좌표다. 그래프의 `station`은 해당 도시에 가까운 격자 대표점을 가리킨다. **관측소 관측값이 아니라 재분석 격자 자료로 계산한 값**이다. ERA5는 넓은 격자이므로 도시 내부의 고도·해안·도시열섬 차이를 나타내지 않는다.
- 무료 Open-Meteo API 접속은 비상업 이용 조건을 따른다. API 자료 자체의 표시 조건은 CC BY 4.0이다. 이 추출은 교육·연구 목적이며, API를 다시 호출하는 상업 운영에서는 Open-Meteo의 별도 상업 이용 조건을 확인해야 한다.

출처: [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api), [Open-Meteo 이용 조건·라이선스](https://open-meteo.com/en/license). 문서에 따르면 ERA5는 전 지구 0.25° 재분석으로 1940년부터 제공된다. 위치 좌표는 GeoNames를 바탕으로 한 [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) 결과를 사용했다.

### 도시 점 지도와 기후형

- 도시 좌표는 2026-11-26에 Open-Meteo Geocoding API(GeoNames 기반)에서 확인했다. 점은 `[경도, 위도]` 순서다.
- 기후형은 [GloH2O의 Beck et al. Köppen–Geiger 지도](https://www.gloh2o.org/koppen/)에서 1991–2020 1km TIFF를 내려받아 도시 좌표의 픽셀값을 읽었다. 클래스 코드와 RGB 색은 [동반 범례](https://data.naturalcapitalalliance.stanford.edu/download/global/koppen_geiger_climatezones/legend.txt)를 따랐다. 지도는 CC BY 4.0이며, 저자 논문을 인용한다.
- 예: 서울 좌표의 코드 21은 Dwa, 마나우스의 코드 1은 Af, 누크의 코드 29는 ET다. 좌표·분류 시료는 도시 중심의 대표점 한 곳이며 도시 전체의 미기후를 설명하지 않는다.

Beck, H. E. et al. (2023). “High-resolution (1 km) Köppen-Geiger maps for 1901–2099 based on constrained CMIP6 projections.” *Scientific Data* 10, 724. [논문](https://doi.org/10.1038/s41597-023-02549-6). CC BY 4.0.

### 절 4 국가 지표

- World Bank WDI API에서 2022년 값만 추렸다. WDI의 `ER.H2O.FWST.ZS`는 FAO AQUASTAT의 SDG 6.4.2이고, `AG.LND.IRIG.AG.ZS`는 FAOSTAT 자료다. World Bank 지표 페이지는 두 자료의 라이선스를 CC BY 4.0으로 표시한다. FAO 통계 DB 조건도 적용되므로 FAO를 출처로 표시하고, FAO가 이용을 승인·보증한 것처럼 표현하지 않으며, 상업 기업 홍보와 연결해 사용하지 않는다.
- 물 스트레스 값은 담수 주요 부문 취수량을 환경 유량을 고려한 재생 가능 담수 자원으로 나눈 비율이다. 100%보다 큰 값을 자르지 않았다. 이 비율만으로 특정 가구의 물 접근성이나 물 부족의 원인을 단정할 수 없다.
- 관개 토지 비율은 농업용 토지 중 관개 토지가 차지하는 비율이다. 실제로 그해 사용한 물의 양이나 관개가 기후에 미친 효과를 뜻하지 않는다.
- 두 지도 모두 World Bank 국가·경제 217개를 기준으로 만들고, 해당 연도 값이 없는 국가는 `null`로 뒀다. 2022년 유효 값은 물 스트레스 176개, 관개 토지 63개다. 현재 웹 지도는 저장소에 이미 있는 Natural Earth 1:110m 경계를 쓰므로 해당 경계와 ISO3가 맞지 않는 경제는 지도에 나타나지 않을 수 있다.

출처: [World Bank 물 스트레스 지표](https://data.worldbank.org/indicator/ER.H2O.FWST.ZS), [World Bank 관개 토지 지표](https://data.worldbank.org/indicator/AG.LND.IRIG.AG.ZS), [FAO 물 스트레스 정의](https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/642-water-stress/sdg-6-indicators-of-water-use-efficiency-and-water-stress/), [FAO 통계 DB 이용 조건](https://www.fao.org/contact-us/terms/db-terms-of-use/). FAO DB 자료는 CC BY 4.0을 기본으로 하며, 별도 출처·제3자 조건과 추가 이용 조건을 확인해야 한다.

## 원 사이트 값 대조

각 산출 자료에서 값 3개를 골라 원자료에 다시 대조했다. 기후 그래프의 27개 확인값은 별도의 다중 좌표 API 응답으로 다시 계산해 파일과 일치하는 것을 확인했다.

| 산출 파일 | 확인한 값 3개 | 원 사이트 확인 URL |
| --- | --- | --- |
| `climograph-seoul.json` | 1월 기온 -2.4°C; 8월 기온 26.0°C; 7월 강수량 313.5mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=37.56600&longitude=126.97840&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-manaus.json` | 1월 기온 26.4°C; 8월 기온 27.5°C; 7월 강수량 105.1mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=-3.10194&longitude=-60.02500&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-mumbai.json` | 1월 기온 23.6°C; 8월 기온 26.6°C; 7월 강수량 636.2mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=19.07283&longitude=72.88261&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-cairo.json` | 1월 기온 14.1°C; 8월 기온 29.7°C; 7월 강수량 0.0mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=30.06263&longitude=31.24967&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-athens.json` | 1월 기온 9.4°C; 8월 기온 28.0°C; 7월 강수량 6.3mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=37.98376&longitude=23.72784&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-london.json` | 1월 기온 5.3°C; 8월 기온 17.6°C; 7월 강수량 54.2mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=51.50853&longitude=-0.12574&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-shanghai.json` | 1월 기온 5.1°C; 8월 기온 28.4°C; 7월 강수량 156.6mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=31.22222&longitude=121.45806&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-yakutsk.json` | 1월 기온 -36.9°C; 8월 기온 15.7°C; 7월 강수량 44.6mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=62.03114&longitude=129.72289&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climograph-nuuk.json` | 1월 기온 -12.1°C; 8월 기온 8.0°C; 7월 강수량 61.5mm | [Open-Meteo API](https://archive-api.open-meteo.com/v1/archive?latitude=64.18347&longitude=-51.72157&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_mean%2Cprecipitation_sum&timezone=auto&models=era5) |
| `climate-city-points.geojson` | 서울 `[126.9784, 37.566]`, 21→Dwa, `#AAAFFF`; 마나우스 `[-60.025, -3.10194]`, 1→Af, `#0000FF`; 누크 `[-51.72157, 64.18347]`, 29→ET, `#B2B2B2` | [서울 좌표](https://geocoding-api.open-meteo.com/v1/search?name=Seoul&count=10&language=en&format=json), [마나우스 좌표](https://geocoding-api.open-meteo.com/v1/search?name=Manaus&count=10&language=en&format=json), [누크 좌표](https://geocoding-api.open-meteo.com/v1/search?name=Nuuk&count=10&language=en&format=json), [Beck 분류 TIFF](https://data.naturalcapitalalliance.stanford.edu/download/global/koppen_geiger_climatezones/koppen_geiger_climatezones_1991_2020_1km.tif), [범례](https://data.naturalcapitalalliance.stanford.edu/download/global/koppen_geiger_climatezones/legend.txt) |
| `water-stress-map.json` | 사우디아라비아 974.2%; 이집트 141.2%; 대한민국 85.2% | [World Bank WDI API](https://api.worldbank.org/v2/country/all/indicator/ER.H2O.FWST.ZS?format=json&per_page=20000&date=2022), [지표·라이선스](https://data.worldbank.org/indicator/ER.H2O.FWST.ZS) |
| `irrigated-land-map.json` | 이집트 100.0%; 방글라데시 88.8%; 호주 0.5% | [World Bank WDI API](https://api.worldbank.org/v2/country/all/indicator/AG.LND.IRIG.AG.ZS?format=json&per_page=20000&date=2022), [지표·라이선스](https://data.worldbank.org/indicator/AG.LND.IRIG.AG.ZS) |

## 절별 자료 배치 추천

02-01 본문 파일은 이 자료 작업 범위에 없어, 아래 문단 위치는 실제 문단 번호가 아닌 지시서의 절 질문을 기준으로 한 삽입 제안이다.

| 절·권장 문단 위치 | 자료 단계 추천 |
| --- | --- |
| 1. 세계의 기후는 왜 지역마다 다르게 나타날까? — 첫 문단에서 세계의 기후 분포를 소개할 때, 다음 문단에서 위도와 계절 차이를 비교할 때 | 세계 분포 지도 `climate-city-points.geojson`; 서울·누크·카이로 그래프 `climograph-seoul.json`, `climograph-nuuk.json`, `climograph-cairo.json` |
| 2. 열대 기후 지역 주민들은 어떻게 살아갈까? — 열대 우림의 강수 특성을 설명하는 사례 문단과 몬순 계절 변화를 비교하는 문단 | 마나우스·뭄바이 그래프 `climograph-manaus.json`, `climograph-mumbai.json`; 도시 위치 지도 `climate-city-points.geojson` |
| 3. 온대 기후 지역은 왜 기후가 다양할까? — 온대 기후의 강수 계절성과 대륙·해양 영향을 비교하는 문단 | 아테네·런던·상하이 그래프 `climograph-athens.json`, `climograph-london.json`, `climograph-shanghai.json` |
| 4. 사람들은 불리한 기후를 어떻게 극복할까? — 건조 기후의 제약을 설명한 뒤 물 관리·농업 적응 사례를 다루는 문단 | 카이로 그래프 `climograph-cairo.json`; 물 스트레스 지도 `water-stress-map.json`; 농업용 관개 토지 지도 `irrigated-land-map.json` |

물 스트레스 지도는 물 이용 압력을, 관개 토지 지도는 관개 기반의 공간적 비율을 보여 준다. 이 두 국가 지표는 특정 지역 주민의 실제 적응 행동이나 기후의 인과 효과를 직접 측정하지 않으므로, 본문에서는 공개 통계로 확인할 수 있는 범위를 설명하고 사례 조사와 함께 사용한다.

## 파일 목록

- 스크립트: `scripts/data/02-01/climate_normals.py`, `scripts/data/02-01/climate_adaptation_indicators.py`
- 산출 자료: `public/data/02-01/`
- 메타데이터: `content/manifests/02-01.yaml`
