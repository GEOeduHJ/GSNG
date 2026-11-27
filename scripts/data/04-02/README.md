# 04-02 세계의 주요 환경 문제 — 실제 자료

수집일은 2026-11-27이다. 원자료는 각 스크립트가 메모리에서 가져오며 저장소에는 웹에서 읽는 JSON만 둔다. 산출물은 모두 1,000,000 bytes 이하이고, 재생성에는 Python 3 표준 라이브러리만 필요하다.

## 산출물

| 파일 | 화면 형식 | 기간·기준 | 크기 |
| --- | --- | --- | ---: |
| `global-temperature-anomaly-1850-2025.json` | 선그래프 | 1850–2025 | 2,722 bytes |
| `forest-area-selected-countries-1990-2024.json` | 선그래프 | 브라질·인도네시아·콩고민주공화국·중국·인도·대한민국, 1990–2024 | 4,042 bytes |
| `pm25-annual-exposure-map-2023.json` | 단계 구분도 | 2023 | 3,953 bytes |
| `co2-per-capita-map-2024.json` | 단계 구분도 | 2024 | 2,804 bytes |
| `cumulative-co2-top10-1850-2024.json` | 막대그래프 | 누적, 1850–2024 | 574 bytes |
| `south-korea-ghg-1990-2024.json` | 선그래프 | 대한민국, 1990–2024 | 601 bytes |
| `renewable-energy-consumption-map-2021.json` | 단계 구분도 | 2021 | 1,906 bytes |

## 출처와 이용 조건

