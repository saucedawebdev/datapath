# Content Model

All curriculum content is stored as JavaScript modules exporting structured data. IDs are stable strings used in URLs, progress tracking, and cross-references.

## Subject

```javascript
{
  id: 'sql',                    // required, unique
  name: 'SQL',                  // required
  order: 1,                     // required, official learning order
  description: '...',           // required
  icon: 'database',             // optional
  color: 'var(--subject-sql)',  // optional
  modules: [Module],            // required
  completionRequirements: {     // optional
    lessonsRequired: 0.8,       // 80% of lessons
    minQuizScore: 0.7,
    projectsRequired: 1
  }
}
```

## Module

```javascript
{
  id: 'sql-module-querying',
  subjectId: 'sql',
  name: 'Querying Data',
  order: 1,
  description: '...',
  lessons: [LessonRef],         // { id, title, difficulty, estimatedMinutes }
  prerequisites: []           // module ids
}
```

## Lesson (full)

```javascript
{
  id: 'sql-lesson-select-basics',
  subjectId: 'sql',
  moduleId: 'sql-module-querying',
  title: 'SELECT Basics',
  difficulty: 'beginner',       // beginner | intermediate | advanced
  estimatedMinutes: 15,
  prerequisites: [],            // lesson ids
  learningObjectives: ['...'],
  plainEnglish: '...',
  whatItDoes: '...',
  whenToUse: '...',
  stakeholderQuestion: '...',
  walkthrough: '...',
  syntax: 'SELECT column FROM table;',
  componentBreakdown: [{ part: 'SELECT', explanation: '...' }],
  sampleInput: '...',
  expectedOutput: '...',
  visualExplanation: null,      // or { type, data }
  commonMistakes: ['...'],
  bestPractices: ['...'],
  guidedExample: { ... },
  guidedPractice: { exerciseId: '...' },
  independentChallenge: { exerciseId: '...' },
  knowledgeCheck: { quizId: '...' },
  relatedConcepts: ['sql-ref-distinct'],
  projectConnection: 'Used in Retail Sales Analysis project',
  tags: ['select', 'fundamentals']
}
```

## Reference Entry (Library)

```javascript
{
  id: 'sql-ref-select',
  subjectId: 'sql',
  name: 'SELECT',
  category: 'Querying',
  difficulty: 'beginner',
  contentType: 'command',       // command | concept | function | workflow
  definition: '...',
  whatItDoes: '...',
  whenToUse: '...',
  stakeholderQuestion: '...',
  syntax: 'SELECT ...',
  componentBreakdown: [],
  sampleInput: '...',
  expectedOutput: '...',
  commonMistakes: ['...'],
  relatedConcepts: ['sql-ref-from'],
  practiceLink: '/practice?exercise=...'
}
```

## Exercise

```javascript
{
  id: 'sql-exercise-select-columns',
  subjectId: 'sql',
  type: 'guided',               // guided | challenge | timed
  difficulty: 'beginner',
  skillTags: ['select'],
  title: '...',
  instructions: '...',
  starterCode: 'SELECT ...',
  hints: ['...'],
  validation: {
    type: 'sql-result',         // sql-result | formula | choice | numeric
    expectedQuery: '...',
    expectedColumns: [],
    expectedRowCount: null
  },
  explanation: '...'
}
```

## Quiz

```javascript
{
  id: 'sql-quiz-select-basics',
  subjectId: 'sql',
  title: '...',
  questions: [{
    id: 'q1',
    type: 'multiple-choice',    // multiple-choice | true-false | multi-select
    question: '...',
    options: ['...'],
    correctIndex: 0,
    explanation: '...'
  }]
}
```

## Project

```javascript
{
  id: 'project-retail-sales',
  title: 'Retail Sales Analysis',
  subjectIds: ['sql', 'excel', 'tableau'],
  difficulty: 'intermediate',
  businessContext: '...',
  stakeholderRequest: '...',
  datasetOverview: '...',
  deliverables: ['...'],
  requiredSkills: ['...'],
  recommendedWorkflow: ['...'],
  milestones: [{ id, title, description }],
  rubric: [{ criterion, weight, description }],
  reflectionQuestions: ['...']
}
```

## Achievement

```javascript
{
  id: 'achievement-first-query',
  title: 'First Query',
  description: 'Run your first SQL query',
  condition: { type: 'sql-query-run', count: 1 }
}
```

## Dataset

```javascript
{
  id: 'retail-orders',
  name: 'Retail Orders',
  description: '...',
  tables: [{
    name: 'orders',
    columns: [{ name, type }],
    rows: [[...]]
  }],
  seedSql: 'CREATE TABLE ...'
}
```

## Skill Tag

```javascript
{
  id: 'skill-sql-select',
  subjectId: 'sql',
  name: 'SELECT statements',
  category: 'Querying'
}
```

## Validation Rules

The validator (`src/utilities/content-validator.js`) checks:

1. Required fields present per schema above.
2. Unique IDs within each collection.
3. Valid `subjectId` references.
4. Valid cross-references (lesson prerequisites, related concepts).
5. Enum values (`difficulty`, `contentType`, etc.).

Run: `npm run validate:content`

## Authoring Workflow

1. Add content to appropriate `src/content/{subject}/` file.
2. Register in subject index if new module.
3. Run validation.
4. Add tests if new validation logic applies.
5. Preview via dev server lesson route.

See `docs/CONTENT_AUTHORING.md` for detailed examples.
