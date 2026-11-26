# 03-01 세계의 인구 문제와 인구 이주: 실제 자료

## 자료 선정과 기준

- World Bank World Development Indicators (WDI) 자료는 2024년으로 고정했다. 2024년은 World Bank API가 제공하는 인구 밀도 최신 관측 연도이며, WDI의 각 원자료 페이지는 CC BY 4.0을 표시한다. API 메타데이터의 `lastupdated`는 `2026-11-11`이었다.
- UN DESA World Population Prospects 2024에서 같은 연도인 2024년 중위 시나리오의 성별·5세 연령 자료를 썼다. CSV의 인구 단위는 천 명이다. `PopMale`과 `PopFemale`을 해당 국가의 21개 연령 구간 `PopTotal` 합계로 나누고 100을 곱해 전체 인구 대비 비율로 저장했다. WPP 2024 공식 Data Sources 간행물은 표·그림 재사용을 CC BY 3.0 IGO로 허용하며, [UN DESA 데이터 포털의 WPP 국가 프로필](https://population.un.org/dataportal/countryProfiles/types/1/topics/1/coreThemes/7/locations/392)도 WPP 2024 데이터의 CC BY 3.0 IGO 표기를 제공한다. 출처와 변환 내용을 manifest 캡션에 남겼다.
- WPP 2024는 각국의 인구조사·등록자료 등을 바탕으로 작성한 국제 추계다. 2024년 수치는 개별 국가의 단일 인구조사 원자료와 같지 않다. 인구 피라미드의 국가는 대한민국·일본·우간다이며 모두 2024년 추계다.
- World Bank의 `SM.POP.TOTL.ZS`는 UN DESA International Migrant Stock를 출처로 표시한다. 국제 이주민 비율은 거주 인구 중 국제 이주민의 비중을 나타내며, 이주 흐름·이유·개인의 법적 지위를 뜻하지 않는다.
- `BX.TRF.PWKR.DT.GD.ZS`는 개인 송금 수입의 GDP 대비 규모다. 송금은 유출 지역에 미칠 수 있는 경제적 경로를 보여 주지만, 국가별 비율만으로 이주가 경제에 미친 인과 효과를 설명하지 않는다.
- 대한민국 체류 외국인 시계열은 만들지 않았다. 확인한 법무부 이민 통계 게시물에 공공누리 제4유형 표시가 있어, 이 작업처럼 자료를 추출·변환해 그래프로 재배포하는 데 맞는 조건임을 확인하지 못했다. [법무부 이민 통계 게시판](https://www.moj.go.kr/bbs/immigration/227/artclList.do)에서 통계별 유형을 다시 확인할 수 있다.

## 절별 추천 자료 단계

| 절 | 단계 | 파일 | 활용 초점 |
| --- | --- | --- | --- |
| 1. 세계의 인구는 어디에 많이 분포할까? | 1단계 | `population-density-map-2024.json` | 인구 밀도가 높은 지역과 낮은 지역의 분포를 비교한다. |
|  | 2단계 | `population-top10-2024.json` | 절대 인구 상위 국가와 밀도가 같은 개념이 아님을 인도·중국·미국 등의 값으로 살핀다. |
| 2. 인구 구조의 변화는 어떤 인구 문제를 가져올까? | 1단계 | `pyramid-kor-2024.json`, `pyramid-jpn-2024.json`, `pyramid-uga-2024.json` | 같은 연도의 피라미드에서 연령 구조 차이를 읽는다. |
|  | 2단계 | `age-65plus-map-2024.json` | 고령 인구 비율의 공간 차이를 피라미드와 연결한다. |
|  | 3단계 | `fertility-rate-series-1960-2024.json` | 출산율의 장기 변화와 인구 구조의 관계를 비교한다. |
| 3. 세계의 인구는 왜 이주할까? | 1단계 | `international-migrant-share-map-2024.json` | 국제 이주민이 거주 인구에서 차지하는 비율의 지역 차이를 살핀다. |
|  | 2단계 | `personal-remittances-gdp-map-2024.json` | 송금 수입이 GDP에서 차지하는 비율을 유출 지역에 나타나는 한 경로로 해석한다. |

## 산출 파일

각 JSON은 화면에서 읽는 표준 구조를 사용하며 1 MB 미만이다. 지도 데이터의 `values` 키는 ISO3 코드이고, 원자료 결측은 `null`로 유지했다.

| 파일 | 화면 자료 | 기준 시점 | 크기 |
| --- | --- | --- | ---: |
| `public/data/03-01/population-density-map-2024.json` | 국가 단계 구분도 | 2024 | 4,870 B |
| `public/data/03-01/population-top10-2024.json` | 막대그래프 | 2024 | 580 B |
| `public/data/03-01/age-65plus-map-2024.json` | 국가 단계 구분도 | 2024 | 5,024 B |
| `public/data/03-01/pyramid-kor-2024.json` | 인구 피라미드 | 2024 | 616 B |
| `public/data/03-01/pyramid-jpn-2024.json` | 인구 피라미드 | 2024 | 612 B |
| `public/data/03-01/pyramid-uga-2024.json` | 인구 피라미드 | 2024 | 618 B |
| `public/data/03-01/fertility-rate-series-1960-2024.json` | 시계열 선그래프 | 1960–2024 | 2,708 B |
| `public/data/03-01/international-migrant-share-map-2024.json` | 국가 단계 구분도 | 2024 | 2,277 B |
| `public/data/03-01/personal-remittances-gdp-map-2024.json` | 국가 단계 구분도 | 2024 | 4,427 B |

## 원사이트 대조표

아래 대조는 각 산출 파일의 값 3개를 원자료 API 또는 공식 WPP 2024 CSV에 다시 맞춘 결과다. World Bank API 값은 원값을 유지하며, WPP 피라미드 값은 `PopMale` 또는 `PopFemale`을 국가별 `PopTotal` 합으로 나눈 뒤 소수점 여섯 자리로 반올림했다.

| 산출 파일 | 항목 | 값 | 확인 URL |
| --- | --- | ---: | --- |
| `population-density-map-2024.json` | 대한민국 | 530.236321721311명/km² | [WDI API](https://api.worldbank.org/v2/country/KOR/indicator/EN.POP.DNST?format=json&date=2024) |
|  | 인도 | 488.006414322664명/km² | [WDI API](https://api.worldbank.org/v2/country/IND/indicator/EN.POP.DNST?format=json&date=2024) |
|  | 미국 | 37.1693654604249명/km² | [WDI API](https://api.worldbank.org/v2/country/USA/indicator/EN.POP.DNST?format=json&date=2024) |
| `population-top10-2024.json` | 인도 | 1,450,935,791명 | [WDI API](https://api.worldbank.org/v2/country/IND/indicator/SP.POP.TOTL?format=json&date=2024) |
|  | 중국 | 1,408,975,000명 | [WDI API](https://api.worldbank.org/v2/country/CHN/indicator/SP.POP.TOTL?format=json&date=2024) |
|  | 미국 | 340,003,797명 | [WDI API](https://api.worldbank.org/v2/country/USA/indicator/SP.POP.TOTL?format=json&date=2024) |
| `age-65plus-map-2024.json` | 대한민국 | 19.2735131316057% | [WDI API](https://api.worldbank.org/v2/country/KOR/indicator/SP.POP.65UP.TO.ZS?format=json&date=2024) |
|  | 일본 | 29.7807703973917% | [WDI API](https://api.worldbank.org/v2/country/JPN/indicator/SP.POP.65UP.TO.ZS?format=json&date=2024) |
|  | 우간다 | 2.18856638123782% | [WDI API](https://api.worldbank.org/v2/country/UGA/indicator/SP.POP.65UP.TO.ZS?format=json&date=2024) |
| `pyramid-kor-2024.json` | 0–4세 남아 / 전체 인구 | 1.273273% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), KOR, 2024 |
|  | 0–4세 여아 / 전체 인구 | 1.206607% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), KOR, 2024 |
|  | 65–69세 남성 / 전체 인구 | 3.269634% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), KOR, 2024 |
| `pyramid-jpn-2024.json` | 0–4세 남아 / 전체 인구 | 1.661035% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), JPN, 2024 |
|  | 0–4세 여아 / 전체 인구 | 1.581985% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), JPN, 2024 |
|  | 65–69세 남성 / 전체 인구 | 2.918167% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), JPN, 2024 |
| `pyramid-uga-2024.json` | 0–4세 남아 / 전체 인구 | 8.150162% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), UGA, 2024 |
|  | 0–4세 여아 / 전체 인구 | 7.979667% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), UGA, 2024 |
|  | 65–69세 남성 / 전체 인구 | 0.386683% | [WPP 2024 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_PopulationByAge5GroupSex_Medium.csv.gz), UGA, 2024 |
| `fertility-rate-series-1960-2024.json` | 대한민국, 1960년 | 5.994명/여성 | [WDI API](https://api.worldbank.org/v2/country/KOR/indicator/SP.DYN.TFRT.IN?format=json&date=1960) |
|  | 일본, 1990년 | 1.54명/여성 | [WDI API](https://api.worldbank.org/v2/country/JPN/indicator/SP.DYN.TFRT.IN?format=json&date=1990) |
|  | 우간다, 2024년 | 4.165명/여성 | [WDI API](https://api.worldbank.org/v2/country/UGA/indicator/SP.DYN.TFRT.IN?format=json&date=2024) |
| `international-migrant-share-map-2024.json` | 아랍에미리트 | 74% | [WDI API](https://api.worldbank.org/v2/country/ARE/indicator/SM.POP.TOTL.ZS?format=json&date=2024) |
|  | 미국 | 15.2% | [WDI API](https://api.worldbank.org/v2/country/USA/indicator/SM.POP.TOTL.ZS?format=json&date=2024) |
|  | 대한민국 | 3.5% | [WDI API](https://api.worldbank.org/v2/country/KOR/indicator/SM.POP.TOTL.ZS?format=json&date=2024) |
| `personal-remittances-gdp-map-2024.json` | 타지키스탄 | 47.1531186167275% | [WDI API](https://api.worldbank.org/v2/country/TJK/indicator/BX.TRF.PWKR.DT.GD.ZS?format=json&date=2024) |
|  | 필리핀 | 8.72469619181708% | [WDI API](https://api.worldbank.org/v2/country/PHL/indicator/BX.TRF.PWKR.DT.GD.ZS?format=json&date=2024) |
|  | 인도 | 3.66076475144487% | [WDI API](https://api.worldbank.org/v2/country/IND/indicator/BX.TRF.PWKR.DT.GD.ZS?format=json&date=2024) |

## 경계·결측 처리와 한계

- 지도 경계는 공통 규칙대로 저장소의 `public/data/base/countries-110m.geojson`를 사용한다. 여기서는 경계를 새로 만들거나 수정하지 않았다. 지도 값은 WDI의 217개 ISO3 국가·경제 코드에 맞췄으며, 경계 파일에 대응되는 지형이 없을 수 있는 코드는 별도 지형을 추가하지 않았다.
- 2024년 인구 밀도 값은 214/217, 국제 이주민 비율은 216/217, 개인 송금 수입 비율은 162/217 코드에 관측값이 있다. 나머지는 `null`이며 0으로 바꾸거나 주변 국가 값으로 채우지 않았다. 65세 이상 인구 비율은 217/217개 코드에 값이 있다.
- WDI 지도는 2024년 국가별 비율·밀도의 스냅샷이다. 국가 단위의 평균은 한 국가 내부의 도시·농촌 차이를 보여 주지 않는다.
- 송금 비율의 결측이 많은 것은 원자료에 관측값이 없는 국가가 있기 때문이다. 결측을 낮은 송금액으로 읽지 않아야 한다.
- 세계은행의 2024 인구 상위 10개국 순위는 WDI 국가별 값만 대상으로 했다. 국가별 값의 출처는 WPP·국가 통계기관 등으로 구성될 수 있으므로 수업 자료에는 World Bank/WDI와 기준 연도를 표시한다.
- 국제 이주민 비율과 송금 비율은 서로 다른 지표다. 국제 이주민 비율은 유입 지역의 거주 인구 구성, 송금 수입 비율은 송금을 받는 지역의 GDP 대비 거시적 규모를 나타낸다. 둘을 인과 관계나 개인별 경험으로 해석하지 않는다.

## 출처 및 이용 조건

- WDI 자료 페이지: [인구 밀도](https://data.worldbank.org/indicator/EN.POP.DNST), [총인구](https://data.worldbank.org/indicator/SP.POP.TOTL), [65세 이상 인구 비율](https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS), [합계 출산율](https://data.worldbank.org/indicator/SP.DYN.TFRT.IN), [국제 이주민 비율](https://data.worldbank.org/indicator/SM.POP.TOTL.ZS), [개인 송금 수입/GDP](https://data.worldbank.org/indicator/BX.TRF.PWKR.DT.GD.ZS). WDI 표시는 CC BY 4.0이다. [World Bank 데이터 이용 조건](https://datacatalog.worldbank.org/public-licenses)
- WPP 2024: [공식 다운로드 페이지](https://population.un.org/wpp/), [UN DESA WPP 데이터 포털 프로필](https://population.un.org/dataportal/countryProfiles/types/1/topics/1/coreThemes/7/locations/392), [Data Sources 라이선스 문구](https://population.un.org/wpp/assets/Excel%20Files/4_Metadata/WPP2024_Data_Sources.pdf), [CC BY 3.0 IGO](https://creativecommons.org/licenses/by/3.0/igo/).
- 이주민 통계 정의와 개정 범위: [UN DESA International Migrant Stock 2024](https://www.un.org/development/desa/pd/content/international-migrant-stock/).

## 생성 스크립트

- `python3 scripts/data/03-01/world_bank.py`
- `python3 scripts/data/03-01/wpp2024_pyramids.py`
