import { createSubjectIconEl } from './visual/subject-icons.js';
import { createProgressBar, createLinkButton } from './ui.js';
import { getSubjectTheme } from '../config/subject-theme.js';
import { getLessonPosition } from '../content/index.js';
import { escapeHtml } from '../utilities/sanitize.js';

/**
 * Primary dashboard continue-learning card.
 */
export function createContinueLearningCard({ continueTarget, hasProgress }) {
  const card = document.createElement('section');
  card.className = 'continue-learning-card';
  card.setAttribute('aria-label', 'Continue learning');

  if (!continueTarget) {
    card.innerHTML = `
      <div class="continue-learning-card__content">
        <h2 class="continue-learning-card__heading">All lessons complete</h2>
        <p class="continue-learning-card__desc mb-0">Explore capstone projects to apply your full analytics toolkit.</p>
      </div>
    `;
    const actions = document.createElement('div');
    actions.className = 'continue-learning-card__actions';
    actions.appendChild(createLinkButton({ label: 'View projects', href: '#/projects', variant: 'primary' }));
    card.appendChild(actions);
    return card;
  }

  const { subject, lesson } = continueTarget;
  const theme = getSubjectTheme(subject.id);
  const position = getLessonPosition(lesson.id);
  const buttonLabel = hasProgress ? 'Continue lesson' : 'Start learning';
  const nextDesc = lesson.plainEnglish
    ? lesson.plainEnglish.slice(0, 140) + (lesson.plainEnglish.length > 140 ? '…' : '')
    : theme.descriptor;

  card.innerHTML = `
    <div class="continue-learning-card__visual subject-${subject.id}" aria-hidden="true">
      <div class="continue-learning-card__pattern ${theme.patternClass}"></div>
    </div>
    <div class="continue-learning-card__content">
      <p class="continue-learning-card__eyebrow type-mono">Continue learning</p>
      <div class="continue-learning-card__subject">
        <span class="continue-learning-card__icon-wrap"></span>
        <span>${escapeHtml(subject.name)}</span>
      </div>
      <h2 class="continue-learning-card__heading">${escapeHtml(lesson.title)}</h2>
      <p class="continue-learning-card__meta text-sm text-muted">
        ${position ? `Lesson ${position.index} of ${position.totalInSubject}` : ''}
        ${lesson.estimatedMinutes ? ` · ~${lesson.estimatedMinutes} min` : ''}
      </p>
      <p class="continue-learning-card__desc">${escapeHtml(nextDesc)}</p>
      <div class="continue-learning-card__progress"></div>
    </div>
    <div class="continue-learning-card__actions"></div>
  `;

  card.querySelector('.continue-learning-card__icon-wrap')
    .appendChild(createSubjectIconEl(subject.id, 'continue-learning-card__icon'));

  card.querySelector('.continue-learning-card__progress').appendChild(
    createProgressBar(continueTarget.subjectProgress?.lessonPercent ?? 0, {
      label: `${subject.name} progress`,
      completed: continueTarget.subjectProgress?.completedLessons ?? 0,
      total: continueTarget.subjectProgress?.totalLessons ?? 0,
    }),
  );

  card.querySelector('.continue-learning-card__actions').appendChild(
    createLinkButton({
      label: buttonLabel,
      href: `#/lesson/${lesson.id}`,
      variant: 'primary',
    }),
  );

  return card;
}
