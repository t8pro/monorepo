# Architecture Overview

## Core Stack

- **Framework**: Next.js 15 App Router with React 19.
- **Rendering mix**: Server Components for static/data-heavy routes, Client Components for interactive flows (upload & checkout).
- **Styling**: Scoped Sass modules (`*.module.scss`) with tokens supplied by `@t8pro/design-system`.
- **State & side-effects**: React Context + Reducer in the upload journey, React Query for async mutations, Stripe Elements for payments.

## App Shell

- `app/layout.tsx` defines the HTML shell, loads global fonts, design-system base styles, and wraps every page with `Header`, `Footer`, and `Providers`.
- `app/providers.tsx` centralises cross-cutting providers:
  - `ThemeProvider` from the design system (style tokens & global CSS vars).
  - `QueryClientProvider` to share a single React Query cache.
  - `Elements` from Stripe configured with `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
  - `PhotoProvider` (upload context) + global `ToastContainer`.

## Routing Model

- **Landing experience**: `app/page.tsx` composes feature modules (`Hero`, `BeforeAfter`, `Ebook`, `Pricing`).
- **Checkout journeys**: dedicated route groups under `app/upload`, `app/upload/thank-you`, and `app/upload-free`.
- **API routes**: colocated in `app/api/**/route.ts` to keep server-side handlers near their consumers (payments, Drive uploads, email, ebook fulfilment).
- **Templates**: HTML email templates live under `app/templates/` for easy reuse across API routes.

## Feature Slices

- UI and logic are bundled inside `features/<domain>` (e.g. `features/upload-images`, `features/home`, `features/pricing`).
- Each slice exports a top-level component (`index.tsx`) and co-locates supportive files (`hooks.ts`, `constants.ts`, `types.ts`, `styles.module.scss`), keeping concerns modular.
- Shared atoms (header, footer, logos) live in `components/` to avoid cross-feature coupling.

## Server Utilities

- `lib/email.ts` memoises Nodemailer transports.
- `lib/google-drive.ts` wraps Google Drive SDK operations.
- `lib/order-naming.ts` standardises timestamped folder names.
- These utilities are imported by API routes to avoid duplicating configuration and to keep secrets server-only.
