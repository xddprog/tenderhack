"use client";

import React, { FC } from "react";
import { useScrollBottom } from "@/shared/hooks/useScrollBottom";
import { AssistantEmptyMessage } from "./assistantEmptyMessage";
import { IMessage } from "@/entities/message/types/types";
import AssistantMessageItem from "./assistantMessageItem";

interface IAssistantMessageList {
  messages: Array<IMessage>;
}

export const AssistantMessageList: FC<IAssistantMessageList> = ({
  messages,
}) => {
  const { contentRef } = useScrollBottom<number>([messages.length]);
  return (
    <div ref={contentRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl w-full h-full flex flex-col">
        <div className="flex-1 p-4 space-y-3 ">
          {!messages.length && <AssistantEmptyMessage />}
          {messages.map((message) => (
            <AssistantMessageItem key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};
