# Hexbit — Marketing Site

Multilingual marketing site for **Hexbit Pte. Ltd.** (Singapore) — a programmatic liquidity / market-making firm covering crypto spot, perps/futures, options, and prediction markets across CEX & DEX venues.

> 多语言机构展示站，支持英文、简体中文、繁体中文、日语、韩语五种语言。

---

## Stack

- **Static HTML** — single-page React app, no build step required
- **React 18** + inline JSX (transpiled in-browser via Babel Standalone)
- **Lucide** for iconography
- **Custom design system** — dark institutional palette (Bloomberg × Linear)

```
index.html         Entry point + script loading
app.jsx            Top-level routing + LangContext provider
shell.jsx          Nav (with language switcher) + Footer
page-home.jsx      Home: hero, metrics, what-we-do, markets, why-hexbit
pages-sub.jsx      Services / Technology / About / Careers / Contact
i18n.js            Translation strings (en / zh-CN / zh-TW / ja / ko)
site.css           Global styles + design tokens
assets/            Logo, hex pattern, brand SVGs
```

---

## Local development

No `npm install` needed. Any static file server works:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Open <http://localhost:8000>.

> ⚠️ Don't open `index.html` via `file://` — browsers block module/script loading from the filesystem. You need a real HTTP server.

---

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub
2. Import at <https://vercel.com/new>
3. **Framework Preset**: `Other`
4. Click Deploy

`vercel.json` already configures:
- SPA fallback rewrites (so `/services`, `/about`, etc. all resolve to `index.html`)
- Long-cache headers for `/assets/*`
- Short-cache for HTML

### Custom domain (hexbit.com)

In Vercel → **Settings → Domains**, add `hexbit.com` and `www.hexbit.com`. Either:

- Switch your registrar's nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, or
- Add `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` at your DNS provider.

SSL is provisioned automatically by Vercel.

### AWS S3 + CloudFront

If you prefer AWS, you need **S3 + CloudFront + ACM + Route 53** (S3 alone doesn't support custom-domain HTTPS). Key points:

- ACM certificate **must be in `us-east-1`** for CloudFront
- Use **Origin Access Control (OAC)**, keep the bucket private
- Add CloudFront error responses: `403 → /index.html (200)` and `404 → /index.html (200)` for SPA routing

---

## Production hardening (TODO)

This site currently transpiles JSX in the browser via Babel Standalone (~3MB) — fine for prototypes, **not ideal for production**. Recommended next steps before high-traffic launch:

- [ ] Pre-compile `.jsx` → `.js` with esbuild or Vite
- [ ] Drop `@babel/standalone` script tag from `index.html`
- [ ] Add Open Graph / Twitter card meta tags
- [ ] Wire the contact form to a real backend (currently mocked, returns a fake reference number)
- [ ] Add analytics (Plausible / Umami / GA4)
- [ ] Add `robots.txt` and `sitemap.xml`

---

## Internationalization

All copy lives in `i18n.js` as a flat key → string map per locale. To add a string:

1. Add the English version under `en` first (it's the fallback)
2. Translate into `zh-CN`, `zh-TW`, `ja`, `ko`
3. Reference it in any component via `t('your.key')` from `LangContext`

Locale persists to `localStorage` and is exposed via the language switcher in the nav.

---

## License

© Hexbit Pte. Ltd. All rights reserved.
