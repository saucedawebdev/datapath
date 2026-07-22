/**
 * Official Job Ready Edition curriculum — exactly 114 lessons.
 * Single source of truth for structure and stable IDs.
 */

function mod(subjectId, name, lessons) {
  return {
    name,
    lessons: lessons.map((title, i) => ({ title, order: i + 1 })),
  };
}

export const JOB_READY_CURRICULUM = [
  {
    id: 'sql',
    name: 'SQL',
    order: 1,
    description: 'Query, join, and analyze relational data — the foundation of data analytics.',
    modules: [
      mod('sql', 'Database Foundations', [
        'What Is a Database?',
        'Tables, Rows, and Columns',
        'SQL Data Types',
        'Primary Keys',
        'Foreign Keys',
        'Table Relationships',
      ]),
      mod('sql', 'Querying Data', [
        'SELECT',
        'WHERE',
        'Comparison Operators',
        'AND, OR, and NOT',
        'ORDER BY',
        'LIMIT and TOP',
        'DISTINCT',
        'Column Aliases',
      ]),
      mod('sql', 'Aggregate Analysis', [
        'COUNT',
        'SUM',
        'AVG',
        'MIN and MAX',
        'GROUP BY',
        'HAVING',
        'Conditional Aggregation with CASE',
      ]),
      mod('sql', 'Joining Data', [
        'INNER JOIN',
        'LEFT JOIN',
        'RIGHT JOIN',
        'FULL OUTER JOIN',
        'SELF JOIN',
        'Joining Multiple Tables',
      ]),
      mod('sql', 'Advanced Querying', [
        'CASE Expressions',
        'Subqueries',
        'Common Table Expressions',
        'UNION and UNION ALL',
        'Window Function Fundamentals',
        'ROW_NUMBER',
        'RANK and DENSE_RANK',
        'LAG and LEAD',
      ]),
      mod('sql', 'Cleaning and Preparing Data', [
        'Handling NULL Values',
        'String Functions',
        'Date Functions',
        'Finding and Removing Duplicates',
      ]),
      mod('sql', 'SQL Project', [
        'SQL Business Analysis Project',
      ]),
    ],
  },
  {
    id: 'excel',
    name: 'Excel',
    order: 2,
    description: 'Build spreadsheets, formulas, pivot tables, and business dashboards.',
    modules: [
      mod('excel', 'Excel Foundations', [
        'Excel Interface and Workbook Basics',
        'Cells, Ranges, and Tables',
        'Sorting and Filtering',
        'Relative and Absolute References',
      ]),
      mod('excel', 'Essential Functions', [
        'SUM, AVERAGE, MIN, and MAX',
        'COUNT and COUNTA',
        'IF',
        'SUMIF and SUMIFS',
        'COUNTIF and COUNTIFS',
        'IFERROR',
      ]),
      mod('excel', 'Lookups and Data Preparation', [
        'XLOOKUP',
        'INDEX and MATCH',
        'Text Functions',
        'Date Functions',
        'Cleaning and Removing Duplicates',
      ]),
      mod('excel', 'Analysis and Visualization', [
        'Conditional Formatting',
        'PivotTables',
        'Charts and Chart Selection',
        'Dashboard Design',
      ]),
      mod('excel', 'Excel Project', [
        'Excel Business Dashboard Project',
      ]),
    ],
  },
  {
    id: 'tableau',
    name: 'Tableau',
    order: 3,
    description: 'Build interactive visualizations and dashboards that tell data stories.',
    modules: [
      mod('tableau', 'Tableau Foundations', [
        'Tableau Interface',
        'Connecting to Data',
        'Dimensions and Measures',
        'Discrete and Continuous Fields',
      ]),
      mod('tableau', 'Visual Analysis', [
        'Bar and Line Charts',
        'Maps and Geographic Analysis',
        'Filters and Sorting',
        'Calculated Fields',
        'Parameters',
      ]),
      mod('tableau', 'Dashboards', [
        'Building Interactive Dashboards',
        'Data Storytelling and Visualization Best Practices',
      ]),
      mod('tableau', 'Tableau Project', [
        'Tableau Portfolio Dashboard Project',
      ]),
    ],
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    order: 4,
    description: 'Model data, write DAX, and publish business reports.',
    modules: [
      mod('power-bi', 'Power BI Foundations', [
        'Power BI Desktop Interface',
        'Importing Data',
        'Power Query Data Cleaning',
        'Relationships and Data Modeling',
        'Star Schema',
      ]),
      mod('power-bi', 'DAX and Analysis', [
        'DAX Fundamentals',
        'Measures and Calculated Columns',
        'CALCULATE and Filter Context',
      ]),
      mod('power-bi', 'Reports', [
        'Visualizations and Chart Selection',
        'Slicers, Filters, and Interactivity',
        'Dashboard Design and Publishing',
      ]),
      mod('power-bi', 'Power BI Project', [
        'Power BI Business Report Project',
      ]),
    ],
  },
  {
    id: 'python',
    name: 'Python',
    order: 5,
    description: 'Analyze data with Python, pandas, and visualization.',
    modules: [
      mod('python', 'Python Foundations', [
        'Python Syntax and Variables',
        'Data Types',
        'Lists',
        'Dictionaries',
        'Conditions',
        'Loops',
        'Functions',
      ]),
      mod('python', 'Analytics Libraries', [
        'NumPy Fundamentals',
        'pandas Series and DataFrames',
        'Reading CSV and Excel Files',
      ]),
      mod('python', 'Working with Data', [
        'Selecting and Filtering Data',
        'Sorting and Grouping',
        'Merging DataFrames',
        'Cleaning Missing and Duplicate Data',
        'Working with Dates and Text',
      ]),
      mod('python', 'Analysis and Visualization', [
        'Exploratory Data Analysis',
        'Matplotlib Visualization',
      ]),
      mod('python', 'Python Project', [
        'Python Business Analysis Project',
      ]),
    ],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    order: 6,
    description: 'Apply statistical reasoning to business decisions.',
    modules: [
      mod('statistics', 'Descriptive Statistics', [
        'Populations, Samples, and Data Types',
        'Mean, Median, and Mode',
        'Range and Interquartile Range',
        'Variance and Standard Deviation',
        'Percentiles, Quartiles, and Outliers',
        'Distributions and Normal Distribution',
      ]),
      mod('statistics', 'Analytical Statistics', [
        'Probability Fundamentals',
        'Sampling and Sampling Bias',
        'Confidence Intervals',
        'Hypothesis Testing and A/B Testing',
        'Correlation and Regression Fundamentals',
      ]),
      mod('statistics', 'Statistics Project', [
        'Statistics Business Analysis Project',
      ]),
    ],
  },
];

/** Preserve legacy SQL lesson IDs where they exist. */
export const LEGACY_SQL_IDS = {
  'What Is a Database?': 'sql-lesson-intro-databases',
  'SELECT': 'sql-lesson-select-basics',
  'WHERE': 'sql-lesson-where-filtering',
  'ORDER BY': 'sql-lesson-order-by-limit',
  'DISTINCT': 'sql-lesson-distinct-aliases',
  'GROUP BY': 'sql-lesson-group-by',
  'INNER JOIN': 'sql-lesson-inner-join',
};

export const LEGACY_SQL_MODULE_IDS = {
  'Database Foundations': 'sql-module-fundamentals',
  'Querying Data': 'sql-module-querying',
  'Aggregate Analysis': 'sql-module-aggregates',
  'Joining Data': 'sql-module-joins',
};

export function countLessons(curriculum = JOB_READY_CURRICULUM) {
  return curriculum.reduce(
    (sum, s) => sum + s.modules.reduce((m, mod) => m + mod.lessons.length, 0),
    0,
  );
}
