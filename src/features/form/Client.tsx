"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/form-store";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import FormRenderer from "@/components/form/FormRenderer";

export default function FormStep() {
  const router = useRouter();

  const currentQuestion = useFormStore((s) => s.currentQuestion);
  const nextStep = useFormStore((s) => s.nextStep);

  useEffect(() => {
    if (currentQuestion) {
      router.replace(`/check-worth/form?slug=${currentQuestion.slug}`);
    }
  }, [currentQuestion, router]);

  const handleNext = () => {
    nextStep();
  };

  if (!currentQuestion) return null;

  return (
    <>
      <div className="relative pb-7">
        <FormRenderer />
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-50 block h-20 bg-gradient-to-t from-white to-transparent blur-sm min-[460px]:hidden" />
      </div>
      <div className="mt-6 flex justify-center">
        <motion.div
          className="h-16 w-[250px] cursor-pointer rounded-full text-white"
          whileTap={{ scale: 0.8 }}
        >
          <Button
            className="h-full w-full"
            onClick={handleNext}
            variant="custom"
            type="button"
          >
            OK
          </Button>
        </motion.div>
      </div>
    </>
  );
}
