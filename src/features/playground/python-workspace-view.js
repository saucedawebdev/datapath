import { setWideContent } from '../../app/shell.js';
import { createButton } from '../../components/ui.js';
import { showToast } from '../../components/toast-dialog.js';
import { setPythonRuntimeState } from '../../services/system-status-service.js';

let pyodideReady = null;

export async function renderPythonPlayground() {
  setWideContent(true);
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Python Lab</h1>
      <p class="page-header__subtitle">Run pandas-style analysis in the browser. Python loads on first use via Pyodide.</p>
    </header>
    <div class="python-lab">
      <textarea id="python-code" class="form-textarea code-block" rows="12" spellcheck="false"># Northstar Commerce sample
sales = [12500, 9800, 11200, 8900]
print("Mean revenue:", sum(sales) / len(sales))
print("Regions analyzed:", len(sales))</textarea>
      <div class="flex gap-sm mt-md">
        <button type="button" class="btn btn--primary" id="python-run">Run code</button>
        <button type="button" class="btn btn--secondary" id="python-reset">Reset example</button>
      </div>
      <pre id="python-output" class="python-lab__output mt-lg runtime-status" aria-live="polite">&gt; initializing Python runtime…</pre>
    </div>
  `;

  wrap.querySelector('#python-run')?.addEventListener('click', runPython);
  wrap.querySelector('#python-reset')?.addEventListener('click', () => {
    wrap.querySelector('#python-code').value = `# Northstar Commerce sample
sales = [12500, 9800, 11200, 8900]
print("Mean revenue:", sum(sales) / len(sales))`;
    wrap.querySelector('#python-output').textContent = '';
  });

  setPythonRuntimeState('loading');
  loadPyodide().then(() => {
    setPythonRuntimeState('ready');
    wrap.querySelector('#python-output').textContent = '> analytics environment ready — click Run code';
  }).catch((e) => {
    setPythonRuntimeState('failed');
    wrap.querySelector('#python-output').textContent = `> runtime unavailable: ${e.message}`;
  });

  return wrap;
}

async function loadPyodide() {
  if (pyodideReady) return pyodideReady;
  pyodideReady = (async () => {
    const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs');
    return loadPyodide();
  })();
  return pyodideReady;
}

async function runPython() {
  const code = document.getElementById('python-code')?.value || '';
  const out = document.getElementById('python-output');
  out.textContent = 'Running…';
  try {
    const pyodide = await loadPyodide();
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`);
    await pyodide.runPythonAsync(code);
    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    out.textContent = stdout || '(no output)';
    showToast('Code executed', { type: 'success' });
  } catch (e) {
    out.textContent = String(e);
    showToast('Python error', { type: 'error' });
  }
}
