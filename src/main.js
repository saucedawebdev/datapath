import './styles/main.css';
import { renderShell, updateNavActiveStates, setWideContent } from './app/shell.js';
import { initRouter, registerRoute } from './app/router.js';
import { initToastRegion } from './components/toast-dialog.js';
import { storage } from './storage/storage-service.js';
import { themeManager } from './services/theme-service.js';
import { appState } from './app/app-state.js';
import contentBundle from './content/index.js';
import { runBootScreen } from './components/visual/boot-screen.js';
import { initCommandPalette } from './features/command-palette/command-palette.js';

async function bootstrap() {
  initToastRegion();
  setupSkipLink();

  const outlet = document.createElement('div');
  renderShell(outlet);

  await storage.init();
  appState.set('content', contentBundle);
  await themeManager.applyFromPrefs();

  initCommandPalette(contentBundle);

  registerRoutes();
  initRouter(outlet, () => {
    updateNavActiveStates();
    setWideContent(false);
  });

  setupPWA();

  runBootScreen({
    steps: [
      'Initializing DATApath…',
      'Loading Northstar dataset…',
      'Verifying curriculum…',
      'Preparing analytics environment…',
    ],
  }).catch(() => {});
}

function registerRoutes() {
  registerRoute('/', () => import('./features/dashboard/dashboard-view.js').then((m) => m.renderDashboard()), { title: 'Dashboard' });
  registerRoute('404', () => Promise.resolve(renderNotFound()), { title: 'Not Found' });
  registerRoute('learn', () => import('./features/learning/learn-view.js').then((m) => m.renderLearnOverview()), { title: 'Learn' });
  registerRoute('learn/:subjectId', (params) => import('./features/learning/learn-view.js').then((m) => m.renderSubjectDetail(params)), { title: 'Subject' });
  registerRoute('lesson/:lessonId', (params, query) => import('./features/learning/lesson-view.js').then((m) => m.renderLesson(params, query)), { title: 'Lesson' });
  registerRoute('library', (_, query) => import('./features/library/library-view.js').then((m) => m.renderLibrary(query)), { title: 'Library' });
  registerRoute('practice/:subjectId/:slug/:practiceType', (params, query) => import('./features/practice/practice-view.js').then((m) => m.renderPractice(params, query)), { title: 'Practice' });
  registerRoute('practice', (_, query) => import('./features/practice/practice-view.js').then((m) => m.renderPractice({}, query)), { title: 'Practice' });
  registerRoute('projects', () => import('./features/projects/projects-view.js').then((m) => m.renderProjectsList()), { title: 'Projects' });
  registerRoute('projects/:projectId', (params) => import('./features/projects/projects-view.js').then((m) => m.renderProjectDetail(params)), { title: 'Project' });
  registerRoute('playground', () => import('./features/playground/playground-view.js').then((m) => m.renderPlaygroundHub()), { title: 'Playground' });
  registerRoute('playground/sql', () => import('./features/playground/sql-workspace-view.js').then((m) => m.renderSqlPlayground()), { title: 'SQL Playground' });
  registerRoute('playground/python', () => import('./features/playground/python-workspace-view.js').then((m) => m.renderPythonPlayground()), { title: 'Python Lab' });
  registerRoute('playground/excel', () => import('./features/playground/excel-workspace-view.js').then((m) => m.renderExcelPlayground()), { title: 'Spreadsheet Lab' });
  registerRoute('playground/statistics', () => import('./features/playground/statistics-workspace-view.js').then((m) => m.renderStatisticsPlayground()), { title: 'Statistics Lab' });
  registerRoute('career', () => import('./features/career/career-view.js').then((m) => m.renderCareerCenter()), { title: 'Career Center' });
  registerRoute('settings', () => import('./features/settings/settings-view.js').then((m) => m.renderSettings()), { title: 'Settings' });
  registerRoute('search', (_, query) => import('./features/search/search-view.js').then((m) => m.renderSearch(query)), { title: 'Search' });
}

function setupSkipLink() {
  const skip = document.querySelector('.skip-link');
  skip?.addEventListener('click', (event) => {
    event.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: false });
    }
  });
}

function setupPWA() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      onNeedRefresh() {
        appState.set('updateAvailable', true);
      },
      onOfflineReady() {
        console.info('DataPath is ready for offline use.');
      },
    });
  }).catch(() => {
    // PWA register unavailable
  });
}

function renderNotFound() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <h2>Page not found</h2>
    <p>The page you requested does not exist.</p>
    <a href="#/" class="btn btn--primary">Return to Dashboard</a>
  `;
  return div;
}

bootstrap().catch((err) => {
  console.error('Failed to start DataPath:', err);
  document.getElementById('app').innerHTML = `
    <div class="empty-state">
      <h1>Unable to start DataPath</h1>
      <p>${err.message}</p>
    </div>
  `;
});
