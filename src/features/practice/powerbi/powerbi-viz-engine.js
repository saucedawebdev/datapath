import { getPowerBiDataset } from '../../../data/powerbi-datasets.js';

function escapeSvg(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function formatCurrency(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

export function renderKpiCard(label, value, width = 200, height = 100) {
  return `<svg class="pbi-visual-svg pbi-kpi" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeSvg(label)} ${value}">
    <rect class="pbi-visual-bg" width="${width}" height="${height}" rx="8" />
    <text class="pbi-kpi-label" x="16" y="32">${escapeSvg(label)}</text>
    <text class="pbi-kpi-value" x="16" y="72">${typeof value === 'number' ? formatCurrency(value) : escapeSvg(String(value))}</text>
  </svg>`;
}

export function renderBarChart(points, measureLabel = 'Revenue', width = 480, height = 260) {
  if (!points?.length) return '';
  const margin = { top: 24, right: 16, bottom: 48, left: 56 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const max = Math.max(...points.map((p) => p.value), 1);
  const slot = innerW / points.length;
  const barW = slot * 0.65;
  let content = '';
  points.forEach((d, i) => {
    const barH = (d.value / max) * innerH;
    const x = margin.left + i * slot + (slot - barW) / 2;
    const y = margin.top + innerH - barH;
    content += `<rect class="pbi-bar" x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3"><title>${escapeSvg(d.label)}: ${formatCurrency(d.value)}</title></rect>`;
    content += `<text class="pbi-axis-label" x="${x + barW / 2}" y="${margin.top + innerH + 18}" text-anchor="middle">${escapeSvg(d.label)}</text>`;
  });
  return `<svg class="pbi-visual-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Bar chart">${content}</svg>`;
}

export function renderLineChart(points, width = 480, height = 260) {
  if (!points?.length) return '';
  const margin = { top: 24, right: 16, bottom: 48, left: 56 };
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
    markers += `<circle class="pbi-line-point" cx="${x}" cy="${y}" r="4"><title>${escapeSvg(d.label)}: ${d.value}</title></circle>`;
    markers += `<text class="pbi-axis-label" x="${x}" y="${margin.top + innerH + 18}" text-anchor="middle">${escapeSvg(d.label)}</text>`;
  });
  return `<svg class="pbi-visual-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Line chart"><path class="pbi-line" d="${path}" fill="none" stroke-width="2.5"/>${markers}</svg>`;
}

export function renderTableVisual(columns, rows, width = 480, height = 200) {
  const colW = width / columns.length;
  let content = `<rect class="pbi-visual-bg" width="${width}" height="${height}" rx="8"/>`;
  columns.forEach((col, i) => {
    content += `<text class="pbi-table-header" x="${i * colW + 8}" y="24">${escapeSvg(col)}</text>`;
  });
  rows.slice(0, 4).forEach((row, ri) => {
    columns.forEach((col, ci) => {
      content += `<text class="pbi-table-cell" x="${ci * colW + 8}" y="${48 + ri * 24}">${escapeSvg(String(row[col] ?? ''))}</text>`;
    });
  });
  return `<svg class="pbi-visual-svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Table visual">${content}</svg>`;
}

export function renderReportPreview(state, datasetId = 'northstar-model') {
  const dataset = getPowerBiDataset(datasetId);
  const { visualType, field } = state;

  if (!visualType) {
    return { html: '', emptyMessage: 'Select a visual type from the gallery to begin.' };
  }
  if (!field && visualType !== 'Table') {
    return { html: '', emptyMessage: 'Assign a field from the field pane to populate the visual.' };
  }

  let html = '';
  if (visualType === 'Card' || visualType === 'KPI') {
    const m = dataset.measures?.[field] || dataset.measures?.['Total Revenue'];
    html = renderKpiCard(field || 'Total Revenue', m?.sampleValue || 19600);
  } else if (visualType === 'Bar chart') {
    const points = field === 'Category' ? dataset.categoryRevenue : dataset.regionRevenue;
    html = renderBarChart(points, field || 'Revenue');
  } else if (visualType === 'Line chart') {
    html = renderLineChart(dataset.monthlyOrders);
  } else if (visualType === 'Table') {
    html = renderTableVisual(['Region', 'Revenue'], dataset.regionRevenue.map((r) => ({ Region: r.label, Revenue: r.value })));
  } else if (visualType === 'Slicer') {
    html = `<div class="pbi-slicer-preview"><label>${escapeSvg(field || 'Region')}</label><select class="form-select" disabled><option>West</option><option>Midwest</option><option>South</option><option>Northeast</option></select></div>`;
  } else {
    return { html: '', emptyMessage: `Configure ${visualType} with appropriate fields.` };
  }

  return { html, emptyMessage: null };
}

export function renderSlicersPreview(state, datasetId = 'northstar-model') {
  const dataset = getPowerBiDataset(datasetId);
  const filtered = state.pageFilter
    ? dataset.regionRevenue.map((r) => ({ ...r, value: Math.round(r.value * 0.7) }))
    : dataset.regionRevenue;
  const barHtml = renderBarChart(filtered, 'Revenue');
  const slicerNote = state.slicer ? `Slicer active: ${state.slicer}` : 'Add a slicer to filter the report.';
  const filterNote = state.reportFilter ? `Report filter: ${state.reportFilter}` : '';
  return {
    html: `${barHtml}<p class="pbi-filter-note">${escapeSvg(slicerNote)} ${escapeSvg(filterNote)}</p>`,
    emptyMessage: null,
  };
}

export function renderEmptyState(message) {
  return `<div class="pbi-empty-state"><p>${escapeSvg(message)}</p></div>`;
}

export function renderPreviewContainer(html, emptyMessage) {
  if (html) return html;
  return renderEmptyState(emptyMessage || 'Configure the visual to see a preview.');
}
