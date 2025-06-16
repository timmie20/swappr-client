import { Question } from "@/types";

export function getQuestionBySlug(
  questions: Question[],
  slug: string,
): Question | undefined {
  return questions.find((q) => q.slug === slug);
}

export function getNextSlug(currentSlug: string, questions: Question[]) {
  const index = questions.findIndex((q) => q.slug === currentSlug);
  return questions[index + 1]?.slug || null;
}

// Validate required answer
// export function validateAnswer(question: Question, answer: any): string | null {
//   if (question.required && (!answer || answer.length === 0)) {
//     return "This field is required.";
//   }
//   return null;
// }

// Check if a question should be shown based on dependency logic
// export function shouldShowQuestion(
//   question: Question,
//   answers: Record<string, any>,
// ): boolean {
//   if (!question.dependsOn) return true;

//   const dependentAnswer = answers[question.dependsOn.id];
//   return dependentAnswer === question.dependsOn.value;
// }

// Calculate visible step count
// export function getVisibleSteps(
//   questions: Question[],
//   answers: Record<string, any>,
// ): Question[] {
//   return questions.filter((q) => shouldShowQuestion(q, answers));
// }
