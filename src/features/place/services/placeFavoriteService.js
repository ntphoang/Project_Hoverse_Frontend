import axiosClient from "@/api/axiosClient";

const placeFavoriteService = {
  getPlaceFavoriteIds: async () => {
    const response = await axiosClient.get("/favorites/ids");
    return response;
  },
  getPlaceFavorites: async (page, PAGE_SIZE) => {
    const response = await axiosClient.get("/favorites", {
      params: { page, size: PAGE_SIZE },
    });
    return response;
  },
};

export default placeFavoriteService;
