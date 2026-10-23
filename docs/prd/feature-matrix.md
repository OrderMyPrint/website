# Feature Matrix

| | |
|---|---|
| Status | **READY FOR REVIEW** (Phase 0) |
| Date | 2026-10-23 |

**Phase** is the build phase from `../roadmap/phase-plan.md` (P3 = backend, P4 = storefront, P5 = admin, P6 = integrations). **Rel** is R1 (MVP) or L (later). Acceptance criteria reference story IDs in `user-stories-and-acceptance-criteria.md`.

| ID | Requirement | User / business value | Proposed implementation | Dependencies | Acceptance | Phase | Rel |
|---|---|---|---|---|---|---|---|
| F-01 | Admin-managed categories and seven product families | Catalogue changes without deploys | `categories` and `products` tables; admin CRUD; storefront reads via catalogue API with ISR | Data model | CAT-01 | P3, P4, P5 | R1 |
| F-02 | Product option groups, values and constraints | Product-specific configurators; invalid orders prevented | Typed option schema + constraint rules in JSONB, validated server-side | F-01 | CFG-01 | P3, P5 | R1 |
| F-03 | Configurator UI generated from option schema | One component serves seven products | React configurator rendering option types; step layout from Figma | F-02, design | CFG-01, CFG-02 | P4 | R1 |
| F-04 | Pricing engine (matrix + formula components) | Transparent, correct, configurable prices | Pure TypeScript engine module in API; `decimal.js`; versioned JSON pricing documents | F-02 | PRC-01, PRC-02 | P3 | R1 |
| F-05 | Pricing versions with effective dates and preview | Safe price changes | `pricing_versions` (draft/published/archived), publish permission, preview endpoint | F-04 | PRC-03, PRC-04 | P3, P5 | R1 |
| F-06 | Live price preview and tier table on PDP | Confidence; fewer quote requests for simple jobs | Debounced `POST /pricing/preview`; tier table from engine | F-04 | PRC-01 | P4 | R1 |
| F-07 | Order snapshots (spec, price, tax, shipping, discounts) | Future price changes never alter orders | Immutable JSONB snapshot + normalised totals on `order_items` | F-04 | PRC-03 | P3 | R1 |
| F-08 | Re-price cart at checkout with confirmation | Prevents stale prices | Engine re-run; diff shown; explicit confirm | F-04 | PRC-05 | P3, P4 | R1 |
| F-09 | Artwork upload (PDF, PNG, JPEG, SVG) to private storage | Order without email back-and-forth | Pre-signed upload → object storage; confirm → job | Object storage (D-05) | ART-01 | P3, P4 | R1 |
| F-10 | Malware scan + content validation + SVG sanitisation | Protects staff and systems | ClamAV daemon (requires VPS, D-02) or a scanning service; MIME sniffing; `sharp` and `pdf-lib`/`pdfjs` metadata; DOMPurify for SVG | Hosting (D-02) | ART-02 | P3 | R1 |
| F-11 | Artwork versions + review (approve, revise, reject) | Fewer misprints; audit trail | `artwork_files` / `artwork_versions` / review events; admin viewer | F-09 | ART-03, ART-04 | P3, P5 | R1 |
| F-12 | Cart (guest + user, merge) | Low-friction buying | Server-side carts keyed by user or opaque token | F-04 | CRT-01 | P3, P4 | R1 |
| F-13 | Checkout with GSTIN capture and idempotent order creation | B2B invoices; no duplicate orders | Idempotency-Key header; transactional create | F-12 | CHK-01, CHK-02 | P3, P4 | R1 |
| F-14 | Payment gateway (one provider) with verified webhooks + reconciliation | Get paid safely | Provider adapter interface; webhook signature verification; `payment_events` unique on provider event ID; reconciliation job | Gateway (D-06) | PAY-01, PAY-02, PAY-03 | P6 | R1 |
| F-15 | Refunds with approval and step-up | Financial control | Refund request → approve → provider refund; audit | F-14 | PAY-04 | P5, P6 | R1 |
| F-16 | Bulk quotation request (multi-item, artwork) | Win corporate business | `quotations` + `quotation_items`; public form; guest allowed | F-02, F-09 | QUO-01 | P3, P4 | R1 |
| F-17 | Quotation editor, revisions, send, accept/decline/clarify | Sales workflow | `quotation_revisions` with snapshot; message thread; quote PDF | F-16, F-04 | QUO-02, QUO-03, QUO-04 | P3, P4, P5 | R1 |
| F-18 | Quote → order conversion | No re-keying | Transaction creating an order from the accepted revision snapshot | F-17 | QUO-03 | P3 | R1 |
| F-19 | Production gate (payment/credit + artwork) | No production before conditions are met | State-machine guard in API; DB check | F-11, F-14 | ORD-01 | P3 | R1 |
| F-20 | Production jobs, job cards, QC checklists | Shop-floor clarity | `production_jobs`, `quality_checks`, templates per product; printable job card | F-19 | PRD-01, PRD-02 | P3, P5 | R1 |
| F-21 | Shipments (manual carrier/AWB), partial fulfilment | Tracking without integration cost | `shipments`, `shipment_items`, `shipment_events` | F-20 | SHP-01 | P3, P5 | R1 |
| F-22 | Customer order tracking and timeline | Fewer "where is my order" calls | Account pages + public tracking by order number + email verification [P] | F-21 | ACC-02 | P4 | R1 |
| F-23 | Customer accounts and company accounts | Reorders, corporate buying | `users`, `companies`, membership roles | — | ACC-01, ACC-03 | P3, P4 | R1 |
| F-24 | Corporate credit terms (manual flag) | Corporate buyers pay on terms | `companies.credit_terms_days`, approved by `credit.approve`; satisfies the production gate | F-23 | ORD-01 | P3, P5 | R1 |
| F-25 | GST invoices and credit notes (PDF) | Legal compliance; B2B input credit | Invoice series; `@react-pdf/renderer` or `pdfkit` (Node-only) | Tax data from CA (D-08) | INV-01 | P3, P5 | R1 |
| F-26 | Email notifications | Keeps customers informed | Template store + queue + provider adapter | Email provider (D-07) | — | P3, P6 | R1 |
| F-27 | Coupons and promotions (basic) | Marketing | `coupons` with scope and limits, server-validated | F-12 | — | P3, P5 | R1 |
| F-28 | Staff roles and permissions; 2FA | Least privilege | Permission keys; TOTP; step-up | — | ADM-01, SEC-01 | P3, P5 | R1 |
| F-29 | Audit log | Accountability | Append-only `audit_logs`; no update/delete grants | — | ADM-02 | P3, P5 | R1 |
| F-30 | Reports (basic) + CSV export | Business visibility | SQL views; admin pages | Data | — | P5 | R1 |
| F-31 | Content pages (FAQ, contact, policies) | Trust and legal compliance | Admin-managed rich text (no separate CMS in R1 [P]) | Policies from the business (D-09) | — | P4, P5 | R1 |
| F-32 | SEO: SSR, structured data, sitemap | Organic acquisition | Next.js metadata API, JSON-LD | F-01 | — | P4 | R1 |
| F-33 | Accessibility WCAG 2.2 AA | Inclusive; legal risk reduction | Design tokens with contrast; keyboard flows; axe in CI | Design | — | P1, P4, P5, P7 | R1 |
| F-34 | Observability, backups, restore drill | Operability | Structured logs; error tracker; uptime checks; daily `pg_dump` + offsite copy; restore test | Hosting (D-02) | — | P2, P8 | R1 |
| F-35 | AI/EPS ingestion | Designers' native files | Ghostscript-based conversion worker (non-Node runtime; needs approval) | VPS | ART-05 | — | L |
| F-36 | Advanced preflight | Fewer misprints | Bleed, font and ICC checks | F-35 | ART-05 | — | L |
| F-37 | Shipping aggregator integration | Automation | Provider adapter | D-06b | SHP-02 | P6+ | L |
| F-38 | WhatsApp/SMS notifications | Higher engagement | Provider adapter, opt-in | Provider + consent | — | — | L |
| F-39 | Online design editor | Customers without designers | Separate initiative | — | — | — | L |
| F-40 | Reorder and saved artwork library | Retention | Clone order items with approved artwork | F-11 | — | — | L |
| F-41 | Additional languages | Reach | i18n keys from day one; translations later | — | — | — | L |
