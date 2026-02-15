# Generative Renewal Toolkit

## Project Overview
Next.js app implementing the Diamond Model of Generative Renewal for family enterprises. Four tools: Self-Diagnostic, Coaching (Claude-powered), Text Analysis (Claude-powered), Practice Guide. Neon PostgreSQL for storing diagnostic results. Password-protected admin dashboard for analytics.

## Tech Stack
- Next.js 15 (App Router), React 19
- Inline styles + `<style>` tags (no CSS framework)
- Fonts: Newsreader (Google Fonts), earthy palette (#FAF8F5 bg, #2C2C2C text)
- @neondatabase/serverless for database
- Anthropic API for coaching and text analysis

## Route Structure
```
/                        → Hub/landing page (app/page.js)
/toolkit                 → Redirects to /toolkit/diagnostic
/toolkit/diagnostic      → Self-Diagnostic tool (app/toolkit/diagnostic/page.js)
/toolkit/coaching        → Coaching tool (app/toolkit/coaching/page.js)
/toolkit/analysis        → Text Analysis tool (app/toolkit/analysis/page.js)
/toolkit/practices       → Practice Guide tool (app/toolkit/practices/page.js)
/admin                   → Admin dashboard, password-protected (app/admin/page.js)
/api/chat                → Coaching chat endpoint
/api/analyze             → Text analysis endpoint
/api/saveResults         → Diagnostic score storage
/api/admin/results       → Admin analytics endpoint (POST with password)
```

## Key Files
- `app/page.js` — Hub page with 2x2 card grid, admin footer link
- `app/toolkit/shared.js` — All shared data (CAPABILITIES, PRACTICES, DYNAMICS), styles (S), components (DiamondVisual, CapHdr), callClaude helper
- `app/toolkit/layout.js` — Toolkit layout with header, nav bar (persists across tool routes)
- `app/toolkit/diagnostic/page.js` — Self-Diagnostic tool (saves scores to localStorage + DB)
- `app/toolkit/coaching/page.js` — Coaching tool (reads scores from localStorage)
- `app/toolkit/analysis/page.js` — Text Analysis tool
- `app/toolkit/practices/page.js` — Practice Guide tool
- `app/admin/page.js` — Admin dashboard with analytics + recent results table
- `lib/database.js` — Neon DB service (saveDiagnosticResult, getAnalytics, getRecentResults)
- `lib/database.sql` — Schema reference

## State Passing: Diagnostic → Coaching
Uses `localStorage.setItem('diagnosticScores', JSON.stringify(scores))` on diagnostic completion. Coaching reads it on mount. No context providers needed.

## Environment Variables
- `ANTHROPIC_API_KEY` — Claude API
- `POSTGRES_URL` — Neon PostgreSQL (pooled connection)
- `ADMIN_PASSWORD` — Password for admin dashboard
