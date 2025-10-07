# Upload Images Feature

End-to-end paid upload experience powering `/upload`. Handles photo selection, client-side processing, Stripe checkout, Google Drive uploads, and email notifications.

## Structure

- `index.tsx` – orchestrates the main UI (selection grid, footer, modals) and exposes the entry component to the page.
- `context/` – React Context + reducer that stores photo state, user data, processing flags, and business logic:
  - `index.tsx` wires the provider, payment orchestration, Drive/email calls.
  - `constants.tsx` holds initial state and storage keys.
  - `types.tsx` defines state/actions and data contracts.
  - `utils/` provides image compression (`image.ts`), reducer (`photo-reducer.ts`), and IndexedDB/session storage helpers (`photo-storage.ts`).
- `hooks/use-payment-result.tsx` – handles Stripe redirect results to resume processing.
- `checkout-modal/` & `stripe-checkout/` – modal and embedded checkout flows that wrap Stripe Elements when `clientSecret` is available.
- `selected-images-header/`, `selected-images-footer/`, `photo-card/` – presentation components backed by context actions.
- `processing-modal/` – displays step-by-step progress (compressing, uploading, Drive sync, email) after payment.
- `styles.module.scss` – base styling for the selection view.

## Key Flows

1. **Photo intake** – Users add up to 24 images; files are validated, compressed to max 1600px/≈70 % quality, and persisted to IndexedDB for recovery.
2. **User details** – Name, email, and environment selection are required before payment (validation lives in `context/index.tsx`).
3. **Package calculation** – Package tier auto-selects based on photo count (`No Package`, `Quick Fix`, `Growth Accelerator`, `Premium`) and determines pricing/messages. See `docs/business/rules.md`.
4. **Checkout** – `finalizeOrder` creates a PaymentIntent via `/api/payment-intent`; `CheckoutModal` or `StripeCheckout` mounts Elements to capture payment.
5. **Post-payment processing** – `processPhotosAfterPayment` uploads each photo to `/api/upload-single-photo`, syncs the full set to Google Drive (`/api/google-drive/upload`), then sends an internal email (`/api/send-order-email`). `ProcessingModal` surfaces status transitions.
6. **Resilience** – Payment redirects and refreshes restore photos/user data from storage (`use-payment-result`, `photoStorage.loadPhotos()`), ensuring users can resume without re-uploading.

## Extending

- Add new processing steps by extending the `processingStep` union and updating `ProcessingModal` switch handling.
- When integrating real storage (S3, etc.), replace the placeholder API routes (`upload-single-photo`, `upload-photos`) while keeping the context promises intact.
- Keep pricing or tier logic synced with `features/pricing` and `docs/business/rules.md`.
- Use the context hooks (`usePhotosContext`) for any additional UI component that needs access to upload state instead of duplicating local state.
