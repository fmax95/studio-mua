# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Studio Mua (graphic design / social media / content creation agency, La Spezia, Italy), built with Astro 5, static output, deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`. Site URL: `https://studiomuadesign.it` (custom domain via `public/CNAME`).

## Commands

```sh
npm run dev       # dev server at localhost:4321
npm run build     # build to ./dist/
npm run preview   # preview production build locally
npm run astro ...  # run Astro CLI (e.g. `npm run astro check`)
npm run deploy     # build + publish ./dist to gh-pages branch (gh-pages package)
```

There is no test suite or linter configured in this repo. `npm run astro check` is the closest thing to a correctness check (TypeScript strict mode via `tsconfig.json`).

## Architecture

### Routing & i18n

Astro's built-in i18n routing is used with `defaultLocale: "it"` and `prefixDefaultLocale: false` (see `astro.config.mjs`). Concretely this means:

- Italian pages live at the top level: `src/pages/index.astro`, `src/pages/graphic-designer.astro`, etc.
- English pages are duplicated under `src/pages/en/`: `src/pages/en/index.astro`, `src/pages/en/graphic-designer.astro`, etc.
- There is **no shared route logic** — each locale has its own full `.astro` file. When adding or editing a page, changes usually need to be made in both the IT file and its `en/` counterpart.
- `LanguageSwitcher.astro` toggles between the two by stripping/adding the `/en` prefix via `astro:i18n`'s `getRelativeLocaleUrl`.

### Translation strategy (mixed, not uniform)

Two different patterns coexist — check which one a given page/component uses before editing:

1. **Hardcoded per-locale content**: `index.astro` / `en/index.astro` and the `new-ui/*` components contain fully separate copy per language directly in the template (no JSON lookup).
2. **JSON-driven content**: `graphic-designer.astro`, `content-creator.astro`, `social-media-manager.astro` import `src/i18n/it.json` or `src/i18n/en.json` directly (whichever matches the page's own locale) and reference keys like `translations.graphicDesigner.pageTitle`.
3. **Shared components with a `lang` prop**: components used on both locales (e.g. `CookieBanner.astro`, `FormQuote.astro`) `await import()` both `it.json` and `en.json` and pick one based on a `lang` prop passed down from the page/`Layout`.

`src/i18n/it.json` and `src/i18n/en.json` must be kept structurally in sync (same keys) since components index into both with the same key path.

### Layout & SEO

- `src/layouts/Layout.astro` is the single top-level layout: renders `<html lang>`, favicons, Google Fonts (`Poppins`, `Inter`, `Allura` — referenced as `--font-title`/`--font-body`/`--font-script` in `global.css`), wraps content in `Navbar` + `CookieBanner`, and delegates all `<head>` SEO tags to `SEO.astro`.
- `SEO.astro` centralizes meta tags, Open Graph/Twitter cards, and JSON-LD (`ProfessionalService` + `Organization` schema.org) for every page. Business info (address, founder, socials) is hardcoded here — update in one place if it changes.
- Every page passes `title`, `description`, `keywords`, and `lang` ("it"|"en") into `Layout`; canonical/og overrides are optional props.
- `public/sitemap.xml` and `public/robots.txt` are maintained by hand, not generated — update `sitemap.xml`'s lastmod when page content changes (see note in `SEO_IMPLEMENTATION.md`).

### Components

- `src/components/new-ui/*` is the current design system in active use (`HomeHeader`, `WelcomeSection`, `ManifestoSection`, `CardCarousel`, `Footer`) — all pages import from here.
- `src/components/Header.astro` and `src/components/Footer.astro` (non-`new-ui`) are legacy/unused by any page — don't build on these without confirming intent.
- `src/components/svg/*` and the top-level `SvgXxx.astro` files are inline SVG components used as decorative/positioned elements (many take `x`, `y`, `width`, `rotateDeg`, `zIndex` props for absolute placement).
- Global design tokens (colors, font families, fluid type scale via `clamp()`) live in CSS custom properties at the top of `src/styles/global.css` — prefer reusing `var(--brown)`, `var(--blue)`, `var(--fs-h2)`, etc. over hardcoding values.

### Notes

- `GOOGLE_FONTS_IMPLEMENTATION.md` is stale in places (documents Fraunces as the title font; the code now uses Poppins) — trust `global.css`/`Layout.astro` over that doc.
- `SEO_IMPLEMENTATION.md` documents the SEO strategy/keyword targeting rationale and a checklist of follow-up SEO work that hasn't been done yet.
