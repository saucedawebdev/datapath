/**
 * Northstar Commerce metrics derived from bundled seed data.
 * Values match src/data/northstar-datasets.js INSERT rows — not invented.
 */

import { northstarDataset } from '../data/northstar-datasets.js';
import { getPowerBiDataset } from '../data/powerbi-datasets.js';

const ORDER_ITEM_ROWS = [
  [2, 19.99], [1, 12.99], [1, 399.99], [1, 79.99], [1, 49.99], [1, 59.99],
  [2, 44.99], [1, 54.99], [3, 19.99], [1, 399.99], [2, 12.99], [1, 49.99],
];

function countInsertRows(tableName) {
  const regex = new RegExp(`INSERT INTO ${tableName} VALUES\\s*([\\s\\S]*?);`, 'i');
  const match = northstarDataset.seedSql.match(regex);
  if (!match) return null;
  return match[1].split(/\),\s*\(/).length;
}

function computeRevenue() {
  const total = ORDER_ITEM_ROWS.reduce((sum, [qty, price]) => sum + qty * price, 0);
  return Math.round(total * 100) / 100;
}

export function getNorthstarMetrics() {
  const pbi = getPowerBiDataset('northstar-model');
  return {
    name: northstarDataset.name,
    customers: countInsertRows('customers'),
    orders: countInsertRows('orders'),
    products: countInsertRows('products'),
    regions: 4,
    campaigns: countInsertRows('marketing_campaigns'),
    revenue: computeRevenue(),
    regionRevenue: pbi.regionRevenue,
    monthlyOrders: pbi.monthlyOrders,
  };
}
