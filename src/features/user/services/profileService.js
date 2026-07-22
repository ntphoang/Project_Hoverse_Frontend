import axiosClient from "@/api/axiosClient";

const profileService = {
  getUserProfile: async () => {
    const response = await axiosClient.get("/users/me");
    return response;
  },
};

export default profileService;
