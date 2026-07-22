/**
 * Builds excel-lessons-data.js and tableau-lessons-data.js from embedded lesson specs.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../src/content/job-ready/content');
mkdirSync(outDir, { recursive: true });

const NS = 'Northstar Commerce';

function q(question, options, correctIndex, explanation) {
  return { question, options, correctIndex, explanation };
}

function ex(title, instructions, hint, expectedAnswer, explanation, skillTags = []) {
  return { title, instructions, hint, expectedAnswer, explanation, skillTags };
}

function lesson(partial, quizQuestions, exercise) {
  return { partial, quiz: quizQuestions, exercise };
}

function renderFile(subjectId, exportPrefix, entries) {
  const importLine = "import { makeQuiz, makeExercise } from '../lesson-factory.js';\n\n";
  const contentBody = entries
    .map(({ id, partial }) => `  '${id}': ${JSON.stringify(partial, null, 2).replace(/\n/g, '\n  ')}`)
    .join(',\n\n');
  const quizBody = entries
    .map(({ id, quiz }) => `  makeQuiz('${subjectId}', '${id}', ${JSON.stringify(quiz, null, 2).replace(/\n/g, '\n  ')})`)
    .join(',\n');
  const exBody = entries
    .map(({ id, exercise: e }) => {
      const payload = { subjectId, lessonId: id, ...e };
      return `  makeExercise(${JSON.stringify(payload, null, 2).replace(/\n/g, '\n  ')})`;
    })
    .join(',\n');

  return `${importLine}export const ${exportPrefix}LessonContent = {\n${contentBody}\n};\n\nexport const ${exportPrefix}Quizzes = [\n${quizBody}\n];\n\nexport const ${exportPrefix}Exercises = [\n${exBody}\n];\n`;
}

function basePartial({
  topic,
  plainEnglish,
  whatItDoes,
  whyItMatters,
  whenToUse,
  stakeholderQuestion,
  walkthrough,
  syntax,
  componentBreakdown,
  sampleInput,
  expectedOutput,
  commonMistakes,
  bestPractices,
  guidedExample,
  tags,
  projectConnectionText,
  objectives,
}) {
  return {
    learningObjectives: objectives,
    plainEnglish,
    whatItDoes,
    whyItMatters,
    whenToUse,
    stakeholderQuestion,
    walkthrough,
    syntax,
    componentBreakdown,
    sampleInput,
    expectedOutput,
    commonMistakes,
    bestPractices,
    guidedExample,
    tags,
    projectConnectionText,
  };
}

// Import lesson definitions from separate modules to keep this file maintainable
const { excelEntries } = await import('./job-ready-excel-lessons.mjs');
const { tableauEntries } = await import('./job-ready-tableau-lessons.mjs');

writeFileSync(join(outDir, 'excel-lessons-data.js'), renderFile('excel', 'excel', excelEntries));
writeFileSync(join(outDir, 'tableau-lessons-data.js'), renderFile('tableau', 'tableau', tableauEntries));

console.log(`Wrote excel-lessons-data.js (${excelEntries.length} lessons)`);
console.log(`Wrote tableau-lessons-data.js (${tableauEntries.length} lessons)`);
