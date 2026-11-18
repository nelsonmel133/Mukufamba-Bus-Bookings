# Mukufamba (web)

Demo intercity bus booking app for Zimbabwe. React + TypeScript + Vite. All fares, operators and schedules are sample data generated in `src/lib/data.ts`; no payment is taken.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy
- **Vercel / Netlify:** import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** Settings > Pages > Source: GitHub Actions. Pushing to `main` runs `.github/workflows/deploy.yml`.

## Structure
- `src/lib/data.ts` routes, fares, seat availability, helpers (swap for a real API later)
- `src/views/` one file per step: Home, Results, Seats, Checkout, Ticket, MyTrips
- `src/styles.css` orange theme tokens, with dark mode
