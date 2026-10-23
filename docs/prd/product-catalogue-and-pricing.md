# Product Catalogue & Pricing Model

| | |
|---|---|
| Status | **READY FOR REVIEW** (Phase 0 proposal) |
| Date | 2026-10-23 |

> **Data policy.** This document defines *structure*: which options each product exposes and how the engine computes a price. It contains **no real prices, costs, MOQs, materials availability, tax rates or turnaround commitments**. Values in Figma prototypes are fictitious, marked **DEMO**, and replaced with business-approved data before launch.

Status markers used below:

- **Proposed**: likely needed; the business confirms availability.
- **Undecided**: the business must say whether it is offered.
- **Later**: not in Release 1.

---

## 1. Catalogue structure

```
Category (admin-managed)
 └─ Product family (admin-managed)
     ├─ Option groups (ordered → configurator steps)
     │   └─ Options / values (with constraints, visibility rules, descriptions, swatches)
     ├─ Pricing model (versioned, effective-dated)
     ├─ Artwork requirements (file types, sides/locations needing artwork, guidance)
     ├─ Turnaround rules (production days, per option where relevant)
     └─ Tax profile (HSN/SAC + GST rate reference, set by the business)
```

| Category | Product family | Slug (proposed) |
|---|---|---|
| Business Stationery | Visiting Cards | `visiting-cards` |
| Business Stationery | Letter Pads | `letter-pads` |
| Business Stationery | Envelopes | `envelopes` |
| Marketing Print | Brochures | `brochures` |
| Marketing Print | Stickers | `stickers` |
| Custom Transfers | DTF Stickers | `dtf-stickers` |
| Corporate Merchandise | Corporate T-Shirt Printing | `corporate-t-shirts` |

## 2. Option types supported by the engine

| Type | Example | Notes |
|---|---|---|
| `select` | Paper stock, finish | Single choice; each value may carry price modifiers |
| `multiselect` | Print locations on a T-shirt | Each selected value may add cost |
| `quantity` | 100, 250, 500 or free entry | Preset steps or free entry with min, max and step |
| `dimension` | Width × height (mm/in) | Preset sizes or custom within limits; drives area and imposition |
| `size_breakdown` | T-shirt S/M/L/XL… quantities | Sum = total quantity; per-size surcharges possible (e.g. 2XL+) |
| `integer` | Pages, sheets per pad, artwork count | Min, max and step |
| `boolean` | Window envelope | — |
| `text` | Special instructions | Not priced |

**Constraints** are rules evaluated on the server and mirrored in the UI only as a hint. Examples:

- "Spot UV requires ≥ 350 GSM".
- "Window envelopes only for DL and C5".
- "Tri-fold requires ≥ 3 panels' width".
- "Gloss lamination excludes uncoated stock".

Invalid combinations are rejected by the API with a machine-readable reason.

## 3. Product configurators (proposed fields)

### 3.1 Visiting Cards

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Size: standard 3.5×2 in, 85×55 mm, square, custom | select / dimension | Proposed; custom is Undecided |
| 2 | Paper stock / GSM | select | Proposed (values from the business) |
| 3 | Printing sides: single / double | select | Proposed |
| 4 | Finish: matte, gloss, soft-touch lamination, spot UV, foil | select (+ constraints) | Spot UV and foil Undecided |
| 5 | Corners: square / rounded | select | Undecided |
| 6 | Quantity | quantity (tiers) | Proposed |

### 3.2 Letter Pads

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Sheet size: A4, A5, custom | select / dimension | Proposed; custom Undecided |
| 2 | Paper stock / GSM | select | Proposed |
| 3 | Sheets per pad | integer / select (e.g. 50, 100) | Proposed |
| 4 | Number of pads | quantity | Proposed |
| 5 | Printing: colours (CMYK / 1-colour), single or double side | select | Proposed |
| 6 | Binding: top glue / none | select | Undecided |

### 3.3 Envelopes

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Size: DL, C5, C4, 9×4 in, custom | select / dimension | Proposed; custom Undecided |
| 2 | Paper / GSM | select | Proposed |
| 3 | Window: none / left / right | select (constraint by size) | Undecided |
| 4 | Closure: gum / peel-and-seal | select | Undecided |
| 5 | Printing: front only / front + flap; colours | select | Proposed |
| 6 | Quantity | quantity | Proposed |

### 3.4 Brochures

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Finished size: A4, A5, DL, custom | select / dimension | Proposed |
| 2 | Flat/open size | derived from size + fold (read-only) | Proposed |
| 3 | Fold: none, half, tri, Z, gate | select (constraints) | Proposed |
| 4 | Page configuration: number of pages / panels; saddle-stitch for multi-page | integer / select | Multi-page Undecided |
| 5 | Paper / GSM | select | Proposed |
| 6 | Finish: none, matte or gloss lamination | select | Proposed |
| 7 | Quantity | quantity | Proposed |

### 3.5 Stickers

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Dimensions: preset or custom W×H | dimension | Proposed |
| 2 | Shape: circle, square, rectangle, rounded rectangle, custom die-cut | select | Custom die-cut Undecided |
| 3 | Material: paper, vinyl (waterproof), transparent, others | select | Proposed (values from the business) |
| 4 | Adhesive: permanent / removable | select | Undecided |
| 5 | Finish: matte / gloss lamination / none | select | Proposed |
| 6 | Cutting style: kiss-cut on sheet, die-cut singles, roll | select | Proposed |
| 7 | Quantity unit: pieces / sheets / rolls (per product config) | quantity | Proposed |

