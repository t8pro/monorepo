# Retouch Pro Documentation

Use this index to navigate the project knowledge base.

## Guides

- [Architecture Overview](architecture/overview.md) – Stack summary, app shell, routing, and server utilities.
- [Code Organization & Responsibilities](architecture/code-organization.md) – Directory roles, file conventions, and best practices for adding features.
- [Library Inventory](libs/README.md) – Runtime and dev dependencies with primary usage points.
- [API Endpoints](requests/api-endpoints.md) – Expected payloads and behaviors for every `/api/*` route.
- [External Integrations](integrations/overview.md) – Stripe, Google Drive, email delivery, and client-side tooling flows.
- [Monorepo Integration](monorepo/README.md) – How this app consumes shared configs, packages, and deployment tooling.
- [Business Rules](business/rules.md) – Pricing tiers, upload limits, validation rules, and notification flows.
- [Business Plan](business/plan.md) – Vision, personas, user stories with acceptance criteria, and release roadmap.

## Quick Start

- Install dependencies from the monorepo root (`pnpm install`) to ensure local workspaces resolve.
- Provide the environment variables listed in [External Integrations](integrations/overview.md) before exercising upload or email flows.
- Run `pnpm dev --filter @t8pro/retouch-pro` from the workspace root to launch the development server.

## Updating Docs

- Keep this index synced when new guides are added.
- Add sections to the most specific guide available (e.g. new API route → `requests/api-endpoints.md`).
