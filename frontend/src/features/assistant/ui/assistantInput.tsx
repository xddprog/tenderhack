"use client";

import { ArrowUp, Mic } from "lucide-react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import { Textarea } from "@/shared/ui/textarea/textarea";

export const AssistantInput = () => {
  const { handleSendNewMessage } = useSendMessage();

  const [message, setMessages] = useState("");

  const handleChangeMessage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessages(event.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    handleSendNewMessage({ content: message });
    setMessages("");
  }, [message, handleSendNewMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-4 pb-6 pt-0 max-w-3xl mx-auto w-full">
      <div className="relative flex items-center rounded-2xl border bg-white bg-zinc-800 shadow-sm border-zinc-700 focus-within:ring-1 focus-within:ring-blue-500">
        <Textarea
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleChangeMessage}
          placeholder="О чем хотите спросить?"
          className="resize-none text-white"
        />

        <button
          disabled={!message.trim()}
          onClick={handleSendMessage}
          className={`absolute right-2 bottom-2 p-1 rounded-full ${
            message.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
          } transition-colors`}
          aria-label="Отправить сообщение"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      <p className="text-xs text-center mt-2 text-zinc-500 dark:text-zinc-400">
        Нажмите Enter для отправки, Shift+Enter для новой строки
      </p>
    </div>
  );
};
