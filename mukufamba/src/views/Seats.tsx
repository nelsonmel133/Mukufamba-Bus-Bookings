import { cmpSeat, taken } from '../lib/data'
import type { Query, Trip } from '../lib/data'
import Summary from '../components/Summary'

type P = { q: Query; trip: Trip; seats: string[]; setSeats: (s: string[]) => void; onNext: () => void; onBack: () => void }

export default function Seats({ q, trip, seats, setSeats, onNext, onBack }: P) {
  const tk = taken(trip.id), p = q.pax
  const toggle = (k: string) => {
    let n = seats.includes(k) ? seats.filter(x => x !== k) : [...seats, k]
    if (n.length > p) n = n.slice(1)
    setSeats(n.sort(cmpSeat))
  }
  return (
    <div className="wrap sec">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div><h2>Choose {p > 1 ? p + ' seats' : 'your seat'}</h2><p className="mut">{p > 1 ? `Pick ${p} seats for your group.` : 'Tap an open seat.'}</p></div>
        <button className="link" onClick={onBack}>Back to buses</button>
      </div>
      <div className="two">
        <div className="card">
          <div className="bm">
            <div style={{ marginBottom: 12 }}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--mut)" strokeWidth="1.8" aria-label="Driver"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 14.5V21M9.6 11l-6.2-1.5M14.4 11l6.2-1.5" /></svg></div>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(row => (
              <div className="sr" key={row}>
                {['A', 'B', '', 'C', 'D'].map((l, i) => {
                  if (!l) return <span key={i} />
                  const k = row + l, on = seats.includes(k), gone = tk.has(k)
                  return <button key={k} className={'st' + (on ? ' on' : '')} disabled={gone} aria-pressed={on} aria-label={`Seat ${k}${gone ? ', taken' : ''}`} onClick={() => toggle(k)}>{k}</button>
                })}
              </div>
            ))}
          </div>
          <div className="key"><span>&#9633; Open</span><span style={{ color: 'var(--od)', fontWeight: 600 }}>&#9632; Yours</span><span>&#9638; Taken</span></div>
        </div>
        <Summary trip={trip} seats={seats}><button className="btn w" disabled={seats.length !== p} onClick={onNext}>Continue to payment</button></Summary>
      </div>
    </div>
  )
}
