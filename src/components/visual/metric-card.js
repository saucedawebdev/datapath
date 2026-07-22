import { animateKpiValue } from './animated-kpi.js';

export function createMetricCard({ label, value, detail, status = 'Synced', formattedValue = null }) {
  const card = document.createElement('div');
  card.className = 'metric-card metric-animate';

  const display = formattedValue ?? String(value);
  card.innerHTML = `
    <div class="metric-card__label">${label}</div>
    <div class="metric-card__value" aria-label="${label} ${display}">${display}</div>
    <div class="metric-card__detail">${detail || 'Current dataset'}</div>
    <div class="metric-card__status"><span class="metric-card__status-dot" aria-hidden="true"></span>${status}</div>
  `;

  const valueEl = card.querySelector('.metric-card__value');
  if (typeof value === 'number' && !formattedValue) {
    requestAnimationFrame(() => animateKpiValue(valueEl, value));
  }

  return card;
}
