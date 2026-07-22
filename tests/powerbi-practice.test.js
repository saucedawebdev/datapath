/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import contentBundle from '../src/content/index.js';
import { POWERBI_LESSON_CONFIG, POWERBI_SIMULATOR_TYPES } from '../src/content/job-ready/powerbi-exercise-config.js';
import { getPowerBiDataset } from '../src/data/powerbi-datasets.js';
import {
  renderBarChart,
  renderKpiCard,
  renderReportPreview,
  renderEmptyState,
} from '../src/features/practice/powerbi/powerbi-viz-engine.js';
import { POWERBI_SIMULATOR_RENDERERS } from '../src/features/practice/powerbi/powerbi-simulators.js';
import { renderPowerBiPractice } from '../src/features/practice/renderers/powerbi-practice.js';
import { validatePowerBiExercise } from '../src/services/powerbi-validation-service.js';

const LESSON_SIMULATOR_MAP = {
  'power-bi-lesson-power-bi-desktop-interface': 'desktop',
  'power-bi-lesson-importing-data': 'import-wizard',
  'power-bi-lesson-power-query-data-cleaning': 'query-editor',
  'power-bi-lesson-relationships-and-data-modeling': 'model-designer',
  'power-bi-lesson-star-schema': 'star-schema',
  'power-bi-lesson-dax-fundamentals': 'dax-editor',
  'power-bi-lesson-measures-and-calculated-columns': 'dax-editor',
  'power-bi-lesson-calculate-and-filter-context': 'dax-editor',
  'power-bi-lesson-visualizations-and-chart-selection': 'report-builder',
  'power-bi-lesson-slicers-filters-and-interactivity': 'slicers-filters',
  'power-bi-lesson-dashboard-design-and-publishing': 'dashboard-builder',
  'power-bi-lesson-power-bi-business-report-project': 'full-workspace',
};

describe('Power BI viz engine', () => {
  it('renders KPI card SVG', () => {
    const svg = renderKpiCard('Total Revenue', 19600);
    expect(svg).toContain('pbi-kpi-value');
    expect(svg).toContain('19,600');
  });

  it('renders bar chart with marks', () => {
    const dataset = getPowerBiDataset('northstar-model');
    const svg = renderBarChart(dataset.regionRevenue);
    expect(svg).toContain('<rect');
    expect(svg).toContain('West');
  });

  it('shows empty state when visual type missing', () => {
    const result = renderReportPreview({ visualType: '', field: '' });
    expect(result.html).toBe('');
    expect(result.emptyMessage).toMatch(/visual type/i);
  });

  it('renders bar chart preview when configured', () => {
    const result = renderReportPreview({ visualType: 'Bar chart', field: 'Category' });
    expect(result.html).toContain('pbi-bar');
    expect(result.emptyMessage).toBeNull();
  });

  it('never returns blank without empty message', () => {
    const empty = renderEmptyState('Configure the visual.');
    expect(empty).toContain('Configure the visual.');
  });
});

describe('Power BI lesson simulator mapping', () => {
  for (const [lessonId, simulatorType] of Object.entries(LESSON_SIMULATOR_MAP)) {
    it(`${lessonId} loads ${simulatorType} simulator`, () => {
      const exercise = contentBundle.exercises.find((e) => e.lessonId === lessonId && e.practiceType === 'guided');
      expect(exercise).toBeTruthy();
      expect(exercise.powerBiConfig?.simulatorType).toBe(simulatorType);
      expect(exercise.simulatorType).toBe(simulatorType);
      expect(POWERBI_SIMULATOR_RENDERERS[simulatorType]).toBeTypeOf('function');
    });
  }

  it('all 12 Power BI lessons have unique correct simulators', () => {
    const guided = contentBundle.exercises.filter((e) => e.subjectId === 'power-bi' && e.practiceType === 'guided');
    expect(guided.length).toBe(12);
    for (const ex of guided) {
      expect(POWERBI_SIMULATOR_TYPES).toContain(ex.powerBiConfig?.simulatorType);
      expect(ex.powerBiConfig?.requiredFields?.length).toBeGreaterThan(0);
    }
  });

  it('no lesson incorrectly loads generic report canvas only', () => {
    const guided = contentBundle.exercises.filter((e) => e.subjectId === 'power-bi' && e.practiceType === 'guided');
    for (const ex of guided) {
      expect(ex.powerBiConfig?.simulatorType).not.toBe('generic');
      expect(ex.powerBiConfig?.simulatorType).toBeTruthy();
    }
  });
});

