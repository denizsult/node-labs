import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import { type MutationConfig } from "@/lib/react-query";
import type { RefreshTokenResponse } from "../types";

/**
 * Uses the httpOnly refresh token cookie to issue a new access token.
 * The refresh token is automatically sent via httpOnly cookie with withCredentials: true.
 */
export const refreshToken = async () => {
  const response = await api.post<RefreshTokenResponse>("/users/refresh-token");
  return response.data;
};

export const useRefreshToken = (
  config?: MutationConfig<typeof refreshToken>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: refreshToken,
  });
};

