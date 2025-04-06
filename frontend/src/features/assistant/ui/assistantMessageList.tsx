"use client";

import React, { FC } from "react";
import { useScrollBottom } from "@/shared/hooks/useScrollBottom";
import { AssistantEmptyMessage } from "./assistantEmptyMessage";
import { IMessage } from "@/entities/message/types/types";
import AssistantMessageItem from "./assistantMessageItem";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { Bot } from "lucide-react";

interface IAssistantMessageList {
  messages: Array<IMessage>;
}

export const AssistantMessageList: FC<IAssistantMessageList> = ({
  messages,
}) => {
  const isLoadingRepeat = useAppSelector(messageSelectors.isLoadingRepeat);
  const { contentRef } = useScrollBottom<number>([messages.length]);
  return (
    <div ref={contentRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl w-full h-full flex flex-col">
        <div className="flex-1 p-4 space-y-3 ">
          {!messages.length && <AssistantEmptyMessage />}
          {messages.map((message) => (
            <AssistantMessageItem key={message.id} message={message} />
          ))}
          {isLoadingRepeat && (
            <div className="flex w-full items-start gap-2 mb-3 justify-start">
              <div className="flex-shrink-0 pt-1">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <div className="max-w-[70%] min-w-[20%] px-4 py-3 rounded-2xl bg-[#262626] text-white shadow-lg transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div
                      className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-sm text-blue-400">
                    Модель генерирует ответ...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
