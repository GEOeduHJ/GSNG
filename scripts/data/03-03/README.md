# 03-03 글로벌 경제 체제와 공간적 불균등 — 실제 자료

수집일은 2026-11-27이다. 원자료는 World Bank API에서 메모리로 읽고 저장소에는 두지 않는다. 재생성 스크립트는 Python 표준 라이브러리만 사용하며, 산출물은 모두 1MB 이하이다. World Bank WDI 카탈로그의 이용 조건은 CC BY 4.0이다.

## 산출물

| 파일 | 화면 형식 | 기간·기준 | 크기 |
| --- | --- | --- | ---: |
| `fdi-net-inflows-gdp-map.json` | 단계 구분도 | 2024 | 4,799 bytes |
| `fdi-global-net-inflows-series.json` | 선그래프 | 1990–2024 | 853 bytes |
| `gdp-ppp-per-capita-map.json` | 단계 구분도 | 2024 | 4,763 bytes |
| `gdp-ppp-constant-country-series.json` | 선그래프 | 1990–2024 | 4,695 bytes |
| `extreme-poverty-latest-map.json` | 단계 구분도 | 국가별 최근 관측, 2015–2023 | 4,070 bytes |
| `oda-received-gni-map.json` | 단계 구분도 | 2023 | 4,030 bytes |
| `oda-received-constant-series.json` | 선그래프 | 1990–2023 | 3,900 bytes |

## 출처와 이용 조건

