import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';
import { POWERBI_SIMULATOR_RENDERERS } from '../powerbi/powerbi-simulators.js';
import { renderConceptualPractice } from './conceptual-practice.js';

export function renderPowerBiPractice(exercise, context) {
  const config = exercise.powerBiConfig;
  const simulatorType = config?.simulatorType || exercise.simulatorType;

  if (!simulatorType) {
    return renderConceptualPractice(exercise, context);
  }

  const renderer = POWERBI_SIMULATOR_RENDERERS[simulatorType];
  if (!renderer) {
    return renderConceptualPractice(exercise, context);
  }

  return renderer(exercise, context);
}

export function showPowerBiFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Accepted' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><p>${escapeHtml(exercise.answerExplanation || exercise.explanation)}</p></div>` : ''}
  `;
}
