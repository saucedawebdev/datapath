import { renderSqlPractice } from './sql-practice.js';
import { renderConceptualPractice } from './conceptual-practice.js';
import { renderExcelPractice } from './excel-practice.js';
import { renderTableauPractice } from './tableau-practice.js';
import { renderPowerBiPractice } from './powerbi-practice.js';
import { renderPythonPractice } from './python-practice.js';
import { renderStatisticsPractice } from './statistics-practice.js';

const RENDERERS = {
  'sql-query': renderSqlPractice,
  'conceptual-response': renderConceptualPractice,
  'matching': renderConceptualPractice,
  'ordering': renderConceptualPractice,
  'multiple-choice': renderConceptualPractice,
  'spreadsheet-formula': renderExcelPractice,
  'spreadsheet-cleaning': renderExcelPractice,
  'spreadsheet-pivot': renderExcelPractice,
  'chart-selection': renderExcelPractice,
  'tableau-field-builder': renderTableauPractice,
  'tableau-chart-builder': renderTableauPractice,
  'tableau-dashboard-layout': renderTableauPractice,
  'powerbi-model-builder': renderPowerBiPractice,
  'dax-expression': renderPowerBiPractice,
  'powerbi-report-builder': renderPowerBiPractice,
  'python-code': renderPythonPractice,
  'dataframe-operation': renderPythonPractice,
  'statistics-calculation': renderStatisticsPractice,
  'statistics-interpretation': renderStatisticsPractice,
  'statistics-experiment': renderStatisticsPractice,
};

export function renderPracticeInterface(exercise, context) {
  const renderer = RENDERERS[exercise.interactionType] || renderConceptualPractice;
  return renderer(exercise, context);
}

export function isSqlInteraction(interactionType) {
  return interactionType === 'sql-query';
}
