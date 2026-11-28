# 세계시민과 지리 · 웹 재구성형 디지털 교과서

React + Vite 기반의 웹형 디지털 교과서입니다. PDF 페이지를 웹에서 보여 주지 않습니다. 4개 대단원·13개 중단원·41개 학습 절 순서를 목차에 반영하고, 설명 본문과 활동은 교육과정 성취기준 및 공개 기관 자료를 바탕으로 독립 집필했습니다.

## 실행하기

```sh
npm install
npm run dev
```

Vite가 출력하는 주소를 브라우저에서 엽니다. `index.html`을 파일 탐색기에서 바로 열면 React 모듈과 MapLibre worker가 작동하지 않습니다. 배포용 정적 파일은 `npm run build`로 `dist/`에 생성합니다.

## v2 교과서 (브랜치 `redesign/v2`)

`src/main.jsx`는 v2 교과서(`src/book/App.jsx`)를 띄웁니다. v1 코드(`src/App.jsx`, `src/components/`, `src/modules/`, `src/content/units/`)는 연구자 검토 전까지 지우지 않고 남겨 두었으며, 빌드에는 포함되지 않습니다.

- 설계: `docs/superpowers/specs/2026-11-26-textbook-v2-redesign-design.md`
- 구현 계획: `docs/superpowers/plans/2026-11-26-textbook-v2-skeleton-pilot.md`

```sh
npm test            # Vitest 단위·화면 테스트
npm run check:book  # 구조 검사(절 문단 4~6, 문단–자료 대응, 개념·출처·자료·삽화 기록, 14px 미만 글씨 금지)
npm run dev
```

| 경로 | 내용 |
| --- | --- |
| `content/book/toc.yaml` | 4 대단원·13 중단원·41 절 차례 |
| `content/book/<중단원>/unit.yaml` | 여는 펼침면(질문 초점)·닫는 펼침면(전이 과제) |
| `content/book/<중단원>/lesson-N.md` | 절 본문(머리말: 문단별 자료 단계, 핵심 낱말, 활동, 출처) |
| `content/book/<중단원>/teacher.md` | 교사용 안내(`#/teacher/<중단원>`에서만 보임) |
| `content/concepts.yaml` | 개념 사전(공개한 ID는 바꾸지 않고 `aliases`로만 변경) |
| `content/sources.yaml`, `content/data-manifest.yaml`, `content/image-provenance.yaml` | 출처·자료·삽화 기록 |
| `public/data/`, `scripts/data/` | 실제 공개 자료의 정적 산출물과 가공 스크립트 |
| `src/book/` | 차례, 펼침면, 스크롤 연동 절 지면, 중단원 QFT 여는 쪽·닫는 쪽 |
| `src/activities/` | 절 활동 템플릿(`layer-compare`, `evidence-sort`, `decision-matrix`, `civic-hearing`) |
| `src/teacher/` | 교사용 결과 파일 모아보기와 수업 안내 |
| `src/storage/` | 학생 기록(브라우저 localStorage, v4)과 결과 파일(`gsng-unit-result` v1) |

## v1 콘텐츠 구조 (참고용)


- `src/content/units/unit-01.js` … `unit-04.js`: 대단원별 학습 절 원고, 핵심 개념, 활동, 시각화, 실제 사례와 출처 ID
- `src/content/bookIndex.js`: 4개 대단원·13개 중단원·41개 학습 절을 라우트와 성취기준에 연결
- `src/content/sources.js`: UNESCO, FAO, UN, World Bank, USGS 등 공개 기관 자료 링크
- `src/modules/12sejiNN-NN.js`: 성취기준 13개별 QFT 초점, 수업 단계, 교사용 안내, 평가 관점
- `src/lesson-modules/unit-01/`: 1단원 9개 학습 절의 QFT 초점·디지털 활동 자료를 절별 설정 파일로 관리
- `src/components/lesson-modules/unit-01/`: 각 활동을 별도 React 화면 파일로 관리
- `src/storage/learning-records.js`: 기존 공통 기록을 보존하면서 절별 QFT·활동 기록을 로컬 저장
- `src/components/`: 교과서 목차, 웹 본문, 질문 탐구, 기록과 교사용 안내
- `src/components/visualizations/`: MapLibre, ECharts, Cytoscape.js, 자체 SVG 지형 개념 모형

