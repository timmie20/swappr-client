"use client";

import React, { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";

import useMeasure from "react-use-measure";
import { DamagesType } from "@/types";
import Selector from "./selector";
import { useFormStore } from "@/store/form-store";

export default function DamagesSelector() {
  const { currentQuestion } = useFormStore();
  const filter = false; // Filter functionality is disabled

  const options: DamagesType =
    currentQuestion?.options?.reduce(
      (acc, option) => ({
        ...acc,
        [option.label]: false,
      }),
      {},
    ) || {};

  const [values, setValues] = useState(options);

  const [ref, { height }] = useMeasure();

  return (
    <div className="w-full">
      <MotionConfig
        transition={{
          duration: 0.7,
          type: "spring",
          bounce: filter ? 0 : undefined,
        }}
      >
        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: height > 0 ? height : undefined }}
        >
          <motion.ul
            ref={ref}
            className="mt-4 flex w-full flex-wrap items-center justify-center gap-3 px-2"
          >
            <LayoutGroup>
              <AnimatePresence initial={false} mode="popLayout">
                {Object.entries(values)
                  .filter(([, value]) => !filter || value)
                  .map(([key, value]) => (
                    <Selector
                      key={key}
                      component={key}
                      isSelected={value}
                      setValues={setValues}
                      filter={filter}
                    />
                  ))}
              </AnimatePresence>
            </LayoutGroup>
          </motion.ul>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
