import { getTableauDataset, isDimension, isMeasure } from '../data/tableau-datasets.js';
import { isMinimumConfigPresent } from '../features/practice/tableau/tableau-viz-engine.js';

function normalizeText(text) {
  return String(text || '').trim().toLowerCase();
}

function shelvesInclude(state, fieldId) {
  return state.rows === fieldId || state.columns === fieldId;
}

export function validateTableauViz(exercise, submission) {
  const config = exercise.tableauConfig;
  const expected = config?.expected || exercise.validationConfig?.tableau;
  const feedback = config?.feedback || {};
  const state = submission.state || {};

  if (!expected) {
    return { correct: false, message: 'Exercise configuration missing expected visualization.' };
  }

  if (!isMinimumConfigPresent(getTableauDataset(config.datasetId), state)) {
    return { correct: false, message: feedback.missingMeasure || 'Add one dimension and one measure before checking.' };
  }

  const hasMeasure = shelvesInclude(state, expected.measure);
  const hasDimension = shelvesInclude(state, expected.dimension);
  const hasChart = !expected.chartType || state.chartType === expected.chartType;

  if (!hasMeasure) {
    return {
      correct: false,
      message: feedback.wrongMeasure || `Add ${expected.measure} to Rows or Columns.`,
      hint: feedback.missingMeasure,
    };
  }

  if (!hasDimension) {
    return {
      correct: false,
      message: feedback.wrongDimension || `Use ${expected.dimension} as the dimension for this view.`,
      hint: feedback.missingDimension,
    };
  }

  if (!hasChart) {
    return {
      correct: false,
      message: feedback.wrongChart || `Switch the chart type to ${expected.chartType}.`,
    };
  }

  if (expected.filter && state.filter !== expected.filter) {
    return { correct: false, message: feedback.wrongFilter || `Apply a ${expected.filter} filter.` };
  }

  if (expected.filterValue && state.filterValue !== expected.filterValue) {
    return { correct: false, message: feedback.wrongFilter || `Set the filter to ${expected.filterValue}.` };
  }

  return {
    correct: true,
    message: exercise.answerExplanation || exercise.explanation,
  };
}

export function validateTableauClassify(exercise, submission) {
  const expected = exercise.tableauConfig?.expected || {};
  const state = submission.state || {};
  try {
    const parsed = typeof state === 'object' ? state : JSON.parse(submission.answer || '{}');
    for (const [field, answer] of Object.entries(expected)) {
      if (normalizeText(parsed[field]) !== normalizeText(answer)) {
        return { correct: false, message: `Re-check whether ${field} is a dimension or measure.` };
      }
    }
    return { correct: true, message: exercise.explanation };
  } catch {
    return { correct: false, message: 'Classify each field before checking.' };
  }
}

export function validateTableauFormula(exercise, submission) {
  const answer = normalizeText(submission.answer);
  const keywords = exercise.tableauConfig?.expectedKeywords || ['profit', 'revenue'];
  const hits = keywords.filter((k) => answer.includes(k)).length;
  if (hits >= Math.ceil(keywords.length * 0.6)) {
    return { correct: true, message: exercise.explanation };
  }
  return { correct: false, message: 'Include SUM(Profit) and SUM(Revenue) in your margin calculation.' };
}
