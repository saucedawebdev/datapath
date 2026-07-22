export function validateQuizAnswer(question, answerIndex) {
  if (question.type === 'multiple-choice' || question.type === 'true-false') {
    return answerIndex === question.correctIndex;
  }
  if (question.type === 'multi-select') {
    if (!Array.isArray(answerIndex) || !Array.isArray(question.correctIndices)) return false;
    const sorted = [...answerIndex].sort();
    const expected = [...question.correctIndices].sort();
    return sorted.length === expected.length && sorted.every((v, i) => v === expected[i]);
  }
  return false;
}

export function scoreQuiz(questions, answers) {
  let score = 0;
  const results = questions.map((q, i) => {
    const correct = validateQuizAnswer(q, answers[i]);
    if (correct) score++;
    return { questionId: q.id, correct, explanation: q.explanation };
  });
  return { score, total: questions.length, percentage: questions.length ? score / questions.length : 0, results };
}
