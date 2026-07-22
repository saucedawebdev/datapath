import { storage } from '../../storage/storage-service.js';
import { createButton, createBadge, createEmptyState } from '../../components/ui.js';
import { showToast } from '../../components/toast-dialog.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { validatePracticeAnswer } from '../../services/practice-validation-service.js';
import {
  buildPracticeRoute,
  buildReturnToLessonRoute,
  getContinueLearningTarget,
  getNextExerciseInLesson,
  getPracticeBreadcrumb,
  getPracticeTypeLabel,
} from '../../services/practice-service.js';
import { renderPracticeInterface, isSqlInteraction } from './renderers/index.js';
import { showConceptualFeedback } from './renderers/conceptual-practice.js';
import { showExcelFeedback } from './renderers/excel-practice.js';
import { showTableauFeedback } from './renderers/tableau-practice.js';
import { showPowerBiFeedback } from './renderers/powerbi-practice.js';
import { showPythonFeedback } from './renderers/python-practice.js';
import { showStatisticsFeedback } from './renderers/statistics-practice.js';
import { showCompletionCelebration } from '../../components/visual/completion-celebration.js';

const PRACTICE_STATUS = {
  sql: 'QUERY VALIDATED',
  excel: 'REPORT DELIVERED',
  tableau: 'ANALYSIS COMPLETE',
  'power-bi': 'MODEL VERIFIED',
  python: 'ANALYSIS COMPLETE',
  statistics: 'ANALYSIS COMPLETE',
};

export async function renderPracticeExercise(exercise, query = {}) {
  if (!exercise) {
    const el = document.createElement('div');
    el.appendChild(createEmptyState({ title: 'Exercise not found', message: 'Return to the Practice Lab and choose another exercise.' }));
    return el;
  }

  const container = document.createElement('div');
  container.className = 'practice-exercise';
  const crumb = getPracticeBreadcrumb(exercise);
  const lessonRoute = query.lesson || exercise.lessonId;
  const returnRoute = buildReturnToLessonRoute(lessonRoute, query.scroll);

  let dirty = false;
  let completed = await storage.isExerciseComplete(exercise.id);

  container.innerHTML = `
    <header class="practice-exercise__header page-header">
      <p class="text-sm text-muted mb-0 practice-exercise__breadcrumb">
        <a href="#/practice">Practice Lab</a> /
        <a href="#/practice/${exercise.subjectId}">${escapeHtml(crumb.subject)}</a> /
        <a href="${exercise.relatedLessonRoute}">${escapeHtml(crumb.lesson)}</a> /
        ${escapeHtml(crumb.practiceType)}
      </p>
      <div class="practice-exercise__title-row">
        <h1 class="page-header__title">${escapeHtml(exercise.title)}</h1>
        <a href="${returnRoute}" class="btn btn--secondary btn--sm practice-exercise__return">Return to Lesson</a>
      </div>
      <div class="flex flex-wrap gap-sm items-center">
        ${createBadge(exercise.subjectId.toUpperCase()).outerHTML}
        ${createBadge(getPracticeTypeLabel(exercise)).outerHTML}
        ${createBadge(exercise.difficulty).outerHTML}
        ${completed ? createBadge('Complete', 'complete').outerHTML : ''}
      </div>
      <p class="page-header__subtitle">${escapeHtml(exercise.instructions)}</p>
    </header>
  `;

  const toolbar = document.createElement('div');
  toolbar.className = 'practice-toolbar flex flex-wrap gap-sm mb-md';

  const hintBox = document.createElement('details');
  hintBox.className = 'hint-box mb-md';
  hintBox.innerHTML = `<summary>Hint</summary><p>${escapeHtml(exercise.hint)}</p>`;

  const workspace = document.createElement('div');
  workspace.className = 'practice-workspace mb-md';

  const feedback = document.createElement('div');
  feedback.className = 'practice-feedback';
  feedback.setAttribute('role', 'status');

  const completionPanel = document.createElement('section');
  completionPanel.className = 'practice-complete-panel card hidden';
  completionPanel.hidden = true;

  let hintsUsed = 0;
  let attempts = 0;

  toolbar.appendChild(createButton({
    label: 'Hint',
    variant: 'ghost',
    onClick: () => {
      hintsUsed++;
      hintBox.open = true;
    },
  }));

  async function handleSubmit(submission) {
    attempts++;
    const validation = validatePracticeAnswer(exercise, submission);
    showFeedback(feedback, validation, exercise);

    if (validation.correct) {
      const firstCompletion = !completed;
      await storage.savePracticeResult(exercise.id, exercise.subjectId, {
        correct: true,
        hintsUsed,
        attempts,
        lessonId: exercise.lessonId,
        practiceType: exercise.practiceType,
      });
      completed = true;
      dirty = false;
      showCompletionPanel(completionPanel, exercise, lessonRoute, query.scroll);
      if (firstCompletion) {
        showCompletionCelebration({
          title: exercise.title,
          status: PRACTICE_STATUS[exercise.subjectId] || 'MISSION COMPLETE',
          impact: 'Practice exercise verified in your skill record.',
          nextAction: 'Return to the lesson or continue with the next exercise.',
        });
      }
      showToast('Practice complete!', { type: 'success' });
    }
  }

  const interfaceEl = await renderPracticeInterface(exercise, {
    onSubmit: handleSubmit,
    onDirty: (isDirty = true) => { dirty = isDirty; },
    feedbackEl: feedback,
    toolbarEl: toolbar,
  });

  workspace.appendChild(interfaceEl);
  container.appendChild(toolbar);
  container.appendChild(hintBox);
  container.appendChild(workspace);
  container.appendChild(feedback);
  container.appendChild(completionPanel);

  if (completed) {
    const results = await storage.getPracticeResults(exercise.id);
    const best = results.filter((r) => r.correct).pop();
    if (best) {
      feedback.innerHTML = `<p class="sql-status sql-status--success">Previously completed · ${best.attempts} attempt(s)</p>`;
      showCompletionPanel(completionPanel, exercise, lessonRoute, query.scroll);
    }
  }

  window.addEventListener('hashchange', onNavigateAway, { once: true });
  function onNavigateAway(e) {
    if (dirty && !completed && !confirm('You have unsaved practice work. Leave anyway?')) {
      e.preventDefault?.();
      history.pushState(null, '', buildPracticeRoute(exercise));
    }
  }

  return container;
}

