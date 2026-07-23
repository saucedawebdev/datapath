import {
  getLesson,
  getModule,
  getSubject,
  getAdjacentLessons,
  getExercise,
  getQuiz,
} from '../../content/index.js';
import { storage } from '../../storage/storage-service.js';
import { createButton, createBadge } from '../../components/ui.js';
import { showToast } from '../../components/toast-dialog.js';
import { scoreQuiz } from '../../services/quiz-service.js';
import { escapeHtml } from '../../utilities/sanitize.js';
import { refreshCurrentRoute } from '../../app/router.js';
import {
  buildPracticeRouteWithContext,
  getPracticeButtonLabel,
  saveLessonScroll,
  getLessonScroll,
} from '../../services/practice-service.js';
import { createAnalystBriefingPanel } from '../../components/analyst-briefing.js';
import { createMissionCompletePanel } from '../../components/mission-complete-panel.js';
import { createCaseFilePanel } from '../../components/case-file.js';
import { createBusinessImpactPanel } from '../../components/business-impact.js';
import { getLessonPosition } from '../../content/index.js';
import { createSubjectIconEl } from '../../components/visual/subject-icons.js';
import {
  createWhyThisMattersCallout,
  createBusinessRequestCallout,
  createCommonMistakesCallout,
  createKeyTakeawayPanel,
  createInterviewQuestionPanel,
  createJobUseLabel,
} from '../../components/lesson-callouts.js';
import { getInterviewPromptForLesson } from '../../config/lesson-interview-prompts.js';
import { showCompletionCelebration } from '../../components/visual/completion-celebration.js';
import { debounce } from '../../utilities/helpers.js';

const COMPLETION_STATUS = {
  sql: 'QUERY VALIDATED',
  excel: 'REPORT DELIVERED',
  tableau: 'ANALYSIS COMPLETE',
  'power-bi': 'MODEL VERIFIED',
  python: 'ANALYSIS COMPLETE',
  statistics: 'ANALYSIS COMPLETE',
};

