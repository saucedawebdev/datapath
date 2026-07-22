import { jobReadySubjects } from './build-subjects.js';
import { assembleLesson } from './lesson-factory.js';
import { attachAnalystBriefings } from './analyst-briefings.js';
import { attachCaseFiles } from './case-files.js';
import { attachBusinessImpact } from './business-impact.js';
import { normalizeExercises } from './normalize-exercises.js';
import { sqlLessonContent, sqlQuizzes, sqlExercises } from './content/sql-lessons-data.js';
import { excelLessonContent, excelQuizzes, excelExercises } from './content/excel-lessons-data.js';
import { tableauLessonContent, tableauQuizzes, tableauExercises } from './content/tableau-lessons-data.js';
import { powerBiLessonContent, powerBiQuizzes, powerBiExercises } from './content/power-bi-lessons-data.js';
import { pythonLessonContent, pythonQuizzes, pythonExercises } from './content/python-lessons-data.js';
import { statisticsLessonContent, statisticsQuizzes, statisticsExercises } from './content/statistics-lessons-data.js';

const CONTENT_MAPS = {
  sql: sqlLessonContent,
  excel: excelLessonContent,
  tableau: tableauLessonContent,
  'power-bi': powerBiLessonContent,
  python: pythonLessonContent,
  statistics: statisticsLessonContent,
};

function flattenSpecs(subjects) {
  const specs = [];
  for (const subject of subjects) {
    for (const mod of subject.modules) {
      for (const lesson of mod.lessons) {
        specs.push({
          id: lesson.id,
          subjectId: subject.id,
          moduleId: mod.id,
          title: lesson.title,
          difficulty: lesson.difficulty,
          estimatedMinutes: lesson.estimatedMinutes,
        });
      }
    }
  }
  return specs;
}

export function buildJobReadyContent() {
  const specs = flattenSpecs(jobReadySubjects);
  const lessons = [];
  const missing = [];

  specs.forEach((spec, idx) => {
    const partial = CONTENT_MAPS[spec.subjectId]?.[spec.id];
    if (!partial) {
      missing.push(spec.id);
      return;
    }
    const prevId = idx > 0 ? specs[idx - 1].id : null;
    const nextId = idx < specs.length - 1 ? specs[idx + 1].id : null;
    const guidedId = partial.guidedPractice?.exerciseId || `${spec.id}-exercise`;
    const challengeId = partial.independentChallenge?.exerciseId || `${spec.id}-challenge`;

    const lesson = assembleLesson(spec, {
      ...partial,
      knowledgeCheck: { quizId: `${spec.id}-quiz` },
      guidedPractice: { exerciseId: guidedId },
      independentChallenge: { exerciseId: challengeId },
      projectConnection: partial.projectConnectionText || partial.projectConnection,
      relatedConcepts: partial.relatedLessons || [],
    }, prevId, nextId);
    lessons.push(lesson);
  });

  if (missing.length) {
    throw new Error(`Missing lesson content for: ${missing.join(', ')}`);
  }

  const lessonsWithBriefings = attachAnalystBriefings(lessons);
  const lessonsWithImmersion = attachBusinessImpact(attachCaseFiles(lessonsWithBriefings));

  const rawExercises = [
    ...sqlExercises,
    ...excelExercises,
    ...tableauExercises,
    ...powerBiExercises,
    ...pythonExercises,
    ...statisticsExercises,
  ];

  const exercises = normalizeExercises(rawExercises, lessons);

  const quizzes = [
    ...sqlQuizzes,
    ...excelQuizzes,
    ...tableauQuizzes,
    ...powerBiQuizzes,
    ...pythonQuizzes,
    ...statisticsQuizzes,
  ];

  return {
    subjects: jobReadySubjects,
    lessons: lessonsWithImmersion,
    exercises,
    quizzes,
  };
}

export const jobReadyBundle = buildJobReadyContent();
