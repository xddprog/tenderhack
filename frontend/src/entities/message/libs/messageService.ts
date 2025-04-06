import { axiosAuth } from "@/shared/api/baseQueryInstanse";
import { IMessage } from "@/entities/message/types/types";

class MessageService {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  public async reactionMessage({
    messageId,
    liked,
  }: {
    messageId: number;
    liked: boolean | null;
  }) {
    const { data } = await axiosAuth.post<Array<IMessage>>(
      `messages/${messageId}?like_or_dislike=${liked}`
    );
    return data;
  }
}

export const { reactionMessage } = MessageService.getInstance();
