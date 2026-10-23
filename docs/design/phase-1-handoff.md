# Phase 1 — Figma Design Handoff Report

| | |
|---|---|
| Status | **READY FOR REVIEW** — awaiting G1 design approval |
| Date | 2026-10-23 |
| Figma file | [Order My Print — Platform Design (Phase 1)](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy) (team: Digitech Miner's team) |
| Direction | A "Ink & Paper"; palette derived from the supplied OMP logo |

## 1. Pages and coverage

| Page | Contents | Frames |
|---|---|---|
| [00 — Cover & Project Brief](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=0-1) | Cover, brief, page index, review guide, decision log | 2 boards |
| [01 — Research & References](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-2) | theboxandlabelco.com, Printify, Printful patterns; adopt/adapt/avoid; limitations | 1 board |
| [02 — Foundations & Design Tokens](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-3) | Logo → palette, primitives, semantic tokens, contrast checks, type, spacing, radius, elevation, grid | 8 sections |
| [03 — Components](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-4) | 61 components / component sets + 61 icons; docs per family | 12 doc boards |
| [04 — Storefront Desktop](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-5) | Home, category, all products + filters, search, FAQ, contact, policy, artwork guidelines, track order, sign-in (OTP × 4), 404 | 14 |
| [05 — Storefront Mobile](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-6) | Home, menu drawer, category, filters sheet, search, FAQ, contact, track, sign-in (OTP × 2), artwork guidelines, policy, 404, preloader | 14 |
| [05A — Storefront Tablet](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=8-2) | Home, category, Visiting Cards configurator, cart, checkout (OTP), account | 6 |
| [06 — Product Configuration](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-7) | 7 configurators desktop + 7 mobile with guided artwork upload; artwork-states board; configurator-states board | 16 |
| [07 — Cart & Checkout](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-8) | Cart, empty cart, checkout (OTP → address & GST → delivery → review), payment confirming / failed, confirmation; mobile set | 15 |
| [08 — Bulk Quotations](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-9) | Request (multi-item), received, list, detail with thread, accept dialog, expired; mobile request + detail | 8 |
| [09 — Customer Account & Tracking](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-10) | Dashboard, orders, order detail (partial dispatch), artwork revision, profile/addresses/GST/company; mobile set | 8 |
| [10 — Admin Dashboard](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-11) | Staff sign-in + TOTP, step-up modal, overview (with mini order map), **Order map & flow** | 4 |
| [11 — Admin Operations](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-12) | Products, product editor, options & constraints, artwork slots & print areas, pricing versions/editor/test bench, orders, order detail, quote pipeline/editor, artwork queue/review, production board, job card, QC, shipments, customers, company/credit, payments, refunds, invoices, coupons, reports, staff & roles, settings, audit log | 28 |
| [12 — Prototypes & User Flows](https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy?node-id=4-13) | 8 clickable flows (31 frames) with flow starting points | 31 |

Totals: **81 storefront screens**, **32 admin screens**, **8 prototypes**.

## 2. Design system summary
- **Variables (97):** Primitives (34, hidden), Color semantic (49 incl. logo-derived brand/* tokens), Spacing & Radius (14). Web code syntax `var(--omp-…)`.
- **Styles:** 17 text styles (Montserrat headings, Inter UI), 3 elevation styles, 2 gradient styles (Brand/Spectrum from the monogram).
- **Contrast:** all text pairs pass WCAG AA (calculated in Figma); logo cyan/yellow flagged decorative-only.
- **Key components:** Button (25 variants), Option Pill/Card, Swatch, Quantity Stepper, Dimension Input, Size Breakdown, Price Breakdown, Tier Table, Sticky Price Bar, Step Header, Dropzone, File Row (8 states incl. CDR manual review), **Print Area Guide (12 variants)**, Phone Field, OTP Input, Timeline Step, Alert, Toast, Dialog, Headers (desktop/tablet/mobile), Mega Menu, Footers, Account Nav, Admin Sidebar/Topbar, Table Cell, KPI, Kanban, Lottie Slot, Preloader.

## 3. Changes requested during Phase 1 (all applied)
| Request | Where |
|---|---|
| Colour palette must follow the logo | 02 Foundations (logo → token mapping); brand/* tokens; spectrum gradients |
| CDR uploads in Release 1 | Dropzone formats, File Row "CDR manual review", FAQ, admin review checkbox |
| Tablet designs | Page 05A + tablet header |
| Printify / Printful as design references | 01 Research; hero value points, price estimator, numbered steps, category carousel |
| Lottie for animation / preloading | Lottie Slot + Preloader components; slots in home, uploads, cart, confirmation, 404 |
| Customer login = mobile + OTP only | Phone Field, OTP Input, AUTH-01…04 (desktop/mobile), checkout step 1, tracking, profile, admin settings |
| Admin map view of order flow | AD-MAP-01 Order map & flow; mini map on overview; “Order map” in admin sidebar; Map Marker component |
| Guided artwork upload with printable area per product | Print Area Guide set; guided step on all configurators; admin "Artwork slots & print areas" |

## 4. Prototype entry points (page 12 → Present)
P1 Shop → configure → cart · P2 Checkout (OTP → pay → success/failure) · P3 Bulk quote → accept · P4 Dashboard → tracking · P5 Admin quote → order · P6 Admin artwork → production · P7 Admin dispatch → tracking · P8 Mobile shop → checkout → confirmed.

## 5. Known gaps / limitations
- Logo is a raster crop of the supplied JPEG; **vector master needed** for production quality.
- All prices, specs, MOQs, delivery options and tax amounts are **DEMO**; policies are templates (D-08, D-09).
- Photography is placeholder; Lottie files are slots only (D-26).
- Dark mode not designed (light only).
- Prototypes are click-through (no conditional logic); mobile sticky price bar is drawn in flow (fixed in build).
- Not every desktop screen has a tablet twin; tablet covers the six highest-traffic screens. The remaining screens follow the responsive rules on page 02.
- Payment gateway UI shows a neutral hand-off (gateway not selected — D-06). SMS provider not selected (D-25).

## 6. Decisions needing your approval at G1
1. Approve the design as the basis for implementation (or list changes).
2. Confirm the mobile + OTP flow and that guest checkout is replaced (X-09).
3. Confirm the guided-upload behaviour and print-area examples (X-10); confirm CorelDRAW versions (D-24).

## 7. Proposed implementation sequence (after G1 + G2)
1. Design-system package from Figma variables (tokens → CSS variables, React components).
2. API: catalogue + artwork slots → pricing engine → OTP auth → artwork pipeline → cart/checkout → orders/quotes.
3. Storefront: shell → home/catalogue → configurators + guided upload → cart/checkout → account → quotes.
4. Admin: catalogue/pricing → artwork review → orders/production/shipping → finance → staff/settings.
