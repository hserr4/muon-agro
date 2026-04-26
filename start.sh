#!/bin/sh

set -e

echo "🚀 Starting Muon Agro API..."

# Check if we're in Coolify environment
if [ -n "$COOLIFY" ]; then
    echo "☁️ Running in Coolify environment"
fi

# Wait for PostgreSQL (using Coolify service name or env var)
echo "⏳ Waiting for PostgreSQL..."
DATABASE_HOST=$(echo $DATABASE_URL | sed -e 's/.*@\(.*\):.*/\1/')
if [ -z "$DATABASE_HOST" ]; then
    DATABASE_HOST="postgresql-database-c13ggi19xnfx09thpuycsjyn"
fi

while ! nc -z $DATABASE_HOST 5432; do
  sleep 1
done
echo "✅ PostgreSQL is ready"

# Wait for Redis (using Coolify service name or env var)
echo "⏳ Waiting for Redis..."
REDIS_HOST=$(echo $REDIS_URL | sed -e 's|redis://.*@\(.*\):.*|\1|')
if [ -z "$REDIS_HOST" ]; then
    REDIS_HOST="redis-database-rrwmyqsrhl15uhc2wl0v4112"
fi

while ! nc -z $REDIS_HOST 6379; do
  sleep 1
done
echo "✅ Redis is ready"

# Run Prisma Migrations (production-safe)
echo "🛠️ Running database migrations..."
cd /app
npx prisma migrate deploy
echo "✅ Migrations applied"

# Start the application
echo "🚀 Starting application..."
exec node services/api/dist/main.js