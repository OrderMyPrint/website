# Reference Site Audit — theboxandlabelco.com

| | |
|---|---|
| Status | Phase 0 research, complete within the limits listed in §9 |
| Audited | 2026-10-23 |
| Method | Built-in browser in the Claude desktop app (page text, DOM inspection, viewport emulation at 1024 px and 375 px); public Shopify product JSON (`/products/<handle>.js`) fetched with `curl` |
| Auditor | Claude (acting as Product Architect) |

> **Purpose.** This audit documents shopping and merchandising *patterns* only. The reference site's branding, copy, imagery, prices, production capabilities, delivery times and policies belong to that business. None of them are business rules for Order My Print, and none are reused in our designs or data.

---

## 1. Platform facts (directly observed)

| Fact | Evidence |
|---|---|
| Shopify storefront, theme "TBL NEW WESBITE" based on **Dawn 15.2.0** | `window.Shopify.theme` on the homepage |
| Store currency **INR** | `Shopify.currency.active = "INR"` |
| **GoKwik** scripts load on product pages (`sdk.gokwik.co`, `pdp.gokwik.co`) | Script hosts on homepage and PDP |
| Dynamic-checkout button container present | `.shopify-payment-button` or a GoKwik element in the DOM |
| Predictive search, mobile menu drawer, Shopify customer accounts (`/account/login`) | DOM: `predictive-search`, `menu-drawer`, account links |
| Artwork upload is a Shopify **line-item property** (`properties[Custom File]`) on the add-to-cart form, `accept="image/*,.png,.jpg,.jpeg,.svg,.pdf"` | PDP form inspection |

**Not verified:** which payment methods or gateway the checkout actually uses. GoKwik scripts are loaded, but I did not start a checkout (see §9). The checkout experience is therefore **unverified**.

---

## 2. Page-by-page observations

| # | Page / URL | Observed functionality | UX pattern |
|---|---|---|---|
| 1 | Homepage `/` | Scrolling trust bar ("orders fulfilled", "brands", "Low MOQ", "Easy customisation", "Eco-friendly"). Three category hero banners with a CTA each. Best-selling product carousel. Four-step "Your order journey". Category tiles with one-line taglines. "Real customer stories" section. "Inspiration gallery" by product type. About teaser with About/Contact CTAs | Trust bar → category heroes → best sellers → process explainer → categories → social proof → gallery → about |
| 2 | Shop `/collections/all` | 25 products. Sort (featured, best selling, A–Z, price, date). Faceted filters: Category, Color, Size, Quantity, Price, Availability. Cards show title, **"Processing Time: 2-5 Working Days"**, **"From Rs. X"** and "Choose options" (or "Add to cart" for single-variant items) | Grid + facets, starting price, turnaround on the card |
| 3 | PDP `/products/standard-custom-stickers` | Turnaround line above the price. "incl. taxes". Numbered steps: **1. Choose Size → 2. Choose Quantity → 3. Choose Shape** (pill buttons). **Required** "Upload Your Design" dropzone (PNG/SVG/PDF, max 10 MB, transparent background recommended). Add to cart. A "Processing & Shipping Policy" block (production time, no-refund note, WhatsApp/email shipping notice). Description | Numbered configurator steps, required upload before add-to-cart, policy summary next to the CTA |
| 4 | PDP `/products/custom-shape-stickers` | Size → Material (Standard / Waterproof) → Quantity in sheets | Material as a priced option |
| 5 | PDP `/products/greeting-display-cards-bulk` | "Bulk" sold as a separate product with a fixed piece count per size; Printing: Front / Both sides | Bulk modelled as a product, not a quote |
| 6 | Cart `/cart` | Empty-state cart. "Log in to check out faster". Estimated total, "Taxes included. Discounts and shipping calculated at checkout." | Login nudge, tax-inclusive messaging |
| 7 | FAQ `/pages/faq` | Five accordion questions. **Only the first had answer content in the DOM**; the other four were empty | Accordion FAQ |
| 8 | About `/pages/about` | Brand story, mission, "Why choose us" (customisation, eco focus, timely delivery, pricing) | Value proposition page |
| 9 | Contact `/pages/contact` | Legal name, postal address, email, phone and **GSTIN** shown. Contact form (name, email\*, phone, comment) | Legal/GST transparency, simple form |
| 10 | Shipping policy `/policies/shipping-policy` | Processing window plus transit window for Standard and Express, total estimate, India-wide coverage, tracking via email/SMS/WhatsApp, address-error, failed-delivery and damage-reporting rules | Processing time and transit time explained separately |
| 11 | Return policy `/pages/return-policy` | Strict no-refund/no-return/no-exchange; damaged items must be reported within a set window; no order modification or cancellation after placement | Made-to-order policy |
| 12 | Footer (all pages) | Address, business hours, phone, email; quick links (Shop, About, Contact, FAQ, T&C); customer links (Account, Return, Privacy, Shipping); Instagram | Full footer with policy links |

