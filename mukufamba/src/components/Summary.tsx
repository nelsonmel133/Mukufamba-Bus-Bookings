import type { ReactNode } from 'react'
import { dl, tm } from '../lib/data'
import type { Trip } from '../lib/data'

export default function Summary({ trip, seats, children }: { trip: Trip; seats: string[]; children: ReactNode }) {
  return (
    <aside className="card sum">
      <h3>{trip.from} to {trip.to}</h3>
      <p className="mut">{dl(trip.date)}, departs {tm(trip.dep)}</p>
      <p>{trip.op}, {trip.cls}</p><hr />
      <p>Seats: <b>{seats.length ? seats.join(', ') : 'none selected'}</b></p>
      <div className="tot"><span className="mut">Total</span><b>${trip.price * seats.length}</b></div>
      {children}
    </aside>
  )
}
