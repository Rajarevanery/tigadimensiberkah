import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ILogin } from "../../types/types";
import { loginUser } from "../../api/AuthApi";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ILogin) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};
