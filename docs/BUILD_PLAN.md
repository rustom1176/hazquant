# HazQuant Build Plan

## Target
- Source: https://app.hazcalc.com (HAZcalc)
- New product: HazQuant (independent implementation)

## Observed routes (from shipped bundles)
- Auth: /login, /register, /register/step2-5, /password/reset, /password/reset/:token, /email/verify, /training-register, /trainer/invite
- Account: /my-account, /my-account/edit, /my-account/password, /my-company/edit, /payment, /referrals
- Core: /dashboard (inferred), /projects CRUD, /areas CRUD, /substances CRUD, /assessments CRUD+export, /assessment-lists CRUD+export, /reports CRUD+report
- Admin: /admin/companies, subscriptions, users, coupons, help-fields, recent-updates, referrals
- Users: /users CRUD

## Phases
1. Environment scaffold + repo baseline
2. DB schema + migrations + seed
3. Auth (credentials, reset, verify, role guards)
4. Core layout/design system
5. Landing/home + marketing shell
6. Dashboard
7. Substances/areas/projects
8. Assessments + exports
9. Reports + assessment lists
10. Admin/billing/referrals/users
11. Integrations/secrets (stop only for required keys)
12. Error sweep, security sweep, tests
13. Final merge/release

## Security notes
- Scan all external deps/code before use.
- No copied source; original implementation.
- All secrets via env; no hardcoded credentials.
