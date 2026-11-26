import { BookProvider, useBook } from './BookContext.jsx';
import { routes, useRoute } from './router.js';
import TableOfContents from './TableOfContents.jsx';
import HelpPage from './HelpPage.jsx';
import { pageFor } from './pages.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import './book.css';

function defaultStorage() {
  try { return typeof window !== 'undefined' ? window.localStorage : null; } catch { return null; }
}

function NotReady() {
  return <article className="help-page"><h1>준비 중인 중단원</h1><p>이 중단원의 내용은 아직 준비 중입니다.</p><p><a href={routes.toc()}>차례로 돌아가기</a></p></article>;
}

function Screen() {
  const { book } = useBook();
  const route = useRoute();
  if (route.name === 'help') return <HelpPage />;
  if (route.name === 'toc') return <TableOfContents />;
  const Page = pageFor(route.name);
  if (route.name === 'teacher') return <Page unitId={route.unitId} />;
  const unit = book.units.find((item) => item.id === route.unitId);
  if (!unit || !Page) return <NotReady />;
  return <Page key={`${route.name}-${route.unitId}-${route.index ?? ''}`} unit={unit} route={route} />;
}

export default function App({ book, storage = defaultStorage() }) {
  return (
    <BookProvider book={book} storage={storage}>
      <div className="book">
        <header className="book-header">
          <a className="book-name" href={routes.toc()}>세계시민과 지리</a>
          <nav aria-label="책 탐색"><a href={routes.toc()}>차례</a><a href={routes.help()}>도움말</a></nav>
        </header>
        <main className="book-main"><ErrorBoundary><Screen /></ErrorBoundary></main>
      </div>
    </BookProvider>
  );
}
