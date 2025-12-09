# Deploy N8N no Google Cloud Run

Este guia explica como configurar o deploy automático do N8N no Google Cloud Run usando GitHub Actions.

## Informações do Projeto

- **Nome do projeto:** n8npro
- **ID do projeto:** n8npro-480719
- **Número do projeto:** 648539329334
- **Região:** us-central1

## Configuração do Google Cloud

### 1. Habilitar APIs Necessárias

```bash
gcloud config set project n8npro-480719

# Habilitar APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable iam.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable iamcredentials.googleapis.com
```

### 2. Criar Service Account

```bash
# Criar service account para GitHub Actions
gcloud iam service-accounts create github-actions-deployer \
  --display-name="GitHub Actions Deployer" \
  --project=n8npro-480719

# Dar permissões necessárias
gcloud projects add-iam-policy-binding n8npro-480719 \
  --member="serviceAccount:github-actions-deployer@n8npro-480719.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding n8npro-480719 \
  --member="serviceAccount:github-actions-deployer@n8npro-480719.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding n8npro-480719 \
  --member="serviceAccount:github-actions-deployer@n8npro-480719.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding n8npro-480719 \
  --member="serviceAccount:github-actions-deployer@n8npro-480719.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Configurar Workload Identity Federation

```bash
# Criar Workload Identity Pool
gcloud iam workload-identity-pools create "github-pool" \
  --project="n8npro-480719" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Criar Provider no Pool
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="n8npro-480719" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Permitir que o GitHub acesse a service account
# IMPORTANTE: Substitua SEU_USUARIO_GITHUB e SEU_REPOSITORIO pelos valores corretos
gcloud iam service-accounts add-iam-policy-binding \
  github-actions-deployer@n8npro-480719.iam.gserviceaccount.com \
  --project="n8npro-480719" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/648539329334/locations/global/workloadIdentityPools/github-pool/attribute.repository/SEU_USUARIO_GITHUB/SEU_REPOSITORIO"

# Obter o Workload Identity Provider (salvar para GitHub Secrets)
gcloud iam workload-identity-pools providers describe "github-provider" \
  --project="n8npro-480719" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --format="value(name)"
```

### 4. Criar Secrets no Google Secret Manager

```bash
# Gerar chaves seguras
ENCRYPTION_KEY=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Criar secrets
echo -n "$ENCRYPTION_KEY" | gcloud secrets create N8N_ENCRYPTION_KEY \
  --project=n8npro-480719 \
  --replication-policy="automatic" \
  --data-file=-

echo -n "$JWT_SECRET" | gcloud secrets create N8N_JWT_SECRET \
  --project=n8npro-480719 \
  --replication-policy="automatic" \
  --data-file=-

# IMPORTANTE: Salve essas chaves em um lugar seguro!
echo "N8N_ENCRYPTION_KEY=$ENCRYPTION_KEY"
echo "N8N_USER_MANAGEMENT_JWT_SECRET=$JWT_SECRET"
```

## Configuração do GitHub

### Secrets Necessários

Adicione os seguintes secrets no seu repositório GitHub (Settings > Secrets and variables > Actions):

1. **GCP_WORKLOAD_IDENTITY_PROVIDER**
   - Valor: O output do comando acima (formato: `projects/648539329334/locations/global/workloadIdentityPools/github-pool/providers/github-provider`)

2. **GCP_SERVICE_ACCOUNT**
   - Valor: `github-actions-deployer@n8npro-480719.iam.gserviceaccount.com`

### Como Adicionar Secrets no GitHub

```bash
# Via GitHub CLI (se instalado)
gh secret set GCP_WORKLOAD_IDENTITY_PROVIDER --body "projects/648539329334/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
gh secret set GCP_SERVICE_ACCOUNT --body "github-actions-deployer@n8npro-480719.iam.gserviceaccount.com"
```

Ou manualmente:
1. Acesse: `https://github.com/SEU_USUARIO/SEU_REPOSITORIO/settings/secrets/actions`
2. Clique em "New repository secret"
3. Adicione cada secret

## Deploy

### Deploy Automático

O deploy acontece automaticamente quando:
- Há um push na branch `main`
- Há alterações em `apps/n8n/**`

### Deploy Manual

Via GitHub Actions:
1. Acesse: Actions > Deploy N8N to Google Cloud Run
2. Clique em "Run workflow"

Via linha de comando:
```bash
# No diretório apps/n8n
gcloud run deploy n8n-service \
  --source . \
  --platform managed \
  --region us-central1 \
  --project n8npro-480719 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --timeout 3600
```

## Verificação

Após o deploy:

```bash
# Ver status do serviço
gcloud run services describe n8n-service \
  --platform managed \
  --region us-central1 \
  --project n8npro-480719

# Ver logs
gcloud run logs read n8n-service \
  --region us-central1 \
  --project n8npro-480719 \
  --limit 50

# Ver URL do serviço
gcloud run services describe n8n-service \
  --platform managed \
  --region us-central1 \
  --project n8npro-480719 \
  --format 'value(status.url)'
```

## Troubleshooting

### Erro de Permissões

Se encontrar erros de permissão:
```bash
# Verificar permissões da service account
gcloud projects get-iam-policy n8npro-480719 \
  --flatten="bindings[].members" \
  --filter="bindings.members:github-actions-deployer@n8npro-480719.iam.gserviceaccount.com"
```

### Erro de Build

```bash
# Ver logs de build
gcloud builds list --project n8npro-480719 --limit 5
gcloud builds log BUILD_ID --project n8npro-480719
```

### Secrets não Encontrados

```bash
# Listar secrets
gcloud secrets list --project n8npro-480719

# Ver detalhes de um secret
gcloud secrets describe N8N_ENCRYPTION_KEY --project n8npro-480719
```

## Custos

Cloud Run cobra baseado em:
- Tempo de execução (CPU e memória)
- Número de requisições
- Dados de saída

Com a configuração atual (1 CPU, 1Gi RAM):
- Primeiros 2 milhões de requisições/mês: grátis
- Primeiras 180,000 vCPU-seconds/mês: grátis
- Primeiros 360,000 GiB-seconds/mês: grátis

Para monitorar custos:
```bash
# Ver uso atual
gcloud run services describe n8n-service \
  --platform managed \
  --region us-central1 \
  --project n8npro-480719 \
  --format 'table(metadata.name, status.traffic, status.conditions)'
```

## Próximos Passos

1. ⚠️ **Configurar domínio customizado** (opcional)
2. ⚠️ **Configurar autenticação** (alterar `--allow-unauthenticated` se necessário)
3. ⚠️ **Configurar banco de dados persistente** (PostgreSQL via Cloud SQL)
4. ⚠️ **Configurar backup automático**
5. ⚠️ **Configurar monitoramento e alertas**
