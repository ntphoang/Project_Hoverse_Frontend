import axiosClient from "../api/axiosClient";

const placeService = {
  getPlaceByConditions: async (title, minRating, page, size) => {
    const response = await axiosClient.get("/places", {
      params: {
        title: title,
        minRating: minRating,
        page: page,
        size: size,
      },
    });
    return response;
  },

  createPlace: async (placeData) => {
    const response = await axiosClient.post("/places", placeData);
    return response;
  },

  getPlaceDetail: async (placeId) => {
    const response = await axiosClient.get(`/places/${placeId}`);
    return response;
  },
};

export default placeService;
