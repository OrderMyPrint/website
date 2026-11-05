# Decision Register

| | |
|---|---|
| Updated | 2026-11-04 |

Status values: **OPEN** (needs the Director) · **PROPOSED** (default recommended, awaiting confirmation) · **DECIDED** (with source).

**Needed by** is the phase that is blocked until the decision is made.

## Decisions for the Director now (Phase 0 gate)

| ID | Decision | Options | Recommendation | Needed by | Status |
|---|---|---|---|---|---|
| **D-01** | Brand identity for the design | (a) Use **"Order My Print" + the supplied OMP logo** as the working brand in Figma; (b) neutral placeholder brand as the brief says | **(a)**. The brief's project name is Order My Print and a logo was supplied on 2026-10-23. Treated as *working brand*, not final. Domain stays undecided and nothing is registered. A **vector master (SVG/AI/PDF)** of the logo is needed for production; the supplied file is a 1024 px JPEG on a paper texture | Phase 1 | DECIDED (G0, 2026-10-23) |
| **D-02** | Hosting and database | A: new Hostinger KVM 2 VPS (PostgreSQL, ClamAV, workers) · B: existing Cloud Professional (MySQL, no ClamAV, shared, expires 2027-02-12) · C: managed cloud services · **D: Vercel** (Director currently uses Vercel, 2026-11-04) for the storefront and admin, plus a separate home for the API workers, PostgreSQL and ClamAV | **Under review.** A was recommended before Vercel came up; `architecture.md` §6 now compares D. A Vercel-only setup cannot run ClamAV or long-running workers. List price ₹2,099/month or ₹16,788/year (₹11,148 first year), GST extra. See `architecture.md` §6. **No purchase until approved.** Design (Phase 1) can proceed before this is decided | Phase 2 | **DECIDED (G2, 2026-11-05)**: Vercel for storefront, admin and API; managed PostgreSQL; no purchase yet (`docs/approvals/G2-architecture-approval.md`) |
| **D-03** | Design direction | Direction A "Ink & Paper" · Direction B "Studio Bold" (see `../design/figma-design-brief.md` §3) | **A** | Phase 1 | DECIDED (G0, 2026-10-23) |
| **D-04** | Repository names and the existing `website` repo | Keep `website` as the docs/architecture repo, app repos `omp-storefront`, `omp-admin`, `omp-api`, `omp-design-system` · or the brief's `custom-printing-*` names | `omp-*` names (short, brand-aligned). Keep `website` for docs; optional rename to `omp-architecture` later | Phase 2 | **DECIDED (G2, 2026-11-05)**: `omp-*` multi-repo; `omp-api` created **public**; `website` and `omp-storefront` stay public (exception to "all private") |

## Proposed defaults (confirm or override; not blocking)

| ID | Decision | Proposed default | Needed by | Status |
|---|---|---|---|---|
| D-11 | Guest checkout | ~~Enabled~~ **Superseded by X-09** (mobile + OTP verification at checkout; carts still work before sign-in) | Phase 1 | SUPERSEDED (2026-10-23) |
| D-12 | Artwork timing | "Upload now" or "after checkout", default per product; production blocked until approved | Phase 1 | DECIDED (G0, 2026-10-23) |
| D-13 | Cash on delivery | **Not offered** (made-to-order risk) | Phase 1 | DECIDED (G0, 2026-10-23) |
| D-14 | Corporate credit terms in R1 | Manual flag per company (net days), approved by finance; no credit limits or statements until later | Phase 1 | DECIDED (G0, 2026-10-23) |
| D-15 | Price display | Storefront shows prices **incl. GST** with a breakdown; quotes and B2B invoices show the tax split | Phase 1 | DECIDED (G0, 2026-10-23) |
| D-16 | Bulk-quote threshold | Admin-configurable per product; "Request quote" CTA shown alongside "Add to cart" above it | Phase 1 | DECIDED (G0, 2026-10-23) |
| D-17 | Admin app tech | React + Vite SPA (static), storefront Next.js | Phase 2 | DECIDED (G0, 2026-10-23) |
| D-18 | Queue | pg-boss on PostgreSQL; no Redis in R1 | Phase 2 | DECIDED (G0, 2026-10-23) |
| D-19 | Content pages | Admin-managed rich text in the API; no separate CMS in R1 | Phase 2 | DECIDED (G0, 2026-10-23) |
| D-20 | Figma location | New file in the **Digitech Miner's team** (the only Figma team where the account has a Full/edit seat) | Phase 1 | DECIDED (G0, 2026-10-23) |

## Needed later (tracked; no action now)

