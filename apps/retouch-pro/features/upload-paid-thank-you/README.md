# Upload Paid Thank You

Post-checkout confirmation shown at `app/upload/thank-you/page.tsx`. Reinforces order status and attempts to resume any pending uploads.

## Structure

- `index.tsx` – thank-you messaging, order summary, and upload-resume logic.
- `styles.module.scss` – responsive layout and card styling.

## Key Behaviours

- Reads `retouchPro.pendingUpload` from session storage and rebuilds photo metadata via IndexedDB to show order details.
- Presents status messaging (`uploading`, `success`, `error`) while background uploads continue; errors surface user-facing guidance.
- Highlights SLA expectations and support contact information.

## Extending

- Hook real upload-resumption calls into the `uploadPhotos` placeholder to complete the automation.
- Update `infoCards` and CTA links to reflect new service commitments or support channels.
