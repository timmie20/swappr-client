import React, { memo } from "react";
import { Card } from "antd";
import Image from "next/image";

const { Meta } = Card;

type Props = {
  device: {
    id: number;
    name: string;
    url: string;
    price: string;
  };
};

const DeviceCard = memo(({ device }: Props) => {
  // const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
  //   if (event.key === "Enter" || event.key === " ") {
  //     event.preventDefault();
  //     action();
  //   }
  // };

  // const handleClick = (id: number) => alert(`clicked ${id}`);

  return (
    <Card
      styles={{
        body: { padding: "8px" },
      }}
      hoverable
      // onClick={() => handleClick(device.id)}
      // onKeyDown={(e) => handleKeyPress(e, () => handleClick(device.id))}
      role="button"
      tabIndex={0}
      aria-label="Check worth"
    >
      <div className="bg-gray-light flex h-[320px] w-full items-center justify-center space-y-4 rounded-lg px-2">
        <Image
          src={device.url}
          alt={`${device.name} phone model`}
          priority={false}
          loading="lazy"
          width={200}
          height={254}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+ODhAQEA4QEBAPj4+ODg4ODg4ODg4ODj/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      <Meta
        style={{ margin: "12px 0", fontFamily: "var(--font-switzer)" }}
        title={device.name}
        description={`from ${device.price}`}
      />
    </Card>
  );
});

DeviceCard.displayName = "DeviceCard";

export default DeviceCard;
