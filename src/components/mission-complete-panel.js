import { createButton, createLinkButton } from './ui.js';
import { escapeHtml } from '../utilities/sanitize.js';
import { buildPracticeRouteWithContext } from '../services/practice-service.js';
import { getExercise } from '../content/index.js';

export function createMissionCompletePanel({
  lesson,
  briefing,
  guidedComplete,
  challengeComplete,
  quizAttempt,
  nextLesson,
  guidedExerciseId,
  challengeExerciseId,
}) {
  const panel = document.createElement('section');
  panel.className = 'mission-complete';
  panel.setAttribute('aria-label', 'Mission complete');

  const quizPassed = quizAttempt && quizAttempt.percentage >= 0.67;
  const deliverable = briefing?.completionMessage || lesson.title;
  const impact = briefing?.businessImpact || 'Analysis validated for stakeholder use.';

  panel.innerHTML = `
    <div class="mission-complete__terminal-line" aria-hidden="true">&gt; lesson validation passed</div>
    <h2 class="mission-complete__title">Mission Complete</h2>
    <p class="mission-complete__deliverable">${escapeHtml(deliverable)}</p>
    <dl class="mission-complete__status">
      <div><dt>Practice</dt><dd>${guidedComplete ? 'Guided complete' : 'Guided pending'} · ${challengeComplete ? 'Challenge complete' : 'Challenge pending'}</dd></div>
      <div><dt>Knowledge check</dt><dd>${quizAttempt ? `${Math.round(quizAttempt.percentage * 100)}% ${quizPassed ? '· passed' : '· review recommended'}` : 'Not attempted'}</dd></div>
      <div><dt>Business deliverable</dt><dd>${escapeHtml(deliverable)}</dd></div>
      <div><dt>Business impact</dt><dd>${escapeHtml(impact)}</dd></div>
      ${nextLesson ? `<div><dt>Next module</dt><dd>${escapeHtml(nextLesson.title)}</dd></div>` : ''}
    </dl>
  `;

  const actions = document.createElement('div');
  actions.className = 'mission-complete__actions flex flex-wrap gap-sm';

  if (nextLesson) {
    actions.appendChild(createLinkButton({
      label: 'Continue Learning',
      href: `#/lesson/${nextLesson.id}`,
      variant: 'primary',
    }));
  }

  actions.appendChild(createLinkButton({
    label: 'Review Lesson',
    href: `#/lesson/${lesson.id}`,
    variant: 'secondary',
  }));

  const practiceEx = guidedExerciseId ? getExercise(guidedExerciseId) : null;
  if (practiceEx) {
    actions.appendChild(createLinkButton({
      label: 'Open Related Practice',
      href: buildPracticeRouteWithContext(practiceEx),
      variant: 'ghost',
    }));
  }

  panel.appendChild(actions);
  return panel;
}
