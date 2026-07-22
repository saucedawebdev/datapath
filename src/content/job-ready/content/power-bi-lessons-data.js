/**
 * Job Ready Edition — Power BI lesson content, quizzes, and exercises.
 * Fictional business: Northstar Commerce
 */
export const powerBiLessonContent = {
  "power-bi-lesson-power-bi-desktop-interface": {
    learningObjectives: [
      "Explain the Power BI Desktop workspace in plain English using Northstar Commerce business examples",
      "Apply the Power BI Desktop workspace to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with the Power BI Desktop workspace and how to avoid them"
    ],
    plainEnglish: "Power BI Desktop is where you connect to data, shape it in Power Query, build relationships in the model view, write DAX measures, and design report pages. The three main views — Report, Data, and Model — mirror how analysts move from raw exports to polished dashboards.",
    whatItDoes: "Provides a single workspace to import Northstar Commerce sales and marketing data, transform it, relate tables, and publish interactive reports to Power BI Service.",
    whyItMatters: "At Northstar Commerce, regional sales reviews happen weekly. Analysts who know where each pane lives — Fields, Visualizations, Filters, and the formula bar — ship dashboards faster and spend less time hunting for settings.",
    whenToUse: "When starting any new Northstar report, exploring a dataset for the first time, or switching between modeling and visualization tasks.",
    stakeholderQuestion: "Sales Director at Northstar Commerce: \"Can you rebuild the West region revenue view in Power BI so we can slice by product category?\"",
    walkthrough: "1. Open Power BI Desktop and confirm Home, Insert, Modeling, and View ribbons.\n2. Switch to Report view to build visuals on a canvas.\n3. Open Data view to inspect imported tables like orders and products.\n4. Open Model view to confirm relationships between customers, orders, and order_items.\n5. Use the Fields pane to drag columns onto the canvas.\n6. Save the .pbix file with a clear name such as Northstar_Sales_Q1.pbix.",
    syntax: "-- Report view: drag Region from customers onto a bar chart\n-- Model view: verify orders[customer_id] → customers[customer_id]\n-- Data view: spot-check order_date formats before building visuals",
    componentBreakdown: [
      {
        part: "Report view",
        explanation: "Canvas for charts, tables, slicers, and KPI cards."
      },
      {
        part: "Data view",
        explanation: "Spreadsheet-like preview of each table in the model."
      },
      {
        part: "Model view",
        explanation: "Diagram of tables and relationships — the heart of accurate DAX."
      },
      {
        part: "Fields pane",
        explanation: "Lists tables, columns, measures, and hierarchies available to visuals."
      },
      {
        part: "Visualizations pane",
        explanation: "Pick chart types and format properties for the selected visual."
      }
    ],
    sampleInput: "Northstar exports: customers, orders, order_items, products loaded into one .pbix file.",
    expectedOutput: "A saved report file with four related tables ready for revenue by region analysis.",
    commonMistakes: [
      "Building charts before checking relationships in Model view",
      "Confusing calculated columns with measures in the Fields pane",
      "Saving over a production .pbix without version control or backup"
    ],
    bestPractices: [
      "Name .pbix files with date and business topic for team clarity",
      "Validate relationships immediately after import",
      "Use Report view for visuals and Model view for structure — do not mix concerns on one screen"
    ],
    guidedExample: {
      description: "Open a new file, import northstar_orders.csv, and confirm columns appear in the Fields pane under orders.",
      steps: [
        "Get Data → Text/CSV → select northstar_orders.csv",
        "Open Data view and verify order_date is a date type",
        "Switch to Model view and note single-table model before adding customers"
      ]
    },
    tags: [
      "interface",
      "desktop",
      "workspace"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-importing-data": {
    learningObjectives: [
      "Explain importing Northstar data sources in plain English using Northstar Commerce business examples",
      "Apply importing Northstar data sources to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with importing Northstar data sources and how to avoid them"
    ],
    plainEnglish: "Importing data means bringing Northstar tables from CSV files, Excel workbooks, or a database into Power BI so they become queryable tables in your model. Get Data is the front door — choose the source, authenticate if needed, and load or transform.",
    whatItDoes: "Connects Power BI to Northstar orders, customers, products, and marketing exports and loads them as tables for modeling and DAX.",
    whyItMatters: "Marketing at Northstar updates campaign spend weekly in Excel while orders live in a database. Analysts must import both without duplicating rows or breaking refresh schedules.",
    whenToUse: "Starting a new report, adding a table to an existing model, or setting up scheduled refresh in Power BI Service.",
    stakeholderQuestion: "Marketing Manager at Northstar Commerce: \"Can you combine our campaign spend spreadsheet with order data to see ROI by channel?\"",
    walkthrough: "1. Home → Get Data → choose source (Excel, SQL Server, CSV).\n2. Select tables or files — e.g., marketing_campaigns and orders.\n3. Choose Import for smaller datasets or DirectQuery for large live databases.\n4. In Navigator, preview columns and uncheck tables you do not need.\n5. Click Transform Data to clean in Power Query or Load to bring tables in as-is.\n6. Document source paths and refresh credentials for the team.",
    syntax: "Home → Get Data → Excel → northstar_marketing.xlsx → Sheet Campaigns → Load\nHome → Get Data → SQL Server → NorthstarDW → dbo.orders → Load",
    componentBreakdown: [
      {
        part: "Get Data",
        explanation: "Launches connectors for files, databases, and online services."
      },
      {
        part: "Navigator",
        explanation: "Preview tables and sheets before loading."
      },
      {
        part: "Import mode",
        explanation: "Copies data into the model — best for most Northstar CSV/Excel sizes."
      },
      {
        part: "DirectQuery",
        explanation: "Queries live at source — use when data is huge or must be real-time."
      },
      {
        part: "Transform Data",
        explanation: "Opens Power Query Editor before load."
      }
    ],
    sampleInput: "northstar_orders.csv (500k rows), northstar_customers.xlsx (120k rows), SQL table dbo.products.",
    expectedOutput: "Three tables in the Fields pane: orders, customers, products with correct row counts in Data view.",
    commonMistakes: [
      "Loading duplicate copies of the same table from different folders",
      "Importing wide Excel files with merged header rows",
      "Choosing DirectQuery when Import would perform better for mid-size retail data"
    ],
    bestPractices: [
      "Import only columns needed for the report to keep model size down",
      "Store source file paths in a shared team document",
      "Use Transform Data when column names or types need fixing before load"
    ],
    guidedExample: {
      description: "Import northstar_customers.csv and confirm 120,000 rows in Data view.",
      steps: [
        "Get Data → Text/CSV",
        "Select northstar_customers.csv",
        "Click Load",
        "Data view → customers → check row count and region column"
      ]
    },
    tags: [
      "import",
      "get-data",
      "connectors"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-power-query-data-cleaning": {
    learningObjectives: [
      "Explain Power Query transformations in plain English using Northstar Commerce business examples",
      "Apply Power Query transformations to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Power Query transformations and how to avoid them"
    ],
    plainEnglish: "Power Query is the cleaning kitchen before data hits your model. Every step — remove blanks, split columns, change types, unpivot — is recorded and repeatable. When Northstar sends a messy export, you fix it once and refresh forever.",
    whatItDoes: "Transforms raw Northstar exports: trims product names, parses order dates, removes duplicate order_ids, and standardizes region labels before loading into the model.",
    whyItMatters: "Support tickets at Northstar often include free-text categories. Without Power Query cleanup, charts double-count revenue and regions show as \"West \" and \"west\".",
    whenToUse: "Whenever imported columns have wrong types, extra spaces, header rows, blank rows, or unpivoted monthly columns.",
    stakeholderQuestion: "Operations Lead at Northstar Commerce: \"Why does total revenue in Power BI not match our finance spreadsheet?\"",
    walkthrough: "1. After Get Data, choose Transform Data to open Power Query Editor.\n2. Review Applied Steps on the right — each transformation is auditable.\n3. Use Remove Rows → Remove Blank Rows on order exports.\n4. Transform → Data Type → set order_date to Date and unit_price to Decimal.\n5. Replace Values to fix \"CANCLED\" → \"Cancelled\" in order status.\n6. Remove Duplicates on order_id if the CSV was appended twice.\n7. Close & Apply to load cleaned data into the model.",
    syntax: "= Table.TransformColumnTypes(Source, {{\"order_date\", type date}, {\"unit_price\", type number}})\n= Table.Distinct(PreviousStep, {\"order_id\"})",
    componentBreakdown: [
      {
        part: "Applied Steps",
        explanation: "Ordered list of transformations you can edit or delete."
      },
      {
        part: "Changed Type",
        explanation: "Ensures dates and currency calculate correctly in DAX."
      },
      {
        part: "Remove Duplicates",
        explanation: "Keeps one row per key such as order_id."
      },
      {
        part: "Split Column",
        explanation: "Separates combined fields like full_name into first and last."
      },
      {
        part: "Close & Apply",
        explanation: "Runs the query and updates the model."
      }
    ],
    sampleInput: "orders CSV with text order_date, duplicate order_id 88421, status \"Shiped\".",
    expectedOutput: "Clean orders table: unique order_ids, date type order_date, status \"Shipped\", revenue-ready unit_price.",
    commonMistakes: [
      "Editing data in Data view instead of Power Query — changes do not stick on refresh",
      "Removing duplicates on the wrong column and losing valid line items",
      "Promoting headers incorrectly on Excel files with title rows above headers"
    ],
    bestPractices: [
      "Name query steps descriptively when possible for team handoffs",
      "Fix data types in Power Query before writing measures",
      "Keep a sample of raw files to test refresh after cleaning logic changes"
    ],
    guidedExample: {
      description: "Clean a Northstar orders export with text dates and duplicate headers.",
      steps: [
        "Transform Data on orders query",
        "Remove top rows if export has title line",
        "Use First Row as Headers",
        "Change order_date to Date",
        "Remove Duplicates on order_id",
        "Close & Apply"
      ]
    },
    tags: [
      "power-query",
      "cleaning",
      "transform"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-relationships-and-data-modeling": {
    learningObjectives: [
      "Explain table relationships in the data model in plain English using Northstar Commerce business examples",
      "Apply table relationships in the data model to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with table relationships in the data model and how to avoid them"
    ],
    plainEnglish: "Relationships tell Power BI how tables connect — orders.customer_id matches customers.customer_id. Without correct relationships, a revenue by region chart might sum every customer against every order.",
    whatItDoes: "Links Northstar fact tables (orders, order_items) to dimension tables (customers, products, dates) so filters flow correctly across visuals.",
    whyItMatters: "Finance at Northstar reconciles revenue daily. A missing or wrong relationship causes inflated totals that erode trust in the entire dashboard.",
    whenToUse: "After importing multiple related tables, before writing DAX, and whenever a visual shows unexpected cross-filter results.",
    stakeholderQuestion: "Finance Analyst at Northstar Commerce: \"When I filter to Midwest, why do product counts look the same as national?\"",
    walkthrough: "1. Open Model view after loading orders, customers, products, order_items.\n2. Drag customers[customer_id] to orders[customer_id] to create a one-to-many relationship.\n3. Confirm the one side (customers) and many side (orders) — arrow points from dimension to fact.\n4. Set cross-filter direction: single from customers to orders for standard star schema.\n5. Mark inactive relationships only when you have role-playing dates (e.g., order vs ship date).\n6. Hide foreign key columns from report view if they clutter the Fields pane.",
    syntax: "Relationship: customers[customer_id] (1) → (*) orders[customer_id]\nRelationship: products[product_id] (1) → (*) order_items[product_id]\norders[order_id] (1) → (*) order_items[order_id]",
    componentBreakdown: [
      {
        part: "Cardinality",
        explanation: "One-to-many is standard: one customer, many orders."
      },
      {
        part: "Cross-filter direction",
        explanation: "Single direction filters facts when slicing dimensions."
      },
      {
        part: "Active relationship",
        explanation: "Only one active path between two tables unless using USERELATIONSHIP in DAX."
      },
      {
        part: "Primary key",
        explanation: "Unique identifier on the one side — customer_id, product_id."
      },
      {
        part: "Foreign key",
        explanation: "Repeating key on the many side linking back to dimension."
      }
    ],
    sampleInput: "orders with customer_id; customers with unique customer_id; order_items linked to orders and products.",
    expectedOutput: "Filtering Region = West on customers filters order revenue to West customers only.",
    commonMistakes: [
      "Creating many-to-many without a bridge table when order_items duplicate grain",
      "Bi-directional filtering everywhere causing ambiguous totals",
      "Joining on wrong keys like product_name instead of product_id"
    ],
    bestPractices: [
      "Use integer keys (customer_id) not names for relationships",
      "Document grain of each table — orders vs order_items line level",
      "Validate relationships with a simple matrix visual before complex DAX"
    ],
    guidedExample: {
      description: "Connect customers to orders and verify West region filter reduces order count.",
      steps: [
        "Model view → relate customers to orders on customer_id",
        "Create matrix: customers[region] rows, count of orders[order_id]",
        "Add slicer on region → confirm counts change"
      ]
    },
    tags: [
      "relationships",
      "modeling",
      "keys"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-star-schema": {
    learningObjectives: [
      "Explain star schema design in plain English using Northstar Commerce business examples",
      "Apply star schema design to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with star schema design and how to avoid them"
    ],
    plainEnglish: "A star schema puts one central fact table — like order line items — surrounded by dimension tables for customers, products, dates, and campaigns. It looks like a star and makes DAX faster and easier to reason about.",
    whatItDoes: "Organizes Northstar sales data with order_items as the fact table and customers, products, date, and marketing as dimensions connected by single relationships.",
    whyItMatters: "Northstar leadership compares channel performance quarterly. Star schema keeps metrics consistent whether you slice by region, category, or campaign.",
    whenToUse: "Designing any multi-table Northstar model before writing complex measures or importing snowflaked warehouse tables.",
    stakeholderQuestion: "VP Sales at Northstar Commerce: \"I want one dashboard where region, product category, and campaign channel all filter the same revenue number.\"",
    walkthrough: "1. Identify the fact table at the lowest grain — order_items (one row per line).\n2. Surround with dimensions: customers, products, date, marketing_campaigns.\n3. Avoid duplicating dimension attributes on the fact table — use relationships instead.\n4. Create a date table and mark it as date table for time intelligence.\n5. Resist snowflaking subcategory tables into the model unless necessary — flatten in Power Query.\n6. Test one Total Revenue measure filtered by each dimension.",
    syntax: "Fact: order_items (quantity, unit_price, order_id, product_id)\nDimensions: customers, products, Date, marketing_campaigns\nAll single-direction filters from dim → fact",
    componentBreakdown: [
      {
        part: "Fact table",
        explanation: "Numeric events — sales lines, clicks, tickets — at detailed grain."
      },
      {
        part: "Dimension tables",
        explanation: "Descriptive attributes — region, category, campaign name."
      },
      {
        part: "Date table",
        explanation: "Continuous dates for YoY and month-to-date logic."
      },
      {
        part: "Single direction",
        explanation: "Filters flow from dimensions to facts in classic star design."
      }
    ],
    sampleInput: "Normalized Northstar warehouse: order_items fact + four dimension tables.",
    expectedOutput: "Model diagram with order_items center and dimension tables radiating outward; one revenue measure works with all slicers.",
    commonMistakes: [
      "Using orders as fact when analysis needs line-level product detail",
      "Putting region on both customers and orders causing ambiguity",
      "Skipping a dedicated date table and using auto date/time only"
    ],
    bestPractices: [
      "Define business grain on the fact table before importing",
      "Use conformed dimensions — one customers table for all reports",
      "Hide surrogate keys from report view but keep them for relationships"
    ],
    guidedExample: {
      description: "Restructure a flat Northstar export into fact order_items plus dim products.",
      steps: [
        "Split wide export into products dimension in Power Query",
        "Keep line-level rows in order_items",
        "Relate products to order_items",
        "Build revenue measure on order_items"
      ]
    },
    tags: [
      "star-schema",
      "fact",
      "dimension"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-dax-fundamentals": {
    learningObjectives: [
      "Explain DAX formulas and evaluation context in plain English using Northstar Commerce business examples",
      "Apply DAX formulas and evaluation context to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with DAX formulas and evaluation context and how to avoid them"
    ],
    plainEnglish: "DAX (Data Analysis Expressions) is the formula language for calculated columns, measures, and tables in Power BI. Measures always aggregate — they recalculate based on filters on the report. Columns are row-by-row.",
    whatItDoes: "Expresses Northstar KPIs like total revenue, average order value, and conversion rate as reusable measures in the model.",
    whyItMatters: "Executives at Northstar ask for the same KPIs every Monday. Well-named DAX measures prevent ten versions of \"total sales\" across reports.",
    whenToUse: "Whenever a metric must respond to slicers, span multiple tables, or be reused across pages.",
    stakeholderQuestion: "CEO at Northstar Commerce: \"What was total revenue last month compared to the same month last year?\"",
    walkthrough: "1. Modeling → New Measure on the fact table order_items.\n2. Write Total Revenue = SUMX(order_items, order_items[quantity] * order_items[unit_price]).\n3. Format as currency.\n4. Place on a card visual and slice by month using a date table.\n5. Prefer measures over calculated columns for aggregations.\n6. Use DIVIDE for ratios to handle divide-by-zero safely.",
    syntax: "Total Revenue =\nSUMX(\n    order_items,\n    order_items[quantity] * order_items[unit_price]\n)\n\nOrder Count = DISTINCTCOUNT(orders[order_id])",
    componentBreakdown: [
      {
        part: "Measure",
        explanation: "Calculated in context of visuals and filters — preferred for KPIs."
      },
      {
        part: "Calculated column",
        explanation: "Computed row-by-row; increases model size — use sparingly."
      },
      {
        part: "SUM / SUMX",
        explanation: "SUM adds a column; SUMX iterates rows for line-level math."
      },
      {
        part: "DIVIDE",
        explanation: "Safe division with alternate result on zero denominator."
      }
    ],
    sampleInput: "order_items with quantity and unit_price; slicer on customers[region] = Midwest.",
    expectedOutput: "Total Revenue measure shows Midwest line revenue only.",
    commonMistakes: [
      "Using calculated columns for totals that should be measures",
      "Summing pre-calculated line totals that double-count after relationships",
      "Ignoring blank handling in ratios"
    ],
    bestPractices: [
      "Organize measures in display folders by subject — Revenue, Orders, Marketing",
      "Use SUMX on fact tables for line-level revenue",
      "Name measures with plain business language — Total Revenue, not Measure1"
    ],
    guidedExample: {
      description: "Create Total Revenue and Order Count measures for Northstar.",
      steps: [
        "New Measure on order_items for revenue with SUMX",
        "New Measure on orders for DISTINCTCOUNT order_id",
        "Add both to a card visual and test with region slicer"
      ]
    },
    tags: [
      "dax",
      "measures",
      "fundamentals"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-measures-and-calculated-columns": {
    learningObjectives: [
      "Explain choosing between measures and calculated columns in plain English using Northstar Commerce business examples",
      "Apply choosing between measures and calculated columns to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with choosing between measures and calculated columns and how to avoid them"
    ],
    plainEnglish: "Measures compute at query time when someone interacts with a report. Calculated columns compute when data refreshes, row by row. For Northstar KPIs, measures are almost always the right choice.",
    whatItDoes: "Defines reusable metrics (measures) and optional row-level fields (columns) like line revenue on order_items for use in visuals and DAX.",
    whyItMatters: "A junior analyst added a revenue column on orders that summed incorrectly at regional level. Knowing measure vs column prevents that reconciliation meeting.",
    whenToUse: "Use measures for aggregations and KPIs; use calculated columns for row-level buckets or attributes needed as slicer labels at grain.",
    stakeholderQuestion: "Sales Manager at Northstar Commerce: \"Can we show revenue per order and also total revenue by region on the same page?\"",
    walkthrough: "1. Create measure Total Revenue with SUMX on order_items.\n2. Create measure Revenue per Order = DIVIDE([Total Revenue], [Order Count]).\n3. If you need a line amount visible in a table visual, add calculated column Line Amount = order_items[quantity] * order_items[unit_price] on order_items only.\n4. Never sum the Line Amount column in a card without understanding filter context — prefer the measure.\n5. Format measures as currency in Modeling tab.",
    syntax: "Line Amount (column on order_items) = order_items[quantity] * order_items[unit_price]\n\nRevenue per Order (measure) = DIVIDE([Total Revenue], [Order Count])",
    componentBreakdown: [
      {
        part: "Measure",
        explanation: "Dynamic aggregation — shows in Values well in visuals."
      },
      {
        part: "Calculated column",
        explanation: "Static per row — appears in Rows/Columns like imported fields."
      },
      {
        part: "Implicit measure",
        explanation: "Dragging numeric column to Values — often wrong for line facts."
      },
      {
        part: "Format string",
        explanation: "Currency and percentage display for stakeholder readability."
      }
    ],
    sampleInput: "Matrix with customers[region] rows and measures Total Revenue, Order Count.",
    expectedOutput: "Region rows show correct totals; Revenue per Order matches finance definitions.",
    commonMistakes: [
      "Using calculated column values as grand totals in cards",
      "Creating measures on dimension tables when facts hold the numbers",
      "Mixing implicit Sum of column with explicit measures on same visual"
    ],
    bestPractices: [
      "Default to measures for anything on a KPI card",
      "Put revenue measures on the fact table in the Fields pane",
      "Document whether metrics are net of returns for Northstar finance alignment"
    ],
    guidedExample: {
      description: "Build Total Revenue measure and optional Line Amount column; compare behavior in a table visual.",
      steps: [
        "Create Total Revenue measure",
        "Add Line Amount calculated column",
        "Table visual with product_name, Line Amount, and Total Revenue in card filtered same way"
      ]
    },
    tags: [
      "measures",
      "calculated-columns",
      "dax"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-calculate-and-filter-context": {
    learningObjectives: [
      "Explain CALCULATE and filter context manipulation in plain English using Northstar Commerce business examples",
      "Apply CALCULATE and filter context manipulation to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with CALCULATE and filter context manipulation and how to avoid them"
    ],
    plainEnglish: "CALCULATE is the most powerful function in DAX. It changes which rows count toward a measure — add a filter for West region, last month, or shipped orders — and the measure recalculates.",
    whatItDoes: "Builds Northstar KPIs like West Revenue, Same Period Last Year, and Conversion Rate with specific filters applied inside the measure.",
    whyItMatters: "Regional managers at Northstar compare performance to company average. CALCULATE expresses \"this region vs all regions\" without duplicate visuals.",
    whenToUse: "Percent of total, time comparisons, conditional KPIs, and overriding slicer filters intentionally.",
    stakeholderQuestion: "Regional Director at Northstar Commerce: \"What percent of company revenue comes from the Midwest?\"",
    walkthrough: "1. Start with base measure [Total Revenue].\n2. Midwest Revenue = CALCULATE([Total Revenue], customers[region] = \"Midwest\").\n3. Percent of Total = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(customers[region]))).\n4. Understand ALL removes region filter for denominator.\n5. Use REMOVEFILTERS or ALLSELECTED depending on business rule.\n6. Test with slicers to ensure intentional override behavior.",
    syntax: "Midwest Revenue =\nCALCULATE(\n    [Total Revenue],\n    customers[region] = \"Midwest\"\n)\n\n% of Total Revenue =\nDIVIDE(\n    [Total Revenue],\n    CALCULATE([Total Revenue], ALL(customers[region]))\n)",
    componentBreakdown: [
      {
        part: "CALCULATE",
        explanation: "Evaluates expression under modified filter context."
      },
      {
        part: "Filter argument",
        explanation: "Column = value, or FILTER table expression."
      },
      {
        part: "ALL",
        explanation: "Removes filters from named columns or tables."
      },
      {
        part: "ALLSELECTED",
        explanation: "Respects visual totals context — common in % of parent."
      }
    ],
    sampleInput: "Slicer on region = West; measure % of Total Revenue on card.",
    expectedOutput: "Card shows West revenue as fraction of all regions despite West slicer — if using ALL in denominator correctly.",
    commonMistakes: [
      "Using ALL when ALLSELECTED matches stakeholder definition of total",
      "Nested CALCULATE filter conflicts without understanding AND logic",
      "Filtering on wrong table breaking relationship paths"
    ],
    bestPractices: [
      "Comment complex CALCULATE measures with business definition",
      "Validate percent-of-total against Excel pivot for one region",
      "Use variables (VAR) inside measures for readable multi-step logic"
    ],
    guidedExample: {
      description: "Create Midwest Revenue and % of Total Revenue measures.",
      steps: [
        "Write Midwest Revenue with CALCULATE filter on region",
        "Write % of Total with ALL on region in denominator",
        "Matrix: region rows, Total Revenue and % measures"
      ]
    },
    tags: [
      "calculate",
      "filter-context",
      "dax"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-visualizations-and-chart-selection": {
    learningObjectives: [
      "Explain choosing the right visual for Northstar metrics in plain English using Northstar Commerce business examples",
      "Apply choosing the right visual for Northstar metrics to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with choosing the right visual for Northstar metrics and how to avoid them"
    ],
    plainEnglish: "Pick the chart that matches the question. Compare categories with bars, trends over time with lines, parts of a whole with stacked bars (not pie overload), and detail with tables. Wrong chart types hide Northstar insights.",
    whatItDoes: "Presents Northstar revenue, orders, and campaign metrics in bar, line, matrix, and KPI visuals that stakeholders can read without training.",
    whyItMatters: "Marketing leadership rejected a pie chart with twelve campaign slices. Clear chart choice speeds decisions on budget reallocation.",
    whenToUse: "Every report page design — after measures exist and before adding interactivity.",
    stakeholderQuestion: "Marketing Director at Northstar Commerce: \"Show me monthly paid search spend vs revenue so I can see if spend spikes paid off.\"",
    walkthrough: "1. Clustered column chart: month on axis, spend and revenue as values — or dual-axis line chart with clear labels.\n2. Line chart for 12-month revenue trend by region — one line per region or small multiples.\n3. Matrix for region × category with Total Revenue and Order Count.\n4. KPI card for MTD Revenue vs target from monthly_targets table.\n5. Avoid 3D charts and excessive pie slices.\n6. Sort by measure not alphabetically when ranking categories.",
    syntax: "Visual: Clustered bar — Axis: products[category], Values: [Total Revenue]\nVisual: Line — Axis: Date[Month], Values: [Total Revenue], Legend: customers[region]",
    componentBreakdown: [
      {
        part: "Bar/column chart",
        explanation: "Compare discrete categories — regions, categories, campaigns."
      },
      {
        part: "Line chart",
        explanation: "Show trends over continuous time."
      },
      {
        part: "Matrix",
        explanation: "Two-dimensional breakdown with subtotals."
      },
      {
        part: "Card/KPI",
        explanation: "Single headline number with optional trend indicator."
      },
      {
        part: "Table",
        explanation: "Row detail for export and audit."
      }
    ],
    sampleInput: "Measures: Total Revenue, Marketing Spend; dimensions: Date, channel, region.",
    expectedOutput: "Page with trend line, category bar chart, and KPI cards aligned to one date slicer.",
    commonMistakes: [
      "Pie charts with too many slices for campaign names",
      "Line chart with non-time on x-axis implying false trends",
      "Dual axes that distort spend vs revenue scale comparison"
    ],
    bestPractices: [
      "Match visual to one primary question per chart",
      "Use consistent colors for regions across all Northstar reports",
      "Add data labels sparingly on top 5 categories only"
    ],
    guidedExample: {
      description: "Build revenue by category bar chart and monthly trend line sharing a date slicer.",
      steps: [
        "Bar chart with category and Total Revenue",
        "Line chart with Date month and Total Revenue",
        "Add date slicer and sync both visuals"
      ]
    },
    tags: [
      "visualizations",
      "charts",
      "report-design"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-slicers-filters-and-interactivity": {
    learningObjectives: [
      "Explain slicers and report-level filters in plain English using Northstar Commerce business examples",
      "Apply slicers and report-level filters to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with slicers and report-level filters and how to avoid them"
    ],
    plainEnglish: "Slicers are on-page filter controls — region buttons, date ranges, category lists. Filters pane offers visual-level, page-level, and report-level filters. Together they let stakeholders explore Northstar data safely.",
    whatItDoes: "Enables self-service slicing by region, date, channel, and product category while keeping sensitive filters locked at report level.",
    whyItMatters: "Support leads at Northstar drill into ticket categories by region without requesting a new report each week.",
    whenToUse: "Any interactive dashboard; use sync slicers across pages for consistent experience.",
    stakeholderQuestion: "Support Lead at Northstar Commerce: \"Let me filter tickets by region and month but hide cancelled orders from everyone.\"",
    walkthrough: "1. Add slicer visual for customers[region] and Date[Month].\n2. View → Sync slicers across pages that share analysis.\n3. Filters pane → report-level filter: orders[status] is not Cancelled — lock filter.\n4. Use visual-level filters for top 10 products on one chart only.\n5. Edit interactions: Format → Edit interactions to prevent one chart from filtering another when needed.\n6. Use buttons and bookmarks for guided stories on executive summary page.",
    syntax: "Slicer: customers[region]\nReport filter: orders[status] <> \"Cancelled\" (apply to all pages)\nSync slicers: View → Sync slicers → select pages",
    componentBreakdown: [
      {
        part: "Slicer",
        explanation: "Visible filter UI for report consumers."
      },
      {
        part: "Report-level filter",
        explanation: "Applies globally — use for data quality rules."
      },
      {
        part: "Page-level filter",
        explanation: "Scopes one page — e.g., Marketing page only digital channel."
      },
      {
        part: "Visual-level filter",
        explanation: "Top N, specific chart exclusions."
      },
      {
        part: "Sync slicers",
        explanation: "Same slicer selection across multiple report pages."
      }
    ],
    sampleInput: "Three-page Northstar sales report with region and year slicers synced.",
    expectedOutput: "Changing West on page 1 filters page 2 detail tables; cancelled orders never appear.",
    commonMistakes: [
      "Too many slicers overwhelming the canvas",
      "Forgetting to sync slicers causing inconsistent totals across pages",
      "Bi-directional relationships plus slicers creating surprising filter propagation"
    ],
    bestPractices: [
      "Place primary slicers in a consistent left panel across pages",
      "Hide advanced filters from consumers — use report filters for exclusions",
      "Test every slicer combination against one known Excel total"
    ],
    guidedExample: {
      description: "Add region slicer synced across two pages and report filter excluding Cancelled orders.",
      steps: [
        "Insert region slicer on page 1",
        "Sync to page 2",
        "Add report filter on status",
        "Verify totals match finance subset"
      ]
    },
    tags: [
      "slicers",
      "filters",
      "interactivity"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-dashboard-design-and-publishing": {
    learningObjectives: [
      "Explain dashboard layout and publishing to Power BI Service in plain English using Northstar Commerce business examples",
      "Apply dashboard layout and publishing to Power BI Service to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with dashboard layout and publishing to Power BI Service and how to avoid them"
    ],
    plainEnglish: "Design puts KPIs top-left, groups related charts, uses white space, and tells one story per page. Publishing sends your .pbix to Power BI Service where colleagues view dashboards, set refresh, and share securely.",
    whatItDoes: "Delivers a polished Northstar executive summary to Power BI Service with scheduled data refresh and role-based sharing.",
    whyItMatters: "Northstar execs view reports on tablets in meetings. Cluttered layouts get ignored; clear hierarchy drives budget decisions.",
    whenToUse: "Final phase before stakeholders consume the report; after DAX and visuals are validated.",
    stakeholderQuestion: "COO at Northstar Commerce: \"Publish the regional sales dashboard and make sure it refreshes every morning before our 9 AM standup.\"",
    walkthrough: "1. Design executive page: KPI row, trend line, regional matrix, footnotes on definitions.\n2. Align visuals to grid; use consistent fonts and Northstar brand colors.\n3. Home → Publish to workspace — choose correct team workspace.\n4. In Service: Settings → Scheduled refresh for dataset; configure gateway if on-prem SQL.\n5. Create Service dashboard pinning key tiles — optional for exec mobile view.\n6. Share with security group — not public link unless policy allows.",
    syntax: "Publish: Home → Publish → select workspace\nService: Dataset → Schedule refresh → daily 6:00 AM\nMobile: View → Mobile layout → arrange priority visuals",
    componentBreakdown: [
      {
        part: "Visual hierarchy",
        explanation: "Most important KPIs top-left where eyes land first."
      },
      {
        part: "Publish",
        explanation: "Uploads report and dataset to Power BI Service."
      },
      {
        part: "Scheduled refresh",
        explanation: "Keeps Northstar data current automatically."
      },
      {
        part: "Gateway",
        explanation: "Connects Service to on-premises SQL if needed."
      },
      {
        part: "Workspace roles",
        explanation: "Admin/Member/Viewer control edit vs view access."
      }
    ],
    sampleInput: "Validated Northstar_Sales.pbix with SQL and Excel sources.",
    expectedOutput: "Published report in team workspace, refresh succeeds, COO has Viewer access.",
    commonMistakes: [
      "Publishing before fixing relationship errors",
      "Missing gateway so refresh fails silently overnight",
      "Cramming fifteen visuals on one phone layout"
    ],
    bestPractices: [
      "Add a definitions page for measure logic and refresh timestamp",
      "Test mobile layout for exec consumers",
      "Document refresh schedule and owner in workspace description"
    ],
    guidedExample: {
      description: "Publish Northstar report and set daily refresh.",
      steps: [
        "Publish to Analytics workspace",
        "Configure credentials for SQL and Excel on gateway",
        "Set 6 AM refresh and confirm success email",
        "Share with Sales Leadership group"
      ]
    },
    tags: [
      "publishing",
      "dashboard-design",
      "service"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  },
  "power-bi-lesson-power-bi-business-report-project": {
    learningObjectives: [
      "Explain capstone Northstar sales and marketing report in plain English using Northstar Commerce business examples",
      "Apply capstone Northstar sales and marketing report to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with capstone Northstar sales and marketing report and how to avoid them"
    ],
    plainEnglish: "This capstone combines import, Power Query, star schema modeling, DAX measures, interactive visuals, and publishing into one Northstar Commerce report stakeholders can use in weekly reviews.",
    whatItDoes: "Delivers a multi-page Power BI report answering revenue by region, category performance, campaign ROI, and support ticket trends with synced slicers and documented measures.",
    whyItMatters: "Hiring managers expect a portfolio piece proving you can own the full BI workflow — not just build one chart.",
    whenToUse: "After completing all Power BI lessons; as portfolio evidence for junior analyst roles.",
    stakeholderQuestion: "Director of Analytics at Northstar Commerce: \"Deliver one published report where I can filter region and month and see revenue, orders, spend, and open tickets together.\"",
    walkthrough: "1. Import customers, orders, order_items, products, marketing_campaigns, support_tickets, monthly_targets.\n2. Power Query: clean types, remove duplicates, build Date table.\n3. Model star schema with relationships; hide keys.\n4. DAX: Total Revenue, Order Count, Marketing Spend, ROI, AOV, YoY Revenue.\n5. Pages: Executive Summary, Sales Detail, Marketing, Support — synced region/date slicers.\n6. Publish to workspace; schedule refresh; write one-page measure dictionary.",
    syntax: "ROI = DIVIDE([Total Revenue] - [Marketing Spend], [Marketing Spend])\nYoY Revenue =\nCALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Date[Date]))",
    componentBreakdown: [
      {
        part: "Data pipeline",
        explanation: "Import + Power Query documented steps."
      },
      {
        part: "Model",
        explanation: "Star schema with Date table marked."
      },
      {
        part: "DAX layer",
        explanation: "Reusable measures with clear names."
      },
      {
        part: "Report UX",
        explanation: "Slicers, hierarchy, mobile layout."
      },
      {
        part: "Deployment",
        explanation: "Publish, refresh, share, document."
      }
    ],
    sampleInput: "Full Northstar dataset bundle: 6 tables + targets + 18 months history.",
    expectedOutput: "Published .pbix + PDF summary: exec can slice West / Q1 and read revenue, spend, tickets consistently.",
    commonMistakes: [
      "Skipping validation against finance totals",
      "Measures defined differently across pages",
      "No refresh or ownership documented after publish"
    ],
    bestPractices: [
      "Include README with sources, grain, and refresh schedule",
      "Screenshot key pages for portfolio PDF",
      "Peer review with checklist before sharing externally"
    ],
    guidedExample: {
      description: "Build Executive Summary page with four KPIs and regional matrix.",
      steps: [
        "Card: Total Revenue, Orders, Marketing Spend, ROI",
        "Matrix: region × category",
        "Line: monthly revenue trend",
        "Sync date and region slicers to detail pages"
      ]
    },
    tags: [
      "project",
      "capstone",
      "portfolio"
    ],
    projectConnectionText: "Builds toward the Power BI Business Report Project using Northstar Commerce orders, customers, and marketing data."
  }
};

export const powerBiQuizzes = [
  {
    id: "power-bi-lesson-power-bi-desktop-interface-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-bi-desktop-interface",
    questions: [
      {
        id: "power-bi-lesson-power-bi-desktop-interface-q1",
        type: "multiple-choice",
        question: "Which Power BI Desktop view shows table relationships as a diagram?",
        options: [
          "Report view",
          "Data view",
          "Model view",
          "Service view"
        ],
        correctIndex: 2,
        explanation: "Model view displays tables and relationship lines between them."
      },
      {
        id: "power-bi-lesson-power-bi-desktop-interface-q2",
        type: "multiple-choice",
        question: "Where do you drag fields to create a bar chart?",
        options: [
          "Filters pane only",
          "Report canvas with Visualizations pane",
          "Power Query Editor only",
          "Excel Online"
        ],
        correctIndex: 1,
        explanation: "Report view combines the canvas, Fields pane, and Visualizations pane."
      },
      {
        id: "power-bi-lesson-power-bi-desktop-interface-q3",
        type: "multiple-choice",
        question: "What file extension does a Power BI Desktop report use?",
        options: [
          ".xlsx",
          ".pbix",
          ".twbx",
          ".csv"
        ],
        correctIndex: 1,
        explanation: "Power BI Desktop saves work as .pbix files."
      }
    ]
  },
  {
    id: "power-bi-lesson-importing-data-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-importing-data",
    questions: [
      {
        id: "power-bi-lesson-importing-data-q1",
        type: "multiple-choice",
        question: "Which ribbon button starts importing data?",
        options: [
          "Publish",
          "Get Data",
          "New Measure",
          "Optimize"
        ],
        correctIndex: 1,
        explanation: "Get Data opens the connector gallery."
      },
      {
        id: "power-bi-lesson-importing-data-q2",
        type: "multiple-choice",
        question: "Import mode stores data where?",
        options: [
          "Only in Excel",
          "Inside the Power BI model in memory/on disk",
          "Only on the SQL server",
          "In Power Query only"
        ],
        correctIndex: 1,
        explanation: "Import copies data into the .pbix model for fast queries."
      },
      {
        id: "power-bi-lesson-importing-data-q3",
        type: "multiple-choice",
        question: "When should you click Transform Data instead of Load?",
        options: [
          "When data needs cleaning before modeling",
          "When publishing to web",
          "When deleting a visual",
          "When writing DAX"
        ],
        correctIndex: 0,
        explanation: "Transform Data opens Power Query for shaping steps first."
      }
    ]
  },
  {
    id: "power-bi-lesson-power-query-data-cleaning-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-query-data-cleaning",
    questions: [
      {
        id: "power-bi-lesson-power-query-data-cleaning-q1",
        type: "multiple-choice",
        question: "Where are Power Query steps recorded?",
        options: [
          "Applied Steps pane",
          "Filters pane",
          "DAX formula bar",
          "Publish dialog"
        ],
        correctIndex: 0,
        explanation: "Applied Steps shows the transformation pipeline."
      },
      {
        id: "power-bi-lesson-power-query-data-cleaning-q2",
        type: "multiple-choice",
        question: "Why change column types in Power Query?",
        options: [
          "So DAX and visuals treat dates and numbers correctly",
          "To change chart colors",
          "To add slicers automatically",
          "To publish faster"
        ],
        correctIndex: 0,
        explanation: "Correct types prevent sort errors and wrong aggregations."
      },
      {
        id: "power-bi-lesson-power-query-data-cleaning-q3",
        type: "multiple-choice",
        question: "What happens to Power Query steps on refresh?",
        options: [
          "They re-run on new source data",
          "They are deleted",
          "They only run once",
          "They move to Excel"
        ],
        correctIndex: 0,
        explanation: "Refresh replays all steps against the latest source file."
      }
    ]
  },
  {
    id: "power-bi-lesson-relationships-and-data-modeling-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-relationships-and-data-modeling",
    questions: [
      {
        id: "power-bi-lesson-relationships-and-data-modeling-q1",
        type: "multiple-choice",
        question: "In a one-to-many relationship, where does the \"one\" side usually live?",
        options: [
          "Dimension table like customers",
          "Fact table like order line items",
          "Calculated table only",
          "Slicer table"
        ],
        correctIndex: 0,
        explanation: "Dimensions (customers, products) are on the one side; facts on the many side."
      },
      {
        id: "power-bi-lesson-relationships-and-data-modeling-q2",
        type: "multiple-choice",
        question: "What happens if orders and customers are not related?",
        options: [
          "Filters may not propagate and totals can be wrong",
          "Power BI auto-fixes on publish",
          "Only colors break",
          "Nothing — relationships are optional"
        ],
        correctIndex: 0,
        explanation: "Without relationships, cross-table filtering and DAX context break down."
      },
      {
        id: "power-bi-lesson-relationships-and-data-modeling-q3",
        type: "multiple-choice",
        question: "Which column should link orders to customers?",
        options: [
          "customer_id",
          "customer email only",
          "order_date",
          "product_name"
        ],
        correctIndex: 0,
        explanation: "Stable numeric keys like customer_id are correct join keys."
      }
    ]
  },
  {
    id: "power-bi-lesson-star-schema-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-star-schema",
    questions: [
      {
        id: "power-bi-lesson-star-schema-q1",
        type: "multiple-choice",
        question: "In a retail star schema, which is typically the fact table?",
        options: [
          "order_items at line grain",
          "customers",
          "products only",
          "Region lookup"
        ],
        correctIndex: 0,
        explanation: "Line-level sales transactions are the fact table."
      },
      {
        id: "power-bi-lesson-star-schema-q2",
        type: "multiple-choice",
        question: "Why use a dedicated date table?",
        options: [
          "Enables consistent time intelligence and fiscal calendars",
          "Required to import CSV",
          "Replaces relationships",
          "Only for maps"
        ],
        correctIndex: 0,
        explanation: "A marked date table supports DAX time functions reliably."
      },
      {
        id: "power-bi-lesson-star-schema-q3",
        type: "multiple-choice",
        question: "Star schema filters generally flow:",
        options: [
          "From dimensions to facts",
          "From facts to dimensions only",
          "Randomly",
          "Not at all"
        ],
        correctIndex: 0,
        explanation: "Single-direction star filtering keeps semantics clear."
      }
    ]
  },
  {
    id: "power-bi-lesson-dax-fundamentals-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-dax-fundamentals",
    questions: [
      {
        id: "power-bi-lesson-dax-fundamentals-q1",
        type: "multiple-choice",
        question: "What recalculates when a slicer changes?",
        options: [
          "Measure",
          "Imported column only",
          "Power Query step",
          "Theme color"
        ],
        correctIndex: 0,
        explanation: "Measures evaluate in the current filter context."
      },
      {
        id: "power-bi-lesson-dax-fundamentals-q2",
        type: "multiple-choice",
        question: "Which function iterates rows for quantity * price?",
        options: [
          "SUMX",
          "COUNT",
          "LEFT",
          "RELATED"
        ],
        correctIndex: 0,
        explanation: "SUMX multiplies per row then sums — ideal for line revenue."
      },
      {
        id: "power-bi-lesson-dax-fundamentals-q3",
        type: "multiple-choice",
        question: "Safe division in DAX uses:",
        options: [
          "DIVIDE",
          "UNION",
          "CALENDAR",
          "USERELATIONSHIP"
        ],
        correctIndex: 0,
        explanation: "DIVIDE handles zero denominators gracefully."
      }
    ]
  },
  {
    id: "power-bi-lesson-measures-and-calculated-columns-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-measures-and-calculated-columns",
    questions: [
      {
        id: "power-bi-lesson-measures-and-calculated-columns-q1",
        type: "multiple-choice",
        question: "Which updates when a user clicks a slicer?",
        options: [
          "Measure",
          "Calculated column values at refresh only",
          "SQL source table",
          "Theme"
        ],
        correctIndex: 0,
        explanation: "Measures re-evaluate with filter context; columns are fixed at refresh."
      },
      {
        id: "power-bi-lesson-measures-and-calculated-columns-q2",
        type: "multiple-choice",
        question: "Where should Total Revenue live?",
        options: [
          "As a measure on the fact table",
          "As a text column on customers",
          "Only in Excel",
          "In a slicer"
        ],
        correctIndex: 0,
        explanation: "Revenue KPIs belong in measures on fact tables."
      },
      {
        id: "power-bi-lesson-measures-and-calculated-columns-q3",
        type: "multiple-choice",
        question: "Calculated columns increase:",
        options: [
          "Model size and refresh time",
          "Only chart colors",
          "SQL Server CPU only",
          "Nothing"
        ],
        correctIndex: 0,
        explanation: "Columns materialize values for every row in the model."
      }
    ]
  },
  {
    id: "power-bi-lesson-calculate-and-filter-context-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-calculate-and-filter-context",
    questions: [
      {
        id: "power-bi-lesson-calculate-and-filter-context-q1",
        type: "multiple-choice",
        question: "CALCULATE primarily modifies:",
        options: [
          "Filter context",
          "Chart title",
          "CSV path",
          "Theme font"
        ],
        correctIndex: 0,
        explanation: "CALCULATE changes which rows are included in evaluation."
      },
      {
        id: "power-bi-lesson-calculate-and-filter-context-q2",
        type: "multiple-choice",
        question: "ALL(customers[region]) in a denominator typically:",
        options: [
          "Removes region filter for total comparison",
          "Deletes data",
          "Adds a slicer",
          "Imports Excel"
        ],
        correctIndex: 0,
        explanation: "ALL clears filters on that column for the calculation inside CALCULATE."
      },
      {
        id: "power-bi-lesson-calculate-and-filter-context-q3",
        type: "multiple-choice",
        question: "Which wraps an existing measure with a filter?",
        options: [
          "CALCULATE([Total Revenue], ...)",
          "SUM(customers)",
          "GETDATA()",
          "PUBLISH()"
        ],
        correctIndex: 0,
        explanation: "CALCULATE takes a measure and optional filter arguments."
      }
    ]
  },
  {
    id: "power-bi-lesson-visualizations-and-chart-selection-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-visualizations-and-chart-selection",
    questions: [
      {
        id: "power-bi-lesson-visualizations-and-chart-selection-q1",
        type: "multiple-choice",
        question: "Best visual for revenue trend over 12 months?",
        options: [
          "Line chart",
          "Pie chart",
          "Gauge only",
          "Map only"
        ],
        correctIndex: 0,
        explanation: "Line charts show continuous time trends clearly."
      },
      {
        id: "power-bi-lesson-visualizations-and-chart-selection-q2",
        type: "multiple-choice",
        question: "Best visual to compare revenue across four regions?",
        options: [
          "Clustered bar chart",
          "Single KPI card",
          "Text box",
          "Slicer only"
        ],
        correctIndex: 0,
        explanation: "Bars compare categorical values side by side."
      },
      {
        id: "power-bi-lesson-visualizations-and-chart-selection-q3",
        type: "multiple-choice",
        question: "Matrix visual is ideal for:",
        options: [
          "Two-dimensional breakdowns like region × category",
          "Geographic lat/long only",
          "Writing DAX",
          "Importing CSV"
        ],
        correctIndex: 0,
        explanation: "Matrices show row and column groups with aggregations."
      }
    ]
  },
  {
    id: "power-bi-lesson-slicers-filters-and-interactivity-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-slicers-filters-and-interactivity",
    questions: [
      {
        id: "power-bi-lesson-slicers-filters-and-interactivity-q1",
        type: "multiple-choice",
        question: "Report-level filters apply to:",
        options: [
          "All pages in the report",
          "One visual only",
          "Power Query only",
          "Excel source"
        ],
        correctIndex: 0,
        explanation: "Report filters are global unless overridden at lower levels."
      },
      {
        id: "power-bi-lesson-slicers-filters-and-interactivity-q2",
        type: "multiple-choice",
        question: "Sync slicers ensures:",
        options: [
          "Same slicer selection across selected pages",
          "Automatic DAX writing",
          "SQL refresh",
          "Map colors"
        ],
        correctIndex: 0,
        explanation: "Sync keeps filter context consistent multi-page."
      },
      {
        id: "power-bi-lesson-slicers-filters-and-interactivity-q3",
        type: "multiple-choice",
        question: "Visual-level Top N filter affects:",
        options: [
          "Only that visual",
          "Entire organization",
          "Database server",
          "All subjects"
        ],
        correctIndex: 0,
        explanation: "Visual filters scope to the selected visual."
      }
    ]
  },
  {
    id: "power-bi-lesson-dashboard-design-and-publishing-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-dashboard-design-and-publishing",
    questions: [
      {
        id: "power-bi-lesson-dashboard-design-and-publishing-q1",
        type: "multiple-choice",
        question: "Publishing saves the report to:",
        options: [
          "Power BI Service workspace",
          "Only your laptop",
          "Excel Online only",
          "Power Query"
        ],
        correctIndex: 0,
        explanation: "Publish uploads to the cloud Service workspace."
      },
      {
        id: "power-bi-lesson-dashboard-design-and-publishing-q2",
        type: "multiple-choice",
        question: "Scheduled refresh requires:",
        options: [
          "Valid data source credentials and often a gateway for on-prem",
          "Only a pie chart",
          "Deleting relationships",
          "Export to PDF"
        ],
        correctIndex: 0,
        explanation: "Refresh needs authenticated access to sources."
      },
      {
        id: "power-bi-lesson-dashboard-design-and-publishing-q3",
        type: "multiple-choice",
        question: "Good dashboard design places key KPIs:",
        options: [
          "Prominently at top with clear hierarchy",
          "Hidden on last page",
          "Only in footnotes",
          "In Power Query editor"
        ],
        correctIndex: 0,
        explanation: "Visual hierarchy guides attention to primary metrics."
      }
    ]
  },
  {
    id: "power-bi-lesson-power-bi-business-report-project-quiz",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-bi-business-report-project",
    questions: [
      {
        id: "power-bi-lesson-power-bi-business-report-project-q1",
        type: "multiple-choice",
        question: "First step in the capstone after gathering requirements?",
        options: [
          "Import and assess data quality in Power Query",
          "Publish empty report",
          "Delete relationships",
          "Only add pie charts"
        ],
        correctIndex: 0,
        explanation: "Solid data foundation precedes modeling and visuals."
      },
      {
        id: "power-bi-lesson-power-bi-business-report-project-q2",
        type: "multiple-choice",
        question: "Star schema for Northstar revenue uses fact table:",
        options: [
          "order_items at line grain",
          "Only customers",
          "Slicer table only",
          "Theme colors"
        ],
        correctIndex: 0,
        explanation: "Line-level facts support product and revenue detail."
      },
      {
        id: "power-bi-lesson-power-bi-business-report-project-q3",
        type: "multiple-choice",
        question: "Before stakeholder demo you should:",
        options: [
          "Validate totals and test slicer combinations",
          "Disable refresh",
          "Remove all measures",
          "Hide every visual"
        ],
        correctIndex: 0,
        explanation: "QA against known totals builds credibility."
      }
    ]
  }
];

export const powerBiExercises = [
  {
    id: "power-bi-lesson-power-bi-desktop-interface-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-bi-desktop-interface",
    title: "Apply: Power BI Desktop Interface",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "List the three main Power BI Desktop views and one task you perform in each for a Northstar sales report.",
    hint: "Think: build charts, inspect rows, connect tables.",
    expectedAnswer: "Report view — design visuals; Data view — inspect table values and types; Model view — create and verify relationships between orders and customers.",
    explanation: "Each view maps to a phase of analytics: visualize, inspect, and model.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-importing-data-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-importing-data",
    title: "Apply: Importing Data",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Northstar has orders in SQL and campaigns in Excel. Describe your import sequence and which mode you would use for each.",
    hint: "Consider size and refresh needs for a mid-market retailer.",
    expectedAnswer: "Import orders from SQL (Import mode for typical Northstar volume) and marketing_campaigns from Excel via Get Data → Excel; use Transform Data on Excel if headers need fixing, then Load both into the model.",
    explanation: "Import mode suits most Northstar datasets; Transform handles Excel cleanup before load.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-power-query-data-cleaning-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-query-data-cleaning",
    title: "Apply: Power Query Data Cleaning",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "A Northstar products export has trailing spaces in category names and mixed-case regions. List three Power Query steps to fix it.",
    hint: "Think trim, replace, and type consistency.",
    expectedAnswer: "Trim category column; Replace Values or capitalize regions to standardize; Change Type on list_price to decimal number.",
    explanation: "Text cleanup and type fixes in Power Query ensure accurate filters and sums.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-relationships-and-data-modeling-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-relationships-and-data-modeling",
    title: "Apply: Relationships and Data Modeling",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Draw the relationship chain from customers to revenue at order line level for Northstar.",
    hint: "customers → orders → order_items → products.",
    expectedAnswer: "customers (1) → (*) orders on customer_id; orders (1) → (*) order_items on order_id; products (1) → (*) order_items on product_id — revenue = SUM(order_items[quantity] * order_items[unit_price]).",
    explanation: "Star-style paths from dimensions to facts enable correct filtered revenue.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-star-schema-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-star-schema",
    title: "Apply: Star Schema",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Name the fact table and three dimensions you would use for Northstar campaign ROI analysis.",
    hint: "Think line-level sales and descriptive tables.",
    expectedAnswer: "Fact: order_items (or orders+items); Dimensions: customers, products, marketing_campaigns, and Date.",
    explanation: "Campaign ROI joins spend from marketing to revenue through orders at consistent grain.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-dax-fundamentals-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-dax-fundamentals",
    title: "Apply: DAX Fundamentals",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Write a DAX measure for Average Order Value at Northstar using Total Revenue and Order Count.",
    hint: "Use DIVIDE.",
    expectedAnswer: "Average Order Value = DIVIDE([Total Revenue], [Order Count])",
    explanation: "DIVIDE avoids errors when order count is zero for a filter selection.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-measures-and-calculated-columns-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-measures-and-calculated-columns",
    title: "Apply: Measures and Calculated Columns",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "When would you create a calculated column for Northstar order size bucket (Small/Medium/Large) instead of a measure?",
    hint: "Slicers and row-level labels.",
    expectedAnswer: "When you need a row-level category on each order for use as a slicer or axis label — e.g., Order Size Bucket column based on line quantity thresholds.",
    explanation: "Buckets at row grain are column work; totals of revenue still use measures.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-calculate-and-filter-context-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-calculate-and-filter-context",
    title: "Apply: CALCULATE and Filter Context",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Write DAX for Northstar shipped-order revenue only (orders[status] = \"Shipped\").",
    hint: "CALCULATE + filter on status.",
    expectedAnswer: "Shipped Revenue = CALCULATE([Total Revenue], orders[status] = \"Shipped\")",
    explanation: "CALCULATE applies the status filter while computing Total Revenue.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-visualizations-and-chart-selection-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-visualizations-and-chart-selection",
    title: "Apply: Visualizations and Chart Selection",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Choose visuals for: (a) MTD revenue single number, (b) top 5 product categories, (c) monthly orders trend.",
    hint: "Card, bar, line.",
    expectedAnswer: "(a) KPI card; (b) sorted bar chart with top N filter; (c) line chart with Date on axis and Order Count as values.",
    explanation: "Each question maps to a visual type optimized for that data shape.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-slicers-filters-and-interactivity-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-slicers-filters-and-interactivity",
    title: "Apply: Slicers, Filters, and Interactivity",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Design filter strategy for Northstar report: exclude test customers, show region slicer, keep one page digital-only.",
    hint: "Report filter, slicer, page filter.",
    expectedAnswer: "Report-level filter customer segment <> Test; synced region slicer on all pages; page-level filter channel = Digital on marketing page only.",
    explanation: "Layered filters separate global rules, user exploration, and page-specific scope.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-dashboard-design-and-publishing-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-dashboard-design-and-publishing",
    title: "Apply: Dashboard Design and Publishing",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "List three pre-publish checks for a Northstar Power BI report.",
    hint: "Data, model, audience.",
    expectedAnswer: "Verify relationships and measure totals against finance; confirm refresh credentials/gateway; review layout, definitions, and workspace permissions.",
    explanation: "Validation prevents wrong numbers and failed overnight refresh.",
    validation: null,
    skillTags: []
  },
  {
    id: "power-bi-lesson-power-bi-business-report-project-exercise",
    subjectId: "power-bi",
    lessonId: "power-bi-lesson-power-bi-business-report-project",
    title: "Apply: Power BI Business Report Project",
    type: "project",
    difficulty: "beginner",
    instructions: "Outline four pages for the Northstar capstone report and one primary question each page answers.",
    hint: "Executive, sales, marketing, support angles.",
    expectedAnswer: "Executive — Are we hitting revenue targets? Sales — Which categories drive regional growth? Marketing — Which channels deliver ROI? Support — Where are ticket backlogs by region?",
    explanation: "Page-level focus keeps dashboards scannable and stakeholder-aligned.",
    validation: null,
    skillTags: []
  }
];
