## Rottit — quick context for AI coding agents

This repository is a Next.js (App Router) + TypeScript application with TailwindCSS and Prisma.
Keep guidance concise and code-focused — follow the existing patterns and import styles.

- App layout: the app code is under `app/` (Next.js app router). Prefer server components where possible; components that require browser APIs or hooks will include `"use client"`.
- UI primitives: reusable UI atoms live in `components/ui/` (e.g. `button.tsx`, `input.tsx`). They use:
  - class-variance-authority (cva) for variants, exported `buttonVariants` style objects
  - a `cn(...)` helper from `lib/utils.ts` to merge classnames (uses `clsx` + `tailwind-merge`).
  - `asChild` pattern with `@radix-ui/react-slot` is used frequently (wrap Link inside Button in `components/Header.tsx`).

- Imports use the `@/*` alias. Example: `import { cn } from "@/lib/utils"` or `import { prisma } from "@/lib/prisma"`.

- Prisma/DB:
  - The runtime Prisma client is wrapped in `lib/prisma.ts` and exported as `prisma` (singleton via `globalThis`). Use that import server-side.
    Example: `import { prisma } from "@/lib/prisma"` and then `await prisma.post.findMany()` in server actions or route handlers.
  - The generated client is present under `lib/generated/prisma` (the repo includes generated artifacts). The code references that path for runtime imports.
  - Environment: `DATABASE_URL` is required for Prisma. `lib/prisma.config.ts` loads `../.env` with dotenv, so expect a root `.env` file in local dev.
  - Note: I attempted to locate the source `prisma/schema.prisma` but couldn't find it at the expected root path during analysis; the generated schema exists at `lib/generated/prisma/schema.prisma`. Confirm the canonical schema location and migration folder before changing migrations.

- Scripts and runtime:
  - Use `npm run dev` to start the dev server (package.json uses `next dev --turbopack`).
  - Build with `npm run build` and run with `npm start`.
  - Linting: `npm run lint` (eslint). There are no test scripts in package.json by default.

- Conventions and patterns to follow when editing or adding code:
  - Prefer small, focused components in `components/` and reusable atoms in `components/ui/`.
  - Keep Tailwind utility usage consistent; prefer `cn(...)` to compose classes and use cva-based variants for complex components.
  - For links inside buttons, use the `asChild` pattern. Example from `components/Header.tsx`:
    - `<Button variant="outline" asChild><Link href="/login">Log In</Link></Button>`
  - Server data fetching should use the `prisma` singleton in server components or actions; avoid creating new PrismaClient instances per request.

- Debugging & common developer flows (discoverable):
  - Local dev: `npm install` then `npm run dev`.
  - Prisma: ensure `DATABASE_URL` present. Typical commands (verify schema path in repo before running):
    - `npx prisma generate` (may need `--schema` if schema not in default location)
    - `npx prisma migrate dev` (ensure migrations & schema path are correct first)

- Files to inspect for patterns / examples:
  - `app/layout.tsx` — root layout, font setup, metadata
  - `app/page.tsx` — top-level page entry
  - `components/Header.tsx` — example composition of UI atoms, Link/Button usage
  - `components/ui/button.tsx`, `components/ui/input.tsx` — CVA + cn usage patterns
  - `lib/prisma.ts`, `lib/prisma.config.ts` — Prisma client & config
  - `lib/utils.ts` — `cn` helper implementation

If anything below is unclear or you want the agent to follow different coding constraints (e.g., stricter typing, test-driven changes, or a CI build step), tell me which rules to add and I'll update this file.

— End of instructions
