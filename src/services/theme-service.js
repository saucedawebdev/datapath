import { storage } from '../storage/storage-service.js';

export class ThemeManager {
  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', () => this.applyFromPrefs());
  }

  resolveTheme(theme) {
    if (theme === 'system') {
      return this.mediaQuery.matches ? 'dark' : 'light';
    }
    return theme;
  }

  async applyFromPrefs() {
    const prefs = await storage.getPreferences();
    this.apply(prefs);
  }

  apply(prefs) {
    const resolved = this.resolveTheme(prefs.theme || 'system');
    document.documentElement.setAttribute('data-theme', resolved);

    if (prefs.fontSize && prefs.fontSize !== 'default') {
      document.documentElement.setAttribute('data-font-size', prefs.fontSize);
    } else {
      document.documentElement.removeAttribute('data-font-size');
    }

    if (prefs.reducedMotion) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = resolved === 'dark' ? '#1e293b' : '#1a56db';
  }

  async setTheme(theme) {
    await storage.updatePreferences({ theme });
    this.apply(await storage.getPreferences());
  }
}

export const themeManager = new ThemeManager();
