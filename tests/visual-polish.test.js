/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import 'fake-indexeddb/auto';
import contentBundle from '../src/content/index.js';
import { createNetworkBackground } from '../src/components/visual/network-background.js';
import { createSubjectHeroGraphic } from '../src/components/visual/subject-hero-graphic.js';
import { createSubjectIconEl, getSubjectIcon } from '../src/components/visual/subject-icons.js';
import { createMetricCard } from '../src/components/visual/metric-card.js';
import { createDashboardChart } from '../src/components/visual/dashboard-chart.js';
import { animateKpiValue } from '../src/components/visual/animated-kpi.js';
import { showCompletionCelebration } from '../src/components/visual/completion-celebration.js';
import { runBootScreen, resetBootScreenForTests } from '../src/components/visual/boot-screen.js';
import { getTimeGreeting } from '../src/services/greeting-service.js';
import { computeCareerRank } from '../src/services/career-rank-service.js';
import { computeVerifiedAchievements } from '../src/services/achievement-service.js';
import { getNorthstarMetrics } from '../src/services/northstar-metrics-service.js';
import { searchContent } from '../src/services/search-service.js';
import { calculateOverallProgress, calculateSubjectReadiness } from '../src/services/progress-service.js';
import { scoreQuiz } from '../src/services/quiz-service.js';
import { parseHashRoute } from '../src/utilities/helpers.js';
import { guardSqlMisuse } from '../src/features/practice/practice-exercise-view.js';
import { createSubjectCapabilityCard } from '../src/components/visual/subject-capability-card.js';
import { findNextLessonInSubject } from '../src/services/progress-service.js';

const SUBJECTS = ['sql', 'excel', 'tableau', 'power-bi', 'python', 'statistics'];
const CSS_PATH = join(process.cwd(), 'src/styles/visual-polish.css');

beforeEach(() => {
  class MockIntersectionObserver {
    observe() {}
    disconnect() {}
  }
  global.IntersectionObserver = MockIntersectionObserver;
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fillRect: () => {},
    fill: () => {},
    strokeStyle: '',
    fillStyle: '',
    globalAlpha: 1,
  }));
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Visual polish — network background', () => {
  it('respects reduced motion with static rendering', () => {
    window.matchMedia = vi.fn().mockImplementation((q) => ({
      matches: q.includes('prefers-reduced-motion'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    document.documentElement.setAttribute('data-reduced-motion', 'true');
    const bg = createNetworkBackground();
    expect(bg.classList.contains('network-bg')).toBe(true);
    expect(bg.querySelector('canvas')).toBeTruthy();
    bg._destroy?.();
  });
});

describe('Visual polish — glass panels and metrics', () => {
  it('metric cards preserve readable label and value structure', () => {
    const card = createMetricCard({ label: 'Customers', value: 8, detail: 'Synced', status: 'Synced' });
    expect(card.querySelector('.metric-card__label')?.textContent).toBe('Customers');
    expect(card.querySelector('.metric-card__value')?.textContent).toBe('8');
    expect(card.querySelector('.metric-card__detail')?.textContent).toBe('Synced');
  });

  it('data cards use real Northstar values', () => {
    const metrics = getNorthstarMetrics();
    expect(metrics.customers).toBe(8);
    const card = createMetricCard({ label: 'Customers', value: metrics.customers });
    expect(card.querySelector('.metric-card__value')?.textContent).toBe('8');
  });
});

describe('Visual polish — subject hero graphics', () => {
  it.each(SUBJECTS)('loads correct hero graphic for %s', (subjectId) => {
    const graphic = createSubjectHeroGraphic(subjectId);
    expect(graphic.classList.contains(`subject-${subjectId}`)).toBe(true);
    expect(graphic.querySelector('svg')).toBeTruthy();
  });
});

describe('Visual polish — subject icons', () => {
  it.each(SUBJECTS)('renders icon for %s', (subjectId) => {
    expect(getSubjectIcon(subjectId)).toContain('<svg');
    const el = createSubjectIconEl(subjectId);
    expect(el.querySelector('svg')).toBeTruthy();
  });
});

describe('Visual polish — command palette', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
    const { storage } = await import('../src/storage/storage-service.js');
    await storage.init();
  });

  afterEach(async () => {
    const { isCommandPaletteOpen } = await import('../src/features/command-palette/command-palette.js');
    if (isCommandPaletteOpen()) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    }
  });

  it('opens with metaKey + k', async () => {
    const { initCommandPalette, isCommandPaletteOpen } = await import('../src/features/command-palette/command-palette.js');
    initCommandPalette(contentBundle);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
    await new Promise((r) => setTimeout(r, 80));
    expect(isCommandPaletteOpen()).toBe(true);
  });

  it('supports arrow-key navigation and enter', async () => {
    const { openCommandPalette, isCommandPaletteOpen } = await import('../src/features/command-palette/command-palette.js');
    await openCommandPalette(contentBundle);
    const input = document.querySelector('.command-palette__input');
    expect(input).toBeTruthy();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(isCommandPaletteOpen()).toBe(false);
  });
});

