import { clearElement } from '../utilities/helpers.js';

export function createButton({ label, variant = 'primary', size, icon, onClick, disabled, type = 'button', ariaLabel, className = '' }) {
  const btn = document.createElement('button');
  btn.type = type;
  btn.className = `btn btn--${variant}${size ? ` btn--${size}` : ''} ${className}`.trim();
  btn.disabled = !!disabled;
  if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
  if (icon) btn.appendChild(icon);
  if (label) btn.append(document.createTextNode(label));
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

export function createLinkButton({ label, href, variant = 'primary', className = '' }) {
  const a = document.createElement('a');
  a.href = href;
  a.className = `btn btn--${variant} ${className}`.trim();
  a.textContent = label;
  return a;
}

export function createCard({ title, subtitle, children = [], className = '', onClick, href }) {
  const card = document.createElement(href ? 'a' : 'div');
  card.className = `card${onClick || href ? ' card--interactive' : ''} ${className}`.trim();
  if (href) {
    card.href = href;
    card.style.textDecoration = 'none';
    card.style.color = 'inherit';
  }
  if (onClick) card.addEventListener('click', onClick);

  if (title || subtitle) {
    const header = document.createElement('div');
    header.className = 'card__header';
    const textWrap = document.createElement('div');
    if (title) {
      const h = document.createElement('h3');
      h.className = 'card__title';
      h.textContent = title;
      textWrap.appendChild(h);
    }
    if (subtitle) {
      const p = document.createElement('p');
      p.className = 'card__subtitle';
      p.textContent = subtitle;
      textWrap.appendChild(p);
    }
    header.appendChild(textWrap);
    card.appendChild(header);
  }

  for (const child of children) {
    if (child) card.appendChild(child);
  }
  return card;
}

export function createBadge(text, variant = '') {
  const span = document.createElement('span');
  span.className = `badge${variant ? ` badge--${variant}` : ''}`;
  span.textContent = text;
  return span;
}

export function createProgressBar(percent, { label, completed, total } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'progress-bar-wrap';
  if (label || completed != null) {
    const lbl = document.createElement('div');
    lbl.className = 'flex justify-between text-sm mb-md progress-bar__meta';
    const countText = completed != null && total != null ? `${completed} of ${total}` : '';
    lbl.innerHTML = `<span>${label || ''}</span><span>${countText}${countText ? ' · ' : ''}${Math.round(percent)}%</span>`;
    wrap.appendChild(lbl);
  }
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-valuenow', String(Math.round(percent)));
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  const fill = document.createElement('div');
  fill.className = 'progress-bar__fill';
  fill.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  bar.appendChild(fill);
  wrap.appendChild(bar);
  return wrap;
}

export function createEmptyState({ icon = '📭', title, message }) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <div class="empty-state__icon" aria-hidden="true">${icon}</div>
    ${title ? `<h3>${title}</h3>` : ''}
    <p>${message || 'Nothing here yet.'}</p>
  `;
  return div;
}

export function createLoadingState(message = 'Loading…') {
  const div = document.createElement('div');
  div.className = 'loading-state';
  div.setAttribute('role', 'status');
  div.innerHTML = `<div class="spinner" aria-hidden="true"></div><span>${message}</span>`;
  return div;
}

export function mountComponent(container, element) {
  clearElement(container);
  container.appendChild(element);
}
