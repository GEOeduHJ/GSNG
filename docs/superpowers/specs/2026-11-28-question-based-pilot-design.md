# 질문 기반 파일럿 설계

- 상태: 사용자 실행 지시가 이전 검토의 보완 제안을 승인함. 제품 구현은 root의 문서 검수 뒤 시작한다.
- 범위: 01-01과 03-01 opt-in. 다른 11개 중단원의 기존 동작과 콘텐츠는 유지한다.
- 현재 기반: React + Vite, 브라우저 localStorage v4, 학생 결과 JSON `gsng-unit-result` schemaVersion 1.

## 학습 기록 계약

- 기존 질문 `text`, `convertedText`, 선택 버전은 보존한다. 최초 질문 산출이 끝날 때 `initialText`와 `origin`을 고정한다. origin은 `student|routine|external-ai|peer|teacher`다.
- `revisions`는 `{id,before,after,reason,source,evidenceIds,createdAt,feedbackIds?}`를 기록한다. 타이핑은 기록하지 않고 명시적 저장만 허용한다. after/reason이 비거나 before와 같으면 저장하지 않는다. 최초 질문은 수정 뒤에도 보존한다.
- `questionText`는 마지막 정상 revision의 after를 우선하고, 없으면 기존 선택 버전 규칙을 따른다. 질문 ID, 루틴·활동 응답, 근거 연결을 보존한다.
- pilot 기록의 `recordId`는 이름에서 만들지 않는 안정 무작위 ID다. 첫 실제 갱신 때 한 번 생성해 localStorage에 저장한다.
- 외부 AI 링크는 우선화 완료, 유효한 선택 질문, 선택 이유가 모두 있을 때만 연다. 링크 열기 흔적과 학생의 자기 보고 출처를 구분한다. 첫 선택 질문·이유 스냅샷을 보존하며 외부 대화 내용을 추적한다고 표시하지 않는다.
- result schemaVersion 1을 유지하고 `recordId`, 질문 기록 등은 선택 필드로 추가한다. 이전 v1 결과와 storage v4 기록을 읽는다.

## 루틴·피드백 계약

- 두 단원 모두 절 1은 opener, 절 2·3은 inquiry 루틴 하나를 기본으로 보여 준다. 나머지 루틴과 기본 closing은 접힌 선택 활동이다. 기존 응답은 보존하고 응답 필수화나 새 진도 잠금은 두지 않는다.
- 별도 활동은 겹치는 사고 목표가 있으면 확장으로 구분한다. 학생이 루틴·활동 응답을 골라 근거 작성 칸에 불러와 확인·수정한 뒤 질문에 연결한다. 원응답은 유지하고 출처 종류·절·카드/필드 ID를 근거에 보존한다.
- 교사 피드백 파일은 `{schema:'gsng-teacher-feedback',schemaVersion:1,feedbackId,recordId,unitId,createdAt,comments:[{questionId,text}],sourceSnapshot:{questions,explanation}}`이다. 학생 응답은 피드백 기록과 별도로 보존한다.
- 가져오기는 같은 unitId·recordId와 존재하는 questionId에만 추가한다. 타 기록·다른 단원·깨진 형식·참조는 기록을 바꾸지 않는다. 같은 feedbackId는 중복 거부 또는 무해한 무시로 처리한다.
- 안정 ID 없는 예전 결과는 교사가 열람할 수 있고, 피드백 대상은 학생 재내보내기를 안내한다. 피드백은 질문·설명을 자동 수정하지 않는다. 학생은 질문 revision에 feedbackIds를 연결하거나 explanationRevisions로 설명 전후를 명시 저장하고 반영/보류와 이유를 남긴다.
- 활동 응답은 설정 라벨로 표시한다. 교사 파일 중복은 recordId 우선으로 구분하고 legacy는 기존 규칙을 유지한다.

## 운영·제외 범위

- 4차시 말 기존 마무리 export 쪽에서 초안 JSON을 내보내고, 차시간 교사가 피드백 파일을 만든다. 5차시 초 학생이 피드백 파일을 가져와 질문·설명을 다시 쓴다. 학생 결과 JSON 복원 기능은 추가하지 않는다.
- 두 단원의 교사용 50분×5차시 안에 루틴, 초안 제출, 피드백 재작성을 배분하고 각 차시 합계를 50분으로 맞춘다. README와 도움말은 현행 역할·출처·저장·피드백 흐름에 맞춘다.
- 새 문헌·통계·연구자료, 새 의존성, 내장 AI, 서버·계정, 배포·병합·푸시는 범위 밖이다. 교육 효과를 주장하지 않는다.
