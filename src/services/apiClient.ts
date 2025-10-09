import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import config from "../configs/config";

export const apiClient = axios.create({
    baseURL: `${config.publicAPI}`,
    timeout: 10000,
});