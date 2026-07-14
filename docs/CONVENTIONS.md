# Project Conventions

The rules every file in this repository follows. Tooling enforces what it
can (ESLint, Prettier, TypeScript); this document covers that **and** the
rules only humans can enforce in review. When a rule here conflicts with
personal preference, this document wins. When a rule proves wrong, change
the document first, then the code.

---

## 0. Permanent principles (project owner, binding)

1. **Official first.** Prefer official Next.js/React/TypeScript/Tailwind
   recommendations unless a deviation has a clear, stated architectural
   advantage. Convention over configuration.
2. **Native platform first.** Before any dependency, ask in order: can the
   browser do it? Can React? Can Next.js? Can Tailwind? Only four "no"s
   justify a package. A dependency must solve an architectural problem,
   not reduce typing.
3. **No speculative architecture.** Optimize for today's requirements with
   clean extension points. An abstraction requires two demonstrated real
   use cases before extraction.
4. **Business value over technical elegance.** Every page section must
   increase trust, aid understanding, reduce friction, or improve
   conversion — or it does not ship. Every component must solve a real
   consistency or maintenance problem.
5. **Clarity over visual complexity** in all UX decisions. The site exists
   to convert visitors into customers.

---

## 1. File & folder naming

| Thing                  | Convention                    | Example                          |
| ---------------------- | ----------------------------- | -------------------------------- |
| Files and folders      | `kebab-case`                  | `quote-form.tsx`, `trust-bar.tsx` |
| React component export | `PascalCase`                  | `export function QuoteForm()`    |
| Hooks                  | `use-` prefix, kebab file     | `use-scroll-state.ts` → `useScrollState` |
| Types/interfaces       | `PascalCase`, no `I` prefix   | `QuoteRequest`, not `IQuoteRequest` |
| Constants              | `SCREAMING_SNAKE_CASE`        | `MAX_MESSAGE_LENGTH`             |
| Route segments         | Next.js conventions; Danish slugs per the IA | `app/(marketing)/priser/page.tsx` |

**Why kebab-case files:** case-insensitive filesystems (macOS) silently
tolerate casing mistakes that then break on Linux CI. Kebab-case makes the
mistake impossible. The component *export* stays PascalCase as React requires.

- One component per file. Small private helper components may live in the
  same file only if they are not exported.
- A component's file name matches its export: `service-card.tsx` exports
  `ServiceCard`. No `index.tsx` component files — they make ten editor tabs
  all named "index".
- Barrel files (`index.ts` re-exports) are **not used**. They defeat
  tree-shaking analysis, create circular-import traps, and hide the real
  module graph. Import from the concrete file.

## 2. Import conventions

Order within a file (blank line between groups):

1. External packages (`react`, `next/*`, third-party)
2. Internal via alias (`@/components/...`, `@/lib/...`)
3. Relative — **maximum one level** (`./helpers`). Anything deeper must use
   `@/` (lint-enforced).
4. Type-only imports are inlined: `import { type QuoteRequest } from ...`
   (lint-enforced via `consistent-type-imports`).

**Exports:** named exports only. Default exports break rename refactoring
and produce inconsistent auto-imports. The sole exception: files where
Next.js *requires* a default export (`page.tsx`, `layout.tsx`, `error.tsx`,
`not-found.tsx`, route metadata files, `next.config.ts`).

**The one alias:** `@/*` → `src/*`. No per-directory aliases — a single
root alias keeps tooling, jump-to-definition, and refactors predictable.

## 3. Architecture rules (dependency direction)

```
app (pages)
  └─▶ components/sections
        └─▶ components/cards, components/forms
              └─▶ components/ui, components/layout, components/navigation
lib/  ◀── may be imported from anywhere; imports React from nowhere
config/, content/ ◀── imported by pages and passed DOWN as props
```

- **Sections never import sections.** Composition happens in pages.
- **`lib/` never imports React** or anything from `components/`. It is the
  future home of pricing/booking logic and must stay framework-free.
