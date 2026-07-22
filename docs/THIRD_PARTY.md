# Third-Party Dependencies

| Package | Version | Purpose | License |
|---------|---------|---------|---------|
| sql.js | ^1.12.0 | WASM SQLite in browser | MIT |
| @codemirror/view | ^6.36.2 | Code editor view | MIT |
| @codemirror/state | ^6.5.2 | Editor state | MIT |
| @codemirror/lang-sql | ^6.8.0 | SQL syntax highlighting | MIT |
| @codemirror/commands | ^6.8.0 | Editor commands | MIT |
| idb | ^8.0.2 | IndexedDB promise wrapper | ISC |
| vite | ^6.0.7 | Build and dev server | MIT |
| vite-plugin-pwa | ^0.21.1 | PWA / Workbox | MIT |
| vitest | ^3.0.4 | Unit tests | MIT |
| jsdom | ^26.0.0 | DOM for tests | MIT |
| fake-indexeddb | ^6.0.0 | IndexedDB for tests | Apache-2.0 |

## Network Requests

- **Google Fonts** (Inter, JetBrains Mono) — loaded from fonts.googleapis.com in development and production. No tracking parameters.
- **No analytics, ads, or progress telemetry.**

## Future Dependencies (Planned)

| Package | Stage | Purpose |
|---------|-------|---------|
| pyodide | Stage 6 | Browser Python |
| Chart.js or similar | Stage 7 | Statistics visualizations |

## sql.js WASM

Bundled from `node_modules/sql.js/dist/` — no CDN dependency for SQL execution.
