import axiosClient from "@/api/axiosClient";

const tagService = {
  getTagsByCondition: async (params) => {
    const response = await axiosClient.get("/tags", {
      params: { ...params },
    });
    return response;
  },

  updateTag: async ({ tagId, formData }) => {
    const response = await axiosClient.patch(`/tags/${tagId}`, formData);
    return response;
  },

  changeTagStatus: async ({ tagId }) => {
    const response = await axiosClient.patch(`/tags/${tagId}/status`);
    return response;
  },
};

export default tagService;
