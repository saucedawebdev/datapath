import { createButton } from '../../../components/ui.js';
import { createSqlEditor, renderResultTable } from '../../../components/sql-editor.js';
import { ensureDatabaseReady, initDatabase, runQuery } from '../../../services/sql-engine.js';
import { validatePracticeAnswer } from '../../../services/practice-validation-service.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';

export async function renderSqlPractice(exercise, { onSubmit, onDirty, feedbackEl, toolbarEl }) {
  const datasetId = exercise.starterState?.datasetId || exercise.dataset || 'retail-orders';
  await ensureDatabaseReady();
  if (datasetId) await initDatabase(datasetId);

  const schema = document.createElement('aside');
  schema.className = 'practice-schema mb-md';
  schema.innerHTML = `
    <h3 class="text-sm">Schema browser</h3>
    <ul class="practice-schema__list">
      <li>customers</li><li>orders</li><li>order_items</li><li>products</li><li>marketing_campaigns</li>
    </ul>
  `;

  const editorHost = document.createElement('div');
  const editor = createSqlEditor(editorHost, {
    initialValue: exercise.starterState?.sql || '-- Write your SQL here\n',
    onRun: (sql) => runPreview(sql, feedbackEl),
    onChange: () => onDirty?.(),
  });

  toolbarEl.appendChild(createButton({
    label: 'Run Query',
    variant: 'primary',
    onClick: () => runPreview(editor.getValue(), feedbackEl),
  }));
  toolbarEl.appendChild(createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'secondary',
    onClick: () => onSubmit?.({ sql: editor.getValue() }),
  }));
  toolbarEl.appendChild(createButton({
    label: 'Reset',
    variant: 'ghost',
    onClick: () => {
      editor.setValue(exercise.starterState?.sql || '');
      feedbackEl.replaceChildren();
      onDirty?.(false);
    },
  }));

  const wrap = document.createElement('div');
  wrap.className = 'practice-sql';
  wrap.appendChild(schema);
  wrap.appendChild(editorHost);
  return wrap;
}

function runPreview(sql, feedbackEl) {
  const result = runQuery(sql);
  feedbackEl.replaceChildren();
  if (result.type === 'error') {
    feedbackEl.innerHTML = `<p class="sql-status sql-status--error">${escapeHtml(result.message)}</p>`;
    return;
  }
  if (result.type === 'result') {
    feedbackEl.appendChild(renderResultTable(result.columns, result.rows));
    const status = document.createElement('p');
    status.className = 'sql-status sql-status--success';
    status.textContent = `${result.rowCount} rows · ${result.elapsed}ms`;
    feedbackEl.appendChild(status);
    return;
  }
  feedbackEl.innerHTML = `<p class="sql-status">${escapeHtml(result.message)}</p>`;
}

export function showSqlFeedback(feedbackEl, validation) {
  feedbackEl.insertAdjacentHTML('beforeend', `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Correct!' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<p>${escapeHtml(validation.message)}</p>` : ''}
  `);
}
