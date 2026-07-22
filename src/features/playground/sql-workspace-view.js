import { ensureDatabaseReady, runQuery, initDatabase, getQueryHistory, resultsToCsv, getCurrentDatasetId } from '../../services/sql-engine.js';
import { createSqlEditor, renderResultTable } from '../../components/sql-editor.js';
import { createButton } from '../../components/ui.js';
import { showToast, showDialog } from '../../components/toast-dialog.js';
import { storage } from '../../storage/storage-service.js';
import { datasets } from '../../data/sample-datasets.js';
import { downloadBlob } from '../../utilities/helpers.js';
import { setWideContent } from '../../app/shell.js';
import { escapeHtml } from '../../utilities/sanitize.js';

export async function renderSqlPlayground() {
  setWideContent(true);

  const container = document.createElement('div');
  container.className = 'sql-workspace-page';
  container.innerHTML = `
    <header class="page-header">
      <p class="text-sm text-muted"><a href="#/playground">Playground</a> / SQL</p>
      <h1 class="page-header__title">SQL Workspace</h1>
      <p class="page-header__subtitle">Practice environment powered by sql.js. Results are not sent to any server.</p>
    </header>
  `;

  const loading = document.createElement('div');
  loading.className = 'loading-state';
  loading.innerHTML = '<div class="spinner"></div><span>Loading SQL engine…</span>';
  container.appendChild(loading);

  await ensureDatabaseReady();
  loading.remove();

  const statusBar = document.createElement('p');
  statusBar.className = 'runtime-status terminal-accent';
  statusBar.setAttribute('aria-label', 'SQL connection status');
  statusBar.textContent = '> Northstar dataset connected · SQL engine online';
  container.appendChild(statusBar);

  const workspace = document.createElement('div');
  workspace.className = 'sql-workspace';

  const editorSection = document.createElement('div');
  editorSection.className = 'sql-workspace__editor';
  editorSection.innerHTML = '<h2 class="sr-only">SQL Editor</h2>';

  const editorHost = document.createElement('div');
  const resultsSection = document.createElement('div');
  resultsSection.className = 'sql-workspace__results';
  resultsSection.innerHTML = '<h2>Results</h2>';

  const resultsArea = document.createElement('div');
  resultsSection.appendChild(resultsArea);

  const statusEl = document.createElement('p');
  statusEl.className = 'sql-status';
  resultsSection.appendChild(statusEl);

  const explanationPanel = document.createElement('div');
  explanationPanel.className = 'sql-workspace__panel card';
  explanationPanel.innerHTML = `
    <h3>Query History & Saved Queries</h3>
    <div id="history-list" class="text-sm text-secondary"></div>
  `;

  let lastResult = null;

  const editor = createSqlEditor(editorHost, {
    initialValue: '-- Write SQL here\nSELECT * FROM customers LIMIT 5;',
    onRun: executeQuery,
  });

  const toolbar = document.createElement('div');
  toolbar.className = 'sql-toolbar';

  toolbar.appendChild(createButton({ label: 'Run (⌘↵)', variant: 'primary', onClick: () => executeQuery(editor.getValue()) }));
  toolbar.appendChild(createButton({ label: 'Reset Database', variant: 'secondary', onClick: resetDb }));
  toolbar.appendChild(createDatasetSelect());
  toolbar.appendChild(createButton({ label: 'Download CSV', variant: 'ghost', onClick: downloadCsv }));
  toolbar.appendChild(createButton({ label: 'Save Query', variant: 'ghost', onClick: saveQuery }));

  editorSection.appendChild(toolbar);
  editorSection.appendChild(editorHost);

  workspace.appendChild(editorSection);
  workspace.appendChild(resultsSection);
  workspace.appendChild(explanationPanel);
  container.appendChild(workspace);

  renderHistory();
  await storage.logActivity({ type: 'sql-query-run', itemId: 'playground', subjectId: 'sql' });

  async function executeQuery(sql) {
    const result = runQuery(sql);
    resultsArea.innerHTML = '';
    if (result.type === 'error') {
      statusEl.className = 'sql-status sql-status--error';
      statusEl.textContent = result.message;
      return;
    }
    if (result.type === 'message') {
      statusEl.className = 'sql-status';
      statusEl.textContent = result.message;
      return;
    }
    lastResult = result;
    resultsArea.appendChild(renderResultTable(result.columns, result.rows));
    statusEl.className = 'sql-status sql-status--success';
    statusEl.textContent = `${result.rowCount} rows returned · ${result.elapsed}ms`;
    renderHistory();
  }

  async function resetDb() {
    const confirmed = await showDialog({
      title: 'Reset database?',
      message: 'This will reload the sample dataset and clear unsaved in-memory changes.',
      confirmLabel: 'Reset',
    });
    if (confirmed) {
      await initDatabase(getCurrentDatasetId());
      showToast('Database reset', { type: 'success' });
      resultsArea.innerHTML = '';
      statusEl.textContent = '';
    }
  }

  function createDatasetSelect() {
    const select = document.createElement('select');
    select.className = 'form-select';
    select.setAttribute('aria-label', 'Select dataset');
    datasets.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name;
      select.appendChild(opt);
    });
    select.addEventListener('change', async () => {
      await initDatabase(select.value);
      showToast(`Loaded ${select.options[select.selectedIndex].text}`, { type: 'info' });
    });
    return select;
  }

  function downloadCsv() {
    if (!lastResult?.rows?.length) {
      showToast('Run a query with results first', { type: 'info' });
      return;
    }
    const csv = resultsToCsv(lastResult.columns, lastResult.rows);
    downloadBlob(csv, 'query-results.csv', 'text/csv');
  }

  async function saveQuery() {
    const name = prompt('Name for this query:');
    if (!name) return;
    await storage.saveQuery(name, editor.getValue(), getCurrentDatasetId());
    showToast('Query saved', { type: 'success' });
    renderSavedQueries();
  }

  async function renderHistory() {
    const history = getQueryHistory().slice(0, 10);
    const list = document.getElementById('history-list');
    if (!list) return;

    list.innerHTML = '<p><strong>Recent</strong></p>';
    const recentUl = document.createElement('ul');
    history.forEach((h) => {
      const li = document.createElement('li');
      const btn = createButton({
        label: `${h.sql.slice(0, 60)}${h.sql.length > 60 ? '…' : ''}`,
        variant: 'ghost',
        size: 'sm',
        onClick: () => {
          editor.setValue(h.sql);
          editor.focus();
        },
      });
      li.appendChild(btn);
      recentUl.appendChild(li);
    });
    list.appendChild(recentUl);
    await renderSavedQueries(list);
  }

  async function renderSavedQueries(list = document.getElementById('history-list')) {
    const saved = await storage.getSavedQueries();
    list.querySelector('[data-saved-queries]')?.remove();
    if (!saved.length) return;

    const block = document.createElement('div');
    block.dataset.savedQueries = 'true';
    block.innerHTML = '<p><strong>Saved</strong></p>';
    const ul = document.createElement('ul');
    saved.slice(0, 5).forEach((q) => {
      const li = document.createElement('li');
      li.textContent = q.name + ' ';
      li.appendChild(createButton({
        label: 'Load',
        variant: 'ghost',
        size: 'sm',
        onClick: () => editor.setValue(q.sql),
      }));
      ul.appendChild(li);
    });
    block.appendChild(ul);
    list.appendChild(block);
  }

  return container;
}
