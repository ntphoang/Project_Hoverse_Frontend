import axiosClient from "@/api/axiosClient";

const profileService = {
  getUserProfile: async () => {
    const response = await axiosClient.get("/users/me");
    return response;
  },

  updateUserProfile: async (formData) => {
    const response = await axiosClient.patch("/users/me", formData);
    return response;
  },

  uploadAvatar: async (formData) => {
    const response = await axiosClient.patch("/users/avatar", formData);
    return response;
  },
};

export default profileService;
