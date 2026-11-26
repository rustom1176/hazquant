# HazQuant

HazQuant is an independent, world-class hazard quantification and compliance workspace. It is inspired by hazmat assessment workflows and built as an original implementation.

## Status
🔨 In Progress — active phased build on `develop`.

## Current capabilities
- Public landing page
- Auth: register, sign in, password reset request/confirm (credentials)
- Protected app shell with sign out
- Org-scoped CRUD foundations: projects, areas, substances
- Assessments: list/create/detail
- Reports: list/create
- Prisma/Postgres schema + seed script

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth (credentials)
- ESLint + TypeScript checks

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   ```
3. Start Postgres (optional local docker):
   ```bash
   docker compose up -d
   ```
4. Generate Prisma client and push schema:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```
5. Run dev server:
   ```bash
   npm run dev
   ```

## Quality checks
```bash
npm run lint
npm run typecheck
```

## Security notes
- No secrets committed; use `.env`.
- Passwords hashed with bcrypt.
- Password reset tokens are hashed, expiring, and one-time use.
- App data queries scoped by organization membership.
- External code/packages should be scanned before adoption.

## Repo
Public: https://github.com/rustom1176/hazquant
