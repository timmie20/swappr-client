"use client";
import React, { useEffect } from "react";
import FormRenderer from "./FormRenderer";
import { useRouter } from "next/navigation";
import FormLayout from "@/layouts/form";
import { useFormStore } from "@/store/form-store";
import BoldLabel from "@/components/form/label";
import { Button } from "@/components/ui/button";

export default function FormStep() {
  const router = useRouter();

  const { currentQuestion, setAnswer, nextStep } = useFormStore();

  useEffect(() => {
    // Update URL when currentQuestion changes
    if (currentQuestion) {
      router.push(`/check-worth/form/${currentQuestion.slug}`);
    }
  }, [currentQuestion, router]);

  const handleNext = () => {
    nextStep();
  };

  if (!currentQuestion) return null;

  return (
    <FormLayout>
      <div className="relative pb-7">
        <div className="h-[60dvh] space-y-5 overflow-auto min-[460px]:h-[45dvh]">
          <BoldLabel>{currentQuestion?.label}</BoldLabel>

          <p className="font-inter text-center text-sm text-slate-400">
            {currentQuestion?.note}
          </p>

          <FormRenderer
            question={currentQuestion}
            onAnswer={(value) => setAnswer(currentQuestion.id, value)}
          />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-50 block h-20 bg-gradient-to-t from-white to-transparent blur-sm min-[460px]:hidden" />
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          className="h-16 w-[250px] cursor-pointer rounded-full text-white"
          onClick={handleNext}
          variant="custom"
        >
          OK
        </Button>
      </div>
    </FormLayout>
  );
}
