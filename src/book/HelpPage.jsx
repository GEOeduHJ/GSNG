import { useBook } from './BookContext.jsx';

export default function HelpPage() {
  const { storageAvailable, book } = useBook();
  const routineSource = book?.routines?.source ?? {};
  const routineItems = Object.values(book?.routines?.items ?? {});
  return (
    <article className="help-page">
      <h1>도움말</h1>
      <section>
        <h2>내 기록은 어디에 남나요</h2>
        {!storageAvailable && <p className="help-alert">이 기기에서는 학습 기록이 저장되지 않습니다. 브라우저를 닫으면 작성한 내용이 사라지므로, 중단원 마지막 쪽에서 결과 파일을 꼭 내보내 주세요.</p>}
        <p>질문, 근거, 설명은 현재 기기의 브라우저에 저장됩니다. 선생님이나 서버로 자동 전송되지 않습니다.</p>
        <p>중단원 마지막 쪽에서 결과 파일을 내보내고, 선생님이 안내한 학급 게시판(예: 클래스룸)에 직접 제출합니다. 파일에는 실명 대신 별칭이나 학급 번호를 쓰세요.</p>
      </section>
      <section>
        <h2>01-01·03-01 질문 파일럿 피드백</h2>
        <p>4차시 끝에 중단원 마지막 쪽에서 학생 결과 JSON을 내보냅니다. 선생님은 교사용 화면(`#/teacher/01-01` 또는 `#/teacher/03-01`)에서 파일을 열고 질문별 코멘트를 적어 별도 교사 피드백 JSON을 내보냅니다. 두 파일은 직접 전달하며 사이트로 자동 전송되지 않습니다.</p>
        <p>5차시 시작 때 초안을 작성한 같은 기기·브라우저에서 교사 피드백 파일을 가져옵니다. 피드백을 가져와도 기존 질문과 설명은 자동으로 바뀌지 않습니다. 학생이 직접 질문과 설명을 수정할 수 있으며, 명시적으로 수정 기록을 저장하면 전후 내용과 까닭이 남습니다.</p>
        <p>기록 ID가 없는 이전 형식 결과는 선생님이 읽을 수 있지만 질문 코멘트를 받을 수 없습니다. 같은 기기·브라우저에서 결과 파일을 다시 내보낸 뒤 제출하세요.</p>
      </section>
      <section>
        <h2>지도와 그래프의 자료</h2>
        <p>지도와 그래프의 수치는 공개된 실제 통계입니다. 각 자료 아래에 기관과 기준 연도를 적었습니다.</p>
        <p>실제 자료를 구할 수 없어 개념을 보여 주려고 만든 그림은 캡션에 “모식 자료”라고 표시합니다.</p>
        <p>역할극이나 청문회 같은 활동의 상황은 학습을 위해 꾸민 가상 상황일 수 있습니다. 이런 활동은 첫머리에 밝힙니다. 그 안의 수치는 실제 자료에서 가져왔습니다.</p>
        <p>지도의 국경선은 공개 지도 자료를 따른 것이며, 실제 영유권에 대한 판단을 뜻하지 않습니다.</p>
      </section>
      <section>
        <h2>외부 AI 도구를 쓸 때</h2>
        <p>이 교과서는 사이트 안에서 AI를 호출하지 않습니다. 일부 활동은 선택적으로 외부 AI(예: Gemini)를 새 창으로 열 수 있습니다.</p>
        <p>두 파일럿의 Gemini 링크는 질문 우선화를 마치고 현재 이어갈 질문과 이유를 골랐을 때만 표시됩니다. 보통 클릭으로 링크를 연 시각을 기록할 수 있지만, 가운데 클릭이나 링크 메뉴에서 새 탭을 여는 경우 등은 기록되지 않을 수 있습니다. 기록 건수는 실제 링크 열기의 하한으로 봐야 합니다. 외부 대화 내용이나 실제 사용 여부는 추적하지 않습니다. 학교 계정과 학교 이용 규칙을 따르고, AI 답은 출처를 확인해야 하는 자료로 다룹니다.</p>
      </section>
      <section>
        <h2>교사 피드백은 어떻게 쓰나요</h2>
        <p>교사 코멘트는 학생이 질문과 설명을 다시 생각하도록 돕는 형성 피드백입니다. 자동 채점이나 성적 평가가 아니며, 피드백을 가져와도 원래 질문과 설명은 자동으로 바뀌지 않습니다.</p>
        <p>학생 결과 JSON은 브라우저 기록으로 복원되지 않습니다. 질문 수정 이력, 설명 수정 이력, 교사 코멘트와 응답은 다음 결과 파일을 내보낼 때 함께 보존됩니다.</p>
        <p>결과 파일에는 질문 이력과 외부 AI 링크를 연 시각이 담길 수 있습니다. 교사 피드백 파일에는 질문·설명 스냅샷과 질문별 코멘트가 들어갑니다. 학생은 실명 대신 별칭이나 학급 번호를 쓰고, 수업이 끝나면 교사는 결과·피드백 파일을 삭제합니다.</p>
        <p>이 파일을 연구 자료로 사용하려면 연구 계획을 세우고 동의 절차와 기관 심의를 먼저 마쳐야 합니다.</p>
      </section>
      <section>
        <h2>질문 만들기 방법의 출처</h2>
        <p>여는 쪽의 질문 만들기·개선 흐름은 <a href="https://rightquestion.org/what-is-the-qft/">Right Question Institute의 Question Formulation Technique(QFT)</a>를 바탕으로 교과서에 맞춰 구성했습니다.</p>
      </section>
      {routineItems.length > 0 && (
        <section>
          <h2>생각 루틴의 출처</h2>
          <p>각 절의 생각 루틴은 {routineSource.organization ?? 'Project Zero'}의 <a href={routineSource.url}>Thinking Routines</a>에서 이름과 단계 구성을 가져왔습니다. 이용 조건은 루틴 페이지 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>, Global Thinking 묶음 <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a>입니다.</p>
          <p>학생용 안내문은 이 교과서가 우리말로 새로 쓴 것이며 원문의 번역이 아닙니다.</p>
          <ul>
            {routineItems.map((item) => <li key={item.id}><a href={item.url}>{item.name}</a>{item.nameKo ? ` (${item.nameKo})` : ''}{item.adapted ? ` — 단계를 고쳐 씀: ${item.adapted}` : ''}</li>)}
          </ul>
        </section>
      )}
    </article>
  );
}
