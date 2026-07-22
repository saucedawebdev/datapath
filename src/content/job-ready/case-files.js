/**
 * Generates unique Case Files for all 114 lessons at assembly time.
 */
import {
  NORTHSTAR_PROFILE,
  getDepartmentForSubject,
  getExecutiveForSubject,
} from './northstar-profile.js';

const LESSON_CONNECTION = "Today's lesson teaches the skills you need as a Junior Data Analyst to answer that question.";

function padCaseNumber(index) {
  return String(index + 1).padStart(3, '0');
}

function deriveBusinessObjective(lesson) {
  const goal = lesson.analystBriefing?.businessGoal
    || lesson.learningObjectives?.[0]
    || lesson.whyItMatters?.split('.')[0];
  if (!goal) return 'Produce analysis leadership can use in the next business review.';
  return goal.endsWith('.') ? goal : `${goal}.`;
}

function deriveBusinessProblem(lesson) {
  if (lesson.stakeholderQuestion) return lesson.stakeholderQuestion;
  const topic = lesson.title.replace(/^(Introduction to|Understanding|Working with)\s+/i, '');
  return `Leadership needs clarity on ${topic.toLowerCase()} using Northstar Commerce data.`;
}

export function buildCaseFile(lesson, lessonIndex) {
  return {
    caseNumber: padCaseNumber(lessonIndex),
    department: getDepartmentForSubject(lesson.subjectId),
    requestedBy: getExecutiveForSubject(lesson.subjectId),
    businessProblem: deriveBusinessProblem(lesson),
    lessonConnection: LESSON_CONNECTION,
    businessObjective: deriveBusinessObjective(lesson),
    roleContext: `Your manager at ${NORTHSTAR_PROFILE.name} has assigned this case to you as a ${NORTHSTAR_PROFILE.learnerRole}.`,
  };
}

export function attachCaseFiles(lessons) {
  return lessons.map((lesson, index) => ({
    ...lesson,
    caseFile: buildCaseFile(lesson, index),
  }));
}

export function validateCaseFile(caseFile, lessonId) {
  const required = ['caseNumber', 'department', 'requestedBy', 'businessProblem', 'businessObjective'];
  for (const key of required) {
    if (!caseFile?.[key]) throw new Error(`Lesson ${lessonId} caseFile missing ${key}`);
  }
}
