import { storage } from '../../storage/storage-service.js';
import { themeManager } from '../../services/theme-service.js';
import { exportUserData, importUserData, resetAllUserData, resetSubjectData } from '../../services/backup-service.js';
import { contentBundle } from '../../content/index.js';
import { branding } from '../../config/branding.js';
import { createButton } from '../../components/ui.js';
import { showToast, showDialog } from '../../components/toast-dialog.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { showWelcomeOnboarding } from '../../components/welcome-onboarding.js';

export async function renderSettings() {
  const prefs = await storage.getPreferences();
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="page-header">
      <h1 class="page-header__title">Profile & Settings</h1>
      <p class="page-header__subtitle">Customize your learning experience and manage local data.</p>
    </header>
  `;

  const form = document.createElement('form');
  form.addEventListener('submit', (e) => e.preventDefault());

  form.innerHTML = `
    <section class="card mb-lg">
      <h2>Profile</h2>
      <div class="form-group">
        <label class="form-label" for="display-name">Display name</label>
        <input type="text" id="display-name" class="form-input" value="${escapeHtml(prefs.displayName || '')}" />
      </div>
      <div class="form-group">
        <label class="form-label" for="learning-goal">Learning goal</label>
        <select id="learning-goal" class="form-select">
          <option value="job-ready" ${prefs.learningGoal === 'job-ready' ? 'selected' : ''}>Job-ready analyst</option>
          <option value="upskill" ${prefs.learningGoal === 'upskill' ? 'selected' : ''}>Upskill in current role</option>
          <option value="explore" ${prefs.learningGoal === 'explore' ? 'selected' : ''}>Explore data analytics</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="daily-target">Daily learning target (minutes)</label>
        <input type="number" id="daily-target" class="form-input" min="5" max="480" value="${prefs.dailyTargetMinutes || 30}" />
      </div>
    </section>

    <section class="card mb-lg">
      <h2>Appearance & Accessibility</h2>
      <div class="form-group">
        <label class="form-label" for="theme">Theme</label>
        <select id="theme" class="form-select">
          <option value="system" ${prefs.theme === 'system' ? 'selected' : ''}>System</option>
          <option value="light" ${prefs.theme === 'light' ? 'selected' : ''}>Light</option>
          <option value="dark" ${prefs.theme === 'dark' ? 'selected' : ''}>Dark</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="font-size">Font size</label>
        <select id="font-size" class="form-select">
          <option value="default" ${prefs.fontSize === 'default' ? 'selected' : ''}>Default</option>
          <option value="large" ${prefs.fontSize === 'large' ? 'selected' : ''}>Large</option>
          <option value="xlarge" ${prefs.fontSize === 'xlarge' ? 'selected' : ''}>Extra large</option>
        </select>
      </div>
      <div class="form-group">
        <label class="flex items-center gap-sm">
          <input type="checkbox" id="reduced-motion" ${prefs.reducedMotion ? 'checked' : ''} />
          Reduce motion
        </label>
      </div>
    </section>

    <section class="card mb-lg">
      <h2>Help</h2>
      <p class="text-secondary mb-sm">Replay the welcome guide if you want a quick orientation to DATApath.</p>
      <div id="help-actions"></div>
    </section>

    <section class="card mb-lg">
      <h2>Data Backup</h2>
      <p class="text-secondary">Export all progress, notes, bookmarks, and preferences to a JSON file. Import restores data locally — nothing is sent to a server.</p>
      <div class="flex flex-wrap gap-sm" id="backup-actions"></div>
      <input type="file" id="import-file" accept=".json,application/json" class="sr-only" />
    </section>

    <section class="card mb-lg">
      <h2>Reset Options</h2>
      <p class="text-secondary">Destructive actions require confirmation.</p>
      <div class="form-group">
        <label class="form-label" for="reset-subject">Reset subject progress</label>
        <div class="flex gap-sm">
          <select id="reset-subject" class="form-select">
            ${contentBundle.subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="flex flex-wrap gap-sm" id="reset-actions"></div>
    </section>

    <p class="text-sm text-muted">${branding.name} v${branding.metadata.version} · Local-only · No analytics</p>
  `;

  const saveBtn = createButton({
    label: 'Save preferences',
    variant: 'primary',
    onClick: savePreferences,
  });
  form.querySelector('#help-actions').appendChild(createButton({
    label: 'Show welcome guide',
    variant: 'secondary',
    onClick: () => showWelcomeOnboarding({ hasProgress: false }),
  }));

  form.querySelector('#backup-actions').appendChild(createButton({
    label: 'Export backup',
    variant: 'secondary',
    onClick: async () => {
      await exportUserData();
      showToast('Backup downloaded', { type: 'success' });
    },
  }));
  form.querySelector('#backup-actions').appendChild(createButton({
    label: 'Import backup',
    variant: 'secondary',
    onClick: () => form.querySelector('#import-file').click(),
  }));

  form.querySelector('#reset-actions').appendChild(createButton({
    label: 'Reset selected subject',
    variant: 'secondary',
    onClick: resetSubject,
  }));
  form.querySelector('#reset-actions').appendChild(createButton({
    label: 'Reset all progress',
    variant: 'danger',
    onClick: resetAll,
  }));

  form.appendChild(saveBtn);

  form.querySelector('#import-file').addEventListener('change', importBackup);

  container.appendChild(form);
  return container;

  async function savePreferences() {
    const updates = {
      displayName: form.querySelector('#display-name').value.trim() || 'Learner',
      learningGoal: form.querySelector('#learning-goal').value,
      dailyTargetMinutes: parseInt(form.querySelector('#daily-target').value, 10) || 30,
      theme: form.querySelector('#theme').value,
      fontSize: form.querySelector('#font-size').value,
      reducedMotion: form.querySelector('#reduced-motion').checked,
    };
    await storage.updatePreferences(updates);
    await themeManager.apply(await storage.getPreferences());
    showToast('Preferences saved', { type: 'success' });
  }

  async function importBackup(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.json')) {
      showToast('Only JSON backup files are supported', { type: 'error' });
      return;
    }
    try {
      const existing = await storage.getAllProgress();
      let overwrite = false;
      if (existing.length > 0) {
        overwrite = await showDialog({
          title: 'Overwrite existing data?',
          message: 'Importing will replace your current progress unless you cancel.',
          confirmLabel: 'Overwrite',
          danger: true,
        });
        if (!overwrite) return;
      }
      await importUserData(file, { overwrite });
      showToast('Backup imported successfully', { type: 'success' });
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      if (err.message === 'OVERWRITE_REQUIRED') {
        showToast('Existing data found. Confirm overwrite to import.', { type: 'error' });
      } else {
        showToast(err.message, { type: 'error' });
      }
    }
    e.target.value = '';
  }

  async function resetSubject() {
    const subjectId = form.querySelector('#reset-subject').value;
    const confirmed = await showDialog({
      title: 'Reset subject progress?',
      message: `This will clear all lesson progress for ${subjectId}. Bookmarks and notes are kept.`,
      confirmLabel: 'Reset',
      danger: true,
    });
    if (confirmed) {
      await resetSubjectData(subjectId);
      showToast('Subject progress reset', { type: 'success' });
    }
  }

  async function resetAll() {
    const confirmed = await showDialog({
      title: 'Reset all progress?',
      message: 'This cannot be undone. Export a backup first if you want to keep your data.',
      confirmLabel: 'Reset everything',
      danger: true,
    });
    if (confirmed) {
      await resetAllUserData();
      showToast('All progress reset', { type: 'success' });
    }
  }
}