describe('Power BI practice renderer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function renderLesson(lessonId) {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === lessonId && e.practiceType === 'guided');
    const toolbar = document.createElement('div');
    const wrap = renderPowerBiPractice(exercise, { onSubmit: () => {}, onDirty: () => {}, toolbarEl: toolbar });
    document.body.appendChild(wrap);
    return { wrap, toolbar, exercise };
  }

  it('Desktop Interface loads Desktop simulator', () => {
    const { wrap } = renderLesson('power-bi-lesson-power-bi-desktop-interface');
    expect(wrap.classList.contains('practice-powerbi--desktop')).toBe(true);
    expect(wrap.querySelector('.pbi-desktop-tabs')).toBeTruthy();
  });

  it('Importing Data loads Import Wizard', () => {
    const { wrap } = renderLesson('power-bi-lesson-importing-data');
    expect(wrap.classList.contains('practice-powerbi--import')).toBe(true);
    expect(wrap.querySelector('.pbi-source-list')).toBeTruthy();
  });

  it('Power Query loads Query Editor', () => {
    const { wrap } = renderLesson('power-bi-lesson-power-query-data-cleaning');
    expect(wrap.classList.contains('practice-powerbi--query')).toBe(true);
    expect(wrap.querySelector('.pbi-steps-list')).toBeTruthy();
  });

  it('Relationships loads Model Designer', () => {
    const { wrap } = renderLesson('power-bi-lesson-relationships-and-data-modeling');
    expect(wrap.classList.contains('practice-powerbi--model')).toBe(true);
  });

  it('Star Schema loads Schema Builder', () => {
    const { wrap } = renderLesson('power-bi-lesson-star-schema');
    expect(wrap.classList.contains('practice-powerbi--star')).toBe(true);
  });

  it('DAX lessons load DAX editor', () => {
    for (const lessonId of [
      'power-bi-lesson-dax-fundamentals',
      'power-bi-lesson-measures-and-calculated-columns',
      'power-bi-lesson-calculate-and-filter-context',
    ]) {
      const { wrap } = renderLesson(lessonId);
      expect(wrap.classList.contains('practice-powerbi--dax')).toBe(true);
    }
  });

  it('Visualization lesson loads Report Builder with chart preview', () => {
    const { wrap } = renderLesson('power-bi-lesson-visualizations-and-chart-selection');
    expect(wrap.classList.contains('practice-powerbi--report')).toBe(true);

    wrap.querySelector('#pbi-visual').value = 'Bar chart';
    wrap.querySelector('#pbi-field').value = 'Category';
    wrap.querySelector('#pbi-visual').dispatchEvent(new Event('change', { bubbles: true }));

    const preview = wrap.querySelector('#pbi-preview');
    expect(preview.querySelector('.pbi-bar, rect')).toBeTruthy();
    expect(preview.querySelector('.pbi-empty-state')).toBeFalsy();
  });

  it('Slicers lesson loads interactive report with preview', () => {
    const { wrap } = renderLesson('power-bi-lesson-slicers-filters-and-interactivity');
    expect(wrap.classList.contains('practice-powerbi--slicers')).toBe(true);
    wrap.querySelector('#pbi-slicer').value = 'Region';
    wrap.querySelector('#pbi-slicer').dispatchEvent(new Event('change', { bubbles: true }));
    expect(wrap.querySelector('#pbi-preview svg')).toBeTruthy();
  });

  it('Dashboard lesson loads Dashboard Builder with visuals', () => {
    const { wrap } = renderLesson('power-bi-lesson-dashboard-design-and-publishing');
    expect(wrap.classList.contains('practice-powerbi--dashboard')).toBe(true);
    expect(wrap.querySelector('.pbi-dash-tile svg')).toBeTruthy();
  });

  it('Project loads Full Workspace', () => {
    const { wrap } = renderLesson('power-bi-lesson-power-bi-business-report-project');
    expect(wrap.classList.contains('practice-powerbi--workspace')).toBe(true);
    expect(wrap.querySelector('.pbi-workspace-tabs')).toBeTruthy();
  });

  it('blank preview cannot occur when fields are set', () => {
    const { wrap } = renderLesson('power-bi-lesson-visualizations-and-chart-selection');
    wrap.querySelector('#pbi-visual').value = 'Card';
    wrap.querySelector('#pbi-field').value = 'Total Revenue';
    wrap.querySelector('#pbi-visual').dispatchEvent(new Event('change', { bubbles: true }));

    const preview = wrap.querySelector('#pbi-preview');
    expect(preview.innerHTML.trim().length).toBeGreaterThan(0);
    expect(preview.textContent).not.toBe('Report canvas preview');
  });

  it('shows informative empty state when fields missing', () => {
    const { wrap } = renderLesson('power-bi-lesson-visualizations-and-chart-selection');
    const preview = wrap.querySelector('#pbi-preview');
    expect(preview.querySelector('.pbi-empty-state')).toBeTruthy();
  });
});

