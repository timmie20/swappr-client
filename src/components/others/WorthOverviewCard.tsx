import Image from "next/image";
import React from "react";

export default function WorthOverviewCard() {
  return (
    <div className="flex w-full flex-col gap-5 sm:flex-row">
      <div className="bg-gray-light flex w-full items-center justify-center rounded-[20px] py-4 sm:max-w-[409px] sm:shrink-0">
        <Image
          src="/assets/images/iphone16.png"
          alt="image"
          width={230}
          height={281}
          className="h-auto w-auto"
        />
      </div>

      <div className="space-y-2 sm:space-y-3 sm:self-end">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex flex-col">
            <span className="text-tertiary/[42%] text-sm font-medium tracking-tight">
              Brand
            </span>
            <span className="text-tertiary text-base font-medium tracking-tight">
              Apple
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-tertiary/[42%] text-sm font-medium tracking-tight">
              Model
            </span>
            <span className="text-tertiary text-base font-medium tracking-tight">
              Iphone 16
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-tertiary/[42%] text-sm font-medium tracking-tight">
            From
          </span>
          <span className="text-tertiary text-3xl font-semibold tracking-tight sm:text-3xl">
            N 950,000.00
          </span>
        </div>
      </div>
    </div>
  );
}
