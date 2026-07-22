import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';

let pyodidePromise = null;

async function loadPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs')
      .then((mod) => mod.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }));
  }
  return pyodidePromise;
}

export async function renderPythonPractice(exercise, { onSubmit, onDirty, toolbarEl, feedbackEl }) {
  const wrap = document.createElement('div');
  wrap.className = 'practice-python';

  wrap.innerHTML = `
    <p class="text-sm text-muted">Browser Python environment (Pyodide loads on first run).</p>
    <label class="form-label" for="python-code">Python editor</label>
    <textarea id="python-code" class="form-textarea code-input" rows="10">${escapeHtml(exercise.starterState?.code || '# Write Python here\n')}</textarea>
    <pre id="python-output" class="practice-python__output" aria-live="polite"></pre>
  `;

  const codeEl = wrap.querySelector('#python-code');
  const outputEl = wrap.querySelector('#python-output');
  codeEl?.addEventListener('input', () => onDirty?.());

  toolbarEl.appendChild(createButton({
    label: 'Run Python',
    variant: 'primary',
    onClick: async () => {
      outputEl.textContent = 'Loading Python runtime…';
      try {
        const pyodide = await loadPyodide();
        await pyodide.loadPackage('micropip');
        const stdout = [];
        pyodide.setStdout({ batched: (msg) => stdout.push(msg) });
        await pyodide.runPythonAsync(codeEl.value);
        outputEl.textContent = stdout.join('') || 'Code executed (no printed output).';
      } catch (err) {
        outputEl.textContent = `Error: ${err.message}`;
      }
    },
  }));

  toolbarEl.appendChild(createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'secondary',
    onClick: () => onSubmit?.({ output: outputEl.textContent, code: codeEl.value }),
  }));

  toolbarEl.appendChild(createButton({
    label: 'Reset Code',
    variant: 'ghost',
    onClick: () => {
      codeEl.value = exercise.starterState?.code || '';
      outputEl.textContent = '';
      onDirty?.(false);
    },
  }));

  return wrap;
}

export function showPythonFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Correct!' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><pre><code>${escapeHtml(exercise.expectedAnswer)}</code></pre><p>${escapeHtml(exercise.answerExplanation || exercise.explanation)}</p></div>` : ''}
  `;
}
