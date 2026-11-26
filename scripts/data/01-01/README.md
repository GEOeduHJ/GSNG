# 01-01 실제 자료 출처 및 가공 보고서

수집일은 2026-11-26이다. 원자료는 임시 폴더에서 내려받아 처리했으며 저장소에는 웹에서 바로 읽을 수 있는 정적 GeoJSON/JSON만 두었다. 각 출력은 1MB 미만이다. 재생성 스크립트는 `scripts/data/01-01/`에 있다.

## 출처와 이용 조건

| 출력 | 원자료·기관 | 이용 조건 | 가공 내용 |
|---|---|---|---|
| `../base/countries-110m.geojson` | [Natural Earth 1:110m Admin 0 Countries](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson) | [Public domain](https://www.naturalearthdata.com/about/terms-of-use/) | `iso_a3`, `name`, `name_ko`와 원래 경계를 유지하고 좌표를 소수점 둘째 자리까지 반올림했다. |
| `trade-share-*.json`, `internet-use-*.json` | [World Development Indicators](https://datacatalog.worldbank.org/infrastructure-data/search/dataset/0037712/world-development-indicators), [무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025), [인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | World Bank API 응답을 국가별 최신 비교 연도와 고정 국가 시계열로 변환했다. 각 지표의 API URL은 `world_bank.py`에 있다. |
| `region-*-series.json` | [Eurostat `tgs00111`](https://ec.europa.eu/eurostat/databrowser/view/tgs00111/default/table?lang=en) | [Eurostat 재사용 정책](https://ec.europa.eu/eurostat/help/copyright-notice)상 별도 제한이 없는 통계 데이터는 출처 표시 후 재사용 가능 | NUTS2 지역, 연간(`A`), 거주지 합계(`TOTAL`), 건수(`NR`), 숙박시설 업종 `I551-I553`, 2014–2025년을 요청했다. |
| `region-*-point.geojson` | [Eurostat GISCO NUTS 2021 GeoJSON](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) | [GISCO 이용 조건](https://ec.europa.eu/eurostat/web/gisco/geodata/statistical-units): 비상업적 이용만 허용, 출처 표시 및 행정 경계에 대한 © EuroGeographics 표시 필요 | 각 지역의 가장 큰 폴리곤 중심점을 WGS84로 계산했다. 점은 도시나 관광 명소의 위치가 아니다. |
| `apparel-trade.json` | [U.S. Census Bureau 2025년 12월 HS 수입 자료 ZIP](https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP) | [Data.gov 자료 카탈로그](https://catalog.data.gov/dataset/beta-time-series-international-trade-monthly-u-s-imports-by-harmonized-system-hs-code)에 표시된 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | HS 61·62, 2025년 12월, `gen_val_yr` 연초누계 일반수입액을 원산지 국가별로 합산했다. 상위 10개와 대한민국을 포함한다. |

World Bank API는 지도 지표 값을 제공하고, World Bank의 국가 목록 API를 ISO3 표기에만 사용했다. 미국 Census 파일의 국가명은 원자료대로 두고 ISO3는 World Bank 국가 목록과 고정 별칭을 이용해 부여했다.

## 절 1 지표 선택과 결측 처리

- 무역 비중(`NE.TRD.GNFS.ZS`)과 인터넷 이용률(`IT.NET.USER.ZS`)은 두 지표 모두 국가 및 연도 간 비교가 가능하고 World Bank WDI가 CC BY 4.0으로 배포되어 선택했다.
- 지도는 2016년 이후 연도 중 국가 관측이 217개 코드의 80% 이상인 가장 최근 연도를 쓴다. 무역 비중은 2023년 176/217개국(81.1%), 인터넷 이용률은 2024년 182/217개국(83.9%)이다.
- 그래프는 1990–2025년 세계(WLD), 대한민국(KOR), 미국(USA), 중국(CHN), 독일(DEU), 방글라데시(BGD), 인도(IND)를 포함한다. 원자료에 값이 없는 연도·국가는 `null`로 두었고 보간하지 않았다. 지도 값도 해당 연도의 결측 국가를 `null`로 보존한다.

## 절 2 사례 지역 후보

### 카나리아 제도 (NUTS2 ES70)

관광 숙박일수가 큰 섬 지역이며 관광의 경제적 이익과 환경·주민 수용성 문제를 함께 다룰 수 있다. 카나리아 제도 정부의 [2024 관광 지속가능성 보고서](https://www.gobiernodecanarias.org/cmsgob2/export/sites/turismo/downloads/Canary-Islands-Tourism-Sustainability-2024.pdf)는 관광객·지출 증가와 지속가능성 과제를 보고한다. [2024년 관광 지속가능성 법령](https://www.gobiernodecanarias.org/boc/2024/123/001.html)은 지역 공급망과 관광 영향 관리 등 지역 대응의 근거가 된다.

### 남티롤 / 볼차노 자치주 (NUTS2 ITH1)

관광 숙박 규모의 변화를 따라가면서 지역의 수용량 관리 방식을 비교할 수 있다. 볼차노 자치주는 [관광지역 침상 수 상한(베텐컨틴젠티에룽) 규정](https://giunta-provinciale.provincia.bz.it/it/news/posti-letto-nelle-zone-turistiche-via-libera-al-nuovo-regolamento)을 의결해 숙박 수용량을 관리하고 있다. 두 지역 모두 세계 관광 흐름과 지역의 대응을 토론하는 후보이며, 수업에서 사용할 최종 지역은 담당자가 선택한다.

통계는 지역별 연간 관광 숙박시설 숙박일수이며 국제 관광객만을 뜻하지 않는다. 총계에는 국내·외 방문자와 `I551-I553` 업종이 포함된다. 경계와 대표점은 NUTS 2021 기준이다. GISCO 점 파일은 비상업적 이용 조건을 지켜야 한다.

위 후보를 세계화에 대한 지역 대응 사례로 쓰자는 연결은 통계와 정책자료를 결합한 교육적 해석이며, 기관의 공식 분류를 뜻하지 않는다.

## 절 3 의류 무역 자료

`apparel-trade.json`은 세계 의류 수출 순위가 아니다. 미국 Census의 **미국 일반수입액**을 원산지 국가 기준으로 집계한 자료다. HS 61(편물 의류)과 HS 62(비편물 의류)의 10자리 품목 레코드를 묶었고, 2025년 12월 레코드의 연초누계 일반수입액(`gen_val_yr`, USD)을 합산했다. 상위 10개 원산지는 베트남, 중국, 방글라데시, 인도, 캄보디아, 인도네시아, 멕시코, 파키스탄, 이탈리아, 온두라스이며 대한민국 값도 별도로 포함했다. 이 범위를 청문회에서 공급망의 한 사례로 읽고, 세계 전체 무역으로 확대 해석하지 않아야 한다.

## 원 사이트 값 대조

다음 값은 정적 파일을 만든 뒤 원 사이트 API 또는 원본 배포 파일을 다시 열어 대조했다. 수치 지표는 원자료와 출력값이 정확히 일치한다. 경계 파일은 소수점 둘째 자리 반올림 후 일치하는 좌표를 확인했다. GeoJSON 점 파일은 한 개 점만 있으므로 NUTS 코드와 경도·위도 세 항목을 원 경계에서 재계산해 확인했다.

| 정적 파일 | 지역·국가 / 연도 | 원 사이트 확인값 | 원 사이트 확인 URL |
|---|---|---:|---|
| `../base/countries-110m.geojson` | 미국(USA), 첫 좌표 | `[-122.84, 49.00]` | [Natural Earth 원본](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson) |
| `../base/countries-110m.geojson` | 오스트레일리아(AUS), 첫 좌표 | `[147.69, -40.81]` | [Natural Earth 원본](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson) |
| `../base/countries-110m.geojson` | 중국(CHN), 첫 좌표 | `[109.48, 18.20]` | [Natural Earth 원본](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson) |
| `trade-share-map.json` | 대한민국(KOR), 2023 | 82.2580090716629 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `trade-share-map.json` | 미국(USA), 2023 | 24.9292981752847 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `trade-share-map.json` | 중국(CHN), 2023 | 36.7391496938394 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `trade-share-series.json` | 세계(WLD), 1990 | 38.101240266057 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `trade-share-series.json` | 대한민국(KOR), 2000 | 64.0588155729056 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `trade-share-series.json` | 중국(CHN), 2024 | 37.9560601372544 % GDP | [WDI 무역 비중 API](https://api.worldbank.org/v2/country/all/indicator/NE.TRD.GNFS.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-map.json` | 대한민국(KOR), 2024 | 97.89563777% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-map.json` | 미국(USA), 2024 | 94.69380188% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-map.json` | 중국(CHN), 2024 | 92% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-series.json` | 미국(USA), 1995 | 9.24% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-series.json` | 대한민국(KOR), 2000 | 44.7% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `internet-use-series.json` | 중국(CHN), 2024 | 92% | [WDI 인터넷 이용률 API](https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=20000&date=1990:2025) |
| `region-canary-islands-series.json` | 카나리아 제도(ES70), 2014 | 94,304,512박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ES70&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-canary-islands-series.json` | 카나리아 제도(ES70), 2020 | 29,139,353박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ES70&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-canary-islands-series.json` | 카나리아 제도(ES70), 2025 | 102,327,699박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ES70&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-south-tyrol-series.json` | 남티롤(ITH1), 2014 | 28,428,922박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ITH1&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-south-tyrol-series.json` | 남티롤(ITH1), 2020 | 21,703,816박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ITH1&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-south-tyrol-series.json` | 남티롤(ITH1), 2025 | 38,239,379박 | [Eurostat API](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tgs00111?geo=ITH1&freq=A&c_resid=TOTAL&unit=NR&nace_r2=I551-I553&sinceTimePeriod=2014&untilTimePeriod=2025&lang=en) |
| `region-canary-islands-point.geojson` | ES70 경계, 2021판 | NUTS ID `ES70` | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `region-canary-islands-point.geojson` | ES70 경도 | -16.556723° | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `region-canary-islands-point.geojson` | ES70 위도 | 28.290777° | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `region-south-tyrol-point.geojson` | ITH1 경계, 2021판 | NUTS ID `ITH1` | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `region-south-tyrol-point.geojson` | ITH1 경도 | 11.416178° | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `region-south-tyrol-point.geojson` | ITH1 위도 | 46.696248° | [GISCO NUTS 2021 경계](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_01M_2021_4326_LEVL_2.geojson) |
| `apparel-trade.json` | 베트남(VNM), 2025 | 16,485,297,834 USD | [Census 원본 연말 자료 ZIP](https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP) |
| `apparel-trade.json` | 중국(CHN), 2025 | 11,150,029,858 USD | [Census 원본 연말 자료 ZIP](https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP) |
| `apparel-trade.json` | 방글라데시(BGD), 2025 | 7,875,610,285 USD | [Census 원본 연말 자료 ZIP](https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP) |
| `apparel-trade.json` | 대한민국(KOR), 2025 | 166,422,526 USD | [Census 원본 연말 자료 ZIP](https://www.census.gov/trade/downloads/2025/Merch/im_m/IMDB2512.ZIP) |

의류 값은 원본 ZIP 안의 `IMP_DETL.txt`에서 국가코드(`cty_code`), HS 코드, 연도·월, 연초누계 일반수입액(`gen_val_yr`) 필드 위치를 원본 `Documentation/IMP_DETL.lay`와 대조했다. 베트남, 중국, 방글라데시 값은 각각 2025년 12월 HS 61·62 레코드 합계와 출력이 일치하는 것을 재집계해 확인했다. 대한민국 값은 166,422,526 USD다.

## 경계 표현 및 주의점

- Natural Earth 원본에 있는 분쟁 경계를 이동하거나 새로 그리지 않았다. 1:110m 축척의 원 경계 표현을 그대로 사용한다.
- 원본의 `Northern Cyprus`(북키프로스)는 별도 폴리곤으로 남으며 ISO3 속성은 `null`이다. Natural Earth가 `ISO_A3=-99`로 두고 enhanced ISO 코드도 해당 별도 feature의 admin 코드와 같지 않아 임의 ISO3를 부여하지 않았다.
- 골란 고원과 카슈미르는 이 파일에서 독립적인 Admin 0 feature로 분리되지 않는다. 시리아·이스라엘 및 인도·파키스탄·중국의 Natural Earth 원래 경계가 가공 없이 유지되며, 해당 선을 이 자료로 최종 주권 판정하는 용도로 쓰면 안 된다.
- Natural Earth 원본에서 ISO3가 지정되지 않은 feature는 북키프로스, 소말릴란드, 코소보 3개이며, 경계는 있으나 `iso_a3`는 `null`이다.
- 인터넷 이용률은 ‘인터넷을 이용하는 인구 비율’이지 연결 품질이나 접근권의 균등성을 나타내지 않는다. 무역 비중은 재화와 서비스의 수출·수입을 GDP에 견준 국가 지표다.
- WDI 및 Eurostat는 이후 수정될 수 있다. 재생성 시 같은 API 요청도 갱신된 값을 반환할 수 있다. 이번 파일의 `retrievedAt`은 2026-11-26이다.
- GISCO의 두 대표점은 지도 배치용이다. 비상업적 이용과 저작자표시가 필요한 GISCO 경계에서 계산했다.

## 파일 크기

| 파일 | 크기 |
|---|---:|
| `../base/countries-110m.geojson` | 179,082 bytes |
| `trade-share-map.json` | 5,825 bytes |
| `trade-share-series.json` | 7,523 bytes |
| `internet-use-map.json` | 4,922 bytes |
| `internet-use-series.json` | 5,461 bytes |
| `region-canary-islands-series.json` | 528 bytes |
| `region-canary-islands-point.geojson` | 384 bytes |
| `region-south-tyrol-series.json` | 552 bytes |
| `region-south-tyrol-point.geojson` | 410 bytes |
| `apparel-trade.json` | 1,088 bytes |

모든 JSON/GeoJSON이 1MB 미만임을 생성 후 확인했다.
