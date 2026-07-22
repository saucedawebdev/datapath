/**
 * Job Ready Edition — Statistics lesson content, quizzes, and exercises.
 * Fictional business: Northstar Commerce
 */
export const statisticsLessonContent = {
  "statistics-lesson-populations-samples-and-data-types": {
    learningObjectives: [
      "Explain populations, samples, and data types in plain English using Northstar Commerce business examples",
      "Apply populations, samples, and data types to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with populations, samples, and data types and how to avoid them"
    ],
    plainEnglish: "Population is all Northstar customers; sample is surveyed subset. Variables are numerical (revenue) or categorical (region).",
    whatItDoes: "Frame metrics with correct grain and variable type.",
    whyItMatters: "Statistics analysts at Northstar Commerce use populations, samples, and data types to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using populations, samples, and data types.",
    stakeholderQuestion: "Director of Research at Northstar Commerce: \"Are email survey respondents representative of all buyers?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for populations, samples, and data types.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "Population N=all customers; sample n=2,400 survey respondents; distinguish categorical region vs numeric revenue.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of populations, samples, and data types."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply populations, samples, and data types to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-mean-median-and-mode": {
    learningObjectives: [
      "Explain mean, median, and mode in plain English using Northstar Commerce business examples",
      "Apply mean, median, and mode to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with mean, median, and mode and how to avoid them"
    ],
    plainEnglish: "Mean is average order value; median resists outlier VIP orders; mode is most common category purchased.",
    whatItDoes: "Summarize center of Northstar KPI distributions.",
    whyItMatters: "Statistics analysts at Northstar Commerce use mean, median, and mode to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using mean, median, and mode.",
    stakeholderQuestion: "VP Sales at Northstar Commerce: \"Did average order value rise or is one outlier skewing mean?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for mean, median, and mode.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "mean = sum/revenue orders; median middle value; mode most frequent category.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of mean, median, and mode."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply mean, median, and mode to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-range-and-interquartile-range": {
    learningObjectives: [
      "Explain range and interquartile range in plain English using Northstar Commerce business examples",
      "Apply range and interquartile range to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with range and interquartile range and how to avoid them"
    ],
    plainEnglish: "Range is max-min revenue day; IQR is middle 50% spread — robust to extreme promo days.",
    whatItDoes: "Describe volatility of daily Northstar sales.",
    whyItMatters: "Statistics analysts at Northstar Commerce use range and interquartile range to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using range and interquartile range.",
    stakeholderQuestion: "Finance Analyst at Northstar Commerce: \"How spread out are daily net revenue values this quarter?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for range and interquartile range.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "range = max - min; IQR = Q3 - Q1 from sorted daily totals.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of range and interquartile range."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply range and interquartile range to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-variance-and-standard-deviation": {
    learningObjectives: [
      "Explain variance and standard deviation in plain English using Northstar Commerce business examples",
      "Apply variance and standard deviation to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with variance and standard deviation and how to avoid them"
    ],
    plainEnglish: "Variance averages squared deviation from mean; std dev is same units as dollars for Northstar daily revenue.",
    whatItDoes: "Quantify variability for forecasts and risk.",
    whyItMatters: "Statistics analysts at Northstar Commerce use variance and standard deviation to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using variance and standard deviation.",
    stakeholderQuestion: "COO at Northstar Commerce: \"How much do daily orders vary week to week?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for variance and standard deviation.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "variance = sum((x-mean)^2)/(n-1); std = sqrt(variance)",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of variance and standard deviation."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply variance and standard deviation to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-percentiles-quartiles-and-outliers": {
    learningObjectives: [
      "Explain percentiles, quartiles, and outliers in plain English using Northstar Commerce business examples",
      "Apply percentiles, quartiles, and outliers to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with percentiles, quartiles, and outliers and how to avoid them"
    ],
    plainEnglish: "90th percentile order size; quartiles split sorted data; outliers may be fraud or bulk B2B orders.",
    whatItDoes: "Set thresholds for VIP programs and anomaly review.",
    whyItMatters: "Statistics analysts at Northstar Commerce use percentiles, quartiles, and outliers to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using percentiles, quartiles, and outliers.",
    stakeholderQuestion: "Risk Analyst at Northstar Commerce: \"What order value is exceeded only by top 10% of orders?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for percentiles, quartiles, and outliers.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "Q1 25th, Q2 median, Q3 75th; IQR rule for outliers.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of percentiles, quartiles, and outliers."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply percentiles, quartiles, and outliers to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-distributions-and-normal-distribution": {
    learningObjectives: [
      "Explain distributions and the normal distribution in plain English using Northstar Commerce business examples",
      "Apply distributions and the normal distribution to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with distributions and the normal distribution and how to avoid them"
    ],
    plainEnglish: "Histogram of Northstar order sizes may be right-skewed; normal model approximates many aggregated means via CLT.",
    whatItDoes: "Choose methods assuming symmetry vs skew.",
    whyItMatters: "Statistics analysts at Northstar Commerce use distributions and the normal distribution to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using distributions and the normal distribution.",
    stakeholderQuestion: "Data Science Lead at Northstar Commerce: \"Can we use normal-based thresholds on raw order sizes?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for distributions and the normal distribution.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "Bell curve: mean±1σ ~68%; check skew before assuming normal.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of distributions and the normal distribution."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply distributions and the normal distribution to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-probability-fundamentals": {
    learningObjectives: [
      "Explain probability fundamentals in plain English using Northstar Commerce business examples",
      "Apply probability fundamentals to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with probability fundamentals and how to avoid them"
    ],
    plainEnglish: "Probability quantifies chance — e.g., 3.2% click-through on Northstar email if 320 clicks from 10,000 sends.",
    whatItDoes: "Size campaigns and reason about randomness.",
    whyItMatters: "Statistics analysts at Northstar Commerce use probability fundamentals to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using probability fundamentals.",
    stakeholderQuestion: "Marketing Manager at Northstar Commerce: \"If we send 50k emails at historical CTR, expected clicks?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for probability fundamentals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "P(A) between 0 and 1; independence assumptions matter.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of probability fundamentals."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply probability fundamentals to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-sampling-and-sampling-bias": {
    learningObjectives: [
      "Explain sampling and sampling bias in plain English using Northstar Commerce business examples",
      "Apply sampling and sampling bias to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with sampling and sampling bias and how to avoid them"
    ],
    plainEnglish: "Convenience samples of website visitors miss offline buyers; biased samples mislead exec decisions.",
    whatItDoes: "Design surveys and A/B tests responsibly.",
    whyItMatters: "Statistics analysts at Northstar Commerce use sampling and sampling bias to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using sampling and sampling bias.",
    stakeholderQuestion: "Customer Insights Lead at Northstar Commerce: \"Post-purchase survey only—who is missing?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for sampling and sampling bias.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "Random sample reduces bias; document exclusion.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of sampling and sampling bias."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply sampling and sampling bias to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-confidence-intervals": {
    learningObjectives: [
      "Explain confidence intervals in plain English using Northstar Commerce business examples",
      "Apply confidence intervals to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with confidence intervals and how to avoid them"
    ],
    plainEnglish: "95% CI for conversion rate gives range plausible for true Northstar rate given sample noise.",
    whatItDoes: "Report uncertainty not just point estimates.",
    whyItMatters: "Statistics analysts at Northstar Commerce use confidence intervals to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using confidence intervals.",
    stakeholderQuestion: "CMO at Northstar Commerce: \"Is 4.1% conversion significantly above 3.5% target given sample size?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for confidence intervals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "CI width shrinks with larger n.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of confidence intervals."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply confidence intervals to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-hypothesis-testing-and-a-b-testing": {
    learningObjectives: [
      "Explain hypothesis testing and A/B testing in plain English using Northstar Commerce business examples",
      "Apply hypothesis testing and A/B testing to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with hypothesis testing and A/B testing and how to avoid them"
    ],
    plainEnglish: "Test control vs new checkout layout on conversion with null hypothesis of no difference.",
    whatItDoes: "Run disciplined Northstar experiments.",
    whyItMatters: "Statistics analysts at Northstar Commerce use hypothesis testing and A/B testing to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using hypothesis testing and a/b testing.",
    stakeholderQuestion: "Product Manager at Northstar Commerce: \"Did new checkout raise conversion without hurting AOV?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for hypothesis testing and a/b testing.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "p-value vs alpha; define metric before peeking.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of hypothesis testing and A/B testing."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply hypothesis testing and A/B testing to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-correlation-and-regression-fundamentals": {
    learningObjectives: [
      "Explain correlation and regression fundamentals in plain English using Northstar Commerce business examples",
      "Apply correlation and regression fundamentals to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with correlation and regression fundamentals and how to avoid them"
    ],
    plainEnglish: "Correlation measures linear association between spend and revenue; regression estimates slope for forecast lines.",
    whatItDoes: "Explore relationships—not causation—for planning.",
    whyItMatters: "Statistics analysts at Northstar Commerce use correlation and regression fundamentals to answer leadership with appropriate uncertainty and definitions.",
    whenToUse: "When summarizing Northstar metrics, experiments, or surveys using correlation and regression fundamentals.",
    stakeholderQuestion: "Finance Planner at Northstar Commerce: \"As marketing spend rises, does revenue rise linearly in our regions?\"",
    walkthrough: "1. Define population and metric for Northstar context.\n2. Compute descriptive or inferential stats for correlation and regression fundamentals.\n3. Check assumptions (sample size, skew, independence).\n4. Interpret in plain English for stakeholders.\n5. Note limitations and bias.\n6. Link to business action—not just the number.",
    syntax: "r in [-1,1]; simple regression y = a + bx.",
    componentBreakdown: [
      {
        part: "Definition",
        explanation: "Statistical meaning of correlation and regression fundamentals."
      },
      {
        part: "Northstar metric",
        explanation: "Orders, revenue, conversion, or survey scores."
      },
      {
        part: "Assumptions",
        explanation: "When the method is appropriate."
      },
      {
        part: "Interpretation",
        explanation: "Plain-language takeaway for execs."
      },
      {
        part: "Pitfalls",
        explanation: "Bias, outliers, and causation traps."
      }
    ],
    sampleInput: "Northstar sample or experiment data.",
    expectedOutput: "Statistic plus interpretation with uncertainty if applicable.",
    commonMistakes: [
      "Confusing sample with population",
      "Ignoring skew on revenue data",
      "Claiming causation from correlation alone"
    ],
    bestPractices: [
      "Define metrics before analysis",
      "Report sample size n with every inference",
      "Pair point estimates with intervals when possible"
    ],
    guidedExample: {
      description: "Apply correlation and regression fundamentals to West conversion sample.",
      steps: [
        "Define n",
        "Compute",
        "Interpret"
      ]
    },
    tags: [
      "statistics",
      "northstar"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  },
  "statistics-lesson-statistics-business-analysis-project": {
    learningObjectives: [
      "Explain capstone statistics business analysis in plain English using Northstar Commerce business examples",
      "Apply capstone statistics business analysis to answer a realistic stakeholder question at Northstar Commerce",
      "Identify common mistakes junior analysts make with capstone statistics business analysis and how to avoid them"
    ],
    plainEnglish: "Capstone applies descriptive stats, probability, intervals, hypothesis tests, and regression storytelling on Northstar orders and experiments.",
    whatItDoes: "Produces memo with KPI summaries, A/B test readout, and correlation exploration with caveats.",
    whyItMatters: "Shows you communicate uncertainty and method limits—not spreadsheet averages only.",
    whenToUse: "After statistics track; portfolio supplement to Python capstone.",
    stakeholderQuestion: "Director of Analytics at Northstar Commerce: \"Summarize Q1 performance, email A/B outcome, and spend-revenue relationship with proper statistical language.\"",
    walkthrough: "1. Descriptive stats on regional revenue.\n2. Outlier and IQR review.\n3. Confidence interval on conversion.\n4. Hypothesis test on checkout A/B.\n5. Correlation spend vs revenue with caveats.\n6. Executive memo with recommendations.",
    syntax: "95% CI for proportion; two-sample test for A/B; r and simple regression slope on monthly spend vs revenue",
    componentBreakdown: [
      {
        part: "Descriptive layer",
        explanation: "Mean, median, spread, percentiles."
      },
      {
        part: "Inference",
        explanation: "CI and hypothesis tests."
      },
      {
        part: "Relationships",
        explanation: "Correlation/regression with limits."
      },
      {
        part: "Communication",
        explanation: "Memo for non-technical leaders."
      },
      {
        part: "Ethics",
        explanation: "Bias and causation warnings."
      }
    ],
    sampleInput: "Northstar Q1 orders sample plus A/B results export.",
    expectedOutput: "PDF or notebook memo with stats-backed recommendations.",
    commonMistakes: [
      "Peeking at A/B results early",
      "No sample size reported",
      "Overstating regression as causation"
    ],
    bestPractices: [
      "Pre-register A/B metrics",
      "Show CI on key rates",
      "Separate exploration from confirmatory claims"
    ],
    guidedExample: {
      description: "CI on email conversion.",
      steps: [
        "Compute p hat",
        "Build CI",
        "Interpret for CMO"
      ]
    },
    tags: [
      "project",
      "capstone",
      "statistics"
    ],
    projectConnectionText: "Builds toward the Statistics Business Analysis Project using Northstar Commerce orders, customers, and marketing data."
  }
};

export const statisticsQuizzes = [
  {
    id: "statistics-lesson-populations-samples-and-data-types-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-populations-samples-and-data-types",
    questions: [
      {
        id: "statistics-lesson-populations-samples-and-data-types-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies populations, samples, and data types?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "populations, samples, and data types supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-populations-samples-and-data-types-q2",
        type: "multiple-choice",
        question: "What goes wrong if populations, samples, and data types is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-populations-samples-and-data-types-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving populations, samples, and data types?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-mean-median-and-mode-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-mean-median-and-mode",
    questions: [
      {
        id: "statistics-lesson-mean-median-and-mode-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies mean, median, and mode?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "mean, median, and mode supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-mean-median-and-mode-q2",
        type: "multiple-choice",
        question: "What goes wrong if mean, median, and mode is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-mean-median-and-mode-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving mean, median, and mode?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-range-and-interquartile-range-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-range-and-interquartile-range",
    questions: [
      {
        id: "statistics-lesson-range-and-interquartile-range-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies range and interquartile range?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "range and interquartile range supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-range-and-interquartile-range-q2",
        type: "multiple-choice",
        question: "What goes wrong if range and interquartile range is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-range-and-interquartile-range-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving range and interquartile range?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-variance-and-standard-deviation-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-variance-and-standard-deviation",
    questions: [
      {
        id: "statistics-lesson-variance-and-standard-deviation-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies variance and standard deviation?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "variance and standard deviation supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-variance-and-standard-deviation-q2",
        type: "multiple-choice",
        question: "What goes wrong if variance and standard deviation is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-variance-and-standard-deviation-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving variance and standard deviation?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-percentiles-quartiles-and-outliers-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-percentiles-quartiles-and-outliers",
    questions: [
      {
        id: "statistics-lesson-percentiles-quartiles-and-outliers-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies percentiles, quartiles, and outliers?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "percentiles, quartiles, and outliers supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-percentiles-quartiles-and-outliers-q2",
        type: "multiple-choice",
        question: "What goes wrong if percentiles, quartiles, and outliers is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-percentiles-quartiles-and-outliers-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving percentiles, quartiles, and outliers?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-distributions-and-normal-distribution-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-distributions-and-normal-distribution",
    questions: [
      {
        id: "statistics-lesson-distributions-and-normal-distribution-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies distributions and the normal distribution?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "distributions and the normal distribution supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-distributions-and-normal-distribution-q2",
        type: "multiple-choice",
        question: "What goes wrong if distributions and the normal distribution is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-distributions-and-normal-distribution-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving distributions and the normal distribution?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-probability-fundamentals-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-probability-fundamentals",
    questions: [
      {
        id: "statistics-lesson-probability-fundamentals-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies probability fundamentals?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "probability fundamentals supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-probability-fundamentals-q2",
        type: "multiple-choice",
        question: "What goes wrong if probability fundamentals is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-probability-fundamentals-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving probability fundamentals?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-sampling-and-sampling-bias-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-sampling-and-sampling-bias",
    questions: [
      {
        id: "statistics-lesson-sampling-and-sampling-bias-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies sampling and sampling bias?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "sampling and sampling bias supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-sampling-and-sampling-bias-q2",
        type: "multiple-choice",
        question: "What goes wrong if sampling and sampling bias is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-sampling-and-sampling-bias-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving sampling and sampling bias?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-confidence-intervals-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-confidence-intervals",
    questions: [
      {
        id: "statistics-lesson-confidence-intervals-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies confidence intervals?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "confidence intervals supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-confidence-intervals-q2",
        type: "multiple-choice",
        question: "What goes wrong if confidence intervals is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-confidence-intervals-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving confidence intervals?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-hypothesis-testing-and-a-b-testing-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-hypothesis-testing-and-a-b-testing",
    questions: [
      {
        id: "statistics-lesson-hypothesis-testing-and-a-b-testing-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies hypothesis testing and A/B testing?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "hypothesis testing and A/B testing supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-hypothesis-testing-and-a-b-testing-q2",
        type: "multiple-choice",
        question: "What goes wrong if hypothesis testing and A/B testing is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-hypothesis-testing-and-a-b-testing-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving hypothesis testing and A/B testing?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-correlation-and-regression-fundamentals-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-correlation-and-regression-fundamentals",
    questions: [
      {
        id: "statistics-lesson-correlation-and-regression-fundamentals-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies correlation and regression fundamentals?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "correlation and regression fundamentals supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-correlation-and-regression-fundamentals-q2",
        type: "multiple-choice",
        question: "What goes wrong if correlation and regression fundamentals is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-correlation-and-regression-fundamentals-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving correlation and regression fundamentals?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  },
  {
    id: "statistics-lesson-statistics-business-analysis-project-quiz",
    subjectId: "statistics",
    lessonId: "statistics-lesson-statistics-business-analysis-project",
    questions: [
      {
        id: "statistics-lesson-statistics-business-analysis-project-q1",
        type: "multiple-choice",
        question: "When analyzing Northstar Commerce order exports, which task best applies capstone statistics business analysis?",
        options: [
          "Answering regional revenue and campaign questions",
          "Replacing the ecommerce platform overnight",
          "Designing warehouse floor layouts",
          "Writing vendor press releases only"
        ],
        correctIndex: 0,
        explanation: "capstone statistics business analysis supports daily analytics on sales, customers, and marketing data."
      },
      {
        id: "statistics-lesson-statistics-business-analysis-project-q2",
        type: "multiple-choice",
        question: "What goes wrong if capstone statistics business analysis is applied to unclean Northstar data?",
        options: [
          "Stakeholders may act on incorrect counts or labels",
          "Python uninstalls itself",
          "CSV files become binary",
          "Charts automatically publish to social media"
        ],
        correctIndex: 0,
        explanation: "Data quality issues amplify any analysis step."
      },
      {
        id: "statistics-lesson-statistics-business-analysis-project-q3",
        type: "multiple-choice",
        question: "Which Northstar teams most often request work involving capstone statistics business analysis?",
        options: [
          "Sales, Marketing, and Finance",
          "Facilities only",
          "Legal trademarks only",
          "Shipping carriers only"
        ],
        correctIndex: 0,
        explanation: "Business stakeholders drive analyst priorities."
      }
    ]
  }
];

export const statisticsExercises = [
  {
    id: "statistics-lesson-populations-samples-and-data-types-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-populations-samples-and-data-types",
    title: "Apply: Populations, Samples, and Data Types",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Define population and sample for Northstar customer satisfaction survey.",
    hint: "All customers vs respondents.",
    expectedAnswer: "Population: all active Northstar customers in last 12 months; sample: 2,400 respondents from post-purchase email.",
    explanation: "Clear scope prevents overgeneralizing.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-mean-median-and-mode-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-mean-median-and-mode",
    title: "Apply: Mean, Median, and Mode",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "When mean AOV exceeds median for Northstar, what might explain it?",
    hint: "High-value outliers.",
    expectedAnswer: "A few very large orders pull the mean above the median.",
    explanation: "Median complements mean on skewed revenue.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-range-and-interquartile-range-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-range-and-interquartile-range",
    title: "Apply: Range and Interquartile Range",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "IQR uses which quartiles?",
    hint: "Q3 and Q1.",
    expectedAnswer: "IQR = Q3 - Q1 (75th minus 25th percentile).",
    explanation: "IQR describes typical spread.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-variance-and-standard-deviation-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-variance-and-standard-deviation",
    title: "Apply: Variance and Standard Deviation",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Std dev has same units as data—true or false?",
    hint: "True.",
    expectedAnswer: "True — std dev is in dollars if revenue is in dollars.",
    explanation: "Units matter for interpretation.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-percentiles-quartiles-and-outliers-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-percentiles-quartiles-and-outliers",
    title: "Apply: Percentiles, Quartiles, and Outliers",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "90th percentile means what?",
    hint: "90% at or below.",
    expectedAnswer: "About 90% of orders are at or below that value.",
    explanation: "Percentiles define tail behavior.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-distributions-and-normal-distribution-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-distributions-and-normal-distribution",
    title: "Apply: Distributions and Normal Distribution",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Many individual revenue totals are often skewed—true or false?",
    hint: "True.",
    expectedAnswer: "True — raw transaction amounts often right-skew; aggregates may be nearer normal.",
    explanation: "Distribution shape guides method choice.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-probability-fundamentals-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-probability-fundamentals",
    title: "Apply: Probability Fundamentals",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "CTR 320/10000 as decimal.",
    hint: "Divide.",
    expectedAnswer: "0.032 or 3.2%",
    explanation: "Proportions convert to probability.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-sampling-and-sampling-bias-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-sampling-and-sampling-bias",
    title: "Apply: Sampling and Sampling Bias",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "One source of bias in post-purchase-only surveys.",
    hint: "Non-buyers excluded.",
    expectedAnswer: "Non-purchasers and cancelled orders are underrepresented.",
    explanation: "Bias limits generalization.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-confidence-intervals-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-confidence-intervals",
    title: "Apply: Confidence Intervals",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Wider CI usually means what?",
    hint: "More uncertainty.",
    expectedAnswer: "More uncertainty—often smaller sample or higher variability.",
    explanation: "CIs communicate precision.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-hypothesis-testing-and-a-b-testing-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-hypothesis-testing-and-a-b-testing",
    title: "Apply: Hypothesis Testing and A/B Testing",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "Null hypothesis in A/B test typically states what?",
    hint: "No difference.",
    expectedAnswer: "No difference between control and variant on the chosen metric.",
    explanation: "Hypothesis framework prevents cherry-picking.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-correlation-and-regression-fundamentals-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-correlation-and-regression-fundamentals",
    title: "Apply: Correlation and Regression Fundamentals",
    type: "conceptual",
    difficulty: "beginner",
    instructions: "High correlation proves spend causes revenue—true or false?",
    hint: "False.",
    expectedAnswer: "False — correlation does not prove causation; confounders exist.",
    explanation: "Caution on causal claims.",
    validation: null,
    skillTags: []
  },
  {
    id: "statistics-lesson-statistics-business-analysis-project-exercise",
    subjectId: "statistics",
    lessonId: "statistics-lesson-statistics-business-analysis-project",
    title: "Apply: Statistics Business Analysis Project",
    type: "project",
    difficulty: "beginner",
    instructions: "Name three analyses in the Statistics capstone memo.",
    hint: "Descriptive, experiment, relationship.",
    expectedAnswer: "Regional revenue descriptive summary; A/B checkout hypothesis test with CI; spend-revenue correlation with causation caveat.",
    explanation: "Capstone ties methods to decisions.",
    validation: null,
    skillTags: []
  }
];