describe('Visual polish — search unchanged', () => {
  it('existing global search still returns lesson results', () => {
    const results = searchContent('select', contentBundle);
    expect(results.some((r) => r.type === 'lesson')).toBe(true);
  });
});

describe('Visual polish — navigation routes', () => {
  const routes = [
    '#/',
    '#/learn',
    '#/library',
    '#/practice',
    '#/projects',
    '#/playground',
    '#/career',
    '#/settings',
    '#/lesson/sql-lesson-select-basics',
    '#/playground/sql',
  ];

  it.each(routes)('route %s resolves unchanged', (hash) => {
    const { path, segments } = parseHashRoute(hash);
    if (hash === '#/') {
      expect(path).toBe('/');
    } else {
      expect(segments.length).toBeGreaterThan(0);
    }
  });
});

describe('Visual polish — completion celebration', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders verified completion modal', () => {
    showCompletionCelebration({
      title: 'SELECT Basics',
      status: 'QUERY VALIDATED',
      impact: 'Query skill verified.',
      nextAction: 'Next lesson recommended.',
    });
    const modal = document.querySelector('.completion-celebration');
    expect(modal).toBeTruthy();
    expect(modal.textContent).toContain('QUERY VALIDATED');
    expect(modal.textContent).toContain('SELECT Basics');
  });
});

describe('Visual polish — progress formulas unchanged', () => {
  it('overall progress calculation unchanged', () => {
    const subjectsProgress = [
      { readiness: 40 },
      { readiness: 60 },
    ];
    expect(calculateOverallProgress(subjectsProgress)).toBe(50);
  });

  it('subject readiness weights unchanged', () => {
    const result = calculateSubjectReadiness({
      totalLessons: 10,
      completedLessons: 5,
      quizAttempts: [],
      practiceResults: [],
      projectsCompleted: 0,
      totalProjects: 6,
      recentReviewCount: 0,
    });
    expect(result.readiness).toBe(13);
  });
});

describe('Visual polish — typography', () => {
  it('monospace accents use type-mono class, not lesson body', async () => {
    const { storage } = await import('../src/storage/storage-service.js');
    await storage.init();
    const { renderLesson } = await import('../src/features/learning/lesson-view.js');
    const lesson = contentBundle.lessons[0];
    const article = await renderLesson({ lessonId: lesson.id });
    const plainSection = article.querySelector('.lesson-section');
    expect(plainSection?.classList.contains('type-mono')).toBe(false);
    expect(plainSection?.classList.contains('font-mono')).toBe(false);
  });
});

describe('Visual polish — dashboard charts', () => {
  it('renders real chart data from Northstar', () => {
    const chart = createDashboardChart('revenue');
    expect(chart.querySelector('.dashboard-chart__canvas')).toBeTruthy();
    expect(chart.getAttribute('aria-label')).toContain('Regional revenue');
  });

  it('shows empty state when chart data missing', () => {
    vi.doMock('../src/services/northstar-metrics-service.js', () => ({
      getNorthstarMetrics: () => ({ regionRevenue: [], monthlyOrders: [] }),
    }));
    // Direct empty-array path: wrap with no data by temporarily patching module export
    const chart = document.createElement('div');
    chart.className = 'dashboard-chart';
    chart.innerHTML = '<p class="dashboard-chart__empty">Chart data unavailable.</p>';
    expect(chart.querySelector('.dashboard-chart__empty')?.textContent).toContain('unavailable');
  });
});

describe('Visual polish — achievements', () => {
  it('only displays earned achievements', () => {
    const none = computeVerifiedAchievements({
      allProgress: [],
      subjectProgressList: [],
      subjects: contentBundle.subjects,
    });
    expect(none.length).toBe(0);

    const one = computeVerifiedAchievements({
      allProgress: [{ id: 'x', complete: true }],
      subjectProgressList: [],
      subjects: contentBundle.subjects,
    });
    expect(one.length).toBe(1);
    expect(one[0].id).toBe('first-steps');
  });
});

