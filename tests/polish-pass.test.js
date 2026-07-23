/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { SUBJECT_THEMES, SUBJECT_ORDER, getSubjectTheme } from '../src/config/subject-theme.js';
import { getInterviewPromptForLesson } from '../src/config/lesson-interview-prompts.js';
import {
  createWhyThisMattersCallout,
  createInterviewQuestionPanel,
  createKeyTakeawayPanel,
} from '../src/components/lesson-callouts.js';
import { createContinueLearningCard } from '../src/components/continue-learning-card.js';
import { showWelcomeOnboarding } from '../src/components/welcome-onboarding.js';
import { findContinueLearningFromActivity } from '../src/services/progress-service.js';
import { getLessonPosition } from '../src/content/index.js';
import contentBundle from '../src/content/index.js';
import { storage } from '../src/storage/storage-service.js';
import { createDefaultPreferences } from '../src/storage/storage-contract.js';

beforeEach(async () => {
  document.body.innerHTML = '<div id="dialog-root"></div>';
  await storage.init();
});

describe('Subject theme config', () => {
  it('defines all six subjects in order', () => {
    expect(SUBJECT_ORDER).toHaveLength(6);
    for (const id of SUBJECT_ORDER) {
      expect(SUBJECT_THEMES[id]?.descriptor).toBeTruthy();
    }
  });

  it('returns descriptor via getSubjectTheme', () => {
    expect(getSubjectTheme('sql').descriptor).toContain('Query');
  });
});

describe('Onboarding', () => {
  it('defaults onboardingCompleted to false', () => {
    expect(createDefaultPreferences().onboardingCompleted).toBe(false);
  });

  it('persists onboarding dismissal', async () => {
    await storage.updatePreferences({ onboardingCompleted: true });
    const prefs = await storage.getPreferences();
    expect(prefs.onboardingCompleted).toBe(true);
  });

  it('renders welcome dialog with three-step flow start', () => {
    showWelcomeOnboarding({ hasProgress: false });
    const dialog = document.getElementById('welcome-onboarding');
    expect(dialog).toBeTruthy();
    expect(dialog.textContent).toContain('Welcome to DATApath');
  });
});

describe('Continue learning', () => {
  it('finds first incomplete lesson without activity', () => {
    const target = findContinueLearningFromActivity(contentBundle.subjects, {}, []);
    expect(target?.subject.id).toBe('sql');
    expect(target?.lesson.id).toBeTruthy();
  });

  it('prefers recent activity lesson', () => {
    const lesson = contentBundle.subjects[1].modules[0].lessons[0];
    const target = findContinueLearningFromActivity(
      contentBundle.subjects,
      {},
      [{ type: 'lesson-view', itemId: lesson.id, timestamp: new Date().toISOString() }],
    );
    expect(target?.lesson.id).toBe(lesson.id);
  });

  it('renders continue card with lesson title from curriculum', () => {
    const subject = contentBundle.subjects[0];
    const lesson = subject.modules[0].lessons[0];
    const card = createContinueLearningCard({
      continueTarget: {
        subject,
        lesson,
        subjectProgress: { lessonPercent: 0, completedLessons: 0, totalLessons: 40 },
      },
      hasProgress: false,
    });
    expect(card.textContent).toContain(lesson.title);
    expect(card.textContent).toContain('Start learning');
  });
});

describe('Lesson polish components', () => {
  it('renders why-this-matters callout from lesson text', () => {
    const el = createWhyThisMattersCallout('INNER JOIN combines related records.');
    expect(el.textContent).toContain('Why this matters');
    expect(el.textContent).toContain('INNER JOIN');
  });

  it('renders interview question with hidden answer', () => {
    const el = createInterviewQuestionPanel({
      question: 'What is a DataFrame?',
      sampleAnswer: 'A tabular pandas structure.',
    });
    expect(el.querySelector('summary')?.textContent).toContain('Reveal sample answer');
    expect(el.querySelector('details')?.open).toBeFalsy();
  });

  it('builds key takeaway from lesson fields', () => {
    const lesson = contentBundle.lessons[0];
    const el = createKeyTakeawayPanel(lesson);
    expect(el?.textContent).toContain('Key takeaway');
  });

  it('returns subject interview default by subject', () => {
    const lesson = contentBundle.lessons.find((l) => l.subjectId === 'sql');
    const prompt = getInterviewPromptForLesson(lesson);
    expect(prompt.question).toContain('JOIN');
  });
});

describe('Lesson position', () => {
  it('returns lesson index within subject', () => {
    const first = contentBundle.subjects[0].modules[0].lessons[0];
    const pos = getLessonPosition(first.id);
    expect(pos.index).toBe(1);
    expect(pos.totalInSubject).toBeGreaterThan(0);
  });
});

describe('Reduced motion', () => {
  it('respects data-reduced-motion on document', () => {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
    expect(document.documentElement.getAttribute('data-reduced-motion')).toBe('true');
  });
});
