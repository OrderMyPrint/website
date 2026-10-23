# Data Model (Phase 0 proposal)

| | |
|---|---|
| Status | **PROPOSED** |
| Date | 2026-10-23 |
| Target DB | PostgreSQL 16/17 (see D-02) |

Conventions:

| Area | Rule |
|---|---|
| Keys | `id UUID` (v7, time-ordered) |
| Timestamps | `created_at`, `updated_at` in `timestamptz` (UTC) |
| Money | `NUMERIC(14,2)` + `currency CHAR(3) DEFAULT 'INR'` |
| Status columns | Postgres enums or `TEXT` + `CHECK` |
| Snapshots | JSONB marked *immutable* and never updated after insert |
| Deletes | Soft delete (`archived_at`) only for catalogue and users; transactional records are never deleted |

---

## 1. Entity overview

```
users ─┬─< company_members >─ companies ─< addresses
       └─< addresses
categories ─< products ─< option_groups ─< options
                       ├─< product_variants (optional presets / SKUs)
                       └─< pricing_versions ─< price_tiers
carts ─< cart_items ─> products, pricing_versions
artwork_files ─< artwork_versions ─< artwork_reviews
quotations ─< quotation_revisions ─< quotation_items
           └─< quotation_messages
orders ─< order_items ─< order_item_artwork >─ artwork_versions
       ├─< payments ─< payment_events
       │           └─< refunds
       ├─< shipments ─< shipment_items >─ order_items
       │            └─< shipment_events
       └─< invoices (+ credit notes)
order_items ─< production_jobs ─< quality_checks
coupons, notifications, audit_logs, idempotency_keys, outbox
staff_roles ─< role_permissions ; users ─< user_roles
```

## 2. Tables (key columns)

### Identity & accounts
| Table | Key columns |
|---|---|
| `users` | id, email (unique, citext), phone, name, password_hash, kind (`customer`/`staff`), totp_secret_enc, email_verified_at, archived_at |
| `companies` | id, legal_name, gstin (nullable, unique), billing_address_id, credit_terms_days (nullable), credit_approved_by, credit_approved_at |
| `company_members` | company_id, user_id, role (`admin`/`member`) — PK (company_id, user_id) |
| `addresses` | id, owner_user_id or company_id, line1, line2, city, state_code, pin_code, phone, is_default_shipping, is_default_billing |
| `staff_roles`, `role_permissions`, `user_roles` | role name; permission key; assignment |

### Catalogue
| Table | Key columns |
|---|---|
| `categories` | id, slug (unique), name, description, sort, is_visible, seo jsonb |
| `products` | id, category_id, slug (unique), name, summary, description, media jsonb, is_visible, quantity_unit, min_qty, artwork_requirements jsonb, turnaround jsonb, tax_profile_id, upload_timing (`before_cart`/`after_checkout`/`either`) |
| `option_groups` | id, product_id, key, label, type (`select`,`multiselect`,`quantity`,`dimension`,`size_breakdown`,`integer`,`boolean`,`text`), step_order, required, config jsonb (min/max/step/units) |
| `options` | id, option_group_id, key, label, description, media, sort, is_available, metadata jsonb |
| `product_variants` | id, product_id, sku, preset_config jsonb (for curated presets, e.g. "Standard 350 GSM matte") |
| `product_constraints` | id, product_id, rule jsonb (structured: `requires`, `excludes`, `range`), message |
| `tax_profiles` | id, name, hsn_sac, gst_rate NUMERIC(5,2), effective_from — **values supplied by the business** |

### Pricing
| Table | Key columns |
|---|---|
| `pricing_versions` | id, product_id, version_no, status (`draft`/`published`/`archived`), effective_from, effective_to, document jsonb (components), created_by, published_by, published_at — partial unique index: one published version active per product per instant |
| `price_tiers` | id, pricing_version_id, dimension_key (e.g. size×material), min_qty, max_qty, unit_price NUMERIC(14,4) or total_price — for matrix models (large tables) |
| `shipping_rates` | id, zone/pin range, weight slab, price, effective dates |

### Cart
| Table | Key columns |
|---|---|
| `carts` | id, user_id (nullable), guest_token_hash (nullable), status (`active`/`converted`/`abandoned`), expires_at |
| `cart_items` | id, cart_id, product_id, config jsonb, quantity, pricing_version_id, price_snapshot jsonb, unit_price, line_total, artwork_plan jsonb |

