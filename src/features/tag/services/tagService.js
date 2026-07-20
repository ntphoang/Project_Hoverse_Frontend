import axiosClient from "@/api/axiosClient";

const tagService = {
  getAllTags: async () => {
    const response = axiosClient.get("/tags");
    return response;
  },
};

export default tagService;
