# Notes for coding agents

This app is built on the Cinderblock Design System (React Native Web + Next.js
**Pages Router** — do not migrate to App Router; SSR style extraction depends
on `Document.getInitialProps`).

Before writing UI code, read
`node_modules/@cinderblock/design-system/docs/AGENTS.md` — the canonical page
skeleton (`Stripe > Bounds > Section > Chunk`), component index, responsive
model, and anti-patterns. Real-world page patterns are in
`node_modules/@cinderblock/design-system/docs/recipes.md`.

Core rules:
- Spacing comes from structure (`Chunk`/`Section`/`Stripe`), never margins.
- No raw HTML tags — use `View`, `Text`, and the design system components.
- Responsive behavior via component props (`switchDirection`, `variant`,
  `itemsInRow`) or `useMediaContext()`, not hand-rolled media queries.
- Don't change `next.config.js` path aliases or the `nextRuntime === 'edge'`
  early-return.

Live recipe pages are in `pages/recipes/` (detail, feed, form) — copy from
them when building new pages.
