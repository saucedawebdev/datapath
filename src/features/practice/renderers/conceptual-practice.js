import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';

export function renderConceptualPractice(exercise, { onSubmit, onDirty, toolbarEl }) {
  const wrap = document.createElement('div');
  wrap.className = 'practice-conceptual';

  const prompt = document.createElement('p');
  prompt.className = 'practice-conceptual__prompt';
  prompt.textContent = 'Respond in your own words using Northstar Commerce context.';

  const textarea = document.createElement('textarea');
  textarea.className = 'form-textarea practice-conceptual__input';
  textarea.rows = 6;
  textarea.placeholder = 'Type your answer here…';
  textarea.setAttribute('aria-label', 'Practice answer');
  textarea.addEventListener('input', () => onDirty?.());

  toolbarEl.appendChild(createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'primary',
    onClick: () => onSubmit?.({ answer: textarea.value }),
  }));
  toolbarEl.appendChild(createButton({
    label: 'Reset',
    variant: 'ghost',
    onClick: () => {
      textarea.value = '';
      onDirty?.(false);
    },
  }));

  wrap.appendChild(prompt);
  wrap.appendChild(textarea);
  return wrap;
}

export function showConceptualFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Practice complete' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><strong>Explanation:</strong> ${escapeHtml(exercise.answerExplanation || exercise.explanation)}</div>` : ''}
  `;
}
