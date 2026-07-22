import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';
import { getTableauDataset, fieldExistsInDataset } from '../../../data/tableau-datasets.js';
import {
  isMinimumConfigPresent,
  renderTableauPreview,
} from '../tableau/tableau-viz-engine.js';
import { renderConceptualPractice } from './conceptual-practice.js';

export function renderTableauPractice(exercise, context) {
  const config = exercise.tableauConfig;
  if (!config || config.mode === 'conceptual') {
    return renderConceptualPractice(exercise, context);
  }
  if (config.mode === 'classify') return renderClassifyMode(exercise, context);
  if (config.mode === 'formula') return renderFormulaMode(exercise, context);
  if (config.mode === 'dashboard') return renderDashboardMode(exercise, context);
  return renderVizMode(exercise, context);
}

function renderVizMode(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.tableauConfig;
  const dataset = getTableauDataset(config.datasetId);
  const defaults = config.defaults || {};

  const state = {
    rows: defaults.rows || '',
    columns: defaults.columns || '',
    filter: defaults.filter || '',
    filterValue: defaults.filterValue || '',
    chartType: defaults.chartType || config.chartTypes?.[0] || 'Bar',
  };

  const wrap = document.createElement('div');
  wrap.className = 'practice-tableau';

  wrap.innerHTML = `
    <p class="text-sm text-muted">Visual analysis simulator — not Tableau Desktop. Dataset: <strong>${escapeHtml(dataset.name)}</strong></p>
    <div class="practice-viz-layout">
      <aside class="practice-viz-panel" aria-label="Field list">
        <h3 class="text-sm">Fields</h3>
        <section><strong>Dimensions</strong><ul class="tableau-field-list">${dataset.dimensions.map((d) => `<li>${escapeHtml(d.id)}</li>`).join('')}</ul></section>
        <section><strong>Measures</strong><ul class="tableau-field-list">${dataset.measures.map((m) => `<li>${escapeHtml(m.id)}</li>`).join('')}</ul></section>
      </aside>
      <div class="practice-viz-workspace">
        <div class="practice-viz-shelves" role="group" aria-label="Tableau shelves"></div>
        <div class="practice-viz-preview-wrap">
          <div class="practice-viz-preview practice-viz-preview--empty" id="tab-preview" aria-live="polite"></div>
          <div class="tableau-chart-legend" id="tab-legend"></div>
        </div>
      </div>
    </div>
  `;

  const shelvesEl = wrap.querySelector('.practice-viz-shelves');
  shelvesEl.appendChild(buildShelfSelect('Rows', 'tab-rows', config.rowOptions || dimensionAndMeasureOptions(dataset), state.rows));
  shelvesEl.appendChild(buildShelfSelect('Columns', 'tab-cols', config.columnOptions || dimensionAndMeasureOptions(dataset), state.columns));
  shelvesEl.appendChild(buildShelfSelect('Filters', 'tab-filter', config.filterOptions || [''].concat(dataset.dimensions.map((d) => d.id)), state.filter));
  if (config.filterValues) {
    shelvesEl.appendChild(buildFilterValueSelect(state.filter, config, state.filterValue));
  }
  shelvesEl.appendChild(buildShelfSelect('Chart', 'tab-chart', config.chartTypes || ['Bar'], state.chartType, false));

  const previewEl = wrap.querySelector('#tab-preview');
  const legendEl = wrap.querySelector('#tab-legend');

  const checkBtn = createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'primary',
    disabled: true,
    onClick: () => onSubmit?.({ state: { ...state }, answer: shelfSummary(state) }),
  });
  toolbarEl.appendChild(checkBtn);

  function refresh() {
    validateShelfFields(dataset, state);
    updateFilterValueOptions(wrap, config, state);
    const ready = isMinimumConfigPresent(dataset, state);
    checkBtn.disabled = !ready;

    const result = renderTableauPreview(config.datasetId, state);
    previewEl.classList.toggle('practice-viz-preview--empty', !result.html);
    if (result.html) {
      previewEl.innerHTML = result.html;
      legendEl.textContent = `${state.chartType} chart · ${result.measureId || 'Measure'} by ${result.points.map((p) => p.label).join(', ')}`;
    } else {
      previewEl.innerHTML = `<div class="tableau-empty-state"><p>${escapeHtml(result.emptyMessage || 'Select fields to build the view.')}</p></div>`;
      legendEl.textContent = '';
    }
    onDirty?.(ready);
  }

  wrap.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', () => {
      state.rows = wrap.querySelector('#tab-rows')?.value || '';
      state.columns = wrap.querySelector('#tab-cols')?.value || '';
      state.filter = wrap.querySelector('#tab-filter')?.value || '';
      state.filterValue = wrap.querySelector('#tab-filter-value')?.value || '';
      state.chartType = wrap.querySelector('#tab-chart')?.value || 'Bar';
      refresh();
    });
  });

  refresh();
  return wrap;
}

