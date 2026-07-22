# Manual QA Checklist

## Desktop (≥1024px)

- [ ] Sidebar visible and all nav links work
- [ ] Dashboard loads with progress cards and continue-learning CTA
- [ ] Learn path shows all 6 subjects in order
- [ ] SQL lesson opens with all sections, notes, bookmark, mark complete
- [ ] SQL Playground runs queries (⌘/Ctrl+Enter)
- [ ] Practice exercise validates answers
- [ ] Library filters work
- [ ] Search returns results with 2+ characters
- [ ] Settings: theme switch, export/import backup
- [ ] Keyboard: Tab through nav, visible focus rings
- [ ] Skip-to-content link works

## Tablet (768–1023px)

- [ ] Sidebar collapses; hamburger opens overlay
- [ ] Touch targets ≥44px
- [ ] Two-column grids collapse appropriately
- [ ] SQL results table scrolls horizontally

## Phone (<768px)

- [ ] Bottom mobile nav visible and highlights active route
- [ ] Single-column lesson layout
- [ ] Search and form inputs full width
- [ ] Dialogs fit viewport
- [ ] No hover-only interactions

## Accessibility

- [ ] Light and dark mode readable (contrast)
- [ ] Reduced motion preference respected
- [ ] Form controls have labels
- [ ] Dialogs trap focus appropriately
- [ ] Screen reader: landmarks (main, nav)

## Offline / PWA

- [ ] Build with `npm run build && npm run preview`
- [ ] App shell loads offline after first visit
- [ ] Offline banner appears when network disabled

## Data

- [ ] Complete lesson → appears on dashboard activity
- [ ] Bookmark → appears on dashboard
- [ ] Export backup → valid JSON
- [ ] Import backup → restores progress
- [ ] Reset subject → clears subject progress only

## SQL Engine

- [ ] sql.js loads only on SQL routes (not dashboard first paint)
- [ ] Syntax errors display clearly
- [ ] CSV download works
- [ ] Reset database reloads sample data
