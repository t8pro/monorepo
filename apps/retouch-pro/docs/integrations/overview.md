# External Integrations

## Stripe Payments

1. `PhotoProvider.finalizeOrder` calculates the package, stores metadata locally, and hits `/api/payment-intent`.
2. `/api/payment-intent` uses the server-side `stripe` SDK (API version `2025-08-27.basil`) to create a PaymentIntent with metadata about package and photo count.
3. Client receives `clientSecret`, opens the Stripe checkout modal (`features/upload-images/stripe-checkout`), and confirms the payment via `stripe.confirmPayment`.
4. On success, the app calls `processPhotosAfterPayment`, which processes photos and triggers email notifications.

**Environment**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`.

## Email Delivery

1. `lib/email.ts` memoises a Nodemailer transporter targeting Gmail SMTP with TLS (`EMAIL_USER`/`EMAIL_PASS`).
2. API routes reuse the transporter:
   - `/api/send-order-email` streams photo attachments and sends an internal summary.
   - `/api/upload-free/submit` compiles a Handlebars template and notifies the team.
   - `/api/ebook/download` calls `sendEmail` helper to deliver the lead magnet to the requester.
3. Templates live in `app/templates/*.ts` so HTML is versioned alongside code.

**Environment**: `EMAIL_USER`, `EMAIL_PASS`, `APP_URL` (fallback for template links).

## React Query + Toasts

1. `QueryClientProvider` lives in `app/providers.tsx`, enabling shared cache across all client components.
2. Mutations in feature hooks (`useUploadFree`, `useMutationDownloadEbook`, upload context) centralise network requests and expose status flags.
3. Toast feedback via `react-toastify` is initialised once in `Providers` and invoked inside mutations for real-time UX messaging.

## Storage & Persistence

- **Browser**: `photoStorage` saves selected photos in IndexedDB and metadata in Session Storage (`PENDING_UPLOAD_STORAGE_KEY`) to survive checkout navigation.