export async function renderLesson(params, query = {}) {
  const lesson = getLesson(params.lessonId);
  if (!lesson) {
    return renderNotFound(params.lessonId);
  }

  const subject = getSubject(lesson.subjectId);
  const module = getModule(lesson.subjectId, lesson.moduleId);
  const progress = await storage.getProgress(lesson.id);
  const bookmarked = await storage.isBookmarked(lesson.id);
  const note = await storage.getNote(lesson.id);
  const { prev, next } = getAdjacentLessons(lesson.id);
  const position = getLessonPosition(lesson.id);

  await storage.logLessonView(lesson.id, lesson.subjectId);

  const article = document.createElement('article');
  article.className = 'lesson-page';

  const header = document.createElement('header');
  header.className = 'lesson-page__header page-header';
  header.innerHTML = `
    <p class="text-sm text-muted mb-0">
      <a href="#/learn">Learn</a> /
      <a href="#/learn/${lesson.subjectId}">${escapeHtml(subject?.name || lesson.subjectId)}</a> /
      ${escapeHtml(module?.name || '')}
    </p>
    <div class="lesson-page__meta mb-sm">
      <span class="lesson-page__subject-icon" aria-hidden="true"></span>
      <span>${escapeHtml(subject?.name || '')}</span>
      ${position ? `<span>Lesson ${position.index} of ${position.totalInSubject}</span>` : ''}
      ${lesson.estimatedMinutes ? `<span>~${lesson.estimatedMinutes} min</span>` : ''}
    </div>
    <h1 class="page-header__title" tabindex="-1" id="lesson-page-title">${escapeHtml(lesson.title)}</h1>
    <div class="flex flex-wrap gap-sm items-center">
      ${createBadge(lesson.difficulty).outerHTML}
      ${progress?.complete ? createBadge('Completed', 'complete').outerHTML : ''}
    </div>
  `;
  header.querySelector('.lesson-page__subject-icon')
    ?.appendChild(createSubjectIconEl(lesson.subjectId, 'lesson-page__icon'));
  article.appendChild(header);

  requestAnimationFrame(() => {
    document.getElementById('lesson-page-title')?.focus({ preventScroll: true });
  });

  const actions = document.createElement('div');
  actions.className = 'flex flex-wrap gap-sm mb-lg';
  actions.appendChild(createButton({
    label: bookmarked ? 'Bookmarked' : 'Bookmark',
    variant: 'secondary',
    onClick: async () => {
      const added = await storage.toggleBookmark(lesson.id, 'lesson', lesson.subjectId, lesson.title);
      showToast(added ? 'Bookmark saved' : 'Bookmark removed', { type: 'success' });
      refreshCurrentRoute();
    },
  }));
  actions.appendChild(createButton({
    label: progress?.complete ? 'Mark incomplete' : 'Mark complete',
    variant: 'primary',
    onClick: async () => {
      const wasComplete = Boolean(progress?.complete);
      await storage.setLessonComplete(lesson.id, lesson.subjectId, lesson.moduleId, !wasComplete);
      if (!wasComplete) {
        showCompletionCelebration({
          title: lesson.title,
          status: COMPLETION_STATUS[lesson.subjectId] || 'MISSION COMPLETE',
          impact: lesson.businessImpact?.summary || lesson.analystBriefing?.businessGoal || 'Lesson verified in your progress record.',
          nextAction: next ? `Next recommended: ${next.title}` : 'Explore capstone projects in Projects.',
        });
      }
      showToast(wasComplete ? 'Marked incomplete' : '> lesson validation passed — mission complete', { type: 'success' });
      refreshCurrentRoute();
    },
  }));

  const workspaceRoutes = {
    sql: '#/playground/sql',
    excel: '#/playground/excel',
    python: '#/playground/python',
    statistics: '#/playground/statistics',
  };
  if (workspaceRoutes[lesson.subjectId]) {
    actions.appendChild(createButton({
      label: 'Open Playground',
      variant: 'ghost',
      onClick: () => { window.location.hash = workspaceRoutes[lesson.subjectId]; },
    }));
  }
  article.appendChild(actions);

  if (lesson.caseFile) {
    article.appendChild(createCaseFilePanel(lesson.caseFile));
  }

  if (lesson.analystBriefing) {
    article.appendChild(createAnalystBriefingPanel(lesson.analystBriefing));
  }

  const sections = [
    { title: 'What you will learn', content: listHtml(lesson.learningObjectives), prose: true },
    { title: 'Plain-English Explanation', content: p(lesson.plainEnglish), prose: true },
    { title: 'What It Does', content: p(lesson.whatItDoes), prose: true },
    { callout: 'why', text: lesson.whyItMatters },
    { title: 'When to Use It', content: p(lesson.whenToUse), prose: true },
    { callout: 'business', text: lesson.stakeholderQuestion },
    { title: 'Concept Walkthrough', content: p(lesson.walkthrough), prose: true },
    { title: 'Syntax', content: lesson.syntax ? `<pre class="code-block"><code>${escapeHtml(lesson.syntax)}</code></pre>` : '', wide: true },
    { title: 'Component Breakdown', content: breakdownHtml(lesson.componentBreakdown), wide: true },
    { title: 'Sample Input', content: p(lesson.sampleInput), prose: true },
    { title: 'Expected Output', content: p(lesson.expectedOutput), prose: true },
    { callout: 'mistakes', items: lesson.commonMistakes },
    { title: 'Best Practices', content: listHtml(lesson.bestPractices), prose: true },
    { title: 'Guided Example', content: guidedExampleHtml(lesson.guidedExample), wide: true },
    { title: 'Project Connection', content: p(lesson.projectConnection), prose: true },
    { title: 'Related Lessons', content: relatedLessonsHtml(lesson.relatedConcepts) },
  ];

  for (const sec of sections) {
    if (sec.callout === 'why') {
      const el = createWhyThisMattersCallout(sec.text);
      if (el) article.appendChild(el);
      continue;
    }
    if (sec.callout === 'business') {
      const el = createBusinessRequestCallout(sec.text);
      if (el) article.appendChild(el);
      continue;
    }
    if (sec.callout === 'mistakes') {
      const el = createCommonMistakesCallout(sec.items);
      if (el) article.appendChild(el);
      continue;
    }
    if (!sec.content) continue;
    article.appendChild(createLessonSection(sec.title, sec.content, { prose: sec.prose, wide: sec.wide }));
  }

  if (lesson.guidedPractice?.exerciseId) {
    const ex = getExercise(lesson.guidedPractice.exerciseId);
    if (ex) {
      const sec = await createExerciseSection('Guided Practice', ex, lesson.id);
      sec.prepend(createJobUseLabel());
      article.appendChild(sec);
    }
  }
  if (lesson.independentChallenge?.exerciseId) {
    const ex = getExercise(lesson.independentChallenge.exerciseId);
    if (ex) {
      const sec = await createExerciseSection('Independent Challenge', ex, lesson.id);
      sec.prepend(createJobUseLabel());
      article.appendChild(sec);
    }
  }
  if (lesson.knowledgeCheck?.quizId) {
    article.appendChild(await createQuizSection(lesson.knowledgeCheck.quizId));
  }

  const takeaway = createKeyTakeawayPanel(lesson);
  if (takeaway) article.appendChild(takeaway);

  const interview = createInterviewQuestionPanel(getInterviewPromptForLesson(lesson));
  if (interview) article.appendChild(interview);

  article.appendChild(createNotesSection(lesson.id, note));

  if (lesson.businessImpact) {
    article.appendChild(createBusinessImpactPanel(lesson.businessImpact, { complete: Boolean(progress?.complete) }));
  }

  if (progress?.complete) {
    const guidedId = lesson.guidedPractice?.exerciseId;
    const challengeId = lesson.independentChallenge?.exerciseId;
    const quizId = lesson.knowledgeCheck?.quizId;
    const quizAttempts = quizId ? await storage.getQuizAttempts(quizId) : [];
    const bestQuiz = quizAttempts.sort((a, b) => (b.percentage || 0) - (a.percentage || 0))[0];

    article.appendChild(createMissionCompletePanel({
      lesson,
      briefing: lesson.analystBriefing,
      guidedComplete: guidedId ? await storage.isExerciseComplete(guidedId) : false,
      challengeComplete: challengeId ? await storage.isExerciseComplete(challengeId) : false,
      quizAttempt: bestQuiz,
      nextLesson: next,
      guidedExerciseId: guidedId,
      challengeExerciseId: challengeId,
    }));
  }

  const nav = document.createElement('nav');
  nav.className = 'lesson-nav';
  nav.setAttribute('aria-label', 'Lesson navigation');
  nav.innerHTML = `
    ${prev ? `<a href="#/lesson/${prev.id}" class="btn btn--secondary">← ${escapeHtml(prev.title)}</a>` : '<span></span>'}
    ${next ? `<a href="#/lesson/${next.id}" class="btn btn--primary">${escapeHtml(next.title)} →</a>` : '<span></span>'}
  `;
  article.appendChild(nav);

  const scrollTarget = query.scroll ? parseInt(query.scroll, 10) : getLessonScroll(lesson.id);
  if (scrollTarget > 0) {
    requestAnimationFrame(() => window.scrollTo(0, scrollTarget));
  }

  return article;
}

