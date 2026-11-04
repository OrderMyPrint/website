# Order My Print — Architecture & Documentation

This repository is the **documentation and architecture source of truth** for the Order My Print custom-printing e-commerce platform. Application code lives in separate repositories, created in Phase 2 after approval (no monorepo).

**Current phase:** Phase 2 — Repository & architecture setup, waiting on G2 decisions (hosting D-02, repo names D-04, storage D-05). Phase 1 Figma design **APPROVED** at G1 on 2026-11-04. Figma: https://www.figma.com/design/9O88DWSEv7qCKPYOn5GwZy

## Read first
- `docs/discovery/phase-0-discovery-report.md`: discovery summary and the decisions needed.
- `docs/roadmap/phase-plan.md`: phase tracker and gates.
- `docs/decisions/decision-register.md`: open and decided decisions.

## Contents
| Folder | Purpose |
|---|---|
| `docs/prd/` | PRD, functional spec, user stories, feature matrix, catalogue & pricing model |
| `docs/research/` | Reference-site audit |
| `docs/architecture/` | Architecture, data model, API outline |
| `docs/decisions/` | ADRs and decision register |
| `docs/design/` | Figma design brief and screen inventory |
| `docs/roadmap/` | Phase plan |
| `docs/approvals/` | Gate approval records |
| `docs/brand/supplied/` | Brand assets exactly as supplied (never modify) |

## Working rules
- DESIGN FIRST → APPROVAL → IMPLEMENTATION → TESTING → DEPLOYMENT APPROVAL.
- No invented business facts, prices, integrations or test results; demo data is marked **DEMO**.
- No secrets in this repository.
