# Lernex Admissions Portal

Web application for collecting admission registrations:

- **B.Tech AI/ML** — free online form
- **Medical colleges** — application form + **₹5,000** Razorpay payment, then in-office NEET counseling
- **Admin dashboard** — view applicants, update counseling status, CSV export

## Stack

Next.js (App Router), PostgreSQL, Prisma, NextAuth (admin), Razorpay.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Use a **PostgreSQL** `DATABASE_URL`. Easiest without Docker: create a free database at [Neon](https://neon.tech) and paste the connection string into `.env`.

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret |
| `AUTH_URL` | `http://localhost:3000` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seed admin user |
| `RAZORPAY_*` | Optional until testing payments |

### 3. Database migrate & seed

```bash
npm run db:migrate
npm run db:seed
```

Default admin: `admin@lernex.local` / `changeme123`

### 4. Run the app

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Staff: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Optional local Postgres: `docker compose up -d` (requires Docker) or Homebrew PostgreSQL.

## Deploy on Vercel

**Step-by-step guide:** [docs/VERCEL.md](docs/VERCEL.md)

Summary:

1. Create Neon (or Supabase) Postgres → copy `DATABASE_URL`
2. Import repo on Vercel
3. Set env vars (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, Razorpay, …)
4. Deploy — build runs `prisma migrate deploy` automatically ([`vercel.json`](vercel.json))
5. Run `npm run db:seed` once with production `DATABASE_URL` to create admin

## Razorpay

1. [Razorpay Dashboard](https://dashboard.razorpay.com/) → test/live keys
2. Webhook: `https://<your-domain>/api/webhooks/razorpay` → event **`payment.captured`**
3. Set `RAZORPAY_WEBHOOK_SECRET` on Vercel

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/admissions/btech-ai-ml` | Free B.Tech form |
| `/admissions/medical` | Medical form + payment |
| `/admissions/medical/payment/[id]` | Resume pending payment |
| `/admissions/success` | Confirmation |
| `/admin/login` | Staff login |
| `/admin` | Dashboard |

## API (summary)

- `POST /api/applications/btech`
- `POST /api/applications/medical`
- `POST /api/payments/razorpay/verify`
- `POST /api/webhooks/razorpay`
- Admin: `/api/admin/applications/*`, `/api/admin/export/*`
