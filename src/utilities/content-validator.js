import { validateExerciseArchitecture } from '../content/job-ready/normalize-exercises.js';

const DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
const CONTENT_TYPES = new Set(['command', 'concept', 'function', 'workflow', 'formula', 'visualization']);

const PROHIBITED_PHRASES = [
  'coming soon',
  'future release',
  'placeholder',
  'integration point',
  'content scheduled',
  'add lesson content',
  'not implemented',
  'planned lesson',
  'unavailable lesson',
  'lorem ipsum',
];

const EXPECTED_COUNTS = {
  sql: 40,
  excel: 20,
  tableau: 12,
  'power-bi': 12,
  python: 18,
  statistics: 12,
};

const errors = [];
const warnings = [];

function err(id, message) {
  errors.push({ id, message });
}

function warn(id, message) {
  warnings.push({ id, message });
}

function requireField(obj, field, id) {
  if (obj[field] == null || obj[field] === '') {
    err(id, `Missing required field: ${field}`);
    return false;
  }
  return true;
}

function checkProhibited(text, id) {
  if (!text) return;
  const lower = String(text).toLowerCase();
  for (const phrase of PROHIBITED_PHRASES) {
    if (lower.includes(phrase)) {
      err(id, `Prohibited phrase: "${phrase}"`);
    }
  }
}

function scanObject(obj, id) {
  if (typeof obj === 'string') checkProhibited(obj, id);
  else if (Array.isArray(obj)) obj.forEach((v) => scanObject(v, id));
  else if (obj && typeof obj === 'object') {
    Object.values(obj).forEach((v) => scanObject(v, id));
  }
}

export function validateSubject(subject) {
  const id = subject.id || 'unknown-subject';
  requireField(subject, 'id', id);
  requireField(subject, 'name', id);
  requireField(subject, 'order', id);
  requireField(subject, 'description', id);
  if (!Array.isArray(subject.modules)) err(id, 'modules must be an array');
  else {
    for (const mod of subject.modules) {
      requireField(mod, 'id', mod.id);
      requireField(mod, 'name', mod.id);
      if (!Array.isArray(mod.lessons)) err(mod.id, 'lessons must be an array');
      else {
        for (const lesson of mod.lessons) {
          requireField(lesson, 'id', lesson.id);
          requireField(lesson, 'title', lesson.id);
          if (lesson.contentStatus && lesson.contentStatus !== 'complete') {
            err(lesson.id, `Lesson must be complete, got: ${lesson.contentStatus}`);
          }
        }
      }
    }
  }
}

export function validateLesson(lesson) {
  const id = lesson.id || 'unknown-lesson';
  const required = [
    'id', 'subjectId', 'moduleId', 'title', 'difficulty', 'estimatedMinutes',
    'learningObjectives', 'plainEnglish', 'whatItDoes', 'whyItMatters',
    'whenToUse', 'stakeholderQuestion', 'walkthrough', 'sampleInput',
    'expectedOutput', 'projectConnection',
  ];
  required.forEach((f) => requireField(lesson, f, id));
  if (!Array.isArray(lesson.learningObjectives) || lesson.learningObjectives.length < 2) {
    err(id, 'learningObjectives must have at least 2 items');
  }
  if (!Array.isArray(lesson.commonMistakes) || lesson.commonMistakes.length < 2) {
    err(id, 'commonMistakes must have at least 2 items');
  }
  if (!Array.isArray(lesson.bestPractices) || lesson.bestPractices.length < 2) {
    err(id, 'bestPractices must have at least 2 items');
  }
  if (!lesson.knowledgeCheck?.quizId) err(id, 'knowledgeCheck.quizId required');
  if (!lesson.analystBriefing) {
    err(id, 'analystBriefing required');
  } else {
    const b = lesson.analystBriefing;
    const briefingFields = ['from', 'requestTitle', 'message', 'businessGoal', 'completionMessage', 'businessImpact'];
    for (const f of briefingFields) {
      if (!b[f]) err(id, `analystBriefing missing ${f}`);
    }
    if (!Array.isArray(b.requiredSkills) || b.requiredSkills.length < 1) {
      err(id, 'analystBriefing.requiredSkills must have at least 1 item');
    }
  }
  if (!lesson.caseFile) {
    err(id, 'caseFile required');
  } else {
    const cf = lesson.caseFile;
    ['caseNumber', 'department', 'requestedBy', 'businessProblem', 'businessObjective'].forEach((f) => {
      if (!cf[f]) err(id, `caseFile missing ${f}`);
    });
  }
  if (!lesson.businessImpact?.leadershipCan?.length) {
    err(id, 'businessImpact.leadershipCan required');
  }
  scanObject(lesson, id);
}

export function validateExercise(exercise) {
  const id = exercise.id || 'unknown-exercise';
  requireField(exercise, 'id', id);
  requireField(exercise, 'subjectId', id);
  requireField(exercise, 'lessonId', id);
  requireField(exercise, 'title', id);
  requireField(exercise, 'instructions', id);
  requireField(exercise, 'hint', id);
  requireField(exercise, 'expectedAnswer', id);
  requireField(exercise, 'explanation', id);
  requireField(exercise, 'practiceType', id);
  requireField(exercise, 'interactionType', id);
  requireField(exercise, 'relatedLessonRoute', id);
  if (exercise.subjectId !== 'sql' && exercise.interactionType === 'sql-query') {
    err(id, `Non-SQL exercise uses sql-query: ${exercise.subjectId}`);
  }
  scanObject(exercise, id);
}

