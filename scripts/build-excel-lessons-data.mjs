/**
 * Generates src/content/job-ready/content/excel-lessons-data.js
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { lessonsPart2 } from './excel-lessons-part2.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/content/job-ready/content/excel-lessons-data.js');

const NS = 'Northstar Commerce';

function objToJs(obj, indent = 2) {
  const pad = ' '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj === 'string') {
    const escaped = obj
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
    return `'${escaped}'`;
  }
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    if (obj.every((v) => typeof v === 'string')) {
      return `[\n${pad}  ${obj.map((s) => {
        const escaped = s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
        return `'${escaped}'`;
      }).join(`,\n${pad}  `)},\n${pad}]`;
    }
    return `[\n${obj.map((v) => `${pad}  ${objToJs(v, indent + 2)}`).join(`,\n`)},\n${pad}]`;
  }
  const entries = Object.entries(obj).map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
    return `${pad}  ${key}: ${objToJs(v, indent + 2)}`;
  });
  return `{\n${entries.join(',\n')},\n${' '.repeat(indent - 2)}}`;
}

const lessons = [
  {
    id: 'excel-lesson-excel-interface-and-workbook-basics',
    partial: {
      learningObjectives: [
        'Navigate the Excel ribbon, formula bar, and worksheet grid confidently',
        `Create, save, and organize workbooks for ${NS} reporting workflows`,
        'Understand rows, columns, sheets, and basic cell selection',
      ],
      plainEnglish: `Excel is a grid of cells organized into sheets inside a workbook. For ${NS} analysts, it is often the first place marketing exports, finance adjustments, and ad-hoc revenue checks happen before data moves to SQL or Tableau.`,
      whatItDoes: 'Provides a visual workspace to enter, format, and calculate business data without writing code.',
      whyItMatters: `Operations managers at ${NS} still request weekly Excel snapshots of order backlog and return rates. Junior analysts who know the interface deliver answers faster and avoid accidental overwrites.`,
      whenToUse: 'When you receive a CSV from the data warehouse, need a quick sanity check, or build a one-off report for a stakeholder meeting.',
      stakeholderQuestion: 'Can you open last week\'s Midwest order export and tell me if the totals match what Finance posted?',
      walkthrough: `Open Excel and create a blank workbook. Notice the ribbon tabs: Home for formatting, Data for imports, Formulas for calculations. Click cell A1 and type a column header such as Region. Press Tab to move right or Enter to move down. Save the file with a clear name like northstar_orders_2024_q1.xlsx. Add a second sheet for notes or assumptions. Pin frequently used folders in File > Open for faster access to ${NS} exports.`,
      syntax: 'Workbook structure:\n  Sheet1!A1     → cell A1 on Sheet1\n  Ctrl+S        → save workbook\n  Ctrl+PageDown → next worksheet',
      componentBreakdown: [
        { part: 'Workbook', explanation: 'The .xlsx file containing one or more worksheets.' },
        { part: 'Worksheet', explanation: 'A single grid tab—use separate sheets for raw data vs summary.' },
        { part: 'Cell', explanation: 'Intersection of a row and column, referenced like B3.' },
        { part: 'Formula Bar', explanation: 'Shows the full formula or value for the active cell.' },
        { part: 'Name Box', explanation: 'Displays the active cell address; jump to a range by typing it.' },
      ],
      sampleInput: `A ${NS} analyst receives orders_export.csv with columns order_id, region, order_date, revenue.`,
      expectedOutput: 'A saved workbook with headers in row 1, frozen panes, and a clearly labeled Raw Data sheet ready for formulas.',
      commonMistakes: [
        'Editing the only copy of a shared export without saving a new version',
        'Putting summary formulas on the same sheet as raw data that gets refreshed',
        'Forgetting to freeze header rows before scrolling large files',
      ],
      bestPractices: [
        'Use consistent file naming: subject_source_period.xlsx',
        'Keep raw data untouched on one sheet; build calculations on another',
        'Document data refresh date in a visible cell or cover sheet',
      ],
      guidedExample: {
        description: `Import ${NS} order data and prepare a clean working sheet.`,
        steps: [
          'Data > From Text/CSV and load orders_export.csv',
          'Rename the sheet Raw_Orders',
          'Insert a new sheet named Summary',
          'Freeze the top row on Raw_Orders (View > Freeze Panes)',
        ],
      },
      tags: ['interface', 'workbook', 'fundamentals'],
      projectConnectionText: `Foundation for building the ${NS} Excel Business Dashboard Project workbook structure.`,
    },
    quiz: [
      { question: 'What is the difference between a workbook and a worksheet in Excel?', options: ['They are the same thing', 'A workbook contains one or more worksheets', 'A worksheet contains multiple workbooks', 'Worksheets only exist in Google Sheets'], correctIndex: 1, explanation: 'A workbook is the file; worksheets are the tabs inside it.' },
      { question: 'Where do you see the full contents of the active cell, including long formulas?', options: ['Status bar', 'Formula bar', 'Name box only', 'Ribbon'], correctIndex: 1, explanation: 'The formula bar displays the complete cell value or formula.' },
      { question: `Why should ${NS} analysts keep raw data on a separate sheet from summaries?`, options: ['Excel requires it', 'To prevent refresh or edits from breaking calculations', 'Raw data cannot contain numbers', 'Summary sheets load faster'], correctIndex: 1, explanation: 'Separating raw data protects formulas when the source is updated or replaced.' },
    ],
    exercise: { title: 'Set Up a Northstar Workbook', instructions: `Create a two-sheet workbook for ${NS} weekly orders: Raw_Orders and Summary. List three column headers you would expect on Raw_Orders.`, hint: 'Think about order_id, region, and revenue from the sample export.', expectedAnswer: 'Raw_Orders sheet with headers such as order_id, region, order_date, revenue; separate Summary sheet; frozen header row on raw data.', explanation: 'Analysts at retailers like Northstar separate source data from calculations so refreshes stay safe.', skillTags: ['workbook', 'setup'] },
  },
  {
    id: 'excel-lesson-cells-ranges-and-tables',
    partial: {
      learningObjectives: [
        'Reference individual cells and contiguous ranges in formulas',
        'Convert data ranges into Excel Tables for structured analysis',
        'Apply table features like automatic expansion and filter dropdowns',
      ],
      plainEnglish: `A cell is one box; a range is a block of cells like A1:D500. An Excel Table turns that range into a smart object that grows when you add rows—ideal for ${NS} product catalogs that update monthly.`,
      whatItDoes: 'Tables add headers, banded rows, and structured references so formulas stay accurate when data grows.',
      whyItMatters: `${NS} merchandising sends updated product lists every month. Tables prevent broken totals when new SKUs are appended.`,
      whenToUse: 'Whenever a dataset has column headers and will receive new rows, such as orders, products, or support tickets.',
      stakeholderQuestion: 'When we add new products next month, will your revenue template still pick them up automatically?',
      walkthrough: 'Select your data including headers. Press Ctrl+T (Mac: Cmd+T) and confirm headers. Name the table tblProducts in Table Design. Notice filter arrows appear. Type a new row beneath the table—it expands automatically. Reference the table in formulas: =SUM(tblProducts[list_price]).',
      syntax: '=SUM(A2:A100)\n=SUM(tblOrders[revenue])\nTable shortcut: Ctrl+T',
      componentBreakdown: [
        { part: 'Cell reference', explanation: 'A1 notation points to one cell.' },
        { part: 'Range', explanation: 'A1:D10 selects a rectangular block.' },
        { part: 'Excel Table', explanation: 'Structured range with defined columns and auto-expansion.' },
        { part: 'Structured reference', explanation: 'Formula syntax using table and column names.' },
      ],
      sampleInput: `${NS} products table: product_id, product_name, category, list_price (847 rows).`,
      expectedOutput: 'Table tblProducts where adding row 848 extends the table and SUM formulas include the new product.',
      commonMistakes: [
        'Creating a table without confirming the header row',
        'Leaving blank rows inside the data range',
        'Mixing calculated columns with manual overrides in the same table column',
      ],
      bestPractices: [
        'Use singular, snake_case table names: tbl_orders, tbl_products',
        'Avoid merged cells inside tables',
        'Keep one record per row with consistent data types per column',
      ],
      guidedExample: {
        description: `Convert ${NS} product export to tblProducts and sum list prices by category using structured references.`,
        steps: ['Select data and insert Table', 'Rename to tblProducts', 'Use =SUMIF(tblProducts[category],"Office",tblProducts[list_price])'],
      },
      tags: ['tables', 'ranges', 'structured-references'],
      projectConnectionText: `Structured tables feed PivotTables and dashboard metrics in the ${NS} Excel capstone.`,
    },
    quiz: [
      { question: 'What happens when you add a row directly below an Excel Table?', options: ['Nothing', 'The table expands to include the new row', 'All formulas break', 'You must recreate the table'], correctIndex: 1, explanation: 'Tables automatically expand when adjacent rows are added.' },
      { question: 'What is tblOrders[revenue] an example of?', options: ['A cell comment', 'A structured reference', 'A pivot field', 'A chart series'], correctIndex: 1, explanation: 'Structured references use table and column names instead of A1 ranges.' },
      { question: 'Why are blank rows problematic inside a data range?', options: ['They improve performance', 'They split the range and break table detection', 'Excel deletes them automatically', 'They only affect charts'], correctIndex: 1, explanation: 'Blank rows interrupt contiguous ranges and cause incorrect summaries.' },
    ],
    exercise: { title: 'Name a Northstar Table', instructions: `You have ${NS} order lines in A1:E500 with headers. Describe how you would convert it to a table and name it tbl_order_items.`, hint: 'Ctrl+T, confirm headers, rename in Table Design.', expectedAnswer: 'Select A1:E500, insert Table with headers, name tbl_order_items, verify structured references work.', explanation: 'Named tables make downstream SUMIFS and PivotTables reliable.', skillTags: ['tables'] },
  },
  {
    id: 'excel-lesson-sorting-and-filtering',
    partial: {
      learningObjectives: [
        'Sort datasets by one or multiple columns safely',
        'Apply AutoFilter and custom filters to isolate segments',
        'Avoid sorting only part of a dataset and misaligning rows',
      ],
      plainEnglish: `Sorting rearranges rows; filtering hides rows that do not match your criteria. Together they help you find top ${NS} regions by revenue or open support tickets without deleting data.`,
      whatItDoes: 'Temporarily reorders or hides rows so you can focus on relevant records.',
      whyItMatters: `Support leads at ${NS} ask for the oldest unresolved tickets weekly. Filters deliver that list in seconds if data stays aligned.`,
      whenToUse: 'Exploratory analysis, QA checks, or preparing a subset to paste into a presentation.',
      stakeholderQuestion: 'Show me Northeast customers who spent over $500 last quarter, sorted highest to lowest.',
      walkthrough: 'Click any cell in your table. Data > Filter. Use dropdown arrows to sort Z→A or filter by value. For multi-column sort, use Data > Sort and add levels: first Region, then Revenue descending. Clear filters via Data > Clear. Never sort one column alone—select the entire data range or use a Table first.',
      syntax: 'Data > Sort\nData > Filter\nMulti-level sort: Region (A→Z), then Revenue (Largest to Smallest)',
      componentBreakdown: [
        { part: 'Sort', explanation: 'Reorders all selected rows by chosen column(s).' },
        { part: 'Filter', explanation: 'Hides rows that fail criteria; data remains in the file.' },
        { part: 'Custom filter', explanation: 'Rules like "greater than 500" or "contains Office".' },
      ],
      sampleInput: `${NS} customers: customer_id, region, segment, lifetime_spend (12,400 rows).`,
      expectedOutput: 'Filtered view showing only Northeast + lifetime_spend > 500, sorted descending by spend.',
      commonMistakes: [
        'Sorting a single column while adjacent columns stay fixed—rows become mismatched',
        'Filtering without noticing hidden rows still affect SUBTOTAL behavior',
        'Confusing filtered rows with deleted data',
      ],
      bestPractices: [
        'Convert data to a Table before sorting or filtering',
        'Use filter by color or top 10 for quick executive views',
        'Clear filters before sharing files so recipients see all data',
      ],
      guidedExample: {
        description: `Find top 10 ${NS} Midwest customers by lifetime spend.`,
        steps: ['Filter region to Midwest', 'Sort lifetime_spend descending', 'Review top 10 visible rows or use Top 10 filter'],
      },
      tags: ['sort', 'filter', 'exploration'],
      projectConnectionText: `Filtering regions and channels is a core step in the ${NS} dashboard project.`,
    },
    quiz: [
      { question: 'What is the biggest risk when sorting only column A of a five-column dataset?', options: ['Excel crashes', 'Row values become misaligned across columns', 'Filters stop working', 'Formulas update incorrectly only in column A'], correctIndex: 1, explanation: 'Partial sorts break row integrity unless the full range moves together.' },
      { question: 'Does filtering delete rows from the workbook?', options: ['Yes, permanently', 'No, rows are hidden temporarily', 'Only in Tables', 'Only when saved'], correctIndex: 1, explanation: 'Filters hide rows; the underlying data remains.' },
      { question: 'Which feature helps sort by Region then Revenue?', options: ['Conditional formatting', 'Multi-level Sort dialog', 'PivotTable only', 'Text to Columns'], correctIndex: 1, explanation: 'Data > Sort allows multiple sort levels in priority order.' },
    ],
    exercise: { title: 'Filter Northstar Support Tickets', instructions: `${NS} tickets have category and opened_date. Describe steps to show unresolved tickets older than 14 days, sorted by date ascending.`, hint: 'Filter status, date custom filter, then sort.', expectedAnswer: 'Filter status to open/unresolved, filter opened_date before today-14, sort opened_date ascending on full table.', explanation: 'Aligned sorting and filtering preserves ticket-to-customer relationships.', skillTags: ['filter', 'sort'] },
  },
  {
    id: 'excel-lesson-relative-and-absolute-references',
    partial: {
      learningObjectives: [
        'Explain how relative references shift when formulas copy down or across',
        'Lock rows or columns with $ for absolute references',
        'Choose the correct reference type for tax rates and growth factors',
      ],
      plainEnglish: `When you copy =B2*C2 down, Excel adjusts row numbers—that is relative referencing. When a ${NS} tax rate lives in cell $F$1 and every row must use it, you lock the reference with dollar signs.`,
      whatItDoes: 'Controls whether cell addresses change or stay fixed when a formula is copied.',
      whyItMatters: `Finance at ${NS} stores assumptions in fixed cells. Wrong reference types produce revenue errors that cascade through dashboards.`,
      whenToUse: 'Copying formulas down rows (relative) vs referencing a single assumption cell (absolute).',
      stakeholderQuestion: 'Why did total revenue change when I copied your formula—did you hard-code the discount rate wrong?',
      walkthrough: 'Enter unit price in B2 and quantity in C2. In D2 type =B2*C2 and fill down—row references shift. Put discount rate 0.15 in $G$1. In E2 type =D2*(1-$G$1) and fill down—the G1 reference stays fixed. Mixed references like $B2 lock the column but allow the row to shift.',
      syntax: '=B2*C2           → relative\n=$G$1*B2         → absolute rate, relative quantity\n=F$2              → mixed (lock row 2)',
      componentBreakdown: [
        { part: '$ before column', explanation: 'Locks column letter when copying horizontally.' },
        { part: '$ before row', explanation: 'Locks row number when copying vertically.' },
        { part: 'F4 toggle', explanation: 'Cycles reference types while editing a formula.' },
      ],
      sampleInput: `${NS} order_items: quantity in C, unit_price in D, tax rate 8.25% in Assumptions!$B$1.`,
      expectedOutput: 'Line totals in E copied down; each row uses Assumptions!$B$1 for tax.',
      commonMistakes: [
        'Forgetting to lock assumption cells before filling formulas',
        'Using absolute references everywhere and breaking row-wise calculations',
        'Hard-coding rates inside formulas instead of an assumptions area',
      ],
      bestPractices: [
        'Keep rates and targets in a labeled Assumptions section',
        'Press F4 to toggle references while editing',
        'Test copied formulas at the top, middle, and bottom of the range',
      ],
      guidedExample: {
        description: `Calculate ${NS} line revenue with a fixed 10% employee discount in $H$1.`,
        steps: ['Place 0.10 in $H$1', 'Formula =D2*C2*(1-$H$1)', 'Fill down and spot-check row 50'],
      },
      tags: ['references', 'formulas', 'fundamentals'],
      projectConnectionText: `Dashboard KPIs in the ${NS} project rely on locked assumption cells for targets and tax.`,
    },
    quiz: [
      { question: 'What does =$A$1 do when copied from B2 to B3?', options: ['Becomes =$A$2', 'Stays =$A$1', 'Becomes =B$1', 'Becomes #REF!'], correctIndex: 1, explanation: 'Fully absolute references do not change when copied.' },
      { question: 'Which reference locks column B but allows the row to change?', options: ['B$1', '$B1', '$B$1', 'B1'], correctIndex: 1, explanation: '$B1 locks the column; the row adjusts.' },
      { question: `Where should ${NS} store a company-wide shipping fee used in many formulas?`, options: ['Inside each row formula as a number', 'A single labeled assumption cell with absolute references', 'A comment on cell A1', 'Only in the chart title'], correctIndex: 1, explanation: 'Central assumptions with absolute references are easier to audit and update.' },
    ],
    exercise: { title: 'Fix a Copied Formula', instructions: 'A formula =B2*Assumptions!B1 was copied to row 100 but row 100 uses Assumptions!B99 instead of B1. What reference fix do you apply?', hint: 'Lock the assumption cell.', expectedAnswer: 'Change to =B2*Assumptions!$B$1 so copying down keeps B1 fixed.', explanation: 'Absolute references prevent assumption drift when filling formulas.', skillTags: ['references'] },
  },
  {
    id: 'excel-lesson-sum-average-min-and-max',
    partial: {
      learningObjectives: [
        'Use SUM to total numeric columns such as order revenue',
        'Calculate AVERAGE for typical order value and ticket handle time',
        'Apply MIN and MAX to find lowest and highest values in a range',
      ],
      plainEnglish: `SUM adds numbers, AVERAGE finds the typical value, MIN and MAX show extremes. When ${NS} leadership asks for West region revenue or the biggest single order last month, these four functions answer in one cell each.`,
      whatItDoes: 'Aggregates numeric ranges into single summary statistics.',
      whyItMatters: `Daily standups at ${NS} reference average order value and peak daily sales. These functions are the fastest path from raw rows to KPIs before building PivotTables.`,
      whenToUse: 'Quick totals on filtered exports, sanity checks against SQL, or headline metrics on a dashboard cover sheet.',
      stakeholderQuestion: 'What was our average order value in the Midwest last week, and what was the largest single order?',
      walkthrough: `On tblOrders with revenue in column E, click an empty cell. Type =SUM(E2:E10000) or =SUM(tblOrders[revenue]). For average: =AVERAGE(tblOrders[revenue]). MIN and MAX work the same way. Use AutoSum (Σ) on the Home tab for speed. Exclude header rows from ranges unless using structured table references.`,
      syntax: '=SUM(range)\n=AVERAGE(range)\n=MIN(range)\n=MAX(range)\n=SUM(tblOrders[revenue])',
      componentBreakdown: [
        { part: 'SUM', explanation: 'Adds all numeric values in the range; ignores text and blank cells.' },
        { part: 'AVERAGE', explanation: 'Divides the sum by the count of numeric cells in the range.' },
        { part: 'MIN', explanation: 'Returns the smallest numeric value in the range.' },
        { part: 'MAX', explanation: 'Returns the largest numeric value in the range.' },
      ],
      sampleInput: `${NS} tblOrders: 18,420 rows with revenue column for March 2025 across West, Midwest, South, Northeast.`,
      expectedOutput: 'SUM ≈ $2.14M, AVERAGE ≈ $116, MAX = $4,890 (enterprise bulk office order).',
      commonMistakes: [
        'Including the header row in A1:A5000 ranges, skewing AVERAGE',
        'Summing a column that mixes currency and text status values',
        'Using SUM on already-subtotaled rows, double-counting revenue',
      ],
      bestPractices: [
        'Prefer structured references on tables to avoid range drift',
        'Label each summary cell: Total Revenue, Avg Order Value',
        'Cross-check SUM results against a SQL or warehouse total',
      ],
      guidedExample: {
        description: `Summarize ${NS} South region March revenue from tblOrders filtered to region = South.`,
        steps: ['Filter tblOrders to South', 'Use SUBTOTAL(109,...) or SUM on visible cells', 'Add =AVERAGE for visible revenue', 'Record MAX for largest South order'],
      },
      tags: ['sum', 'average', 'aggregates'],
      projectConnectionText: `Headline KPI tiles on the ${NS} dashboard use SUM and AVERAGE for revenue and order value.`,
    },
    quiz: [
      { question: 'Which function returns the largest value in tblOrders[revenue]?', options: ['SUM', 'AVERAGE', 'MAX', 'COUNT'], correctIndex: 2, explanation: 'MAX returns the highest numeric value in the range.' },
      { question: 'Why might AVERAGE(tblOrders[revenue]) differ from Total Revenue / Row Count?', options: ['Excel bug', 'AVERAGE ignores blank and text cells in its divisor', 'SUM excludes zeros', 'MAX affects AVERAGE'], correctIndex: 1, explanation: 'AVERAGE only counts numeric cells; blank rows are excluded from the divisor.' },
      { question: `A ${NS} analyst sums column E but the total is double Finance's number. What is a likely cause?`, options: ['Used MIN instead of SUM', 'Summed rows that already include subtotals or duplicates', 'AVERAGE was nested in SUM', 'Region filter was applied'], correctIndex: 1, explanation: 'Double-counting subtotaled or duplicated rows inflates SUM.' },
    ],
    exercise: { title: 'Compute Northstar Order Stats', instructions: `Given tblOrders[revenue] with 500 rows, write four formulas for total revenue, average order value, smallest order, and largest order.`, hint: 'SUM, AVERAGE, MIN, MAX on the revenue column.', expectedAnswer: '=SUM(tblOrders[revenue]), =AVERAGE(tblOrders[revenue]), =MIN(tblOrders[revenue]), =MAX(tblOrders[revenue])', explanation: 'These four aggregates are the building blocks for executive summary metrics.', skillTags: ['sum', 'average', 'min', 'max'] },
  },
  {
    id: 'excel-lesson-count-and-counta',
    partial: {
      learningObjectives: [
        'Distinguish COUNT (numbers only) from COUNTA (non-empty cells)',
        'Count orders, customers, and ticket rows for volume reporting',
        'Combine COUNT with filters or helper columns when needed',
      ],
      plainEnglish: `COUNT tells you how many numeric cells exist; COUNTA counts anything non-blank—including order IDs stored as text. ${NS} ops uses COUNTA on order_id to verify export row counts match the warehouse.`,
      whatItDoes: 'Returns how many cells in a range meet the function\'s definition of countable.',
      whyItMatters: `Marketing at ${NS} tracks campaign-driven order volume. COUNT and COUNTA validate that Excel exports are complete before analysis proceeds.`,
      whenToUse: 'Row volume checks, survey response counts, or denominator setup for rate calculations.',
      stakeholderQuestion: 'How many orders did we process in the Northeast in Q1—excluding blank rows from the export?',
      walkthrough: `Place order_id in column A as text. =COUNTA(A2:A5000) counts every non-empty order ID. =COUNT(D2:D5000) counts only numeric revenue cells—useful if some rows lack revenue yet. Compare COUNTA on order_id to COUNT(*) from SQL. For dates stored as numbers, COUNT includes them; text dates may require COUNTA on a different column.`,
      syntax: '=COUNT(range)        → numeric cells only\n=COUNTA(range)       → any non-blank cell\n=COUNTA(tblOrders[order_id])',
      componentBreakdown: [
        { part: 'COUNT', explanation: 'Counts cells containing numbers, dates, or numeric text.' },
        { part: 'COUNTA', explanation: 'Counts all non-empty cells including text IDs and flags.' },
        { part: 'Range choice', explanation: 'Pick a column that defines record grain—order_id, not revenue.' },
      ],
      sampleInput: `${NS} export: 9,842 order rows; 12 rows missing revenue but with valid order_id.`,
      expectedOutput: 'COUNTA(order_id) = 9,842; COUNT(revenue) = 9,830—gap flags incomplete revenue rows.',
      commonMistakes: [
        'Using COUNT on order_id text column and getting zero',
        'Counting header row in the range without adjusting',
        'Assuming COUNTA excludes spaces—spaces count as non-blank',
      ],
      bestPractices: [
        'Use COUNTA on primary key columns for row integrity checks',
        'Document expected counts from SQL next to Excel COUNTA',
        'Trim whitespace before counting if IDs were imported messy',
      ],
      guidedExample: {
        description: `Validate a ${NS} weekly orders CSV has 12,500 rows before building charts.`,
        steps: ['Import to tblOrders', '=COUNTA(tblOrders[order_id]) in a QA cell', 'Compare to warehouse COUNT(*)', 'Investigate any mismatch'],
      },
      tags: ['count', 'counta', 'aggregates'],
      projectConnectionText: `The ${NS} dashboard project includes a data quality section using COUNTA on order_id.`,
    },
    quiz: [
      { question: 'Which formula counts text order IDs in column A?', options: ['=COUNT(A:A)', '=COUNTA(A:A)', '=SUM(A:A)', '=MAX(A:A)'], correctIndex: 1, explanation: 'COUNTA counts non-blank text; COUNT ignores plain text.' },
      { question: 'COUNT(revenue) is lower than COUNTA(order_id). What does that suggest?', options: ['Export is perfect', 'Some orders lack numeric revenue values', 'COUNT is broken', 'Headers were counted twice'], correctIndex: 1, explanation: 'Missing numeric revenue leaves order_id present but revenue blank for COUNT.' },
      { question: `Why does ${NS} QA compare COUNTA to SQL row counts?`, options: ['To format charts', 'To catch truncated or duplicate exports before analysis', 'COUNTA runs faster than SQL', 'SQL cannot count rows'], correctIndex: 1, explanation: 'Matching counts confirms the export grain is intact.' },
    ],
    exercise: { title: 'Count Northstar Orders', instructions: `Write formulas to count all order IDs and all numeric revenue values in tblOrders.`, hint: 'COUNTA on order_id; COUNT on revenue.', expectedAnswer: '=COUNTA(tblOrders[order_id]) and =COUNT(tblOrders[revenue])', explanation: 'Comparing both counts surfaces rows missing revenue.', skillTags: ['count', 'counta'] },
  },
  {
    id: 'excel-lesson-if',
    partial: {
      learningObjectives: [
        'Write IF formulas with logical test, value_if_true, and value_if_false',
        'Classify orders, segments, and ticket priority with conditional labels',
        'Nest simple IF logic for tiered business rules',
      ],
      plainEnglish: `IF asks a yes/no question about a cell. If ${NS} order status equals "Shipped", show "Complete"; otherwise show "Pending". It turns raw codes into business-friendly categories for reports.`,
      whatItDoes: 'Returns one value when a condition is TRUE and another when FALSE.',
      whyItMatters: `Support dashboards at ${NS} bucket tickets into SLA tiers. IF creates those buckets without manual relabeling every morning.`,
      whenToUse: 'Binary flags, status labels, pass/fail QA checks, or simple tier assignment.',
      stakeholderQuestion: 'Can you flag orders over $1,000 as "High Value" and everything else as "Standard" in the export?',
      walkthrough: `In column F next to revenue in E2, enter =IF(E2>=1000,"High Value","Standard"). Fill down. For text tests: =IF(D2="West","West Region","Other"). Combine with AND for compound rules: =IF(AND(B2="Shipped",E2>0),"Recognized Revenue","Exclude"). Keep labels consistent for PivotTables.`,
      syntax: '=IF(logical_test, value_if_true, value_if_false)\n=IF(E2>=1000,"High Value","Standard")\n=IF(AND(A2="Northeast",C2>500),"Priority","Normal")',
      componentBreakdown: [
        { part: 'logical_test', explanation: 'Expression that evaluates TRUE or FALSE, e.g. E2>=1000.' },
        { part: 'value_if_true', explanation: 'Result when the test passes—text, number, or formula.' },
        { part: 'value_if_true', explanation: 'Result when the test fails.' },
      ],
      sampleInput: `${NS} tblOrders: status in D (Shipped, Cancelled, Processing), revenue in E.`,
      expectedOutput: 'New column order_tier: High Value / Standard; exclude Cancelled with =IF(D2="Cancelled","Exclude","Include").',
      commonMistakes: [
        'Using = instead of comparison operators inside the test (e.g. IF(A2="West"=TRUE))',
        'Inconsistent label spelling breaking PivotTable groupings',
        'Nesting too many IFs instead of SWITCH or lookup tables',
      ],
      bestPractices: [
        'Use a lookup table for many categories instead of deep IF nesting',
        'Quote text results: "High Value" not High Value',
        'Document business rules in a cover sheet next to the formula',
      ],
      guidedExample: {
        description: `Label ${NS} marketing-attributed orders where channel = "Email" as "Email Campaign".`,
        steps: ['=IF(G2="Email","Email Campaign","Other")', 'Fill down', 'Pivot order count by new label'],
      },
      tags: ['if', 'logic', 'classification'],
      projectConnectionText: `IF-driven flags power segment slicers on the ${NS} Excel dashboard.`,
    },
    quiz: [
      { question: 'What does =IF(E2>=500,"Enterprise","SMB") return when E2 is 750?', options: ['750', 'Enterprise', 'SMB', 'TRUE'], correctIndex: 1, explanation: '750>=500 is TRUE, so the true branch "Enterprise" is returned.' },
      { question: 'Which operator belongs in the logical_test, not assignment?', options: ['=', '>=', 'Both work the same in IF tests', 'None'], correctIndex: 1, explanation: 'Comparisons use >=, =, <> etc.; IF tests need boolean expressions.' },
      { question: `Why might ${NS} replace nested IFs with a lookup table?`, options: ['IF is deprecated', 'Many region rules are easier to maintain in a table', 'Lookup tables cannot change', 'PivotTables require lookups'], correctIndex: 1, explanation: 'Tables of rules scale better than long nested IF chains.' },
    ],
    exercise: { title: 'Flag High-Value Northstar Orders', instructions: 'Write an IF formula that returns "High Value" when revenue >= 1000, else "Standard".', hint: 'Three arguments: test, true label, false label.', expectedAnswer: '=IF(E2>=1000,"High Value","Standard")', explanation: 'Simple IF tiers are common in retail analytics exports.', skillTags: ['if'] },
  },
];

// Fix typo in lesson 7 componentBreakdown - value_if_true twice
lessons[6].partial.componentBreakdown[2] = { part: 'value_if_false', explanation: 'Result when the test fails.' };

// Append lessons 8-20
lessons.push(...lessonsPart2);

const contentEntries = lessons.map((l) => `  '${l.id}': ${objToJs(l.partial, 2)}`).join(',\n\n');
const quizEntries = lessons.map((l) => `  makeQuiz('excel', '${l.id}', ${objToJs(l.quiz, 2)})`).join(',\n');
const exerciseEntries = lessons.map((l) => {
  const ex = { subjectId: 'excel', lessonId: l.id, ...l.exercise };
  return `  makeExercise(${objToJs(ex, 2)})`;
}).join(',\n');

const file = `import { makeQuiz, makeExercise } from '../lesson-factory.js';

export const excelLessonContent = {
${contentEntries}
};

export const excelQuizzes = [
${quizEntries}
];

export const excelExercises = [
${exerciseEntries}
];
`;

writeFileSync(OUT, file);
console.log(`Wrote ${OUT} (${file.split('\n').length} lines, ${lessons.length} lessons)`);
