import { IMessage } from "@/entities/message/types/types";
import clsx from "clsx";
import React, { FC } from "react";

interface IAssistantMessageItem {
  message: IMessage;
}

const AssistantMessageItem: FC<IAssistantMessageItem> = ({ message }) => {
  return (
    <div
      className={clsx(
        `flex w-full items-center`,
        message.is_sent_by_user ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          `max-w-[70%] px-4 py-1 rounded-2xl  leading-relaxed`,
          message.is_sent_by_user
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-[#262626] text-white shadow-lg"
        )}
      >
        {message.content}
        {message.created_at && (
          <span
            className={clsx(
              `block text-xs text-right`,
              message.is_sent_by_user ? "text-white" : "text-gray-500"
            )}
          >
            {message.created_at}
          </span>
        )}
      </div>
    </div>
  );
};

export default AssistantMessageItem;
