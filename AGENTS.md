# AGENTS.md — rules for AI agents working on this repo

This file is for AI coding tools (Claude, Muse, and similar) working on the
Uber Property Investments site. Read it before changing anything. The
human-readable project overview is `README.md`; the deep docs are in `docs/`.

## First, read these

1. `README.md` — what the site is, the lead flow, the human checklist.
2. `docs/content-notes.md` — every claim that is still unverified. Do not
   touch a claim on this list without verifying it or removing it.
3. `docs/lead-capture.md` — before touching the form in any way.

## The shape of this repo

- The whole site is **one file**: `src/pages/index.astro` (plus the small
  `src/pages/thank-you.astro` fallback). It is self-contained HTML + one
  `<style>` block + one `<script>` block. There is no shared Layout, no
  components directory, no Tailwind, no React. Do not "modernise" it into
  components or a framework unless the owner asks — the single-file shape is
  deliberate: it is the real site as built, and it deploys as-is.
- All copy lives **inline** in `index.astro`, annotated with `TODO(...)`
  comments. Edit copy there, in place.
- Design tokens live in the `<style>` block (`:root` — steel, brick, amber,
  lake, paper, ink, smoke). Do not introduce a second design system.

## Hard rules

- **Never invent contact details or claims.** No phone number, email,
  statistic, testimonial, address, or backstory unless the owner supplied it
  or it is verified in `docs/content-notes.md`. If a claim cannot be
  verified, remove it — do not replace it with a plausible-sounding one.
- **Never submit the live form.** Not even to "test" it. Form testing is
  done in a local preview (`npm run dev` + a local Netlify Forms stand-in
  does not exist — test the markup and JS by inspection and by building;
  the live end-to-end test is the owner's marked test lead, done once after
  deploy — see `docs/lead-capture.md`).
- **Never change the form's identity.** The form name is `cash-offer`
  (`name` attribute + hidden `form-name` field). Renaming it creates a
  second, empty form in the Netlify dashboard and breaks notifications.
- **Never change where leads go in code.** The notification email
  (`gage.e.kirton@gmail.com`) is configured in the Netlify dashboard, not in
  this repo. If the owner gets a US business email, the change happens in
  the dashboard + the footer/`mailto` in `index.astro` — see
  `docs/lead-capture.md`.
- **Never add tracking, analytics, pixels, or third-party scripts** without
  the owner asking. The site currently loads only Google Fonts.
- **Keep TODOs visible.** When you fix a TODO, remove its comment and update
  `docs/content-notes.md` in the same change. Never silently delete a TODO
  without fixing the underlying issue.

## How to make a change

1. Edit `src/pages/index.astro` (or the one file your change concerns).
2. Keep the existing visual design. Do not restyle sections as a side effect.
3. Verify with a build: `npm install` (once) then `npm run build`. The build
   must pass with no errors. Preview with `npm run preview` and check the
   page renders; check the form markup contains `data-netlify="true"` and the
   hidden `form-name` field.
4. If your change touches the form, re-read `docs/lead-capture.md` first and
   confirm: the form still has `name="cash-offer"`, `method="POST"`,
   `data-netlify="true"`, `data-netlify-honeypot="bot-field"`,
   `action="/thank-you"`, the hidden `form-name` input, and the honeypot
   paragraph. The JavaScript must POST to `/` and fall back to a plain
   submit on failure.
5. Commit on a branch and open a pull request against `main`. Never push
   straight to `main` and never change the Netlify production branch — the
   owner decides deploys (see `docs/deployment.md`).

## Content and legal notes (general information, not legal advice)

- Ohio SB 155 (effective March 2, 2026) requires a signed written disclosure
  to the seller **before** any binding contract on 1–4 unit residential,
  stating the buyer is wholesaling. The site copy must never promise "we buy
  with cash" as if every deal closes with the owner's own money — some deals
  are assigned to a cash buyer. The FAQ "Do you buy every house yourself?"
  states this in plain language; keep it.
- The owner is Winnipeg-based and building the Ohio list now. Copy that
  implies a long-established Cleveland-local operation is flagged TODO until
  the owner corrects it.
