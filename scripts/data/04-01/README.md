# 04-01 세계의 에너지 자원 — 실제 자료

자료 수집일은 2026-11-27이다. 재생 스크립트는 Python 표준 라이브러리를 쓰며 내려받은 원자료를 임시 디렉터리에서만 읽는다. 저장소에는 웹에서 읽는 JSON만 두었고, 산출 JSON은 모두 1MB 이하이다.

## 산출물

| 파일 | 화면 형식 | 기간·기준 | 크기 |
| --- | --- | --- | ---: |
| `energy-mix-world-series.json` | 선그래프 | 1980–2025 | 8,498 bytes |
| `energy-mix-korea-series.json` | 선그래프 | 1980–2025 | 8,382 bytes |
| `energy-use-per-capita-map.json` | 단계 구분도 | 2024 | 4,827 bytes |
| `oil-production-top10.json` | 막대그래프 | 2025 | 1,006 bytes |
| `gas-production-top10.json` | 막대그래프 | 2025 | 1,011 bytes |
| `coal-production-top10.json` | 막대그래프 | 2025 | 1,028 bytes |
| `energy-net-imports-map.json` | 단계 구분도 | 2024 | 4,668 bytes |
| `renewable-electricity-share-map.json` | 단계 구분도 | 2024 | 3,329 bytes |
| `solar-capacity-top10.json` | 막대그래프 | 2024 | 887 bytes |
| `wind-capacity-top10.json` | 막대그래프 | 2024 | 872 bytes |
| `korea-renewable-electricity-share-series.json` | 선그래프 | 1985–2025 | 1,208 bytes |

## 출처와 이용 조건