### Artwork
| Table | Key columns |
|---|---|
| `artwork_files` | id, owner_user_id/company_id, purpose (cart/quote/order), label (e.g. "Front"), current_version_id |
| `artwork_versions` | id, artwork_file_id, version_no, storage_key_quarantine, storage_key_clean, original_name, mime_detected, size_bytes, sha256, status (`uploaded`,`scanning`,`quarantined`,`failed`,`validated`,`in_review`,`approved`,`revision_requested`,`rejected`), checks jsonb (dimensions, dpi, pages, warnings), thumbnail_key |
| `artwork_reviews` | id, artwork_version_id, reviewer_id, decision, reason_codes text[], message |
| `order_item_artwork` | order_item_id, slot (e.g. `front`, `back`, `location:left_chest`), artwork_file_id |

### Quotations
| Table | Key columns |
|---|---|
| `quotations` | id, reference (unique, human), customer_user_id (nullable), company_id, contact jsonb, status, assigned_to, current_revision_id, converted_order_id |
| `quotation_items` (request lines) | id, quotation_id, product_id (nullable for custom), requested_spec jsonb, quantity, target_date, notes |
| `quotation_revisions` | id, quotation_id, revision_no, lines jsonb (spec + price breakdown + overrides with reasons), subtotal, tax, shipping, total, valid_until, sent_at, status |
| `quotation_messages` | id, quotation_id, author_id, body, attachments |

### Orders
| Table | Key columns |
|---|---|
| `orders` | id, order_number (unique, sequential per series), user_id, company_id, source (`direct`/`quotation`), quotation_revision_id, status, payment_condition (`paid`/`credit`/`none`), billing_address jsonb, shipping_address jsonb, gstin, place_of_supply_state, subtotal, discount_total, shipping_total, tax_total, grand_total, currency, placed_at |
| `order_items` | id, order_id, product_id, spec_snapshot jsonb, price_snapshot jsonb, pricing_version_id, quantity, size_breakdown jsonb, unit_price, line_subtotal, tax_amount, line_total, hsn_sac, gst_rate, status |
| `order_status_history` | id, order_id/order_item_id, from_status, to_status, actor_id, reason, at |

### Payments
| Table | Key columns |
|---|---|
| `payments` | id, order_id, provider, provider_order_id, provider_payment_id, amount, status, method (as reported), initiated_at, captured_at |
| `payment_events` | id, payment_id, provider, provider_event_id (**unique with provider**), type, payload jsonb (sensitive fields stripped), signature_verified bool, received_at, processed_at |
| `refunds` | id, payment_id, amount, reason, status, requested_by, approved_by, provider_refund_id |

### Production & shipping
| Table | Key columns |
|---|---|
| `production_jobs` | id, order_item_id, job_number, status, due_date, assigned_to, approved_artwork_version_ids uuid[], notes |
| `quality_checks` | id, production_job_id, checklist jsonb (template items + results), result (`pass`/`fail`), checked_by, at |
| `shipments` | id, order_id, carrier, awb, tracking_url, status, dispatched_at, delivered_at |
| `shipment_items` | shipment_id, order_item_id, quantity |
| `shipment_events` | id, shipment_id, status, description, at, source (`manual`/`provider`) |

### Billing, promotions, platform
| Table | Key columns |
|---|---|
| `invoices` | id, order_id, type (`invoice`/`credit_note`), number (unique per series), issued_at, seller jsonb, buyer jsonb, lines jsonb, cgst, sgst, igst, total, pdf_key |
| `coupons` | id, code (unique, citext), type, value, scope jsonb, min_subtotal, starts_at, ends_at, max_uses, per_customer_limit |
| `coupon_redemptions` | coupon_id, order_id, user_id |
| `notifications` | id, template_key, recipient, channel, payload, status, attempts, sent_at |
| `outbox` | id, topic, payload, created_at, processed_at |
| `idempotency_keys` | key, scope, request_hash, response jsonb, expires_at |
| `audit_logs` | id, actor_id, actor_kind, action, target_type, target_id, before jsonb, after jsonb, ip, user_agent, at — **INSERT-only grant for the app role** |

## 3. Integrity rules
- `order_items.spec_snapshot` / `price_snapshot` cannot be updated (trigger raises).
- Production gate enforced in a service transaction with `SELECT … FOR UPDATE` on the order item. A DB check function is optional.
- `payment_events (provider, provider_event_id)` is unique, which makes webhook handling idempotent.
- `sum(shipment_items.quantity) ≤ order_items.quantity` is checked in the service.
- Invoice numbers are allocated from a locked sequence row per series, so there are no gaps from rolled-back transactions [P]. Gap rules must be confirmed with the CA [Q].
