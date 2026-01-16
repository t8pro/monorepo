# API Endpoints

All endpoints live under `app/api/<scope>/route.ts` and run on the Next.js App Router server runtime. Unless noted, responses are JSON.

## Payments & Uploads

| Route                      | Method | Purpose                                                 | Body Shape                                                                                                                                                                      | Notes                                                                                   |
| -------------------------- | ------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `/api/payment-intent`      | POST   | Create a Stripe PaymentIntent for the paid upload flow. | JSON `{ amount: number; currency: string; packageType: string; photoCount: number }`                                                                                            | Returns `{ clientSecret }`. Requires `STRIPE_SECRET_KEY`.                               |
| `/api/upload-single-photo` | POST   | Process a single paid photo after payment.              | `FormData` fields `paymentIntentId`, `packageType`, `photoIndex`, `totalPhotos`, `photoId`, `photoName`, `photoType`, `photoSize`, `photoWidth`, `photoHeight`, `photo` (File). | Currently simulates processing; extend to persist assets.                               |
| `/api/upload-photos`       | POST   | (Legacy) Batch-processing endpoint for paid uploads.    | Sequential `FormData` entries `photo_<n>` and metadata keys.                                                                                                                    | Placeholder implementation—new flow uploads sequentially per photo.                     |
| `/api/send-order-email`    | POST   | Send internal notification email post-upload.           | `FormData` with user info, pricing, optional `folderLink`, and photo attachments.                                                                                               | Relies on SMTP creds (`EMAIL_USER`, `EMAIL_PASS`).                                      |

## Free Upload Funnel

| Route                     | Method | Purpose                                           | Body Shape                                                    | Notes                                                                                   |
| ------------------------- | ------ | ------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `/api/upload-free/verify` | POST   | Check eligibility for the free retouch offer.     | JSON `{ email: string }`                                      | Currently stubbed (`exists: false`); replace with CRM lookup when available.            |
| `/api/upload-free/submit` | POST   | Accept one free photo upload and notify the team. | `FormData` with `name`, `email`, `phone`, `company`, `photo`. | Emails the team using Handlebars template. |

## Marketing

| Route                 | Method | Purpose                              | Body Shape                             | Notes                                                               |
| --------------------- | ------ | ------------------------------------ | -------------------------------------- | ------------------------------------------------------------------- |
| `/api/ebook/download` | POST   | Send the marketing e-book to a lead. | JSON `{ name: string; email: string }` | Validates email, then emails Handlebars template using `sendEmail`. |

## Error Handling Conventions

- Missing fields → `400` with `{ error | message }` details.
- Integration or transport failures → `500` with generic message, plus server-side logging.
- Successful responses return `success: true` when applicable to ease client handling.
