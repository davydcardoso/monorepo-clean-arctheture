import { AxiosRequestConfig } from "axios";

export interface Http {
  get: <T>(
    path: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  post: <T>(
    path: string,
    body?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  put: <T>(
    path: string,
    body?: Record<string, any>,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  delete: <T>(
    path: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => Promise<T>;
}
