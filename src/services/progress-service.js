import { READINESS_WEIGHTS } from '../storage/storage-contract.js';

export function calculateSubjectReadiness({
  totalLessons,
  completedLessons,
  quizAttempts = [],
  practiceResults = [],
  projectsCompleted = 0,
  totalProjects = 0,
  recentReviewCount = 0,
}) {
  const lessonScore = totalLessons > 0 ? completedLessons / totalLessons : 0;

  const quizScores = quizAttempts.map((a) => a.percentage ?? 0);
  const quizScore = quizScores.length
    ? quizScores.reduce((s, v) => s + v, 0) / quizScores.length
    : 0;

  const challenges = practiceResults.filter((r) => r.exerciseId?.includes('challenge'));
  const challengeCorrect = challenges.filter((r) => r.correct).length;
  const challengeScore = challenges.length ? challengeCorrect / challenges.length : 0;

  const projectScore = totalProjects > 0 ? projectsCompleted / totalProjects : 0;
  const reviewScore = Math.min(recentReviewCount / 5, 1);

  const readiness =
    lessonScore * READINESS_WEIGHTS.lessonCompletion +
    quizScore * READINESS_WEIGHTS.quizPerformance +
    challengeScore * READINESS_WEIGHTS.challengePerformance +
    projectScore * READINESS_WEIGHTS.projectCompletion +
    reviewScore * READINESS_WEIGHTS.recentReview;

  return {
    readiness: Math.round(readiness * 100),
    breakdown: {
      lessonScore: Math.round(lessonScore * 100),
      quizScore: Math.round(quizScore * 100),
      challengeScore: Math.round(challengeScore * 100),
      projectScore: Math.round(projectScore * 100),
      reviewScore: Math.round(reviewScore * 100),
    },
  };
}

export function calculateOverallProgress(subjectsProgress) {
  if (!subjectsProgress.length) return 0;
  const total = subjectsProgress.reduce((s, p) => s + p.readiness, 0);
  return Math.round(total / subjectsProgress.length);
}

export function identifyWeakSkills(practiceResults, skillTagsMap = {}) {
  const skillStats = {};
  for (const result of practiceResults) {
    const tags = skillTagsMap[result.exerciseId] || ['general'];
    for (const tag of tags) {
      if (!skillStats[tag]) skillStats[tag] = { correct: 0, total: 0 };
      skillStats[tag].total++;
      if (result.correct) skillStats[tag].correct++;
    }
  }

  return Object.entries(skillStats)
    .map(([skill, { correct, total }]) => ({
      skill,
      accuracy: total ? correct / total : 0,
      attempts: total,
    }))
    .filter((s) => s.attempts >= 2 && s.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);
}

export async function buildSubjectProgress(subject, content, storage) {
  const allProgress = await storage.getAllProgress();
  const completedSet = new Set(
    allProgress.filter((p) => p.complete).map((p) => p.id),
  );

  const lessonIds = [];
  for (const mod of subject.modules) {
    for (const lesson of mod.lessons) lessonIds.push(lesson.id);
  }

  const completedLessons = lessonIds.filter((id) => completedSet.has(id)).length;
  const totalLessons = lessonIds.length;

  const quizAttempts = (await storage.provider.getAll('quizAttempts'))
    .filter((a) => a.subjectId === subject.id);
  const practiceResults = (await storage.getPracticeResults())
    .filter((r) => r.subjectId === subject.id);

  const projects = (content.projects || []).filter((p) =>
    p.subjectIds?.includes(subject.id),
  );
  const projectProgress = await storage.provider.getAll('projectProgress');
  const projectsCompleted = projects.filter((p) =>
    projectProgress.some((pp) => pp.id === p.id && pp.complete),
  ).length;

  const activity = await storage.getRecentActivity(50);
  const recentReviewCount = activity.filter(
    (a) => a.subjectId === subject.id && a.type === 'lesson-complete',
  ).length;

  return {
    subjectId: subject.id,
    totalLessons,
    completedLessons,
    lessonPercent: totalLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0,
    ...calculateSubjectReadiness({
      totalLessons,
      completedLessons,
      quizAttempts,
      practiceResults,
      projectsCompleted,
      totalProjects: projects.length,
      recentReviewCount,
    }),
  };
}

export function findNextLessonInSubject(subject, progressMap) {
  for (const mod of subject.modules) {
    for (const lesson of mod.lessons) {
      if (!progressMap[lesson.id]?.complete) {
        return lesson;
      }
    }
  }
  return null;
}

export function findContinueLearning(subjects, progressMap) {
  for (const subject of subjects.sort((a, b) => a.order - b.order)) {
    for (const mod of subject.modules) {
      for (const lesson of mod.lessons) {
        if (!progressMap[lesson.id]?.complete) {
          return { subject, module: mod, lesson };
        }
      }
    }
  }
  return null;
}
