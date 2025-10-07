# Retouch Pro App

Next.js 15 application that powers the Retouch Pro marketing site, paid upload checkout, and free trial funnel. This package lives inside the monorepo and reuses the shared T8 design system, linting, and TypeScript configs.

## Objetivo

Este app foi construído para ajudar restaurantes a melhorarem as fotos dos seus produtos, entregando edições profissionais que aumentam o apelo visual para clientes avaliando o cardápio. Não é uma solução de IA: conectamos o usuário a editores reais que aprimoram cada imagem manualmente.

### Jornada paga

- Na home, o visitante pode anexar fotos e é encaminhado para a página de upload com as imagens escolhidas.
- Após informar quantidade e dados de contato, o pagamento é realizado via Stripe. As fotos ficam salvas no IndexedDB para suportar redirecionamentos (ex.: Amazon Pay) e são restauradas quando o checkout confirma sucesso.
- Com o pagamento aprovado, as imagens são enviadas ao backend, que usa a API do Google Drive para armazená-las. Em seguida, um e-mail é disparado para `contact@t8pro.us` com o link da pasta, arquivos enviados e dados do cliente.
- A home ainda apresenta planos, download do e-book gratuito e o rodapé de navegação; a página de upload repete a tabela de preços e o rodapé para consistência.

### Jornada gratuita

- Na área de planos existe a opção “Teste grátis”. O cliente acessa a página dedicada, anexa uma única foto e informa nome, e-mail, telefone e empresa.
- A foto segue para o Google Drive e um e-mail automático é enviado para `contact@t8pro.us` com a imagem e os dados informados, permitindo que o time execute a retouch gratuita.

## Project Highlights

- App Router + React 19 with server/client component mix.
- Stripe-powered checkout for multi-tier photo retouch packages.
- Google Drive service-account uploads for asset delivery.
- Nodemailer + Handlebars transactional emails for both leads and internal ops.
- Shared design tokens and components via `@t8pro/design-system`.

## Getting Started

```bash
# From the monorepo root
yarn install

# Launch the Retouch Pro app in dev mode
yarn dev:rp

# Run linting and type checks
yarn lint --filter @t8pro/retouch-pro
yarn check-types --filter @t8pro/retouch-pro
```

> **Node**: requires version >= 18 (see `package.json` in the monorepo root).

## Environment Variables

Create an `.env.local` in this directory (or configure via workspace tooling) with the following keys:

| Domain       | Variables                                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stripe       | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`                                                                                                              |
| Email        | `EMAIL_USER`, `EMAIL_PASS`                                                                                                                                             |
| Google Drive | `GCP_PROJECT_ID`, `GCP_PRIVATE_KEY_ID`, `GCP_PRIVATE_KEY`, `GCP_CLIENT_EMAIL`, `GCP_CLIENT_ID`, `GCP_CLIENT_X509_CERT_URL`, `GOOGLE_DRIVE_PARENT_FOLDER_ID` (optional) |
| App Metadata | `APP_URL` (used in email templates)                                                                                                                                    |

Refer to the docs below for integration specifics and error handling expectations.

## Documentation

- `docs/README.md` – index of all developer guides.
- `docs/architecture/overview.md` – stack and routing walkthrough.
- `docs/architecture/code-organization.md` – how features, components, and libs are structured.
- `docs/libs/README.md` – dependency inventory and usage notes.
- `docs/requests/api-endpoints.md` – server handlers, payloads, and response formats.
- `docs/integrations/overview.md` – Stripe, Drive, email, and caching flows.
- `docs/business/rules.md` – pricing tiers, upload limits, validation rules, and notification paths.
- `docs/monorepo/README.md` – how this app plugs into shared tooling.

## Scripts

| Command                                        | Purpose                                     |
| ---------------------------------------------- | ------------------------------------------- |
| `yarn dev:rp`                                  | Run `next dev` via Turbo for this app only. |
| `yarn build:rp`                                | Production build pipeline (`next build`).   |
| `yarn lint --filter @t8pro/retouch-pro`        | Apply shared lint rules.                    |
| `yarn check-types --filter @t8pro/retouch-pro` | TypeScript `--noEmit` check.                |

## Contributing

1. Follow the conventions in `docs/architecture/code-organization.md` when adding features.
2. Update `docs/business/rules.md` for any change that affects pricing, limits, or validation.
3. Coordinate shared component or token updates through the `@t8pro/design-system` package.
