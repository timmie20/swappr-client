export type Option = {
  label: string;
  value: string;
};

export type Dependency = {
  id: string;
  value: string;
};

export type Question = {
  id: string;
  label: string;
  slug: string;
  type: "text" | "radio" | "select" | "multi-select" | "range" | "damages";
  required?: boolean;
  options?: Option[];
  dependsOn?: Dependency;
  note?: string;
};

export type QuestionsType = {
  questions: Question[];
};

export type Answer = {
  questionId: string;
  value: string | string[];
};

export type DamagesType = Record<string, boolean>;
