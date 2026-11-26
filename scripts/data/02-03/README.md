# 02-03 세계의 종교와 인간 생활 — 실제 자료 기록

자료 취득일은 2026-11-26이다. 생성 스크립트는 religion_data.py이며, 출력은 public/data/02-03/에 있다.

## 출처와 자료 선택

| 출처 | 사용 내용 | 확인한 버전·조건 |
| --- | --- | --- |
| [Pew Research Center 국가별 종교 구성 표](https://www.pewresearch.org/feature/religious-composition-by-country-2010-2070/) | 국가별 종교 구성과 세계 합계 | 표 페이지는 2010·2020 추정치와 2030–2070 전망치를 함께 보여 준다. 2010·2020은 2025-06-09에 공개된 추정치이며, 2030년 이후 값은 2026-11-18에 추가된 인구 전망이다. 여기서는 가장 최신의 관측 추정 연도인 2020년 국가별 값을 사용하고, 세계 변화는 2010년과 2020년만 비교했다. |
| [Pew 보고서 및 Appendix B 원자료 PDF](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/PR_2025.06.09_global-religious-change_appendix-b.pdf) | 201개 국가·지역의 2010·2020 종교 구성, 세계·지역 합계 | 2025-06-09 보고서의 종교 구성 표. PDF는 스크립트 실행 중 임시 폴더에만 내려받으며 저장소에는 넣지 않는다. |
| [GeoNames Gazetteer](https://www.geonames.org/export/) 및 [라이선스 안내](https://download.geonames.org/export/dump/readme.txt) | 대표 도시 지명의 WGS84 위도·경도 | GeoNames 데이터는 CC BY 4.0이며, 좌표는 소수점 경위도다. 각 지명 레코드 주소와 대표 좌표는 아래 검증표에 적었다. |
| [기존 Natural Earth 국가 경계](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson) | 단계 구분도 바탕의 ISO3 코드 | 저장소의 public/data/base/countries-110m.geojson을 변경 없이 참조했다. 새 경계는 만들지 않았다. |

### Pew 이용 조건과 화면 출처 문구

Pew 이용 약관은 출처 표시를 전제로 콘텐츠의 인용·수정·2차 저작물 제작을 허용하지만, 자료 전체나 본질적인 부분을 허가 없이 재게시하지 못하게 한다. 이 산출물은 2020년 종교 비율의 선택된 수치와 세계 합계만 가공해 담았다. Pew의 CC BY 라이선스 자료가 아니므로 manifest에는 “Pew Research Center 이용 약관에 따른 조건부 재사용”으로 표기했다. Pew의 입장이나 종교에 대한 지지로 오해될 표현도 피해야 한다.

약관이 요구하는 인용 형식은 다음과 같다.

> “How the Global Religious Landscape Changed From 2010 to 2020.” Pew Research Center, Washington, D.C., June 9, 2025. https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/

데이터 이용 면책 문구와 한국어 번역 관련 고지는 원문 그대로 manifest의 각 Pew 자료 attribution에 넣었다. DataStage 화면 캡션에도 이 문구가 표시된다.

> Pew Research Center bears no responsibility for the analyses or interpretations of the data presented here. The opinions expressed herein, including any implications for policy, are those of the author and not of Pew Research Center.
>
> Pew Research Center has published the original content in English but has not reviewed or approved this translation.

약관은 이용 조건을 바꿀 수 있으므로 공개·배포 시 최신 [Pew 이용 약관](https://www.pewresearch.org/about/terms-and-conditions/)을 다시 확인한다. 위 인용·면책 문구의 근거는 약관 1·2절과 Data 이용 조항이다.

## 산출 파일

| 파일 | 크기 | 형식과 내용 |
| --- | ---: | --- |
| religion-christian-share-map.json | 2,980 bytes | 2020년 국가별 크리스트교 인구 비율, ISO3 단계 구분도 |
| religion-muslim-share-map.json | 2,952 bytes | 2020년 국가별 이슬람교 인구 비율, ISO3 단계 구분도 |
| religion-buddhist-share-map.json | 2,978 bytes | 2020년 국가별 불교 인구 비율, ISO3 단계 구분도 |
| religion-hindu-share-map.json | 2,984 bytes | 2020년 국가별 힌두교 인구 비율, ISO3 단계 구분도 |
| religion-global-share-series.json | 755 bytes | 2010·2020년 세계 종교별 인구 비율, 선그래프 자료 |
| religion-sites-points.geojson | 2,678 bytes | 주요 종교의 발상지·성지와 연결된 대표 도시 9곳, 점 GeoJSON |

모든 산출물은 1MB 이하이다. 단계 구분도는 {year, unit, values} 형식이며 단위는 % of population이다. 세계 그래프는 {unit, years, series} 형식이며 7개 범주를 원자료 순서로 담았다. 순위표가 아니며 숫자 크기를 종교의 우열로 해석하지 않는다. GeoJSON의 점 속성은 name(한국어), category(한국어), color이다.

## 가공·경계·결측 처리

- 스크립트는 Pew PDF를 pypdf로 읽고, 201개 국가·지역과 7개 세계·지역 합계를 확인한다. PDF를 다운로드하지 않고 파싱하는 별도 의존성 설치는 하지 않았다. Python 표준 라이브러리 외에 pypdf가 필요하다.
- 기존 국가 경계의 ISO3 코드는 174개다. Pew 국가·지역 201개 중 이름 별칭을 포함해 170개를 기존 ISO3 코드와 연결했다. 코드가 없거나 대응되는 단독 폴리곤이 없는 자료 행은 새 경계를 추가하지 않았다.
- Pew 표는 소수점 첫째 자리로 반올림하며 일부 값은 <0.1로 제공한다. 이 값은 0으로 바꾸지 않고 `values`에서는 null, 별도 `below` 목록에 `'<0.1'`로 기록한다(2026-11-27 Claude 수정). 지도는 `below` 국가를 '0.1% 미만'이라는 별도 색으로 표시하므로, 회색 '자료 없음'은 원자료에 값이 없거나 지도 코드에 대응하지 못한 경우만 뜻한다.
- 세계 그래프는 Pew가 제시한 반올림 비율 그대로를 사용했다. 범주별 합계는 원자료 반올림 때문에 정확히 100%가 아닐 수 있다.
- 성지 점은 GeoNames의 도시 대표 좌표다. 예배당·사원·유적의 정확한 위치나 경계가 아니다. GeoNames 화면의 표기 순서는 위도, 경도지만 GeoJSON에는 표준 순서인 경도, 위도([lon, lat])로 기록했다.
- 예루살렘 속성에는 도시명만 담았고 국가·주 귀속 속성을 넣지 않았다. 여러 전통에서 중요하게 여기는 장소라는 뜻으로 공동 성지(크리스트교·이슬람교·유대교)로 분류했다.
- 힌두교는 단일 창시자나 하나의 발상지로 설명하기 어렵다. 바라나시와 마투라는 발상지로 단정하지 않고 성지·종교 중심지의 대표 지점으로 담았다.

## 생성 뒤 원 사이트에서 확인한 값

아래에서 각 산출 파일마다 세 값을 골라 원자료 페이지와 대조했다. Pew 국가별 값은 Appendix B의 2020년 해당 국가 행, 세계 값은 보고서의 세계 구성 표에서 확인했다. 좌표는 GeoNames 개별 지명 레코드에 나온 위도·경도다.

| 산출 파일 | 대조한 값 3개 | 확인 URL |
| --- | --- | --- |
| religion-christian-share-map.json | 미국 64.0%, 브라질 80.7%, 인도 2.2% | [Pew Appendix B PDF](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/PR_2025.06.09_global-religious-change_appendix-b.pdf) |
| religion-muslim-share-map.json | 인도네시아 87.0%, 파키스탄 96.5%, 알바니아 74.5% | [Pew Appendix B PDF](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/PR_2025.06.09_global-religious-change_appendix-b.pdf) |
| religion-buddhist-share-map.json | 태국 94.4%, 일본 37.2%, 대한민국 19.0% | [Pew Appendix B PDF](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/PR_2025.06.09_global-religious-change_appendix-b.pdf) |
| religion-hindu-share-map.json | 인도 79.4%, 네팔 81.2%, 방글라데시 7.9% | [Pew Appendix B PDF](https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/PR_2025.06.09_global-religious-change_appendix-b.pdf) |
| religion-global-share-series.json | 세계 크리스트교 2010년 30.6%, 세계 이슬람교 2020년 25.6%, 세계 불교 2020년 4.1% | [Pew 보고서의 세계 종교 구성 표](https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/) |
| religion-sites-points.geojson | 베들레헴 31.70487°N, 35.20376°E; 메카 21.42664°N, 39.82563°E; 바라나시 25.31668°N, 83.01041°E | [베들레헴](https://www.geonames.org/284315/bethlehem.html), [메카](https://www.geonames.org/104515/makkah.html), [바라나시](https://www.geonames.org/1253405/varanasi.html) |

## 절별 자료 단계 제안

| 절 | 추천 단계(2–4개) | 수업에서 볼 점 |
| --- | --- | --- |
| 세계의 주요 종교는 어떻게 분포할까? | 크리스트교·이슬람교·불교·힌두교 국가별 비율 지도 각 1개 | 세계 분포의 넓은 권역과 국가 안의 비율을 함께 살핀다. |
| 세계 주요 종교의 특징은 무엇일까? | 성지 대표점 지도 + 종교 비율 지도 1개 | 성지의 공간적 분포와 종교 인구 분포를 연결한다. 신앙의 교리·의례·역사적 특징은 본문 자료가 별도로 설명해야 한다. |
| 종교는 인간 생활에 어떤 영향을 미칠까? | 세계 종교 비율 변화 그래프 + 성지 대표점 지도 + 국가별 비율 지도 1개 | 인구 구성과 종교 경관을 배경 자료로 사용한다. 이 자료만으로 일상생활의 영향이나 인과관계를 측정할 수 없으므로, 생활 사례·의례·공간 이용에 대한 별도 서술 자료와 함께 질문한다. |

## 다음 담당자를 위한 한계

국가별 수치는 인구 구성 추정치이지 개인의 신앙 실천 빈도나 종교의 사회적 영향력을 재는 지표가 아니다. 성지 점도 대표 도시 위치다. 회색 국가를 0%로 읽지 않도록 범례 설명을 붙이고, 종교별 분포가 문화·정치·생활 양식을 직접 결정한다고 단정하지 않는다.
