"use client";

import { useChatSocket } from "../hooks/useChatSocket";
import { AssistantContainer } from "./assistantContainer";
import { AssistantHeader } from "./assistantHeader";
import { AssistantInput } from "./assistantInput";
import { AssistantMessageList } from "./assistantMessageList";

export const AssistantChat = () => {
  const { messages } = useChatSocket();
  return (
    <AssistantContainer>
      <AssistantHeader />
      <AssistantMessageList messages={messages} />
      <AssistantInput />
    </AssistantContainer>
  );
};
