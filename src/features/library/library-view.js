import { contentBundle, getReference } from '../../content/index.js';
import { createHandbookSection } from '../../components/northstar-handbook.js';
import { storage } from '../../storage/storage-service.js';
import { createBadge, createButton, createEmptyState } from '../../components/ui.js';
import { debounce } from '../../utilities/helpers.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { showToast } from '../../components/toast-dialog.js';

const PAGE_SIZE = 50;

export async function renderLibrary(query = {}) {
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Reference Library</h1>
      <p class="page-header__subtitle">Searchable commands, formulas, concepts, and the Northstar Commerce handbook.</p>
    </header>
  `;

  if (contentBundle.northstarHandbook?.length) {
    container.appendChild(createHandbookSection(contentBundle.northstarHandbook));
  }

  const filters = createFilters(query);
  container.appendChild(filters);

  const countEl = document.createElement('p');
  countEl.id = 'library-count';
  countEl.className = 'text-sm text-muted mb-md';

  const listEl = document.createElement('div');
  listEl.id = 'library-results';

  container.appendChild(countEl);
  container.appendChild(listEl);

  let renderGeneration = 0;

  async function renderList() {
    const generation = ++renderGeneration;
    const filterValues = getFilterValues(filters);
    const bookmarks = await storage.getBookmarks();
    if (generation !== renderGeneration) return;

    const bookmarkIds = new Set(bookmarks.map((b) => b.itemId));
    const refs = filterReferences(filterValues, query.ref, bookmarkIds);

    listEl.replaceChildren();
    countEl.textContent = refs.length
      ? `Showing ${Math.min(refs.length, PAGE_SIZE)} of ${refs.length} reference${refs.length === 1 ? '' : 's'}`
      : '';

    if (!refs.length) {
      listEl.appendChild(createEmptyState({
        icon: '📚',
        title: 'No references found',
        message: 'Try adjusting your filters or search for SQL, Excel, DAX, and more.',
      }));
      return;
    }

    const page = refs.slice(0, PAGE_SIZE);
    const fragment = document.createDocumentFragment();
    for (const ref of page) {
      if (generation !== renderGeneration) return;
      fragment.appendChild(createReferenceCard(ref, bookmarkIds.has(ref.id), async () => {
        await storage.toggleBookmark(ref.id, 'reference', ref.subjectId, ref.name);
        showToast('Bookmark updated', { type: 'success' });
        await renderList();
      }));
    }
    if (generation !== renderGeneration) return;
    listEl.appendChild(fragment);

    if (refs.length > PAGE_SIZE) {
      const note = document.createElement('p');
      note.className = 'text-muted text-sm';
      note.textContent = `Showing ${PAGE_SIZE} of ${refs.length} entries. Use filters to narrow results.`;
      listEl.appendChild(note);
    }
  }

  function applyFiltersToUrl() {
    const filterValues = getFilterValues(filters);
    const nextHash = buildLibraryHash(filterValues, query.ref);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    renderList();
  }

  bindFilterEvents(filters, applyFiltersToUrl);
  await renderList();

  if (query.ref) {
    const ref = getReference(query.ref);
    if (ref) container.prepend(createReferenceDetail(ref));
  }

  return container;
}

function bindFilterEvents(bar, onApply) {
  const debouncedApply = debounce(onApply, 250);
  bar.querySelector('#filter-subject')?.addEventListener('change', onApply);
  bar.querySelector('#filter-difficulty')?.addEventListener('change', onApply);
  bar.querySelector('#filter-type')?.addEventListener('change', onApply);
  bar.querySelector('#filter-bookmarked')?.addEventListener('change', onApply);
  bar.querySelector('#library-search')?.addEventListener('input', debouncedApply);
}

function buildLibraryHash(filters, highlightRef) {
  const params = new URLSearchParams();
  if (filters.subject) params.set('subject', filters.subject);
  if (filters.difficulty) params.set('difficulty', filters.difficulty);
  if (filters.contentType) params.set('type', filters.contentType);
  if (filters.bookmarked) params.set('bookmarked', filters.bookmarked);
  if (filters.search) params.set('q', filters.search);
  if (highlightRef) params.set('ref', highlightRef);
  const qs = params.toString();
  return qs ? `#/library?${qs}` : '#/library';
}

