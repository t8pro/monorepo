# Business Rules

## Pricing & Packages

- Photo selections drive package assignment automatically (`features/upload-images/context/index.tsx:71`).
- Package thresholds:
  - **No Package** – 1 to 5 photos, $15 per photo.
  - **Quick Fix** – 6 to 11 photos, discounted to $10 per photo (`features/pricing/constants.ts:2`).
  - **Growth Accelerator** – 12 to 23 photos, $8.33 per photo.
  - **Premium** – 24+ photos, $6 per photo.
- Base totals are computed at $15 per image with discounts applied per tier; UI shows both crossed-out original and discounted totals (`features/upload-images/selected-images-footer/index.tsx:52`).
- Maximum photo count per paid order is **24**; additional uploads are blocked client-side (`features/upload-images/index.tsx:27`).

## Paid Upload Flow

- Users must provide name, email, and environment preference before checkout; environment options are **original**, **white_studio**, **restaurant** (`features/upload-images/selected-images-footer/index.tsx:79`).
- Email format is validated with a basic regex before payment can proceed (`features/upload-images/context/index.tsx:320`).
- Photos are pre-processed client-side: resized to a maximum dimension of 1600px and compressed to ~70% quality when above 2 MB (`features/upload-images/context/utils/image.ts:1`).
- When finalizing:
  1. Photos and user data are cached locally (IndexedDB + session storage) to survive redirects (`features/upload-images/context/index.tsx:357`).
  2. A Stripe PaymentIntent is created with package metadata (`app/api/payment-intent/route.ts:5`).
  3. After confirmation, each photo is sequentially re-uploaded using `/api/upload-single-photo` for further processing hooks (`features/upload-images/context/index.tsx:508`).
  4. All photos are bundled and pushed to Google Drive with a timestamped folder name `<email> <YYYY-MM-DD HH:mm:ss> <environmentNumber>` where environments map to 1/2/3 (`lib/order-naming.ts:3`).
  5. An internal order email, including optional Drive folder link, is sent to `contact@t8pro.us` (`app/api/send-order-email/route.ts:1`).
- Processing states communicate progress (`compressing`, `uploading`, `drive_upload`, `sending_email`, `completed`) and surface toasts on error (`features/upload-images/context/index.tsx:241`).

## Free Trial Upload

- Only one image is accepted; UI enforces selection of a single file (`features/upload-free/hooks.ts:41`).
- Allowed MIME types must start with `image/`; files over 10 MB are rejected (`features/upload-free/hooks.ts:63`).
- Images are compressed toward a 2 MB target before submission (`features/upload-free/hooks.ts:36`).
- Required fields: name, email, phone, company (`app/api/upload-free/submit/route.ts:18`).
- Submissions create a Google Drive folder `<email> <timestamp> FREE`, upload the photo, and notify the team via a Handlebars template email (`app/api/upload-free/submit/route.ts:33`).
- Verification endpoint currently returns `exists: false`; integrate with CRM when duplicate prevention is ready (`app/api/upload-free/verify/route.ts:9`).

## Ebook Lead Magnet

- Users must supply both name and valid email; otherwise the request is rejected with `400` (`app/api/ebook/download/route.ts:17`).
- Successful requests trigger `sendEmail` with the `ebook-free` template and use `APP_URL` for link generation (`app/api/ebook/download/route.ts:24`).

## Stripe & Payment Handling

- PaymentIntent amounts expect whole dollars and are converted to cents server-side (`app/api/payment-intent/route.ts:20`).
- Metadata stored on the intent includes `packageType` and `photoCount` for downstream reconciliation (`app/api/payment-intent/route.ts:31`).
- Checkout flow uses `stripe.confirmPayment` with `redirect: 'if_required'`; successful payments without redirect rely on client polling to continue processing (`features/upload-images/stripe-checkout/index.tsx:31`).

## Google Drive Integration

- Service account credentials must be fully populated; missing keys raise configuration errors (`lib/google-drive.ts:4`).
- Folders are shared as "anyone with the link can view" to simplify delivery (`app/api/google-drive/upload/route.ts:64`).
- File uploads stream buffers via Node `Readable` to avoid memory spikes (`lib/google-drive.ts:53`).

## Email Notifications

- SMTP uses Gmail over TLS port 465; missing credentials throw at transporter creation (`lib/email.ts:9`).
- All transactional emails originate from `Retouch Pro <EMAIL_USER>` and target internal recipients or the requesting lead.
- Attachments are sent only in the paid order email, using the raw uploaded files (`app/api/send-order-email/route.ts:71`).

## Data Retention & Cleanup

- IndexedDB is cleared before saving new photos to prevent stale entries (`features/upload-images/context/utils/photo-storage.ts:44`).
- Session storage keys:
  - `retouchPro.pendingUpload` – checkout metadata for in-flight orders.
  - `retouchPro.userData` – persisted contact details between sessions.
- Storage cleanup occurs once uploads finish or if errors force a reset (`features/upload-images/context/index.tsx:404`).
