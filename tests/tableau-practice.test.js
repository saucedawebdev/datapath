/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import contentBundle from '../src/content/index.js';
import { getTableauDataset, fieldExistsInDataset } from '../src/data/tableau-datasets.js';
import {
  aggregateByDimension,
  buildChartData,
  isMinimumConfigPresent,
  renderBarChart,
  renderTableauPreview,
} from '../src/features/practice/tableau/tableau-viz-engine.js';
import { validateTableauViz } from '../src/services/tableau-validation-service.js';
import { renderTableauPractice } from '../src/features/practice/renderers/tableau-practice.js';

describe('Tableau viz engine', () => {
  const dataset = getTableauDataset('northstar-orders');

  it('aggregates revenue by region', () => {
    const points = aggregateByDimension(dataset, dataset.rows, 'Region', 'Revenue');
    expect(points.length).toBe(4);
    expect(points.some((p) => p.label === 'West' && p.value > 0)).toBe(true);
  });

  it('renders bar chart SVG with marks', () => {
    const points = aggregateByDimension(dataset, dataset.rows, 'Region', 'Revenue');
    const svg = renderBarChart(points, 'Revenue');
    expect(svg).toContain('<rect');
    expect(svg).toContain('West');
    expect(svg).toContain('role="img"');
  });

  it('returns empty message when measure missing', () => {
    const result = renderTableauPreview('northstar-orders', {
      rows: 'Region',
      columns: '',
      chartType: 'Bar',
    });
    expect(result.html).toBe('');
    expect(result.emptyMessage).toMatch(/measure/i);
  });

  it('renders preview when Region and Revenue selected', () => {
    const result = renderTableauPreview('northstar-orders', {
      rows: 'Region',
      columns: 'Revenue',
      chartType: 'Bar',
    });
    expect(result.html).toContain('tableau-bar');
    expect(result.points.length).toBe(4);
    expect(result.emptyMessage).toBeNull();
  });

  it('detects minimum config', () => {
    expect(isMinimumConfigPresent(dataset, { rows: 'Region', columns: 'Revenue', chartType: 'Bar' })).toBe(true);
    expect(isMinimumConfigPresent(dataset, { rows: 'Region', columns: '', chartType: 'Bar' })).toBe(false);
  });

  it('rejects invalid field in dataset', () => {
    expect(fieldExistsInDataset(dataset, 'Order Date')).toBe(true);
    expect(fieldExistsInDataset(dataset, 'InvalidField')).toBe(false);
  });
});

describe('Tableau exercise validation', () => {
  it('validates correct Region + Revenue + Bar configuration', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'tableau-lesson-tableau-interface' && e.practiceType === 'guided');
    expect(exercise).toBeTruthy();
    const result = validateTableauViz(exercise, {
      state: { rows: 'Region', columns: 'Revenue', chartType: 'Bar' },
    });
    expect(result.correct).toBe(true);
  });

  it('fails when measure missing with helpful message', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'tableau-lesson-tableau-interface' && e.practiceType === 'guided');
    const result = validateTableauViz(exercise, {
      state: { rows: 'Region', columns: 'Order Date', chartType: 'Bar' },
    });
    expect(result.correct).toBe(false);
    expect(result.message.toLowerCase()).toMatch(/revenue|measure/);
  });

  it('fails valid marks when wrong chart type', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'tableau-lesson-tableau-interface' && e.practiceType === 'guided');
    const result = validateTableauViz(exercise, {
      state: { rows: 'Region', columns: 'Revenue', chartType: 'Line' },
    });
    expect(result.correct).toBe(false);
    expect(result.message.toLowerCase()).toMatch(/bar/);
  });
});

describe('Tableau practice renderer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders bar marks after selecting Region and Revenue', async () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'tableau-lesson-tableau-interface' && e.practiceType === 'guided');
    const toolbar = document.createElement('div');
    let checkDisabled = true;

    const wrap = renderTableauPractice(exercise, {
      onSubmit: () => {},
      onDirty: () => {},
      toolbarEl: toolbar,
    });
    document.body.appendChild(wrap);

    wrap.querySelector('#tab-rows').value = 'Region';
    wrap.querySelector('#tab-cols').value = 'Revenue';
    wrap.querySelector('#tab-rows').dispatchEvent(new Event('change', { bubbles: true }));

    const preview = wrap.querySelector('#tab-preview');
    expect(preview.querySelector('.tableau-bar, rect')).toBeTruthy();
    expect(preview.querySelector('.tableau-empty-state')).toBeFalsy();

    const checkBtn = toolbar.querySelector('button');
    expect(checkBtn.disabled).toBe(false);

    const svg = preview.querySelector('svg');
    expect(svg.getAttribute('width')).toBeTruthy();
    expect(parseInt(svg.getAttribute('height'), 10)).toBeGreaterThan(0);
  });

  it('shows empty state when only dimension selected', () => {
    const exercise = contentBundle.exercises.find((e) => e.lessonId === 'tableau-lesson-tableau-interface' && e.practiceType === 'guided');
    const toolbar = document.createElement('div');
    const wrap = renderTableauPractice(exercise, { onSubmit: () => {}, onDirty: () => {}, toolbarEl: toolbar });
    document.body.appendChild(wrap);

    wrap.querySelector('#tab-rows').value = 'Region';
    wrap.querySelector('#tab-rows').dispatchEvent(new Event('change', { bubbles: true }));

    expect(wrap.querySelector('.tableau-empty-state')).toBeTruthy();
    expect(toolbar.querySelector('button').disabled).toBe(true);
  });
});

describe('All Tableau viz exercises configured', () => {
  const vizLessons = [
    'tableau-lesson-tableau-interface',
    'tableau-lesson-bar-and-line-charts',
    'tableau-lesson-discrete-and-continuous-fields',
    'tableau-lesson-maps-and-geographic-analysis',
    'tableau-lesson-filters-and-sorting',
  ];

  for (const lessonId of vizLessons) {
    it(`${lessonId} has dataset and expected visualization`, () => {
      const ex = contentBundle.exercises.find((e) => e.lessonId === lessonId && e.practiceType === 'guided');
      expect(ex.tableauConfig?.mode).toBe('viz');
      expect(ex.tableauConfig?.datasetId).toBeTruthy();
      expect(ex.tableauConfig?.expected?.measure).toBeTruthy();
      expect(ex.tableauConfig?.expected?.dimension).toBeTruthy();

      const state = {
        rows: ex.tableauConfig.expected.dimension,
        columns: ex.tableauConfig.expected.measure,
        chartType: ex.tableauConfig.expected.chartType,
        filter: ex.tableauConfig.expected.filter || '',
        filterValue: ex.tableauConfig.expected.filterValue || '',
      };
      if (state.rows === ex.tableauConfig.expected.measure) {
        state.rows = ex.tableauConfig.expected.measure;
        state.columns = ex.tableauConfig.expected.dimension;
      }

      const preview = renderTableauPreview(ex.tableauConfig.datasetId, {
        rows: ex.tableauConfig.expected.dimension,
        columns: ex.tableauConfig.expected.measure,
        chartType: ex.tableauConfig.expected.chartType,
        filter: ex.tableauConfig.expected.filter || '',
        filterValue: ex.tableauConfig.expected.filterValue || '',
      });
      expect(preview.html.length).toBeGreaterThan(0);
      expect(preview.points?.length).toBeGreaterThan(0);
    });
  }
});
