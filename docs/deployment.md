# Deployment

## Where the live site comes from — read this first

The live site at https://www.uberpropertyinvestments.com/ deploys from branch
**`agent-new-template-ba5e`** (commit `34f3cdba`, deployed 2026-07-03), **not
from `main`**. `main` was only ever the Netlify starter template. This rewrite
was built on top of `agent-new-template-ba5e` and merges to `main` — merging
alone does **not** update the live site.

To make the live site follow `main` (recommended — one source of truth), do
one of these in the Netlify dashboard:

- **Preferred:** Site configuration → Build & deploy → Branches → set the
  **production branch to `main`**, then trigger a deploy. Future pushes to
  `main` deploy automatically.
- **Alternative:** merge `main` into `agent-new-template-ba5e` after every
  change you want live. Works, but it is a second branch to keep in sync and
  easy to forget.

Until one of those happens, the live site keeps serving the old code — with
the dead form.

## Netlify setup

- **Build command:** `npm run build` (see `netlify.toml`)
- **Publish directory:** `dist`
- **Node version:** 20 (`netlify.toml` → `[build.environment]`)
- **Domain:** `uberpropertyinvestments.com` (canonical `www` form — see the
  canonical link tag in `src/pages/index.astro`). DNS is managed where the
  domain is registered; Netlify only serves the site.
- **Forms:** the site has one Netlify Form (`cash-offer`). It is detected at
  build time from the `data-netlify="true"` attribute. After the first deploy
  that includes it, it appears in the Netlify dashboard under Forms. The two
  dashboard steps in `docs/lead-capture.md` (turn off "Ignore HTML forms",
  set the notification email) must be done or leads go nowhere.

## Preview deploys

Any branch or pull request gets a Netlify preview deploy automatically.
Use the preview URL to check a change before merging — especially form
changes. **Do not submit the live form to test it** (see
`docs/lead-capture.md`); use the preview deploy's form, which Netlify also
captures under the same form name, and delete test submissions afterwards.

## Rolling back

Netlify keeps every deploy. To roll back: Netlify dashboard → Deploys →
pick the previous good deploy → "Publish deploy". No code change or new
deploy is needed. If the bad change is in `main`, revert the commit as well
so the next deploy does not reintroduce it.

## What to do after merging this rewrite

1. Switch the production branch to `main` (see above) or merge `main` into
   `agent-new-template-ba5e`.
2. Confirm the deploy succeeds and the live page shows the new form (with
   the optional reason/timeline/condition fields).
3. In the dashboard, confirm the `cash-offer` form appears under Forms.
4. Turn off "Ignore HTML forms" and set the notification email to
   `gage.e.kirton@gmail.com` (see `docs/lead-capture.md`).
5. Send one marked test lead from the live site; confirm it in the dashboard
   **and** in the Gmail inbox; delete the test submission.
6. Work through the owner checklist in the README (real phone number, copy
   verification).
