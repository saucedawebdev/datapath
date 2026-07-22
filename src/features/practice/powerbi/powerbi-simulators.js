import { createButton } from '../../../components/ui.js';
import { escapeHtml } from '../../../utilities/sanitize.js';
import { getCheckButtonLabel } from '../../../services/practice-service.js';
import { getPowerBiDataset } from '../../../data/powerbi-datasets.js';
import {
  renderReportPreview,
  renderSlicersPreview,
  renderEmptyState,
  renderKpiCard,
  renderBarChart,
  renderLineChart,
} from '../powerbi/powerbi-viz-engine.js';

const DESKTOP_VIEWS = {
  Report: {
    title: 'Report view',
    use: 'Design visuals, slicers, and page layout for stakeholders.',
    workflow: 'Build charts after the model is ready; this is what executives see.',
  },
  Data: {
    title: 'Data view',
    use: 'Inspect row values, spot nulls, and verify column types.',
    workflow: 'Validate imported tables before writing DAX or building visuals.',
  },
  Model: {
    title: 'Model view',
    use: 'Connect tables, set cardinality, and review star schema layout.',
    workflow: 'Define relationships so filters flow correctly from dimensions to facts.',
  },
};

const IMPORT_SOURCES = ['SQL Server', 'Excel', 'CSV', 'Folder', 'Web'];

const QUERY_STEPS = [
  'Remove Duplicates',
  'Rename Columns',
  'Change Type',
  'Split Column',
  'Trim',
  'Replace Values',
];

export function isPowerBiConfigReady(config, state) {
  if (!config?.requiredFields?.length) return true;
  return config.requiredFields.every((field) => {
    const val = state[field];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object' && val !== null) return Object.keys(val).length > 0;
    return Boolean(val);
  });
}

function buildPreviewEl(id = 'pbi-preview') {
  const el = document.createElement('div');
  el.id = id;
  el.className = 'practice-viz-preview practice-viz-preview--empty';
  el.setAttribute('aria-live', 'polite');
  return el;
}

function attachCheckButton(toolbarEl, exercise, getState, isReady, onSubmit) {
  const btn = createButton({
    label: getCheckButtonLabel(exercise),
    variant: 'primary',
    disabled: true,
    onClick: () => onSubmit?.({ state: getState(), answer: JSON.stringify(getState()) }),
  });
  toolbarEl.appendChild(btn);
  return btn;
}

export function renderDesktopSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const state = { view: '' };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--desktop';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Power BI Desktop simulator — select a view to learn when analysts use it.</p>
    <div class="pbi-desktop-tabs" role="tablist" aria-label="Power BI Desktop views">
      ${Object.keys(DESKTOP_VIEWS).map((v) => `<button type="button" class="pbi-tab" data-view="${v}" role="tab">${v} view</button>`).join('')}
    </div>
    <div class="pbi-desktop-detail" id="pbi-desktop-detail"></div>
    <div class="pbi-desktop-canvas" id="pbi-desktop-canvas"></div>
  `;

  const detailEl = wrap.querySelector('#pbi-desktop-detail');
  const canvasEl = wrap.querySelector('#pbi-desktop-canvas');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => isPowerBiConfigReady(config, state), onSubmit);

  function refresh() {
    wrap.querySelectorAll('.pbi-tab').forEach((tab) => {
      tab.classList.toggle('pbi-tab--active', tab.dataset.view === state.view);
      tab.setAttribute('aria-selected', tab.dataset.view === state.view ? 'true' : 'false');
    });

    if (state.view) {
      const info = DESKTOP_VIEWS[state.view];
      detailEl.innerHTML = `
        <h3>${escapeHtml(info.title)}</h3>
        <p><strong>What it is:</strong> ${escapeHtml(info.title)} in Power BI Desktop.</p>
        <p><strong>When analysts use it:</strong> ${escapeHtml(info.use)}</p>
        <p><strong>Typical workflow:</strong> ${escapeHtml(info.workflow)}</p>
      `;
      if (state.view === 'Report') {
        canvasEl.innerHTML = renderKpiCard('Total Revenue', 19600, 280, 120);
      } else if (state.view === 'Data') {
        const ds = getPowerBiDataset(config.datasetId);
        canvasEl.innerHTML = `<table class="pbi-data-table"><thead><tr>${ds.tables.orders.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead><tbody>${ds.tables.orders.rows.slice(0, 3).map((r) => `<tr>${ds.tables.orders.columns.map((c) => `<td>${escapeHtml(String(r[c]))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      } else {
        canvasEl.innerHTML = `<div class="pbi-model-diagram"><span class="pbi-table-node">customers</span><span class="pbi-rel-line">──</span><span class="pbi-table-node">orders</span><span class="pbi-rel-line">──</span><span class="pbi-table-node">order_items</span></div>`;
      }
    } else {
      detailEl.innerHTML = renderEmptyState('Click Report, Data, or Model view to explore the Northstar workspace.');
      canvasEl.innerHTML = '';
    }

    checkBtn.disabled = !isPowerBiConfigReady(config, state);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('.pbi-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.view = tab.dataset.view;
      refresh();
    });
  });

  refresh();
  return wrap;
}

