import axiosClient from "@/api/axiosClient";

const categoryService = {
  getCategoryByConditions: async (params) => {
    const response = await axiosClient.get("/categories", {
      params: { ...params },
    });
    return response;
  },

  changeCategoryStatus: async (categoryId) => {
    const response = await axiosClient.patch(
      `/categories/${categoryId}/status`,
    );
    return response;
  },

  updateCategory: async (categoryId, formData) => {
    const response = await axiosClient.put(
      `/categories/${categoryId}`,
      formData,
    );
    return response;
  },
};

export default categoryService;
