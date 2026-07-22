import { setWideContent } from '../../app/shell.js';
import { createButton } from '../../components/ui.js';

export async function renderStatisticsPlayground() {
  setWideContent(true);
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Statistics Lab</h1>
      <p class="page-header__subtitle">Interactive calculators for Northstar Commerce analysis — mean, median, standard deviation, and more.</p>
    </header>
    <div class="stats-lab">
      <label class="form-label" for="stats-input">Enter comma-separated numbers</label>
      <textarea id="stats-input" class="form-textarea" rows="3">12500, 9800, 11200, 8900, 10500</textarea>
      <div class="flex gap-sm mt-md">
        <button type="button" class="btn btn--primary" id="stats-calc">Calculate</button>
        <button type="button" class="btn btn--secondary" id="stats-reset">Reset</button>
      </div>
      <div id="stats-output" class="stats-lab__output mt-lg" role="status"></div>
    </div>
  `;

  wrap.querySelector('#stats-calc')?.addEventListener('click', runStats);
  wrap.querySelector('#stats-reset')?.addEventListener('click', () => {
    wrap.querySelector('#stats-input').value = '12500, 9800, 11200, 8900, 10500';
    wrap.querySelector('#stats-output').innerHTML = '';
  });

  return wrap;
}

function runStats() {
  const raw = document.getElementById('stats-input')?.value || '';
  const nums = raw.split(',').map((s) => parseFloat(s.trim())).filter((n) => !Number.isNaN(n));
  const out = document.getElementById('stats-output');
  if (!nums.length) {
    out.innerHTML = '<p class="text-error">Enter at least one number.</p>';
    return;
  }
  const sorted = [...nums].sort((a, b) => a - b);
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const variance = nums.reduce((s, n) => s + (n - mean) ** 2, 0) / nums.length;
  const stdev = Math.sqrt(variance);

  out.innerHTML = `
    <div class="metric-grid">
      <div class="metric-card"><span class="metric-card__label">Mean</span><span class="metric-card__value">${mean.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Median</span><span class="metric-card__value">${median.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Std Dev</span><span class="metric-card__value">${stdev.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Count</span><span class="metric-card__value">${nums.length}</span></div>
    </div>
    <p class="text-secondary mt-md">Business interpretation: Average regional revenue is $${mean.toFixed(0)} with ${stdev.toFixed(0)} spread — ${stdev / mean > 0.15 ? 'meaningful variation across regions worth investigating.' : 'relatively consistent performance across regions.'}</p>
  `;
}