function createLessonSection(title, html, { prose = false, wide = false } = {}) {
  const section = document.createElement('section');
  section.className = `lesson-section${wide ? ' lesson-section--wide' : ''}`;
  const inner = prose ? `<div class="lesson-prose">${html}</div>` : html;
  section.innerHTML = `<h2 class="lesson-section__title">${title}</h2>${inner}`;
  return section;
}

async function createExerciseSection(title, ex, lessonId) {
  const section = document.createElement('section');
  section.className = 'lesson-section exercise-card';
  const complete = await storage.isExerciseComplete(ex.id);
  const best = complete ? await storage.getBestPracticeResult(ex.id) : null;

  section.innerHTML = `
    <h2 class="lesson-section__title">${title}</h2>
    <p>${escapeHtml(ex.instructions)}</p>
    ${ex.hint ? `<details class="hint-box"><summary>Hint preview</summary><p>${escapeHtml(ex.hint)}</p></details>` : ''}
    ${complete ? `<p class="sql-status sql-status--success">${escapeHtml(title)} Complete${best ? ` · Best attempt: ${best.attempts} try/ies` : ''}</p>` : ''}
  `;

  const actions = document.createElement('div');
  actions.className = 'flex flex-wrap gap-sm';

  const startBtn = createButton({
    label: getPracticeButtonLabel(ex),
    variant: 'primary',
    onClick: () => {
      saveLessonScroll(lessonId);
      window.location.hash = buildPracticeRouteWithContext(ex, { scrollY: window.scrollY });
    },
  });
  actions.appendChild(startBtn);

  const revealBtn = createButton({
    label: 'Show Solution',
    variant: 'ghost',
    onClick: () => {
      if (!confirm('Reveal the solution? Try the exercise in Practice Lab first if you have not attempted it.')) return;
      const box = document.createElement('details');
      box.className = 'answer-box';
      box.open = true;
      box.innerHTML = `
        <summary>Solution</summary>
        <pre class="code-block"><code>${escapeHtml(ex.expectedAnswer)}</code></pre>
        <p>${escapeHtml(ex.answerExplanation || ex.explanation)}</p>
      `;
      section.appendChild(box);
      revealBtn.disabled = true;
    },
  });
  actions.appendChild(revealBtn);

  section.appendChild(actions);
  return section;
}

function p(text) {
  return text ? `<p>${escapeHtml(text)}</p>` : '';
}

