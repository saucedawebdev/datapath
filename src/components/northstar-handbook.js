import { escapeHtml } from '../utilities/sanitize.js';

function renderSectionBody(body) {
  return String(body)
    .split('\n\n')
    .map((block) => {
      const lines = block.split('\n').map((line) => {
        const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        if (line.startsWith('• ')) return `<li>${bold.slice(2)}</li>`;
        return `<p class="mb-sm">${bold}</p>`;
      });
      if (lines.some((l) => l.startsWith('<li>'))) {
        return `<ul class="mb-sm">${lines.filter((l) => l.startsWith('<li>')).join('')}</ul>`;
      }
      return lines.join('');
    })
    .join('');
}

export function createHandbookSection(articles, { expandedId = null } = {}) {
  const section = document.createElement('section');
  section.className = 'northstar-handbook mb-lg';
  section.setAttribute('aria-label', 'Northstar Handbook');

  section.innerHTML = `
    <h2 class="lesson-section__title">Northstar Handbook</h2>
    <p class="text-secondary">Company reference for ${escapeHtml('Northstar Commerce')} — your employer throughout DATApath.</p>
  `;

  const list = document.createElement('div');
  list.className = 'northstar-handbook__list';

  for (const article of articles) {
    const details = document.createElement('details');
    details.className = 'card mb-sm';
    details.open = article.id === expandedId;
    details.innerHTML = `
      <summary class="card__title" style="cursor:pointer;padding:var(--space-md)">${escapeHtml(article.title)}</summary>
      <div class="card__body" style="padding:0 var(--space-md) var(--space-md)">
        ${article.sections.map((s) => `
          <h4 class="text-sm text-muted mt-md">${escapeHtml(s.heading)}</h4>
          ${renderSectionBody(s.body)}
        `).join('')}
      </div>
    `;
    list.appendChild(details);
  }

  section.appendChild(list);
  return section;
}
