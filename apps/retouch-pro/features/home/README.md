# Home Feature

Landing page composites for the Retouch Pro marketing experience. Each subfolder owns a section rendered on `app/page.tsx`.

## Structure

- `hero/` – interactive dropzone that lets visitors select photos and jump into the paid upload flow (`useHero` pipes validated files into `PhotoProvider` and routes to `/upload`).
- `before-after/` – gallery presentation comparing original and retouched images (`constants.ts` drives the card data).
- `ebook/` – lead magnet CTA with React Query mutation to request the e-book via `/api/ebook/download`.

Shared conventions:

- `index.tsx` exports the visual component.
- `styles.module.scss` contains scoped styles aligned with the design system.
- Additional helpers (`hooks.ts`, `utils.ts`, `types.ts`) keep logic clear of JSX.

## Key Behaviours

- Drag-and-drop in the hero validates up to 24 images, enforces file type/size limits (10 MB, JPEG/PNG/WebP), and auto-launches the upload experience.
- Ebook CTA fires a mutation that uses `react-toastify` feedback for success/error.
- Section IDs (`#before-after`) sync with navigation links in the header for smooth scrolling.

## Extending

- Add new homepage sections by creating a folder here, following the same file layout, and wiring the component into `app/page.tsx`.
- Share stateful logic through hooks/utilities instead of embedding it in JSX so sections stay composable.
