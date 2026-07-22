/**
 * Verify PWA manifest and home-screen launch configuration for GitHub Pages.
 *
 * Local (dist):  BASE_PATH=/datapath/ node scripts/verify-pwa-deploy.js
 * Live deploy:   VERIFY_LIVE=1 DEPLOY_URL=https://saucedawebdev.github.io/datapath/ BASE_PATH=/datapath/ node scripts/verify-pwa-deploy.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const basePath = normalizeBase(process.env.BASE_PATH || '/datapath/');
const distDir = process.env.DIST_DIR || path.join(rootDir, 'dist');
const verifyLive = process.env.VERIFY_LIVE === '1';
const deployUrl = normalizeDeployUrl(
  process.env.DEPLOY_URL || `https://saucedawebdev.github.io${basePath}`,
);

const errors = [];

function normalizeBase(value) {
  let base = value.trim();
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

function normalizeDeployUrl(value) {
  return value.endsWith('/') ? value : `${value}/`;
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function scopeContains(scope, target) {
  try {
    const scopeUrl = new URL(scope, deployUrl);
    const targetUrl = new URL(target, deployUrl);
    return targetUrl.href.startsWith(scopeUrl.href);
  } catch {
    return false;
  }
}

function readDistManifest() {
  const manifestPath = path.join(distDir, 'manifest.webmanifest');
  assert(fs.existsSync(manifestPath), `Missing dist manifest: ${manifestPath}`);
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function verifyDistHtml() {
  const indexPath = path.join(distDir, 'index.html');
  assert(fs.existsSync(indexPath), `Missing dist index.html: ${indexPath}`);
  const html = fs.readFileSync(indexPath, 'utf8');

  const manifestLinks = [...html.matchAll(/<link[^>]+rel="manifest"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  assert(manifestLinks.length === 1, `Expected exactly 1 manifest link, found ${manifestLinks.length}: ${manifestLinks.join(', ')}`);
  assert(
    !manifestLinks.some((href) => href.includes('/assets/manifest-')),
    `Stale hashed manifest link detected: ${manifestLinks.join(', ')}`,
  );
  assert(
    manifestLinks[0] === withBase('manifest.webmanifest'),
    `Manifest href must be ${withBase('manifest.webmanifest')}, got ${manifestLinks[0]}`,
  );

  assert(!html.includes('/src/main.js'), 'dist/index.html still references source /src/main.js');
  assert(!html.includes('localhost'), 'dist/index.html contains localhost URL');
  assert(html.includes('id="app"'), 'dist/index.html missing #app mount element');
  assert(html.includes(withBase('assets/main-')), 'dist/index.html missing built JS asset path');
}

function withBase(relativePath) {
  return `${basePath}${relativePath}`.replace(/\/{2,}/g, '/');
}

function verifyManifestFields(manifest, label) {
  assert(manifest.start_url === basePath, `${label}: start_url must be ${basePath}, got ${manifest.start_url}`);
  assert(manifest.scope === basePath, `${label}: scope must be ${basePath}, got ${manifest.scope}`);
  assert(manifest.id === basePath, `${label}: id must be ${basePath}, got ${manifest.id}`);
  assert(scopeContains(manifest.scope, manifest.start_url), `${label}: scope must contain start_url`);

  assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, `${label}: manifest must declare icons`);
  for (const icon of manifest.icons) {
    assert(icon.src.startsWith(basePath), `${label}: icon src must use base path (${basePath}): ${icon.src}`);
    assert(!icon.src.includes('localhost'), `${label}: icon src must not use localhost: ${icon.src}`);
  }
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'follow' });
  return { response, text: await response.text() };
}

async function verifyLiveDeployment(manifest) {
  const startUrl = new URL(manifest.start_url, deployUrl).href;
  const manifestUrl = new URL(withBase('manifest.webmanifest'), deployUrl).href;
  const swUrl = new URL(withBase('sw.js'), deployUrl).href;

  const { response: manifestRes, text: manifestText } = await fetchText(manifestUrl);
  assert(manifestRes.ok, `Live manifest must resolve (${manifestUrl}): HTTP ${manifestRes.status}`);
  const liveManifest = JSON.parse(manifestText);
  verifyManifestFields(liveManifest, 'live manifest');

  const { response: startRes, text: startHtml } = await fetchText(startUrl);
  assert(startRes.ok, `Home-screen start_url must not 404 (${startUrl}): HTTP ${startRes.status}`);
  assert(startHtml.includes('id="app"'), `start_url HTML must include #app mount (${startUrl})`);
  assert(startHtml.includes(withBase('assets/main-')), `start_url HTML must reference built JS (${startUrl})`);
  assert(!startHtml.includes('/src/main.js'), `start_url HTML must not reference /src/main.js (${startUrl})`);

  const manifestLinks = [...startHtml.matchAll(/<link[^>]+rel="manifest"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
  assert(manifestLinks.length === 1, `Live index must expose one manifest link, found ${manifestLinks.length}`);
  assert(
    !manifestLinks.some((href) => href.includes('/assets/manifest-')),
    `Live index exposes stale hashed manifest: ${manifestLinks.join(', ')}`,
  );

  for (const icon of liveManifest.icons) {
    const iconUrl = new URL(icon.src, deployUrl).href;
    const iconRes = await fetch(iconUrl, { redirect: 'follow' });
    assert(iconRes.ok, `Manifest icon must resolve (${iconUrl}): HTTP ${iconRes.status}`);
  }

  const swScope = new URL('.', new URL(swUrl)).href;
  assert(
    scopeContains(swScope, startUrl),
    `Service worker scope must cover start_url (scope ${swScope}, start ${startUrl})`,
  );

  const rootRes = await fetch(new URL('/', deployUrl).origin + '/', { redirect: 'follow' });
  if (basePath !== '/') {
    assert(rootRes.status === 404, `Project site root must 404 to confirm subpath deployment (${rootRes.status})`);
  }
}

function verifyServiceWorkerFile() {
  const swPath = path.join(distDir, 'sw.js');
  assert(fs.existsSync(swPath), `Missing dist service worker: ${swPath}`);
  const sw = fs.readFileSync(swPath, 'utf8');
  assert(sw.includes('datapath-job-ready-v2'), 'Service worker cacheId must be datapath-job-ready-v2');
  assert(sw.includes(withBase('index.html')), `Service worker must use app-shell fallback ${withBase('index.html')}`);
}

verifyDistHtml();
const distManifest = readDistManifest();
verifyManifestFields(distManifest, 'dist manifest');
verifyServiceWorkerFile();

if (verifyLive) {
  await verifyLiveDeployment(distManifest);
}

if (errors.length) {
  console.error('PWA deployment verification failed:\n');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('PWA deployment verification passed.');
console.log(`  deployed URL: ${deployUrl}`);
console.log(`  base path:    ${basePath}`);
console.log(`  start_url:    ${distManifest.start_url}`);
console.log(`  scope:        ${distManifest.scope}`);
console.log(`  id:           ${distManifest.id}`);
console.log(`  sw scope:     ${withBase('')}`);
