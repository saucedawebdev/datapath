/**
 * Northstar Commerce datasets for Tableau Practice Lab simulations.
 */

export const TABLEAU_DATASETS = {
  'northstar-orders': {
    id: 'northstar-orders',
    name: 'Northstar Orders',
    dimensions: [
      { id: 'Region', field: 'region' },
      { id: 'Category', field: 'category' },
      { id: 'Order Date', field: 'orderMonth' },
      { id: 'Channel', field: 'channel' },
    ],
    measures: [
      { id: 'Revenue', field: 'revenue' },
      { id: 'Orders', field: 'orders' },
      { id: 'Profit', field: 'profit' },
    ],
    rows: [
      { region: 'West', category: 'Office', orderMonth: '2024-01', channel: 'Web', revenue: 12500, orders: 42, profit: 3200 },
      { region: 'West', category: 'Furniture', orderMonth: '2024-01', channel: 'Retail', revenue: 8900, orders: 28, profit: 2100 },
      { region: 'West', category: 'Electronics', orderMonth: '2024-02', channel: 'Web', revenue: 13200, orders: 45, profit: 3400 },
      { region: 'West', category: 'Office', orderMonth: '2024-03', channel: 'Web', revenue: 11800, orders: 40, profit: 3100 },
      { region: 'Midwest', category: 'Office', orderMonth: '2024-01', channel: 'Web', revenue: 9800, orders: 35, profit: 2400 },
      { region: 'Midwest', category: 'Electronics', orderMonth: '2024-02', channel: 'Retail', revenue: 11200, orders: 38, profit: 2800 },
      { region: 'Midwest', category: 'Furniture', orderMonth: '2024-03', channel: 'Web', revenue: 9400, orders: 32, profit: 2300 },
      { region: 'South', category: 'Office', orderMonth: '2024-02', channel: 'Retail', revenue: 11200, orders: 38, profit: 2900 },
      { region: 'South', category: 'Lighting', orderMonth: '2024-03', channel: 'Web', revenue: 7600, orders: 31, profit: 1900 },
      { region: 'South', category: 'Electronics', orderMonth: '2024-01', channel: 'Web', revenue: 10500, orders: 36, profit: 2700 },
      { region: 'Northeast', category: 'Furniture', orderMonth: '2024-03', channel: 'Retail', revenue: 8900, orders: 29, profit: 2200 },
      { region: 'Northeast', category: 'Office', orderMonth: '2024-01', channel: 'Retail', revenue: 8200, orders: 27, profit: 2000 },
      { region: 'Northeast', category: 'Electronics', orderMonth: '2024-02', channel: 'Web', revenue: 9600, orders: 33, profit: 2500 },
    ],
  },
  'northstar-marketing': {
    id: 'northstar-marketing',
    name: 'Northstar Marketing',
    dimensions: [
      { id: 'Campaign Name', field: 'campaignName' },
      { id: 'Channel', field: 'channel' },
    ],
    measures: [
      { id: 'Spend', field: 'spend' },
      { id: 'Revenue', field: 'revenue' },
    ],
    rows: [
      { campaignName: 'Spring Email', channel: 'Email', spend: 4200, revenue: 18500 },
      { campaignName: 'Display Retarget', channel: 'Display', spend: 8900, revenue: 24200 },
      { campaignName: 'Paid Search Brand', channel: 'Search', spend: 12000, revenue: 35600 },
    ],
  },
};

export function getTableauDataset(id) {
  return TABLEAU_DATASETS[id] || TABLEAU_DATASETS['northstar-orders'];
}

export function fieldExistsInDataset(dataset, fieldId) {
  if (!fieldId) return false;
  return dataset.dimensions.some((d) => d.id === fieldId)
    || dataset.measures.some((m) => m.id === fieldId);
}

export function isMeasure(dataset, fieldId) {
  return dataset.measures.some((m) => m.id === fieldId);
}

export function isDimension(dataset, fieldId) {
  return dataset.dimensions.some((d) => d.id === fieldId);
}

export function resolveFieldMeta(dataset, fieldId) {
  const dim = dataset.dimensions.find((d) => d.id === fieldId);
  if (dim) return { ...dim, role: 'dimension' };
  const meas = dataset.measures.find((m) => m.id === fieldId);
  if (meas) return { ...meas, role: 'measure' };
  return null;
}
