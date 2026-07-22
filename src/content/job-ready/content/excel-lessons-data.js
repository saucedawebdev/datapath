import { makeQuiz, makeExercise } from '../lesson-factory.js';

export const excelLessonContent = {
  'excel-lesson-excel-interface-and-workbook-basics': {
    "learningObjectives": [
      "Navigate the Excel ribbon, formula bar, and worksheet grid",
      "Create and save workbooks for Northstar Commerce reporting workflows",
      "Use multiple sheets and freeze panes on large exports"
    ],
    "plainEnglish": "Excel is a grid of cells organized into sheets inside a workbook. At Northstar Commerce, analysts open warehouse exports here first—before SQL deep dives or Tableau dashboards—to validate totals and share quick views with operations.",
    "whatItDoes": "Provides a visual workspace to enter, format, import, and calculate business data without code.",
    "whyItMatters": "Finance and operations at Northstar Commerce still circulate Excel snapshots during month-end close. Knowing the interface prevents accidental overwrites and speeds up ad-hoc answers.",
    "whenToUse": "When you receive a CSV export, need a sanity check on revenue, or build a one-off view for a stakeholder meeting.",
    "stakeholderQuestion": "Can you open last week's Midwest order export and confirm the totals match what Finance posted?",
    "walkthrough": "Launch Excel and create a blank workbook. Explore ribbon tabs: Home for formatting, Data for imports, Formulas for calculations. Click A1 and type Region as a header. Press Tab to move right or Enter to move down. Save as northstar_orders_2024_q1.xlsx. Add a second sheet named Summary for calculations. Use View > Freeze Panes on row 1 after importing headers so scrolling keeps column names visible.",
    "syntax": "Sheet1!A1     → cell reference\nCtrl+S        → save\nCtrl+PageDown → next worksheet",
    "componentBreakdown": [
      {
        "part": "Workbook",
        "explanation": "The .xlsx file containing one or more worksheets."
      },
      {
        "part": "Worksheet",
        "explanation": "A single grid tab; separate raw data from summaries."
      },
      {
        "part": "Cell",
        "explanation": "Row/column intersection referenced as B3."
      },
      {
        "part": "Formula Bar",
        "explanation": "Displays the full formula or value for the active cell."
      }
    ],
    "sampleInput": "Northstar Commerce orders_export.csv with order_id, region, order_date, revenue.",
    "expectedOutput": "Saved workbook with Raw_Orders sheet, frozen header row, and empty Summary sheet ready for formulas.",
    "commonMistakes": [
      "Editing the only copy of a shared export without saving a new version",
      "Mixing calculations on the same sheet that gets refreshed from CSV",
      "Forgetting to freeze headers before scrolling 50,000+ order rows"
    ],
    "bestPractices": [
      "Name files: subject_source_period.xlsx",
      "Keep raw data untouched on one sheet",
      "Document refresh date on a cover sheet or cell A1 note"
    ],
    "guidedExample": {
      "description": "Import Northstar Commerce order data and prepare a working workbook.",
      "steps": [
        "Data > From Text/CSV load orders_export.csv",
        "Rename sheet Raw_Orders",
        "Insert Summary sheet",
        "View > Freeze Panes > Freeze Top Row"
      ]
    },
    "tags": [
      "interface",
      "workbook",
      "fundamentals"
    ],
    "projectConnectionText": "Sets up the workbook structure for the Northstar Commerce Excel Business Dashboard Project."
  },

  'excel-lesson-cells-ranges-and-tables': {
    "learningObjectives": [
      "Reference cells and contiguous ranges in formulas",
      "Convert ranges to Excel Tables with structured references",
      "Name tables for readable formulas and auto-expansion"
    ],
    "plainEnglish": "A cell is one box; a range is a block like A1:D500. Excel Tables turn ranges into smart objects that grow when Northstar Commerce adds new SKUs or order lines each month.",
    "whatItDoes": "Tables add headers, filter dropdowns, and structured references so formulas stay accurate as data grows.",
    "whyItMatters": "Northstar Commerce merchandising updates product catalogs monthly. Tables stop totals from missing new rows appended at the bottom.",
    "whenToUse": "Whenever a dataset has column headers and will receive new rows—orders, products, tickets.",
    "stakeholderQuestion": "When we add products next month, will your revenue template still include them?",
    "walkthrough": "Select data including headers. Press Ctrl+T and confirm headers. On Table Design, rename tblProducts. Add a row beneath the table—it expands automatically. Reference columns with =SUM(tblProducts[list_price]).",
    "syntax": "=SUM(A2:A100)\n=SUM(tblOrders[revenue])\nInsert Table: Ctrl+T",
    "componentBreakdown": [
      {
        "part": "Cell reference",
        "explanation": "A1 points to one cell."
      },
      {
        "part": "Range",
        "explanation": "A1:D10 selects a rectangular block."
      },
      {
        "part": "Excel Table",
        "explanation": "Structured range with defined columns."
      },
      {
        "part": "Structured reference",
        "explanation": "Uses table and column names in formulas."
      }
    ],
    "sampleInput": "Northstar Commerce products: product_id, product_name, category, list_price (847 rows).",
    "expectedOutput": "tblProducts expands when row 848 is added; SUM formulas include new products.",
    "commonMistakes": [
      "Creating tables without header row",
      "Blank rows inside the range",
      "Merged cells within tables"
    ],
    "bestPractices": [
      "Use snake_case table names",
      "One record per row",
      "Consistent data types per column"
    ],
    "guidedExample": {
      "description": "Convert product export to tblProducts and sum Office category list prices.",
      "steps": [
        "Select data > Insert Table",
        "Rename tblProducts",
        "Use SUMIF on category column via structured reference"
      ]
    },
    "tags": [
      "tables",
      "ranges"
    ],
    "projectConnectionText": "Structured tables feed PivotTables in the Northstar Excel capstone."
  },

  'excel-lesson-sorting-and-filtering': {
    "learningObjectives": [
      "Sort by single and multiple columns safely",
      "Apply AutoFilter and custom criteria",
      "Preserve row alignment across columns"
    ],
    "plainEnglish": "Sorting rearranges rows; filtering hides what you do not need. Together they surface top Northstar Commerce regions by revenue or oldest open support tickets without deleting records.",
    "whatItDoes": "Reorders or temporarily hides rows to focus analysis.",
    "whyItMatters": "Support managers at Northstar Commerce review unresolved tickets weekly. Misaligned sorts can attach wrong customer emails to ticket IDs.",
    "whenToUse": "Exploratory analysis, QA, or isolating a segment for a presentation.",
    "stakeholderQuestion": "Show Northeast customers who spent over $500 last quarter, highest spend first.",
    "walkthrough": "Click inside your table. Data > Filter. Use column dropdowns to sort or filter values. For Region then Revenue, use Data > Sort with two levels. Clear via Data > Clear. Never sort one column alone—select the full table first.",
    "syntax": "Data > Sort\nData > Filter\nMulti-level: Region A→Z, Revenue Largest to Smallest",
    "componentBreakdown": [
      {
        "part": "Sort",
        "explanation": "Moves entire selected rows by column values."
      },
      {
        "part": "Filter",
        "explanation": "Hides non-matching rows; data remains."
      },
      {
        "part": "Custom filter",
        "explanation": "Rules like >500 or contains Office."
      }
    ],
    "sampleInput": "Northstar Commerce customers: customer_id, region, segment, lifetime_spend.",
    "expectedOutput": "Northeast rows with lifetime_spend > 500 sorted descending.",
    "commonMistakes": [
      "Sorting one column only",
      "Forgetting hidden rows affect SUBTOTAL",
      "Sharing files with active filters"
    ],
    "bestPractices": [
      "Use Tables before sorting",
      "Clear filters before handoff",
      "Use Top 10 for executive views"
    ],
    "guidedExample": {
      "description": "Top 10 Midwest customers by spend.",
      "steps": [
        "Filter region Midwest",
        "Sort lifetime_spend descending",
        "Review first 10 rows"
      ]
    },
    "tags": [
      "sort",
      "filter"
    ],
    "projectConnectionText": "Region and channel filters are core steps in the Northstar dashboard project."
  },

  'excel-lesson-relative-and-absolute-references': {
    "learningObjectives": [
      "Explain relative reference shifting when copying",
      "Lock rows/columns with $",
      "Place assumptions in fixed cells"
    ],
    "plainEnglish": "Copy =B2*C2 down and row numbers shift—that is relative. Northstar Commerce tax rate in $F$1 must stay fixed for every order line—use absolute references.",
    "whatItDoes": "Controls whether addresses change when formulas copy across the grid.",
    "whyItMatters": "Wrong reference types at Northstar produce cascading revenue errors in weekly flash reports.",
    "whenToUse": "Relative for row-wise math; absolute for company-wide rates and targets.",
    "stakeholderQuestion": "Why did totals change when I copied your formula—did the discount rate move?",
    "walkthrough": "In D2 enter =B2*C2 and fill down. Put 0.15 discount in $G$1. In E2 enter =D2*(1-$G$1) and fill down—G1 stays fixed. Press F4 while editing to toggle reference types.",
    "syntax": "=B2*C2\n=D2*(1-$G$1)\nF4 toggles $ placement",
    "componentBreakdown": [
      {
        "part": "$ column",
        "explanation": "Locks column when copying horizontally."
      },
      {
        "part": "$ row",
        "explanation": "Locks row when copying vertically."
      },
      {
        "part": "F4",
        "explanation": "Cycles relative, mixed, and absolute."
      }
    ],
    "sampleInput": "order_items quantity in C, unit_price in D, tax 8.25% in Assumptions!$B$1.",
    "expectedOutput": "Line totals copied down each referencing Assumptions!$B$1.",
    "commonMistakes": [
      "Unlocked assumption cells",
      "All absolute breaking row math",
      "Hard-coded rates in every row"
    ],
    "bestPractices": [
      "Label Assumptions section",
      "Test copied formulas at top and bottom",
      "F4 while editing"
    ],
    "guidedExample": {
      "description": "10% employee discount in $H$1 applied to line revenue.",
      "steps": [
        "Place 0.10 in $H$1",
        "Formula =D2*C2*(1-$H$1)",
        "Fill down and spot-check row 50"
      ]
    },
    "tags": [
      "references",
      "formulas"
    ],
    "projectConnectionText": "Dashboard KPIs use locked cells for Northstar targets and tax rates."
  },

  'excel-lesson-sum-average-min-and-max': {
    "learningObjectives": [
      "Use SUM and AVERAGE on numeric ranges",
      "Apply MIN and MAX to find extremes",
      "Choose appropriate aggregate for the business question"
    ],
    "plainEnglish": "SUM adds revenue; AVERAGE finds typical order size; MIN and MAX spot smallest and largest values—daily questions for Northstar Commerce sales reviews.",
    "whatItDoes": "Aggregates numeric ranges into single summary values.",
    "whyItMatters": "Northstar Commerce regional leads compare average order value across West and Midwest every Monday standup.",
    "whenToUse": "Totals, typical values, or identifying outliers in numeric columns.",
    "stakeholderQuestion": "What was total Northeast revenue and average order value last month?",
    "walkthrough": "Click an empty cell. Type =SUM(E2:E500) for total revenue. =AVERAGE(E2:E500) for AOV. =MAX(E2:E500) finds largest order; =MIN for smallest. With tables: =SUM(tblOrders[revenue]).",
    "syntax": "=SUM(range)\n=AVERAGE(range)\n=MIN(range)\n=MAX(range)",
    "componentBreakdown": [
      {
        "part": "SUM",
        "explanation": "Adds numeric values; ignores text."
      },
      {
        "part": "AVERAGE",
        "explanation": "Mean of numeric values."
      },
      {
        "part": "MIN/MAX",
        "explanation": "Smallest/largest numeric value in range."
      }
    ],
    "sampleInput": "Northstar Commerce tblOrders revenue column, 18,432 rows for March.",
    "expectedOutput": "SUM ≈ $2.1M, AVERAGE ≈ $114, MAX highlights a bulk B2B order.",
    "commonMistakes": [
      "Including header row in range",
      "AVERAGING rows with blank revenue",
      "SUM on mixed text columns"
    ],
    "bestPractices": [
      "Use structured references with tables",
      "Exclude headers via table refs",
      "Pair SUM with COUNT for validation"
    ],
    "guidedExample": {
      "description": "March Midwest revenue total and AOV.",
      "steps": [
        "Filter region Midwest and March dates",
        "SUM revenue",
        "AVERAGE revenue"
      ]
    },
    "tags": [
      "sum",
      "average",
      "aggregates"
    ],
    "projectConnectionText": "KPI tiles in the capstone use SUM and AVERAGE for revenue and AOV."
  },

  'excel-lesson-count-and-counta': {
    "learningObjectives": [
      "Differentiate COUNT vs COUNTA",
      "Count orders, customers, and non-empty fields",
      "Validate dataset completeness"
    ],
    "plainEnglish": "COUNT tallies cells with numbers; COUNTA tallies any non-empty cell—including text IDs. At Northstar Commerce, COUNTA on order_id verifies row counts after CSV imports.",
    "whatItDoes": "Returns how many cells meet count criteria in a range.",
    "whyItMatters": "Operations checks whether nightly order export row counts match the warehouse manifest.",
    "whenToUse": "Row counts, non-blank checks, or sizing segments before SUMIFS.",
    "stakeholderQuestion": "How many orders did we ship last week—not dollars, just order count?",
    "walkthrough": "Use =COUNTA(A2:A5000) on order_id to count rows. =COUNT(E2:E5000) counts numeric revenue cells only. Compare COUNTA order_id to COUNT order_id to find missing IDs.",
    "syntax": "=COUNT(range)\n=COUNTA(range)",
    "componentBreakdown": [
      {
        "part": "COUNT",
        "explanation": "Counts cells containing numbers."
      },
      {
        "part": "COUNTA",
        "explanation": "Counts non-empty cells of any type."
      }
    ],
    "sampleInput": "Northstar Commerce export: 12,400 order rows; 37 blank revenue cells.",
    "expectedOutput": "COUNTA order_id = 12400; COUNT revenue = 12363 revealing 37 missing amounts.",
    "commonMistakes": [
      "COUNT on text IDs returning zero",
      "Counting full columns including blanks below data",
      "Confusing COUNT with COUNTIF"
    ],
    "bestPractices": [
      "COUNTA on key ID columns after import",
      "Document expected row counts",
      "Pair with conditional formatting on blanks"
    ],
    "guidedExample": {
      "description": "Validate last night order export row count.",
      "steps": [
        "COUNTA order_id column",
        "Compare to manifest 12400",
        "Investigate mismatch"
      ]
    },
    "tags": [
      "count",
      "counta"
    ],
    "projectConnectionText": "Order volume KPIs in the dashboard use COUNTA on distinct order IDs."
  },

  'excel-lesson-if': {
    "learningObjectives": [
      "Write IF with logical test, value if true, value if false",
      "Classify orders and customers into segments",
      "Nest simple business rules"
    ],
    "plainEnglish": "IF asks a yes/no question about a cell: if revenue > 500 label \"High Value\", else \"Standard\". Northstar Commerce marketing uses IF rules to flag VIP segments before campaigns.",
    "whatItDoes": "Returns one value when a condition is TRUE and another when FALSE.",
    "whyItMatters": "Segment flags drive email lists and discount eligibility—wrong IF logic mis-targets thousands of customers.",
    "whenToUse": "Binary classifications, threshold flags, and simple business rules in spreadsheets.",
    "stakeholderQuestion": "Can you flag customers who spent over $1,000 lifetime as VIP in this export?",
    "walkthrough": "In helper column: =IF(G2>1000,\"VIP\",\"Standard\"). Copy down. For text outcomes, wrap strings in quotes. Combine with AND for multiple tests: =IF(AND(F2=\"West\",G2>500),\"West High\",\"\").",
    "syntax": "=IF(logical_test, value_if_true, value_if_false)\n=IF(G2>1000,\"VIP\",\"Standard\")",
    "componentBreakdown": [
      {
        "part": "logical_test",
        "explanation": "Expression that evaluates TRUE or FALSE."
      },
      {
        "part": "value_if_true",
        "explanation": "Result when test is TRUE."
      },
      {
        "part": "value_if_false",
        "explanation": "Result when test is FALSE."
      }
    ],
    "sampleInput": "Northstar Commerce customers with lifetime_spend in column G.",
    "expectedOutput": "VIP for spends > 1000; Standard otherwise.",
    "commonMistakes": [
      "Missing quotes on text results",
      "Using = instead of > inside test incorrectly",
      "Deeply nested IFs without IFS"
    ],
    "bestPractices": [
      "Keep helper columns for auditability",
      "Use IFS for multiple tiers when available",
      "Document threshold assumptions"
    ],
    "guidedExample": {
      "description": "Flag bulk orders quantity >= 50 as Bulk.",
      "steps": [
        "=IF(D2>=50,\"Bulk\",\"Retail\")",
        "Fill down",
        "Pivot counts by flag"
      ]
    },
    "tags": [
      "if",
      "logic"
    ],
    "projectConnectionText": "Dashboard segments use IF-derived flags for VIP and bulk order views."
  },

  'excel-lesson-sumif-and-sumifs': {
    "learningObjectives": [
      "Sum values matching one criterion with SUMIF",
      "Add multiple criteria with SUMIFS",
      "Use correct criteria and sum range sizes"
    ],
    "plainEnglish": "SUMIF adds revenue where region equals Midwest. SUMIFS adds revenue where region is Midwest AND channel is Web—how Northstar Commerce analysts answer targeted flash questions.",
    "whatItDoes": "Conditionally sums numeric values based on criteria.",
    "whyItMatters": "Regional managers need filtered totals without rebuilding the whole dataset each morning.",
    "whenToUse": "Filtered totals by region, category, channel, or date text criteria.",
    "stakeholderQuestion": "What was Web channel revenue in the South last quarter?",
    "walkthrough": "Single criterion: =SUMIF(region_range,\"South\",revenue_range). Multiple: =SUMIFS(revenue_range, region_range, \"South\", channel_range, \"Web\"). Criteria ranges must match size; sum range comes first in SUMIFS.",
    "syntax": "=SUMIF(criteria_range, criteria, sum_range)\n=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    "componentBreakdown": [
      {
        "part": "criteria_range",
        "explanation": "Cells tested against criteria."
      },
      {
        "part": "criteria",
        "explanation": "Number, expression, or text in quotes."
      },
      {
        "part": "sum_range",
        "explanation": "Numeric values added when criteria match."
      }
    ],
    "sampleInput": "Northstar Commerce tblOrders: region, channel, revenue columns.",
    "expectedOutput": "Single cell South + Web revenue total.",
    "commonMistakes": [
      "Mismatched range sizes in SUMIFS",
      "Criteria range and sum range swapped in SUMIFS",
      "Text criteria without quotes"
    ],
    "bestPractices": [
      "Use table structured references",
      "Cell references for criteria cells",
      "Validate with filtered manual subtotal"
    ],
    "guidedExample": {
      "description": "Sum Office category revenue in Northeast.",
      "steps": [
        "=SUMIFS(tblOrders[revenue], tblOrders[region], \"Northeast\", tblOrders[category], \"Office\")"
      ]
    },
    "tags": [
      "sumif",
      "sumifs"
    ],
    "projectConnectionText": "Regional revenue tiles combine SUMIFS with assumption-driven criteria cells."
  },

  'excel-lesson-countif-and-countifs': {
    "learningObjectives": [
      "Count cells meeting one condition with COUNTIF",
      "Apply COUNTIFS for multiple conditions",
      "Size ranges consistently"
    ],
    "plainEnglish": "COUNTIF counts how many orders exceed $200. COUNTIFS counts orders in Midwest over $200—useful when Northstar Commerce ops tracks high-value order volume by region.",
    "whatItDoes": "Counts cells that match specified criteria.",
    "whyItMatters": "Volume metrics often matter as much as dollar totals for staffing and fulfillment planning.",
    "whenToUse": "Order counts by status, region, or threshold—not summing dollars.",
    "stakeholderQuestion": "How many Support tickets in category Shipping are still open?",
    "walkthrough": "=COUNTIF(status_range,\"Open\"). Multiple: =COUNTIFS(region_range,\"Midwest\", revenue_range,\">200\"). Use quotes for text; numeric criteria like \">200\" in quotes.",
    "syntax": "=COUNTIF(range, criteria)\n=COUNTIFS(range1, criteria1, range2, criteria2)",
    "componentBreakdown": [
      {
        "part": "COUNTIF",
        "explanation": "Single-range conditional count."
      },
      {
        "part": "COUNTIFS",
        "explanation": "All criteria must be true."
      },
      {
        "part": "Criteria operators",
        "explanation": "\">200\" counts values over 200."
      }
    ],
    "sampleInput": "Northstar Commerce tickets: region, category, status columns.",
    "expectedOutput": "Count of open Shipping tickets.",
    "commonMistakes": [
      "Using SUMIF when count needed",
      "Criteria ranges different lengths",
      "Forgetting quotes on text criteria"
    ],
    "bestPractices": [
      "Pair with SUMIFS for rate calculations",
      "Reference criteria from assumption cells",
      "Validate with filter row count"
    ],
    "guidedExample": {
      "description": "Count VIP customers (lifetime_spend>1000) in West.",
      "steps": [
        "=COUNTIFS(tblCustomers[region],\"West\", tblCustomers[lifetime_spend], \">1000\")"
      ]
    },
    "tags": [
      "countif",
      "countifs"
    ],
    "projectConnectionText": "Ticket and order volume widgets use COUNTIFS in the capstone workbook."
  },

  'excel-lesson-iferror': {
    "learningObjectives": [
      "Wrap formulas with IFERROR to handle failures gracefully",
      "Return readable messages instead of #N/A or #DIV/0!",
      "Keep dashboards professional when lookups miss"
    ],
    "plainEnglish": "Lookups sometimes fail when a SKU is missing. IFERROR replaces ugly errors with \"Not found\" so Northstar Commerce dashboards stay presentable in executive reviews.",
    "whatItDoes": "Returns a custom value when a formula evaluates to an error; otherwise returns the formula result.",
    "whyItMatters": "A single #N/A in a board deck undermines trust even when the underlying data issue is minor.",
    "whenToUse": "Lookups, divisions, and chained formulas that may fail on edge cases.",
    "stakeholderQuestion": "Can you make the dashboard show \"Missing product\" instead of errors when a SKU is not in the catalog?",
    "walkthrough": "Wrap lookup: =IFERROR(XLOOKUP(A2, tblProducts[product_id], tblProducts[product_name]), \"Missing product\"). For division: =IFERROR(C2/D2, 0). Do not wrap entire sheets—target formulas that can fail.",
    "syntax": "=IFERROR(value, value_if_error)\n=IFERROR(XLOOKUP(...), \"Not found\")",
    "componentBreakdown": [
      {
        "part": "value",
        "explanation": "Formula that might error."
      },
      {
        "part": "value_if_error",
        "explanation": "Fallback text or number."
      }
    ],
    "sampleInput": "Order lines referencing discontinued SKUs not in tblProducts.",
    "expectedOutput": "\"Missing product\" instead of #N/A in name column.",
    "commonMistakes": [
      "Hiding all errors including data quality signals",
      "Nesting IFERROR too broadly masking bugs",
      "Using empty string when zero is clearer"
    ],
    "bestPractices": [
      "Use meaningful fallback messages",
      "Log missing keys separately for QA",
      "Prefer fixing source data when errors are frequent"
    ],
    "guidedExample": {
      "description": "Safe product name lookup by product_id.",
      "steps": [
        "XLOOKUP wrapped in IFERROR",
        "Fallback \"Missing product\"",
        "COUNTIF fallback rows for QA"
      ]
    },
    "tags": [
      "iferror",
      "errors"
    ],
    "projectConnectionText": "Capstone lookups use IFERROR so KPI tiles never show error codes."
  },

  'excel-lesson-xlookup': {
    "learningObjectives": [
      "Retrieve values by lookup key with XLOOKUP",
      "Specify match mode and search direction",
      "Replace VLOOKUP patterns with flexible lookups"
    ],
    "plainEnglish": "XLOOKUP finds a product name given product_id—searching any column direction. Northstar Commerce analysts use it to enrich order exports with category and list price.",
    "whatItDoes": "Searches a lookup array for a key and returns a corresponding value from a return array.",
    "whyItMatters": "Order exports often lack descriptive fields; XLOOKUP adds them without manual copy-paste.",
    "whenToUse": "Key-based enrichment: product attributes, customer region, campaign names.",
    "stakeholderQuestion": "Add category and list price to this order line export using the product master.",
    "walkthrough": "In orders sheet column F: =XLOOKUP(D2, tblProducts[product_id], tblProducts[category]). For list price add another column with return array list_price. Default exact match. Use IFERROR for missing SKUs.",
    "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    "componentBreakdown": [
      {
        "part": "lookup_value",
        "explanation": "Key such as product_id."
      },
      {
        "part": "lookup_array",
        "explanation": "Column to search."
      },
      {
        "part": "return_array",
        "explanation": "Column value to return."
      },
      {
        "part": "if_not_found",
        "explanation": "Optional custom not-found result."
      }
    ],
    "sampleInput": "Order lines with product_id; tblProducts master with id, category, list_price.",
    "expectedOutput": "Enriched rows with category and price per line.",
    "commonMistakes": [
      "Lookup/return arrays different lengths",
      "Approximate match when exact needed",
      "Not locking table references when copying"
    ],
    "bestPractices": [
      "Use structured table references",
      "Exact match for IDs",
      "QA unmatched keys with COUNTIF on errors"
    ],
    "guidedExample": {
      "description": "Enrich orders with product_name from master.",
      "steps": [
        "XLOOKUP on product_id",
        "Return product_name",
        "Fill down with IFERROR"
      ]
    },
    "tags": [
      "xlookup",
      "lookup"
    ],
    "projectConnectionText": "Capstone enriches raw orders with product and customer attributes via XLOOKUP."
  },

  'excel-lesson-index-and-match': {
    "learningObjectives": [
      "Combine INDEX and MATCH for flexible lookups",
      "Understand why analysts still use this pattern",
      "Build two-way lookups without XLOOKUP"
    ],
    "plainEnglish": "MATCH finds the row position of a product_id; INDEX returns the price from that row. Before XLOOKUP, this duo powered every Northstar Commerce pricing sheet—and still appears in legacy templates.",
    "whatItDoes": "MATCH locates position; INDEX retrieves value at that position.",
    "whyItMatters": "You will inherit workbooks using INDEX/MATCH; understanding it prevents broken pricing models.",
    "whenToUse": "Legacy files, two-way lookups, or environments without XLOOKUP.",
    "stakeholderQuestion": "This template uses INDEX/MATCH—can you fix the #REF! without rebuilding it?",
    "walkthrough": "=INDEX(tblProducts[list_price], MATCH(D2, tblProducts[product_id], 0)). MATCH third argument 0 means exact match. For two-way: INDEX matrix, MATCH row key, MATCH column key.",
    "syntax": "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
    "componentBreakdown": [
      {
        "part": "INDEX",
        "explanation": "Returns value at row (and column) position."
      },
      {
        "part": "MATCH",
        "explanation": "Returns relative position of lookup value."
      },
      {
        "part": "0 match type",
        "explanation": "Exact match in MATCH."
      }
    ],
    "sampleInput": "Legacy pricing sheet with product_id in D2.",
    "expectedOutput": "Correct list_price without #REF!.",
    "commonMistakes": [
      "Wrong match type causing approximate match",
      "INDEX range not aligned with MATCH range",
      "Off-by-one including headers in MATCH range"
    ],
    "bestPractices": [
      "Lock lookup ranges when copying",
      "Prefer XLOOKUP in new work",
      "Document legacy formulas before edits"
    ],
    "guidedExample": {
      "description": "Fix list_price lookup using INDEX/MATCH.",
      "steps": [
        "Verify MATCH finds id",
        "INDEX same table column",
        "Wrap IFERROR"
      ]
    },
    "tags": [
      "index",
      "match",
      "lookup"
    ],
    "projectConnectionText": "Capstone docs note INDEX/MATCH in inherited Northstar finance templates."
  },

  'excel-lesson-text-functions': {
    "learningObjectives": [
      "Clean and reshape text with LEFT, RIGHT, MID, TRIM, CONCAT",
      "Extract codes from messy campaign names",
      "Standardize customer name fields"
    ],
    "plainEnglish": "Marketing exports arrive with extra spaces and combined fields. Text functions split campaign codes from names so Northstar Commerce joins match the warehouse keys.",
    "whatItDoes": "Manipulates string values without retyping data manually.",
    "whyItMatters": "Join keys must match exactly—hidden spaces cause silent lookup failures.",
    "whenToUse": "Cleaning imports, building keys, parsing embedded codes.",
    "stakeholderQuestion": "Can you split first and last name from our single full_name column for the mail merge?",
    "walkthrough": "TRIM removes spaces: =TRIM(A2). First name: =LEFT(A2, FIND(\" \", A2)-1). CONCAT/TEXTJOIN merge: =TEXTJOIN(\", \", TRUE, B2, C2). UPPER/LOWER standardize region codes.",
    "syntax": "=TRIM(text)\n=LEFT(text, num_chars)\n=FIND(find_text, within_text)\n=TEXTJOIN(delimiter, ignore_empty, range)",
    "componentBreakdown": [
      {
        "part": "TRIM",
        "explanation": "Removes extra spaces."
      },
      {
        "part": "LEFT/RIGHT/MID",
        "explanation": "Extract substrings."
      },
      {
        "part": "FIND",
        "explanation": "Locates character position."
      },
      {
        "part": "TEXTJOIN",
        "explanation": "Combines text with delimiter."
      }
    ],
    "sampleInput": "Northstar Commerce customers full_name \"  maria lopez  \" and campaign \"EM-FALL24-Desk\".",
    "expectedOutput": "Trimmed names; extracted campaign code FALL24.",
    "commonMistakes": [
      "FIND failing when delimiter missing",
      "Case-sensitive comparisons without UPPER",
      "Concatenating numbers without TEXT format"
    ],
    "bestPractices": [
      "TRIM before lookups",
      "Helper columns for parsed fields",
      "TEXT to preserve leading zeros in IDs"
    ],
    "guidedExample": {
      "description": "Extract email domain from email column.",
      "steps": [
        "FIND \"@\"",
        "MID after @ symbol",
        "LOWER for consistency"
      ]
    },
    "tags": [
      "text",
      "cleaning"
    ],
    "projectConnectionText": "Capstone cleans customer and campaign keys before XLOOKUP enrichment."
  },

  'excel-lesson-date-functions': {
    "learningObjectives": [
      "Parse and format dates with DATE, YEAR, MONTH, DAY",
      "Calculate days between dates with DATEDIF or subtraction",
      "Build month buckets for reporting"
    ],
    "plainEnglish": "Orders store dates as Excel serial numbers. YEAR and MONTH turn order_date into cohorts; TODAY helps Northstar Commerce analysts filter rolling 30-day windows.",
    "whatItDoes": "Extracts date parts and performs date arithmetic for time-based analysis.",
    "whyItMatters": "Monthly revenue reports depend on consistent date parsing—text dates break pivots.",
    "whenToUse": "Cohort analysis, aging tickets, fiscal period grouping.",
    "stakeholderQuestion": "How many orders shipped in the last 30 days by region?",
    "walkthrough": "Ensure dates are true date type. =YEAR(B2), =MONTH(B2). Rolling filter: =B2>=TODAY()-30. Days open: =TODAY()-opened_date. EOMONTH for month-end buckets.",
    "syntax": "=YEAR(date)\n=MONTH(date)\n=EOMONTH(date, 0)\n=date >= TODAY()-30",
    "componentBreakdown": [
      {
        "part": "YEAR/MONTH/DAY",
        "explanation": "Extract calendar components."
      },
      {
        "part": "TODAY",
        "explanation": "Dynamic current date."
      },
      {
        "part": "EOMONTH",
        "explanation": "Last day of month offset."
      }
    ],
    "sampleInput": "Northstar Commerce orders order_date column; support tickets opened_date.",
    "expectedOutput": "Helper columns order_year, order_month; rolling 30-day flag.",
    "commonMistakes": [
      "Dates stored as text",
      "Regional date format confusion",
      "Using 365 instead of date functions for months"
    ],
    "bestPractices": [
      "Format columns as Date",
      "Use ISO yyyy-mm-dd in exports when possible",
      "Document timezone assumptions"
    ],
    "guidedExample": {
      "description": "Flag orders in current calendar month.",
      "steps": [
        "=MONTH(B2)=MONTH(TODAY())",
        "AND YEAR match",
        "Filter TRUE rows"
      ]
    },
    "tags": [
      "dates",
      "time"
    ],
    "projectConnectionText": "Capstone trend charts group Northstar metrics by month using date helpers."
  },

  'excel-lesson-cleaning-and-removing-duplicates': {
    "learningObjectives": [
      "Find duplicate keys with conditional formatting or COUNTIF",
      "Remove duplicates safely preserving raw backup",
      "Document dedupe rules for stakeholders"
    ],
    "plainEnglish": "Duplicate order_id rows double revenue. Northstar Commerce analysts dedupe exports before summing, keeping the latest status or highest revision per key.",
    "whatItDoes": "Identifies and removes repeated records based on chosen key columns.",
    "whyItMatters": "Undetected duplicates inflated Q3 Midwest revenue 4% in a past Northstar audit.",
    "whenToUse": "After CSV imports, before pivots, when joining multiple sources.",
    "stakeholderQuestion": "Ensure each order_id appears once—keep the row with the latest order_date.",
    "walkthrough": "Backup raw sheet. Data > Remove Duplicates—select order_id only or composite keys. Alternatively flag duplicates: =COUNTIF($A$2:$A$5000,A2)>1. Sort by date descending before remove to keep latest if using manual method.",
    "syntax": "Data > Remove Duplicates\n=COUNTIF($A:$A, A2)>1  → duplicate flag",
    "componentBreakdown": [
      {
        "part": "Remove Duplicates",
        "explanation": "Excel tool deleting repeated rows by selected columns."
      },
      {
        "part": "COUNTIF flag",
        "explanation": "Marks keys appearing more than once."
      },
      {
        "part": "Backup",
        "explanation": "Preserve original before destructive clean."
      }
    ],
    "sampleInput": "12,400 order rows with 312 duplicate order_id entries from re-export.",
    "expectedOutput": "12,088 unique order_id rows; documented dedupe log.",
    "commonMistakes": [
      "Removing duplicates without backup",
      "Wrong key columns leaving partial dupes",
      "Keeping arbitrary row not latest"
    ],
    "bestPractices": [
      "Define business rule for which row wins",
      "Log rows removed count",
      "Validate SUM before/after within tolerance"
    ],
    "guidedExample": {
      "description": "Dedupe customers on email keeping latest signup.",
      "steps": [
        "Sort signup_date desc",
        "Remove Duplicates on email",
        "Record count removed"
      ]
    },
    "tags": [
      "cleaning",
      "duplicates"
    ],
    "projectConnectionText": "Capstone begins with deduped Northstar order and customer tables."
  },

  'excel-lesson-conditional-formatting': {
    "learningObjectives": [
      "Apply rules to highlight thresholds and exceptions",
      "Use color scales and data bars for quick scanning",
      "Avoid misleading rainbow formatting"
    ],
    "plainEnglish": "Conditional formatting paints cells red when support SLA is breached or green when revenue beats target—Northstar Commerce managers scan heat patterns without reading every number.",
    "whatItDoes": "Changes cell appearance based on values or formulas.",
    "whyItMatters": "Visual cues accelerate standups; misapplied rules hide problems.",
    "whenToUse": "Exception reporting, heat maps, QA checks on blanks or duplicates.",
    "stakeholderQuestion": "Highlight regions below 90% of monthly target in red on this summary sheet.",
    "walkthrough": "Select KPI range. Home > Conditional Formatting > Highlight Cell Rules or New Rule with formula =B2<Assumptions!$C$2. Color scales for AOV by region. Manage Rules to edit precedence.",
    "syntax": "Home > Conditional Formatting\nFormula rule: =B2<target_cell\nColor scale on numeric range",
    "componentBreakdown": [
      {
        "part": "Highlight rules",
        "explanation": "Preset greater/less than tests."
      },
      {
        "part": "Formula rules",
        "explanation": "Custom logic referencing other cells."
      },
      {
        "part": "Color scales",
        "explanation": "Gradient by value magnitude."
      }
    ],
    "sampleInput": "Northstar Commerce regional revenue vs target table on Summary sheet.",
    "expectedOutput": "Below-target regions shaded red; above-target green.",
    "commonMistakes": [
      "Too many rules causing visual noise",
      "Relative references wrong when applying across ranges",
      "Using color alone without labels for color-blind readers"
    ],
    "bestPractices": [
      "Limit palette to 2-3 meaningful colors",
      "Pair color with icons or text flags",
      "Document rule logic on assumptions sheet"
    ],
    "guidedExample": {
      "description": "Highlight orders with quantity > 100.",
      "steps": [
        "Select quantity column",
        "Highlight Cells > Greater Than 100",
        "Choose amber fill"
      ]
    },
    "tags": [
      "formatting",
      "visualization"
    ],
    "projectConnectionText": "Capstone dashboard tiles use conditional formatting for target variance."
  },

  'excel-lesson-pivottables': {
    "learningObjectives": [
      "Build PivotTables from structured tables",
      "Place fields in Rows, Columns, Values, Filters",
      "Refresh pivots when source data updates"
    ],
    "plainEnglish": "PivotTables summarize thousands of Northstar Commerce order lines into region-by-category revenue in clicks—without writing SUMIFS for every combination.",
    "whatItDoes": "Aggregates and cross-tabulates data interactively.",
    "whyItMatters": "Ad-hoc pivot exploration answers \"what if we slice by channel?\" in meetings live.",
    "whenToUse": "Multi-dimensional summaries, exploratory analysis, quick cross-tabs.",
    "stakeholderQuestion": "Break down Q1 revenue by region and product category—sortable and filterable.",
    "walkthrough": "Click tblOrders. Insert > PivotTable on new sheet. Drag region to Rows, category to Columns, revenue to Values (Sum). Add channel to Filters. Refresh after CSV update via PivotTable Analyze > Refresh.",
    "syntax": "Insert > PivotTable\nRows: dimension\nValues: numeric aggregate\nRefresh after source update",
    "componentBreakdown": [
      {
        "part": "Rows/Columns",
        "explanation": "Dimension layout axes."
      },
      {
        "part": "Values",
        "explanation": "Numeric field aggregated Sum/Count/Avg."
      },
      {
        "part": "Filters",
        "explanation": "Slice entire pivot by field like channel."
      }
    ],
    "sampleInput": "Northstar Commerce tblOrders 18k rows with region, category, channel, revenue.",
    "expectedOutput": "Pivot matrix region x category summing revenue with channel slicer.",
    "commonMistakes": [
      "Source not formatted as table",
      "Forgetting refresh after data change",
      "Sum of text fields"
    ],
    "bestPractices": [
      "Name pivot sheet clearly",
      "Use Show Values As for % of total when needed",
      "Disable grand totals if exporting slices"
    ],
    "guidedExample": {
      "description": "Pivot average order value by region.",
      "steps": [
        "region to Rows",
        "order_id to Values Count",
        "revenue Sum",
        "calculated AOV column or Show Values As"
      ]
    },
    "tags": [
      "pivot",
      "analysis"
    ],
    "projectConnectionText": "Capstone summary pivots feed chart sources on the dashboard sheet."
  },

  'excel-lesson-charts-and-chart-selection': {
    "learningObjectives": [
      "Choose chart types matched to the question",
      "Build column, line, and combo charts from summary data",
      "Format charts for executive readability"
    ],
    "plainEnglish": "Use column charts to compare regions; line charts for monthly revenue trend. Wrong chart types confuse Northstar Commerce leaders—bars for time series mislead the eye.",
    "whatItDoes": "Visualizes aggregated data to reveal comparisons and trends.",
    "whyItMatters": "Charts in weekly flash packs drive decisions; cluttered 3D pie charts erode credibility.",
    "whenToUse": "Presenting summaries already aggregated in tables or pivots—not raw transaction rows.",
    "stakeholderQuestion": "Show monthly revenue trend and highlight when we dipped below target.",
    "walkthrough": "Summarize month and revenue on Summary sheet. Insert > Recommended Charts or Line chart. Remove gridlines clutter. Add data labels sparingly. Combo chart: columns for revenue, line for target. Source data link must point to summary range not 18k raw rows.",
    "syntax": "Insert > Chart\nColumn → compare categories\nLine → time trend\nCombo → multiple series types",
    "componentBreakdown": [
      {
        "part": "Column/Bar",
        "explanation": "Compare categories like regions."
      },
      {
        "part": "Line",
        "explanation": "Show change over time."
      },
      {
        "part": "Combo",
        "explanation": "Mix types e.g. revenue bars + target line."
      }
    ],
    "sampleInput": "Northstar Commerce monthly revenue vs target table Jan-Dec.",
    "expectedOutput": "Line chart with clear axis labels, target reference line, no chart junk.",
    "commonMistakes": [
      "Charting raw transactional data",
      "Pie charts with many slices",
      "Truncated axes exaggerating change"
    ],
    "bestPractices": [
      "Label axes and units",
      "Start axis at zero for bar/column",
      "Match chart to one message"
    ],
    "guidedExample": {
      "description": "Regional revenue column chart for Q1.",
      "steps": [
        "Select region summary range",
        "Insert Clustered Column",
        "Sort descending",
        "Add title"
      ]
    },
    "tags": [
      "charts",
      "visualization"
    ],
    "projectConnectionText": "Capstone dashboard embeds linked charts from summary ranges."
  },

  'excel-lesson-dashboard-design': {
    "learningObjectives": [
      "Lay out KPI tiles, charts, and slicers on one view",
      "Link controls to PivotTables and formulas",
      "Design for mobile-friendly printing and executive scan"
    ],
    "plainEnglish": "A dashboard is one screen answering \"How are we doing?\" Northstar Commerce weekly pack places revenue, orders, AOV, and open tickets with consistent spacing and a single date filter.",
    "whatItDoes": "Combines metrics, visuals, and filters into a decision-focused view.",
    "whyItMatters": "Executives spend seconds on each view—clarity beats decoration.",
    "whenToUse": "Recurring reporting packs, team standups, self-serve metric monitoring.",
    "stakeholderQuestion": "Give me one sheet I can filter by region and see revenue, orders, and SLA breaches.",
    "walkthrough": "Hide gridlines on Dashboard sheet. Top row KPI tiles link to Summary calculations. Place pivot chart below. Add slicer connected to pivot for region. Align objects to grid; use consistent font sizes. Document refresh instructions in text box.",
    "syntax": "Dashboard layout:\n  Row 1: KPI labels + values\n  Row 2-3: charts\n  Slicers: connect to PivotTable\n  Named ranges for KPI formulas",
    "componentBreakdown": [
      {
        "part": "KPI tile",
        "explanation": "Single metric with label and variance."
      },
      {
        "part": "Slicer",
        "explanation": "Visual filter connected to pivot/table."
      },
      {
        "part": "Chart linked to summary",
        "explanation": "Updates when source refreshes."
      }
    ],
    "sampleInput": "Northstar Commerce Summary + Pivot sheets with regional metrics.",
    "expectedOutput": "Single Dashboard sheet with four KPIs, trend chart, region slicer.",
    "commonMistakes": [
      "Too many metrics on one page",
      "Hard-coded values not linked to formulas",
      "Slicers not connected to all pivots"
    ],
    "bestPractices": [
      "One primary question per dashboard",
      "Consistent color for good/bad",
      "Print area and freeze for PDF export"
    ],
    "guidedExample": {
      "description": "Wire region slicer to revenue pivot and KPI cells.",
      "steps": [
        "Insert slicer on region",
        "Report connections to pivot",
        "KPI SUMIFS reference slicer cell or GETPIVOTDATA"
      ]
    },
    "tags": [
      "dashboard",
      "design"
    ],
    "projectConnectionText": "Directly prepares the Excel Business Dashboard Project layout."
  },

  'excel-lesson-excel-business-dashboard-project': {
    "learningObjectives": [
      "Combine tables, formulas, pivots, charts, and formatting into one workbook",
      "Answer multi-part stakeholder questions about Northstar performance",
      "Document assumptions, refresh steps, and QA checks"
    ],
    "plainEnglish": "You build a leadership-ready Excel dashboard for Northstar Commerce using orders, customers, products, and support tickets—proving you can deliver end-to-end analysis without SQL or Tableau.",
    "whatItDoes": "Integrates every Excel skill into a capstone business deliverable.",
    "whyItMatters": "Hiring managers want proof you can own a recurring report—not just pass formula quizzes.",
    "whenToUse": "Portfolio piece demonstrating job-ready Excel for retail analytics roles.",
    "stakeholderQuestion": "Prepare the monthly Northstar Commerce performance pack: revenue and orders by region, top categories, marketing spend efficiency, and support backlog trend.",
    "walkthrough": "Import four CSV extracts to Raw sheets. Convert to tables. Dedupe orders on order_id. Build Summary metrics with SUMIFS/COUNTIFS. XLOOKUP enrich categories. Pivot region x category. Dashboard sheet with KPI tiles, conditional formatting vs targets, slicers, and monthly trend chart. Add Assumptions sheet for targets and refresh date. QA: compare total revenue to finance control total within 0.5%.",
    "syntax": "Workbook structure:\n  Raw_* sheets → tbl_* tables\n  Summary → SUMIFS/XLOOKUP/Pivot\n  Dashboard → KPI + charts + slicers\n  Assumptions → targets, dates",
    "componentBreakdown": [
      {
        "part": "Raw data layer",
        "explanation": "Untouched imports as tables."
      },
      {
        "part": "Summary layer",
        "explanation": "Calculations and pivots."
      },
      {
        "part": "Dashboard layer",
        "explanation": "Executive view with filters."
      },
      {
        "part": "QA checklist",
        "explanation": "Row counts, dedupe log, finance tie-out."
      }
    ],
    "sampleInput": "Northstar Commerce exports: orders, order_items, customers, products, marketing_campaigns, support_tickets, monthly_targets.",
    "expectedOutput": "Multi-sheet workbook answering stakeholder brief with documented refresh steps.",
    "commonMistakes": [
      "Skipping dedupe before revenue totals",
      "Charts pointing to raw rows instead of summaries",
      "No documentation of data refresh date or assumptions"
    ],
    "bestPractices": [
      "Separate raw, summary, dashboard layers",
      "Name tables and ranges consistently",
      "Include README sheet with stakeholder answers and QA totals"
    ],
    "guidedExample": {
      "description": "Deliver Northstar monthly pack milestone 1: clean orders and regional revenue pivot.",
      "steps": [
        "Import and table-ize orders",
        "Dedupe on order_id keeping latest",
        "SUMIFS revenue by region on Summary",
        "Pivot region x category for chart source"
      ]
    },
    "tags": [
      "project",
      "capstone",
      "dashboard"
    ],
    "projectConnectionText": "This lesson is the Excel Business Dashboard Project capstone for Northstar Commerce."
  }
};