function createFilters(query) {
  const bar = document.createElement('div');
  bar.className = 'filter-bar';
  bar.innerHTML = `
    <input type="search" id="library-search" class="form-input" placeholder="Search references…" aria-label="Search references" style="flex:1;min-width:12rem" />
    <select id="filter-subject" class="form-select" aria-label="Filter by subject">
      <option value="">All subjects</option>
      ${contentBundle.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}
    </select>
    <select id="filter-difficulty" class="form-select" aria-label="Filter by difficulty">
      <option value="">All difficulties</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
    <select id="filter-type" class="form-select" aria-label="Filter by content type">
      <option value="">All types</option>
      <option value="command">Command</option>
      <option value="concept">Concept</option>
      <option value="function">Function</option>
      <option value="workflow">Workflow</option>
      <option value="formula">Formula</option>
      <option value="visualization">Visualization</option>
    </select>
    <select id="filter-bookmarked" class="form-select" aria-label="Filter bookmarked">
      <option value="">All items</option>
      <option value="bookmarked">Bookmarked only</option>
    </select>
  `;
  if (query.subject) bar.querySelector('#filter-subject').value = query.subject;
  if (query.difficulty) bar.querySelector('#filter-difficulty').value = query.difficulty;
  if (query.type) bar.querySelector('#filter-type').value = query.type;
  if (query.bookmarked) bar.querySelector('#filter-bookmarked').value = query.bookmarked;
  if (query.q) bar.querySelector('#library-search').value = query.q;
  return bar;
}

function getFilterValues(bar) {
  return {
    search: bar.querySelector('#library-search')?.value.trim() || '',
    subject: bar.querySelector('#filter-subject')?.value || '',
    difficulty: bar.querySelector('#filter-difficulty')?.value || '',
    contentType: bar.querySelector('#filter-type')?.value || '',
    bookmarked: bar.querySelector('#filter-bookmarked')?.value || '',
  };
}

function filterReferences(filters, highlightRef, bookmarkIds = new Set()) {
  let refs = [...contentBundle.references];

  if (filters.subject) refs = refs.filter((r) => r.subjectId === filters.subject);
  if (filters.difficulty) refs = refs.filter((r) => r.difficulty === filters.difficulty);
  if (filters.contentType) refs = refs.filter((r) => r.contentType === filters.contentType);
  if (filters.bookmarked) refs = refs.filter((r) => bookmarkIds.has(r.id));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    refs = refs.filter((r) =>
      [r.name, r.definition, r.syntax, r.category].some((f) => String(f).toLowerCase().includes(q)),
    );
  }
  if (highlightRef) {
    refs.sort((a, b) => (a.id === highlightRef ? -1 : b.id === highlightRef ? 1 : 0));
  }
  return refs;
}

function createReferenceCard(ref, bookmarked, onBookmarkToggle) {
  const card = document.createElement('article');
  card.className = 'card mb-md';
  card.id = ref.id;
  card.innerHTML = `
    <div class="card__header">
      <div>
        <h3 class="card__title">${escapeHtml(ref.name)}</h3>
        <p class="card__subtitle">${escapeHtml(ref.category)} · ${ref.subjectId.toUpperCase()}</p>
      </div>
      <div class="flex gap-sm">${createBadge(ref.difficulty).outerHTML}${createBadge(ref.contentType).outerHTML}</div>
    </div>
    <p>${escapeHtml(ref.definition)}</p>
    <pre><code>${escapeHtml(ref.syntax)}</code></pre>
  `;

  const actions = document.createElement('div');
  actions.className = 'flex gap-sm';
  actions.appendChild(createButton({
    label: bookmarked ? 'Bookmarked' : 'Bookmark',
    variant: 'secondary',
    size: 'sm',
    onClick: onBookmarkToggle,
  }));
  if (ref.practiceLink) {
    actions.appendChild(createButton({
      label: 'Practice',
      variant: 'ghost',
      size: 'sm',
      onClick: () => { window.location.hash = ref.practiceLink; },
    }));
  }
  card.appendChild(actions);
  return card;
}

function createReferenceDetail(ref) {
  const detail = document.createElement('section');
  detail.className = 'card mb-lg';
  detail.innerHTML = `
    <h2>${escapeHtml(ref.name)}</h2>
    <p><strong>Definition:</strong> ${escapeHtml(ref.definition)}</p>
    <p><strong>What it does:</strong> ${escapeHtml(ref.whatItDoes)}</p>
    <p><strong>When to use:</strong> ${escapeHtml(ref.whenToUse)}</p>
    <div class="stakeholder-box"><div class="stakeholder-box__label">Stakeholder question</div><p class="mb-0">${escapeHtml(ref.stakeholderQuestion)}</p></div>
    <pre><code>${escapeHtml(ref.syntax)}</code></pre>
    <p><strong>Common mistakes:</strong></p>
    <ul>${(ref.commonMistakes || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
  `;
  return detail;
}
