import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import { type MutationConfig } from "@/lib/react-query";
import type { RegisterInput, RegisterResponse } from "../types";

export const register = async (payload: RegisterInput) => {
  const response = await api.post<RegisterResponse>(
    "/users/register",
    payload
  );
  return response.data;
};

export const useRegister = (
  config?: MutationConfig<typeof register>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: register,
  });
};

