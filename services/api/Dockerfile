# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy root package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY services/api/package.json ./services/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy Prisma schema
COPY services/api/prisma ./services/api/prisma/

# Generate Prisma Client
RUN cd services/api && pnpm prisma generate

# Copy source code
COPY . .

# Build
RUN pnpm --filter @muon/api build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY services/api/package.json ./services/api/
COPY apps/web/package.json ./apps/web/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built files from builder
COPY --from=builder /app/services/api/dist ./services/api/dist
COPY --from=builder /app/services/api/node_modules/.prisma ./services/api/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy Prisma schema for migrations
COPY services/api/prisma ./services/api/prisma/

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"]