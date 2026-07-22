import { resolvePracticeExercise } from '../../services/practice-service.js';
import { renderPracticeHub } from './practice-hub-view.js';
import { renderPracticeExercise, guardSqlMisuse } from './practice-exercise-view.js';

export async function renderPractice(params = {}, query = {}) {
  const exercise = resolvePracticeExercise(params, query);
  if (exercise) {
    guardSqlMisuse(exercise);
    return renderPracticeExercise(exercise, query);
  }

  if (params.subjectId && params.slug && params.practiceType) {
    const missing = document.createElement('div');
    missing.className = 'empty-state';
    missing.innerHTML = '<h2>Exercise not found</h2><p><a href="#/practice">Back to Practice Lab</a></p>';
    return missing;
  }

  return renderPracticeHub(query);
}
