# 세계시민과 지리 React 시제품

React + Vite로 만든 13개 성취기준별 질문·탐구 웹 시제품입니다. 모듈 데이터는 `src/modules/`의 성취기준별 파일에서 관리합니다.

## 실행

```sh
npm install
npm run dev
```

Vite가 출력하는 로컬 주소(예: `http://127.0.0.1:5173/`)를 브라우저에서 엽니다. `index.html`을 파일 탐색기에서 직접 열어 `file://`로 실행하면 React 모듈과 MapLibre worker가 로드되지 않습니다. 정적 산출물은 `npm run build`로 `dist/`에 생성합니다.

## 모듈 유지보수

- 각 `src/modules/12sejiNN-NN.js` 파일에는 성취기준 원문, 학습 내용, 디지털 도구, AI 정책, 시각화 자료가 함께 있습니다.
- `src/modules/index.js`에서 교육과정 순서를 관리합니다.
- 화면 구조와 상태 로직은 `src/components/`에 두고, MapLibre·ECharts·Cytoscape.js 렌더링은 `src/components/visualizations/`에서 관리합니다.
- 새 모듈을 추가할 때 같은 설정 구조를 따르고 등록기에 추가합니다. 기존 모듈 수정은 해당 모듈 파일에서 끝나도록 설계했습니다.
- 필수 필드와 시각화 유형 연결 규칙은 `src/modules/README.md`를 확인합니다. 새 시각화 유형을 만들 때는 `ModuleVisualization.jsx`의 렌더러를 추가하고 그 모듈의 설정은 별도 파일에 둡니다.
- 시각화 라이브러리는 필요한 모듈을 열었을 때 동적으로 불러옵니다. ECharts는 실제 사용 중인 막대·선·원형 차트와 접근성·축·범례 구성요소만 등록합니다.

## AI·자료·저장 범위

- 생성형 AI, 학생별 API, RAG, AI 자동채점은 없습니다. 외부 AI API 비용은 발생하지 않습니다.
- 지도는 로컬 GeoJSON을 사용하며 외부 타일 서버를 호출하지 않습니다. 시제품용 공간 자료와 그래프 값은 모식 데이터로 표시합니다.
- 04-02의 Dynamic World 정적 분류자료는 선택 기능으로만 설정되어 있고 실제 자료가 연결되어 있지 않습니다. 검수된 자료를 확보한 뒤 `src/modules/12seji04-02.js`의 자료 설정을 교체합니다.
- 학생 질문·근거·설명은 현재 브라우저 `localStorage`에 저장하고, 선택적으로 JSON 파일로 내려받습니다. 교사 계정·학급 공유·서버 저장은 이 시제품에 포함되지 않습니다.

## 근거 문서

- 모듈별 상세 구현 계획: `method/module-digital-implementation-plan-2026-11-23.md`
- React 구조 구현 계획: `platform/web-prototype/implementation-plan.md`
