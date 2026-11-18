import { dl, dur, taken, tm, tripsFor } from '../lib/data'
import type { Query, Trip } from '../lib/data'

export default function Results({ q, onPick, onBack }: { q: Query; onPick: (t: Trip) => void; onBack: () => void }) {
  const trips = tripsFor(q)
  return (
    <div className="wrap sec">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div><h2>{q.from} to {q.to}</h2><p className="mut">{dl(q.date)}, {q.pax} {q.pax > 1 ? 'passengers' : 'passenger'}, {trips[0].km} km</p></div>
        <button className="link" onClick={onBack}>Back to search</button>
      </div>
      {trips.map(t => {
        const left = 40 - taken(t.id).size
        return (
          <article key={t.id} className="card trip">
            <div><div className="tt">{tm(t.dep)} &ndash; {tm(t.arr)}</div><div className="mut">{dur(t.mins)} direct</div></div>
            <div className="mid2"><b>{t.op}</b><span className="badge">{t.cls}</span><div className="mut">{t.am}</div></div>
            <div className="pr"><b>${t.price}</b><span className={left < 10 ? 'low' : 'mut'}>{left} seats left</span><br />
              <button className="btn" style={{ marginTop: 8 }} disabled={left < q.pax} onClick={() => onPick(t)}>Select seats</button></div>
          </article>
        )
      })}
    </div>
  )
}
