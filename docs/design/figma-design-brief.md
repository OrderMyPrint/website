# Figma Design Brief & Screen Inventory

| | |
|---|---|
| Status | **READY FOR REVIEW** (Phase 0). Figma work starts only after Phase 0 approval |
| Date | 2026-10-23 |
| Figma access | Verified 2026-10-23: account "Digitech Miner", **Full seat on "Digitech Miner's team" (Pro)**; View-only seats on two other teams. New file proposed in Digitech Miner's team (D-20) |

---

## 1. Brand discovery

**Supplied asset:** `docs/brand/supplied/omp-logo-supplied-2026-10-23.jpg` (1024×1024 JPEG, sRGB, SHA-256 `d028a62a…eaab7`). It contains:

- an "OMP" monoline monogram with a CMYK-spectrum gradient: cyan → violet → magenta → orange → yellow → black;
- the wordmark "ORDER MY PRINT" in a geometric sans, navy;
- the tagline "PREMIUM & PROFESSIONAL PRINTING".

**Brand status:** working brand pending D-01. The logo is used **as supplied, never redrawn or recoloured**. A vector master is requested. Until then, Figma uses the supplied raster on light backgrounds only.

**Colours sampled from the supplied file** (approximate, JPEG):

| Role | Sample |
|---|---|
| Cyan | `#20A8D8` |
| Violet | `#983888` |
| Magenta | `#D01478` |
| Orange | `#F0A830` |
| Yellow | `#F8E008` |
| Key/black | `#191B10` |
| Navy (wordmark) | `#102848` |
| Paper | `#ECECEA` |

**Brand idea:** *"Press-ready confidence."* The CMYK process (cyan, magenta, yellow, key) is the visual language of professional print. We use it as a precise accent system, the way a printer uses registration marks and colour bars. It is not a rainbow decoration.

**Personality:** precise, trustworthy, quietly premium, helpful. Tone: plain-English specs, no jargon without an explanation.

## 2. Design principles

1. **Specs are content.** Every option explains itself (what it is, when to choose it), with visuals where possible.
2. **Price is never a surprise.** A live breakdown and tier table appear near every CTA.
3. **One primary action per screen.** Secondary paths (bulk quote, help) are visible but quieter.
4. **Show the process.** Order and artwork states are always visible and match the real state machine.
5. **Mobile-first configurator.** Sticky price-and-CTA bar; steps collapse to accordions.
6. **Accessible by default.** WCAG 2.2 AA: contrast, focus rings, 44 px targets, no colour-only status.

## 3. Visual directions (choose one, D-03)

| | **A. "Ink & Paper"** (recommended) | B. "Studio Bold" |
|---|---|---|
| Surfaces | Warm paper white (`#FAFAF7`) and white cards; navy text | Deep navy surfaces with light cards |
| Accent use | CMYK as thin colour-bar rules, step indicators, focus and highlight states; magenta for the primary CTA *(contrast to be verified)* or navy CTA with a magenta hover | Full CMYK gradient on hero and CTA backgrounds |
| Type | Geometric sans for headings, matching the wordmark feel (e.g. Montserrat or Plus Jakarta Sans; licence-free Google Fonts), plus a highly legible UI sans (e.g. Inter) | Same |
| Imagery | Real product photography on neutral paper; macro shots of stock textures and finishes | Bold product renders on dark |
| Feel | Premium print studio; calm; spec-forward | Energetic, youth/agency |
| Risk | Can feel plain without good photography | Gradient-heavy UI tires the eye and makes dense admin screens hard to read |

**Accessibility note.** Cyan `#20A8D8` and yellow `#F8E008` fail contrast as text on white. They are decorative or large-element only. Navy `#102848` on white passes comfortably for text. Final ratios are verified in Phase 1 for every token pair.

## 4. Information architecture

