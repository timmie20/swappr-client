"use client";
import WorthOverviewCard from "@/components/others/WorthOverviewCard";
import PrimaryButton from "@/components/others/PrimaryButton";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { questions } from "@/data/data";

const variants = [
  { id: 1, space: "64gb", isSelected: false },
  { id: 2, space: "128gb", isSelected: false },
  { id: 3, space: "256gb", isSelected: true },
  { id: 4, space: "512gb", isSelected: false },
  { id: 5, space: "1TB", isSelected: false },
];

export default function Client() {
  const [storageVariants, setStorageVariants] = useState(variants);

  const handleSelect = (id: number) => {
    setStorageVariants((prevVariants) =>
      prevVariants.map((variant) => ({
        ...variant,
        isSelected: variant.id === id,
      })),
    );
  };

  return (
    <div className="mx-auto mt-6 max-w-[655px] space-y-5 md:space-y-10">
      <div className="bg-yellow-light/10 mx-auto flex h-fit w-full max-w-[655px] items-center gap-2 rounded-lg py-2">
        <Image
          src="../assets/icons/Vector.svg"
          alt="Warning icon"
          width={16}
          height={16}
          className="ml-4"
        />
        <span className="text-xs font-medium text-[#9C7E1C]">
          We&apos;re going to ask you a couple of questions to estimate how much
          your phone&apos;s worth. This&apos;ll only take 3mins :)
        </span>
      </div>

      <WorthOverviewCard />

      <div className="space-y-4">
        <h3 className="text-tertiary/[48%] text-xl">
          Available storage for this model
        </h3>
        <p className="text-[15px]">
          Choose your device&apos;s storage capacity below. The estimated value
          will automatically adjust based on your selection.
        </p>

        <div className="flex flex-wrap gap-3 overflow-hidden px-1 py-2">
          {storageVariants.map((variant) => (
            <PrimaryButton
              key={variant.id}
              type={variant.isSelected ? "primary" : "default"}
              size="large"
              shape="round"
              onClick={() => handleSelect(variant.id)}
            >
              {variant.space}
            </PrimaryButton>
          ))}
        </div>
      </div>

      <Link href={`/check-worth/form/${questions[0].slug}`}>
        <PrimaryButton
          type="primary"
          size="large"
          shape="round"
          fullWidth
          className=""
        >
          Check your phones worth{" "}
        </PrimaryButton>
      </Link>
    </div>
  );
}
