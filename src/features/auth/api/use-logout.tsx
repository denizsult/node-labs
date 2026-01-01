import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import { type MutationConfig } from "@/lib/react-query";

export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const useLogout = (config?: MutationConfig<typeof logout>) => {
  return useExtendedMutation({
    ...config,
    mutationFn: logout,
  });
};

