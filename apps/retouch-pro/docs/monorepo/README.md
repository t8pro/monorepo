# Monorepo Integration

## Shared Tooling

- **TypeScript**: `tsconfig.json` extends `@t8pro/typescript-config/nextjs.json`, aligning compiler flags across apps. Custom paths (`@/*`, `@/components/*`, `@/features/*`) simplify cross-folder imports.
- **ESLint**: `eslint.config.mjs` pulls in `@t8pro/eslint-config` so lint rules stay consistent in the monorepo.
- **Design System**: `@t8pro/design-system` supplies base typography, components, and global CSS vars. Global styles are imported once in `app/layout.tsx`.

## Package Management

- This app expects to be installed via the workspace root (e.g. `pnpm install` at monorepo top-level). The `node_modules` here is dehydrated by the root package manager.
- Local packages referenced with `"*"` (design system, lint config, TS config) resolve to sibling workspaces. Keep their versions in sync during releases.

## Cross-App Considerations

- Shared assets or utilities should live in top-level packages (`@t8pro/...`). Treat `lib/` within this app as app-specific; promote only when another app needs the same helper.
- When updating shared configs, verify that other apps still compile and lint—CI should run workspace-wide checks.

## Deployment & Environment

- Environment variables are scoped by app; ensure deployment tooling injects the credentials listed in `docs/integrations/overview.md`.
- Root scripts (`pnpm dev --filter @t8pro/retouch-pro`, etc.) will respect Turbo/Next caching across the monorepo.

## Extending the App

- New shared UI should be contributed to `@t8pro/design-system` to keep branding consistent.
- For feature-specific components, continue using the local `features/` structure; only promote once reuse is proven.
- Document newly introduced shared contracts in both this folder and the relevant package README to keep monorepo contributors aligned.
