# API Specification (Phase 0 outline)

| | |
|---|---|
| Status | **PROPOSED** outline; the full OpenAPI 3.1 document is generated from the NestJS code in Phase 3 |
| Date | 2026-10-23 |
| Base | `/api/v1` |

Conventions:

| Area | Rule |
|---|---|
| Format | JSON. Money is a string decimal, e.g. `"1499.00"` |
| Auth | Session cookie (httpOnly) |
| CSRF | Double-submit token on state-changing requests |
| Errors | RFC 9457 `application/problem+json` with a machine `code` (e.g. `CONFIG_INVALID`, `PRICE_CHANGED`, `PRODUCTION_GATE_NOT_MET`) |
| Pagination | Cursor (`?cursor=&limit=`) |
| Idempotency | `Idempotency-Key` required where marked **[I]** |
| Authorisation | `own` = owner or company member; `perm:x` = staff permission |

---

## Public / customer

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/catalogue/categories` | public | Category tree |
| GET | `/catalogue/products?category=&q=&facets=` | public | Listing, search and facets |
| GET | `/catalogue/products/{slug}` | public | Product with option schema, constraints hints, artwork requirements |
| POST | `/pricing/preview` | public (rate-limited) | `{productId, config}` → `{valid, errors[], breakdown, tiers[], turnaround}` |
| POST | `/artwork/uploads` | public (cart/quote token) or own | Create upload slot → pre-signed URL + limits |
| POST | `/artwork/uploads/{id}/complete` | same | Start scan and validation |
| GET | `/artwork/files/{id}` | own | Versions, statuses, checks |
| GET | `/artwork/versions/{id}/download` | own | Short-lived signed URL (clean objects only) |
| GET/POST/PATCH/DELETE | `/cart`, `/cart/items`, `/cart/items/{id}` | guest token or own | Cart operations; server re-prices on every write |
| POST | `/cart/coupon` | guest/own | Apply coupon |
| POST | `/checkout/quote` | guest/own | Final price, tax, shipping; returns a `priceToken` that binds the confirmed totals |
| POST | `/checkout/orders` **[I]** | guest/own | Place order with `priceToken` → order (`awaiting_payment`) |
| POST | `/orders/{id}/payments` **[I]** | own | Initiate payment with the provider → client handoff payload |
| GET | `/orders/{id}/payment-status` | own | Polling after gateway return (server truth) |
| GET | `/me/orders`, `/me/orders/{id}` | own | Order list and detail with timeline |
| GET | `/me/invoices/{id}/download` | own | Signed URL |
| GET | `/track/{orderNumber}?email=` | public + verification [P] | Limited tracking view |
| POST | `/quotations` | public/own | Create request (multi-item) |
| GET | `/me/quotations`, `/me/quotations/{id}` | own | List and detail |
| POST | `/me/quotations/{id}/accept` **[I]** | own | Accept current revision → creates order |
| POST | `/me/quotations/{id}/decline` | own | With reason |
| POST | `/me/quotations/{id}/messages` | own | Clarification thread |
| POST | `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/password/*`, `/auth/verify-email` | — | Identity |
| GET/PATCH | `/me`, `/me/addresses`, `/me/company` | own | Profile |

## Webhooks

| Method | Path | Notes |
|---|---|---|
| POST | `/webhooks/payments/{provider}` | Raw body; signature verified before parsing; stored in `payment_events`; idempotent on provider event ID; 2xx returned only after a durable write |

## Admin (`/admin/*`, staff session + 2FA)

| Method | Path | Permission |
|---|---|---|
| CRUD | `/admin/categories`, `/admin/products`, `/admin/products/{id}/option-groups`, `/admin/products/{id}/constraints` | `catalogue.write` |
| CRUD | `/admin/products/{id}/pricing-versions` | `pricing.write` |
| POST | `/admin/pricing-versions/{id}/publish` | `pricing.publish` (audited) |
| POST | `/admin/pricing-versions/{id}/preview` | `pricing.read` |
| POST | `/admin/pricing-versions/{id}/import-csv` | `pricing.write` |
| GET/PATCH | `/admin/orders`, `/admin/orders/{id}` | `orders.read` / `orders.write` |
| POST | `/admin/orders/{id}/hold`, `/release`, `/cancel` | `orders.write` / `orders.cancel` (audited) |
| GET | `/admin/artwork/queue` | `artwork.read` |
| POST | `/admin/artwork/versions/{id}/review` | `artwork.review` |
| GET/PATCH | `/admin/quotations`, `/admin/quotations/{id}` | `quotes.read` / `quotes.write` |
| POST | `/admin/quotations/{id}/revisions` | `quotes.write` (+ `quotes.override_price` for overrides; audited) |
| POST | `/admin/quotations/{id}/send` | `quotes.send` |
| GET/POST/PATCH | `/admin/production-jobs`, `/admin/production-jobs/{id}/status` | `production.write` (gate enforced) |
| POST | `/admin/production-jobs/{id}/qc` | `qc.write` |
| POST | `/admin/orders/{id}/shipments`; PATCH `/admin/shipments/{id}` | `shipments.write` |
| GET | `/admin/payments`, `/admin/payments/{id}` | `payments.read` |
| POST | `/admin/payments/{id}/refunds` **[I]** | `refunds.request` |
| POST | `/admin/refunds/{id}/approve` **[I]** | `refunds.approve` + step-up (audited) |
| POST | `/admin/orders/{id}/invoices` | `invoices.issue` |
| CRUD | `/admin/customers`, `/admin/companies`; POST `/admin/companies/{id}/credit` | `customers.write`; `credit.approve` (audited) |
| CRUD | `/admin/coupons` | `coupons.write` |
| GET | `/admin/reports/*` | `reports.read` |
| CRUD | `/admin/staff`, `/admin/roles` | `staff.manage` + step-up (audited) |
| GET/PATCH | `/admin/settings` | `settings.write` (audited) |
| GET | `/admin/audit-logs` | `audit.read` |

## Rate limits [P]

| Endpoint | Limit |
|---|---|
| `/pricing/preview` | 60/min per IP |
| `/auth/login` | 5/min per account + per IP, with exponential backoff |
| `/quotations` (public) | 5/hour per IP + CAPTCHA-free honeypot and time-to-submit check |
| Uploads | 30/hour per session |