function listHtml(items) {
  if (!items?.length) return '';
  return `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
}

function stakeholderBox(q) {
  return q ? `<div class="stakeholder-box"><div class="stakeholder-box__label">What a manager might ask</div><p class="mb-0">${escapeHtml(q)}</p></div>` : '';
}

function breakdownHtml(items) {
  if (!items?.length) return '';
  return `<dl>${items.map((i) => `<dt><strong>${escapeHtml(i.part)}</strong></dt><dd>${escapeHtml(i.explanation)}</dd>`).join('')}</dl>`;
}

function guidedExampleHtml(ex) {
  if (!ex) return '';
  let html = ex.description ? p(ex.description) : '';
  if (ex.sql) html += `<pre class="code-block"><code>${escapeHtml(ex.sql)}</code></pre>`;
  if (ex.steps) html += listHtml(ex.steps);
  return html;
}

function relatedLessonsHtml(ids) {
  if (!ids?.length) return '';
  return `<ul>${ids.map((id) => {
    const lesson = getLesson(id);
    const label = lesson?.title || id;
    return `<li><a href="#/lesson/${id}">${escapeHtml(label)}</a></li>`;
  }).join('')}</ul>`;
}

async function createQuizSection(quizId) {
  const quiz = getQuiz(quizId);
  if (!quiz) return document.createDocumentFragment();

  const section = document.createElement('section');
  section.className = 'lesson-section quiz-card';
  section.innerHTML = `<h2 class="lesson-section__title">Knowledge Check</h2>`;

  const form = document.createElement('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const answers = quiz.questions.map((_, i) => {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      return selected ? parseInt(selected.value, 10) : -1;
    });
    const result = scoreQuiz(quiz.questions, answers);
    await storage.saveQuizAttempt(quizId, quiz.subjectId, result.score, result.total);
    resultsDiv.hidden = false;
    const pct = Math.round(result.percentage * 100);
    const feedbackClass = pct >= 80 ? 'quiz-feedback--correct' : 'quiz-feedback--partial';
    resultsDiv.className = `quiz-feedback ${feedbackClass}`;
    resultsDiv.setAttribute('role', 'status');
    resultsDiv.setAttribute('aria-live', 'polite');
    resultsDiv.innerHTML = `
      <p><strong>Score: ${result.score}/${result.total}</strong> (${pct}%)</p>
      ${result.results.map((r, i) => `
        <p><strong>${r.correct ? 'Correct' : 'Incorrect'}:</strong> ${escapeHtml(quiz.questions[i].explanation)}</p>
      `).join('')}
      <p class="mb-0 text-sm">Review the concept above, then continue to practice or the next lesson.</p>
    `;
    showToast('Quiz submitted', { type: 'success' });
  });

  quiz.questions.forEach((q, i) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'form-group';
    fieldset.innerHTML = `<legend class="form-label">Question ${i + 1}: ${escapeHtml(q.question)}</legend>`;
    q.options.forEach((opt, j) => {
      const label = document.createElement('label');
      label.className = 'flex items-center gap-sm';
      label.style.display = 'flex';
      label.innerHTML = `<input type="radio" name="q${i}" value="${j}" required /> ${escapeHtml(opt)}`;
      fieldset.appendChild(label);
    });
    form.appendChild(fieldset);
  });

  form.appendChild(createButton({ label: 'Submit Quiz', variant: 'primary', type: 'submit' }));
  const resultsDiv = document.createElement('div');
  resultsDiv.hidden = true;
  resultsDiv.setAttribute('role', 'status');

  section.appendChild(form);
  section.appendChild(resultsDiv);
  return section;
}

function createNotesSection(lessonId, initialNote) {
  const section = document.createElement('section');
  section.className = 'lesson-section';
  section.innerHTML = `<h2 class="lesson-section__title">Personal Notes</h2>`;

  const textarea = document.createElement('textarea');
  textarea.className = 'form-textarea';
  textarea.id = 'lesson-notes';
  textarea.setAttribute('aria-label', 'Personal notes for this lesson');
  textarea.value = initialNote;

  const status = document.createElement('p');
  status.className = 'notes-status';
  status.setAttribute('aria-live', 'polite');

  const saveNote = debounce(async () => {
    status.textContent = 'Saving…';
    status.classList.remove('notes-status--error');
    try {
      await storage.saveNote(lessonId, textarea.value);
      status.textContent = 'Saved';
    } catch {
      status.textContent = 'Could not save';
      status.classList.add('notes-status--error');
    }
  }, 600);

  textarea.addEventListener('input', saveNote);

  const saveBtn = createButton({
    label: 'Save notes',
    variant: 'secondary',
    onClick: async () => {
      status.textContent = 'Saving…';
      try {
        await storage.saveNote(lessonId, textarea.value);
        status.textContent = 'Saved';
        showToast('Notes saved', { type: 'success' });
      } catch {
        status.textContent = 'Could not save';
        status.classList.add('notes-status--error');
      }
    },
  });

  section.appendChild(textarea);
  section.appendChild(saveBtn);
  section.appendChild(status);
  return section;
}

function renderNotFound(lessonId) {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <h2>Lesson not found</h2>
    <p>Could not find lesson "${escapeHtml(lessonId)}".</p>
    <a href="#/learn" class="btn btn--primary">Back to Learn</a>
  `;
  return div;
}