export function renderImportWizardSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const state = { sources: [], mode: '' };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--import';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Get Data wizard — choose sources and connection mode for Northstar.</p>
    <div class="practice-viz-layout">
      <aside class="practice-viz-panel">
        <h3>Data sources</h3>
        <ul class="pbi-source-list">${IMPORT_SOURCES.map((s) => `<li><label><input type="checkbox" value="${escapeHtml(s)}" /> ${escapeHtml(s)}</label></li>`).join('')}</ul>
        <h3>Connection mode</h3>
        <label><input type="radio" name="pbi-mode" value="Import" /> Import</label>
        <label><input type="radio" name="pbi-mode" value="DirectQuery" /> DirectQuery</label>
        <p class="text-sm text-muted">Import loads into the model; DirectQuery queries the source live.</p>
      </aside>
      <div class="practice-viz-workspace">
        <h3>Import sequence preview</h3>
      </div>
    </div>
  `;

  const previewEl = buildPreviewEl();
  wrap.querySelector('.practice-viz-workspace').appendChild(previewEl);
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => isPowerBiConfigReady(config, state), onSubmit);

  function refresh() {
    state.sources = [...wrap.querySelectorAll('.pbi-source-list input:checked')].map((el) => el.value);
    state.mode = wrap.querySelector('input[name="pbi-mode"]:checked')?.value || '';

    if (!state.sources.length && !state.mode) {
      previewEl.classList.add('practice-viz-preview--empty');
      previewEl.innerHTML = renderEmptyState('Select data sources and a connection mode to preview the import workflow.');
    } else {
      previewEl.classList.remove('practice-viz-preview--empty');
      previewEl.innerHTML = `
        <ol class="pbi-import-sequence">
          ${state.sources.map((s, i) => `<li>Get Data → ${escapeHtml(s)} → ${state.mode || '…'} → Load</li>`).join('')}
        </ol>
        ${state.mode ? `<p class="text-sm">Mode: <strong>${escapeHtml(state.mode)}</strong> — ${state.mode === 'Import' ? 'recommended for Northstar volume' : 'live queries for very large sources'}</p>` : ''}
      `;
    }

    checkBtn.disabled = !isPowerBiConfigReady(config, state);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('input').forEach((el) => el.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderQueryEditorSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const state = { steps: [] };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--query';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Power Query editor — add transformation steps for ${escapeHtml(dataset.name)}.</p>
    <div class="practice-viz-layout">
      <aside class="practice-viz-panel">
        <h3>Applied Steps</h3>
        <ol id="pbi-steps-list" class="pbi-steps-list"></ol>
        <label>Add step
          <select id="pbi-step-add" class="form-select">
            <option value="">Choose…</option>
            ${QUERY_STEPS.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('')}
          </select>
        </label>
      </aside>
      <div class="practice-viz-workspace">
        <h3>Preview</h3>
      </div>
    </div>
  `;

  const previewEl = buildPreviewEl();
  wrap.querySelector('.practice-viz-workspace').appendChild(previewEl);
  const stepsList = wrap.querySelector('#pbi-steps-list');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => isPowerBiConfigReady(config, state), onSubmit);

  function applyStepsToPreview() {
    let rows = dataset.rows.map((r) => ({ ...r }));
    if (state.steps.includes('Remove Duplicates')) {
      const seen = new Set();
      rows = rows.filter((r) => {
        const key = JSON.stringify(r);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    if (state.steps.includes('Trim')) {
      rows = rows.map((r) => ({ ...r, category: String(r.category).trim() }));
    }
    if (state.steps.includes('Replace Values')) {
      rows = rows.map((r) => ({ ...r, region: String(r.region).replace(/west/i, 'West').replace(/midwest/i, 'Midwest') }));
    }
    if (state.steps.includes('Change Type')) {
      rows = rows.map((r) => ({ ...r, list_price: parseFloat(r.list_price) }));
    }
    return rows;
  }

  function refresh() {
    stepsList.innerHTML = state.steps.map((s, i) => `<li>${i + 1}. ${escapeHtml(s)}</li>`).join('') || '<li class="text-muted">No steps yet</li>';

    if (!state.steps.length) {
      previewEl.classList.add('practice-viz-preview--empty');
      previewEl.innerHTML = renderEmptyState('Add transformation steps to preview cleaned data.');
    } else {
      const rows = applyStepsToPreview();
      previewEl.classList.remove('practice-viz-preview--empty');
      previewEl.innerHTML = `<table class="pbi-data-table"><thead><tr>${dataset.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${dataset.columns.map((c) => `<td>${escapeHtml(String(r[c]))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    }

    checkBtn.disabled = !isPowerBiConfigReady(config, state);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelector('#pbi-step-add').addEventListener('change', (e) => {
    const step = e.target.value;
    if (step && !state.steps.includes(step)) {
      state.steps.push(step);
      e.target.value = '';
      refresh();
    }
  });

  refresh();
  return wrap;
}

export function renderModelDesignerSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const state = { relationships: [] };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--model';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Model view — connect Northstar tables with relationships.</p>
    <div class="pbi-model-toolbar">
      <label>From <select id="pbi-rel-from" class="form-select">${Object.keys(dataset.tables).map((t) => `<option value="${t}">${t}</option>`).join('')}</select></label>
      <label>To <select id="pbi-rel-to" class="form-select">${Object.keys(dataset.tables).map((t) => `<option value="${t}">${t}</option>`).join('')}</select></label>
      <label>Key <select id="pbi-rel-key" class="form-select"><option value="customer_id">customer_id</option><option value="order_id">order_id</option><option value="product_id">product_id</option></select></label>
      <label>Cardinality <select id="pbi-rel-card" class="form-select"><option value="1:*">1:*</option><option value="*:1">*:1</option></select></label>
      <label>Cross-filter <select id="pbi-rel-filter" class="form-select"><option value="Single">Single</option><option value="Both">Both</option></select></label>
      <button type="button" class="btn btn-secondary" id="pbi-add-rel">Add relationship</button>
    </div>
    <div class="pbi-model-canvas" id="pbi-model-canvas"></div>
  `;

  const canvasEl = wrap.querySelector('#pbi-model-canvas');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => isPowerBiConfigReady(config, state), onSubmit);

  function refresh() {
    if (!state.relationships.length) {
      canvasEl.innerHTML = renderEmptyState('Add relationships between fact and dimension tables.');
    } else {
      canvasEl.innerHTML = state.relationships.map((r) =>
        `<div class="pbi-relationship-row"><span>${escapeHtml(r.from)}</span> <span class="pbi-rel-line">──${escapeHtml(r.key)}──</span> <span>${escapeHtml(r.to)}</span> <span class="text-sm text-muted">${escapeHtml(r.cardinality)} · ${escapeHtml(r.crossFilter)}</span></div>`
      ).join('');
    }
    checkBtn.disabled = !isPowerBiConfigReady(config, state);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelector('#pbi-add-rel').addEventListener('click', () => {
    const rel = {
      from: wrap.querySelector('#pbi-rel-from').value,
      to: wrap.querySelector('#pbi-rel-to').value,
      key: wrap.querySelector('#pbi-rel-key').value,
      cardinality: wrap.querySelector('#pbi-rel-card').value,
      crossFilter: wrap.querySelector('#pbi-rel-filter').value,
    };
    if (rel.from !== rel.to) state.relationships.push(rel);
    refresh();
  });

  refresh();
  return wrap;
}

export function renderStarSchemaSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const dims = Object.entries(dataset.tables).filter(([, t]) => t.type === 'dimension').map(([k]) => k);
  const facts = Object.entries(dataset.tables).filter(([, t]) => t.type === 'fact').map(([k]) => k);
  const state = { fact: '', dimensions: [] };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--star';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Star schema builder — place the fact table and dimension tables.</p>
    <label>Fact table <select id="pbi-fact" class="form-select"><option value="">Choose…</option>${facts.map((f) => `<option value="${f}">${f}</option>`).join('')}</select></label>
    <fieldset><legend>Dimension tables</legend>${dims.map((d) => `<label><input type="checkbox" value="${d}" /> ${d}</label>`).join(' ')}</fieldset>
    <div class="pbi-star-canvas" id="pbi-star-canvas"></div>
  `;

  const canvasEl = wrap.querySelector('#pbi-star-canvas');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => isPowerBiConfigReady(config, state), onSubmit);

  function refresh() {
    state.fact = wrap.querySelector('#pbi-fact').value;
    state.dimensions = [...wrap.querySelectorAll('fieldset input:checked')].map((el) => el.value);

    if (!state.fact) {
      canvasEl.innerHTML = renderEmptyState('Select a fact table and dimension tables to build the star schema.');
    } else {
      canvasEl.innerHTML = `
        <div class="pbi-star-layout">
          ${state.dimensions.map((d) => `<div class="pbi-star-dim">${escapeHtml(d)}</div>`).join('')}
          <div class="pbi-star-fact">${escapeHtml(state.fact)}</div>
        </div>
      `;
    }
    checkBtn.disabled = !isPowerBiConfigReady(config, state);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('select, input').forEach((el) => el.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderDaxEditorSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const state = { expression: '', choice: '' };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--dax';

  if (config.mode === 'measure-vs-column') {
    wrap.innerHTML = `
      <p class="text-sm text-muted">${escapeHtml(config.daxPrompt || '')}</p>
      <label><input type="radio" name="pbi-dax-choice" value="measure" /> Measure</label>
      <label><input type="radio" name="pbi-dax-choice" value="calculated column" /> Calculated column</label>
      <textarea id="pbi-dax-input" class="form-textarea code-input pbi-dax-input" rows="4" placeholder="Explain your choice…"></textarea>
      <div id="pbi-dax-result" class="pbi-dax-result"></div>
    `;
  } else {
    wrap.innerHTML = `
      <p class="text-sm text-muted">DAX editor — ${escapeHtml(config.daxPrompt || 'Write your measure.')}</p>
      <textarea id="pbi-dax-input" class="form-textarea code-input pbi-dax-input" rows="5" placeholder="Shipped Revenue = CALCULATE([Total Revenue], orders[status] = &quot;Shipped&quot;)"></textarea>
      <div class="pbi-dax-context text-sm text-muted">Model: ${Object.keys(dataset.tables).join(', ')} · Measures: ${Object.keys(dataset.measures).join(', ')}</div>
      <div id="pbi-dax-result" class="pbi-dax-result"></div>
      ${config.showFilterContext ? '<div id="pbi-filter-context" class="pbi-filter-context"></div>' : ''}
    `;
  }

  const input = wrap.querySelector('#pbi-dax-input');
  const resultEl = wrap.querySelector('#pbi-dax-result');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => {
    if (config.mode === 'measure-vs-column') {
      state.choice = wrap.querySelector('input[name="pbi-dax-choice"]:checked')?.value || '';
    }
    state.expression = input?.value || '';
    return state;
  }, () => {
    if (config.mode === 'measure-vs-column') {
      return Boolean(wrap.querySelector('input[name="pbi-dax-choice"]:checked'));
    }
    return Boolean(state.expression.trim());
  }, onSubmit);

  function evaluateDax(expr) {
    const lower = expr.toLowerCase();
    if (lower.includes('divide')) return { value: 3920, error: null };
    if (lower.includes('calculate') && lower.includes('shipped')) return { value: 16800, error: null, before: 19600, after: 16800 };
    if (lower.includes('sum')) return { value: 19600, error: null };
    if (!expr.trim()) return { value: null, error: null };
    return { value: null, error: 'Syntax error: check function names and table references.' };
  }

  function refresh() {
    state.expression = input?.value || '';
    if (config.mode === 'measure-vs-column') {
      state.choice = wrap.querySelector('input[name="pbi-dax-choice"]:checked')?.value || '';
      resultEl.innerHTML = state.choice ? `<p>Selected: <strong>${escapeHtml(state.choice)}</strong></p>` : renderEmptyState('Choose measure or calculated column.');
    } else {
      const result = evaluateDax(state.expression);
      if (result.error) {
        resultEl.innerHTML = `<p class="pbi-dax-error">${escapeHtml(result.error)}</p>`;
      } else if (result.value != null) {
        resultEl.innerHTML = `<p class="pbi-dax-success">Measure result: <strong>${result.value.toLocaleString()}</strong></p>`;
      } else {
        resultEl.innerHTML = renderEmptyState('Enter a DAX expression to evaluate.');
      }
      if (config.showFilterContext) {
        const ctxEl = wrap.querySelector('#pbi-filter-context');
        if (result.before != null) {
          ctxEl.innerHTML = `<p>Filter context: Total Revenue ${result.before.toLocaleString()} → Shipped Revenue ${result.after.toLocaleString()}</p>`;
        } else {
          ctxEl.innerHTML = '<p class="text-muted">Filter context visualization appears when CALCULATE is applied.</p>';
        }
      }
    }
    checkBtn.disabled = config.mode === 'measure-vs-column'
      ? !wrap.querySelector('input[name="pbi-dax-choice"]:checked')
      : !state.expression.trim();
    onDirty?.(!checkBtn.disabled);
  }

  input?.addEventListener('input', refresh);
  wrap.querySelectorAll('input[type="radio"]').forEach((el) => el.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderReportBuilderSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const state = { visualType: '', field: '', axis: '' };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--report';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Report builder — choose visuals and assign fields for Northstar.</p>
    <div class="practice-viz-layout">
      <aside class="practice-viz-panel">
        <h3>Visualization gallery</h3>
        <select id="pbi-visual" class="form-select"><option value="">Choose visual…</option><option>Card</option><option>Bar chart</option><option>Line chart</option><option>Table</option></select>
        <h3>Field pane</h3>
        <section><strong>Dimensions</strong><ul>${dataset.fields.dimensions.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul></section>
        <section><strong>Measures</strong><ul>${dataset.fields.measures.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul></section>
        <label>Assign field <select id="pbi-field" class="form-select"><option value="">Choose…</option>${[...dataset.fields.dimensions, ...dataset.fields.measures].map((f) => `<option>${escapeHtml(f)}</option>`).join('')}</select></label>
      </aside>
      <div class="practice-viz-workspace">
        <div class="practice-viz-preview-wrap"></div>
      </div>
    </div>
  `;

  const previewWrap = wrap.querySelector('.practice-viz-preview-wrap');
  const previewEl = buildPreviewEl();
  previewWrap.appendChild(previewEl);
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => state.visualType && state.field, onSubmit);

  function refresh() {
    state.visualType = wrap.querySelector('#pbi-visual')?.value || '';
    state.field = wrap.querySelector('#pbi-field')?.value || '';

    const result = renderReportPreview(state, config.datasetId);
    previewEl.classList.toggle('practice-viz-preview--empty', !result.html);
    previewEl.innerHTML = result.html || renderEmptyState(result.emptyMessage);

    checkBtn.disabled = !(state.visualType && state.field);
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('select').forEach((sel) => sel.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderSlicersFiltersSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const state = { slicer: '', reportFilter: '', pageFilter: false };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--slicers';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Interactive report — add slicers and filters; watch the preview update.</p>
    <div class="pbi-filter-controls">
      <label>Slicer <select id="pbi-slicer" class="form-select"><option value="">None</option><option>Region</option><option>Segment</option><option>Channel</option></select></label>
      <label>Report filter <select id="pbi-report-filter" class="form-select"><option value="">None</option><option>segment</option><option>status</option></select></label>
      <label><input type="checkbox" id="pbi-page-filter" /> Page filter: Digital channel only</label>
    </div>
    <div class="practice-viz-preview-wrap"></div>
  `;

  const previewWrap = wrap.querySelector('.practice-viz-preview-wrap');
  const previewEl = buildPreviewEl();
  previewWrap.appendChild(previewEl);
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => Boolean(state.slicer), onSubmit);

  function refresh() {
    state.slicer = wrap.querySelector('#pbi-slicer')?.value || '';
    state.reportFilter = wrap.querySelector('#pbi-report-filter')?.value || '';
    state.pageFilter = wrap.querySelector('#pbi-page-filter')?.checked || false;

    const result = renderSlicersPreview(state, config.datasetId);
    previewEl.classList.remove('practice-viz-preview--empty');
    previewEl.innerHTML = result.html || renderEmptyState('Add a slicer to see the filtered report.');

    checkBtn.disabled = !state.slicer;
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('select, input').forEach((el) => el.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderDashboardBuilderSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const state = { checks: [], layout: ['kpi', 'bar', 'line'] };

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--dashboard';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Dashboard builder — arrange visuals and complete publishing checks.</p>
    <fieldset><legend>Publishing checklist</legend>
      <label><input type="checkbox" value="relationships" /> Relationships verified</label>
      <label><input type="checkbox" value="refresh" /> Refresh credentials configured</label>
      <label><input type="checkbox" value="layout" /> Layout and accessibility reviewed</label>
    </fieldset>
    <div class="pbi-dashboard-grid" id="pbi-dashboard-grid">
      <div class="pbi-dash-tile pbi-dash-tile--kpi">${renderKpiCard('Total Revenue', 19600, 160, 90)}</div>
      <div class="pbi-dash-tile pbi-dash-tile--bar">${renderBarChart(getPowerBiDataset(config.datasetId).regionRevenue, 'Revenue', 240, 140)}</div>
      <div class="pbi-dash-tile pbi-dash-tile--line">${renderLineChart(getPowerBiDataset(config.datasetId).monthlyOrders, 240, 140)}</div>
    </div>
  `;

  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => state.checks.length >= 3, onSubmit);

  function refresh() {
    state.checks = [...wrap.querySelectorAll('fieldset input:checked')].map((el) => el.value);
    checkBtn.disabled = state.checks.length < 3;
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('fieldset input').forEach((el) => el.addEventListener('change', refresh));
  refresh();
  return wrap;
}

export function renderFullWorkspaceSimulator(exercise, { onSubmit, onDirty, toolbarEl }) {
  const config = exercise.powerBiConfig;
  const dataset = getPowerBiDataset(config.datasetId);
  const state = { pages: [], activePage: 'Executive' };
  const pages = ['Executive', 'Sales', 'Marketing', 'Support'];

  const wrap = document.createElement('div');
  wrap.className = 'practice-powerbi practice-powerbi--workspace';
  wrap.innerHTML = `
    <p class="text-sm text-muted">Full Northstar workspace — model, report, DAX, and navigation.</p>
    <div class="pbi-workspace-tabs">${pages.map((p) => `<button type="button" class="pbi-page-tab" data-page="${p}">${p}</button>`).join('')}</div>
    <div class="practice-viz-layout">
      <aside class="practice-viz-panel"><h3>Fields</h3><ul>${dataset.fields.measures.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul></aside>
      <div class="practice-viz-workspace" id="pbi-workspace-canvas"></div>
    </div>
    <fieldset><legend>Pages included in capstone</legend>${pages.map((p) => `<label><input type="checkbox" value="${p}" /> ${p}</label>`).join(' ')}</fieldset>
  `;

  const canvasEl = wrap.querySelector('#pbi-workspace-canvas');
  const checkBtn = attachCheckButton(toolbarEl, exercise, () => state, () => state.pages.length >= 4, onSubmit);

  function renderPage(page) {
    state.activePage = page;
    if (page === 'Executive') canvasEl.innerHTML = renderKpiCard('Total Revenue', 19600);
    else if (page === 'Sales') canvasEl.innerHTML = renderBarChart(dataset.categoryRevenue);
    else if (page === 'Marketing') canvasEl.innerHTML = renderLineChart(dataset.monthlyOrders);
    else canvasEl.innerHTML = renderEmptyState('Support backlog by region — configure ticket visuals.');
    wrap.querySelectorAll('.pbi-page-tab').forEach((tab) => tab.classList.toggle('pbi-tab--active', tab.dataset.page === page));
  }

  function refresh() {
    state.pages = [...wrap.querySelectorAll('fieldset input:checked')].map((el) => el.value);
    checkBtn.disabled = state.pages.length < 4;
    onDirty?.(!checkBtn.disabled);
  }

  wrap.querySelectorAll('.pbi-page-tab').forEach((tab) => tab.addEventListener('click', () => renderPage(tab.dataset.page)));
  wrap.querySelectorAll('fieldset input').forEach((el) => el.addEventListener('change', refresh));
  renderPage('Executive');
  refresh();
  return wrap;
}

export const POWERBI_SIMULATOR_RENDERERS = {
  desktop: renderDesktopSimulator,
  'import-wizard': renderImportWizardSimulator,
  'query-editor': renderQueryEditorSimulator,
  'model-designer': renderModelDesignerSimulator,
  'star-schema': renderStarSchemaSimulator,
  'dax-editor': renderDaxEditorSimulator,
  'report-builder': renderReportBuilderSimulator,
  'slicers-filters': renderSlicersFiltersSimulator,
  'dashboard-builder': renderDashboardBuilderSimulator,
  'full-workspace': renderFullWorkspaceSimulator,
};
