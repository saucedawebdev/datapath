import { escapeHtml } from '../utilities/sanitize.js';

export function createWhyThisMattersCallout(text) {
  if (!text) return null;
  const aside = document.createElement('aside');
  aside.className = 'lesson-callout lesson-callout--why';
  aside.innerHTML = `
    <p class="lesson-callout__label">Why this matters</p>
    <p class="lesson-callout__body mb-0">${escapeHtml(text)}</p>
  `;
  return aside;
}

export function createBusinessRequestCallout(text) {
  if (!text) return null;
  const aside = document.createElement('aside');
  aside.className = 'lesson-callout lesson-callout--business';
  aside.innerHTML = `
    <p class="lesson-callout__label">Business request</p>
    <p class="lesson-callout__body mb-0">${escapeHtml(text)}</p>
  `;
  return aside;
}

export function createCommonMistakesCallout(mistakes) {
  if (!mistakes?.length) return null;
  const aside = document.createElement('aside');
  aside.className = 'lesson-callout lesson-callout--warning';
  aside.innerHTML = `
    <p class="lesson-callout__label"><span aria-hidden="true">⚠</span> Common mistakes</p>
    <ul class="lesson-callout__list mb-0">${mistakes.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
  `;
  return aside;
}

export function createKeyTakeawayPanel(lesson) {
  const items = [];
  if (lesson.keyTakeaways?.length) {
    items.push(...lesson.keyTakeaways.slice(0, 3));
  } else {
    if (lesson.whatItDoes) items.push(lesson.whatItDoes);
    if (lesson.whyItMatters && items.length < 3) items.push(lesson.whyItMatters);
    if (lesson.bestPractices?.[0] && items.length < 3) items.push(lesson.bestPractices[0]);
  }
  const takeaways = items.slice(0, 3);
  if (!takeaways.length) return null;

  const section = document.createElement('section');
  section.className = 'lesson-callout lesson-callout--takeaway';
  section.innerHTML = `
    <h2 class="lesson-callout__label">Key takeaway</h2>
    <ul class="lesson-callout__list mb-0">${takeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
  `;
  return section;
}

export function createInterviewQuestionPanel(prompt) {
  if (!prompt?.question) return null;

  const section = document.createElement('section');
  section.className = 'lesson-callout lesson-callout--interview';
  section.innerHTML = `<h2 class="lesson-callout__label">Interview question</h2>`;

  const q = document.createElement('p');
  q.className = 'lesson-callout__body';
  q.textContent = prompt.question;
  section.appendChild(q);

  if (prompt.sampleAnswer) {
    const details = document.createElement('details');
    details.className = 'lesson-callout__reveal';
    const summary = document.createElement('summary');
    summary.textContent = 'Reveal sample answer';
    summary.setAttribute('aria-expanded', 'false');
    details.appendChild(summary);
    const answer = document.createElement('p');
    answer.className = 'mb-0';
    answer.textContent = prompt.sampleAnswer;
    details.appendChild(answer);
    details.addEventListener('toggle', () => {
      summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
    });
    section.appendChild(details);
  }

  return section;
}

export function createJobUseLabel() {
  const span = document.createElement('span');
  span.className = 'job-use-label';
  span.textContent = 'Used in analyst work';
  return span;
}
