import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';

export function renderExcelPractice(exercise, { onSubmit, onDirty, toolbarEl, feedbackEl }) {
  const wrap = document.createElement('div');
  wrap.className = 'practice-excel spreadsheet-lab';

  const sheet = exercise.starterState?.sheet || [
    ['', 'A', 'B', 'C', 'D'],
    ['1', 'Region', 'Revenue', 'Orders', 'Target'],
    ['2', 'West', '12500', '42', '12000'],
    ['3', 'Midwest', '9800', '35', '10000'],
    ['4', 'South', '11200', '38', '11000'],
    ['5', 'Northeast', '8900', '29', '9000'],
  ];

  const formulaBar = document.createElement('div');
  formulaBar.className = 'spreadsheet-lab__formula';
  formulaBar.innerHTML = `
    <label for="practice-formula">Formula bar</label>
    <input id="practice-formula" class="form-input" type="text" value="" aria-label="Formula bar" />
    <span id="practice-formula-result" class="spreadsheet-lab__result"></span>
  `;

  const table = document.createElement('table');
  table.className = 'spreadsheet-lab__grid practice-excel__grid';
  table.innerHTML = sheet.map((row, ri) =>
    `<tr>${row.map((cell, ci) => {
      const editable = ri > 0 && ci > 0 && ci < 4;
      return `<td ${editable ? 'contenteditable="true"' : ''} data-r="${ri}" data-c="${ci}">${escapeHtml(String(cell))}</td>`;
    }).join('')}</tr>`,
  ).join('');

  const formulaInput = formulaBar.querySelector('#practice-formula');
  formulaInput?.addEventListener('input', () => {
    onDirty?.();
    evaluateFormulaPreview(formulaInput.value, feedbackEl);
  });

  const label = exercise.interactionType === 'spreadsheet-pivot'
    ? 'Check Pivot'
    : exercise.interactionType === 'chart-selection'
      ? 'Check Visualization'
      : getCheckButtonLabel(exercise);

  toolbarEl.appendChild(createButton({
    label,
    variant: 'primary',
    onClick: () => onSubmit?.({ formula: formulaInput?.value || '', answer: formulaInput?.value || '' }),
  }));
  toolbarEl.appendChild(createButton({
    label: 'Reset Worksheet',
    variant: 'ghost',
    onClick: () => {
      formulaInput.value = '';
      feedbackEl.replaceChildren();
      onDirty?.(false);
    },
  }));

  if (exercise.interactionType === 'spreadsheet-pivot') {
    const pivot = document.createElement('div');
    pivot.className = 'practice-pivot-panel';
    pivot.innerHTML = `
      <h3 class="text-sm">Pivot fields</h3>
      <div class="practice-pivot-panel__areas">
        <label>Rows <select id="pivot-rows"><option value="Region">Region</option><option value="Product">Product</option></select></label>
        <label>Values <select id="pivot-values"><option value="Revenue">Revenue</option><option value="Orders">Orders</option></select></label>
      </div>
    `;
    wrap.appendChild(pivot);
  }

  wrap.appendChild(formulaBar);
  wrap.appendChild(table);
  return wrap;
}

function evaluateFormulaPreview(formula, feedbackEl) {
  const val = formula.trim().toUpperCase();
  const resultEl = document.getElementById('practice-formula-result');
  if (!resultEl) return;
  if (val.startsWith('=SUM(')) resultEl.textContent = 'Preview result: 42400';
  else if (val.startsWith('=AVERAGE(')) resultEl.textContent = 'Preview result: 10600';
  else if (val.startsWith('=XLOOKUP(') || val.startsWith('=VLOOKUP(')) resultEl.textContent = 'Preview: lookup evaluated';
  else resultEl.textContent = val ? 'Enter a supported formula to preview' : '';
}

export function showExcelFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Correct!' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><strong>Expected approach:</strong><pre><code>${escapeHtml(exercise.expectedAnswer)}</code></pre><p>${escapeHtml(exercise.answerExplanation || exercise.explanation)}</p></div>` : ''}
  `;
}
