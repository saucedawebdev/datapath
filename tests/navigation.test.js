import { describe, it, expect } from 'vitest';
import { parseHashRoute } from '../src/utilities/helpers.js';

describe('routing helpers', () => {
  it('parses hash routes with params', () => {
    const result = parseHashRoute('#/lesson/sql-lesson-select-basics');
    expect(result.segments).toEqual(['lesson', 'sql-lesson-select-basics']);
  });

  it('parses query strings', () => {
    const result = parseHashRoute('#/search?q=select&subject=sql');
    expect(result.query.q).toBe('select');
    expect(result.query.subject).toBe('sql');
  });

  it('defaults to root path', () => {
    const result = parseHashRoute('#/');
    expect(result.path).toBe('/');
  });
});

describe('navigation flow contracts', () => {
  it('lesson route pattern resolves lesson id', () => {
    const { segments } = parseHashRoute('#/lesson/sql-lesson-where-filtering');
    expect(segments[0]).toBe('lesson');
    expect(segments[1]).toBe('sql-lesson-where-filtering');
  });

  it('practice route supports exercise query', () => {
    const { segments, query } = parseHashRoute('#/practice?exercise=sql-exercise-select-columns');
    expect(segments[0]).toBe('practice');
    expect(query.exercise).toBe('sql-exercise-select-columns');
  });
});
