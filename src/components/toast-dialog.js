import { escapeHtml } from '../utilities/sanitize.js';

let toastContainer = null;

export function initToastRegion() {
  toastContainer = document.getElementById('toast-region');
}

export function showToast(message, { type = 'info', duration = 4000 } = {}) {
  if (!toastContainer) initToastRegion();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

export function showDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false }) {
  return new Promise((resolve) => {
    const root = document.getElementById('dialog-root');
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.setAttribute('role', 'presentation');

    const dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'dialog-title');

    dialog.innerHTML = `
      <div class="dialog__header"><h2 class="dialog__title" id="dialog-title">${escapeHtml(title)}</h2></div>
      <div class="dialog__body"><p>${escapeHtml(message)}</p></div>
      <div class="dialog__footer">
        <button type="button" class="btn btn--secondary" data-action="cancel">${escapeHtml(cancelLabel)}</button>
        <button type="button" class="btn ${danger ? 'btn--danger' : 'btn--primary'}" data-action="confirm">${escapeHtml(confirmLabel)}</button>
      </div>
    `;

    overlay.appendChild(dialog);
    root.appendChild(overlay);

    const confirmBtn = dialog.querySelector('[data-action="confirm"]');
    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    confirmBtn.focus();

    function close(result) {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(result);
    }

    function onKey(e) {
      if (e.key === 'Escape') close(false);
    }

    confirmBtn.addEventListener('click', () => close(true));
    cancelBtn.addEventListener('click', () => close(false));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(false);
    });
    document.addEventListener('keydown', onKey);
  });
}