function showFeedback(feedbackEl, validation, exercise) {
  feedbackEl.replaceChildren();
  const type = exercise.interactionType;
  if (type === 'sql-query') {
    feedbackEl.innerHTML = `<p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">${validation.correct ? '✓ Correct!' : escapeHtml(validation.message)}</p>`;
    if (validation.correct) feedbackEl.insertAdjacentHTML('beforeend', `<p>${escapeHtml(validation.message)}</p>`);
    return;
  }
  if (type.startsWith('spreadsheet-') || type === 'chart-selection') return showExcelFeedback(feedbackEl, validation, exercise);
  if (type.startsWith('tableau-')) return showTableauFeedback(feedbackEl, validation, exercise);
  if (type.startsWith('powerbi-') || type === 'dax-expression') return showPowerBiFeedback(feedbackEl, validation, exercise);
  if (type.startsWith('python-') || type === 'dataframe-operation') return showPythonFeedback(feedbackEl, validation, exercise);
  if (type.startsWith('statistics-')) return showStatisticsFeedback(feedbackEl, validation, exercise);
  return showConceptualFeedback(feedbackEl, validation, exercise);
}

function showCompletionPanel(panel, exercise, lessonId, scroll) {
  panel.hidden = false;
  const nextEx = getNextExerciseInLesson(exercise);
  const continueTarget = getContinueLearningTarget(exercise);
  const returnRoute = buildReturnToLessonRoute(lessonId, scroll);

  panel.innerHTML = `
    <h2>Practice Complete</h2>
    <p class="text-secondary">You finished this ${escapeHtml(getPracticeTypeLabel(exercise).toLowerCase())} for ${escapeHtml(exercise.title)}.</p>
    <div class="flex flex-wrap gap-sm">
      <a href="${returnRoute}" class="btn btn--primary">Return to Lesson</a>
      ${nextEx ? `<a href="${buildPracticeRoute(nextEx)}" class="btn btn--secondary">Next Exercise</a>` : ''}
      <a href="${continueTarget.href}" class="btn btn--ghost">Continue Learning</a>
      <a href="${buildPracticeRoute(exercise)}" class="btn btn--ghost">Retry Exercise</a>
    </div>
  `;
}

export function guardSqlMisuse(exercise) {
  if (exercise.subjectId !== 'sql' && isSqlInteraction(exercise.interactionType)) {
    throw new Error(`Exercise ${exercise.id} incorrectly uses SQL editor for subject ${exercise.subjectId}`);
  }
}
