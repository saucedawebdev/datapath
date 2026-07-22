import { describe, it, expect } from 'vitest';
import contentBundle, { getLesson } from '../src/content/index.js';
import { validateContentBundle } from '../src/utilities/content-validator.js';
import { validateExerciseArchitecture } from '../src/content/job-ready/normalize-exercises.js';
import {
  buildPracticeRoute,
  buildReturnToLessonRoute,
  getContinueLearningTarget,
  resolvePracticeExercise,
  usesSqlEditor,
} from '../src/services/practice-service.js';
import { isSqlInteraction } from '../src/features/practice/renderers/index.js';
import { readFileSync } from 'fs';
import { join } from 'path';

const SUBJECTS = ['sql', 'excel', 'tableau', 'power-bi', 'python', 'statistics'];

describe('Practice Lab architecture', () => {
  it('validates 228 exercises with guided + challenge per lesson', () => {
    const result = validateContentBundle(contentBundle);
    expect(result.valid).toBe(true);
    expect(contentBundle.exercises).toHaveLength(228);
    expect(contentBundle.exercises.filter((e) => e.practiceType === 'guided')).toHaveLength(114);
    expect(contentBundle.exercises.filter((e) => e.practiceType === 'independent')).toHaveLength(114);
  });

  it('has zero architecture issues', () => {
    const issues = validateExerciseArchitecture(contentBundle.exercises, contentBundle.lessons);
    expect(issues).toHaveLength(0);
  });

  it('every lesson links to guided and independent exercises', () => {
    for (const lesson of contentBundle.lessons) {
      expect(lesson.guidedPractice?.exerciseId).toBeTruthy();
      expect(lesson.independentChallenge?.exerciseId).toBeTruthy();
      const guided = contentBundle.exercises.find((e) => e.id === lesson.guidedPractice.exerciseId);
      const challenge = contentBundle.exercises.find((e) => e.id === lesson.independentChallenge.exerciseId);
      expect(guided?.practiceType).toBe('guided');
      expect(challenge?.practiceType).toBe('independent');
    }
  });

  it('non-SQL subjects never use sql-query interaction', () => {
    const bad = contentBundle.exercises.filter((e) => e.subjectId !== 'sql' && e.interactionType === 'sql-query');
    expect(bad).toHaveLength(0);
  });

  it('resolves deep practice routes for each subject', () => {
    for (const subjectId of SUBJECTS) {
      const ex = contentBundle.exercises.find((e) => e.subjectId === subjectId);
      expect(ex).toBeTruthy();
      const route = buildPracticeRoute(ex);
      expect(route).toMatch(new RegExp(`#/practice/${subjectId}/`));
      const resolved = resolvePracticeExercise({
        subjectId: ex.subjectId,
        slug: ex.lessonSlug,
        practiceType: ex.practiceType === 'independent' ? 'challenge' : 'guided',
      });
      expect(resolved?.id).toBe(ex.id);
    }
  });

  it('return to lesson and continue learning routes are valid', () => {
    const ex = contentBundle.exercises[0];
    expect(buildReturnToLessonRoute(ex.lessonId)).toMatch(`#/lesson/${ex.lessonId}`);
    const target = getContinueLearningTarget(ex);
    expect(target.href).toMatch(/^#\/lesson\//);
  });

  it('conceptual exercises do not use SQL editor flag', () => {
    const conceptual = contentBundle.exercises.filter((e) => e.interactionType === 'conceptual-response');
    expect(conceptual.length).toBeGreaterThan(0);
    conceptual.forEach((e) => expect(usesSqlEditor(e.interactionType)).toBe(false));
  });

  it('lesson practice sections route to Practice Lab not Playground', () => {
    const lessonView = readFileSync(join(process.cwd(), 'src/features/learning/lesson-view.js'), 'utf8');
    expect(lessonView).not.toContain('Run in SQL Workspace');
    expect(lessonView).toContain('buildPracticeRouteWithContext');
    const exerciseSection = lessonView.slice(lessonView.indexOf('async function createExerciseSection'));
    expect(exerciseSection).not.toContain('#/playground');
  });

  it('practice-view does not default all subjects to SQL editor', () => {
    const practiceView = readFileSync(join(process.cwd(), 'src/features/practice/practice-view.js'), 'utf8');
    expect(practiceView).not.toContain('createSqlEditor');
  });

  it('SQL exercises use sql-query interaction only for SQL subject', () => {
    const sqlQuery = contentBundle.exercises.filter((e) => e.interactionType === 'sql-query');
    expect(sqlQuery.every((e) => e.subjectId === 'sql')).toBe(true);
    sqlQuery.forEach((e) => expect(isSqlInteraction(e.interactionType)).toBe(true));
  });

  it('each subject has subject-specific interaction types', () => {
    const bySubject = Object.fromEntries(SUBJECTS.map((s) => [s, new Set()]));
    for (const ex of contentBundle.exercises) {
      bySubject[ex.subjectId]?.add(ex.interactionType);
    }
    expect(bySubject.sql.has('sql-query')).toBe(true);
    expect(bySubject.excel.has('spreadsheet-formula') || bySubject.excel.has('conceptual-response')).toBe(true);
    expect(bySubject.tableau.has('tableau-field-builder') || bySubject.tableau.has('tableau-chart-builder')).toBe(true);
    expect(bySubject['power-bi'].has('dax-expression') || bySubject['power-bi'].has('powerbi-report-builder')).toBe(true);
    expect(bySubject.python.has('python-code') || bySubject.python.has('dataframe-operation')).toBe(true);
    expect(bySubject.statistics.has('statistics-calculation') || bySubject.statistics.has('statistics-interpretation')).toBe(true);
  });
});
