/**
 * Optional interview prompts — lesson-specific when defined, otherwise subject default.
 */
const SUBJECT_DEFAULTS = {
  sql: {
    question: 'Explain the difference between INNER JOIN and LEFT JOIN.',
    sampleAnswer: 'INNER JOIN returns only rows with matches in both tables. LEFT JOIN keeps all rows from the left table and adds matching right-table columns, using NULL where no match exists.',
  },
  excel: {
    question: 'When would you use XLOOKUP instead of a manual search?',
    sampleAnswer: 'Use XLOOKUP when you need a flexible lookup that works in any direction, handles approximate or exact matches, and returns a default when a value is missing — especially in wide tables.',
  },
  tableau: {
    question: 'What is the difference between a dimension and a measure?',
    sampleAnswer: 'Dimensions are categorical fields used to slice and group the view (region, product). Measures are numeric fields aggregated in the viz (SUM of revenue, COUNT of orders).',
  },
  'power-bi': {
    question: 'What is the purpose of a relationship in a data model?',
    sampleAnswer: 'Relationships connect tables on shared keys so filters and measures propagate correctly across a star schema without duplicating rows in fact tables.',
  },
  python: {
    question: 'What is a pandas DataFrame?',
    sampleAnswer: 'A DataFrame is a tabular structure with labeled rows and columns — the primary way pandas represents datasets for cleaning, filtering, grouping, and exporting results.',
  },
  statistics: {
    question: 'What does a confidence interval communicate?',
    sampleAnswer: 'A confidence interval gives a plausible range for a population parameter, reflecting sampling uncertainty — not a guarantee that any single interval contains the true value.',
  },
};

export function getInterviewPromptForLesson(lesson) {
  if (lesson.interviewQuestion) return lesson.interviewQuestion;
  return SUBJECT_DEFAULTS[lesson.subjectId] || null;
}