export const excelQuizzes = [
  makeQuiz('excel', 'excel-lesson-excel-interface-and-workbook-basics', [
    {
      "question": "What is the difference between a workbook and a worksheet?",
      "options": [
        "Same thing",
        "Workbook contains worksheets",
        "Worksheet contains workbooks",
        "Only Google Sheets has worksheets"
      ],
      "correctIndex": 1,
      "explanation": "A workbook is the file; worksheets are tabs inside it."
    },
    {
      "question": "Where do you see the full formula for a cell?",
      "options": [
        "Status bar",
        "Formula bar",
        "Name box only",
        "Chart title"
      ],
      "correctIndex": 1,
      "explanation": "The formula bar shows complete cell contents."
    },
    {
      "question": "Why keep Northstar Commerce raw data on a separate sheet?",
      "options": [
        "Excel requires it",
        "Protects formulas when data refreshes",
        "Raw data cannot be numeric",
        "Charts require two sheets"
      ],
      "correctIndex": 1,
      "explanation": "Separating raw data prevents broken summaries after refresh."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-cells-ranges-and-tables', [
    {
      "question": "What happens when you add a row below an Excel Table?",
      "options": [
        "Nothing",
        "Table expands",
        "Formulas delete",
        "Must recreate table"
      ],
      "correctIndex": 1,
      "explanation": "Tables auto-expand for adjacent new rows."
    },
    {
      "question": "tblOrders[revenue] is an example of?",
      "options": [
        "Cell comment",
        "Structured reference",
        "Pivot field",
        "Macro"
      ],
      "correctIndex": 1,
      "explanation": "Structured references name table columns."
    },
    {
      "question": "Why are blank rows inside data problematic?",
      "options": [
        "Improve speed",
        "Split ranges and break detection",
        "Auto-deleted",
        "Only affect charts"
      ],
      "correctIndex": 1,
      "explanation": "Blank rows interrupt contiguous data."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-sorting-and-filtering', [
    {
      "question": "Risk of sorting only column A in a five-column dataset?",
      "options": [
        "Crash",
        "Misaligned rows",
        "Filters break",
        "Only column A updates"
      ],
      "correctIndex": 1,
      "explanation": "Partial sorts break row integrity."
    },
    {
      "question": "Does filtering delete rows?",
      "options": [
        "Yes permanently",
        "No, hides temporarily",
        "Only in Tables",
        "Only when saved"
      ],
      "correctIndex": 1,
      "explanation": "Filters hide; data remains."
    },
    {
      "question": "Sort Region then Revenue uses?",
      "options": [
        "Conditional formatting",
        "Multi-level Sort",
        "Pivot only",
        "Text to Columns"
      ],
      "correctIndex": 1,
      "explanation": "Data > Sort supports multiple levels."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-relative-and-absolute-references', [
    {
      "question": "=$A$1 copied from B2 to B3 becomes?",
      "options": [
        "=$A$2",
        "=$A$1",
        "=B$1",
        "#REF!"
      ],
      "correctIndex": 1,
      "explanation": "Fully absolute references stay fixed."
    },
    {
      "question": "$B1 locks?",
      "options": [
        "Row only",
        "Column only",
        "Both",
        "Neither"
      ],
      "correctIndex": 1,
      "explanation": "$ before B locks the column."
    },
    {
      "question": "Best place for company-wide shipping fee?",
      "options": [
        "Inside each row",
        "Single assumption cell",
        "Comment",
        "Chart title"
      ],
      "correctIndex": 1,
      "explanation": "Central assumptions audit easier."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-sum-average-min-and-max', [
    {
      "question": "SUM ignores?",
      "options": [
        "Numbers",
        "Text and blanks in range behavior",
        "Nothing",
        "Only negatives"
      ],
      "correctIndex": 1,
      "explanation": "SUM skips text; blank handling depends on context."
    },
    {
      "question": "AVERAGE of 100, 200, blank?",
      "options": [
        "150",
        "100",
        "300",
        "Error always"
      ],
      "correctIndex": 0,
      "explanation": "Excel averages numeric cells; blank often excluded."
    },
    {
      "question": "Find largest single order value with?",
      "options": [
        "COUNT",
        "MAX",
        "IF",
        "CONCAT"
      ],
      "correctIndex": 1,
      "explanation": "MAX returns the largest numeric value."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-count-and-counta', [
    {
      "question": "COUNT on column of order_id text returns?",
      "options": [
        "Row count",
        "0",
        "Error",
        "Distinct count"
      ],
      "correctIndex": 1,
      "explanation": "COUNT only counts numeric cells."
    },
    {
      "question": "COUNTA includes?",
      "options": [
        "Numbers and text",
        "Numbers only",
        "Errors only",
        "Formatted blanks as values"
      ],
      "correctIndex": 0,
      "explanation": "COUNTA counts any non-empty cell."
    },
    {
      "question": "Best function to verify imported row count on text IDs?",
      "options": [
        "SUM",
        "COUNTA",
        "AVERAGE",
        "MAX"
      ],
      "correctIndex": 1,
      "explanation": "COUNTA counts non-empty text IDs."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-if', [
    {
      "question": "IF requires how many arguments?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 2,
      "explanation": "IF needs test, true value, false value."
    },
    {
      "question": "Text output in IF must be?",
      "options": [
        "Unquoted",
        "In quotes",
        "A cell color",
        "A macro"
      ],
      "correctIndex": 1,
      "explanation": "Text literals need double quotes."
    },
    {
      "question": "IF(G2>1000,\"VIP\",\"Standard\") when G2=800 returns?",
      "options": [
        "VIP",
        "Standard",
        "TRUE",
        "800"
      ],
      "correctIndex": 1,
      "explanation": "800 fails >1000 test."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-sumif-and-sumifs', [
    {
      "question": "SUMIFS argument order starts with?",
      "options": [
        "Criteria range",
        "Sum range",
        "Criteria text",
        "Header"
      ],
      "correctIndex": 1,
      "explanation": "SUMIFS leads with sum_range."
    },
    {
      "question": "SUMIF to sum revenue where region=\"West\"?",
      "options": [
        "SUM revenue where West",
        "SUMIF(region,\"West\",revenue)",
        "IF(SUM)",
        "COUNTIF"
      ],
      "correctIndex": 1,
      "explanation": "SUMIF(criteria_range, criteria, sum_range)."
    },
    {
      "question": "Common SUMIFS error cause?",
      "options": [
        "Too few sheets",
        "Mismatched range sizes",
        "Using tables",
        "Frozen panes"
      ],
      "correctIndex": 1,
      "explanation": "All criteria ranges must be same size."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-countif-and-countifs', [
    {
      "question": "COUNTIF counts or sums?",
      "options": [
        "Sums",
        "Counts",
        "Averages",
        "Looks up"
      ],
      "correctIndex": 1,
      "explanation": "COUNTIF returns a count."
    },
    {
      "question": "COUNTIFS criteria relationship?",
      "options": [
        "OR",
        "AND",
        "XOR",
        "NONE"
      ],
      "correctIndex": 1,
      "explanation": "All COUNTIFS criteria must match."
    },
    {
      "question": "Count revenue over 200 uses criteria?",
      "options": [
        "200",
        "\">200\"",
        "SUM",
        "IFERROR"
      ],
      "correctIndex": 1,
      "explanation": "Comparison criteria go in quotes."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-iferror', [
    {
      "question": "IFERROR replaces?",
      "options": [
        "Only #N/A",
        "Any Excel error in value",
        "Text",
        "Charts"
      ],
      "correctIndex": 1,
      "explanation": "IFERROR catches any error from value."
    },
    {
      "question": "Better board deck when lookup fails?",
      "options": [
        "#N/A",
        "IFERROR message",
        "Delete row",
        "Hide sheet"
      ],
      "correctIndex": 1,
      "explanation": "Readable fallback maintains professionalism."
    },
    {
      "question": "IFERROR(XLOOKUP(...),\"Not found\") when match exists?",
      "options": [
        "Not found",
        "Lookup result",
        "Error",
        "Blank always"
      ],
      "correctIndex": 1,
      "explanation": "Successful lookups return normal result."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-xlookup', [
    {
      "question": "XLOOKUP advantage over VLOOKUP?",
      "options": [
        "Only works left-to-right",
        "Can search any direction",
        "No exact match",
        "Requires pivot"
      ],
      "correctIndex": 1,
      "explanation": "XLOOKUP searches in any direction."
    },
    {
      "question": "Exact match for product IDs uses match_mode?",
      "options": [
        "-1",
        "0 or default",
        "1",
        "2"
      ],
      "correctIndex": 1,
      "explanation": "Default exact match suits IDs."
    },
    {
      "question": "Return array must be?",
      "options": [
        "Same length as lookup array",
        "Any size",
        "One cell only",
        "Header row"
      ],
      "correctIndex": 0,
      "explanation": "Arrays must align in length."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-index-and-match', [
    {
      "question": "MATCH with 0 means?",
      "options": [
        "Approximate",
        "Exact",
        "Reverse",
        "Wildcard only"
      ],
      "correctIndex": 1,
      "explanation": "Zero specifies exact match."
    },
    {
      "question": "INDEX/MATCH vs XLOOKUP in new work?",
      "options": [
        "Always INDEX",
        "XLOOKUP often simpler",
        "Never lookup",
        "Pivot only"
      ],
      "correctIndex": 1,
      "explanation": "XLOOKUP simplifies most new lookups."
    },
    {
      "question": "MATCH returns?",
      "options": [
        "Value",
        "Position index",
        "Sum",
        "Color"
      ],
      "correctIndex": 1,
      "explanation": "MATCH returns numeric position."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-text-functions', [
    {
      "question": "TRIM removes?",
      "options": [
        "All spaces including middle",
        "Leading/trailing spaces",
        "Numbers",
        "Headers"
      ],
      "correctIndex": 1,
      "explanation": "TRIM cleans edges not internal double spaces fully."
    },
    {
      "question": "FIND returns?",
      "options": [
        "Text",
        "Position number",
        "Boolean",
        "Sum"
      ],
      "correctIndex": 1,
      "explanation": "FIND returns starting position."
    },
    {
      "question": "Why TRIM before VLOOKUP/XLOOKUP?",
      "options": [
        "Speed",
        "Hidden spaces break matches",
        "Required by Excel",
        "Creates pivot"
      ],
      "correctIndex": 1,
      "explanation": "Whitespace breaks exact matches."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-date-functions', [
    {
      "question": "Text \"2024-03-15\" may fail date math until?",
      "options": [
        "Formatted bold",
        "Converted to date type",
        "Sorted",
        "Pivoted"
      ],
      "correctIndex": 1,
      "explanation": "Text dates need conversion."
    },
    {
      "question": "Orders last 30 days filter uses?",
      "options": [
        "SUM",
        "order_date >= TODAY()-30",
        "COUNT blank",
        "IFERROR only"
      ],
      "correctIndex": 1,
      "explanation": "Date comparison defines rolling window."
    },
    {
      "question": "EOMONTH useful for?",
      "options": [
        "Text split",
        "Month-end dates",
        "Lookup",
        "Chart color"
      ],
      "correctIndex": 1,
      "explanation": "EOMONTH returns month-end serial dates."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-cleaning-and-removing-duplicates', [
    {
      "question": "Before Remove Duplicates you should?",
      "options": [
        "Delete raw sheet",
        "Backup raw data",
        "Remove headers",
        "Merge cells"
      ],
      "correctIndex": 1,
      "explanation": "Always backup before destructive steps."
    },
    {
      "question": "COUNTIF($A:$A,A2)>1 flags?",
      "options": [
        "Unique rows",
        "Duplicate keys in column A",
        "Blanks",
        "Errors"
      ],
      "correctIndex": 1,
      "explanation": "Counts greater than one indicate duplicates."
    },
    {
      "question": "Keep latest order per order_id requires?",
      "options": [
        "Random row",
        "Sort by date before remove",
        "Delete column",
        "Chart"
      ],
      "correctIndex": 1,
      "explanation": "Sort ensures first row kept is latest when using remove tool strategy."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-conditional-formatting', [
    {
      "question": "Formula conditional format =B2<$F$1 applies when?",
      "options": [
        "Always",
        "Cell value below F1",
        "Text equals F1",
        "Never"
      ],
      "correctIndex": 1,
      "explanation": "Formula evaluates per cell."
    },
    {
      "question": "Risk of rainbow color scales everywhere?",
      "options": [
        "Faster analysis",
        "Visual noise and misread",
        "Required for pivots",
        "Fixes duplicates"
      ],
      "correctIndex": 1,
      "explanation": "Too much color reduces clarity."
    },
    {
      "question": "Accessibility best practice?",
      "options": [
        "Color only",
        "Color plus text or icon",
        "Hide numbers",
        "White text on white"
      ],
      "correctIndex": 1,
      "explanation": "Do not rely on color alone."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-pivottables', [
    {
      "question": "Pivot source should be?",
      "options": [
        "Merged cells",
        "Structured table",
        "Blank rows mid-data",
        "Chart"
      ],
      "correctIndex": 1,
      "explanation": "Clean tabular source required."
    },
    {
      "question": "After CSV refresh you must?",
      "options": [
        "Recreate pivot",
        "Refresh pivot",
        "Delete table",
        "Sort pivot manually only"
      ],
      "correctIndex": 1,
      "explanation": "Refresh pulls new source rows."
    },
    {
      "question": "Channel in Filters area?",
      "options": [
        "Slices entire pivot",
        "Only sorts channel",
        "Deletes channel",
        "Creates chart"
      ],
      "correctIndex": 0,
      "explanation": "Report filter applies to whole pivot."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-charts-and-chart-selection', [
    {
      "question": "Best chart for monthly revenue trend?",
      "options": [
        "Pie",
        "Line",
        "Scatter of raw orders",
        "3D doughnut"
      ],
      "correctIndex": 1,
      "explanation": "Line charts show time trends."
    },
    {
      "question": "Compare four regions revenue?",
      "options": [
        "Line over 18k rows",
        "Column on aggregated totals",
        "Pie with 40 slices",
        "No labels"
      ],
      "correctIndex": 1,
      "explanation": "Aggregate first then column compare."
    },
    {
      "question": "Truncated Y axis on bar charts can?",
      "options": [
        "Improve clarity always",
        "Exaggerate differences",
        "Fix duplicates",
        "Replace pivot"
      ],
      "correctIndex": 1,
      "explanation": "Non-zero baseline distorts comparison."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-dashboard-design', [
    {
      "question": "Dashboard KPI tiles should?",
      "options": [
        "Be manually retyped weekly",
        "Link to formula cells",
        "Hide labels",
        "Use 20 colors"
      ],
      "correctIndex": 1,
      "explanation": "Linked formulas stay current on refresh."
    },
    {
      "question": "Slicer purpose?",
      "options": [
        "Sort alphabetically only",
        "Visual filter for connected pivots",
        "Delete data",
        "Merge cells"
      ],
      "correctIndex": 1,
      "explanation": "Slicers filter connected reports."
    },
    {
      "question": "Good dashboard design prioritizes?",
      "options": [
        "Decoration",
        "One clear decision question",
        "All raw rows",
        "3D effects"
      ],
      "correctIndex": 1,
      "explanation": "Focus beats clutter."
    }
  ]),
  makeQuiz('excel', 'excel-lesson-excel-business-dashboard-project', [
    {
      "question": "Capstone workbook should separate?",
      "options": [
        "Everything on one sheet",
        "Raw, summary, dashboard layers",
        "Only charts",
        "Macros only"
      ],
      "correctIndex": 1,
      "explanation": "Layered structure aids refresh and audit."
    },
    {
      "question": "Before revenue KPIs you should?",
      "options": [
        "Skip QA",
        "Dedupe orders on order_id",
        "Delete customers",
        "Remove headers"
      ],
      "correctIndex": 1,
      "explanation": "Duplicates inflate revenue."
    },
    {
      "question": "Finance tie-out means?",
      "options": [
        "Match control total within tolerance",
        "Ignore finance",
        "Delete pivots",
        "Hide errors only"
      ],
      "correctIndex": 0,
      "explanation": "QA against finance control builds trust."
    }
  ])
];

export const excelExercises = [
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-excel-interface-and-workbook-basics",
    "title": "Set Up a Northstar Workbook",
    "instructions": "Design a two-sheet Northstar Commerce orders workbook. Name the sheets and list four column headers for raw order data.",
    "hint": "Think order_id, region, order_date, revenue.",
    "expectedAnswer": "Raw_Orders and Summary sheets; headers order_id, region, order_date, revenue; freeze top row on raw data.",
    "explanation": "Retail analysts isolate source data before building KPIs.",
    "skillTags": [
      "workbook",
      "setup"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-cells-ranges-and-tables",
    "title": "Create tbl_order_items",
    "instructions": "Describe converting Northstar Commerce order lines A1:E500 into a named table.",
    "hint": "Ctrl+T, confirm headers, rename in Table Design.",
    "expectedAnswer": "Select A1:E500, Insert Table with headers, name tbl_order_items, verify structured references.",
    "explanation": "Named tables stabilize SUMIFS and pivots.",
    "skillTags": [
      "tables"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-sorting-and-filtering",
    "title": "Filter Support Tickets",
    "instructions": "List steps to show Northstar Commerce tickets open more than 14 days, oldest first.",
    "hint": "Filter status and date, then sort.",
    "expectedAnswer": "Filter status to open, date before today-14, sort opened_date ascending on full table.",
    "explanation": "Aligned filters preserve ticket-customer links.",
    "skillTags": [
      "filter"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-relative-and-absolute-references",
    "title": "Fix Assumption Reference",
    "instructions": "Formula =B2*Assumptions!B1 copied to row 100 uses B99. Fix it.",
    "hint": "Lock the assumption cell.",
    "expectedAnswer": "Use =B2*Assumptions!$B$1",
    "explanation": "Absolute references prevent drift.",
    "skillTags": [
      "references"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-sum-average-min-and-max",
    "title": "Compute Regional Totals",
    "instructions": "Write formulas for total and average Northstar Commerce revenue in F1 and F2 from tblOrders[revenue].",
    "hint": "SUM and AVERAGE structured refs.",
    "expectedAnswer": "=SUM(tblOrders[revenue]) and =AVERAGE(tblOrders[revenue])",
    "explanation": "Aggregates anchor executive summaries.",
    "skillTags": [
      "sum",
      "average"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-count-and-counta",
    "title": "Validate Import Rows",
    "instructions": "Northstar Commerce manifest expects 5,200 orders. Which formula on order_id column?",
    "hint": "COUNTA not COUNT.",
    "expectedAnswer": "=COUNTA(tblOrders[order_id]) expecting 5200",
    "explanation": "COUNTA confirms completeness after ETL.",
    "skillTags": [
      "count"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-if",
    "title": "Build VIP Flag",
    "instructions": "Write IF formula for Northstar Commerce VIP when lifetime_spend in G2 exceeds 1000.",
    "hint": "Three-argument IF with quoted labels.",
    "expectedAnswer": "=IF(G2>1000,\"VIP\",\"Standard\")",
    "explanation": "Segment flags power marketing lists.",
    "skillTags": [
      "if"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-sumif-and-sumifs",
    "title": "South Web Revenue",
    "instructions": "Write SUMIFS for Northstar Commerce South region Web channel revenue from tblOrders.",
    "hint": "Sum range first; two criteria.",
    "expectedAnswer": "=SUMIFS(tblOrders[revenue], tblOrders[region], \"South\", tblOrders[channel], \"Web\")",
    "explanation": "SUMIFS answers multi-filter stakeholder questions.",
    "skillTags": [
      "sumifs"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-countif-and-countifs",
    "title": "Count Open Shipping Tickets",
    "instructions": "Write COUNTIFS for Northstar Commerce open Shipping tickets.",
    "hint": "Two criteria on status and category.",
    "expectedAnswer": "=COUNTIFS(tblTickets[status],\"Open\", tblTickets[category],\"Shipping\")",
    "explanation": "Conditional counts drive ops staffing views.",
    "skillTags": [
      "countifs"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-iferror",
    "title": "Wrap a Lookup",
    "instructions": "Wrap Northstar Commerce product XLOOKUP with friendly missing message.",
    "hint": "IFERROR around XLOOKUP.",
    "expectedAnswer": "=IFERROR(XLOOKUP(A2,tblProducts[product_id],tblProducts[product_name]),\"Missing product\")",
    "explanation": "Graceful failures keep dashboards trustworthy.",
    "skillTags": [
      "iferror"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-xlookup",
    "title": "Enrich Order Category",
    "instructions": "XLOOKUP Northstar Commerce category by product_id in D2 from tblProducts.",
    "hint": "Three-argument XLOOKUP.",
    "expectedAnswer": "=XLOOKUP(D2,tblProducts[product_id],tblProducts[category])",
    "explanation": "Lookups connect fact tables to dimensions.",
    "skillTags": [
      "xlookup"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-index-and-match",
    "title": "Build INDEX/MATCH Price",
    "instructions": "Write INDEX/MATCH for list_price by product_id in D2.",
    "hint": "MATCH third arg 0.",
    "expectedAnswer": "=INDEX(tblProducts[list_price],MATCH(D2,tblProducts[product_id],0))",
    "explanation": "Legacy pattern remains common in enterprise files.",
    "skillTags": [
      "index",
      "match"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-text-functions",
    "title": "Split First Name",
    "instructions": "Write formula extracting first name from full_name in A2 with space delimiter.",
    "hint": "LEFT and FIND.",
    "expectedAnswer": "=LEFT(TRIM(A2),FIND(\" \",TRIM(A2))-1)",
    "explanation": "Parsed names enable mail merge and CRM uploads.",
    "skillTags": [
      "text"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-date-functions",
    "title": "Rolling 30-Day Flag",
    "instructions": "Formula TRUE when Northstar Commerce order_date within last 30 days.",
    "hint": "Compare to TODAY()-30.",
    "expectedAnswer": "=B2>=TODAY()-30",
    "explanation": "Rolling windows power ops and marketing KPIs.",
    "skillTags": [
      "dates"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-cleaning-and-removing-duplicates",
    "title": "Plan Dedupe on order_id",
    "instructions": "Describe Northstar Commerce steps to dedupe orders keeping latest order_date.",
    "hint": "Backup, sort, remove duplicates.",
    "expectedAnswer": "Backup sheet; sort order_date descending; Data > Remove Duplicates on order_id; log removed count.",
    "explanation": "Deduping protects revenue accuracy.",
    "skillTags": [
      "cleaning"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-conditional-formatting",
    "title": "Highlight Below Target",
    "instructions": "Describe conditional format when Northstar Commerce actual revenue cell B2 is below target in Assumptions!$C$2.",
    "hint": "Formula-based new rule.",
    "expectedAnswer": "Select B2:B5, New Rule formula =B2<Assumptions!$C$2, red fill.",
    "explanation": "Highlights exceptions for leadership reviews.",
    "skillTags": [
      "formatting"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-pivottables",
    "title": "Design a Revenue Pivot",
    "instructions": "List Northstar Commerce pivot fields for region x category revenue with channel filter.",
    "hint": "Rows, Columns, Values, Filters.",
    "expectedAnswer": "Rows region, Columns category, Values revenue Sum, Filters channel.",
    "explanation": "Pivots accelerate multidimensional questions.",
    "skillTags": [
      "pivot"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-charts-and-chart-selection",
    "title": "Pick Chart Type",
    "instructions": "Northstar Commerce VP wants monthly trend with target overlay. Which chart?",
    "hint": "Combo line and column.",
    "expectedAnswer": "Combo chart: columns for monthly revenue, line series for monthly target.",
    "explanation": "Right chart type answers the question clearly.",
    "skillTags": [
      "charts"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-dashboard-design",
    "title": "Sketch Dashboard Layout",
    "instructions": "List four Northstar Commerce KPIs and one chart for weekly ops dashboard.",
    "hint": "Revenue, orders, AOV, tickets.",
    "expectedAnswer": "KPIs: total revenue, order count, AOV, open support tickets; chart: weekly revenue trend; region slicer.",
    "explanation": "Layout planning prevents cluttered packs.",
    "skillTags": [
      "dashboard"
    ]
  }),
  makeExercise({
    "subjectId": "excel",
    "lessonId": "excel-lesson-excel-business-dashboard-project",
    "title": "Capstone Milestone Plan",
    "instructions": "List first three deliverables for Northstar Commerce Excel capstone.",
    "hint": "Import, dedupe, regional summary.",
    "expectedAnswer": "1) Table-ize raw orders/customers/products 2) Dedupe orders 3) Regional revenue SUMIFS + pivot on Summary sheet.",
    "explanation": "Milestone plan keeps capstone manageable.",
    "skillTags": [
      "project"
    ]
  })
];
