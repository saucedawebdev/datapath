# QA Review Report

**Date:** 2026-07-22  
**Reviewer:** Automated + manual code review  
**App version:** 0.1.0

## Test Results

| Suite | Result |
|-------|--------|
| Unit tests (`npm test`) | **24/24 passed** |
| E2E QA (`npm run test:e2e`) | **11/11 passed** |
| Content validation | **Passed** (6 subjects, 8 lessons, 6 references) |
| Production build (`npm run build`) | **Passed** |

## E2E Coverage

- Dashboard load without console errors
- Desktop sidebar navigation (all primary sections)
- Mobile bottom navigation (390×844)
- Tablet sidebar toggle (800×1024)
- Keyboard skip link → main content focus
- Light/dark theme persistence
- Lesson completion → IndexedDB → reload
- Bookmarks and notes persistence
- Backup export → clear DB → import → progress restored
- SQL workspace query execution
- Global search results

## Bugs Found and Fixed

| Issue | Severity | Fix |
|-------|----------|-----|
| SQL workspace crashed (`initSqlJs is not a function`) | **Critical** | Fixed Vite/sql.js interop; WASM loaded via `?url` import; `Module` export fallback |
| Route auto-focus skipped skip link in tab order | **High** | Removed `#main-content` auto-focus on route change; skip link handler focuses main |
| PWA update banner stole first Tab focus in dev | **Medium** | Banner mounted only when update available; PWA registration prod-only |
| Lesson bookmark/complete used full page reload | **Low** | Uses `refreshCurrentRoute()` instead |
| Settings display name XSS vector | **Medium** | `escapeHtml()` on attribute value |
| Dialog title/message XSS vector | **Medium** | `escapeHtml()` in `showDialog` |
| Router matched wrong route for nested paths | **Medium** | Longest-route-first matching |
| Invalid routes silently showed dashboard | **Low** | Registered `404` route |
| Library practice link noop `.replace` | **Low** | Direct hash assignment |
| Broken tablet CSS media query | **High** | Restored `@media (max-width: 1023px)` block |
| Duplicate shell DOM append | **High** | Removed duplicate layout mount |

## Known Limitations (Not Bugs)

- Non-SQL lessons show coming-soon pages (by design, Stage 2+)
- Python/Excel/Statistics playgrounds are documented stubs
- Project milestone tracking UI not yet implemented
- Achievements not auto-awarded on events
- Timed practice mode not implemented
- No query result diff for exercise expected-output comparison (column structure only)
- PWA offline lesson caching limited to app shell in dev; full offline in production build
- Google Fonts require network on first load

## Architectural Notes

- Storage abstraction ready for cloud backend replacement
- Content validation runs in CI via `npm run validate:content`
- Heavy engines lazy-loaded (sql.js only on SQL routes)

## Recommended Next QA Pass

After Stage 2 SQL expansion: add E2E for practice validation, quiz submission, and CSV export.
