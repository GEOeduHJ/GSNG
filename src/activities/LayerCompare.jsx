const DEFAULT_FIELDS = [
  { id: 'same', label: '두 자료에서 같은 점' },
  { id: 'diff', label: '두 자료에서 다른 점' },
  { id: 'link', label: '내 질문과 이어지는 점' },
];

/** Compare two data views in writing. config: {prompt, fields?:[{id,label}]} */
export default function LayerCompare({ config, value, onChange }) {
  const fields = config.fields?.length ? config.fields : DEFAULT_FIELDS;
  const notes = value.notes ?? {};
  return (
    <div>
      {config.prompt && <p>{config.prompt}</p>}
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={`compare-${field.id}`}>{field.label}</label>
          <textarea id={`compare-${field.id}`} rows="2" value={notes[field.id] ?? ''} onChange={(event) => onChange((current) => ({ ...current, notes: { ...(current.notes ?? {}), [field.id]: event.target.value } }))} />
        </div>
      ))}
    </div>
  );
}
