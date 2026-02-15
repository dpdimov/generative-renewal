# Generative Renewal Toolkit

## Project Overview
Next.js app implementing the Diamond Model of Generative Renewal for family enterprises. Four tools: Self-Diagnostic, Coaching (Claude-powered), Text Analysis (Claude-powered), Practice Guide. Neon PostgreSQL for storing diagnostic results.

## Tech Stack
- Next.js 15 (App Router), React 19
- Inline styles + `<style>` tags (no CSS framework)
- Fonts: Newsreader (Google Fonts), earthy palette (#FAF8F5 bg, #2C2C2C text)
- @neondatabase/serverless for database
- Anthropic API for coaching and text analysis

## Current Route Structure
```
/                    → Hub/landing page (app/page.js)
/toolkit             → All four tools with tab nav (app/toolkit/page.js)
/api/chat            → Coaching chat endpoint
/api/analyze         → Text analysis endpoint
/api/saveResults     → Diagnostic score storage
```

## Key Files
- `app/page.js` — Hub page with 2x2 card grid
- `app/toolkit/page.js` — All four tools + shared data (CAPABILITIES, PRACTICES, DYNAMICS)
- `lib/database.js` — Neon DB service
- `lib/database.sql` — Schema reference

## Environment Variables
- `ANTHROPIC_API_KEY` — Claude API
- `POSTGRES_URL` — Neon PostgreSQL (pooled connection)

---

## PENDING PLAN: Split Toolkit into Separate Routes + Admin Page

### Goal
Replace the single `/toolkit` page (tab-switching via React state) with proper Next.js routes, and add an admin page for viewing diagnostic analytics.

### Phase 1: Extract Shared Code

Create `app/toolkit/shared.js` containing:
- `CAPABILITIES` object (all four capabilities with questions, colors, icons)
- `PRACTICES` array (20 practices)
- `DYNAMICS` object (6 dynamics)
- `RATING_LABELS` array
- `COACHING_SYSTEM_PROMPT` string
- Style object `S`
- Shared components: `DiamondVisual`, `CapHdr`
- `callClaude` helper function

### Phase 2: Create Toolkit Layout

Create `app/toolkit/layout.js`:
- Dark header with "← Back to Home" link and title
- Nav bar with 4 tool links using `<Link>` and `usePathname()` for active state
- `{children}` slot for tool content
- This layout persists across tool navigation (no remount)

### Phase 3: Split Tools into Route Files

Move each tool component into its own route:

| Current | New Route | File |
|---------|-----------|------|
| DiagnosticTool | `/toolkit/diagnostic` | `app/toolkit/diagnostic/page.js` |
| CoachingTool | `/toolkit/coaching` | `app/toolkit/coaching/page.js` |
| TextAnalysisTool | `/toolkit/analysis` | `app/toolkit/analysis/page.js` |
| PracticeGuideTool | `/toolkit/practices` | `app/toolkit/practices/page.js` |

Each file imports what it needs from `shared.js`.

### Phase 4: Handle Diagnostic→Coaching State

Use `localStorage` to pass diagnostic scores to coaching:
- Diagnostic: on completion, `localStorage.setItem('diagnosticScores', JSON.stringify(scores))`
- Coaching: on mount, `JSON.parse(localStorage.getItem('diagnosticScores'))` (nullable)
- Simple, no context providers needed

### Phase 5: Update Hub Page Links

Change hub card links from `/toolkit?tool=diagnostic` to `/toolkit/diagnostic`, etc.

### Phase 6: Redirect `/toolkit` → `/toolkit/diagnostic`

Add `app/toolkit/page.js` that redirects to `/toolkit/diagnostic` (or shows a brief interstitial).

### Phase 7: Admin Page for Diagnostic Results

Create `app/admin/page.js`:
- Password-protected (simple password check via env var `ADMIN_PASSWORD`)
- Navigate to it via a subtle footer link on the hub page
- Displays:
  - Total number of completed diagnostics
  - Average scores per capability (bar chart or simple table)
  - Score distribution over time (if enough data)
  - Recent individual results (table with scores, timestamp, truncated user agent)
- API route: `app/api/admin/results/route.js` — fetches from `diagnostic_results` table
- Add `getAnalytics()` and `getRecentResults()` to `lib/database.js`

### Files to Create/Modify

**New files:**
- `app/toolkit/shared.js`
- `app/toolkit/layout.js`
- `app/toolkit/diagnostic/page.js`
- `app/toolkit/coaching/page.js`
- `app/toolkit/analysis/page.js`
- `app/toolkit/practices/page.js`
- `app/admin/page.js`
- `app/api/admin/results/route.js`

**Modified files:**
- `app/page.js` — update card links, add footer with admin link
- `lib/database.js` — add query functions for analytics
- `app/toolkit/page.js` — becomes redirect (or delete)

### Implementation Order
1. Extract shared code (Phase 1)
2. Create layout (Phase 2)
3. Split tools (Phase 3)
4. localStorage for scores (Phase 4)
5. Update hub links (Phase 5)
6. Handle /toolkit redirect (Phase 6)
7. Admin page + API (Phase 7)
8. Test all navigation flows, verify DB saves still work
