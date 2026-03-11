# Finance Dashboard

Personal finance management app — offline-first, no backend required.

## Features

- **Offline-first** — All data stored in browser IndexedDB (Dexie)
- **Transaction Management** — Income & expenses with categories and credit cards
- **CSV/OFX Import** — Import bank statements with duplicate detection
- **Credit Card Tracking** — Limits, utilization, and spending per card
- **Financial Health Score** — Automated health assessment gauge
- **Charts & Analytics** — Monthly trends, category breakdowns, daily spending
- **Recurring Transactions** — Manage monthly bills and installments
- **Annual Overview** — Yearly financial summary
- **Multi-language** — English and Brazilian Portuguese (PT-BR)
- **Database Backup** — Export/import your data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript |
| Build | Vite |
| Database | Dexie (IndexedDB) |
| Charts | Recharts |
| Routing | React Router DOM 6 |
| Styling | CSS Variables |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

## Build

```bash
npm run build
npm run preview
```

## Deploy

Static SPA — deploy the `dist/` folder to any hosting:

- **Netlify**: Set build command to `npm run build`, publish directory to `dist`
- **Vercel**: Auto-detected as Vite project
- **GitHub Pages**: Use `dist/` as source

## License

MIT
