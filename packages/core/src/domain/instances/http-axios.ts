import { AxiosRequestConfig } from "axios";

import { Http } from "../repositories/http";
import { useApi } from "../../libs/api";

export const httpAxios: Http = {
  get: async function <T>(
    path: string,
    params?: Record<string, any> | undefined,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response = await useApi.get(path, {
      ...config,
      params: params,
    });
    return response.data as T;
  },
  post: async function <T>(
    path: string,
    body?: Record<string, any> | undefined,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response = await useApi.post(path, { ...body }, { ...config });
    return response.data as T;
  },
  put: async function <T>(
    path: string,
    body?: Record<string, any> | undefined,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response = await useApi.put(path, { ...body }, { ...config });
    return response.data as T;
  },
  delete: async function <T>(
    path: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    const response = await useApi.delete(path, {
      ...config,
      params: params,
    });
    return response.data as T;
  },
};
