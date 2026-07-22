# DataPath Implementation Plan

This document describes the staged delivery plan for the DataPath data analytics learning platform.

## Guiding Principles

1. **Maintainability first** — modular ES modules, clear boundaries, documented contracts.
2. **No fake functionality** — every control either works or exposes a documented integration point.
3. **Content-driven** — lessons, exercises, and reference material live in structured data, not page markup.
4. **Local-first** — IndexedDB for structured data, localStorage for instant-read preferences, export/import for backup.
5. **Lazy loading** — heavy engines (SQL, Python, charting) load only when their workspace opens.

## Delivery Stages

### Stage 1: Foundation (Current)

| Area | Deliverable | Status |
|------|-------------|--------|
| Project structure | Vite, ES modules, folder layout | Done |
| Application shell | Layout, sidebar, mobile nav, skip link | Done |
| Routing | Hash-based client router with lazy views | Done |
| Theme system | Light, dark, system; CSS custom properties | Done |
| Accessibility | Focus states, landmarks, reduced motion | Done |
| Storage layer | IndexedDB abstraction + localStorage prefs | Done |
| Backup/restore | JSON export, import validation, reset | Done |
| Content schemas | Subjects, modules, lessons, exercises, etc. | Done |
| Content validation | Dev-time validator utility | Done |
| Progress model | Weighted readiness calculation | Done |
| Lesson template | Reusable 28-section lesson renderer | Done |
| Dashboard | Populated with realistic sample data | Done |
| Subject navigation | All six subjects with module structure | Done |
| SQL framework | Curriculum nav, first lessons, sql.js workspace | Done |
| Search | Global debounced search | Done |
| PWA | Manifest, service worker, offline shell | Done |
| Testing | Vitest unit + integration tests | Done |
| Documentation | README, architecture, content model | Done |

### Stage 2: Complete SQL Subject Framework

- Expand SQL curriculum to full topic list (beginner → advanced).
- Complete library entries for all SQL commands and concepts.
- Quiz system with scoring and review.
- Practice lab exercises with hint tracking and validation.
- Query history, saved queries, CSV export.
- Additional sample databases (HR, marketing, e-commerce).
- SQL-specific achievements and weak-skill detection.

### Stage 3: Excel Framework

- Spreadsheet simulator (cells, formula bar, supported functions).
- Excel curriculum modules and lessons.
- Pivot-table and chart learning simulations.
- Excel practice validation.

### Stage 4: Tableau Framework

- Visualization simulator (shelves, chart types, filters).
- Dashboard-building challenges.
- Real Tableau walkthrough steps for advanced exercises.

### Stage 5: Power BI Framework

- Data-model simulator, DAX practice workspace.
- Report-building exercises.
- Real Power BI walkthrough steps.

### Stage 6: Python Framework

- Pyodide lazy loading on workspace open.
- pandas exercises, chart output, saved code.

### Stage 7: Statistics Framework

- Interactive calculators and visualizations.
- Editable datasets, hypothesis-testing walkthroughs.

### Stage 8: Cross-Subject Projects and Career Center

- Capstone workflow architecture.
- Interview prep, portfolio guidance, job-readiness checklist.

### Stage 9: Final Polish

- Performance audit, accessibility audit, responsive audit.
- Content consistency, offline testing, dependency review.

## Current Scope Boundaries

The following areas have correct navigation, UI shells, and documented integration points but await Stage 2+ content:

- **Practice Lab** — framework and sample SQL exercises; full cross-subject catalog in later stages.
- **Projects** — project cards and detail views with sample retail/churn projects; full rubric workflow in Stage 8.
- **Playground** — SQL workspace functional; Python/Excel/Statistics playgrounds stubbed with lazy-load contracts.
- **Career Center** — structured sections with initial interview questions; expanded content in Stage 8.

## Next Recommended Step

**Stage 2: Complete SQL Subject Framework** — expand from 8 representative lessons to full curriculum coverage, complete the quiz/practice systems for SQL, and add remaining sample databases.

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| sql.js bundle size | Dynamic import only on SQL routes |
| IndexedDB schema changes | Versioned migrations in storage layer |
| Content errors at scale | Validation utility run in CI |
| PWA stale cache | Network-first for HTML, versioned cache bust |
