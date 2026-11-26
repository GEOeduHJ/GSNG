import { useBook } from './BookContext.jsx';
import { neighborPages } from './pageSequence.js';

/** Always-available previous/next page arrows (sides on wide screens, a bottom bar on narrow ones). */
export default function PageArrows({ route }) {
  const { book } = useBook();
  const { prev, next } = neighborPages(book, route);
  if (!prev && !next) return null;
  return (
    <nav className="page-arrows no-print" aria-label="쪽 이동">
      {prev && (
        <a className="page-arrow page-arrow-prev" href={prev.href} aria-label={`이전 쪽: ${prev.label}`} title={prev.label}>
          <span aria-hidden="true">←</span><span className="page-arrow-text">{prev.label}</span>
        </a>
      )}
      {next && (
        <a className="page-arrow page-arrow-next" href={next.href} aria-label={`다음 쪽: ${next.label}`} title={next.label}>
          <span className="page-arrow-text">{next.label}</span><span aria-hidden="true">→</span>
        </a>
      )}
    </nav>
  );
}
