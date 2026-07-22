import { runQuery, compareResults } from './sql-engine.js';
import {
  validateTableauViz,
  validateTableauClassify,
  validateTableauFormula,
} from './tableau-validation-service.js';
import { validatePowerBiExercise } from './powerbi-validation-service.js';

function normalizeSql(sql) {
  return String(sql || '')
    .replace(/--[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/;$/, '');
}

function normalizeText(text) {
  return String(text || '').trim().toLowerCase();
}

export function validatePracticeAnswer(exercise, submission) {
  const config = exercise.validationConfig || {};
  const interaction = exercise.interactionType;

  if (interaction === 'sql-query') {
    const result = runQuery(submission.sql || '');
    if (result.type === 'error') {
      return { correct: false, message: result.message };
    }
    if (config.expectedColumns || config.minRowCount != null || config.maxRowCount != null) {
      const comparison = compareResults(result, config);
      if (!comparison.match) return { correct: false, message: comparison.reason };
    }
    const expected = normalizeSql(config.expectedSql || exercise.expectedAnswer);
    const actual = normalizeSql(submission.sql);
    if (expected && actual && (actual.includes(expected) || expected.includes(actual))) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    if (result.type === 'result' && result.rowCount >= 0) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'Query did not match the expected approach. Review your SELECT, filters, and joins.' };
  }

  if (interaction === 'spreadsheet-formula') {
    const formula = normalizeText(submission.formula);
    const expected = normalizeText(config.expectedFormula || exercise.expectedAnswer);
    const variants = (config.acceptableVariants || []).map(normalizeText);
    if (formula === expected || variants.includes(formula) || formula.includes(expected.replace(/^=/, ''))) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'Formula does not match the expected result. Check cell references and function syntax.' };
  }

  if (interaction === 'dax-expression') {
    const expr = normalizeText(submission.expression);
    const expected = normalizeText(config.expectedExpression || exercise.expectedAnswer);
    if (expr.includes(expected) || expected.includes(expr)) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'DAX expression does not match. Review filter context and aggregation.' };
  }

  if (interaction === 'python-code' || interaction === 'dataframe-operation') {
    const output = normalizeText(submission.output);
    const expected = normalizeText(config.expectedOutput || exercise.expectedAnswer);
    if (!output) return { correct: false, message: 'Run your Python code to produce output before checking.' };
    if (output.includes(expected.slice(0, 40)) || expected.includes(output.slice(0, 40))) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'Output does not match the expected result. Check column names, filters, and aggregations.' };
  }

  if (interaction.startsWith('statistics-')) {
    const answer = normalizeText(submission.answer);
    const expected = normalizeText(config.expectedAnswer || exercise.expectedAnswer);
    const keywords = (config.keywords || expected.split(/[,;]+/)).map(normalizeText).filter(Boolean);
    const matched = keywords.filter((k) => answer.includes(k) || expected.includes(answer)).length;
    if (matched >= Math.max(1, Math.ceil(keywords.length * 0.5))) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'Answer is incomplete. Include the key statistic and business interpretation.' };
  }

  if (interaction.startsWith('tableau-') || interaction.startsWith('powerbi-') || interaction === 'chart-selection' || interaction === 'spreadsheet-pivot') {
    if (config.mode === 'powerbi' || exercise.powerBiConfig?.simulatorType) {
      return validatePowerBiExercise(exercise, submission);
    }
    if (config.mode === 'tableau-viz' || exercise.tableauConfig?.mode === 'viz') {
      return validateTableauViz(exercise, submission);
    }
    if (exercise.tableauConfig?.mode === 'classify') {
      return validateTableauClassify(exercise, submission);
    }
    if (exercise.tableauConfig?.mode === 'formula') {
      return validateTableauFormula(exercise, submission);
    }
    const answer = normalizeText(submission.answer || submission.selection || JSON.stringify(submission.state || {}));
    const expected = normalizeText(exercise.expectedAnswer);
    const keywords = expected.split(/[,;]+/).map(normalizeText).filter(Boolean);
    const hits = keywords.filter((k) => answer.includes(k)).length;
    if (hits >= Math.max(1, Math.ceil(keywords.length * 0.4))) {
      return { correct: true, message: exercise.answerExplanation || exercise.explanation };
    }
    return { correct: false, message: 'Configuration does not match the expected analysis. Review field placement and chart choices.' };
  }

  const answer = normalizeText(submission.answer);
  const expected = normalizeText(config.expectedAnswer || exercise.expectedAnswer);
  const keywords = (config.keywords || expected.split(/[,;]+/)).map(normalizeText).filter(Boolean);
  const matched = keywords.filter((k) => answer.includes(k)).length;
  if (matched >= Math.max(1, Math.ceil(keywords.length * 0.5))) {
    return { correct: true, message: exercise.answerExplanation || exercise.explanation };
  }
  return { correct: false, message: 'Answer does not include the key points. Review the hint and try again.' };
}
