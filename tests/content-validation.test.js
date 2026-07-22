import { describe, it, expect } from 'vitest';
import { validateContentBundle, validateJobReadyCurriculum } from '../src/utilities/content-validator.js';
import { validateQuizAnswer, scoreQuiz } from '../src/services/quiz-service.js';
import contentBundle from '../src/content/index.js';
import { JOB_READY_CURRICULUM, countLessons } from '../src/content/job-ready/curriculum-manifest.js';
import { searchContent } from '../src/services/search-service.js';
import { calculateSubjectReadiness, calculateOverallProgress } from '../src/services/progress-service.js';
import { READINESS_WEIGHTS } from '../src/storage/storage-contract.js';

describe('Job Ready content validation', () => {
  it('validates bundled content without errors', () => {
    const result = validateContentBundle(contentBundle);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('has exactly 114 lessons across 6 subjects', () => {
    const jr = validateJobReadyCurriculum(contentBundle);
    expect(jr.valid).toBe(true);
    expect(contentBundle.lessons).toHaveLength(114);
    expect(countLessons(JOB_READY_CURRICULUM)).toBe(114);
  });

  it('has 114 quizzes with 3+ questions each', () => {
    expect(contentBundle.quizzes).toHaveLength(114);
    for (const quiz of contentBundle.quizzes) {
      expect(quiz.questions.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('has 6 capstone projects', () => {
    expect(contentBundle.projects).toHaveLength(6);
  });

  it('has standalone reference cards for the library', () => {
    expect(contentBundle.references.length).toBeGreaterThanOrEqual(40);
    const subjects = new Set(contentBundle.references.map((r) => r.subjectId));
    expect(subjects.size).toBe(6);
  });
});

describe('quiz validation', () => {
  it('scores multiple choice correctly', () => {
    const q = { type: 'multiple-choice', correctIndex: 2, options: ['a', 'b', 'c'] };
    expect(validateQuizAnswer(q, 2)).toBe(true);
    expect(validateQuizAnswer(q, 1)).toBe(false);
  });
});

describe('progress readiness', () => {
  it('calculates weighted readiness', () => {
    const result = calculateSubjectReadiness({
      totalLessons: 40,
      completedLessons: 20,
      quizAttempts: [{ percentage: 0.8 }],
      practiceResults: [],
      projectsCompleted: 0,
      totalProjects: 1,
      recentReviewCount: 2,
    });
    expect(result.readiness).toBeGreaterThan(0);
    expect(result.readiness).toBeLessThanOrEqual(100);
  });

  it('documents weights sum to 1', () => {
    const sum = Object.values(READINESS_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1);
  });
});

describe('search', () => {
  it('finds SQL lessons by title', () => {
    const results = searchContent('SELECT', contentBundle);
    expect(results.some((r) => r.id.includes('select'))).toBe(true);
  });

  it('finds library reference cards', () => {
    const results = searchContent('JOIN', contentBundle);
    expect(results.some((r) => r.type === 'reference')).toBe(true);
  });
});
