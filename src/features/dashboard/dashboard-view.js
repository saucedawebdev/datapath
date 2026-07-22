import { branding } from '../../config/branding.js';
import { storage } from '../../storage/storage-service.js';
import {
  buildSubjectProgress,
  calculateOverallProgress,
  findContinueLearning,
  identifyWeakSkills,
} from '../../services/progress-service.js';
import { contentBundle, getAllLessonRefs, getLesson, getExercise } from '../../content/index.js';
import { createCard, createProgressBar, createLinkButton } from '../../components/ui.js';
import { formatRelativeTime } from '../../utilities/helpers.js';
import { getAnalyticsSystemStatus, buildCapabilityDashboard } from '../../services/system-status-service.js';
import { getNorthstarMetrics } from '../../services/northstar-metrics-service.js';
import { computeVerifiedAchievements } from '../../services/achievement-service.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { getTimeGreeting } from '../../services/greeting-service.js';
import { computeCareerRank } from '../../services/career-rank-service.js';
import { createHeroShell } from '../../components/visual/hero-shell.js';
import { createMetricCard } from '../../components/visual/metric-card.js';
import { createDashboardChart } from '../../components/visual/dashboard-chart.js';
import { createSubjectCapabilityCard } from '../../components/visual/subject-capability-card.js';
import { animateKpiValue } from '../../components/visual/animated-kpi.js';

