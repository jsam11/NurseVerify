# Deployment Notes

## Vercel environment variables

Set the following environment variable in Vercel for Production, Preview, and Development:

- `DATABASE_URL`: Postgres connection string for Vercel Postgres, Neon, or another Postgres-compatible database.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for the selected Clerk application.
- `CLERK_SECRET_KEY`: Clerk secret key for the selected Clerk application.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `/sign-up`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`: `/dashboard`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`: `/dashboard`

Do not commit database credentials. The app reads `DATABASE_URL` through Prisma at runtime.
Do not commit Clerk secrets. The app reads Clerk keys from environment variables.

## Database setup

After `DATABASE_URL` is set, run:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

The seed script loads the fictional records from `data/seed-records.ts` into Postgres.

## Clerk setup

Create a Clerk application from the Clerk web dashboard.

Recommended dashboard settings:

- Authentication: enable Email address as a sign-in identifier.
- User sign-up: allow email/password or email verification links, depending on the workflow you prefer.
- Application URLs:
  - Sign-in URL: `/sign-in`
  - Sign-up URL: `/sign-up`
  - After sign-in URL: `/dashboard`
  - After sign-up URL: `/dashboard`
- Allowed redirect URLs:
  - Local development: `http://localhost:3000/*`
  - Production: `https://nurseverify.io/*`
  - Vercel preview: add the preview domain pattern shown in your Vercel project.

The dashboard and `POST /api/search` require an authenticated Clerk session.
