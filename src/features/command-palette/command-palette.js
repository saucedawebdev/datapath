import { searchContent } from '../../services/search-service.js';
import { findContinueLearning } from '../../services/progress-service.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { storage } from '../../storage/storage-service.js';

let paletteEl = null;
let focusReturn = null;
let selectedIndex = 0;
let flatItems = [];
let keydownHandler = null;

const NAV_ITEMS = [
  { label: 'Dashboard', href: '#/', section: 'Navigation' },
  { label: 'Learn', href: '#/learn', section: 'Navigation' },
  { label: 'Practice Lab', href: '#/practice', section: 'Navigation' },
  { label: 'Library', href: '#/library', section: 'Navigation' },
  { label: 'Projects', href: '#/projects', section: 'Navigation' },
  { label: 'Playground', href: '#/playground', section: 'Navigation' },
  { label: 'Career Center', href: '#/career', section: 'Navigation' },
  { label: 'Settings', href: '#/settings', section: 'Navigation' },
];

export function initCommandPalette(contentBundle) {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette(contentBundle);
    }
  });
}

export async function openCommandPalette(contentBundle) {
  if (paletteEl) {
    closeCommandPalette();
    return;
  }

  focusReturn = document.activeElement;
  paletteEl = document.createElement('div');
  paletteEl.className = 'command-palette';
  paletteEl.innerHTML = `
    <div class="command-palette__backdrop"></div>
    <div class="command-palette__panel glass-panel" role="dialog" aria-modal="true" aria-label="Command palette">
      <input type="search" class="command-palette__input form-input" placeholder="Search lessons, references, projects, navigation…" aria-label="Command palette search" />
      <div class="command-palette__results" role="listbox"></div>
    </div>
  `;

  document.body.appendChild(paletteEl);
  const input = paletteEl.querySelector('.command-palette__input');
  const resultsEl = paletteEl.querySelector('.command-palette__results');

  paletteEl.querySelector('.command-palette__backdrop')?.addEventListener('click', closeCommandPalette);

  keydownHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCommandPalette();
    }
    if (e.key === 'Tab' && paletteEl) {
      trapFocus(e, paletteEl.querySelector('.command-palette__panel'));
    }
  };
  document.addEventListener('keydown', keydownHandler);

  input.addEventListener('input', () => renderResults(contentBundle, input.value, resultsEl));
  input.addEventListener('keydown', (e) => handleKeys(e, resultsEl));

  await renderResults(contentBundle, '', resultsEl);
  input.focus();
}

function closeCommandPalette() {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
  paletteEl?.remove();
  paletteEl = null;
  focusReturn?.focus?.();
}

function trapFocus(e, container) {
  if (!container) return;
  const focusable = container.querySelectorAll('input, button, [href], [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

async function renderResults(contentBundle, query, container) {
  const allProgress = await storage.getAllProgress();
  const progressMap = Object.fromEntries(allProgress.map((p) => [p.id, p]));
  const bookmarks = await storage.getBookmarks();
  const bookmarkSet = new Set(bookmarks.map((b) => b.itemId));
  const activity = await storage.getRecentActivity(5);
  const continueTarget = findContinueLearning(contentBundle.subjects, progressMap);

  const sections = [];

  if (continueTarget) {
    sections.push({
      title: 'Suggested',
      items: [{
        label: `Continue: ${continueTarget.lesson.title}`,
        href: `#/lesson/${continueTarget.lesson.id}`,
        meta: continueTarget.subject.name,
      }],
    });
  }

  if (activity.length) {
    sections.push({
      title: 'Recent',
      items: activity.slice(0, 5).map((a) => ({
        label: a.type.replace(/-/g, ' '),
        href: a.itemId?.startsWith('power-bi') || a.itemId?.includes('lesson') ? `#/lesson/${a.itemId}` : '#/',
        meta: a.subjectId,
      })),
    });
  }

  if (bookmarks.length) {
    sections.push({
      title: 'Bookmarks',
      items: bookmarks.slice(0, 5).map((b) => ({
        label: b.title,
        href: b.itemType === 'lesson' ? `#/lesson/${b.itemId}` : `#/library?ref=${b.itemId}`,
        meta: 'Bookmark',
      })),
    });
  }

  const searchResults = query.trim().length >= 2
    ? searchContent(query, contentBundle, progressMap, bookmarkSet)
    : [];

  const grouped = {};
  for (const r of searchResults.slice(0, 12)) {
    const key = r.type.charAt(0).toUpperCase() + r.type.slice(1) + 's';
    grouped[key] = grouped[key] || [];
    grouped[key].push({ label: r.title, href: r.href, meta: r.subjectId, html: r.context });
  }
  for (const [title, items] of Object.entries(grouped)) {
    sections.push({ title, items });
  }

  if (!query.trim()) {
    sections.push({ title: 'Navigation', items: NAV_ITEMS });
  }

  flatItems = sections.flatMap((s) => s.items.map((item) => ({ ...item, section: s.title })));
  selectedIndex = 0;

  container.innerHTML = sections.map((section) => `
    <div class="command-palette__section">
      <p class="command-palette__section-title type-mono">${escapeHtml(section.title)}</p>
      ${section.items.map((item, idx) => {
        const globalIdx = flatItems.findIndex((f) => f.label === item.label && f.href === item.href);
        return `<button type="button" class="command-palette__item${globalIdx === selectedIndex ? ' command-palette__item--active' : ''}" data-index="${globalIdx}" data-href="${escapeHtml(item.href)}">
          <span>${item.html || escapeHtml(item.label)}</span>
          <span class="command-palette__meta">${escapeHtml(item.meta || '')}</span>
        </button>`;
      }).join('')}
    </div>
  `).join('') || '<p class="text-muted">No results</p>';

  container.querySelectorAll('.command-palette__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.location.hash = btn.dataset.href;
      closeCommandPalette();
    });
  });
}

function handleKeys(e, container) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeCommandPalette();
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = Math.min(flatItems.length - 1, selectedIndex + 1);
    highlightItem(container);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = Math.max(0, selectedIndex - 1);
    highlightItem(container);
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    const item = flatItems[selectedIndex];
    if (item?.href) {
      window.location.hash = item.href;
      closeCommandPalette();
    }
  }
}

function highlightItem(container) {
  container.querySelectorAll('.command-palette__item').forEach((el) => {
    el.classList.toggle('command-palette__item--active', Number(el.dataset.index) === selectedIndex);
  });
}

export function isCommandPaletteOpen() {
  return Boolean(paletteEl);
}
