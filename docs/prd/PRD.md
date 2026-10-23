# Product Requirements Document — Order My Print

| | |
|---|---|
| Product | Order My Print — custom printing e-commerce platform (working name, see D-01) |
| Version | 0.1 (Phase 0 draft) |
| Status | **READY FOR REVIEW**, not approved |
| Owner | Director (business owner) |
| Prepared by | Claude (Product Architect / PM) |
| Date | 2026-10-23 |

Requirement labels used throughout:

- **[C] Confirmed**: stated in the master brief.
- **[A] Assumption**: inferred; needs no decision unless challenged.
- **[P] Proposal**: my recommendation; needs approval.
- **[Q] Open question**: needs the Director's decision (see `docs/decisions/decision-register.md`).

---

## 1. Vision

An Indian online print shop where individuals, small businesses, agencies and corporate procurement teams can:

- configure a print product;
- see a transparent, server-calculated price;
- upload print-ready artwork;
- either buy directly or request a bulk quotation.

Orders then move through artwork review, production, quality control, dispatch and delivery, with clear status at every step.

## 2. Goals and success measures

| Goal | Measure (targets set by the business before launch) |
|---|---|
| Convert self-serve buyers | PDP → cart rate; cart → paid rate |
| Win corporate/bulk business | Quote requests per week; quote → order conversion; time to first quote |
| Transparent, correct pricing | 0 price disputes caused by calculation errors; 100 % of orders carry a pricing snapshot |
| Reliable fulfilment | Share of orders dispatched within the configured production window |
| Fewer artwork problems | Artwork revision rate; time from upload to approval |
| Operational control | 100 % of sensitive admin actions audit-logged |

## 3. Users

| Persona | Needs | Primary flows |
|---|---|---|
| **Individual** [C] | Small runs, simple choices, fast checkout | Browse → configure → upload → pay (guest allowed [P]) |
| **Small business** [C] | Visiting cards, letterheads, stickers; reorders; GST invoice | Direct purchase, account, GSTIN on invoice |
| **Marketing agency** [C] | Many jobs for many clients, repeat specs, artwork revisions | Account, order history, multi-item quotes |
| **Corporate procurement** [C] | Bulk T-shirts/stationery, formal quotations, PO reference, credit terms, GST invoices | Bulk quote → accept → order; company account |
| **Sales staff** [C] | Review and price quotes, revise, convert to orders | Admin quotation pipeline |
| **Artwork / pre-press staff** [C] | Review files, request revisions, approve | Artwork review queue |
| **Production staff** [C] | Job cards, QC checklist, status updates | Production jobs |
| **Dispatch staff** [C] | Pack, record carrier/AWB, update tracking | Shipments |
| **Finance** [C] | Payments, refunds, invoices, reconciliation | Payments & refunds |
| **Administrator** [C] | Catalogue, pricing, staff, settings | Catalogue, pricing, roles, audit |

## 4. Scope

### 4.1 Catalogue [C]

Exactly seven product families in four categories:

| Category | Product families |
|---|---|
| Business Stationery | Visiting Cards, Letter Pads, Envelopes |
| Marketing Print | Brochures, Stickers |
| Custom Transfers | DTF Stickers |
| Corporate Merchandise | Corporate T-Shirt Printing |

The following are all managed in the admin panel, never hard-coded:

- categories, products and options;
- manufacturing specifications;
- prices.

Detail: `product-catalogue-and-pricing.md`.

### 4.2 Commercial models [C]

- **A. Direct purchase:** configure → indicative price → upload artwork → cart → checkout and payment → artwork review → production → dispatch → delivery.
- **B. Bulk quotation:** one or more items with quantity, dimensions, materials, target date and notes, plus optional artwork → sales review and revision → customer accepts, declines or asks for clarification → accepted quote becomes a linked order with price and spec snapshots → production starts only when the payment or credit condition **and** the artwork condition are met.

### 4.3 Pricing [C]

The pricing engine is server-side and data-driven. Inputs it must support:

- product type;
- quantity and quantity tiers;
- dimensions and printable area;
- material, GSM and thickness;
- print sides;
- print method and number of print locations;
- finishing: lamination, folds, cutting and similar;
- setup charges;
- yield and waste allowance;
- packing and shipping;
- discounts;
- tax.

Admins configure all of these, with effective dates:

- formulas;
- price tiers;
- margins;
- minimum quantities;
- surcharges.

The backend price is authoritative. Every order keeps an immutable snapshot of its specification, price breakdown, tax, shipping, discounts and currency.

### 4.4 Artwork [C]

