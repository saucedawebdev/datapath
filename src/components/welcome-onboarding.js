import { storage } from '../storage/storage-service.js';
import { SUBJECT_ORDER, getSubjectTheme } from '../config/subject-theme.js';
import { branding } from '../config/branding.js';
import { createSubjectIconEl } from './visual/subject-icons.js';
import { createButton } from './ui.js';
import { escapeHtml } from '../utilities/sanitize.js';
import { navigate } from '../app/router.js';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * First-visit welcome onboarding — 3 steps, persisted in preferences.
 */
export async function maybeShowWelcomeOnboarding({ continueTarget, hasProgress }) {
  if (navigator.webdriver) return;
  const prefs = await storage.getPreferences();
  if (prefs.onboardingCompleted) return;

  showWelcomeOnboarding({ continueTarget, hasProgress });
}

export function showWelcomeOnboarding({ continueTarget, hasProgress } = {}) {
  const existing = document.getElementById('welcome-onboarding');
  if (existing) existing.remove();

  let step = 0;
  const overlay = document.createElement('div');
  overlay.id = 'welcome-onboarding';
  overlay.className = 'welcome-onboarding';
  overlay.setAttribute('role', 'presentation');

  const dialog = document.createElement('div');
  dialog.className = 'welcome-onboarding__dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'welcome-onboarding-title');

  const header = document.createElement('div');
  header.className = 'welcome-onboarding__header';
  header.innerHTML = `
    <h2 id="welcome-onboarding-title" class="welcome-onboarding__title"></h2>
    <button type="button" class="welcome-onboarding__close btn btn--ghost" aria-label="Close welcome guide">×</button>
  `;

  const body = document.createElement('div');
  body.className = 'welcome-onboarding__body';

  const footer = document.createElement('div');
  footer.className = 'welcome-onboarding__footer';

  dialog.appendChild(header);
  dialog.appendChild(body);
  dialog.appendChild(footer);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const titleEl = header.querySelector('#welcome-onboarding-title');
  const closeBtn = header.querySelector('.welcome-onboarding__close');
  let lastFocused = document.activeElement;

  function renderStep() {
    body.innerHTML = '';
    footer.innerHTML = '';

    if (step === 0) {
      titleEl.textContent = 'Welcome to DATApath';
      body.innerHTML = `
        <p class="welcome-onboarding__lead">Build practical data analytics skills through plain-English lessons, guided practice, business scenarios, and hands-on projects.</p>
        <p class="text-sm text-muted mb-0">${escapeHtml(branding.tagline)}</p>
      `;
    } else if (step === 1) {
      titleEl.textContent = 'The learning path';
      const list = document.createElement('ol');
      list.className = 'welcome-onboarding__subjects';
      for (const id of SUBJECT_ORDER) {
        const theme = getSubjectTheme(id);
        const li = document.createElement('li');
        li.className = `welcome-onboarding__subject subject-${id}`;
        li.appendChild(createSubjectIconEl(id, 'welcome-onboarding__subject-icon'));
        const text = document.createElement('span');
        text.innerHTML = `<strong>${escapeHtml(theme.name)}</strong> — ${escapeHtml(theme.descriptor)}`;
        li.appendChild(text);
        list.appendChild(li);
      }
      body.appendChild(list);
      const note = document.createElement('p');
      note.className = 'text-sm text-muted mb-0';
      note.textContent = 'Follow the recommended sequence or explore any subject in any order.';
      body.appendChild(note);
    } else {
      titleEl.textContent = 'Start learning';
      body.innerHTML = `<p class="mb-0">Your dashboard tracks progress, practice results, and capstone projects locally — no account required.</p>`;

      const primaryLabel = hasProgress ? 'Continue learning' : 'Start with SQL';
      const primaryHref = hasProgress && continueTarget
        ? `#/lesson/${continueTarget.lesson.id}`
        : '#/learn/sql';

      footer.appendChild(createButton({
        label: 'Skip',
        variant: 'ghost',
        onClick: () => dismiss(false),
      }));

      footer.appendChild(createButton({
        label: primaryLabel,
        variant: 'primary',
        onClick: () => {
          dismiss(true).then(() => { window.location.hash = primaryHref.replace('#', ''); });
        },
      }));

      footer.appendChild(createButton({
        label: 'Explore all subjects',
        variant: 'secondary',
        onClick: () => {
          dismiss(true).then(() => navigate('#/learn'));
        },
      }));
      bindFooterNav();
      return;
    }

    footer.appendChild(createButton({
      label: 'Skip',
      variant: 'ghost',
      onClick: () => dismiss(false),
    }));

    if (step > 0) {
      footer.appendChild(createButton({
        label: 'Back',
        variant: 'secondary',
        onClick: () => { step -= 1; renderStep(); },
      }));
    }

    footer.appendChild(createButton({
      label: step === 1 ? 'Next' : 'Continue',
      variant: 'primary',
      onClick: () => { step += 1; renderStep(); },
    }));
    bindFooterNav();
  }

  function bindFooterNav() {
    const primary = footer.querySelector('.btn--primary');
    primary?.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusables = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => !el.disabled);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onKey(e) {
    if (e.key === 'Escape') dismiss(false);
  }

  async function dismiss(completed) {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    dialog.removeEventListener('keydown', trapFocus);
    await storage.updatePreferences({ onboardingCompleted: true });
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  closeBtn.addEventListener('click', () => dismiss(false));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss(false);
  });
  document.addEventListener('keydown', onKey);
  dialog.addEventListener('keydown', trapFocus);

  renderStep();
}
