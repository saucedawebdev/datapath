/**
 * Shared references, projects, achievements, and career content — Job Ready Edition.
 */
import { NORTHSTAR } from './job-ready/northstar.js';
import { jobReadyReferences } from './job-ready/references.js';
import { attachProjectBriefs } from './job-ready/project-briefs.js';

export const references = jobReadyReferences;

export const projects = attachProjectBriefs([
  {
    id: 'project-sql-business-analysis',
    title: 'SQL Business Analysis Project',
    subjectIds: ['sql'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} leadership needs a quarterly business review covering revenue, customer segments, product performance, and marketing ROI across all four regions.`,
    stakeholderRequest: 'Build a SQL-based analysis package that answers executive questions with documented queries, validated metrics, and a written summary of findings.',
    datasetOverview: 'Northstar Commerce tables: customers, orders, order_items, products, marketing_campaigns, support_tickets, monthly_targets.',
    dataDictionary: [
      { table: 'customers', columns: 'customer_id, first_name, last_name, email, region, signup_date, segment' },
      { table: 'orders', columns: 'order_id, customer_id, order_date, status, channel' },
      { table: 'order_items', columns: 'order_item_id, order_id, product_id, quantity, unit_price' },
      { table: 'products', columns: 'product_id, product_name, category, unit_cost, list_price' },
      { table: 'marketing_campaigns', columns: 'campaign_id, campaign_name, channel, start_date, spend' },
    ],
    deliverables: [
      'Data dictionary with table relationships documented',
      'SQL queries for revenue, orders, AOV, and regional breakdown',
      'Customer segment analysis with cohort-style metrics',
      'Product category performance ranking',
      'Marketing spend vs revenue attribution summary',
      'One-page executive memo with recommendations',
    ],
    requiredSkills: ['SELECT and WHERE', 'JOINs', 'Aggregations', 'Window functions', 'Data cleaning'],
    recommendedWorkflow: [
      'Explore schema and validate row counts',
      'Define KPIs with stakeholder alignment',
      'Write and test core revenue queries',
      'Build segment and product analyses',
      'Cross-check totals across queries',
      'Draft executive summary',
    ],
    milestones: [
      { id: 'sql-p1', title: 'Schema exploration', description: 'Document tables, keys, and data quality checks' },
      { id: 'sql-p2', title: 'Core metrics', description: 'Revenue, order count, AOV by region and month' },
      { id: 'sql-p3', title: 'Segment analysis', description: 'Customer segments and product category rankings' },
      { id: 'sql-p4', title: 'Executive deliverable', description: 'Final memo with actionable recommendations' },
    ],
    rubric: [
      { criterion: 'Query accuracy', weight: 35, description: 'Metrics reconcile and use correct joins' },
      { criterion: 'Business insight', weight: 35, description: 'Findings directly answer stakeholder questions' },
      { criterion: 'Documentation', weight: 15, description: 'Queries are commented and reproducible' },
      { criterion: 'Communication', weight: 15, description: 'Executive summary is clear and decision-oriented' },
    ],
    reflectionQuestions: [
      'Which data quality issue was hardest to resolve and how did you handle it?',
      'What single metric would you monitor weekly for Northstar Commerce?',
    ],
    exampleDeliverable: 'Executive memo with 5 KPI cards, 3 supporting SQL queries, and regional revenue chart data.',
  },
  {
    id: 'project-excel-dashboard',
    title: 'Excel Business Dashboard Project',
    subjectIds: ['excel'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} operations team needs a self-serve Excel dashboard for weekly sales and inventory review.`,
    stakeholderRequest: 'Create an Excel dashboard with KPIs, pivot analysis, conditional formatting, and charts that refreshes from exported Northstar data.',
    datasetOverview: 'Northstar sales export: orders, products, regions, channels, monthly targets.',
    dataDictionary: [
      { table: 'Sales Export', columns: 'order_date, region, channel, product_name, category, quantity, revenue' },
      { table: 'Targets', columns: 'month, region, revenue_target' },
    ],
    deliverables: ['Cleaned data sheet', 'KPI summary', 'PivotTable analysis', 'Charts', 'Dashboard layout', 'User guide'],
    requiredSkills: ['Formulas', 'PivotTables', 'Charts', 'Conditional formatting', 'Dashboard design'],
    recommendedWorkflow: ['Import data', 'Clean and validate', 'Build KPIs', 'Create pivots', 'Design dashboard', 'Test filters'],
    milestones: [
      { id: 'ex-p1', title: 'Data prep', description: 'Import, clean, and validate Northstar export' },
      { id: 'ex-p2', title: 'KPIs and pivots', description: 'Core metrics and category breakdown' },
      { id: 'ex-p3', title: 'Dashboard', description: 'Visual layout with charts and formatting' },
    ],
    rubric: [
      { criterion: 'Accuracy', weight: 30, description: 'Formulas and pivots produce correct totals' },
      { criterion: 'Usability', weight: 30, description: 'Dashboard is navigable and labeled clearly' },
      { criterion: 'Design', weight: 20, description: 'Visual hierarchy supports quick decisions' },
      { criterion: 'Documentation', weight: 20, description: 'Includes refresh instructions' },
    ],
    reflectionQuestions: ['How would you automate weekly refresh for this dashboard?'],
    exampleDeliverable: 'Multi-sheet workbook with KPI row, pivot by region/category, and combo chart.',
  },
  {
    id: 'project-tableau-portfolio',
    title: 'Tableau Portfolio Dashboard Project',
    subjectIds: ['tableau'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} marketing wants an interactive dashboard showing campaign performance and customer geography.`,
    stakeholderRequest: 'Design a Tableau portfolio dashboard with filters, calculated fields, and a clear data story for leadership.',
    datasetOverview: 'Northstar customers, orders, marketing campaigns, website sessions.',
    dataDictionary: [
      { table: 'orders', columns: 'order_id, customer_id, order_date, channel, region' },
      { table: 'marketing_campaigns', columns: 'campaign_id, channel, spend, start_date' },
    ],
    deliverables: ['Dashboard wireframe', 'Calculated fields documentation', 'Interactive dashboard', 'Story points narrative'],
    requiredSkills: ['Dimensions/measures', 'Charts', 'Filters', 'Calculated fields', 'Dashboard layout'],
    recommendedWorkflow: ['Connect data', 'Define questions', 'Build views', 'Add interactivity', 'Write narrative'],
    milestones: [
      { id: 'tb-p1', title: 'Exploration', description: 'Connect data and validate fields' },
      { id: 'tb-p2', title: 'Core views', description: 'Bar, line, and map visualizations' },
      { id: 'tb-p3', title: 'Dashboard', description: 'Filters, parameters, and story' },
    ],
    rubric: [
      { criterion: 'Visual design', weight: 30, description: 'Appropriate chart types and clean layout' },
      { criterion: 'Interactivity', weight: 25, description: 'Filters and parameters work correctly' },
      { criterion: 'Insight', weight: 25, description: 'Story answers business questions' },
      { criterion: 'Portfolio quality', weight: 20, description: 'Professional enough to share with employers' },
    ],
    reflectionQuestions: ['What would you change if the audience were the CFO instead of marketing?'],
    exampleDeliverable: 'Dashboard with regional map, campaign ROI bar chart, and trend line with filter panel.',
  },
  {
    id: 'project-power-bi-report',
    title: 'Power BI Business Report Project',
    subjectIds: ['power-bi'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} finance needs a Power BI report with star-schema modeling and DAX measures for monthly close.`,
    stakeholderRequest: 'Build a Power BI report with cleaned data, relationships, DAX KPIs, slicers, and publish-ready layout.',
    datasetOverview: 'Northstar fact and dimension tables: orders, order_items, customers, products, date table.',
    dataDictionary: [
      { table: 'FactOrders', columns: 'order_key, customer_key, product_key, date_key, revenue, quantity' },
      { table: 'DimCustomer', columns: 'customer_key, region, segment' },
      { table: 'DimDate', columns: 'date_key, month, quarter, year' },
    ],
    deliverables: ['Data model diagram', 'Power Query steps', 'DAX measures', 'Report pages', 'Publishing checklist'],
    requiredSkills: ['Power Query', 'Star schema', 'DAX', 'Visual selection', 'Report design'],
    recommendedWorkflow: ['Import and clean', 'Model relationships', 'Write measures', 'Build pages', 'Validate totals'],
    milestones: [
      { id: 'pbi-p1', title: 'Data model', description: 'Star schema with date table' },
      { id: 'pbi-p2', title: 'DAX measures', description: 'Revenue, YTD, and growth KPIs' },
      { id: 'pbi-p3', title: 'Report', description: 'Interactive pages with slicers' },
    ],
    rubric: [
      { criterion: 'Model quality', weight: 30, description: 'Correct relationships and grain' },
      { criterion: 'DAX accuracy', weight: 30, description: 'Measures match expected totals' },
      { criterion: 'Report UX', weight: 25, description: 'Clear navigation and filters' },
      { criterion: 'Documentation', weight: 15, description: 'Model and measure definitions included' },
    ],
    reflectionQuestions: ['How does filter context affect your revenue measure?'],
    exampleDeliverable: 'Three-page report: KPI overview, regional drill-down, product matrix.',
  },
  {
    id: 'project-python-analysis',
    title: 'Python Business Analysis Project',
    subjectIds: ['python'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} product team needs exploratory analysis of customer behavior and sales trends using Python.`,
    stakeholderRequest: 'Use pandas and matplotlib to analyze Northstar data, document findings, and export results for stakeholders.',
    datasetOverview: 'CSV exports: customers.csv, orders.csv, order_items.csv, products.csv.',
    dataDictionary: [
      { file: 'orders.csv', columns: 'order_id, customer_id, order_date, channel, status' },
      { file: 'order_items.csv', columns: 'order_item_id, order_id, product_id, quantity, unit_price' },
    ],
    deliverables: ['Jupyter-style analysis notebook', 'Cleaned datasets', 'Summary statistics', 'Visualizations', 'Findings memo'],
    requiredSkills: ['pandas', 'Data cleaning', 'Groupby', 'Merge', 'matplotlib', 'EDA'],
    recommendedWorkflow: ['Load data', 'Clean and merge', 'Explore distributions', 'Analyze trends', 'Visualize', 'Summarize'],
    milestones: [
      { id: 'py-p1', title: 'Data loading', description: 'Read CSVs and inspect structure' },
      { id: 'py-p2', title: 'Analysis', description: 'Groupby, merge, and EDA' },
      { id: 'py-p3', title: 'Deliverable', description: 'Charts and written findings' },
    ],
    rubric: [
      { criterion: 'Code quality', weight: 25, description: 'Readable, reproducible pandas code' },
      { criterion: 'Analysis depth', weight: 35, description: 'Meaningful exploration and insights' },
      { criterion: 'Visualizations', weight: 25, description: 'Clear, labeled charts' },
      { criterion: 'Communication', weight: 15, description: 'Findings memo for non-technical readers' },
    ],
    reflectionQuestions: ['What additional data would strengthen your analysis?'],
    exampleDeliverable: 'Analysis with revenue trend line, category bar chart, and top-customer table.',
  },
  {
    id: 'project-statistics-analysis',
    title: 'Statistics Business Analysis Project',
    subjectIds: ['statistics'],
    difficulty: 'advanced',
    businessContext: `${NORTHSTAR.name} marketing ran an A/B test on checkout flow and needs statistical validation before rollout.`,
    stakeholderRequest: 'Analyze the experiment with proper hypothesis testing, confidence intervals, and a business recommendation.',
    datasetOverview: 'A/B test results: control and treatment groups with conversion rates and sample sizes.',
    dataDictionary: [
      { table: 'ab_test', columns: 'group, visitors, conversions, revenue_per_visitor' },
    ],
    deliverables: ['Hypothesis statement', 'Test statistic and p-value', 'Confidence interval', 'Effect size interpretation', 'Recommendation memo'],
    requiredSkills: ['Hypothesis testing', 'Confidence intervals', 'A/B testing', 'Business interpretation'],
    recommendedWorkflow: ['Define hypotheses', 'Check assumptions', 'Run test', 'Calculate CI', 'Interpret practically', 'Recommend action'],
    milestones: [
      { id: 'st-p1', title: 'Setup', description: 'Define null/alternative hypotheses' },
      { id: 'st-p2', title: 'Analysis', description: 'Run test and compute CI' },
      { id: 'st-p3', title: 'Recommendation', description: 'Business decision memo' },
    ],
    rubric: [
      { criterion: 'Methodology', weight: 35, description: 'Correct test and assumptions stated' },
      { criterion: 'Calculation', weight: 25, description: 'Accurate statistics' },
      { criterion: 'Interpretation', weight: 25, description: 'Plain-English business meaning' },
      { criterion: 'Recommendation', weight: 15, description: 'Clear, actionable decision' },
    ],
    reflectionQuestions: ['Would you recommend rollout if results are statistically significant but practically small?'],
    exampleDeliverable: 'Memo with conversion lift, p-value, 95% CI, and rollout recommendation.',
  },
]);

export const achievements = [
  { id: 'achievement-first-lesson', title: 'First Steps', description: 'Complete your first lesson', condition: { type: 'lesson-complete', count: 1 } },
  { id: 'achievement-sql-complete', title: 'SQL Analyst', description: 'Complete all SQL lessons', condition: { type: 'subject-complete', subjectId: 'sql' } },
  { id: 'achievement-all-complete', title: 'Job Ready', description: 'Complete all 114 lessons', condition: { type: 'all-lessons-complete', count: 114 } },
];

export const careerContent = {
  interviewQuestions: {
    sql: [
      { question: 'Explain the difference between INNER JOIN and LEFT JOIN with a Northstar Commerce example.', difficulty: 'intermediate' },
      { question: 'When would you use a window function instead of GROUP BY?', difficulty: 'advanced' },
    ],
    excel: [
      { question: 'Explain when you would use XLOOKUP instead of VLOOKUP.', difficulty: 'intermediate' },
    ],
    general: [
      { question: 'Tell me about a time you translated a vague business question into an analysis plan.', difficulty: 'behavioral' },
    ],
  },
  portfolioGuidance: [
    'Lead with the business question, not the tools used.',
    'Include one Northstar Commerce project per tool (SQL, Excel, Tableau, Power BI, Python, Statistics).',
    'Show before/after metrics when possible.',
  ],
  jobReadinessChecklist: [
    'Completed all 114 Job Ready lessons',
    'Finished all six capstone projects',
    'Can explain findings to a non-technical stakeholder',
    'Practiced 10+ interview questions',
  ],
};
