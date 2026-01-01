import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import { type MutationConfig } from "@/lib/react-query";
import type { LoginInput, LoginResponse } from "../types";

export const login = async (payload: LoginInput) => {
  const response = await api.post<LoginResponse>(
    "/users/login",
    payload
  );
  return response.data;
};

export const useLogin = (config?: MutationConfig<typeof login>) => {
  return useExtendedMutation({
    ...config,
    mutationFn: login,
  });
};

