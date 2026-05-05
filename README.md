# Kapture Logistics

Freight & Logistics Solutions Powered by Kapture. A production-ready website template — black, white, and Kapture yellow — built on Next.js 14, Tailwind, and Supabase. Ready to ship to Vercel.

> Navigate disruption with confidence by unifying managed transportation and multi-modal capacity in a shared operating layer with Kapture Logistics.

## What's in the box

- **Uber-style interactive hero** — headline-as-CTA with pickup/dropoff/cargo and a *See Prices* button that flows into a full quote desk
- **Bento services grid** with seven service tiles (Managed Transport, Multi-modal, Last-mile, Supply Chain, Customs, Platform, Ocean)
- **Industry solutions grid** (retail, manufacturing, mining, healthcare, agri, tech)
- **Stats bar, logo marquee, four-step "How it works"**
- **Light/dark mode** with system preference + persistent toggle
- **Lead capture** (quote desk + contact form) wired to Supabase + optional Make.com webhook
- **Footer** with five lead-collection columns, all roads back to Kapture
- Pages: `/`, `/services`, `/solutions`, `/about`, `/contact`, `/quote`
- API route: `/api/lead` (validated with Zod, persists to Supabase, fans out to webhook)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom kapture tokens |
| Animations | Framer Motion |
| Icons | Lucide React |
| Theme | next-themes (class-based dark mode) |
| Database | Supabase (free tier) |
| Hosting | Vercel |
| Validation | Zod |

## Quick start

```bash
git clone <your-repo-url> kapture-logistics
cd kapture-logistics
cp .env.local.example .env.local
npm install
npm run dev
```

The site renders fine **without Supabase configured** — lead submissions short-circuit to a soft-success path so previews always work. Wire Supabase before going to production.

## Environment variables

See `.env.local.example` for the full list. Minimum to get leads persisting:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
KAPTURE_LEAD_WEBHOOK_URL=         # optional Make.com / Zapier hook
KAPTURE_LEAD_NOTIFY_EMAIL=        # optional, used by webhook routing
```

## Supabase setup (5 minutes, free)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open *SQL editor*, paste the contents of `supabase/migrations/001_leads.sql`, run it.
3. Open *Project Settings → API*, copy the URL, the anon key, and the service role key into `.env.local`.
4. Done. Any submission to `/api/lead` now writes a row to `public.leads`.

To view leads, use the Supabase Table Editor or wire up the Notion / Klaviyo MCP via Make.com webhook.

## Deploy to Vercel

```bash
# one-liner — assumes you've already run vercel login once
npx vercel --prod
```

Or via the dashboard: push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new), paste in your env vars, ship.

See `DEPLOY.md` for the full GitHub → Vercel + Supabase walk-through.

## Customising the brand

All brand tokens live in `tailwind.config.ts` under `theme.extend.colors.kapture`. Swap the yellow accent (`#FFD400`) or any black/white tone there and the entire site retunes itself.

The Kapture Sun logomark is `src/components/KaptureSun.tsx` and `public/kapture-sun.svg`. It uses `currentColor` so it inherits whichever foreground colour you put it on.

## Project structure

```
src/
├── app/
│   ├── api/lead/route.ts        # POST endpoint for leads
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── quote/page.tsx
│   ├── services/page.tsx
│   ├── solutions/page.tsx
│   ├── layout.tsx               # root layout, fonts, theme provider
│   ├── page.tsx                 # home
│   └── globals.css              # tailwind + custom utilities
├── components/
│   ├── Hero.tsx                 # Uber-style interactive hero
│   ├── BentoServices.tsx
│   ├── SolutionsGrid.tsx
│   ├── HowItWorks.tsx
│   ├── Stats.tsx
│   ├── LogoMarquee.tsx
│   ├── CTA.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── PageHeader.tsx
│   ├── QuoteForm.tsx
│   ├── ContactForm.tsx
│   └── KaptureSun.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
└── ...
supabase/
└── migrations/001_leads.sql     # leads table + indexes + RLS
```

## License

Internal Kapture template. Distribution to clients requires Kapture sign-off.
