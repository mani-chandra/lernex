# Deploy Lernex on Vercel

This app needs **PostgreSQL** on Vercel (SQLite is not used in production). The build runs `prisma migrate deploy` to apply migrations.

## 1. Create a PostgreSQL database (Neon)

1. Sign up at [neon.tech](https://neon.tech) and create a project.
2. Copy the **connection string** (use the pooled URL if offered, or the direct URL).
3. It should look like:
   `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

Use the **same** `DATABASE_URL` for local development if you do not run Docker Postgres.

## 2. Push code to GitHub

Ensure the repo is on GitHub (or GitLab/Bitbucket connected to Vercel).

## 3. Import project in Vercel

1. [vercel.com/new](https://vercel.com/new) → Import your repository.
2. Framework preset: **Next.js** (auto-detected).

### Add environment variables **before** the first deploy

The build **will fail** until `DATABASE_URL` is set (PostgreSQL).

In **Project → Settings → Environment Variables**, add at least:

| Variable | Environments | Value |
|----------|--------------|--------|
| `DATABASE_URL` | Production, Preview, Development | Neon connection string |
| `AUTH_SECRET` | Production, Preview, Development | `openssl rand -base64 32` |
| `AUTH_URL` | Production | `https://YOUR-PROJECT.vercel.app` |

For **Preview** deployments, set `AUTH_URL` to your preview URL pattern or primary production URL.

Optional: install the [Neon Vercel integration](https://neon.tech/docs/guides/vercel) — it can attach `DATABASE_URL` automatically.

3. **Redeploy** after saving env vars (Deployments → … → Redeploy).

Build command ([`scripts/vercel-build.sh`](../scripts/vercel-build.sh)): `prisma generate` → `prisma migrate deploy` → `next build`.

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Neon/Supabase Postgres connection string |
| `AUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `AUTH_URL` | Yes | `https://your-project.vercel.app` (no trailing slash) |
| `ADMIN_EMAIL` | For seed | e.g. `admin@yourcompany.com` |
| `ADMIN_PASSWORD` | For seed | Strong password; used only when running seed |
| `RAZORPAY_KEY_ID` | For payments | Live or test keys |
| `RAZORPAY_KEY_SECRET` | For payments | Server-only |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | For payments | Same as `RAZORPAY_KEY_ID` |
| `RAZORPAY_WEBHOOK_SECRET` | For payments | From Razorpay webhook setup |
| `NEXT_PUBLIC_OFFICE_ADDRESS` | Optional | Shown on site |
| `NEXT_PUBLIC_OFFICE_HOURS` | Optional | Shown on site |

## 4. Create admin user (once)

After the first successful deploy, run seed **locally** against production DB:

```bash
DATABASE_URL="your-neon-url" ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npm run db:seed
```

Or use Neon SQL console to insert an admin (password must be bcrypt hash).

Change the default seed credentials before production.

## 5. Razorpay webhook (production)

1. Razorpay Dashboard → Webhooks → Add URL:
   `https://your-project.vercel.app/api/webhooks/razorpay`
2. Event: **`payment.captured`**
3. Copy webhook secret → `RAZORPAY_WEBHOOK_SECRET` in Vercel → Redeploy

## 6. Verify

- Public site: `https://your-project.vercel.app`
- Staff login: `https://your-project.vercel.app/admin/login`
- Submit a test B.Tech form → check **Admin → B.Tech** tab

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails: `Environment variable not found: DATABASE_URL` | Add `DATABASE_URL` in Vercel env vars for all environments, then **Redeploy** |
| Build fails on `migrate deploy` | Check Neon URL and `?sslmode=require` |
| Admin login fails | Run `db:seed` with production `DATABASE_URL`; check `AUTH_SECRET` and `AUTH_URL` |
| Payments not marking paid | Set webhook URL + secret; verify route is reachable |
| Session issues | `AUTH_URL` must match your live domain exactly (https) |
| Deploy blocked: Edge middleware over 1 MB | This project protects `/admin` via server layouts, not Edge middleware |

## Local development (same as production DB optional)

```bash
cp .env.example .env
# Paste Neon DATABASE_URL
npm install
npm run db:migrate   # or rely on migrate deploy after first deploy
npm run db:seed
npm run dev
```

Docker Postgres is optional via [`docker-compose.yml`](docker-compose.yml) if you prefer local DB.