| ID | Decision | Needed by | Notes |
|---|---|---|---|
| D-05 | Object storage provider | Before staging | Hosting is Vercel (G2). Candidates: Vercel Blob, Cloudflare R2, India-region S3-compatible. Dev uses a local-disk adapter |
| D-29 | Hosted malware-scanning service for artwork (ClamAV cannot run on Vercel) | Before artwork uploads go live | New at G2 (2026-11-05). Compare hosted ClamAV/scanning APIs on cost, India data handling and file-size limits |
| D-06 | Payment gateway | Phase 6 | Compare Razorpay, Cashfree, PayU (and others) on the brief's criteria. **None selected** |
| D-06b | Shipping approach | Phase 6 | R1 = manual AWB entry; aggregator later |
| D-07 | Transactional email provider | Phase 6 | — |
| D-08 | Real business data: materials, GSM, sizes, MOQs, prices or cost rates, turnaround, HSN/SAC and GST rates | Before UAT (Phase 7) | Business + CA |
| D-09 | Policies: refund/cancellation, shipping, privacy, terms, grievance officer details, artwork retention period | Before UAT | Business + legal |
| D-10 | Error tracking: self-hosted vs SaaS | Before staging | SaaS fits Vercel hosting; cost/benefit |
| D-21 | Domain / subdomains | Phase 8 | Not chosen; nothing registered |
| D-22 | Invoice point (on payment vs on dispatch), numbering series, e-invoicing applicability | Phase 3 | CA |
| D-23 | Price-hold window for carts | Phase 3 | e.g. 24 h |
| D-25 | SMS provider for OTP (+ TRAI DLT sender ID and template registration) | Phase 6 | Required for launch; compare cost, delivery rates, DLT support. **None selected** |
| D-26 | Lottie animations: custom brand animations vs licensed library assets | Phase 4 | Slots marked in Figma; licences recorded per asset |
| D-27 | Map provider for the admin Order map (must render India's official boundaries; e.g. an India-compliant tile provider) + PIN-code geocoding source | Phase 5 | Cost and licence to compare; nothing selected |
| D-24 | CorelDRAW version(s) used by pre-press | Phase 1 | Sets which CDR versions the upload guidance says are supported. Design copy currently says **CorelDRAW X7 or later**; confirm |
| D-28 | GST treatment: rates per product (design uses 18% printed products, 5% T-shirts) and GST on delivery charges (design applies the items' rate to delivery as part of the supply) | Before UAT (Phase 7) | CA to confirm; affects cart, checkout, invoices and quotes |

## Decided

| ID | Decision | Source |
|---|---|---|
| X-01 | Multi-repository; **no monorepo** | Master brief §6, §14 |
| X-02 | React frontends; Figma-first; gated phases | Master brief |
| X-03 | INR, India, English (i18n-ready) | Master brief §1 |
| X-04 | Seven product families in four categories; no packaging products | Master brief §2–3 |
| X-05 | Server-authoritative, data-driven pricing with snapshots | Master brief §2 |
| X-16 | **G1 approved**: the Figma design, as updated by the 2026-11-04 UX audit, is the basis for implementation. This includes OTP-only sign-in (X-09) and guided upload (X-10) | Director, 2026-11-04 (`docs/approvals/G1-design-approval.md`) |
| X-14 | No DEMO copy in designs: SEO-ready real copy; **researched market reference prices**, industry-standard options, India-wide delivery, typical turnaround ranges (final values still need business confirmation under D-08) | Director, Phase 1 |
| X-15 | UX audit: every action that needs a decision, form or confirmation has a designed dialog, sheet or drawer (36 added); prices reconciled end to end | Director, 2026-11-04 (`../design/ux-audit-2026-11-04.md`) |
| X-13 | Business phone number: **+91 63561 61761** (header utility bar, contact page, checkout help, footer/contact details) | Director, 2026-10-23 |
| X-12 | Admin “Order map & flow”: map of order destinations by status with dispatch routes, by-state panel, exceptions, and an order-flow stage strip; mini map on the overview | Director, 2026-10-23 |
| X-11 | Tablet (834 px) designs added alongside desktop and mobile | Director, 2026-10-23 |
| X-10 | Guided artwork upload per product: one slot per side/panel/print location with printable area, bleed, safe area and no-print zones shown; templates per slot | Director, 2026-10-23 |
| X-09 | Customer sign-in = mobile number + OTP only (no email/password). Email optional for invoices. Staff admin keeps email + password + TOTP 2FA | Director, 2026-10-23 |
| X-08 | G0 approved: D-01 (a) working brand Order My Print + OMP logo; D-03 Direction A; defaults D-11…D-20 | Director, 2026-10-23 (`docs/approvals/G0-discovery-approval.md`) |
| X-07 | Accept CorelDRAW (CDR) artwork uploads; manual pre-press review in R1 | Director, 2026-10-23 |
| X-06 | Git remote `https://github.com/OrderMyPrint/website.git` connected to `/Users/rutvijpatel/OrderMyPrint` | Director instruction, 2026-10-23 |
