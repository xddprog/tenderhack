"use client";

import { useState, useTransition } from "react";

export const useCopied = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCopyClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    startTransition(async () => {
      try {
        const textToCopy = event.currentTarget.value;
        if (!textToCopy) throw new Error("Is empty copy value!");
        if (!navigator.clipboard) {
          throw new Error("Clipboard API not available");
        }
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Ошибка при копировании текста:", err);
        setIsCopied(false);
      }
    });
  };

  return {
    isCopied,
    isPending,
    handleCopyClick,
  };
};
