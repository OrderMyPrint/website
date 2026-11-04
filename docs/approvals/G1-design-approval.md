# G1 — Design Approval

| | |
|---|---|
| Gate | G1 (end of Phase 1) |
| Requested | 2026-10-23 |
| Status | **APPROVED** (2026-11-04) |
| Evidence | Figma file https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy · `docs/design/phase-1-handoff.md` · `docs/design/ux-audit-2026-11-04.md` (version approved: after the 2026-11-04 UX audit, 36 overlays, prototypes P0–P12) |

## What is being approved
1. The Figma design (foundations, components, storefront desktop/tablet/mobile, configurators with guided upload, checkout with mobile OTP, quotations, account, admin) as the basis for implementation.
2. Mobile + OTP-only customer sign-in replacing guest checkout (X-09).
3. Guided artwork upload with print area guides (X-10).

## Not covered
Architecture/hosting/repositories (G2), providers (G6), deployment (G8).

## Decision record
| Item | Decision | By | Date |
|---|---|---|---|
| Design | APPROVED | Director | 2026-11-04 |
| OTP-only sign-in | APPROVED (part of the approved design) | Director | 2026-11-04 |
| Guided upload | APPROVED (part of the approved design) | Director | 2026-11-04 |

**Director's words (2026-11-04):** "Approved all Figma design"

**Effect:** the Figma file is now the visual source of truth for implementation. UI implementation still waits for **G2**, which covers architecture, hosting (D-02) and repository names (D-04). No repositories are created and nothing is deployed before G2.

**Not changed by this approval:** the reference prices still need business confirmation (D-08). GST treatment still needs CA confirmation (D-28). Legal details are still needed (D-09).
