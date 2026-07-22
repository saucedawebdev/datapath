/**
 * Generator for Python and Statistics job-ready lesson data files.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/content/job-ready/content');

const NORTHSTAR = 'Northstar Commerce';
const PYTHON_PROJECT = 'Python Business Analysis Project';
const STATS_PROJECT = 'Statistics Business Analysis Project';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function lessonId(subjectId, title) {
  return `${subjectId}-lesson-${slugify(title)}`;
}

function makePartial({
  title,
  subjectLabel,
  topic,
  plainEnglish,
  whatItDoes,
  whyItMatters,
  whenToUse,
  stakeholderRole,
  stakeholderQ,
  walkthrough,
  syntax,
  componentBreakdown,
  sampleInput,
  expectedOutput,
  commonMistakes,
  bestPractices,
  guidedExample,
  tags,
  projectName,
}) {
  return {
    learningObjectives: [
      `Explain ${topic} in plain English using ${NORTHSTAR} business examples`,
      `Apply ${topic} to answer a realistic stakeholder question at ${NORTHSTAR}`,
      `Identify common mistakes junior analysts make with ${topic} and how to avoid them`,
    ],
    plainEnglish,
    whatItDoes,
    whyItMatters: whyItMatters || `Junior ${subjectLabel} analysts at ${NORTHSTAR} use ${topic} daily to deliver accurate answers to Sales, Marketing, and Finance stakeholders.`,
    whenToUse,
    stakeholderQuestion: `${stakeholderRole} at ${NORTHSTAR}: "${stakeholderQ}"`,
    walkthrough,
    syntax,
    componentBreakdown,
    sampleInput,
    expectedOutput,
    commonMistakes,
    bestPractices,
    guidedExample,
    tags,
    projectConnectionText: `Builds toward the ${projectName} using ${NORTHSTAR} orders, customers, and marketing data.`,
  };
}

function makeQuiz(subjectId, lid, questions) {
  return {
    id: `${lid}-quiz`,
    subjectId,
    lessonId: lid,
    questions: questions.map((q, i) => ({
      id: `${lid}-q${i + 1}`,
      type: 'multiple-choice',
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
  };
}

function makeExercise({ subjectId, lid, title, instructions, hint, expectedAnswer, explanation, type = 'conceptual' }) {
  return {
    id: `${lid}-exercise`,
    subjectId,
    lessonId: lid,
    title,
    type,
    difficulty: 'beginner',
    instructions,
    hint,
    expectedAnswer,
    explanation,
    validation: null,
    skillTags: [],
  };
}

function serialize(obj, indent = 0) {
  const sp = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj === 'string') return JSON.stringify(obj);
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    if (obj.every((v) => typeof v === 'string')) {
      return `[\n${obj.map((v) => `${sp}  ${JSON.stringify(v)}`).join(',\n')}\n${sp}]`;
    }
    return `[\n${obj.map((v) => `${sp}  ${serialize(v, indent + 1)}`).join(',\n')}\n${sp}]`;
  }
  const entries = Object.entries(obj);
  return `{\n${entries.map(([k, v]) => {
    const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
    return `${sp}  ${key}: ${serialize(v, indent + 1)}`;
  }).join(',\n')}\n${sp}}`;
}

function writeSubjectFile({ subjectId, exportPrefix, projectName, subjectLabel, lessons }) {
  const content = {};
  const quizzes = [];
  const exercises = [];

  for (const spec of lessons) {
    const lid = lessonId(subjectId, spec.title);
    content[lid] = spec.partial;
    quizzes.push(makeQuiz(subjectId, lid, spec.quiz));
    exercises.push(makeExercise({
      subjectId,
      lid,
      title: spec.exerciseTitle || `Apply: ${spec.title}`,
      instructions: spec.exerciseInstructions,
      hint: spec.exerciseHint,
      expectedAnswer: spec.exerciseAnswer,
      explanation: spec.exerciseExplanation,
      type: spec.exerciseType || 'conceptual',
    }));
  }

  const body = `/**
 * Job Ready Edition — ${subjectLabel} lesson content, quizzes, and exercises.
 * Fictional business: ${NORTHSTAR}
 */
export const ${exportPrefix}LessonContent = ${serialize(content, 0)};

export const ${exportPrefix}Quizzes = ${serialize(quizzes, 0)};

