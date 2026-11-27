/** 핵심 정리: the lesson's key points, shown below the spread. */
export default function LessonSummary({ items = [] }) {
  if (!items.length) return null;
  return (
    <section className="lesson-summary" aria-labelledby="lesson-summary-title">
      <h2 id="lesson-summary-title">핵심 정리</h2>
      <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </section>
  );
}
