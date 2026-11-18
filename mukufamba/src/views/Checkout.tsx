import { useState } from 'react'
import { PAY, hash } from '../lib/data'
import type { Booking, Trip } from '../lib/data'
import Summary from '../components/Summary'

type P = { trip: Trip; seats: string[]; onBack: () => void; onDone: (b: Booking) => void }

export default function Checkout({ trip, seats, onBack, onDone }: P) {
  const [names, setNames] = useState<string[]>(seats.map(() => ''))
  const [phone, setPhone] = useState('')
  const [pay, setPay] = useState('ecocash')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const label = PAY.find(x => x[0] === pay)![1]
  const total = trip.price * seats.length

  const submit = () => {
    if (names.some(n => !n.trim()) || !/^(\+?263|0)7\d{8}$/.test(phone.replace(/\s/g, ''))) {
      return setErr('Add a name for every passenger and a valid mobile number, like 0771234567.')
    }
    setErr(''); setBusy(true)
    // Demo only: this is where a real payment API (EcoCash, Paynow, etc.) would be called
    setTimeout(() => onDone({
      code: 'MKF-' + hash(trip.id + names.join() + Date.now()).toString(36).toUpperCase().slice(0, 5),
      trip, seats, names: names.map(n => n.trim()), pay, total,
    }), 1800)
  }
  return (
    <div className="wrap sec">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}><h2>Passengers and payment</h2><button className="link" onClick={onBack}>Back to seats</button></div>
      <div className="two">
        <div className="card"><div className="pf">
          {seats.map((s, i) => (
            <div className="f" key={s}><label htmlFor={'n' + i}>Passenger for seat {s}</label>
              <input id={'n' + i} autoComplete="name" placeholder="Full name" value={names[i]} onChange={e => setNames(names.map((n, j) => (j === i ? e.target.value : n)))} /></div>
          ))}
          <div className="f"><label htmlFor="ph">Mobile number for your ticket</label><input id="ph" inputMode="tel" autoComplete="tel" placeholder="0771234567" value={phone} onChange={e => setPhone(e.target.value)} /></div>
          <div><div className="f"><label>Payment method</label></div>
            <div className="chips" style={{ marginTop: 6 }}>{PAY.map(([k, v]) => <button key={k} className="chip" aria-pressed={pay === k} onClick={() => setPay(k)}>{v}</button>)}</div></div>
          {err && <p className="err">{err}</p>}
        </div></div>
        <Summary trip={trip} seats={seats}>
          <button className="btn w" disabled={busy} onClick={submit}>{busy ? 'Waiting for approval on your phone...' : pay === 'cash' ? 'Reserve seats' : `Pay $${total} with ${label}`}</button>
        </Summary>
      </div>
    </div>
  )
}
