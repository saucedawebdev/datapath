/**
 * Job Ready Edition — Python lesson content, quizzes, and exercises.
 * Fictional business: Northstar Commerce
 */
export const pythonLessonContent = {
  "python-lesson-python-syntax-and-variables": {
    learningObjectives: [
      "Explain Python syntax and variables in plain English using Northstar Commerce business examples",
      "Apply Python syntax and variables to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python syntax and variables and how to avoid them"
    ],
    plainEnglish: "Python uses readable statements, indentation for blocks, and variables to store values you reuse. At Northstar Commerce you might store west_order_count or weekly_net_revenue before building a pandas workflow.",
    whatItDoes: "Lets analysts assign names to numbers and text, print formatted KPI lines, and prepare values for later DataFrame work.",
    whyItMatters: "Clear syntax and naming prevent refresh scripts from failing silently when Finance reruns weekly West revenue checks.",
    whenToUse: "Starting notebooks, defining constants, and writing small validation scripts before pandas imports.",
    stakeholderQuestion: "Finance Analyst at Northstar Commerce: \"Script last week's West net revenue and order count so we can compare to target.\"",
    walkthrough: "1. Create variables with snake_case names.\n2. Use f-strings for currency formatting.\n3. Print labeled output for audit.\n4. Compare to Excel control totals.\n5. Add header comment with data-as-of date.\n6. Save script in version control.",
    syntax: "region = \"West\"\norder_count = 8420\nnet_revenue = 1_245_880.50\nprint(f\"{region}: {order_count} orders, ${net_revenue:,.2f} net revenue\")",
    componentBreakdown: [
      {
        part: "Assignment",
        explanation: "Stores a value under a reusable name."
      },
      {
        part: "Indentation",
        explanation: "Defines blocks for if, for, and def without braces."
      },
      {
        part: "f-strings",
        explanation: "Embeds variables in stakeholder-friendly text."
      },
      {
        part: "Comments",
        explanation: "Document business rules and refresh dates."
      },
      {
        part: "snake_case",
        explanation: "Matches analytics naming conventions."
      }
    ],
    sampleInput: "West region constants for one week.",
    expectedOutput: "Formatted line with orders and net revenue.",
    commonMistakes: [
      "Inconsistent indentation mixing tabs and spaces",
      "Using vague names like x instead of net_revenue",
      "Hard-coding paths without variables at top"
    ],
    bestPractices: [
      "Name variables after business meaning",
      "Pin Python version in README",
      "Keep one logical step per line in teaching notebooks"
    ],
    guidedExample: {
      description: "Print West KPI summary.",
      steps: [
        "Set variables",
        "Format with f-string",
        "Verify against Excel"
      ]
    },
    tags: [
      "syntax",
      "variables",
      "basics"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-data-types": {
    learningObjectives: [
      "Explain Python data types in plain English using Northstar Commerce business examples",
      "Apply Python data types to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python data types and how to avoid them"
    ],
    plainEnglish: "Numbers, strings, booleans, and None tell Python what operations are valid. Northstar order_id should be int, SKU strings, is_loyalty boolean.",
    whatItDoes: "Cast types after CSV import so revenue sums stay numeric.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python data types when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require python data types in notebooks or scripts.",
    stakeholderQuestion: "Finance Controller at Northstar Commerce: \"Why do some order IDs import as floats from CSV?\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python data types step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "order_id = int(100284.0)\nunit_price = float(\"129.99\")",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Python data types on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying python data types",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Python data types on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "types",
      "casting"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-lists": {
    learningObjectives: [
      "Explain Python lists in plain English using Northstar Commerce business examples",
      "Apply Python lists to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python lists and how to avoid them"
    ],
    plainEnglish: "Lists hold ordered values like seven daily click counts or Northstar category names for a chart legend.",
    whatItDoes: "Collect small sequences and compute quick sums before pandas.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python lists when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require python lists in notebooks or scripts.",
    stakeholderQuestion: "Marketing Coordinator at Northstar Commerce: \"Average last week's email click counts without Excel.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python lists step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "categories = [\"Apparel\", \"Home\", \"Electronics\"]\nclicks = [420, 510, 388]\nprint(sum(clicks) / len(clicks))",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Python lists on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying python lists",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Python lists on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "lists",
      "collections"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-dictionaries": {
    learningObjectives: [
      "Explain Python dictionaries in plain English using Northstar Commerce business examples",
      "Apply Python dictionaries to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python dictionaries and how to avoid them"
    ],
    plainEnglish: "Dicts map keys to values such as region code W to West or customer_id to segment for lookup.",
    whatItDoes: "Build reference maps and parse JSON marketing payloads.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python dictionaries when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require python dictionaries in notebooks or scripts.",
    stakeholderQuestion: "Customer Insights Lead at Northstar Commerce: \"Map W/E/C codes to full region names for slides.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python dictionaries step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "region_map = {\"W\": \"West\", \"E\": \"East\"}\nprint(region_map.get(\"W\"))",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Python dictionaries on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying python dictionaries",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Python dictionaries on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "dictionaries",
      "mapping"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-conditions": {
    learningObjectives: [
      "Explain conditional logic in Python in plain English using Northstar Commerce business examples",
      "Apply conditional logic in Python to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with conditional logic in Python and how to avoid them"
    ],
    plainEnglish: "if/elif/else encode rules like flagging Northstar orders over $500 for review.",
    whatItDoes: "Segment data and guard invalid paths before pandas.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on conditional logic in Python when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require conditional logic in python in notebooks or scripts.",
    stakeholderQuestion: "Risk Analyst at Northstar Commerce: \"How many West orders exceeded $500 last month?\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply conditional logic in python step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "if order_total > 500 and region == \"West\":\n    review = True",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of conditional logic in Python on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying conditional logic in python",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply conditional logic in Python on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "conditions",
      "logic"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-loops": {
    learningObjectives: [
      "Explain Python loops in plain English using Northstar Commerce business examples",
      "Apply Python loops to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python loops and how to avoid them"
    ],
    plainEnglish: "for loops walk categories or dates; while loops paginate APIs — automate repetitive Northstar totals.",
    whatItDoes: "Accumulate revenue by category without copying Excel formulas.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python loops when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require python loops in notebooks or scripts.",
    stakeholderQuestion: "Operations Analyst at Northstar Commerce: \"Total revenue for each main category from a list of pairs.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python loops step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "for cat, rev in pairs:\n    totals[cat] = totals.get(cat, 0) + rev",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Python loops on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying python loops",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Python loops on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "loops",
      "iteration"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-functions": {
    learningObjectives: [
      "Explain Python functions in plain English using Northstar Commerce business examples",
      "Apply Python functions to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Python functions and how to avoid them"
    ],
    plainEnglish: "Functions package reusable KPI logic like compute_aov(revenue, orders) with one Northstar definition.",
    whatItDoes: "Share tested calculations across notebooks.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python functions when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require python functions in notebooks or scripts.",
    stakeholderQuestion: "Director of Sales at Northstar Commerce: \"Use the same AOV definition we used in Q3.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python functions step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "def compute_aov(revenue, orders):\n    return 0 if orders == 0 else revenue / orders",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Python functions on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying python functions",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Python functions on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "functions",
      "reuse"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-numpy-fundamentals": {
    learningObjectives: [
      "Explain NumPy arrays in plain English using Northstar Commerce business examples",
      "Apply NumPy arrays to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with NumPy arrays and how to avoid them"
    ],
    plainEnglish: "NumPy arrays vectorize math on prices and quantities — fast numeric core under pandas.",
    whatItDoes: "Apply markdowns and filters on numeric columns at scale.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on NumPy arrays when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require numpy arrays in notebooks or scripts.",
    stakeholderQuestion: "Pricing Analyst at Northstar Commerce: \"Apply 10% markdown to all clearance prices vectorized.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply numpy arrays step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "import numpy as np\nprices = np.array([29.99, 49.99, 129.0])\nprint(prices * 0.9)",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of NumPy arrays on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying numpy arrays",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply NumPy arrays on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "numpy",
      "arrays"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-pandas-series-and-dataframes": {
    learningObjectives: [
      "Explain pandas Series and DataFrames in plain English using Northstar Commerce business examples",
      "Apply pandas Series and DataFrames to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with pandas Series and DataFrames and how to avoid them"
    ],
    plainEnglish: "Series is one column; DataFrame is Northstar orders table with labels — primary analyst structure.",
    whatItDoes: "Load, inspect, filter tabular exports.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on pandas Series and DataFrames when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require pandas series and dataframes in notebooks or scripts.",
    stakeholderQuestion: "Sales Analyst at Northstar Commerce: \"First 20 West orders with customer_id and net_revenue.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply pandas series and dataframes step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "import pandas as pd\ndf = pd.read_csv('northstar_orders.csv')\nwest = df.loc[df['region']=='West', ['customer_id','net_revenue']]",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of pandas Series and DataFrames on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying pandas series and dataframes",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply pandas Series and DataFrames on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "pandas",
      "dataframe"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-reading-csv-and-excel-files": {
    learningObjectives: [
      "Explain reading CSV and Excel into pandas in plain English using Northstar Commerce business examples",
      "Apply reading CSV and Excel into pandas to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with reading CSV and Excel into pandas and how to avoid them"
    ],
    plainEnglish: "read_csv and read_excel ingest Finance CSV and Marketing Excel sheets with dtypes and dates.",
    whatItDoes: "Start every pipeline from files stakeholders already use.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on reading CSV and Excel into pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require reading csv and excel into pandas in notebooks or scripts.",
    stakeholderQuestion: "Marketing Manager at Northstar Commerce: \"Load campaign spend Sheet2 without copy-paste.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply reading csv and excel into pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "orders = pd.read_csv('northstar_orders.csv', parse_dates=['order_date'])\nspend = pd.read_excel('northstar_marketing.xlsx', sheet_name='Campaigns')",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of reading CSV and Excel into pandas on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying reading csv and excel into pandas",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply reading CSV and Excel into pandas on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "io",
      "read_csv"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-selecting-and-filtering-data": {
    learningObjectives: [
      "Explain selecting and filtering pandas data in plain English using Northstar Commerce business examples",
      "Apply selecting and filtering pandas data to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with selecting and filtering pandas data and how to avoid them"
    ],
    plainEnglish: "Boolean masks with .loc slice West apparel orders over $200 in January.",
    whatItDoes: "Answer daily segmented KPI questions.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on selecting and filtering pandas data when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require selecting and filtering pandas data in notebooks or scripts.",
    stakeholderQuestion: "Regional Sales Director at Northstar Commerce: \"Count and sum West apparel orders over $200 in January.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply selecting and filtering pandas data step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "mask = (df['region']=='West') & (df['net_revenue']>200)\nsummary = df.loc[mask]",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of selecting and filtering pandas data on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying selecting and filtering pandas data",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply selecting and filtering pandas data on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "filter",
      "loc"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-sorting-and-grouping": {
    learningObjectives: [
      "Explain sorting and grouping with pandas in plain English using Northstar Commerce business examples",
      "Apply sorting and grouping with pandas to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with sorting and grouping with pandas and how to avoid them"
    ],
    plainEnglish: "groupby region with agg sum revenue and nunique orders; sort_values for rank reports.",
    whatItDoes: "Weekly leaderboard tables for exec reviews.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on sorting and grouping with pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require sorting and grouping with pandas in notebooks or scripts.",
    stakeholderQuestion: "VP Sales at Northstar Commerce: \"Rank regions by net revenue with order counts.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply sorting and grouping with pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "df.groupby('region', as_index=False).agg(net_revenue=('net_revenue','sum')).sort_values('net_revenue', ascending=False)",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of sorting and grouping with pandas on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying sorting and grouping with pandas",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply sorting and grouping with pandas on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "groupby",
      "sort"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-merging-dataframes": {
    learningObjectives: [
      "Explain merging pandas DataFrames in plain English using Northstar Commerce business examples",
      "Apply merging pandas DataFrames to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with merging pandas DataFrames and how to avoid them"
    ],
    plainEnglish: "merge orders to customers on customer_id like SQL LEFT JOIN enriching segment without losing rows.",
    whatItDoes: "Combine facts and dimensions before KPIs.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on merging pandas DataFrames when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require merging pandas dataframes in notebooks or scripts.",
    stakeholderQuestion: "Analytics Engineer at Northstar Commerce: \"Attach segment to orders without inflating revenue.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply merging pandas dataframes step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "enriched = orders.merge(customers, on='customer_id', how='left', validate='m:1')",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of merging pandas DataFrames on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying merging pandas dataframes",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply merging pandas DataFrames on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "merge",
      "join"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-cleaning-missing-and-duplicate-data": {
    learningObjectives: [
      "Explain handling missing and duplicate data in plain English using Northstar Commerce business examples",
      "Apply handling missing and duplicate data to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with handling missing and duplicate data and how to avoid them"
    ],
    plainEnglish: "drop_duplicates on order_id and fillna region protect Northstar revenue integrity.",
    whatItDoes: "Clean immediately after load.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on handling missing and duplicate data when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require handling missing and duplicate data in notebooks or scripts.",
    stakeholderQuestion: "Finance Controller at Northstar Commerce: \"Exclude duplicate transactions and flag missing cost.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply handling missing and duplicate data step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "df.drop_duplicates(subset=['order_id'], keep='first')\ndf['region'].fillna('Unknown')",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of handling missing and duplicate data on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying handling missing and duplicate data",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply handling missing and duplicate data on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "cleaning",
      "quality"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-working-with-dates-and-text": {
    learningObjectives: [
      "Explain dates and text in pandas in plain English using Northstar Commerce business examples",
      "Apply dates and text in pandas to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with dates and text in pandas and how to avoid them"
    ],
    plainEnglish: "dt accessors bucket weeks; str.strip and title clean category labels on Northstar exports.",
    whatItDoes: "Time series and normalized dimensions.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on dates and text in pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require dates and text in pandas in notebooks or scripts.",
    stakeholderQuestion: "Merchandising Lead at Northstar Commerce: \"Sales by order week with fixed category spelling.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply dates and text in pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "df['order_date']=pd.to_datetime(df['order_date'])\ndf['week']=df['order_date'].dt.isocalendar().week",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of dates and text in pandas on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying dates and text in pandas",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply dates and text in pandas on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "dates",
      "strings"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-exploratory-data-analysis": {
    learningObjectives: [
      "Explain exploratory data analysis (EDA) in plain English using Northstar Commerce business examples",
      "Apply exploratory data analysis (EDA) to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with exploratory data analysis (EDA) and how to avoid them"
    ],
    plainEnglish: "describe, value_counts, pivot_table, and corr profile Northstar orders before final charts.",
    whatItDoes: "Profile new datasets and validate cleaning.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on exploratory data analysis (EDA) when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require exploratory data analysis (eda) in notebooks or scripts.",
    stakeholderQuestion: "Director of Analytics at Northstar Commerce: \"What should we know about West returns spike before the board?\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply exploratory data analysis (eda) step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "df.describe()\ndf['region'].value_counts()\ndf.pivot_table(values='net_revenue', index='region', columns='category')",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of exploratory data analysis (EDA) on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying exploratory data analysis (eda)",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply exploratory data analysis (EDA) on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "eda",
      "profiling"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-matplotlib-visualization": {
    learningObjectives: [
      "Explain Matplotlib charts in plain English using Northstar Commerce business examples",
      "Apply Matplotlib charts to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with Matplotlib charts and how to avoid them"
    ],
    plainEnglish: "Bar and line charts communicate Northstar monthly revenue and spend to executives.",
    whatItDoes: "Visualize aggregated DataFrames.",
    whyItMatters: "Junior Python analysts at Northstar Commerce rely on Matplotlib charts when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
    whenToUse: "When working on Northstar exports that require matplotlib charts in notebooks or scripts.",
    stakeholderQuestion: "CMO at Northstar Commerce: \"Monthly marketing spend vs revenue last year.\"",
    walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply matplotlib charts step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
    syntax: "import matplotlib.pyplot as plt\nplt.bar(regions, revenue)\nplt.title('Net Revenue by Region')",
    componentBreakdown: [
      {
        part: "Core concept",
        explanation: "Foundation of Matplotlib charts on tabular business data."
      },
      {
        part: "Northstar data",
        explanation: "Orders, customers, products, or campaigns grain."
      },
      {
        part: "Validation",
        explanation: "Row counts and revenue totals vs control."
      },
      {
        part: "Stakeholder output",
        explanation: "Table, metric, or chart for decision makers."
      },
      {
        part: "Next step",
        explanation: "Feeds capstone Python Business Analysis Project."
      }
    ],
    sampleInput: "Sample Northstar orders or marketing export.",
    expectedOutput: "Correct metric or table matching control check.",
    commonMistakes: [
      "Skipping validation after applying matplotlib charts",
      "Mixing order grain and line-item grain",
      "Ignoring cancelled or test customer rows"
    ],
    bestPractices: [
      "Write assertions on row count and revenue sum",
      "Keep metric definitions aligned with Finance",
      "Version control notebooks and raw file paths"
    ],
    guidedExample: {
      description: "Apply Matplotlib charts on a West slice.",
      steps: [
        "Load sample",
        "Apply technique",
        "Validate total"
      ]
    },
    tags: [
      "matplotlib",
      "charts"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "python-lesson-python-business-analysis-project": {
    learningObjectives: [
      "Explain capstone Python analysis for Northstar in plain English using Northstar Commerce business examples",
      "Apply capstone Python analysis for Northstar to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with capstone Python analysis for Northstar and how to avoid them"
    ],
    plainEnglish: "Capstone combines ingest, cleaning, merges, groupby, EDA, and Matplotlib into one reproducible Northstar notebook answering Sales, Marketing, and Finance questions.",
    whatItDoes: "Delivers portfolio-ready Python artifact with KPIs, charts, QA asserts, and README.",
    whyItMatters: "Hiring managers want proof you own the full workflow—not isolated syntax drills.",
    whenToUse: "After completing all Python lessons; interview walkthrough.",
    stakeholderQuestion: "Director of Analytics at Northstar Commerce: \"One notebook: regional revenue, category mix, campaign ROI, and data quality notes from raw files.\"",
    walkthrough: "1. Load orders, customers, products, marketing.\n2. Clean types, dupes, dates; merge with validate.\n3. KPIs: revenue, orders, AOV, spend, ROI.\n4. EDA memo and caveats.\n5. Charts: monthly trend, region bar.\n6. README with run steps and finance control totals.",
    syntax: "roi = (merged['net_revenue'].sum() - spend_total) / spend_total\nby_region = merged.groupby('region')['net_revenue'].sum()",
    componentBreakdown: [
      {
        part: "Ingest",
        explanation: "Documented read_csv/read_excel."
      },
      {
        part: "Transform",
        explanation: "Cleaning and merges with QA."
      },
      {
        part: "Metrics",
        explanation: "Shared KPI functions."
      },
      {
        part: "Communication",
        explanation: "Charts and bullet insights."
      },
      {
        part: "Reproducibility",
        explanation: "requirements.txt and paths."
      }
    ],
    sampleInput: "Full Northstar six-table bundle.",
    expectedOutput: "Notebook plus exports with validated totals.",
    commonMistakes: [
      "Skipping merge row-count QA",
      "Undocumented metric definitions",
      "No README for recruiters"
    ],
    bestPractices: [
      "Match finance control totals",
      "Peer review checklist",
      "Tagged git release"
    ],
    guidedExample: {
      description: "Regional revenue bar after merge.",
      steps: [
        "Merge",
        "groupby",
        "plot"
      ]
    },
    tags: [
      "project",
      "capstone",
      "portfolio"
    ],
    projectConnectionText: "Builds toward the Python Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  }
};

export const pythonQuizzes = [
  {
    id: "python-lesson-python-syntax-and-variables-quiz",
    subjectId: "python",
    lessonId: "python-lesson-python-syntax-and-variables",
    questions: [
      {
        id: "python-lesson-python-syntax-and-variables-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python syntax and variables?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python syntax and variables supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-python-syntax-and-variables-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python syntax and variables is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-python-syntax-and-variables-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python syntax and variables?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-data-types-quiz",
    subjectId: "python",
    lessonId: "python-lesson-data-types",
    questions: [
      {
        id: "python-lesson-data-types-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python data types?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python data types supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-data-types-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python data types is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-data-types-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python data types?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-lists-quiz",
    subjectId: "python",
    lessonId: "python-lesson-lists",
    questions: [
      {
        id: "python-lesson-lists-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python lists?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python lists supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-lists-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python lists is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-lists-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python lists?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-dictionaries-quiz",
    subjectId: "python",
    lessonId: "python-lesson-dictionaries",
    questions: [
      {
        id: "python-lesson-dictionaries-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python dictionaries?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python dictionaries supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-dictionaries-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python dictionaries is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-dictionaries-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python dictionaries?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-conditions-quiz",
    subjectId: "python",
    lessonId: "python-lesson-conditions",
    questions: [
      {
        id: "python-lesson-conditions-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies conditional logic in Python?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "conditional logic in Python supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-conditions-q2",
        type: "multiple-choice",
        question: "What goes wrong if conditional logic in Python is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-conditions-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving conditional logic in Python?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-loops-quiz",
    subjectId: "python",
    lessonId: "python-lesson-loops",
    questions: [
      {
        id: "python-lesson-loops-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python loops?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python loops supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-loops-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python loops is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-loops-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python loops?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-functions-quiz",
    subjectId: "python",
    lessonId: "python-lesson-functions",
    questions: [
      {
        id: "python-lesson-functions-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Python functions?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Python functions supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-functions-q2",
        type: "multiple-choice",
        question: "What goes wrong if Python functions is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-functions-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Python functions?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-numpy-fundamentals-quiz",
    subjectId: "python",
    lessonId: "python-lesson-numpy-fundamentals",
    questions: [
      {
        id: "python-lesson-numpy-fundamentals-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies NumPy arrays?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "NumPy arrays supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-numpy-fundamentals-q2",
        type: "multiple-choice",
        question: "What goes wrong if NumPy arrays is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-numpy-fundamentals-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving NumPy arrays?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-pandas-series-and-dataframes-quiz",
    subjectId: "python",
    lessonId: "python-lesson-pandas-series-and-dataframes",
    questions: [
      {
        id: "python-lesson-pandas-series-and-dataframes-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies pandas Series and DataFrames?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "pandas Series and DataFrames supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-pandas-series-and-dataframes-q2",
        type: "multiple-choice",
        question: "What goes wrong if pandas Series and DataFrames is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-pandas-series-and-dataframes-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving pandas Series and DataFrames?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-reading-csv-and-excel-files-quiz",
    subjectId: "python",
    lessonId: "python-lesson-reading-csv-and-excel-files",
    questions: [
      {
        id: "python-lesson-reading-csv-and-excel-files-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies reading CSV and Excel into pandas?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "reading CSV and Excel into pandas supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-reading-csv-and-excel-files-q2",
        type: "multiple-choice",
        question: "What goes wrong if reading CSV and Excel into pandas is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-reading-csv-and-excel-files-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving reading CSV and Excel into pandas?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-selecting-and-filtering-data-quiz",
    subjectId: "python",
    lessonId: "python-lesson-selecting-and-filtering-data",
    questions: [
      {
        id: "python-lesson-selecting-and-filtering-data-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies selecting and filtering pandas data?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "selecting and filtering pandas data supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-selecting-and-filtering-data-q2",
        type: "multiple-choice",
        question: "What goes wrong if selecting and filtering pandas data is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-selecting-and-filtering-data-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving selecting and filtering pandas data?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-sorting-and-grouping-quiz",
    subjectId: "python",
    lessonId: "python-lesson-sorting-and-grouping",
    questions: [
      {
        id: "python-lesson-sorting-and-grouping-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies sorting and grouping with pandas?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "sorting and grouping with pandas supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-sorting-and-grouping-q2",
        type: "multiple-choice",
        question: "What goes wrong if sorting and grouping with pandas is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-sorting-and-grouping-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving sorting and grouping with pandas?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-merging-dataframes-quiz",
    subjectId: "python",
    lessonId: "python-lesson-merging-dataframes",
    questions: [
      {
        id: "python-lesson-merging-dataframes-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies merging pandas DataFrames?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "merging pandas DataFrames supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-merging-dataframes-q2",
        type: "multiple-choice",
        question: "What goes wrong if merging pandas DataFrames is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-merging-dataframes-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving merging pandas DataFrames?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-cleaning-missing-and-duplicate-data-quiz",
    subjectId: "python",
    lessonId: "python-lesson-cleaning-missing-and-duplicate-data",
    questions: [
      {
        id: "python-lesson-cleaning-missing-and-duplicate-data-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies handling missing and duplicate data?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "handling missing and duplicate data supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-cleaning-missing-and-duplicate-data-q2",
        type: "multiple-choice",
        question: "What goes wrong if handling missing and duplicate data is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-cleaning-missing-and-duplicate-data-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving handling missing and duplicate data?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-working-with-dates-and-text-quiz",
    subjectId: "python",
    lessonId: "python-lesson-working-with-dates-and-text",
    questions: [
      {
        id: "python-lesson-working-with-dates-and-text-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies dates and text in pandas?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "dates and text in pandas supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-working-with-dates-and-text-q2",
        type: "multiple-choice",
        question: "What goes wrong if dates and text in pandas is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-working-with-dates-and-text-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving dates and text in pandas?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-exploratory-data-analysis-quiz",
    subjectId: "python",
    lessonId: "python-lesson-exploratory-data-analysis",
    questions: [
      {
        id: "python-lesson-exploratory-data-analysis-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies exploratory data analysis (EDA)?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "exploratory data analysis (EDA) supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-exploratory-data-analysis-q2",
        type: "multiple-choice",
        question: "What goes wrong if exploratory data analysis (EDA) is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-exploratory-data-analysis-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving exploratory data analysis (EDA)?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-matplotlib-visualization-quiz",
    subjectId: "python",
    lessonId: "python-lesson-matplotlib-visualization",
    questions: [
      {
        id: "python-lesson-matplotlib-visualization-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies Matplotlib charts?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "Matplotlib charts supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-matplotlib-visualization-q2",
        type: "multiple-choice",
        question: "What goes wrong if Matplotlib charts is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-matplotlib-visualization-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving Matplotlib charts?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "python-lesson-python-business-analysis-project-quiz",
    subjectId: "python",
    lessonId: "python-lesson-python-business-analysis-project",
    questions: [
      {
        id: "python-lesson-python-business-analysis-project-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies capstone Python analysis for Northstar?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "capstone Python analysis for Northstar supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "python-lesson-python-business-analysis-project-q2",
        type: "multiple-choice",
        question: "What goes wrong if capstone Python analysis for Northstar is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "python-lesson-python-business-analysis-project-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving capstone Python analysis for Northstar?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  }
];

export const pythonExercises = [
  {
    id: "python-lesson-python-syntax-and-variables-exercise",
    subjectId: "python",
    lessonId: "python-lesson-python-syntax-and-variables",
    title: "Apply: Python Syntax and Variables",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Define region West, order_count 8420, net_revenue 1245880.50 and print one formatted summary line.",
    hint: "Use snake_case and f-string with comma formatting for money.",
    expectedAnswer: "region = \"West\"\norder_count = 8420\nnet_revenue = 1_245_880.50\nprint(f\"{region}: {order_count} orders, ${net_revenue:,.2f} net revenue\")",
    explanation: "Readable names and formatting match how analysts deliver numbers to Finance.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-data-types-exercise",
    subjectId: "python",
    lessonId: "python-lesson-data-types",
    title: "Apply: Data Types",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Cast order_id 100284.0 to int and price \"129.99\" to float; compute line_total = price * 2.",
    hint: "Use int() and float().",
    expectedAnswer: "order_id = int(100284.0)\nprice = float(\"129.99\")\nline_total = price * 2",
    explanation: "Correct types enable math Finance expects.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-lists-exercise",
    subjectId: "python",
    lessonId: "python-lesson-lists",
    title: "Apply: Lists",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Build list [100,200,150] and print sum.",
    hint: "Use sum().",
    expectedAnswer: "print(sum([100, 200, 150]))",
    explanation: "Lists support quick totals on small series.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-dictionaries-exercise",
    subjectId: "python",
    lessonId: "python-lesson-dictionaries",
    title: "Apply: Dictionaries",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Dict mapping APP to Apparel; print dept[\"APP\"].",
    hint: "Literal dict then bracket access.",
    expectedAnswer: "dept = {\"APP\": \"Apparel\"}\nprint(dept[\"APP\"])",
    explanation: "Dicts power label lookups.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-conditions-exercise",
    subjectId: "python",
    lessonId: "python-lesson-conditions",
    title: "Apply: Conditions",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Print Review when order_total=620 exceeds 500 else OK.",
    hint: "if/else with print.",
    expectedAnswer: "order_total = 620\nif order_total > 500:\n    print(\"Review\")\nelse:\n    print(\"OK\")",
    explanation: "Conditions encode review rules.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-loops-exercise",
    subjectId: "python",
    lessonId: "python-lesson-loops",
    title: "Apply: Loops",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Loop values [10,20,30] printing running total.",
    hint: "Initialize total before loop.",
    expectedAnswer: "total = 0\nfor v in [10, 20, 30]:\n    total += v\n    print(total)",
    explanation: "Loops accumulate metrics.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-functions-exercise",
    subjectId: "python",
    lessonId: "python-lesson-functions",
    title: "Apply: Functions",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "def discount_price(price, pct) returning price after pct discount; call with 100, 15.",
    hint: "return price * (1 - pct/100).",
    expectedAnswer: "def discount_price(price, pct):\n    return price * (1 - pct / 100)\nprint(discount_price(100, 15))",
    explanation: "Functions centralize pricing logic.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-numpy-fundamentals-exercise",
    subjectId: "python",
    lessonId: "python-lesson-numpy-fundamentals",
    title: "Apply: NumPy Fundamentals",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "np.array([10,20,30]); print mean and sum.",
    hint: "np.mean, np.sum.",
    expectedAnswer: "import numpy as np\na = np.array([10, 20, 30])\nprint(np.mean(a), np.sum(a))",
    explanation: "NumPy aggregates support pricing QA.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-pandas-series-and-dataframes-exercise",
    subjectId: "python",
    lessonId: "python-lesson-pandas-series-and-dataframes",
    title: "Apply: pandas Series and DataFrames",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Select rows where region equals East with .loc.",
    hint: "Boolean mask.",
    expectedAnswer: "east = df.loc[df[\"region\"] == \"East\"]",
    explanation: "Label selection defines slices.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-reading-csv-and-excel-files-exercise",
    subjectId: "python",
    lessonId: "python-lesson-reading-csv-and-excel-files",
    title: "Apply: Reading CSV and Excel Files",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "read_csv northstar_orders.csv parsing order_date.",
    hint: "parse_dates argument.",
    expectedAnswer: "pd.read_csv(\"northstar_orders.csv\", parse_dates=[\"order_date\"])",
    explanation: "Parse dates at ingest.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-selecting-and-filtering-data-exercise",
    subjectId: "python",
    lessonId: "python-lesson-selecting-and-filtering-data",
    title: "Apply: Selecting and Filtering Data",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Filter region East with .loc.",
    hint: "df.loc[mask].",
    expectedAnswer: "east = df.loc[df[\"region\"] == \"East\"]",
    explanation: "Boolean indexing defines slices.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-sorting-and-grouping-exercise",
    subjectId: "python",
    lessonId: "python-lesson-sorting-and-grouping",
    title: "Apply: Sorting and Grouping",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "groupby category summing net_revenue.",
    hint: "groupby and sum.",
    expectedAnswer: "df.groupby(\"category\", as_index=False)[\"net_revenue\"].sum()",
    explanation: "Groupby produces subtotals.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-merging-dataframes-exercise",
    subjectId: "python",
    lessonId: "python-lesson-merging-dataframes",
    title: "Apply: Merging DataFrames",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Left merge orders and customers on customer_id.",
    hint: "how='left'.",
    expectedAnswer: "orders.merge(customers, on=\"customer_id\", how=\"left\")",
    explanation: "Left join preserves order grain.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-cleaning-missing-and-duplicate-data-exercise",
    subjectId: "python",
    lessonId: "python-lesson-cleaning-missing-and-duplicate-data",
    title: "Apply: Cleaning Missing and Duplicate Data",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "drop_duplicates by order_id keep first.",
    hint: "subset and keep.",
    expectedAnswer: "df.drop_duplicates(subset=[\"order_id\"], keep=\"first\")",
    explanation: "Deduping protects totals.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-working-with-dates-and-text-exercise",
    subjectId: "python",
    lessonId: "python-lesson-working-with-dates-and-text",
    title: "Apply: Working with Dates and Text",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Create month column from order_date via .dt.month.",
    hint: "to_datetime then .dt.",
    expectedAnswer: "df[\"month\"] = pd.to_datetime(df[\"order_date\"]).dt.month",
    explanation: "Date parts enable monthly reporting.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-exploratory-data-analysis-exercise",
    subjectId: "python",
    lessonId: "python-lesson-exploratory-data-analysis",
    title: "Apply: Exploratory Data Analysis",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Name two methods for numeric summary and category frequency.",
    hint: "describe and value_counts.",
    expectedAnswer: "df.describe(); df['region'].value_counts()",
    explanation: "EDA surfaces structure and quality.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-matplotlib-visualization-exercise",
    subjectId: "python",
    lessonId: "python-lesson-matplotlib-visualization",
    title: "Apply: Matplotlib Visualization",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "plt.bar two regions West and East with sample revenues.",
    hint: "pyplot bar.",
    expectedAnswer: "import matplotlib.pyplot as plt\nplt.bar([\"West\", \"East\"], [1.2e6, 0.9e6])\nplt.title(\"Net Revenue by Region\")",
    explanation: "Charts compare regions clearly.",
    validation: null,
    skillTags: []
  },
  {
    id: "python-lesson-python-business-analysis-project-exercise",
    subjectId: "python",
    lessonId: "python-lesson-python-business-analysis-project",
    title: "Apply: Python Business Analysis Project",
    type: "project",
    difficulty: "beginner",
    instructions: "List four sections your Northstar capstone notebook should include.",
    hint: "Ingest, clean, analyze, communicate.",
    expectedAnswer: "Data ingest; cleaning and merge QA; KPI analysis; charts, insights, and README.",
    explanation: "Structured capstone mirrors real deliverables.",
    validation: null,
    skillTags: []
  }
];
