import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { IMessage } from "@/entities/message/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useWebSocketEvents } from "@/shared/hooks/useSocketEvents";

export const useChatSocket = () => {
  const { setNewMessage, toggleTyping } = useActions();
  const messages = useAppSelector(messageSelectors.messages);

  useWebSocketEvents(
    "userMessage",
    ({ data }: { data: IMessage; event: string }) => {
      setNewMessage(data);
    }
  );

  useWebSocketEvents(
    "gptMessage",
    ({ data }: { data: IMessage; event: string }) => {
      setNewMessage(data);
      toggleTyping(true);
    }
  );

  useWebSocketEvents("gptMessageEnd", () => {
    toggleTyping(false);
  });

  return {
    messages,
  };
};
