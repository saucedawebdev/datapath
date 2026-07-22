/**
 * Northstar Commerce — central company profile for immersion across DATApath.
 * Single source of truth; do not duplicate this data in components.
 */

export const NORTHSTAR_PROFILE = {
  name: 'Northstar Commerce',
  tagline: 'Mid-market online retailer of home and office goods',
  industry: 'Retail & E-commerce',
  headquarters: 'Denver, Colorado',
  employees: 850,
  founded: 2016,
  mission: 'Help customers create productive, comfortable workspaces by delivering quality home and office products through a seamless shopping experience.',
  overview: 'Northstar Commerce sells home and office products online and through select retail partners across the United States. The analytics team supports Sales, Marketing, Finance, Operations, and Support with SQL, spreadsheets, dashboards, and statistical decision support.',
  businessGoals: [
    'Grow revenue across West, Midwest, South, and Northeast regions',
    'Improve marketing ROI and channel efficiency',
    'Reduce support backlog while maintaining customer satisfaction',
    'Optimize product mix and inventory availability',
    'Deliver executive-ready reporting on a weekly cadence',
  ],
  departments: [
    { id: 'sales', name: 'Sales Analytics', focus: 'Revenue, regional performance, and channel mix' },
    { id: 'marketing', name: 'Marketing Analytics', focus: 'Campaign performance, acquisition, and ROI' },
    { id: 'finance', name: 'Finance Operations', focus: 'Forecasting, margins, and executive reporting' },
    { id: 'operations', name: 'Operations', focus: 'Inventory, fulfillment, and supply chain metrics' },
    { id: 'support', name: 'Customer Support', focus: 'Ticket volume, resolution time, and satisfaction' },
    { id: 'bi', name: 'Business Intelligence', focus: 'Data models, dashboards, and self-serve analytics' },
    { id: 'data-engineering', name: 'Data Engineering', focus: 'Pipelines, automation, and data quality' },
    { id: 'decision-science', name: 'Decision Science', focus: 'Experiments, sampling, and statistical inference' },
  ],
  regionalOffices: [
    { region: 'West', city: 'Denver, CO', role: 'Headquarters & West sales hub' },
    { region: 'Midwest', city: 'Chicago, IL', role: 'Midwest fulfillment & analytics satellite' },
    { region: 'South', city: 'Austin, TX', role: 'South regional sales office' },
    { region: 'Northeast', city: 'Boston, MA', role: 'Northeast enterprise partnerships' },
  ],
  salesChannels: ['Web', 'Mobile', 'Retail partner', 'Marketplace'],
  productCategories: ['Office', 'Furniture', 'Electronics', 'Lighting', 'Stationery'],
  customerSegments: ['Premium', 'Standard'],
  executiveLeadership: [
    { title: 'CEO', name: 'Jordan Ellis', department: 'Executive' },
    { title: 'Chief Data Officer', name: 'Priya Nakamura', department: 'Business Intelligence' },
    { title: 'Director of Analytics', name: 'Marcus Chen', department: 'Sales Analytics' },
    { title: 'VP of Marketing', name: 'Elena Rodriguez', department: 'Marketing Analytics' },
    { title: 'Finance Operations Manager', name: 'David Okonkwo', department: 'Finance Operations' },
    { title: 'Head of Data Engineering', name: 'Samira Patel', department: 'Data Engineering' },
    { title: 'Director of Experimentation', name: 'Dr. Amy Liu', department: 'Decision Science' },
  ],
  learnerRole: 'Junior Data Analyst',
};

/** @deprecated use NORTHSTAR_PROFILE — kept for backward compatibility */
export const NORTHSTAR = {
  name: NORTHSTAR_PROFILE.name,
  tagline: NORTHSTAR_PROFILE.tagline,
  regions: NORTHSTAR_PROFILE.regionalOffices.map((o) => o.region),
  departments: NORTHSTAR_PROFILE.departments.map((d) => d.name.replace(' Analytics', '').replace(' Operations', '')),
};

export const northstarTables = {
  customers: 'customer_id, first_name, last_name, email, region, segment, signup_date',
  orders: 'order_id, customer_id, order_date, status, channel',
  order_items: 'order_item_id, order_id, product_id, quantity, unit_price',
  products: 'product_id, product_name, category, unit_cost, list_price',
  marketing_campaigns: 'campaign_id, campaign_name, channel, start_date, spend',
  support_tickets: 'ticket_id, customer_id, opened_date, category, resolved_date',
  monthly_targets: 'month, region, revenue_target, orders_target',
};

export const northstarKpis = [
  { name: 'Total Revenue', definition: 'Sum of order line revenue (quantity × unit_price) across all channels' },
  { name: 'Order Count', definition: 'Distinct orders placed in the reporting period' },
  { name: 'Average Order Value', definition: 'Total revenue divided by order count' },
  { name: 'Marketing ROI', definition: 'Attributed revenue divided by campaign spend' },
  { name: 'Support Backlog', definition: 'Open tickets without a resolved_date' },
  { name: 'Regional Revenue Share', definition: 'Revenue by customer region as a percentage of total' },
];

export const northstarContext = `${NORTHSTAR_PROFILE.name} sells home and office products online and through select retail partners. As a ${NORTHSTAR_PROFILE.learnerRole}, you work with orders, customers, products, marketing campaigns, and support data stored in a relational database and exported to Excel, Tableau, Power BI, and Python notebooks.`;

export function northstarStakeholder(role, question) {
  return `${role} at ${NORTHSTAR_PROFILE.name}: "${question}"`;
}

export function getDepartmentForSubject(subjectId) {
  const map = {
    sql: 'Sales Analytics',
    excel: 'Finance Operations',
    tableau: 'Marketing Analytics',
    'power-bi': 'Business Intelligence',
    python: 'Data Engineering',
    statistics: 'Decision Science',
  };
  return map[subjectId] || 'Analytics';
}

export function getExecutiveForSubject(subjectId) {
  const map = {
    sql: 'Director of Analytics',
    excel: 'Finance Operations Manager',
    tableau: 'VP of Marketing',
    'power-bi': 'Chief Data Officer',
    python: 'Head of Data Engineering',
    statistics: 'Director of Experimentation',
  };
  return map[subjectId] || 'Director of Analytics';
}
