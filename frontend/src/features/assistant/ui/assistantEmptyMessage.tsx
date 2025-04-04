import Image from "next/image";
import React from "react";

export const AssistantEmptyMessage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="flex items-center flex-col space-y-4">
        <Image
          src={"/icons/empty-message.svg"}
          alt="empty-message"
          className="h-32"
          width={128}
          height={128}
        />
        <p className="text-neutral-500">Пока нет сообщений</p>
      </section>
    </div>
  );
};