### Product configuration patterns (from public product JSON)

| Product | Options (in display order) | Variants |
|---|---|---|
| Standard Custom Stickers | Size (incl. pieces per sheet) · Quantity in sheets (with per-sheet price **in the label**) · Shape | 40 |
| Waterproof Stickers (Vinyl) | Size · Quantity (per-sheet price in label) · Shape | 40 |
| Custom Shape Cut Stickers | Size · Material · Quantity (sheets) | 24 |
| Standard Custom Labels | Size (pieces per sheet) · Quantity (per-sheet price in label) | 32 |
| Custom Cards (300 gsm) | Size (fixed piece count) · Printing sides (surcharge shown **in the label**) | 16 |
| Custom Cards (Bulk) | Size (larger piece count) · Printing sides | 16 |
| Single Colour Butter Paper | Print colour · Quantity (sheets) | 54 |
| Printed Kraft Mailers | Size · Quantity · Print colour | 48 |

**What this shows.** Every price is a **precomputed variant** (the Cartesian product of the options). There is no formula, no area-based pricing and no custom dimensions. Per-unit price and surcharges are only communicated by being written into option label text. This works for a small, fixed catalogue. It does **not** scale to custom dimensions, size-wise T-shirt breakdowns, DTF printable area or corporate quotations, which our brief requires.

---

## 3. Verification of the ten preliminary patterns

| # | Pattern | Verdict | Evidence |
|---|---|---|---|
| 1 | Category-based product discovery | **Confirmed** | Homepage category tiles and heroes; `/collections/*` |
| 2 | Product cards with starting prices | **Confirmed** | "From Rs. X" on every card in `/collections/all` |
| 3 | Product-specific variants and quantity options | **Confirmed** | Product JSON, table above |
| 4 | Quantity/size filtering | **Confirmed** | Size and Quantity facets on `/collections/all`; the Category facet listed only one value, so tagging looks incomplete |
| 5 | Processing-time information | **Confirmed** | On cards, PDP and the shipping policy |
| 6 | Best-selling sections | **Confirmed** | Homepage "Best selling" carousel, `/collections/best-selling` |
| 7 | Category promotional sections | **Confirmed** | Three category hero banners |
| 8 | Order journey explainer | **Confirmed** | Four steps: received → design review → processing & dispatch → delivery |
| 9 | Customer stories and inspiration gallery | **Partly confirmed** | Both section headings render. No `<video>`/`<iframe>` was in the DOM at inspection time (it may lazy-load), so story media is **unverified** |
| 10 | Bulk-order enquiries and support | **Partly confirmed** | Support details and a generic contact form exist. **No dedicated bulk-quote form or quote workflow was found.** "Bulk" is a fixed-quantity product, and the FAQ question about bulk discounts had no answer content |

---

## 4. Pricing presentation

- A single total price updates with variant selection and is labelled "incl. taxes".
- Per-unit economics are written into option labels ("Rs. N/sheet"); there is no price breakdown component.
- No tier table, no "save X% at quantity Y" and no breakdown of setup, finishing, shipping or GST.
- The cart says discounts and shipping are calculated at checkout.

**Implication for us:** show a structured **price breakdown** (unit price, quantity, finishing surcharges, setup, GST, shipping estimate) and a **quantity-tier table**, calculated by the server. Never put prices in option label text.

## 5. Artwork upload experience

- One file, required before add-to-cart, max 10 MB, PNG/SVG/PDF suggested (the accept attribute also allows any `image/*` and JPEG).
- No visible check of file dimensions, resolution or bleed, and no preview of artwork against the selected size.
- Review happens after the order ("Design Review" journey step); no customer-facing proof-approval step is visible on the site.
- The file is attached as a cart line property, so artwork is tied to a cart line, not to a reusable, versioned artwork record.

**Implication for us:** use versioned artwork records with a review state, revision requests and customer notifications. Show clear file guidance and validation messages that never promise print quality.

## 6. Cart and checkout

- Standard Dawn cart with a login prompt and estimated total.
- Checkout **not observed** (§9). GoKwik scripts indicate a third-party checkout layer, which is **unverified**.

## 7. Bulk enquiry workflow

