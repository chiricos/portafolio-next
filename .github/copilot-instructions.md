# Copilot Instructions

## ⚠️ Important: Non-standard Next.js version

This project uses **Next.js 16.2.6** with **React 19.2.4**. APIs, conventions, and file structure may differ from your training data. **Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.** Heed deprecation notices.

## Commands

```bash
npm run dev       # Start development server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint (no --file flag; runs across the project)
```

No test suite is configured.

## Architecture

This is a **Next.js App Router** frontend that consumes a **Drupal backend** via its JSON:API. The Drupal site runs locally via DDEV at `http://portafolio.ddev.site`.

Data flow: Drupal JSON:API → Next.js Server Components → rendered HTML. There is no client-side data fetching layer — all fetches happen in async Server Components.

```
app/
  layout.tsx             # Root layout: Geist fonts, Tailwind base styles
  page.tsx               # Article listing — fetches from /jsonapi/node/article
  globals.css            # Tailwind v4 entry + CSS custom properties
  articulo/[slug]/
    page.tsx             # Article detail (empty — not yet implemented)
```

## Key Conventions

**Drupal JSON:API shape**: Responses follow the JSON:API spec — data lives under `data[]`, fields under `data[].attributes`, and relationships under `data[].relationships`. The base URL for all API calls is `http://portafolio.ddev.site/jsonapi/`.

**Tailwind v4**: Uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`). Theme tokens are declared with `@theme inline { ... }` in `globals.css`. The PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`.

**Path alias**: `@/*` resolves to the project root (`./`), so `@/app/...` or `@/lib/...` etc.

**Server Components by default**: All components in `app/` are Server Components unless they declare `"use client"`. Prefer keeping data fetching in Server Components.

**TypeScript strict mode** is enabled. Avoid `any` — type Drupal API responses explicitly.

**CSS custom properties** for theming: `--background` / `--foreground` with dark mode via `@media (prefers-color-scheme: dark)` in `globals.css`.
