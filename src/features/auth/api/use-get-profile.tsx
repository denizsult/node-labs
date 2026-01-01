import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, UserResponse } from "../types";

export const getProfile = async () => {
  const response = await api.get<ApiResponse<UserResponse>>("/users/profile");
  return response.data.data;
};

export const useGetProfile = (config = {}) => {
  return useQuery<UserResponse | undefined>({
    queryKey: ["useGetProfile"],
    queryFn: getProfile,
    ...config,
  });
};
