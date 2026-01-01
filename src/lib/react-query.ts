import {
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>
> = UseMutationOptions<
  Awaited<ReturnType<MutationFnType>>,
  Error,
  Parameters<MutationFnType>[0]
> & {
  onSuccessMessage?: string;
  onErrorMessage?: string;
};

export type QueryConfig<QueryFnType extends (...args: any[]) => Promise<any>> =
  UseQueryOptions<Awaited<ReturnType<QueryFnType>>, Error>;

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
