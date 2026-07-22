import { contentBundle } from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { searchContent } from '../../services/search-service.js';
import { createBadge, createEmptyState } from '../../components/ui.js';
import { debounce } from '../../utilities/helpers.js';

export async function renderSearch(query = {}) {
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Search</h1>
      <p class="page-header__subtitle">Find lessons, references, projects, and exercises across all subjects.</p>
    </header>
  `;

  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'form-input mb-lg';
  input.placeholder = 'Search…';
  input.setAttribute('aria-label', 'Search content');
  input.value = query.q || '';
  input.autofocus = true;

  const resultsEl = document.createElement('div');
  resultsEl.setAttribute('role', 'listbox');
  resultsEl.setAttribute('aria-label', 'Search results');

  container.appendChild(input);
  container.appendChild(resultsEl);

  async function doSearch(q) {
    const allProgress = await storage.getAllProgress();
    const progressMap = Object.fromEntries(allProgress.map((p) => [p.id, p]));
    const bookmarks = await storage.getBookmarks();
    const bookmarkSet = new Set(bookmarks.map((b) => b.itemId));

    const results = searchContent(q, contentBundle, progressMap, bookmarkSet);
    resultsEl.innerHTML = '';

    if (!q || q.trim().length < 2) {
      resultsEl.appendChild(createEmptyState({
        message: 'Enter at least 2 characters to search.',
      }));
      return;
    }

    if (!results.length) {
      resultsEl.appendChild(createEmptyState({
        title: 'No results',
        message: `No matches for "${q}"`,
      }));
      return;
    }

    results.forEach((r, index) => {
      const a = document.createElement('a');
      a.href = r.href;
      a.className = 'search-result';
      a.setAttribute('role', 'option');
      a.innerHTML = `
        <div class="search-result__meta">
          <span>${r.type}</span>
          <span>${r.subjectId?.toUpperCase()}</span>
          ${r.difficulty ? createBadge(r.difficulty).outerHTML : ''}
          ${r.complete ? createBadge('Complete', 'complete').outerHTML : ''}
          ${r.bookmarked ? '★' : ''}
        </div>
        <strong>${r.title}</strong>
        <p class="text-secondary mb-0">${r.context}</p>
      `;
      a.addEventListener('keydown', (e) => {
        const items = [...resultsEl.querySelectorAll('.search-result')];
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[Math.min(index + 1, items.length - 1)]?.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[Math.max(index - 1, 0)]?.focus();
        }
      });
      resultsEl.appendChild(a);
    });
  }

  const debouncedSearch = debounce((q) => doSearch(q), 300);
  input.addEventListener('input', () => debouncedSearch(input.value));
  await doSearch(input.value);

  return container;
}
