import { getChatMessage } from "@/entities/chat/model/libs/chatService";
import { useActions } from "@/shared/hooks/useActions";

import { getAccessToken } from "@/entities/token/libs/tokenService";

export const useOpenChat = () => {
  const { setChatMessages, setCurrentChatId, setWebSocket } = useActions();

  const handleOpenChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const chatIds = event.currentTarget.value;
    if (!event.currentTarget.value) throw new Error("Invalid value");

    const messageHistory = await getChatMessage({
      chatId: event.currentTarget.value,
    });
    let currentSocket: WebSocket | null = null;
    setChatMessages(messageHistory);
    setCurrentChatId(chatIds);

    currentSocket = new WebSocket(
      `${`ws://89.104.68.181/api/v1/chat/${chatIds}?access_token=${getAccessToken()}`}`
    );

    currentSocket.onopen = () => {
      if (currentSocket) {
        setWebSocket(currentSocket);
      }
    };
  };

  return {
    handleOpenChat,
  };
};
