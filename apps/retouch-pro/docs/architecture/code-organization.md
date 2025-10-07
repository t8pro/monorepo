# Code Organization & Responsibilities

## Directory Roles

- `app/` – route segments, layouts, server handlers (`app/api`), and email templates.
- `components/` – visual building blocks shared across features (stateless or minimal state).
- `features/` – vertical slices that bundle UI, hooks, state, and styles for a specific journey.
- `lib/` – server-side helpers, integrations, and utilities.
- `public/` – static assets served verbatim by Next.js.

## File Naming Convention

- `index.tsx` – primary component export for the folder.
- `types.ts` – TypeScript interfaces/enums for the feature or component.
- `constants.ts` – static configuration (copy, pricing tables, enumerations).
- `hooks.ts` / `utils.ts` – encapsulated logic or reusable effects.
- `styles.module.scss` – scoped styles for the component/feature.
- Additional helpers (e.g. reducers, storage helpers) live in subfolders such as `context/utils/`.

## Client vs Server

- Client components are flagged with `'use client'` at the top (e.g. interactive feature entries, contexts, Stripe checkout).
- Server modules (API routes & templates) omit the directive and can access environment variables directly.
- When in doubt, keep business logic that depends on secrets or Node APIs inside `app/api` or `lib/`.

## State Management

- Global UI state is minimal; the upload pipeline uses `PhotoProvider` (React Context + reducer) to manage photos, upload progress, and payment orchestration.
- React Query handles async mutations (ebook downloads, free upload verification/submission, paid upload orchestration) to centralise loading/error handling.

## Styling Practices

- Each component imports its own SCSS module to avoid selector collisions.
- Design tokens and reset styles come from `@t8pro/design-system/styles`.
- Keep layout logic in SCSS modules; component files should focus on structure and behaviour.

## Adding New Functionality

1. Create a feature directory (`features/new-feature`) with the standard file set.
2. Expose the entry component via `index.tsx` and import it from the relevant route/page.
3. Place shared UI in `components/` if multiple features will reuse it.
4. For server-side work, add an API route under `app/api/<domain>/route.ts` and share helpers via `lib/`.
5. Update documentation and environment variable requirements when new integrations are introduced.
