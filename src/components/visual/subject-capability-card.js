import { createProgressBar } from '../ui.js';
import { createSubjectIconEl } from './subject-icons.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { findNextLessonInSubject } from '../../services/progress-service.js';
import { getSubjectTheme } from '../../config/subject-theme.js';

function subjectStatus(completed, total) {
  if (total > 0 && completed >= total) return 'Complete';
  if (completed > 0) return 'In Progress';
  return 'Not Started';
}

function actionLabel(completed, total) {
  if (total > 0 && completed >= total) return 'Review';
  if (completed > 0) return 'Continue';
  return 'Start';
}

/**
 * Compact analytics capability card for dashboard subject progress.
 */
export function createSubjectCapabilityCard({ subject, progress, progressMap }) {
  const card = document.createElement('a');
  card.href = `#/learn/${subject.id}`;
  card.className = `card card--interactive subject-card subject-capability-card subject-${subject.id}`;
  card.style.textDecoration = 'none';
  card.style.color = 'inherit';

  const texture = document.createElement('div');
  texture.className = 'subject-capability-card__texture';
  texture.setAttribute('aria-hidden', 'true');
  card.appendChild(texture);

  const body = document.createElement('div');
  body.className = 'subject-capability-card__body';

  const header = document.createElement('div');
  header.className = 'subject-capability-card__header';
  header.appendChild(createSubjectIconEl(subject.id, 'subject-capability-card__icon'));
  const title = document.createElement('h3');
  title.className = 'subject-capability-card__title';
  title.textContent = subject.name;
  header.appendChild(title);
  body.appendChild(header);

  const theme = getSubjectTheme(subject.id);
  const desc = document.createElement('p');
  desc.className = 'subject-capability-card__desc';
  desc.textContent = theme.descriptor || subject.description;
  body.appendChild(desc);

  const lessons = document.createElement('p');
  lessons.className = 'subject-capability-card__stat';
  lessons.textContent = `${progress.completedLessons} of ${progress.totalLessons} lessons completed`;
  body.appendChild(lessons);

  const readiness = document.createElement('p');
  readiness.className = 'subject-capability-card__readiness';
  readiness.textContent = `${progress.readiness}% verified readiness`;
  body.appendChild(readiness);

  body.appendChild(createProgressBar(progress.lessonPercent, {
    label: 'Progress',
    completed: progress.completedLessons,
    total: progress.totalLessons,
  }));

  const status = document.createElement('p');
  status.className = 'subject-capability-card__status';
  status.textContent = `Status: ${subjectStatus(progress.completedLessons, progress.totalLessons)}`;
  body.appendChild(status);

  const nextLesson = findNextLessonInSubject(subject, progressMap);
  if (nextLesson) {
    const next = document.createElement('p');
    next.className = 'subject-capability-card__next';
    next.textContent = `Next: ${nextLesson.title}`;
    body.appendChild(next);
  }

  const action = document.createElement('span');
  action.className = 'subject-capability-card__action';
  action.textContent = actionLabel(progress.completedLessons, progress.totalLessons);
  body.appendChild(action);

  card.appendChild(body);
  return card;
}
