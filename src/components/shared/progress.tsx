import React from "react";
import { Progress } from "antd";
import Image from "next/image";
import { useFormStore } from "@/store/form-store";

const ProgressBar = React.memo(function ProgressBar() {
  const progress = useFormStore((state) => state.progress);
  const prevStep = useFormStore((state) => state.prevStep);

  return (
    <div className="flex items-center gap-5">
      <Image
        src="/assets/icons/arrow-left.svg"
        alt="arrow left icon"
        width={13}
        height={22}
        className="size-auto cursor-pointer"
        onClick={prevStep}
      />
      <Progress
        percent={progress}
        showInfo={false}
        size={{ height: 12 }}
        strokeColor="#FFC918"
        status="active"
      />
    </div>
  );
});

export default ProgressBar;
