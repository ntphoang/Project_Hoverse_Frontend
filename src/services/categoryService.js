import axiosClient from "../api/axiosClient";

const categoryService = {
  getAllCategories: async () => {
    const response = axiosClient.get("/categories");
    return response;
  },
};

export default categoryService;
