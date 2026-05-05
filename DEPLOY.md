# Ship Kapture Logistics — GitHub + Vercel + Supabase

This is the path from this folder on your laptop to a live URL.

## 1 — Initialise the repo

```bash
cd "/Users/macstore/Documents/Claude/Projects/Kaptire Website Templates/kapture-logistics"
git init
git add .
git commit -m "feat: kapture logistics v1"
```

## 2 — Push to GitHub

Create an empty repo at [github.com/new](https://github.com/new). Don't add README or .gitignore — they exist already. Then:

```bash
git remote add origin git@github.com:<your-handle>/kapture-logistics.git
git branch -M main
git push -u origin main
```

If you prefer GitHub CLI:

```bash
gh repo create kapture-logistics --public --source=. --remote=origin --push
```

## 3 — Stand up Supabase (5 minutes, free)

1. Go to [supabase.com](https://supabase.com), create a project (free tier).
2. *SQL editor → New query*, paste `supabase/migrations/001_leads.sql`, run.
3. *Project Settings → API*. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

## 4 — Ship to Vercel

The clean path:

1. Go to [vercel.com/new](https://vercel.com/new).
2. *Import Git Repository* → pick `kapture-logistics`.
3. Framework: Next.js (auto-detected).
4. Add environment variables (paste from Supabase + your defaults):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
   SUPABASE_SERVICE_ROLE_KEY=eyJh...
   NEXT_PUBLIC_SITE_URL=https://kapture-logistics.vercel.app
   NEXT_PUBLIC_BRAND_NAME=Kapture Logistics
   NEXT_PUBLIC_PARENT_BRAND_NAME=Kapture
   NEXT_PUBLIC_PARENT_BRAND_URL=https://thekapture.com
   KAPTURE_LEAD_NOTIFY_EMAIL=hello@thekapture.com
   ```

5. Deploy.

CLI alternative (after `vercel login`):

```bash
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel --prod
```

## 5 — Custom domain

In Vercel: *Project → Settings → Domains*. Point `logistics.thekapture.com` (or whatever) at the project. Vercel handles SSL.

## 6 — Wire Make.com (optional)

If you want every lead to fan out to Notion + Klaviyo + email automatically:

1. Make.com → new scenario, trigger: *Webhook → Custom webhook*.
2. Copy the webhook URL.
3. Set `KAPTURE_LEAD_WEBHOOK_URL` in Vercel env.
4. In Make, route the JSON to: Gmail (notify), Notion (CRM row), Klaviyo (audience add).

The lead API hits Supabase first, then fires the webhook — so you keep one source of truth (Supabase) and fan out from there.

## 7 — Smoke test

After deploy:

1. Visit the live URL.
2. Submit the hero quote form with junk values.
3. Check Supabase *Table Editor → leads* — you should see the row.
4. Toggle dark mode in the navbar — it should persist on refresh.

If steps 1-3 work, you have shipped a logistics platform.
