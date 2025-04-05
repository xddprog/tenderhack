import { setAccessToken } from "@/entities/token/libs/tokenService";
import { registration } from "@/entities/user/libs/userService";
import { IRegistrationRequest } from "@/entities/user/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutate = () => {
  const { getCurrentUser } = useActions();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register mutate"],
    mutationFn: (requestBody: IRegistrationRequest) =>
      registration(requestBody),
    onSuccess: (token: string) => {
      setAccessToken(token);
      getCurrentUser();
    },
  });

  return {
    isRegisterPending: isPending,
    mutate,
  };
};
