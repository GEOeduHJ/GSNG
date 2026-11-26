/** Sort statements into categories, then explain one choice. config: {prompt, items:[{id,text}], categories:[{id,label}]} */
export default function EvidenceSort({ config, value, onChange }) {
  const items = config.items ?? [];
  const categories = config.categories ?? [];
  const sorted = value.sorted ?? {};
  const set = (patch) => onChange((current) => ({ ...current, ...patch }));
  return (
    <div>
      {config.prompt && <p>{config.prompt}</p>}
      {items.map((item) => (
        <div key={item.id} className="sort-row">
          <label htmlFor={`sort-${item.id}`}>{item.text}</label>
          <select id={`sort-${item.id}`} value={sorted[item.id] ?? ''} onChange={(event) => set({ sorted: { ...sorted, [item.id]: event.target.value } })}>
            <option value="">고르기</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
          </select>
        </div>
      ))}
      <label htmlFor="sort-reason">분류가 가장 어려웠던 항목과 그 까닭</label>
      <textarea id="sort-reason" rows="3" value={value.reason ?? ''} onChange={(event) => set({ reason: event.target.value })} />
    </div>
  );
}