export async function renderDashboard() {
  const fragment = document.createDocumentFragment();
  const prefs = await storage.getPreferences();
  const allProgress = await storage.getAllProgress();
  const progressMap = Object.fromEntries(allProgress.map((p) => [p.id, p]));
  const bookmarks = await storage.getBookmarks();
  const activity = await storage.getRecentActivity(8);
  const practiceResults = await storage.getPracticeResults();
  const projectProgress = await storage.provider.getAll('projectProgress');
  const projectsCompleted = (contentBundle.projects || []).filter((p) =>
    projectProgress.some((pp) => pp.id === p.id && pp.complete),
  ).length;

  const subjectProgressList = await Promise.all(
    contentBundle.subjects.map((s) => buildSubjectProgress(s, contentBundle, storage)),
  );
  const overallProgress = calculateOverallProgress(subjectProgressList);
  const continueTarget = findContinueLearning(contentBundle.subjects, progressMap);
  const completedCount = allProgress.filter((p) => p.complete).length;
  const systemStatus = await getAnalyticsSystemStatus();
  const northstar = getNorthstarMetrics();
  const achievements = computeVerifiedAchievements({
    allProgress,
    subjectProgressList,
    subjects: contentBundle.subjects,
  });
  const capabilities = buildCapabilityDashboard(
    subjectProgressList,
    projectsCompleted,
    contentBundle.projects?.length || 6,
  );

  const careerRank = computeCareerRank({
    allProgress,
    subjects: contentBundle.subjects,
    practiceResults,
    projectsCompleted,
  });
  const greeting = getTimeGreeting(prefs.displayName);

  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <p class="analytics-os-line"><span class="analytics-os-line__brand">DATApath Analytics OS</span> · <span class="analytics-os-line__status type-mono">${systemStatus.systemReady ? 'SYSTEM READY' : 'SYSTEM CHECK'}</span></p>
    <p class="dashboard-hero__edition">${branding.edition}</p>
    <h1 class="dashboard-hero__title">${branding.heroTagline}</h1>
    <p class="dashboard-hero__subtitle"><strong>${escapeHtml(greeting.greeting)}</strong> ${escapeHtml(greeting.subtitle)}</p>
    <p class="text-sm text-muted">${completedCount} of ${branding.lessonCounts.total} lessons completed · ${overallProgress}% readiness</p>
    <div class="dashboard-hero__meta"></div>
  `;
  const heroMeta = heroContent.querySelector('.dashboard-hero__meta');
  const statusPanel = createSystemStatusPanel(systemStatus);
  statusPanel.classList.add('glass-panel');
  heroMeta.appendChild(statusPanel);

  const hero = createHeroShell({ className: 'dashboard-hero mb-lg', children: [heroContent] });
  fragment.appendChild(hero);

  const continueCard = createCard({
    title: 'Continue Learning',
    subtitle: continueTarget
      ? `${continueTarget.subject.name} · ${continueTarget.lesson.title}`
      : 'All 114 lessons complete — explore capstone projects.',
    className: 'mb-lg',
    children: [
      continueTarget
        ? createLinkButton({
            label: `Continue: ${continueTarget.lesson.title}`,
            href: `#/lesson/${continueTarget.lesson.id}`,
            variant: 'primary',
          })
        : createLinkButton({ label: 'Browse Projects', href: '#/projects', variant: 'primary' }),
    ],
  });
  fragment.appendChild(continueCard);

  const readinessCard = createCard({
    title: 'Analyst Capability Dashboard',
    subtitle: 'Verified readiness across skill categories',
    className: 'glass-panel',
    children: [
      createProgressBar(overallProgress, {
        label: 'Overall estimated readiness',
        completed: completedCount,
        total: branding.lessonCounts.total,
      }),
      createCapabilityGrid(capabilities),
      createCareerRankPanel(careerRank),
      Object.assign(document.createElement('p'), {
        className: 'text-sm text-muted mt-0 mb-0',
        textContent: 'Based on completed lessons, quizzes, practice, and projects — formula unchanged.',
      }),
    ],
  });
  fragment.appendChild(readinessCard);

  fragment.appendChild(createCard({
    title: 'Northstar Commerce Intelligence',
    subtitle: 'Connected fictional business dataset',
    className: 'mb-lg glass-panel',
    children: [
      createNorthstarIntel(northstar),
      (() => {
        const row = document.createElement('div');
        row.className = 'dashboard-charts-row mt-md';
        row.appendChild(createDashboardChart('revenue'));
        row.appendChild(createDashboardChart('orders'));
        return row;
      })(),
    ],
  }));

  if (achievements.length) {
    fragment.appendChild(createCard({
      title: 'Verified Milestones',
      subtitle: 'Achievements earned from completed progress',
      className: 'mb-lg',
      children: [createAchievementGrid(achievements)],
    }));
  }

  const subjectsSection = document.createElement('section');
  subjectsSection.className = 'mb-lg';
  subjectsSection.innerHTML = '<h2>Subject Progress</h2>';
  const subjectGrid = document.createElement('div');
  subjectGrid.className = 'grid grid--auto';

  for (const sp of subjectProgressList) {
    const subject = contentBundle.subjects.find((s) => s.id === sp.subjectId);
    subjectGrid.appendChild(createSubjectCapabilityCard({
      subject,
      progress: sp,
      progressMap,
    }));
  }
  subjectsSection.appendChild(subjectGrid);
  fragment.appendChild(subjectsSection);

  const twoCol = document.createElement('div');
  twoCol.className = 'grid grid--2';
  twoCol.appendChild(createCard({
    title: 'Recent Analyst Activity',
    children: activity.length
      ? [createAnalystActivityFeed(activity)]
      : [createActivityEmptyState()],
  }));
  twoCol.appendChild(createCard({
    title: 'Saved Bookmarks',
    children: bookmarks.length
      ? [createBookmarkList(bookmarks.slice(0, 5))]
      : [emptyNote('Bookmark lessons for quick access.')],
  }));
  fragment.appendChild(twoCol);

  const skillTagsMap = Object.fromEntries(
    contentBundle.exercises.map((e) => [e.id, e.skillTags || []]),
  );
  const weakSkills = identifyWeakSkills(practiceResults, skillTagsMap);
  const completedIds = allProgress.filter((p) => p.complete).map((p) => p.id);
  const reviewTopics = getAllLessonRefs()
    .filter((l) => completedIds.includes(l.id))
    .slice(0, 4);

  const insightsGrid = document.createElement('div');
  insightsGrid.className = 'grid grid--2';
  insightsGrid.appendChild(createCard({
    title: 'Weak Skills',
    children: weakSkills.length
      ? [createList(weakSkills.map((s) => `${s.skill} (${Math.round(s.accuracy * 100)}% accuracy)`))]
      : [emptyNote('Practice exercises to identify review areas.')],
  }));
  insightsGrid.appendChild(createCard({
    title: 'Recommended Review',
    children: reviewTopics.length
      ? [createLinkList(reviewTopics.map((l) => ({ label: l.title, href: `#/lesson/${l.id}` })))]
      : [emptyNote('Complete lessons to get review recommendations.')],
  }));
  fragment.appendChild(insightsGrid);

  fragment.appendChild(createCard({
    title: 'Capstone Projects',
    children: [
      createLinkList(contentBundle.projects.map((p) => ({
        label: p.title,
        href: `#/projects/${p.id}`,
      }))),
    ],
  }));

  const div = document.createElement('div');
  div.appendChild(fragment);
  requestAnimationFrame(() => {
    const readinessEl = div.querySelector('.progress-bar-wrap .progress-bar__meta span:last-child');
    if (readinessEl) animateKpiValue(readinessEl, overallProgress, { suffix: '%' });
  });
  return div;
}

