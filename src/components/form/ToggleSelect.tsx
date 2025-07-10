import React from "react";
import { useFormStore } from "@/store/form-store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "motion/react";

type ToggleSelectProps = {
  type: "single" | "multiple";
  labelLengthThreshold: number;
  direction: "forward" | "backward";
};

export default function ToggleSelect({
  type,
  labelLengthThreshold,
  direction,
}: ToggleSelectProps) {
  const { currentQuestion } = useFormStore();

  return (
    <ToggleGroup
      type={type}
      variant="outline"
      size="custom"
      className="grid w-full shrink-0 grid-cols-1 items-center justify-center gap-[20px] p-2 text-wrap data-[variant=outline]:shadow-none min-[460px]:grid-cols-2"
    >
      {currentQuestion?.options?.map((option, index) => (
        <motion.div
          key={option.label}
          whileTap={{ scale: 0.9 }}
          initial={{ y: direction === "forward" ? 60 : -60, opacity: 0.5 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 115,
              damping: 10,
              delay: index * 0.12,
            },
          }}
          exit={{
            y: direction === "forward" ? -60 : 60,
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 115,
              damping: 10,
              delay: index * 0.04,
            },
          }}
          layout
        >
          <ToggleGroupItem
            value={option.value}
            className={`active-state w-full rounded-[20px] ${
              option.label.length > labelLengthThreshold ? "sm:col-span-2" : ""
            }`}
          >
            <span className="text-medium font-semibold break-words">
              {option.label}
            </span>
          </ToggleGroupItem>
        </motion.div>
      ))}
    </ToggleGroup>
  );
}
