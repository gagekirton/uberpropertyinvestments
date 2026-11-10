# Architecture

## What this is

A single-page marketing site for Uber Property Investments LLC, a "We Buy
Houses Cleveland OH" cash-buyer landing page. Its only job is to turn a
Cleveland seller into a lead. The owner's deal pipeline, buyer list, and
matching engine live elsewhere (the "Cash Buyers List" space); this repo is
just the public site.

## Stack

| Piece        | Choice                                      | Why                                                        |
| :----------- | :------------------------------------------ | :--------------------------------------------------------- |
| Framework    | Astro 5, static output                      | One static page; no server rendering needed                |
| Hosting      | Netlify (`netlify.toml`)                    | Static hosting + Netlify Forms for the lead form           |
| Lead capture | Netlify Forms (form name `cash-offer`)      | No backend code, no API keys, no database                 |
| Styling      | One inline `<style>` block in `index.astro` | The real site's own steel/brick/amber/paper design system |
| Fonts        | Google Fonts (Archivo Expanded, Inter, IBM Plex Mono) | As the live site loads them; self-hosting is a later option |
| JS           | One inline `<script>` block                 | FAQ accordion + lead-form submit only                      |

## Files

```
src/pages/index.astro       The whole site (see below)
src/pages/thank-you.astro   Fallback page after a non-JS form submit
public/favicon.svg          House-mark favicon
public/robots.txt           Excludes /thank-you; points to the sitemap
public/sitemap.xml          Homepage only
astro.config.mjs            Astro + Netlify adapter, site URL
netlify.toml                Build command, publish dir, security headers
package.json                Two runtime deps: astro, @astrojs/netlify
```

## The single-file page

`src/pages/index.astro` is a complete HTML document: `<head>` (SEO meta,
geo tags, three JSON-LD blocks), one `<style>` block (design tokens in
`:root`, then one rule set per section), the body sections in order, and one
`<script>` block. It deliberately does **not** use Astro layouts or
components, Tailwind, or React — that is how the real site was built, and
splitting it would add moving parts for no benefit on a one-page site.

Sections in order:

1. Header (sticky): brand mark, nav, "Get Cash Offer" CTA. (Phone link
   removed — see `docs/content-notes.md`.)
2. Hero: headline, subcopy, CTA, Cleveland skyline SVG illustration.
3. Trust bar: four stats (two unverified — see `docs/content-notes.md`).
4. How it works: three steps.
5. Benefits: six cards.
6. Situations: eight seller-situation chips.
7. About: badge + two paragraphs (story unverified — see
   `docs/content-notes.md`).
8. Testimonials: three cards (unverified — see `docs/content-notes.md`).
9. Service area: twelve Greater Cleveland cities.
10. FAQ: accordion (JS) + matching FAQPage JSON-LD. Keep the two in sync.
11. Final CTA / lead form: the Netlify Form (see `docs/lead-capture.md`).
12. Footer: business details, contact, service area, copyright.

## SEO

- Title, description, canonical (`https://www.uberpropertyinvestments.com/`),
  geo meta (`US-OH`, Cleveland 41.4993/-81.6944), Open Graph + Twitter cards.
- JSON-LD: `RealEstateAgent` (business), `FAQPage` (mirrors the on-page
  FAQ), `BreadcrumbList`. If you edit the on-page FAQ, edit the FAQPage
  block too — they must say the same thing.
- `public/robots.txt` + `public/sitemap.xml` (homepage only).
- Known gaps (TODOs in the code and `docs/content-notes.md`): `og-image.jpg`
  and `logo.png` are referenced but do not exist in the repo; the Google
  Business `place_id` is a placeholder; the `sameAs` social links are
  unverified.

## What was removed in the rewrite

The repo used to be the Netlify Platform Starter for Astro (demo pages for
blobs, edge functions, image CDN, revalidation, API routes, React
components). None of it was part of the site. It was deleted, along with the
Tailwind/React/Blobs/marked dependencies, the starter Layout and components,
and the starter README. `package.json` now has two runtime dependencies
(`astro`, `@astrojs/netlify`).

## Conventions

- Copy lives inline in `index.astro`, annotated with `TODO(...)` comments.
  `docs/content-notes.md` is the central list of unverified claims.
- Design tokens live in `:root` at the top of the `<style>` block. Add a
  token there before inventing a new colour.
- The form is the most sensitive part of the repo — read
  `docs/lead-capture.md` before touching it.
- Keep the site fast and accessible: semantic HTML, a real `<label>` on
  every form field, `prefers-reduced-motion` respected, visible
  `:focus-visible` outlines. No trackers, pixels, or third-party scripts
  beyond Google Fonts.
