import axiosClient from "@/api/axiosClient";

const verifyService = {
  verifyEmail: async (token) => {
    const response = await axiosClient.post(`/auth/verify-email?token=${token}`);
    return response;
  },
};

export default verifyService;
