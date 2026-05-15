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

**TypeScript strict mode** is enabled. Avoid `any` — type Drupal API responses explicitly.

**Path alias**: `@/*` resolves to the project root (`./`), so `@/app/...` or `@/lib/...` etc.

**Server Components by default**: All components in `app/` are Server Components unless they declare `"use client"`. Prefer keeping data fetching in Server Components.

**CSS custom properties** for theming: `--background` / `--foreground` with dark mode via `@media (prefers-color-scheme: dark)` in `globals.css`.

## Tailwind CSS v4

This project uses **Tailwind CSS 4.3.0** — a major rewrite with breaking changes from v3.

### Setup differences from v3

| v3 | v4 |
|----|----|
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `tailwind.config.js` | No config file — all configuration in CSS |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` plugin |
| `@layer utilities { }` | `@utility` at-rule |
| `addVariant()` in config | `@custom-variant` in CSS |

### Theme customization

Tokens are defined in `globals.css` using `@theme`. The `inline` modifier means tokens become CSS variables at `:root`:

```css
@theme inline {
  --color-brand: oklch(60% 0.2 250);
  --font-display: "Inter", sans-serif;
  --spacing-18: 4.5rem;
}
```

All default tokens live in `node_modules/tailwindcss/theme.css`. Colors use OKLCH color space (e.g. `oklch(63.7% 0.237 25.331)`). Override a default token by re-declaring its variable inside `@theme`.

### Custom utilities

```css
@utility tab-4 {
  tab-size: 4;
}
```

### Custom variants

```css
@custom-variant hocus (&:hover, &:focus);
```

### Content scanning

Tailwind v4 auto-detects source files. Use `@source` only when you need to scan paths outside the default detection:

```css
@source "../node_modules/@my-company/ui/src/**/*.tsx";
```

### Arbitrary values

Syntax is unchanged: `w-[32px]`, `bg-[oklch(60%_0.2_250)]`, `text-[--color-brand]`.

### Dark mode

Dark mode uses the `dark` variant. Media-query strategy (default):

```html
<div class="bg-white dark:bg-zinc-900">...</div>
```

The project currently uses `@media (prefers-color-scheme: dark)` directly in `globals.css` for base CSS variables — keep that consistent with any new tokens.