```
Home
├─ Business Stationery ─ Visiting Cards · Letter Pads · Envelopes
├─ Marketing Print ───── Brochures · Stickers
├─ Custom Transfers ──── DTF Stickers
├─ Corporate Merchandise ─ Corporate T-Shirt Printing
├─ Bulk / Corporate quotes (request form, how it works)
├─ Search results
├─ Cart → Checkout → Payment result → Order confirmation
├─ Track order
├─ Account (dashboard, orders, order detail, quotations, quote detail, artwork, addresses & GST, company, profile)
└─ Help: FAQ · Contact · Shipping policy · Refund & cancellation · Privacy · Terms · Artwork guidelines
Admin (separate app): Overview · Catalogue · Pricing · Orders · Quotations · Artwork · Production · QC · Shipments · Customers & Companies · Payments & Refunds · Invoices · Coupons · Reports · Staff & Roles · Settings · Audit log
```

## 5. Figma file structure (as required by the brief)

| Page | Contents |
|---|---|
| `00 — Cover & Project Brief` | Cover, brief summary, status, decision log, how to review |
| `01 — Research & References` | Audit summary, adopt/adapt/avoid board, user flows overview (no copied reference assets; text and pattern notes only) |
| `02 — Foundations & Design Tokens` | Variables: colour (light; dark later), type scale, spacing, radii, elevation, grid, breakpoints, motion, iconography |
| `03 — Components` | Full component library with variants and states (§7) |
| `04 — Storefront Desktop` | All storefront screens at 1440 |
| `05 — Storefront Mobile` | All storefront screens at 390 |
| `05A — Storefront Tablet` | Key storefront screens at 834 (added at the Director's request, 2026-10-23) |
| `06 — Product Configuration` | Seven configurators, desktop + mobile, with all option and validation states |
| `07 — Cart & Checkout` | Cart states, checkout steps, payment success/failure/pending, confirmation |
| `08 — Bulk Quotations` | Request form, confirmation, quote detail, accept/decline/clarify, expired |
| `09 — Customer Account & Tracking` | Dashboard, orders, order detail and timeline, artwork revisions, tracking |
| `10 — Admin Dashboard` | Login + 2FA, overview |
| `11 — Admin Operations` | All admin modules (§6.2) |
| `12 — Prototypes & User Flows` | Seven prototype flows (§8) and flow diagrams |

## 6. Screen inventory (IDs are permanent)

### 6.1 Storefront (`SF-`)

| ID | Screen | Desktop | Mobile | Key states |
|---|---|---|---|---|
| SF-HOME-01 | Homepage | ✓ | ✓ | — |
| SF-CAT-01 | Category page (×4 via one template; one shown in detail) | ✓ | ✓ | empty category |
| SF-PLP-01 | All products / listing with filters | ✓ | ✓ (filter drawer) | no results, loading |
| SF-SRCH-01 | Search results + predictive search dropdown | ✓ | ✓ | no results |
| SF-PDP-01…07 | Product detail + configurator (one per product family) | ✓ | ✓ | invalid combo, over-threshold → quote CTA, loading price |
| SF-ART-01 | Artwork upload component in PDP and order (uploading, scanning, passed, warning, failed, infected, too large, wrong type, CDR accepted for manual review) | ✓ | ✓ | all |
| SF-PRICE-01 | Price breakdown + tier table (expanded/collapsed) | ✓ | ✓ (sticky bar + sheet) | — |
| SF-CART-01 | Cart | ✓ | ✓ | empty, price-changed notice, artwork pending, coupon invalid |
| SF-CHK-01…04 | Checkout: contact → address & GST → delivery → review | ✓ | ✓ | validation errors |
| SF-PAY-01…03 | Payment result: success, failure, pending/confirming | ✓ | ✓ | — |
| SF-CONF-01 | Order confirmation | ✓ | ✓ | with/without pending artwork |
| SF-TRK-01 | Track order (public lookup) | ✓ | ✓ | not found |
| SF-ACC-01 | Account dashboard | ✓ | ✓ | new user empty state |
| SF-ACC-02 | Orders list | ✓ | ✓ | empty |
| SF-ACC-03 | Order detail + timeline + shipments + invoices | ✓ | ✓ | partial dispatch |
| SF-ACC-04 | Artwork revision request → re-upload | ✓ | ✓ | — |
| SF-ACC-05 | Quotations list | ✓ | ✓ | empty |
| SF-ACC-06 | Quotation detail (accept / decline / clarify thread) | ✓ | ✓ | expired, accepted |
| SF-ACC-07 | Addresses & GST details, company, profile | ✓ | ✓ | — |
| SF-AUTH-01…04 | Mobile number → OTP verify → OTP error states → first-time details (no passwords; X-09) | ✓ | ✓ | wrong / expired / locked / SMS failed |
| SF-QUO-01 | Bulk quote request (multi-item) | ✓ | ✓ | validation |
| SF-QUO-02 | Quote request confirmation | ✓ | ✓ | — |
| SF-HELP-01 | FAQ | ✓ | ✓ | — |
| SF-HELP-02 | Contact | ✓ | ✓ | sent |
| SF-HELP-03 | Policy page template (shipping, refund & cancellation, privacy, terms) | ✓ | ✓ | — |
| SF-HELP-04 | Artwork guidelines | ✓ | ✓ | — |
| SF-ERR-01 | 404 / 500 | ✓ | ✓ | — |

### 6.1a Storefront overlays (added in the 2026-11-04 UX audit)
SF-CONSENT-01/02 (cookie banner, preferences) · SF-TRK-02 (tracking OTP) · SF-PDP-07b (size guide) · SF-PDP-01c-M (price breakdown sheet) · SF-CART-03 (remove item) · SF-CHK-02b (address modal) · SF-QUO-01b (quote OTP) · SF-ACC-06d (decline quote) · SF-ACC-03b (order help) · SF-ACC-04b (revision received) · SF-ACC-04c (cancel item) · SF-ACC-07b/c/d (add address, invite member, change number). The `-M` suffix marks the mobile sheet version. Full list: `ux-audit-2026-11-04.md` §3.

### 6.2 Admin (`AD-`, desktop 1440; responsive check at 1024)

| ID | Screen |
|---|---|
| AD-AUTH-01 | Login + TOTP 2FA + step-up modal |
| AD-DASH-01 | Overview dashboard |
| AD-CAT-01 / 02 | Category list/editor · Product list |
| AD-CAT-03 | Product editor (details, media, SEO, artwork requirements, turnaround, tax profile) |
| AD-CAT-04 | Option groups, options and constraints editor (variant management) |
| AD-PRC-01 | Pricing versions list (draft/published/archived) + diff |
| AD-PRC-02 | Pricing editor: matrix/tiers grid + CSV import, components, minimums, effective dates |
| AD-PRC-03 | Price preview / test bench |
| AD-ORD-01 / 02 | Orders list · Order detail (items, snapshots, payments, artwork, jobs, shipments, invoices, timeline, hold/cancel) |
| AD-QUO-01 | Quotation pipeline board |
| AD-QUO-02 | Quotation editor (lines, engine suggestion, override + reason, revisions, send, convert) |
| AD-ART-01 / 02 | Artwork review queue · Review viewer (approve / revision / reject) |
| AD-PRD-01 / 02 | Production board · Job card (print view) |
| AD-QC-01 | QC checklist |
| AD-SHP-01 / 02 | Shipments list · Create/update shipment (partial) |
| AD-CUS-01 / 02 | Customers · Company account (members, GSTIN, credit terms) |
| AD-PAY-01 / 02 | Payments list/detail (events, reconciliation) · Refund request/approval |
| AD-INV-01 | Invoices & credit notes |
| AD-CPN-01 | Coupons & promotions |
| AD-RPT-01 | Reports |
| AD-STF-01 | Staff, roles and permissions |
| AD-SET-01 | Settings (business details, policies, notification templates, limits) |
| AD-AUD-01 | Audit log |

Admin overlays (2026-11-04): AD-ORD-02b/c (cancel, hold) · AD-PRC-02b (publish version) · AD-QC-01b (QC fail) · AD-PAY-02b (reject refund) · AD-STF-01b (invite staff) · AD-CPN-01b (new coupon drawer) · AD-CAT-04b (add rule) · AD-SHP-02b (mark dispatched) · AD-ART-02b (approve → job) · AD-QUO-02b (send revision).

## 7. Component inventory (`03 — Components`)

| Group | Components |
|---|---|
| Foundations | Colour, type and spacing variables; grid; elevation; radius; icon set (open-licence, e.g. Lucide) |
| Actions | Button (primary/secondary/tertiary/destructive/link × sm/md/lg × default/hover/focus/pressed/disabled/loading), icon button, link |
| Inputs | Text field, textarea, select, combobox, checkbox, radio, switch, **quantity stepper**, **dimension input (W×H + unit)**, **size-breakdown grid**, PIN-code field, GSTIN field, date picker (target delivery), search |
| Product | Product card, category tile, **option pill/card group** (text, swatch, image), option info tooltip, **price breakdown**, **tier table**, **sticky price bar (mobile)**, turnaround chip, DEMO badge |
| Artwork | **Dropzone** + file row with all states, artwork version list, review decision panel |
| Status | Badge (order, item, artwork, quote, payment, shipment statuses), timeline/stepper, progress |
| Feedback | Alert (info/success/warning/error), toast, inline validation, confirmation dialog, empty state, skeleton loaders, error page |
| Overlays | Modal, drawer (filters, mobile nav, admin side panels), popover, sheet |
| Data | Table (sortable, selectable, row actions), pagination, filter bar, KPI card, kanban column/card |
| Navigation | Header (desktop/mobile), mega-menu, breadcrumbs, tabs, footer, account sidebar, admin sidebar + top bar |

All components use Auto Layout and variables, with names in the form `Category/Component/Variant`. Every interactive component includes **focus** and **error** states.

## 8. Prototype flows (`12 — Prototypes & User Flows`)

There are 13 flows, P0–P12. The list and paths are in `ux-audit-2026-11-04.md` §4. They cover:
- the seven journeys required by the brief: shop, checkout, quote, account, admin quote, artwork → production, dispatch;
- consent;
- sign-in;
- public tracking;
- admin pricing, finance and staff dialogs;
- a full mobile purchase.

## 9. Responsive rules

| Breakpoint | Width | Grid |
|---|---|---|
| Mobile | 390 (min 360) | 4 columns, 16 px margins |
| Tablet | 834 | 8 columns, 24 px margins |
| Desktop | 1440 (content max 1280) | 12 columns, 32 px margins |

- **PDP:**
  - desktop: two columns (gallery | configurator with sticky summary);
  - mobile: single column with a sticky bottom price + CTA bar and a breakdown sheet.
- **Checkout:** desktop has a summary sidebar; mobile has a collapsible summary on top.
- **Admin:** a desktop-first data-dense layout that remains usable at 1024.

## 10. Content and data rules for Figma

- Demo prices use the **DEMO** badge and round fictitious figures. No real rates, MOQs or delivery promises.
- No copy, imagery or layout reproduced from the reference site.
- Product imagery uses neutral placeholders (marked "Photo placeholder") until real photography exists.
- Trust claims appear as "[Substantiated claim from business]" placeholders.

## 11. Phase 1 exit (handoff report contents)

- Figma link.
- Pages and screens created vs this inventory.
- Design-system summary.
- Desktop/mobile coverage.
- Prototype entry points.
- Known gaps.
- Decisions needing approval.
- Proposed implementation sequence.

Phase 1 then **stops for design approval**.
