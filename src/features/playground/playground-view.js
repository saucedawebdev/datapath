import { createCard } from '../../components/ui.js';
import { setWideContent } from '../../app/shell.js';

export async function renderPlaygroundHub() {
  setWideContent(false);
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Workspaces</h1>
      <p class="page-header__subtitle">Hands-on labs for SQL, Excel, Python, and Statistics using Northstar Commerce data.</p>
    </header>
  `;

  const workspaces = [
    { name: 'SQL Workspace', desc: 'Query the Northstar Commerce database with real SQL.', href: '#/playground/sql' },
    { name: 'Spreadsheet Lab', desc: 'Practice formulas on sample Northstar sales data.', href: '#/playground/excel' },
    { name: 'Python Lab', desc: 'Run Python code in the browser with Pyodide.', href: '#/playground/python' },
    { name: 'Statistics Lab', desc: 'Calculate mean, median, standard deviation, and interpret results.', href: '#/playground/statistics' },
  ];

  const grid = document.createElement('div');
  grid.className = 'grid grid--auto';

  for (const ws of workspaces) {
    grid.appendChild(createCard({
      title: ws.name,
      subtitle: 'Ready',
      href: ws.href,
      children: [
        Object.assign(document.createElement('p'), { className: 'mb-0 text-secondary', textContent: ws.desc }),
      ],
    }));
  }

  container.appendChild(grid);
  return container;
}
