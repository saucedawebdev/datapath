import { contentBundle } from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { searchContent } from '../../services/search-service.js';
import { createBadge, createEmptyState } from '../../components/ui.js';
import { debounce } from '../../utilities/helpers.js';
import { escapeHtml } from '../../utilities/sanitize.js';

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
  input.placeholder = 'Search by subject, skill, formula, or topic…';
  input.setAttribute('aria-label', 'Search content');
  input.value = query.q || '';
  input.autofocus = true;

  const resultsEl = document.createElement('div');
  resultsEl.setAttribute('role', 'listbox');
  resultsEl.setAttribute('aria-label', 'Search results');

  container.appendChild(input);
  container.appendChild(resultsEl);

  function highlight(text, term) {
    if (!term || term.length < 2) return escapeHtml(text);
    const lower = text.toLowerCase();
    const t = term.toLowerCase();
    const idx = lower.indexOf(t);
    if (idx === -1) return escapeHtml(text);
    const before = escapeHtml(text.slice(0, idx));
    const match = escapeHtml(text.slice(idx, idx + term.length));
    const after = escapeHtml(text.slice(idx + term.length));
    return `${before}<mark>${match}</mark>${after}`;
  }

  async function doSearch(q) {
    const allProgress = await storage.getAllProgress();
    const progressMap = Object.fromEntries(allProgress.map((p) => [p.id, p]));
    const bookmarks = await storage.getBookmarks();
    const bookmarkSet = new Set(bookmarks.map((b) => b.itemId));

    const results = searchContent(q, contentBundle, progressMap, bookmarkSet);
    resultsEl.innerHTML = '';

    if (!q || q.trim().length < 2) {
      resultsEl.appendChild(createEmptyState({
        message: 'Enter at least 2 characters to search lessons, tools, and skills.',
      }));
      return;
    }

    if (!results.length) {
      resultsEl.appendChild(createEmptyState({
        title: 'No lessons matched your search',
        message: 'Try a subject name, tool, formula, or skill — for example “JOIN”, “pivot”, or “confidence interval”.',
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
          <span>${escapeHtml(r.type)}</span>
          <span>${escapeHtml(r.subjectId?.toUpperCase() || '')}</span>
          ${r.difficulty ? createBadge(r.difficulty).outerHTML : ''}
          ${r.complete ? createBadge('Complete', 'complete').outerHTML : ''}
          ${r.bookmarked ? '<span aria-label="Bookmarked">★</span>' : ''}
        </div>
        <strong>${highlight(r.title, q.trim())}</strong>
        <p class="text-secondary mb-0">${highlight(r.context, q.trim())}</p>
      `;
      a.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          input.focus();
          return;
        }
        const items = [...resultsEl.querySelectorAll('.search-result')];
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[Math.min(index + 1, items.length - 1)]?.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index === 0) input.focus();
          else items[Math.max(index - 1, 0)]?.focus();
        }
      });
      resultsEl.appendChild(a);
    });
  }

  const debouncedSearch = debounce((term) => doSearch(term), 300);
  input.addEventListener('input', () => debouncedSearch(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') input.value = '';
  });
  await doSearch(input.value);

  return container;
}
