import React from "react";
import { Question } from "@/types";
import Range from "@/components/form/range";
import ToggleSelect from "@/components/form/ToggleSelect";
import DamagesSelector from "@/components/form/damages-selector";

interface FormRendererProps {
  question: Question;
  onAnswer: (value: string | string[]) => void;
}

export default function FormRenderer({
  question,
  // onAnswer,
}: FormRendererProps) {
  switch (question.type) {
    case "select":
      return (
        <ToggleSelect
          type="multiple"
          labelLengthThreshold={15}
          // onAnswer={onAnswer}
        />
      );
    case "radio":
      return (
        <ToggleSelect
          type="single"
          labelLengthThreshold={20}
          // onAnswer={onAnswer}
        />
      );
    case "range":
      return <Range />;
    case "damages":
      return <DamagesSelector />;
    default:
      return null;
  }
}
