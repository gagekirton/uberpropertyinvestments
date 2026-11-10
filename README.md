# Uber Property Investments — uberpropertyinvestments.com

**"We Buy Houses Cleveland OH" — a cash-buyer landing page for Uber Property
Investments LLC, an Ohio wholesaling business.** One page, one job: turn a
Cleveland seller with a house to sell into a lead the owner can work.

- **Live site:** https://www.uberpropertyinvestments.com/ (canonical `www` form)
- **Owner:** Gage Kirton (Winnipeg-based; Ohio LLC: Uber Property Investments LLC)
- **Stack:** Astro 5 (static) + Netlify hosting + Netlify Forms for lead capture.
  No database, no CMS, no backend code, no environment variables.

## What this site is — and what it is not

The whole site is **one page**: `src/pages/index.astro` (plus a small
`src/pages/thank-you.astro` fallback). It is self-contained HTML + one
`<style>` block + one `<script>` block. It does **not** use the old starter
Layout, components, Tailwind, or React — those were removed in the rewrite.

It is a **marketing page with a lead form**, not an application. The owner's
deal pipeline, buyer list, and matching engine live in a separate workspace
(the "Cash Buyers List" space); this site's only job is to capture seller
leads and get them to the owner. How leads flow from here to there is in
[`docs/lead-capture.md`](docs/lead-capture.md).

## Quickstart

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Installs dependencies                         |
| `npm run dev`     | Dev server at `localhost:4321`                |
| `npm run build`   | Production build into `./dist/`               |
| `npm run preview` | Preview the production build locally          |

Prerequisites: Node.js 20+ (see `netlify.toml`).

## Repo layout

```
src/pages/index.astro      The whole site: HTML + <style> + <script>
src/pages/thank-you.astro  Fallback page after a non-JS form submission
public/
  favicon.svg              House-mark favicon
  robots.txt               Excludes /thank-you; points to the sitemap
  sitemap.xml              Homepage only
netlify.toml               Build settings + security headers
docs/
  architecture.md          How the site is built and why
  lead-capture.md          The form, Netlify Forms wiring, CRM mapping
  deployment.md            Netlify, branches, rollbacks
  content-notes.md         Every claim that still needs verification
AGENTS.md                  Rules for AI agents working on this repo
```

## The lead flow, end to end

1. A seller fills in the form on the homepage (4 required fields: property
   address, full name, phone, email; 3 optional: reason for selling,
   timeline, property condition).
2. The form submits to **Netlify Forms** (form name `cash-offer`). The
   submission is stored in the Netlify dashboard (Forms) and triggers an
   email notification.
3. The notification goes to the owner's **personal Gmail,
   `gage.e.kirton@gmail.com`** — see the warning below.
4. The owner (or Muse) enters the lead into the CRM deal pipeline as a
   **Stage 1. LEADS** deal. The field mapping is in
   [`docs/lead-capture.md`](docs/lead-capture.md).

**Why this matters:** the old form only `console.log`'d the lead and showed a
confirmation — submissions went nowhere. A marked test lead sent 2026-11-10
never arrived anywhere. The Netlify Forms rewiring is the fix.

## Human checklist — do these once, before treating the site as live

These are **dashboard steps no code change can do**. They are also in
[`docs/lead-capture.md`](docs/lead-capture.md) and
[`docs/deployment.md`](docs/deployment.md).

- [ ] **Netlify → Site configuration → Forms → turn OFF "Ignore HTML forms".**
      The site shipped with `ignore_html_forms=true`, which makes Netlify
      ignore the form entirely. Until this is off, no lead is recorded.
- [ ] **Netlify → Site configuration → Forms → Form notifications → email to
      `gage.e.kirton@gmail.com`.** This is the only way leads reach the owner.
- [ ] **Switch the production branch to `main`** (Site configuration →
      Build & deploy → Branches) — the live site currently deploys from
      branch `agent-new-template-ba5e`, not `main`. See
      [`docs/deployment.md`](docs/deployment.md).
- [ ] **Supply a real phone number.** The old site showed (216) 555-0142, a
      fictional 555 number. It has been removed everywhere; the phone UI is
      hidden until a real number exists. Search the repo for `TODO(phone)`.
- [ ] **Verify or correct every claim in
      [`docs/content-notes.md`](docs/content-notes.md)** — "est. 2012",
      "300+ houses", the About story, the three testimonials, the 4.9 rating,
      the business address, and the "licensed, local Cleveland business" line.
      The owner is Winnipeg-based and building the Ohio list now; the copy
      must say so honestly.
- [ ] **Send a marked test lead** after deploying, and confirm it arrives in
      the Netlify dashboard AND in `gage.e.kirton@gmail.com`. Then delete the
      test submission from the dashboard.

## Editing content

All page copy lives inline in `src/pages/index.astro`, annotated with
`TODO(...)` comments where a claim is unverified. Do not invent contact
details, statistics, testimonials, or backstory. If a claim cannot be
verified, remove it rather than replacing it with a plausible-sounding one.
`AGENTS.md` has the full rules for AI-assisted edits.

## Deploying

Deploys run on Netlify from the production branch (currently
`agent-new-template-ba5e` — see the checklist above). Every push to that
branch redeploys. See [`docs/deployment.md`](docs/deployment.md) for preview
deploys, rollbacks, and the DNS/domain notes.
