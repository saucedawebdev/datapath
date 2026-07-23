import { createBadge, createLinkButton } from './ui.js';
import { getProjectDeliverableLabel, getSubjectTheme } from '../config/subject-theme.js';
import { escapeHtml } from '../utilities/sanitize.js';

export function getProjectStatus(projectProgress) {
  if (projectProgress?.complete) return { label: 'Completed', variant: 'complete' };
  if (projectProgress?.inProgress) return { label: 'In progress', variant: 'intermediate' };
  return { label: 'Not started', variant: 'beginner' };
}

/**
 * Capstone project card for dashboard and projects list.
 */
export function createProjectCard(project, projectProgress = null) {
  const card = document.createElement('article');
  card.className = 'project-card card card--interactive';

  const status = getProjectStatus(projectProgress);
  const deliverable = getProjectDeliverableLabel(project);
  const primarySubject = project.subjectIds?.[0];
  const theme = primarySubject ? getSubjectTheme(primarySubject) : null;

  card.innerHTML = `
    <div class="project-card__header">
      <h3 class="project-card__title"><a href="#/projects/${project.id}">${escapeHtml(project.title)}</a></h3>
      <div class="project-card__badges"></div>
    </div>
    <p class="project-card__subjects text-sm text-muted">${project.subjectIds.map((s) => escapeHtml(getSubjectTheme(s).name)).join(' · ')}</p>
    <p class="project-card__problem">${escapeHtml(project.stakeholderRequest || project.businessContext.slice(0, 120) + '…')}</p>
    <p class="project-card__skills text-sm"><strong>Skills:</strong> ${escapeHtml((project.requiredSkills || []).slice(0, 4).join(', '))}</p>
    <p class="project-card__deliverable text-sm text-muted">Deliverable: ${escapeHtml(deliverable)}</p>
    <div class="project-card__actions"></div>
  `;

  const badges = card.querySelector('.project-card__badges');
  badges.appendChild(createBadge(project.difficulty));
  badges.appendChild(createBadge(status.label, status.variant === 'complete' ? 'complete' : project.difficulty));

  const actionLabel = status.label === 'Completed' ? 'Review project'
    : status.label === 'In progress' ? 'Continue project'
      : 'Start project';

  card.querySelector('.project-card__actions').appendChild(
    createLinkButton({ label: actionLabel, href: `#/projects/${project.id}`, variant: 'secondary' }),
  );

  if (theme) card.classList.add(`subject-${primarySubject}`);

  return card;
}

export function createPortfolioGuidancePanel(project) {
  const panel = document.createElement('details');
  panel.className = 'portfolio-guidance';
  panel.innerHTML = `
    <summary>Add this to your portfolio</summary>
    <div class="portfolio-guidance__body">
      <p><strong>What this demonstrates:</strong> ${escapeHtml((project.requiredSkills || []).slice(0, 5).join(', '))}</p>
      <p><strong>Suggested artifact:</strong> Screenshot or export of your ${escapeHtml(getProjectDeliverableLabel(project).toLowerCase())}.</p>
      <p><strong>Resume line:</strong> ${escapeHtml(buildResumeLine(project))}</p>
      <p class="mb-0"><strong>Interview talking point:</strong> ${escapeHtml(buildTalkingPoint(project))}</p>
    </div>
  `;
  return panel;
}

function buildResumeLine(project) {
  const deliverable = getProjectDeliverableLabel(project);
  return `Built a ${deliverable.toLowerCase()} for ${project.title.replace(/ Project$/, '')} using ${(project.requiredSkills || []).slice(0, 3).join(', ')}.`;
}

function buildTalkingPoint(project) {
  return `Explain the business question (${project.stakeholderRequest?.slice(0, 80) || 'stakeholder request'}…), your approach, and one insight that informed a decision.`;
}
