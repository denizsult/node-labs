import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, FinancialSummary } from "../types";

const getFinancialSummary = async ({
  signal,
}: QueryFunctionContext) => {
  const response = await api.get<ApiResponse<FinancialSummary>>(
    "/financial/summary",
    { signal }
  );
  return response.data.data;
};

export const useGetFinancialSummary = (config = {}) => {
  return useQuery<FinancialSummary | undefined>({
    queryKey: ["useGetFinancialSummary"],
    queryFn: getFinancialSummary,
    ...config,
  });
};

