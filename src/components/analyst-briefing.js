import { escapeHtml } from '../utilities/sanitize.js';

export function createAnalystBriefingPanel(briefing) {
  if (!briefing) return document.createDocumentFragment();

  const panel = document.createElement('aside');
  panel.className = 'analyst-briefing';
  panel.setAttribute('aria-label', 'Analyst briefing');

  panel.innerHTML = `
    <div class="analyst-briefing__header">
      <span class="analyst-briefing__label">Analyst Briefing</span>
    </div>
    <dl class="analyst-briefing__body">
      <div class="analyst-briefing__row">
        <dt>From</dt>
        <dd>${escapeHtml(briefing.from)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Request</dt>
        <dd>${escapeHtml(briefing.requestTitle)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Message</dt>
        <dd>${escapeHtml(briefing.message)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Required Skills</dt>
        <dd><ul class="analyst-briefing__skills">${(briefing.requiredSkills || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul></dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Business Goal</dt>
        <dd>${escapeHtml(briefing.businessGoal)}</dd>
      </div>
    </dl>
  `;

  return panel;
}
