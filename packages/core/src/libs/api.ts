import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useApi = axios.create({
  baseURL: __DEV__
    ? process.env.EXPO_PUBLIC_API_BASE || "http://localhost:3004"
    : process.env.EXPO_PUBLIC_API_BASE_PRODUCTION,
});

useApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("monorepoapp.auth.token");

    console.log("UseApi: URL: ", config.baseURL);
    console.log("UseApi: Path: ", config.url);

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type ApiResponseError = {
  message: string;
};

export const getAxiosErrorMessage = (err: any): string => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  if (err.response) {
    const errorAxios = err as AxiosError;

    if (process.env.NODE_ENV === "development") {
      console.log(errorAxios.response?.data);
    }

    const { message } = errorAxios.response?.data as ApiResponseError;

    if (message.includes("exp") && message.includes("timestamp")) {
      return "Sua sessão expirou, faça login e tente novamente...";
    }

    return message;
  }

  return err.message;
};
