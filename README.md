# PanoVeya — Website (Level 1)

**Experience Every Space Before You Arrive.**

PanoVeya is an Indian startup creating immersive 360° virtual tours for businesses and building a
nationwide network of professional 360° photographers. This repository is the Level 1 marketing and
lead-generation website: it explains the services, demonstrates a genuine 360° viewer, and collects
business enquiries and photographer applications.

## What's included

- **Homepage** — hero, interactive 360° demo (real panoramas, drag/touch/zoom, hotspots), services
  with honest availability labels, industries, how it works, benefits, photographer network,
  pricing tiers ("Request a Quote"), concept-demo portfolio, FAQ and final CTA.
- **Landing pages** — `/services`, `/services/360-virtual-tours`, `/services/google-maps-virtual-tours`,
  `/services/3d-virtual-tours`, `/industries` plus six industry pages, `/photographer-network`,
  `/about`, `/contact`, `/insights` with three original articles, `/privacy`, `/terms`.
- **Two lead forms** — business enquiry and photographer application, validated on client and server
  (Zod), with honeypot + timing spam traps, best-effort rate limiting, duplicate-submission
  protection, and email delivery through Resend. Success is only shown after delivery succeeds.
- **SEO / GEO** — per-page titles, descriptions and canonicals, Open Graph + Twitter cards, generated
  OG image, `sitemap.xml`, `robots.txt`, web manifest, icons, JSON-LD (Organization, WebSite,
  Service, BreadcrumbList, Article), breadcrumbs, real HTTP 404s, and `/llms.txt`.

## Tech stack

Next.js 16 (App Router, Cache Components, TypeScript) · React 19 · Tailwind CSS 4 ·
shadcn/ui-style primitives (cva + tailwind-merge) · Lucide icons · next/image · Zod ·
React Hook Form · Photo Sphere Viewer 5 (three.js) · Resend · Vercel.

## Prerequisites

- **Node.js 20.9 or newer** (Node 22 LTS recommended) — <https://nodejs.org>
- **npm** (comes with Node)
- **Git** — <https://git-scm.com>
- A **GitHub** account and a **Vercel** account (free tiers are fine)
- A **Resend** account and a domain you can add DNS records to (for lead emails)

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local        # macOS / Linux / Git Bash
copy .env.example .env.local      # Windows Command Prompt / PowerShell

# 3. Start the development server
npm run dev
```

Open <http://localhost:3000>. The forms work without email credentials but will show a clear
"not connected yet" message and will **not** send anything until Resend is configured.

## Commands

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Start the development server with hot reload             |
| `npm run lint`      | Run ESLint                                               |
| `npm run typecheck` | Generate route types and run the TypeScript compiler     |
| `npm run build`     | Create an optimised production build                     |
| `npm run start`     | Serve the production build locally (after `build`)       |
| `npm run check`     | Lint + typecheck + build in one go (run before pushing)  |

## Environment variables

See `.env.example` for the full annotated list.

| Variable                 | Required          | Purpose                                                              |
| ------------------------ | ----------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | Yes in production | Canonical domain, e.g. `https://www.panoveya.com` (no trailing `/`)  |
| `RESEND_API_KEY`         | For forms         | Server-only Resend API key                                           |
| `LEAD_NOTIFICATION_FROM` | For forms         | Sender on your verified domain, e.g. `PanoVeya Leads <leads@…>`      |
| `LEAD_NOTIFICATION_TO`   | For forms         | Recipient(s) for new leads, comma-separated                          |

Secrets are only read on the server (`src/lib/leads/*` imports `server-only`) and are never sent to
the browser. `.env*` files are git-ignored except `.env.example`.

## Project structure

```
src/
  app/                    Routes (App Router)
    api/enquiry/          POST endpoint for business enquiries
    api/photographer-application/
    services/[slug]/      Service landing pages (from content/services.ts)
    industries/[slug]/    Industry landing pages (from content/industries.ts)
    insights/[slug]/      Articles (from content/insights.ts)
    llms.txt/             Generated plain-text summary for AI tools
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg apple-icon.tsx
  components/
    layout/               Header, mobile nav, footer, logo, page hero + breadcrumbs
    home/                 Homepage sections
    panorama/             360° viewer (loaded on demand), fallback, events
    forms/                Form fields, submission hook, success/error states, both forms
    ui/                   Button, Badge, SectionHeading
    seo/                  JSON-LD renderer
  content/                ALL site copy and data — edit here, not in components
    site.ts               Company name, URL, contact details, social links (central settings)
    services.ts industries.ts insights.ts faqs.ts pricing.ts portfolio.ts panoramas.ts
    route-slugs.ts        Valid slugs for dynamic routes (used for real 404s)
  lib/
    forms/                Zod schemas + select options (shared client/server)
    leads/                Email delivery, spam/rate-limit guards, shared request handler
    seo.ts                Metadata + JSON-LD builders
  proxy.ts                Returns HTTP 404 for unknown service/industry/article slugs
public/panoramas/         Equirectangular 360° images used by the viewer
src/assets/images/        Still images (optimised by next/image)
```

## Configure real contact information

Edit **`src/content/site.ts`**. Every value set to `null` is a deliberate placeholder — the site shows
"to be published" text rather than inventing details:

