import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { type MutationConfig } from "@/lib/react-query";
import { toast } from "sonner";

export function useExtendedMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  config: UseMutationOptions<TData, TError, TVariables, TContext> &
    MutationConfig<(...args: any[]) => Promise<TData>>
) {
  return useMutation<TData, TError, TVariables, TContext>({
    ...config,
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (config.onSuccessMessage) {
        toast.success(config.onSuccessMessage);
      }

      await config?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      if (config.onErrorMessage) {
        toast.error(config.onErrorMessage);
      }
      return config?.onError?.(error, variables, onMutateResult, context);
    },
  });
}
