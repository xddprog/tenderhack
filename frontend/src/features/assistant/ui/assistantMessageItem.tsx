import { IMessage } from "@/entities/message/types/types";
import { useCopied } from "@/shared/hooks/useCopy";
import clsx from "clsx";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { FC } from "react";

interface IAssistantMessageItem {
  message: IMessage;
}

const AssistantMessageItem: FC<IAssistantMessageItem> = ({ message }) => {
  const { handleCopyClick, isCopied, isPending } = useCopied();

  return (
    <div
      className={clsx(
        `flex w-full items-center`,
        message.from_user ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          `max-w-[70%] min-w-[20%] px-4 group py-2 rounded-2xl leading-relaxed break-words relative`,
          message.from_user
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-[#262626] text-white shadow-lg"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{message.text}</div>

        <div className="flex items-center justify-between mt-1">
          {message.created_at && (
            <span
              className={clsx(
                `text-xs flex-shrink-0`,
                message.from_user ? "text-white/80" : "text-gray-500"
              )}
            >
              {message.created_at}
            </span>
          )}

          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            {message.from_user ? (
              <button
                disabled={isPending}
                aria-label="Копировать сообщение"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                onClick={handleCopyClick}
                value={message.text}
              >
                {isCopied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            ) : (
              <>
                <button
                  disabled={isPending}
                  aria-label="Копировать сообщение"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                  onClick={handleCopyClick}
                  value={message.text}
                >
                  {isCopied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
                <button
                  aria-label="Лайк"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                >
                  <ThumbsUp className="h-3 w-3" />
                </button>
                <button
                  aria-label="Дизлайк"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                >
                  <ThumbsDown className="h-3 w-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessageItem;
