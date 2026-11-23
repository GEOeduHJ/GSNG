# React 기반 세계시민과 지리 웹 플랫폼 구현 계획

**목표:** 2022 개정 「세계시민과 지리」 13개 성취기준의 수업 모듈을 학생·교사가 탐색하고 질문·자료·설명을 연결하는 React 웹 시제품으로 구현한다.

**설계:** 모듈별 공식 성취기준·설명·탐구 활동·도구 설정은 각각 독립 파일에 둔다. 공통 React 컴포넌트가 모듈 설정을 받아 수업 화면과 지도·그래프·관계망을 표시한다. 사용자 입력은 브라우저 로컬 저장소에만 둔다.

**기술:** React, Vite, JavaScript ES modules, MapLibre GL JS, Apache ECharts, Cytoscape.js, `localStorage`. 라이브러리 버전은 `package.json`과 `package-lock.json`에 고정한다.

**기준 문서:** `method/module-digital-implementation-plan-2026-11-23.md`, `method/achievement-standard-platform-map-2026-11-11.md`.

## 접근 방식

- **선택: React + Vite와 성취기준별 모듈 파일.** 공통 수업 흐름과 상호작용 컴포넌트를 재사용하면서 각 성취기준의 콘텐츠·자료·AI 정책을 파일 단위로 수정할 수 있다.
- 정적 HTML 단일 앱은 초기 실행은 간단하지만 모듈 데이터와 화면 로직이 커질수록 변경 영향이 섞인다.
- 서버·계정·대화형 AI를 포함한 완성형 서비스는 자료권리·학교 보안·연구 윤리 검토가 선행되어야 하므로 이번 시제품에는 넣지 않는다.

## 구조 원칙

- 각 `src/modules/12sejiNN-NN.js`는 `code`, `standardText`, `goal`, `concept`, `inquiryQuestion`, `activity`, `artifact`, `rubric`, `digitalTools`, `ai`, `visualization`을 내보낸다.
- `src/modules/index.js`는 13개 모듈을 교육과정 순서대로 모아 내보낸다.
- `src/components/`는 모듈 설정을 소비하는 공통 화면, 질문·설명 입력, 교사용 안내, 자료 시각화 컴포넌트를 둔다.
- `src/components/visualizations/`는 MapLibre 지도, ECharts 그래프, Cytoscape 관계망, 시간선·스토리맵 활동을 나눈다. 무거운 지도·그래프 라이브러리는 해당 시각화가 열릴 때 동적 import한다.
- 모듈 콘텐츠는 모듈 파일에서 관리하고, 표시·상태·저장 로직은 공통 컴포넌트에서 관리한다. 새 모듈 추가 시 등록 파일과 모듈 파일을 수정한다.

## AI·디지털 비용 및 자료 정책

- 생성형 AI 코치·학생별 API·RAG·AI 자동채점은 구현하지 않는다.
- 지도는 외부 타일 서버 없이 모듈 파일에 든 시제품용 GeoJSON을 MapLibre로 표시한다. 실자료 연결 시에도 타일·GeoJSON의 출처·이용 조건을 따로 검토한다.
- MapLibre GL JS v6의 worker는 Vite `?worker&url` import와 `setWorkerUrl()`로 번들 위치를 명시한다. 개발 서버에서 `file://` 직접 열기는 지원하지 않는다.
- 차트·관계망은 로컬 패키지를 사용하고 원격 데이터 서비스에 요청하지 않는다.
- 04-02 Dynamic World 레이어는 `ai.status: "optional-not-connected"` 설정으로만 표시한다. 적법성·분류 오차·교사 검토가 끝난 정적 산출 자료를 확보한 뒤 설정 파일의 자료 주소를 교체할 수 있게 한다. 브라우저에서 추론을 실행하지 않는다.
- 모식 자료에는 실제 통계가 아니라는 표식을 붙인다. 로그인·서버 저장·연구자료 수집은 별도 설계한다.

## 구현 작업

1. Vite·React 프로젝트 뼈대와 접근 가능한 화면 셸을 만든다.
2. 13개 모듈 파일과 순서형 등록기를 만든다.
3. 재사용 지도·그래프·관계망·시간선 컴포넌트를 구성한다.
4. 성취기준 설명 → 자료 관찰 → 학생 질문 → 근거·설명 → 교사 안내 흐름을 React 상태로 연결한다.
5. 브라우저 저장·JSON 내보내기·README 실행 안내를 정리한다.
