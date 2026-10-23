# User Stories & Acceptance Criteria

| | |
|---|---|
| Status | **READY FOR REVIEW** (Phase 0 draft) |
| Date | 2026-10-23 |

**IDs are permanent.** Prefixes:

| Prefix | Area |
|---|---|
| `CAT` | Catalogue |
| `CFG` | Configurator |
| `PRC` | Pricing |
| `ART` | Artwork |
| `CRT` | Cart |
| `CHK` | Checkout |
| `PAY` | Payments |
| `ACC` | Account |
| `QUO` | Quotations |
| `ORD` | Orders |
| `PRD` | Production |
| `SHP` | Shipping |
| `INV` | Invoices |
| `ADM` | Administration |
| `SEC` | Security |

Acceptance criteria use Given / When / Then. Release: **R1** = MVP, **L** = later phase.

---

## Catalogue & discovery

**CAT-01 (R1).** As a shopper, I browse products by category so that I find the right print product quickly.
- Given the four categories exist, when I open the mega-menu, then I see each category with its products as managed in admin.
- Given an admin hides a product, when I reload the category page, then the product is not listed and its URL returns 404 (or a redirect if one is configured).

**CAT-02 (R1).** As a shopper, I see a "From ₹X" indicative price on product cards.
- The value equals the engine's lowest valid configuration price for the active pricing version and is labelled "indicative".

**CAT-03 (R1).** As a shopper, I search and filter.
- Searching for a product name or synonym (admin-managed) returns that product first.
- Facets show only values that exist on at least one visible product.

## Configurator & pricing

**CFG-01 (R1).** As a shopper, I configure a product step by step.
- Steps follow the admin-defined order.
- Changing an option updates the price within 1 s on a normal connection.
- Restricted combinations are disabled with a visible reason.

**CFG-02 (R1).** As a T-shirt buyer, I enter quantities per size.
- The total quantity equals the sum of the sizes.
- A zero total disables add-to-cart.
- Size-specific surcharges (if configured) appear in the breakdown.

**PRC-01 (R1).** As a shopper, I see a price breakdown and tier table.
- The breakdown lists base, options, setup, finishing, GST estimate and total.
- The tier table shows the unit price at each configured tier.
- All figures come from the API.

**PRC-02 (R1).** The server rejects tampered prices.
- Given a client sends a cart line with a modified price, when the cart is saved, then the server ignores the client price and stores its own calculation.

**PRC-03 (R1).** As an admin, I publish a new pricing version with an effective date.
- Before `effective_from`, the old version prices new carts.
- After it, the new version applies.
- Existing orders keep their snapshot unchanged.

**PRC-04 (R1).** As an admin, I preview prices before publishing.
- The preview shows the same breakdown the storefront would show for any configuration, using the draft version.

**PRC-05 (R1).** Price changed after carting.
- Given my cart line was priced under v1 and v2 is now active, when I enter checkout, then I see the old and new price and must confirm before paying.

## Artwork

**ART-01 (R1).** As a shopper, I upload artwork in PDF, PNG, JPEG, SVG or CorelDRAW (CDR).
- Files over the configured limit are refused before upload.
- Wrong types are refused after content sniffing, even if the extension is allowed.
- SVGs are stored only after sanitisation.
- CDR files are scanned and stored, show a "reviewed manually by our pre-press team" note instead of a preview, and the upload guidance names the supported CorelDRAW versions (D-24).

**ART-02 (R1).** Uploaded files are scanned before anyone can download them.
- Given a file is infected, then it is quarantined, the customer is told to upload a different file, and staff cannot download it.

**ART-03 (R1).** As pre-press staff, I approve, reject or request a revision with a message.
- On "request revision", the customer gets an email and an action item in their account; the item status becomes `pending_artwork`.

**ART-04 (R1).** As a customer, I upload a revised version.
- A new version is created.
- Previous versions remain visible (read-only) with their review history.

**ART-05 (L).** Advanced preflight (bleed, fonts, colour profile) reports.