### 3.6 DTF Stickers (transfers)

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Order mode: individual transfers **or** gang sheet | select | Proposed |
| 2a | Transfer dimensions (individual) | dimension | Proposed |
| 2b | Gang-sheet size (fixed width × length) | select / dimension | Proposed (sheet widths from the business) |
| 3 | Film specification: standard, glitter, glow, etc. | select | Undecided |
| 4 | Number of distinct artworks | integer | Proposed |
| 5 | Quantity (individual) or printable area / sheets (gang) | quantity / derived | Proposed |
| 6 | Gang-sheet arrangement: customer-arranged file / arrange for me | select | "Arrange for me" Undecided (a manual service) |

### 3.7 Corporate T-Shirt Printing

| Step | Field | Type | Status |
|---|---|---|---|
| 1 | Garment type: round neck, polo, etc. | select | Proposed |
| 2 | Fabric / GSM: cotton, poly-cotton, dri-fit… | select (constraint by garment) | Proposed |
| 3 | Colour | select (swatches) | Proposed |
| 4 | Size-wise quantity: XS–3XL | size_breakdown | Proposed |
| 5 | Printing method: screen, DTF, embroidery, sublimation | select (constraint by fabric) | Values from the business |
| 6 | Print locations: front, back, left chest, sleeve (each with a max size) | multiselect | Proposed |
| 7 | Colours per location (for screen printing) | integer per location | Proposed |
| 8 | Total quantity | derived from size breakdown | Proposed |
| — | Bulk pricing: tiered by total quantity; over a threshold → "Request quote" CTA | rule | Proposed |

## 4. Pricing engine model

### 4.1 Principles

1. **The server is authoritative.** The client sends a configuration and receives a price. Client totals are never trusted.
2. **Data-driven, no code eval.** Pricing is a versioned JSON document of typed **components** that the engine interprets. There is no arbitrary expression execution.
3. **Two model styles, combinable:**
   - **Matrix**: a price table by (option values × quantity tier). This is the fastest way for the business to start, and the closest to how the reference site works.
   - **Formula / cost-plus**: rates × measurable quantities (area, sheets, locations) + setup + finishing, then margin.
4. **Versioned and effective-dated.** `draft → published` with `effective_from` and an optional `effective_to`. Only one published version per product is active at a time.
5. **Snapshot everything.** Each quote line, cart line and order line records its `pricing_version_id`, input configuration, every component's output and the totals.

### 4.2 Evaluation pipeline

```
validate(config)                 → reject invalid combos / limits
derive(config)                   → area, flat size, ups per sheet, sheets, total qty
base        = matrix lookup  |  Σ(rate × measure)                  (per component)
+ option modifiers               (fixed | per-unit | per-area | % of base)
+ setup charges                  (per artwork, per colour, per print location, per plate/screen)
+ finishing                      (lamination per area, folding per unit, cutting per sheet…)
× (1 + waste allowance %)        (applied to material-driven components)
× margin                         (cost-plus models only)
→ apply minimum order charge
→ quantity-tier discount         (if not already a matrix price)
→ round (documented rule, e.g. unit price to ₹0.01, line total to ₹1)
= line subtotal (pre-tax)
+ coupon / promotion             (cart level, rule-based)
+ shipping estimate              (weight/volume or slab based; configurable)
+ GST                            (per tax profile; CGST+SGST vs IGST by place of supply)
= total
```

**Imposition (sheet-fed products).** For each product with `sheet_imposition`:

```
ups    = floor((sheet_w − margins) / (item_w + bleed×2 + gap))
       × floor((sheet_h − margins) / (item_h + bleed×2 + gap))
sheets = ceil(qty / ups) × (1 + waste %)
```

Sheet size, margins, bleed and gap are admin-configured per press/material.

**Rounding.** Amounts are stored as `NUMERIC(14,2)`. Intermediate maths uses `decimal.js` at ≥ 6 dp. Tax is computed per line, and the rounding mode is HALF-UP [P]. The CA must confirm GST rounding practice [Q].

### 4.3 What admins can configure

- Matrix tables (import/export CSV).
- Component rates.
- Setup fees.
- Waste %.
- Margin %.
- Minimum quantity and minimum charge per product.
- Option surcharges.
- Tier breakpoints.
- Effective dates.
- Shipping slabs.
- Coupon rules.
- Tax profiles.

The admin **price preview** runs the same engine on any configuration and shows the full breakdown before publishing.

### 4.4 Price changes after carting [C → P]

- A cart line stores its last computed price and `pricing_version_id`.
- On checkout the engine re-prices the cart.
- If the price changed, the customer sees the difference and must confirm before payment.
- A configurable **price-hold window** (e.g. 24 h) is Undecided [Q].
- Accepted quotations carry their own price and validity date and are not re-priced.

## 5. Demo-data policy for Figma

- Use round, obviously fictitious amounts (e.g. ₹1,234.00), labelled with a small **DEMO** badge on price components in prototype frames.
- Use generic material names ("Premium Matte 350 GSM — DEMO") unless the business supplies real ones.
- Use no turnaround promises; use the placeholder "Production time shown here".