describe('Power BI validation', () => {
  it('validates desktop Model view selection', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'power-bi-lesson-power-bi-desktop-interface' && e.practiceType === 'guided');
    const result = validatePowerBiExercise(exercise, { state: { view: 'Model' } });
    expect(result.correct).toBe(true);
  });

  it('validates DAX DIVIDE expression', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'power-bi-lesson-dax-fundamentals' && e.practiceType === 'guided');
    const result = validatePowerBiExercise(exercise, { state: { expression: 'Average Order Value = DIVIDE([Total Revenue], [Order Count])' } });
    expect(result.correct).toBe(true);
  });

  it('validates report builder bar chart config', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'power-bi-lesson-visualizations-and-chart-selection' && e.practiceType === 'guided');
    const result = validatePowerBiExercise(exercise, { state: { visualType: 'Bar chart', field: 'Category' } });
    expect(result.correct).toBe(true);
  });
});

describe('Power BI responsive layouts', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  function renderVizLesson(width) {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'power-bi-lesson-visualizations-and-chart-selection' && e.practiceType === 'guided');
    const toolbar = document.createElement('div');
    const wrap = renderPowerBiPractice(exercise, { onSubmit: () => {}, onDirty: () => {}, toolbarEl: toolbar });
    document.body.appendChild(wrap);
    wrap.querySelector('#pbi-visual').value = 'Line chart';
    wrap.querySelector('#pbi-field').value = 'Order Date';
    wrap.querySelector('#pbi-visual').dispatchEvent(new Event('change', { bubbles: true }));
    return wrap;
  }

  it('renders on mobile viewport without zero-height preview', () => {
    const wrap = renderVizLesson(375);
    const svg = wrap.querySelector('#pbi-preview svg');
    expect(svg).toBeTruthy();
    expect(parseInt(svg.getAttribute('height') || '0', 10)).toBeGreaterThan(0);
  });

  it('renders on iPad portrait layout', () => {
    const wrap = renderVizLesson(768);
    expect(wrap.querySelector('.practice-viz-layout')).toBeTruthy();
    expect(wrap.querySelector('#pbi-preview svg')).toBeTruthy();
  });

  it('renders on iPad landscape layout', () => {
    const wrap = renderVizLesson(1024);
    expect(wrap.querySelector('.pbi-visual-svg')).toBeTruthy();
  });
});

describe('Power BI config completeness', () => {
  it('every lesson declares simulatorType and validation rules', () => {
    for (const lessonId of Object.keys(POWERBI_LESSON_CONFIG)) {
      const config = POWERBI_LESSON_CONFIG[lessonId];
      expect(config.simulatorType).toBeTruthy();
      expect(config.requiredFields?.length).toBeGreaterThan(0);
      expect(config.expected).toBeTruthy();
    }
  });
});
