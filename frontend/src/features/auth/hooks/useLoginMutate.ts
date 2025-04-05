import { setAccessToken } from "@/entities/token/libs/tokenService";
import { authorization } from "@/entities/user/libs/userService";
import { IAuthorizationRequest } from "@/entities/user/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutate = () => {
  const { getCurrentUser } = useActions();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login mutate"],
    mutationFn: (requestBody: IAuthorizationRequest) =>
      authorization(requestBody),
    onSuccess: (token: string) => {
      setAccessToken(token);
      getCurrentUser();
    },
  });

  return {
    isLoginPending: isPending,
    mutate,
  };
};