- **World Bank WDI:** [World Development Indicators 카탈로그](https://datacatalog.worldbank.org/infrastructure-data/search/dataset/0037712/world-development-indicators)는 데이터 라이선스를 [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses)으로 표시한다. 파일과 매니페스트의 출처 문구로 World Bank를 표시하고, 지표·연도 선택 및 JSON 변환 사실을 적었다. 수치 원자료는 각 지표 페이지와 API에서 받았다.
- **외국인 직접 투자:** `BX.KLT.DINV.WD.GD.ZS`(GDP 대비 순 FDI 유입)와 `BX.KLT.DINV.CD.WD`(세계 순 FDI 유입, 현재 US$)를 사용했다. 유입액·유입률은 외국계 기업 투자 흐름을 보여 주지만 기업별 활동, 글로벌 가치사슬 참여도, 국내 부가가치 기여도를 직접 측정하지 않는다.
- **1인당 GDP:** 지도는 요청에 제시된 `NY.GDP.PCAP.PP.CD`(현재 국제달러) 2024년 값이다. 현재 값은 연도 간 물가 변화를 조정하지 않으므로, 장기 추이는 `NY.GDP.PCAP.PP.KD`(2021년 상수 국제달러)로 따로 만들었다. 상수 PPP 시계열에는 미국·독일·대한민국·중국·브라질·인도·말라위 7개국을 담았다.
- **극빈율:** 현재 지표 설명은 `SI.POV.DDAY`를 하루 3.00달러(2021 PPP) 미만 인구 비율로 정의한다. 세계은행은 2025년 6월 국제 빈곤선을 2.15달러(2017 PPP)에서 3.00달러(2021 PPP)로 갱신했고, PPP 개정 때문에 이전 판의 국가별 비율과 직접 비교할 수 없다고 안내한다. 이 지도는 2015–2023년 각 국가의 최신 관측값을 골랐으며, 파일의 `observationYears`에 국가별 연도를 기록했다. 2024·2025년 값은 포함하지 않았다.
- **공적개발원조:** `DT.ODA.ODAT.GN.ZS`(순 ODA 수원액/GNI) 2023년 지도와 `DT.ODA.ODAT.KD`(상수 2023 US$) 1990–2023년 시계열이다. WDI 지표 페이지의 출처는 OECD DAC 통계이며, 수원국 지표다. 공여국의 ODA/GNI 비율을 직접 보여 주는 OECD DAC 막대그래프와 구별한다. 순액에는 대출 상환 등이 반영되어 음수가 될 수 있다.
- **초국적 기업·GVC 자료 미수록:** [OECD TiVA 안내](https://www.oecd.org/en/topics/sub-issues/trade-in-value-added.html)는 글로벌 가치사슬 참여와 국내·해외 부가가치 지표를 제공하며, 지표가 국가·지역·국제 통계에 기반한 ICIO 표에서 도출된다고 설명한다. OECD [데이터 이용조건](https://www.oecd.org/en/about/terms-conditions.html)은 데이터에 제3자 권리나 별도 제한이 있을 수 있어 데이터별 출처 정보를 확인하도록 한다. 해당 TiVA 데이터의 원천 통계 권리와 데이터별 재배포 조건을 공식 페이지에서 충분히 확정하지 못해 파생 수치 파일은 만들지 않았다. 수업에서는 OECD Data Explorer의 TiVA 지표를 원 페이지에서 직접 열어 보는 방안을 권한다. WDI FDI 지도·시계열은 공개 재사용이 확인된 대안이지만 GVC 참여도를 대신 측정하지는 않는다.
- **UNCTAD 대안:** World Investment Report는 다국적 기업과 FDI 통계 부록을 제공하지만, 이번에는 보고서 표의 재사용 조건을 별도로 확인하지 못해 값 추출·재배포를 하지 않았다. 원 보고서 링크를 읽기 자료로 안내하거나, 재사용 허가를 확인한 뒤 표를 가공하는 방법을 권한다.
- **경계:** 기존 `public/data/base/countries-110m.geojson`의 Natural Earth 국가 경계와 WDI 국가 코드만 사용했다. 새로운 경계는 추가하지 않았다. WDI 국가·경제 코드 217개 가운데 기존 경계의 ISO_A3 코드 175개 중 169개가 코드로 연결된다. 일부 소도서·속령 및 특수 코드는 기존 경계에 없거나 코드가 일치하지 않아 지도에 표시되지 않을 수 있다.

## 가공·경계·결측 처리

- 모든 지표는 World Bank API 원값을 사용했으며 반올림·보간·추정을 하지 않았다. API에 값이 없는 국가는 `values`에서 `null`이다. 경계에 없는 코드도 임의로 재매핑하지 않는다.
- FDI와 GDP 지도는 2024년으로 맞췄다. API에 2025년 값도 있지만 조회 시점의 국가별 관측 범위가 더 좁았다: FDI/GDP는 2024년 194/217개 대비 2025년 184/217개, 현재 PPP GDP는 195/217개 대비 185/217개였다. 최신 연도는 잠정·불완전할 수 있으므로 비교 범위가 더 넓은 2024년을 택했다.
- FDI 세계 선그래프는 World aggregate `WLD`의 순유입액이다. 현재 달러이므로 물가·환율 변화를 제거한 실질 투자 증가율로 읽으면 안 된다. 순유입액은 음수일 수도 있지만 세계 집계값은 원자료 그대로 기록했다.
- GDP PPP 지도는 217개 코드 중 195개, 빈곤 지도는 151개, ODA/GNI 지도는 130개에 관측값이 있다. 지표별로 자료 범위가 다르므로 빈 지도 색은 0을 뜻하지 않는다.
- GDP의 현재 PPP 지도와 상수 PPP 시계열은 목적이 다르다. 지도는 2024년 국가 간 구매력 비교용이고, 시계열은 2021년 PPP 상수 가격으로 연도 간 실질 변화에 가까운 비교를 하기 위한 것이다.
- 빈곤율은 2015–2023년 중 국가별 최신 WDI 값으로 지도 연도가 서로 같지 않다. 각 ISO3별 연도는 `observationYears`에 있으며, 이 필드는 지도 렌더러가 사용하지 않는 보조 메타데이터다. 결측은 원자료 값이 없어 `null`이다. 기준 변경 전의 2.15달러 자료와 같은 시계열로 이어 읽지 않는다.
- ODA 지도는 2023년 관측이 있는 국가만 값이 있다. 비율은 GNI 대비 순 수원액이므로 값이 크다고 원조의 절대액이 가장 크다고 뜻하지 않는다. 선그래프는 국가별 절대 수원액을 상수 2023 US$로 표시한다. 여섯 국가는 서로 다른 소득·지역에 있는 수원국 사례이며 순위가 아니다.
- `scripts/data/03-03/world_bank.py`는 지표 API를 직접 다시 조회해 이 일곱 파일을 생성한다. 원자료 파일은 저장소에 두지 않는다.

## 생성 뒤 원 사이트에서 확인한 값

각 산출 파일에서 세 값을 골라 국가별 World Bank API 응답과 다시 대조했다. 아래 링크는 해당 국가·지표·연도의 원 API 응답이다.

| 산출 파일 | 확인 항목 | 값 | 원 사이트 확인 |
| --- | --- | ---: | --- |
| `fdi-net-inflows-gdp-map.json` | 미국, 2024 | 0.848467095703726% | [API](https://api.worldbank.org/v2/country/USA/indicator/BX.KLT.DINV.WD.GD.ZS?format=json&date=2024) |
| `fdi-net-inflows-gdp-map.json` | 중국, 2024 | 0.227695125306895% | [API](https://api.worldbank.org/v2/country/CHN/indicator/BX.KLT.DINV.WD.GD.ZS?format=json&date=2024) |
| `fdi-net-inflows-gdp-map.json` | 대한민국, 2024 | 0.685857996519477% | [API](https://api.worldbank.org/v2/country/KOR/indicator/BX.KLT.DINV.WD.GD.ZS?format=json&date=2024) |
| `fdi-global-net-inflows-series.json` | 세계, 1990 | 239,428,260,779.594 US$ | [API](https://api.worldbank.org/v2/country/WLD/indicator/BX.KLT.DINV.CD.WD?format=json&date=1990) |
| `fdi-global-net-inflows-series.json` | 세계, 2000 | 1,569,411,222,692.47 US$ | [API](https://api.worldbank.org/v2/country/WLD/indicator/BX.KLT.DINV.CD.WD?format=json&date=2000) |
| `fdi-global-net-inflows-series.json` | 세계, 2024 | 1,374,130,881,712.05 US$ | [API](https://api.worldbank.org/v2/country/WLD/indicator/BX.KLT.DINV.CD.WD?format=json&date=2024) |
| `gdp-ppp-per-capita-map.json` | 미국, 2024 | 86,169.6641581914 current international $ | [API](https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.PCAP.PP.CD?format=json&date=2024) |
| `gdp-ppp-per-capita-map.json` | 중국, 2024 | 27,139.5181633767 current international $ | [API](https://api.worldbank.org/v2/country/CHN/indicator/NY.GDP.PCAP.PP.CD?format=json&date=2024) |
| `gdp-ppp-per-capita-map.json` | 인도, 2024 | 10,718.5934040662 current international $ | [API](https://api.worldbank.org/v2/country/IND/indicator/NY.GDP.PCAP.PP.CD?format=json&date=2024) |
| `gdp-ppp-constant-country-series.json` | 미국, 1990 | 44,384.2101912606 constant 2021 international $ | [API](https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.PCAP.PP.KD?format=json&date=1990) |
| `gdp-ppp-constant-country-series.json` | 중국, 2000 | 4,065.86707804429 constant 2021 international $ | [API](https://api.worldbank.org/v2/country/CHN/indicator/NY.GDP.PCAP.PP.KD?format=json&date=2000) |
| `gdp-ppp-constant-country-series.json` | 대한민국, 2024 | 55,070.9386194121 constant 2021 international $ | [API](https://api.worldbank.org/v2/country/KOR/indicator/NY.GDP.PCAP.PP.KD?format=json&date=2024) |
| `extreme-poverty-latest-map.json` | 인도, 2023 | 2.6% | [API](https://api.worldbank.org/v2/country/IND/indicator/SI.POV.DDAY?format=json&date=2023) |
| `extreme-poverty-latest-map.json` | 남아프리카공화국, 2022 | 17.4% | [API](https://api.worldbank.org/v2/country/ZAF/indicator/SI.POV.DDAY?format=json&date=2022) |
| `extreme-poverty-latest-map.json` | 방글라데시, 2022 | 5.9% | [API](https://api.worldbank.org/v2/country/BGD/indicator/SI.POV.DDAY?format=json&date=2022) |
| `oda-received-gni-map.json` | 말라위, 2023 | 13.1405927921346% | [API](https://api.worldbank.org/v2/country/MWI/indicator/DT.ODA.ODAT.GN.ZS?format=json&date=2023) |
| `oda-received-gni-map.json` | 르완다, 2023 | 9.54767839593419% | [API](https://api.worldbank.org/v2/country/RWA/indicator/DT.ODA.ODAT.GN.ZS?format=json&date=2023) |
| `oda-received-gni-map.json` | 에티오피아, 2023 | 3.9865591580612% | [API](https://api.worldbank.org/v2/country/ETH/indicator/DT.ODA.ODAT.GN.ZS?format=json&date=2023) |
| `oda-received-constant-series.json` | 방글라데시, 1990 | 2,769,031,250 constant 2023 US$ | [API](https://api.worldbank.org/v2/country/BGD/indicator/DT.ODA.ODAT.KD?format=json&date=1990) |
| `oda-received-constant-series.json` | 에티오피아, 2000 | 1,122,201,660.15625 constant 2023 US$ | [API](https://api.worldbank.org/v2/country/ETH/indicator/DT.ODA.ODAT.KD?format=json&date=2000) |
| `oda-received-constant-series.json` | 파키스탄, 2023 | 3,963,701,660.15625 constant 2023 US$ | [API](https://api.worldbank.org/v2/country/PAK/indicator/DT.ODA.ODAT.KD?format=json&date=2023) |

## 절별 자료 단계 제안

| 절 | 추천 단계 | 파일 및 수업에서 볼 점 |
| --- | --- | --- |
| 1. 글로벌 경제를 움직이는 것은 무엇일까? | 1단계 | `fdi-net-inflows-gdp-map.json`으로 투자 유입의 국가별 차이를 읽는다. FDI율만으로 다국적기업의 영향력을 단정하지 않는다. |
|  | 2단계 | `fdi-global-net-inflows-series.json`으로 1990–2024년 세계 순 FDI 흐름의 증감과 급변 시기를 살핀다. 장기 변동과 최근 일시적 변동을 나눠 설명한다. |
| 2. 지구촌의 공간적 불균등은 왜 만들어질까? | 1단계 | `gdp-ppp-per-capita-map.json`에서 2024년 구매력 기준 국가 간 차이를 비교한다. |
|  | 2단계 | `gdp-ppp-constant-country-series.json`으로 소득 수준이 다른 7개국의 장기 변화를 비교한다. 현재 PPP 지도와 상수 PPP 선그래프의 목적 차이를 확인한다. |
|  | 3단계 | `extreme-poverty-latest-map.json`을 다시 사용해 낮은 1인당 GDP와 빈곤율이 함께 나타나는 곳과 그렇지 않은 곳을 찾는다. 국가별 관측 연도가 다름을 먼저 확인한다. |
| 3. 공간적 불균등을 어떻게 해소할 수 있을까? | 1단계 | `oda-received-gni-map.json`으로 국가경제 규모 대비 순 ODA 수원액의 분포를 살펴본다. 수원 비율은 빈곤의 원인이나 원조 효과를 단독으로 설명하지 않는다. |
|  | 2단계 | `oda-received-constant-series.json`으로 서로 다른 수원국의 ODA 규모가 장기적으로 어떻게 바뀌었는지 비교하고, 국제협력의 범위와 한계를 토의한다. |

## 한계와 생성

- 2024년 FDI/GDP 지도와 현재 PPP 지도에는 각각 217개 코드 중 194개와 195개 관측값이 있다. 빈곤·ODA 수원 지표는 국가별 통계 공백과 관측 주기 때문에 결측이 더 많다.
- 빈곤율은 모든 나라의 같은 해를 나타내지 않는다. 국가별 연도를 보지 않고 동일한 연도의 횡단면처럼 해석하지 않는다. 2021 PPP 빈곤선으로 재산정된 최근 빈곤 시계열과 이전 2017 PPP 판의 값을 섞지 않는다.
- ODA는 수원국 측 순액 지표다. 공여국별 노력(예: DAC 국가의 ODA/GNI), 분야별 원조, 사업 성과나 원조의 인과 효과를 이 파일들이 보여 주지는 않는다. 공여국 막대그래프가 필요하면 OECD DAC `ODA as percent of GNI, grant equivalent` 데이터를 원 페이지에서 활용하고, 데이터별 원천 권리를 확인한 다음 재배포 여부를 결정한다.
- **생성:** `python3 scripts/data/03-03/world_bank.py`
