# Content Authoring Guide

## Adding a SQL Lesson

1. Open `src/content/sql/lessons.js`
2. Add a lesson object following [CONTENT_MODEL.md](CONTENT_MODEL.md)
3. Register the lesson reference in `src/content/sql/subject.js` under the appropriate module
4. Run `npm run validate:content`
5. Preview at `#/lesson/your-lesson-id`

## Minimal Lesson Example

```javascript
{
  id: 'sql-lesson-example',
  subjectId: 'sql',
  moduleId: 'sql-module-querying',
  title: 'Example Lesson',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  prerequisites: [],
  learningObjectives: ['Objective one'],
  plainEnglish: 'Explanation here.',
  whatItDoes: '...',
  whenToUse: '...',
  stakeholderQuestion: '...',
  walkthrough: '...',
  syntax: 'SELECT 1;',
  componentBreakdown: [],
  sampleInput: '...',
  expectedOutput: '...',
  commonMistakes: [],
  bestPractices: [],
  relatedConcepts: [],
  projectConnection: '...',
  tags: ['example'],
}
```

## Adding Reference Entries

Add to `src/content/sql/references-exercises.js` in the `sqlReferences` array.

## Adding Exercises

Add to `sqlExercises` with a `validation` block:

```javascript
validation: {
  type: 'sql-result',
  expectedColumns: ['column_a'],
  minRowCount: 1,
}
```

## Stable IDs

Use kebab-case prefixed by subject: `sql-lesson-where-filtering`, `sql-ref-select`, `sql-exercise-where-filter`.

Never change IDs after learners may have progress stored.

## Cross-References

- `prerequisites` — lesson IDs
- `relatedConcepts` — reference entry IDs
- `guidedPractice.exerciseId` — exercise ID
- `knowledgeCheck.quizId` — quiz ID

## Validation

```bash
npm run validate:content
```

Fix all errors before committing content changes.
