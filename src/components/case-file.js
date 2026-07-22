import { escapeHtml } from '../utilities/sanitize.js';

export function createCaseFilePanel(caseFile) {
  if (!caseFile) return document.createDocumentFragment();

  const panel = document.createElement('aside');
  panel.className = 'stakeholder-box case-file';
  panel.setAttribute('aria-label', `Case file ${caseFile.caseNumber}`);

  panel.innerHTML = `
    <div class="stakeholder-box__label">Case File #${escapeHtml(caseFile.caseNumber)}</div>
    <dl class="case-file__body mb-0">
      <div><dt>Department</dt><dd>${escapeHtml(caseFile.department)}</dd></div>
      <div><dt>Requested By</dt><dd>${escapeHtml(caseFile.requestedBy)}</dd></div>
      <div><dt>Business Problem</dt><dd>${escapeHtml(caseFile.businessProblem)}</dd></div>
      <div><dt>Assignment</dt><dd>${escapeHtml(caseFile.lessonConnection)}</dd></div>
      <div><dt>Business Objective</dt><dd>${escapeHtml(caseFile.businessObjective)}</dd></div>
    </dl>
    <p class="text-sm text-muted mb-0 mt-sm">${escapeHtml(caseFile.roleContext || '')}</p>
  `;

  return panel;
}
