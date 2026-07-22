import {
  CONTENT_STATUS,
  findLessonRefById,
  formatLessonCounts,
  getCurriculumStats,
  isLessonAvailable,
} from '../content/curriculum/build-curriculum.js';

export {
  CONTENT_STATUS,
  findLessonRefById,
  findLessonRefById as findLessonRef,
  formatLessonCounts,
  getCurriculumStats,
  isLessonAvailable,
};

export function getAvailableLessonRefs(subjects) {
  return getAllLessonRefsFromSubjects(subjects).filter(isLessonAvailable);
}

export function getAllLessonRefsFromSubjects(subjects) {
  const refs = [];
  for (const subject of subjects) {
    for (const mod of subject.modules) {
      for (const lesson of mod.lessons) {
        refs.push({
          ...lesson,
          subjectId: subject.id,
          moduleId: mod.id,
          subjectName: subject.name,
          moduleName: mod.name,
        });
      }
    }
  }
  return refs;
}

export function subjectHasStarted(subject, progressMap) {
  for (const mod of subject.modules) {
    for (const lesson of mod.lessons) {
      if (isLessonAvailable(lesson) && progressMap[lesson.id]) {
        return true;
      }
    }
  }
  return false;
}

export function validateCurriculumIds(subjects) {
  const errors = [];
  const lessonIds = new Set();
  const moduleIds = new Set();

  for (const subject of subjects) {
    for (const mod of subject.modules) {
      if (moduleIds.has(mod.id)) {
        errors.push(`Duplicate module id: ${mod.id}`);
      }
      moduleIds.add(mod.id);

      for (const lesson of mod.lessons) {
        if (lessonIds.has(lesson.id)) {
          errors.push(`Duplicate lesson id: ${lesson.id}`);
        }
        lessonIds.add(lesson.id);

        if (!lesson.contentStatus) {
          errors.push(`Missing contentStatus: ${lesson.id}`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