- **None found** beyond the generic contact form.
- This is the largest functional gap relative to our brief (multi-item quotations, revisions, accept/decline/clarify, conversion to an order).

## 8. Strengths, usability issues and adopt/adapt/avoid

### Strengths
- A very short path from homepage to configured product.
- Turnaround is shown early (card and PDP).
- A numbered configurator reduces cognitive load.
- Artwork upload sits inside the purchase flow, so there is no separate email step.
- The policy summary sits next to the CTA.
- Legal, GST and contact transparency.

### Usability issues observed
1. Prices and surcharges are hidden in option label strings, with no breakdown or tier comparison.
2. There are no option explanations (what "waterproof" or "300 gsm" means) and no visual swatches in the text content.
3. Four of five FAQ answers were empty.
4. Policy text conflicts: the PDP says no refund "once print production begins", while the return policy says orders cannot be modified or cancelled once placed. The return policy also still contains bracketed template placeholders.
5. The homepage has four `<h1>` elements, one of them empty, which weakens accessibility and SEO structure.
6. There is no quote path for genuinely large or custom orders.
7. The Category filter showed only one value, so facet tagging looks incomplete.

### Adopt / adapt / avoid

| Pattern | Decision | How we use it |
|---|---|---|
| Category tiles + category heroes | **Adopt** | Four categories, each with a landing section |
| Starting price on cards | **Adopt** | "From ₹X" computed by the pricing engine for each product's cheapest valid configuration, marked as indicative |
| Turnaround on cards and PDP | **Adapt** | Configurable per product/option; production time shown separately from shipping time; never a hard promise until the business approves SLAs |
| Numbered configurator steps | **Adopt** | Steps generated from admin-defined option groups |
| Required upload in the PDP | **Adapt** | Allow "upload now" or "upload after checkout" (configurable), because corporate buyers often order before the final artwork is ready |
| Policy summary near the CTA | **Adopt** | Pulled from admin-managed policy content |
| Order-journey explainer | **Adopt** | Mirrors our real order states (§ functional spec) |
| Trust bar with numeric claims | **Adapt** | Only with substantiated claims supplied by the business; no invented numbers |
| Customer stories / gallery | **Adapt (later phase)** | Needs real customer content and consent |
| Prices inside option labels | **Avoid** | Use a structured breakdown and tier table instead |
| Precomputed variant matrix as the only pricing model | **Avoid** | Use a data-driven pricing engine that supports matrix *and* formula models |
| "Bulk" as a fixed product | **Avoid** | Use a real quotation workflow |
| Empty FAQ items, conflicting policies, multiple H1s | **Avoid** | Content QA and an accessibility gate before launch |

## Mobile and desktop

- `meta viewport` is `width=device-width,initial-scale=1`, and Dawn's mobile drawer navigation is present.
- **Visual layout could not be assessed** at either width, because the pane did not apply the theme's main stylesheets (§9). Mobile conclusions about layout quality are therefore **not drawn**.

## 9. Research limitations

1. **Styling did not load in the built-in browser pane.** `base.css` and `style.css` reported no stylesheet object in the page, although `curl` received `base.css` with HTTP 200 (71 KB). Screenshots were unstyled and are **not retained as evidence**. Visual and layout judgements are therefore excluded. A quick manual look in a normal browser is recommended if visual parity matters.
2. **Checkout not entered.** Adding to cart requires uploading a design file to a third-party site. I did not upload files to, or submit forms on, a site we don't own. Payment methods and the GoKwik flow are unverified.
3. **No forms submitted** (contact form, account creation, login).
4. Customer-story media may lazy-load and was not observed.
5. In-page `fetch()` was blocked in the pane, so public product JSON was read with `curl` instead. Raw JSON is kept in the session scratchpad only, not in this repository.
6. Only a single point in time was observed (2026-10-23). Third-party sites change.

## 10. Evidence links

- https://theboxandlabelco.com/
- https://theboxandlabelco.com/collections/all
- https://theboxandlabelco.com/products/standard-custom-stickers
- https://theboxandlabelco.com/products/custom-shape-stickers
- https://theboxandlabelco.com/products/greeting-display-cards-bulk
- https://theboxandlabelco.com/cart
- https://theboxandlabelco.com/pages/faq
- https://theboxandlabelco.com/pages/about
- https://theboxandlabelco.com/pages/contact
- https://theboxandlabelco.com/policies/shipping-policy
- https://theboxandlabelco.com/pages/return-policy
- Product JSON: `https://theboxandlabelco.com/products/<handle>.js` for the eight handles in §2
