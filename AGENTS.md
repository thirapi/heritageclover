<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Heritage Clover project rules

- Plan: `tasks/prd-heritage-clover-website.md` (work one user story at a time, in order).
- Every section must follow `docs/03-Kontrak-Section.md` — sections are later ported into
  `~/project/exantara-saas` (see `docs/04-Integrasi-Exantara.md`).
- Stack is pinned to match exantara-saas: Next 16, React 19.2, **Tailwind 3.4** (not v4).
- Checks: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
