# Content notes — claims that still need verification

Every item below is a claim on the live site that the owner has **not**
confirmed. Each one is also marked with a `TODO(...)` comment in
`src/pages/index.astro`. The rule for all of them: **verify it, correct it,
or remove it. Never replace an unverified claim with a plausible-sounding
one.**

## Contact details

| Claim | Where | Status / what to do |
| :---- | :---- | :------------------ |
| Phone (216) 555-0142 | Header, hero, form, footer, JSON-LD, OG meta | **Removed.** 555 is the fictional range; the number was never dialable. Owner must supply a real number. Search the code for `TODO(phone)`. |
| Email offers@uberpropertyinvestments.com | Footer, JSON-LD | **Replaced with personal Gmail.** The business inbox was a Canadian Google account and has lapsed. Swap in a US business email once the owner has a US bank account for the Ohio LLC. |
| Address: 1300 Lakeside Ave, Cleveland, OH 44114 | JSON-LD | Unverified. Confirm it is a real business mailing address the owner can receive mail at. |
| Hours: Mon–Fri 08:00–19:00, Sat 09:00–15:00 | JSON-LD (openingHours) | Carried over from the old site; confirm they are the real hours. |

## Track record

| Claim | Where | Status / what to do |
| :---- | :---- | :------------------ |
| "Est. 2012" / "★ EST. 2012 ★" | About badge | Unverified. Owner is Winnipeg-based and building the Ohio list now. Confirm a founding year or remove it. |
| "14+ years buying in Cleveland" | Trust bar | Unverified. Same as above. |
| "300+ local houses purchased" | Trust bar | Unverified count. Confirm a real number or remove the stat. |
| "24 hrs avg. offer turnaround" | Trust bar | A promise to sellers. Confirm the owner can turn offers around in 24 hours before publishing. |
| "0 fees or commissions, ever" | Trust bar | True only if a seller never pays any fee or commission. Confirm. |

## Story and identity

| Claim | Where | Status / what to do |
| :---- | :---- | :------------------ |
| "Born and raised in Cleveland. We buy houses in the neighborhoods we grew up in." | About heading | Does not match the owner's background. Rewrite honestly. |
| "Started with one rundown duplex on the near West Side…" / "…because we live on them too." | About paragraphs | Same — kept for structure only. Owner must rewrite. |
| "We're based right here in Cleveland — not a call center in another state." | Benefits card ("A local, familiar face") | Owner works Ohio remotely from Winnipeg. Reword once he confirms how to describe his setup. |
| "We're a licensed, local Cleveland business." | FAQ ("Is this actually legit…") + FAQ intro | Licensing status and local presence unverified. Confirm. |
| "We purchase houses in any condition, on your timeline, with no fees or commissions." | Footer | Keep only if true for every deal (see the "Cash-backed offers" note in `docs/lead-capture.md`). |

## Social proof

| Claim | Where | Status / what to do |
| :---- | :---- | :------------------ |
| Testimonials: Renee T. (Cleveland Heights), Marcus D. (Old Brooklyn), Priya & Sam K. (Lakewood) | Testimonials section | **All three unverified** — no source. Confirm each is a real seller who agreed to be quoted, or remove them. Never invent a testimonial. |
| Rating "4.9 (47 reviews)" | JSON-LD `aggregateRating` + footer | No named source (no review platform given). Confirm the source or remove it. |
| Social links: facebook.com/uberpropertyinvestments, instagram.com/uberpropertyinvestments, linkedin.com/company/uber-property-investments | JSON-LD `sameAs` | Only the Facebook page is known to exist (page `Uberpropertyinvestments`). Verify Instagram/LinkedIn or remove them. |
| Google Business `place_id: REPLACE_WITH_GOOGLE_BUSINESS_PLACE_ID` | JSON-LD `sameAs` | Placeholder, never filled in. Supply the real place ID or remove the entry. |

## Assets

| Claim | Where | Status / what to do |
| :---- | :---- | :------------------ |
| `og-image.jpg` (1200×630) | OG + Twitter meta, JSON-LD `image` | File does not exist in the repo. Supply a real social image or remove the references. |
| `logo.png` | JSON-LD `logo` | File does not exist in the repo. Supply it or remove the reference. |
| "Price Range: $$" | JSON-LD `priceRange` | Carried over from the old site; meaningless for a home buyer. Remove unless there is a reason to keep it. |

## What is NOT a TODO (deliberately kept)

- The service-area list (12 Greater Cleveland cities + Cuyahoga County) —
  it matches the owner's target market.
- The situations list (foreclosure, inherited, tired landlord, divorce,
  relocating, repairs, behind on taxes, downsizing) — standard seller
  situations for this business.
- The 3-step process and the "no repairs / no fees / no showings" benefits —
  standard wholesaling offers, kept as written except the "Real cash" card,
  which was reworded to "Cash-backed offers" for the reason in
  `docs/lead-capture.md`.
