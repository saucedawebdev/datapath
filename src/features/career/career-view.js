import { contentBundle } from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { buildSubjectProgress, calculateOverallProgress } from '../../services/progress-service.js';
import { createCard, createProgressBar } from '../../components/ui.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { buildCapabilityDashboard } from '../../services/system-status-service.js';
import { computeVerifiedAchievements } from '../../services/achievement-service.js';
import { computeCareerRank } from '../../services/career-rank-service.js';
import { createHeroShell } from '../../components/visual/hero-shell.js';

export async function renderCareerCenter() {
  const { careerContent } = contentBundle;
  const allProgress = await storage.getAllProgress();
  const practiceResults = await storage.getPracticeResults();
  const subjectProgressList = await Promise.all(
    contentBundle.subjects.map((s) => buildSubjectProgress(s, contentBundle, storage)),
  );
  const overallProgress = calculateOverallProgress(subjectProgressList);
  const projectProgress = await storage.provider.getAll('projectProgress');
  const projectsCompleted = (contentBundle.projects || []).filter((p) =>
    projectProgress.some((pp) => pp.id === p.id && pp.complete),
  ).length;
  const careerRank = computeCareerRank({
    allProgress,
    subjects: contentBundle.subjects,
    practiceResults,
    projectsCompleted,
  });
  const capabilities = buildCapabilityDashboard(
    subjectProgressList,
    projectsCompleted,
    contentBundle.projects?.length || 6,
  );
  const achievements = computeVerifiedAchievements({
    allProgress,
    subjectProgressList,
    subjects: contentBundle.subjects,
  });

  const container = document.createElement('div');

  const heroContent = document.createElement('div');
  heroContent.innerHTML = `
    <h1 class="page-header__title">Career Center</h1>
    <p class="page-header__subtitle">Interview preparation, portfolio guidance, and analyst capability tracking.</p>
  `;
  container.appendChild(createHeroShell({ className: 'page-header mb-lg', children: [heroContent] }));

  container.appendChild(createCard({
    title: 'Analyst Capability Profile',
    subtitle: 'Verified readiness — formula unchanged',
    className: 'glass-panel',
    children: [
      createProgressBar(overallProgress, { label: 'Overall readiness score' }),
      createCapabilityGrid(capabilities),
      createCareerRankPanel(careerRank),
    ],
  }));

  if (achievements.length) {
    container.appendChild(createCard({
      title: 'Verified Milestones',
      className: 'glass-panel',
      children: [createAchievementList(achievements)],
    }));
  }

  const sections = [
    { title: 'SQL Interview Questions', items: careerContent.interviewQuestions.sql },
    { title: 'Excel Interview Questions', items: careerContent.interviewQuestions.excel },
    { title: 'Behavioral Questions', items: careerContent.interviewQuestions.general },
  ];

  for (const sec of sections) {
    container.appendChild(createCard({
      title: sec.title,
      children: [createQuestionList(sec.items)],
    }));
  }

  container.appendChild(createCard({
    title: 'Portfolio Guidance',
    children: [createBulletList(careerContent.portfolioGuidance)],
  }));

  container.appendChild(createCard({
    title: 'Job-Readiness Checklist',
    children: [createChecklist(careerContent.jobReadinessChecklist)],
  }));

  container.appendChild(createCard({
    title: 'Analyst Vocabulary',
    subtitle: 'Terms you should know',
    children: [createBulletList([
      'KPI — Key Performance Indicator',
      'ETL — Extract, Transform, Load',
      'AOV — Average Order Value',
      'Cohort — Group sharing a common characteristic over time',
      'Dimension vs Measure — Categories vs numbers you aggregate',
    ])],
  }));

  return container;
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

function createCapabilityGrid(capabilities) {
  const grid = document.createElement('div');
  grid.className = 'capability-grid mt-md';
  for (const cap of capabilities) {
    const item = document.createElement('div');
    item.className = 'capability-item';
    item.innerHTML = `
      <div class="capability-item__label">${escapeHtml(cap.label)}</div>
      <div class="capability-item__bar" role="progressbar" aria-valuenow="${cap.readiness}" aria-valuemin="0" aria-valuemax="100">
        <div class="capability-item__fill" style="width:${cap.readiness}%"></div>
      </div>
      <div class="text-sm text-muted">${cap.readiness}%</div>
    `;
    grid.appendChild(item);
  }
  return grid;
}

function createAchievementList(achievements) {
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

function createQuestionList(items) {
  const ul = document.createElement('ul');
  ul.className = 'mb-0';
  items.forEach((q) => {
    const li = document.createElement('li');
    li.innerHTML = `${escapeHtml(q.question)} <span class="text-sm text-muted">(${q.difficulty})</span>`;
    ul.appendChild(li);
  });
  return ul;
}

function createBulletList(items) {
  const ul = document.createElement('ul');
  ul.className = 'mb-0';
  items.forEach((i) => {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  });
  return ul;
}

function createChecklist(items) {
  const ul = document.createElement('ul');
  ul.className = 'mb-0';
  items.forEach((i) => {
    const li = document.createElement('li');
    li.innerHTML = `<label style="display:flex;gap:0.5rem;align-items:flex-start"><input type="checkbox" /> ${escapeHtml(i)}</label>`;
    ul.appendChild(li);
  });
  return ul;
}
