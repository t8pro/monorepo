# Upload-Free Feature

Implements the one-photo free trial funnel rendered at `app/upload-free/page.tsx`.

## Structure

- `index.tsx` – form UI, dropzone, and preview logic wired for accessibility.
- `hooks.ts` – `useUploadFree` encapsulates state, validation, drag-drop, compression, and React Query mutations.
- `types.ts` – form state and submission payload interfaces.
- `styles.module.scss` – scoped styling for the layout and dropzone.

## Key Behaviours

- Validates required fields (name, email, phone, company) and enforces a single image upload capped at 10 MB.
- Compresses images client-side to a 2 MB target using `browser-image-compression` before sending to `/api/upload-free/submit`.
- Uses React Query to:
  - verify eligibility (`/api/upload-free/verify`, currently stubbed), and
  - submit the form (`/api/upload-free/submit`) with toast feedback on success/failure.
- Drag-and-drop plus keyboard activation feed into the same handler; removing the photo clears preview state.

## Extending

- Update validation rules inside `useUploadFree` when onboarding new required fields or changing limits.
- Integrate the verify mutation with CRM/DB checks by replacing the stubbed endpoint.
- Keep new side effects inside the hook so the component stays presentation-focused.