export const ${exportPrefix}Exercises = ${serialize(exercises, 0)};
`;

  writeFileSync(join(OUT, `${subjectId}-lessons-data.js`), body, 'utf8');
  console.log(`Wrote ${subjectId}-lessons-data.js (${lessons.length} lessons)`);
}

function buildLesson({ subjectId, subjectLabel, projectName, title, fields, quiz, exercise }) {
  return {
    title,
    partial: makePartial({
      title,
      subjectLabel,
      projectName,
      ...fields,
    }),
    quiz,
    exerciseInstructions: exercise.instructions,
    exerciseHint: exercise.hint,
    exerciseAnswer: exercise.answer,
    exerciseExplanation: exercise.explanation,
    exerciseType: exercise.type,
  };
}

mkdirSync(OUT, { recursive: true });

const pythonLessons = [
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Python Syntax and Variables",
    fields: {
      topic: "Python syntax and variables",
      plainEnglish: "Python uses readable statements, indentation for blocks, and variables to store values you reuse. At Northstar Commerce you might store west_order_count or weekly_net_revenue before building a pandas workflow.",
      whatItDoes: "Lets analysts assign names to numbers and text, print formatted KPI lines, and prepare values for later DataFrame work.",
      whyItMatters: "Clear syntax and naming prevent refresh scripts from failing silently when Finance reruns weekly West revenue checks.",
      whenToUse: "Starting notebooks, defining constants, and writing small validation scripts before pandas imports.",
      stakeholderRole: "Finance Analyst",
      stakeholderQ: "Script last week's West net revenue and order count so we can compare to target.",
      walkthrough: "1. Create variables with snake_case names.\n2. Use f-strings for currency formatting.\n3. Print labeled output for audit.\n4. Compare to Excel control totals.\n5. Add header comment with data-as-of date.\n6. Save script in version control.",
      syntax: "region = \"West\"\norder_count = 8420\nnet_revenue = 1_245_880.50\nprint(f\"{region}: {order_count} orders, ${net_revenue:,.2f} net revenue\")",
      componentBreakdown: [
        { part: "Assignment", explanation: "Stores a value under a reusable name." },
        { part: "Indentation", explanation: "Defines blocks for if, for, and def without braces." },
        { part: "f-strings", explanation: "Embeds variables in stakeholder-friendly text." },
        { part: "Comments", explanation: "Document business rules and refresh dates." },
        { part: "snake_case", explanation: "Matches analytics naming conventions." }
      ],
      sampleInput: "West region constants for one week.",
      expectedOutput: "Formatted line with orders and net revenue.",
      commonMistakes: ["Inconsistent indentation mixing tabs and spaces", "Using vague names like x instead of net_revenue", "Hard-coding paths without variables at top"],
      bestPractices: ["Name variables after business meaning", "Pin Python version in README", "Keep one logical step per line in teaching notebooks"],
      guidedExample: { description: "Print West KPI summary.", steps: ["Set variables", "Format with f-string", "Verify against Excel"] },
      tags: ["syntax", "variables", "basics"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python syntax and variables?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python syntax and variables supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python syntax and variables is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python syntax and variables?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Define region West, order_count 8420, net_revenue 1245880.50 and print one formatted summary line.",
      hint: "Use snake_case and f-string with comma formatting for money.",
      answer: "region = \"West\"\norder_count = 8420\nnet_revenue = 1_245_880.50\nprint(f\"{region}: {order_count} orders, ${net_revenue:,.2f} net revenue\")",
      explanation: "Readable names and formatting match how analysts deliver numbers to Finance."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Data Types",
    fields: {
      topic: "Python data types",
      plainEnglish: "Numbers, strings, booleans, and None tell Python what operations are valid. Northstar order_id should be int, SKU strings, is_loyalty boolean.",
      whatItDoes: "Cast types after CSV import so revenue sums stay numeric.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python data types when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require python data types in notebooks or scripts.",
      stakeholderRole: "Finance Controller",
      stakeholderQ: "Why do some order IDs import as floats from CSV?",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python data types step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "order_id = int(100284.0)\nunit_price = float(\"129.99\")",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Python data types on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying python data types", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Python data types on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["types", "casting"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python data types?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python data types supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python data types is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python data types?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Cast order_id 100284.0 to int and price \"129.99\" to float; compute line_total = price * 2.",
      hint: "Use int() and float().",
      answer: "order_id = int(100284.0)\nprice = float(\"129.99\")\nline_total = price * 2",
      explanation: "Correct types enable math Finance expects."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Lists",
    fields: {
      topic: "Python lists",
      plainEnglish: "Lists hold ordered values like seven daily click counts or Northstar category names for a chart legend.",
      whatItDoes: "Collect small sequences and compute quick sums before pandas.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python lists when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require python lists in notebooks or scripts.",
      stakeholderRole: "Marketing Coordinator",
      stakeholderQ: "Average last week's email click counts without Excel.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python lists step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "categories = [\"Apparel\", \"Home\", \"Electronics\"]\nclicks = [420, 510, 388]\nprint(sum(clicks) / len(clicks))",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Python lists on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying python lists", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Python lists on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["lists", "collections"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python lists?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python lists supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python lists is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python lists?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Build list [100,200,150] and print sum.",
      hint: "Use sum().",
      answer: "print(sum([100, 200, 150]))",
      explanation: "Lists support quick totals on small series."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Dictionaries",
    fields: {
      topic: "Python dictionaries",
      plainEnglish: "Dicts map keys to values such as region code W to West or customer_id to segment for lookup.",
      whatItDoes: "Build reference maps and parse JSON marketing payloads.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python dictionaries when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require python dictionaries in notebooks or scripts.",
      stakeholderRole: "Customer Insights Lead",
      stakeholderQ: "Map W/E/C codes to full region names for slides.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python dictionaries step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "region_map = {\"W\": \"West\", \"E\": \"East\"}\nprint(region_map.get(\"W\"))",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Python dictionaries on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying python dictionaries", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Python dictionaries on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["dictionaries", "mapping"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python dictionaries?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python dictionaries supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python dictionaries is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python dictionaries?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Dict mapping APP to Apparel; print dept[\"APP\"].",
      hint: "Literal dict then bracket access.",
      answer: "dept = {\"APP\": \"Apparel\"}\nprint(dept[\"APP\"])",
      explanation: "Dicts power label lookups."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Conditions",
    fields: {
      topic: "conditional logic in Python",
      plainEnglish: "if/elif/else encode rules like flagging Northstar orders over $500 for review.",
      whatItDoes: "Segment data and guard invalid paths before pandas.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on conditional logic in Python when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require conditional logic in python in notebooks or scripts.",
      stakeholderRole: "Risk Analyst",
      stakeholderQ: "How many West orders exceeded $500 last month?",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply conditional logic in python step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "if order_total > 500 and region == \"West\":\n    review = True",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of conditional logic in Python on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying conditional logic in python", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply conditional logic in Python on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["conditions", "logic"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies conditional logic in Python?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "conditional logic in Python supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if conditional logic in Python is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving conditional logic in Python?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Print Review when order_total=620 exceeds 500 else OK.",
      hint: "if/else with print.",
      answer: "order_total = 620\nif order_total > 500:\n    print(\"Review\")\nelse:\n    print(\"OK\")",
      explanation: "Conditions encode review rules."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Loops",
    fields: {
      topic: "Python loops",
      plainEnglish: "for loops walk categories or dates; while loops paginate APIs — automate repetitive Northstar totals.",
      whatItDoes: "Accumulate revenue by category without copying Excel formulas.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python loops when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require python loops in notebooks or scripts.",
      stakeholderRole: "Operations Analyst",
      stakeholderQ: "Total revenue for each main category from a list of pairs.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python loops step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "for cat, rev in pairs:\n    totals[cat] = totals.get(cat, 0) + rev",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Python loops on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying python loops", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Python loops on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["loops", "iteration"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python loops?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python loops supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python loops is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python loops?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Loop values [10,20,30] printing running total.",
      hint: "Initialize total before loop.",
      answer: "total = 0\nfor v in [10, 20, 30]:\n    total += v\n    print(total)",
      explanation: "Loops accumulate metrics."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Functions",
    fields: {
      topic: "Python functions",
      plainEnglish: "Functions package reusable KPI logic like compute_aov(revenue, orders) with one Northstar definition.",
      whatItDoes: "Share tested calculations across notebooks.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Python functions when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require python functions in notebooks or scripts.",
      stakeholderRole: "Director of Sales",
      stakeholderQ: "Use the same AOV definition we used in Q3.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply python functions step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "def compute_aov(revenue, orders):\n    return 0 if orders == 0 else revenue / orders",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Python functions on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying python functions", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Python functions on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["functions", "reuse"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Python functions?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Python functions supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Python functions is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Python functions?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "def discount_price(price, pct) returning price after pct discount; call with 100, 15.",
      hint: "return price * (1 - pct/100).",
      answer: "def discount_price(price, pct):\n    return price * (1 - pct / 100)\nprint(discount_price(100, 15))",
      explanation: "Functions centralize pricing logic."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "NumPy Fundamentals",
    fields: {
      topic: "NumPy arrays",
      plainEnglish: "NumPy arrays vectorize math on prices and quantities — fast numeric core under pandas.",
      whatItDoes: "Apply markdowns and filters on numeric columns at scale.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on NumPy arrays when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require numpy arrays in notebooks or scripts.",
      stakeholderRole: "Pricing Analyst",
      stakeholderQ: "Apply 10% markdown to all clearance prices vectorized.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply numpy arrays step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "import numpy as np\nprices = np.array([29.99, 49.99, 129.0])\nprint(prices * 0.9)",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of NumPy arrays on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying numpy arrays", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply NumPy arrays on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["numpy", "arrays"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies NumPy arrays?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "NumPy arrays supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if NumPy arrays is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving NumPy arrays?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "np.array([10,20,30]); print mean and sum.",
      hint: "np.mean, np.sum.",
      answer: "import numpy as np\na = np.array([10, 20, 30])\nprint(np.mean(a), np.sum(a))",
      explanation: "NumPy aggregates support pricing QA."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "pandas Series and DataFrames",
    fields: {
      topic: "pandas Series and DataFrames",
      plainEnglish: "Series is one column; DataFrame is Northstar orders table with labels — primary analyst structure.",
      whatItDoes: "Load, inspect, filter tabular exports.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on pandas Series and DataFrames when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require pandas series and dataframes in notebooks or scripts.",
      stakeholderRole: "Sales Analyst",
      stakeholderQ: "First 20 West orders with customer_id and net_revenue.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply pandas series and dataframes step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "import pandas as pd\ndf = pd.read_csv('northstar_orders.csv')\nwest = df.loc[df['region']=='West', ['customer_id','net_revenue']]",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of pandas Series and DataFrames on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying pandas series and dataframes", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply pandas Series and DataFrames on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["pandas", "dataframe"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies pandas Series and DataFrames?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "pandas Series and DataFrames supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if pandas Series and DataFrames is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving pandas Series and DataFrames?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Select rows where region equals East with .loc.",
      hint: "Boolean mask.",
      answer: "east = df.loc[df[\"region\"] == \"East\"]",
      explanation: "Label selection defines slices."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Reading CSV and Excel Files",
    fields: {
      topic: "reading CSV and Excel into pandas",
      plainEnglish: "read_csv and read_excel ingest Finance CSV and Marketing Excel sheets with dtypes and dates.",
      whatItDoes: "Start every pipeline from files stakeholders already use.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on reading CSV and Excel into pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require reading csv and excel into pandas in notebooks or scripts.",
      stakeholderRole: "Marketing Manager",
      stakeholderQ: "Load campaign spend Sheet2 without copy-paste.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply reading csv and excel into pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "orders = pd.read_csv('northstar_orders.csv', parse_dates=['order_date'])\nspend = pd.read_excel('northstar_marketing.xlsx', sheet_name='Campaigns')",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of reading CSV and Excel into pandas on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying reading csv and excel into pandas", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply reading CSV and Excel into pandas on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["io", "read_csv"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies reading CSV and Excel into pandas?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "reading CSV and Excel into pandas supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if reading CSV and Excel into pandas is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving reading CSV and Excel into pandas?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "read_csv northstar_orders.csv parsing order_date.",
      hint: "parse_dates argument.",
      answer: "pd.read_csv(\"northstar_orders.csv\", parse_dates=[\"order_date\"])",
      explanation: "Parse dates at ingest."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Selecting and Filtering Data",
    fields: {
      topic: "selecting and filtering pandas data",
      plainEnglish: "Boolean masks with .loc slice West apparel orders over $200 in January.",
      whatItDoes: "Answer daily segmented KPI questions.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on selecting and filtering pandas data when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require selecting and filtering pandas data in notebooks or scripts.",
      stakeholderRole: "Regional Sales Director",
      stakeholderQ: "Count and sum West apparel orders over $200 in January.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply selecting and filtering pandas data step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "mask = (df['region']=='West') & (df['net_revenue']>200)\nsummary = df.loc[mask]",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of selecting and filtering pandas data on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying selecting and filtering pandas data", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply selecting and filtering pandas data on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["filter", "loc"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies selecting and filtering pandas data?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "selecting and filtering pandas data supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if selecting and filtering pandas data is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving selecting and filtering pandas data?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Filter region East with .loc.",
      hint: "df.loc[mask].",
      answer: "east = df.loc[df[\"region\"] == \"East\"]",
      explanation: "Boolean indexing defines slices."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Sorting and Grouping",
    fields: {
      topic: "sorting and grouping with pandas",
      plainEnglish: "groupby region with agg sum revenue and nunique orders; sort_values for rank reports.",
      whatItDoes: "Weekly leaderboard tables for exec reviews.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on sorting and grouping with pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require sorting and grouping with pandas in notebooks or scripts.",
      stakeholderRole: "VP Sales",
      stakeholderQ: "Rank regions by net revenue with order counts.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply sorting and grouping with pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "df.groupby('region', as_index=False).agg(net_revenue=('net_revenue','sum')).sort_values('net_revenue', ascending=False)",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of sorting and grouping with pandas on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying sorting and grouping with pandas", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply sorting and grouping with pandas on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["groupby", "sort"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies sorting and grouping with pandas?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "sorting and grouping with pandas supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if sorting and grouping with pandas is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving sorting and grouping with pandas?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "groupby category summing net_revenue.",
      hint: "groupby and sum.",
      answer: "df.groupby(\"category\", as_index=False)[\"net_revenue\"].sum()",
      explanation: "Groupby produces subtotals."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Merging DataFrames",
    fields: {
      topic: "merging pandas DataFrames",
      plainEnglish: "merge orders to customers on customer_id like SQL LEFT JOIN enriching segment without losing rows.",
      whatItDoes: "Combine facts and dimensions before KPIs.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on merging pandas DataFrames when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require merging pandas dataframes in notebooks or scripts.",
      stakeholderRole: "Analytics Engineer",
      stakeholderQ: "Attach segment to orders without inflating revenue.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply merging pandas dataframes step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "enriched = orders.merge(customers, on='customer_id', how='left', validate='m:1')",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of merging pandas DataFrames on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying merging pandas dataframes", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply merging pandas DataFrames on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["merge", "join"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies merging pandas DataFrames?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "merging pandas DataFrames supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if merging pandas DataFrames is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving merging pandas DataFrames?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Left merge orders and customers on customer_id.",
      hint: "how='left'.",
      answer: "orders.merge(customers, on=\"customer_id\", how=\"left\")",
      explanation: "Left join preserves order grain."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Cleaning Missing and Duplicate Data",
    fields: {
      topic: "handling missing and duplicate data",
      plainEnglish: "drop_duplicates on order_id and fillna region protect Northstar revenue integrity.",
      whatItDoes: "Clean immediately after load.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on handling missing and duplicate data when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require handling missing and duplicate data in notebooks or scripts.",
      stakeholderRole: "Finance Controller",
      stakeholderQ: "Exclude duplicate transactions and flag missing cost.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply handling missing and duplicate data step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "df.drop_duplicates(subset=['order_id'], keep='first')\ndf['region'].fillna('Unknown')",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of handling missing and duplicate data on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying handling missing and duplicate data", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply handling missing and duplicate data on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["cleaning", "quality"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies handling missing and duplicate data?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "handling missing and duplicate data supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if handling missing and duplicate data is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving handling missing and duplicate data?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "drop_duplicates by order_id keep first.",
      hint: "subset and keep.",
      answer: "df.drop_duplicates(subset=[\"order_id\"], keep=\"first\")",
      explanation: "Deduping protects totals."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Working with Dates and Text",
    fields: {
      topic: "dates and text in pandas",
      plainEnglish: "dt accessors bucket weeks; str.strip and title clean category labels on Northstar exports.",
      whatItDoes: "Time series and normalized dimensions.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on dates and text in pandas when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require dates and text in pandas in notebooks or scripts.",
      stakeholderRole: "Merchandising Lead",
      stakeholderQ: "Sales by order week with fixed category spelling.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply dates and text in pandas step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "df['order_date']=pd.to_datetime(df['order_date'])\ndf['week']=df['order_date'].dt.isocalendar().week",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of dates and text in pandas on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying dates and text in pandas", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply dates and text in pandas on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["dates", "strings"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies dates and text in pandas?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "dates and text in pandas supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if dates and text in pandas is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving dates and text in pandas?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Create month column from order_date via .dt.month.",
      hint: "to_datetime then .dt.",
      answer: "df[\"month\"] = pd.to_datetime(df[\"order_date\"]).dt.month",
      explanation: "Date parts enable monthly reporting."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Exploratory Data Analysis",
    fields: {
      topic: "exploratory data analysis (EDA)",
      plainEnglish: "describe, value_counts, pivot_table, and corr profile Northstar orders before final charts.",
      whatItDoes: "Profile new datasets and validate cleaning.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on exploratory data analysis (EDA) when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require exploratory data analysis (eda) in notebooks or scripts.",
      stakeholderRole: "Director of Analytics",
      stakeholderQ: "What should we know about West returns spike before the board?",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply exploratory data analysis (eda) step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "df.describe()\ndf['region'].value_counts()\ndf.pivot_table(values='net_revenue', index='region', columns='category')",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of exploratory data analysis (EDA) on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying exploratory data analysis (eda)", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply exploratory data analysis (EDA) on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["eda", "profiling"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies exploratory data analysis (EDA)?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "exploratory data analysis (EDA) supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if exploratory data analysis (EDA) is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving exploratory data analysis (EDA)?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Name two methods for numeric summary and category frequency.",
      hint: "describe and value_counts.",
      answer: "df.describe(); df['region'].value_counts()",
      explanation: "EDA surfaces structure and quality."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Matplotlib Visualization",
    fields: {
      topic: "Matplotlib charts",
      plainEnglish: "Bar and line charts communicate Northstar monthly revenue and spend to executives.",
      whatItDoes: "Visualize aggregated DataFrames.",
      whyItMatters: "Junior Python analysts at Northstar Commerce rely on Matplotlib charts when refreshing orders, customers, and marketing pipelines for stakeholder reviews.",
      whenToUse: "When working on Northstar exports that require matplotlib charts in notebooks or scripts.",
      stakeholderRole: "CMO",
      stakeholderQ: "Monthly marketing spend vs revenue last year.",
      walkthrough: "1. Load or prepare sample Northstar data.\n2. Apply matplotlib charts step by step.\n3. Validate counts against a finance or ops control total.\n4. Document assumptions in notebook markdown.\n5. Export slice or chart if requested.\n6. Save reproducible script with dated filename.",
      syntax: "import matplotlib.pyplot as plt\nplt.bar(regions, revenue)\nplt.title('Net Revenue by Region')",
      componentBreakdown: [
        { part: "Core concept", explanation: "Foundation of Matplotlib charts on tabular business data." },
        { part: "Northstar data", explanation: "Orders, customers, products, or campaigns grain." },
        { part: "Validation", explanation: "Row counts and revenue totals vs control." },
        { part: "Stakeholder output", explanation: "Table, metric, or chart for decision makers." },
        { part: "Next step", explanation: "Feeds capstone Python Business Analysis Project." }
      ],
      sampleInput: "Sample Northstar orders or marketing export.",
      expectedOutput: "Correct metric or table matching control check.",
      commonMistakes: ["Skipping validation after applying matplotlib charts", "Mixing order grain and line-item grain", "Ignoring cancelled or test customer rows"],
      bestPractices: ["Write assertions on row count and revenue sum", "Keep metric definitions aligned with Finance", "Version control notebooks and raw file paths"],
      guidedExample: { description: "Apply Matplotlib charts on a West slice.", steps: ["Load sample", "Apply technique", "Validate total"] },
      tags: ["matplotlib", "charts"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies Matplotlib charts?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "Matplotlib charts supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if Matplotlib charts is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving Matplotlib charts?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "plt.bar two regions West and East with sample revenues.",
      hint: "pyplot bar.",
      answer: "import matplotlib.pyplot as plt\nplt.bar([\"West\", \"East\"], [1.2e6, 0.9e6])\nplt.title(\"Net Revenue by Region\")",
      explanation: "Charts compare regions clearly."
    },
  }),
  buildLesson({
    subjectId: 'python',
    subjectLabel: 'Python',
    projectName: 'Python Business Analysis Project',
    title: "Python Business Analysis Project",
    fields: {
      topic: "capstone Python analysis for Northstar",
      plainEnglish: "Capstone combines ingest, cleaning, merges, groupby, EDA, and Matplotlib into one reproducible Northstar notebook answering Sales, Marketing, and Finance questions.",
      whatItDoes: "Delivers portfolio-ready Python artifact with KPIs, charts, QA asserts, and README.",
      whyItMatters: "Hiring managers want proof you own the full workflow—not isolated syntax drills.",
      whenToUse: "After completing all Python lessons; interview walkthrough.",
      stakeholderRole: "Director of Analytics",
      stakeholderQ: "One notebook: regional revenue, category mix, campaign ROI, and data quality notes from raw files.",
      walkthrough: "1. Load orders, customers, products, marketing.\n2. Clean types, dupes, dates; merge with validate.\n3. KPIs: revenue, orders, AOV, spend, ROI.\n4. EDA memo and caveats.\n5. Charts: monthly trend, region bar.\n6. README with run steps and finance control totals.",
      syntax: "roi = (merged['net_revenue'].sum() - spend_total) / spend_total\nby_region = merged.groupby('region')['net_revenue'].sum()",
      componentBreakdown: [
        { part: "Ingest", explanation: "Documented read_csv/read_excel." },
        { part: "Transform", explanation: "Cleaning and merges with QA." },
        { part: "Metrics", explanation: "Shared KPI functions." },
        { part: "Communication", explanation: "Charts and bullet insights." },
        { part: "Reproducibility", explanation: "requirements.txt and paths." }
      ],
      sampleInput: "Full Northstar six-table bundle.",
      expectedOutput: "Notebook plus exports with validated totals.",
      commonMistakes: ["Skipping merge row-count QA", "Undocumented metric definitions", "No README for recruiters"],
      bestPractices: ["Match finance control totals", "Peer review checklist", "Tagged git release"],
      guidedExample: { description: "Regional revenue bar after merge.", steps: ["Merge", "groupby", "plot"] },
      tags: ["project", "capstone", "portfolio"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies capstone Python analysis for Northstar?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "capstone Python analysis for Northstar supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if capstone Python analysis for Northstar is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving capstone Python analysis for Northstar?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "List four sections your Northstar capstone notebook should include.",
      hint: "Ingest, clean, analyze, communicate.",
      answer: "Data ingest; cleaning and merge QA; KPI analysis; charts, insights, and README.",
      explanation: "Structured capstone mirrors real deliverables.", type: 'project'
    },
  }),
];
const statisticsLessons = [
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Populations, Samples, and Data Types",
    fields: {
      topic: "populations, samples, and data types",
      plainEnglish: "Population is all Northstar customers; sample is surveyed subset. Variables are numerical (revenue) or categorical (region).",
      whatItDoes: "Frame metrics with correct grain and variable type.",
      whyItMatters: "Statistics analysts at Northstar Commerce use populations, samples, and data types to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using populations, samples, and data types.",
      stakeholderRole: "Director of Research",
      stakeholderQ: "Are email survey respondents representative of all buyers?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for populations, samples, and data types.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "Population N=all customers; sample n=2,400 survey respondents; distinguish categorical region vs numeric revenue.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of populations, samples, and data types." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply populations, samples, and data types to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies populations, samples, and data types?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "populations, samples, and data types supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if populations, samples, and data types is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving populations, samples, and data types?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Define population and sample for Northstar customer satisfaction survey.",
      hint: "All customers vs respondents.",
      answer: "Population: all active Northstar customers in last 12 months; sample: 2,400 respondents from post-purchase email.",
      explanation: "Clear scope prevents overgeneralizing."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Mean, Median, and Mode",
    fields: {
      topic: "mean, median, and mode",
      plainEnglish: "Mean is average order value; median resists outlier VIP orders; mode is most common category purchased.",
      whatItDoes: "Summarize center of Northstar KPI distributions.",
      whyItMatters: "Statistics analysts at Northstar Commerce use mean, median, and mode to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using mean, median, and mode.",
      stakeholderRole: "VP Sales",
      stakeholderQ: "Did average order value rise or is one outlier skewing mean?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for mean, median, and mode.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "mean = sum/revenue orders; median middle value; mode most frequent category.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of mean, median, and mode." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply mean, median, and mode to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies mean, median, and mode?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "mean, median, and mode supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if mean, median, and mode is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving mean, median, and mode?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "When mean AOV exceeds median for Northstar, what might explain it?",
      hint: "High-value outliers.",
      answer: "A few very large orders pull the mean above the median.",
      explanation: "Median complements mean on skewed revenue."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Range and Interquartile Range",
    fields: {
      topic: "range and interquartile range",
      plainEnglish: "Range is max-min revenue day; IQR is middle 50% spread — robust to extreme promo days.",
      whatItDoes: "Describe volatility of daily Northstar sales.",
      whyItMatters: "Statistics analysts at Northstar Commerce use range and interquartile range to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using range and interquartile range.",
      stakeholderRole: "Finance Analyst",
      stakeholderQ: "How spread out are daily net revenue values this quarter?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for range and interquartile range.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "range = max - min; IQR = Q3 - Q1 from sorted daily totals.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of range and interquartile range." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply range and interquartile range to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies range and interquartile range?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "range and interquartile range supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if range and interquartile range is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving range and interquartile range?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "IQR uses which quartiles?",
      hint: "Q3 and Q1.",
      answer: "IQR = Q3 - Q1 (75th minus 25th percentile).",
      explanation: "IQR describes typical spread."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Variance and Standard Deviation",
    fields: {
      topic: "variance and standard deviation",
      plainEnglish: "Variance averages squared deviation from mean; std dev is same units as dollars for Northstar daily revenue.",
      whatItDoes: "Quantify variability for forecasts and risk.",
      whyItMatters: "Statistics analysts at Northstar Commerce use variance and standard deviation to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using variance and standard deviation.",
      stakeholderRole: "COO",
      stakeholderQ: "How much do daily orders vary week to week?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for variance and standard deviation.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "variance = sum((x-mean)^2)/(n-1); std = sqrt(variance)",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of variance and standard deviation." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply variance and standard deviation to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies variance and standard deviation?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "variance and standard deviation supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if variance and standard deviation is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving variance and standard deviation?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Std dev has same units as data—true or false?",
      hint: "True.",
      answer: "True — std dev is in dollars if revenue is in dollars.",
      explanation: "Units matter for interpretation."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Percentiles, Quartiles, and Outliers",
    fields: {
      topic: "percentiles, quartiles, and outliers",
      plainEnglish: "90th percentile order size; quartiles split sorted data; outliers may be fraud or bulk B2B orders.",
      whatItDoes: "Set thresholds for VIP programs and anomaly review.",
      whyItMatters: "Statistics analysts at Northstar Commerce use percentiles, quartiles, and outliers to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using percentiles, quartiles, and outliers.",
      stakeholderRole: "Risk Analyst",
      stakeholderQ: "What order value is exceeded only by top 10% of orders?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for percentiles, quartiles, and outliers.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "Q1 25th, Q2 median, Q3 75th; IQR rule for outliers.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of percentiles, quartiles, and outliers." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply percentiles, quartiles, and outliers to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies percentiles, quartiles, and outliers?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "percentiles, quartiles, and outliers supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if percentiles, quartiles, and outliers is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving percentiles, quartiles, and outliers?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "90th percentile means what?",
      hint: "90% at or below.",
      answer: "About 90% of orders are at or below that value.",
      explanation: "Percentiles define tail behavior."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Distributions and Normal Distribution",
    fields: {
      topic: "distributions and the normal distribution",
      plainEnglish: "Histogram of Northstar order sizes may be right-skewed; normal model approximates many aggregated means via CLT.",
      whatItDoes: "Choose methods assuming symmetry vs skew.",
      whyItMatters: "Statistics analysts at Northstar Commerce use distributions and the normal distribution to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using distributions and the normal distribution.",
      stakeholderRole: "Data Science Lead",
      stakeholderQ: "Can we use normal-based thresholds on raw order sizes?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for distributions and the normal distribution.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "Bell curve: mean±1σ ~68%; check skew before assuming normal.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of distributions and the normal distribution." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply distributions and the normal distribution to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies distributions and the normal distribution?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "distributions and the normal distribution supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if distributions and the normal distribution is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving distributions and the normal distribution?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Many individual revenue totals are often skewed—true or false?",
      hint: "True.",
      answer: "True — raw transaction amounts often right-skew; aggregates may be nearer normal.",
      explanation: "Distribution shape guides method choice."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Probability Fundamentals",
    fields: {
      topic: "probability fundamentals",
      plainEnglish: "Probability quantifies chance — e.g., 3.2% click-through on Northstar email if 320 clicks from 10,000 sends.",
      whatItDoes: "Size campaigns and reason about randomness.",
      whyItMatters: "Statistics analysts at Northstar Commerce use probability fundamentals to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using probability fundamentals.",
      stakeholderRole: "Marketing Manager",
      stakeholderQ: "If we send 50k emails at historical CTR, expected clicks?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for probability fundamentals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "P(A) between 0 and 1; independence assumptions matter.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of probability fundamentals." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply probability fundamentals to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies probability fundamentals?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "probability fundamentals supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if probability fundamentals is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving probability fundamentals?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "CTR 320/10000 as decimal.",
      hint: "Divide.",
      answer: "0.032 or 3.2%",
      explanation: "Proportions convert to probability."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Sampling and Sampling Bias",
    fields: {
      topic: "sampling and sampling bias",
      plainEnglish: "Convenience samples of website visitors miss offline buyers; biased samples mislead exec decisions.",
      whatItDoes: "Design surveys and A/B tests responsibly.",
      whyItMatters: "Statistics analysts at Northstar Commerce use sampling and sampling bias to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using sampling and sampling bias.",
      stakeholderRole: "Customer Insights Lead",
      stakeholderQ: "Post-purchase survey only—who is missing?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for sampling and sampling bias.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "Random sample reduces bias; document exclusion.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of sampling and sampling bias." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply sampling and sampling bias to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies sampling and sampling bias?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "sampling and sampling bias supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if sampling and sampling bias is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving sampling and sampling bias?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "One source of bias in post-purchase-only surveys.",
      hint: "Non-buyers excluded.",
      answer: "Non-purchasers and cancelled orders are underrepresented.",
      explanation: "Bias limits generalization."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Confidence Intervals",
    fields: {
      topic: "confidence intervals",
      plainEnglish: "95% CI for conversion rate gives range plausible for true Northstar rate given sample noise.",
      whatItDoes: "Report uncertainty not just point estimates.",
      whyItMatters: "Statistics analysts at Northstar Commerce use confidence intervals to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using confidence intervals.",
      stakeholderRole: "CMO",
      stakeholderQ: "Is 4.1% conversion significantly above 3.5% target given sample size?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for confidence intervals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "CI width shrinks with larger n.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of confidence intervals." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply confidence intervals to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies confidence intervals?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "confidence intervals supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if confidence intervals is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving confidence intervals?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Wider CI usually means what?",
      hint: "More uncertainty.",
      answer: "More uncertainty—often smaller sample or higher variability.",
      explanation: "CIs communicate precision."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Hypothesis Testing and A/B Testing",
    fields: {
      topic: "hypothesis testing and A/B testing",
      plainEnglish: "Test control vs new checkout layout on conversion with null hypothesis of no difference.",
      whatItDoes: "Run disciplined Northstar experiments.",
      whyItMatters: "Statistics analysts at Northstar Commerce use hypothesis testing and A/B testing to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using hypothesis testing and a/b testing.",
      stakeholderRole: "Product Manager",
      stakeholderQ: "Did new checkout raise conversion without hurting AOV?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for hypothesis testing and a/b testing.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "p-value vs alpha; define metric before peeking.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of hypothesis testing and A/B testing." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply hypothesis testing and A/B testing to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies hypothesis testing and A/B testing?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "hypothesis testing and A/B testing supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if hypothesis testing and A/B testing is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving hypothesis testing and A/B testing?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Null hypothesis in A/B test typically states what?",
      hint: "No difference.",
      answer: "No difference between control and variant on the chosen metric.",
      explanation: "Hypothesis framework prevents cherry-picking."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Correlation and Regression Fundamentals",
    fields: {
      topic: "correlation and regression fundamentals",
      plainEnglish: "Correlation measures linear association between spend and revenue; regression estimates slope for forecast lines.",
      whatItDoes: "Explore relationships—not causation—for planning.",
      whyItMatters: "Statistics analysts at Northstar Commerce use correlation and regression fundamentals to answer leadership with appropriate uncertainty and definitions.",
      whenToUse: "When summarizing Northstar metrics, experiments, or surveys using correlation and regression fundamentals.",
      stakeholderRole: "Finance Planner",
      stakeholderQ: "As marketing spend rises, does revenue rise linearly in our regions?",
      walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for correlation and regression fundamentals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
      syntax: "r in [-1,1]; simple regression y = a + bx.",
      componentBreakdown: [
        { part: "Definition", explanation: "Statistical meaning of correlation and regression fundamentals." },
        { part: "Northstar metric", explanation: "Orders, revenue, conversion, or survey scores." },
        { part: "Assumptions", explanation: "When the method is appropriate." },
        { part: "Interpretation", explanation: "Plain-language takeaway for execs." },
        { part: "Pitfalls", explanation: "Bias, outliers, and causation traps." }
      ],
      sampleInput: "Northstar sample or experiment data.",
      expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
      commonMistakes: ["Confusing sample with population", "Ignoring skew on revenue data", "Claiming causation from correlation alone"],
      bestPractices: ["Define metrics before analysis", "Report sample size n with every inference", "Pair point estimates with intervals when possible"],
      guidedExample: { description: "Apply correlation and regression fundamentals to West conversion sample.", steps: ["Define n", "Compute", "Interpret"] },
      tags: ["statistics", "northstar"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies correlation and regression fundamentals?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "correlation and regression fundamentals supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if correlation and regression fundamentals is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving correlation and regression fundamentals?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "High correlation proves spend causes revenue—true or false?",
      hint: "False.",
      answer: "False — correlation does not prove causation; confounders exist.",
      explanation: "Caution on causal claims."
    },
  }),
  buildLesson({
    subjectId: 'statistics',
    subjectLabel: 'Statistics',
    projectName: 'Statistics Business Analysis Project',
    title: "Statistics Business Analysis Project",
    fields: {
      topic: "capstone statistics business analysis",
      plainEnglish: "Capstone applies descriptive stats, probability, intervals, hypothesis tests, and regression storytelling on Northstar orders and experiments.",
      whatItDoes: "Produces memo with KPI summaries, A/B test readout, and correlation exploration with caveats.",
      whyItMatters: "Shows you communicate uncertainty and method limits—not spreadsheet averages only.",
      whenToUse: "After statistics track; portfolio supplement to Python capstone.",
      stakeholderRole: "Director of Analytics",
      stakeholderQ: "Summarize Q1 performance, email A/B outcome, and spend-revenue relationship with proper statistical language.",
      walkthrough: "1. Descriptive stats on regional revenue.\n2. Outlier and IQR review.\n3. Confidence interval on conversion.\n4. Hypothesis test on checkout A/B.\n5. Correlation spend vs revenue with caveats.\n6. Executive memo with recommendations.",
      syntax: "95% CI for proportion; two-sample test for A/B; r and simple regression slope on monthly spend vs revenue",
      componentBreakdown: [
        { part: "Descriptive layer", explanation: "Mean, median, spread, percentiles." },
        { part: "Inference", explanation: "CI and hypothesis tests." },
        { part: "Relationships", explanation: "Correlation/regression with limits." },
        { part: "Communication", explanation: "Memo for non-technical leaders." },
        { part: "Ethics", explanation: "Bias and causation warnings." }
      ],
      sampleInput: "Northstar Q1 orders sample plus A/B results export.",
      expectedOutput: "PDF or notebook memo with stats-backed recommendations.",
      commonMistakes: ["Peeking at A/B results early", "No sample size reported", "Overstating regression as causation"],
      bestPractices: ["Pre-register A/B metrics", "Show CI on key rates", "Separate exploration from confirmatory claims"],
      guidedExample: { description: "CI on email conversion.", steps: ["Compute p hat", "Build CI", "Interpret for CMO"] },
      tags: ["project", "capstone", "statistics"]
    },
    quiz: [
      { question: "When analyzing Northstar Commerce order exports, which task best applies capstone statistics business analysis?", options: ["Answering regional revenue and campaign questions", "Replacing the ecommerce platform overnight", "Designing warehouse floor layouts", "Writing vendor press releases only"], correctIndex: 0, explanation: "capstone statistics business analysis supports daily analytics on sales, customers, and marketing data." },
      { question: "What goes wrong if capstone statistics business analysis is applied to unclean Northstar data?", options: ["Stakeholders may act on incorrect counts or labels", "Python uninstalls itself", "CSV files become binary", "Charts automatically publish to social media"], correctIndex: 0, explanation: "Data quality issues amplify any analysis step." },
      { question: "Which Northstar teams most often request work involving capstone statistics business analysis?", options: ["Sales, Marketing, and Finance", "Facilities only", "Legal trademarks only", "Shipping carriers only"], correctIndex: 0, explanation: "Business stakeholders drive analyst priorities." }
    ],
    exercise: {
      instructions: "Name three analyses in the Statistics capstone memo.",
      hint: "Descriptive, experiment, relationship.",
      answer: "Regional revenue descriptive summary; A/B checkout hypothesis test with CI; spend-revenue correlation with causation caveat.",
      explanation: "Capstone ties methods to decisions.", type: 'project'
    },
  }),
];
writeSubjectFile({
  subjectId: 'python',
  exportPrefix: 'python',
  projectName: PYTHON_PROJECT,
  subjectLabel: 'Python',
  lessons: pythonLessons,
});

writeSubjectFile({
  subjectId: 'statistics',
  exportPrefix: 'statistics',
  projectName: STATS_PROJECT,
  subjectLabel: 'Statistics',
  lessons: statisticsLessons,
});
