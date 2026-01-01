import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, Wallet } from "../types";

const getWallet = async ({
  signal,
}: QueryFunctionContext) => {
  const response = await api.get<ApiResponse<Wallet>>(
    "/financial/wallet",
    { signal }
  );
  return response.data.data;
};

export const useGetWallet = (config = {}) => {
  return useQuery<Wallet | undefined>({
    queryKey: ["useGetWallet"],
    queryFn: getWallet,
    ...config,
  });
};

