import axios, {
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import config from "../configs/config";

export const apiClient = axios.create({
    baseURL: `${config.publicAPI}`,
    timeout: 10000,
});
export const postConfig = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
    } as RawAxiosRequestHeaders,
  };
  return config
}