import axiosClient from "../api/axiosClient";

const placeService = {
  getAllPlaces: async () => {
    const response = await axiosClient.get("/places");
    return response;
  },

  createPlace: async (placeData) => {
    const response = await axiosClient.post("/places", placeData);
    return response;
  },
};

export default placeService;
