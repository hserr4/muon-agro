# Build stage for API
FROM node:20-alpine AS api-builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY services/api/package.json ./services/api/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --no-frozen-lockfile

COPY services/api/prisma ./services/api/prisma/
RUN cd services/api && pnpm prisma generate

COPY . .

RUN pnpm --filter @muon/api build

# Production stage for API
FROM node:20-alpine AS api-production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-workspace.yaml turbo.json ./
COPY services/api/package.json ./services/api/
COPY apps/web/package.json ./apps/web/

RUN pnpm install --prod --no-frozen-lockfile

COPY --from=api-builder /app/services/api/dist ./services/api/dist
COPY --from=api-builder /app/services/api/node_modules/.prisma ./services/api/node_modules/.prisma
COPY --from=api-builder /app/node_modules/@prisma ./node_modules/@prisma
COPY services/api/prisma ./services/api/prisma/
COPY start.sh ./

RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]