- **전 지구 기온:** [NOAA NCEI NOAAGlobalTemp](https://www.ncei.noaa.gov/products/land-based-station/noaa-global-temp) v6.1.0의 전 지구 육지·해양 연평균 시계열을 썼다. 값과 단위는 [원자료 ASCII 파일](https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/access/timeseries/aravg.ann.land_ocean.90S.90N.v6.1.0.202610.asc)과 [형식 설명](https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/access/timeseries/00_Readme_timeseries.txt)을 따른다. 편차 기준은 1991–2020년이다. NOAA NCEI의 [공개 데이터 정책](https://www.ncei.noaa.gov/sites/default/files/2023-12/NCEI%20PD-10-2-02%20-%20Open%20Data%20Policy%20Signed.pdf)은 공개 가능한 NOAA 연방 환경 자료를 미국 내 공공 도메인으로 둔다. 2026년은 진행 중인 해라 제외하고 완결된 2025년까지 사용했다.
- **산림 면적 비율:** [World Bank WDI](https://data.worldbank.org/indicator/AG.LND.FRST.ZS), 지표 `AG.LND.FRST.ZS`다. 원 지표 페이지는 출처를 FAOSTAT/FAO, 라이선스를 CC BY 4.0으로 표시한다. 전체 국가 지도 대신 1990년과 2024년 값이 모두 있는 주요 6개국의 비율 시계열을 만들었다. 비율이므로 산림 면적의 실제 km²나 산림의 생태적 질을 직접 나타내지 않는다.
- **PM2.5 노출:** [World Bank WDI](https://data.worldbank.org/indicator/EN.ATM.PM25.MC.M3), 지표 `EN.ATM.PM25.MC.M3`다. 지표 페이지는 원 출처가 IHME의 GBD 2023 대기오염 노출 추정치이며 World Bank 표시 라이선스가 CC BY 4.0임을 밝힌다. 최신 비교 연도는 2023년이다. 이는 국가별 연평균 노출 추정치이지 개인 측정값이나 특정 도시의 관측값이 아니다.
- **1인당·누적 CO₂:** [Global Carbon Budget (2026)](https://zenodo.org/records/23667912) 화석 CO₂ 자료를 바탕으로 한 Our World in Data의 [1인당 배출량](https://ourworldindata.org/grapher/co-emissions-per-capita)과 [연간 배출량 CSV](https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv?v=1&csvType=full&useColumnShortNames=false)를 사용했다. GCP Zenodo 기록은 CC BY 4.0이며 OWID 차트의 자료도 CC BY로 제공된다. 1인당 지도와 누적 막대는 2024년을 공통 끝 연도로 맞췄다. 막대는 연간 영토 기준 CO₂를 1850–2024년 합산하고 Gt로 변환했다. 두 자료는 화석연료·산업 CO₂이며 토지이용 변화 배출, 수입품에 포함된 배출, 개별 국가의 국제 항공·해운 배출은 포함하지 않는다.
- **대한민국 온실가스:** Our World in Data의 [연간 온실가스 자료](https://ourworldindata.org/grapher/total-ghg-emissions)는 Jones et al.의 [National Contributions to Climate Change](https://zenodo.org/records/16640595)를 가공한 자료다. Zenodo 원자료와 OWID 자료 페이지는 CC BY 4.0 조건을 표시한다. CO₂·CH₄·N₂O와 토지이용을 포함하며, OWID는 CH₄와 N₂O의 온난화 기여를 GWP* 방식으로 CO₂e 환산한다. 따라서 대한민국 공식 국가 인벤토리의 총배출량과 동일한 산정 계열로 보아서는 안 된다.
- **재생에너지 비중:** [World Bank WDI](https://data.worldbank.org/indicator/EG.FEC.RNEW.ZS), 지표 `EG.FEC.RNEW.ZS`다. 원 지표 페이지는 IEA Energy Statistics와 CC BY 4.0을 표시한다. 2022년은 WDI API에서 71개 국가·경제 값만 확인됐고, 2021년은 212개 값이 있어 지도는 2021년으로 고정했다. 국가 에너지 소비 구조 지표이며 개별 가정의 실천량은 아니다.

World Bank 값은 지정된 지표의 WDI API에서 가져왔다. 단계 구분도는 공통 Natural Earth 경계인 `public/data/base/countries-110m.geojson`의 ISO3 코드와 연결한다. 이 작업에서 새 경계를 만들거나 경계 파일을 수정하지 않았다. 지도 파일의 `null`은 해당 연도 원자료가 없음을 뜻한다.

## 표본값 원자료 대조

출력마다 세 값을 골라 제공기관의 API·데이터 파일에서 다시 대조했다. 누적 CO₂는 연간 원자료의 1850–2024년 값을 합산한 결과다.

| 산출 파일 | 항목 | 값 | 원 사이트 확인 |
| --- | --- | ---: | --- |
| `global-temperature-anomaly-1850-2025.json` | 1880년 편차 | −0.794531°C | [NOAA ASCII 원자료](https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/access/timeseries/aravg.ann.land_ocean.90S.90N.v6.1.0.202610.asc) |
|  | 2024년 편차 | +0.646117°C | [NOAA ASCII 원자료](https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/access/timeseries/aravg.ann.land_ocean.90S.90N.v6.1.0.202610.asc) |
|  | 2025년 편차 | +0.511191°C | [NOAA ASCII 원자료](https://www.ncei.noaa.gov/data/noaa-global-surface-temperature/v6.1/access/timeseries/aravg.ann.land_ocean.90S.90N.v6.1.0.202610.asc) |
| `forest-area-selected-countries-1990-2024.json` | 브라질, 1990 | 73.992929% | [World Bank API](https://api.worldbank.org/v2/country/BRA/indicator/AG.LND.FRST.ZS?format=json&date=1990) |
|  | 브라질, 2024 | 58.546841% | [World Bank API](https://api.worldbank.org/v2/country/BRA/indicator/AG.LND.FRST.ZS?format=json&date=2024) |
|  | 중국, 2024 | 24.023962% | [World Bank API](https://api.worldbank.org/v2/country/CHN/indicator/AG.LND.FRST.ZS?format=json&date=2024) |
| `pm25-annual-exposure-map-2023.json` | 인도, 2023 | 54.052224µg/m³ | [World Bank API](https://api.worldbank.org/v2/country/IND/indicator/EN.ATM.PM25.MC.M3?format=json&date=2023) |
|  | 대한민국, 2023 | 21.894023µg/m³ | [World Bank API](https://api.worldbank.org/v2/country/KOR/indicator/EN.ATM.PM25.MC.M3?format=json&date=2023) |
|  | 미국, 2023 | 6.968045µg/m³ | [World Bank API](https://api.worldbank.org/v2/country/USA/indicator/EN.ATM.PM25.MC.M3?format=json&date=2023) |
| `co2-per-capita-map-2024.json` | 미국, 2024 | 14.219290t/person | [OWID CSV](https://ourworldindata.org/grapher/co-emissions-per-capita.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 중국, 2024 | 8.737350t/person | [OWID CSV](https://ourworldindata.org/grapher/co-emissions-per-capita.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 대한민국, 2024 | 11.307050t/person | [OWID CSV](https://ourworldindata.org/grapher/co-emissions-per-capita.csv?v=1&csvType=full&useColumnShortNames=false) |
| `cumulative-co2-top10-1850-2024.json` | 미국, 1850–2024 합계 | 434.137126Gt | [OWID 연간 CO₂ CSV](https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 중국, 1850–2024 합계 | 286.062901Gt | [OWID 연간 CO₂ CSV](https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 러시아, 1850–2024 합계 | 121.806914Gt | [OWID 연간 CO₂ CSV](https://ourworldindata.org/grapher/annual-co2-emissions-per-country.csv?v=1&csvType=full&useColumnShortNames=false) |
| `south-korea-ghg-1990-2024.json` | 대한민국, 1990 | 288.630750Mt CO₂e | [OWID GHG CSV](https://ourworldindata.org/grapher/total-ghg-emissions.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 대한민국, 2018 | 709.059000Mt CO₂e | [OWID GHG CSV](https://ourworldindata.org/grapher/total-ghg-emissions.csv?v=1&csvType=full&useColumnShortNames=false) |
|  | 대한민국, 2024 | 630.566500Mt CO₂e | [OWID GHG CSV](https://ourworldindata.org/grapher/total-ghg-emissions.csv?v=1&csvType=full&useColumnShortNames=false) |
| `renewable-energy-consumption-map-2021.json` | 대한민국, 2021 | 3.6% | [World Bank API](https://api.worldbank.org/v2/country/KOR/indicator/EG.FEC.RNEW.ZS?format=json&date=2021) |
|  | 브라질, 2021 | 46.5% | [World Bank API](https://api.worldbank.org/v2/country/BRA/indicator/EG.FEC.RNEW.ZS?format=json&date=2021) |
|  | 미국, 2021 | 10.9% | [World Bank API](https://api.worldbank.org/v2/country/USA/indicator/EG.FEC.RNEW.ZS?format=json&date=2021) |

## 가공·경계·결측 처리

- **기온:** 원자료의 첫째 열(연도)과 둘째 열(기온 편차 K)을 사용했다. 온도 편차는 K와 °C에서 수치가 같으므로 값은 바꾸지 않고 화면 단위를 °C로 표시한다. 불확실성 분산 열은 그래프에 넣지 않았다. 2026년 값은 진행 중인 연도라 산출물에서 제외했다.
- **산림:** 면적 비율(`% of land area`)을 사용해 1990–2024년 주요 6개국 추이를 비교한다. 국가별 값이 없는 연도는 `null`로 남기며 선형 보간하지 않는다. 이 값은 산림의 질이나 원시림·조림 면적 구성을 설명하지 않는다.
- **PM2.5:** World Bank 지표의 2023년 값을 기존 경계 ISO3 코드로 연결했다. 지도 경계 174개 중 168개에 값이 있고 나머지는 `null`이다. 국가 평균 노출을 도시 대기질 또는 개인 노출로 바꾸어 해석하지 않는다.
- **재생에너지:** 2021년 비교 지도는 기존 경계 174개 중 169개에 값이 있다. 2022년의 국가·경제 값이 71개에 그쳐 더 넓은 범위의 2021년을 선택했다. 이 비중만으로 재생에너지 공급의 지속가능성이나 개인 실천을 판단하지 않는다.
- **1인당 CO₂:** 생산지 기준(territorial) 화석연료·산업 CO₂를 인구로 나눈 OWID 자료다. 2024년 값은 지도 경계 174개 중 169개에 있으며 나머지는 `null`이다. 수입품에 내재한 배출은 소비 기반 책임 자료와 다르게 분류된다.
- **누적 CO₂:** 연간 CO₂ 원자료 중 ISO3 코드가 있는 국가를 골라 1850–2024년에 합산하고, 결측 연도는 추정하지 않은 채 1,000,000,000으로 나누어 Gt로 바꾼 뒤 상위 10개를 표시했다. OWID/GCP의 국가·연도 귀속을 그대로 따르고 연구자가 과거 국경이나 전임 국가 배출량을 재배분하지 않았다. 토지이용 변화와 국제 항공·해운 배출은 포함하지 않는다.
- **대한민국 온실가스:** Jones et al./OWID의 대한민국 행 중 1990–2024년을 뽑고 tonnes를 Mt로 바꾸었다. 원자료 결측은 `null`로 남긴다. 이 자료의 GWP* 산정은 공식 국가 인벤토리의 산정 결과와 다를 수 있다.
- **지도 경계와 이름:** 지도 산출 파일에는 국가명 대신 ISO3 값만 기록한다. 국가 경계는 기존 Natural Earth 파일만 사용했다. 이 자료들은 사건 피해나 분쟁 현황을 표현하지 않으며, 지명·경계 레이어를 새로 만들지 않았다.

## 절별 추천 자료 단계

| 절 | 자료 단계 | 파일과 학습 초점 |
| --- | --- | --- |
| 1. 세계의 주요 환경 문제에는 무엇이 있을까? | 1단계 | `global-temperature-anomaly-1850-2025.json`: 기준 기간 대비 전 지구 기온 편차가 장기적으로 어떻게 달라졌는지 읽는다. |
|  | 2단계 | `forest-area-selected-countries-1990-2024.json`: 산림 비율의 국가별 장기 변화 방향과 크기를 비교한다. |
|  | 3단계 | `pm25-annual-exposure-map-2023.json`: 대기오염 노출의 국가 간 차이와 자료의 공간적 한계를 확인한다. |
| 2. 환경 문제를 왜 쉽게 해결하지 못할까? | 1단계 | `co2-per-capita-map-2024.json`: 최근 배출량을 인구 규모로 나눈 국가 간 차이를 읽는다. |
|  | 2단계 | `cumulative-co2-top10-1850-2024.json`: 누적 총량을 비교하고 현재 1인당 배출량과 책임 지표가 다른 이유를 토론한다. |
| 3. 환경 문제 해결과 생태전환적 삶을 위해서는 어떤 노력이 필요할까? | 1단계 | `south-korea-ghg-1990-2024.json`: 대한민국 배출 추이와 2018년 고점 이후의 변화를 근거로 감축 노력을 평가한다. |
|  | 2단계 | `renewable-energy-consumption-map-2021.json`: 국가 에너지 구조를 비교한 뒤 가정·지역의 에너지 선택과 연결하되 지표가 개인 행동을 직접 측정하지는 않음을 짚는다. |
|  | 다시 보기 | `forest-area-selected-countries-1990-2024.json`와 `co2-per-capita-map-2024.json`: 소비·에너지 선택이 산림 이용과 배출에 연결되는 경로를 근거에 따라 설명한다. |

## 생성 스크립트

- `python3 scripts/data/04-02/noaa_temperature.py`
- `python3 scripts/data/04-02/world_bank.py`
- `python3 scripts/data/04-02/owid_emissions.py`
