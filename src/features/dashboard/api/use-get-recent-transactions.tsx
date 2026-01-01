import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, RecentTransactions } from "../types";

type GetRecentTransactionsParams = {
  limit?: number;
};

const getRecentTransactions = async ({
  signal,
  queryKey,
}: QueryFunctionContext) => {
  const [, params] = queryKey as [string, GetRecentTransactionsParams?];
  const response = await api.get<ApiResponse<RecentTransactions>>(
    "/financial/transactions/recent",
    {
      params: {
        limit: params?.limit,
      },
      signal,
    }
  );
  return response.data.data;
};

export const useGetRecentTransactions = (
  params?: GetRecentTransactionsParams,
  config = {}
) => {
  return useQuery<RecentTransactions | undefined>({
    queryKey: ["useGetRecentTransactions", params],
    queryFn: getRecentTransactions,
    ...config,
  });
};

