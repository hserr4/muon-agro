# SPEC.md - ERP Agro Inteligente

## 1. Project Overview

**Project Name:** Muon Agro  
**Type:** SaaS Multi-tenant ERP for Agriculture & Livestock Management  
**Core Functionality:** Data-driven farm management with automation, AI insights, and real-time dashboards  
**Target Users:** Farm owners, rural managers, agronomists

## 2. Architecture

### 2.1 Monorepo Structure
```
/apps
  /web        - Next.js 14 (App Router)
  /mobile    - Expo (React Native)
/services
  /api       - NestJS + Prisma
  /calculation-engine - Pure business logic
  /ai-engine - AI integration (Gemini/Minimax)
/packages
  /types     - Shared TypeScript definitions
  /ui        - ShadCN UI components
  /utils     - Shared utilities
```

### 2.2 Multi-tenancy
- Tenant isolation via `tenant_id` in all tables
- JWT-based authentication with tenant claim
- Middleware enforces tenant context

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Web Frontend | Next.js 14, TailwindCSS, ShadCN UI, Zustand, React Query |
| Mobile | Expo, React Native, offline-first |
| Backend | Node.js, NestJS, Prisma ORM |
| Database | PostgreSQL |
| Calculation | Pure TypeScript (no AI) |
| AI | Gemini API + Minimax |
| Infra | Docker, Coolify/OCI, Redis |

## 4. Modules

### 4.1 Pecuária (Livestock)
- Animal registration (QR Code)
- Lots management
- Weight tracking
- GMD calculation
- Movements

### 4.2 Agricultura (Agriculture)
- Fields (Talhões)
- Planting/Harvesting
- Inputs management
- Productivity tracking

### 4.3 Financeiro
- Cash flow (Fluxo de caixa)
- Income statement (DRE)
- Cost per activity

### 4.4 Estoque (Stock)
- Inputs, feed, medications

### 4.5 RH
- Employees, costs, tasks

### 4.6 Manutenção
- Machines, preventive/corrective

## 5. Calculation Engine Functions

```typescript
custoPorArroba(totalCost: number, arrobas: number): number
ganhoMedioDiario(startWeight, endWeight, days): number
taxaLotacao(animals, maxCapacity): number
pontoEquilibrio(fixedCost, contributionMargin): number
viabilidadeLote(expectedRevenue, expectedCost): boolean
```

## 6. Branding

- **Primary Colors:** Dark Green (#1a472a), Black (#0a0a0a), Gold (#d4af37)
- **Style:** Premium, technological, modern agro
- **Tone:** Authority + simplicity

## 7. Monetization

- Monthly subscription model
- Plans: Basic, Professional, Enterprise
- Integration: Stripe / Mercado Pago
- Auto-block on failed payment

## 8. Acceptance Criteria

- [ ] Multi-tenant isolation working
- [ ] Authentication with JWT
- [ ] CRUD for Animals, Lots, Fields
- [ ] Dashboard with KPIs
- [ ] Calculation engine functions working
- [ ] Landing page with CTA
- [ ] Docker deployment ready
- [ ] CI/CD pipeline configured