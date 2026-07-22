function normalizeText(text) {
  return String(text || '').trim().toLowerCase();
}

function includesAll(haystack, needles) {
  const lower = normalizeText(haystack);
  return needles.every((n) => lower.includes(normalizeText(n)));
}

function arraysMatchSubset(actual, expected, keyFn = (x) => x) {
  const actualSet = new Set((actual || []).map((x) => normalizeText(keyFn(x))));
  return (expected || []).every((e) => actualSet.has(normalizeText(keyFn(e))));
}

export function validatePowerBiExercise(exercise, submission) {
  const config = exercise.powerBiConfig;
  const expected = config?.expected || exercise.validationConfig?.powerBi;
  const state = submission.state || {};
  const feedback = config?.feedback || {};

  if (!config?.simulatorType || !expected) {
    return { correct: false, message: 'Exercise configuration missing Power BI simulator settings.' };
  }

  switch (config.simulatorType) {
    case 'desktop': {
      if (normalizeText(state.view) === normalizeText(expected.view)) {
        return { correct: true, message: exercise.explanation };
      }
      return { correct: false, message: feedback.wrongView || `Select ${expected.view} view for this task.` };
    }

    case 'import-wizard': {
      const sourcesOk = arraysMatchSubset(state.sources, expected.sources);
      const modeOk = normalizeText(state.mode) === normalizeText(expected.mode);
      if (sourcesOk && modeOk) return { correct: true, message: exercise.explanation };
      if (!sourcesOk) return { correct: false, message: feedback.wrongSource || 'Select SQL Server and Excel as data sources.' };
      return { correct: false, message: feedback.wrongMode || 'Use Import mode for Northstar datasets.' };
    }

    case 'query-editor': {
      const stepsOk = arraysMatchSubset(state.steps, expected.steps);
      if (stepsOk) return { correct: true, message: exercise.explanation };
      return { correct: false, message: feedback.missingStep || 'Add Trim, Replace Values, and Change Type steps.' };
    }

    case 'model-designer': {
      const rels = state.relationships || [];
      const matches = (expected.relationships || []).every((exp) =>
        rels.some((r) =>
          normalizeText(r.from) === normalizeText(exp.from)
          && normalizeText(r.to) === normalizeText(exp.to)
          && normalizeText(r.key) === normalizeText(exp.key)
        )
      );
      if (matches && rels.length >= (expected.relationships?.length || 1)) {
        return { correct: true, message: exercise.explanation };
      }
      return { correct: false, message: 'Connect customers → orders and orders → order_items with the correct keys.' };
    }

    case 'star-schema': {
      const factOk = normalizeText(state.fact) === normalizeText(expected.fact);
      const dimsOk = arraysMatchSubset(state.dimensions, expected.dimensions);
      if (factOk && dimsOk) return { correct: true, message: exercise.explanation };
      return { correct: false, message: 'Place order_items as the fact table with customers, products, marketing_campaigns, and Date as dimensions.' };
    }

    case 'dax-editor': {
      if (config.mode === 'measure-vs-column') {
        if (normalizeText(state.choice) === normalizeText(expected.choice)) {
          return { correct: true, message: exercise.explanation };
        }
        return { correct: false, message: 'Use a calculated column when you need row-level buckets for slicers.' };
      }
      const expr = normalizeText(state.expression || submission.expression);
      if (config.mode === 'calculate') {
        if (expr.includes('calculate') && expr.includes('shipped')) {
          return { correct: true, message: exercise.explanation };
        }
        return { correct: false, message: 'Use CALCULATE with a filter on orders[status] = "Shipped".' };
      }
      if (includesAll(expr, ['divide'])) {
        return { correct: true, message: exercise.explanation };
      }
      return { correct: false, message: 'Write a DAX measure using DIVIDE for Average Order Value.' };
    }

    case 'report-builder': {
      const { visualType, field } = state;
      if (!visualType || !field) {
        return { correct: false, message: 'Select a visual type and assign a field before checking.' };
      }
      const valid = (expected.visuals || []).some((v) =>
        normalizeText(visualType).includes(normalizeText(v.type).replace(' chart', ''))
        && (normalizeText(field).includes(normalizeText(v.field)) || normalizeText(v.field).includes(normalizeText(field)))
      );
      if (valid) return { correct: true, message: exercise.explanation };
      return { correct: false, message: 'Match the visual to the question: Card for KPI, Bar for categories, Line for trends.' };
    }

    case 'slicers-filters': {
      if (state.slicer) return { correct: true, message: exercise.explanation };
      return { correct: false, message: 'Add a region slicer and configure report/page filters.' };
    }

    case 'dashboard-builder': {
      if ((state.checks || []).length >= 3) return { correct: true, message: exercise.explanation };
      return { correct: false, message: 'Complete all publishing checklist items before publishing.' };
    }

    case 'full-workspace': {
      if ((state.pages || []).length >= 4) return { correct: true, message: exercise.explanation };
      return { correct: false, message: 'Include Executive, Sales, Marketing, and Support pages in the capstone report.' };
    }

    default:
      return { correct: false, message: 'Unknown Power BI simulator type.' };
  }
}

export function getExpectedPreviewState(exercise) {
  const config = exercise.powerBiConfig;
  if (!config) return null;

  switch (config.simulatorType) {
    case 'report-builder':
      return { visualType: 'Bar chart', field: 'Category' };
    case 'slicers-filters':
      return { slicer: 'Region', reportFilter: 'segment', pageFilter: false };
    case 'dashboard-builder':
      return { checks: ['relationships', 'refresh', 'layout'] };
    default:
      return null;
  }
}
