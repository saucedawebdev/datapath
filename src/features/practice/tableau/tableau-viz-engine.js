import {
  getTableauDataset,
  isDimension,
  isMeasure,
  resolveFieldMeta,
} from '../../../data/tableau-datasets.js';

function formatCurrency(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

function escapeSvg(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function filterRows(dataset, filterFieldId, filterValue) {
  if (!filterFieldId || !filterValue) return dataset.rows;
  const meta = resolveFieldMeta(dataset, filterFieldId);
  if (!meta) return dataset.rows;
  return dataset.rows.filter((row) => row[meta.field] === filterValue);
}

export function aggregateByDimension(dataset, rows, dimensionId, measureId) {
  const dim = resolveFieldMeta(dataset, dimensionId);
  const meas = resolveFieldMeta(dataset, measureId);
  if (!dim || !meas || dim.role !== 'dimension' || meas.role !== 'measure') return [];

  const totals = new Map();
  for (const row of rows) {
    const key = row[dim.field];
    totals.set(key, (totals.get(key) || 0) + row[meas.field]);
  }
  return [...totals.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function aggregateByTime(dataset, rows, timeDimensionId, measureId) {
  const dim = resolveFieldMeta(dataset, timeDimensionId);
  const meas = resolveFieldMeta(dataset, measureId);
  if (!dim || !meas) return [];

  const totals = new Map();
  for (const row of rows) {
    const key = row[dim.field];
    totals.set(key, (totals.get(key) || 0) + row[meas.field]);
  }
  return [...totals.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, value]) => ({ label, value }));
}

export function extractShelfState(state) {
  const shelves = [state.rows, state.columns].filter(Boolean);
  const dimensions = shelves.filter((f) => f && !['Revenue', 'Orders', 'Profit', 'Spend'].includes(f) || isDimensionField(f));
  const measures = shelves.filter((f) => ['Revenue', 'Orders', 'Profit', 'Spend'].includes(f));
  return { dimensions, measures, shelves };
}

function isDimensionField(fieldId) {
  return ['Region', 'Category', 'Order Date', 'Channel', 'Campaign Name'].includes(fieldId);
}

export function buildChartData(dataset, state) {
  const rows = filterRows(dataset, state.filter, state.filterValue);
  const rowField = state.rows;
  const colField = state.columns;

  let dimensionId = null;
  let measureId = null;
  let timeDimensionId = null;

  if (rowField && isMeasure(dataset, rowField)) measureId = rowField;
  if (colField && isMeasure(dataset, colField)) measureId = colField;
  if (rowField && isDimension(dataset, rowField)) dimensionId = rowField;
  if (colField && isDimension(dataset, colField)) {
    if (colField === 'Order Date') timeDimensionId = colField;
    else dimensionId = colField;
  }

  if (!measureId) return { points: [], error: 'missing-measure' };
  if (!dimensionId && !timeDimensionId) return { points: [], error: 'missing-dimension' };

  if (state.chartType === 'Line' && timeDimensionId) {
    return { points: aggregateByTime(dataset, rows, timeDimensionId, measureId), measureId, dimensionId: timeDimensionId };
  }

  if (dimensionId) {
    return { points: aggregateByDimension(dataset, rows, dimensionId, measureId), measureId, dimensionId };
  }

  return { points: [], error: 'invalid-config' };
}

export function renderBarChart(points, measureLabel = 'Revenue', width = 520, height = 300) {
  if (!points.length) return '';

  const margin = { top: 28, right: 20, bottom: 52, left: 64 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const max = Math.max(...points.map((p) => p.value), 1);
  const slot = innerW / points.length;
  const barW = slot * 0.65;

  let content = '';
  for (let i = 0; i < points.length; i++) {
    const d = points[i];
    const barH = (d.value / max) * innerH;
    const x = margin.left + i * slot + (slot - barW) / 2;
    const y = margin.top + innerH - barH;
    content += `<rect class="tableau-bar" x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3">
      <title>${escapeSvg(d.label)}: ${formatCurrency(d.value)}</title>
    </rect>`;
    content += `<text class="tableau-bar-label" x="${x + barW / 2}" y="${margin.top + innerH + 20}" text-anchor="middle">${escapeSvg(d.label)}</text>`;
    content += `<text class="tableau-bar-value" x="${x + barW / 2}" y="${y - 6}" text-anchor="middle">${formatCurrency(d.value)}</text>`;
  }

  for (let t = 0; t <= 4; t++) {
    const val = (max / 4) * t;
    const y = margin.top + innerH - (val / max) * innerH;
    content += `<line class="tableau-grid-line" x1="${margin.left}" y1="${y}" x2="${margin.left + innerW}" y2="${y}" />`;
    content += `<text class="tableau-axis-label" x="${margin.left - 8}" y="${y + 4}" text-anchor="end">${formatCurrency(val)}</text>`;
  }

  content += `<text class="tableau-axis-title" x="${margin.left + innerW / 2}" y="${height - 8}" text-anchor="middle">${escapeSvg(measureLabel)}</text>`;

  return `<svg class="tableau-chart-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Bar chart of ${escapeSvg(measureLabel)} by category">${content}</svg>`;
}

export function renderLineChart(points, measureLabel = 'Revenue', width = 520, height = 300) {
  if (!points.length) return '';

  const margin = { top: 28, right: 20, bottom: 52, left: 64 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const max = Math.max(...points.map((p) => p.value), 1);
  const step = points.length > 1 ? innerW / (points.length - 1) : innerW;

  let path = '';
  let markers = '';
  points.forEach((d, i) => {
    const x = margin.left + i * step;
    const y = margin.top + innerH - (d.value / max) * innerH;
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    markers += `<circle class="tableau-line-point" cx="${x}" cy="${y}" r="4"><title>${escapeSvg(d.label)}: ${formatCurrency(d.value)}</title></circle>`;
    markers += `<text class="tableau-bar-label" x="${x}" y="${margin.top + innerH + 20}" text-anchor="middle">${escapeSvg(d.label)}</text>`;
  });

  return `<svg class="tableau-chart-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Line chart of ${escapeSvg(measureLabel)} over time">
    <path class="tableau-line" d="${path}" fill="none" stroke-width="2.5" />
    ${markers}
  </svg>`;
}

export function renderMapChart(points, measureLabel = 'Revenue', width = 520, height = 300) {
  const regionPositions = {
    West: { x: 80, y: 140 },
    Midwest: { x: 200, y: 120 },
    South: { x: 190, y: 200 },
    Northeast: { x: 280, y: 100 },
  };
  const max = Math.max(...points.map((p) => p.value), 1);

  let content = '<rect class="tableau-map-bg" x="40" y="60" width="360" height="200" rx="8" />';
  for (const p of points) {
    const pos = regionPositions[p.label] || { x: 200, y: 150 };
    const r = 12 + (p.value / max) * 28;
    content += `<circle class="tableau-map-bubble" cx="${pos.x}" cy="${pos.y}" r="${r}">
      <title>${escapeSvg(p.label)}: ${formatCurrency(p.value)}</title>
    </circle>`;
    content += `<text class="tableau-bar-label" x="${pos.x}" y="${pos.y + r + 14}" text-anchor="middle">${escapeSvg(p.label)}</text>`;
  }

  return `<svg class="tableau-chart-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Map chart of ${escapeSvg(measureLabel)} by region">${content}</svg>`;
}

export function renderTableauPreview(datasetId, state) {
  const dataset = getTableauDataset(datasetId);
  const { points, error, measureId } = buildChartData(dataset, state);

  if (error === 'missing-measure') {
    return { html: '', emptyMessage: 'Drag a measure (Revenue, Orders, or Profit) to Rows or Columns.' };
  }
  if (error === 'missing-dimension') {
    return { html: '', emptyMessage: 'Drag a dimension (Region, Category, Channel, or Order Date) to Rows or Columns.' };
  }
  if (!points.length) {
    return { html: '', emptyMessage: 'No data marks for this field combination. Adjust shelves or filters.' };
  }

  const measureLabel = measureId || 'Revenue';
  let html = '';
  if (state.chartType === 'Line') html = renderLineChart(points, measureLabel);
  else if (state.chartType === 'Map') html = renderMapChart(points, measureLabel);
  else html = renderBarChart(points, measureLabel);

  return { html, emptyMessage: null, points, measureId };
}

export function isMinimumConfigPresent(dataset, state) {
  const shelves = [state.rows, state.columns].filter(Boolean);
  if (!shelves.length || !state.chartType) return false;
  const hasMeasure = shelves.some((f) => isMeasure(dataset, f));
  const hasDimension = shelves.some((f) => isDimension(dataset, f));
  return hasMeasure && hasDimension;
}