**ART-06 (R1).** As a shopper, I see one upload slot per side/panel/print location, each with its printable area guide for my selected options.
- Changing garment type, size or print location updates the guide (e.g. polo left chest 9 × 9 cm).
- Templates (PDF/AI/CDR) are downloadable per slot.
- Required slots without files show a warning; I can upload after checkout where allowed.

## Sign-in (customers)

**AUTH-01 (R1).** I sign in with my mobile number and a 6-digit OTP; no password exists.
**AUTH-02 (R1).** A wrong OTP shows remaining attempts; after the limit, sign-in for that number pauses for the configured time.
**AUTH-03 (R1).** An expired OTP can be re-requested after the resend cooldown.
**AUTH-04 (R1).** My first verification creates my account; email is optional.

## Cart & checkout

**CRT-01 (R1).** My guest cart persists for the configured period and merges into my account on sign-in, without duplicate lines.

**CHK-01 (R1).** I verify my mobile number with an OTP at checkout (this signs me in or creates my account), add my name, optionally an email, and optionally a GSTIN for a B2B invoice.
- The GSTIN format is validated.
- The GSTIN state code drives place-of-supply logic.

**CHK-02 (R1).** Placing an order twice (double click or a network retry) with the same idempotency key creates exactly one order.

## Payments

**PAY-01 (R1).** An order is marked paid only after a signature-verified webhook or a server-side verify call. The browser return URL alone never marks it paid.

**PAY-02 (R1).** A duplicate webhook for the same gateway event ID has no further effect.

**PAY-03 (R1).** If payment status is unknown after the return, a reconciliation job queries the gateway until the payment is resolved or times out. The customer sees "confirming payment".

**PAY-04 (R1).** Refunds:
- require `refunds.approve` and step-up authentication;
- are executed through the gateway;
- are recorded with a reason;
- are audit-logged;
- generate a credit note where an invoice exists.

## Account & tracking

**ACC-01 (R1).** I see only my own orders, quotes, artwork and invoices.
- Requesting another customer's resource ID returns 404.

**ACC-02 (R1).** I see an order timeline and per-item status, and shipment tracking links when dispatched.

**ACC-03 (R1).** Company members see company orders according to their company role (admin or member) [P].

## Quotations

**QUO-01 (R1).** I request a quote for several items, with optional artwork, and receive a reference number.

**QUO-02 (R1).** Sales staff price each line using the engine suggestion, may override with a mandatory reason (audit-logged), and send version N.

**QUO-03 (R1).** I accept, decline (with a reason) or request clarification.
- After acceptance, the quote becomes read-only and an order is created with the quote's snapshot and price.

**QUO-04 (R1).** Expired quotes cannot be accepted. Sales can revise and resend them.

## Orders, production, shipping

**ORD-01 (R1).** Production gate: an item cannot move to `in_production` unless the order is paid or credit-approved **and** its artwork is approved. The API refuses the transition.

**PRD-01 (R1).** A job card shows the spec snapshot, approved artwork version, quantities (including the size breakdown), due date and QC checklist.

**PRD-02 (R1).** QC failure returns the job to production with a recorded reason.

**SHP-01 (R1).** Dispatch staff create a shipment for some or all items, entering carrier, AWB and tracking URL. The customer is notified.

**SHP-02 (L).** Shipping aggregator integration creates shipments and syncs tracking automatically.

## Invoices

**INV-01 (R1).** A GST invoice PDF is generated with:
- the business details and GSTIN;
- the customer's GSTIN (if any);
- HSN/SAC and tax split (CGST/SGST or IGST);
- a sequential invoice number from the configured series.

## Administration & security

**ADM-01 (R1).** Staff roles are composed of permission keys. The API enforces permissions even if the UI hides a control.

**ADM-02 (R1).** These actions write an immutable audit entry (actor, action, target, before, after, IP, time):
- price override;
- refund approval;
- permission change;
- pricing publish;
- order cancel or hold.

**SEC-01 (R1).** Staff accounts require TOTP 2FA. Sensitive actions require re-authentication within the last 10 minutes [P].

**SEC-02 (R1).** Artwork and invoice downloads use short-lived signed URLs, issued only after an authorisation check.