```ts
contact: {
  email: "hello@yourdomain.com",
  phone: "+91 98xxx xxxxx",
  whatsapp: "9198xxxxxxxx",      // international format, no "+"
  address: null,                  // add only if verified; keep null otherwise
  ...
},
social: [
  { label: "Instagram", href: "https://instagram.com/yourhandle" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/yourcompany" },
  ...
],
legalName: "PanoVeya Technologies Pvt. Ltd.",  // once registered
twitterHandle: "@yourhandle",
```

These values flow automatically into the header, footer, contact page, form fallbacks, privacy page,
Organization JSON-LD and `llms.txt`. A `LocalBusiness` schema is intentionally **not** included —
add one only once a verified business address exists.

## Connect the email provider (Resend)

1. Create an account at <https://resend.com>.
2. **Domains → Add Domain** (e.g. `panoveya.com`) and add the DNS records Resend shows at your
   domain registrar. Wait until the domain shows **Verified**.
3. **API Keys → Create API Key** with "Sending access". Copy it (starts with `re_`).
4. Set `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM` (an address on the verified domain) and
   `LEAD_NOTIFICATION_TO` in `.env.local` locally and in Vercel for Production (and Preview if wanted).
5. Restart `npm run dev` / redeploy, submit a test enquiry, and confirm the email arrives. Replying
   to the notification email replies directly to the person who submitted the form.

To add a CRM, database or webhook later, extend `deliverLead()` in `src/lib/leads/deliver.ts`; the
forms and API routes don't need to change.

## Add portfolio projects

Edit **`src/content/portfolio.ts`**:

1. Put the image in `src/assets/images/` and import it at the top of the file.
2. Add an entry with `kind: "client-project"`, plus `client`, `location`, and either `panoramaId`
   (to open a scene in the on-page viewer) or `tourUrl` (link to the hosted tour).
3. Only publish client work with the client's written permission. Remove or keep the
   `concept-demo` samples as you prefer — they're always labelled "Concept Demo".

### Add or replace 360° scenes

1. Export a 2:1 **equirectangular** JPEG (e.g. 4096×2048 or 6000×3000, ideally < 1.5 MB) into
   `public/panoramas/`.
2. Add a still preview to `src/assets/images/` and an entry in `src/content/panoramas.ts`
   (yaw/pitch are degrees; 0/0 is the centre of the image, positive yaw = right, positive pitch = up).
3. Never list ordinary photos as panoramas. If the list is empty, the site shows a fallback.

### Add a service, industry or article

Add an entry to `services.ts`, `industries.ts` or `insights.ts` **and** add its slug to
`src/content/route-slugs.ts`. Pages, internal links, the sitemap and `llms.txt` update automatically.

## GitHub setup

```bash
git init
git add .
git commit -m "PanoVeya website — Level 1"
git branch -M main
# Create an empty repository on github.com first (no README/licence), then:
git remote add origin https://github.com/<your-username>/panoveya.git
git push -u origin main
```

Before every push: `npm run check`.

## Deploy to Vercel

1. Sign in at <https://vercel.com> with GitHub → **Add New… → Project** → import `panoveya`.
2. Framework preset: **Next.js** (auto-detected). Leave build/output settings at their defaults.
3. Add environment variables (**Settings → Environment Variables**): `NEXT_PUBLIC_SITE_URL`,
   `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO`.
4. Click **Deploy**. Each later push to `main` deploys to production; other branches get preview URLs
   (previews are automatically marked `noindex` via `robots.txt`).

## Custom domain & canonical URL

1. In Vercel: **Project → Settings → Domains → Add** `panoveya.com` and `www.panoveya.com`.
2. Add the DNS records Vercel shows at your registrar. Pick one primary host (e.g. `www`) and let
   Vercel redirect the other to it.
3. Set `NEXT_PUBLIC_SITE_URL` to exactly that primary origin (e.g. `https://www.panoveya.com`) and
   **redeploy** — canonical tags, Open Graph URLs, the sitemap and structured data use it.

## After launch: verify and submit the sitemap

- Visit `/`, `/contact`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` and a made-up URL (should 404).
- Submit a test enquiry and photographer application; confirm both emails arrive.
- Check link previews with a social sharing debugger and run PageSpeed Insights on mobile.
- **Google Search Console** → add a Domain property → verify via DNS → *Sitemaps* → submit
  `https://<your-domain>/sitemap.xml`. Optionally do the same in **Bing Webmaster Tools**.
- Validate structured data with Google's Rich Results Test / schema.org validator.

## Notes and limitations

- Sample imagery is **CC0 from Poly Haven** (credited on the About page and footer). It is labelled
  "Concept Demo" / "Illustrative image" everywhere and does not represent client work.
- Fonts (Inter, Sora — SIL Open Font License) are self-hosted from `src/app/fonts`.
- Rate limiting is in-memory per server instance (best-effort on serverless). For stronger
  protection add a shared store (e.g. Upstash Redis) or Cloudflare Turnstile.
- Privacy policy and terms are launch drafts — have them reviewed by a qualified lawyer.
- `llms.txt` is an optional, emerging convention; it doesn't guarantee visibility in AI tools.
- Out of scope for Level 1: authentication, dashboards, payments, a database-backed marketplace,
  AI tour generation and booking agents. The content/lead layers are separated so these can be
  added later without rewriting the site.
