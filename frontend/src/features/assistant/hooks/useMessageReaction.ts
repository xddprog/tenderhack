import { reactionMessage } from "@/entities/message/libs/messageService";
import { useMutation } from "@tanstack/react-query";

export const useMessageReaction = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["liked-message"],
    mutationFn: ({
      messageId,
      liked,
    }: {
      messageId: number;
      liked: boolean | null;
    }) => reactionMessage({ messageId, liked }),
  });

  return {
    mutate,
    isPending,
  };
};
