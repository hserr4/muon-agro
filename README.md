# 🌾 Muon Agro - ERP Inteligente SaaS

Sistema completo de gestão agropecuária com multi-tenancy, IA e monetização integrada.

## 🚀 Stack Tecnológica

| Camada | Tecnologia |
|--------|--------------|
| **Frontend** | Next.js 14, TailwindCSS, ShadCN UI |
| **Backend** | NestJS, Prisma ORM, PostgreSQL |
| **Cache** | Redis |
| **Infra** | Docker, Coolify, Oracle Cloud (OCI) |
| **Monorepo** | TurboRepo, pnpm |

## 📂 Estrutura do Projeto

```
/
├── apps/
│   ├── web/          # Frontend Next.js
│   └── mobile/       # Mobile Expo (pendente)
├── services/
│   ├── api/         # Backend NestJS
│   ├── calculation-engine/ # Lógica pura
│   └── ai-engine/   # Integração IA (stub)
├── packages/
│   ├── types/       # Tipos compartilhados
│   ├── ui/          # Componentes UI
│   └── utils/       # Utilitários
├── docker-compose.yml
└── turbo.json
```

## 🚀 Deploy no Coolify (OCI)

### 1. Pré-requisitos no OCI
- Instância Oracle Cloud (Ubuntu/Debian)
- Docker instalado
- Coolify instalado (`curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`)

### 2. Configurar Projeto no Coolify
1. Acesse o painel do Coolify
2. Clique em "New Project" → "Public Repository"
3. Cole a URL: `https://github.com/seu-usuario/muon-agro`
4. Selecione o branch: `main`

### 3. Configurar Services no Coolify

#### PostgreSQL Service:
- **Service Name:** `postgresql-database-c13ggi19xnfx09thpuycsjyn`
- Coolify irá gerar a string de conexão automaticamente

#### Redis Service:
- **Service Name:** `redis-database-rrwmyqsrhl15uhc2wl0v4112`
- Coolify irá gerar a URL automaticamente

### 4. Configurar Environment Variables

No Coolify (Service: `api`), adicione:

```env
# Database (Coolify auto-generates this)
DATABASE_URL=postgresql://postgres@postgresql-database-c13ggi19xnfx09thpuycsjyn:5432/postgres

# Redis (Coolify auto-generates this)
REDIS_URL=redis://default@redis-database-rrwmyqsrhl15uhc2wl0v4112:6379/0
REDIS_HOST=redis-database-rrwmyqsrhl15uhc2wl0v4112
REDIS_PORT=6379

# Security
JWT_SECRET=sua_chave_jwt_super_secreta_mude_isso

# Stripe (opcional para testes)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CORS
CORS_ORIGIN=https://seu-dominio.coolify.io

# Node
NODE_ENV=production
PORT=3001
```

Para o serviço **`web`** (Frontend):

```env
NEXT_PUBLIC_API_URL=https://seu-api.coolify.io
NODE_ENV=production
```

### 5. Configurar Docker Compose

O Coolify detectará automaticamente o `docker-compose.yml`.
Certifique-se de que os volumes persistentes estão configurados:
- `postgres_data` (PostgreSQL)
- `redis_data` (Redis)

### 6. Deploy
Clique em "Deploy".
O Coolify irá:
1. Fazer pull do repositório
2. Buildar as imagens Docker (multi-stage)
3. Executar `start.sh` (que roda as migrations)
4. Iniciar os containers com health checks

## 🛠️ Desenvolvimento Local

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar ambiente
cp services/api/.env.example services/api/.env
# Edite o .env com suas credenciais

# 3. Gerar Prisma Client
cd services/api && pnpm prisma generate

# 4. Rodar migrations
pnpm prisma migrate dev

# 5. Iniciar tudo
pnpm dev
```

Acesse:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Swagger Docs:** http://localhost:3001/api/docs

## 🔐 Segurança e Produção

✅ **Implementado:**
- RBAC (4 níveis: ADMIN, MANAGER, OPERATOR, VIEWER)
- Rate Limiting (login: 5 req/min via Redis)
- Helmet Security Headers (CSP, HSTS)
- JWT com refresh tokens
- Sanitização de dados sensíveis
- Audit Logging completo
- Multi-tenancy isolado (tenant_id)

## 💳 Monetização (SaaS)

O sistema possui 3 planos:
- **Básico** (R$ 199/mês) - 500 animais
- **Profissional** (R$ 499/mês) - 2.000 animais + IA
- **Enterprise** (R$ 999/mês) - Ilimitado + White Label

Integração com Stripe pronta. Basta configurar as chaves no Coolify.

## 📊 Módulos Disponíveis

1. **Pecuária** - Animais, Lotes, Pesagem, GMD
2. **Agricultura** - Talhões, Plantio, Colheita
3. **Financeiro** - Fluxo de Caixa, DRE
4. **Estoque** - Insumos, Rações, Medicamentos
5. **RH** - Funcionários, Tarefas
6. **Manutenção** - Máquinas, Preventiva/Corretiva
7. **Dashboard** - KPIs, Gráficos, Alertas

## 🚨 Observabilidade

- Health Check: `/health`
- Liveness: `/health/live`
- Readiness: `/health/ready`
- Audit Logs: Tabela `AuditLog`
- Redis: Integrado e monitorado

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento
pnpm build        # Build produção
pnpm lint         # Linting
pnpm test         # Testes
pnpm prisma:generate  # Gerar Prisma Client
pnpm prisma:migrate  # Migrations
```

## 📦 Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp services/api/.env.example services/api/.env
```

Veja o arquivo `services/api/.env.example` para todas as variáveis disponíveis.

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Proprietária - Todos os direitos reservados.

---

**Desenvolvido para o setor Agropecuário**  
Sistema ERP Agro Inteligente © 2024