import { hash, rng } from '../lib/data'

// Decorative QR-style code derived from the booking code (demo only)
export default function QR({ code }: { code: string }) {
  const r = rng(hash(code)), corners = [[0, 0], [14, 0], [0, 14]], cells: JSX.Element[] = []
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    const k = corners.find(([a, b]) => x >= a - 1 && x <= a + 7 && y >= b - 1 && y <= b + 7)
    let on: boolean
    if (k) { const dx = x - k[0], dy = y - k[1]; on = dx >= 0 && dx < 7 && dy >= 0 && dy < 7 && (dx % 6 === 0 || dy % 6 === 0 || (dx > 1 && dx < 5 && dy > 1 && dy < 5)) }
    else on = r() < 0.5
    if (on) cells.push(<rect key={x + '-' + y} x={x} y={y} width="1" height="1" />)
  }
  return <svg viewBox="0 0 21 21" role="img" aria-label={`Ticket code ${code}`}>{cells}</svg>
}
