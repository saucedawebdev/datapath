import { escapeHtml } from '../utilities/sanitize.js';

export function createBusinessImpactPanel(impact, { complete = false } = {}) {
  if (!impact) return document.createDocumentFragment();

  const panel = document.createElement('section');
  panel.className = 'stakeholder-box business-impact';
  panel.setAttribute('aria-label', 'Business impact');

  const intro = complete ? impact.summary : impact.pendingSummary;

  panel.innerHTML = `
    <div class="stakeholder-box__label">Business Impact</div>
    <p class="mb-sm">${escapeHtml(intro)}</p>
    <ul class="mb-0">
      ${(impact.leadershipCan || []).map((item) => `<li>✓ ${escapeHtml(item)}</li>`).join('')}
    </ul>
    ${impact.deliverable ? `<p class="text-sm text-muted mt-sm mb-0"><strong>Deliverable:</strong> ${escapeHtml(impact.deliverable)}</p>` : ''}
  `;

  return panel;
}
