# ADR-0006 — Artwork upload, scanning and review pipeline

- **Status:** Proposed
- **Date:** 2026-10-23

## Decision
1. Browser uploads directly to a **quarantine** prefix in private object storage via a pre-signed URL. Size and type limits are enforced in the signed policy.
2. A worker:
   - scans with ClamAV;
   - sniffs the real type;
   - validates PDF (pdf-lib/pdfjs), raster (sharp: dimensions, effective DPI at the ordered size) and SVG (DOMPurify sanitisation, external references removed);
   - generates a thumbnail;
   - copies the clean file to a **clean** prefix.
3. Only clean objects receive short-lived signed download URLs (`Content-Disposition: attachment`). SVG is never served inline.
4. Each upload is a new **artwork version**. Reviews (approve / revision requested / rejected) are separate records. The production gate requires an approved version per required slot.
5. **Release 1 types:** PDF, PNG, JPEG, SVG. **AI/EPS are deferred.** They need a Ghostscript-based converter, a non-Node runtime requiring separate approval.

## Consequences
- Requires a host that can run `clamd` (ADR-0003 option A) or a paid scanning API.
- Customer-facing copy must say checks are basic and that pre-press staff review every file.
