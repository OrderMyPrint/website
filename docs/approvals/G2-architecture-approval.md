# G2 — Architecture, Hosting & Repositories Approval

| | |
|---|---|
| Gate | G2 (end of Phase 2) |
| Requested | 2026-11-05 |
| Status | **APPROVED** (2026-11-05) — hosting direction and repositories; purchases still separate |
| Evidence | `docs/architecture/architecture.md` §2, §6, §7 · Director's answers in the Claude Code session of 2026-11-05 |

## What is being approved

1. **Hosting direction (D-02): everything on Vercel for now.**
   - Vercel hosts the Next.js storefront, the admin SPA **and the NestJS API** (as Vercel Functions).
   - PostgreSQL comes from a managed provider (e.g. via the Vercel Marketplace). Provider, plan and any paid tier need the Director's explicit approval before money is spent.
   - The Director first chose option D (Vercel + a small VPS for the API) and then, the same day, asked for the backend on Vercel too ("currently i want you to host the backend also on the vercel"). "Currently" is recorded: a VPS can be added later without code changes, because the API is a normal NestJS app.
2. **Database:** PostgreSQL. MySQL is no longer considered.
3. **Repositories (D-04):** multi-repo as in `architecture.md` §7. The backend repository is `OrderMyPrint/omp-api`.
4. **Repository visibility — exception to §7:** the Director chose **public** for `omp-api`, and to **keep `website` and `omp-storefront` public**. §7 said "all repositories private". Consequence: no secrets, credentials, customer data or private business figures may ever be committed; business facts in the docs are visible to anyone.

## Consequences of running the API on Vercel

| Brief / architecture item | On Vercel | What we do |
|---|---|---|
| ClamAV malware scanning on our own server | Not possible (no long-running daemons) | Artwork pipeline uses a scanner interface. A **hosted scanning API** must be chosen (new decision **D-29**) before artwork uploads go live; files stay in quarantine and are never served until scanned clean |
| pg-boss workers (long-running) | Not possible | Jobs are stored in PostgreSQL and processed by **Vercel Cron** calling a protected API endpoint, plus inline processing where it is quick. Needs a Vercel plan whose cron frequency suits us (to confirm before staging) |
| Database connections | Serverless functions open many short connections | Use the provider's **pooled** connection string; Prisma configured for serverless |
| Function time limits | Requests must finish within the plan's limit | Heavy work (PDF generation, file inspection) runs as jobs, not in the request |
| Data residency (India) | Region to choose | Pick an Indian or nearest region for functions and database where available; confirm before production |

## Not covered

- **Object storage (D-05)** stays open (Vercel Blob is now a natural candidate). The API ships with a storage interface and a local-disk adapter for development only.
- **Hosted malware scanning (D-29)** — new, open.
- Payment gateway, SMS/OTP, email and shipping providers (G6: D-06, D-06b, D-07, D-25).
- Error tracking (D-10).
- Any deployment (G8a staging, G8b production).
- Business data (D-08 prices, D-09 policies, D-28 GST).

## Decision record

| Item | Decision | By | Date |
|---|---|---|---|
| D-02 hosting | Vercel for storefront, admin and API; managed PostgreSQL; no purchase yet | Director | 2026-11-05 |
| Database | PostgreSQL | Director (via D-02) | 2026-11-05 |
| D-04 repositories | Multi-repo; create `OrderMyPrint/omp-api` | Director | 2026-11-05 |
| Repository visibility | `omp-api` public; `website` and `omp-storefront` stay public | Director | 2026-11-05 |

**Director's answers (2026-11-05):** hosting "Vercel + small VPS (D)", then "currently i want you to host the backend also on the vercel"; new repo "Yes, public"; visibility "Leave both public". The request that led to this gate: "start phase 3 backend".

**Effect:** Phase 3 (backend) may start. Storage (D-05), malware scanning (D-29) and error tracking (D-10) are open items that block staging, not local development.
