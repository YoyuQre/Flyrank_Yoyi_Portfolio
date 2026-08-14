# Week 09 — Break Your Own Site: Audit & Hardening Report

**Site:** Mohammed Yahya portfolio — https://myahyaq.netlify.app
**Audit date:** 2026-08-14
**Auditor:** AI-assisted hardening run (me + tools)
**Status after fixes:** All 50 live functional tests pass. Lighthouse: A11y 100, Best Practices 100, SEO 100, Performance 56.

---

## 1. What the site is

- **Stack:** Next.js 16.3.0 (App Router, Turbopack build), React 19.2.8, TypeScript, Tailwind CSS 4, GSAP + Framer Motion, three.js/@react-three-fiber (hero graph).
- **Hosting:** Netlify (`myahyaq.netlify.app`) via `@netlify/plugin-nextjs`, `publish = ".next"`, auto-deploys from `main` (repo `YoyuQre/Flyrank_Yoyi_Portfolio`).
- **Routes:**
  - `/` — one-page portfolio: Hero, About, Skills, Projects, Research, Experience, Services, Contact.
  - `/projects/prediction-market-trader` and `/projects/climachain` — static case studies (SSG).
  - `/api/contact` — contact form POST (Resend email + Supabase persistence, both server-only).
  - `/api/assistant` — portfolio assistant (local token-match retrieval engine).
  - `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/resume.pdf`, custom `/404`.
- **External services:** Resend (email), Supabase (contact storage), Microsoft Clarity (analytics), GitHub/Kaggle/LinkedIn (socials).

## 2. Method

1. Full site map (code read + rendered-DOM inspection).
2. Live functional tests via headless Chrome (Puppeteer-core): 50 checks — load, SEO meta, single-H1, favicon, nav anchors, project routes, back/forward, 404, 7 viewports, mobile menu, 10 contact-form scenarios, assistant chat, external links, console/page/network error counts.
3. Lighthouse (mobile, simulated throttling) before and after fixes.
4. Real-device-style Core Web Vitals measurement (headless Chrome, uncached) for the performance section.
5. GitHub/link verification against live URLs and the GitHub API.
6. Fix → local production build + localhost regression → commit → push → Netlify deploy → live regression.

## 3. Triage table

### FIX-NOW (launch-blocking) — all fixed & deployed

