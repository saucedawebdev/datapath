/**
 * Professional capability rank — supplements readiness, does not replace it.
 * Derived from verified completion only.
 */

const RANKS = [
  {
    id: 'data-explorer',
    title: 'Data Explorer',
    check: ({ completedLessons }) => completedLessons >= 1,
    verified: (ctx) => [`${ctx.completedLessons} lesson${ctx.completedLessons === 1 ? '' : 's'} completed`],
    nextRequirements: () => ['Complete Database Foundations module', 'Complete first guided practice'],
  },
  {
    id: 'query-builder',
    title: 'Query Builder',
    check: ({ hasSqlFoundations, practiceCount }) => hasSqlFoundations && practiceCount >= 1,
    verified: () => ['SQL Foundations complete', 'Guided practice completed'],
    nextRequirements: () => ['Complete Excel Foundations', 'Pass a knowledge check'],
  },
  {
    id: 'reporting-analyst',
    title: 'Reporting Analyst',
    check: ({ excelLessonsComplete }) => excelLessonsComplete >= 10,
    verified: (ctx) => [`${ctx.excelLessonsComplete} Excel lessons completed`],
    nextRequirements: () => ['Complete Tableau Foundations', 'Build first dashboard exercise'],
  },
  {
    id: 'dashboard-analyst',
    title: 'Dashboard Analyst',
    check: ({ vizLessonsComplete }) => vizLessonsComplete >= 12,
    verified: (ctx) => [`${ctx.vizLessonsComplete} visualization lessons completed`],
    nextRequirements: () => ['Complete Power BI Foundations', 'Finish a capstone project draft'],
  },
  {
    id: 'bi-analyst',
    title: 'Business Intelligence Analyst',
    check: ({ projectsCompleted }) => projectsCompleted >= 2,
    verified: (ctx) => [`${ctx.projectsCompleted} capstone project${ctx.projectsCompleted === 1 ? '' : 's'} completed`],
    nextRequirements: () => ['Complete Python Foundations', 'Complete Statistics Foundations'],
  },
  {
    id: 'job-ready-analyst',
    title: 'Job-Ready Data Analyst',
    check: ({ completedLessons, projectsCompleted }) => completedLessons >= 114 && projectsCompleted >= 1,
    verified: () => ['All 114 lessons completed', 'At least one capstone project completed'],
    nextRequirements: () => [],
  },
];

function countSubjectLessons(allProgress, subjectId) {
  return allProgress.filter((p) => p.complete && p.subjectId === subjectId).length;
}

export function computeCareerRank({ allProgress, subjects, practiceResults, projectsCompleted = 0 }) {
  const completedLessons = allProgress.filter((p) => p.complete).length;
  const completedSet = new Set(allProgress.filter((p) => p.complete).map((p) => p.id));
  const sqlSubject = subjects?.find((s) => s.id === 'sql');
  const foundationsMod = sqlSubject?.modules?.find((m) => m.name === 'Database Foundations');
  const hasSqlFoundations = foundationsMod?.lessons?.every((l) => completedSet.has(l.id)) ?? false;
  const practiceCount = (practiceResults || []).filter((r) => r.correct).length;
  const excelLessonsComplete = countSubjectLessons(allProgress, 'excel');
  const vizLessonsComplete = countSubjectLessons(allProgress, 'tableau') + countSubjectLessons(allProgress, 'power-bi');

  const ctx = {
    completedLessons,
    hasSqlFoundations,
    practiceCount,
    excelLessonsComplete,
    vizLessonsComplete,
    projectsCompleted,
  };

  let current = RANKS[0];
  for (const rank of RANKS) {
    if (rank.check(ctx)) current = rank;
  }

  const currentIndex = RANKS.findIndex((r) => r.id === current.id);
  const next = RANKS[currentIndex + 1] || null;

  return {
    currentRank: current.title,
    currentId: current.id,
    verified: current.verified(ctx),
    nextRank: next?.title || null,
    nextRequirements: next ? next.nextRequirements(ctx) : [],
  };
}
