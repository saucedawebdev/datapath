/**
 * Generates unique analyst briefing metadata per lesson from existing lesson fields.
 * Briefings are attached at assembly time — not hardcoded in page components.
 */

const BRIEFING_SENDERS = {
  sql: 'Director of Analytics',
  excel: 'Finance Operations Manager',
  tableau: 'VP of Marketing',
  'power-bi': 'Chief Data Officer',
  python: 'Head of Data Engineering',
  statistics: 'Director of Experimentation',
};

const SUBJECT_REQUEST_PREFIX = {
  sql: 'Data request',
  excel: 'Reporting request',
  tableau: 'Visualization request',
  'power-bi': 'BI request',
  python: 'Analysis request',
  statistics: 'Decision support request',
};

const SUBJECT_DELIVERABLE = {
  sql: 'Validated query results',
  excel: 'Spreadsheet deliverable',
  tableau: 'Interactive dashboard view',
  'power-bi': 'Executive report package',
  python: 'Analysis output',
  statistics: 'Interpreted findings memo',
};

const SUBJECT_IMPACT = {
  sql: 'Leadership can query Northstar Commerce data with confidence and audit-ready SQL.',
  excel: 'Finance and operations teams receive accurate, reusable spreadsheet reporting.',
  tableau: 'Stakeholders can explore trends visually without waiting on ad-hoc exports.',
  'power-bi': 'Executives gain a governed model and report for recurring decision meetings.',
  python: 'Repetitive data tasks are automated and exploratory findings are reproducible.',
  statistics: 'Business decisions are backed by sound sampling, variation, and significance reasoning.',
};

const SKILL_PATTERNS = [
  /\b(SELECT|INSERT|UPDATE|DELETE|JOIN|GROUP BY|WHERE|HAVING|WINDOW|CTE|SUBQUERY)\b/gi,
  /\b(SUM|COUNT|AVG|MIN|MAX|DISTINCT)\b/gi,
  /\b(VLOOKUP|XLOOKUP|SUMIF|COUNTIF|PIVOT|INDEX|MATCH|IF)\b/gi,
  /\b(DAX|CALCULATE|Power Query|relationship|measure|star schema)\b/gi,
  /\b(pandas|DataFrame|groupby|merge|matplotlib|seaborn)\b/gi,
  /\b(hypothesis|confidence interval|p-value|sample|variance|A\/B)\b/gi,
  /\b(bar chart|line chart|map|dashboard|slicer|visualization)\b/gi,
];

function titleCase(text) {
  return String(text || '')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function deriveRequestTitle(lesson) {
  const cleaned = lesson.title
    .replace(/^(Introduction to|Understanding|Working with|Getting Started with)\s+/i, '')
    .replace(/\s+in (Excel|Tableau|Power BI|Python|SQL)$/i, '');
  return `${SUBJECT_REQUEST_PREFIX[lesson.subjectId] || 'Analysis'}: ${cleaned}`;
}

function extractSkillsFromText(text, limit = 5) {
  const found = new Set();
  for (const pattern of SKILL_PATTERNS) {
    const matches = String(text || '').match(pattern) || [];
    for (const m of matches) {
      found.add(m.toUpperCase() === m ? m : titleCase(m));
      if (found.size >= limit) return [...found];
    }
  }
  return [...found];
}

function deriveRequiredSkills(lesson) {
  const blob = [
    lesson.syntax,
    lesson.walkthrough,
    lesson.guidedExample?.sql,
    ...(lesson.learningObjectives || []),
    ...(lesson.tags || []),
  ].join(' ');

  const fromContent = extractSkillsFromText(blob, 5);
  if (fromContent.length >= 2) return fromContent;

  return (lesson.learningObjectives || [])
    .slice(0, 4)
    .map((obj) => {
      const short = obj.split(/[—–:-]/)[0].trim();
      return short.length > 48 ? `${short.slice(0, 45)}…` : short;
    });
}

function deriveBusinessGoal(lesson) {
  if (lesson.learningObjectives?.[0]) {
    return lesson.learningObjectives[0].endsWith('.')
      ? lesson.learningObjectives[0]
      : `${lesson.learningObjectives[0]}.`;
  }
  const sentence = lesson.whyItMatters?.split('.').find((s) => s.trim().length > 20);
  return sentence ? `${sentence.trim()}.` : `Deliver accurate ${lesson.title} analysis for Northstar Commerce.`;
}

function deriveCompletionMessage(lesson) {
  const deliverable = SUBJECT_DELIVERABLE[lesson.subjectId] || 'Analysis deliverable';
  const topic = lesson.title.replace(/^Apply:\s*/i, '');
  return `${deliverable} — ${topic}`;
}

function deriveBusinessImpact(lesson) {
  const base = SUBJECT_IMPACT[lesson.subjectId] || 'The business receives validated, decision-ready analysis.';
  const hook = lesson.projectConnection?.split('.')[0];
  return hook ? `${hook}. ${base}` : base;
}

export function buildAnalystBriefing(lesson) {
  return {
    from: BRIEFING_SENDERS[lesson.subjectId] || 'Business Stakeholder',
    requestTitle: deriveRequestTitle(lesson),
    message: lesson.stakeholderQuestion,
    requiredSkills: deriveRequiredSkills(lesson),
    businessGoal: deriveBusinessGoal(lesson),
    completionMessage: deriveCompletionMessage(lesson),
    businessImpact: deriveBusinessImpact(lesson),
  };
}

export function attachAnalystBriefings(lessons) {
  return lessons.map((lesson) => ({
    ...lesson,
    analystBriefing: buildAnalystBriefing(lesson),
  }));
}

export function validateAnalystBriefing(briefing, lessonId) {
  const required = ['from', 'requestTitle', 'message', 'requiredSkills', 'businessGoal', 'completionMessage', 'businessImpact'];
  const missing = required.filter((key) => {
    const val = briefing?.[key];
    if (key === 'requiredSkills') return !Array.isArray(val) || val.length < 1;
    return !val;
  });
  if (missing.length) {
    throw new Error(`Lesson ${lessonId} analystBriefing missing: ${missing.join(', ')}`);
  }
}
