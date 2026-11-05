# Architecture (Phase 0 proposal)

| | |
|---|---|
| Status | **PROPOSED**, needs architecture approval (Phase 0/2 gate) |
| Date | 2026-10-23 |
| Related ADRs | `../decisions/ADR-0001` … `ADR-0006` |

---

## 1. Context

```
           Customers (web, mobile web)                 Staff
                     │                                   │
          ┌──────────▼──────────┐             ┌──────────▼──────────┐
          │  Storefront (Next.js)│             │  Admin (React SPA)  │
          │  SSR/ISR catalogue,  │             │  static bundle      │
          │  configurator, cart, │             │                     │
          │  checkout, account   │             │                     │
          └──────────┬──────────┘             └──────────┬──────────┘
                     │ HTTPS (REST, JSON; cookie session)  │
                     └────────────────┬───────────────────┘
                            ┌─────────▼─────────┐
                            │   API (NestJS)    │──── Payment gateway (D-06)
                            │  modules (§3)     │◀─── webhooks (verified)
                            └───┬─────┬─────┬───┘
                                │     │     │
                      ┌─────────▼┐ ┌──▼───┐ ┌▼──────────────┐
                      │PostgreSQL│ │Queue │ │Object storage │ private, signed URLs
                      │ (primary)│ │(pg-  │ │(S3-compatible)│
                      └──────────┘ │ boss)│ └───────────────┘
                                   └──┬───┘
                               ┌──────▼──────┐
                               │  Workers    │ artwork scan/inspect/thumbnail,
                               │  (Node)     │ email, reconciliation, PDFs
                               └──────┬──────┘
                                      │
                               ClamAV daemon (D-02) · Email provider (D-07)
```

## 2. Technology choices [P]

| Layer | Choice | Why | Alternatives considered |
|---|---|---|---|
| Language | TypeScript everywhere | One language; matches the Director's React + Node standard from Digitech Miner | — |
| Storefront | **Next.js (App Router)**, React | SSR/ISR for SEO on catalogue and PDP; streaming; image optimisation | Remix; Vite SPA (poor SEO) |
| Admin | **React + Vite SPA** (React Router, TanStack Query) | No SEO needed; static hosting; small attack surface; all authorisation in the API | Next.js (heavier, needs a Node runtime) |
| Design system | Separate versioned package `@ordermyprint/ui` (tokens + React components), published to GitHub Packages | Shared by storefront and admin without a monorepo | Copying components (drift) |
| API | **NestJS 11** on Node 22/24 LTS | Modular, DI, guards for permissions, OpenAPI generation | Fastify + custom (less structure) |
| ORM / migrations | **Prisma** (Decimal type supported) or Drizzle; final pick in Phase 2 ADR | Typed queries, migration history | TypeORM |
| Database | **PostgreSQL 16/17** | Transactions, `NUMERIC`, JSONB for snapshots, check constraints, row locking | MySQL 8 (forced if D-02 = Cloud Professional) |
| Queue | **pg-boss** (on PostgreSQL) | No Redis needed for R1; transactional enqueue | BullMQ + Redis/Valkey (add later if throughput demands it) |
| Object storage | S3-compatible private bucket (D-05) | Pre-signed upload/download; lifecycle rules | VPS local disk (backup risk) |
| Malware scan | ClamAV (`clamd`) on the VPS | Free; no file leaves our infrastructure | Commercial scanning API (per-file cost) |
| File inspection | `sharp` (raster), `pdf-lib` / `pdfjs-dist` (PDF), DOMPurify + jsdom (SVG) | Node-native | Ghostscript (non-Node; later for AI/EPS); LibreOffice/Inkscape (non-Node; later for CDR previews) |
| PDFs (invoice, quote, job card) | `@react-pdf/renderer` | Node-only, templated in React | Headless Chrome / Gotenberg (heavy) |
| Auth | Session cookies (httpOnly, Secure, SameSite=Lax), Argon2id, TOTP for staff; library pick (e.g. Better Auth) in Phase 2 ADR | No tokens in JS; staff step-up | JWT in localStorage (rejected) |
| Payments | Provider adapter; provider chosen in Phase 6 (D-06) | Swap without touching order logic | — |
| Observability | pino JSON logs, Sentry-compatible error tracking (self-host or SaaS, D-10), uptime checks | — | — |
| CI | GitHub Actions per repository | Already used in the org's tooling | — |

