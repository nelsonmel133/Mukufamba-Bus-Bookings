export type Query = { from: string; to: string; date: string; pax: number }
export type Trip = { id: string; op: string; cls: string; am: string; dep: number; arr: number; mins: number; km: number; price: number; from: string; to: string; date: string }
export type Booking = { code: string; trip: Trip; seats: string[]; names: string[]; pay: string; total: number }

export const CITY: Record<string, [number, number]> = {
  Harare: [-17.83, 31.05], Bulawayo: [-20.15, 28.58], Mutare: [-18.97, 32.67], Gweru: [-19.45, 29.82],
  Masvingo: [-20.07, 30.83], 'Victoria Falls': [-17.93, 25.83], Kariba: [-16.52, 28.8], Kwekwe: [-18.93, 29.81], Beitbridge: [-22.22, 30],
}
export const NAMES = Object.keys(CITY)
export const PAY: [string, string][] = [['ecocash', 'EcoCash'], ['onemoney', 'OneMoney'], ['card', 'Bank card'], ['cash', 'Pay at terminal']]
const OPS: [string, string, number, string][] = [
  ['Savanna Coaches', 'Luxury', 1.3, 'Wi-Fi, AC, USB'], ['Kopje Express', 'Standard', 1, 'USB charging'],
  ['Msasa Luxury', 'Luxury', 1.35, 'AC, Wi-Fi, toilet'], ['Zambezi Lines', 'Standard', 0.92, 'Air conditioning'],
  ['Baobab Coaches', 'Semi-luxury', 1.12, 'AC, USB'],
]
const DEP = [[5, 30], [8, 0], [12, 30], [16, 0], [21, 0]]

export const hash = (s: string) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) } return h >>> 0 }
export const rng = (a: number) => () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
export const dist = (a: string, b: string) => {
  const r = Math.PI / 180, [p, q] = CITY[a], [s, t] = CITY[b]
  const x = Math.sin(((s - p) * r) / 2) ** 2 + Math.cos(p * r) * Math.cos(s * r) * Math.sin(((t - q) * r) / 2) ** 2
  return Math.round(12742 * Math.asin(Math.sqrt(x)) * 1.2)
}
export const fare = (a: string, b: string) => Math.max(6, Math.round(dist(a, b) * 0.034))
export const tm = (m: number) => { const d = Math.floor(m / 1440); m %= 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0') + (d ? ' +1' : '') }
export const dur = (m: number) => Math.floor(m / 60) + 'h ' + String(m % 60).padStart(2, '0') + 'm'
export const dl = (d: string) => new Date(d + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
export const iso = (d: Date) => d.toISOString().slice(0, 10)
export const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return iso(d) }
export const cmpSeat = (a: string, b: string) => parseInt(a) - parseInt(b) || a.localeCompare(b)

export function tripsFor(q: Query): Trip[] {
  const km = dist(q.from, q.to), mins = Math.round((km / 72) * 60), base = fare(q.from, q.to)
  return DEP.map((d, i) => {
    const o = OPS[i], m = d[0] * 60 + d[1]
    return { id: [q.from, q.to, q.date, i].join('-'), op: o[0], cls: o[1], am: o[3], dep: m, arr: m + mins, mins, km, price: Math.round(base * o[2]), from: q.from, to: q.to, date: q.date }
  })
}
export function taken(id: string) {
  const r = rng(hash(id)), s = new Set<string>()
  for (let i = 1; i <= 10; i++) for (const l of 'ABCD') if (r() < 0.38) s.add(i + l)
  return s
}
