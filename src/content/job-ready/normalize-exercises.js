/**
 * Normalizes raw exercises into the Practice Lab data model.
 * Generates missing independent challenges so every lesson has guided + challenge.
 */
import { slugify } from '../curriculum/build-curriculum.js';
import { applyTableauConfigToExercise } from './tableau-exercise-config.js';
import { applyPowerBiConfigToExercise } from './powerbi-exercise-config.js';

const VALID_SUBJECTS = new Set(['sql', 'excel', 'tableau', 'power-bi', 'python', 'statistics']);
const VALID_PRACTICE_TYPES = new Set(['guided', 'independent']);
const SQL_LEGACY_TYPES = new Set(['sql']);
const NON_SQL_QUERY_TYPES = new Set(['sql-query']);

export function getLessonSlug(lessonId) {
  return lessonId.replace(/^[a-z-]+-lesson-/, '');
}

export function inferInteractionType(exercise, lesson) {
  if (exercise.interactionType) return exercise.interactionType;

  const legacy = exercise.type;
  const blob = `${lesson?.title || ''} ${exercise.title} ${exercise.instructions} ${exercise.expectedAnswer}`.toLowerCase();
  const subject = exercise.subjectId;

  if (subject === 'sql') {
    if (SQL_LEGACY_TYPES.has(legacy) || /\b(select|insert|update|delete|from|join|group by|where)\b/.test(exercise.instructions.toLowerCase())) {
      return 'sql-query';
    }
    if (/\bmatch\b|\border\b|\bchoose\b|\bmultiple\b/.test(blob)) return 'matching';
    return 'conceptual-response';
  }

  if (subject === 'excel') {
    if (/pivot/.test(blob)) return 'spreadsheet-pivot';
    if (/chart|visualization|bar chart|line chart/.test(blob)) return 'chart-selection';
    if (/filter|sort|clean|duplicate|remove blank/.test(blob)) return 'spreadsheet-cleaning';
    if (/=|formula|xlookup|vlookup|sumif|countif|index|match|if\(/.test(blob)) return 'spreadsheet-formula';
    return 'conceptual-response';
  }

  if (subject === 'tableau') {
    if (/dashboard|story|layout/.test(blob)) return 'tableau-dashboard-layout';
    if (/calculated field|parameter|lod/.test(blob)) return 'tableau-field-builder';
    if (/chart|visualization|bar|line|map|scatter/.test(blob)) return 'tableau-chart-builder';
    return 'tableau-field-builder';
  }

  if (subject === 'power-bi') {
    if (/dax|calculate|measure|row context|filter context/.test(blob)) return 'dax-expression';
    if (/relationship|star schema|model|cardinality/.test(blob)) return 'powerbi-model-builder';
    if (/power query|transform|clean|merge query/.test(blob)) return 'spreadsheet-cleaning';
    if (/report|visual|slicer|page|canvas/.test(blob)) return 'powerbi-report-builder';
    return 'powerbi-report-builder';
  }

  if (subject === 'python') {
    if (/dataframe|pandas|merge|groupby|pivot|filter rows/.test(blob)) return 'dataframe-operation';
    if (/plot|matplotlib|seaborn|chart|visual/.test(blob)) return 'python-code';
    return 'python-code';
  }

  if (subject === 'statistics') {
    if (/a\/b|experiment|hypothesis test|p-value|significance/.test(blob)) return 'statistics-experiment';
    if (/interpret|conclusion|stakeholder|explain what this means|business language/.test(blob)) {
      return 'statistics-interpretation';
    }
    if (/simulation|bootstrap|sample|confidence interval/.test(blob)) return 'statistics-calculation';
    return 'statistics-calculation';
  }

  return 'conceptual-response';
}

function inferPracticeType(exercise) {
  if (exercise.practiceType) return exercise.practiceType;
  if (exercise.id.endsWith('-challenge')) return 'independent';
  return 'guided';
}

function bumpDifficulty(difficulty) {
  if (difficulty === 'beginner') return 'intermediate';
  if (difficulty === 'intermediate') return 'advanced';
  return 'advanced';
}

function buildValidationConfig(exercise, interactionType) {
  if (exercise.validationConfig) return exercise.validationConfig;

  if (interactionType === 'sql-query') {
    return {
      mode: 'sql',
      expectedSql: exercise.expectedAnswer,
      ...(exercise.validation || {}),
    };
  }

  if (interactionType === 'spreadsheet-formula') {
    return {
      mode: 'formula',
      expectedFormula: exercise.expectedAnswer,
      acceptableVariants: exercise.acceptableVariants || [],
    };
  }

  if (interactionType === 'dax-expression') {
    return {
      mode: 'dax',
      expectedExpression: exercise.expectedAnswer,
    };
  }

  if (interactionType === 'python-code' || interactionType === 'dataframe-operation') {
    return {
      mode: 'python',
      expectedOutput: exercise.expectedAnswer,
    };
  }

  if (interactionType.startsWith('statistics-')) {
    return {
      mode: 'statistics',
      expectedAnswer: exercise.expectedAnswer,
    };
  }

  return {
    mode: 'text',
    expectedAnswer: exercise.expectedAnswer,
    keywords: (exercise.expectedAnswer || '').split(/[,;]+/).map((s) => s.trim()).filter(Boolean),
  };
}

function buildStarterState(exercise, interactionType, lesson) {
  if (exercise.starterState) return exercise.starterState;

  if (interactionType === 'sql-query') {
    return {
      sql: exercise.starterCode || '-- Write your SQL here\n',
      datasetId: exercise.dataset || 'retail-orders',
    };
  }

  if (interactionType === 'spreadsheet-formula') {
    return {
      sheet: exercise.sheet || getDefaultExcelSheet(lesson?.title),
      formula: '',
      targetCell: 'F2',
    };
  }

  if (interactionType === 'spreadsheet-pivot') {
    return { rows: [], columns: [], values: [], filters: [] };
  }

  if (interactionType === 'python-code' || interactionType === 'dataframe-operation') {
    return {
      code: exercise.starterCode || '# Write Python here\nimport pandas as pd\n',
    };
  }

  if (interactionType.startsWith('tableau-') || interactionType.startsWith('powerbi-')) {
    return { fields: [], shelves: {}, selections: {} };
  }

  if (interactionType.startsWith('statistics-')) {
    return { values: exercise.dataValues || [12, 15, 18, 14, 20, 16] };
  }

  return {};
}

function getDefaultExcelSheet(title = '') {
  const t = title.toLowerCase();
  if (t.includes('pivot')) {
    return [
      ['Region', 'Product', 'Revenue'],
      ['West', 'Desk Lamp', '4200'],
      ['West', 'Office Chair', '8900'],
      ['Midwest', 'Desk Lamp', '3100'],
      ['Midwest', 'Monitor', '5600'],
    ];
  }
  return [
    ['Region', 'Revenue', 'Orders'],
    ['West', '12500', '42'],
    ['Midwest', '9800', '35'],
    ['South', '11200', '38'],
    ['Northeast', '8900', '29'],
  ];
}

function generateChallengeFromGuided(guided) {
  const harderInstructions = guided.interactionType === 'sql-query'
    ? `Independent challenge: ${guided.instructions}`
    : `Apply this independently on Northstar Commerce data: ${guided.instructions}`;

  return {
    ...guided,
    id: `${guided.lessonId}-challenge`,
    practiceType: 'independent',
    title: guided.title.endsWith('Challenge')
      ? guided.title
      : `${guided.title} — Independent Challenge`,
    instructions: harderInstructions,
    difficulty: bumpDifficulty(guided.difficulty || 'beginner'),
    validationConfig: buildValidationConfig(guided, guided.interactionType),
    starterState: buildStarterState(guided, guided.interactionType, null),
  };
}

function normalizeOne(raw, lessonMap) {
  const lesson = lessonMap.get(raw.lessonId);
  const practiceType = inferPracticeType(raw);
  const interactionType = inferInteractionType(raw, lesson);
  const moduleId = lesson?.moduleId || raw.moduleId || '';

  return {
    ...raw,
    subjectId: raw.subjectId,
    moduleId,
    lessonId: raw.lessonId,
    practiceType,
    interactionType,
    relatedLessonRoute: `#/lesson/${raw.lessonId}`,
    answerExplanation: raw.answerExplanation || raw.explanation,
    validationConfig: buildValidationConfig(raw, interactionType),
    starterState: buildStarterState(raw, interactionType, lesson),
    dataset: raw.dataset || (raw.subjectId === 'sql' ? 'retail-orders' : null),
    exerciseNumber: practiceType === 'independent' ? 2 : 1,
    lessonSlug: getLessonSlug(raw.lessonId),
    // preserve legacy type for migration reference
    legacyType: raw.type,
  };
}

export function normalizeExercises(rawExercises, lessons) {
  const lessonMap = new Map(lessons.map((l) => [l.id, l]));
  const normalized = rawExercises.map((raw) => normalizeOne(raw, lessonMap));
  const byId = new Map(normalized.map((e) => [e.id, e]));
  const byLesson = new Map();

  for (const ex of normalized) {
    if (!byLesson.has(ex.lessonId)) byLesson.set(ex.lessonId, []);
    byLesson.get(ex.lessonId).push(ex);
  }

  for (const lesson of lessons) {
    const guidedId = `${lesson.id}-exercise`;
    const challengeId = `${lesson.id}-challenge`;
    const existing = byLesson.get(lesson.id) || [];
    const hasGuided = existing.some((e) => e.practiceType === 'guided') || byId.has(guidedId);
    const hasChallenge = existing.some((e) => e.practiceType === 'independent') || byId.has(challengeId);

    if (!hasGuided) {
      throw new Error(`Lesson ${lesson.id} is missing guided practice exercise`);
    }

    if (!hasChallenge) {
      const guided = byId.get(guidedId) || existing.find((e) => e.practiceType === 'guided');
      if (guided) {
        const challenge = normalizeOne(generateChallengeFromGuided(guided), lessonMap);
        normalized.push(challenge);
        byId.set(challenge.id, challenge);
      }
    }
  }

  return normalized.sort((a, b) => {
    if (a.lessonId !== b.lessonId) return a.lessonId.localeCompare(b.lessonId);
    return a.practiceType === 'guided' ? -1 : 1;
  }).map((exercise) => {
    if (exercise.subjectId === 'tableau') return applyTableauConfigToExercise(exercise);
    if (exercise.subjectId === 'power-bi') return applyPowerBiConfigToExercise(exercise);
    return exercise;
  });
}

export function validateExerciseArchitecture(exercises, lessons) {
  const issues = [];
  const lessonIds = new Set(lessons.map((l) => l.id));
  const guidedByLesson = new Map();
  const challengeByLesson = new Map();

  for (const ex of exercises) {
    if (!ex.subjectId) issues.push({ id: ex.id, message: 'Missing subjectId' });
    if (!ex.lessonId) issues.push({ id: ex.id, message: 'Missing lessonId' });
    if (!ex.interactionType) issues.push({ id: ex.id, message: 'Missing interactionType' });
    if (!VALID_SUBJECTS.has(ex.subjectId)) issues.push({ id: ex.id, message: `Invalid subject: ${ex.subjectId}` });
    if (!VALID_PRACTICE_TYPES.has(ex.practiceType)) {
      issues.push({ id: ex.id, message: `Invalid practiceType: ${ex.practiceType}` });
    }
    if (ex.lessonId && !lessonIds.has(ex.lessonId)) {
      issues.push({ id: ex.id, message: `Invalid lessonId: ${ex.lessonId}` });
    }
    if (ex.subjectId !== 'sql' && NON_SQL_QUERY_TYPES.has(ex.interactionType)) {
      issues.push({ id: ex.id, message: `Non-SQL subject using sql-query: ${ex.subjectId}` });
    }
    if (ex.relatedLessonRoute !== `#/lesson/${ex.lessonId}`) {
      issues.push({ id: ex.id, message: 'Invalid relatedLessonRoute' });
    }

    if (ex.practiceType === 'guided') guidedByLesson.set(ex.lessonId, ex);
    if (ex.practiceType === 'independent') challengeByLesson.set(ex.lessonId, ex);
  }

  for (const lessonId of lessonIds) {
    if (!guidedByLesson.has(lessonId)) {
      issues.push({ id: lessonId, message: 'Lesson missing Guided Practice exercise' });
    }
    if (!challengeByLesson.has(lessonId)) {
      issues.push({ id: lessonId, message: 'Lesson missing Independent Challenge exercise' });
    }
  }

  return issues;
}
