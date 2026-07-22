import { setWideContent } from '../../app/shell.js';
import { createButton } from '../../components/ui.js';

const SAMPLE = [
  ['Region', 'Revenue', 'Orders'],
  ['West', '12500', '42'],
  ['Midwest', '9800', '35'],
  ['South', '11200', '38'],
  ['Northeast', '8900', '29'],
];

export async function renderExcelPlayground() {
  setWideContent(true);
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Spreadsheet Lab</h1>
      <p class="page-header__subtitle">Practice Excel formulas on Northstar Commerce sample data. This is an educational simulator — not Microsoft Excel.</p>
    </header>
  `;

  const grid = document.createElement('div');
  grid.className = 'spreadsheet-lab';
  grid.innerHTML = '<table class="spreadsheet-lab__grid" id="excel-grid"></table>';

  const formulaBar = document.createElement('div');
  formulaBar.className = 'spreadsheet-lab__formula';
  formulaBar.innerHTML = `
    <label for="excel-formula">Formula</label>
    <input id="excel-formula" class="form-input" type="text" value="=SUM(B2:B5)" aria-label="Formula bar" />
    <span id="excel-result" class="spreadsheet-lab__result"></span>
  `;

  wrap.appendChild(formulaBar);
  wrap.appendChild(grid);
  wrap.appendChild(createButton({
    label: 'Reset worksheet',
    variant: 'secondary',
    onClick: () => renderGrid(document.getElementById('excel-grid')),
  }));

  renderGrid(grid);
  document.getElementById('excel-formula')?.addEventListener('change', evaluateFormula);

  return wrap;
}

function renderGrid(table) {
  table.innerHTML = SAMPLE.map((row, ri) =>
    `<tr>${row.map((cell, ci) =>
      `<td contenteditable="${ri > 0 && ci > 0}" data-r="${ri}" data-c="${ci}">${cell}</td>`,
    ).join('')}</tr>`,
  ).join('');
}

function evaluateFormula() {
  const input = document.getElementById('excel-formula');
  const result = document.getElementById('excel-result');
  const val = input?.value.trim() || '';
  if (val.toUpperCase().startsWith('=SUM(')) {
    const nums = SAMPLE.slice(1).map((r) => parseFloat(r[1])).filter((n) => !Number.isNaN(n));
    result.textContent = `Result: ${nums.reduce((a, b) => a + b, 0)}`;
  } else if (val.toUpperCase().startsWith('=AVERAGE(')) {
    const nums = SAMPLE.slice(1).map((r) => parseFloat(r[1]));
    result.textContent = `Result: ${(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)}`;
  } else {
    result.textContent = 'Supported: =SUM(...), =AVERAGE(...)';
  }
}
