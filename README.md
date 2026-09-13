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

## Project structure

- `src/app/` — Next.js App Router pages
- `src/components/` — UI and calculator components
- `src/lib/calculators/` — Calculator engines and validation
- `e2e/` — Playwright end-to-end tests
- `tests/` — Unit and SEO audit tests

Planning documents (roadmap, wireframes, ADRs) live outside this repo in `../GRADE Calculator Planning/`.
