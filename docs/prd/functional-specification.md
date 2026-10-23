# Functional Specification

| | |
|---|---|
| Status | **READY FOR REVIEW** (Phase 0 draft) |
| Date | 2026-10-23 |

This document covers behaviour and state machines. Screen-level detail lives in Figma (Phase 1); APIs live in `../architecture/api-specification.md`.

---

## 1. Storefront

### 1.1 Navigation and discovery
- **Header**
  - Logo.
  - Category mega-menu: four categories → seven products.
  - Search, with predictive results showing products and categories.
  - "Bulk quote" link.
  - Account.
  - Cart, with an item count.
- **Category page**
  - Hero and intro copy (admin-managed).
  - Product cards: image, name, "From ₹X (indicative)", production-time label, primary CTA "Configure".
- **Search and filters**
  - Facets: category, use case, material, finish, quantity range, price range.
  - Facets are generated from option metadata, not hard-coded.
- **Home**
  - Value proposition.
  - Category entry points.
  - Featured/best-selling products (admin-curated until sales data exists).
  - How-it-works steps that mirror real order states.
  - Bulk/corporate band.
  - FAQ teaser.
  - Trust content (only substantiated claims).

### 1.2 Product detail and configurator
- Numbered steps come from the product's option groups.
- Each option may carry a description, an image or swatch, and a "why it matters" tooltip.
- Every change calls **price preview** (debounced). The response contains:
  - validity and any constraint messages;
  - unit price;
  - line subtotal;
  - breakdown (base, options, setup, finishing);
  - GST estimate;
  - quantity-tier table (unit price at each tier);
  - production-time estimate (if configured).
- Invalid combinations: the option is disabled with a reason, or an inline error appears. The API is the final check.
- Over a configurable threshold (quantity or value), the CTA area also offers **"Request a bulk quote"**, pre-filled with the configuration.
- **Artwork step**
  - "Upload now" or "Upload after checkout"; the default is set per product [P].
  - The number of files needed is derived from the configuration (sides, print locations, artwork count).

### 1.3 Artwork upload (customer side)
1. The client asks the API for an upload slot (`POST /artwork/uploads`). The response is a pre-signed URL with size and type limits.
2. The browser uploads directly to private object storage; progress is shown.
3. The client confirms → a background job runs. Up to **Validated**, the file is never served to anyone, staff included:
   - **Scan**: malware scan.
   - **Inspect**:
     - MIME sniffing and extension match;
     - page count and size for PDF;
     - pixel dimensions and effective DPI at the chosen size for raster files;
     - CDR: format signature check only; no thumbnail; flagged "manual review in CorelDRAW";
     - SVG sanitisation (scripts, external refs and event handlers stripped).
   - **Thumbnail**: a preview image is generated.
4. The UI shows each state: uploading → scanning → checks passed / warnings / failed.
   - **Warnings** (e.g. low effective DPI) are advisory and never block.
   - **Failures** (wrong type, infected, corrupt, over the size limit) block.
5. Copy states that checks are basic and that pre-press staff review every file. It never promises print quality.

### 1.4 Cart
- Line items with:
  - configuration summary;
  - artwork status;
  - unit price and line total;
  - edit (returns to the configurator with state restored) and remove.
- Carts persist:
  - guest carts by an opaque cookie token;
  - signed-in carts by user;
  - a guest cart merges into the user cart on sign-in.
- Coupon entry; the server validates it.
- Shipping estimate by PIN code (once a shipping approach is decided).
- On entering checkout, the cart is re-priced (see catalogue doc §4.4).

### 1.5 Checkout
1. Contact details: email and phone. Sign-in is optional; guest checkout is on [P].
2. Billing and shipping addresses (India PIN validation). Optional **GSTIN** and company name for a B2B invoice.
3. Delivery method (when configured).
4. Review: final server price including GST and shipping, policy acknowledgement, and the artwork-pending notice where applicable.
5. **Place order** with an idempotency key:
   - creates `Order(status=awaiting_payment)` with snapshots;
   - initiates a payment with the gateway on the server.
6. Gateway handoff.
7. Return page:
   - the client polls the order status; **the browser redirect is never treated as proof of payment**;
   - the status changes only on a verified webhook or a server-side verification call.
8. Outcomes:
   - **success** → confirmation;
   - **failure or cancel** → retry or change method; the order is kept in `awaiting_payment`;
   - **pending or timeout** → "We're confirming your payment" message, and reconciliation continues in the background.

### 1.6 Customer account
- Dashboard: active orders, actions needed (artwork revisions, quotes awaiting response).
- Orders list and order detail:
  - timeline;
  - per-item status;
  - artwork versions and revision upload;
  - invoices (download);
  - shipments with tracking links.
- Quotations list and detail: accept, decline (with reason) or request clarification (message thread).
- Profile, addresses, GST details, company membership (corporate).

### 1.7 Bulk quotation request
- Multi-item form. Each item has:
  - product (or "other / custom" free text [P]);
  - specification fields (reusing the configurator where possible);
  - quantity;
  - dimensions;
  - materials;
  - target delivery date;
  - notes;
  - artwork (optional).
- Contact and company details. Guests may request a quote; an account is created or linked on acceptance [P].
- Confirmation shows a quote reference and expected response time (business-configured, no default promise).

## 2. Admin

