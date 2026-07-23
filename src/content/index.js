import { jobReadyBundle } from './job-ready/assemble-content.js';
import { projects, achievements, careerContent, references } from './shared-content.js';
import { northstarHandbook } from './job-ready/northstar-handbook.js';
import { NORTHSTAR_PROFILE } from './job-ready/northstar-profile.js';
import { assertValidContent } from '../utilities/content-validator.js';

export const subjects = jobReadyBundle.subjects;
export const lessons = jobReadyBundle.lessons;
export const exercises = jobReadyBundle.exercises;
export const quizzes = jobReadyBundle.quizzes;

export const contentBundle = {
  subjects,
  lessons,
  references,
  exercises,
  quizzes,
  projects,
  achievements,
  careerContent,
  northstarHandbook,
  northstarProfile: NORTHSTAR_PROFILE,
};

if (import.meta.env?.DEV) {
  try {
    assertValidContent(contentBundle);
  } catch (e) {
    console.error(e.message);
  }
}

export function getSubject(id) {
  return subjects.find((s) => s.id === id);
}

export function getLesson(id) {
  return lessons.find((l) => l.id === id);
}

export function getLessonRef(lessonId) {
  for (const subject of subjects) {
    for (const mod of subject.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { ...lesson, subjectId: subject.id, moduleId: mod.id, moduleName: mod.name };
      }
    }
  }
  return null;
}

export function getModule(subjectId, moduleId) {
  const subject = getSubject(subjectId);
  return subject?.modules.find((m) => m.id === moduleId);
}

export function getAllLessonRefs() {
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

export function getAdjacentLessons(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) return { prev: null, next: null };
  const ordered = getAllLessonRefs();
  const idx = ordered.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}

/** Lesson index within its subject (1-based) and total count. */
export function getLessonPosition(lessonId) {
  const lesson = getLesson(lessonId);
  if (!lesson) return null;
  let index = 0;
  let totalInSubject = 0;
  const subject = getSubject(lesson.subjectId);
  if (!subject) return null;
  for (const mod of subject.modules) {
    for (const l of mod.lessons) {
      totalInSubject += 1;
      if (l.id === lessonId) index = totalInSubject;
    }
  }
  return index ? { index, totalInSubject, moduleName: getModule(lesson.subjectId, lesson.moduleId)?.name } : null;
}

export function getReference(id) {
  return references.find((r) => r.id === id);
}

export function getExercise(id) {
  return exercises.find((e) => e.id === id);
}

export function getQuiz(id) {
  return quizzes.find((q) => q.id === id);
}

export function getProject(id) {
  return projects.find((p) => p.id === id);
}

export default contentBundle;
