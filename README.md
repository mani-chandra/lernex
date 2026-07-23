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

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Environment variables

Copy the example file and edit values:

```bash
cp .env.example .env
```

Required for local dev:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection (default matches `docker-compose.yml`) |
| `AUTH_SECRET` | NextAuth secret (`openssl rand -base64 32`) |
| `AUTH_URL` | `http://localhost:3000` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seed admin user (see `prisma/seed.ts`) |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay **test** keys |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as `RAZORPAY_KEY_ID` (public) |
| `RAZORPAY_WEBHOOK_SECRET` | From Razorpay webhook settings |

Optional public copy:

- `NEXT_PUBLIC_OFFICE_ADDRESS`
- `NEXT_PUBLIC_OFFICE_HOURS`

### 4. Database migrate & seed

```bash
npm run db:migrate
npm run db:seed
```

Default admin (override via env before seed): `admin@lernex.local` / `changeme123`

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

## Razorpay

1. Use **Test Mode** in the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Create API keys and set `RAZORPAY_*` env vars.
3. Add a webhook:
   - **Local:** use [ngrok](https://ngrok.com/) or similar → `https://<tunnel>/api/webhooks/razorpay`
   - **Production:** `https://<your-domain>/api/webhooks/razorpay`
4. Subscribe to **`payment.captured`** and set `RAZORPAY_WEBHOOK_SECRET`.

Medical flow: user submits the form → Razorpay Checkout (₹5,000) → server verifies signature + webhook marks application **paid**.

## Deploy (Vercel + Postgres)

1. Push the repo and import the project in Vercel.
2. Add the same environment variables in Vercel project settings.
3. Use Supabase, Neon, or another host for PostgreSQL; set `DATABASE_URL`.
4. Deploy hook / build command runs `prisma generate` (via `npm run build`).
5. After first deploy, run migrations against production:

   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

6. Point Razorpay webhook URL to your production domain.

Set `AUTH_URL` to your production URL (e.g. `https://your-app.vercel.app`).

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/admissions/btech-ai-ml` | Free B.Tech form |
| `/admissions/medical` | Medical form + payment |
| `/admissions/medical/payment/[id]` | Resume pending payment |
| `/admissions/success` | Confirmation / pending payment |
| `/admin/login` | Staff login |
| `/admin` | Dashboard |
| `/admin/medical/[id]` | Applicant detail + counseling |

## API (summary)

- `POST /api/applications/btech`
- `POST /api/applications/medical`
- `POST /api/applications/medical/[id]/payment`
- `POST /api/payments/razorpay/verify`
- `POST /api/webhooks/razorpay`
- Admin (authenticated): `/api/admin/applications/*`, `/api/admin/export/*`
