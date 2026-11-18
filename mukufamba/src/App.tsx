import { useEffect, useState } from 'react'
import { tomorrow } from './lib/data'
import type { Booking, Query, Trip } from './lib/data'
import Home from './views/Home'
import Results from './views/Results'
import Seats from './views/Seats'
import Checkout from './views/Checkout'
import Ticket from './views/Ticket'
import MyTrips from './views/MyTrips'

type View = 'home' | 'results' | 'seats' | 'pay' | 'ticket' | 'mytrips'
const KEY = 'mkf-trips'
const load = (): Booking[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }

export default function App() {
  const [v, setV] = useState<View>('home')
  const [q, setQ] = useState<Query>({ from: 'Harare', to: 'Bulawayo', date: tomorrow(), pax: 1 })
  const [trip, setTrip] = useState<Trip | null>(null)
  const [seats, setSeats] = useState<string[]>([])
  const [bk, setBk] = useState<Booking | null>(null)
  const [trips, setTrips] = useState<Booking[]>(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(trips.slice(0, 20))) } catch { /* storage unavailable */ } }, [trips])
  const go = (x: View) => { setV(x); window.scrollTo(0, 0) }

  return (
    <>
      <header><div className="wrap">
        <button className="brand" onClick={() => go('home')} aria-label="Mukufamba home">
          <span className="mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A211B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="3" /><path d="M3 11h18M7 20v-3M17 20v-3" /></svg></span>Mukufamba
        </button>
        <nav><button className="link" onClick={() => go('home')}>Book</button><button className="link" onClick={() => go('mytrips')}>My trips{trips.length ? ` (${trips.length})` : ''}</button></nav>
      </div></header>
      <main>
        {v === 'home' && <Home q={q} setQ={setQ} onSearch={() => go('results')} onRoute={(from, to) => { setQ({ ...q, from, to }); go('results') }} />}
        {v === 'results' && <Results q={q} onBack={() => go('home')} onPick={t => { setTrip(t); setSeats([]); go('seats') }} />}
        {v === 'seats' && trip && <Seats q={q} trip={trip} seats={seats} setSeats={setSeats} onBack={() => go('results')} onNext={() => go('pay')} />}
        {v === 'pay' && trip && <Checkout trip={trip} seats={seats} onBack={() => go('seats')} onDone={b => { setTrips([b, ...trips]); setBk(b); go('ticket') }} />}
        {v === 'ticket' && bk && <Ticket b={bk} onHome={() => go('home')} onTrips={() => go('mytrips')} />}
        {v === 'mytrips' && <MyTrips trips={trips} onHome={() => go('home')} onView={b => { setBk(b); go('ticket') }} />}
      </main>
      <footer><div className="wrap">Mukufamba is a demo. Operators, fares and schedules shown here are sample data, and no payment is taken.</div></footer>
    </>
  )
}
