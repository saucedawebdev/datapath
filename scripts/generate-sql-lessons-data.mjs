/**
 * Generator for sql-lessons-data.js — run: node scripts/generate-sql-lessons-data.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../src/content/job-ready/content');
const OUT = join(OUT_DIR, 'sql-lessons-data.js');

const NS = 'Northstar Commerce';
const REGIONS = 'West, Midwest, South, Northeast';
const PROJECT = 'SQL Business Analysis Project';

const LEGACY_IDS = {
  'What Is a Database?': 'sql-lesson-intro-databases',
  SELECT: 'sql-lesson-select-basics',
  WHERE: 'sql-lesson-where-filtering',
  'ORDER BY': 'sql-lesson-order-by-limit',
  DISTINCT: 'sql-lesson-distinct-aliases',
  'GROUP BY': 'sql-lesson-group-by',
  'INNER JOIN': 'sql-lesson-inner-join',
};

function slugify(text) {
  return String(text).toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function lid(title) {
  return LEGACY_IDS[title] || `sql-lesson-${slugify(title)}`;
}

function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');
}

function js(val, indent = 2) {
  const p = ' '.repeat(indent);
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'string') return `'${esc(val)}'`;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    if (val.every((v) => typeof v === 'string')) {
      return `[\n${p}  ${val.map((s) => `'${esc(s)}'`).join(`,\n${p}  `)},\n${p}]`;
    }
    return `[\n${val.map((v) => `${p}  ${js(v, indent + 2)}`).join(`,\n`)},\n${p}]`;
  }
  const lines = Object.entries(val).map(([k, v]) => `${p}  ${k}: ${js(v, indent + 2)}`);
  return `{\n${lines.join(',\n')},\n${' '.repeat(indent - 2)}}`;
}

function stakeholder(role, q) {
  return `${role} at ${NS}: "${q}"`;
}

function buildPartial(spec) {
  return {
    learningObjectives: spec.objectives,
    plainEnglish: spec.plainEnglish,
    whatItDoes: spec.whatItDoes,
    whyItMatters: spec.whyItMatters,
    whenToUse: spec.whenToUse,
    stakeholderQuestion: spec.stakeholderQuestion,
    walkthrough: spec.walkthrough,
    syntax: spec.syntax,
    componentBreakdown: spec.components,
    sampleInput: spec.sampleInput,
    expectedOutput: spec.expectedOutput,
    commonMistakes: spec.mistakes,
    bestPractices: spec.practices,
    guidedExample: spec.guidedExample,
    tags: spec.tags,
    projectConnectionText: spec.projectConnectionText,
  };
}

function buildQuiz(lessonId, questions) {
  return {
    id: `${lessonId}-quiz`,
    subjectId: 'sql',
    lessonId,
    questions: questions.map((q, i) => ({
      id: `${lessonId}-q${i + 1}`,
      type: 'multiple-choice',
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
  };
}

function guidedEx(lessonId, data) {
  return {
    id: `${lessonId}-exercise`,
    subjectId: 'sql',
    lessonId,
    title: data.title,
    type: data.type || 'conceptual',
    difficulty: data.difficulty || 'beginner',
    instructions: data.instructions,
    hint: data.hint,
    expectedAnswer: data.expectedAnswer,
    explanation: data.explanation,
    validation: data.validation || null,
    skillTags: data.skillTags || [],
  };
}

function challengeEx(lessonId, data) {
  return {
    id: `${lessonId}-challenge`,
    subjectId: 'sql',
    lessonId,
    title: data.title,
    type: data.type || 'sql',
    difficulty: data.difficulty || 'intermediate',
    instructions: data.instructions,
    hint: data.hint,
    expectedAnswer: data.expectedAnswer,
    explanation: data.explanation,
    validation: data.validation || null,
    skillTags: data.skillTags || [],
  };
}

const LESSONS = [
  {
    title: 'What Is a Database?',
    objectives: [
      `Explain what a relational database is and how ${NS} stores operational data`,
      'Identify the main tables analysts query for sales, customer, and marketing questions',
      'Describe why SQL is the standard language for pulling trusted business metrics',
    ],
    plainEnglish: `A database is ${NS}'s central record system — every order, customer signup, product price, and support ticket lives in organized tables that analysts query with SQL instead of copying spreadsheets by hand.`,
    whatItDoes: 'Persists structured business data in tables so multiple teams can read, filter, and aggregate the same source of truth without overwriting each other\'s work.',
    whyItMatters: `When the VP of Sales asks for Midwest revenue by channel, a junior analyst at ${NS} pulls from the orders and customers tables in the warehouse — not from a manager's personal Excel file that might be outdated or incomplete.`,
    whenToUse: 'Any time you need repeatable metrics, historical trends, or answers that combine customers, orders, products, and campaigns from company systems.',
    stakeholderQuestion: stakeholder('Marketing Director', 'Can you tell me how many active customers we had in the Northeast last quarter based on our database, not a manual export?'),
    walkthrough: '1. Connect to the Northstar Commerce analytics database.\n2. Browse available schemas and locate core tables: customers, orders, order_items, products.\n3. Run a simple row count on orders to confirm access.\n4. Note table definitions and grain (one row per order, per line item, etc.).\n5. Document which environment you queried (sandbox vs production read replica).',
    syntax: '-- Northstar Commerce core entities\n-- customers, orders, order_items, products, marketing_campaigns\nSELECT COUNT(*) AS total_orders FROM orders;',
    components: [
      { part: 'Database', explanation: `The container holding all ${NS} tables and views used for analytics.` },
      { part: 'Schema', explanation: 'A logical grouping of related tables, often separating raw operational data from reporting views.' },
      { part: 'Table', explanation: 'A structured collection of rows about one entity, such as orders or products.' },
      { part: 'SQL client', explanation: 'The tool you use to send queries and receive result sets from the database.' },
    ],
    sampleInput: `${NS} orders table: 1.8M rows spanning 2022–2025 with columns order_id, customer_id, order_date, status, channel.`,
    expectedOutput: 'An analyst runs SELECT COUNT(*) FROM orders and returns 1,842,391 — a verified total the finance team can reconcile.',
    mistakes: [
      'Assuming the only copy of sales data is in a shared spreadsheet on the marketing drive',
      'Querying production write databases instead of the read-only analytics replica',
      'Not confirming whether cancelled orders are included in raw tables',
    ],
    practices: [
      'Start every analysis by confirming table grain and last refresh time with data engineering',
      'Use LIMIT on exploratory queries before pulling wide result sets',
      'Keep a personal glossary of Northstar table and column business definitions',
    ],
    guidedExample: {
      description: 'A marketing coordinator asks how many website orders Northstar processed last month. You query the orders table filtered by channel instead of counting rows in a CSV export.',
      steps: ['Open the analytics database connection', 'Inspect the orders table columns', 'Filter order_date to last month and channel = website', 'Return COUNT(*) to the stakeholder'],
    },
    tags: ['fundamentals', 'database', 'northstar'],
    projectConnectionText: `Understanding Northstar's database layout is the first step in the ${PROJECT} capstone.`,
    quiz: [
      { question: `What is the primary purpose of ${NS}'s relational database?`, options: ['To replace all spreadsheets permanently', 'To store structured business data that analysts query with SQL', 'To design marketing graphics', 'To send promotional emails'], correctIndex: 1, explanation: 'The database holds structured operational data — orders, customers, products — that analysts query for repeatable metrics.' },
      { question: 'Which Northstar table would you inspect first to count total orders?', options: ['employees', 'orders', 'website_sessions', 'monthly_targets'], correctIndex: 1, explanation: 'The orders table stores one row per order — the natural starting point for order volume questions.' },
      { question: 'Why do analysts prefer the database over ad hoc spreadsheet copies?', options: ['Spreadsheets cannot contain numbers', 'The database provides a single source of truth with consistent definitions', 'SQL is faster to learn than Excel', 'Managers cannot open spreadsheets'], correctIndex: 1, explanation: 'Centralized data reduces version conflicts and ensures everyone calculates metrics from the same records.' },
    ],
    exercise: { title: 'Identify Northstar Core Tables', instructions: 'List the four Northstar Commerce tables you would use to answer: "What did customer 1042 buy, and how much did they spend?"', hint: 'Think about who the customer is, what they ordered, and what products were on each line.', expectedAnswer: 'customers, orders, order_items, products', explanation: 'customers identifies the buyer, orders captures the purchase event, order_items lists quantities and prices, and products supplies product names and categories.', type: 'conceptual' },
    challenge: null,
  },
  {
    title: 'Tables, Rows, and Columns',
    objectives: [
      'Describe how Northstar data is organized into tables with rows and columns',
      'Identify the grain of common Northstar tables such as orders versus order_items',
      'Explain how column names encode the type of information stored in each field',
    ],
    plainEnglish: 'Tables are like structured spreadsheets in the database: each row is one record (a single order or customer), and each column is one attribute (order_date, region, or product_name).',
    whatItDoes: 'Defines the shape of stored data so every query returns predictable columns and one row represents exactly one entity at the table\'s grain.',
    whyItMatters: `A junior analyst at ${NS} who confuses the orders table (one row per order) with order_items (one row per product line) will double-count revenue — a mistake the finance team catches immediately.`,
    whenToUse: 'Before writing any query, when onboarding to a new dataset, or when explaining query results to stakeholders who think in spreadsheet terms.',
    stakeholderQuestion: stakeholder('Operations Manager', 'When you say "842 orders," are you counting order lines or complete checkout transactions?'),
    walkthrough: '1. Open the orders table and note one row equals one checkout.\n2. Open order_items and note multiple rows can share the same order_id.\n3. List columns and infer data types from names (order_date, quantity, unit_price).\n4. Sample five rows with SELECT * ... LIMIT 5.\n5. Write down the grain in plain English for your analysis doc.',
    syntax: 'SELECT order_id, customer_id, order_date, status\nFROM orders\nLIMIT 5;',
    components: [
      { part: 'Table', explanation: 'Named collection of related rows, e.g., products holds every SKU Northstar sells.' },
      { part: 'Row', explanation: 'A single record — one customer, one order, or one order line item.' },
      { part: 'Column', explanation: 'A field shared by every row, such as region or list_price.' },
      { part: 'Grain', explanation: 'What one row represents; critical for correct counts and sums.' },
    ],
    sampleInput: 'order_items sample:\norder_item_id | order_id | product_id | quantity | unit_price\n501 | 9001 | 12 | 2 | 29.99\n502 | 9001 | 44 | 1 | 89.00',
    expectedOutput: 'You recognize order 9001 has two line items and revenue equals quantity × unit_price summed across rows.',
    mistakes: ['Counting rows in order_items and calling it "order count"', 'Assuming every table has a column named id without checking', 'Ignoring duplicate rows that indicate a data quality issue'],
    practices: ['State the grain in your analysis header before aggregating', 'Use LIMIT when exploring unfamiliar tables', 'Join to a parent table when you need order-level facts from line-level data'],
    guidedExample: { description: 'Explore the products table to see how Northstar categorizes desk lamps versus office chairs.', sql: "SELECT product_id, product_name, category, list_price\nFROM products\nWHERE category = 'Office Furniture'\nLIMIT 10;" },
    tags: ['fundamentals', 'tables', 'schema'],
    projectConnectionText: `Correct table grain prevents inflated revenue totals in the ${PROJECT}.`,
    quiz: [
      { question: "In Northstar's order_items table, what does one row represent?", options: ['One customer', 'One product in one order', 'One marketing campaign', 'One employee'], correctIndex: 1, explanation: 'order_items stores line-level detail — each row is a product quantity on a specific order.' },
      { question: 'Which column would you expect on every row of the customers table?', options: ['unit_price', 'customer_id', 'order_date', 'campaign_name'], correctIndex: 1, explanation: 'customer_id uniquely identifies each customer row in the customers table.' },
      { question: 'Why is grain important when counting orders?', options: ['It determines which SQL keywords are legal', 'It defines what a single row represents so counts are not inflated', 'It changes the database password', 'It only matters for chart colors'], correctIndex: 1, explanation: 'Counting line items instead of orders inflates order volume — grain clarifies the unit of analysis.' },
    ],
    exercise: { title: 'Match Table to Grain', instructions: 'For each Northstar table — customers, orders, order_items, products — write one sentence describing what a single row represents.', hint: 'Ask yourself: "One row = one ___?"', expectedAnswer: 'customers: one shopper; orders: one checkout; order_items: one product line on an order; products: one SKU', explanation: 'Documenting grain upfront prevents double-counting in joins and aggregates.', type: 'conceptual' },
    challenge: { title: 'Sample the Orders Table', instructions: 'Write SQL to return the first 10 rows of order_id, customer_id, order_date, and channel from orders.', hint: 'Use SELECT, FROM, and LIMIT.', expectedAnswer: 'SELECT order_id, customer_id, order_date, channel\nFROM orders\nLIMIT 10;', explanation: 'LIMIT keeps exploration safe on large Northstar tables with millions of rows.', type: 'sql' },
  },
];

// Append remaining 38 lessons via compact builder
function topicLesson(title, topic, opts = {}) {
  const id = lid(title);
  const baseWhy = opts.whyItMatters || `Junior analysts at ${NS} use ${topic} daily when ${opts.whyContext || 'building reports from orders, customers, and product data'}.`;
  return {
    title,
    objectives: opts.objectives || [
      `Write SQL using ${topic} on ${NS} operational tables`,
      `Apply ${topic} to answer realistic stakeholder questions about orders and customers`,
      `Avoid common ${topic} mistakes that produce incorrect Northstar metrics`,
    ],
    plainEnglish: opts.plainEnglish || `${topic} is a core SQL skill for querying ${NS} data about customers, orders, products, and support tickets across ${REGIONS} regions.`,
    whatItDoes: opts.whatItDoes || `${topic} helps analysts retrieve, transform, or summarize rows from Northstar Commerce tables.`,
    whyItMatters: baseWhy,
    whenToUse: opts.whenToUse || `When stakeholders ask questions that require ${topic.toLowerCase()} on ${NS} sales, marketing, or support data.`,
    stakeholderQuestion: opts.stakeholderQuestion || stakeholder('Sales Manager', opts.stakeholderQ || `Show me ${topic.toLowerCase()} results for last month by region.`),
    walkthrough: opts.walkthrough || `1. Identify the Northstar tables needed.\n2. Write SELECT with ${topic}.\n3. Validate row counts with LIMIT.\n4. Share results with clear column aliases.\n5. Document filters and assumptions.`,
    syntax: opts.syntax || `-- ${topic} example on Northstar data\nSELECT * FROM orders LIMIT 5;`,
    components: opts.components || [
      { part: topic, explanation: `SQL feature applied to ${NS} tables.` },
      { part: 'FROM', explanation: 'Source table such as orders or customers.' },
      { part: 'Filter / Group', explanation: 'Optional logic to narrow or summarize rows.' },
    ],
    sampleInput: opts.sampleInput || `${NS} sample rows from orders and customers tables.`,
    expectedOutput: opts.expectedOutput || 'A result set that answers the stakeholder question with verifiable row counts.',
    mistakes: opts.mistakes || [`Misapplying ${topic} on the wrong table grain`, 'Forgetting to filter cancelled orders when calculating revenue', 'Not validating results against a known total'],
    practices: opts.practices || ['Test queries with LIMIT before full runs', 'Use meaningful column aliases for stakeholders', 'Document date ranges and filters in query comments'],
    guidedExample: opts.guidedExample || { description: `Apply ${topic} to a Northstar orders question.`, sql: opts.guidedSql },
    tags: opts.tags || [slugify(topic), 'northstar'],
    projectConnectionText: opts.projectConnectionText || `${topic} skills apply directly in the ${PROJECT}.`,
    quiz: opts.quiz || [
      { question: `What does ${topic} help you do with Northstar data?`, options: ['Send marketing emails', opts.quizCorrect || 'Query and analyze structured business tables', 'Design warehouse layouts', 'Replace the database'], correctIndex: 1, explanation: `${topic} is part of SQL analysis on operational tables.` },
      { question: 'Which Northstar table holds one row per checkout?', options: ['order_items', 'orders', 'products', 'marketing_campaigns'], correctIndex: 1, explanation: 'orders stores one row per order event.' },
      { question: 'Why validate with LIMIT first?', options: ['LIMIT makes queries permanent', 'LIMIT reduces risk on large Northstar tables during exploration', 'LIMIT is required by SQL', 'LIMIT sorts results'], correctIndex: 1, explanation: 'Exploratory queries on millions of rows should start small.' },
    ],
    exercise: opts.exercise || { title: `${topic} Concept Check`, instructions: `In one sentence, describe when you would use ${topic} on ${NS} order data.`, hint: 'Think about the stakeholder question for this lesson.', expectedAnswer: opts.exerciseAnswer || `Use ${topic} when the business question requires that SQL technique on orders, customers, or related tables.`, explanation: 'Matching the SQL technique to the business question prevents wrong answers.', type: 'conceptual' },
    challenge: opts.challenge || null,
  };
}

const MORE = [
  topicLesson('SQL Data Types', 'SQL data types', {
    plainEnglish: 'SQL data types tell the database what kind of value each column holds — integers for quantities, decimals for prices, text for product names, and dates for order timestamps at Northstar Commerce.',
    whatItDoes: 'Enforces valid values per column so calculations, sorting, and comparisons behave predictably.',
    whyItMatters: `When a ${NS} analyst treats order_date as text instead of a date, monthly revenue trends sort alphabetically and March appears before February — eroding trust with the finance director.`,
    stakeholderQuestion: stakeholder('Finance Analyst', 'Why does your report show zero revenue for orders that clearly have amounts in the raw export?'),
    walkthrough: '1. Inspect column types in the schema browser.\n2. Note numeric columns (quantity, unit_price) vs text (status, channel).\n3. Cast text dates with DATE() when imports stored them as strings.\n4. Verify arithmetic uses numeric types, not concatenated strings.\n5. Document type assumptions in your query comments.',
    syntax: "SELECT order_id, CAST(unit_price AS REAL) AS price\nFROM order_items\nWHERE quantity > 0;",
    components: [
      { part: 'INTEGER', explanation: 'Whole numbers like quantity or customer_id.' },
      { part: 'REAL / DECIMAL', explanation: 'Fractional values such as unit_price and list_price.' },
      { part: 'TEXT', explanation: 'Names, emails, categories, and status labels.' },
      { part: 'DATE / DATETIME', explanation: 'order_date, signup_date, and campaign start dates.' },
    ],
    sampleInput: 'order_items.unit_price stored as TEXT: "29.99" from a bad import.',
    expectedOutput: 'After CAST(unit_price AS REAL), SUM(quantity * unit_price) returns correct revenue.',
    guidedExample: { description: 'Calculate line revenue ensuring unit_price is numeric.', sql: 'SELECT order_id, SUM(quantity * CAST(unit_price AS REAL)) AS line_revenue\nFROM order_items\nGROUP BY order_id;' },
    quiz: [
      { question: 'Which type fits Northstar product list_price?', options: ['TEXT only', 'REAL or DECIMAL', 'BLOB', 'BOOLEAN'], correctIndex: 1, explanation: 'Prices are fractional numbers best stored as REAL or DECIMAL.' },
      { question: 'What happens if you sort order_date stored as TEXT?', options: ['Chronological order always', 'Alphabetical order that breaks chronology', 'Random order', 'SQL error always'], correctIndex: 1, explanation: 'Text sort treats dates incorrectly vs true date sort.' },
      { question: 'Which column should be INTEGER at Northstar?', options: ['product_name', 'quantity', 'email', 'category'], correctIndex: 1, explanation: 'quantity counts whole units purchased.' },
    ],
    exercise: { title: 'Pick the Right Type', instructions: 'Match each Northstar field to INTEGER, TEXT, or DATE: signup_date, channel, quantity.', hint: 'Dates end in _date; channels are labels.', expectedAnswer: 'signup_date: DATE; channel: TEXT; quantity: INTEGER', explanation: 'Correct types prevent silent calculation bugs.', type: 'conceptual' },
    challenge: { title: 'Cast and Sum', instructions: 'Write SQL to sum quantity * unit_price as line_total from order_items for order_id 9001, casting unit_price to REAL.', hint: 'Use CAST(unit_price AS REAL).', expectedAnswer: 'SELECT SUM(quantity * CAST(unit_price AS REAL)) AS line_total\nFROM order_items\nWHERE order_id = 9001;', explanation: 'Casting ensures numeric multiplication.', type: 'sql' },
  }),
  topicLesson('Primary Keys', 'primary keys', {
    plainEnglish: `A primary key is the unique identifier for each row in a table — customer_id in customers, order_id in orders — so ${NS} analysts can join and count records without mixing up two different shoppers.`,
    whatItDoes: 'Guarantees each row is uniquely identifiable and provides the anchor for relationships between tables.',
    whyItMatters: `Without knowing that customer_id is the primary key of customers, a ${NS} analyst might join on email and duplicate rows when two accounts share an address — inflating lifetime value.`,
    stakeholderQuestion: stakeholder('Data Engineer', 'Can you confirm you are counting distinct order_id values, not row numbers from your export?'),
    syntax: '-- Primary keys at Northstar:\n-- customers.customer_id, orders.order_id, products.product_id\nSELECT customer_id, first_name, last_name FROM customers WHERE customer_id = 1042;',
    components: [
      { part: 'Primary key', explanation: 'Unique, non-null column(s) identifying one row.' },
      { part: 'customer_id', explanation: 'Primary key on the customers table.' },
      { part: 'order_id', explanation: 'Primary key on the orders table.' },
    ],
    sampleInput: 'customers: customer_id 1042 appears exactly once; duplicate customer_id rows indicate a data quality issue.',
    expectedOutput: 'Query by customer_id = 1042 returns one customer row.',
    guidedExample: { description: 'Look up a single Northstar customer by primary key.', sql: 'SELECT customer_id, first_name, last_name, region\nFROM customers\nWHERE customer_id = 1042;' },
    quiz: [
      { question: 'What is the primary key on Northstar customers?', options: ['email', 'customer_id', 'region', 'signup_date'], correctIndex: 1, explanation: 'customer_id uniquely identifies each customer row.' },
      { question: 'Why must primary keys be unique?', options: ['To save disk space', 'So each row can be referenced exactly once in joins and counts', 'SQL requires duplicate keys', 'To encrypt data'], correctIndex: 1, explanation: 'Uniqueness prevents ambiguous joins and double-counting.' },
      { question: 'Can a primary key be NULL?', options: ['Yes, always', 'No — primary keys must not be null', 'Only on orders table', 'Only in SQLite'], correctIndex: 1, explanation: 'NULL would mean the row cannot be uniquely identified.' },
    ],
    challenge: { title: 'Find by Primary Key', instructions: 'Write SQL to return product_name and category for product_id 12.', hint: 'Filter products on product_id.', expectedAnswer: "SELECT product_name, category\nFROM products\nWHERE product_id = 12;", explanation: 'Filtering on primary keys returns at most one row per id.', type: 'sql' },
  }),
  topicLesson('Foreign Keys', 'foreign keys', {
    plainEnglish: `Foreign keys link rows between tables — orders.customer_id points to customers.customer_id so ${NS} can attach region and segment to each purchase.`,
    whatItDoes: 'Enforces referential relationships so child rows reference valid parent rows.',
    whyItMatters: `When ${NS} support analyzes tickets per region, joining support_tickets.customer_id to customers.customer_id relies on that foreign key relationship — wrong keys orphan tickets from regional rollups.`,
    stakeholderQuestion: stakeholder('Support Lead', 'How many tickets did Midwest customers open last month?'),
    syntax: '-- orders.customer_id → customers.customer_id\n-- order_items.order_id → orders.order_id\nSELECT o.order_id, c.region\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id;',
    components: [
      { part: 'Foreign key', explanation: 'Column in child table referencing parent primary key.' },
      { part: 'orders.customer_id', explanation: 'Links each order to exactly one customer.' },
      { part: 'order_items.order_id', explanation: 'Links line items to their parent order.' },
    ],
    sampleInput: 'Order 9001 has customer_id 1042; customers row 1042 has region Midwest.',
    expectedOutput: 'Join returns order 9001 with region Midwest.',
    guidedExample: { description: 'Join orders to customers using the foreign key.', sql: 'SELECT o.order_id, o.order_date, c.region\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nLIMIT 10;' },
    quiz: [
      { question: 'Which column is a foreign key in orders?', options: ['order_id', 'customer_id', 'order_date', 'status'], correctIndex: 1, explanation: 'customer_id references customers.customer_id.' },
      { question: 'What does order_items.order_id reference?', options: ['products.product_id', 'orders.order_id', 'customers.customer_id', 'campaign_id'], correctIndex: 1, explanation: 'Each line item belongs to one order.' },
      { question: 'Why do foreign keys matter for analysts?', options: ['They change chart colors', 'They define how tables join for enriched reports', 'They replace WHERE clauses', 'They only affect indexes'], correctIndex: 1, explanation: 'Joins depend on foreign key relationships between tables.' },
    ],
    challenge: { title: 'Join Orders to Customers', instructions: 'Write SQL returning order_id and region for the first 5 orders.', hint: 'JOIN orders and customers ON customer_id.', expectedAnswer: 'SELECT o.order_id, c.region\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nLIMIT 5;', explanation: 'Foreign keys define the join condition.', type: 'sql' },
  }),
  topicLesson('Table Relationships', 'table relationships', {
    plainEnglish: `${NS} data forms a web of relationships: customers place orders, orders contain order_items, order_items reference products, and marketing_campaigns tie to sessions — analysts map these links before writing joins.`,
    whatItDoes: 'Describes how entities connect through keys so multi-table queries return coherent business facts.',
    whyItMatters: `A ${NS} analyst building campaign ROI must trace marketing_campaigns → website_sessions → orders → order_items — missing a relationship step attributes revenue to the wrong channel.`,
    stakeholderQuestion: stakeholder('CMO', 'Which campaigns drove orders from existing customers versus new signups?'),
    walkthrough: '1. Draw customers at the center with orders branching off.\n2. Attach order_items to orders and products to order_items.\n3. Link marketing_campaigns to sessions and customers.\n4. Note one-to-many paths (one customer, many orders).\n5. Plan join order from fact to dimension tables.',
    syntax: '-- Relationship path for order revenue:\n-- customers ← orders ← order_items → products',
    components: [
      { part: 'One-to-many', explanation: 'One customer has many orders.' },
      { part: 'Many-to-one', explanation: 'Many order_items belong to one order.' },
      { part: 'Fact table', explanation: 'orders and order_items hold measurable events.' },
      { part: 'Dimension table', explanation: 'customers and products hold descriptive attributes.' },
    ],
    sampleInput: 'Customer 1042 → 3 orders → 7 order_items → 5 distinct products.',
    expectedOutput: 'Relationship map showing join keys at each step.',
    guidedExample: { description: 'Trace revenue from customer to product.', sql: 'SELECT c.customer_id, p.product_name, oi.quantity * oi.unit_price AS revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nWHERE c.customer_id = 1042;' },
    quiz: [
      { question: 'What relationship exists between customers and orders?', options: ['One-to-one', 'One customer to many orders', 'Many customers per order row', 'No relationship'], correctIndex: 1, explanation: 'Each order belongs to one customer; customers can have many orders.' },
      { question: 'Which tables sit between customers and products in a revenue query?', options: ['employees only', 'orders and order_items', 'monthly_targets', 'support_tickets only'], correctIndex: 1, explanation: 'Revenue paths through orders and line items.' },
      { question: 'What is a dimension table at Northstar?', options: ['orders', 'order_items', 'customers', 'website_sessions only'], correctIndex: 2, explanation: 'customers holds descriptive attributes used for grouping.' },
    ],
    challenge: { title: 'Map the Join Path', instructions: 'List the four tables and join keys needed to show product_name and quantity for each order.', hint: 'orders → order_items → products.', expectedAnswer: 'orders.order_id = order_items.order_id; order_items.product_id = products.product_id; tables: orders, order_items, products', explanation: 'Documenting join paths prevents broken multi-table queries.', type: 'conceptual' },
  }),
];

LESSONS.push(...MORE);

// Querying lessons 7-14
const QUERYING = [
  ['SELECT', {
    plainEnglish: 'SELECT is how you ask the database to show data — choose columns from customers, orders, or products at Northstar Commerce.',
    whatItDoes: 'Retrieves columns from tables without changing underlying data.',
    whyItMatters: `The ${NS} marketing team requests customer email lists weekly; SELECT is the first statement every junior analyst writes to pull first_name, last_name, and email from the customers table.`,
    stakeholderQuestion: stakeholder('Marketing Coordinator', 'Can you send me Northeast customer names and emails for our spring campaign?'),
    syntax: 'SELECT first_name, last_name, email\nFROM customers\nWHERE region = \'Northeast\'\nLIMIT 100;',
    components: [
      { part: 'SELECT', explanation: 'Lists columns to return; use * for all columns during exploration only.' },
      { part: 'FROM', explanation: 'Names the source table.' },
      { part: 'Semicolon', explanation: 'Ends the statement — good habit in every query.' },
    ],
    sampleInput: 'customers columns: customer_id, first_name, last_name, email, region, signup_date, segment',
    expectedOutput: 'customer_id | first_name | last_name | email\n1042 | Jordan | Lee | jlee@example.com',
    guidedExample: { description: 'Pull customer contact info for a campaign list.', sql: 'SELECT first_name, last_name, email\nFROM customers\nWHERE region = \'West\'\nLIMIT 10;' },
    quiz: [
      { question: 'What two clauses are required in a basic SELECT query?', options: ['SELECT and WHERE', 'SELECT and FROM', 'FROM and GROUP BY', 'SELECT and JOIN'], correctIndex: 1, explanation: 'Every SELECT needs columns and a source table.' },
      { question: 'Why avoid SELECT * on large Northstar tables in production?', options: ['It is illegal SQL', 'It returns unnecessary columns and slows queries', 'It deletes data', 'It only returns one row'], correctIndex: 1, explanation: 'Naming specific columns is safer and faster on wide tables.' },
      { question: 'Which table holds customer emails?', options: ['orders', 'customers', 'products', 'order_items'], correctIndex: 1, explanation: 'Email is a customer attribute stored in customers.' },
    ],
    exercise: { title: 'Select Product Columns', instructions: 'Write SQL to return product_name, category, and list_price from products, limited to 5 rows.', hint: 'SELECT columns FROM products LIMIT 5.', expectedAnswer: 'SELECT product_name, category, list_price\nFROM products\nLIMIT 5;', explanation: 'SELECT with LIMIT is the standard exploration pattern.', type: 'sql' },
    challenge: { title: 'Regional Customer Sample', instructions: 'Write SQL returning customer_id, first_name, and region for South region customers, limit 20.', hint: 'Add WHERE region = \'South\'.', expectedAnswer: "SELECT customer_id, first_name, region\nFROM customers\nWHERE region = 'South'\nLIMIT 20;", explanation: 'Combining SELECT, WHERE, and LIMIT filters a segment safely.', type: 'sql' },
  }],
  ['WHERE', {
    plainEnglish: 'WHERE filters rows to only those matching your conditions — like showing only Midwest website orders or support tickets opened in January.',
    whatItDoes: 'Applies row-level filters after the table is identified and before sorting or grouping.',
    whyItMatters: `When ${NS} operations reviews cancelled orders, a junior analyst must filter status correctly — including shipped orders in a cancellation report sends the warehouse team to the wrong pallets.`,
    stakeholderQuestion: stakeholder('Operations Manager', 'How many website orders from the South region shipped last week?'),
    syntax: "SELECT order_id, order_date, channel\nFROM orders\nWHERE region = 'South'\n  AND channel = 'website'\n  AND status = 'shipped';",
    components: [
      { part: 'WHERE', explanation: 'Introduces row filters.' },
      { part: 'Comparison operators', explanation: '=, <>, >, <, >=, <= for matching values.' },
      { part: 'IS NULL', explanation: 'Find missing values — never use = NULL.' },
    ],
    sampleInput: 'orders filtered: channel = website, region IN (West, Midwest), order_date in March 2025',
    expectedOutput: 'Subset of order rows matching all conditions.',
    guidedExample: { description: 'Find shipped website orders.', sql: "SELECT order_id, order_date\nFROM orders\nWHERE channel = 'website'\n  AND status = 'shipped'\nLIMIT 20;" },
    quiz: [
      { question: 'What is wrong with WHERE resolved_date = NULL?', options: ['Nothing', 'Use IS NULL instead of = NULL', 'Use = \'NULL\'', 'NULL cannot appear in WHERE'], correctIndex: 1, explanation: 'SQL requires IS NULL to test for missing values.' },
      { question: 'WHERE filters rows at what stage?', options: ['After GROUP BY', 'Before grouping and aggregation', 'Only in JOINs', 'After ORDER BY'], correctIndex: 1, explanation: 'WHERE filters individual rows before aggregates form.' },
      { question: 'Which filter finds South region customers?', options: ["WHERE region = 'South'", 'WHERE region IS NULL', 'WHERE region LIKE NULL', 'HAVING region = South'], correctIndex: 0, explanation: 'Text values need quotes in standard SQL.' },
    ],
    exercise: { title: 'Filter Orders by Status', instructions: "Write SQL returning order_id and status for orders with status = 'cancelled', limit 10.", hint: 'WHERE status = \'cancelled\'', expectedAnswer: "SELECT order_id, status\nFROM orders\nWHERE status = 'cancelled'\nLIMIT 10;", explanation: 'WHERE narrows rows before returning results.', type: 'sql' },
    challenge: { title: 'Multi-Filter Query', instructions: "Write SQL for order_id and channel where region = 'Northeast' AND channel = 'retail_partner'.", hint: 'Combine conditions with AND.', expectedAnswer: "SELECT order_id, channel\nFROM orders\nWHERE region = 'Northeast'\n  AND channel = 'retail_partner';", explanation: 'AND requires all conditions to be true.', type: 'sql' },
  }],
  ['Comparison Operators', {
    plainEnglish: 'Comparison operators (=, <>, >, <, >=, <=) let you filter Northstar rows by thresholds — orders over $200, products priced below cost, or tickets open longer than 7 days.',
    whatItDoes: 'Evaluates each row against a value or another column and keeps rows where the comparison is true.',
    whyItMatters: `${NS} finance flags orders where total line revenue exceeds $1,000 for fraud review; comparison operators define those thresholds in SQL.`,
    stakeholderQuestion: stakeholder('Finance Manager', 'List orders where total line revenue exceeded $500 last month.'),
    syntax: 'SELECT oi.order_id, SUM(oi.quantity * oi.unit_price) AS order_total\nFROM order_items oi\nGROUP BY oi.order_id\nHAVING SUM(oi.quantity * oi.unit_price) > 500;',
    guidedExample: { description: 'Find high-value order lines.', sql: 'SELECT order_item_id, quantity, unit_price\nFROM order_items\nWHERE unit_price > 100\nLIMIT 10;' },
    quiz: [
      { question: 'Which operator means "not equal"?', options: ['=', '<>', '>', 'LIKE'], correctIndex: 1, explanation: '<> (or !=) returns rows where values differ.' },
      { question: 'Which query finds products with list_price under $25?', options: ['WHERE list_price < 25', 'WHERE list_price = \'under 25\'', 'HAVING list_price < 25 without GROUP BY', 'WHERE list_price LIKE 25'], correctIndex: 0, explanation: '< compares numeric prices to a threshold.' },
      { question: 'Can you compare order_date to a date string?', options: ['Never', 'Yes, when types align or with casting', 'Only with JOIN', 'Only in SQLite'], correctIndex: 1, explanation: 'Dates compare correctly when stored as DATE types.' },
    ],
    challenge: { title: 'Price Threshold Filter', instructions: 'Write SQL returning product_name and list_price for products where list_price >= 75.', hint: 'Use >= on list_price.', expectedAnswer: 'SELECT product_name, list_price\nFROM products\nWHERE list_price >= 75;', explanation: '>= includes products priced exactly at the threshold.', type: 'sql' },
  }],
  ['AND, OR, and NOT', {
    plainEnglish: 'AND requires every condition to be true; OR keeps rows matching any condition; NOT flips a condition — essential when combining region, channel, and segment filters at Northstar.',
    whatItDoes: 'Combines multiple boolean conditions into one WHERE clause.',
    whyItMatters: `A ${NS} analyst asked for "West or Midwest website orders" who writes AND instead of OR returns nearly zero rows — misstating regional revenue in the Monday standup.`,
    stakeholderQuestion: stakeholder('Sales Director', 'Show me orders from West OR Midwest on website OR retail_partner channels.'),
    syntax: "SELECT order_id, region, channel\nFROM orders\nWHERE (region = 'West' OR region = 'Midwest')\n  AND (channel = 'website' OR channel = 'retail_partner');",
    guidedExample: { description: 'Combine region and channel filters with parentheses.', sql: "SELECT order_id, region, channel\nFROM orders\nWHERE region IN ('West', 'Midwest')\n  AND status <> 'cancelled'\nLIMIT 15;" },
    quiz: [
      { question: 'What does AND do in a WHERE clause?', options: ['Either condition can be true', 'All conditions must be true', 'Negates conditions', 'Sorts results'], correctIndex: 1, explanation: 'AND requires every connected condition to pass.' },
      { question: 'Why use parentheses with AND and OR?', options: ['Required by SQLite only', 'To control which conditions group together', 'To make queries run faster always', 'To alias columns'], correctIndex: 1, explanation: 'Parentheses prevent logic errors from operator precedence.' },
      { question: 'NOT status = \'cancelled\' excludes what?', options: ['Only NULL statuses', 'Rows where status equals cancelled', 'All rows', 'Only shipped rows'], correctIndex: 1, explanation: 'NOT inverts the condition — cancelled rows drop out.' },
    ],
    challenge: { title: 'OR Filter Practice', instructions: "Write SQL for customers in South OR Northeast with segment = 'premium'.", hint: 'Use OR for regions and AND for segment.', expectedAnswer: "SELECT customer_id, region, segment\nFROM customers\nWHERE (region = 'South' OR region = 'Northeast')\n  AND segment = 'premium';", explanation: 'Parentheses keep OR logic separate from AND.', type: 'sql' },
  }],
  ['ORDER BY', {
    plainEnglish: 'ORDER BY sorts your results — newest orders first, highest list_price first, or regions alphabetically — so stakeholders see ranked Northstar data.',
    whatItDoes: 'Sorts the final result set by one or more columns ascending (ASC) or descending (DESC).',
    whyItMatters: `${NS} merchandising reviews top-selling products each Monday; without ORDER BY DESC on revenue, the report shows random rows and hides bestsellers.`,
    stakeholderQuestion: stakeholder('Merchandising Manager', 'What are our top 15 products by list_price?'),
    syntax: 'SELECT product_name, list_price\nFROM products\nORDER BY list_price DESC\nLIMIT 15;',
    guidedExample: { description: 'Rank products by price.', sql: 'SELECT product_name, category, list_price\nFROM products\nORDER BY list_price DESC\nLIMIT 10;' },
    quiz: [
      { question: 'What is the default sort direction for ORDER BY?', options: ['DESC', 'ASC (ascending)', 'Random', 'No default'], correctIndex: 1, explanation: 'ASC is default — low to high, A to Z.' },
      { question: 'Why pair ORDER BY with LIMIT for top-N reports?', options: ['LIMIT sorts data', 'ORDER BY ranks rows; LIMIT keeps the top N', 'ORDER BY is optional for top-N', 'LIMIT replaces ORDER BY'], correctIndex: 1, explanation: 'Sort first, then cap row count for meaningful top lists.' },
      { question: 'Can you sort by multiple columns?', options: ['No', 'Yes — sort by region then order_date', 'Only in PostgreSQL', 'Only with GROUP BY'], correctIndex: 1, explanation: 'Multiple sort keys break ties — region then date, for example.' },
    ],
    challenge: { title: 'Sort Orders by Date', instructions: 'Write SQL returning order_id and order_date from orders, newest first, limit 10.', hint: 'ORDER BY order_date DESC', expectedAnswer: 'SELECT order_id, order_date\nFROM orders\nORDER BY order_date DESC\nLIMIT 10;', explanation: 'DESC puts the most recent dates first.', type: 'sql' },
  }],
  ['LIMIT and TOP', {
    plainEnglish: 'LIMIT caps how many rows SQL returns — critical when exploring Northstar tables with millions of orders. SQL Server uses TOP instead of LIMIT for the same purpose.',
    whatItDoes: 'Restricts result size after filtering and sorting.',
    whyItMatters: `Accidentally running SELECT * FROM order_items without LIMIT on ${NS} production could return 4M+ rows and crash a junior analyst's laptop during a live meeting.`,
    stakeholderQuestion: stakeholder('Data Engineering Lead', 'Can you sample 100 rows from the new import before we validate the full file?'),
    syntax: '-- SQLite / PostgreSQL:\nSELECT * FROM orders LIMIT 100;\n\n-- SQL Server:\nSELECT TOP 100 * FROM orders;',
    components: [
      { part: 'LIMIT n', explanation: 'SQLite and PostgreSQL syntax for max rows.' },
      { part: 'TOP n', explanation: 'SQL Server equivalent placed after SELECT.' },
      { part: 'ORDER BY', explanation: 'Pair with LIMIT/TOP for meaningful top-N samples.' },
    ],
    guidedExample: { description: 'Safely sample recent orders.', sql: 'SELECT order_id, order_date, channel\nFROM orders\nORDER BY order_date DESC\nLIMIT 5;' },
    quiz: [
      { question: 'Which clause limits rows in SQLite?', options: ['TOP', 'LIMIT', 'CAP', 'MAXROWS'], correctIndex: 1, explanation: 'SQLite uses LIMIT at the end of the query.' },
      { question: 'What is the risk of LIMIT without ORDER BY for "top customers"?', options: ['Query fails', 'Row order is undefined — not a true top-N', 'Data is deleted', 'JOINs break'], correctIndex: 1, explanation: 'Without sorting, "first N rows" are arbitrary.' },
      { question: 'SQL Server equivalent of LIMIT 10?', options: ['LIMIT 10', 'TOP 10', 'FETCH 10', 'SAMPLE 10 only'], correctIndex: 1, explanation: 'TOP goes immediately after SELECT in T-SQL.' },
    ],
    challenge: { title: 'Sample Support Tickets', instructions: 'Write SQL returning ticket_id, category, opened_date from support_tickets, limit 25.', hint: 'SELECT ... FROM support_tickets LIMIT 25', expectedAnswer: 'SELECT ticket_id, category, opened_date\nFROM support_tickets\nLIMIT 25;', explanation: 'LIMIT makes large-table exploration safe.', type: 'sql' },
  }],
  ['DISTINCT', {
    plainEnglish: 'DISTINCT removes duplicate rows from your result — list each Northstar region once, or count unique customers who ordered, without repeating values.',
    whatItDoes: 'Returns unique combinations of the selected columns.',
    whyItMatters: `${NS} leadership asks "how many regions do we sell in?" — SELECT region FROM orders without DISTINCT repeats West hundreds of thousands of times.`,
    stakeholderQuestion: stakeholder('VP of Sales', 'How many distinct regions appear in our customer base?'),
    syntax: "SELECT DISTINCT region\nFROM customers\nORDER BY region;",
    guidedExample: { description: 'List unique product categories.', sql: 'SELECT DISTINCT category\nFROM products\nORDER BY category;' },
    quiz: [
      { question: 'What does SELECT DISTINCT region return?', options: ['All rows including duplicates', 'One row per unique region value', 'Only NULL regions', 'A count of regions'], correctIndex: 1, explanation: 'DISTINCT deduplicates values in the result.' },
      { question: 'SELECT DISTINCT region, segment returns what?', options: ['Unique regions only', 'Unique combinations of region and segment', 'Only segment counts', 'Error always'], correctIndex: 1, explanation: 'DISTINCT applies to the full column list together.' },
      { question: 'When might GROUP BY be better than DISTINCT?', options: ['Never', 'When you also need COUNT or SUM per group', 'When selecting *', 'When filtering with WHERE'], correctIndex: 1, explanation: 'GROUP BY supports aggregates; DISTINCT only deduplicates.' },
    ],
    challenge: { title: 'Distinct Channels', instructions: 'Write SQL to list each unique channel from orders.', hint: 'SELECT DISTINCT channel', expectedAnswer: 'SELECT DISTINCT channel\nFROM orders;', explanation: 'DISTINCT collapses repeated channel values to one row each.', type: 'sql' },
  }],
  ['Column Aliases', {
    plainEnglish: 'Column aliases rename output headers with AS — turn SUM(quantity * unit_price) into total_revenue so ${NS} managers understand the spreadsheet export without reading SQL.',
    whatItDoes: 'Assigns a temporary display name to a column or expression in the result set.',
    whyItMatters: `When a ${NS} analyst sends query results to the CFO, columns named "expr1" get ignored; aliases like total_revenue and order_count match the language finance uses in board decks.`,
    stakeholderQuestion: stakeholder('CFO', 'Please label the revenue column clearly — last export had cryptic headers.'),
    syntax: 'SELECT region,\n       COUNT(*) AS order_count,\n       SUM(amount) AS total_revenue\nFROM orders\nGROUP BY region;',
    guidedExample: { description: 'Alias aggregated columns for a regional report.', sql: 'SELECT region,\n       COUNT(*) AS total_orders\nFROM orders\nGROUP BY region;' },
    quiz: [
      { question: 'What keyword creates a column alias?', options: ['ALIAS', 'AS', 'NAME', 'LABEL'], correctIndex: 1, explanation: 'AS renames a column in the output — AS total_revenue.' },
      { question: 'Do aliases change the underlying table column names?', options: ['Yes, permanently', 'No — aliases exist only in the result set', 'Only in SQLite', 'Only with JOIN'], correctIndex: 1, explanation: 'Aliases affect query output headers only.' },
      { question: 'Why alias COUNT(*) in stakeholder reports?', options: ['Required by SQL', 'Readable headers like order_count', 'Faster queries', 'Enables JOIN'], correctIndex: 1, explanation: 'Business-friendly names reduce misinterpretation.' },
    ],
    challenge: { title: 'Alias a Calculation', instructions: 'Write SQL selecting product_name and list_price AS retail_price from products, limit 5.', hint: 'Use AS retail_price after list_price.', expectedAnswer: 'SELECT product_name, list_price AS retail_price\nFROM products\nLIMIT 5;', explanation: 'AS makes output headers meaningful for exports.', type: 'sql' },
  }],
];

QUERYING.forEach(([title, opts]) => {
  LESSONS.push(topicLesson(title, title === 'Column Aliases' ? 'column aliases' : title === 'LIMIT and TOP' ? 'LIMIT and TOP' : title, opts));
});

// Aggregate lessons 15-21
const AGGREGATES = [
  ['COUNT', {
    plainEnglish: 'COUNT tallies rows or non-null values — how many orders, how many customers, how many support tickets — the most common aggregate at Northstar Commerce.',
    whatItDoes: 'Returns the number of rows or non-null entries in a column.',
    whyItMatters: `${NS} operations tracks daily order volume with COUNT(*) on orders; confusing COUNT(email) with COUNT(*) when emails are missing undercounts active customers.`,
    stakeholderQuestion: stakeholder('Operations Manager', 'How many orders did we process yesterday across all channels?'),
    syntax: 'SELECT COUNT(*) AS total_orders\nFROM orders\nWHERE order_date = DATE(\'now\', \'-1 day\');',
    guidedExample: { description: 'Count orders by channel.', sql: 'SELECT channel, COUNT(*) AS order_count\nFROM orders\nGROUP BY channel;' },
    quiz: [
      { question: 'What does COUNT(*) count?', options: ['Only non-null values in one column', 'All rows including nulls', 'Distinct customers only', 'Only shipped orders'], correctIndex: 1, explanation: 'COUNT(*) counts every row in the group or table.' },
      { question: 'COUNT(customer_id) vs COUNT(*) when customer_id is never null?', options: ['Different results always', 'Same result if customer_id has no nulls', 'COUNT(*) is invalid', 'COUNT(customer_id) counts all rows always'], correctIndex: 1, explanation: 'COUNT(column) skips nulls; COUNT(*) counts all rows.' },
      { question: 'How count unique Northstar customers who ordered?', options: ['COUNT(*)', 'COUNT(DISTINCT customer_id)', 'SUM(customer_id)', 'AVG(customer_id)'], correctIndex: 1, explanation: 'DISTINCT inside COUNT counts unique values.' },
    ],
    exercise: { title: 'Count Cancelled Orders', instructions: "Write SQL to count orders where status = 'cancelled'.", hint: 'SELECT COUNT(*) FROM orders WHERE ...', expectedAnswer: "SELECT COUNT(*) AS cancelled_orders\nFROM orders\nWHERE status = 'cancelled';", explanation: 'COUNT with WHERE filters before tallying.', type: 'sql' },
    challenge: { title: 'Distinct Customer Count', instructions: 'Write SQL counting unique customer_id values in orders.', hint: 'COUNT(DISTINCT customer_id)', expectedAnswer: 'SELECT COUNT(DISTINCT customer_id) AS unique_customers\nFROM orders;', explanation: 'DISTINCT prevents counting repeat purchasers multiple times.', type: 'sql' },
  }],
  ['SUM', {
    plainEnglish: 'SUM adds numeric values — total revenue from order_items, total campaign spend, total quantities sold — turning thousands of Northstar rows into one headline number.',
    whatItDoes: 'Calculates the total of a numeric column across filtered or grouped rows.',
    whyItMatters: `${NS} finance reconciles monthly revenue with SUM(quantity * unit_price) from order_items; a junior analyst who sums list_price from products instead counts catalog value, not actual sales.`,
    stakeholderQuestion: stakeholder('Finance Director', 'What was total line-item revenue in the Midwest last quarter?'),
    syntax: 'SELECT SUM(quantity * unit_price) AS total_revenue\nFROM order_items oi\nJOIN orders o ON oi.order_id = o.order_id\nJOIN customers c ON o.customer_id = c.customer_id\nWHERE c.region = \'Midwest\';',
    guidedExample: { description: 'Sum campaign spend.', sql: 'SELECT SUM(spend) AS total_spend\nFROM marketing_campaigns;' },
    quiz: [
      { question: 'Which Northstar calculation uses SUM?', options: ['Counting orders', 'Total quantity * unit_price revenue', 'Finding latest order_date', 'Listing distinct regions'], correctIndex: 1, explanation: 'SUM adds numeric values like revenue components.' },
      { question: 'What happens if SUM runs on a text column without casting?', options: ['Always works', 'May error or return unexpected results', 'Returns zero always', 'Converts to dates'], correctIndex: 1, explanation: 'SUM requires numeric types or explicit casts.' },
      { question: 'SUM with GROUP BY region returns?', options: ['One total for all data', 'One sum per region', 'Only the largest region', 'Distinct regions only'], correctIndex: 1, explanation: 'GROUP BY creates separate sums per group.' },
    ],
    challenge: { title: 'Sum Line Revenue', instructions: 'Write SQL summing quantity * unit_price as total_revenue from order_items.', hint: 'SELECT SUM(quantity * unit_price)', expectedAnswer: 'SELECT SUM(quantity * unit_price) AS total_revenue\nFROM order_items;', explanation: 'SUM aggregates line-level revenue into one figure.', type: 'sql' },
  }],
  ['AVG', {
    plainEnglish: 'AVG calculates the mean — average order value, average ticket resolution time, average list_price by category — helping Northstar spot typical behavior versus outliers.',
    whatItDoes: 'Divides the sum of numeric values by the count of non-null values.',
    whyItMatters: `${NS} product teams compare average unit_price by category to spot underpriced office furniture; including cancelled zero-dollar orders skews the average down misleadingly.`,
    stakeholderQuestion: stakeholder('Product Manager', 'What is the average list_price for Kitchen & Dining products?'),
    syntax: "SELECT AVG(list_price) AS avg_price\nFROM products\nWHERE category = 'Kitchen & Dining';",
    guidedExample: { description: 'Average order line quantity.', sql: 'SELECT AVG(quantity) AS avg_quantity\nFROM order_items;' },
    quiz: [
      { question: 'How does AVG handle NULL values?', options: ['Treats NULL as zero', 'Ignores NULL rows in the average', 'Returns NULL always', 'Counts NULL as 1'], correctIndex: 1, explanation: 'AVG excludes nulls from both sum and count.' },
      { question: 'Average order value at Northstar typically uses?', options: ['AVG(list_price) from products', 'SUM(revenue)/COUNT(orders) or AVG per order total', 'MAX(unit_price)', 'COUNT(*)'], correctIndex: 1, explanation: 'AOV is revenue divided by order count at order grain.' },
      { question: 'ROUND(AVG(list_price), 2) does what?', options: ['Rounds each row', 'Rounds the final average to two decimals', 'Removes nulls', 'Sorts prices'], correctIndex: 1, explanation: 'ROUND formats the aggregate result for currency display.' },
    ],
    challenge: { title: 'Average Campaign Spend', instructions: 'Write SQL for average spend from marketing_campaigns aliased avg_spend.', hint: 'SELECT AVG(spend) AS avg_spend', expectedAnswer: 'SELECT AVG(spend) AS avg_spend\nFROM marketing_campaigns;', explanation: 'AVG summarizes typical campaign investment.', type: 'sql' },
  }],
  ['MIN and MAX', {
    plainEnglish: 'MIN and MAX find the smallest and largest values — earliest signup_date, highest list_price, most recent order — boundary checks every Northstar analyst uses.',
    whatItDoes: 'Returns the minimum or maximum value in a column across rows.',
    whyItMatters: `${NS} data quality checks use MIN(order_date) and MAX(order_date) to verify imports cover the expected range before leadership sees a truncated trend chart.`,
    stakeholderQuestion: stakeholder('Data Analyst Lead', 'What is the date range of orders in the table we loaded yesterday?'),
    syntax: 'SELECT MIN(order_date) AS first_order,\n       MAX(order_date) AS latest_order\nFROM orders;',
    guidedExample: { description: 'Find price range for a category.', sql: "SELECT MIN(list_price) AS min_price,\n       MAX(list_price) AS max_price\nFROM products\nWHERE category = 'Office Furniture';" },
    quiz: [
      { question: 'Which function finds the most recent order_date?', options: ['MIN(order_date)', 'MAX(order_date)', 'AVG(order_date)', 'COUNT(order_date)'], correctIndex: 1, explanation: 'MAX returns the latest date when dates sort chronologically.' },
      { question: 'MIN and MAX on text columns?', options: ['Invalid always', 'Returns alphabetical min/max', 'Returns row count', 'Same as SUM'], correctIndex: 1, explanation: 'Text compares alphabetically — useful for region codes.' },
      { question: 'Why check MIN/MAX dates after an ETL load?', options: ['To sort charts', 'To confirm the import covers the expected period', 'To delete old rows', 'Required by SQL'], correctIndex: 1, explanation: 'Date boundaries validate completeness of loaded data.' },
    ],
    challenge: { title: 'Product Price Range', instructions: 'Write SQL returning min and max list_price from products with aliases min_price and max_price.', hint: 'SELECT MIN(...) AS min_price, MAX(...) AS max_price', expectedAnswer: 'SELECT MIN(list_price) AS min_price,\n       MAX(list_price) AS max_price\nFROM products;', explanation: 'MIN/MAX summarize the price range quickly.', type: 'sql' },
  }],
  ['GROUP BY', {
    plainEnglish: 'GROUP BY splits Northstar data into buckets — revenue per region, orders per channel, tickets per category — and lets you calculate metrics for each bucket.',
    whatItDoes: 'Creates one result row per unique combination of grouped columns with aggregate values.',
    whyItMatters: `${NS} regional sales reviews depend on GROUP BY region; forgetting to include region in GROUP BY while selecting it causes SQL errors or wrong results in BI tools.`,
    stakeholderQuestion: stakeholder('VP of Sales', 'Break down total orders and revenue by region for Q1.'),
    syntax: 'SELECT c.region,\n       COUNT(DISTINCT o.order_id) AS order_count,\n       SUM(oi.quantity * oi.unit_price) AS revenue\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nGROUP BY c.region\nORDER BY revenue DESC;',
    guidedExample: { description: 'Orders per channel.', sql: 'SELECT channel, COUNT(*) AS orders\nFROM orders\nGROUP BY channel;' },
    quiz: [
      { question: 'Every non-aggregated SELECT column must?', options: ['Appear in ORDER BY', 'Appear in GROUP BY', 'Be aliased', 'Be numeric'], correctIndex: 1, explanation: 'SQL requires non-aggregated columns in GROUP BY.' },
      { question: 'GROUP BY region with COUNT(*) returns?', options: ['One row total', 'One row per region', 'Only the top region', 'Distinct customers'], correctIndex: 1, explanation: 'Each group becomes one output row.' },
      { question: 'WHERE vs GROUP BY — which runs first?', options: ['GROUP BY', 'WHERE filters rows before grouping', 'HAVING', 'ORDER BY'], correctIndex: 1, explanation: 'WHERE narrows rows before aggregates compute.' },
    ],
    challenge: { title: 'Revenue by Region', instructions: 'Write SQL grouping by customers.region with COUNT of orders and alias order_count. Join orders to customers.', hint: 'GROUP BY c.region', expectedAnswer: "SELECT c.region, COUNT(o.order_id) AS order_count\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nGROUP BY c.region;", explanation: 'GROUP BY produces per-region order counts.', type: 'sql' },
  }],
  ['HAVING', {
    plainEnglish: 'HAVING filters groups after GROUP BY — show only regions with more than 1,000 orders or categories where average price exceeds $50 — WHERE for aggregates.',
    whatItDoes: 'Applies conditions to grouped results using aggregate expressions.',
    whyItMatters: `${NS} marketing wants campaigns where SUM(spend) > 10000; using WHERE spend > 10000 filters rows before grouping and undercounts total campaign spend.`,
    stakeholderQuestion: stakeholder('Marketing Director', 'Which regions had more than 500 orders last month?'),
    syntax: 'SELECT c.region, COUNT(*) AS order_count\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nWHERE o.order_date >= DATE(\'now\', \'-30 days\')\nGROUP BY c.region\nHAVING COUNT(*) > 500;',
    guidedExample: { description: 'Categories with high average price.', sql: 'SELECT category, AVG(list_price) AS avg_price\nFROM products\nGROUP BY category\nHAVING AVG(list_price) > 50;' },
    quiz: [
      { question: 'HAVING filters what?', options: ['Individual rows before grouping', 'Groups after aggregation', 'JOIN results only', 'Column names'], correctIndex: 1, explanation: 'HAVING applies to grouped summary rows.' },
      { question: 'Can WHERE use SUM(revenue)?', options: ['Yes, always', 'No — use HAVING for aggregate filters', 'Only in SQLite', 'Only with DISTINCT'], correctIndex: 1, explanation: 'Aggregate conditions belong in HAVING.' },
      { question: 'Correct order of clauses?', options: ['SELECT FROM HAVING WHERE GROUP BY', 'SELECT FROM WHERE GROUP BY HAVING ORDER BY', 'GROUP BY SELECT FROM', 'HAVING before GROUP BY'], correctIndex: 1, explanation: 'SQL evaluates WHERE, then GROUP BY, then HAVING.' },
    ],
    challenge: { title: 'High-Volume Channels', instructions: 'Write SQL grouping orders by channel, HAVING COUNT(*) > 100, alias order_count.', hint: 'GROUP BY channel HAVING COUNT(*) > 100', expectedAnswer: 'SELECT channel, COUNT(*) AS order_count\nFROM orders\nGROUP BY channel\nHAVING COUNT(*) > 100;', explanation: 'HAVING keeps only channels exceeding the threshold.', type: 'sql' },
  }],
  ['Conditional Aggregation with CASE', {
    plainEnglish: 'Conditional aggregation uses CASE inside SUM or COUNT to pivot metrics — website revenue vs retail_partner revenue in one query row per region at Northstar.',
    whatItDoes: 'Counts or sums only rows matching CASE conditions within a GROUP BY query.',
    whyItMatters: `${NS} leadership compares channel mix quarterly; conditional aggregation avoids running separate queries for website and retail_partner and merging in Excel.`,
    stakeholderQuestion: stakeholder('Chief Revenue Officer', 'Show me website orders and retail partner orders side by side by region.'),
    syntax: "SELECT c.region,\n       SUM(CASE WHEN o.channel = 'website' THEN 1 ELSE 0 END) AS website_orders,\n       SUM(CASE WHEN o.channel = 'retail_partner' THEN 1 ELSE 0 END) AS partner_orders\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nGROUP BY c.region;",
    guidedExample: { description: 'Count premium vs standard customers by region.', sql: "SELECT region,\n       SUM(CASE WHEN segment = 'premium' THEN 1 ELSE 0 END) AS premium_count,\n       SUM(CASE WHEN segment = 'standard' THEN 1 ELSE 0 END) AS standard_count\nFROM customers\nGROUP BY region;" },
    quiz: [
      { question: 'CASE inside SUM allows what?', options: ['Only sorting', 'Conditional totals within groups', 'Replacing JOIN', 'Deleting rows'], correctIndex: 1, explanation: 'CASE picks which rows contribute to each sum.' },
      { question: 'Why not run two queries instead?', options: ['SQL forbids it', 'One query reduces errors and matches rows automatically', 'Two queries are always faster', 'CASE only works once'], correctIndex: 1, explanation: 'Single-query pivots keep groups aligned.' },
      { question: 'SUM(CASE WHEN x THEN 1 ELSE 0 END) is equivalent to?', options: ['AVG(x)', 'COUNT of rows where condition is true', 'MAX(x)', 'MIN(x)'], correctIndex: 1, explanation: 'Adding 1/0 per row counts matching rows.' },
    ],
    challenge: { title: 'Channel Mix by Region', instructions: "Write SQL grouping by region with SUM(CASE WHEN channel='website' THEN 1 ELSE 0 END) AS web_orders from orders joined to customers.", hint: 'JOIN orders to customers, GROUP BY region', expectedAnswer: "SELECT c.region,\n       SUM(CASE WHEN o.channel = 'website' THEN 1 ELSE 0 END) AS web_orders\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nGROUP BY c.region;", explanation: 'Conditional SUM counts website orders per region.', type: 'sql' },
  }],
];
AGGREGATES.forEach(([title, opts]) => LESSONS.push(topicLesson(title, title.toLowerCase(), opts)));

// Join lessons 22-27
const JOINS = [
  ['INNER JOIN', {
    plainEnglish: 'INNER JOIN matches rows from two tables on a shared key — attach customer names to orders or product names to line items — returning only rows with matches on both sides.',
    whatItDoes: 'Combines columns from related tables where the join condition is true in both tables.',
    whyItMatters: `${NS} support tickets analyzed without joining customers lose region — INNER JOIN on customer_id attaches Midwest vs Northeast for staffing decisions.`,
    stakeholderQuestion: stakeholder('Support Lead', 'Give me ticket category with customer region for tickets opened this week.'),
    syntax: 'SELECT t.ticket_id, t.category, c.region\nFROM support_tickets t\nINNER JOIN customers c ON t.customer_id = c.customer_id\nWHERE t.opened_date >= DATE(\'now\', \'-7 days\');',
    guidedExample: { description: 'Orders with customer email.', sql: 'SELECT o.order_id, o.order_date, c.email\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id\nLIMIT 10;' },
    quiz: [
      { question: 'INNER JOIN returns rows when?', options: ['Always from left table', 'Match exists in both tables', 'Only when right is null', 'Never with NULL keys'], correctIndex: 1, explanation: 'Unmatched rows from either side are excluded.' },
      { question: 'Missing ON clause causes?', options: ['Cartesian product — every row paired with every row', 'Automatic key detection', 'Query error always', 'LEFT JOIN behavior'], correctIndex: 0, explanation: 'Without ON, joins cross-multiply rows dangerously.' },
      { question: 'Join orders to customers on?', options: ['order_id', 'customer_id', 'product_id', 'region'], correctIndex: 1, explanation: 'orders.customer_id = customers.customer_id.' },
    ],
    challenge: { title: 'Order Line Details', instructions: 'Write SQL joining order_items to products on product_id, returning product_name and quantity, limit 10.', hint: 'INNER JOIN products p ON oi.product_id = p.product_id', expectedAnswer: 'SELECT p.product_name, oi.quantity\nFROM order_items oi\nINNER JOIN products p ON oi.product_id = p.product_id\nLIMIT 10;', explanation: 'INNER JOIN enriches line items with product names.', type: 'sql' },
  }],
  ['LEFT JOIN', {
    plainEnglish: 'LEFT JOIN keeps every row from the left table and adds matching right-table columns — find customers who never ordered, or orders without matching campaign attribution.',
    whatItDoes: 'Returns all rows from the left table plus matches from the right; unmatched right columns are NULL.',
    whyItMatters: `${NS} growth teams target signed-up customers with zero orders; LEFT JOIN customers to orders and filter WHERE order_id IS NULL builds that prospect list.`,
    stakeholderQuestion: stakeholder('Growth Manager', 'Which customers signed up but have never placed an order?'),
    syntax: 'SELECT c.customer_id, c.first_name, c.signup_date\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;',
    guidedExample: { description: 'All customers with optional order count.', sql: 'SELECT c.customer_id, COUNT(o.order_id) AS order_count\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id;' },
    quiz: [
      { question: 'LEFT JOIN preserves all rows from?', options: ['Right table', 'Left table', 'Both tables only matches', 'Smallest table'], correctIndex: 1, explanation: 'Left table rows always appear; right may be NULL.' },
      { question: 'Find customers without orders using?', options: ['INNER JOIN', 'LEFT JOIN customers to orders WHERE order_id IS NULL', 'CROSS JOIN', 'UNION'], correctIndex: 1, explanation: 'Unmatched orders leave order_id NULL on customer rows.' },
      { question: 'NULL in a LEFT JOIN result means?', options: ['Data error always', 'No matching row on the right side', 'Zero value', 'Duplicate key'], correctIndex: 1, explanation: 'NULL indicates no match for that join key.' },
    ],
    challenge: { title: 'Customers Without Orders', instructions: 'Write SQL listing customer_id and email for customers with no orders using LEFT JOIN.', hint: 'WHERE o.order_id IS NULL', expectedAnswer: 'SELECT c.customer_id, c.email\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;', explanation: 'LEFT JOIN plus NULL filter finds non-purchasers.', type: 'sql' },
  }],
  ['RIGHT JOIN', {
    plainEnglish: 'RIGHT JOIN keeps every row from the right table and adds left matches — mirror of LEFT JOIN. SQLite does not support RIGHT JOIN, so Northstar analysts rewrite it as a LEFT JOIN with tables swapped.',
    whatItDoes: 'Returns all rows from the right table with optional matches from the left.',
    whyItMatters: `Training materials use RIGHT JOIN, but ${NS}'s SQLite sandbox requires flipping tables: RIGHT JOIN becomes LEFT JOIN with swapped table order — junior analysts who skip this get syntax errors during onboarding labs.`,
    stakeholderQuestion: stakeholder('Analytics Trainer', 'Show all products including those never sold — how do we write this in SQLite?'),
    walkthrough: '1. Identify the table you must keep fully (all products).\n2. In PostgreSQL: products RIGHT JOIN order_items keeps all products.\n3. In SQLite: swap to order_items LEFT JOIN products — same result.\n4. Filter or count NULL order_item_id for unsold SKUs.\n5. Document dialect differences in your query README.',
    syntax: "-- PostgreSQL / SQL Server:\nSELECT p.product_name, oi.quantity\nFROM order_items oi\nRIGHT JOIN products p ON oi.product_id = p.product_id;\n\n-- SQLite equivalent:\nSELECT p.product_name, oi.quantity\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id;",
    guidedExample: { description: 'List all products with optional sales using SQLite-compatible LEFT JOIN.', sql: 'SELECT p.product_id, p.product_name, oi.quantity\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id\nLIMIT 20;' },
    quiz: [
      { question: 'Does SQLite support RIGHT JOIN?', options: ['Yes, fully', 'No — rewrite as LEFT JOIN with swapped tables', 'Only with extensions', 'Only on views'], correctIndex: 1, explanation: 'SQLite lacks RIGHT JOIN; swap tables and use LEFT JOIN.' },
      { question: 'RIGHT JOIN preserves all rows from?', options: ['Left table', 'Right table', 'Both', 'Neither'], correctIndex: 1, explanation: 'RIGHT JOIN mirrors LEFT JOIN from the other side.' },
      { question: 'All products including unsold — SQLite approach?', options: ['INNER JOIN only', 'products LEFT JOIN order_items', 'CROSS JOIN', 'DELETE unsold'], correctIndex: 1, explanation: 'LEFT JOIN from products keeps every SKU.' },
    ],
    challenge: { title: 'SQLite Join Rewrite', instructions: 'Rewrite RIGHT JOIN order_items to products as a SQLite LEFT JOIN keeping all products.', hint: 'FROM products p LEFT JOIN order_items oi', expectedAnswer: 'SELECT p.product_id, p.product_name, oi.order_item_id\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id;', explanation: 'Swapping tables converts RIGHT JOIN intent to SQLite syntax.', type: 'sql' },
  }],
  ['FULL OUTER JOIN', {
    plainEnglish: 'FULL OUTER JOIN returns all rows from both tables — matches where keys align, NULLs where they do not. SQLite lacks FULL OUTER JOIN; combine LEFT JOIN UNION ALL RIGHT JOIN excluding duplicates, or use LEFT JOIN UNION ALL unmatched right rows.',
    whatItDoes: 'Keeps every row from left and right tables, filling non-matches with NULL.',
    whyItMatters: `${NS} data engineers reconciling staging vs production customer IDs use FULL OUTER JOIN in PostgreSQL; SQLite analysts replicate with UNION ALL pattern during local QA.`,
    stakeholderQuestion: stakeholder('Data Engineer', 'Which customer IDs exist in staging but not production and vice versa?'),
    walkthrough: '1. In PostgreSQL: FULL OUTER JOIN staging s ON prod ON s.customer_id = p.customer_id WHERE s.id IS NULL OR p.id IS NULL.\n2. SQLite: LEFT JOIN staging to prod UNION ALL prod LEFT JOIN staging where staging key IS NULL.\n3. Tag each side as staging_only or prod_only.\n4. Count mismatches for the ETL ticket.\n5. Share reconciliation SQL in the runbook.',
    syntax: "-- PostgreSQL:\nSELECT COALESCE(s.customer_id, p.customer_id) AS customer_id\nFROM staging_customers s\nFULL OUTER JOIN production_customers p ON s.customer_id = p.customer_id\nWHERE s.customer_id IS NULL OR p.customer_id IS NULL;\n\n-- SQLite pattern:\nSELECT s.customer_id, 'staging_only' AS source\nFROM staging_customers s\nLEFT JOIN production_customers p ON s.customer_id = p.customer_id\nWHERE p.customer_id IS NULL\nUNION ALL\nSELECT p.customer_id, 'prod_only'\nFROM production_customers p\nLEFT JOIN staging_customers s ON p.customer_id = s.customer_id\nWHERE s.customer_id IS NULL;",
    guidedExample: { description: 'SQLite reconciliation of two customer lists.', sql: "-- Compare signup cohorts\nSELECT c.customer_id, 'in_a_not_b' AS flag\nFROM customers_a c\nLEFT JOIN customers_b b ON c.customer_id = b.customer_id\nWHERE b.customer_id IS NULL;" },
    quiz: [
      { question: 'SQLite support for FULL OUTER JOIN?', options: ['Native support', 'Not supported — use UNION ALL of LEFT JOINs', 'Only with RIGHT JOIN', 'Automatic'], correctIndex: 1, explanation: 'Combine LEFT JOIN patterns with UNION ALL in SQLite.' },
      { question: 'FULL OUTER JOIN includes?', options: ['Only matches', 'All rows from both tables', 'Right table only', 'Distinct keys only'], correctIndex: 1, explanation: 'Both sides appear; non-matches get NULL columns.' },
      { question: 'Reconciliation queries find?', options: ['Chart colors', 'Records in one set but not the other', 'Average revenue', 'Index names'], correctIndex: 1, explanation: 'Outer joins expose mismatches between datasets.' },
    ],
    challenge: { title: 'SQLite Full Outer Pattern', instructions: 'Describe the two-part UNION ALL pattern to mimic FULL OUTER JOIN between tables a and b on id.', hint: 'LEFT JOIN both directions for unmatched rows.', expectedAnswer: 'SELECT a.id FROM a LEFT JOIN b ON a.id=b.id WHERE b.id IS NULL UNION ALL SELECT b.id FROM b LEFT JOIN a ON b.id=a.id WHERE a.id IS NULL', explanation: 'Each LEFT JOIN captures rows exclusive to one side.', type: 'conceptual' },
  }],
  ['SELF JOIN', {
    plainEnglish: 'SELF JOIN joins a table to itself — compare each Northstar employee to their manager via manager_id, or find customers who share an email domain with another account.',
    whatItDoes: 'Uses table aliases to join two copies of the same table on a relationship column.',
    whyItMatters: `${NS} HR analytics reports span of control by joining employees to employees on manager_id — without aliases SQL cannot distinguish worker from manager rows.`,
    stakeholderQuestion: stakeholder('HR Business Partner', 'List each employee with their manager name from the employees table.'),
    syntax: 'SELECT e.full_name AS employee,\n       m.full_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id;',
    guidedExample: { description: 'Employee-manager hierarchy.', sql: 'SELECT e.employee_id, e.full_name, m.full_name AS manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id\nWHERE e.department = \'Support\';' },
    quiz: [
      { question: 'Why are aliases required in SELF JOIN?', options: ['Performance only', 'To distinguish two roles of the same table', 'SQLite requirement for all JOINs', 'To enable GROUP BY'], correctIndex: 1, explanation: 'e and m refer to employee vs manager rows.' },
      { question: 'employees.manager_id typically joins to?', options: ['customers.customer_id', 'employees.employee_id', 'orders.order_id', 'products.product_id'], correctIndex: 1, explanation: 'Manager is another employee row.' },
      { question: 'SELF JOIN use case at Northstar?', options: ['Sum revenue', 'Hierarchy or pairing rows within one table', 'Import CSV', 'Create indexes'], correctIndex: 1, explanation: 'Self joins handle hierarchical or duplicate-detection logic.' },
    ],
    challenge: { title: 'Manager Lookup', instructions: 'Write SQL self-join returning employee full_name and manager full_name from employees.', hint: 'Alias e and m, join e.manager_id = m.employee_id', expectedAnswer: 'SELECT e.full_name AS employee, m.full_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id;', explanation: 'Self join links employee rows to manager rows.', type: 'sql' },
  }],
  ['Joining Multiple Tables', {
    plainEnglish: 'Real Northstar questions chain several joins — customers to orders to order_items to products — to answer "which Midwest premium customers bought office furniture over $200?"',
    whatItDoes: 'Combines three or more tables using sequential JOIN clauses and one ON condition per join.',
    whyItMatters: `${NS} capstone metrics require four-table paths; missing one join drops revenue rows silently and understates category performance in executive dashboards.`,
    stakeholderQuestion: stakeholder('Category Manager', 'Total revenue for Office Furniture in the South region last quarter?'),
    syntax: "SELECT SUM(oi.quantity * oi.unit_price) AS revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nWHERE c.region = 'South'\n  AND p.category = 'Office Furniture';",
    guidedExample: { description: 'Four-table revenue by category and region.', sql: "SELECT c.region, p.category, SUM(oi.quantity * oi.unit_price) AS revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nGROUP BY c.region, p.category;" },
    quiz: [
      { question: 'Join order: customers → orders uses key?', options: ['product_id', 'customer_id', 'campaign_id', 'ticket_id'], correctIndex: 1, explanation: 'orders.customer_id links to customers.' },
      { question: 'Risk of wrong join order or key?', options: ['Faster queries', 'Inflated row counts or missing data', 'Automatic fix by SQL', 'Only affects aliases'], correctIndex: 1, explanation: 'Bad joins cause fan-out or dropped rows.' },
      { question: 'How many ON clauses for 4-table join?', options: ['1', '3', '4', '0'], correctIndex: 1, explanation: 'Each additional table needs one join condition.' },
    ],
    challenge: { title: 'Four-Table Query', instructions: 'Write SQL returning customer region, product_name, and quantity joining customers, orders, order_items, products. Limit 10.', hint: 'Chain JOINs on customer_id, order_id, product_id', expectedAnswer: "SELECT c.region, p.product_name, oi.quantity\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nLIMIT 10;", explanation: 'Multi-table joins assemble complete business context.', type: 'sql' },
  }],
];
JOINS.forEach(([title, opts]) => LESSONS.push(topicLesson(title, title.toLowerCase(), opts)));

// Advanced lessons 28-35
const ADVANCED = [
  ['CASE Expressions', {
    plainEnglish: 'CASE creates conditional labels — bucket order totals into Small/Medium/Large, map support categories to tiers, or tag regions for reporting groups at Northstar.',
    whatItDoes: 'Evaluates conditions row-by-row and returns different values based on the first matching WHEN clause.',
    whyItMatters: `${NS} executives want revenue bands without a separate lookup table; CASE in SELECT creates readable segments for Power BI exports in one query.`,
    stakeholderQuestion: stakeholder('BI Developer', 'Add a revenue_tier column: Under 50, 50-200, Over 200 based on line total.'),
    syntax: "SELECT order_item_id,\n       quantity * unit_price AS line_total,\n       CASE\n         WHEN quantity * unit_price < 50 THEN 'Under 50'\n         WHEN quantity * unit_price <= 200 THEN '50-200'\n         ELSE 'Over 200'\n       END AS revenue_tier\nFROM order_items;",
    guidedExample: { description: 'Segment customers by region group.', sql: "SELECT customer_id, region,\n       CASE\n         WHEN region IN ('West', 'Midwest') THEN 'Central/West'\n         ELSE 'East/South'\n       END AS reporting_group\nFROM customers\nLIMIT 10;" },
    quiz: [
      { question: 'CASE without matching WHEN returns?', options: ['Error always', 'ELSE value or NULL', 'First row value', 'Zero'], correctIndex: 1, explanation: 'ELSE provides default; without it, result is NULL.' },
      { question: 'CASE can appear in?', options: ['SELECT only', 'SELECT, WHERE, ORDER BY, and aggregates', 'FROM only', 'Never with GROUP BY'], correctIndex: 1, explanation: 'CASE is flexible across SQL clauses.' },
      { question: 'First matching WHEN in CASE?', options: ['All matching branches run', 'Only the first true WHEN applies', 'Random branch', 'Last WHEN always'], correctIndex: 1, explanation: 'CASE stops at the first true condition.' },
    ],
    challenge: { title: 'Channel Label', instructions: "Write SQL selecting order_id, channel, and a CASE column channel_type: 'Digital' for website, 'Partner' for retail_partner.", hint: 'CASE WHEN channel = ...', expectedAnswer: "SELECT order_id, channel,\n       CASE\n         WHEN channel = 'website' THEN 'Digital'\n         WHEN channel = 'retail_partner' THEN 'Partner'\n         ELSE 'Other'\n       END AS channel_type\nFROM orders\nLIMIT 10;", explanation: 'CASE maps raw values to business labels.', type: 'sql' },
  }],
  ['Subqueries', {
    plainEnglish: 'Subqueries nest SELECT inside another query — customers who ordered more than average, products priced above category mean, campaigns with spend above the company median.',
    whatItDoes: 'Uses an inner query result as filter, table, or calculation input for an outer query.',
    whyItMatters: `${NS} merchandising asks for products priced above their category average; a subquery computing AVG(list_price) BY category in WHERE filters without a temp table.`,
    stakeholderQuestion: stakeholder('Merchandising Analyst', 'Which products have list_price above the average for their category?'),
    syntax: 'SELECT product_name, category, list_price\nFROM products p\nWHERE list_price > (\n  SELECT AVG(list_price)\n  FROM products\n  WHERE category = p.category\n);',
    guidedExample: { description: 'Customers with above-average order count.', sql: 'SELECT customer_id, COUNT(*) AS orders\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > (SELECT AVG(order_count) FROM (\n  SELECT COUNT(*) AS order_count FROM orders GROUP BY customer_id\n));' },
    quiz: [
      { question: 'Subquery in WHERE often compares to?', options: ['GROUP BY', 'Aggregate from inner query', 'ORDER BY only', 'CREATE TABLE'], correctIndex: 1, explanation: 'Scalar subqueries return one value for comparison.' },
      { question: 'Correlated subquery means?', options: ['Inner query references outer row', 'Two unrelated queries', 'UNION of queries', 'Always faster'], correctIndex: 0, explanation: 'Correlated subqueries run per outer row — e.g., per category.' },
      { question: 'Subquery returning multiple columns in WHERE?', options: ['Always valid', 'Usually invalid — use IN or EXISTS', 'Required syntax', 'Same as JOIN always'], correctIndex: 1, explanation: 'WHERE expects scalar or IN/EXISTS patterns.' },
    ],
    challenge: { title: 'Above-Average Price', instructions: 'Write SQL for products where list_price exceeds overall average list_price using a subquery.', hint: 'WHERE list_price > (SELECT AVG(list_price) FROM products)', expectedAnswer: 'SELECT product_name, list_price\nFROM products\nWHERE list_price > (SELECT AVG(list_price) FROM products);', explanation: 'Scalar subquery supplies the comparison threshold.', type: 'sql' },
  }],
  ['Common Table Expressions', {
    plainEnglish: 'CTEs (WITH clauses) name intermediate result sets — define monthly_revenue once, reference it twice, keep complex Northstar analysis readable for code review.',
    whatItDoes: 'Creates temporary named result sets usable in the main query that follows.',
    whyItMatters: `${NS} analysts chain region filters, revenue totals, and rank logic; CTEs replace nested subqueries that managers cannot follow during audit walkthroughs.`,
    stakeholderQuestion: stakeholder('Analytics Manager', 'Can you refactor this nested query so we can reuse the filtered orders step?'),
    syntax: "WITH filtered_orders AS (\n  SELECT o.order_id, o.customer_id, c.region\n  FROM orders o\n  JOIN customers c ON o.customer_id = c.customer_id\n  WHERE c.region = 'West'\n)\nSELECT region, COUNT(*) AS order_count\nFROM filtered_orders\nGROUP BY region;",
    guidedExample: { description: 'CTE for line revenue then aggregate.', sql: 'WITH line_revenue AS (\n  SELECT order_id, SUM(quantity * unit_price) AS revenue\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT AVG(revenue) AS avg_order_value\nFROM line_revenue;' },
    quiz: [
      { question: 'CTE syntax starts with?', options: ['SELECT', 'WITH', 'FROM', 'GROUP BY'], correctIndex: 1, explanation: 'WITH names the CTE before the main query.' },
      { question: 'Why prefer CTE over nested subquery?', options: ['Always faster', 'Readability and reuse within the query', 'Required by SQLite', 'Replaces JOIN'], correctIndex: 1, explanation: 'Named steps clarify multi-stage logic.' },
      { question: 'Multiple CTEs separated by?', options: ['Semicolon only', 'Comma after each CTE definition', 'UNION only', 'Cannot have multiple'], correctIndex: 1, explanation: 'WITH a AS (...), b AS (...) SELECT ...' },
    ],
    challenge: { title: 'CTE Regional Orders', instructions: "Write a query with CTE west_orders filtering orders joined to customers where region='West', then COUNT orders.", hint: 'WITH west_orders AS (...) SELECT COUNT(*)', expectedAnswer: "WITH west_orders AS (\n  SELECT o.order_id\n  FROM orders o\n  JOIN customers c ON o.customer_id = c.customer_id\n  WHERE c.region = 'West'\n)\nSELECT COUNT(*) AS west_order_count\nFROM west_orders;", explanation: 'CTE isolates the filter step for clarity.', type: 'sql' },
  }],
  ['UNION and UNION ALL', {
    plainEnglish: 'UNION stacks result sets vertically — combine website orders and retail_partner orders into one list; UNION removes duplicates, UNION ALL keeps them all for faster Northstar ETL staging.',
    whatItDoes: 'Appends rows from two or more SELECT statements with matching column counts and types.',
    whyItMatters: `${NS} reports merge support_tickets from two legacy systems; UNION ALL preserves duplicate ticket IDs for counting, UNION dedupes for customer-facing totals.`,
    stakeholderQuestion: stakeholder('Support Operations', 'Combine Q1 and Q2 ticket exports into one dataset for trending.'),
    syntax: "SELECT ticket_id, category, opened_date, 'Q1' AS quarter\nFROM support_tickets_q1\nUNION ALL\nSELECT ticket_id, category, opened_date, 'Q2' AS quarter\nFROM support_tickets_q2;",
    guidedExample: { description: 'Stack regional customer samples.', sql: "SELECT customer_id, region FROM customers WHERE region = 'West'\nUNION ALL\nSELECT customer_id, region FROM customers WHERE region = 'Midwest';" },
    quiz: [
      { question: 'UNION vs UNION ALL?', options: ['Same behavior', 'UNION removes duplicates; UNION ALL keeps all rows', 'UNION ALL removes duplicates', 'UNION is faster always'], correctIndex: 1, explanation: 'UNION deduplicates; UNION ALL appends everything.' },
      { question: 'UNION requires?', options: ['Same number of columns and compatible types', 'Same table names', 'Same WHERE clause', 'JOIN keys'], correctIndex: 0, explanation: 'Column count and types must align across selects.' },
      { question: 'Use UNION ALL when?', options: ['You need deduplication', 'You know rows are distinct or want every row kept', 'Replacing JOIN', 'Sorting only'], correctIndex: 1, explanation: 'UNION ALL avoids dedup overhead when safe.' },
    ],
    challenge: { title: 'Combine Channels', instructions: "Write UNION ALL stacking order_id from website orders and order_id from retail_partner orders (use WHERE channel filters).", hint: 'Two SELECTs with same columns', expectedAnswer: "SELECT order_id, channel FROM orders WHERE channel = 'website'\nUNION ALL\nSELECT order_id, channel FROM orders WHERE channel = 'retail_partner';", explanation: 'UNION ALL merges channel subsets vertically.', type: 'sql' },
  }],
  ['Window Function Fundamentals', {
    plainEnglish: 'Window functions calculate across related rows without collapsing groups — running totals, moving averages, rankings — while keeping every Northstar order row visible.',
    whatItDoes: 'Applies aggregate-like calculations over a defined window of rows tied to the current row.',
    whyItMatters: `${NS} finance wants cumulative daily revenue in one export with daily detail; window SUM() OVER (ORDER BY order_date) delivers both row-level and running total without GROUP BY.`,
    stakeholderQuestion: stakeholder('Finance Analyst', 'Show daily orders with a running total column for March.'),
    syntax: 'SELECT order_date,\n       COUNT(*) AS daily_orders,\n       SUM(COUNT(*)) OVER (ORDER BY order_date) AS running_total\nFROM orders\nGROUP BY order_date;',
    guidedExample: { description: 'Running revenue by order date.', sql: 'SELECT order_date, SUM(line_total) AS daily_rev,\n       SUM(SUM(line_total)) OVER (ORDER BY order_date) AS cumulative_rev\nFROM (\n  SELECT o.order_date, oi.quantity * oi.unit_price AS line_total\n  FROM orders o JOIN order_items oi ON o.order_id = oi.order_id\n) x\nGROUP BY order_date;' },
    quiz: [
      { question: 'Window functions differ from GROUP BY because?', options: ['They delete rows', 'They keep detail rows while adding calculations', 'They only work on dates', 'They replace JOIN'], correctIndex: 1, explanation: 'PARTITION BY/ORDER BY define windows without collapsing all rows.' },
      { question: 'OVER clause defines?', options: ['Table name', 'The window partition and order', 'Database connection', 'Column type'], correctIndex: 1, explanation: 'OVER (PARTITION BY ... ORDER BY ...) scopes the window.' },
      { question: 'Common window functions?', options: ['CREATE, DROP', 'ROW_NUMBER, RANK, SUM() OVER', 'INSERT, UPDATE', 'GRANT only'], correctIndex: 1, explanation: 'Analytics uses ranking and running aggregates over windows.' },
    ],
    challenge: { title: 'Running Count', instructions: 'Write SQL with COUNT(*) OVER (ORDER BY order_date) as running_orders alongside order_date from orders grouped by order_date.', hint: 'GROUP BY order_date with window on grouped result', expectedAnswer: 'SELECT order_date, COUNT(*) AS daily_orders,\n       SUM(COUNT(*)) OVER (ORDER BY order_date) AS running_orders\nFROM orders\nGROUP BY order_date;', explanation: 'Window functions add running metrics to grouped data.', type: 'sql' },
  }],
  ['ROW_NUMBER', {
    plainEnglish: 'ROW_NUMBER assigns 1, 2, 3… within partitions — pick each customer\'s most recent order, rank products by revenue within category, dedupe duplicate ticket rows at Northstar.',
    whatItDoes: 'Returns a unique sequential integer per row within the specified window partition and order.',
    whyItMatters: `${NS} analysts dedupe daily snapshots by keeping ROW_NUMBER() = 1 per customer_id ordered by signup_date DESC — wrong ORDER BY keeps the oldest account.`,
    stakeholderQuestion: stakeholder('CRM Manager', 'Give me only the latest order per customer for our win-back campaign.'),
    syntax: 'SELECT order_id, customer_id, order_date,\n       ROW_NUMBER() OVER (\n         PARTITION BY customer_id\n         ORDER BY order_date DESC\n       ) AS rn\nFROM orders;',
    guidedExample: { description: 'Latest order per customer.', sql: 'WITH ranked AS (\n  SELECT order_id, customer_id, order_date,\n         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn\n  FROM orders\n)\nSELECT order_id, customer_id, order_date\nFROM ranked\nWHERE rn = 1;' },
    quiz: [
      { question: 'ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) ranks?', options: ['Globally only', 'Per customer, newest first gets 1', 'Alphabetically by id', 'Randomly'], correctIndex: 1, explanation: 'PARTITION BY resets numbering per customer.' },
      { question: 'Filter latest row per group using?', options: ['WHERE ROW_NUMBER = 1 directly', 'Subquery/CTE WHERE rn = 1', 'GROUP BY only', 'DISTINCT only'], correctIndex: 1, explanation: 'Window filters usually wrap in CTE then filter rn.' },
      { question: 'Ties in ROW_NUMBER get?', options: ['Same number', 'Different sequential numbers anyway', 'NULL', 'Error'], correctIndex: 1, explanation: 'ROW_NUMBER always unique — ties get different numbers.' },
    ],
    challenge: { title: 'Latest Order Per Customer', instructions: 'Write SQL using ROW_NUMBER partitioned by customer_id ordered by order_date DESC; return rows where rn=1 via CTE.', hint: 'WITH ranked AS (...)', expectedAnswer: 'WITH ranked AS (\n  SELECT order_id, customer_id, order_date,\n         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn\n  FROM orders\n)\nSELECT order_id, customer_id, order_date\nFROM ranked\nWHERE rn = 1;', explanation: 'ROW_NUMBER picks one row per partition.', type: 'sql' },
  }],
  ['RANK and DENSE_RANK', {
    plainEnglish: 'RANK and DENSE_RANK order rows with ties — top 10 products by revenue where ties share rank; DENSE_RANK skips no numbers after ties (1,2,2,3 vs 1,2,2,4).',
    whatItDoes: 'Assigns ranking integers with different tie-handling rules across a window.',
    whyItMatters: `${NS} category managers want top 5 SKUs per region; RANK may return six rows with ties at fifth place — stakeholders need to know which function you used.`,
    stakeholderQuestion: stakeholder('Category Director', 'Rank products by total revenue within each category for our supplier review.'),
    syntax: 'SELECT product_id, category, total_rev,\n       RANK() OVER (PARTITION BY category ORDER BY total_rev DESC) AS rev_rank\nFROM (\n  SELECT p.product_id, p.category, SUM(oi.quantity * oi.unit_price) AS total_rev\n  FROM products p\n  JOIN order_items oi ON p.product_id = oi.product_id\n  GROUP BY p.product_id, p.category\n) s;',
    guidedExample: { description: 'Rank campaigns by spend.', sql: 'SELECT campaign_name, spend,\n       DENSE_RANK() OVER (ORDER BY spend DESC) AS spend_rank\nFROM marketing_campaigns;' },
    quiz: [
      { question: 'Two rows tie for rank 2 with RANK(); next rank is?', options: ['3', '4', '2 again', 'NULL'], correctIndex: 1, explanation: 'RANK leaves gaps after ties — next is 4.' },
      { question: 'DENSE_RANK after tie at 2 gives next?', options: ['4', '3', '1', 'NULL'], correctIndex: 1, explanation: 'DENSE_RANK has no gaps — next rank is 3.' },
      { question: 'PARTITION BY category in rank query?', options: ['Ranks within each category separately', 'Deletes categories', 'Sorts alphabetically only', 'Same as GROUP BY always'], correctIndex: 0, explanation: 'Partition resets ranking per category.' },
    ],
    challenge: { title: 'Rank by Spend', instructions: 'Write SQL ranking marketing_campaigns by spend DESC using RANK() as spend_rank.', hint: 'RANK() OVER (ORDER BY spend DESC)', expectedAnswer: 'SELECT campaign_name, spend,\n       RANK() OVER (ORDER BY spend DESC) AS spend_rank\nFROM marketing_campaigns;', explanation: 'RANK orders campaigns by investment level.', type: 'sql' },
  }],
  ['LAG and LEAD', {
    plainEnglish: 'LAG looks at the previous row; LEAD looks at the next — compare this month\'s Northstar orders to last month, or days between consecutive orders for the same customer.',
    whatItDoes: 'Accesses values from other rows in the partition without a self-join.',
    whyItMatters: `${NS} growth reports show month-over-month order change; LAG(order_count, 1) OVER (ORDER BY month) calculates delta without aligning months in Excel.`,
    stakeholderQuestion: stakeholder('Growth Analyst', 'What is the month-over-month change in order count for each region?'),
    syntax: 'SELECT month, region, order_count,\n       order_count - LAG(order_count) OVER (\n         PARTITION BY region ORDER BY month\n       ) AS mom_change\nFROM monthly_orders_by_region;',
    guidedExample: { description: 'Days since previous order per customer.', sql: 'SELECT customer_id, order_date,\n       JULIANDAY(order_date) - JULIANDAY(LAG(order_date) OVER (\n         PARTITION BY customer_id ORDER BY order_date\n       )) AS days_since_prior\nFROM orders;' },
    quiz: [
      { question: 'LAG(column, 1) returns?', options: ['Next row value', 'Previous row value in the window', 'Average', 'Row count'], correctIndex: 1, explanation: 'LAG shifts backward; LEAD shifts forward.' },
      { question: 'PARTITION BY customer_id in LAG means?', options: ['Compare only within same customer', 'Global lag only', 'Delete other customers', 'Sort by product'], correctIndex: 0, explanation: 'Partition scopes previous row to same customer.' },
      { question: 'First row LAG value is typically?', options: ['Zero', 'NULL', 'Error', 'Same as current'], correctIndex: 1, explanation: 'No prior row exists — LAG returns NULL.' },
    ],
    challenge: { title: 'Previous Order Date', instructions: 'Write SQL selecting customer_id, order_date, and LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prior_order from orders.', hint: 'LAG(order_date) OVER (...)', expectedAnswer: 'SELECT customer_id, order_date,\n       LAG(order_date) OVER (\n         PARTITION BY customer_id ORDER BY order_date\n       ) AS prior_order\nFROM orders;', explanation: 'LAG accesses the previous order date per customer.', type: 'sql' },
  }],
];
ADVANCED.forEach(([title, opts]) => LESSONS.push(topicLesson(title, title.toLowerCase(), opts)));

// Cleaning lessons 36-39
const CLEANING = [
  ['Handling NULL Values', {
    plainEnglish: 'NULL means unknown or missing — a customer without resolved_date on a ticket, a product without unit_cost. COALESCE, IS NULL, and careful aggregates keep Northstar metrics honest.',
    whatItDoes: 'Detects and replaces or excludes missing values in filters, joins, and calculations.',
    whyItMatters: `${NS} average resolution time excludes NULL resolved_date for open tickets; treating NULL as zero makes support look instant when tickets are still open.`,
    stakeholderQuestion: stakeholder('Support Manager', 'Average resolution days for closed tickets only — exclude open ones.'),
    syntax: "SELECT AVG(JULIANDAY(resolved_date) - JULIANDAY(opened_date)) AS avg_days\nFROM support_tickets\nWHERE resolved_date IS NOT NULL;\n\n-- Replace NULL display:\nSELECT COALESCE(resolved_date, 'Open') AS status_date FROM support_tickets;",
    guidedExample: { description: 'Count tickets with missing resolution.', sql: 'SELECT COUNT(*) AS open_tickets\nFROM support_tickets\nWHERE resolved_date IS NULL;' },
    quiz: [
      { question: 'Correct test for missing resolved_date?', options: ['= NULL', 'IS NULL', '= \'NULL\'', '== NULL'], correctIndex: 1, explanation: 'SQL uses IS NULL, not = NULL.' },
      { question: 'COALESCE(resolved_date, opened_date) returns?', options: ['Always opened_date', 'resolved_date if not null, else opened_date', 'Always null', 'Sum of dates'], correctIndex: 1, explanation: 'COALESCE returns first non-null argument.' },
      { question: 'COUNT(column) and NULL?', options: ['Counts nulls', 'Ignores null values', 'Treats null as zero', 'Errors'], correctIndex: 1, explanation: 'COUNT(column) skips nulls.' },
    ],
    challenge: { title: 'Open Tickets Count', instructions: 'Write SQL counting support_tickets where resolved_date IS NULL.', hint: 'WHERE resolved_date IS NULL', expectedAnswer: 'SELECT COUNT(*) AS open_tickets\nFROM support_tickets\nWHERE resolved_date IS NULL;', explanation: 'IS NULL filters rows with missing resolution dates.', type: 'sql' },
  }],
  ['String Functions', {
    plainEnglish: 'String functions clean and reshape text — UPPER for consistent emails, TRIM for imported names, SUBSTR for domain extraction, LIKE for pattern matches on Northstar product names.',
    whatItDoes: 'Manipulates and compares TEXT columns in SELECT, WHERE, and UPDATE contexts.',
    whyItMatters: `${NS} marketing dedupes emails with LOWER(TRIM(email)); mixed-case duplicates inflate unique customer counts in campaign audience sizing.`,
    stakeholderQuestion: stakeholder('Marketing Ops', 'How many customers use a gmail.com address?'),
    syntax: "SELECT COUNT(*) AS gmail_customers\nFROM customers\nWHERE LOWER(email) LIKE '%@gmail.com';\n\nSELECT TRIM(first_name) || ' ' || TRIM(last_name) AS full_name FROM customers;",
    guidedExample: { description: 'Find products with Desk in the name.', sql: "SELECT product_name\nFROM products\nWHERE product_name LIKE '%Desk%';" },
    quiz: [
      { question: 'LIKE pattern for names ending in Lamp?', options: ["LIKE 'Lamp%'", "LIKE '%Lamp'", "LIKE '%Lamp%'", 'LIKE = Lamp'], correctIndex: 1, explanation: '%Lamp matches strings ending with Lamp.' },
      { question: 'Why TRIM customer names?', options: ['Required by SQL', 'Remove leading/trailing spaces from imports', 'Encrypt data', 'Sort dates'], correctIndex: 1, explanation: 'Imports often include stray whitespace.' },
      { question: 'UPPER(email) helps with?', options: ['Date math', 'Case-insensitive comparison', 'Join speed only', 'NULL handling'], correctIndex: 1, explanation: 'Normalize case before comparing or grouping emails.' },
    ],
    challenge: { title: 'Search Product Names', instructions: "Write SQL returning product_name from products where product_name LIKE '%Chair%'.", hint: 'Wildcards % on both sides', expectedAnswer: "SELECT product_name\nFROM products\nWHERE product_name LIKE '%Chair%';", explanation: 'LIKE with % finds substring matches.', type: 'sql' },
  }],
  ['Date Functions', {
    plainEnglish: 'Date functions filter and compute time spans — orders in the last 30 days, days to resolve tickets, monthly revenue trends for Northstar executive reviews.',
    whatItDoes: 'Extracts, truncates, and compares DATE/DATETIME values in queries.',
    whyItMatters: `${NS} Q1 board slides use DATE(order_date) BETWEEN '2025-01-01' AND '2025-03-31'; string dates from CSV imports break range filters until cast with DATE().`,
    stakeholderQuestion: stakeholder('Executive Assistant', 'Pull all orders between January 1 and March 31 this year for the board packet.'),
    syntax: "SELECT order_id, order_date\nFROM orders\nWHERE order_date BETWEEN '2025-01-01' AND '2025-03-31';\n\nSELECT JULIANDAY(resolved_date) - JULIANDAY(opened_date) AS days_open\nFROM support_tickets;",
    guidedExample: { description: 'Orders in last 7 days (SQLite).', sql: "SELECT COUNT(*) AS recent_orders\nFROM orders\nWHERE order_date >= DATE('now', '-7 days');" },
    quiz: [
      { question: 'Filter Q1 2025 orders using?', options: ['WHERE order_date BETWEEN start AND end', 'WHERE order_date = Q1', 'HAVING month = 1', 'GROUP BY year only'], correctIndex: 0, explanation: 'BETWEEN defines an inclusive date range.' },
      { question: 'Why cast text to DATE?', options: ['Faster colors', 'Correct chronological comparison and sorting', 'Required for COUNT', 'Removes duplicates'], correctIndex: 1, explanation: 'Date types sort and compare chronologically.' },
      { question: 'Ticket age in days might use?', options: ['SUM names', 'Difference of date functions on resolved and opened', 'COUNT DISTINCT', 'UNION'], correctIndex: 1, explanation: 'Subtract opened from resolved for duration.' },
    ],
    challenge: { title: 'March Orders', instructions: "Write SQL counting orders where order_date between '2025-03-01' and '2025-03-31'.", hint: 'SELECT COUNT(*) ... BETWEEN', expectedAnswer: "SELECT COUNT(*) AS march_orders\nFROM orders\nWHERE order_date BETWEEN '2025-03-01' AND '2025-03-31';", explanation: 'BETWEEN filters a closed date interval.', type: 'sql' },
  }],
  ['Finding and Removing Duplicates', {
    plainEnglish: 'Duplicate rows distort Northstar metrics — double-counted orders from ETL retries, repeated customer signups. Find them with GROUP BY HAVING COUNT(*) > 1; remove with ROW_NUMBER or DISTINCT strategies.',
    whatItDoes: 'Identifies redundant records and defines safe deduplication logic preserving the correct grain.',
    whyItMatters: `${NS} finance once reconciled $2M variance to duplicate order_id rows in a staging table; analysts who GROUP BY order_id HAVING COUNT(*) > 1 catch this before exec review.`,
    stakeholderQuestion: stakeholder('Finance Controller', 'Are there duplicate order_ids in yesterday\'s load?'),
    syntax: '-- Find duplicate order_ids:\nSELECT order_id, COUNT(*) AS cnt\nFROM orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;\n\n-- Keep latest row per duplicate key:\nWITH d AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY order_date DESC) AS rn\n  FROM orders\n)\nSELECT * FROM d WHERE rn = 1;',
    guidedExample: { description: 'Detect duplicate customer emails.', sql: 'SELECT email, COUNT(*) AS cnt\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;' },
    quiz: [
      { question: 'Find duplicate keys with?', options: ['GROUP BY key HAVING COUNT(*) > 1', 'ORDER BY key only', 'SELECT DISTINCT key', 'MIN(key)'], correctIndex: 0, explanation: 'Groups with count above one reveal duplicates.' },
      { question: 'Removing duplicates without rule risks?', options: ['Faster queries only', 'Deleting the wrong row — e.g., keeping bad data', 'Automatic backup', 'Nothing'], correctIndex: 1, explanation: 'Define which duplicate to keep — latest, complete, etc.' },
      { question: 'ROW_NUMBER for dedupe typically keeps?', options: ['All rows', 'rn = 1 per partition', 'rn = MAX', 'Random row'], correctIndex: 1, explanation: 'Filter to rn = 1 after ranking by priority order.' },
    ],
    challenge: { title: 'Find Duplicate Order IDs', instructions: 'Write SQL returning order_id and COUNT(*) as cnt from orders grouped having count > 1.', hint: 'GROUP BY order_id HAVING COUNT(*) > 1', expectedAnswer: 'SELECT order_id, COUNT(*) AS cnt\nFROM orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;', explanation: 'HAVING COUNT > 1 surfaces duplicate keys.', type: 'sql' },
  }],
];
CLEANING.forEach(([title, opts]) => LESSONS.push(topicLesson(title, title.toLowerCase(), opts)));

// Project lesson 40
LESSONS.push({
  title: 'SQL Business Analysis Project',
  objectives: [
    `Deliver an end-to-end SQL analysis answering three Northstar Commerce stakeholder questions`,
    'Combine joins, aggregates, window functions, and data cleaning in a documented query set',
    'Present findings with verifiable SQL, assumptions, and business recommendations',
  ],
  plainEnglish: `The capstone applies everything you learned — query ${NS} customers, orders, order_items, products, marketing_campaigns, and support_tickets to produce a business analysis memo with SQL evidence.`,
  whatItDoes: 'Integrates multi-table SQL, KPI calculations, and data quality checks into one analyst deliverable.',
  whyItMatters: `Hiring managers at retail analytics teams expect a portfolio piece showing you can move from "What is regional revenue?" to documented SQL, charts, and recommendations — this project simulates that ${NS} workflow.`,
  whenToUse: 'As the final SQL module assessment before moving to Excel, Tableau, or job applications.',
  stakeholderQuestion: stakeholder('Director of Analytics', 'Prepare a Q1 business review: regional revenue, top categories, campaign-attributed orders, and open support backlog by region.'),
  walkthrough: '1. Write a data dictionary for Northstar tables used.\n2. Query 1: Regional revenue and order counts with joins and GROUP BY.\n3. Query 2: Top 5 product categories by revenue using RANK().\n4. Query 3: Customers with no orders (LEFT JOIN) for growth opportunities.\n5. Query 4: Open support tickets by region with NULL handling.\n6. Document assumptions (cancelled orders excluded, date range Q1 2025).\n7. Summarize findings and one recommendation per insight.',
  syntax: `-- ${PROJECT} — starter template\n-- Query 1: Regional performance\nSELECT c.region,\n       COUNT(DISTINCT o.order_id) AS orders,\n       SUM(oi.quantity * oi.unit_price) AS revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nWHERE o.order_date BETWEEN '2025-01-01' AND '2025-03-31'\n  AND o.status <> 'cancelled'\nGROUP BY c.region\nORDER BY revenue DESC;\n\n-- Add Queries 2–4 following the same documentation standards.`,
  components: [
    { part: 'Business question', explanation: 'Each query maps to a stakeholder request.' },
    { part: 'SQL evidence', explanation: 'Runnable queries with comments and filters documented.' },
    { part: 'Assumptions', explanation: 'Date range, cancelled order treatment, NULL rules.' },
    { part: 'Recommendation', explanation: 'One actionable next step per finding.' },
  ],
  sampleInput: `${NS} Q1 2025 data: customers (${REGIONS}), orders (website + retail_partner), order_items, products, marketing_campaigns, support_tickets.`,
  expectedOutput: 'A project memo with 4+ SQL queries, result summaries, and regional recommendations for leadership.',
  mistakes: [
    'Submitting queries without stating grain or date filters',
    'Double-counting revenue by joining orders to order_items incorrectly',
    'Ignoring open support tickets with NULL resolved_date in backlog counts',
  ],
  practices: [
    'Number queries and tie each to a stakeholder question',
    'Validate totals against COUNT and SUM sanity checks',
    'Save queries in a single .sql file with header comments',
  ],
  guidedExample: {
    description: 'Start with regional revenue — the anchor metric for the executive summary.',
    steps: [
      'Join customers, orders, order_items',
      'Filter Q1 2025 and exclude cancelled',
      'GROUP BY region with SUM revenue',
      'Compare West vs Northeast and note largest gap',
    ],
  },
  tags: ['project', 'capstone', 'northstar', 'business-analysis'],
  projectConnectionText: `This is the ${PROJECT} — your SQL portfolio centerpiece using ${NS} data.`,
  quiz: [
    { question: 'First step in the Northstar SQL project?', options: ['Build a chart only', 'Define tables, grain, and business questions', 'Delete duplicate rows', 'Skip documentation'], correctIndex: 1, explanation: 'Scope and data dictionary prevent wrong metrics.' },
    { question: 'Regional revenue query should join?', options: ['products only', 'customers, orders, order_items', 'employees only', 'monthly_targets only'], correctIndex: 1, explanation: 'Revenue path flows through orders and line items by customer region.' },
    { question: 'Why document cancelled order handling?', options: ['Optional decoration', 'Stakeholders must know what is included in revenue', 'SQL requires it', 'For chart colors'], correctIndex: 1, explanation: 'Metric definitions affect trust and reconciliation.' },
  ],
  exercise: {
    title: 'Project Query Plan',
    instructions: 'List four stakeholder questions your Northstar SQL project will answer and which tables each requires.',
    hint: 'Cover revenue, categories, growth, and support.',
    expectedAnswer: 'Example: (1) Regional revenue — customers, orders, order_items; (2) Top categories — products, order_items; (3) Non-buyers — customers LEFT JOIN orders; (4) Open tickets by region — support_tickets, customers.',
    explanation: 'Planning queries before writing SQL keeps the capstone focused.',
    type: 'project',
  },
  challenge: {
    title: 'Regional Revenue Query',
    instructions: 'Write the full Q1 regional revenue query: join customers, orders, order_items; filter 2025-01-01 to 2025-03-31; exclude cancelled; GROUP BY region; SUM revenue.',
    hint: 'SUM(quantity * unit_price) with status filter',
    expectedAnswer: "SELECT c.region,\n       SUM(oi.quantity * oi.unit_price) AS revenue\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nJOIN order_items oi ON o.order_id = oi.order_id\nWHERE o.order_date BETWEEN '2025-01-01' AND '2025-03-31'\n  AND o.status <> 'cancelled'\nGROUP BY c.region\nORDER BY revenue DESC;",
    explanation: 'This anchor query demonstrates join, filter, aggregate, and sort skills.',
    type: 'project',
  },
});

if (LESSONS.length !== 40) {
  throw new Error(`Expected 40 lessons, got ${LESSONS.length}`);
}

mkdirSync(OUT_DIR, { recursive: true });

const contentEntries = LESSONS.map((spec) => {
  const id = lid(spec.title);
  return `  '${id}': ${js(buildPartial(spec), 2)}`;
}).join(',\n\n');

const quizEntries = LESSONS.map((spec) => {
  const id = lid(spec.title);
  return `  ${js(buildQuiz(id, spec.quiz), 2)}`;
}).join(',\n');

const exerciseList = [];
LESSONS.forEach((spec) => {
  const id = lid(spec.title);
  if (spec.exercise) exerciseList.push(guidedEx(id, spec.exercise));
  if (spec.challenge) exerciseList.push(challengeEx(id, spec.challenge));
});

const exerciseEntries = exerciseList.map((ex) => `  ${js(ex, 2)}`).join(',\n');

const file = `/**
 * SQL lesson content for Job Ready Edition — ${NS}
 * Generated by scripts/generate-sql-lessons-data.mjs
 */
import { northstarContext } from '../northstar.js';

export { northstarContext };

export const sqlLessonContent = {
${contentEntries}
};

export const sqlQuizzes = [
${quizEntries}
];

export const sqlExercises = [
${exerciseEntries}
];
`;

writeFileSync(OUT, file, 'utf8');
console.log(`Wrote ${OUT} with ${LESSONS.length} lessons, ${quizEntries.split('id:').length - 1} quizzes, ${exerciseList.length} exercises`);
