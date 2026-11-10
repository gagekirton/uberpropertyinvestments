# Lead capture

## The problem this fixes

The old form did not capture leads. Its submit handler called
`e.preventDefault()`, collected the four fields, and ran only
`console.log('New lead submitted:', data)` — with a Zapier webhook fetch
commented out behind `XXXXXX` placeholders. The page showed "Got it, …" so a
seller believed the lead was sent. It went nowhere.

Proof: a marked test lead submitted 2026-11-10 02:16 CST ("TEST LEAD PLEASE
IGNORE — 123 Test Street, Cleveland, OH 44101") showed the confirmation and
never arrived in any inbox the owner can see.

## How it works now

The form is a **Netlify Form** (form name `cash-offer`):

1. Seller submits the form on the homepage.
2. JavaScript POSTs it to Netlify (`fetch('/')`, URL-encoded, including the
   hidden `form-name` field). On success the same in-page confirmation
   appears ("Got it, {first name}."). If the AJAX post fails, the code falls
   back to a plain form POST, which lands on `/thank-you` — the lead is
   still recorded either way.
3. Netlify stores the submission in the dashboard (**Forms**) and sends an
   email notification — but only after the two dashboard steps below.

### Required dashboard steps (code cannot do these)

Do both in the Netlify dashboard or leads will not arrive:

1. **Turn OFF "Ignore HTML forms":** Site configuration → Forms → disable
   "Ignore HTML forms". The site shipped with `ignore_html_forms=true`,
   which makes Netlify ignore `data-netlify` forms entirely. Until this is
   off, the form is invisible to Netlify even though the code is correct.
2. **Set the notification email:** Site configuration → Forms → Form
   notifications → add an email notification to
   **`gage.e.kirton@gmail.com`** (the owner's personal Gmail).

Verify after deploying: send a marked test lead, confirm it appears in the
Netlify dashboard (Forms → `cash-offer`) **and** in
`gage.e.kirton@gmail.com`, then delete the test submission from the
dashboard.

## Why personal Gmail (not the business email)

The business inbox `offers@uberpropertyinvestments.com` was a Canadian
Google account and has **lapsed**. The owner still needs a US-based bank
account for the Ohio LLC (Uber Property Investments LLC) before he can get a
US business email. Until then, leads go to his personal Gmail. When the
business email exists, change it in two places: the Netlify dashboard
notification above, and the footer/`mailto` in `src/pages/index.astro`.

## Form fields

| Field | Name attribute | Required | Notes |
| :---- | :------------- | :------- | :---- |
| Property address | `address` | Yes | Free text; `autocomplete="street-address"` |
| Full name | `name` | Yes | `autocomplete="name"` |
| Phone number | `phone` | Yes | `type="tel"`; `autocomplete="tel"` |
| Email address | `email` | Yes | `type="email"`; `autocomplete="email"` |
| Reason for selling | `reason-for-selling` | No | Select; options mirror the "Situations" section |
| Timeline | `timeline` | No | Select: ASAP / 30 days / 1–3 months / exploring |
| Property condition | `property-condition` | No | Select: move-in ready → fire/water damage / not sure |
| Anything else | `notes` | No | Free-text textarea |

Every field has a real `<label>` (placeholders are hints only) and the form
carries a honeypot field (`bot-field`) for spam. The form name is
`cash-offer` in three places that must agree: the `name` attribute, the
hidden `form-name` input, and the Netlify dashboard. **Do not rename it** —
renaming creates a second, empty form in Netlify and breaks notifications.

## Where leads go next (CRM mapping)

Website leads enter the owner's deal pipeline (Pro Wholesaler CRM, 11 stages,
47 fields) as **Stage 1. LEADS** deals:

| Form field | CRM deal field |
| :--------- | :------------- |
| `address` | Address (Link) |
| `name`, `phone`, `email` | Contacts & Organizations (+ Notes) |
| `reason-for-selling` | Seller's Reason for Selling |
| `timeline` | Notes (offer-review timing) |
| `property-condition` | Overall Condition of Property |
| `notes` | Notes |
| — (not on the form) | List Price, Offer Price, Repairs, ARV, Wholesale Fee, comps — filled in during the discovery call (Stage 2) |

The full 47-column list is in the owner's workspace
(`sheets-spaces/pro-wholesaler-pipeline.json`) — it is not duplicated here.

## Ohio wholesaling disclosure (general information, not legal advice)

Ohio SB 155 (effective March 2, 2026) requires a **signed written
disclosure to the seller before any binding contract** on 1–4 unit
residential property, stating the buyer is wholesaling. That disclosure
happens off-site, before a contract is signed — the website's job is not to
mislead before that point. Two consequences for this repo:

- Site copy must never promise "we buy with cash" as if every deal closes
  with the owner's own money. Some deals are assigned to a cash buyer. The
  "Cash-backed offers" card and the FAQ "Do you buy every house yourself?"
  state this in plain language — keep them.
- Do not add copy that pressures a seller to sign quickly or implies an
  offer is a binding purchase. Getting an offer is free and non-binding, and
  the site says so.

If the law changes or the owner gets legal advice that conflicts with this
page, the legal advice wins — update the copy and this doc together.
