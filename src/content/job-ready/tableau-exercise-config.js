/**
 * Per-lesson Tableau Practice Lab configuration — datasets, shelves, and validation targets.
 */

const ORDERS = 'northstar-orders';
const MARKETING = 'northstar-marketing';

export const TABLEAU_LESSON_CONFIG = {
  'tableau-lesson-tableau-interface': {
    mode: 'viz',
    datasetId: ORDERS,
    chartTypes: ['Bar', 'Line'],
    rowOptions: ['', 'Region', 'Category', 'Channel'],
    columnOptions: ['', 'Region', 'Category', 'Order Date', 'Revenue', 'Orders', 'Profit'],
    filterOptions: ['', 'Region', 'Category', 'Channel'],
    defaults: { rows: '', columns: '', filter: '', filterValue: '', chartType: 'Bar' },
    expected: {
      dimension: 'Region',
      measure: 'Revenue',
      chartType: 'Bar',
    },
    feedback: {
      missingMeasure: 'Add the Revenue measure to Rows or Columns.',
      missingDimension: 'Add Region to Rows or Columns to compare regions.',
      wrongMeasure: 'Use Revenue — the exercise asks you to compare revenue across regions.',
      wrongDimension: 'Use Region as the dimension for this comparison.',
      wrongChart: 'Choose Bar to compare revenue across discrete regions.',
    },
  },
  'tableau-lesson-bar-and-line-charts': {
    mode: 'viz',
    datasetId: ORDERS,
    chartTypes: ['Bar', 'Line'],
    rowOptions: ['', 'Channel', 'Region', 'Category', 'Revenue', 'Orders'],
    columnOptions: ['', 'Order Date', 'Channel', 'Region', 'Revenue', 'Orders'],
    filterOptions: ['', 'Region', 'Channel'],
    defaults: { rows: 'Channel', columns: 'Revenue', filter: '', chartType: 'Bar' },
    expected: {
      dimension: 'Channel',
      measure: 'Revenue',
      chartType: 'Bar',
    },
    feedback: {
      wrongChart: 'Use a bar chart to compare channels for a single period.',
      wrongDimension: 'Place Channel on a shelf to compare channel performance.',
      wrongMeasure: 'Use Revenue to quantify channel results.',
    },
  },
  'tableau-lesson-discrete-and-continuous-fields': {
    mode: 'viz',
    datasetId: ORDERS,
    chartTypes: ['Bar', 'Line'],
    rowOptions: ['', 'Revenue', 'Orders', 'Profit'],
    columnOptions: ['', 'Order Date', 'Region', 'Category'],
    filterOptions: ['', 'Region'],
    defaults: { rows: 'Revenue', columns: 'Order Date', filter: '', chartType: 'Line' },
    expected: {
      dimension: 'Order Date',
      measure: 'Revenue',
      chartType: 'Line',
    },
    feedback: {
      wrongChart: 'Use a line chart to show a continuous trend over time.',
      wrongDimension: 'Use Order Date on Columns for the time trend.',
      wrongMeasure: 'Use Revenue as the measure to trend over time.',
    },
  },
  'tableau-lesson-maps-and-geographic-analysis': {
    mode: 'viz',
    datasetId: ORDERS,
    chartTypes: ['Map', 'Bar'],
    rowOptions: ['', 'Region', 'Revenue'],
    columnOptions: ['', 'Region', 'Revenue', 'Orders'],
    filterOptions: ['', 'Region'],
    defaults: { rows: 'Region', columns: 'Revenue', filter: '', chartType: 'Map' },
    expected: {
      dimension: 'Region',
      measure: 'Revenue',
      chartType: 'Map',
    },
    feedback: {
      wrongChart: 'Use Map to show geographic revenue patterns by region.',
      wrongDimension: 'Assign Region as the geographic dimension.',
      wrongMeasure: 'Use Revenue as the measure on the map.',
    },
  },
  'tableau-lesson-filters-and-sorting': {
    mode: 'viz',
    datasetId: ORDERS,
    chartTypes: ['Bar'],
    rowOptions: ['', 'Category', 'Region', 'Revenue'],
    columnOptions: ['', 'Revenue', 'Category', 'Region'],
    filterOptions: ['', 'Region'],
    filterValues: { Region: ['Northeast', 'West', 'Midwest', 'South'] },
    defaults: { rows: 'Category', columns: 'Revenue', filter: 'Region', filterValue: 'Northeast', chartType: 'Bar' },
    expected: {
      dimension: 'Category',
      measure: 'Revenue',
      chartType: 'Bar',
      filter: 'Region',
      filterValue: 'Northeast',
    },
    feedback: {
      wrongDimension: 'Use Category on a shelf to rank product categories.',
      wrongMeasure: 'Use Revenue to rank categories.',
      wrongFilter: 'Filter to Northeast region as described in the exercise.',
    },
  },
  'tableau-lesson-dimensions-and-measures': {
    mode: 'classify',
    datasetId: MARKETING,
    fields: [
      { id: 'campaign_name', label: 'campaign_name', answer: 'dimension' },
      { id: 'spend', label: 'spend', answer: 'measure' },
    ],
    expected: { campaign_name: 'dimension', spend: 'measure' },
  },
  'tableau-lesson-calculated-fields': {
    mode: 'formula',
    datasetId: ORDERS,
    prompt: 'Margin = SUM(Profit) / SUM(Revenue)',
    expectedKeywords: ['sum', 'profit', 'revenue', 'margin'],
  },
  'tableau-lesson-connecting-to-data': { mode: 'conceptual' },
  'tableau-lesson-parameters': { mode: 'conceptual' },
  'tableau-lesson-building-interactive-dashboards': { mode: 'dashboard' },
  'tableau-lesson-data-storytelling-and-visualization-best-practices': { mode: 'conceptual' },
  'tableau-lesson-tableau-portfolio-dashboard-project': { mode: 'dashboard' },
};

export function getTableauLessonConfig(lessonId) {
  return TABLEAU_LESSON_CONFIG[lessonId] || null;
}

export function applyTableauConfigToExercise(exercise) {
  const config = getTableauLessonConfig(exercise.lessonId);
  if (!config) return exercise;

  return {
    ...exercise,
    dataset: config.datasetId || exercise.dataset,
    tableauConfig: config,
    starterState: {
      ...exercise.starterState,
      tableau: config.defaults || {},
    },
    validationConfig: {
      ...exercise.validationConfig,
      mode: config.mode === 'viz' ? 'tableau-viz' : config.mode,
      tableau: config.expected || null,
      fields: config.fields || null,
      expectedKeywords: config.expectedKeywords || null,
    },
  };
}
