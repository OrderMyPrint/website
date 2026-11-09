# Approval — remaining admin modules rollout

| | |
|---|---|
| Date | 2026-11-10 |
| Approved by | Director (in chat) |

Director's request: "complete the other admin modules". Answers to the rollout questions:
- **Production database:** "Yes, migrate as each ships" — each module's additive migration is applied to Neon production right before its deploy, followed by a health check.
- **Production & QC before artwork review exists:** "Build with manual start" — staff start a production job from a paid order and record that artwork was checked outside the system, until AD-ART (needs D-05 file storage) is built.

Still blocked on decisions (not built): Artwork review (D-05 file storage), Invoices (GSTIN / legal entity, D-28 GST confirmation).
