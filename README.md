# Grade Calculator

Organic SEO grade calculator site built with Next.js 15, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:coverage` | Unit tests with coverage |
| `npm run test:e2e:chromium` | Playwright E2E (Chromium) |
| `npm run test:qa` | Build + coverage + E2E smoke |

## Production checklist (Google-friendly)

1. **Canonical URL** — Set `NEXT_PUBLIC_SITE_URL=https://www.gradcalc.com` in Vercel.
2. **Contact form** — Configure **SMTP** (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, optional `CONTACT_FROM` / `CONTACT_TO`) like FancifyText, **or** `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`. Posts to `POST /api/contact`.
3. **Crawlers** — In Vercel → Firewall / Bot Protection, do **not** challenge verified search bots (Googlebot, Bingbot). Confirm **Google Search Console → Crawl stats** and that `https://www.gradcalc.com/robots.txt` and `/sitemap.xml` return **200** without a browser checkpoint. `vercel.json` sets cache headers for those URLs; it does not replace firewall rules.
4. **Uptime** — Optional monitor target: `GET /api/health` (returns `{ "ok": true }`, no store cache).
5. **QA** — After deploy: Rich Results Test on `/` and `/contact`; run `npm run test:qa` in CI.


- `src/app/` — Next.js App Router pages
- `src/components/` — UI and calculator components
- `src/lib/calculators/` — Calculator engines and validation
- `e2e/` — Playwright end-to-end tests
- `tests/` — Unit and SEO audit tests

Planning documents (roadmap, wireframes, ADRs) live outside this repo in `../GRADE Calculator Planning/`.
