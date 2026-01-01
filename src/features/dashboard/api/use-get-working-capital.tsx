import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, WorkingCapital } from "../types";
import type { QueryConfig } from "@/lib/react-query";

type GetWorkingCapitalParams = {
  period?: string;
};

const getWorkingCapital = async ({
  signal,
  queryKey,
}: QueryFunctionContext) => {
  const [, params] = queryKey as [string, GetWorkingCapitalParams?];
  const response = await api.get<ApiResponse<WorkingCapital>>(
    "/financial/working-capital",
    {
      params: {
        period: params?.period,
      },
      signal,
    }
  );
  return response.data.data;
};

export const useGetWorkingCapital = (
  params?: GetWorkingCapitalParams,
  config?: QueryConfig<typeof getWorkingCapital>
) => {
  return useQuery<WorkingCapital | undefined>({
    queryKey: ["useGetWorkingCapital", params],
    queryFn: getWorkingCapital,
    ...config,
  });
};

