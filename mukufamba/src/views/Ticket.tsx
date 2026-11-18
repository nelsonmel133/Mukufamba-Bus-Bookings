import { PAY, dl, tm } from '../lib/data'
import type { Booking } from '../lib/data'
import QR from '../components/QR'

export default function Ticket({ b, onHome, onTrips }: { b: Booking; onHome: () => void; onTrips: () => void }) {
  const t = b.trip, m = PAY.find(x => x[0] === b.pay)![1]
  return (
    <div className="wrap sec">
      <div style={{ textAlign: 'center' }}><h2>You’re booked</h2>
        <p className="ok">{b.pay === 'cash' ? 'Seats reserved. Pay at the terminal before boarding.' : `Payment received with ${m}.`}</p></div>
      <div className="tk">
        <div className="top"><small>{t.op}, {t.cls}</small><div className="tt">{t.from} to {t.to}</div></div>
        <div className="mid">
          <div><span>Date</span><b>{dl(t.date)}</b></div><div><span>Departs</span><b>{tm(t.dep)}</b></div>
          <div><span>Arrives</span><b>{tm(t.arr)}</b></div><div><span>Total</span><b>${b.total}</b></div>
        </div>
        <div className="perf" />
        <div className="bot"><div className="qr"><QR code={b.code} /></div>
          <div><span className="mut" style={{ fontSize: '.82rem' }}>Booking code</span><div className="tt">{b.code}</div>
            {b.names.map((n, i) => <div key={i}>{n}, seat <b>{b.seats[i]}</b></div>)}</div></div>
      </div>
      <div className="row"><button className="btn" onClick={onHome}>Book another trip</button><button className="btn ghost" onClick={onTrips}>My trips</button></div>
    </div>
  )
}
