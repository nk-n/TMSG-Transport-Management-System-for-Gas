import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import config from "../configs/config";
import { getCookies } from "../middleware/cookies";

export const apiClient = axios.create({
  baseURL: `${config.publicAPI}`,
  timeout: 10000,
});
export const postConfig = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
    } as RawAxiosRequestHeaders,
  };
  return config;
};

// Request Interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // อย่าแนบ token ใน public routes
    const publicRoutes = ["/auth/signin"];
    if (publicRoutes.some((route) => config.url?.includes(route))) {
      return config;
    }

    // แนบ token ใน protected routes
    const jwt: string = await getCookies("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
