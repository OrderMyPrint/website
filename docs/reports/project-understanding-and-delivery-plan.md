<!-- Exported from the Claude Docs report "Order My Print — Project Understanding & Phase-wise Delivery Plan" on 2026-11-04 (doc rev 26). The online doc (https://claude.ai/artifact/1KjvVXDUw8R8rEjvviwLh4) is the live version; re-export after edits. -->

# Order My Print — Project Understanding & Phase-wise Delivery Plan

2026-11-04 · @Rutvij

## Executive summary

Order My Print is an Indian online print shop for seven product families. Customers either buy directly at a server-calculated price, or request a bulk quotation that staff price and the customer accepts.

Delivery runs in nine gated phases. Nothing moves from design to code, or from code to a live site, without your recorded approval.

**Phases 0 and 1 are done and approved.** G0 was approved on 23 Oct 2026. G1 (the Figma design) was approved on 4 Nov 2026, after a full UX and flow audit. Next is G2: hosting (you currently use Vercel), repository names and file storage.

## What I understand we are building

A custom-printing e-commerce platform for India: INR, English (ready for more languages later), shipping within India.

**Who buys:** individuals, small businesses, marketing agencies and corporate procurement teams.

**Who operates it:** sales, pre-press (artwork), production, dispatch, finance and administrators, each with their own permissions.

**The catalogue** has exactly seven product families in four categories. All of them are managed from the admin panel, with no options or prices hard-coded.

| Category | Product families | What makes it different to configure |
| --- | --- | --- |
| Business Stationery | Visiting Cards, Letter Pads, Envelopes | Paper stock and GSM, sides, finish; sheets per pad; window envelopes |
| Marketing Print | Brochures, Stickers | Fold types and open size; shape, material, adhesive, cutting style |
| Custom Transfers | DTF Stickers | Transfer size or gang-sheet area, film type, number of artworks |
| Corporate Merchandise | Corporate T-Shirt Printing | Garment, fabric, colour, quantity per size, print method, print locations |

**Two ways to buy:**

1. **Direct purchase:**
   1. The customer configures a product, sees an indicative price and uploads artwork.
   2. They pay at checkout.
   3. The order then goes through artwork review, production, quality check, dispatch and delivery.
2. **Bulk quotation:**
   1. The customer requests a quote for one or more items: quantities, sizes, materials, target date and optional artwork.
   2. Sales staff price it and can revise it.
   3. The customer accepts, declines or asks for clarification.
   4. An accepted quote becomes an order at the agreed price.

**Pricing is the heart of the system.**

- The server always calculates the price. What the browser shows is never trusted.
- Prices can depend on:
  - quantity tiers, size and printable area;
  - material, sides, print method and print locations;
  - finishing, setup, waste allowance;
  - shipping, discounts and GST.
- Admins manage price tables, formulas, margins, minimums and effective dates.
- Every order keeps a frozen copy of its spec and price, so later price changes never alter it.

**Artwork:**

- From the first release, customers upload print-ready files: PDF, PNG, JPEG, SVG (after cleaning) and CorelDRAW CDR. CDR files are virus-scanned and stored like the others. Our system cannot preview or check them automatically, so pre-press staff open them in CorelDRAW. Customers are asked to add a PDF copy where they can.
- Files are stored privately and virus-scanned before staff can open them.
- Every upload is kept as a new version. Staff approve, reject or ask for a revision, and the customer is notified.
- **Production cannot start until the order is paid (or on approved credit terms) and its artwork is approved.**
- AI/EPS files, automatic previews of CDR files, and advanced print checks (bleed, fonts, colour profiles) come in a later phase.

**What it is not:** no packaging products, no international shipping, no multi-currency, no online design editor in the first release. The reference site, theboxandlabelco.com, informs shopping patterns only. Its branding, text, prices and policies are not used.

## How we work: gated delivery

The rule is **design first → your approval → implementation → testing → deployment approval**. Each gate is a hard stop: I present evidence and wait for your explicit approval, which is recorded in `docs/approvals/`.

*[Diagram in the online doc: delivery roadmap · 9 phases, 6 approval gates]*

Design runs first. Build starts only after both the design gate (G1) and the architecture gate (G2). Storefront and admin are built in parallel on the backend APIs. Staging and production each need their own approval.

The same controls apply in every phase:

- Figma design comes before any UI code, and design approval before implementation.
- Architecture approval comes before repositories are created; deployment approval before staging or production.
- No invented prices, minimum quantities, materials, tax rates, delivery times, integrations or test results. Placeholder figures are marked **DEMO**.
- No brand decision without you. No copying of the reference site's branding or assets.
- No secrets in source code, Figma, logs or the browser.
- Permissions are enforced on the server, not just hidden in the UI.
- Payment counts only when the payment gateway confirms it to our server; a browser redirect is not proof.
- No production work before payment (or approved credit) and artwork approval.
- No purchases, hosting or DNS changes, deletions or deployments without your approval.
- Separate repositories (no monorepo), small reviewable commits and pull requests.

Phase status uses: NOT STARTED, IN PROGRESS, BLOCKED, READY FOR REVIEW, APPROVED, COMPLETED. A phase is only marked APPROVED or COMPLETED with evidence and your sign-off.

## Where we are today

Phase 0 is **APPROVED** (G0, 23 Oct 2026). Phase 1 is **APPROVED** (G1, 4 Nov 2026). All documents are in the private GitHub repository OrderMyPrint/website (latest commit d55d4c1, 4 Nov 2026).

**Environment checked on 23 Oct 2026:**

| Area | Finding |
| --- | --- |
| GitHub | You are admin of the OrderMyPrint organisation (Free plan). `website` is the only repository and now holds the docs |
| Figma | Connected as Digitech Miner. You can edit only in Digitech Miner's team (Pro), so the design file goes there |
| Hostinger | Cloud Professional plan, shared with about 20 other sites, not renewing, expires 12 Feb 2027. No VPS. That plan cannot run PostgreSQL, Docker or a virus scanner |
| Your machine | Node 22, PostgreSQL 16 and the GitHub CLI are installed; Docker is not |
| Brand | Your OMP logo is saved unchanged. It is a 1024 px JPEG; a vector version will be needed for print and the web |

**What the reference site taught us** (theboxandlabelco.com):

- **Worth adopting:** shopping by category, "From ₹X" prices on product cards, production time shown early, numbered configuration steps, artwork upload inside the product page.
- **Gaps we will fill:**
  - Prices are a fixed grid with per-sheet rates written into option names, and there is no price breakdown.
  - There is no real bulk-quote workflow.
  - Several FAQ answers were empty, and two policy pages contradict each other.
- **Limits of the research:** the site's styling did not load in my browser, so I made no visual or mobile layout judgements. I did not enter their checkout, because that requires uploading files to their site.

**Phase 0 documents:** PRD; functional specification with order, artwork, quote and payment states; user stories with acceptance criteria; a 41-item feature matrix; catalogue and pricing model; architecture, data model and API outline; six architecture decision records; decision register; Figma design brief with 40 storefront and 30 admin screens; phase tracker; G0 approval request.

## Phase 1 status and UX audit (4 Nov 2026)

The [Figma design](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy) is complete and audited: 81 storefront screens, 32 admin screens, 36 dialogs and 13 clickable prototypes. You approved it at G1 on 4 Nov 2026.

| Area | Result |
| --- | --- |
| Your Phase 1 requests | All applied: logo-led palette, CDR uploads, tablet designs, mobile + OTP sign-in, guided artwork upload with print areas, admin order map, business phone, Lottie slots, Printify/Printful ideas |
| Content | No DEMO text left. SEO-ready copy, researched market reference prices, typical turnaround ranges, AI-generated photos |
| Prices and totals | Reconciled end to end. Each product's tiers, breakdown and GST now agree; one cart total (₹2,771.82) is used from cart to admin |
| Incomplete actions | 36 dialogs, sheets and drawers added (25 storefront, 11 admin), e.g. cookie consent, remove from cart, address, decline quote, order help, cancel item, change number, hold/cancel order, QC fail, publish pricing |
| Layout bugs | Fixed a hidden admin table column, a mobile upload box overflow, a stuck loading button and a stray icon |
| Prototypes | 13 flows, P0–P12, with 122 links and none broken: consent, shop, checkout, quotes, account, sign-in, tracking, admin and a full mobile purchase |

Still open before launch: GST treatment for the CA (D-28), confirmation of reference prices (D-08), legal details for contact and policy pages (D-09) and the map provider (D-27). Full findings are in `docs/design/ux-audit-2026-11-04.md`.

## Design phases

### Phase 0: Discovery, audit and requirements (done, G0 approved 23 Oct 2026)

This phase:

- audited the environment;
- researched the reference site;
- turned the brief into requirements;
- defined the first release (MVP) versus later scope;
- proposed architecture and repositories;
- prepared the Figma brief.

**Exit gate G0:** you approve the discovery scope, the working brand (D-01) and the visual direction (D-03).

### Phase 1: Figma design (done, G1 approved 4 Nov 2026)

I create a real, editable Figma file. It contains components and variants built with Auto Layout, not screenshots or mock-up images. I build it in this order:

1. **Foundations:** colour, type, spacing, grid, breakpoints and other design tokens, checked for accessible contrast.
2. **Components:** buttons, inputs, quantity and size controls, product cards, option selectors, price breakdown, tier table, artwork dropzone, status badges, alerts, tables, modals, drawers, navigation, and empty, loading, error and success states.
3. **Storefront screens**, desktop and mobile:
   - home, category, search and filters;
   - the seven product configurators;
   - artwork upload states;
   - cart, checkout, payment success/failure/pending, confirmation;
   - tracking, customer account, quotations, bulk quote form;
   - FAQ, contact and policy pages.
4. **Admin screens:**
   - login with 2FA, dashboard;
   - catalogue, variants, pricing rules and preview;
   - orders, quotation pipeline and editor;
   - artwork review, production jobs, QC, shipments;
   - customers and companies, payments and refunds, invoices;
   - coupons, reports, staff roles, settings, audit log.
5. **Seven clickable prototypes:**
   1. Shopping to cart.
   2. Checkout and payment.
   3. Bulk quote to acceptance.
   4. Order tracking.
   5. Admin quote to order.
   6. Artwork approval to production.
   7. Dispatch to tracking.
6. **Handoff report:**
   - Figma link;
   - screens versus the inventory;
   - design-system summary;
   - gaps;
   - open design questions;
   - proposed build order.

The file uses the 13 pages listed in the brief, from "00 — Cover & Project Brief" to "12 — Prototypes & User Flows".

Figma now uses real copy and researched reference prices instead of DEMO values; the business confirms final values before UAT (D-08). When you request changes, I update the file, log the revision and ask for approval again.

**Exit gate G1:** your explicit design approval. No React code is written before it.

## Implementation phases

Implementation starts only after design approval (G1) and architecture approval (G2). The proposed stack is React and Node with TypeScript throughout:

- **Storefront:** Next.js, server-rendered for SEO.
- **Admin:** a React single-page app.
- **Backend:** a NestJS API on PostgreSQL.
- **Shared UI:** a versioned design-system package.

### Phase 2: Repositories and architecture setup

1. Confirm hosting (D-02), file storage (D-05) and repository names (D-04).
2. Create separate private repositories:
   | Repository | Holds |
   | --- | --- |
   | `omp-storefront` | Customer storefront |
   | `omp-admin` | Admin app |
   | `omp-api` | Backend and business logic |
   | `omp-design-system` | Shared tokens and components |
`website` stays as the documentation repository.
3. Give each repository:
   - a README and environment example without secrets;
   - build instructions, linting and type checks;
   - automated tests and CI.
4. Turn the Figma design tokens into the shared design-system package.
5. Write the final architecture decision records: database access layer, authentication library, error tracking.

**Exit:** every repository builds and passes CI, and the architecture is approved (G2).

### Phase 3: Backend and data

The backend is built in dependency order, because the storefront and admin need these APIs first:

1. **Catalogue and product options**, with rules for invalid combinations.
2. **Pricing engine:**
   - price tables and formulas, versions and effective dates;
   - preview, tier tables and rounding rules;
   - test cases for every product.
3. **Artwork:**
   - private upload, virus scan, file checks and cleaning of SVGs; CDR files accepted for manual review in CorelDRAW;
   - versions and review actions.
4. **Cart and checkout:**
   - re-pricing at checkout and price-change confirmation;
   - protection against duplicate orders.
5. **Orders and the production gate**, plus quotations with revisions and conversion to orders.
6. **Operations and admin:**
   - production jobs and QC;
   - shipments (carrier and tracking number entered manually);
   - GST invoices and credit notes;
   - coupons, notifications, staff permissions and audit log.

Money uses exact decimal maths, never floating point. Critical steps run inside database transactions. Every customer record is checked for ownership.

**Exit:** the API documentation is complete, automated tests pass for every rule in the user stories, and the test results are recorded.

### Phase 4: Storefront

The storefront is built faithfully to the approved Figma design, in this order:

1. Shared components; header, navigation and footer.
2. Home, category and listing pages.
3. Product pages with configurators and live price preview.
4. Artwork upload.
5. Cart and checkout.
6. Customer account, quotations and order tracking.
7. A responsive and accessibility pass (target WCAG 2.2 AA).

All data comes from the API. If a technical limit forces a design change, I document it and ask you first.

### Phase 5: Admin

The admin app is built from the approved Figma design and the shared design system. It covers:

- catalogue and variants;
- pricing configuration with preview;
- orders and quotations;
- artwork review;
- production, QC and shipments;
- customers and companies;
- payments, refunds and invoices;
- reports, staff roles and audit history.

Sensitive actions (refund approval, price overrides, permission changes) need a fresh login check and are logged.

Phases 4 and 5 can run side by side once their APIs exist.

## Integration, testing and launch

### Phase 6: Payments, shipping and integrations

1. Compare payment gateways (for example Razorpay, Cashfree, PayU) on the brief's criteria:
   - availability in India and supported payment methods;
   - fees and refund support;
   - webhook reliability, documentation and sandbox;
   - support and integration effort.
2. You choose (G6). Nothing is treated as selected before that.
3. Build the payment integration:
   - payment started from our server;
   - signed webhooks verified, and duplicate events ignored;
   - a background check for interrupted payments;
   - refunds through the gateway.
4. Shipping: the first release records carrier and tracking number manually. A shipping-aggregator integration comes later, after a separate comparison.
5. Transactional email through a provider you approve, plus secure access to invoices and artwork.

Test and live settings are documented separately. No keys go in the code or the browser.

### Phase 7: Quality assurance and user acceptance testing

A test plan links each requirement to its design screen, API and test case. It covers:

- **Products and pricing:**
  - all seven configurations, minimum quantities, invalid combinations;
  - pricing tiers and surcharges, tax and shipping;
  - price changes after carting.
- **Artwork:** upload of every accepted type including CDR, rejection and revision.
- **Quotes and checkout:** quote creation and acceptance, guest checkout.
- **Payments:** success, failure, timeout, duplicate webhooks, refunds.
- **Fulfilment:** production-gate restrictions, partial dispatch and tracking.
- **Security:** access to other customers' records and files, admin role limits.
- **Quality:** responsive layouts, accessibility and keyboard use, database restore, error monitoring.

You run user acceptance testing on staging with real business data.

**Exit gate G7:** you accept the release report. It lists:

- what was built and what was deferred;
- test results that were actually run, known defects and security risks;
- environment settings and external services;
- the rollback plan and open business decisions.

### Phase 8: Staging and production

- **Staging (G8a):**
  - confirm hosting, subdomain, database and storage;
  - set secrets securely and run migrations;
  - set up backups and monitoring;
  - smoke tests.
- **Production (G8b), a separate approval:**
  - verify payment and shipping credentials, approved product and price data, legal policies and GST invoice rules, and transactional email;
  - production smoke tests;
  - confirm rollback and backup recovery.

No deployment, DNS change or live-site change happens without your explicit authorisation.

## Decisions needed from you

D-01, D-03 and the defaults were decided at G0. Your G1 design approval is the next decision. The rest can wait until the phase that needs them.

| ID | Decision | My recommendation | Needed by |
| --- | --- | --- | --- |
| D-01 | Working brand in Figma | "Order My Print" with your OMP logo, used as supplied. Please send a vector logo file | Decided at G0 |
| D-03 | Visual direction | A "Ink & Paper": paper-white surfaces, navy text, the logo's CMYK colours as precise accents (B "Studio Bold" uses dark navy with gradients) | Decided at G0 |
| D-11…D-20 | Proposed defaults | Accept: guest checkout on (later replaced by mobile + OTP sign-in, X-09); no cash on delivery; prices shown incl. GST; corporate credit terms as a manual flag; Figma file in Digitech Miner's team | Decided at G0 |
| D-02 | Hosting | New Hostinger KVM 2 VPS (2 vCPU, 8 GB): ₹2,099/month or ₹16,788/year (₹11,148 first year), plus GST. No purchase without your approval | Phase 2 |
| D-04 | Repository names | `omp-storefront`, `omp-admin`, `omp-api`, `omp-design-system`; keep `website` for docs | Phase 2 |
| D-05 | File storage | Compared in Phase 2 | Phase 2 |
| D-06, D-07 | Payment gateway, shipping approach, email provider | Compared in Phase 6 | Phase 6 |
| D-08 | Real business data: materials, rates, minimum quantities, delivery times, HSN codes and GST rates | Start collecting during Phase 1 | Before UAT |
| D-09 | Policies: refunds and cancellation, shipping, privacy, terms, grievance officer, artwork retention | Draft with your legal or CA adviser | Before UAT |
| D-28 | GST treatment: 18% for printed products, 5% for T-shirts, and GST on delivery charges | Ask your CA to confirm; the design applies GST to items and delivery | Before UAT |

**New question (CDR files):** which CorelDRAW version does your pre-press team use? A CDR file saved in a newer version may not open in an older one, so the upload guidance will name the versions you support. The design currently says CorelDRAW X7 or later (D-24).

The full register is in `docs/decisions/decision-register.md`.

## Key risks

| Risk | Impact | How we handle it |
| --- | --- | --- |
| Real business data arrives late | Launch slips; the site would show DEMO data | Start gathering materials, rates and policies during Phase 1; track as D-08 and D-09 |
| Pricing engine complexity | Wrong prices, disputes | Each product starts as a simple price table and adds formulas only where needed; test cases per product; admin preview before publishing |
| Hosting cannot run the stack | No PostgreSQL or virus scanning on the current plan | Decide D-02 before Phase 2; dedicated VPS recommended |
| Running our own server | Patching, backups and monitoring become our job | Scripted setup, automatic security updates, offsite backups and a restore drill before launch |
| Unsafe uploaded files | Malware reaching staff machines | Virus scan and type checks before anyone can open a file; SVGs cleaned; CDR files reviewed manually in CorelDRAW; AI/EPS deferred |
| Payment edge cases | Lost or double-counted payments | Server-side confirmation only, duplicate-event protection, background reconciliation, dedicated tests |
| Scope creep | Delays | Release 1 scope fixed at G0; anything new goes into the later-phase list |

## Immediate next steps

- [x] **You:** review the Phase 0 documents and reply "G0 approved" with answers to D-01, D-03 and the defaults
- [ ] **You:** send a vector version of the OMP logo (SVG, AI or PDF) when available
- [ ] **You:** start collecting real product data and policies (D-08, D-09)
- [x] **Me, after G0:** create the editable Figma file and build foundations, components, screens and prototypes
- [x] **Me:** deliver the Phase 1 handoff report and stop for your design approval (G1)
- [ ] **You, any time before Phase 2:** decide hosting (D-02)
- [x] **You:** open page 12 in Figma, present flows P0–P12 and reply "G1 approved" or list changes
- [ ] **You:** ask your CA to confirm GST treatment (D-28)
- [ ] **You:** send the legal entity name, GSTIN, registered address, support email and grievance officer (D-09)

