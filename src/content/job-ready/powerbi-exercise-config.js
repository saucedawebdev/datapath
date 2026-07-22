/**
 * Per-lesson Power BI Practice Lab configuration — simulator type, fields, validation.
 */

export const POWERBI_SIMULATOR_TYPES = [
  'desktop',
  'import-wizard',
  'query-editor',
  'model-designer',
  'star-schema',
  'dax-editor',
  'report-builder',
  'slicers-filters',
  'dashboard-builder',
  'full-workspace',
];

export const POWERBI_LESSON_CONFIG = {
  'power-bi-lesson-power-bi-desktop-interface': {
    simulatorType: 'desktop',
    datasetId: 'northstar-model',
    expected: { view: 'Model' },
    requiredFields: ['view'],
    feedback: {
      wrongView: 'Model view is where you connect tables and verify relationships for Northstar.',
    },
  },
  'power-bi-lesson-importing-data': {
    simulatorType: 'import-wizard',
    datasetId: 'northstar-model',
    expected: { sources: ['SQL Server', 'Excel'], mode: 'Import' },
    requiredFields: ['sources', 'mode'],
    feedback: {
      wrongSource: 'Import orders from SQL Server and campaigns from Excel.',
      wrongMode: 'Use Import mode for typical Northstar dataset volume.',
    },
  },
  'power-bi-lesson-power-query-data-cleaning': {
    simulatorType: 'query-editor',
    datasetId: 'northstar-products-dirty',
    expected: { steps: ['Trim', 'Replace Values', 'Change Type'] },
    requiredFields: ['steps'],
    feedback: {
      missingStep: 'Add Trim, Replace Values, and Change Type steps.',
    },
  },
  'power-bi-lesson-relationships-and-data-modeling': {
    simulatorType: 'model-designer',
    datasetId: 'northstar-model',
    expected: {
      relationships: [
        { from: 'customers', to: 'orders', key: 'customer_id' },
        { from: 'orders', to: 'order_items', key: 'order_id' },
      ],
    },
    requiredFields: ['relationships'],
  },
  'power-bi-lesson-star-schema': {
    simulatorType: 'star-schema',
    datasetId: 'northstar-model',
    expected: {
      fact: 'order_items',
      dimensions: ['customers', 'products', 'marketing_campaigns', 'Date'],
    },
    requiredFields: ['fact', 'dimensions'],
  },
  'power-bi-lesson-dax-fundamentals': {
    simulatorType: 'dax-editor',
    datasetId: 'northstar-model',
    expected: { expression: 'DIVIDE', measures: ['Total Revenue', 'Order Count'] },
    requiredFields: ['expression'],
    daxPrompt: 'Average Order Value = DIVIDE([Total Revenue], [Order Count])',
  },
  'power-bi-lesson-measures-and-calculated-columns': {
    simulatorType: 'dax-editor',
    datasetId: 'northstar-model',
    mode: 'measure-vs-column',
    expected: { choice: 'calculated column', reason: 'slicer' },
    requiredFields: ['choice'],
    daxPrompt: 'When do you need a calculated column vs a measure for order size buckets?',
  },
  'power-bi-lesson-calculate-and-filter-context': {
    simulatorType: 'dax-editor',
    datasetId: 'northstar-model',
    mode: 'calculate',
    expected: { expression: 'CALCULATE', filter: 'Shipped' },
    requiredFields: ['expression'],
    daxPrompt: 'Shipped Revenue = CALCULATE([Total Revenue], orders[status] = "Shipped")',
    showFilterContext: true,
  },
  'power-bi-lesson-visualizations-and-chart-selection': {
    simulatorType: 'report-builder',
    datasetId: 'northstar-model',
    expected: {
      visuals: [
        { type: 'Card', field: 'Total Revenue' },
        { type: 'Bar chart', field: 'Category' },
        { type: 'Line chart', field: 'Order Date' },
      ],
    },
    requiredFields: ['visualType', 'field'],
    defaults: { visualType: '', field: '', axis: '' },
  },
  'power-bi-lesson-slicers-filters-and-interactivity': {
    simulatorType: 'slicers-filters',
    datasetId: 'northstar-model',
    expected: {
      reportFilter: 'segment',
      slicer: 'Region',
      pageFilter: 'Digital',
    },
    requiredFields: ['slicer'],
  },
  'power-bi-lesson-dashboard-design-and-publishing': {
    simulatorType: 'dashboard-builder',
    datasetId: 'northstar-model',
    expected: {
      checks: ['relationships', 'refresh', 'layout'],
    },
    requiredFields: ['checks'],
  },
  'power-bi-lesson-power-bi-business-report-project': {
    simulatorType: 'full-workspace',
    datasetId: 'northstar-model',
    expected: {
      pages: ['Executive', 'Sales', 'Marketing', 'Support'],
    },
    requiredFields: ['pages'],
  },
};

export function getPowerBiLessonConfig(lessonId) {
  return POWERBI_LESSON_CONFIG[lessonId] || null;
}

export function applyPowerBiConfigToExercise(exercise) {
  const config = getPowerBiLessonConfig(exercise.lessonId);
  if (!config) return exercise;

  return {
    ...exercise,
    dataset: config.datasetId,
    powerBiConfig: config,
    simulatorType: config.simulatorType,
    starterState: {
      ...exercise.starterState,
      powerBi: config.defaults || {},
    },
    validationConfig: {
      ...exercise.validationConfig,
      mode: 'powerbi',
      simulatorType: config.simulatorType,
      powerBi: config.expected,
      requiredFields: config.requiredFields,
    },
  };
}
