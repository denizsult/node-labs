import type { AxiosRequestConfig } from "axios";

export type AuthRequestConfig = AxiosRequestConfig & {
  _skipAuthRefresh?: boolean;
};

export const withAuthSkip = (
  config: AxiosRequestConfig = {}
): AuthRequestConfig => ({
  ...config,
  _skipAuthRefresh: true,
});
