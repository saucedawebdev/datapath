import { escapeHtml } from '../utilities/sanitize.js';

export function createProjectBriefPanel(brief) {
  if (!brief) return document.createDocumentFragment();

  const panel = document.createElement('aside');
  panel.className = 'stakeholder-box project-brief';
  panel.setAttribute('aria-label', 'Project brief');

  panel.innerHTML = `
    <div class="stakeholder-box__label">Project Brief</div>
    <p class="text-sm text-muted">${escapeHtml(brief.assignmentNote)}</p>
    <dl class="case-file__body mb-0">
      <div><dt>Department</dt><dd>${escapeHtml(brief.department)}</dd></div>
      <div><dt>Project Sponsor</dt><dd>${escapeHtml(brief.projectSponsor)}</dd></div>
      <div><dt>Business Goal</dt><dd>${escapeHtml(brief.businessGoal)}</dd></div>
      <div><dt>Expected Deliverable</dt><dd>${escapeHtml(brief.expectedDeliverable)}</dd></div>
      <div><dt>Success Criteria</dt><dd><ul class="mb-0">${(brief.successCriteria || []).map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul></dd></div>
    </dl>
  `;

  return panel;
}