- **에너지 구성·1인당 공급·화석연료 생산:** Our World in Data(OWID) 에너지 자료의 [카탈로그](https://catalog.ourworldindata.org/energy/owid_energy/)와 고정판 CSV([2026-09-10판](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv))를 썼다. OWID는 자료를 수집·가공하지만 원출처 조건이 계속 적용된다고 명시한다. [Energy Institute 2026 이용 안내](https://www.energyinst.org/__data/assets/pdf_file/0005/1848245/2609-SR-USER-GUIDE31c.pdf)는 Statistical Review 데이터를 무료로 이용·복제할 수 있고 `Energy Institute Statistical Review of World Energy`와 발행 연도를 인용해 달라고 안내한다. [U.S. EIA 이용 조건](https://www.eia.gov/about/copyrights_reuse.php)은 EIA 자료를 공공 도메인으로 두고, 재사용 시 출처·발행일 표기를 요청한다. OWID의 가공 작업은 CC BY 4.0으로 표시되지만, 데이터셋 전체를 단일 CC BY 자료로 간주하지 않고 각 원출처 조건을 함께 기록했다.
- **1인당 공급량의 인구 자료:** OWID는 1950년 이후 인구 자료에 [UN World Population Prospects 2024](https://population.un.org/wpp/)를 쓴다고 밝힌다. WPP 자료의 [공식 설명](https://population.un.org/wpp/assets/Files/WPP2024_Methodology-Report_Final.pdf)은 CC BY 3.0 IGO를 표시한다. 2024년은 중위 시나리오 인구 추계가 분모에 쓰이므로 관측 인구로 오해하지 않도록 매니페스트와 수업 안내에 적었다.
- **에너지 순수입:** [World Bank 지표 페이지](https://data.worldbank.org/indicator/EG.IMP.CONS.ZS)는 원출처를 IEA Energy Statistics Data Browser로 표시하고 이 지표의 이용 조건을 CC BY 4.0으로 명시한다. [IEA 브라우저](https://www.iea.org/data-and-statistics/data-tools/energy-statistics-data-browser)도 CC BY 4.0을 표시한다. 선택한 지표는 `Energy imports, net (% of energy use)`이며 에너지 전반의 순수입 비율이다. 화석연료만의 무역수지를 직접 보여 주지는 않는다.
- **재생 발전·태양광·풍력 설비 용량:** [Ember Yearly Electricity Data](https://ember-energy.org/data/yearly-electricity-data/)의 세계 CSV를 이용했다. Ember 공식 페이지는 발전량·설비 용량을 포함한 자료를 200개가 넘는 지역에 제공하고, 사이트의 콘텐츠를 CC BY 4.0으로 공개한다고 표시한다. [IRENA 이용 조건](https://www.irena.org/terms-and-conditions)은 콘텐츠의 복제·공유·재생산을 비상업적 용도로 제한하므로, 더 개방적인 Ember 자료를 선택했다. Ember는 여러 국제·국가 자료를 모아 구성하며 원자료의 세부 출처와 방법은 페이지의 방법론 문서를 따른다.

## 가공·경계·결측 처리

- **에너지 구성:** OWID 고정판의 총에너지 공급(total energy supply) 비중을 1980–2025년으로 추렸다. 최신 Energy Institute 통계는 2025년부터 물리적 에너지 함량 기준을 사용하므로 옛 화석연료 등가법으로 계산된 과거 판과 수치를 직접 이어 비교하면 안 된다. Energy Institute는 이 통계에서 공급과 소비라는 말을 서로 바꾸어 사용한다고 설명한다.
- 요청된 여섯 범주 중 `기타 재생에너지`는 OWID의 `renewables_energy_share_pct - hydro_energy_share_pct`로 계산했다. 따라서 태양광·풍력·바이오에너지 등 수력을 제외한 재생에너지 범주가 포함되고, 여섯 범주는 표시 반올림 범위에서 총에너지 공급 비중 100%를 이룬다. 원자료에서 값이 없으면 `null`로 두며 0으로 바꾸지 않았다.
- **1인당 공급 지도:** OWID `total_energy_per_capita_kwh`의 2024년 값을 사용했다. 2025년에는 기존 경계와 연결되는 값이 77개국에 그쳤고, 2024년은 172/174개국이어서 더 넓은 비교가 가능하다. 단위는 kWh/인이다.
- **생산 막대그래프:** 석유·천연가스·석탄의 2025년 생산량을 에너지 등가 TWh로 비교해 각 상위 10개국을 골랐다. 이는 원유 배럴·가스 부피·석탄 톤 단위가 아니라 연료의 에너지량으로 바꾼 값이다. 국가 코드는 기존 Natural Earth 경계의 ISO_A3 코드와 연결되는 자료만 포함했다.
- **에너지 순수입 지도:** World Bank `EG.IMP.CONS.ZS`의 2024년 값을 썼다. 양수는 순수입, 음수는 순수출을 뜻한다. 값이 없는 국가는 `null`이다. 경계 파일의 ISO_A3 코드 174개 중 135개에 2024년 관측값이 있다.
- **재생 발전 지도와 용량 순위:** Ember 자료 중 지도와 상위국 비교는 2024년으로 맞췄다. 2025년 발전 비중은 연결 가능한 경계 174개 중 92개, 태양광·풍력 용량은 각각 83·82개에만 값이 있어 2024년(발전 비중 166개, 태양광 164개, 풍력 163개)보다 전 세계 분포와 상위 순위를 비교하기 어렵다. 대한민국 재생 발전 비중 시계열은 원자료에 값이 있는 1985–2025년을 담았다.
- 지도는 기존 `public/data/base/countries-110m.geojson`의 `iso_a3`만 사용했다. 경계 파일의 177개 도형 중 ISO3 코드가 없는 Northern Cyprus, Somaliland, Kosovo 3개 도형에는 임의 코드를 붙이지 않았다. 모든 지도 값은 해당 경계 코드에 대응하고, 관측값이 없는 국가는 `null`이다. 새 경계는 만들지 않았다.

## 원자료 값 대조표

산출 파일마다 값 세 개를 원자료 CSV 또는 API에서 다시 확인했다. OWID 자료는 아래 고정판, World Bank는 2024년 지표 API, Ember는 출처 페이지에서 연결한 세계 CSV와 대조했다. 기타 재생 값은 OWID의 재생에너지 전체 비중에서 수력 비중을 뺀 결과다.

| 산출 파일 | 원자료에서 확인한 세 값 | 확인 URL |
| --- | --- | --- |
| `energy-mix-world-series.json` | 2025년 세계 석탄 27.657274%, 석유 33.478043%, 기타 재생 8.590819−수력 2.686097=5.904722% | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `energy-mix-korea-series.json` | 2025년 대한민국 석탄 22.011320%, 석유 41.787216%, 기타 재생 3.198880−수력 0.105604=3.093276% | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `energy-use-per-capita-map.json` | 2024년 대한민국 70,773.4375, 중국 31,075.7793, 미국 74,018.3516 kWh/인 | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `oil-production-top10.json` | 2025년 미국 10,349.585, 사우디아라비아 6,231.614, 러시아 6,085.449 TWh | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `gas-production-top10.json` | 2025년 미국 10,737.427, 러시아 6,093.858, 이란 2,648.254 TWh | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `coal-production-top10.json` | 2025년 중국 26,295.787, 인도 4,991.563, 인도네시아 4,454.129 TWh | [OWID 고정판 CSV](https://catalog.ourworldindata.org/garden/energy/2026-09-10/owid_energy/owid_energy.csv) |
| `energy-net-imports-map.json` | 2024년 대한민국 83.242714%, 중국 24.019197%, 미국 -9.781274% | [World Bank API, EG.IMP.CONS.ZS](https://api.worldbank.org/v2/country/all/indicator/EG.IMP.CONS.ZS?format=json&per_page=20000&date=2024) |
| `renewable-electricity-share-map.json` | 2024년 대한민국 10.467%, 중국 33.158%, 미국 24.063% | [Ember 세계 연간 CSV](https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv) |
| `solar-capacity-top10.json` | 2024년 중국 887.1GW, 미국 177.59GW, 인도 98.48GW | [Ember 세계 연간 CSV](https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv) |
| `wind-capacity-top10.json` | 2024년 중국 521.27GW, 미국 152.65GW, 독일 72.74GW | [Ember 세계 연간 CSV](https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv) |
| `korea-renewable-electricity-share-series.json` | 대한민국 2000년 1.415%, 2010년 1.149%, 2024년 10.467% | [Ember 세계 연간 CSV](https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv) |

## 절별 자료 단계 제안

| 절 | 추천 단계 | 파일 및 수업에서 볼 점 |
| --- | --- | --- |
| 1. 주요 에너지 자원의 소비 구조는 어떻게 변화했을까? | 1단계 | `energy-mix-world-series.json`에서 1980–2025년 세계 석탄·석유·천연가스·원자력·수력·기타 재생 비중 변화를 읽는다. 2025년 이전 판과 계산 방법이 바뀐 점도 확인한다. |
|  | 2단계 | `energy-mix-korea-series.json`을 세계 그래프와 비교해 대한민국의 화석연료·원자력·재생에너지 비중이 어떻게 다른지 설명한다. |
|  | 3단계 | `energy-use-per-capita-map.json`으로 2024년 국가별 1인당 총에너지 공급을 비교한다. 1인당 평균은 국가 안의 개인별 소비 차이를 보여 주지 않는다. |
| 2. 주요 에너지 자원의 생산과 소비는 어떻게 이루어질까? | 1단계 | `oil-production-top10.json`, `gas-production-top10.json`, `coal-production-top10.json`에서 생산 상위국과 에너지 등가 생산 규모를 비교한다. TWh는 연료의 에너지량이지 발전량이 아니다. |
|  | 2단계 | `energy-net-imports-map.json`에서 순수입 국가와 순수출 국가를 찾는다. 이 지표는 화석연료만의 무역 수지가 아니라 에너지 전반의 순수입 비율임을 짚는다. |
| 3. 친환경 에너지의 종류와 특징은 무엇일까? | 1단계 | `renewable-electricity-share-map.json`에서 2024년 재생에너지 발전 비중이 높은 국가와 낮은 국가를 비교한다. 발전 비중과 전체 에너지 공급 비중을 구분한다. |
|  | 2단계 | `solar-capacity-top10.json`과 `wind-capacity-top10.json`으로 태양광·풍력 설비 용량 상위국을 비교한다. 용량은 설치 규모이며 실제 발전량이나 비중과 같지 않다. |
|  | 3단계 | `korea-renewable-electricity-share-series.json`에서 대한민국의 재생에너지 발전 비중 변화를 읽고, 설비 확충이 발전 구성에 어떻게 반영되는지 질문을 만든다. |

## 한계와 생성

- Energy Institute의 2026 통계는 2025년부터 물리적 에너지 함량 방식으로 총에너지 공급량을 계산한다. 옛 방법으로 공개된 이전 판과 단순 접합하지 않는다.
- OWID 에너지 표는 여러 출처를 조합·정리한 자료다. 에너지원 구성에서 1980년 이전의 장기 역사 추정치는 제외했으며, 선택한 비중·생산 값의 원출처와 인용 조건은 매니페스트에 표시했다.
- Ember의 2024년 값은 국가별 비교 범위가 2025년보다 넓어 지도로 선택했다. 대한민국 시계열의 마지막 2025년 값은 최신판에서 제공되는 관측값이다.
- **생성:** `python3 scripts/data/04-01/owid_energy.py`, `python3 scripts/data/04-01/world_bank.py`, `python3 scripts/data/04-01/ember_electricity.py`
