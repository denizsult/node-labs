import { api } from "@/lib/axios";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import type { ApiResponse, ScheduledTransfers } from "../types";

const getScheduledTransfers = async ({
  signal,
}: QueryFunctionContext) => {
  const response = await api.get<ApiResponse<ScheduledTransfers>>(
    "/financial/transfers/scheduled",
    { signal }
  );
  return response.data.data;
};

export const useGetScheduledTransfers = (config = {}) => {
  return useQuery<ScheduledTransfers | undefined>({
    queryKey: ["useGetScheduledTransfers"],
    queryFn: getScheduledTransfers,
    ...config,
  });
};

