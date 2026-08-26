import { useAuthStore } from "@/store";
import axios from "axios";

const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const setToken = useAuthStore.getState().setToken;

    const requestOld = error.config;

    const isAuthRequest =
      requestOld.url?.includes("/auth/login") ||
      requestOld.url?.includes("/auth/register") ||
      requestOld.url?.includes("/auth/refresh-token");

    // Chỉ refresh token khi request không phải auth request
    if (
      error.response?.status === 401 &&
      !requestOld._retry &&
      !isAuthRequest
    ){
      requestOld._retry = true;

      try {
        const response = await axiosRefresh.post("/auth/refresh-token");
        const newToken = response.data.token;
        setToken(newToken);
        requestOld.headers.Authorization = `Bearer ${response.data.token}`;

        return axiosClient(requestOld);
      } catch (refreshError) {
        useAuthStore.getState().logout();

        return Promise.reject(refreshError);
      }
    }

    console.error("Lỗi từ Server: ", error.response?.data);
    return Promise.reject(error);
  },
);

export default axiosClient;
