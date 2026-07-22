import { branding } from '../config/branding.js';
import { createSearchInput, navIcons } from '../components/search-input.js';
import { appState } from './app-state.js';
import { isActiveNav } from './router.js';

const navItems = [
  { href: '#/', label: 'Dashboard', icon: 'dashboard', section: 'main' },
  { href: '#/learn', label: 'Learn', icon: 'learn', section: 'main' },
  { href: '#/library', label: 'Library', icon: 'library', section: 'main' },
  { href: '#/practice', label: 'Practice Lab', icon: 'practice', section: 'main' },
  { href: '#/projects', label: 'Projects', icon: 'projects', section: 'main' },
  { href: '#/playground', label: 'Playground', icon: 'playground', section: 'tools' },
  { href: '#/career', label: 'Career Center', icon: 'career', section: 'tools' },
  { href: '#/settings', label: 'Settings', icon: 'settings', section: 'system' },
];

const mobileNavItems = navItems.filter((n) =>
  ['dashboard', 'learn', 'practice', 'library', 'settings'].includes(n.icon),
);

export function renderShell(contentOutlet) {
  const root = document.getElementById('app');
  root.innerHTML = '';
  root.className = 'app-root';

  const layout = document.createElement('div');
  layout.className = 'app-layout';

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.dataset.visible = 'false';
  overlay.addEventListener('click', () => closeSidebar());

  const sidebar = createSidebar();
  const main = createMain(contentOutlet);

  layout.appendChild(overlay);
  layout.appendChild(sidebar);
  layout.appendChild(main);
  layout.appendChild(createMobileNav());

  root.appendChild(createOfflineBanner());

  const updateHost = document.createElement('div');
  updateHost.id = 'update-banner-host';
  root.appendChild(updateHost);
  root.appendChild(layout);

  appState.subscribe('sidebarOpen', (open) => {
    sidebar.dataset.open = String(open);
    overlay.dataset.visible = String(open);
  });

  appState.subscribe('offline', (offline) => {
    const banner = document.getElementById('offline-banner');
    if (banner) banner.hidden = !offline;
  });

  appState.subscribe('updateAvailable', (available) => {
    const host = document.getElementById('update-banner-host');
    if (!host) return;
    if (available) {
      if (!host.firstChild) {
        host.appendChild(createUpdateBanner());
      }
    } else {
      host.innerHTML = '';
    }
  });

  window.addEventListener('online', () => appState.set('offline', false));
  window.addEventListener('offline', () => appState.set('offline', true));

  return root;
}

function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'app-sidebar';
  aside.dataset.open = 'false';
  aside.setAttribute('aria-label', 'Main navigation');

  aside.innerHTML = `
    <div class="app-sidebar__brand">
      <img src="${branding.logoPath}" alt="" class="app-sidebar__brand-logo" width="32" height="32" />
      <div class="app-sidebar__brand-text">
        <div class="app-sidebar__brand-name">${branding.name}</div>
        <div class="app-sidebar__brand-sub">${branding.subtitle}</div>
      </div>
    </div>
  `;

  const nav = document.createElement('nav');
  nav.className = 'app-sidebar__nav';
  nav.setAttribute('aria-label', 'Primary');

  let currentSection = '';
  for (const item of navItems) {
    if (item.section !== currentSection) {
      currentSection = item.section;
      const title = document.createElement('div');
      title.className = 'nav-section__title';
      title.textContent = item.section === 'main' ? 'Learn' : item.section === 'tools' ? 'Tools' : 'Account';
      nav.appendChild(title);
    }
    nav.appendChild(createNavLink(item));
  }

  aside.appendChild(nav);
  return aside;
}

function createNavLink(item) {
  const a = document.createElement('a');
  a.href = item.href;
  a.className = 'nav-item';
  a.innerHTML = `<span class="nav-item__icon">${navIcons[item.icon]}</span><span class="nav-item__label">${item.label}</span>`;
  a.addEventListener('click', () => closeSidebar());
  return a;
}

function createMain(contentOutlet) {
  const main = document.createElement('main');
  main.className = 'app-main';

  const header = document.createElement('header');
  header.className = 'app-header';

  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.className = 'btn btn--ghost btn--icon app-header__menu-btn';
  menuBtn.setAttribute('aria-label', 'Open navigation menu');
  menuBtn.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  menuBtn.addEventListener('click', () => appState.set('sidebarOpen', true));

  const search = createSearchInput({});
  search.className += ' app-header__search';

  header.appendChild(menuBtn);
  header.appendChild(search);

  const content = document.createElement('div');
  content.id = 'main-content';
  content.className = 'app-content';
  content.tabIndex = -1;
  content.setAttribute('role', 'main');
  content.appendChild(contentOutlet);

  main.appendChild(header);
  main.appendChild(content);
  return main;
}

function createMobileNav() {
  const nav = document.createElement('nav');
  nav.className = 'mobile-nav';
  nav.setAttribute('aria-label', 'Mobile navigation');

  for (const item of mobileNavItems) {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'mobile-nav__item';
    a.innerHTML = `${navIcons[item.icon]}<span>${item.label.split(' ')[0]}</span>`;
    nav.appendChild(a);
  }
  return nav;
}

function createOfflineBanner() {
  const banner = document.createElement('div');
  banner.id = 'offline-banner';
  banner.className = 'offline-banner';
  banner.hidden = navigator.onLine;
  banner.setAttribute('role', 'status');
  banner.textContent = 'You are offline. Cached content is available.';
  return banner;
}

function createUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'update-banner';
  banner.className = 'update-banner';
  banner.setAttribute('role', 'status');
  banner.innerHTML = `
    <span>A new version of DATApath is available.</span>
    <button type="button" class="btn" id="update-reload-btn">Reload to update</button>
  `;
  banner.querySelector('#update-reload-btn')?.addEventListener('click', () => {
    window.location.reload();
  });
  return banner;
}

function closeSidebar() {
  appState.set('sidebarOpen', false);
}

export function updateNavActiveStates() {
  document.querySelectorAll('.nav-item, .mobile-nav__item').forEach((el) => {
    if (isActiveNav(el.getAttribute('href'))) {
      el.setAttribute('aria-current', 'page');
    } else {
      el.removeAttribute('aria-current');
    }
  });
}

export function setWideContent(wide) {
  const content = document.getElementById('main-content');
  if (content) content.classList.toggle('app-content--wide', wide);
}
