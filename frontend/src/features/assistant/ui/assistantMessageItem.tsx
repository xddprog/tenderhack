import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { IMessage } from "@/entities/message/types/types";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useCopied } from "@/shared/hooks/useCopy";
import clsx from "clsx";
import {
  Bot,
  Check,
  Copy,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Wand2,
} from "lucide-react";
import React, { FC } from "react";

interface IAssistantMessageItem {
  message: IMessage;
}

const AssistantMessageItem: FC<IAssistantMessageItem> = ({ message }) => {
  const { handleCopyClick, isCopied, isPending } = useCopied();
  const isTyping = useAppSelector(messageSelectors.isTyping);

  return (
    <div
      className={clsx(
        "flex w-full items-start gap-2 mb-3",
        message.from_user ? "justify-end" : "justify-start"
      )}
    >
      {!message.from_user && (
        <div className="flex-shrink-0 pt-1">
          <div className="relative">
            <Bot className="h-5 w-5 text-blue-400" />
            {isTyping && (
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
            )}
          </div>
        </div>
      )}

      <div
        className={clsx(
          "max-w-[70%] min-w-[20%] px-4 py-3 rounded-2xl relative transition-all duration-200",
          "group break-words shadow-lg",
          message.from_user
            ? "bg-blue-500 text-white"
            : "bg-[#262626] text-white",
          isTyping && "ring-1 ring-blue-400"
        )}
      >
        <div className="whitespace-pre-wrap break-words relative">
          {message.text}
          {isTyping && (
            <span className="inline-block ml-1 h-3 w-1 bg-blue-400 animate-blink align-baseline" />
          )}
        </div>

        <div className="flex items-center justify-between mt-2 min-h-[20px]">
          {message.created_at && !isTyping && (
            <span
              className={clsx(
                "text-xs flex-shrink-0 transition-opacity",
                message.from_user ? "text-white/80" : "text-gray-500"
              )}
            >
              {message.created_at}
            </span>
          )}

          {isTyping && (
            <div className="flex items-center text-xs text-blue-400">
              <Wand2 className="h-3 w-3 mr-1 animate-pulse" />
              <span>Генерирую...</span>
            </div>
          )}

          {!isTyping && (
            <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
              <button
                disabled={isPending}
                value={message.text}
                aria-label="Копировать сообщение"
                className={clsx(
                  "p-1 rounded-full transition-all",
                  "opacity-0 group-hover:opacity-100",
                  "hover:bg-white/10 active:scale-90",
                  isPending && "cursor-not-allowed opacity-30"
                )}
                onClick={handleCopyClick}
              >
                {isCopied ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>

              {!message.from_user && (
                <>
                  <button
                    aria-label="Лайк"
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 active:scale-90"
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button
                    aria-label="Дизлайк"
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 active:scale-90"
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantMessageItem;
