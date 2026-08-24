# Powering House

Personal portfolio + blog for Gachoka Kang'ata, with built-in community management:
moderated comments on posts and newsletter/email capture.

**Stack:** Next.js 14 (App Router, TypeScript) · Prisma + PostgreSQL (Neon) · NextAuth
(single-admin credentials login) · deployed to Vercel.

## One-time setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a database.** Sign up at [neon.tech](https://neon.tech) (free tier), create a
   project, and copy both connection strings it gives you (pooled + direct).

3. **Copy the env file** and fill it in:
   ```bash
   cp .env.example .env.local
   ```
   - `DATABASE_URL` / `DIRECT_URL` — from Neon.
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`.
   - `NEXTAUTH_URL` — `http://localhost:3000` for local dev.
   - `ADMIN_EMAIL` — the email you'll log into `/admin` with.
   - `ADMIN_PASSWORD_HASH` — generate with:
     ```bash
     npm run hash:password -- "your-chosen-password"
     ```
     and paste the printed hash in.
   - `RESEND_API_KEY` / `RESEND_FROM_EMAIL` — optional. Leave blank and the
     "Notify subscribers" button in the admin just stays disabled; comment capture
     and the subscriber list/export work either way.

4. **Run migrations and seed some sample content:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **(Re-)generate the site's image crops** if you ever replace `Gachoka.jpg`:
   ```bash
   npm run generate:images
   ```

6. **Run it:**
   ```bash
   npm run dev
   ```
   Homepage at `http://localhost:3000`, blog at `/blog`, admin at `/admin/login`.

## How the content model works

- Every post has a `category`: **Business Design**, **Money Discipline**, or
  **Growth Systems** — the same three cards on the homepage. The counts on those
  cards are live, pulled from published posts.
- Posts are written as Markdown in the admin editor (`/admin/posts/new`), with a
  live preview toggle. A post is only visible on the public site once you check
  **Published**.

## Community management

- **Comments:** anyone can comment on a published post. Every comment starts
  hidden (`pending`) and only appears publicly after you approve it from
  `/admin/comments`. You can also revoke/delete an already-approved comment.
- **Newsletter:** the "Join the room" form on the homepage captures an email into
  the subscriber list. View/export the list from `/admin/subscribers`
  ("Export CSV"). If `RESEND_API_KEY` is set, you can also click
  **Notify subscribers** on a published post's edit page to email everyone a
  short blurb + link (sent via BCC so subscribers never see each other's
  addresses).

## Deploying

Works on either Vercel or Netlify — both auto-detect Next.js.

1. Push this repo to GitHub (already configured to push to
   `github.com/zacq/PoweringHouse.git`).
2. Create a Vercel or Netlify project and import the repo.
3. Add every variable from `.env.example` as an environment variable in that
   project's settings (production + preview/branch deploys).
   - **If your database is Netlify's built-in "Neon" extension**, it already
     sets `NETLIFY_DATABASE_URL` / `NETLIFY_DATABASE_URL_UNPOOLED` for you —
     you don't need to add `DATABASE_URL`/`DIRECT_URL` yourself;
     `scripts/resolve-db-env.cjs` maps them automatically at build time.
   - If your database is Neon directly (or any other Postgres host), set
     `DATABASE_URL` and `DIRECT_URL` yourself.
4. Deploy. The build runs `resolve-db-env.cjs`, then
   `prisma generate && prisma migrate deploy && next build`, so the DB
   connection is normalized and schema migrations apply automatically on
   every deploy.

### Troubleshooting: `Environment variable not found: DIRECT_URL`

This means neither `DATABASE_URL`/`DIRECT_URL` nor the Netlify Neon
extension's variables were visible to the build. Check:
- The database extension/integration is actually connected to *this* site
  (Site settings → Extensions, or → Environment variables) and not just to
  your Netlify account in general.
- If you're on Vercel or using Neon directly, that `DATABASE_URL` and
  `DIRECT_URL` are set as environment variables on the project.
- The variables are enabled for the deploy context you're building in
  (production vs. deploy previews can have different variable sets).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Generate Prisma client, apply migrations, build for production |
| `npm run db:migrate` | Create/apply a new local migration |
| `npm run db:deploy` | Apply pending migrations (used in production builds) |
| `npm run db:seed` | Seed sample posts, comments, subscribers |
| `npm run hash:password -- "pw"` | Print a bcrypt hash for `ADMIN_PASSWORD_HASH` |
| `npm run generate:images` | Rebuild `public/images/*` crops from `Gachoka.jpg` |