- Supported uploads:
  - PDF, PNG and JPEG;
  - SVG, sanitised before storage;
  - **CorelDRAW (CDR)** [C, Director 2026-10-23]: accepted, malware-scanned and stored privately. There is no automatic preview or content check, so pre-press staff review CDR files manually in CorelDRAW. Customers are encouraged to attach a PDF export too;
  - AI/EPS only when the processing pipeline reliably supports them (later phase [P]).
- Configurable size limits.
- Private storage.
- Validation and malware scanning.
- Versions and review history.
- Review actions: approve, reject, request revision.
- Customer notifications.
- Approved artwork is linked to its production job.
- Advanced preflight (bleed, DPI, fonts, colour profiles) is a later phase [C].
- Copy must never imply that validation guarantees print quality [C].

### 4.5 Markets and localisation

| Item | Requirement |
|---|---|
| Market | India [C] |
| Currency | INR only [C] |
| Language | English, i18n-ready [C] |
| Shipping | Within India only [A] |
| Tax | GST-aware with HSN/SAC per product and place-of-supply logic. Rates are configured by the business, not invented [C] |

## 5. MVP (Release 1) vs later phases [P]

### Release 1: must ship

**Storefront**
- Home, category and listing pages with search and filters.
- PDP configurator for all seven products.
- Live price preview with tier table and breakdown.
- Artwork upload with validation states.
- Cart (guest and signed-in).
- Checkout with one payment gateway.
- Order confirmation.
- Order tracking.
- Customer account: orders, artwork revisions, quotations, addresses, GSTIN.
- Bulk quote request (multi-item); quote accept, decline or clarify.
- FAQ, contact and policy pages.

**Admin**
- Catalogue, options and constraints.
- Pricing rules, tiers, versions and preview.
- Orders.
- Artwork review.
- Quotation pipeline and editor, with conversion to an order.
- Production jobs, job cards and QC checklist.
- Shipments: manual carrier, AWB number and tracking URL.
- Customers and companies, with a manual credit-terms flag.
- Payments and refunds through the gateway.
- GST invoices (PDF).
- Basic coupons.
- Basic reports.
- Staff roles and permissions.
- Settings.
- Audit log.

**Platform**
- Authentication: customers, plus staff with 2FA.
- Object-level authorisation.
- Idempotent orders and payments.
- Verified webhooks and reconciliation.
- Transactional email.
- Backups and monitoring.

### Later phases [P]

- AI/EPS ingestion, automatic CDR previews and advanced preflight.
- Online design editor.
- Saved artwork library and one-click reorder.
- WhatsApp and SMS notifications.
- Shipping aggregator API.
- Corporate credit limits, statements and PO approval chains.
- Multiple delivery addresses per order.
- Reviews and ratings.
- Customer stories and gallery CMS.
- Additional languages.
- Sample kits.
- Advanced analytics.

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Security | OWASP ASVS L2 baseline [P]; no secrets in source control; object-level authorisation on every customer resource; staff 2FA; audit log for price overrides, refunds, permission and state changes [C] |
| Privacy | DPDP Act 2023-aligned privacy notice and consent; data minimisation; artwork retention period set by the business [Q] |
| Compliance (to verify with the business's CA/legal) | Consumer Protection (E-Commerce) Rules 2020 disclosures (seller details, grievance officer, return/refund policy); GST invoice content; e-invoicing applicability depends on turnover [Q] |
| Performance | Storefront LCP ≤ 2.5 s on mid-range mobile over 4G for catalogue pages [P]; price preview p95 ≤ 300 ms server time [P] |
| Accessibility | WCAG 2.2 AA [P] |
| Reliability | Daily DB backups with tested restore; at-least-once background jobs with idempotent handlers [P] |
| Money | Decimal-safe types end to end; documented rounding rules; INR to 2 decimals [C] |
| Observability | Structured logs, error reporting, uptime checks [C] |
| SEO | Server-rendered catalogue and PDP, structured data (Product, Offer, BreadcrumbList), sitemap [P] |

## 7. Out of scope (until approved)

- Packaging products from the reference site [C].
- Brand name, domain or logo finalisation without approval [C].
- Marketplace or multi-vendor features.
- International shipping.
- Multi-currency.
- Mobile native apps.

## 8. Dependencies

- Business data: real materials, MOQs, prices, turnaround, tax and HSN codes, and policies.
- Payment gateway selection (Phase 6).
- Shipping approach (Phase 6).
- Email provider (Phase 6).
- Object storage (Phase 2).
- Hosting (D-02).

## 9. Related documents

- `functional-specification.md`: detailed behaviour and state machines.
- `user-stories-and-acceptance-criteria.md`: stories with IDs.
- `feature-matrix.md`: requirement → value → implementation → dependencies → acceptance → phase.
- `product-catalogue-and-pricing.md`: catalogue and pricing-engine model.
- `../architecture/*`: architecture, data model, API.
- `../decisions/decision-register.md`: open decisions.
