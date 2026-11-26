import { useEffect, useMemo, useRef, useState } from 'react';
import { lessonsByConcept } from './conceptIndex.js';
import { routes } from './router.js';

function ConceptGraph({ book, onSelect }) {
  const containerRef = useRef(null);
  useEffect(() => {
    let graph;
    let disposed = false;
    import('cytoscape').then(({ default: cytoscape }) => {
      if (disposed || !containerRef.current) return;
      const units = (book.toc.parts ?? []).flatMap((part) => part.units);
      const elements = [
        ...units.map((unit) => ({ data: { id: `u-${unit.id}`, label: `${unit.id} ${unit.title}`, kind: 'unit' } })),
        ...Object.entries(book.concepts).map(([id, concept]) => ({ data: { id: `c-${id}`, label: concept.label, kind: 'concept', concept: id } })),
        ...Object.entries(book.concepts).flatMap(([id, concept]) => (concept.units ?? [])
          .filter((unitId) => units.some((unit) => unit.id === unitId))
          .map((unitId) => ({ data: { id: `e-${id}-${unitId}`, source: `c-${id}`, target: `u-${unitId}` } }))),
      ];
      try {
        graph = cytoscape({
          container: containerRef.current,
          elements,
          layout: { name: 'cose', animate: false },
          style: [
            { selector: 'node', style: { label: 'data(label)', 'font-size': 14, 'text-valign': 'center', color: '#222', 'background-color': '#d9e7e1', width: 'label', height: 28, padding: 8, shape: 'round-rectangle' } },
            { selector: 'node[kind = "unit"]', style: { 'background-color': '#2f6f5e', color: '#fff' } },
            { selector: 'edge', style: { width: 1.5, 'line-color': '#b9b19e' } },
          ],
        });
        graph.on('tap', 'node[kind = "concept"]', (event) => onSelect(event.target.data('concept')));
      } catch {
        // Graph is a convenience; the list below carries the same information.
      }
    });
    return () => { disposed = true; graph?.destroy(); };
  }, [book, onSelect]);
  return <div ref={containerRef} className="concept-graph" aria-hidden="true" />;
}

export default function ConceptMap({ book }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const index = useMemo(() => lessonsByConcept(book), [book]);
  const entries = Object.entries(book.concepts).sort(([, a], [, b]) => a.label.localeCompare(b.label, 'ko'));
  return (
    <section className="concept-map" aria-labelledby="concept-map-title">
      <div className="concept-map-head">
        <h2 id="concept-map-title">개념으로 찾아보기</h2>
        <button type="button" className="text-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? '개념 지도 접기' : '개념 지도 펼치기'}</button>
      </div>
      {open && <>
        <ConceptGraph book={book} onSelect={setSelected} />
        <ul className="concept-list">
          {entries.map(([id, concept]) => (
            <li key={id} className={selected === id ? 'is-selected' : ''}>
              <strong>{concept.label}</strong> {concept.definition}
              {index[id]?.length > 0 && <span className="concept-where"> — {index[id].map((item, i) => (
                <a key={`${item.unitId}-${item.index}`} href={routes.lesson(item.unitId, item.index)}>{i > 0 ? ', ' : ''}{item.unitId} 절 {item.index}</a>
              ))}</span>}
            </li>
          ))}
        </ul>
      </>}
    </section>
  );
}