| Module | Key functions |
|---|---|
| Overview | KPIs (orders by state, quotes awaiting action, artwork queue, jobs due, revenue), exception lists |
| Catalogue | Categories, products, option groups and values, constraints, media, SEO fields, artwork requirements, turnaround, tax profile, visibility |
| Pricing | Pricing versions (draft/published/archived), matrix editor + CSV import, component rates, tiers, minimums, surcharges, effective dates, **preview/test bench**, diff between versions |
| Orders | List with filters, detail (items, snapshots, payments, artwork, jobs, shipments, invoices, timeline), hold/cancel with reason, notes |
| Quotations | Pipeline board (requested → under review → sent → accepted/declined/clarification → converted/expired), editor (line pricing with engine suggestion + manual override with reason), revisions, PDF quote, send, convert to order |
| Artwork review | Queue by SLA, file viewer, checks output, approve / request revision (with message and annotated reason codes) / reject |
| Production | Jobs generated per order item when gates pass, job card (spec snapshot, approved artwork, quantities, due date), status board, QC checklist (template per product) |
| Shipments | Create shipment for some or all items (partial fulfilment), carrier, AWB, tracking URL, events, delivered confirmation |
| Customers & companies | Profiles, company accounts, members, GSTIN, credit terms flag (net days) approved by finance, notes |
| Payments & refunds | Payment attempts and events, reconciliation status, refund request → approval (permission + step-up) → gateway refund → status |
| Invoices | GST invoice generation at the configured point (e.g. on dispatch or on payment [Q]), credit notes for refunds, numbering series |
| Coupons & promotions | Code, type (percent/fixed), scope (product/category/cart), min value, validity, usage limits |
| Reports | Sales, orders by state, quote conversion, artwork turnaround, production on-time, refunds; CSV export |
| Staff & roles | Staff users, roles composed of permissions, 2FA mandatory |
| Settings | Business details (legal name, GSTIN, addresses), policies content, notification templates, limits (file size, price-hold), integrations config references (no secrets in UI) |
| Audit log | Immutable, filterable list of who/what/when/before/after |

## 3. State machines

### 3.1 Order (header)

```
awaiting_payment ──(payment captured | credit approved)──▶ confirmed
awaiting_payment ──(expired / cancelled)──▶ cancelled
confirmed ──(all items delivered)──▶ completed
confirmed ──(cancel before production, with refund)──▶ cancelled
any ──(admin hold)──▶ on_hold ──(release)──▶ previous
```

### 3.2 Order item (drives production)

```
pending_artwork ─▶ artwork_in_review ─▶ artwork_approved ─▶ in_production ─▶ qc ─▶ ready_to_dispatch ─▶ dispatched ─▶ delivered
         ▲                 │
         └─(revision requested)
qc ─(fail)─▶ in_production (rework)
```

**Production gate (enforced server-side):** an item may enter `in_production` only if:
- the order is `confirmed` (paid, or credit approved); **and**
- every required artwork slot for the item has an **approved** version.

### 3.3 Artwork version

`uploaded → scanning → (infected → quarantined) | (invalid → failed) | validated → in_review → approved | revision_requested | rejected`

A new upload creates a new version. Earlier versions stay read-only.

### 3.4 Quotation

`requested → under_review → sent(vN) → accepted | declined | clarification_requested → (revised → sent(vN+1)) | expired`

`accepted → converted` (creates an order with the quote's snapshot). Expiry is set per quote.

### 3.5 Payment

`created → pending → captured | failed | cancelled`

`captured → partially_refunded | refunded`

Each event comes from a verified webhook or a server-side verify call and is stored as a `payment_event`. Handlers are idempotent on the gateway event ID.

### 3.6 Shipment

`created → packed → dispatched → in_transit → out_for_delivery → delivered | returned | exception`

## 4. Notifications (email in Release 1)

| Event | Recipient |
|---|---|
| Order placed (awaiting payment) | Customer |
| Payment received / failed | Customer |
| Artwork revision requested | Customer |
| Artwork approved | Customer |
| Production started | Customer (optional) |
| Dispatched, with tracking | Customer |
| Delivered | Customer |
| Quote sent / revised / expiring | Customer |
| Clarification reply | Customer and staff |
| New quote request | Sales |
| New artwork to review | Pre-press |
| Refund approved / processed | Customer and finance |
| Payment reconciliation exception | Finance |

Templates are admin-editable. Sending runs as a background job with retries.

## 5. Permissions (proposed keys)

Permissions are granted to roles; the API checks permission keys, never role names.

- `catalogue.read`, `catalogue.write`
- `pricing.read`, `pricing.write`, `pricing.publish`
- `orders.read`, `orders.write`, `orders.cancel`
- `quotes.read`, `quotes.write`, `quotes.send`, `quotes.override_price`
- `artwork.read`, `artwork.review`
- `production.read`, `production.write`, `qc.write`
- `shipments.write`
- `customers.read`, `customers.write`, `credit.approve`
- `payments.read`
- `refunds.request`, `refunds.approve` (step-up required)
- `invoices.read`, `invoices.issue`
- `coupons.write`
- `reports.read`
- `staff.manage` (step-up required)
- `settings.write`
- `audit.read`

Proposed default roles:

| Role | Scope |
|---|---|
| Owner | All permissions |
| Sales | Quotes, customers |
| Pre-press | Artwork |
| Production | Production, QC |
| Dispatch | Shipments |
| Finance | Payments, refunds, invoices, credit |
| Support | Read-only + notes |
