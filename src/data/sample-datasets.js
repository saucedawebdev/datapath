import { northstarDataset } from './northstar-datasets.js';

/** Primary dataset — Northstar Commerce */
export const retailDataset = northstarDataset;

export const datasets = [northstarDataset];

export function getDataset(id) {
  return datasets.find((d) => d.id === id) || northstarDataset;
}

export { northstarDataset };
