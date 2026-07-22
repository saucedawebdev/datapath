import contentBundle from '../src/content/index.js';
import { validateContentBundle, validateJobReadyCurriculum } from '../src/utilities/content-validator.js';

const result = validateContentBundle(contentBundle);
const jobReady = validateJobReadyCurriculum(contentBundle);

if (result.warnings.length) {
  console.warn('Content warnings:');
  result.warnings.forEach((w) => console.warn(`  ${w.id}: ${w.message}`));
}

const allErrors = [...result.errors, ...jobReady.errors];
if (allErrors.length) {
  console.error('Content validation failed:');
  allErrors.forEach((e) => console.error(`  ${e.id}: ${e.message}`));
  process.exit(1);
}

console.log(`Job Ready Edition valid:`);
console.log(`  Subjects: ${contentBundle.subjects.length}`);
console.log(`  Lessons: ${contentBundle.lessons.length}`);
console.log(`  Quizzes: ${contentBundle.quizzes.length}`);
console.log(`  Exercises: ${contentBundle.exercises.length}`);
console.log(`  Guided: ${contentBundle.exercises.filter((e) => e.practiceType === 'guided').length}`);
console.log(`  Independent: ${contentBundle.exercises.filter((e) => e.practiceType === 'independent').length}`);
console.log(`  References: ${contentBundle.references.length}`);
