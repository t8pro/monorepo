# Library Inventory

## Runtime Dependencies

| Package                                         | Purpose                                           | Key Touchpoints                                                                                                                                 |
| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `@t8pro/design-system`                          | Shared design tokens, typography, and components. | Imported globally in `app/layout.tsx` and throughout feature components (buttons, headings, icons).                                             |
| `@tanstack/react-query`                         | Data fetching & mutation cache.                   | `app/providers.tsx` initialises `QueryClientProvider`; mutations live in `features/upload-free`, `features/home/ebook`, and the upload context. |
| `@stripe/react-stripe-js` / `@stripe/stripe-js` | Client-side Stripe Elements integration.          | Stripe context in `app/providers.tsx`, payment form in `features/upload-images/stripe-checkout`.                                                |
| `stripe`                                        | Server-side Stripe REST client.                   | Used in `app/api/payment-intent/route.ts` to create payment intents.                                                                            |
| `browser-image-compression`                     | In-browser image size reduction.                  | Applied within upload flows to keep submissions performant (`features/upload-free/hooks.ts`, `features/upload-images/context/utils`).           |
| `googleapis`                                    | Google Drive API client.                          | Wrapped by `lib/google-drive.ts`, consumed by Drive-related API routes.                                                                         |
| `handlebars`                                    | Lightweight templating for transactional emails.  | Dynamically imported in `lib/email.ts` callers (`app/api/upload-free/submit`, `lib/email.ts`).                                                  |
| `nodemailer`                                    | SMTP transport for transactional emails.          | Configured in `lib/email.ts`, reused by email-sending API routes.                                                                               |
| `react-toastify`                                | Toast notifications.                              | Registered in `PhotoProvider`; used across hooks to surface errors/success messages.                                                            |
| `sass`                                          | SCSS compilation for CSS Modules.                 | Powers every `styles.module.scss`.                                                                                                              |
| `material-symbols`                              | Icon font bundle.                                 | Loaded as a local font in `app/layout.tsx`.                                                                                                     |

## Dev Dependencies

| Package                    | Purpose                                                   | Notes                                                         |
| -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| `@t8pro/eslint-config`     | Shared lint rules across the monorepo.                    | Extended via `eslint.config.mjs`.                             |
| `@t8pro/typescript-config` | Centralised TS compiler settings.                         | Extended in `tsconfig.json`.                                  |
| `@types/*`                 | Type definitions for Node, React, Nodemailer, Handlebars. | Ensure parity with runtime versions.                          |
| `eslint`                   | Lint runner.                                              | Script `pnpm lint` (through root tooling) enforces standards. |
| `typescript`               | Type checking.                                            | Script `pnpm check-types` invokes `tsc --noEmit`.             |

## Upgrade Notes

- Major framework versions (Next.js 15, React 19) require React Server Components compatibility; verify client components declare `'use client'`.
- Stripe API version is pinned (`2025-08-27.basil`); confirm compatibility before upgrading and adjust webhooks as needed.
- Google APIs and Nodemailer access environment secrets—always validate `.env` completeness in CI before deploying.
