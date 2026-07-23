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
3. Build settings are read from [`vercel.json`](vercel.json):
   - `prisma generate && prisma migrate deploy && next build`

## 4. Environment variables

In **Project → Settings → Environment Variables**, add these for **Production** (and Preview if you want):

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

Deploy once with at least `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL` so the build succeeds.

## 5. Create admin user (once)

After the first successful deploy, run seed **locally** against production DB:

```bash
DATABASE_URL="your-neon-url" ADMIN_EMAIL="..." ADMIN_PASSWORD="..." npm run db:seed
```

Or use Neon SQL console to insert an admin (password must be bcrypt hash).

Default seed (if you use `.env` values): `admin@lernex.local` / `changeme123` — change for production.

## 6. Razorpay webhook (production)

1. Razorpay Dashboard → Webhooks → Add URL:
   `https://your-project.vercel.app/api/webhooks/razorpay`
2. Event: **`payment.captured`**
3. Copy webhook secret → `RAZORPAY_WEBHOOK_SECRET` in Vercel → Redeploy

## 7. Verify

- Public site: `https://your-project.vercel.app`
- Staff login: `https://your-project.vercel.app/admin/login`
- Submit a test B.Tech form → check **Admin → B.Tech** tab

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on `migrate deploy` | Set `DATABASE_URL` in Vercel before deploy; check Neon allows connections |
| Admin login fails | Run `db:seed` with production `DATABASE_URL`; check `AUTH_SECRET` and `AUTH_URL` |
| Payments not marking paid | Set webhook URL + secret; verify route is reachable |
| Session issues | `AUTH_URL` must match your live domain exactly (https) |

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
