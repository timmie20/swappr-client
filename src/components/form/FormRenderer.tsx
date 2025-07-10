"use client";
import React from "react";
import Range from "@/components/form/range";
import ToggleSelect from "@/components/form/ToggleSelect";
import DamagesSelector from "@/components/form/damages-selector";
import { useFormStore } from "@/store/form-store";
// import { AnimatePresence, motion } from "motion/react";
import BoldLabel from "./label";

export default function FormRenderer() {
  const currentQuestion = useFormStore((s) => s.currentQuestion);
  const direction = useFormStore((s) => s.direction);

  const renderOpions = () => {
    switch (currentQuestion?.type) {
      case "select":
        return (
          <ToggleSelect
            type="multiple"
            labelLengthThreshold={15}
            direction={direction}
            // onAnswer={onAnswer}
          />
        );
      case "radio":
        return (
          <ToggleSelect
            type="single"
            labelLengthThreshold={20}
            direction={direction}
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
  };

  return (
    <div className="h-[60dvh] space-y-5 overflow-x-hidden overflow-y-auto min-[460px]:h-[45dvh]">
      {currentQuestion && (
        <div className="space-y-5">
          {/* <motion.label
              key={`label-${currentQuestion.id}`}
              initial={{ y: direction === "forward" ? 60 : -60, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction === "forward" ? -60 : 60, opacity: 0 }}
              className="font-inter text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
            >
              {currentQuestion.label}
            </motion.label>

            <motion.p
              key={`note-${currentQuestion.id}`}
              initial={{ y: direction === "forward" ? 60 : -60, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction === "forward" ? -60 : 60, opacity: 0 }}
              className="font-inter text-center text-sm text-slate-400"
            >
              {currentQuestion.note}
            </motion.p> */}

          <BoldLabel>{currentQuestion.label}</BoldLabel>
          <p className="font-inter text-center text-sm text-slate-400">
            {currentQuestion.note}
          </p>

          {renderOpions()}
        </div>
      )}
    </div>
  );
}
