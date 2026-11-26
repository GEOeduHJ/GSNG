/** Role-play hearing (ported from v1 CivicHearingLab). config: {actors:[{id,label,place,role,power}], levels:[{id,label,action}]} */
export default function CivicHearing({ config, value, onChange }) {
  const actors = config.actors ?? [];
  const levels = config.levels ?? [];
  const actor = actors.find((item) => item.id === value.actorId);
  const set = (patch) => onChange((current) => ({ ...current, ...patch }));
  return (
    <div className="hearing">
      <div className="actor-row" role="group" aria-label="이해관계자">
        {actors.map((item) => (
          <button type="button" key={item.id} className={`button secondary${value.actorId === item.id ? ' is-selected' : ''}`} aria-pressed={value.actorId === item.id} onClick={() => set({ actorId: item.id })}>
            {item.label} · {item.place}
          </button>
        ))}
      </div>
      {actor && <dl className="actor-detail"><dt>받는 영향</dt><dd>{actor.role}</dd><dt>결정 권한</dt><dd>{actor.power}</dd></dl>}
      {levels.length > 0 && (
        <fieldset>
          <legend>어느 수준에서 행동할지</legend>
          {levels.map((level) => (
            <label key={level.id} className="choice">
              <input type="radio" name="hearing-level" checked={value.levelId === level.id} onChange={() => set({ levelId: level.id })} />
              {level.label} — {level.action}
            </label>
          ))}
        </fieldset>
      )}
      <label htmlFor="hearing-action">내가 제안하는 행동</label>
      <textarea id="hearing-action" rows="4" value={value.action ?? ''} onChange={(event) => set({ action: event.target.value })} />
    </div>
  );
}
