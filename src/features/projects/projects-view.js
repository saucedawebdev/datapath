import { contentBundle, getProject } from '../../content/index.js';
import { createProjectBriefPanel } from '../../components/project-brief.js';
import { createBadge, createCard } from '../../components/ui.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { createHeroShell } from '../../components/visual/hero-shell.js';

export async function renderProjectsList() {
  const container = document.createElement('div');

  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <h1 class="page-header__title">Projects</h1>
    <p class="page-header__subtitle">Realistic business scenarios with datasets, deliverables, rubrics, and reflection questions.</p>
  `;
  container.appendChild(createHeroShell({ className: 'page-header mb-lg', children: [heroContent] }));

  const grid = document.createElement('div');
  grid.className = 'grid grid--auto';

  for (const project of contentBundle.projects) {
    grid.appendChild(createCard({
      title: project.title,
      subtitle: project.subjectIds.map((s) => s.toUpperCase()).join(' · '),
      href: `#/projects/${project.id}`,
      children: [
        createBadge(project.difficulty),
        Object.assign(document.createElement('p'), {
          className: 'text-secondary mb-0',
          textContent: project.businessContext.slice(0, 160) + '…',
        }),
      ],
    }));
  }

  container.appendChild(grid);
  return container;
}

export async function renderProjectDetail(params) {
  const project = getProject(params.projectId);
  if (!project) {
    return errorView('Project not found');
  }

  const article = document.createElement('article');

  if (project.projectBrief) {
    article.appendChild(createProjectBriefPanel(project.projectBrief));
  }

  const body = document.createElement('div');
  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <p class="text-sm text-muted"><a href="#/projects">Projects</a></p>
    <h1 class="page-header__title">${escapeHtml(project.title)}</h1>
    <div class="flex gap-sm">${createBadge(project.difficulty).outerHTML}</div>
  `;
  body.appendChild(createHeroShell({ className: 'page-header mb-lg', children: [heroContent] }));

  const sections = document.createElement('div');
  sections.innerHTML = `
    <section class="lesson-section">
      <h2>Business Context</h2>
      <p>${escapeHtml(project.businessContext)}</p>
    </section>

    <section class="lesson-section">
      <h2>Stakeholder Request</h2>
      <div class="stakeholder-box"><p class="mb-0">${escapeHtml(project.stakeholderRequest)}</p></div>
    </section>

    <section class="lesson-section">
      <h2>Dataset Overview</h2>
      <p>${escapeHtml(project.datasetOverview)}</p>
    </section>

    <section class="lesson-section">
      <h2>Deliverables</h2>
      <ul>${project.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
    </section>

    <section class="lesson-section">
      <h2>Required Skills</h2>
      <ul>${project.requiredSkills.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
    </section>

    <section class="lesson-section">
      <h2>Recommended Workflow</h2>
      <ol>${project.recommendedWorkflow.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </section>

    <section class="lesson-section">
      <h2>Milestones</h2>
      <ul>${project.milestones.map((m) => `<li><strong>${escapeHtml(m.title)}</strong> — ${escapeHtml(m.description)}</li>`).join('')}</ul>
    </section>

    <section class="lesson-section">
      <h2>Evaluation Rubric</h2>
      <div class="table-wrapper"><table class="data-table">
        <thead><tr><th>Criterion</th><th>Weight</th><th>Description</th></tr></thead>
        <tbody>${project.rubric.map((r) => `<tr><td>${escapeHtml(r.criterion)}</td><td>${r.weight}%</td><td>${escapeHtml(r.description)}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>

    <section class="lesson-section">
      <h2>Reflection Questions</h2>
      <ul>${project.reflectionQuestions.map((q) => `<li>${escapeHtml(q)}</li>`).join('')}</ul>
    </section>

    <p class="text-muted text-sm">Project progress saving integrates with IndexedDB. Mark milestones complete in Settings as you advance.</p>
  `;
  body.appendChild(sections);
  article.appendChild(body);

  return article;
}

function errorView(msg) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `<h2>${msg}</h2><a href="#/projects" class="btn btn--primary">Back to Projects</a>`;
  return div;
}
