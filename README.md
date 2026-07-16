# All One Rengøring — Website

Official website for **All One Rengøring** (CVR 40559736), a premium cleaning
company in Denmark. Marketing site today; architected to grow into booking,
customer portal, and payments without rewrites.

## Stack

- **Next.js 15** (App Router, React Server Components) + **React 19**
- **TypeScript** (strict — see `tsconfig.json` for the full flag set)
- **Tailwind CSS 4** (CSS-first tokens) on a custom design system
- **next-intl** — Danish default, English-ready
- **Zod** — shared validation schemas (forms today, booking API later)

## Getting started

Requires **Node.js ≥ 20.9**.

```bash
npm install
cp .env.example .env.local   # fill in values as needed
npm run dev                  # http://localhost:3000
```

## Commands

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Development server                        |
| `npm run build`        | Production build                          |
| `npm run typecheck`    | TypeScript check (no emit)                |
| `npm run lint`         | ESLint                                    |
| `npm run format:check` | Prettier check                            |
| `npm run verify`       | typecheck + lint + format (what CI runs)  |

## Project documentation

- **Conventions** (file naming, imports, code style, architecture rules):
  [`docs/CONVENTIONS.md`](./docs/CONVENTIONS.md)
- Environment variables: [`.env.example`](./.env.example) is the contract.

## Source layout

```
src/
  app/          Routes (App Router)
  components/   ui / layout / navigation / sections / cards / forms / features
  lib/          Domain logic — no React imports allowed here
  content/      Typed content (da/, en/) — no copy lives in components
  config/       Site config: company data, navigation, feature flags
  styles/       Design tokens + global CSS
  i18n/         next-intl setup and messages
  types/        Shared type definitions
```

Dependency direction (enforced in review, lint rules from Phase 3):
`app → sections → cards/forms → ui/layout`, never sideways or upward.

## Status

Milestone 1 (foundation) complete: tokens, global styles, App Router,
i18n (da), root metadata, LocalBusiness JSON-LD, sitemap/robots, site
config. The homepage is an interim page (verified facts only) replaced in
the page-assembly phase. Blueprint and roadmap maintained outside the repo
by the project owner. Deployed
