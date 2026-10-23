# Decision Register

| | |
|---|---|
| Updated | 2026-10-23 |

Status values: **OPEN** (needs the Director) · **PROPOSED** (default recommended, awaiting confirmation) · **DECIDED** (with source).

**Needed by** is the phase that is blocked until the decision is made.

## Decisions for the Director now (Phase 0 gate)

| ID | Decision | Options | Recommendation | Needed by | Status |
|---|---|---|---|---|---|
| **D-01** | Brand identity for the design | (a) Use **"Order My Print" + the supplied OMP logo** as the working brand in Figma; (b) neutral placeholder brand as the brief says | **(a)**. The brief's project name is Order My Print and a logo was supplied on 2026-10-23. Treated as *working brand*, not final. Domain stays undecided and nothing is registered. A **vector master (SVG/AI/PDF)** of the logo is needed for production; the supplied file is a 1024 px JPEG on a paper texture | Phase 1 | DECIDED (G0, 2026-10-23) |
| **D-02** | Hosting and database | A: new Hostinger KVM 2 VPS (PostgreSQL, ClamAV, workers) · B: existing Cloud Professional (MySQL, no ClamAV, shared, expires 2027-02-12) · C: managed cloud services | **A**. List price ₹2,099/month or ₹16,788/year (₹11,148 first year), GST extra. See `architecture.md` §6. **No purchase until approved.** Design (Phase 1) can proceed before this is decided | Phase 2 | OPEN |
| **D-03** | Design direction | Direction A "Ink & Paper" · Direction B "Studio Bold" (see `../design/figma-design-brief.md` §3) | **A** | Phase 1 | DECIDED (G0, 2026-10-23) |
| **D-04** | Repository names and the existing `website` repo | Keep `website` as the docs/architecture repo, app repos `omp-storefront`, `omp-admin`, `omp-api`, `omp-design-system` · or the brief's `custom-printing-*` names | `omp-*` names (short, brand-aligned). Keep `website` for docs; optional rename to `omp-architecture` later | Phase 2 | OPEN |

## Proposed defaults (confirm or override; not blocking)

| ID | Decision | Proposed default | Needed by | Status |
|---|---|---|---|---|
| D-11 | Guest checkout | Enabled | Phase 1 | DECIDED (G0, 2026-10-23) |
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
| D-05 | Object storage provider | Phase 2 | Compare VPS disk + offsite backup, Cloudflare R2, India-region S3-compatible |
| D-06 | Payment gateway | Phase 6 | Compare Razorpay, Cashfree, PayU (and others) on the brief's criteria. **None selected** |
| D-06b | Shipping approach | Phase 6 | R1 = manual AWB entry; aggregator later |
| D-07 | Transactional email provider | Phase 6 | — |
| D-08 | Real business data: materials, GSM, sizes, MOQs, prices or cost rates, turnaround, HSN/SAC and GST rates | Before UAT (Phase 7) | Business + CA |
| D-09 | Policies: refund/cancellation, shipping, privacy, terms, grievance officer details, artwork retention period | Before UAT | Business + legal |
| D-10 | Error tracking: self-hosted vs SaaS | Phase 2 | Cost/benefit |
| D-21 | Domain / subdomains | Phase 8 | Not chosen; nothing registered |
| D-22 | Invoice point (on payment vs on dispatch), numbering series, e-invoicing applicability | Phase 3 | CA |
| D-23 | Price-hold window for carts | Phase 3 | e.g. 24 h |
| D-24 | CorelDRAW version(s) used by pre-press | Phase 1 | Sets which CDR versions the upload guidance says are supported |

## Decided

| ID | Decision | Source |
|---|---|---|
| X-01 | Multi-repository; **no monorepo** | Master brief §6, §14 |
| X-02 | React frontends; Figma-first; gated phases | Master brief |
| X-03 | INR, India, English (i18n-ready) | Master brief §1 |
| X-04 | Seven product families in four categories; no packaging products | Master brief §2–3 |
| X-05 | Server-authoritative, data-driven pricing with snapshots | Master brief §2 |
| X-08 | G0 approved: D-01 (a) working brand Order My Print + OMP logo; D-03 Direction A; defaults D-11…D-20 | Director, 2026-10-23 (`docs/approvals/G0-discovery-approval.md`) |
| X-07 | Accept CorelDRAW (CDR) artwork uploads; manual pre-press review in R1 | Director, 2026-10-23 |
| X-06 | Git remote `https://github.com/OrderMyPrint/website.git` connected to `/Users/rutvijpatel/OrderMyPrint` | Director instruction, 2026-10-23 |
