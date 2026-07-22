import { escapeHtml } from '../../utilities/sanitize.js';

export function showCompletionCelebration({ title, status = 'MISSION COMPLETE', impact, nextAction, onClose }) {
  const existing = document.querySelector('.completion-celebration');
  existing?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'completion-celebration';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', status);

  overlay.innerHTML = `
    <div class="completion-celebration__panel glass-panel">
      <p class="completion-celebration__status type-mono">${escapeHtml(status)}</p>
      <h2 class="completion-celebration__title">${escapeHtml(title)}</h2>
      ${impact ? `<p class="completion-celebration__impact">${escapeHtml(impact)}</p>` : ''}
      ${nextAction ? `<p class="text-sm text-muted">${escapeHtml(nextAction)}</p>` : ''}
      <button type="button" class="btn btn--primary completion-celebration__close">Continue</button>
    </div>
  `;

  const close = () => {
    overlay.classList.add('completion-celebration--hide');
    setTimeout(() => overlay.remove(), 250);
    onClose?.();
  };

  overlay.querySelector('.completion-celebration__close')?.addEventListener('click', close);
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.body.appendChild(overlay);
  overlay.querySelector('button')?.focus();
  return overlay;
}
