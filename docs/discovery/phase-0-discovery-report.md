# Phase 0 — Discovery Report

| | |
|---|---|
| Phase status | **READY FOR REVIEW** |
| Date | 2026-10-23 |
| Next gate | G0 (`docs/approvals/G0-discovery-approval.md`) |

## 1. Environment & integrations audit (observed 2026-10-23)

| Item | Finding |
|---|---|
| Local folder | `/Users/rutvijpatel/OrderMyPrint` was empty. Git initialised on `main`, remote `origin` → `https://github.com/OrderMyPrint/website.git` |
| GitHub | `gh` signed in as `Ownerdigitechminer` (scopes: repo, workflow, read:org, gist; **no admin:org**). Org `OrderMyPrint` (Free plan, created 2026-10-23); Director is **admin**. One repo: `website` (private, empty before this commit). No other repos, so nothing was at risk of being overwritten |
| Figma | Official Figma MCP connected as "Digitech Miner". **Full seat on "Digitech Miner's team" (Pro)**; View seats on "Project M Team" and "Yuva Saarthi Project Team". Code Layers off. The `plugin:figma` connector needs separate authorisation, but is not needed because the official server works |
| Hostinger (read-only) | **Cloud Professional** (order 51918579): ~20 sites incl. Digitech Miner staging/temp Node apps and client WordPress sites. Subscription **non-renewing, expires 2027-02-12**. **No VPS.** No site or domain for Order My Print. VPS catalogue prices recorded in `architecture.md` §6 |
| Local tooling | Node 22.23.3, npm 10.9.9, PostgreSQL 16.14 client/server (Homebrew), gh 2.95.0, git 2.50.1. No pnpm, no Docker |
| Related project | Digitech Miner (`~/Digitech Miner`) used the same gated method. Its learnings applied here: React + Node only; multi-repo; Hostinger Cloud Professional cannot run PostgreSQL/Docker or build Next.js on the host; GitHub Free has no branch protection on private repos |
| Other connectors | Prisma Local MCP failed to connect (timeout); the Prisma Remote and design-plugin connectors need authorisation. None are needed for Phase 0 |
| Brand asset | Logo supplied in chat; stored unchanged at `docs/brand/supplied/omp-logo-supplied-2026-10-23.jpg` |

## 2. Research

`docs/research/reference-site-audit.md` covers:

- The ten preliminary patterns: eight confirmed, two partly confirmed. The bulk-quote workflow and customer-story media were not found.
- Configuration structure from public product data.
- Gaps: no price breakdown, no quote flow, matrix-only pricing.
- Adopt/adapt/avoid decisions.

**Limitations.** The theme CSS did not load in the browser pane, so there is no visual or mobile layout assessment. The checkout was not entered and GoKwik use is unverified.

## 3. Deliverables

| Document | Path |
|---|---|
| PRD | `docs/prd/PRD.md` |
| Functional specification (flows, state machines, permissions) | `docs/prd/functional-specification.md` |
| User stories & acceptance criteria (ID'd) | `docs/prd/user-stories-and-acceptance-criteria.md` |
| Feature matrix (41 features) | `docs/prd/feature-matrix.md` |
| Catalogue & pricing model | `docs/prd/product-catalogue-and-pricing.md` |
| Reference audit | `docs/research/reference-site-audit.md` |
| Architecture + hosting options + repo plan | `docs/architecture/architecture.md` |
| Data model | `docs/architecture/data-model.md` |
| API outline | `docs/architecture/api-specification.md` |
| ADRs 0001–0006 + decision register | `docs/decisions/` |
| Figma design brief + screen inventory (40 storefront screen IDs × desktop and mobile; 30 admin screen IDs) | `docs/design/figma-design-brief.md` |
| Phase tracker | `docs/roadmap/phase-plan.md` |
| G0 approval request | `docs/approvals/G0-discovery-approval.md` |

## 4. Key findings

1. **The pricing engine is the core risk and the core differentiator.** The reference site's precomputed-variant approach cannot cover custom dimensions, T-shirt size breakdowns or DTF area pricing. ADR-0002 proposes a versioned component engine that can start as a simple matrix.
2. **Hosting decides feasibility.** The existing Cloud Professional plan cannot run PostgreSQL or ClamAV, and expires in February 2027. A dedicated KVM 2 VPS is recommended. This needs your decision before Phase 2, but does **not** block Figma work.
3. **Bulk quotation is a real gap in the market reference.** Doing it well (multi-item, revisions, accept → order) is a clear advantage for corporate buyers.
4. **Business data is the critical path to launch.** Materials, rates, MOQs, turnaround, HSN/GST and policies (D-08, D-09) should be gathered during Phases 1–3.

## 5. Decisions needed from you now

See `docs/decisions/decision-register.md`.

| ID | Question | My recommendation |
|---|---|---|
| D-01 | Use "Order My Print" + the supplied logo as the working brand in Figma? | Yes; please also send a vector logo file when available |
| D-03 | Visual direction | A "Ink & Paper" |
| D-11…D-20 | Proposed defaults | Accept as listed |

Raised now, decided at G2: **D-02 hosting** (recommend a Hostinger KVM 2 VPS) and **D-04 repo names**.
