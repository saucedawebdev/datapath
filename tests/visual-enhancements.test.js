/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import contentBundle from '../src/content/index.js';
import { validateAnalystBriefing } from '../src/content/job-ready/analyst-briefings.js';
import { getNorthstarMetrics } from '../src/services/northstar-metrics-service.js';
import { getAnalyticsSystemStatus } from '../src/services/system-status-service.js';
import { computeVerifiedAchievements } from '../src/services/achievement-service.js';
import { createAnalystBriefingPanel } from '../src/components/analyst-briefing.js';
import { createMissionCompletePanel } from '../src/components/mission-complete-panel.js';

describe('Analyst briefing metadata', () => {
  it('every lesson has complete analystBriefing', () => {
    expect(contentBundle.lessons.length).toBe(114);
    for (const lesson of contentBundle.lessons) {
      expect(lesson.analystBriefing).toBeTruthy();
      expect(() => validateAnalystBriefing(lesson.analystBriefing, lesson.id)).not.toThrow();
      expect(lesson.analystBriefing.from).toBeTruthy();
      expect(lesson.analystBriefing.requestTitle).toBeTruthy();
      expect(lesson.analystBriefing.message).toBeTruthy();
      expect(lesson.analystBriefing.requiredSkills.length).toBeGreaterThan(0);
      expect(lesson.analystBriefing.businessGoal).toBeTruthy();
    }
  });

  it('briefings are unique across unrelated lessons', () => {
    const titles = contentBundle.lessons.map((l) => l.analystBriefing.requestTitle);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  it('renders analyst briefing panel', () => {
    const lesson = contentBundle.lessons[0];
    const panel = createAnalystBriefingPanel(lesson.analystBriefing);
    expect(panel.classList.contains('analyst-briefing')).toBe(true);
    expect(panel.textContent).toContain('Analyst Briefing');
    expect(panel.textContent).toContain(lesson.analystBriefing.from);
  });
});

describe('Northstar metrics', () => {
  it('uses real bundled dataset values', () => {
    const metrics = getNorthstarMetrics();
    expect(metrics.customers).toBe(8);
    expect(metrics.orders).toBe(10);
    expect(metrics.products).toBe(8);
    expect(metrics.regions).toBe(4);
    expect(metrics.campaigns).toBe(3);
    expect(metrics.revenue).toBeGreaterThan(0);
  });
});

describe('System status', () => {
  it('reflects real application state', async () => {
    const status = await getAnalyticsSystemStatus();
    expect(status.items.length).toBeGreaterThanOrEqual(8);
    const sql = status.items.find((i) => i.id === 'sql');
    expect(['Online', 'Standby']).toContain(sql?.status);
    const lessons = status.items.find((i) => i.id === 'lessons');
    expect(lessons?.status).toBe('Loaded');
    expect(lessons?.ok).toBe(true);
    const northstar = status.items.find((i) => i.id === 'northstar');
    expect(northstar?.status).toBe('Ready');
  });
});

describe('Mission complete panel', () => {
  it('only renders with completion data passed in', () => {
    const lesson = contentBundle.lessons[0];
    const panel = createMissionCompletePanel({
      lesson,
      briefing: lesson.analystBriefing,
      guidedComplete: false,
      challengeComplete: false,
      quizAttempt: null,
      nextLesson: null,
      guidedExerciseId: lesson.guidedPractice?.exerciseId,
    });
    expect(panel.classList.contains('mission-complete')).toBe(true);
    expect(panel.textContent).toContain('Mission Complete');
  });
});

describe('Achievements', () => {
  it('does not award achievements without progress', () => {
    const earned = computeVerifiedAchievements({
      allProgress: [],
      subjectProgressList: [],
      subjects: contentBundle.subjects,
    });
    expect(earned.length).toBe(0);
  });
});

describe('Lesson briefing component', () => {
  it('briefing panel contains required fields for sample lessons', () => {
    for (const lesson of contentBundle.lessons.slice(0, 5)) {
      const panel = createAnalystBriefingPanel(lesson.analystBriefing);
      expect(panel.classList.contains('analyst-briefing')).toBe(true);
      expect(panel.textContent).toContain(lesson.analystBriefing.requestTitle);
    }
  });
});
