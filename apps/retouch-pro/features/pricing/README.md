# Pricing Feature

Displays paid retouching packages on the landing page and links users into the upload journey.

## Structure

- `index.tsx` – renders pricing cards, CTA buttons, and the free trial promo.
- `constants.ts` – source of truth for package copy, price, and tier metadata.
- `types.ts` – optional `title` override for the component.
- `styles.module.scss` – layout and theming scoped to the pricing grid.

## Key Behaviours

- Pricing cards map directly to the package thresholds enforced in the upload flow (`docs/business/rules.md`).
- Each card CTA routes to `/upload`; the free trial button links to `/upload-free`.
- `featured` flag in `constants.ts` promotes the primary plan with accent styling.

## Extending

- Adjust pricing or copy in `constants.ts`—no JSX changes required.
- When introducing a new plan, add it to the array and the upload context map so payment logic stays in sync.
- Keep CTA destinations consistent with the available routes (`/upload`, `/upload-free`).
