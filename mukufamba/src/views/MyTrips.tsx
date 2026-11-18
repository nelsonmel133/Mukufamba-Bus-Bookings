import { dl, tm } from '../lib/data'
import type { Booking } from '../lib/data'

export default function MyTrips({ trips, onView, onHome }: { trips: Booking[]; onView: (b: Booking) => void; onHome: () => void }) {
  return (
    <div className="wrap sec"><h2>My trips</h2>
      {trips.length ? trips.map(b => (
        <article className="card trip" key={b.code}>
          <div><div className="tt">{b.trip.from} to {b.trip.to}</div><div className="mut">{dl(b.trip.date)}, {tm(b.trip.dep)}, seats {b.seats.join(', ')}</div></div>
          <div className="mid2"><b>{b.code}</b></div>
          <div className="pr"><button className="btn ghost" onClick={() => onView(b)}>View ticket</button></div>
        </article>
      )) : (
        <div className="empty"><h3>No trips yet</h3><p className="mut" style={{ margin: '6px 0 16px' }}>Book your first bus and it will show up here.</p><button className="btn" onClick={onHome}>Find a bus</button></div>
      )}
    </div>
  )
}
