import { parseHashRoute } from '../utilities/helpers.js';
import { appState } from './app-state.js';
import { branding } from '../config/branding.js';

const routes = [];
let routeHandler = null;
let routeOutlet = null;
let routeOnChange = null;

export function registerRoute(pattern, handler, meta = {}) {
  routes.push({ pattern, handler, meta });
}

function matchRoute(segments) {
  // Prefer the most specific (longest) matching route
  const sorted = [...routes].sort((a, b) => {
    const aLen = a.pattern.split('/').filter(Boolean).length;
    const bLen = b.pattern.split('/').filter(Boolean).length;
    return bLen - aLen;
  });

  for (const route of sorted) {
    const parts = route.pattern.split('/').filter(Boolean);
    if (parts.length !== segments.length) continue;

    const params = {};
    let matched = true;

    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) {
        params[parts[i].slice(1)] = segments[i];
      } else if (parts[i] !== segments[i]) {
        matched = false;
        break;
      }
    }

    if (matched) return { route, params };
  }

  return null;
}

export async function navigate(hash) {
  if (hash && !hash.startsWith('#')) hash = `#${hash}`;
  window.location.hash = hash;
}

export function getCurrentPath() {
  return parseHashRoute().path;
}

export function initRouter(outlet, onRouteChange) {
  routeOutlet = outlet;
  routeOnChange = onRouteChange;

  async function handleRoute() {
    const { segments, query } = parseHashRoute();
    const path = segments.length ? segments.join('/') : '/';

    let match = matchRoute(segments.length ? segments : []);

    if (!match && (path === '/' || path === '')) {
      const home = routes.find((r) => r.pattern === '/');
      if (home) match = { route: home, params: {} };
    }

    if (!match) {
      const notFound = routes.find((r) => r.pattern === '404');
      match = notFound
        ? { route: notFound, params: {} }
        : { route: routes.find((r) => r.pattern === '/'), params: {} };
    }

    const meta = match.route.meta || {};
    appState.set('currentRoute', { path, params: match.params, query, meta });
    updatePageTitle(meta.title);

    outlet.innerHTML = '';
    outlet.appendChild(createLoadingState());

    try {
      const view = await match.route.handler(match.params, query);
      outlet.innerHTML = '';
      if (view) outlet.appendChild(view);
      if (onRouteChange) onRouteChange(meta, path);
    } catch (err) {
      console.error('Route error:', err);
      outlet.innerHTML = '';
      outlet.appendChild(createErrorView(err));
    }
  }

  routeHandler = handleRoute;
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

export function refreshCurrentRoute() {
  if (routeHandler) routeHandler();
}

function updatePageTitle(sectionTitle) {
  const base = branding.name;
  document.title = sectionTitle && sectionTitle !== 'Dashboard'
    ? `${sectionTitle} · ${base}`
    : base;
}

function createLoadingState() {
  const el = document.createElement('div');
  el.className = 'loading-state';
  el.setAttribute('role', 'status');
  el.innerHTML = '<div class="spinner" aria-hidden="true"></div><span>Loading…</span>';
  return el;
}

function createErrorView(err) {
  const el = document.createElement('div');
  el.className = 'empty-state';
  el.innerHTML = `
    <div class="empty-state__icon" aria-hidden="true">⚠️</div>
    <h2>Something went wrong</h2>
  `;
  const p = document.createElement('p');
  p.textContent = err.message || 'An unexpected error occurred.';
  el.appendChild(p);
  const link = document.createElement('a');
  link.href = '#/';
  link.className = 'btn btn--primary';
  link.style.marginTop = '1rem';
  link.style.display = 'inline-flex';
  link.textContent = 'Return to Dashboard';
  el.appendChild(link);
  return el;
}

export function isActiveNav(href) {
  const { segments } = parseHashRoute();
  const path = segments.length ? `/${segments.join('/')}` : '/';
  const target = href.replace('#', '');

  if (target === '/') return path === '/';

  // Exact match for section roots (e.g. /learn but not /lesson/…)
  if (target === '/learn') return path === '/learn' || path.startsWith('/learn/');
  if (target === '/playground') return path === '/playground' || path.startsWith('/playground/');
  if (target === '/projects') return path === '/projects' || path.startsWith('/projects/');

  return path === target || path.startsWith(`${target}/`);
}
