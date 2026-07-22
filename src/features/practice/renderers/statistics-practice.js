import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';

export function renderStatisticsPractice(exercise, { onSubmit, onDirty, toolbarEl }) {
  const wrap = document.createElement('div');
  wrap.className = 'practice-statistics';

  const values = exercise.starterState?.values || [12, 15, 18, 14, 20, 16, 19, 13];
  wrap.innerHTML = `
    <p class="text-sm text-muted">Statistics lab — calculators and interpretation (not SQL).</p>
    <label class="form-label" for="stats-data">Sample data (comma-separated)</label>
    <input id="stats-data" class="form-input" value="${values.join(', ')}" aria-label="Sample data values" />
    <div id="stats-calc-result" class="practice-statistics__result" aria-live="polite"></div>
    <label class="form-label" for="stats-answer">${exercise.interactionType === 'statistics-interpretation' ? 'Interpretation' : 'Calculation / conclusion'}</label>
    <textarea id="stats-answer" class="form-textarea" rows="5" placeholder="State the statistic and what it means for Northstar Commerce."></textarea>
  `;

  const dataEl = wrap.querySelector('#stats-data');
  const resultEl = wrap.querySelector('#stats-calc-result');
  const answerEl = wrap.querySelector('#stats-answer');

  [dataEl, answerEl].forEach((el) => el?.addEventListener('input', () => onDirty?.()));

  toolbarEl.appendChild(createButton({
    label: exercise.interactionType === 'statistics-experiment' ? 'Run Simulation' : 'Calculate',
    variant: 'secondary',
    onClick: () => {
      const nums = String(dataEl?.value || '').split(',').map((s) => parseFloat(s.trim())).filter((n) => !Number.isNaN(n));
      if (!nums.length) {
        resultEl.textContent = 'Enter numeric values to calculate.';
        return;
      }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const sorted = [...nums].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      resultEl.textContent = `n=${nums.length}, mean=${mean.toFixed(2)}, median=${median}, min=${sorted[0]}, max=${sorted[sorted.length - 1]}`;
    },
  }));

  toolbarEl.appendChild(createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'primary',
    onClick: () => onSubmit?.({ answer: answerEl?.value || '', calculation: resultEl?.textContent || '' }),
  }));

  return wrap;
}

export function showStatisticsFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Accepted' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><p>${escapeHtml(exercise.answerExplanation || exercise.explanation)}</p></div>` : ''}
  `;
}
