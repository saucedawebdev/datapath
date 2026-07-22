/**
 * Verified achievement milestones — no awards for merely opening pages.
 */

const SUBJECT_MILESTONES = {
  sql: { title: 'QUERY BUILDER', subtitle: 'All SQL lessons complete' },
  excel: { title: 'SPREADSHEET ANALYST', subtitle: 'All Excel lessons complete' },
  tableau: { title: 'DASHBOARD BUILDER', subtitle: 'All Tableau lessons complete' },
  'power-bi': { title: 'DAX PRACTITIONER', subtitle: 'All Power BI lessons complete' },
  python: { title: 'PYTHON DATA EXPLORER', subtitle: 'All Python lessons complete' },
  statistics: { title: 'STATISTICAL THINKER', subtitle: 'All Statistics lessons complete' },
};

export function computeVerifiedAchievements({ allProgress, subjectProgressList, subjects = [] }) {
  const earned = [];
  const completedSet = new Set(allProgress.filter((p) => p.complete).map((p) => p.id));
  const completedCount = completedSet.size;

  if (completedCount >= 1) {
    earned.push({
      id: 'first-steps',
      title: 'FIRST STEPS',
      subtitle: 'First lesson completed',
    });
  }

  const sqlSubject = subjects.find((s) => s.id === 'sql');
  const foundationsMod = sqlSubject?.modules?.find((m) => m.name === 'Database Foundations');
  if (foundationsMod) {
    const modLessonIds = foundationsMod.lessons.map((l) => l.id);
    if (modLessonIds.length && modLessonIds.every((id) => completedSet.has(id))) {
      earned.push({
        id: 'sql-foundations',
        title: 'DATABASE FOUNDATIONS COMPLETE',
        subtitle: 'Database Foundations module complete',
      });
    }
  }

  for (const sp of subjectProgressList) {
    if (sp.completedLessons === sp.totalLessons && sp.totalLessons > 0) {
      const milestone = SUBJECT_MILESTONES[sp.subjectId];
      if (milestone) {
        earned.push({ id: `subject-${sp.subjectId}`, ...milestone });
      }
    }
  }

  if (completedCount >= 114) {
    earned.push({
      id: 'job-ready',
      title: 'JOB READY',
      subtitle: 'All 114 lessons completed',
    });
  }

  return earned;
}
