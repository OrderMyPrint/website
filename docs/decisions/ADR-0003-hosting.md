# ADR-0003 — Hosting target

- **Status:** Proposed. **Awaiting decision D-02.**
- **Date:** 2026-10-23

## Context
Observed 2026-10-23 (read-only, Hostinger API):
- The Director's account has **Cloud Professional** (shared with ~20 existing sites; subscription non-renewing, expires 2027-02-12) and **no VPS**.
- Cloud Professional provides managed Node.js and MySQL only:
  - no PostgreSQL, Docker or root access;
  - no daemons such as ClamAV;
  - Next.js must be deployed as CI-built bundles.

## Options
- **A. Hostinger KVM 2 VPS** (2 vCPU / 8 GB / 100 GB). List ₹2,099/month or ₹16,788/year (first year ₹11,148), GST extra.
- **B. Existing Cloud Professional** with MySQL and an external malware-scanning service.
- **C. Managed cloud services.**

## Recommendation
**A.** It is the only option that satisfies:
- PostgreSQL;
- in-house malware scanning;
- background workers;
- isolation from unrelated client sites.

## Consequences (if A)
- We operate the VPS. Phase 2 must deliver:
  - provisioning scripts;
  - unattended security updates;
  - firewall;
  - TLS;
  - backups with offsite copy and a restore drill;
  - monitoring.
- Nothing is purchased or configured without explicit approval.
