import { useBook } from './BookContext.jsx';
import ConceptMap from './ConceptMap.jsx';
import { routes } from './router.js';

export default function TableOfContents() {
  const { book } = useBook();
  const ready = new Set(book.units.map((unit) => unit.id));
  return (
    <article className="toc-page">
      <h1 className="toc-title">세계시민과 지리</h1>
      <p className="toc-lead">각 중단원은 질문을 만드는 쪽에서 시작해, 절마다 자료로 근거를 모으고, 마지막 쪽에서 내 질문에 답합니다.</p>
      {book.toc.parts.map((part) => (
        <section key={part.id} className="toc-part" aria-labelledby={`toc-${part.id}`}>
          <h2 id={`toc-${part.id}`}><span className="toc-numeral">{part.numeral}</span> {part.title}</h2>
          <ol className="toc-units">
            {part.units.map((unit) => (
              <li key={unit.id}>
                {ready.has(unit.id)
                  ? <a href={routes.open(unit.id)} className="toc-unit is-ready"><span className="toc-unit-id">{unit.id}</span> {unit.title}</a>
                  : <span className="toc-unit"><span className="toc-unit-id">{unit.id}</span> {unit.title}</span>}
                <ol className="toc-lessons">
                  {unit.lessons.map((lesson) => <li key={lesson.index}>{lesson.title}</li>)}
                </ol>
              </li>
            ))}
          </ol>
        </section>
      ))}
      <ConceptMap book={book} />
    </article>
  );
}
