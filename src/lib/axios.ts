import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/lib/local-storage";

/**
 * Axios instance
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Refresh control flags
 */
let isRefreshing = false;

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * REQUEST INTERCEPTOR
 * Adds access token
 */
api.interceptors.request.use((config) => {
  const token = getStorageItem<string>("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * RESPONSE INTERCEPTOR
 * 401 → refresh → retry
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // if refresh endpoint itself gets 401 → logout
    if (originalRequest.url?.includes("/auth/refresh")) {
      handleLogout();
      return Promise.reject(error);
    }

    // infinite loop guard
    if (originalRequest._retry) {
      handleLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // queue if another refresh is in flight
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await api.post("/users/refresh");
      const newAccessToken = response.data.accessToken;

      setStorageItem("token", newAccessToken);
      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      handleLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

/**
 * Logout side-effect
 * No UI dependency
 */
function handleLogout() {
  removeStorageItem("token");
  removeStorageItem("user")

  // global event (listen if needed)
  window.dispatchEvent(new Event("auth:logout"));

  // redirect
  window.location.href = "/sign-in";
}
