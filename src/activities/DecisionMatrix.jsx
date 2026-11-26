/** Score options against criteria (1–3), choose one, give a reason. config: {prompt, options:[{id,label}], criteria:[{id,label}]} */
export default function DecisionMatrix({ config, value, onChange }) {
  const options = config.options ?? [];
  const criteria = config.criteria ?? [];
  const scores = value.scores ?? {};
  const set = (patch) => onChange((current) => ({ ...current, ...patch }));
  const total = (optionId) => criteria.reduce((sum, criterion) => sum + (scores[optionId]?.[criterion.id] ?? 0), 0);
  return (
    <div>
      {config.prompt && <p>{config.prompt}</p>}
      {options.length > 0 && (
        <table className="matrix">
          <thead><tr><th scope="col">대안</th>{criteria.map((c) => <th key={c.id} scope="col">{c.label}</th>)}<th scope="col">합계</th><th scope="col">선택</th></tr></thead>
          <tbody>
            {options.map((option) => (
              <tr key={option.id}>
                <th scope="row">{option.label}</th>
                {criteria.map((criterion) => (
                  <td key={criterion.id}>
                    <select aria-label={`${option.label} — ${criterion.label}`} value={scores[option.id]?.[criterion.id] ?? ''} onChange={(event) => set({ scores: { ...scores, [option.id]: { ...scores[option.id], [criterion.id]: Number(event.target.value) || 0 } } })}>
                      <option value="">–</option><option value="1">1 낮음</option><option value="2">2 보통</option><option value="3">3 높음</option>
                    </select>
                  </td>
                ))}
                <td>{total(option.id)}</td>
                <td><input type="radio" name="matrix-choice" aria-label={`${option.label} 선택`} checked={value.choice === option.id} onChange={() => set({ choice: option.id })} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <label htmlFor="matrix-reason">고른 대안과 그 까닭(합계와 다르게 골랐다면 왜인지)</label>
      <textarea id="matrix-reason" rows="3" value={value.reason ?? ''} onChange={(event) => set({ reason: event.target.value })} />
    </div>
  );
}