export function validateQuiz(quiz) {
  const id = quiz.id || 'unknown-quiz';
  requireField(quiz, 'id', id);
  requireField(quiz, 'subjectId', id);
  if (!Array.isArray(quiz.questions) || quiz.questions.length < 3) {
    err(id, 'questions must have at least 3 items');
  } else {
    quiz.questions.forEach((q, i) => {
      if (q.correctIndex == null || q.correctIndex < 0 || q.correctIndex >= (q.options?.length || 0)) {
        err(id, `Question ${i + 1} has invalid correctIndex`);
      }
      if (!q.explanation) err(id, `Question ${i + 1} missing explanation`);
    });
  }
}

export function validateReferenceEntry(entry) {
  const id = entry.id || 'unknown-ref';
  const required = [
    'id', 'subjectId', 'name', 'category', 'difficulty',
    'contentType', 'definition', 'whatItDoes', 'whenToUse', 'syntax',
  ];
  required.forEach((f) => requireField(entry, f, id));
  if (entry.difficulty && !DIFFICULTIES.has(entry.difficulty)) {
    err(id, `Invalid difficulty: ${entry.difficulty}`);
  }
  if (entry.contentType && !CONTENT_TYPES.has(entry.contentType)) {
    err(id, `Invalid contentType: ${entry.contentType}`);
  }
  scanObject(entry, id);
}

export function validateProject(project) {
  const id = project.id || 'unknown-project';
  requireField(project, 'id', id);
  requireField(project, 'title', id);
  requireField(project, 'businessContext', id);
  requireField(project, 'stakeholderRequest', id);
  if (!Array.isArray(project.deliverables) || project.deliverables.length === 0) {
    err(id, 'deliverables required');
  }
  if (!project.datasetOverview && !project.dataDictionary) {
    err(id, 'datasetOverview or dataDictionary required');
  }
  scanObject(project, id);
}

export function validateUniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) err(item.id, `Duplicate ${label} id: ${item.id}`);
    seen.add(item.id);
  }
}

export function validateContentBundle(bundle) {
  errors.length = 0;
  warnings.length = 0;

  if (!Array.isArray(bundle.subjects)) err('bundle', 'subjects must be an array');
  else {
    validateUniqueIds(bundle.subjects, 'subject');
    bundle.subjects.forEach(validateSubject);
  }

  if (Array.isArray(bundle.lessons)) {
    validateUniqueIds(bundle.lessons, 'lesson');
    bundle.lessons.forEach(validateLesson);
  }

  if (Array.isArray(bundle.exercises)) {
    validateUniqueIds(bundle.exercises, 'exercise');
    bundle.exercises.forEach(validateExercise);
    const archIssues = validateExerciseArchitecture(bundle.exercises, bundle.lessons || []);
    archIssues.forEach((issue) => err(issue.id, issue.message));
  }

  if (Array.isArray(bundle.references)) {
    validateUniqueIds(bundle.references, 'reference');
    bundle.references.forEach(validateReferenceEntry);
  }

  if (Array.isArray(bundle.quizzes)) {
    validateUniqueIds(bundle.quizzes, 'quiz');
    bundle.quizzes.forEach(validateQuiz);
  }

  if (Array.isArray(bundle.projects)) {
    validateUniqueIds(bundle.projects, 'project');
    bundle.projects.forEach(validateProject);
  }

  const curriculumIds = new Set();
  for (const subject of bundle.subjects || []) {
    for (const mod of subject.modules || []) {
      for (const ref of mod.lessons || []) {
        if (curriculumIds.has(ref.id)) err(ref.id, 'Duplicate curriculum lesson id');
        curriculumIds.add(ref.id);
      }
    }
  }

  for (const lesson of bundle.lessons || []) {
    if (!curriculumIds.has(lesson.id)) {
      err(lesson.id, 'Lesson not in curriculum');
    }
  }

  for (const id of curriculumIds) {
    if (!(bundle.lessons || []).some((l) => l.id === id)) {
      err(id, 'Curriculum lesson missing full content');
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateJobReadyCurriculum(bundle) {
  const jrErrors = [];

  function jerr(id, message) {
    jrErrors.push({ id, message });
  }

  if ((bundle.subjects || []).length !== 6) {
    jerr('curriculum', `Expected 6 subjects, got ${(bundle.subjects || []).length}`);
  }

  if ((bundle.lessons || []).length !== 114) {
    jerr('curriculum', `Expected 114 lessons, got ${(bundle.lessons || []).length}`);
  }

  if ((bundle.projects || []).length !== 6) {
    jerr('projects', `Expected 6 projects, got ${(bundle.projects || []).length}`);
  }

  for (const [subjectId, expected] of Object.entries(EXPECTED_COUNTS)) {
    const subject = (bundle.subjects || []).find((s) => s.id === subjectId);
    const count = subject?.modules.reduce((n, m) => n + m.lessons.length, 0) || 0;
    if (count !== expected) {
      jerr(subjectId, `Expected ${expected} lessons, got ${count}`);
    }
  }

  return { valid: jrErrors.length === 0, errors: jrErrors };
}

export function assertValidContent(bundle) {
  const result = validateContentBundle(bundle);
  const jobReady = validateJobReadyCurriculum(bundle);
  const allErrors = [...result.errors, ...jobReady.errors];
  if (allErrors.length) {
    const msg = allErrors.map((e) => `${e.id}: ${e.message}`).join('\n');
    throw new Error(`Content validation failed:\n${msg}`);
  }
  return result;
}
