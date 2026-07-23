# DATApath Polish QA Checklist

Manual verification checklist for the final polish pass. Check items only after performing the test.

## Desktop

- [ ] Dashboard loads with continue-learning card as primary action
- [ ] First visit shows welcome onboarding (3 steps); skip dismisses permanently
- [ ] Settings → Show welcome guide reopens onboarding
- [ ] All six subject cards render with distinct descriptors
- [ ] Lesson pages use readable prose width and callout sections
- [ ] Interview question reveal works with keyboard
- [ ] Projects list shows status and deliverable type
- [ ] Search highlights matches and shows helpful empty state

## Tablet (768px–1024px)

- [ ] Dashboard grid reflows without horizontal overflow
- [ ] Continue-learning card stacks actions below content
- [ ] Lesson navigation buttons remain tappable
- [ ] Welcome modal fits viewport with scroll

## Mobile (320px–430px)

- [ ] Bottom navigation respects safe-area insets
- [ ] Touch targets ≥ 44px on primary controls
- [ ] Code blocks scroll horizontally
- [ ] Notes textarea usable with virtual keyboard
- [ ] No sticky elements consume excessive height

## Keyboard

- [ ] Tab reaches sidebar, cards, lesson nav, modals
- [ ] Welcome modal traps focus; Escape closes
- [ ] Search results navigable with arrow keys
- [ ] Quiz options selectable with keyboard
- [ ] Visible focus ring in light and dark themes

## Screen reader basics

- [ ] One h1 per page
- [ ] Icon-only controls have accessible names
- [ ] Quiz feedback announced via live region
- [ ] Progress bars expose aria-valuenow

## Reduced motion

- [ ] prefers-reduced-motion disables nonessential transitions
- [ ] Settings “Reduce motion” applies data-reduced-motion
- [ ] Completion celebration skipped or minimal when reduced

## Light and dark themes

- [ ] Callouts readable in both themes
- [ ] Muted text meets contrast on cards
- [ ] Subject accents visible but not overwhelming

## Lesson completion

- [ ] Mark complete persists after reload
- [ ] Celebration shows once per milestone (not every revisit)
- [ ] Continue card updates to next lesson

## Quiz completion

- [ ] Submit shows correct/incorrect explanations
- [ ] Scoring unchanged from prior release
- [ ] Feedback remains on screen until user continues

## Notes

- [ ] Autosave shows Saving… then Saved
- [ ] Notes persist across navigation
- [ ] Manual Save still works

## Bookmarks

- [ ] Toggle persists and updates dashboard list

## Search

- [ ] Minimum 2 characters enforced
- [ ] Empty state message is actionable
- [ ] Results link to correct routes

## Workspace input preservation

- [ ] SQL/Python workspace retains input on layout change
- [ ] Run/Check buttons reachable on mobile

## Progress persistence

- [ ] IndexedDB progress survives reload
- [ ] Backup export/import restores data without erasing progress

## GitHub Pages routing

- [ ] https://saucedawebdev.github.io/datapath/ loads dashboard
- [ ] Hash routes refresh without 404
- [ ] Asset paths include /datapath/

## PWA installation

- [ ] manifest start_url is /datapath/
- [ ] manifest scope is /datapath/
- [ ] Icons resolve at /datapath/icons/

## Installed-app relaunch

- [ ] Home screen icon opens DATApath (not site root 404)
- [ ] Navigation stays within /datapath/

## Offline behavior

- [ ] Offline banner appears when network unavailable
- [ ] Cached shell shows meaningful state (not blank page)

## Service-worker updates

- [ ] Update available banner appears after new deploy
- [ ] Reload applies update without losing typed notes mid-save

## Automated (run locally)

- [x] `npm test` — unit tests including polish-pass.test.js
- [x] `npm run validate:content`
- [x] `BASE_PATH=/datapath/ npm run build`
- [x] `BASE_PATH=/datapath/ node scripts/verify-pwa-deploy.js`
- [x] `npm run test:e2e` — Playwright QA spec (13/13)
