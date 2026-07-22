# DATApath — Job Ready Edition

**Build the skills. Read the data. Make the decision.**

114 job-ready lessons across SQL, Excel, Tableau, Power BI, Python, and Statistics — all available immediately in a local-first PWA.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Curriculum (114 lessons)

| Subject | Lessons |
|---------|---------|
| SQL | 40 |
| Excel | 20 |
| Tableau | 12 |
| Power BI | 12 |
| Python | 18 |
| Statistics | 12 |

All lessons include full content, quizzes (3+ questions), guided practice, and Northstar Commerce business scenarios.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Unit tests |
| `npm run test:e2e` | Browser E2E tests |
| `npm run validate:content` | Validate 114-lesson curriculum |

## GitHub Pages Deployment

### 1. Create the repository

Create a new GitHub repository (e.g. `datapath`).

### 2. Connect and push

```bash
git init
git add .
git commit -m "DATApath Job Ready Edition — 114 lessons"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/datapath.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to **Settings → Pages**
2. Under **Build and deployment**, set Source to **GitHub Actions**

### 4. Deploy

Push to `main` — the workflow in `.github/workflows/deploy.yml` runs validation, tests, builds with `BASE_PATH=/<repo-name>/`, and deploys.

### 5. Open the published app

Visit `https://YOUR_USERNAME.github.io/datapath/`

### 6. Add to iPad home screen

1. Open the published URL in Safari
2. Tap **Share → Add to Home Screen**
3. The app installs as a standalone PWA

## Workspaces

- **SQL** — Northstar Commerce database (sql.js)
- **Spreadsheet Lab** — Excel formula practice
- **Python Lab** — Pyodide (loads on first use)
- **Statistics Lab** — Interactive calculators

## License

Personal use. Northstar Commerce is fictional sample data.
