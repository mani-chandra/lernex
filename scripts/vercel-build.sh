#!/usr/bin/env bash
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ]; then
  echo ""
  echo "ERROR: DATABASE_URL is not set."
  echo ""
  echo "Add it in Vercel → Project → Settings → Environment Variables"
  echo "(Production, Preview, and Development), then redeploy."
  echo ""
  echo "Use a PostgreSQL URL from Neon (https://neon.tech) or Supabase."
  echo "See docs/VERCEL.md in this repo."
  echo ""
  exit 1
fi

npx prisma generate
npx prisma migrate deploy
npx next build
