"use client";
import React from "react";
import BoldLabel from "@/components/form/label";
import Image from "next/image";
import PrimaryButton from "@/components/others/PrimaryButton";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Confetti from "@/components/others/Confetti";
import DetailsDrawer from "@/components/others/DetailsDrawer";

export default function Client() {
  return (
    <>
      <Confetti />

      <div className="mx-auto mt-6 flex h-dvh max-w-[655px] flex-col items-center space-y-5 md:space-y-12">
        <div>
          <p className="text-center text-[15px] text-slate-400 sm:text-lg">
            Based on your selections and answers
          </p>
          <BoldLabel className="mt-2">
            <span className="text-tertiary/[28%]">
              Your Iphone 16 is worth{" "}
            </span>
            N999,000
          </BoldLabel>
        </div>

        <div className="bg-gray-light flex w-full items-center justify-center rounded-[20px] py-10 sm:max-w-[500px] sm:shrink-0">
          <Image
            src="/assets/images/iphone16.png"
            alt="image"
            width={230}
            height={281}
            className="h-auto w-auto"
          />
        </div>

        <DetailsDrawer />

        <div className="flex w-full items-center justify-center gap-5 px-3 sm:w-[80%]">
          <Button
            size="lg"
            className="flex-1 cursor-pointer rounded-full text-[15px] sm:flex-[3]"
            variant="custom"
          >
            Swap Phone
          </Button>
          <PrimaryButton
            type="primary"
            size="large"
            shape="round"
            className="flex-1"
          >
            Share
            <Share size={18} />
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
