import { contentBundle } from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { createBadge, createEmptyState, createProgressBar } from '../../components/ui.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { debounce } from '../../utilities/helpers.js';
import {
  buildPracticeRoute,
  filterSubjectExercises,
  getExercisesForSubject,
  getPracticeTypeLabel,
  getSubjectPracticeStats,
} from '../../services/practice-service.js';
import { branding } from '../../config/branding.js';

export async function renderPracticeHub(query = {}) {
  if (query.subject && contentBundle.subjects.some((s) => s.id === query.subject)) {
    return renderSubjectPractice(query.subject, query);
  }

  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Practice Lab</h1>
      <p class="page-header__subtitle">Subject-specific guided practice and independent challenges — separate from the free-form Playground.</p>
    </header>
  `;

  const completedIds = await storage.getCompletedExerciseIds();
  const grid = document.createElement('div');
  grid.className = 'grid grid--auto';

  for (const subjectId of branding.subjectOrder) {
    const subject = contentBundle.subjects.find((s) => s.id === subjectId);
    if (!subject) continue;
    const stats = getSubjectPracticeStats(subjectId, completedIds);

    const card = document.createElement('a');
    card.href = `#/practice?subject=${subjectId}`;
    card.className = `card card--interactive subject-card subject-${subjectId}`;
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
    card.innerHTML = `
      <h3 class="card__title">${escapeHtml(subject.name)}</h3>
      <p class="card__subtitle">${stats.total} exercises · ${stats.completed} completed</p>
    `;
    card.appendChild(createProgressBar(stats.percent, { label: `${stats.percent}% complete` }));
    const resume = document.createElement('span');
    resume.className = 'btn btn--secondary btn--sm';
    resume.style.marginTop = 'var(--space-md)';
    resume.textContent = 'Resume Practice';
    card.appendChild(resume);
    grid.appendChild(card);
  }

  container.appendChild(grid);
  return container;
}

async function renderSubjectPractice(subjectId, query) {
  const subject = contentBundle.subjects.find((s) => s.id === subjectId);
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <p class="text-sm text-muted mb-0"><a href="#/practice">Practice Lab</a> / ${escapeHtml(subject?.name || subjectId)}</p>
      <h1 class="page-header__title">${escapeHtml(subject?.name || subjectId)} Practice</h1>
      <p class="page-header__subtitle">Filtered exercises for this subject only.</p>
    </header>
  `;

  const filters = createSubjectFilters(query);
  container.appendChild(filters);

  const listEl = document.createElement('div');
  listEl.id = 'practice-subject-results';
  container.appendChild(listEl);

  const completedIds = await storage.getCompletedExerciseIds();
  const bookmarks = await storage.getBookmarks();
  const bookmarkIds = new Set(bookmarks.filter((b) => b.itemType === 'exercise').map((b) => b.itemId));

  async function renderList() {
    const values = getFilterValues(filters);
    syncSubjectFilters(subjectId, values);
    const exercises = filterSubjectExercises(
      getExercisesForSubject(subjectId),
      values,
      completedIds,
      bookmarkIds,
    );

    listEl.replaceChildren();
    if (!exercises.length) {
      listEl.appendChild(createEmptyState({ title: 'No exercises match', message: 'Adjust filters or search terms.' }));
      return;
    }

    for (const ex of exercises) {
      const card = document.createElement('a');
      card.href = buildPracticeRoute(ex);
      card.className = 'card card--interactive mb-md';
      card.style.textDecoration = 'none';
      card.style.color = 'inherit';
      card.innerHTML = `
        <div class="card__header">
          <div>
            <h3 class="card__title">${escapeHtml(ex.title)}</h3>
            <p class="card__subtitle">${getPracticeTypeLabel(ex)} · ${ex.difficulty}</p>
          </div>
          <div class="flex gap-sm">
            ${createBadge(ex.interactionType).outerHTML}
            ${completedIds.has(ex.id) ? createBadge('Complete', 'complete').outerHTML : ''}
          </div>
        </div>
        <p class="text-secondary mb-0">${escapeHtml(ex.instructions.slice(0, 140))}…</p>
      `;
      listEl.appendChild(card);
    }
  }

  filters.addEventListener('change', renderList);
  filters.querySelector('#practice-subject-search')?.addEventListener('input', debounce(renderList, 250));
  await renderList();
  return container;
}

function createSubjectFilters(query) {
  const bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.innerHTML = `
    <input type="search" id="practice-subject-search" class="form-input" placeholder="Search exercises…" style="flex:1;min-width:12rem" />
    <select id="practice-filter-difficulty" class="form-select"><option value="">All levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select>
    <select id="practice-filter-type" class="form-select"><option value="">All types</option><option value="guided">Guided Practice</option><option value="independent">Independent Challenge</option></select>
    <select id="practice-filter-status" class="form-select"><option value="">All status</option><option value="completed">Completed</option><option value="incomplete">Incomplete</option></select>
    <select id="practice-filter-bookmarked" class="form-select"><option value="">All items</option><option value="bookmarked">Bookmarked</option></select>
  `;
  if (query.difficulty) bar.querySelector('#practice-filter-difficulty').value = query.difficulty;
  if (query.type) bar.querySelector('#practice-filter-type').value = query.type;
  if (query.status) bar.querySelector('#practice-filter-status').value = query.status;
  if (query.q) bar.querySelector('#practice-subject-search').value = query.q;
  return bar;
}

function getFilterValues(bar) {
  return {
    search: bar.querySelector('#practice-subject-search')?.value.trim() || '',
    difficulty: bar.querySelector('#practice-filter-difficulty')?.value || '',
    practiceType: bar.querySelector('#practice-filter-type')?.value || '',
    status: bar.querySelector('#practice-filter-status')?.value || '',
    bookmarked: bar.querySelector('#practice-filter-bookmarked')?.value || '',
  };
}

function syncSubjectFilters(subjectId, filters) {
  const params = new URLSearchParams({ subject: subjectId });
  if (filters.difficulty) params.set('difficulty', filters.difficulty);
  if (filters.practiceType) params.set('type', filters.practiceType);
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('q', filters.search);
  const next = `#/practice?${params.toString()}`;
  if (window.location.hash !== next) history.replaceState(null, '', next);
}
