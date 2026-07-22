/**
 * Per-lesson Business Impact metadata — customized from lesson topic.
 */
import { NORTHSTAR_PROFILE } from './northstar-profile.js';

const SUBJECT_OUTCOMES = {
  sql: [
    'Query Northstar Commerce data with validated SQL',
    'Reconcile metrics with finance and operations',
    'Answer ad-hoc stakeholder questions from the database',
  ],
  excel: [
    'Deliver spreadsheet reports finance can refresh weekly',
    'Highlight variances against regional targets',
    'Support self-serve analysis without manual rework',
  ],
  tableau: [
    'Explore trends visually without waiting on exports',
    'Present a clear data story to marketing leadership',
    'Filter performance by region, channel, and segment',
  ],
  'power-bi': [
    'Govern executive reports with a trusted data model',
    'Publish KPIs leadership reviews in recurring meetings',
    'Connect marketing spend to revenue outcomes',
  ],
  python: [
    'Automate repetitive Northstar data preparation',
    'Reproduce exploratory findings for audit review',
    'Accelerate analysis cycles for the analytics team',
  ],
  statistics: [
    'Interpret experiments with appropriate uncertainty',
    'Recommend actions backed by sampling evidence',
    'Explain trade-offs in language stakeholders understand',
  ],
};

function topicPhrase(lesson) {
  const t = lesson.title
    .replace(/^(Introduction to|Understanding|Working with|Apply:\s*)/i, '')
    .replace(/\s+in (Excel|Tableau|Power BI|Python|SQL)$/i, '');
  return t.toLowerCase();
}

function deriveLeadershipBullets(lesson) {
  const base = SUBJECT_OUTCOMES[lesson.subjectId] || SUBJECT_OUTCOMES.sql;
  const topic = topicPhrase(lesson);
  return [
    `Make better decisions about ${topic}`,
    `Understand Northstar performance related to ${topic}`,
    `Take action using your ${lesson.subjectId === 'statistics' ? 'findings' : 'report'} in the next review`,
  ].concat(base.slice(0, 1).map((b) => b.replace(/^./, (c) => c.toLowerCase())));
}

export function buildBusinessImpact(lesson) {
  return {
    summary: `You successfully completed the requested analysis for ${NORTHSTAR_PROFILE.name}.`,
    pendingSummary: `When you complete this case, ${NORTHSTAR_PROFILE.name} leadership will be able to:`,
    leadershipCan: deriveLeadershipBullets(lesson).slice(0, 3),
    deliverable: lesson.analystBriefing?.completionMessage
      || `Validated ${topicPhrase(lesson)} deliverable`,
  };
}

export function attachBusinessImpact(lessons) {
  return lessons.map((lesson) => ({
    ...lesson,
    businessImpact: buildBusinessImpact(lesson),
  }));
}

export function validateBusinessImpact(impact, lessonId) {
  if (!impact?.leadershipCan?.length) {
    throw new Error(`Lesson ${lessonId} businessImpact missing leadershipCan`);
  }
}
