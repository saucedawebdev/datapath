# DataPath Architecture

## Overview

DataPath is a client-side Progressive Web App built with vanilla JavaScript (ES modules), HTML5, and CSS3. There is no backend in the initial release; all learner data persists locally via IndexedDB with optional JSON backup.

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                           │
│                     (app shell + landmarks)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   main.js   │
                    │ bootstrap   │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
    │   Router    │ │ AppState    │ │  Theme    │
    │  (hash)     │ │ (reactive)  │ │  Manager  │
    └──────┬──────┘ └──────┬──────┘ └───────────┘
           │               │
    ┌──────▼───────────────▼──────────────────────────┐
    │              Feature Views (lazy)                │
    │  dashboard │ learn │ lesson │ library │ sql ...  │
    └──────┬───────────────────────────────────────────┘
           │
    ┌──────▼──────────────────────────────────────────┐
    │              Services Layer                      │
    │  progress │ search │ backup │ content-loader    │
    └──────┬───────────────────────────────────────────┘
           │
    ┌──────▼──────────────────────────────────────────┐
    │           Storage Abstraction                    │
    │  StorageProvider interface                       │
    │  ├── IndexedDBProvider (default)               │
    │  └── future: CloudStorageProvider              │
    └─────────────────────────────────────────────────┘
```

## Technology Choices

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Build tool | Vite | ES modules, dev server, Vitest integration, PWA plugin |
| Routing | Hash-based (`#/path`) | Works offline without server rewrite rules |
| Structured storage | IndexedDB via `idb` | Async, large capacity, indexed queries |
| Instant prefs | localStorage | Theme/font read before first paint |
| SQL engine | sql.js | WASM SQLite in browser; lazy loaded |
| SQL editor | CodeMirror 6 | Lightweight, accessible, maintained |
| Python (future) | Pyodide | Loaded only when Python workspace opens |
| Testing | Vitest + jsdom | Fast unit/integration tests |
| PWA | vite-plugin-pwa | Manifest + Workbox service worker |

## Folder Structure

```
data-learning-app/
├── index.html
├── manifest.webmanifest
├── package.json
├── vite.config.js
├── docs/                    # Architecture and authoring docs
├── public/
│   ├── icons/
│   ├── images/
│   └── datasets/            # Static CSV/SQL seed files
├── src/
│   ├── main.js              # Bootstrap entry
│   ├── app/
│   │   ├── router.js
│   │   ├── app-state.js
│   │   └── shell.js         # Layout rendering
│   ├── components/          # Reusable UI (Button, Card, Dialog…)
│   ├── config/
│   │   └── branding.js      # Product name, metadata
│   ├── content/             # Curriculum data modules
│   │   ├── index.js         # Aggregates all subjects
│   │   ├── sql/
│   │   ├── excel/
│   │   └── …
│   ├── data/
│   │   └── sample-datasets.js
│   ├── features/            # Route-bound feature modules
│   ├── services/            # Business logic
│   ├── storage/             # Storage abstraction + IndexedDB
│   ├── styles/              # Global CSS + tokens
│   └── utilities/           # Pure helpers, validation, sanitize
└── tests/
```

## Routing

Routes are registered in `src/app/router.js`. Views are dynamically imported to enable code splitting.

| Route | View | Notes |
|-------|------|-------|
| `#/` | Dashboard | Default landing |
| `#/learn` | Learn overview | All subjects |
| `#/learn/:subjectId` | Subject detail | Modules and progress |
| `#/lesson/:lessonId` | Lesson | Reusable template |
| `#/library` | Reference library | Search + filters |
| `#/practice` | Practice lab | Exercises |
| `#/projects` | Projects list | |
| `#/projects/:projectId` | Project detail | |
| `#/playground` | Playground hub | |
| `#/playground/sql` | SQL workspace | sql.js lazy load |
| `#/career` | Career center | |
| `#/settings` | Profile & settings | |
| `#/search` | Search results | |

## State Management

`AppState` is a lightweight pub/sub store:

- Holds session UI state (sidebar open, current route metadata).
- Delegates persistence to `StorageService`.
- Components subscribe to relevant keys and re-render on change.

No external state library — the domain is manageable with explicit services.

## Storage Abstraction

```javascript
// Contract (simplified)
interface StorageProvider {
  get(store, key)
  getAll(store, index?, query?)
  put(store, value)
  delete(store, key)
  clearStore(store)
  exportAll(): Promise<object>
  importAll(data: object): Promise<void>
}
```

**Stores:** `progress`, `bookmarks`, `notes`, `quizAttempts`, `practiceResults`, `savedQueries`, `savedCode`, `projectProgress`, `activity`, `preferences`.

**Migrations:** `DB_VERSION` increments trigger `upgrade` callbacks in `indexeddb-provider.js`.

## Progress and Readiness

Readiness is a **weighted guidance score**, not a job guarantee.

| Factor | Weight |
|--------|--------|
| Lesson completion | 25% |
| Quiz performance | 25% |
| Independent challenge performance | 20% |
| Project completion | 20% |
| Recent review activity | 10% |

Documented in `src/services/progress-service.js`.

## Content Loading

Content modules export validated JSON-like structures. `content/index.js` aggregates subjects. The validation utility (`utilities/content-validator.js`) runs in tests and can run in dev via `npm run validate:content`.

Each content item has a stable `id` (e.g., `sql-lesson-select-basics`).

## Security

- User notes sanitized before render (`utilities/sanitize.js`).
- No `innerHTML` with unsanitized user content — use `textContent` or sanitizer.
- Backup import validates schema version and rejects malformed files.
- No analytics or external tracking.
- Third-party loads: sql.js WASM from bundled assets only.

## PWA Strategy

- **Precache:** app shell (HTML, CSS, JS chunks, icons).
- **Runtime cache:** static datasets in `/public/datasets`.
- **Network-first** for `index.html` to pick up updates.
- `skipWaiting` + user notification for update-available.

## Future Backend Integration

Replace or supplement `IndexedDBProvider` with `CloudStorageProvider`:

1. Implement same `StorageProvider` interface.
2. Add sync conflict resolution in `StorageService`.
3. Keep export/import for portable backups.
4. Authentication layer plugs in at `src/services/auth-service.js` (not yet created).

See `docs/BACKUP_FORMAT.md` for export schema.

## Performance Guidelines

- Dynamic `import()` for feature views and heavy engines.
- Debounced search (300ms).
- Pagination for library lists (50 items per page).
- `content-visibility: auto` for long lesson sections.
- Service worker caches versioned assets.
