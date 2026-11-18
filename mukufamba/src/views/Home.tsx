import { useState } from 'react'
import { NAMES, dist, dur, fare, iso } from '../lib/data'
import type { Query } from '../lib/data'

const POP: [string, string][] = [['Harare', 'Bulawayo'], ['Harare', 'Mutare'], ['Harare', 'Victoria Falls'], ['Bulawayo', 'Victoria Falls'], ['Harare', 'Masvingo'], ['Harare', 'Kariba']]
type P = { q: Query; setQ: (q: Query) => void; onSearch: () => void; onRoute: (a: string, b: string) => void }

export default function Home({ q, setQ, onSearch, onRoute }: P) {
  const [err, setErr] = useState('')
  const set = (k: keyof Query, v: string | number) => setQ({ ...q, [k]: v })
  const search = () => {
    if (q.from === q.to) return setErr('Choose two different towns.')
    if (!q.date || q.date < iso(new Date())) return setErr('Choose a travel date from today onwards.')
    onSearch()
  }
  const towns = (id: 'from' | 'to', label: string) => (
    <div className="f"><label htmlFor={id}>{label}</label>
      <select id={id} value={q[id]} onChange={e => set(id, e.target.value)}>{NAMES.map(n => <option key={n}>{n}</option>)}</select></div>
  )
  return (
    <>
      <section className="hero">
        <div className="wrap"><h1>Where to today?</h1><p>Pick your bus, choose your seat and pay with EcoCash. Your ticket is on your phone before you leave home.</p></div>
        <div className="road" />
        <svg className="bus" viewBox="0 0 64 34" aria-hidden="true"><rect x="1" y="2" width="62" height="24" rx="7" fill="#2A211B" /><rect x="7" y="7" width="12" height="9" rx="2" fill="#FFE7D6" /><rect x="23" y="7" width="12" height="9" rx="2" fill="#FFE7D6" /><rect x="39" y="7" width="12" height="9" rx="2" fill="#FFE7D6" /><circle cx="16" cy="27" r="6" fill="#2A211B" stroke="#FF6B1A" strokeWidth="2" /><circle cx="48" cy="27" r="6" fill="#2A211B" stroke="#FF6B1A" strokeWidth="2" /></svg>
      </section>
      <div className="wrap">
        <div className="card search">
          {towns('from', 'From')}
          <button className="swap" aria-label="Swap towns" onClick={() => setQ({ ...q, from: q.to, to: q.from })}>{'\u21C6'}</button>
          {towns('to', 'To')}
          <div className="f"><label htmlFor="date">Date</label><input id="date" type="date" min={iso(new Date())} value={q.date} onChange={e => set('date', e.target.value)} /></div>
          <div className="f"><label htmlFor="pax">Seats</label><select id="pax" value={q.pax} onChange={e => set('pax', +e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></div>
          <button className="btn" onClick={search}>Search buses</button>
          {err && <p className="err" style={{ gridColumn: '1/-1' }}>{err}</p>}
        </div>
        <div className="sec"><h2>Popular routes</h2>
          <div className="routes">{POP.map(([a, b]) => (
            <button key={a + b} className="rt" onClick={() => onRoute(a, b)}>
              <span className="p">from ${fare(a, b)}</span><b>{a} to {b}</b>
              <span className="mut">{dur(Math.round((dist(a, b) / 72) * 60))}, {dist(a, b)} km</span>
            </button>))}</div></div>
        <div className="props">
          <div><h3>Choose your own seat</h3><p className="mut">See the bus layout and pick a window, aisle or front row before you travel.</p></div>
          <div><h3>Pay the way you prefer</h3><p className="mut">EcoCash, OneMoney, bank card, or reserve now and pay at the terminal.</p></div>
          <div><h3>Ticket on your phone</h3><p className="mut">Show your code at boarding. No queues and no paper.</p></div>
        </div>
      </div>
    </>
  )
}