| # | Finding | Evidence | Fix (commit) |
|---|---------|----------|--------------|
| 1 | `og:url`, canonical, `metadataBase`, sitemap, robots all pointed at `https://yahya.ai` — a domain that does **not** serve the portfolio (returns a Cloudflare lander). Social previews/canonical signals pointed at the wrong site. | Rendered HTML showed `og:url=https://yahya.ai`; no canonical; `sitemap.xml` emitted `yahya.ai` URLs. | `src/lib/site.ts` domain → `https://myahyaq.netlify.app`; added `alternates.canonical` in `layout.tsx` and per-project in `projects/[slug]/page.tsx`. Commit `63cb202`. |
| 2 | No `<link rel="canonical">` emitted at all (Next 16 does not auto-add it). | `seo-canonical-present` test failed pre-fix. | Added canonical for `/` and both project pages. Commit `63cb202`. |
| 3 | Both project repo links 404: `github.com/mohammedyahya/prediction-market-trader`, `github.com/mohammedyahya/climachain`. The real account is `YoyuQre` and the real repos are `YoyuQre/prediction-market-trader-advisor` and `YoyuQre/ClimaChain`. | HTTP 404 on the old URLs; GitHub API confirms the `YoyuQre` repos exist. | `links.github`/`links.docs` → correct repos. Commit `63cb202`. |
| 4 | `links.demo` for both projects pointed to the same broken repo URL, and case-study copy claimed live hosted endpoints ("A hosted endpoint…", "The live dashboard is deployed on Vercel") that do **not** exist. | PMT demo is a local CLI (`docs/demo_video_script.md`); ClimaChain's Render deploy workflow uses placeholder hooks (`srv-YOUR_RENDER_SERVICE_ID`); frontend default API is `http://localhost:8001`. | Removed `demo` links; rewrote Demo/Deployment copy to state honestly what exists (local CLI demo / deploy pipeline configured but not public). Commit `63cb202`. |
| 5 | Contact form accepted 2 POSTs on a rapid double-click (race in `handleSubmit`). | Form test T9 pre-fix: 2 requests. | Re-entrancy guard (`submittingRef`) in `src/features/contact-form.tsx`. Post-fix T9: exactly 1 request. Commit `63cb202`. |
| 6 | Contact API returned **500** for syntactically-odd emails like `x@y.z` (server regex was looser than Resend's validator). | Reproduced via direct POST: `x@y.z` → 500, identical message with `probe@test.com` → 200. | Strict TLD regex `^[^\s@]+@[^\s@]+\.[a-z]{2,}$` on client and server. Commit `f157176`. |
| 7 | 5000-char name / 8000-char message passed client validation but were rejected server-side (400) with no client guidance. | Form test T8 pre-fix hit server 400. | Added `maxLength` (name 100, email 254, message 5000) and matching client length checks. Commit `f157176`. |

### Accessibility (fixed — 89 → 100)

| # | Finding | Fix |
|---|---------|-----|
| 1 | Skill chips with no related project used `opacity-50` → effective text contrast 2.32:1 (fails 4.5:1). | Replaced `opacity-50` with `border-dashed` affordance (full-contrast text). |
| 2 | Experience timeline: `<ol>` contained a non-`<li>` element and `<li>`s were wrapped (violates list semantics). | Restructured: decorative line moved out of `<ol>`; `<li>` direct child of `<ol>`, `Reveal` inside `<li>`. |
| 3 | Brand link `aria-label="Yahya AI — back to overview"` did not contain the visible text `YAHYA.AI` (label-content-name mismatch). | `aria-label` now `${site.brand} — back to overview`. |
| 4 | "Live" badge (`text-status` on `bg-status/8`) contrast 2.28:1. | `text-emerald-700 dark:text-emerald-400`. |
| 5 | Assistant hint line `text-muted/70` at 10px: contrast 3.56:1. | Full `text-muted`. |
| 6 | Contact success message used `text-status` (same failing contrast). | `text-emerald-700 dark:text-emerald-400`. |

### KNOWN LIMITATIONS (not fixed — documented honestly)

| # | Limitation | Evidence |
|---|-----------|----------|
| 1 | **Performance score 56.** Simulated TBT 1.85–3.3s, bootup 5.8s, LCP 4.0s simulated. Root cause: large vendor JS (three.js / react-three-fiber hero graph + animation libs) loaded eagerly (~480KB scripts; ~180KB unused). Real-device uncached LCP measured 2.15s, CLS 0. Not a launch blocker, but the biggest remaining optimization target. | Lighthouse + raw Web Vitals capture (see Evidence). |
| 2 | **Not yet indexed in search engines.** A name search surfaces only LinkedIn/unrelated profiles; the portfolio did not appear (deployed recently, no backlinks). | Web search, 2026-08-14. |
| 3 | **LinkedIn returns HTTP 999 to automated requests** (bot protection). The link works for real browsers but could not be verified programmatically — recommend a manual click-through. | Direct request to `linkedin.com/in/mohammed-yahya-…-30557030a`. |
| 4 | Console shows two `THREE` deprecation warnings (`THREE.Clock` → `THREE.Timer`, and an alpha-channel note). Non-blocking. | Browser console on all pages. |
| 5 | **No live hosted demos** for either project. Copy now reflects this honestly instead of claiming live endpoints. | Repo inspection (see Finding 4). |

### IMPROVEMENTS (non-critical, optional)

1. **Defer the 3D hero** — dynamic-import `GraphFieldShell` (`src/features/graph-field-shell.tsx`) so three.js doesn't block TTI; est. saves ~180KB JS + most of TBT/bootup.
2. **Structured data** — add JSON-LD `Person`/`WebSite`/`Project` for richer search results.
3. **Custom domain** — `yahya.ai` is registered but not serving the portfolio; if ownership is available, point DNS at Netlify and update `site.domain` in one place.
4. **Verified email sender** — set `RESEND_FROM_EMAIL` to a verified domain; today it falls back to `onboarding@resend.dev`.
5. **Re-index push** — after a stable domain, submit the sitemap in Google Search Console and add the site to GitHub profile/LinkedIn for discovery.

## 4. Verification & regression

- **Local (pre-deploy):** `next build` clean, `eslint` clean; localhost Lighthouse **A11y 100 / SEO 100**; focused regressions (double-submit, canonical, og:url, edge-case form payloads) all passed.
- **Live (post-deploy, commit `f157176`):** **50/50 automated checks pass** — including `seo-canonical-present`, `seo-og-url-matches-site`, `form-t9-double-submit` (exactly 1 request), `console-errors` (0 unexpected), `page-errors` (0), `failed-requests` (0).
- **Lighthouse (live):** Performance 56 · Accessibility 100 · Best Practices 100 · SEO 100.
- **Real-device vitals (live):** TTFB 340ms, FCP 2152ms, LCP 2152ms, CLS 0, 19 requests, 615KB transfer.

## 5. Evidence checklist

| Item | Location / result |
|------|-------------------|
| Full live test results (50/50) | `w09-tests/w09-results.json` (temp audit workspace) |
| Lighthouse baseline (live, pre-fix) | `w09-tests/w09-lighthouse.json` — Perf 56, A11y 89, BP 100, SEO 100 |
| Lighthouse after a11y fixes (local) | `w09-tests/w09-lighthouse-local2.json` — A11y 100, SEO 100 |
| Lighthouse final (live, post-deploy) | `w09-tests/w09-lighthouse-final.json` — Perf 56, A11y 100, BP 100, SEO 100 |
| Real-device Web Vitals capture | `w09-tests/debug-perf.js` output (TTFB 340 / FCP 2152 / LCP 2152 / CLS 0) |
| API response probes (500 vs 200) | `w09-tests/debug-api.js` output |
| Screenshots — homepage desktop / mobile | `w09-tests/evidence-home-desktop.png`, `evidence-home-mobile.png` |
| Screenshots — case study page / form validation | `w09-tests/evidence-project-page.png`, `evidence-form-validation.png` |

> Note: the temp audit workspace is at `C:\Users\<user>\AppData\Local\Temp\opencode\w09-tests`. Screenshots and JSON can be copied into the report folder if a self-contained evidence bundle is required.

## 6. FlyRank submission (copy-paste)

> For Week 09 "Break Your Own Site", I ran a full adversarial audit of my portfolio (`myahyaq.netlify.app`, Next.js 16 on Netlify) instead of only testing happy paths. I mapped the whole site, then hammered it with 50 automated headless-Chrome checks — load/SEO/meta, navigation, mobile layout across 7 viewports, 404 handling, and 10 contact-form attack scenarios — plus Lighthouse and live Web-Vitals measurement. I found and fixed seven launch blockers: canonical/OG/sitemap URLs pointed at the wrong domain (`yahya.ai`), no canonical link at all, both project repo links 404'd (account is `YoyuQre`, not `mohammedyahya`), demo links claimed live endpoints that don't exist, the contact form double-submitted on rapid clicks, and the contact API 500'd on emails like `x@y.z` or silently mis-handled oversized fields. I also raised accessibility from 89 to 100 (timeline list semantics, skill-chip contrast, accessible names) by fixing the code, not hiding it. Every fix was verified locally, deployed, and re-tested against the live site — all 50 checks now pass, Best Practices and SEO are 100, and the remaining performance gap (56) is documented with measured evidence as a known limitation with concrete next steps.

---

*Report generated 2026-08-14. All scores and test results are measured against the live site unless stated otherwise; no evidence was fabricated.*
