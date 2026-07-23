/**
 * Centralized subject visual identity — accent tokens live in tokens.css.
 */
export const SUBJECT_THEMES = {
  sql: {
    id: 'sql',
    name: 'SQL',
    descriptor: 'Query, combine, and investigate data',
    patternClass: 'subject-pattern--sql',
  },
  excel: {
    id: 'excel',
    name: 'Excel',
    descriptor: 'Clean, calculate, and summarize data',
    patternClass: 'subject-pattern--excel',
  },
  tableau: {
    id: 'tableau',
    name: 'Tableau',
    descriptor: 'Explore data through visual stories',
    patternClass: 'subject-pattern--tableau',
  },
  'power-bi': {
    id: 'power-bi',
    name: 'Power BI',
    descriptor: 'Model data and build business reports',
    patternClass: 'subject-pattern--power-bi',
  },
  python: {
    id: 'python',
    name: 'Python',
    descriptor: 'Analyze, automate, and scale your workflow',
    patternClass: 'subject-pattern--python',
  },
  statistics: {
    id: 'statistics',
    name: 'Statistics',
    descriptor: 'Measure uncertainty and make defensible conclusions',
    patternClass: 'subject-pattern--statistics',
  },
};

export function getSubjectTheme(subjectId) {
  return SUBJECT_THEMES[subjectId] || {
    id: subjectId,
    name: subjectId,
    descriptor: '',
    patternClass: '',
  };
}

export const SUBJECT_ORDER = ['sql', 'excel', 'tableau', 'power-bi', 'python', 'statistics'];

export const PROJECT_DELIVERABLE_LABELS = {
  sql: 'SQL analysis',
  excel: 'Excel workbook',
  tableau: 'Tableau dashboard',
  'power-bi': 'Power BI report',
  python: 'Python notebook',
  statistics: 'Statistical summary',
};

export function getProjectDeliverableLabel(project) {
  const primary = project.subjectIds?.[0];
  return PROJECT_DELIVERABLE_LABELS[primary] || 'Capstone deliverable';
}
