import { create } from "zustand";
import { questions } from "@/data/data";
import { getNextSlug, getQuestionBySlug } from "@/utils/formHelpers";
import { Question, Answer } from "@/types";

interface FormState {
  currentStep: number;
  answers: Record<string, Answer>;
  currentQuestion: Question | null;
  progress: number;
  direction: "forward" | "backward";

  // Actions
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  getCurrentProgress: () => number;
}

export const useFormStore = create<FormState>((set, get) => ({
  currentStep: 1,
  answers: {},
  currentQuestion: questions[0],
  progress: 10,
  direction: "forward",

  setAnswer: (questionId: string, value: string | string[]) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          value,
        },
      },
    }));
  },

  nextStep: () => {
    const { currentQuestion } = get();
    if (!currentQuestion) return;

    const nextSlug = getNextSlug(currentQuestion.slug, questions);
    if (!nextSlug) return;

    const nextQuestion = getQuestionBySlug(questions, nextSlug);
    if (!nextQuestion) return;

    set((state) => ({
      currentStep: state.currentStep + 1,
      currentQuestion: nextQuestion,
      progress: Math.round(((state.currentStep + 1) / questions.length) * 100),
      direction: "forward",
    }));
  },

  prevStep: () => {
    const { currentStep, currentQuestion } = get();
    if (!currentQuestion || currentStep <= 1) return;

    const prevQuestion = questions[currentStep - 2];
    if (!prevQuestion) return;

    set((state) => ({
      currentStep: state.currentStep - 1,
      currentQuestion: prevQuestion,
      progress: Math.round(((state.currentStep - 1) / questions.length) * 100),
      direction: "backward",
    }));
  },

  resetForm: () => {
    set({
      currentStep: 1,
      answers: {},
      currentQuestion: questions[0],
      progress: 0,
    });
  },

  getCurrentProgress: () => {
    const { currentStep } = get();
    return Math.round((currentStep / questions.length) * 100);
  },

  submitForm: () => {
    const { answers } = get();
    console.log(answers);
  },
}));
