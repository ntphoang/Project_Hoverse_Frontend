import { useAuthStore } from "@/store";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8088/api/v1",
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
    const update = useAuthStore.getState().update;

    const requestOld = error.config;

    if (error.response.status === 401 && !requestOld._retry) {
      requestOld._retry = true;

      try {
        const response = await axios.post("/api/v1/auth/refresh-token");

        update({ token: response.data.token });
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
