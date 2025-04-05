import Image from "next/image";
import React, { useEffect, useState } from "react";

export const AssistantEmptyMessage = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Чем я могу помочь?";
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="flex items-center flex-col space-y-4">
        <Image
          src={"/image/empty-message.png"}
          alt="empty-message"
          className="object-cover"
          width={128}
          height={128}
        />
        <p className="text-white text-3xl font-semibold">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>
      </section>
    </div>
  );
};