function createCareerRankPanel(rank) {
  const panel = document.createElement('div');
  panel.className = 'career-rank-panel mt-md';
  panel.innerHTML = `
    <p class="career-rank-panel__title type-mono">CURRENT CAPABILITY</p>
    <p class="career-rank-panel__rank">${escapeHtml(rank.currentRank)}</p>
    <p class="text-sm"><strong>Verified:</strong></p>
    <ul class="mb-sm">${rank.verified.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ul>
    ${rank.nextRank ? `<p class="text-sm"><strong>Next:</strong> ${escapeHtml(rank.nextRank)}</p><ul class="mb-0">${rank.nextRequirements.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}
  `;
  return panel;
}

function createSystemStatusPanel({ items, systemReady }) {
  const panel = document.createElement('div');
  panel.className = 'system-status-panel';
  panel.setAttribute('aria-label', 'Analytics system status');
  panel.innerHTML = `<div class="system-status-panel__title">Analytics System Status</div>`;

  const grid = document.createElement('div');
  grid.className = 'system-status-panel__grid';
  for (const item of items) {
    const row = document.createElement('div');
    row.className = 'system-status-item';
    const statusClass = item.ok
      ? (item.status === 'Standby' || item.status === 'Loading' ? 'system-status-item__value--warn' : 'system-status-item__value--ok')
      : 'system-status-item__value--err';
    row.innerHTML = `
      <span class="system-status-item__label">${escapeHtml(item.label)}</span>
      <span class="system-status-item__value ${statusClass}">${escapeHtml(item.status)}</span>
    `;
    grid.appendChild(row);
  }
  panel.appendChild(grid);
  if (!systemReady) {
    const note = document.createElement('p');
    note.className = 'terminal-accent mt-sm mb-0';
    note.textContent = '> one or more services require attention';
    panel.appendChild(note);
  }
  return panel;
}

function createNorthstarIntel(metrics) {
  const wrap = document.createElement('div');
  wrap.className = 'metric-card-grid';
  const rows = [
    { label: 'Customers', value: metrics.customers, detail: 'Northstar dataset' },
    { label: 'Orders', value: metrics.orders, detail: 'Current dataset' },
    { label: 'Products', value: metrics.products, detail: 'Catalog tables' },
    { label: 'Regions', value: metrics.regions, detail: 'US regions' },
    { label: 'Campaigns', value: metrics.campaigns, detail: 'Marketing table' },
    { label: 'Revenue', value: metrics.revenue, detail: 'Order line revenue', formattedValue: metrics.revenue != null ? `$${metrics.revenue.toLocaleString()}` : null },
  ].filter((r) => r.value != null);

  for (const row of rows) {
    wrap.appendChild(createMetricCard(row));
  }
  return wrap;
}

function createCapabilityGrid(capabilities) {
  const grid = document.createElement('div');
  grid.className = 'capability-grid mt-md';
  for (const cap of capabilities) {
    const item = document.createElement('div');
    item.className = 'capability-item';
    item.innerHTML = `
      <div class="capability-item__label">${escapeHtml(cap.label)}</div>
      <div class="capability-item__bar" role="progressbar" aria-valuenow="${cap.readiness}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(cap.label)} readiness">
        <div class="capability-item__fill" style="width:${cap.readiness}%"></div>
      </div>
      <div class="text-sm text-muted">${cap.readiness}%${cap.verified ? ' · verified' : ''}</div>
    `;
    grid.appendChild(item);
  }
  return grid;
}

function createAchievementGrid(achievements) {
  const grid = document.createElement('div');
  grid.className = 'achievement-grid';
  for (const a of achievements) {
    const badge = document.createElement('div');
    badge.className = 'achievement-badge achievement-badge--premium';
    badge.innerHTML = `
      <p class="achievement-badge__title type-mono">${escapeHtml(a.title)}</p>
      <p class="achievement-badge__verified">✓ Verified</p>
      <p class="achievement-badge__subtitle">${escapeHtml(a.subtitle)}</p>
    `;
    grid.appendChild(badge);
  }
  return grid;
}

function createAnalystActivityFeed(items) {
  const ul = document.createElement('ul');
  ul.className = 'activity-feed';
  ul.setAttribute('aria-label', 'Recent analyst activity');
  for (const a of items) {
    const li = document.createElement('li');
    li.className = 'activity-feed__item';
    const time = new Date(a.timestamp);
    const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    li.innerHTML = `
      <span>${escapeHtml(formatAnalystActivity(a))}</span>
      <span class="activity-feed__time">${escapeHtml(timeStr)} · ${escapeHtml(formatRelativeTime(a.timestamp))}</span>
    `;
    ul.appendChild(li);
  }
  return ul;
}

function createActivityEmptyState() {
  const p = document.createElement('p');
  p.className = 'activity-feed__empty';
  p.textContent = '> no analyst activity yet — complete a lesson to begin';
  return p;
}

function formatAnalystActivity(a) {
  const lesson = a.itemId ? getLesson(a.itemId) : null;
  const exercise = a.itemId ? getExercise(a.itemId) : null;
  const title = lesson?.title || exercise?.title || a.metadata?.title || a.itemId;

  const map = {
    'lesson-complete': `${title} completed`,
    'bookmark-add': `Reference bookmarked`,
    'quiz-attempt': `Quiz passed — ${title}`,
    'practice-complete': `${a.metadata?.practiceType === 'independent' ? 'Independent challenge' : 'Guided practice'} passed`,
    'sql-query-run': 'Query complete — SQL Playground',
  };
  return map[a.type] || a.type;
}


function emptyNote(text) {
  const p = document.createElement('p');
  p.className = 'text-muted mb-0';
  p.textContent = text;
  return p;
}

function createList(items) {
  const ul = document.createElement('ul');
  ul.className = 'mb-0';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}

function createLinkList(items) {
  const ul = document.createElement('ul');
  ul.className = 'mb-0';
  items.forEach(({ label, href }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    li.appendChild(a);
    ul.appendChild(li);
  });
  return ul;
}

function createBookmarkList(items) {
  return createLinkList(items.map((b) => ({
    label: b.title,
    href: b.itemType === 'lesson' ? `#/lesson/${b.itemId}` : `#/library?ref=${b.itemId}`,
  })));
}
