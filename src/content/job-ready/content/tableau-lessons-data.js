import { makeQuiz, makeExercise } from '../lesson-factory.js';

export const tableauLessonContent = {
  'tableau-lesson-tableau-interface': {
    "learningObjectives": [
      "Identify Data, Analytics, and Worksheet panes in Tableau Desktop",
      "Connect shelf, rows, columns, and marks cards to build a first view",
      "Save and organize workbooks for Northstar reporting"
    ],
    "plainEnglish": "Tableau Desktop shows your data on the left and a canvas on the right. You drag fields to shelves to ask questions—like how Northstar Commerce revenue compares across regions—without writing SQL in the view.",
    "whatItDoes": "Provides a visual analytics workspace to explore and publish interactive views.",
    "whyItMatters": "Northstar Commerce marketing and ops leaders expect clickable dashboards; knowing the interface lets you rebuild views under time pressure.",
    "whenToUse": "Exploratory analysis, stakeholder dashboards, and ad-hoc visual answers.",
    "stakeholderQuestion": "Can you open our Tableau workbook and show me last month revenue by region?",
    "walkthrough": "Open Tableau Desktop. Left pane lists data source fields. Center canvas is the worksheet. Drag Region to Columns and Revenue to Rows—Tableau builds a bar chart. Marks card controls color, size, and labels. Use Show Me for chart suggestions. Save as .twb or .twbx with extract if sharing offline.",
    "syntax": "Drag dimension → Columns or Rows\nDrag measure → Rows, Columns, or Marks\nShow Me → pick chart type\nFile > Save As → workbook",
    "componentBreakdown": [
      {
        "part": "Data pane",
        "explanation": "Lists dimensions and measures from the connection."
      },
      {
        "part": "Shelves",
        "explanation": "Columns, Rows, Filters, Pages hold fields defining the view."
      },
      {
        "part": "Marks card",
        "explanation": "Controls mark type, color, size, label, detail, tooltip."
      },
      {
        "part": "Worksheet tab",
        "explanation": "Single view; dashboards combine multiple sheets."
      }
    ],
    "sampleInput": "Northstar Commerce orders data source with region dimension and revenue measure.",
    "expectedOutput": "Bar chart of revenue by region saved in northstar_sales.twbx.",
    "commonMistakes": [
      "Dragging measures to Filters accidentally before understanding aggregation",
      "Confusing worksheet with dashboard",
      "Not saving extract when emailing workbooks to stakeholders without database access"
    ],
    "bestPractices": [
      "Name worksheets clearly: Revenue by Region",
      "Use Data Source tab to preview row-level data",
      "Document refresh schedule in workbook description"
    ],
    "guidedExample": {
      "description": "Build first Northstar Commerce view: revenue by region bar chart.",
      "steps": [
        "Connect orders",
        "Drag region to Columns",
        "Drag revenue to Rows",
        "Sort descending"
      ]
    },
    "tags": [
      "interface",
      "fundamentals"
    ],
    "projectConnectionText": "Foundation for the Northstar Commerce Tableau Portfolio Dashboard Project."
  },

  'tableau-lesson-connecting-to-data': {
    "learningObjectives": [
      "Connect Tableau to Excel, CSV, and database sources",
      "Understand live vs extract connections",
      "Preview and interpret the logical layer before building views"
    ],
    "plainEnglish": "Before charting Northstar Commerce orders, Tableau needs a connection—often a CSV export or warehouse table. Extracts snapshot data for speed; live connections query the source each refresh.",
    "whatItDoes": "Links Tableau to files or databases and defines what tables and fields are available.",
    "whyItMatters": "Wrong connection type slows dashboards or shows stale numbers in Monday standups.",
    "whenToUse": "Starting any workbook, refreshing ETL outputs, or blending marketing spend with orders.",
    "stakeholderQuestion": "Use yesterday's order export—why does Tableau still show last week?",
    "walkthrough": "Connect > Microsoft Excel or Text file. Select northstar_orders.xlsx sheet. Data Source tab shows field grid. Choose Live or Extract—Extract for large CSV performance. Set refresh schedule if published to Server. Join customers on customer_id if multiple tables present.",
    "syntax": "Connect > To a File > Excel / CSV\nData Source: drag tables to canvas\nJoin: customer_id = customer_id\nExtract: Data > Extract Data",
    "componentBreakdown": [
      {
        "part": "Connection",
        "explanation": "Path or server credentials to data."
      },
      {
        "part": "Logical layer",
        "explanation": "Joins and unions defined on Data Source tab."
      },
      {
        "part": "Extract",
        "explanation": "Hyper snapshot for performance and portability."
      },
      {
        "part": "Live",
        "explanation": "Queries source at refresh time."
      }
    ],
    "sampleInput": "Northstar Commerce orders.xlsx and customers.csv linked on customer_id.",
    "expectedOutput": "Single logical table with order and customer fields ready to drag.",
    "commonMistakes": [
      "Many-to-many joins inflating revenue",
      "Forgetting to refresh extract after new CSV drop",
      "Connecting to wrong sheet tab in Excel workbook"
    ],
    "bestPractices": [
      "Validate row counts against manifest after connect",
      "Document join keys on Data Source description",
      "Use extracts for demo workbooks shared externally"
    ],
    "guidedExample": {
      "description": "Connect Northstar Commerce orders and customers on customer_id.",
      "steps": [
        "Add orders file",
        "Add customers",
        "Inner join customer_id",
        "Preview row count"
      ]
    },
    "tags": [
      "connection",
      "data-source"
    ],
    "projectConnectionText": "Capstone connects Northstar orders, products, and targets sources."
  },

  'tableau-lesson-dimensions-and-measures': {
    "learningObjectives": [
      "Classify fields as dimensions (categories) or measures (numbers)",
      "Understand default aggregation on measures",
      "Fix misclassified fields in Data pane"
    ],
    "plainEnglish": "Dimensions describe—region, product category, campaign name. Measures quantify—revenue, quantity, spend. Northstar Commerce views pair dimensions on shelves with aggregated measures.",
    "whatItDoes": "Separates categorical breakdown fields from numeric fields Tableau can sum or average.",
    "whyItMatters": "Dragging order_id as a measure sums IDs into nonsense totals.",
    "whenToUse": "Every time you build a view—before choosing chart type.",
    "stakeholderQuestion": "Break revenue down by marketing channel— which fields are which?",
    "walkthrough": "Blue pills are dimensions; green are measures. Drag channel (dimension) to Columns. Drag revenue (measure) to Rows—default SUM. If order_id appears as measure, convert to dimension: right-click > Convert to Dimension. Set default properties for geographic roles later.",
    "syntax": "Dimension → Columns/Rows/Filters/Color\nMeasure → Rows/Columns with SUM/AVG/COUNT\nRight-click field > Convert to Dimension/Measure",
    "componentBreakdown": [
      {
        "part": "Dimension",
        "explanation": "Categorical field creating headers and slices."
      },
      {
        "part": "Measure",
        "explanation": "Numeric field aggregated by default."
      },
      {
        "part": "Aggregation",
        "explanation": "SUM, AVG, COUNT applied on measure pills."
      }
    ],
    "sampleInput": "Northstar Commerce fields: order_id, region, category, revenue, quantity, campaign_spend.",
    "expectedOutput": "region and category as dimensions; revenue and spend summed in view.",
    "commonMistakes": [
      "Summing ID fields",
      "Leaving dates as measures",
      "Not setting numeric dimensions like year as dimension"
    ],
    "bestPractices": [
      "Rename fields for business language in data source",
      "Hide unused fields",
      "Document measure definitions"
    ],
    "guidedExample": {
      "description": "Fix order_id summed incorrectly.",
      "steps": [
        "Convert order_id to dimension",
        "Use COUNT order_id for volume",
        "SUM revenue for dollars"
      ]
    },
    "tags": [
      "dimensions",
      "measures"
    ],
    "projectConnectionText": "Capstone model labels Northstar dimensions and measures clearly."
  },

  'tableau-lesson-discrete-and-continuous-fields': {
    "learningObjectives": [
      "Distinguish discrete (blue) vs continuous (green) pills on shelves",
      "Choose discrete dates for headers vs continuous for trend lines",
      "Adjust field properties to change behavior"
    ],
    "plainEnglish": "Discrete fields create distinct buckets—each month as a column. Continuous fields draw an axis—month as a flowing timeline. Northstar Commerce monthly revenue trends use continuous order_date; categorical month headers use discrete.",
    "whatItDoes": "Controls whether Tableau treats a field as separate categories or a numeric/time axis.",
    "whyItMatters": "Wrong date type produces bar charts instead of smooth trends—or double axes confusion.",
    "whenToUse": "Date analysis, histograms, and precise control of axis layout.",
    "stakeholderQuestion": "Show revenue trend by week as a line, not separate bars for each week label.",
    "walkthrough": "Right-click order_date > drag to Columns as continuous Month. Revenue on Rows continuous SUM. For discrete month columns, choose discrete Month from date menu. Color encodings: discrete palette for categories, continuous gradient for measures.",
    "syntax": "Right-click date field:\n  Discrete Month → headers\n  Continuous Month → timeline axis\nPill color: blue discrete, green continuous",
    "componentBreakdown": [
      {
        "part": "Discrete",
        "explanation": "Individual headers or separate marks."
      },
      {
        "part": "Continuous",
        "explanation": "Unified axis from min to max."
      },
      {
        "part": "Date hierarchies",
        "explanation": "Year, quarter, month drill paths."
      }
    ],
    "sampleInput": "Northstar Commerce order_date and daily revenue for 12 months.",
    "expectedOutput": "Continuous line trend vs discrete monthly bar columns as intended.",
    "commonMistakes": [
      "Mixing discrete and continuous date on same shelf incorrectly",
      "Using continuous on categories like region",
      "Year truncating when continuous day needed"
    ],
    "bestPractices": [
      "Pick discrete for compare; continuous for trend",
      "Format date axes clearly",
      "Hide unused date hierarchy levels"
    ],
    "guidedExample": {
      "description": "Monthly revenue trend line.",
      "steps": [
        "order_date continuous Month on Columns",
        "SUM revenue Rows",
        "Line mark type"
      ]
    },
    "tags": [
      "discrete",
      "continuous",
      "dates"
    ],
    "projectConnectionText": "Capstone trend views use continuous dates; KPI tables use discrete months."
  },

  'tableau-lesson-bar-and-line-charts': {
    "learningObjectives": [
      "Build bar charts for categorical comparisons",
      "Build line charts for time series trends",
      "Use Show Me and swap mark types appropriately"
    ],
    "plainEnglish": "Bars compare Northstar Commerce regions or categories; lines show revenue over time. Pick the mark type that matches the question—not every chart belongs in a dashboard.",
    "whatItDoes": "Visualizes aggregated measures across dimensions or time.",
    "whyItMatters": "Misleading chart choice caused a Northeast promo to look flat when bars hid weekly volatility.",
    "whenToUse": "Bar for compare; line for trend; stacked bar for part-to-whole with few categories.",
    "stakeholderQuestion": "Compare Q1 revenue by category, then show weekly trend for top category.",
    "walkthrough": "Bar: category on Columns, SUM revenue Rows, sort descending. Line: continuous Week order_date on Columns, revenue Rows, mark Line. Dual analysis: duplicate sheet. Use synchronized axes only when scales comparable. Label ends sparingly.",
    "syntax": "Bar: Dimension → Columns, Measure → Rows\nLine: Continuous date → Columns, Measure → Rows\nMarks > dropdown: Bar / Line",
    "componentBreakdown": [
      {
        "part": "Bar mark",
        "explanation": "Compare discrete categories."
      },
      {
        "part": "Line mark",
        "explanation": "Connect values over continuous axis."
      },
      {
        "part": "Sort",
        "explanation": "Descending bar order aids scan."
      }
    ],
    "sampleInput": "Northstar Commerce revenue by category and weekly order_date series.",
    "expectedOutput": "Sorted bar chart plus line trend sheet.",
    "commonMistakes": [
      "Line chart with discrete unrelated categories on axis",
      "Too many colors in stacked bars",
      "Dual axis without labeling scale difference"
    ],
    "bestPractices": [
      "Sort bars by value not alphabet",
      "Start axis at zero for bars",
      "Title sheets with the question answered"
    ],
    "guidedExample": {
      "description": "Top 5 categories bar chart.",
      "steps": [
        "category Columns",
        "SUM revenue Rows",
        "Filter top 5 by revenue",
        "Sort desc"
      ]
    },
    "tags": [
      "bar",
      "line",
      "charts"
    ],
    "projectConnectionText": "Capstone includes regional bar chart and weekly revenue line."
  },

  'tableau-lesson-maps-and-geographic-analysis': {
    "learningObjectives": [
      "Assign geographic roles to region or state fields",
      "Build filled or symbol maps for Northstar regional metrics",
      "Interpret map limitations when data is region-level only"
    ],
    "plainEnglish": "Maps let executives see Northstar Commerce performance by geography instantly. Assign Region a geographic role, drop it on the view, and size or color by revenue.",
    "whatItDoes": "Plots measures on geographic locations when fields have valid geo roles.",
    "whyItMatters": "Regional ops leads at Northstar prioritize warehouse staffing from map outliers.",
    "whenToUse": "Regional comparisons with valid geo fields—not street addresses unless geocoded.",
    "stakeholderQuestion": "Which region underperformed target last month—show me on a map.",
    "walkthrough": "Right-click region > Geographic Role > State/Province (or custom territory). Double-click region pill creates map. Drag SUM revenue to Color on Marks. Optional: size by order count. For custom territories map West/Midwest/South/Northeast using a territory field with assigned geocoding.",
    "syntax": "Right-click field > Geographic Role\nDouble-click geo field → map\nColor/Size on Marks = measure",
    "componentBreakdown": [
      {
        "part": "Geographic role",
        "explanation": "Tells Tableau how to plot field."
      },
      {
        "part": "Filled map",
        "explanation": "Color regions by measure intensity."
      },
      {
        "part": "Symbol map",
        "explanation": "Points sized/colored by measure."
      }
    ],
    "sampleInput": "Northstar Commerce monthly revenue and orders by region field.",
    "expectedOutput": "Filled map with darker color for higher revenue regions.",
    "commonMistakes": [
      "Unrecognized locations creating null maps",
      "Using city role on region names",
      "Map when bar chart clearer for four regions"
    ],
    "bestPractices": [
      "Validate all locations recognized",
      "Provide legend and labels",
      "Use bar chart when only four regions"
    ],
    "guidedExample": {
      "description": "Revenue filled map by region.",
      "steps": [
        "Assign geo role",
        "Double-click region",
        "Color by SUM revenue",
        "Add labels"
      ]
    },
    "tags": [
      "maps",
      "geo"
    ],
    "projectConnectionText": "Capstone map highlights Northstar regional target variance."
  },

  'tableau-lesson-filters-and-sorting': {
    "learningObjectives": [
      "Add dimension and measure filters to worksheets and dashboards",
      "Configure filter types: single, multiple, date range, top N",
      "Sort views for readable stakeholder presentations"
    ],
    "plainEnglish": "Filters focus the view—only Midwest Web orders last month. Sorting puts the biggest Northstar Commerce categories first so leaders see signal without scrolling tables.",
    "whatItDoes": "Limits data visible in a view and orders categories by value or name.",
    "whyItMatters": "Unfiltered 200-category charts waste executive attention in weekly reviews.",
    "whenToUse": "Dashboard interactivity, presentation mode, and exception analysis.",
    "stakeholderQuestion": "Filter to Northeast and top 5 product categories by revenue.",
    "walkthrough": "Drag region to Filters > select Northeast. Drag category to Filters > Top tab > By field revenue top 5. For dates, relative filter last 30 days. On dashboard, expose filters as single-value dropdowns. Sort bars descending via axis menu.",
    "syntax": "Drag field → Filters shelf\nTop N filter: Top 5 by SUM(revenue)\nSort: axis dropdown > Sort descending by field",
    "componentBreakdown": [
      {
        "part": "Dimension filter",
        "explanation": "Include/exclude categories."
      },
      {
        "part": "Measure filter",
        "explanation": "Limit by aggregated values."
      },
      {
        "part": "Top N",
        "explanation": "Keep highest/lowest categories by measure."
      },
      {
        "part": "Sort",
        "explanation": "Order marks for readability."
      }
    ],
    "sampleInput": "Northstar Commerce full orders dataset with all regions and 120 categories.",
    "expectedOutput": "Northeast-only view with five largest categories by revenue sorted desc.",
    "commonMistakes": [
      "Context filters confusing on dashboards",
      "Top N without specifying measure field",
      "Sort on wrong field alphabetically hiding insights"
    ],
    "bestPractices": [
      "Use context filters sparingly",
      "Show filter clearly on dashboard",
      "Reset filters before publishing QA"
    ],
    "guidedExample": {
      "description": "Last 90 days filter on order_date.",
      "steps": [
        "order_date to Filters",
        "Relative date last 90 days",
        "Apply to all worksheets if needed"
      ]
    },
    "tags": [
      "filters",
      "sort"
    ],
    "projectConnectionText": "Capstone dashboard exposes region and date filters for self-serve."
  },

  'tableau-lesson-calculated-fields': {
    "learningObjectives": [
      "Create row-level and aggregate calculated fields",
      "Write formulas for profit, conversion rate, and AOV",
      "Understand when calculations happen at row vs aggregate level"
    ],
    "plainEnglish": "Calculated fields create new metrics—profit equals revenue minus cost, conversion rate equals orders divided by sessions. Northstar Commerce analysts build these once and reuse across dashboards.",
    "whatItDoes": "Adds derived columns using formulas at row level or aggregated in the view.",
    "whyItMatters": "Consistent AOV definition prevents three teams reporting three numbers.",
    "whenToUse": "Business metrics not in source, ratios, bucketing, and flags.",
    "stakeholderQuestion": "Show profit margin percent by category, not just revenue.",
    "walkthrough": "Analysis > Create Calculated Field. Name Profit. Formula: [revenue] - [unit_cost]*[quantity]. Margin: SUM([Profit])/SUM([revenue]). Use aggregation inside calculated fields when appropriate. Test in crosstab. Fix divide-by-zero with IF or IIF.",
    "syntax": "Profit = [revenue] - [unit_cost]*[quantity]\nMargin = SUM([Profit]) / SUM([revenue])\nAOV = SUM([revenue]) / COUNTD([order_id])",
    "componentBreakdown": [
      {
        "part": "Row-level calc",
        "explanation": "Computed per data row before aggregation."
      },
      {
        "part": "Aggregate calc",
        "explanation": "Uses SUM, AVG inside formula at view level."
      },
      {
        "part": "COUNTD",
        "explanation": "Distinct count—orders not double-counted."
      }
    ],
    "sampleInput": "Northstar Commerce order_items with revenue, unit_cost, quantity, order_id.",
    "expectedOutput": "Margin calculated field usable on Rows and Color.",
    "commonMistakes": [
      "Mixing row and aggregate without FIXED/INCLUDE awareness at beginner level",
      "Divide by zero on margin",
      "Duplicating calcs with inconsistent formulas"
    ],
    "bestPractices": [
      "Name calcs with business terms",
      "Document formula in description",
      "Validate against Excel control totals"
    ],
    "guidedExample": {
      "description": "Create AOV calculated field.",
      "steps": [
        "SUM(revenue)/COUNTD(order_id)",
        "Drag to worksheet",
        "Compare to finance AOV"
      ]
    },
    "tags": [
      "calculated-fields",
      "dax-like"
    ],
    "projectConnectionText": "Capstone uses calculated profit, margin, and AOV for Northstar KPIs."
  },

  'tableau-lesson-parameters': {
    "learningObjectives": [
      "Create parameters for what-if and user-selected thresholds",
      "Use parameters in calculated fields and reference lines",
      "Expose parameter controls on dashboards"
    ],
    "plainEnglish": "Parameters let viewers change assumptions—show orders above a spend threshold or switch between revenue and order count. Northstar Commerce directors use them in what-if reviews without editing calcs.",
    "whatItDoes": "Stores a single user-controlled value referenced in formulas and filters.",
    "whyItMatters": "Static thresholds require republishing for every new question; parameters adapt in meetings.",
    "whenToUse": "Threshold sliders, metric toggles, date window selection (with calculated filter).",
    "stakeholderQuestion": "Let me slide the VIP spend threshold and see how many customers qualify.",
    "walkthrough": "Create Parameter vip_threshold float default 1000. Calculated field VIP Flag: [lifetime_spend] >= [vip_threshold]. Drag parameter to sheet to show control. Optional: parameter allowed values list for metric toggle Revenue vs Orders driving calc field.",
    "syntax": "Create Parameter: vip_threshold (float)\nVIP Flag = [lifetime_spend] >= [vip_threshold]\nShow parameter control on dashboard",
    "componentBreakdown": [
      {
        "part": "Parameter",
        "explanation": "Independent user input value."
      },
      {
        "part": "Parameter control",
        "explanation": "Slider/dropdown on worksheet or dashboard."
      },
      {
        "part": "Calc referencing parameter",
        "explanation": "Dynamic logic driven by control."
      }
    ],
    "sampleInput": "Northstar Commerce customers with lifetime_spend; default VIP at $1000.",
    "expectedOutput": "Slider adjusts VIP count in view without editing workbook logic.",
    "commonMistakes": [
      "Parameter not connected to any calc or filter",
      "Wrong data type on parameter",
      "Too many parameters confusing users"
    ],
    "bestPractices": [
      "Limit to 1-2 controls per dashboard",
      "Label units clearly ($)",
      "Set sensible min/max/step on sliders"
    ],
    "guidedExample": {
      "description": "VIP threshold parameter on customer view.",
      "steps": [
        "Create parameter",
        "VIP calc references it",
        "Show control",
        "COUNTD customers where VIP Flag true"
      ]
    },
    "tags": [
      "parameters",
      "interactivity"
    ],
    "projectConnectionText": "Capstone parameter toggles metric and VIP threshold views."
  },

  'tableau-lesson-building-interactive-dashboards': {
    "learningObjectives": [
      "Combine sheets, filters, and actions on a dashboard canvas",
      "Size layouts for desktop presentation and tablet",
      "Use filter actions and highlight actions across sheets"
    ],
    "plainEnglish": "A dashboard arranges Northstar Commerce KPIs, maps, and trends on one screen. Clicking Midwest on the map can filter the trend line—interactivity replaces exporting five PNGs.",
    "whatItDoes": "Combines multiple views with shared filters and navigation actions.",
    "whyItMatters": "Self-serve dashboards reduce ad-hoc analyst tickets during month-end.",
    "whenToUse": "Executive packs, team portals, published Server/Cloud views.",
    "stakeholderQuestion": "One screen: regional map, category bars, trend, and filters for date and channel.",
    "walkthrough": "New Dashboard. Drag sheets as tiled or floating objects. Add region quick filter applying to all sheets with same data source. Dashboard > Actions > Filter action map click filters bar chart. Use device layout for tablet. Hide titles for clean look; add text object with definitions.",
    "syntax": "New Dashboard > drag sheets\nDashboard > Actions > Filter / Highlight\nTiled vs Floating layout\nDevice Preview for sizing",
    "componentBreakdown": [
      {
        "part": "Tiled layout",
        "explanation": "Responsive grid arrangement."
      },
      {
        "part": "Filter action",
        "explanation": "Click selection filters other sheets."
      },
      {
        "part": "Unified filters",
        "explanation": "One control applies to multiple sheets."
      }
    ],
    "sampleInput": "Northstar Commerce sheets: Regional Map, Category Bars, Weekly Trend.",
    "expectedOutput": "Dashboard with linked filters and click-to-filter map behavior.",
    "commonMistakes": [
      "Sheets different data sources without blend causing filter failure",
      "Too many floating objects misaligned",
      "Actions not scoped to correct sheets"
    ],
    "bestPractices": [
      "Apply to all relevant sheets checkbox",
      "Use consistent color for selected region",
      "Test all interactions before publish"
    ],
    "guidedExample": {
      "description": "Map click filters category bars.",
      "steps": [
        "Add Filter action source map target bars",
        "Select on map triggers filter",
        "Clear selection resets"
      ]
    },
    "tags": [
      "dashboard",
      "actions"
    ],
    "projectConnectionText": "Capstone delivers interactive Northstar leadership dashboard."
  },

  'tableau-lesson-data-storytelling-and-visualization-best-practices': {
    "learningObjectives": [
      "Apply chart choice, color, and labeling best practices",
      "Structure data stories with clear headlines and annotations",
      "Avoid clutter and misleading dual axes"
    ],
    "plainEnglish": "Good visuals answer one question per view with honest axes and readable labels. Northstar Commerce analysts annotate dips—like a warehouse outage—to prevent misinterpretation.",
    "whatItDoes": "Guides design choices so dashboards communicate accurately and persuasively.",
    "whyItMatters": "A misleading chart erodes trust faster than a wrong spreadsheet cell.",
    "whenToUse": "Before publishing any stakeholder-facing dashboard or story.",
    "stakeholderQuestion": "Make it obvious why March revenue dropped without me reading three emails.",
    "walkthrough": "Write sheet title as the insight: \"March revenue down 12% due to West warehouse closure.\" Use neutral gray for secondary metrics; one accent color for key KPI. Annotate anomaly points. Remove gridlines and heavy borders. Put definitions in caption. Use Story points only when narrative order matters.",
    "syntax": "Title = insight headline\nColor: limited palette\nAnnotation: right-click mark > Annotate\nCaption: metric definitions",
    "componentBreakdown": [
      {
        "part": "Headline title",
        "explanation": "States the takeaway not just the metric name."
      },
      {
        "part": "Annotation",
        "explanation": "Explains exceptions on the chart."
      },
      {
        "part": "Color discipline",
        "explanation": "Accent for focus; gray for context."
      }
    ],
    "sampleInput": "Northstar Commerce March revenue dip tied to West fulfillment outage Mar 8-12.",
    "expectedOutput": "Trend chart with annotation and headline explaining dip.",
    "commonMistakes": [
      "Chart junk: 3D, heavy gradients, dual axis abuse",
      "Rainbow palettes",
      "Titles like \"Sheet 1\""
    ],
    "bestPractices": [
      "One message per view",
      "Accessible color contrast",
      "Consistent number formatting ($, K/M)"
    ],
    "guidedExample": {
      "description": "Annotate West outage on weekly trend.",
      "steps": [
        "Select week mark",
        "Annotate with outage text",
        "Update title with percent change"
      ]
    },
    "tags": [
      "storytelling",
      "design"
    ],
    "projectConnectionText": "Capstone presentation layer applies these rules to Northstar dashboard."
  },

  'tableau-lesson-tableau-portfolio-dashboard-project': {
    "learningObjectives": [
      "Deliver a multi-sheet interactive Northstar Commerce dashboard",
      "Integrate connections, calcs, maps, filters, parameters, and design standards",
      "Document data refresh, definitions, and QA against finance totals"
    ],
    "plainEnglish": "You publish a portfolio-ready Tableau dashboard telling Northstar Commerce monthly performance story: revenue, orders, margin, marketing efficiency, support backlog—with filters and annotations executives understand.",
    "whatItDoes": "Capstone integrating Tableau skills into a business deliverable for hiring portfolios.",
    "whyItMatters": "Recruiters skim portfolios; a polished Northstar dashboard proves end-to-end visualization skill.",
    "whenToUse": "Job applications, internal promotion packets, and proof of analyst readiness.",
    "stakeholderQuestion": "Build the Northstar Commerce monthly leadership view: regional performance vs target, category mix, weekly trend, campaign ROI snapshot, and open support tickets—with region and date filters.",
    "walkthrough": "Connect orders, order_items, products, customers, marketing_campaigns, support_tickets, monthly_targets. Validate joins and row counts. Build calcs: profit, margin, AOV, ROAS. Sheets: regional map vs target variance, category bars, weekly trend with annotations, campaign scatter spend vs revenue, support backlog line. Parameters for VIP threshold optional. Dashboard with filter actions and unified date filter. QA revenue to finance within 0.5%. Export PDF and publish to Tableau Public or screenshot for portfolio.",
    "syntax": "Project checklist:\n  Data model + extract refresh\n  Calcs: Profit, Margin, AOV, ROAS\n  Sheets: Map, Bars, Trend, Campaign, Support\n  Dashboard + actions + device layout\n  README: definitions + QA",
    "componentBreakdown": [
      {
        "part": "Data model",
        "explanation": "Clean joins and extract refresh plan."
      },
      {
        "part": "Metric layer",
        "explanation": "Documented calculated fields."
      },
      {
        "part": "Visual layer",
        "explanation": "Charts following storytelling standards."
      },
      {
        "part": "Dashboard layer",
        "explanation": "Interactive filters and actions."
      },
      {
        "part": "QA README",
        "explanation": "Finance tie-out and field definitions."
      }
    ],
    "sampleInput": "Northstar Commerce multi-table exports for one month close pack.",
    "expectedOutput": "Published interactive dashboard with portfolio README and QA notes.",
    "commonMistakes": [
      "Skipping finance tie-out on revenue",
      "Dashboard clutter with ten messages at once",
      "No documentation of refresh or metric definitions"
    ],
    "bestPractices": [
      "Follow layered build: model, calcs, sheets, dashboard",
      "Screenshot hero view for resume link",
      "Include data dictionary text object or README"
    ],
    "guidedExample": {
      "description": "Milestone 1: validated data model and regional map vs target.",
      "steps": [
        "Connect and join core tables on keys",
        "Compare total revenue to finance control",
        "Build regional filled map colored by percent of target",
        "Add target reference from monthly_targets"
      ]
    },
    "tags": [
      "project",
      "capstone",
      "portfolio"
    ],
    "projectConnectionText": "This lesson is the Tableau Portfolio Dashboard Project capstone for Northstar Commerce."
  }
};