## 3. API modules (bounded contexts)

| Module | Owns |
|---|---|
| `identity` | Users, sessions, staff 2FA, password reset |
| `accounts` | Customers, companies, memberships, addresses, GSTIN, credit terms |
| `catalogue` | Categories, products, option groups and values, constraints, media, turnaround, tax profile refs |
| `pricing` | Pricing versions, engine, preview, tier tables (pure, side-effect-free engine) |
| `artwork` | Uploads, versions, validation pipeline, reviews, signed access |
| `cart` | Carts, items, re-pricing |
| `checkout` | Order placement (idempotent), price confirmation |
| `orders` | Orders, items, state machines, production gate |
| `quotations` | Requests, revisions, messages, conversion |
| `payments` | Provider adapter, attempts, events, reconciliation, refunds |
| `production` | Jobs, QC checklists and results |
| `shipping` | Shipments, events (manual in R1) |
| `billing` | GST invoices, credit notes, numbering series |
| `promotions` | Coupons |
| `notifications` | Templates, outbox, delivery |
| `admin` | Staff, roles, permissions, settings |
| `audit` | Append-only audit log |
| `reports` | Read models / SQL views |

Rules:
- Business logic lives **only** in the API. Frontends never compute authoritative prices or permissions.
- Modules talk through service interfaces.
- Cross-module side effects (e.g. "payment captured → confirm order → notify") go through a **transactional outbox** so they are reliable and idempotent.

## 4. Key cross-cutting designs

1. **Money.** `NUMERIC(14,2)` in the DB; `decimal.js` in code; JSON transports money as strings (`"1234.50"`). The currency field is fixed to `INR` but stored.
2. **Idempotency.** `Idempotency-Key` header on order placement, payment initiation and refund. Keys are stored for 24 h with the response hash. Webhook handlers are unique on `(provider, provider_event_id)`.
3. **Object-level authorisation.** Every customer resource query is scoped by `owner_user_id` or company membership. A failed scope returns 404 (no existence leak). Staff access is gated by permission keys.
4. **Snapshots.** `order_items.spec_snapshot`, `price_snapshot` (JSONB, immutable via trigger or application rule) plus normalised amount columns for reporting.
5. **Artwork safety.**
   - Upload goes straight to a *quarantine* prefix.
   - The worker scans and inspects it, then copies it to a *clean* prefix.
   - Only clean objects ever get download URLs.
   - Download URLs expire in 5 minutes [P].
   - `Content-Disposition: attachment` on download, and SVG is never served inline.
6. **Configuration over code.** Products, options, constraints and pricing are data; changes are versioned and audited.

## 5. Environments

| Env | Purpose | Data |
|---|---|---|
| `local` | Developer machines (Node + local PostgreSQL 16 is already installed) | Seeded demo data |
| `staging` | Integration and UAT; gateway sandbox | Demo + test data only |
| `production` | Live | Real data; deploy requires explicit approval |

Secrets live in environment configuration on the host. `.env.example` is committed with no values. Nothing secret ever goes to Git, Figma, logs or client bundles.

## 6. Hosting options (decision D-02)

> **Decided at G2 (2026-11-05):** everything on **Vercel** for now — storefront, admin and the NestJS API as Vercel Functions — with managed PostgreSQL. ClamAV and pg-boss workers are replaced by a hosted scanning API (D-29) and Vercel Cron–driven job processing. See `../approvals/G2-architecture-approval.md`. The options below are kept for the record.

Facts observed on 2026-10-23 via the connected Hostinger account (read-only):

- The account has **Cloud Professional** (order `51918579`). It hosts ~20 existing sites (Digitech Miner staging/temp Node apps and client WordPress sites). Its subscription shows **non-renewing, expiring 2027-02-12**.
- **No VPS** exists on the account.
- Per Digitech Miner's verified findings, Cloud Professional:
  - offers managed Node.js apps and MySQL;
  - offers **no PostgreSQL, no Docker, no root access** and no long-running custom daemons such as ClamAV;
  - cannot build Next.js on the host (glibc), so it needs CI-built bundles.

