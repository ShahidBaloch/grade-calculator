# Grade Calculator

Organic SEO grade calculator site built with Astro, Preact, TypeScript, and Tailwind CSS.

Every page is prerendered to static HTML and served from the Vercel CDN. Only the interactive parts
(calculators, header menus, theme toggle, contact form) ship JavaScript, as Preact islands. Only
`/api/*` runs as Vercel Functions.

## Requirements

- Node.js 22.19+
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (`.vercel/output`, incl. redirects and cache headers) |
| `npm run start` | Serve the production build locally on port 3000 |
| `npm run check` | Type-check (`astro check`) |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:coverage` | Unit tests with coverage |
| `npm run test:e2e:chromium` | Playwright E2E (Chromium) |
| `npm run test:qa` | Build + coverage + E2E smoke |
| `npm run push:gradecalc` | Push **new** commits to [gradcalculator-dot/GradeCalc](https://github.com/gradcalculator-dot/GradeCalc) (see below) |

## gradcalculator GitHub (clean history)

Two remotes:

| Remote | Repo | History on GitHub |
|--------|------|-------------------|
| `origin` | ShahidBaloch/grade-calculator | Full dev history |
| `gradecalc` | gradcalculator-dot/GradeCalc | **One** initial commit + **each new publish** (no old commits) |

**Do not** `git push gradecalc main` — that would upload the entire old history.

After commits on `main`:

```bash
npm run push:gradecalc
```

One-time on this machine (if the tag is missing):

```bash
git fetch gradecalc
git tag gradecalc-sync gradecalc/main
```

The tag `gradecalc-sync` marks what is already on gradcalculator GitHub; only commits **after** it are cherry-picked and pushed with their real messages.

## Production checklist (Google-friendly)

1. **Canonical URL** — Set `NEXT_PUBLIC_SITE_URL=https://www.gradcalc.com` in Vercel.
2. **Domains (critical)** — Canonical host is **`www.gradcalc.com`**. In Vercel → **Settings → Domains**, set **`www.gradcalc.com` as Primary** and let **`gradcalc.com` redirect to www** (default). **Remove** any rule that redirects **www → apex** — combining that with the build’s own “apex → www” rule (`scripts/vercel-routes.ts`) causes a **redirect loop** and Search Console **Couldn’t fetch** on `/sitemap.xml`. After deploy, `https://www.gradcalc.com/sitemap.xml` must return **200** (not redirect).
3. **Contact form** — Configure **SMTP** (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, optional `CONTACT_FROM` / `CONTACT_TO`) like FancifyText, **or** `RESEND_API_KEY` + `CONTACT_FROM_EMAIL`. Posts to `POST /api/contact`.
4. **Crawlers** — `robots.txt` allows **Google, Bing, Yandex**, and other major search bots; blocks SEO scrapers (Ahrefs, Semrush, etc.). Do not challenge verified search bots in Vercel Firewall.
5. **Uptime** — Optional monitor target: `GET /api/health` (returns `{ "ok": true }`, no store cache).
6. **QA** — After deploy: Rich Results Test on `/` and `/contact`; run `npm run test:qa` in CI.


- `src/app/` — Pages, written in the Next.js App Router layout (`page.tsx`, `[param]`, `generateStaticParams`, `metadata`). `src/layouts/next-routes.ts` turns them into static Astro routes.
- `src/pages/` — Astro entry points: the catch-all page router, 404, `robots.txt`, `sitemap.xml`, `/api/*`
- `src/shims/` — Small stand-ins for `next/link`, `next/navigation`, `next/dynamic`, `next-themes`
- `src/islands/` — Island runtime. Components in `"use client"` files hydrate on their own when used from server code (`integrations/use-client-islands.ts`).
- `scripts/vercel-routes.ts` — Post-build step that writes redirects and cache/security headers into the Vercel output config (no middleware)
- `src/components/` — UI and calculator components
- `src/lib/calculators/` — Calculator engines and validation
- `e2e/` — Playwright end-to-end tests
- `tests/` — Unit and SEO audit tests

Planning documents (roadmap, wireframes, ADRs) live outside this repo in `../GRADE Calculator Planning/`.
