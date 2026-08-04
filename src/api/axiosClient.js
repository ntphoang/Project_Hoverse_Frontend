import { useAuthStore } from "@/store";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8088/api/v1",
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
  (error) => {
    console.error("Lỗi từ Server: ", error.response?.data);
    return Promise.reject(error);
  },
);

export default axiosClient;