- **No copy or company data in components.** Text comes from `content/`
  and `i18n/messages`; company facts (address, CVR, phone) come from
  `config/`. Exactly one file in the repo knows the company's address.
- **Server Components by default.** `"use client"` is an explicit opt-in,
  placed at the smallest possible leaf, with a one-line comment stating why
  (e.g. `// Client: manages accordion open state`).

## 4. Code style

- **No `any`.** If a type is genuinely unknowable, use `unknown` and narrow.
- **No non-null assertions (`!`)** without an adjacent comment proving the
  invariant.
- Component props: `interface {Component}Props`, exported, defined above
  the component in the same file.
- Public functions in `lib/` declare explicit return types. Component
  return types may be inferred.
- Prefer early returns over nested conditionals.
- Booleans read as predicates: `isOpen`, `hasError`, `canSubmit`.
- Event handlers: `handle*` internally, `on*` as prop names
  (`onSubmit={handleSubmit}`).
- Comments explain **why**, never narrate **what**. Code that needs a
  "what" comment gets rewritten instead.
- Magic values live in named constants (`config/` or a local `const`),
  never inline. `if (items.length > 3)` is a bug waiting for a reason.

## 5. Content & honesty rules (from the approved brief)

- No lorem ipsum. Pending real content uses explicit editorial markers:
  `[BEKRÆFT: forsikringsdetaljer]` — visible, unambiguous, greppable.
- No invented testimonials, reviews, statistics, or client logos. Sections
  that depend on real data ship behind feature flags (`config/features.ts`)
  and stay off until the data exists.

## 6. Git conventions

- Branches: `phase-N/short-description` during buildout; `feat/`, `fix/`,
  `chore/` afterward.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`). Imperative mood, ≤ 72-char subject.
- Every PR must pass `npm run verify` (typecheck + lint + format) before
  review. CI enforces this from the moment CI exists.

## 7. Accessibility & performance floors (non-negotiable in review)

- Every interactive element keyboard-operable with a visible focus state.
- Every image has meaningful `alt` (or `alt=""` when decorative — a
  deliberate choice, stated in review).
- Every form control has a programmatically associated label.
- No layout shift introduced: images declare dimensions/aspect ratios;
  async UI reserves its space.
- Animation uses transform/opacity only and respects
  `prefers-reduced-motion`.

## §11 Production design-system rules (audited, v23)

These were enforced across the codebase in the launch-polish pass. New code
must follow them; a PR that introduces a value outside these scales is a bug.

**Radius — four tokens, no arbitrary values**
| Token | Value | Use |
|---|---|---|
| `rounded-control` | 0.625rem | inputs, small chips, icon chips |
| `rounded-card` | 1rem | cards, tiles |
| `rounded-panel` | 2rem | large panels, hero frames, images |
| `rounded-full` | — | pills, dots, avatars |

**Icons — three sizes only:** 16 (inline/dense), 20 (default chip), 24 (feature).
Always Lucide, always `strokeWidth={1.5}` (2 for checkmarks), always in a
brand-coloured chip.

**Shadows — two only:** `shadow-raised` (resting cards), `shadow-overlay`
(floating/glass/hover). Nothing else.

**Hover — two lifts only:** buttons `-translate-y-0.5`, cards `-translate-y-1`.
Images zoom `scale-[1.04]` over 500–700ms on the emphasis curve.

**Aspect ratios:** cards → `photo`; hero/portrait columns → `portrait`;
full-bleed/cinematic → `video`. Never mix within one grid.

**CTA vocabulary:** every quote CTA reads *"Få et gratis tilbud"* / *"Get a
free quote"*. The only exception is the form's own submit button, which
describes its distinct action.

**Focus:** never remove the global `:focus-visible` ring. It is defined once,
globally, and inverts automatically on navy surfaces.

**Claims:** no marketing claim may be hard-coded into a component or message
without a `ClaimKey` in `src/config/claims.ts`. Unconfirmed claims render as
nothing — never as text.