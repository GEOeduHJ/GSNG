# 03-01 세계의 인구 문제와 인구 이주: 실제 자료

## 자료 선정과 기준

- 검수 반영으로 신규 WDI 스냅샷은 2024년으로 통일했다. 조출생률·조사망률·부양비·순이동은 각 217/217, 산업별 종사자 비율은 지표별 182/217 국가·경제 코드에 값이 있었다. 2025년 WPP·ILO 모형 전망 구간은 제외했다. WDI API 메타데이터의 `lastupdated`는 `2026-11-11`이며 각 지표 페이지는 CC BY 4.0을 표시한다. 산업별 종사자 비율은 ILO 모형 추정치다.
- UN DESA World Population Prospects 2024에서 같은 연도인 2024년 중위 시나리오의 성별·5세 연령 자료를 썼다. CSV의 인구 단위는 천 명이다. `PopMale`과 `PopFemale`을 해당 국가의 21개 연령 구간 `PopTotal` 합계로 나누고 100을 곱해 전체 인구 대비 비율로 저장했다. WPP 2024 공식 Data Sources 간행물은 표·그림 재사용을 CC BY 3.0 IGO로 허용하며, [UN DESA 데이터 포털의 WPP 국가 프로필](https://population.un.org/dataportal/countryProfiles/types/1/topics/1/coreThemes/7/locations/392)도 WPP 2024 데이터의 CC BY 3.0 IGO 표기를 제공한다. 출처와 변환 내용을 manifest 캡션에 남겼다.
- 신규 WPP 자료는 `WPP2024_Demographic_Indicators_Medium.csv.gz`를 사용했다. 인구 규모는 `TPopulation1July`(천 명)를 사용하며 1950–2023년 추계와 2024–2100년 중위 전망을 구분해 기록했다. 대륙 비중은 공식 여섯 대륙 지역 인구를 같은 해 세계 인구로 나눴다. 2024년 이후 값은 전망이며 국가별 관측치가 아니다.
- WPP 2024는 1950–2023년 추계와 2024–2100년 중위 변이 전망을 제공한다. 따라서 기존 인구 피라미드의 2024년 수치도 중위 변이 전망이며 개별 국가의 단일 인구조사 원자료가 아니다. 대상 국가는 대한민국·일본·우간다다.
- World Bank의 `SM.POP.TOTL.ZS`는 UN DESA International Migrant Stock를 출처로 표시한다. 국제 이주민 비율은 거주 인구 중 국제 이주민의 비중을 나타내며, 이주 흐름·이유·개인의 법적 지위를 뜻하지 않는다.
- `BX.TRF.PWKR.DT.GD.ZS`는 개인 송금 수입의 GDP 대비 규모다. 송금은 유출 지역에 미칠 수 있는 경제적 경로를 보여 주지만, 국가별 비율만으로 이주가 경제에 미친 인과 효과를 설명하지 않는다.
- 대한민국 체류 외국인 시계열은 만들지 않았다. 확인한 법무부 이민 통계 게시물에 공공누리 제4유형 표시가 있어, 이 작업처럼 자료를 추출·변환해 그래프로 재배포하는 데 맞는 조건임을 확인하지 못했다. [법무부 이민 통계 게시판](https://www.moj.go.kr/bbs/immigration/227/artclList.do)에서 통계별 유형을 다시 확인할 수 있다.

## 교과서 소주제 대응과 자료 선택

| 절 | 단계 | 파일 | 활용 초점 |
| --- | --- | --- | --- |
| 1. 세계의 인구는 어디에 많이 분포할까? | 실제 자료 3개 | `population-density-map-2024.json`, `population-top10-2024.json`, `continent-population-share-wpp2024-1950-2100.json` | 인구 밀도·절대 인구·대륙별 인구 비중을 구분한다. |
| 2. 인구 구조의 변화는 어떤 인구 문제를 가져올까? | 실제 자료 6개 + 개념도 1개 (총 7개) | `world-population-wpp2024-1950-2100.json`, `crude-birth-death-rates-1960-2024.json`, `pyramid-kor-2024.json`, `pyramid-uga-2024.json`, `dependency-ratios-2024.json`, `industry-employment-shares-2024.json`, `demographic-transition-schematic.svg` | 한국의 저출산·고령화 구조와 우간다의 젊은 연령 구조를 비교한다. 일본의 고령화는 2024년 부양비 자료에서 확인한다. |
| 3. 세계의 인구는 왜 이주할까? | 실제 자료 3개 | `international-migrant-share-map-2024.json`, `personal-remittances-gdp-map-2024.json`, `net-migration-map-2024.json` | 이주민 비중·순이동·송금이라는 서로 다른 지표를 구분한다. 이주 동인은 `migration-drivers-schematic.svg`로 개념화한다. |

소주제별 쪽수·학습 목표 취지·교과서 자료 종류와 자료 id 대응은 `content/textbook-map/03-01.yaml`에 기록했다. 두 SVG는 실제 통계가 아닌 개념도이며 수치 눈금이나 연도를 넣지 않았다.
자료 판단, 생성 파일, 원사이트 대조, 이용 조건과 미해결 사항은 저장소 밖의 인계 보고서에 정리한다.

### 현재 대응표에서 사용하지 않는 기존 파일

파일은 삭제하지 않았다. 2절은 실제 자료 6개와 개념도 1개, 총 7개 자료로 구성했다. 아래 기존 파일은 대응표에 연결하지 않았고 저장소에 보존한다.

- `age-65plus-map-2024.json`
- `fertility-rate-series-1960-2024.json`
- `pyramid-jpn-2024.json`

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
| `public/data/03-01/world-population-wpp2024-1950-2100.json` | 시계열 선그래프 | 1950–2100 | 2,677 B |
| `public/data/03-01/continent-population-share-wpp2024-1950-2100.json` | 시계열 선그래프 | 1950–2100 | 9,417 B |
| `public/data/03-01/crude-birth-death-rates-1960-2024.json` | 시계열 선그래프 | 1960–2024 | 5,037 B |
| `public/data/03-01/dependency-ratios-2024.json` | 막대그래프 | 2024 | 706 B |
| `public/data/03-01/industry-employment-shares-2024.json` | 막대그래프 | 2024 | 1,052 B |
| `public/data/03-01/net-migration-map-2024.json` | 국가 단계 구분도 | 2024 | 2,648 B |

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
| `world-population-wpp2024-1950-2100.json` | 세계, 1950년 | 2,493,092.848천 명 | [WPP 2024 공식 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_Demographic_Indicators_Medium.csv.gz), LocID 900, `TPopulation1July` |
|  | 세계, 2024년 | 8,161,972.572천 명 | 같은 공식 CSV, LocID 900, `TPopulation1July` |
|  | 세계, 2100년 | 10,180,160.751천 명 | 같은 공식 CSV, LocID 900, 중위 전망 |
| `continent-population-share-wpp2024-1950-2100.json` | 아프리카, 2024년 | 18.563415% | [WPP 2024 공식 CSV](https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/WPP2024_Demographic_Indicators_Medium.csv.gz), 아프리카/세계 `TPopulation1July` 비율 |
|  | 아시아, 2024년 | 58.893827% | 같은 공식 CSV, 아시아/세계 `TPopulation1July` 비율 |
|  | 유럽, 2024년 | 9.128722% | 같은 공식 CSV, 유럽/세계 `TPopulation1July` 비율 |
| `crude-birth-death-rates-1960-2024.json` | 대한민국, 2024년 조출생률/조사망률 | 4.7 / 7.0명/1,000명 | [조출생률 API](https://api.worldbank.org/v2/country/KOR/indicator/SP.DYN.CBRT.IN?format=json&date=2024), [조사망률 API](https://api.worldbank.org/v2/country/KOR/indicator/SP.DYN.CDRT.IN?format=json&date=2024) |
|  | 일본, 2024년 조출생률/조사망률 | 5.7 / 13.3명/1,000명 | [조출생률 API](https://api.worldbank.org/v2/country/JPN/indicator/SP.DYN.CBRT.IN?format=json&date=2024), [조사망률 API](https://api.worldbank.org/v2/country/JPN/indicator/SP.DYN.CDRT.IN?format=json&date=2024) |
|  | 우간다, 2024년 조출생률/조사망률 | 34.436 / 4.767명/1,000명 | [조출생률 API](https://api.worldbank.org/v2/country/UGA/indicator/SP.DYN.CBRT.IN?format=json&date=2024), [조사망률 API](https://api.worldbank.org/v2/country/UGA/indicator/SP.DYN.CDRT.IN?format=json&date=2024) |
| `dependency-ratios-2024.json` | 대한민국, 2024년 유소년/노년 부양비 | 15.063246 / 27.471441 | [유소년 API](https://api.worldbank.org/v2/country/KOR/indicator/SP.POP.DPND.YG?format=json&date=2024), [노년 API](https://api.worldbank.org/v2/country/KOR/indicator/SP.POP.DPND.OL?format=json&date=2024) |
|  | 일본, 2024년 유소년/노년 부양비 | 19.454734 / 50.662106 | [유소년 API](https://api.worldbank.org/v2/country/JPN/indicator/SP.POP.DPND.YG?format=json&date=2024), [노년 API](https://api.worldbank.org/v2/country/JPN/indicator/SP.POP.DPND.OL?format=json&date=2024) |
|  | 우간다, 2024년 유소년/노년 부양비 | 80.236386 / 4.032853 | [유소년 API](https://api.worldbank.org/v2/country/UGA/indicator/SP.POP.DPND.YG?format=json&date=2024), [노년 API](https://api.worldbank.org/v2/country/UGA/indicator/SP.POP.DPND.OL?format=json&date=2024) |
| `industry-employment-shares-2024.json` | 대한민국, 2024년 농업/산업/서비스업 | 5.196809 / 23.659089 / 71.144106% | [농업 API](https://api.worldbank.org/v2/country/KOR/indicator/SL.AGR.EMPL.ZS?format=json&date=2024), [산업 API](https://api.worldbank.org/v2/country/KOR/indicator/SL.IND.EMPL.ZS?format=json&date=2024), [서비스 API](https://api.worldbank.org/v2/country/KOR/indicator/SL.SRV.EMPL.ZS?format=json&date=2024) |
|  | 일본, 2024년 농업/산업/서비스업 | 2.882450 / 23.344844 / 73.772706% | [농업 API](https://api.worldbank.org/v2/country/JPN/indicator/SL.AGR.EMPL.ZS?format=json&date=2024), [산업 API](https://api.worldbank.org/v2/country/JPN/indicator/SL.IND.EMPL.ZS?format=json&date=2024), [서비스 API](https://api.worldbank.org/v2/country/JPN/indicator/SL.SRV.EMPL.ZS?format=json&date=2024) |
|  | 우간다, 2024년 농업/산업/서비스업 | 65.411442 / 7.227416 / 27.361146% | [농업 API](https://api.worldbank.org/v2/country/UGA/indicator/SL.AGR.EMPL.ZS?format=json&date=2024), [산업 API](https://api.worldbank.org/v2/country/UGA/indicator/SL.IND.EMPL.ZS?format=json&date=2024), [서비스 API](https://api.worldbank.org/v2/country/UGA/indicator/SL.SRV.EMPL.ZS?format=json&date=2024) |
| `net-migration-map-2024.json` | 대한민국 | 75,963명 | [WDI API](https://api.worldbank.org/v2/country/KOR/indicator/SM.POP.NETM?format=json&date=2024) |
|  | 일본 | 153,357명 | [WDI API](https://api.worldbank.org/v2/country/JPN/indicator/SM.POP.NETM?format=json&date=2024) |
|  | 우간다 | -117,924명 | [WDI API](https://api.worldbank.org/v2/country/UGA/indicator/SM.POP.NETM?format=json&date=2024) |

## 경계·결측 처리와 한계

- 지도 경계는 공통 규칙대로 저장소의 `public/data/base/countries-110m.geojson`를 사용한다. 여기서는 경계를 새로 만들거나 수정하지 않았다. 지도 값은 WDI의 217개 ISO3 국가·경제 코드에 맞췄으며, 경계 파일에 대응되는 지형이 없을 수 있는 코드는 별도 지형을 추가하지 않았다.
- 2024년 인구 밀도 값은 214/217, 국제 이주민 비율은 216/217, 개인 송금 수입 비율은 162/217 코드에 관측값이 있다. 나머지는 `null`이며 0으로 바꾸거나 주변 국가 값으로 채우지 않았다. 65세 이상 인구 비율은 217/217개 코드에 값이 있다.
- WDI 지도는 2024년 국가별 비율·밀도의 스냅샷이다. 국가 단위의 평균은 한 국가 내부의 도시·농촌 차이를 보여 주지 않는다.
- 새 조출생률·조사망률 계열은 두 지표 모두 2024년이 최신 공통 연도였고 217/217 코드가 유효했다. 부양비와 순이동은 2024년 217/217, 산업별 종사자 비율은 2024년 182/217 코드에서 유효했다. 부양비·순이동은 WDI가 인용하는 UN WPP/세계은행 추정 계열이며, 순이동을 연간 입국자 수로 읽으면 안 된다. 산업별 고용은 ILO 모형 추정치다.
- 세계 인구 시계열은 1950–2023년 추계, 2024–2100년 중위 변이 전망을 한 선으로 잇는다. 전망 구간은 실제로 관측된 미래값이 아니다. 대륙 비중은 WPP의 여섯 대륙 지역 분류에 맞추며, 인구 밀도와 같은 지표가 아니다.
- 송금 비율의 결측이 많은 것은 원자료에 관측값이 없는 국가가 있기 때문이다. 결측을 낮은 송금액으로 읽지 않아야 한다.
- 세계은행의 2024 인구 상위 10개국 순위는 WDI 국가별 값만 대상으로 했다. 국가별 값의 출처는 WPP·국가 통계기관 등으로 구성될 수 있으므로 수업 자료에는 World Bank/WDI와 기준 연도를 표시한다.
- 국제 이주민 비율과 송금 비율은 서로 다른 지표다. 국제 이주민 비율은 유입 지역의 거주 인구 구성, 송금 수입 비율은 송금을 받는 지역의 GDP 대비 거시적 규모를 나타낸다. 둘을 인과 관계나 개인별 경험으로 해석하지 않는다.

## 출처 및 이용 조건

- WDI 신규 지표 페이지: [조출생률](https://data.worldbank.org/indicator/SP.DYN.CBRT.IN), [조사망률](https://data.worldbank.org/indicator/SP.DYN.CDRT.IN), [유소년 부양비](https://data.worldbank.org/indicator/SP.POP.DPND.YG), [노년 부양비](https://data.worldbank.org/indicator/SP.POP.DPND.OL), [농업 종사자](https://data.worldbank.org/indicator/SL.AGR.EMPL.ZS), [산업 종사자](https://data.worldbank.org/indicator/SL.IND.EMPL.ZS), [서비스업 종사자](https://data.worldbank.org/indicator/SL.SRV.EMPL.ZS), [순이동](https://data.worldbank.org/indicator/SM.POP.NETM). 각 페이지는 CC BY 4.0을 표시한다. 산업별 종사자 자료 페이지는 ILO 모형 추정치라고 표시한다. 전체 이용 조건은 [World Bank 데이터 이용 조건](https://datacatalog.worldbank.org/public-licenses).
- WPP 2024: [공식 다운로드 페이지](https://population.un.org/wpp/), [세계 총인구 데이터 프로필 및 이용 조건](https://population.un.org/dataportal/countryProfiles/types/1/topics/1/coreThemes/7/locations/231), [Data Sources 라이선스 문구](https://population.un.org/wpp/assets/Excel%20Files/4_Metadata/WPP2024_Data_Sources.pdf), [CC BY 3.0 IGO](https://creativecommons.org/licenses/by/3.0/igo/).
- 이주민 통계 정의와 개정 범위: [UN DESA International Migrant Stock 2024](https://www.un.org/development/desa/pd/content/international-migrant-stock/).

## 생성 스크립트

- `python3 scripts/data/03-01/world_bank.py`
- `python3 scripts/data/03-01/wpp2024_pyramids.py`
- `python3 scripts/data/03-01/wpp2024_population.py`
