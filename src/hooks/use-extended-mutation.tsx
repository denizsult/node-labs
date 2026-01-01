import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { type MutationConfig } from "@/lib/react-query";

export function useExtendedMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  config: UseMutationOptions<TData, TError, TVariables, TContext> &
    MutationConfig<(...args: any[]) => Promise<TData>>
) {
  return useMutation<TData, TError, TVariables, TContext>(config);
}

