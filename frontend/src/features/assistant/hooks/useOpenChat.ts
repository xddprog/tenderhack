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
      `${
        process.env.NEXT_PUBLIC_WS_BASE_URL
      }${`chat/${chatIds}?access_token=${getAccessToken()}`}`
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
