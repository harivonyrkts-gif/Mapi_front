# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the marketing/landing-page site for **Mapi**, an SMS messaging platform for businesses (French-language content). It's an [Astro](https://astro.build) site (Astro 6) with the React and Partytown integrations enabled, originally scaffolded from the Astro "basics" starter template.

## Commands

All commands run from the project root:

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321`      |
| `npm run build`   | Build production site to `./dist/`              |
| `npm run preview` | Preview the production build locally            |
| `npm run astro -- check` | Type-check `.astro` files via the Astro CLI |

There is no test suite or linter configured in this project.

## Architecture

- **Pages** (`src/pages/`): File-based routing. `index.astro` composes the homepage by importing and stacking section components inside `Layout`.
- **Layout** (`src/layouts/Layout.astro`): The single HTML shell (doctype, head, fonts, global resets). All pages should be wrapped in this layout via `<slot />`.
- **Components** (`src/components/`): One Astro component per homepage section (`Header`, `Hero`, `MapSMS`, `Appropos`, `Adapte`), plus a shared `Button` component. `Fonctionnement.astro` also exists but is not currently imported into `index.astro`.
  - Sections are self-contained: each owns its markup and a scoped `<style>` block (plain CSS, no utility framework).
  - `Button.astro` is the shared CTA element — it takes `texte`, `href`, and `style` props, where `style` selects a CSS class variant (`noir`, `ghost`, `jaune`). Reuse this component for any new call-to-action rather than hand-rolling links/buttons.
- **Static assets**: Images referenced by section components live in `public/` (referenced by absolute path, e.g. `/Logo-mapi.svg`, `/bg-banner-mapi-edited-prog-scaled.jpg`); a couple of bundler-processed assets (SVGs imported in frontmatter) live in `src/assets/`.
- **Integrations**: `@astrojs/react` (for interactive islands, if/when needed) and `@astrojs/partytown` (for offloading third-party scripts to a web worker) are registered in `astro.config.mjs`.
- TypeScript is configured with Astro's `strict` tsconfig and React JSX support (`jsxImportSource: "react"`), so any `.tsx`/React components should follow standard React conventions.

## Conventions observed in this codebase

- Section components have no props — content is hardcoded in French directly in the markup.
- Styles are scoped per-component using Astro's `<style>` blocks; there is no shared/global stylesheet beyond the resets in `Layout.astro`.
- Internal navigation links (in `Header.astro`) point to routes (`/tarifs`, `/apis`, `/blog`, `/contact`, `/essai`, `/connexion`) that do not yet exist as pages.