function dimensionAndMeasureOptions(dataset) {
  return ['', ...dataset.dimensions.map((d) => d.id), ...dataset.measures.map((m) => m.id)];
}

function buildShelfSelect(label, id, options, value, allowEmpty = true) {
  const labelEl = document.createElement('label');
  labelEl.className = 'tableau-shelf-label';
  labelEl.textContent = label;
  const select = document.createElement('select');
  select.id = id;
  select.className = 'form-select';
  select.setAttribute('aria-label', `${label} shelf`);
  const opts = allowEmpty ? options : options.filter(Boolean);
  for (const opt of opts) {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt || '—';
    if (opt === value) o.selected = true;
    select.appendChild(o);
  }
  labelEl.appendChild(select);
  return labelEl;
}

function buildFilterValueSelect(filterField, config, value) {
  const labelEl = document.createElement('label');
  labelEl.className = 'tableau-shelf-label';
  labelEl.textContent = 'Filter value';
  const select = document.createElement('select');
  select.id = 'tab-filter-value';
  select.className = 'form-select';
  const values = config.filterValues?.[filterField] || [];
  for (const v of ['', ...values]) {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v || '—';
    if (v === value) o.selected = true;
    select.appendChild(o);
  }
  labelEl.appendChild(select);
  return labelEl;
}

function updateFilterValueOptions(wrap, config, state) {
  const existing = wrap.querySelector('#tab-filter-value');
  if (!config.filterValues || !state.filter) return;
  if (!existing) {
    wrap.querySelector('.practice-viz-shelves')?.appendChild(buildFilterValueSelect(state.filter, config, state.filterValue));
  }
}

function validateShelfFields(dataset, state) {
  for (const field of [state.rows, state.columns, state.filter]) {
    if (field && !fieldExistsInDataset(dataset, field)) {
      throw new Error(`Field "${field}" does not exist in dataset ${dataset.id}`);
    }
  }
}

function shelfSummary(state) {
  return [state.rows, state.columns, state.chartType, state.filter, state.filterValue].filter(Boolean).join(', ');
}

function renderClassifyMode(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.tableauConfig;
  const wrap = document.createElement('div');
  wrap.className = 'practice-tableau-classify';
  wrap.innerHTML = '<p class="text-sm text-muted">Classify each field as a dimension or measure.</p>';

  const selections = {};
  const checkBtn = createButton({
    label: 'Check Analysis',
    variant: 'primary',
    disabled: true,
    onClick: () => onSubmit?.({ answer: JSON.stringify(selections), state: selections }),
  });

  for (const field of config.fields) {
    const row = document.createElement('div');
    row.className = 'tableau-classify-row';
    row.innerHTML = `<strong>${escapeHtml(field.label)}</strong>`;
    const select = document.createElement('select');
    select.className = 'form-select';
    select.dataset.fieldId = field.id;
    ['', 'dimension', 'measure'].forEach((v) => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = v || '—';
      select.appendChild(o);
    });
    select.addEventListener('change', () => {
      selections[field.id] = select.value;
      onDirty?.();
      checkBtn.disabled = config.fields.some((f) => !selections[f.id]);
    });
    row.appendChild(select);
    wrap.appendChild(row);
  }

  toolbarEl.appendChild(checkBtn);
  return wrap;
}

function renderFormulaMode(exercise, { onSubmit, onDirty, toolbarEl }) {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <label class="form-label" for="tableau-formula">Calculated field</label>
    <textarea id="tableau-formula" class="form-textarea code-input" rows="4" placeholder="${escapeHtml(exercise.tableauConfig?.prompt || '')}"></textarea>
  `;
  const input = wrap.querySelector('#tableau-formula');
  input?.addEventListener('input', () => onDirty?.());
  toolbarEl.appendChild(createButton({
    label: 'Check Analysis',
    variant: 'primary',
    onClick: () => onSubmit?.({ answer: input?.value || '' }),
  }));
  return wrap;
}

function renderDashboardMode(exercise, { onSubmit, onDirty, toolbarEl }) {
  return renderConceptualPractice(exercise, { onSubmit, onDirty, toolbarEl });
}

export function showTableauFeedback(feedbackEl, validation, exercise) {
  feedbackEl.innerHTML = `
    <p class="sql-status ${validation.correct ? 'sql-status--success' : 'sql-status--error'}">
      ${validation.correct ? '✓ Visualization accepted' : escapeHtml(validation.message)}
    </p>
    ${validation.correct ? `<div class="answer-explanation"><p>${escapeHtml(exercise.answerExplanation || exercise.explanation)}</p><p class="text-sm text-muted">In Tableau Desktop: ${escapeHtml(exercise.expectedAnswer)}</p></div>` : ''}
    ${validation.hint ? `<p class="text-secondary">${escapeHtml(validation.hint)}</p>` : ''}
  `;
}