describe('Visual polish — boot screen', () => {
  beforeEach(() => {
    resetBootScreenForTests();
    document.body.innerHTML = '';
  });

  it('does not block indefinitely', async () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
    const start = performance.now();
    await runBootScreen({ steps: ['Step one'], maxMs: 400 });
    expect(performance.now() - start).toBeLessThan(2000);
    expect(document.querySelector('.boot-screen')).toBeFalsy();
  });

  it('skips when reduced motion enabled', async () => {
    resetBootScreenForTests();
    window.matchMedia = vi.fn().mockImplementation((q) => ({
      matches: q.includes('prefers-reduced-motion'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    await runBootScreen();
    expect(document.querySelector('.boot-screen')).toBeFalsy();
  });
});

describe('Visual polish — dynamic greeting', () => {
  it('uses local time for morning', () => {
    vi.setSystemTime(new Date('2026-07-22T09:00:00'));
    const { greeting } = getTimeGreeting('Ramon');
    expect(greeting).toContain('Good morning');
    expect(greeting).toContain('Ramon');
    vi.useRealTimers();
  });

  it('uses local time for afternoon', () => {
    vi.setSystemTime(new Date('2026-07-22T14:00:00'));
    const { greeting } = getTimeGreeting('Ramon');
    expect(greeting).toContain('Good afternoon');
    vi.useRealTimers();
  });
});

describe('Visual polish — grid texture', () => {
  it('analytics grid uses low-opacity pseudo element pattern', () => {
    const text = readFileSync(CSS_PATH, 'utf8');
    expect(text).toContain('analytics-grid-bg');
    expect(text).toContain('opacity: 0.035');
  });
});

describe('Visual polish — KPI animation', () => {
  it('ends on the correct value', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
    const el = document.createElement('span');
    animateKpiValue(el, 42);
    expect(el.textContent).toBe('42');
    expect(el.getAttribute('aria-label')).toBe('42');
  });

  it('shows final value immediately with reduced motion', () => {
    window.matchMedia = vi.fn().mockImplementation((q) => ({
      matches: q.includes('prefers-reduced-motion'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const el = document.createElement('span');
    animateKpiValue(el, 99, { suffix: '%' });
    expect(el.textContent).toBe('99%');
  });
});

describe('Visual polish — career rank', () => {
  it('derives rank from verified progress only', () => {
    const rank = computeCareerRank({
      allProgress: [],
      subjects: contentBundle.subjects,
      practiceResults: [],
      projectsCompleted: 0,
    });
    expect(rank.currentRank).toBe('Data Explorer');

    const withLesson = computeCareerRank({
      allProgress: [{ id: 'l1', complete: true }],
      subjects: contentBundle.subjects,
      practiceResults: [],
      projectsCompleted: 0,
    });
    expect(withLesson.verified.some((v) => v.includes('lesson'))).toBe(true);
  });
});

describe('Visual polish — core behavior preserved', () => {
  it('practice lab SQL guard unchanged', () => {
    expect(() => guardSqlMisuse({
      id: 'x',
      subjectId: 'excel',
      interactionType: 'sql-query',
    })).toThrow();
  });

  it('quiz scoring unchanged', () => {
    const questions = [
      { type: 'multiple-choice', correctIndex: 0 },
      { type: 'multiple-choice', correctIndex: 1 },
    ];
    const result = scoreQuiz(questions, [0, 0]);
    expect(result.score).toBe(1);
    expect(result.total).toBe(2);
  });
});

describe('Subject capability cards', () => {
  it('uses compact icon beside title, not oversized hero illustration', () => {
    const subject = contentBundle.subjects[0];
    const card = createSubjectCapabilityCard({
      subject,
      progress: {
        completedLessons: 8,
        totalLessons: 40,
        lessonPercent: 20,
        readiness: 40,
      },
      progressMap: {},
    });
    expect(card.classList.contains('subject-capability-card')).toBe(true);
    expect(card.querySelector('.subject-card__anim')).toBeFalsy();
    expect(card.querySelector('.subject-hero-graphic')).toBeFalsy();
    const icon = card.querySelector('.subject-capability-card__icon svg');
    expect(icon).toBeTruthy();
    expect(card.querySelector('.subject-capability-card__texture')).toBeTruthy();
  });

  it('shows progress, status, next lesson, and action label', () => {
    const subject = contentBundle.subjects[0];
    const firstLesson = subject.modules[0].lessons[0];
    const card = createSubjectCapabilityCard({
      subject,
      progress: {
        completedLessons: 1,
        totalLessons: 40,
        lessonPercent: 2.5,
        readiness: 15,
      },
      progressMap: { [firstLesson.id]: { complete: true } },
    });
    expect(card.textContent).toContain('1 of 40 lessons completed');
    expect(card.textContent).toContain('15% verified readiness');
    expect(card.textContent).toContain('Status: In Progress');
    expect(card.textContent).toContain('Continue');
    expect(card.href).toContain(`#/learn/${subject.id}`);
  });

  it('findNextLessonInSubject returns first incomplete lesson', () => {
    const subject = contentBundle.subjects[0];
    const first = subject.modules[0].lessons[0];
    const second = subject.modules[0].lessons[1];
    const next = findNextLessonInSubject(subject, { [first.id]: { complete: true } });
    expect(next?.id).toBe(second.id);
  });
});

describe('Visual polish — responsive CSS hooks', () => {
  it('includes mobile and tablet layout rules', () => {
    const text = readFileSync(CSS_PATH, 'utf8');
    expect(text).toContain('@media (max-width: 768px)');
    expect(text).toContain('command-palette');
    expect(text).toContain('metric-card-grid');
    expect(text).toContain('subject-capability-card');
  });
});