각 학습 절은 새로 쓴 본문 설명, 핵심 낱말, 자료 탐색, 직접 수행 활동, 출처가 연결된 실제 사례로 구성됩니다. 외부 기관의 본문·이미지·데이터를 복제하지 않고 링크만 제공합니다. 실측 자료를 탑재하지 않은 그림·그래프·지도는 `모식 자료`로 표시합니다.

## 교과서 안의 질문 기반 학습과 QFT

Question Formulation Technique(QFT)는 Right Question Institute(RQI)의 질문 만들기 절차입니다. 학생은 여는 쪽에서 질문을 만들고, 닫힌·열린 질문을 바꾸어 보고, 이어갈 질문과 자료 계획을 고릅니다. 파일럿은 01-01과 03-01이며, 절 안의 생각 루틴·활동 응답을 골라 근거로 확인하고 질문에 연결할 수 있습니다. 교사용 안내는 `#/teacher/<중단원>`에서 확인합니다.

교사는 두 파일럿의 학생 결과 JSON을 이 화면에서 열고 질문별 코멘트를 적어 별도 교사 피드백 JSON으로 내보냅니다. 학생은 초안을 작성한 같은 기기·브라우저에서 피드백 파일을 가져와 원문을 확인하고 질문·설명을 직접 수정 기록으로 저장합니다. 피드백은 자동으로 적용되지 않으며 성적 채점 기능도 없습니다. 두 파일은 직접 전달하며 사이트로 자동 전송하지 않습니다.

## AI·자료·저장 정책

- 웹사이트 안에 생성형 AI API, AI 코치, 자동 채점 기능은 없습니다.
- 파일럿의 외부 Gemini 링크는 선택 항목입니다. 질문 우선화를 마치고 유효한 질문과 이유를 고른 뒤에만 새 창으로 열립니다. 브라우저는 링크를 연 시각과 학생이 직접 적은 질문 출처만 기록하고 외부 대화나 실제 사용 여부는 추적하지 않습니다. 학교 규칙을 따르고 개인정보나 비공개 자료를 입력하지 않습니다.
- MapLibre 지도와 시제품 그래프는 로컬 모식자료를 사용합니다. 실제 통계나 실제 지형으로 오해하지 않도록 화면에서 구분합니다.
- 학습 기록은 현재 브라우저 `localStorage` v4에 저장됩니다. 학생 결과 파일은 `gsng-unit-result` schemaVersion 1이며 선택 필드를 더해 질문 이력과 피드백 응답을 보존합니다. 교사 피드백은 별도 `gsng-teacher-feedback` v1 JSON입니다. 결과 JSON을 브라우저 기록으로 복원하는 기능은 없습니다.
- 사용자 제공 교과서 PDF, 원문 본문, 페이지 이미지, 제3자 사진은 소스 코드와 배포 파일에 포함하지 않습니다.

## 기술 스택

React 19, Vite 8, MapLibre GL JS, Apache ECharts, Cytoscape.js. 지형 단면 모형은 SVG로 구현해 추가 API나 3D 엔진 호출 없이 작동합니다.

## 콘텐츠 수정 시

1. 새 대단원 원고는 `src/content/README.md`의 스키마에 맞춰 대단원 파일에서 수정합니다.
2. 성취기준 모듈은 해당 `src/modules/12sejiNN-NN.js`에서 관리합니다.
3. 1단원 개별 학습활동은 `src/lesson-modules/README.md` 계약에 맞춰 각 절 파일에서 관리합니다.
4. 새 외부 출처는 `sources.js`와 연구 참고문헌에 추가하고, 각 링크가 해당 설명을 뒷받침하는지 확인합니다.
5. 새로운 실측 데이터·사진·지도·모델 파일을 추가할 때는 자료별 라이선스·출처·기준 시기·공간 범위·대체 설명을 확인합니다.
6. `npm run build`로 프로덕션 번들이 만들어지는지 확인합니다.
