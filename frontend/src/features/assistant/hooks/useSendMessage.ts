import { IMessage } from "@/entities/message/types/types";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useTransition } from "react";

export const useSendMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const [isPending, startTransition] = useTransition();

  const handleSendNewMessage = async ({
    content,
  }: {
    content: IMessage["content"];
  }) => {
    startTransition(() => {
      if (socket) {
        socket.send(JSON.stringify({ content }));
      }
    });
  };

  return {
    isPending,
    handleSendNewMessage,
  };
};
