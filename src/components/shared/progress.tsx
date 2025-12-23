"use client";
import React from "react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { useFormStore } from "@/store/form-store";
import { Button } from "../ui/button";

const ProgressBar = React.memo(function ProgressBar() {
  const progress = useFormStore((state) => state.progress);
  const prevStep = useFormStore((state) => state.prevStep);

  return (
    <div className="flex items-center gap-5">
      <Button
        variant="outline"
        size="icon"
        onClick={prevStep}
        className="cursor-pointer"
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="arrow left icon"
          width={13}
          height={22}
          className="size-auto"
          priority
        />
      </Button>
      <Progress value={progress} className="h-3" />
    </div>
  );
});

export default ProgressBar;
