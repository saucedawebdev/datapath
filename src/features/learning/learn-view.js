import { contentBundle, getSubject } from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { buildSubjectProgress } from '../../services/progress-service.js';
import { createCard, createProgressBar, createBadge } from '../../components/ui.js';
import { branding } from '../../config/branding.js';
import { createHeroShell } from '../../components/visual/hero-shell.js';
import { createSubjectIconEl } from '../../components/visual/subject-icons.js';
import { escapeHtml } from '../../utilities/sanitize.js';

export async function renderLearnOverview() {
  const container = document.createElement('div');

  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <h1 class="page-header__title">Learning Path</h1>
    <p class="page-header__subtitle">Job Ready Edition — ${branding.subjectOrder.map((id) => branding.subjectLabels[id]).join(' → ')}</p>
  `;
  container.appendChild(createHeroShell({ className: 'page-header mb-lg', children: [heroContent] }));

  const grid = document.createElement('div');
  grid.className = 'grid grid--auto';

  for (const subject of contentBundle.subjects) {
    const progress = await buildSubjectProgress(subject, contentBundle, storage);
    const totalLessons = subject.modules.reduce((s, m) => s + m.lessons.length, 0);

    grid.appendChild(createCard({
      title: `${subject.order}. ${subject.name}`,
      subtitle: subject.description,
      className: `subject-card subject-anim subject-${subject.id}`,
      href: `#/learn/${subject.id}`,
      children: [
        createSubjectIconEl(subject.id, 'subject-card__anim'),
        createBadge(`${totalLessons} lessons`, 'muted'),
        createProgressBar(progress.lessonPercent, {
          label: 'Lessons completed',
          completed: progress.completedLessons,
          total: totalLessons,
        }),
        Object.assign(document.createElement('p'), {
          className: 'text-sm text-muted mb-0',
          textContent: `${progress.readiness}% estimated readiness`,
        }),
      ],
    }));
  }

  container.appendChild(grid);
  return container;
}

export async function renderSubjectDetail(params) {
  const subject = getSubject(params.subjectId);
  if (!subject) return notFound('Subject not found');

  const progress = await buildSubjectProgress(subject, contentBundle, storage);
  const totalLessons = subject.modules.reduce((s, m) => s + m.lessons.length, 0);
  const container = document.createElement('div');

  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <p class="text-sm text-muted mb-0"><a href="#/learn">Learn</a> / ${escapeHtml(subject.name)}</p>
    <h1 class="page-header__title">${escapeHtml(subject.name)}</h1>
    <p class="page-header__subtitle">${escapeHtml(subject.description)}</p>
  `;
  container.appendChild(createHeroShell({
    className: `page-header page-header--textured subject-${subject.id} mb-lg`,
    subjectId: subject.id,
    children: [heroContent],
  }));

  container.appendChild(createProgressBar(progress.lessonPercent, {
    label: 'Lessons completed',
    completed: progress.completedLessons,
    total: totalLessons,
  }));

  for (const mod of subject.modules) {
    const section = document.createElement('section');
    section.className = 'mb-lg';
    section.innerHTML = `<h2>${mod.name}</h2><p class="text-secondary">${mod.description}</p>`;

    const list = document.createElement('ul');
    list.className = 'lesson-outline mb-0';

    for (const lesson of mod.lessons) {
      const prog = await storage.getProgress(lesson.id);
      const li = document.createElement('li');
      li.className = 'lesson-outline__item';

      const link = document.createElement('a');
      link.href = `#/lesson/${lesson.id}`;
      link.textContent = lesson.title;
      li.appendChild(link);
      li.appendChild(createBadge(lesson.difficulty));

      if (prog?.complete) {
        li.appendChild(createBadge('Complete', 'complete'));
      }

      const meta = document.createElement('span');
      meta.className = 'text-sm text-muted';
      meta.textContent = ` · ${lesson.estimatedMinutes} min`;
      li.appendChild(meta);

      list.appendChild(li);
    }
    section.appendChild(list);
    container.appendChild(section);
  }

  const playgroundRoutes = {
    sql: '#/playground/sql',
    excel: '#/playground/excel',
    python: '#/playground/python',
    statistics: '#/playground/statistics',
  };
  const pgHref = playgroundRoutes[subject.id];
  if (pgHref) {
    const actions = document.createElement('div');
    actions.className = 'flex gap-sm mt-lg';
    actions.innerHTML = `<a href="${pgHref}" class="btn btn--secondary">Open ${subject.name} Workspace</a>`;
    container.appendChild(actions);
  }

  return container;
}

function notFound(msg) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `<h2>${msg}</h2><a href="#/learn" class="btn btn--primary">Back to Learn</a>`;
  return div;
}
