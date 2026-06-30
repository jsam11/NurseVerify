# Deployment Notes

## Vercel environment variables

Set the following environment variable in Vercel for Production, Preview, and Development:

- `DATABASE_URL`: Postgres connection string for Vercel Postgres, Neon, or another Postgres-compatible database.

Do not commit database credentials. The app reads `DATABASE_URL` through Prisma at runtime.

## Database setup

After `DATABASE_URL` is set, run:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

The seed script loads the fictional records from `data/seed-records.ts` into Postgres.
