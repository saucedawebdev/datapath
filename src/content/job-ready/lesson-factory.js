import { slugify } from '../curriculum/build-curriculum.js';
import { northstarContext, northstarStakeholder, NORTHSTAR } from './northstar.js';

const PROHIBITED = [
  'coming soon', 'future release', 'placeholder', 'integration point',
  'content scheduled', 'add lesson content', 'not implemented',
  'planned lesson', 'unavailable lesson', 'lorem ipsum',
];

export function assertNoProhibited(text) {
  const lower = String(text).toLowerCase();
  for (const phrase of PROHIBITED) {
    if (lower.includes(phrase)) {
      throw new Error(`Prohibited phrase "${phrase}" in content`);
    }
  }
}

export function makeQuiz(subjectId, lessonId, questions) {
  if (questions.length < 3) throw new Error(`Quiz ${lessonId} needs 3+ questions`);
  return {
    id: `${lessonId}-quiz`,
    subjectId,
    lessonId,
    questions: questions.map((q, i) => ({
      id: `${lessonId}-q${i + 1}`,
      type: 'multiple-choice',
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
  };
}

export function makeExercise({
  subjectId, lessonId, title, instructions, hint, expectedAnswer, explanation,
  type = 'conceptual', validation = null, skillTags = [],
}) {
  return {
    id: `${lessonId}-exercise`,
    subjectId,
    lessonId,
    title,
    type,
    difficulty: 'beginner',
    instructions,
    hint,
    expectedAnswer,
    explanation,
    validation,
    skillTags,
  };
}

export function makeChallengeExercise(opts) {
  return makeExercise({ ...opts, type: 'challenge' });
}

/**
 * Assemble a complete lesson from spec + content partial.
 */
export function assembleLesson(spec, partial, prevId, nextId) {
  const lesson = {
    id: spec.id,
    subjectId: spec.subjectId,
    moduleId: spec.moduleId,
    title: spec.title,
    difficulty: spec.difficulty,
    estimatedMinutes: spec.estimatedMinutes,
    prerequisites: partial.prerequisites || (prevId ? [prevId] : []),
    learningObjectives: partial.learningObjectives,
    plainEnglish: partial.plainEnglish,
    whatItDoes: partial.whatItDoes,
    whyItMatters: partial.whyItMatters,
    whenToUse: partial.whenToUse,
    stakeholderQuestion: partial.stakeholderQuestion,
    walkthrough: partial.walkthrough,
    syntax: partial.syntax || '',
    componentBreakdown: partial.componentBreakdown || [],
    sampleInput: partial.sampleInput,
    expectedOutput: partial.expectedOutput,
    commonMistakes: partial.commonMistakes || [],
    bestPractices: partial.bestPractices || [],
    guidedExample: partial.guidedExample,
    guidedPractice: partial.guidedPractice || null,
    independentChallenge: partial.independentChallenge || null,
    knowledgeCheck: partial.knowledgeCheck,
    relatedLessons: partial.relatedLessons || (prevId ? [prevId] : []),
    projectConnection: partial.projectConnection || partial.projectConnectionText,
    tags: partial.tags || [slugify(spec.title)],
    prevLessonId: prevId,
    nextLessonId: nextId,
  };

  for (const val of Object.values(lesson)) {
    if (typeof val === 'string') assertNoProhibited(val);
    if (Array.isArray(val)) val.forEach((v) => typeof v === 'string' && assertNoProhibited(v));
  }
  return lesson;
}

export function defaultWhyItMatters(subject, topic) {
  return `Junior ${subject} analysts at companies like ${NORTHSTAR.name} use ${topic} daily to answer stakeholder questions accurately and build trust with the business.`;
}

export function defaultProjectConnection(subjectId) {
  const map = {
    sql: 'SQL Business Analysis Project',
    excel: 'Excel Business Dashboard Project',
    tableau: 'Tableau Portfolio Dashboard Project',
    'power-bi': 'Power BI Business Report Project',
    python: 'Python Business Analysis Project',
    statistics: 'Statistics Business Analysis Project',
  };
  return `Prepares you for the ${map[subjectId] || 'capstone project'} using ${NORTHSTAR.name} data.`;
}

export { northstarContext, northstarStakeholder, NORTHSTAR };
