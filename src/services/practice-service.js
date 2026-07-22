import contentBundle, { getExercise, getLesson, getModule, getSubject, getAdjacentLessons } from '../content/index.js';
import { getLessonSlug } from '../content/job-ready/normalize-exercises.js';

export { getLessonSlug };

export function buildPracticeRoute(exercise) {
  if (!exercise) return '#/practice';
  const slug = exercise.lessonSlug || getLessonSlug(exercise.lessonId);
  const segment = exercise.practiceType === 'independent' ? 'challenge' : 'guided';
  return `#/practice/${exercise.subjectId}/${slug}/${segment}`;
}

export function buildPracticeRouteWithContext(exercise, { scrollY } = {}) {
  const base = buildPracticeRoute(exercise);
  const params = new URLSearchParams();
  params.set('lesson', exercise.lessonId);
  if (scrollY != null) params.set('scroll', String(Math.round(scrollY)));
  return `${base}?${params.toString()}`;
}

export function resolvePracticeExercise(params = {}, query = {}) {
  if (query.exercise) {
    return getExercise(query.exercise);
  }

  const { subjectId, slug, practiceType } = params;
  if (!subjectId || !slug || !practiceType) return null;

  const normalizedType = practiceType === 'challenge' ? 'independent' : 'guided';
  return contentBundle.exercises.find(
    (e) => e.subjectId === subjectId
      && (e.lessonSlug || getLessonSlug(e.lessonId)) === slug
      && e.practiceType === normalizedType,
  ) || null;
}

export function getExercisesForSubject(subjectId) {
  return contentBundle.exercises.filter((e) => e.subjectId === subjectId);
}

export function getExercisesForLesson(lessonId) {
  return contentBundle.exercises.filter((e) => e.lessonId === lessonId);
}

export function getPracticeButtonLabel(exercise) {
  if (!exercise) return 'Open in Practice Lab';
  if (exercise.practiceType === 'independent') return 'Start Independent Challenge';

  const labels = {
    'sql-query': 'Start Guided Practice',
    'conceptual-response': 'Start Guided Practice',
    'matching': 'Start Guided Practice',
    'ordering': 'Start Guided Practice',
    'multiple-choice': 'Start Guided Practice',
    'spreadsheet-formula': 'Check Formula',
    'spreadsheet-cleaning': 'Start Guided Practice',
    'spreadsheet-pivot': 'Start Guided Practice',
    'chart-selection': 'Check Visualization',
    'tableau-field-builder': 'Check Analysis',
    'tableau-chart-builder': 'Check Visualization',
    'tableau-dashboard-layout': 'Check Analysis',
    'powerbi-model-builder': 'Check Analysis',
    'dax-expression': 'Check DAX',
    'powerbi-report-builder': 'Check Report',
    'python-code': 'Start Guided Practice',
    'dataframe-operation': 'Start Guided Practice',
    'statistics-calculation': 'Check Calculation',
    'statistics-interpretation': 'Check Interpretation',
    'statistics-experiment': 'Run Simulation',
  };

  return labels[exercise.interactionType] || 'Start Guided Practice';
}

export function getPracticeTypeLabel(exercise) {
  return exercise?.practiceType === 'independent' ? 'Independent Challenge' : 'Guided Practice';
}

export function getCheckButtonLabel(exercise) {
  const map = {
    'sql-query': 'Check Answer',
    'spreadsheet-formula': 'Check Formula',
    'spreadsheet-pivot': 'Check Pivot',
    'chart-selection': 'Check Visualization',
    'tableau-field-builder': 'Check Analysis',
    'tableau-chart-builder': 'Check Visualization',
    'tableau-dashboard-layout': 'Check Analysis',
    'powerbi-model-builder': 'Check Model',
    'dax-expression': 'Check DAX',
    'powerbi-report-builder': 'Check Report',
    'python-code': 'Check Answer',
    'dataframe-operation': 'Check Answer',
    'statistics-calculation': 'Check Calculation',
    'statistics-interpretation': 'Check Interpretation',
    'statistics-experiment': 'Compare Groups',
  };
  return map[exercise?.interactionType] || 'Check Answer';
}

export function usesCodeEditor(interactionType) {
  return ['sql-query', 'python-code', 'dataframe-operation', 'dax-expression'].includes(interactionType);
}

export function usesSqlEditor(interactionType) {
  return interactionType === 'sql-query';
}

export function getPracticeBreadcrumb(exercise) {
  const subject = getSubject(exercise.subjectId);
  const lesson = getLesson(exercise.lessonId);
  return {
    subject: subject?.name || exercise.subjectId,
    lesson: lesson?.title || exercise.lessonId,
    exerciseTitle: exercise.title,
    practiceType: getPracticeTypeLabel(exercise),
    exerciseNumber: exercise.exerciseNumber,
  };
}

export function getNextExerciseInLesson(exercise) {
  const lessonExercises = getExercisesForLesson(exercise.lessonId)
    .sort((a, b) => (a.practiceType === 'guided' ? -1 : 1));
  const idx = lessonExercises.findIndex((e) => e.id === exercise.id);
  return idx >= 0 && idx < lessonExercises.length - 1 ? lessonExercises[idx + 1] : null;
}

export function getContinueLearningTarget(exercise) {
  const { next } = getAdjacentLessons(exercise.lessonId);
  if (next) return { type: 'lesson', href: `#/lesson/${next.id}`, label: next.title };
  return { type: 'learn', href: '#/learn', label: 'Learning Path' };
}

export function saveLessonScroll(lessonId) {
  try {
    sessionStorage.setItem(`datapath-lesson-scroll-${lessonId}`, String(window.scrollY));
  } catch { /* private mode */ }
}

export function getLessonScroll(lessonId) {
  try {
    const val = sessionStorage.getItem(`datapath-lesson-scroll-${lessonId}`);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function buildReturnToLessonRoute(lessonId, scrollY) {
  const y = scrollY ?? getLessonScroll(lessonId);
  return y > 0 ? `#/lesson/${lessonId}?scroll=${y}` : `#/lesson/${lessonId}`;
}

export function filterSubjectExercises(exercises, filters, completedIds, bookmarkIds) {
  let list = [...exercises];

  if (filters.difficulty) list = list.filter((e) => e.difficulty === filters.difficulty);
  if (filters.practiceType === 'guided') list = list.filter((e) => e.practiceType === 'guided');
  if (filters.practiceType === 'independent') list = list.filter((e) => e.practiceType === 'independent');
  if (filters.status === 'completed') list = list.filter((e) => completedIds.has(e.id));
  if (filters.status === 'incomplete') list = list.filter((e) => !completedIds.has(e.id));
  if (filters.bookmarked) list = list.filter((e) => bookmarkIds.has(e.id));
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((e) =>
      [e.title, e.instructions, e.lessonId].some((f) => String(f).toLowerCase().includes(q)),
    );
  }

  return list;
}

export function getSubjectPracticeStats(subjectId, completedIds) {
  const exercises = getExercisesForSubject(subjectId);
  const completed = exercises.filter((e) => completedIds.has(e.id)).length;
  const total = exercises.length;
  return {
    total,
    completed,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}
