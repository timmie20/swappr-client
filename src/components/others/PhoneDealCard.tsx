"use client";
import React, { memo } from "react";
import { Card, Badge } from "antd";
import Image from "next/image";
import { ArrowRightLeft, DollarSign, PanelBottomOpen } from "lucide-react";

const { Meta } = Card;

type DealProps = {
  deal: {
    id: number;
    name: string;
    url: string;
    price: string;
  };
};

const PhoneDealCard = memo(({ deal }: DealProps) => {
  const handleBuy = (name: string) => {
    alert(` buy ${name}`);
  };

  const handleSwap = () => {
    // Swap functionality to be implemented
  };

  const handleOpen = () => {
    // Open functionality to be implemented
  };

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <Card
      styles={{
        body: { padding: "8px" },
      }}
      hoverable
      actions={[
        <div
          key="swap"
          className="flex cursor-pointer items-center justify-center gap-1"
          onClick={handleSwap}
          onKeyDown={(e) => handleKeyPress(e, handleSwap)}
          role="button"
          tabIndex={0}
          aria-label="Swap phone"
        >
          <span>Swap</span>
          <ArrowRightLeft size={18} color="#ff5492" />
        </div>,
        <div
          key="buy"
          className="flex cursor-pointer items-center justify-center gap-1"
          onClick={() => handleBuy(deal.name)}
          onKeyDown={(e) => handleKeyPress(e, () => handleBuy(deal.name))}
          role="button"
          tabIndex={0}
          aria-label="Buy phone"
        >
          <span>Buy</span>
          <DollarSign size={18} color="green" />
        </div>,
        <div
          key="open"
          className="flex cursor-pointer items-center justify-center gap-1"
          onClick={handleOpen}
          onKeyDown={(e) => handleKeyPress(e, handleOpen)}
          role="button"
          tabIndex={0}
          aria-label="Open details"
        >
          <span>Details</span>
          <PanelBottomOpen size={18} color="#08161f" />
        </div>,
      ]}
    >
      <Badge.Ribbon color="red" text="HOT" style={{ fontSize: "12px" }}>
        <div className="bg-gray-light h-[320px] w-full space-y-4 rounded-lg px-2 py-1">
          <div className="text-tertiary text-xsmall border-tertiary/10 flex h-8 max-w-fit items-center justify-center rounded-full border-[1px] bg-white px-4 py-2 text-center font-medium tracking-tighter">
            <span>Iphone</span>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={deal.url}
              alt={`${deal.name} phone model`}
              priority={false}
              loading="lazy"
              width={200}
              height={254}
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+ODhAQEA4QEBAPj4+ODg4ODg4ODg4ODj/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </div>
      </Badge.Ribbon>
      <Meta
        // avatar={
        //   <Avatar src="https://api.dicebear.com/9.x/adventurer/svg?seed=5" />
        // }
        style={{ margin: "12px 0", fontFamily: "var(--font-switzer)" }}
        title={deal.name}
        description={`from ${deal.price}`}
      />
    </Card>
  );
});

PhoneDealCard.displayName = "PhoneDealCard";

export default PhoneDealCard;
