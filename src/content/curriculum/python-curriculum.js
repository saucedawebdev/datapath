import { buildSubject } from './build-curriculum.js';

export const pythonSubject = buildSubject({
  id: 'python',
  name: 'Python',
  order: 5,
  description: 'Analyze data with Python, pandas, and visualization libraries.',
  modules: [
    {
      name: 'Python Fundamentals',
      lessons: [
        'Python Syntax',
        'Variables',
        'Data Types',
        'Strings',
        'Numbers',
        'Booleans',
        'Lists',
        'Tuples',
        'Sets',
        'Dictionaries',
        'Operators',
      ],
    },
    {
      name: 'Control Flow',
      lessons: ['Conditions', 'if', 'elif', 'else', 'for Loops', 'while Loops', 'break', 'continue'],
    },
    {
      name: 'Functions and Modules',
      lessons: [
        'Defining Functions',
        'Parameters',
        'Return Values',
        'Scope',
        'Importing Modules',
        'Error Handling',
      ],
    },
    {
      name: 'Jupyter and Data Workflows',
      lessons: [
        'Jupyter Notebooks',
        'Cells',
        'Markdown',
        'Running Code',
        'Reading Files',
        'File Paths',
      ],
    },
    {
      name: 'NumPy',
      lessons: [
        'Arrays',
        'Array Creation',
        'Indexing',
        'Slicing',
        'Vectorized Operations',
        'Aggregations',
        'Missing Values',
      ],
    },
    {
      name: 'pandas Fundamentals',
      lessons: [
        'Series',
        'DataFrames',
        'Creating DataFrames',
        'Reading CSV',
        'Reading Excel',
        'Inspecting Data',
        'Selecting Columns',
        'Selecting Rows',
        'loc',
        'iloc',
      ],
    },
    {
      name: 'Cleaning Data',
      lessons: [
        'Missing Values',
        'Duplicates',
        'Data Types',
        'String Cleaning',
        'Date Conversion',
        'Renaming Columns',
        'Replacing Values',
        'Outlier Handling',
      ],
    },
    {
      name: 'Filtering and Sorting',
      lessons: ['Boolean Filtering', 'Multiple Conditions', 'Sorting', 'Query Method'],
    },
    {
      name: 'Grouping and Aggregation',
      lessons: ['groupby', 'agg', 'Transform', 'Pivot Tables', 'Crosstabs'],
    },
    {
      name: 'Combining Data',
      lessons: ['merge', 'join', 'concat', 'append Concepts', 'Reshaping', 'melt', 'pivot'],
    },
    {
      name: 'Exploratory Data Analysis',
      lessons: [
        'Descriptive Statistics',
        'Value Counts',
        'Correlation',
        'Distributions',
        'Outliers',
        'Trend Analysis',
      ],
    },
    {
      name: 'Visualization',
      lessons: [
        'Matplotlib Fundamentals',
        'Line Charts',
        'Bar Charts',
        'Scatter Plots',
        'Histograms',
        'Box Plots',
        'Labels and Titles',
        'Multiple Series',
      ],
    },
    {
      name: 'Automation',
      lessons: [
        'Reusable Scripts',
        'Exporting Data',
        'Automating Reports',
        'Working with Folders',
        'Basic Scheduling Concepts',
      ],
    },
    {
      name: 'Python Projects',
      difficulty: 'advanced',
      lessons: [
        'Sales Analysis',
        'Customer Churn Analysis',
        'Marketing Analysis',
        'Data Cleaning Project',
        'Exploratory Analysis Project',
      ],
    },
  ],
});