export const tableauQuizzes = [
  makeQuiz('tableau', 'tableau-lesson-tableau-interface', [
    {
      "question": "Where do you drag fields to define chart axes?",
      "options": [
        "Marks card only",
        "Columns and Rows shelves",
        "Data source tab only",
        "Story pane"
      ],
      "correctIndex": 1,
      "explanation": "Columns and Rows shelves define view structure."
    },
    {
      "question": "Marks card controls?",
      "options": [
        "Database password",
        "Color, size, labels of marks",
        "SQL joins only",
        "File save location"
      ],
      "correctIndex": 1,
      "explanation": "Marks card formats individual data points."
    },
    {
      "question": "Northstar Commerce workbook for offline sharing often needs?",
      "options": [
        "Only .twb",
        "Packaged workbook or extract",
        "Word doc",
        "CSV only"
      ],
      "correctIndex": 1,
      "explanation": "Packaged workbooks/extracts include data for offline use."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-connecting-to-data', [
    {
      "question": "Extract connection advantage?",
      "options": [
        "Always real-time",
        "Faster performance on large data",
        "No refresh needed ever",
        "Deletes joins"
      ],
      "correctIndex": 1,
      "explanation": "Extracts improve performance via local snapshot."
    },
    {
      "question": "Many-to-many join risk?",
      "options": [
        "Undercount rows",
        "Inflated duplicate metrics",
        "Faster queries",
        "Hides dimensions"
      ],
      "correctIndex": 1,
      "explanation": "Many-to-many joins can duplicate facts inflating sums."
    },
    {
      "question": "After new CSV drop with extract you must?",
      "options": [
        "Rebuild joins only",
        "Refresh extract",
        "Change mark type",
        "Delete workbook"
      ],
      "correctIndex": 1,
      "explanation": "Extract must refresh to pick up new file data."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-dimensions-and-measures', [
    {
      "question": "Region field typically is?",
      "options": [
        "Measure",
        "Dimension",
        "Parameter only",
        "Tooltip only"
      ],
      "correctIndex": 1,
      "explanation": "Region categorizes rows."
    },
    {
      "question": "Default aggregation on revenue drag to Rows?",
      "options": [
        "COUNT",
        "SUM",
        "MIN text",
        "NONE"
      ],
      "correctIndex": 1,
      "explanation": "Numeric measures default to SUM."
    },
    {
      "question": "order_id should usually be?",
      "options": [
        "Summed",
        "Dimension for counting orders",
        "Deleted",
        "Color gradient"
      ],
      "correctIndex": 1,
      "explanation": "IDs are dimensions; COUNT for volume."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-discrete-and-continuous-fields', [
    {
      "question": "Continuous date on Columns creates?",
      "options": [
        "Separate text headers only",
        "Timeline axis",
        "Pie chart automatically",
        "SQL join"
      ],
      "correctIndex": 1,
      "explanation": "Continuous dates form an axis."
    },
    {
      "question": "Blue pill indicates?",
      "options": [
        "Continuous measure always",
        "Discrete field",
        "Error",
        "Parameter"
      ],
      "correctIndex": 1,
      "explanation": "Blue pills are discrete."
    },
    {
      "question": "Compare four regions side by side uses region as?",
      "options": [
        "Continuous axis",
        "Discrete dimension",
        "Measure SUM",
        "Filter only"
      ],
      "correctIndex": 1,
      "explanation": "Regions are discrete categories."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-bar-and-line-charts', [
    {
      "question": "Best for weekly revenue trend?",
      "options": [
        "Pie chart",
        "Line chart",
        "Text table only",
        "Map"
      ],
      "correctIndex": 1,
      "explanation": "Lines show time trends."
    },
    {
      "question": "Bar chart axes should often start at?",
      "options": [
        "Maximum value",
        "Zero",
        "Random",
        "Negative only"
      ],
      "correctIndex": 1,
      "explanation": "Zero baseline supports fair comparison."
    },
    {
      "question": "Stacked bars risk when?",
      "options": [
        "Two categories",
        "Many segments hard to compare",
        "Single region",
        "Line chart used"
      ],
      "correctIndex": 1,
      "explanation": "Many stacks are hard to read."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-maps-and-geographic-analysis', [
    {
      "question": "Before mapping a text field you should?",
      "options": [
        "Sort alphabetically",
        "Assign geographic role",
        "Convert to measure",
        "Delete nulls only"
      ],
      "correctIndex": 1,
      "explanation": "Geo role enables mapping."
    },
    {
      "question": "Four regions only—sometimes clearer?",
      "options": [
        "Always map",
        "Bar chart may be clearer",
        "Pie with 20 slices",
        "Scatter of IDs"
      ],
      "correctIndex": 1,
      "explanation": "Small region count may read better as bars."
    },
    {
      "question": "Color on filled map encodes?",
      "options": [
        "Dimension only",
        "Measure intensity such as revenue",
        "File name",
        "Join type"
      ],
      "correctIndex": 1,
      "explanation": "Color typically shows aggregated measure."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-filters-and-sorting', [
    {
      "question": "Top 5 categories filter requires specifying?",
      "options": [
        "Font color",
        "Field and measure for ranking",
        "Workbook name",
        "Map layer"
      ],
      "correctIndex": 1,
      "explanation": "Top N needs rank field."
    },
    {
      "question": "Relative date filter useful for?",
      "options": [
        "Static 2019 only",
        "Rolling last 30/90 days",
        "Removing dimensions",
        "Join keys"
      ],
      "correctIndex": 1,
      "explanation": "Relative dates stay current on refresh."
    },
    {
      "question": "Descending sort on bar chart helps?",
      "options": [
        "Hide largest values",
        "Show biggest bars first",
        "Remove legend",
        "Create extract"
      ],
      "correctIndex": 1,
      "explanation": "Sort highlights top contributors."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-calculated-fields', [
    {
      "question": "AOV at order level often uses?",
      "options": [
        "SUM revenue / COUNTD order_id",
        "SUM order_id",
        "AVG customer name",
        "COUNT region"
      ],
      "correctIndex": 0,
      "explanation": "Distinct order count denominates AOV."
    },
    {
      "question": "Row-level profit formula?",
      "options": [
        "SUM first always",
        "[revenue]-[cost]",
        "Only filter",
        "Map color"
      ],
      "correctIndex": 1,
      "explanation": "Row calcs reference row fields."
    },
    {
      "question": "Divide-by-zero risk in margin calc—you should?",
      "options": [
        "Ignore",
        "Use IF denominator zero",
        "Delete measure",
        "Hide map"
      ],
      "correctIndex": 1,
      "explanation": "Guard formulas against zero denominators."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-parameters', [
    {
      "question": "Parameters differ from filters because?",
      "options": [
        "Delete data",
        "User-controlled input value used in calcs",
        "Only work on maps",
        "Automatic only"
      ],
      "correctIndex": 1,
      "explanation": "Parameters feed formulas and dynamic logic."
    },
    {
      "question": "Show slider on dashboard requires?",
      "options": [
        "Hide field",
        "Parameter control visible",
        "Extract only",
        "SQL"
      ],
      "correctIndex": 1,
      "explanation": "Parameter control exposes interaction."
    },
    {
      "question": "VIP threshold parameter should be data type?",
      "options": [
        "String only",
        "Float/integer for numeric threshold",
        "Date always",
        "Boolean only"
      ],
      "correctIndex": 1,
      "explanation": "Numeric thresholds use number parameters."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-building-interactive-dashboards', [
    {
      "question": "Filter action enables?",
      "options": [
        "Static PNG only",
        "Click one view filters others",
        "SQL generation",
        "Extract delete"
      ],
      "correctIndex": 1,
      "explanation": "Actions link interactivity across sheets."
    },
    {
      "question": "Apply filter to all sheets requires?",
      "options": [
        "Same data source or valid blend",
        "Different databases always",
        "No fields",
        "Story only"
      ],
      "correctIndex": 0,
      "explanation": "Shared source or blend needed for global filters."
    },
    {
      "question": "Tiled layout advantage?",
      "options": [
        "Objects overlap randomly",
        "Responsive arrangement",
        "No filters",
        "Hides data"
      ],
      "correctIndex": 1,
      "explanation": "Tiled layouts adapt to canvas size."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-data-storytelling-and-visualization-best-practices', [
    {
      "question": "Sheet title best practice?",
      "options": [
        "Sheet 1",
        "Insight headline stating takeaway",
        "No title",
        "File path"
      ],
      "correctIndex": 1,
      "explanation": "Titles should convey the insight."
    },
    {
      "question": "Dual axis risk?",
      "options": [
        "Always clearer",
        "Can mislead if scales differ",
        "Required for bars",
        "Fixes joins"
      ],
      "correctIndex": 1,
      "explanation": "Dual axes can exaggerate or confuse."
    },
    {
      "question": "Annotation used to?",
      "options": [
        "Hide data",
        "Explain anomalies on chart",
        "Delete filter",
        "Create extract"
      ],
      "correctIndex": 1,
      "explanation": "Annotations explain context for marks."
    }
  ]),
  makeQuiz('tableau', 'tableau-lesson-tableau-portfolio-dashboard-project', [
    {
      "question": "Capstone QA should include?",
      "options": [
        "Skip totals",
        "Finance revenue tie-out",
        "Delete dimensions",
        "Hide all filters"
      ],
      "correctIndex": 1,
      "explanation": "Tie-out validates accuracy."
    },
    {
      "question": "Portfolio dashboard should document?",
      "options": [
        "Nothing",
        "Metric definitions and refresh steps",
        "Only colors",
        "SQL passwords"
      ],
      "correctIndex": 1,
      "explanation": "Documentation proves professional workflow."
    },
    {
      "question": "Build order recommended?",
      "options": [
        "Dashboard before data model",
        "Model, calcs, sheets, then dashboard",
        "Only map",
        "Parameters only"
      ],
      "correctIndex": 1,
      "explanation": "Layered build reduces rework."
    }
  ])
];

export const tableauExercises = [
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-tableau-interface",
    "title": "Name Your First Sheet",
    "instructions": "Build a bar chart comparing Northstar Commerce revenue across regions. Place Region on Rows and Revenue on Columns.",
    "hint": "One dimension (Region) and one measure (Revenue).",
    "expectedAnswer": "Region on Rows, Revenue on Columns, Bar chart showing SUM(Revenue) by Region.",
    "explanation": "Dimensions split; measures quantify.",
    "skillTags": [
      "interface"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-connecting-to-data",
    "title": "Choose Connection Type",
    "instructions": "Northstar Commerce 2M row orders CSV for daily desktop dashboard—live or extract?",
    "hint": "Performance vs freshness tradeoff.",
    "expectedAnswer": "Extract refreshed daily (or live if warehouse supports performant queries); extract common for large CSV offline analysis.",
    "explanation": "Extracts speed large Northstar exports.",
    "skillTags": [
      "connection"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-dimensions-and-measures",
    "title": "Classify Fields",
    "instructions": "Classify Northstar Commerce campaign_name and spend as dimension or measure.",
    "hint": "Name vs number.",
    "expectedAnswer": "campaign_name dimension; spend measure (SUM).",
    "explanation": "Correct classification prevents nonsense aggregations.",
    "skillTags": [
      "dimensions"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-discrete-and-continuous-fields",
    "title": "Trend vs Compare",
    "instructions": "Northstar Commerce CEO wants time trend; which date pill type?",
    "hint": "Continuous for trends.",
    "expectedAnswer": "Continuous Month (or Week) of order_date on Columns with line chart.",
    "explanation": "Continuous fields suit time series.",
    "skillTags": [
      "continuous"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-bar-and-line-charts",
    "title": "Pick Bar or Line",
    "instructions": "Northstar Commerce compare channels in March vs trend across year—chart types?",
    "hint": "Bar compare, line trend.",
    "expectedAnswer": "Clustered bar with channel dimension for March; line chart with continuous Month for year trend.",
    "explanation": "Match chart to analytical question.",
    "skillTags": [
      "charts"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-maps-and-geographic-analysis",
    "title": "Geo Role Step",
    "instructions": "What step enables Northstar Commerce region field on a map?",
    "hint": "Geographic role assignment.",
    "expectedAnswer": "Right-click region > Geographic Role (State/Province or appropriate) then build map.",
    "explanation": "Geo roles translate text to locations.",
    "skillTags": [
      "maps"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-filters-and-sorting",
    "title": "Design Filter Combo",
    "instructions": "Describe filters for Northstar Commerce Northeast top 5 categories view.",
    "hint": "Region + Top N.",
    "expectedAnswer": "Region filter Northeast; category Top 5 by SUM revenue; sort bars descending.",
    "explanation": "Filters tailor views to stakeholder asks.",
    "skillTags": [
      "filters"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-calculated-fields",
    "title": "Write Margin Calc",
    "instructions": "Write Northstar Commerce margin formula SUM([Profit])/SUM([revenue]) and note zero guard.",
    "hint": "IF or IIF on denominator.",
    "expectedAnswer": "Margin = IF SUM([revenue])=0 THEN 0 ELSE SUM([Profit])/SUM([revenue]) END",
    "explanation": "Documented margins match finance definitions.",
    "skillTags": [
      "calculated-fields"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-parameters",
    "title": "Parameter Use Case",
    "instructions": "Northstar Commerce director wants adjustable spend cutoff—components needed?",
    "hint": "Parameter + calc + control.",
    "expectedAnswer": "Float parameter spend_cutoff; calculated field qualifying = lifetime_spend >= spend_cutoff; show parameter control; count customers.",
    "explanation": "Parameters enable what-if without republishing.",
    "skillTags": [
      "parameters"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-building-interactive-dashboards",
    "title": "Dashboard Checklist",
    "instructions": "List three objects on Northstar Commerce leadership dashboard.",
    "hint": "Map, bars, trend + filters.",
    "expectedAnswer": "Regional map, category revenue bars, weekly trend line, shared date and region filters, optional KPI text.",
    "explanation": "Dashboard checklist aligns to stakeholder brief.",
    "skillTags": [
      "dashboard"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-data-storytelling-and-visualization-best-practices",
    "title": "Rewrite a Title",
    "instructions": "Bad title \"Sheet 2\". Rewrite for Northstar Commerce 12% March revenue decline.",
    "hint": "Headline with insight.",
    "expectedAnswer": "March revenue down 12% vs February—West warehouse outage Mar 8-12",
    "explanation": "Headlines reduce need for verbal explanation.",
    "skillTags": [
      "storytelling"
    ]
  }),
  makeExercise({
    "subjectId": "tableau",
    "lessonId": "tableau-lesson-tableau-portfolio-dashboard-project",
    "title": "Capstone Milestone 1",
    "instructions": "First three steps for Northstar Commerce Tableau capstone.",
    "hint": "Connect, validate, map.",
    "expectedAnswer": "1) Connect/join core tables 2) Validate revenue vs finance 3) Regional map vs target variance sheet.",
    "explanation": "Milestones keep capstone deliverable on schedule.",
    "skillTags": [
      "project"
    ]
  })
];