| Option | Summary | Pros | Cons |
|---|---|---|---|
| **A. New Hostinger KVM VPS (recommended)** | One KVM 2 (2 vCPU, 8 GB RAM, 100 GB disk) runs storefront, API, workers, PostgreSQL, ClamAV and a reverse proxy. Admin served as static files | Meets the brief (PostgreSQL, malware scan, workers); isolated from client sites; predictable cost | New cost; we own patching, backups and monitoring (automated in Phase 2/8) |
| B. Existing Cloud Professional | Storefront + API as managed Node apps, MySQL, external scanning API | No new hosting spend until expiry | No PostgreSQL (brief prefers it); no ClamAV; shared with ~20 unrelated sites; Node app slots partly used; plan expires 2027-02-12 and is non-renewing |
| C. Managed cloud services (managed PostgreSQL + app platform + S3) | e.g. separate managed DB and app hosting | Less ops | Several vendors and bills; data residency and pricing to verify; more integration work |

| D. Vercel (Director currently uses Vercel, noted 2026-11-04) | Next.js storefront and admin SPA on Vercel. The API is either on Vercel Functions or on a small separate server. Managed PostgreSQL (e.g. via the Vercel Marketplace) and object storage | Very good fit for Next.js: previews per branch, CDN, zero server patching for the frontends | Serverless functions cannot run ClamAV or long-running pg-boss workers. Those need another runtime (a small VPS or a container host), or a hosted virus-scanning API instead of ClamAV. Several bills; usage-based pricing and plan limits to check for a commercial site; India data-residency to verify |

**Vercel account check (read-only, 2026-11-04):** the connected account has 3 unrelated projects and no Order My Print project. Nothing has been created or changed.

A likely shape for D is a hybrid:
- Vercel hosts the storefront and admin.
- One small VPS runs the API, workers, PostgreSQL and ClamAV.

D (hybrid) and A both meet the brief. This is decided at G2.

**Hostinger VPS list prices** (Hostinger billing catalogue API, 2026-10-23, INR, **excluding** any applicable GST, first-period promotional price in brackets):

| Plan | Specs | Monthly | Yearly | 2-yearly |
|---|---|---|---|---|
| KVM 1 | 1 vCPU, 4 GB | ₹1,649 (₹999) | ₹13,788 (₹8,388) | ₹23,976 (₹14,376) |
| KVM 2 | 2 vCPU, 8 GB | ₹2,099 (₹1,299) | ₹16,788 (₹11,148) | ₹28,776 (₹18,696) |

KVM 1 is too small once ClamAV (~1.5 GB RAM resident) and PostgreSQL run beside two Node apps. **Nothing has been purchased. Purchase needs your explicit approval.**

Object storage (D-05) is separate from all three options. Candidates for Phase 2 comparison:
- VPS disk with encrypted offsite backup (cheapest, weakest);
- Cloudflare R2;
- an India-region S3-compatible store.

## 7. Repository plan (multi-repo; no monorepo) [P]

| Repository (proposed) | Contents | Notes |
|---|---|---|
| `OrderMyPrint/website` (existing) | **Architecture and documentation source of truth**: PRD, research, ADRs, roadmap, approvals, brand assets | Already exists and is connected. Optionally rename to `omp-architecture` later (D-04) |
| `OrderMyPrint/omp-storefront` | Next.js storefront | Created in Phase 2 only |
| `OrderMyPrint/omp-admin` | React admin SPA | Phase 2 |
| `OrderMyPrint/omp-api` | NestJS API + workers + migrations + OpenAPI | Phase 2 |
| `OrderMyPrint/omp-design-system` | `@ordermyprint/ui` tokens and components | Phase 2; versioned via semver |

Conventions:
- All repositories private.
- No force-push.
- Never recreate or delete repositories.
- PRs with CI required.
- GitHub Free organisation plan: branch protection and rulesets on private repos are **not available** (observed on the Director's other org). Compensating controls: CI-gated merges by convention, read-only default `GITHUB_TOKEN`, SHA-pinned actions.
- Business rules are never duplicated across repos. Frontends consume the API's OpenAPI-generated TypeScript client.

## 8. Risks

| Risk | Mitigation |
|---|---|
| Pricing engine complexity | Start each product with a matrix model; add formula components where needed; golden-file tests per product |
| Artwork processing cost and security | Strict type list in R1; scan before access; CDR reviewed manually in CorelDRAW; AI/EPS and CDR previews deferred |
| Hosting ops burden on a VPS | Infrastructure-as-scripts; unattended security upgrades; backup + restore drill before launch |
| Missing business data blocks launch | Track D-08/D-09 from Phase 1; demo data clearly marked |
| Payment edge cases | Webhook + reconciliation; idempotency tests in Phase 7 |
