import React from "react";
import { useFormStore } from "@/store/form-store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ToggleSelectProps = {
  type: "single" | "multiple";
  labelLengthThreshold: number;
};

export default function ToggleSelect({
  type,
  labelLengthThreshold,
}: ToggleSelectProps) {
  const { currentQuestion } = useFormStore();

  return (
    <ToggleGroup
      type={type}
      variant="outline"
      size="custom"
      className="grid w-full shrink-0 grid-cols-1 items-center justify-center gap-[20px] data-[variant=outline]:shadow-none min-[460px]:grid-cols-2"
    >
      {currentQuestion?.options?.map((option) => (
        <ToggleGroupItem
          value={option.value}
          key={option.label}
          className={`active-state w-full rounded-[20px] ${
            option.label.length > labelLengthThreshold ? "sm:col-span-2" : ""
          }`}
        >
          <span className="text-medium font-semibold break-words">
            {option.label}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
