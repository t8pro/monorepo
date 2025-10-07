# External Integrations

## Stripe Payments

1. `PhotoProvider.finalizeOrder` calculates the package, stores metadata locally, and hits `/api/payment-intent`.
2. `/api/payment-intent` uses the server-side `stripe` SDK (API version `2025-08-27.basil`) to create a PaymentIntent with metadata about package and photo count.
3. Client receives `clientSecret`, opens the Stripe checkout modal (`features/upload-images/stripe-checkout`), and confirms the payment via `stripe.confirmPayment`.
4. On success, the app calls `processPhotosAfterPayment`, which uploads photos, pushes them to Drive, and triggers email notifications.

**Environment**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`.

## Google Drive

1. Service-account credentials are hydrated in `lib/google-drive.ts` (private key is line-break repaired).
2. `/api/google-drive/upload` (paid) and `/api/upload-free/submit` (free) create a timestamped folder, upload images, and set link-sharing to "anyone with the link".
3. Folder URLs are returned to the client and optionally embedded into email notifications.

**Environment**: `GCP_PROJECT_ID`, `GCP_PRIVATE_KEY_ID`, `GCP_PRIVATE_KEY`, `GCP_CLIENT_EMAIL`, `GCP_CLIENT_ID`, `GCP_CLIENT_X509_CERT_URL`, optionally `GOOGLE_DRIVE_PARENT_FOLDER_ID`.

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
- **Server**: Google Drive holds uploaded assets; additional persistence (database/CRM) can be layered into the API routes without touching client code.
