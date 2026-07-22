/**
 * Northstar Commerce datasets for Power BI Practice Lab.
 */

export const POWERBI_DATASETS = {
  'northstar-model': {
    id: 'northstar-model',
    name: 'Northstar Commerce Model',
    tables: {
      orders: {
        label: 'orders',
        type: 'fact',
        columns: ['order_id', 'customer_id', 'order_date', 'status', 'channel', 'revenue'],
        rows: [
          { order_id: 1001, customer_id: 1, order_date: '2024-01-15', status: 'Shipped', channel: 'Web', revenue: 4200 },
          { order_id: 1002, customer_id: 2, order_date: '2024-01-18', status: 'Shipped', channel: 'Retail', revenue: 3100 },
          { order_id: 1003, customer_id: 3, order_date: '2024-02-05', status: 'Pending', channel: 'Web', revenue: 2800 },
          { order_id: 1004, customer_id: 4, order_date: '2024-02-12', status: 'Shipped', channel: 'Digital', revenue: 5600 },
          { order_id: 1005, customer_id: 5, order_date: '2024-03-01', status: 'Shipped', channel: 'Web', revenue: 3900 },
        ],
      },
      customers: {
        label: 'customers',
        type: 'dimension',
        columns: ['customer_id', 'region', 'segment'],
        rows: [
          { customer_id: 1, region: 'West', segment: 'Premium' },
          { customer_id: 2, region: 'Midwest', segment: 'Standard' },
          { customer_id: 3, region: 'South', segment: 'Standard' },
          { customer_id: 4, region: 'Northeast', segment: 'Premium' },
          { customer_id: 5, region: 'West', segment: 'Standard' },
        ],
      },
      products: {
        label: 'products',
        type: 'dimension',
        columns: ['product_id', 'category', 'list_price'],
        rows: [
          { product_id: 101, category: 'Office', list_price: 19.99 },
          { product_id: 102, category: 'Furniture', list_price: 399.99 },
          { product_id: 103, category: 'Electronics', list_price: 79.99 },
        ],
      },
      order_items: {
        label: 'order_items',
        type: 'fact',
        columns: ['order_item_id', 'order_id', 'product_id', 'quantity', 'unit_price'],
        rows: [
          { order_item_id: 1, order_id: 1001, product_id: 101, quantity: 2, unit_price: 19.99 },
          { order_item_id: 2, order_id: 1001, product_id: 103, quantity: 1, unit_price: 79.99 },
        ],
      },
      marketing_campaigns: {
        label: 'marketing_campaigns',
        type: 'dimension',
        columns: ['campaign_id', 'campaign_name', 'channel', 'spend'],
        rows: [
          { campaign_id: 1, campaign_name: 'Spring Email', channel: 'Email', spend: 4200 },
          { campaign_id: 2, campaign_name: 'Display Retarget', channel: 'Display', spend: 8900 },
        ],
      },
      date: {
        label: 'Date',
        type: 'dimension',
        columns: ['date', 'month', 'year'],
        rows: [
          { date: '2024-01-01', month: '2024-01', year: 2024 },
          { date: '2024-02-01', month: '2024-02', year: 2024 },
          { date: '2024-03-01', month: '2024-03', year: 2024 },
        ],
      },
    },
    relationships: [
      { from: 'customers', to: 'orders', key: 'customer_id', cardinality: '1:*' },
      { from: 'orders', to: 'order_items', key: 'order_id', cardinality: '1:*' },
      { from: 'products', to: 'order_items', key: 'product_id', cardinality: '1:*' },
    ],
    measures: {
      'Total Revenue': { expression: 'SUM(orders[revenue])', sampleValue: 19600 },
      'Order Count': { expression: 'COUNT(orders[order_id])', sampleValue: 5 },
      'Average Order Value': { expression: 'DIVIDE([Total Revenue], [Order Count])', sampleValue: 3920 },
    },
    fields: {
      dimensions: ['Region', 'Category', 'Channel', 'Order Date', 'Segment', 'Status'],
      measures: ['Total Revenue', 'Order Count', 'Average Order Value', 'Shipped Revenue'],
    },
    regionRevenue: [
      { label: 'West', value: 8100 },
      { label: 'Midwest', value: 3100 },
      { label: 'South', value: 2800 },
      { label: 'Northeast', value: 5600 },
    ],
    categoryRevenue: [
      { label: 'Office', value: 5200 },
      { label: 'Furniture', value: 4100 },
      { label: 'Electronics', value: 6800 },
    ],
    monthlyOrders: [
      { label: '2024-01', value: 2 },
      { label: '2024-02', value: 2 },
      { label: '2024-03', value: 1 },
    ],
  },
  'northstar-products-dirty': {
    id: 'northstar-products-dirty',
    name: 'Products Export (needs cleaning)',
    columns: ['product_id', 'category', 'region', 'list_price'],
    rows: [
      { product_id: 101, category: ' Office ', region: 'west', list_price: '19.99' },
      { product_id: 102, category: 'Furniture', region: 'MIDWEST', list_price: '399.99' },
      { product_id: 101, category: ' Office ', region: 'west', list_price: '19.99' },
    ],
  },
};

export function getPowerBiDataset(id) {
  return POWERBI_DATASETS[id] || POWERBI_DATASETS['northstar-model'];
}
