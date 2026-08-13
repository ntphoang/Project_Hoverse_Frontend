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

  changePassword: async (formData) => {
    const response = await axiosClient.patch("/users/password", formData);
    return response;
  },

  getUserByConditions: async (page, appliedFilter, PAGE_SIZE) => {
    const response = await axiosClient.get("/users", {
      params: {
        ...appliedFilter,
        page,
        size: PAGE_SIZE,
      },
    });
    return response;
  },

  changeUserStatus: async (userId, formData) => {
    const response = await axiosClient.patch(
      `/users/${userId}/status`,
      formData,
    );
    return response;
  },
};

export default profileService;
